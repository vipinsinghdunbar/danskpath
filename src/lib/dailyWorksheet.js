/**
 * DAILY WORKSHEET — today's session as a sheet of paper
 *
 * The idea: print the day's exercises, do them away from the screen, then check
 * against the answer key at the back. Writing an answer by hand is a different
 * act from clicking the least-wrong of three buttons, and it is closer to what
 * PD3 actually asks for.
 *
 * worksheetEngine.js already produced a good A4 two-column sheet with a Facit,
 * but it drew from a small hardcoded pool rather than the 435-exercise bank,
 * and it was not connected to the session. This builds the sheet from the
 * learner's actual plan: their weak categories, at their current level,
 * excluding what they have already seen.
 *
 * It also carries the grammar explainer for the day's topics, so the sheet is
 * self-contained — you can learn the rule and then drill it without the app.
 */

import { getExercisesByCategory, getAllCategories } from './completeGrammarExercises.js';
import { selectItems, inferExerciseLevel } from './contentSelector.js';
import { getSkillDifficulty, difficultyToCEFR, getWeakTopics } from './sessionEngine.js';
import { grammarTopics } from '../data/grammar.js';

const DEFAULT_COUNT = 30;

/**
 * Is this englishBridge real, or the placeholder copied across every topic?
 *
 * All 28 topics in data/grammar.js currently carry the same englishBridge — the
 * V2 word-order explanation — so printing it on a sheet about reflexive
 * pronouns tells the learner something true of a different topic entirely.
 * Their summaries, lessons and examples are all genuinely distinct, so only
 * this one field is suppressed.
 *
 * Written as a duplicate check rather than a hardcoded exclusion so it starts
 * showing again by itself once the field is actually authored per topic.
 */
const BRIDGE_SHARED_BY = (() => {
  const counts = new Map();
  for (const t of grammarTopics) {
    const b = (t.englishBridge ?? '').trim();
    if (b) counts.set(b, (counts.get(b) ?? 0) + 1);
  }
  return counts;
})();

function usableBridge(topic) {
  const b = (topic.englishBridge ?? '').trim();
  if (!b) return '';
  return (BRIDGE_SHARED_BY.get(b) ?? 0) > 2 ? '' : b;
}

/**
 * Exercise category code -> the grammar section that explains it.
 *
 * The exercise bank is keyed by error code (ORD, KONJ, …) while grammarTopics
 * is grouped under Danish headings (Ordstilling, Småord, …). Substring matching
 * happens to work for ORD inside "Ordstilling" and fails for everything else,
 * so the mapping is written out.
 */
const CATEGORY_TO_SECTION = {
  ORD: 'Ordstilling',
  REL: 'Ordstilling',
  KONJ: 'Småord',
  NEG: 'Småord',
  PREP: 'Småord',
  PRON: 'Pronominer',
  POSS: 'Pronominer',
  REFL: 'Pronominer',
  ARTKV: 'Navneord',
  KOMP: 'Navneord',
  PASS: 'Verber',
  SVERB: 'Verber',
  MOD: 'Verber',
  INFGER: 'Verber',
  IDI: 'Avanceret',
};

/**
 * The grammar topics that explain the categories on this sheet.
 *
 * `categories` arrives in priority order — weakest first — and that order is
 * preserved here. Filtering alone returned whatever came first in the topic
 * file, so a sheet focused on pronouns and prepositions was explained with
 * three word-order topics.
 */
function explainersFor(categories) {
  const rank = new Map();
  categories.forEach((c, i) => {
    const section = CATEGORY_TO_SECTION[c];
    if (section && !rank.has(section)) rank.set(section, i);
  });

  const matches = grammarTopics
    .filter((t) => rank.has(t.category))
    .sort((a, b) => rank.get(a.category) - rank.get(b.category));

  // Always give the learner something to read, even if nothing matched.
  return (matches.length ? matches : grammarTopics).slice(0, 3);
}

/** Readable name for a category code. */
function categoryName(code) {
  return getAllCategories().find((c) => c.code === code)?.name ?? code;
}

/**
 * Build today's worksheet.
 *
 * Draws from the learner's weakest categories first, then fills out with the
 * rest so the sheet covers breadth as well as weak spots.
 */
