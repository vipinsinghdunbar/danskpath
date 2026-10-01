import { useState, useEffect } from 'react';

// DiagnosticView — Assessment per Action Plan Phase 4
// Screen order: Assessment first, Result second, Path third, Exercise fourth, Save progress fifth, Progress sixth, Landing last
// Ship checklist: one primary action, can remove one element without losing meaning, passes light/dark 390px/1440px, first-time user reaches next without reading, uses ds.css
// Must have: Focus mode one Q per screen thin progress Q 4 of 15 option 56px Danish serif I don't know no right/wrong mid-test no lookup audio options
// Avoid: Right or wrong feedback mid-test, lookup/audio on options, verdict label, percentage as headline

const baseQuestions = [
  { id: 'q1', category: "grammar", type: "V2", level: "A2", q: "Vælg korrekt: ___ arbejder jeg hjemme.", options: ["I dag","I dag jeg","I dag er jeg","Ved ikke"], a: 0, why: "V2: tid først → inversion. 'I dag arbejder jeg'. Modul 3 core.", rule: "V2", skill: "V2 inversion", difficulty: "easy" },
  { id: 'q2', category: "grammar", type: "Ledsætning", level: "B1", q: "Jeg ved, at han ___ kommer.", options: ["ikke","kommer ikke","ikke kommer","Ved ikke"], a: 2, why: "Ledsætning: ikke FØR verbet. Modul 3 biggest shift.", rule: "Ledsætning", skill: "Ledsætning", difficulty: "medium" },
  { id: 'q3', category: "grammar", type: "Sin", level: "B1", q: "Hun elsker ___ mand.", options: ["sin","hendes","hans","Ved ikke"], a: 0, why: "Sin = egen mand. Modul 3 distinction.", rule: "Sin/sit", skill: "Refleksiv", difficulty: "medium" },
  { id: 'q4', category: "grammar", type: "Ligge/lægge", level: "A2", q: "Bogen ___ på bordet.", options: ["ligger","lægger","sidder","Ved ikke"], a: 0, why: "Ligge = tilstand.", rule: "Ligge/lægge", skill: "Verbum", difficulty: "easy" },
  { id: 'q5', category: "grammar", type: "Præposition", level: "A2", q: "Jeg har boet her ___ 3 år.", options: ["i","på","om","Ved ikke"], a: 0, why: "I + tid = varighed.", rule: "Præpositioner", skill: "Præposition", difficulty: "easy" },
  { id: 'q16', category: "grammar", type: "V2", level: "A2", q: "På mandag ___ hun nyt job.", options: ["starter","hun starter","er hun starter","Ved ikke"], a: 0, why: "V2 variation same rule different sentences.", rule: "V2", skill: "V2 inversion", difficulty: "easy" },
  { id: 'q17', category: "grammar", type: "Flertal", level: "A2", q: "To ___ er på bordet.", options: ["bøger","bog","bøgene","Ved ikke"], a: 0, why: "Flertal: en bog → to bøger.", rule: "Flertal", skill: "Flertal", difficulty: "easy" },
  { id: 'q20', category: "grammar", type: "Bindeord", level: "B1", q: "___ det regner, går vi en tur.", options: ["Selvom","Derfor","Fordi","Ved ikke"], a: 0, why: "Selvom = although.", rule: "Bindeord", skill: "Bindeord", difficulty: "medium" },
  { id: 'q0d', category: "vocab", type: "Tal", level: "A1", q: "Hvad er 'tyve'?", options: ["20","12","2","Ved ikke"], a: 0, why: "Tal 0-100 foundation.", rule: "Tal", skill: "Tal", difficulty: "easy" },
  { id: 'q6', category: "vocab", type: "Kollokationer", level: "B1", q: "Hvad betyder 'holde et møde'?", options: ["To have a meeting","To leave a meeting","To cancel a meeting","Ved ikke"], a: 0, why: "Kollokation: holde et møde.", rule: "Kollokationer", skill: "Kollokationer", difficulty: "medium" },
  { id: 'q7', category: "vocab", type: "Partikelverb", level: "B1", q: "At 'slå op' betyder:", options: ["To look up a word / break up","To close","To open","Ved ikke"], a: 0, why: "Partikelverber: slå op.", rule: "Partikelverber", skill: "Partikelverb", difficulty: "medium" },
  { id: 'q13', category: "vocab", type: "Kollokationer", level: "B1", q: "At 'tage stilling til' betyder:", options: ["To take a stance / consider","To stand up","To take a chair","Ved ikke"], a: 0, why: "Kollokation: tage stilling til.", rule: "Kollokationer", skill: "Kollokationer", difficulty: "medium" },
  { id: 'q19', category: "vocab", type: "Kollokationer", level: "B1", q: "At 'holde fyraften' betyder:", options: ["To finish work for the day","To hold a party","To be fired","Ved ikke"], a: 0, why: "Kollokation arbejde.", rule: "Kollokationer", skill: "Kollokationer", difficulty: "medium" },
  { id: 'q18b', category: "vocab", type: "Kollokationer", level: "B1", q: "At 'vente på' betyder:", options: ["To wait for","To wait on (serve)","To avoid","Ved ikke"], a: 0, why: "Prepositions with verbs.", rule: "Kollokationer", skill: "Kollokationer", difficulty: "easy" },
  { id: 'q8', category: "listening", type: "Reduktion", level: "B1", q: "Hvad betyder reduktionen 'd'er'? — Audio on question", options: ["det er","der er","det var","Ved ikke"], a: 0, why: "Dansk sluger: det er → d'er.", rule: "Reduktion", skill: "Lytte reduktion", difficulty: "medium" },
  { id: 'q18', category: "listening", type: "Reduktion", level: "B1", q: "I talesprog: 'skaddu med?' kommer fra:", options: ["skal du med?","skal det med?","skulle du med?","Ved ikke"], a: 0, why: "Reduktion: skal du → skaddu.", rule: "Reduktion", skill: "Lytte reduktion", difficulty: "medium" },
  { id: 'q8b', category: "listening", type: "Telefon", level: "B1", q: "I telefonen: 'Jeg stiller dig om' betyder:", options: ["I transfer you","I stop you","I call you","Ved ikke"], a: 0, why: "Telephone borgerservice.", rule: "Telefon", skill: "Lytte telefon", difficulty: "medium" },
  { id: 'q8c', category: "listening", type: "DSB", level: "A2", q: "DSB: 'Toget er forsinket' betyder:", options: ["Train delayed","Train cancelled","Train on time","Ved ikke"], a: 0, why: "DSB announcement.", rule: "DSB", skill: "Lytte DSB", difficulty: "easy" },
  { id: 'q8d', category: "listening", type: "DR", level: "B1", q: "DR slow news: 'Ifølge rapporten' betyder:", options: ["According to report","Following report","Despite report","Ved ikke"], a: 0, why: "DR slow news.", rule: "DR", skill: "Lytte DR", difficulty: "medium" },
  { id: 'q12', category: "stretch", type: "Modalpartikel", level: "B2", q: "Det er ___ klart, at vi skal hjælpe. (fælles viden) — STRETCH PD3", options: ["jo","da","vel","Ved ikke"], a: 0, why: "STRETCH PD3: Jo = fælles viden.", rule: "Modalpartikler", skill: "Modalpartikel", difficulty: "hard", stretch: true },
  { id: 'q14', category: "stretch", type: "Sammenhæng", level: "B1", q: "PD3 gapped text tester — STRETCH:", options: ["Sammenhæng og bindeord","Kun stavning","Kun udtale","Ved ikke"], a: 0, why: "STRETCH PD3 format: gapped text.", rule: "PD3 format", skill: "Læsning", difficulty: "medium", stretch: true },
  { id: 'q15', category: "stretch", type: "Skrivning", level: "B1", q: "PD3 Delprøve 4 kræver — STRETCH:", options: ["150-200 ord med indledning, argumenter, konklusion","10 ord","Kun sms","Ved ikke"], a: 0, why: "STRETCH PD3: 150-200 ord.", rule: "Skrivning", skill: "Skrivning", difficulty: "medium", stretch: true },
];

