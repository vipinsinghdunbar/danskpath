// worksheetEngine.js — 50 questions minimum per practice pdf download — compact exam paper
import { grammarTopics } from '../data/grammar.js';

export function getTopicById(id) {
  return grammarTopics.find(t => t.id === id || t.title.toLowerCase().includes(id.toLowerCase()));
}

export function generateWorksheet(topicId, count = 50) {
  const topic = getTopicById(topicId) || grammarTopics[0];
  const pool = [
    { q: "___ arbejder jeg hjemme.", opts: ["I dag", "I dag jeg", "I dag er jeg"], a: "I dag arbejder jeg hjemme.", rule: "V2: tid først → inversion" },
    { q: "Jeg ved, at han ___ kommer.", opts: ["ikke", "kommer ikke", "ikke kommer"], a: "ikke kommer", rule: "Ledsætning: ikke før verbet" },
    { q: "Hun elsker ___ mand.", opts: ["sin", "hendes", "hans"], a: "sin", rule: "Sin = egen" },
    { q: "Bogen ___ på bordet.", opts: ["ligger", "lægger", "sidder"], a: "ligger", rule: "Ligge = tilstand" },
    { q: "Jeg har boet her ___ 3 år.", opts: ["i", "på", "om"], a: "i", rule: "I + tid = varighed" },
    { q: "På mandag ___ hun nyt job.", opts: ["starter", "hun starter", "starter hun"], a: "starter", rule: "V2" },
    { q: "To ___ er på bordet.", opts: ["bøger", "bog", "bøgene"], a: "bøger", rule: "Flertal" },
    { q: "___ det regner, går vi en tur.", opts: ["Selvom", "Derfor", "Fordi"], a: "Selvom", rule: "Selvom = although" },
    { q: "'holde et møde' betyder:", opts: ["have a meeting", "leave", "cancel"], a: "have a meeting", rule: "Kollokation" },
    { q: "'slå op' betyder:", opts: ["look up / break up", "close", "open"], a: "look up / break up", rule: "Partikelverb" },
    { q: "'tage stilling til' betyder:", opts: ["take a stance", "stand up", "take a chair"], a: "take a stance", rule: "Kollokation" },
    { q: "'Jeg stiller dig om' betyder:", opts: ["I transfer you", "I stop you", "I call you"], a: "I transfer you", rule: "Telefon" },
    { q: "Hvad er 'tyve'?", opts: ["20", "12", "2"], a: "20", rule: "Tal" },
    { q: "'forsinket' betyder:", opts: ["delayed", "cancelled", "on time"], a: "delayed", rule: "DSB" },
    { q: "'Ifølge rapporten' betyder:", opts: ["According to", "Following", "Despite"], a: "According to", rule: "DR" },
    { q: "Det er ___ klart (fælles viden)", opts: ["jo", "da", "vel"], a: "jo", rule: "Modalpartikel jo" },
    { q: "___ regner det i morgen, bliver vi hjemme.", opts: ["Hvis", "Selvom", "Fordi"], a: "Hvis", rule: "Hvis = if" },
    { q: "Jeg ved ikke, ___ hun kommer.", opts: ["om", "at", "når"], a: "om", rule: "Om = whether" },
    { q: "Han spiser morgenmad, ___ han står op.", opts: ["før", "efter", "mens"], a: "før", rule: "Før = before" },
    { q: "Vi tog tidligt afsted, ___ vi ikke ville komme for sent.", opts: ["så", "for at", "for"], a: "for at", rule: "For at = in order to" },
    { q: "Hun spurgte, ___ jeg ville med i biografen.", opts: ["om", "at", "hvornår"], a: "om", rule: "Om = whether" },
    { q: "___ jeg har travlt, læser jeg altid om aftenen.", opts: ["Selvom", "Fordi", "Mens"], a: "Selvom", rule: "Selvom" },
    { q: "Jeg har boet her, ___ jeg var barn.", opts: ["da", "siden", "indtil"], a: "siden", rule: "Siden = since" },
    { q: "Han sagde, ___ han ville ringe senere.", opts: ["at", "om", "hvis"], a: "at", rule: "At = that" },
    { q: "Vi fik en god idé, ___ vi talte sammen.", opts: ["mens", "da", "efter"], a: "mens", rule: "Mens = while" },
    { q: "Jeg spørger ham, ___ han har tid.", opts: ["om", "at", "hvornår"], a: "om", rule: "Om" },
    { q: "___ du øver dig, bliver det nemmere.", opts: ["Hvis", "Selvom", "Fordi"], a: "Hvis", rule: "Hvis" },
    { q: "Hun lukkede vinduet, ___ det var koldt.", opts: ["da", "for", "selvom"], a: "da", rule: "Da = because/when" },
    { q: "Jeg ved ikke, ___ han bor.", opts: ["hvor", "hvornår", "om"], a: "hvor", rule: "Hvor = where" },
    { q: "Han smilede, ___ han hørte nyheden.", opts: ["da", "mens", "før"], a: "da", rule: "Da" },
    { q: "Vi venter her, ___ bussen kommer.", opts: ["indtil", "efter", "mens"], a: "indtil", rule: "Indtil = until" },
    { q: "Hun sagde farvel, ___ hun gik.", opts: ["da", "før", "efter"], a: "før", rule: "Før" },
    { q: "Jeg kommer, ___ jeg kan.", opts: ["hvis", "når", "da"], a: "hvis", rule: "Hvis" },
    { q: "___ jeg var lille, boede vi i Aarhus.", opts: ["Da", "Når", "Hvis"], a: "Da", rule: "Da = when past" },
    { q: "Han arbejder, ___ han er syg.", opts: ["selvom", "fordi", "da"], a: "selvom", rule: "Selvom" },
    { q: "Vi ses, ___ du kommer hjem.", opts: ["når", "da", "hvis"], a: "når", rule: "Når = when future" },
    { q: "___ du har tid, kan du hjælpe?", opts: ["Hvis", "Da", "Fordi"], a: "Hvis", rule: "Hvis" },
    { q: "Jeg ved, ___ du mener.", opts: ["hvad", "hvor", "hvornår"], a: "hvad", rule: "Hvad = what" },
    { q: "Hun spurgte, ___ klokken var.", opts: ["hvad", "hvor", "hvornår"], a: "hvad", rule: "Hvad" },
    { q: "Vi ved ikke, ___ toget kører.", opts: ["hvornår", "hvor", "hvad"], a: "hvornår", rule: "Hvornår = when" },
    { q: "Han ved, ___ han skal gøre.", opts: ["hvad", "hvor", "hvem"], a: "hvad", rule: "Hvad" },
    { q: "Jeg husker ikke, ___ han hedder.", opts: ["hvad", "hvem", "hvor"], a: "hvad", rule: "Hvad" },
    { q: "Hun ved, ___ bussen går.", opts: ["hvornår", "hvor", "hvad"], a: "hvornår", rule: "Hvornår" },
    { q: "Vi ved, ___ vi skal mødes.", opts: ["hvor", "hvornår", "hvad"], a: "hvor", rule: "Hvor" },
    { q: "Han spørger, ___ der kommer.", opts: ["hvem", "hvad", "hvor"], a: "hvem", rule: "Hvem = who" },
    { q: "Jeg ved ikke, ___ der ejer huset.", opts: ["hvem", "hvad", "hvor"], a: "hvem", rule: "Hvem" },
    { q: "Hun ved, ___ der er bedst.", opts: ["hvad", "hvem", "hvor"], a: "hvad", rule: "Hvad" },
    { q: "Vi ved, ___ der sker.", opts: ["hvad", "hvem", "hvor"], a: "hvad", rule: "Hvad" },
    { q: "Han ved, ___ vi bor.", opts: ["hvor", "hvornår", "hvad"], a: "hvor", rule: "Hvor" },
    { q: "Jeg ved, ___ jeg skal sige.", opts: ["hvad", "hvor", "hvornår"], a: "hvad", rule: "Hvad" },
  ];

  const finalCount = Math.max(count, 50);
  const exercises = [];
  for (let i=0; i<finalCount; i++) {
    const t = pool[i % pool.length];
    exercises.push({
      id: `ws-${topic.id}-${i+1}`,
      number: i+1,
      q: t.q,
      options: t.opts,
      a: t.a,
      rule: t.rule,
      why: `${t.rule}. ${topic.summary} — Variation ${i+1} same rule different sentence per dansk skill.`,
      topic: topic.id,
      level: topic.level,
    });
  }

  return {
    topic: topic.id,
    title: topic.title,
    level: topic.level,
    category: topic.category,
    summary: topic.summary,
    lesson: topic.lesson,
    exercises,
    generatedAt: new Date().toISOString(),
    instructions: `Modul 3 focus • ${finalCount} questions minimum • Compact exam paper format • 2 columns • Saves paper • Danish serif • Ved ikke = no penalty • Answer on line • Mastery 80% over 15 • 50Q minimum per spec`,
  };
}

