/**
 * SESSION ENGINE — the spine
 *
 * The app already has six working skill views (listening, speaking, reading,
 * writing, pronunciation, conversation) and levelEngine already knows what each
 * UCplus module requires across those skills. What was missing is the thing that
 * decides *what you do today* and carries yesterday's result into tomorrow.
 *
 * That is this file. It does three jobs and nothing else:
 *
 *   1. buildTodaySession()  — read module progress + weak spots, emit an ordered
 *                             list of steps that fits a ~50 minute sitting.
 *   2. recordStep()         — mark a step done and store its score.
 *   3. getStreak()/history  — enough state for the UI to show continuity.
 *
 * Deliberately NOT reimplemented here: difficulty maths (adaptiveDifficulty.js),
 * module requirements (levelEngine.js), attempt storage (localStorageAdaptive.js),
 * spaced repetition (spacedRepetition.js). This file orchestrates them.
 */

import { getModuleById, getModuleProgress } from './levelEngine.js';
import { calculateNextDifficulty } from './adaptiveDifficulty.js';

/**
 * Score a completed session step on the 0-1 scale calculateNextDifficulty expects.
 *
 * Why this is not adaptiveDifficulty.calculatePerformanceScore: that function
 * weights accuracy 60%, speed 30% and a self-reported confidence rating 10%.
 * Session steps collect no confidence rating, so confidence always contributes
 * its 0.6 default, and its speed target is 10s per item. The combined effect is
 * that the 0.85 threshold needed to *raise* difficulty is unreachable in real
 * use: 100% correct at 8s per item scores 0.840 and stays flat. Since reading a
 * Danish sentence and weighing three options takes a B1 learner well over 8
 * seconds, the ladder could only ever descend.
 *
 * So session scoring is accuracy-dominant: accuracy carries 85% and pace
 * contributes a small bonus rather than a large penalty. 90% correct at a
 * realistic pace now advances, which is the behaviour the ladder needs.
 * calculateNextDifficulty itself is unchanged and still owns the laddering.
 */
/**
 * Damp a single session's difficulty move.
 *
 * calculateNextDifficulty steps ±1 to ±1.5 on a 0-10 scale, which suits an
 * occasional assessment but is far too coarse for a daily session: sustained
 * high accuracy would climb A1 to B2 in six days and then sit pinned at the
 * ceiling, where the difficulty signal tells you nothing. Taking 40% of the
 * proposed move gives roughly 0.6 per session, so a CEFR band takes about four
 * good sessions and the full range takes a few weeks — the right granularity
 * for daily practice over a couple of months.
 *
 * Direction and relative magnitude still come from calculateNextDifficulty;
 * this only scales the step.
 */
const DAMPING = 0.4;

function dampen(current, proposed) {
  const moved = current + (proposed - current) * DAMPING;
  return Math.max(0, Math.min(10, Number(moved.toFixed(2))));
}

export function scoreSession({ correct, total, avgResponseMs = 12000 }) {
  if (!total) return null;
  const accuracy = Math.max(0, Math.min(1, correct / total));

  // Pace bonus: full credit at or under 10s per item, tapering to zero by 30s.
  // It can lift a strong result over the advance threshold but cannot rescue a
  // weak one, because 85% of the score is still accuracy.
  const pace = Math.max(0, Math.min(1, (30000 - avgResponseMs) / 20000));

  return Math.min(1, accuracy * 0.85 + pace * 0.15);
}

const SESSION_KEY = 'dansk_sessions';
const DIFFICULTY_KEY = 'dansk_skill_difficulty';
const TARGET_MINUTES = 40;

// Minutes each step kind costs. Used to fill a sitting without overrunning it.
const STEP_COST = {
  grammar: 12,
  listening: 10,
  reading: 10,
  writing: 12,
  speaking: 10,
  pronunciation: 6,
  conversation: 12,
  vocab: 8,
};

// Which skills the spine can schedule, and the progress fields that reveal
// how far behind each one is. Grammar is handled separately: it is the daily
// constant rather than a rotating slot.
const ROTATING_SKILLS = [
  { kind: 'listening', pctField: 'listeningPct', view: 'listening' },
  { kind: 'reading', pctField: 'readingPct', view: 'reading' },
  { kind: 'writing', pctField: 'writingPct', view: 'writing' },
  { kind: 'speaking', pctField: 'speakingPct', view: 'speaking' },
  { kind: 'conversation', pctField: 'speakingPct', view: 'conversation' },
  { kind: 'vocab', pctField: 'vocabPct', view: 'vocab' },
  { kind: 'pronunciation', pctField: null, view: 'pronunciation' },
];