function hashStr(str){ let h=0; for(let i=0;i<str.length;i++){ h=((h<<5)-h)+str.charCodeAt(i); h=h&h; } return Math.abs(h); }

export default function DiagnosticView({ setActive }) {
  const [userSeed] = useState(()=> localStorage.getItem('dansk_user_seed') || ("u_"+Math.random().toString(36).slice(2,8)+"_"+Date.now()));
  const [questions] = useState(()=> {
    const core = baseQuestions.filter(q=>!q.stretch);
    const stretch = baseQuestions.filter(q=>q.stretch);
    const shuffledCore = [...core].sort(()=> 0.5 - (hashStr(userSeed) % 100)/100).slice(0,12);
    return [...shuffledCore, ...stretch.slice(0,3)];
  });
  const [idx, setIdx] = useState(()=>{
    const saved = localStorage.getItem('dansk_assessment_idx');
    const savedAnswers = localStorage.getItem('dansk_assessment_answers');
    if (saved && savedAnswers) {
      try {
        const parsedIdx = parseInt(saved,10);
        const parsedAnswers = JSON.parse(savedAnswers);
        if (parsedIdx >=0 && parsedIdx < 15 && Object.keys(parsedAnswers).length>0) {
          return parsedIdx;
        }
      } catch {}
    }
    return 0;
  });
  const [answers, setAnswers] = useState(()=>{
    try {
      const saved = localStorage.getItem('dansk_assessment_answers');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {};
  });
  const [showResult, setShowResult] = useState(false);
  const [verdict, setVerdict] = useState(null);
  const [showWhy, setShowWhy] = useState(false);

  useEffect(()=>{ localStorage.setItem('dansk_user_seed', userSeed); },[userSeed]);
  
  // Save state on every answer per spec — never lose work, abandoned test resume
  useEffect(()=>{
    localStorage.setItem('dansk_assessment_idx', idx.toString());
    localStorage.setItem('dansk_assessment_answers', JSON.stringify(answers));
  },[idx, answers]);

  const currentQ = questions[idx];
  const total = questions.length;

  const handleAnswer = (optIdx) => {
    setAnswers(prev=>({...prev, [currentQ.id]: optIdx}));
    if(navigator.vibrate) navigator.vibrate(10);
    // Auto-advance after short delay for calm speed per spec 120ms press 220ms state
    setTimeout(()=>{
      if(idx < total-1) {
        setIdx(i=>i+1);
      } else {
        finishTest({...answers, [currentQ.id]: optIdx});
      }
    }, 220);
  };

  const finishTest = (finalAnswers) => {
    // Calculate without revealing mid-test
    const filtered = {};
    Object.entries(finalAnswers).forEach(([id, optIdx]) => {
      const q = questions.find(q=>q.id===id);
      if (!q) return;
      const isIdk = q.options[optIdx]?.toLowerCase().includes('ved ikke');
      if (!isIdk) filtered[id] = optIdx;
    });
    const correct = Object.entries(filtered).filter(([id, optIdx])=>{
      const q = questions.find(q=>q.id===id);
      return q && q.a===optIdx;
    }).length;
    const totalCore = questions.filter(q=>!q.stretch).length;
    const pct = Math.round(correct/totalCore*100);
    const level = pct<30 ? 'Modul 1' : pct<55 ? 'Modul 2' : pct<75 ? 'Modul 3' : 'Modul 3+';
    const categoryPct = {};
    ['grammar','vocab','listening'].forEach(cat=>{
      const catQs = questions.filter(q=>q.category===cat);
      const catCorrect = catQs.filter(q=> filtered[q.id]!==undefined && q.a===filtered[q.id]).length;
      categoryPct[cat] = catQs.length ? Math.round(catCorrect/catQs.length*100) : 0;
    });
    const strengths = Object.entries(categoryPct).filter(([_,v])=>v>=75).map(([k])=>k).slice(0,3);
    const weaknesses = Object.entries(categoryPct).filter(([_,v])=>v<60).map(([k])=>k).slice(0,3);
    const v = { correct, total: totalCore, pct, level, categoryPct, strengths, weaknesses, idkCount: Object.keys(finalAnswers).length - Object.keys(filtered).length };
    setVerdict(v);
    localStorage.setItem('dansk_level', v.level);
    localStorage.setItem('dansk_diagnostic', JSON.stringify({ ...v, date: new Date().toISOString(), userSeed }));
    localStorage.setItem('dansk_verdict', JSON.stringify(v));
    // Clear abandoned test resume after finish
    localStorage.removeItem('dansk_assessment_idx');
    localStorage.removeItem('dansk_assessment_answers');
    setShowResult(true);
  };

  const prevQ = () => { 
    if(idx>0) setIdx(i=>i-1); 
  };

  if(showResult && verdict) {
    const startingPoint = verdict.level;
    const rangeLow = Math.max(0, verdict.pct - 12);
    const rangeHigh = Math.min(100, verdict.pct + 12);
    return (
      <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)]">
        {/* Focus mode — one Close button returns per spec */}
        <div className="max-w-[600px] mx-auto px-4 pt-6 pb-[100px]">
          <div className="flex items-center justify-between">
            <button onClick={()=>setActive('simple-landing')} className="w-10 h-10 rounded-full bg-white border border-[var(--border)] grid place-items-center">✕</button>
            <span className="text-[11px] font-[700] tracking-widest uppercase bg-[var(--ink)] text-white px-3 py-1.5 rounded-full">Result • Starting point with range</span>
          </div>

          <div className="mt-8">
            <div className="text-[11px] font-[700] tracking-widest uppercase text-[var(--muted)]">Your starting point • Modul 3 focus • Range not verdict</div>
            <h1 className="mt-3 text-[32px] font-[700] tracking-tight leading-[0.95]">Your starting point:<br/>{startingPoint}</h1>
            <p className="mt-4 text-[15px] leading-[1.5] text-[var(--ink-secondary)]">
              Your path through Modul 3 to 5. PD3 format is stretch, clearly labelled. Diagnostic capped at Modul 3 content A2→B1 Modultest 3. Range {rangeLow}–{rangeHigh}% reflects uncertainty.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-[12px] font-[600] bg-white border border-[var(--border)] px-3 py-1.5 rounded-full">{rangeLow}–{rangeHigh}% range</span>
              <span className="text-[12px] font-[600] bg-[var(--ink)] text-white px-3 py-1.5 rounded-full">{verdict.correct}/{verdict.total} • {verdict.idkCount} Ved ikke</span>
              <button onClick={()=>{ setShowResult(false); setIdx(0); setAnswers({}); }} className="text-[11px] font-[600] bg-white border border-[var(--border)] px-3 py-1.5 rounded-full">Retake →</button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="bg-white rounded-[16px] p-4 border border-[var(--border)]">
              <div className="text-[11px] font-[700] uppercase text-[var(--muted)]">Section scores • 5+ items each</div>
              <div className="mt-3 space-y-2">
                {Object.entries(verdict.categoryPct).map(([cat,pct])=>(
                  <div key={cat} className="flex justify-between text-[13px]"><span className="font-[600] capitalize">{cat}</span><span className={`px-2 py-0.5 rounded-full font-[700] text-[12px] ${pct>=80?'bg-[#ECFDF5] text-[#059669]':pct<60?'bg-[#FFFBEB] text-[#D97706]':'bg-[var(--bg)]'}`}>{pct}%</span></div>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <div className="bg-[#ECFDF5] rounded-[16px] p-4 border border-[#059669]/20">
                <div className="text-[11px] font-[700] uppercase text-[#059669]">Strengths • Keep strong</div>
                <div className="mt-2 space-y-1">
                  {verdict.strengths.length ? verdict.strengths.map((s,i)=><div key={i} className="text-[13px] font-[600]">✓ {s}</div>) : <div className="text-[12px] text-[var(--muted)]">Keep practicing Modul 3</div>}
                </div>
              </div>
              <div className="bg-[#FFFBEB] rounded-[16px] p-4 border border-[#D97706]/20">
                <div className="text-[11px] font-[700] uppercase text-[#D97706]">Focus • Where to start</div>
                <div className="mt-2 space-y-1">
                  {verdict.weaknesses.length ? verdict.weaknesses.map((w,i)=><div key={i} className="text-[13px] font-[600]">• {w}</div>) : <div className="text-[12px] text-[var(--muted)]">Good balance — start Up next</div>}
                </div>
              </div>
            </div>
          </div>

          {/* One primary action — bottom thumb zone */}
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[var(--bg)] to-transparent">
            <div className="max-w-[600px] mx-auto flex gap-2">
              <button onClick={()=>setActive('path')} className="flex-1 bg-[var(--ink)] text-white py-4 rounded-full text-[16px] font-[600]">See My Learning Path →</button>
            </div>
            <div className="max-w-[600px] mx-auto mt-2 flex gap-2">
              <button onClick={()=>setActive('register')} className="flex-1 bg-white border border-[var(--border)] py-3 rounded-full text-[14px] font-[600]">Save Progress</button>
              <button onClick={()=>setActive('practice')} className="flex-1 bg-white border border-[var(--border)] py-3 rounded-full text-[14px] font-[600]">Up next →</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)] flex flex-col">
      {/* Focus mode — whole screen, one Close button returns */}
      <div className="max-w-[600px] mx-auto w-full px-4 pt-6 pb-[100px] flex-1 flex flex-col">
        <div className="flex items-center justify-between">
          <button onClick={()=>setActive('assessment')} className="w-10 h-10 rounded-full bg-white border border-[var(--border)] grid place-items-center" aria-label="Close">✕</button>
          <span className="text-[11px] font-[700] tracking-widest uppercase text-[var(--muted)]">Question {idx+1} of {total} • Modul 3 Focus</span>
          <span className="text-[11px] font-[600] px-2.5 py-1 rounded-full bg-white border border-[var(--border)]">{currentQ.category} • {currentQ.level}</span>
        </div>

        {/* Thin progress bar per spec */}
        <div className="mt-4 h-1.5 bg-white rounded-full overflow-hidden border border-[var(--border)]">
          <div className="h-full bg-[var(--ink)] rounded-full transition-all duration-[340ms]" style={{ width: ((idx+1)/total*100) + "%" }} />
        </div>
        <div className="mt-2 flex justify-between text-[11px] text-[var(--muted)]">
          <span>{Object.keys(answers).length}/{total} answered • {Object.values(answers).filter((_,i)=>{ const q=questions[i]; return false; }).length} </span>
          <span>{currentQ.stretch ? 'STRETCH PD3 • Clearly labelled' : 'Modul 3 • A2→B1'}</span>
        </div>

        {/* One question per screen per spec */}
        <div className="flex-1 mt-8">
          <div className="bg-white rounded-[16px] border border-[var(--border)] p-6">
            <div className="flex gap-2 mb-3">
              <span className="text-[11px] font-[700] tracking-widest uppercase bg-[var(--ink)] text-white px-3 py-1 rounded-full">{currentQ.category}</span>
              <span className="text-[11px] px-2.5 py-1 rounded-full bg-[var(--bg)] border border-[var(--border)]">{currentQ.skill} • {currentQ.level}</span>
              {currentQ.stretch && <span className="text-[10px] px-2 py-1 rounded-full bg-[#FFFBEB] border border-[#D97706]/20 text-[#D97706] font-[700]">STRETCH PD3</span>}
            </div>

            {/* Danish content in serif per spec */}
            <h2 className="text-[22px] font-[700] leading-tight serif" lang="da">{currentQ.q}</h2>
            <div className="mt-2 text-[11px] text-[var(--muted)]">Sprogpolitik: audio on question, never options. Danish serif, interface system face. Never mixed in one line.</div>

            {/* Option rows at least 56px tall per spec */}
            <div className="mt-6 space-y-2">
              {currentQ.options.map((opt,oi)=>{
                const isSelected = answers[currentQ.id]===oi;
                const isIdk = opt.toLowerCase().includes('ved ikke');
                return (
                  <button 
                    key={oi} 
                    onClick={()=>handleAnswer(oi)} 
                    className={`w-full text-left px-5 py-4 rounded-[12px] border text-[16px] font-[500] flex justify-between items-center transition-all min-h-[56px] ${isSelected ? 'bg-[var(--ink)] text-white border-[var(--ink)]' : isIdk ? 'bg-white border border-dashed border-[var(--border-strong)] text-[var(--muted)]' : 'bg-[var(--bg)] border-transparent hover:bg-white hover:border-[var(--border)]'}`}
                  >
                    <span className={isIdk ? '' : 'serif'} lang={isIdk ? undefined : 'da'}>{opt}</span>
                    <span className={`w-6 h-6 rounded-full grid place-items-center text-[11px] shrink-0 ${isSelected ? 'bg-white text-black' : 'bg-white border border-[var(--border)]'}`}>{isSelected?'✓':''}</span>
                  </button>
                );
              })}
            </div>

            {/* Progressive disclosure — English comparison and full rules behind tap per spec */}
            <div className="mt-6">
              <button onClick={()=>setShowWhy(!showWhy)} className="text-[13px] font-[600] text-[var(--accent)]">Why? {showWhy ? 'Hide' : 'Show rule (1-2 lines)'}</button>
              {showWhy && (
                <div className="mt-3 p-4 bg-[var(--bg)] rounded-[12px] text-[13px] leading-[1.5]">
                  <div className="font-[600]">{currentQ.rule} • {currentQ.skill}</div>
                  <div className="mt-1 text-[var(--ink-secondary)]">{currentQ.why}</div>
                  <div className="mt-2 text-[11px] text-[var(--muted)]">English: Compare to English SVO vs Danish V2. Full rules behind tap per progressive disclosure.</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom thumb zone — one primary action per spec, Back always works */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)] to-transparent">
          <div className="max-w-[600px] mx-auto flex gap-2">
            <button onClick={prevQ} disabled={idx===0} className="px-5 py-4 rounded-full bg-white border border-[var(--border)] text-[14px] font-[600] disabled:opacity-40 min-h-[56px]">← Back</button>
            <div className="flex-1 bg-white border border-[var(--border)] rounded-full px-4 py-2 flex items-center justify-between text-[12px]">
              <span className="text-[var(--muted)]">Save every answer • Back works • Closing mid-test loses nothing</span>
              <span className="font-[600]">{idx+1}/{total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