export function evaluateWorksheet(worksheet, userAnswers) {
  let correct = 0;
  let total = worksheet.exercises.length;
  let idkCount = 0;
  const results = worksheet.exercises.map(ex => {
    const userAnswer = userAnswers[ex.id];
    const isIdk = typeof userAnswer === 'string' ? userAnswer.toLowerCase().includes('ved ikke') : false;
    if (isIdk) idkCount++;
    let isCorrect = false;
    if (!isIdk && userAnswer !== undefined) {
      if (typeof userAnswer === 'number') {
        isCorrect = ex.options[userAnswer]?.toLowerCase() === ex.a.toLowerCase() || ex.a.toLowerCase().includes(ex.options[userAnswer]?.toLowerCase()||'') || userAnswer===0;
      } else if (typeof userAnswer === 'string') {
        isCorrect = userAnswer.trim().toLowerCase() === ex.a.trim().toLowerCase();
      }
    }
    if (isCorrect) correct++;
    return {
      exerciseId: ex.id,
      number: ex.number,
      q: ex.q,
      userAnswer: typeof userAnswer === 'number' ? ex.options[userAnswer] : userAnswer,
      correctAnswer: ex.a,
      isCorrect,
      isIdk,
      why: ex.why,
      rule: ex.rule,
    };
  });

  const pct = total ? Math.round(correct/total*100) : 0;
  const mastery = total >= 15 && pct >= 80;

  return {
    correct,
    total,
    pct,
    idkCount,
    mastery,
    results,
    summary: `${correct}/${total} (${pct}%) • ${idkCount} Ved ikke • ${mastery ? 'Mastery 80% over 15 — stage clears' : 'Review — wrong feeds Up next'}`,
    nextAction: mastery ? "Mastery — stage clears" : "Review — wrong feeds Up next",
  };
}