function todayKey(d = new Date()) {
  return d.toISOString().slice(0, 10);
}

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (err) {
    console.warn('[sessionEngine] could not persist', key, err);
    return false;
  }
}

// ---------------------------------------------------------------------------
// Per-skill difficulty (0-10 scale, matching adaptiveDifficulty.js)
// ---------------------------------------------------------------------------

export function getSkillDifficulty(skill) {
  const all = readJSON(DIFFICULTY_KEY, {});
  const value = all[skill];
  return typeof value === 'number' ? value : 3; // 3 ≈ A2 entry
}

export function setSkillDifficulty(skill, value) {
  const all = readJSON(DIFFICULTY_KEY, {});
  all[skill] = Math.max(0, Math.min(10, value));
  writeJSON(DIFFICULTY_KEY, all);
  return all[skill];
}

/**
 * Seed each skill's starting level from the placement test.
 *
 * The diagnostic measures reading, grammar, listening and speaking separately
 * and shows the learner four different levels — and then every skill started at
 * 3 (A2) anyway, because nothing carried those results into the ladder. A
 * learner placed at B1 listening and A1 grammar got identical A2 content for
 * both, which contradicts the result screen they were just shown.
 *
 * Writing, conversation, vocabulary and pronunciation are not tested directly,
 * so they are derived from the closest measured skill. Only ever seeds skills
 * that have no stored level yet, so it cannot overwrite earned progress.
 */
export function seedDifficultiesFromDiagnostic() {
  const stored = readJSON('dansk_diagnostic', null);
  const scores = stored?.scores;
  if (!scores) return null;

  // Percentage correct -> position on the 0-10 ladder, at the midpoint of the
  // band so the first session can move either way.
  const toDifficulty = (pct) => {
    if (typeof pct !== 'number') return null;
    if (pct < 40) return 1.5; // A1
    if (pct < 65) return 3.5; // A2
    if (pct < 85) return 6.0; // B1
    return 8.5; // B2
  };

  const r = toDifficulty(scores.reading);
  const g = toDifficulty(scores.grammar);
  const l = toDifficulty(scores.listening);
  const s = toDifficulty(scores.speaking);

  // Writing is measured directly now that the placement test includes a
  // written task; it only falls back to trailing grammar for results saved by
  // the older version of the test, which had no writing section at all.
  const w = toDifficulty(scores.writing);

  const seeded = {
    reading: r,
    grammar: g,
    listening: l,
    speaking: s,
    writing: w ?? (g == null ? null : Math.max(0, g - 1)),
    // Still derived, as the test does not measure these separately.
    conversation: s,
    vocab: r,
    pronunciation: s,
  };

  const existing = readJSON(DIFFICULTY_KEY, {});
  let changed = false;
  for (const [skill, value] of Object.entries(seeded)) {
    if (value == null) continue;
    if (typeof existing[skill] === 'number') continue; // never overwrite earned progress
    existing[skill] = value;
    changed = true;
  }
  if (changed) writeJSON(DIFFICULTY_KEY, existing);
  return existing;
}

export function getAllSkillDifficulties() {
  const out = {};
  for (const { kind } of ROTATING_SKILLS) out[kind] = getSkillDifficulty(kind);
  out.grammar = getSkillDifficulty('grammar');
  return out;
}

/** 0-10 internal scale -> CEFR band, for display only. */
export function difficultyToCEFR(value) {
  if (value < 2.5) return 'A1';
  if (value < 5) return 'A2';
  if (value < 7.5) return 'B1';
  return 'B2';
}

// ---------------------------------------------------------------------------
// Session history
// ---------------------------------------------------------------------------

export function getSessionHistory() {
  const history = readJSON(SESSION_KEY, {});
  return history && typeof history === 'object' ? history : {};
}

export function getSession(dateKey = todayKey()) {
  return getSessionHistory()[dateKey] || null;
}

