/**
 * CONTENT SELECTOR — which item you get today, at the right level
 *
 * The session engine decides *which skill* you practise. This file decides
 * *which item within that skill*, and it is the piece that was missing:
 * ReadingView opened `readingTexts[4]` every time, ConversationView opened
 * scenario [0], PronunciationView opened week 1. The session therefore handed
 * back an identical text every day from day two onwards.
 *
 * Two jobs:
 *
 *   1. Don't repeat. Track what has been used per skill and prefer unseen
 *      items. When a band is exhausted, start a fresh cycle rather than
 *      returning nothing.
 *   2. Rise with the learner. Every content type carries a CEFR level, so the
 *      pool is filtered to the band implied by that skill's current difficulty.
 *      Because the difficulty ladder climbs as results come in, the material
 *      gets harder on its own — the A2 reader stops being offered A2 texts once
 *      they are consistently scoring above the advance threshold.
 *
 * Used-item state lives in the same `dansk_used_*` keys that tracking.js
 * already defined and that ListeningView already wrote to, so existing
 * progress is picked up rather than reset.
 */

import { getUsed, markUsed } from './tracking.js';
import { difficultyToCEFR } from './sessionEngine.js';

const BANDS = ['A1', 'A2', 'B1', 'B2'];

/** Bands to try, nearest-first, so a level with thin content still yields an item. */
function bandPreference(band) {
  const i = Math.max(0, BANDS.indexOf(band));
  return [...BANDS]
    .map((b, j) => ({ b, dist: Math.abs(i - j) }))
    .sort((x, y) => x.dist - y.dist || BANDS.indexOf(x.b) - BANDS.indexOf(y.b))
    .map((x) => x.b);
}

/**
 * Infer an exercise's level from its id.
 *
 * Phase 4 exercises encode it (`ORD_A1_001`); the 300 baseline exercises do not
 * (`ORD_001`). Unmarked ones are treated as core material eligible at any
 * level, which is the honest reading — they were authored as the general pool.
 */
export function inferExerciseLevel(id = '') {
  const match = /_(A1|A2|B1|B2)_/.exec(id);
  return match ? match[1] : null;
}

/**
 * Pick up to `count` items for a skill.
 *
 * Returns items the learner has not seen where possible, drawn from the band
 * closest to their current level. Draws are without replacement, so nothing
 * repeats inside one sitting.
 */
export function selectItems({
  kind,
  items,
  difficulty = 3,
  count = 1,
  levelOf = (item) => item.level ?? null,
  idOf = (item) => item.id,
}) {
  if (!Array.isArray(items) || items.length === 0) return [];

  const targetBand = difficultyToCEFR(difficulty);
  let used = getUsed(kind);

  // An item with no level is eligible at every band (see inferExerciseLevel).
  const inBand = (item, band) => {
    const level = levelOf(item);
    return level == null || level === band;
  };

  const picked = [];
  const pickedIds = new Set();

  const drawFrom = (pool) => {
    for (const item of pool) {
      if (picked.length >= count) return;
      const id = String(idOf(item));
      if (pickedIds.has(id)) continue;
      picked.push(item);
      pickedIds.add(id);
    }
  };

  // Pass 1: unseen items, nearest band first.
  for (const band of bandPreference(targetBand)) {
    if (picked.length >= count) break;
    const pool = items.filter(
      (item) => inBand(item, band) && !used.has(String(idOf(item))),
    );
    drawFrom(shuffle(pool));
  }

  // Pass 2: everything in this band has been seen, so begin a new cycle. Clear
  // only this skill's record and draw again rather than returning short.
  if (picked.length < count) {
    const bandPool = items.filter((item) => inBand(item, targetBand));
    if (bandPool.length) {
      resetCycle(kind, bandPool.map((item) => String(idOf(item))));
      used = getUsed(kind);
    }
    for (const band of bandPreference(targetBand)) {
      if (picked.length >= count) break;
      drawFrom(shuffle(items.filter((item) => inBand(item, band))));
    }
  }

  return picked;
}

/** Convenience wrapper for the common case of one item. */
export function selectItem(options) {
  return selectItems({ ...options, count: 1 })[0] ?? null;
}

/**
 * Pronunciation is a 12-week sequence rather than a levelled pool, so it
 * advances in order and wraps, instead of being filtered by band.
 */
export function selectPronunciationWeek(weeks) {
  if (!Array.isArray(weeks) || weeks.length === 0) return null;
  const used = getUsed('pronunciation');
  const next = weeks.find((w) => !used.has(String(w.week)));
  if (next) return next;
  clearUsedFor('pronunciation');
  return weeks[0];
}