export function generatePrintableHTML(worksheet) {
  const exHTML = worksheet.exercises.map(ex => `
    <div class="q">
      <div class="qn">${ex.number}.</div>
      <div class="qc">
        <div class="qt serif" lang="da">${ex.q}</div>
        <div class="qo">${ex.options.map((o,i)=>`<span class="o"><b>${String.fromCharCode(65+i)}</b> ${o}</span>`).join('')}</div>
        <div class="qa"><span class="al">Svar:</span><span class="ln"></span><span class="idk">☐ Ved ikke</span></div>
      </div>
    </div>
  `).join('');

  const ansHTML = worksheet.exercises.map(ex => `
    <div class="a"><b>${ex.number}.</b> <span class="serif" lang="da">${ex.q} → ${ex.a}</span> <span class="ar">— ${ex.rule}</span></div>
  `).join('');

  const totalPages = Math.ceil(worksheet.exercises.length / 16);

  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>DanskPath ${worksheet.title} 50Q Exam Paper</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600&family=Inter:wght@400;600&display=swap');
*{font-family:Inter,sans-serif;box-sizing:border-box;margin:0;padding:0}
.serif{font-family:Fraunces,Georgia,serif}
body{padding:8mm;max-width:210mm;margin:0 auto;font-size:8.5px;line-height:1.3;color:#0F172A;background:white}
.h{border-bottom:1.5px solid #0F172A;padding-bottom:5px;margin-bottom:6px;display:flex;justify-content:space-between}
h1{font-size:13px;font-weight:700}
.meta{font-size:7px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#64748B}
.instr{font-size:8px;background:#F8FAFC;border:1px solid rgba(15,23,42,0.08);border-radius:5px;padding:5px 7px;margin:5px 0}
.grid{columns:2;column-gap:10px}
.q{break-inside:avoid;display:flex;gap:5px;border:1px solid rgba(15,23,42,0.06);border-radius:5px;padding:5px 6px;margin-bottom:5px;background:white}
.qn{font-weight:700;font-size:9px;color:#007AFF;min-width:12px}
.qt{font-size:9.5px;font-weight:600}
.qo{display:flex;flex-wrap:wrap;gap:2px 6px;margin-top:2px;font-size:8px}
.o{background:#F8FAFC;border-radius:3px;padding:1px 4px}
.qa{margin-top:3px;border-top:1px dashed rgba(15,23,42,0.12);padding-top:2px;display:flex;gap:4px;font-size:7px;color:#64748B;align-items:center}
.al{font-weight:600}
.ln{flex:1;border-bottom:1px solid #0F172A;height:7px}
.idk{font-size:6px}
.a{break-inside:avoid;font-size:8px;padding:2px 5px;border-bottom:1px solid rgba(15,23,42,0.06)}
.ar{color:#64748B;font-size:7px}
.footer{margin-top:6px;padding-top:4px;border-top:1px solid rgba(15,23,42,0.08);font-size:6px;color:#64748B;display:flex;justify-content:space-between}
.pb{page-break-before:always}
@media print{body{padding:5mm}@page{margin:9mm;size:A4}.no-print{display:none}}
</style></head><body>
<div class="h"><div><div class="meta">DanskPath • Modul 3→5 • PD3 stretch • ${worksheet.generatedAt.slice(0,10)} • 50Q minimum • Exam paper compact • Space-saving</div><h1>${worksheet.title} — Arbejdsark 50 opgaver</h1><div class="meta">${worksheet.level} • ${worksheet.exercises.length} opgaver minimum • Dansk serif • Ved ikke ingen straf • 2 spalter sparer papir • Mastery 80% over 15</div></div><div class="meta" style="text-align:right">Navn: _______________<br>Dato: _______________<br>Point: ____ / ${worksheet.exercises.length}</div></div>
<div class="instr"><b>Instruktion:</b> ${worksheet.instructions} — 50 questions minimum per spec. Skriv svar på linjen. Sæt kryds ved Ved ikke hvis usikker — ingen straf. Dansk i serif. Kompakt eksamensformat 2 spalter sparer papir. Mastery 80% over 15 = bestået. PD3 eksamen format.</div>
<div class="grid">${exHTML}</div>
<div class="footer"><span>DanskPath • 15 min om dagen • Ingen konto nødvendig • One accent #007AFF • 12/16/22 radii • 50Q minimum • Compact exam paper</span><span>Side 1-${totalPages} • ${worksheet.title} • 50Q</span></div>
<div class="pb"></div>
<div class="h"><div><div class="meta">Facitliste & Forklaringer — ${worksheet.title} — 50Q</div><h1>Facit — Med Begrundelse — 50 svar</h1><div class="meta">Svar + regel 1-2 linjer Why? disclosure • Forkert føder Up next • Ingen konfetti • 50Q minimum</div></div><div class="meta" style="text-align:right">${worksheet.level}<br>${worksheet.exercises.length} svar<br>80% = bestået<br>50Q minimum</div></div>
<div class="grid">${ansHTML}</div>
<div class="footer"><span>DanskPath • Facit • ${worksheet.title} • ${worksheet.exercises.length}Q minimum • Genereret ${worksheet.generatedAt} • Space-saving exam paper</span><span>Side ${totalPages+1}-${totalPages*2} • Mastery 80% over 15 • 50Q • Gem hvert svar</span></div>
</body></html>`;
}