/** Days completed in an unbroken run ending today or yesterday. */
export function getStreak() {
  const history = getSessionHistory();
  let streak = 0;
  const cursor = new Date();

  // A session finished today extends the streak; if today is not done yet the
  // streak is still alive as long as yesterday was, so start from yesterday.
  if (!history[todayKey(cursor)]?.completedAt) {
    cursor.setDate(cursor.getDate() - 1);
  }

  while (history[todayKey(cursor)]?.completedAt) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

/** Which rotating skills ran in the last `days` sessions, most recent first. */
function recentSkills(days = 3) {
  const history = getSessionHistory();
  const seen = [];
  const cursor = new Date();
  for (let i = 0; i < days; i += 1) {
    const session = history[todayKey(cursor)];
    if (session?.steps) {
      for (const step of session.steps) {
        if (step.kind !== 'grammar') seen.push(step.kind);
      }
    }
    cursor.setDate(cursor.getDate() - 1);
  }
  return seen;
}

/**
 * Days since a skill last appeared in a session, counting back up to `horizon`
 * days. Returns `horizon` for a skill that has not run at all, so untouched
 * skills sort as maximally overdue.
 */
function daysSinceSkill(kind, { horizon = 10, before = new Date() } = {}) {
  const history = getSessionHistory();
  const cursor = new Date(before);
  for (let i = 0; i < horizon; i += 1) {
    const session = history[todayKey(cursor)];
    if (session?.steps?.some((s) => s.kind === kind)) return i;
    cursor.setDate(cursor.getDate() - 1);
  }
  return horizon;
}

// ---------------------------------------------------------------------------
// Weak-spot detection (grammar topics the learner keeps missing)
// ---------------------------------------------------------------------------

export function getWeakTopics(limit = 3) {
  const weak = readJSON('dansk_weak', {});
  return Object.entries(weak)
    .map(([topic, data]) => {
      // Tolerate both shapes seen in storage: a bare miss count, or {correct,total}.
      if (typeof data === 'number') return { topic, missRate: data > 0 ? 1 : 0, misses: data };
      const total = data?.total ?? 0;
      const correct = data?.correct ?? 0;
      return {
        topic,
        missRate: total ? (total - correct) / total : 0,
        misses: total - correct,
      };
    })
    .filter((t) => t.misses > 0)
    .sort((a, b) => b.missRate - a.missRate || b.misses - a.misses)
    .slice(0, limit);
}

// ---------------------------------------------------------------------------
// Building today's session
// ---------------------------------------------------------------------------

/**
 * Pick the rotating skills for today: biggest requirement gap first, but
 * demoted if the same skill ran in the last two days so the week stays varied.
 */
/**
 * Percent-complete for a skill against the module requirement.
 *
 * levelEngine.getModuleProgress returns a `*Pct` for grammar, vocab, listening,
 * reading and writing — but for speaking it returns only `speakingDone` and no
 * percentage. Reading the missing field gave undefined, which fell back to 0,
 * which pinned speaking *and* conversation at a permanent 100% gap: they won
 * the rotation every day however much they were practised. So speaking is
 * derived here from the raw count instead of trusting a field that is not there.
 */
function pctFor(skill, progress, mod) {
  if (!skill.pctField) return 50; // pronunciation: no requirement to measure against

  const reported = progress?.[skill.pctField];
  if (typeof reported === 'number') return reported;

  if (skill.pctField === 'speakingPct') {
    const done = progress?.speakingDone ?? 0;
    const needed = mod?.requires?.speakingCount ?? 0;
    return needed ? Math.min(100, Math.round((done / needed) * 100)) : 0;
  }

  return 0;
}

function chooseRotatingSkills(progress, slots, { dateKey, mod } = {}) {
  const before = dateKey ? new Date(`${dateKey}T12:00:00Z`) : new Date();
  const recent = recentSkills(2);

  const scored = ROTATING_SKILLS.map((skill) => {
    const pct = pctFor(skill, progress, mod);
    const gap = Math.max(0, 100 - pct);

    // Staleness, not just gap.
    //
    // Gap alone starves skills. Completing a reading text raises readingPct,
    // which shrinks reading's gap, while a skill whose counter moves slowly
    // keeps a gap near 100 and wins every day — in simulation the plan
    // collapsed to the same four skills from day three onwards and reading
    // never came back. Weighting days-since-last-run guarantees everything
    // cycles within about a week however the percentages move.
    const stale = daysSinceSkill(skill.kind, { before });
    const recencyPenalty = recent.includes(skill.kind) ? 45 : 0;
    const score = gap * 0.55 + stale * 11 - recencyPenalty;

    return { ...skill, pct, gap, stale, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, slots);
}

function reasonFor(skill, progress, mod) {
  if (!skill.pctField) {
    return 'Udtale holdes i gang hver uge — korte sessioner virker bedst.';
  }
  const pct = pctFor(skill, progress, mod);
  const done = progress?.[`${skill.kind}Done`];
  const needed = progress?.[`${skill.kind}Needed`];

  if (pct >= 100) return 'Kravet er opfyldt — dette er vedligeholdelse.';
  if (typeof done === 'number' && typeof needed === 'number') {
    return `${done} af ${needed} klaret i dette modul — største hul lige nu.`;
  }
  return `${pct}% af kravet klaret — største hul lige nu.`;
}

/**
 * Build (or return the already-built) session for a given day.
 *
 * Sessions are sticky: once today's session exists it is returned unchanged, so
 * the plan does not reshuffle underneath you mid-sitting. Pass force to rebuild.
 */
export async function buildTodaySession({ moduleId, dateKey = todayKey(), force = false } = {}) {
  const history = getSessionHistory();
  if (!force && history[dateKey]) return history[dateKey];

  // Carry the placement test into the ladders before the first plan is built.
  seedDifficultiesFromDiagnostic();

  const resolvedModule =
    moduleId || localStorage.getItem('dansk_module') || 'm3';
  const mod = getModuleById(resolvedModule);
  const progress = getModuleProgress(resolvedModule);
  const weakTopics = getWeakTopics(3);

  const steps = [];
  let minutes = 0;

  // 1. Grammar is the daily constant — it is 35% of every module requirement
  //    and it is where weak spots surface first.
  const grammarDifficulty = getSkillDifficulty('grammar');
  steps.push({
    id: `${dateKey}-grammar`,
    kind: 'grammar',
    view: 'grammar',
    label: 'Grammatik',
    count: 15,
    topics: weakTopics.map((t) => t.topic),
    difficulty: grammarDifficulty,
    cefr: difficultyToCEFR(grammarDifficulty),
    estimatedMinutes: STEP_COST.grammar,
    reason: weakTopics.length
      ? `Fokus på dine svage emner: ${weakTopics.map((t) => t.topic).join(', ')}.`
      : 'Daglig grammatikdrill — grundstenen i modulet.',
    done: false,
  });
  minutes += STEP_COST.grammar;

  // 2. Build a candidate step for every rotating skill, in priority order.
  //
  // The budget is applied *after* items are attached, not before. STEP_COST is
  // only a provisional slot size; the real cost comes from the content, and a
  // reading block that turns out to be four minutes rather than ten should free
  // that time for another skill instead of just making the session shorter.
  const candidates = chooseRotatingSkills(progress, ROTATING_SKILLS.length, { dateKey, mod }).map(
    (skill) => {
      const difficulty = getSkillDifficulty(skill.kind);
      return {
        id: `${dateKey}-${skill.kind}`,
        kind: skill.kind,
        view: skill.view,
        label: labelFor(skill.kind),
        difficulty,
        cefr: difficultyToCEFR(difficulty),
        estimatedMinutes: STEP_COST[skill.kind] ?? 10,
        reason: reasonFor(skill, progress, mod),
        done: false,
      };
    },
  );

  // Pick the concrete items each step opens on, before the plan is persisted,
  // so what is shown and what is opened cannot drift apart. This also replaces
  // the provisional slot size with what the content actually costs.
  await attachItems([...steps, ...candidates]);

  // 3. Now take candidates in priority order until the sitting is full.
  for (const step of candidates) {
    const cost = Number.isFinite(step.estimatedMinutes) ? step.estimatedMinutes : 10;
    step.estimatedMinutes = cost;
    if (minutes + cost > TARGET_MINUTES) continue;
    // Five steps is already a lot of context-switching for a 40 minute sitting;
    // honest (shorter) estimates free up budget, and that budget is better
    // spent on depth within a skill than on a sixth and seventh switch.
    if (steps.length >= 5) break;
    steps.push(step);
    minutes += cost;
  }

  const session = {
    dateKey,
    moduleId: resolvedModule,
    moduleTitle: mod?.title ?? resolvedModule,
    moduleCefr: mod?.cefl ?? null,
    steps,
    estimatedMinutes: minutes,
    startedAt: null,
    completedAt: null,
    createdAt: new Date().toISOString(),
  };

  history[dateKey] = session;
  writeJSON(SESSION_KEY, history);
  return session;
}

/**
 * Choose the concrete item a step will open on.
 *
 * Done at build time so the plan can name it ("Læsning · Opslag i opgangen"),
 * and so the choice is stable for the whole sitting. Imported lazily because
 * contentSelector imports difficultyToCEFR from this module, and a top-level
 * import either way would be circular.
 */
async function attachItems(steps) {
  const [
    { selectItem, selectPronunciationWeek, selectBlock },
    { readingTexts },
    { listeningPieces },
    { conversationScenarios },
    { pronunciationWeeks },
    { vocabulary },
  ] = await Promise.all([
    import('./contentSelector.js'),
    import('../data/reading.js'),
    import('../data/listening.js'),
    import('../data/conversations.js'),
    import('../data/pronunciation.js'),
    import('../data/vocabulary.js'),
  ]);

  const pools = {
    reading: readingTexts,
    listening: listeningPieces,
    conversation: conversationScenarios,
    vocab: vocabulary,
  };

  for (const step of steps) {
    try {
      if (step.kind === 'pronunciation') {
        const week = selectPronunciationWeek(pronunciationWeeks);
        if (week) {
          step.itemId = week.week;
          step.itemTitle = `Uge ${week.week} · ${week.title}`;
        }
        continue;
      }

      // There is no dedicated speaking content pool, so speaking prompts are
      // derived from the conversation scenarios, which already carry a title, a
      // goal and useful phrases per level. A separate used-key keeps speaking
      // and conversation from consuming each other's material.
      if (step.kind === 'speaking') {
        const scenario = selectItem({
          kind: 'speaking',
          items: conversationScenarios,
          difficulty: step.difficulty,
        });
        if (scenario) {
          step.itemId = scenario.id;
          step.itemTitle = scenario.title;
          step.topic = {
            title: scenario.title,
            prompts: [
              scenario.goal,
              scenario.description,
              ...(scenario.phrases ?? []).slice(0, 2),
            ].filter(Boolean),
            targetLength: '2-3 minutter',
          };
        }
        continue;
      }

      const pool = pools[step.kind];
      if (!pool) continue;

      // Vocab is studied in batches, so the step names the band rather than a
      // single word; the view filters to that level itself.
      if (step.kind === 'vocab') {
        const sample = selectItem({ kind: 'vocab', items: pool, difficulty: step.difficulty });
        if (sample) {
          step.itemId = sample.id;
          step.itemTitle = `${step.cefr}-ord · tema ${sample.theme}`;
        }
        continue;
      }

      // Only reading and listening stack. Their items are short — a 62-word
      // text is under two minutes — so one of them cannot honestly fill a slot.
      // A conversation is a single open-ended dialogue and is not a queue, so
      // it keeps one item and its provisional slot size.
      if (step.kind === 'reading' || step.kind === 'listening') {
        const block = selectBlock({
          kind: step.kind,
          items: pool,
          difficulty: step.difficulty,
          targetMinutes: step.estimatedMinutes,
        });

        if (block.items.length) {
          step.itemIds = block.items.map((i) => i.id);
          step.itemId = block.items[0].id;
          step.itemTitle =
            block.items.length > 1
              ? `${block.items[0].title} + ${block.items.length - 1} mere`
              : block.items[0].title;
          step.estimatedMinutes = block.minutes;
        }
        continue;
      }

      const item = selectItem({ kind: step.kind, items: pool, difficulty: step.difficulty });
      if (item) {
        step.itemId = item.id;
        step.itemTitle = item.title ?? String(item.id);
      }
    } catch (err) {
      console.warn('[sessionEngine] could not pick an item for', step.kind, err);
    }
  }
  return steps;
}

export function labelFor(kind) {
  const labels = {
    grammar: 'Grammatik',
    listening: 'Lytning',
    reading: 'Læsning',
    writing: 'Skrivning',
    speaking: 'Tale',
    pronunciation: 'Udtale',
    conversation: 'Samtale',
    vocab: 'Ordforråd',
  };
  return labels[kind] ?? kind;
}

// ---------------------------------------------------------------------------
// Recording progress through the session
// ---------------------------------------------------------------------------

export function startSession(dateKey = todayKey()) {
  const history = getSessionHistory();
  const session = history[dateKey];
  if (!session) return null;
  if (!session.startedAt) {
    session.startedAt = new Date().toISOString();
    writeJSON(SESSION_KEY, history);
  }
  return session;
}

/**
 * Mark one step complete and feed its result into that skill's difficulty.
 *
 * `result` is { correct, total } where available; anything with a total of 0
 * (a free-form writing or speaking task with no auto-score) is recorded as done
 * without moving the difficulty dial, since we have no signal to move it on.
 */
export function recordStep(stepId, result = {}, dateKey = todayKey()) {
  const history = getSessionHistory();
  const session = history[dateKey];
  if (!session) return null;

  const step = session.steps.find((s) => s.id === stepId);
  if (!step) return session;

  step.done = true;
  step.completedAt = new Date().toISOString();
  step.result = result;

  const total = result.total ?? 0;
  const correct = result.correct ?? 0;

  if (total > 0) {
    const accuracy = correct / total;
    step.accuracy = Math.round(accuracy * 100);

    const score = scoreSession({
      correct,
      total,
      avgResponseMs: result.avgResponseMs ?? 12000,
    });
    const current = step.difficulty ?? 3;
    const next = dampen(current, calculateNextDifficulty(current, score));
    step.score = Number(score.toFixed(3));
    setSkillDifficulty(step.kind, next);
    step.difficultyAfter = next;
  }

  if (session.steps.every((s) => s.done)) {
    session.completedAt = new Date().toISOString();
  }

  writeJSON(SESSION_KEY, history);

  // Retire the item so tomorrow's plan picks something new. Fire-and-forget:
  // the step is already recorded, and a failure here only costs variety.
  markStepItemUsed(step);
  recordModuleProgress(step);

  return session;
}

/**
 * Credit a completed step against the module requirements.
 *
 * levelEngine.getModuleProgress counts writing and speaking from their own
 * attempt arrays, which nothing in the session flow was writing — so those two
 * skills sat at 0% forever while reading and listening climbed. That made their
 * requirement gap permanently maximal and skewed every plan towards them.
 * Recording an attempt here keeps all six counters moving on the same basis.
 */
function recordModuleProgress(step) {
  const KEYS = {
    writing: 'dansk_writing_attempts',
    speaking: 'dansk_speaking_attempts',
    conversation: 'dansk_speaking_attempts', // conversation is spoken practice
  };
  const key = KEYS[step.kind];
  if (!key) return; // reading/listening/vocab are credited via their used-lists

  try {
    const attempts = readJSON(key, []);
    if (!Array.isArray(attempts)) return;
    attempts.push({
      at: new Date().toISOString(),
      source: 'session',
      kind: step.kind,
      itemId: step.itemId ?? null,
      accuracy: step.accuracy ?? null,
    });
    writeJSON(key, attempts);
  } catch (err) {
    console.warn('[sessionEngine] could not credit module progress', err);
  }
}

export function getSessionSummary(dateKey = todayKey()) {
  const session = getSession(dateKey);
  if (!session) return null;

  const done = session.steps.filter((s) => s.done);
  const scored = done.filter((s) => typeof s.accuracy === 'number');
  const avgAccuracy = scored.length
    ? Math.round(scored.reduce((sum, s) => sum + s.accuracy, 0) / scored.length)
    : null;

  return {
    dateKey,
    moduleId: session.moduleId,
    stepsTotal: session.steps.length,
    stepsDone: done.length,
    complete: Boolean(session.completedAt),
    avgAccuracy,
    estimatedMinutes: session.estimatedMinutes,
    skillsPractised: done.map((s) => s.kind),
  };
}

/** Rebuild today from scratch — used by a "giv mig en anden session" control. */
export function regenerateToday(moduleId) {
  return buildTodaySession({ moduleId, force: true });
}

/**
 * Mark the item a step used, so tomorrow's selection skips it.
 *
 * Called on step completion rather than on open, so abandoning a step halfway
 * does not burn the text.
 */
export async function markStepItemUsed(step) {
  if (!step?.itemId || !step?.kind) return;
  try {
    const { markContentUsed } = await import('./contentSelector.js');
    markContentUsed(step.kind, step.itemId);
  } catch (err) {
    console.warn('[sessionEngine] could not mark item used', err);
  }
}