export function markContentUsed(kind, id) {
  if (id == null) return;
  markUsed(kind, String(id));
}

/** Drop this skill's used record so its pool becomes available again. */
function resetCycle(kind, idsInBand) {
  try {
    const key = `dansk_used_${kind}`;
    const remaining = [...getUsed(kind)].filter((id) => !idsInBand.includes(id));
    localStorage.setItem(key, JSON.stringify(remaining));
  } catch (err) {
    console.warn('[contentSelector] could not reset cycle for', kind, err);
  }
}

function clearUsedFor(kind) {
  try {
    localStorage.setItem(`dansk_used_${kind}`, JSON.stringify([]));
  } catch (err) {
    console.warn('[contentSelector] could not clear', kind, err);
  }
}

/** Fisher-Yates on a copy, so variety does not depend on array order. */
function shuffle(list) {
  const out = [...list];
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * Estimate how long an item actually takes, in minutes.
 *
 * Step times used to be a hardcoded constant per skill: reading was always
 * "10 min". Measured against the real content that is fiction — reading texts
 * average 100 words and 1.1 questions, which is about 1.6 minutes, so a
 * "50 minute" session contained roughly 33 minutes of work. An estimate the
 * learner can feel is wrong erodes trust in the whole plan, so it is derived
 * from the item instead.
 *
 * Reading is figured at 100 words per minute, which is deliberately slow —
 * that is a B1 learner reading a second language carefully, not a native
 * skimming. Listening counts the clip's own duration where it has one, plus
 * replays, since nobody understands a natural-pace clip in one pass. Both add
 * 30 seconds per comprehension question.
 */
export function estimateItemMinutes(item, kind) {
  if (!item) return 0;
  const questions = (item.questions?.length ?? 0) * 0.5;

  if (kind === 'listening') {
    // `duration` is an "m:ss" display string, not a number — dividing it gave
    // NaN, which propagated into the session total.
    const clipMinutes = parseDuration(item.duration);
    const fallback = item.transcript ? item.transcript.split(/\s+/).length / 130 : 1;
    const base = clipMinutes || fallback;
    // Two passes, because nobody follows a natural-pace clip first time, plus
    // 30s to read the transcript afterwards.
    return base * 2 + questions + 0.5;
  }

  const words = item.words ?? (item.text ? item.text.split(/\s+/).length : 0);
  const estimate = words / 100 + questions;
  return Number.isFinite(estimate) ? estimate : 0;
}

/** "1:42" -> 1.7 minutes. Tolerates a plain number of seconds, or nothing. */
function parseDuration(value) {
  if (typeof value === 'number' && Number.isFinite(value)) return value / 60;
  if (typeof value !== 'string') return 0;
  const parts = value.split(':').map(Number);
  if (parts.some((n) => !Number.isFinite(n))) return 0;
  if (parts.length === 2) return parts[0] + parts[1] / 60;
  if (parts.length === 1) return parts[0] / 60;
  return 0;
}

/**
 * Pick enough items to genuinely fill `targetMinutes`.
 *
 * A single 62-word text does not fill a ten-minute slot, so a step stacks
 * several items and reports what they really add up to. Capped so a step never
 * becomes an endless queue.
 */
export function selectBlock({ kind, items, difficulty, targetMinutes, maxItems = 5 }) {
  const chosen = [];
  let minutes = 0;

  const pool = selectItems({ kind, items, difficulty, count: maxItems });
  for (const item of pool) {
    const cost = estimateItemMinutes(item, kind);
    // Always take the first, so a step is never empty; then stop once adding
    // another would overshoot the slot.
    if (chosen.length && minutes + cost > targetMinutes) break;
    chosen.push(item);
    minutes += cost;
    if (minutes >= targetMinutes) break;
  }

  return { items: chosen, minutes: Math.max(1, Math.round(minutes)) };
}

/** How much unseen material remains per band — drives the runway warning. */
export function getRemaining(kind, items, levelOf = (i) => i.level ?? null) {
  const used = getUsed(kind);
  const out = { total: items.length, seen: 0, byBand: {} };
  for (const band of BANDS) out.byBand[band] = { total: 0, unseen: 0 };
  for (const item of items) {
    const level = levelOf(item);
    const seen = used.has(String(item.id));
    if (seen) out.seen += 1;
    if (level && out.byBand[level]) {
      out.byBand[level].total += 1;
      if (!seen) out.byBand[level].unseen += 1;
    }
  }
  out.unseen = out.total - out.seen;
  return out;
}