export function buildDailyWorksheet({ count = DEFAULT_COUNT, date = new Date() } = {}) {
  const difficulty = getSkillDifficulty('grammar');
  const level = difficultyToCEFR(difficulty);

  const weak = getWeakTopics(4).map((w) => w.topic.toUpperCase());
  const all = getAllCategories().map((c) => c.code);
  const weakCategories = weak.filter((w) => all.includes(w));

  // Weak categories first, then everything else, so a sheet is never thin.
  const ordered = [...weakCategories, ...all.filter((c) => !weakCategories.includes(c))];

  const perCategory = Math.max(2, Math.ceil(count / Math.min(ordered.length, 8)));
  const picked = [];
  const seen = new Set();

  for (const category of ordered) {
    if (picked.length >= count) break;
    const pool = getExercisesByCategory(category);
    if (!pool.length) continue;

    // A worksheet is done once and kept, so it does not consume the app's
    // used-list — a separate key keeps paper and screen from starving each
    // other of material.
    const items = selectItems({
      kind: `worksheet_${category}`,
      items: pool,
      difficulty,
      count: perCategory,
      levelOf: (ex) => inferExerciseLevel(ex.id),
    });

    for (const ex of items) {
      if (picked.length >= count) break;
      if (seen.has(ex.id)) continue;
      seen.add(ex.id);
      picked.push({ ...ex, category });
    }
  }

  const categoriesUsed = [...new Set(picked.map((p) => p.category))];

  return {
    title: weakCategories.length
      ? `Fokus: ${weakCategories.slice(0, 2).map(categoryName).join(' · ')}`
      : 'Blandede opgaver',
    level,
    date: date.toISOString().slice(0, 10),
    exercises: picked.map((ex, i) => ({
      number: i + 1,
      id: ex.id,
      category: ex.category,
      categoryName: categoryName(ex.category),
      q: ex.question,
      options: ex.options ?? [],
      a: ex.correct,
      why: ex.explanation ?? '',
    })),
    explainers: explainersFor(categoriesUsed),
    categoriesUsed,
  };
}

const esc = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c],
  );

/**
 * Render the worksheet as a standalone printable page.
 *
 * Three parts: the explainer ("Lær om …"), the questions with a writing line,
 * and the Facit on its own page so it can be folded away while working.
 */
export function renderWorksheetHTML(sheet) {
  const explainers = sheet.explainers
    .map((t) => {
      const examples = (t.examples ?? [])
        .slice(0, 4)
        .map((e) => {
          const da = typeof e === 'string' ? e : (e.da ?? e.dansk ?? e.text ?? '');
          const en = typeof e === 'string' ? '' : (e.en ?? e.english ?? '');
          const note = typeof e === 'string' ? '' : (e.note ?? '');
          return `<li><span class="da">${esc(da)}</span>${
            en ? ` <span class="en">${esc(en)}</span>` : ''
          }${note ? ` <span class="note">${esc(note)}</span>` : ''}</li>`;
        })
        .join('');
      const bridge = usableBridge(t);
      return `
      <section class="explainer">
        <h3>${esc(t.title)} <span class="lvl">${esc(t.level ?? '')}</span></h3>
        ${t.summary ? `<p class="sum">${esc(t.summary)}</p>` : ''}
        ${t.lesson ? `<p class="lesson">${esc(t.lesson)}</p>` : ''}
        ${bridge ? `<p class="bridge"><b>På engelsk:</b> ${esc(bridge)}</p>` : ''}
        ${examples ? `<ul class="ex">${examples}</ul>` : ''}
      </section>`;
    })
    .join('');

  const questions = sheet.exercises
    .map(
      (ex) => `
    <div class="q">
      <div class="qn">${ex.number}</div>
      <div class="qc">
        <div class="qt da">${esc(ex.q)}</div>
        ${
          ex.options.length
            ? `<div class="qo">${ex.options
                .map((o, i) => `<span class="o"><b>${String.fromCharCode(65 + i)}</b> ${esc(o)}</span>`)
                .join('')}</div>`
            : ''
        }
        <div class="qa"><span class="al">Svar</span><span class="ln"></span><span class="idk">☐ ved ikke</span></div>
      </div>
    </div>`,
    )
    .join('');

  const answers = sheet.exercises
    .map(
      (ex) => `
    <div class="a">
      <b>${ex.number}</b>
      <span class="da">${esc(ex.a)}</span>
      ${ex.why ? `<span class="ar">${esc(ex.why)}</span>` : ''}
    </div>`,
    )
    .join('');

  return `<!DOCTYPE html><html lang="da"><head><meta charset="UTF-8">
<title>Dagens opgaver — ${esc(sheet.date)}</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",system-ui,sans-serif;
       font-size:9.5px;line-height:1.4;color:#121417;background:#fff;padding:10mm;max-width:210mm;margin:0 auto}
  .da{font-family:Georgia,"Times New Roman",serif}
  header{border-bottom:1.5px solid #121417;padding-bottom:7px;margin-bottom:10px;display:flex;justify-content:space-between;gap:16px;align-items:flex-start}
  h1{font-size:15px;font-weight:700;letter-spacing:-.01em}
  .meta{font-size:7.5px;text-transform:uppercase;letter-spacing:.07em;color:#8e8e93;margin-bottom:3px}
  .name{font-size:8px;color:#8e8e93;text-align:right;line-height:1.9;white-space:nowrap}
  h2{font-size:10.5px;font-weight:700;margin:12px 0 6px;padding-bottom:3px;border-bottom:1px solid #e5e5ea}
  .explainer{break-inside:avoid;border:1px solid #e5e5ea;border-radius:5px;padding:7px 9px;margin-bottom:6px;background:#fafafa}
  .explainer h3{font-size:10px;font-weight:700;margin-bottom:3px}
  .lvl{font-size:7px;font-weight:600;color:#007aff;border:1px solid #007aff;border-radius:3px;padding:0 3px;vertical-align:1px}
  .sum{font-size:9px;margin-bottom:3px}
  .lesson{font-size:8.5px;color:#3a3f45;margin-bottom:4px}
  .bridge{font-size:8.5px;color:#3a3f45;margin-bottom:4px}
  .ex{list-style:none;font-size:9px}
  .ex li{padding:1px 0 1px 9px;position:relative}
  .ex li::before{content:"·";position:absolute;left:2px;color:#007aff;font-weight:700}
  .en{color:#8e8e93;font-size:8px}
  .note{color:#007aff;font-size:7.5px}
  .grid{columns:2;column-gap:9px}
  .q{break-inside:avoid;display:flex;gap:6px;border:1px solid #e5e5ea;border-radius:5px;padding:5px 7px;margin-bottom:5px}
  .qn{font-weight:700;font-size:9px;color:#007aff;min-width:13px}
  .qc{flex:1;min-width:0}
  .qt{font-size:10px;font-weight:600}
  .qo{display:flex;flex-wrap:wrap;gap:2px 6px;margin-top:3px;font-size:8.5px}
  .o{background:#f2f2f7;border-radius:3px;padding:1px 4px}
  .o b{color:#8e8e93;font-size:7.5px;margin-right:1px}
  .qa{margin-top:4px;border-top:1px dashed #d8d8dd;padding-top:3px;display:flex;gap:5px;align-items:center;font-size:7.5px;color:#8e8e93}
  .al{font-weight:600}
  .ln{flex:1;border-bottom:1px solid #121417;height:8px}
  .idk{font-size:7px;white-space:nowrap}
  .a{break-inside:avoid;font-size:8.5px;padding:3px 5px;border-bottom:1px solid #f0f0f2;display:flex;gap:6px;align-items:baseline}
  .a b{color:#007aff;min-width:14px;font-size:8px}
  .ar{color:#8e8e93;font-size:8px}
  footer{margin-top:10px;padding-top:5px;border-top:1px solid #e5e5ea;font-size:7px;color:#8e8e93;display:flex;justify-content:space-between}
  .pb{page-break-before:always}
  @media print{body{padding:6mm}@page{margin:10mm;size:A4}}
</style></head><body>

<header>
  <div>
    <div class="meta">Dagens opgaver · ${esc(sheet.date)} · niveau ${esc(sheet.level)}</div>
    <h1>${esc(sheet.title)}</h1>
  </div>
  <div class="name">Navn ______________<br>Point ____ / ${sheet.exercises.length}</div>
</header>

${explainers ? `<h2>Lær om emnet</h2>${explainers}` : ''}

<h2>Opgaver · ${sheet.exercises.length} spørgsmål</h2>
<p style="font-size:8.5px;color:#8e8e93;margin-bottom:7px">
  Skriv svaret på linjen. Sæt kryds ved <b>ved ikke</b> hvis du er i tvivl — det tæller ikke imod dig, og det viser hvad der skal øves igen. Facit er på sidste side.
</p>
<div class="grid">${questions}</div>

<footer><span>DanskPath</span><span>${esc(sheet.date)}</span></footer>

<div class="pb"></div>
<header>
  <div>
    <div class="meta">Facit · ${esc(sheet.date)}</div>
    <h1>Svar og forklaring</h1>
  </div>
  <div class="name">${sheet.exercises.length} svar</div>
</header>
<div class="grid">${answers}</div>
<footer><span>DanskPath · facit</span><span>${esc(sheet.date)}</span></footer>

</body></html>`;
}

/** Open the sheet in a new tab, ready to print or save as PDF. */
export function openWorksheet(sheet) {
  const html = renderWorksheetHTML(sheet);
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const win = window.open(url, '_blank');
  if (!win) {
    // Popup blocked: fall back to a download so the sheet is not simply lost.
    const a = document.createElement('a');
    a.href = url;
    a.download = `dagens-opgaver-${sheet.date}.html`;
    a.click();
  }
  setTimeout(() => URL.revokeObjectURL(url), 60000);
  return url;
}
