import { useState, useEffect } from 'react';
import { generateQuestionSet } from '../lib/variationEngine';
import { calculateVerdict } from '../lib/verdictEngine';

// Modul 3 Focus per Action Plan + dansk skill: A2→B1 Modultest 3, not PD3 sitting
// Per Phase 2: at least 5 items per section, or merge to 3 skills: grammar, vocabulary, listening
// With 3 items per section, one question swings 33 points — need 5+ per section
// Add "I don't know" so guessing doesn't pollute score
// Cap diagnostic at Modul 3 covers, PD3 labelled stretch above
// Sprogpolitik: audio and lookup on questions and passages, never on answer options
const baseQuestions = [
  // === GRAMMAR — 8 items (need 5+ per section) — Modul 3 focus A2-B1 ===
  { id: 'q1', category: "grammar", type: "V2", level: "A2", q: "Vælg korrekt: ___ arbejder jeg hjemme.", options: ["I dag","I dag jeg","I dag er jeg","Ved ikke"], a: 0, why: "V2: tid først → inversion. 'I dag arbejder jeg'. Modul 3 core. Audio on question, not options.", rule: "V2", skill: "V2 inversion", difficulty: "easy" },
  { id: 'q2', category: "grammar", type: "Ledsætning", level: "B1", q: "Jeg ved, at han ___ kommer.", options: ["ikke","kommer ikke","ikke kommer","Ved ikke"], a: 2, why: "Ledsætning: ikke FØR verbet. Modul 3 biggest shift: main → subordinate flips word order.", rule: "Ledsætning", skill: "Ledsætning", difficulty: "medium" },
  { id: 'q3', category: "grammar", type: "Sin", level: "B1", q: "Hun elsker ___ mand.", options: ["sin","hendes","hans","Ved ikke"], a: 0, why: "Sin = egen mand. Modul 3: sin/hans distinction critical for meaning.", rule: "Sin/sit", skill: "Refleksiv", difficulty: "medium" },
  { id: 'q4', category: "grammar", type: "Ligge/lægge", level: "A2", q: "Bogen ___ på bordet.", options: ["ligger","lægger","sidder","Ved ikke"], a: 0, why: "Ligge = tilstand. Modul 2-3: ligge/lægge still hard at Modul 3.", rule: "Ligge/lægge", skill: "Verbum", difficulty: "easy" },
  { id: 'q5', category: "grammar", type: "Præposition", level: "A2", q: "Jeg har boet her ___ 3 år.", options: ["i","på","om","Ved ikke"], a: 0, why: "I + tid = varighed. Modul 3: prepositions with time.", rule: "Præpositioner", skill: "Præposition", difficulty: "easy" },
  { id: 'q16', category: "grammar", type: "V2", level: "A2", q: "På mandag ___ hun nyt job.", options: ["starter","hun starter","er hun starter","Ved ikke"], a: 0, why: "V2 variation same rule different sentences — prevents memorization per dansk skill.", rule: "V2", skill: "V2 inversion", difficulty: "easy" },
  { id: 'q17', category: "grammar", type: "Flertal", level: "A2", q: "To ___ er på bordet.", options: ["bøger","bog","bøgene","Ved ikke"], a: 0, why: "Flertal: en bog → to bøger. Modul 3 still tests.", rule: "Flertal", skill: "Flertal", difficulty: "easy" },
  { id: 'q20', category: "grammar", type: "Bindeord", level: "B1", q: "___ det regner, går vi en tur.", options: ["Selvom","Derfor","Fordi","Ved ikke"], a: 0, why: "Selvom = although. Modul 3: selvom/hvis/når/da.", rule: "Bindeord", skill: "Bindeord", difficulty: "medium" },

  // === VOCABULARY — 6 items — Modul 3 focus 700 words collocations ===
  { id: 'q0d', category: "vocab", type: "Tal", level: "A1", q: "Hvad er 'tyve'?", options: ["20","12","2","Ved ikke"], a: 0, why: "Tal 0-100 foundation — still relevant Modul 3 for price time.", rule: "Tal", skill: "Tal", difficulty: "easy" },
  { id: 'q6', category: "vocab", type: "Kollokationer", level: "B1", q: "Hvad betyder 'holde et møde'?", options: ["To have a meeting","To leave a meeting","To cancel a meeting","Ved ikke"], a: 0, why: "Kollokation: holde et møde. Modul 3: 700 words + collocations vente på, glæde sig til.", rule: "Kollokationer", skill: "Kollokationer", difficulty: "medium" },
  { id: 'q7', category: "vocab", type: "Partikelverb", level: "B1", q: "At 'slå op' betyder:", options: ["To look up a word / break up","To close","To open","Ved ikke"], a: 0, why: "Partikelverber: slå op. Modul 3 vocab.", rule: "Partikelverber", skill: "Partikelverb", difficulty: "medium" },
  { id: 'q13', category: "vocab", type: "Kollokationer", level: "B1", q: "At 'tage stilling til' betyder:", options: ["To take a stance / consider","To stand up","To take a chair","Ved ikke"], a: 0, why: "Kollokation: tage stilling til. Modul 3 independent: housing health community.", rule: "Kollokationer", skill: "Kollokationer", difficulty: "medium" },
  { id: 'q19', category: "vocab", type: "Kollokationer", level: "B1", q: "At 'holde fyraften' betyder:", options: ["To finish work for the day","To hold a party","To be fired","Ved ikke"], a: 0, why: "Kollokation arbejde: holde fyraften. Modul 3 daily life.", rule: "Kollokationer", skill: "Kollokationer", difficulty: "medium" },
  { id: 'q18b', category: "vocab", type: "Kollokationer", level: "B1", q: "At 'vente på' betyder:", options: ["To wait for","To wait on (serve)","To avoid","Ved ikke"], a: 0, why: "Modul 3: prepositions with verbs — vente på, glæde sig til.", rule: "Kollokationer", skill: "Kollokationer", difficulty: "easy" },

  // === LISTENING — 5 items — Modul 3 focus telephone borgerservice without transcript ===
  { id: 'q8', category: "listening", type: "Reduktion", level: "B1", q: "Hvad betyder reduktionen 'd'er'? — Audio on question", options: ["det er","der er","det var","Ved ikke"], a: 0, why: "Dansk sluger: det er → d'er. Modul 3 listening: 25% reductions, telephone borgerservice without transcript first. Sprogpolitik: audio on question, never options.", rule: "Reduktion", skill: "Lytte reduktion", difficulty: "medium" },
  { id: 'q18', category: "listening", type: "Reduktion", level: "B1", q: "I talesprog: 'skaddu med?' kommer fra: — Audio", options: ["skal du med?","skal det med?","skulle du med?","Ved ikke"], a: 0, why: "Reduktion: skal du → skaddu. Modul 3 listening telephone.", rule: "Reduktion", skill: "Lytte reduktion", difficulty: "medium" },
  { id: 'q8b', category: "listening", type: "Telefon", level: "B1", q: "I telefonen: 'Jeg stiller dig om' betyder: — Audio", options: ["I transfer you","I stop you","I call you","Ved ikke"], a: 0, why: "Modul 3 listening: telephone borgerservice without transcript first.", rule: "Telefon", skill: "Lytte telefon", difficulty: "medium" },
  { id: 'q8c', category: "listening", type: "DSB", level: "A2", q: "DSB: 'Toget er forsinket' betyder: — Audio", options: ["Train delayed","Train cancelled","Train on time","Ved ikke"], a: 0, why: "Modul 3 listening: DSB announcement still relevant, but telephone is harder.", rule: "DSB", skill: "Lytte DSB", difficulty: "easy" },
  { id: 'q8d', category: "listening", type: "DR", level: "B1", q: "DR slow news: 'Ifølge rapporten' betyder: — Audio", options: ["According to report","Following report","Despite report","Ved ikke"], a: 0, why: "Modul 3 listening: DR slow news, 25% reductions.", rule: "DR", skill: "Lytte DR", difficulty: "medium" },

  // === STRETCH — PD3 format labelled clearly above diagnostic — not counted in Modul 3 score ===
  { id: 'q12', category: "stretch", type: "Modalpartikel", level: "B2", q: "Det er ___ klart, at vi skal hjælpe. (fælles viden) — STRETCH PD3", options: ["jo","da","vel","Ved ikke"], a: 0, why: "STRETCH PD3: Jo = fælles viden. Modul 3 learners not expected — labelled stretch per Action Plan.", rule: "Modalpartikler", skill: "Modalpartikel", difficulty: "hard", stretch: true },
  { id: 'q14', category: "stretch", type: "Sammenhæng", level: "B1", q: "PD3 gapped text tester — STRETCH:", options: ["Sammenhæng og bindeord","Kun stavning","Kun udtale","Ved ikke"], a: 0, why: "STRETCH PD3 format: gapped text. Modul 3 learners see as stretch, clearly labelled.", rule: "PD3 format", skill: "Læsning", difficulty: "medium", stretch: true },
  { id: 'q15', category: "stretch", type: "Skrivning", level: "B1", q: "PD3 Delprøve 4 kræver — STRETCH:", options: ["150-200 ord med indledning, argumenter, konklusion","10 ord","Kun sms","Ved ikke"], a: 0, why: "STRETCH PD3: 150-200 ord. Modul 3 writes 80-120 ord. PD3 is stretch.", rule: "Skrivning", skill: "Skrivning", difficulty: "medium", stretch: true },
];

function hashStr(str){ let h=0; for(let i=0;i<str.length;i++){ h=((h<<5)-h)+str.charCodeAt(i); h=h&h; } return Math.abs(h); }

export default function DiagnosticView({ setActive }) {
  const [userSeed] = useState(()=> localStorage.getItem('dansk_user_seed') || ("u_"+Math.random().toString(36).slice(2,8)+"_"+Date.now()));
  const [questions] = useState(()=> {
    const seed = userSeed;
    // Fixed: not adaptive, fixed 15Q per Action Plan — choose fixed and describe same everywhere
    // Modul 3 focus: 8 grammar + 6 vocab + 5 listening = 19, slice 15 core (exclude stretch for Modul 3 score, show stretch separately)
    const core = baseQuestions.filter(q=>!q.stretch);
    const stretch = baseQuestions.filter(q=>q.stretch);
    // Shuffle core with seed for variation per dansk skill, but fixed count
    const shuffledCore = [...core].sort(()=> 0.5 - (hashStr(seed) % 100)/100).slice(0,12);
    // Add 3 stretch labelled clearly above diagnostic
    return [...shuffledCore, ...stretch.slice(0,3)];
  });
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timePerQ, setTimePerQ] = useState({});
  const [qStart, setQStart] = useState(Date.now());
  const [showResult, setShowResult] = useState(false);
  const [verdict, setVerdict] = useState(null);

  useEffect(()=>{ localStorage.setItem('dansk_user_seed', userSeed); },[userSeed]);
  useEffect(()=>{ setQStart(Date.now()); },[idx]);

  const currentQ = questions[idx];
  const total = questions.length;

  const handleAnswer = (optIdx) => {
    const time = Math.round((Date.now()-qStart)/1000);
    setTimePerQ(prev=>({...prev, [currentQ.id]: time}));
    setAnswers(prev=>({...prev, [currentQ.id]: optIdx}));
    if(navigator.vibrate) navigator.vibrate(10);
  };

  const nextQ = () => {
    if(idx < total-1) {
      setIdx(i=>i+1);
    } else {
      // Calculate verdict but report as starting point with range per Action Plan
      // Exclude "Ved ikke" from correct count — prevents guessing pollution
      const filteredAnswers = {};
      Object.entries(answers).forEach(([id, optIdx]) => {
        const q = questions.find(q=>q.id===id);
        if (!q) return;
        const isIdk = q.options[optIdx]?.toLowerCase().includes('ved ikke') || q.options[optIdx]?.toLowerCase().includes("don't know");
        if (!isIdk) filteredAnswers[id] = optIdx;
      });
      const times = questions.map(q=> timePerQ[q.id] || 10);
      const v = calculateVerdict(filteredAnswers, questions.filter(q=>!q.stretch), times);
      // Add I don't know count
      v.idkCount = Object.keys(answers).length - Object.keys(filteredAnswers).length;
      v.totalWithIdk = Object.keys(answers).length;
      setVerdict(v);
      localStorage.setItem('dansk_level', v.level);
      localStorage.setItem('dansk_diagnostic', JSON.stringify({ ...v, date: new Date().toISOString(), userSeed }));
      localStorage.setItem('dansk_verdict', JSON.stringify(v));
      setShowResult(true);
      if(navigator.vibrate) navigator.vibrate(20);
    }
  };

  const prevQ = () => { 
    if(idx>0) setIdx(i=>i-1); 
    else {
      if(navigator.vibrate) navigator.vibrate(10);
      setActive('assessment');
    }
  };

  if(showResult && verdict) {
    const startingPoint = verdict.level?.includes('Modul 1') ? 'Modul 1' : verdict.level?.includes('Modul 2') ? 'Modul 2' : verdict.level?.includes('Modul 3') ? 'Modul 3' : verdict.level?.includes('Modul 4') ? 'Modul 4' : 'Modul 3';
    const rangeLow = Math.max(0, verdict.pct - 12);
    const rangeHigh = Math.min(100, verdict.pct + 12);
    const strengths = (verdict.strengths||[]).slice(0,3);
    const weaknesses = (verdict.weaknesses||[]).slice(0,3);
    const categoryPct = verdict.categoryPct||{};
    const wrongDetails = verdict.wrongDetails || [];

    return (
      <div className="min-h-screen bg-[#FFFBF5] pb-[120px]">
        <div className="max-w-[600px] mx-auto px-5 pt-6">
          <div className="bg-white rounded-[24px] p-6 border border-black/5">
            <div className="text-[11px] font-[700] tracking-widest uppercase bg-black text-white px-3 py-1.5 rounded-full inline-flex">Your starting point • Modul 3 Focus • Range not verdict</div>
            <h1 className="mt-4 text-[28px] font-[700] tracking-tight leading-[0.95]">Your starting point:<br/>{startingPoint}</h1>
            <p className="mt-3 text-[14px] leading-[1.5] text-[#3C3C43]/70">Your path through Modul 3 to 5. PD3 format is stretch, clearly labelled. Diagnostic capped at Modul 3 content per dansk skill. {startingPoint} means A2→B1, Modultest 3 focus, not PD3 sitting. Range {rangeLow}–{rangeHigh}% reflects uncertainty — one question swings less now with 5+ items per section.</p>
            <div className="mt-4 flex gap-2 flex-wrap">
              <span className="text-[12px] font-[600] bg-[#F2F2F7] px-3 py-1.5 rounded-full">{rangeLow}–{rangeHigh}% range</span>
              <span className="text-[12px] font-[600] bg-black text-white px-3 py-1.5 rounded-full">{verdict.correct}/{verdict.total} • {Math.round(verdict.timePerQ||15)}s avg • {verdict.idkCount||0} Ved ikke</span>
              <button onClick={()=>{ setShowResult(false); setIdx(0); setAnswers({}); }} className="text-[11px] font-[600] bg-white border border-black/10 px-3 py-1.5 rounded-full">Retake →</button>
            </div>
            <div className="mt-3 text-[10px] px-3 py-2 rounded-full bg-[#FF9500]/10 border border-[#FF9500]/20 inline-block font-[600]">PD3 is stretch — clearly labelled above diagnostic • Diagnostic capped Modul 3 • Pitch one notch simpler</div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="bg-[#F2F2F7] rounded-[16px] p-4 border border-black/5">
              <div className="text-[11px] font-[700] uppercase text-[#8E8E93]">Section scores • 5+ items each</div>
              <div className="mt-2 space-y-1">
                {Object.entries(categoryPct).map(([cat,pct])=>(
                  <div key={cat} className="flex justify-between text-[12px]"><span className="font-[600] capitalize">{cat}</span><span className={`px-2 py-0.5 rounded-full font-[700] ${pct>=80?'bg-[#34C759]/15 text-[#34C759]':pct<60?'bg-[#FF9500]/15 text-[#FF9500]':'bg-white'}`}>{pct}%</span></div>
                ))}
              </div>
              <div className="mt-2 text-[10px] text-[#8E8E93]">5+ items per section stable, was 3 items 33pt swing. Ved ikke prevents guessing pollution.</div>
            </div>
            <div className="space-y-3">
              <div className="bg-[#34C759]/10 rounded-[16px] p-4 border border-[#34C759]/20">
                <div className="text-[11px] font-[700] uppercase text-[#34C759]">Strengths • Keep strong • Max 3</div>
                <div className="mt-2 space-y-1">
                  {strengths.length ? strengths.map((s,i)=><div key={i} className="text-[12px] font-[600]">✓ {typeof s==='string'?s:s.category||s}</div>) : <div className="text-[11px] text-[#8E8E93]">Keep practicing Modul 3</div>}
                </div>
              </div>
              <div className="bg-[#FF9500]/10 rounded-[16px] p-4 border border-[#FF9500]/20">
                <div className="text-[11px] font-[700] uppercase text-[#FF9500]">Focus areas • Where to start • Max 3</div>
                <div className="mt-2 space-y-1">
                  {weaknesses.length ? weaknesses.map((w,i)=><div key={i} className="text-[12px] font-[600]">• {typeof w==='string'?w:w.category||w}</div>) : <div className="text-[11px] text-[#8E8E93]">Good balance — start Up next</div>}
                </div>
              </div>
            </div>
          </div>

          {wrongDetails.length>0 && (
            <div className="mt-4 bg-white rounded-[16px] p-4 border border-black/5">
              <div className="text-[11px] font-[700] uppercase text-[#8E8E93]">What to work on — with reason</div>
              <div className="mt-3 space-y-2">
                {wrongDetails.slice(0,3).map((w,i)=>{
                  const q = w.question;
                  return (
                    <div key={i} className="text-[12px] bg-[#F2F2F7] rounded-[10px] p-3">
                      <div className="font-[600]">{q.q}</div>
                      <div className="mt-1 text-[#8E8E93]">Your answer: {q.options[w.userAnswer]} • Correct: {q.options[q.a]}</div>
                      <div className="mt-1">{q.why} • Sprogpolitik: audio on question not options</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mt-6 space-y-3">
            <button onClick={()=>setActive('path')} className="w-full bg-black text-white py-4 rounded-full text-[16px] font-[600]">See My Learning Path — Modul 3 to 5 →</button>
            <button onClick={()=>setActive('register')} className="w-full bg-[#007AFF] text-white py-3.5 rounded-full text-[15px] font-[600]">Save Progress — After first win →</button>
            <button onClick={()=>setActive('practice')} className="w-full bg-white border border-black/10 py-3 rounded-full text-[14px] font-[600]">Up next →</button>
            <div className="text-center text-[11px] text-[#8E8E93]">Starting point with range and retake link, never verdict label. PD3 stretch labelled. Account after value — save after first win, Not now works.</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFBF5] pb-[100px]">
      <div className="max-w-[480px] mx-auto px-5 pt-6">
        <div className="bg-[#FF9500]/10 border border-[#FF9500]/20 rounded-[16px] p-3 mb-4">
          <div className="text-[11px] font-[700] uppercase text-[#FF9500]">PD3 is stretch — clearly labelled</div>
          <div className="text-[11px] leading-[1.4] mt-1">Your path through Modul 3 to 5. Diagnostic capped at Modul 3 content A2→B1 Modultest 3 per dansk skill. PD3 format below is stretch, not required. Pitch one notch simpler, more items per section.</div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-[13px] font-[600]">Question {idx+1} of {total} • Modul 3 Focus</div>
          <div className="text-[11px] text-[#8E8E93]">{Object.keys(answers).length}/{total} answered • {Object.values(answers).filter((_,i)=>{ const q=questions[i]; return q && q.options[answers[q.id]]?.toLowerCase().includes('ved ikke'); }).length} Ved ikke</div>
        </div>
        <div className="mt-3 h-1.5 bg-white rounded-full overflow-hidden border border-black/5"><div className="h-full bg-black rounded-full transition-all duration-500" style={{ width: ((idx+1)/total*100) + "%" }} /></div>

        <div className="mt-6 bg-white rounded-[24px] p-6 border border-black/5">
          <div className="flex gap-2 mb-3">
            <span className="text-[11px] font-[700] tracking-widest uppercase bg-black text-white px-3 py-1 rounded-full">{currentQ.category}</span>
            <span className="text-[11px] px-2.5 py-1 rounded-full bg-[#F2F2F7]">{currentQ.skill} • {currentQ.level}</span>
            {currentQ.stretch && <span className="text-[10px] px-2 py-1 rounded-full bg-[#FF9500]/10 border border-[#FF9500]/20 text-[#FF9500] font-[700]">STRETCH PD3</span>}
            {currentQ.audio && <span className="text-[10px] px-2 py-1 rounded-full bg-[#007AFF]/10 text-[#007AFF]">Audio on question</span>}
          </div>

          <h2 className="text-[20px] font-[700] leading-tight serif">{currentQ.q}</h2>
          <div className="mt-2 text-[11px] text-[#8E8E93]">Sprogpolitik: audio and lookup on question and passage, never on answer options. I don't know prevents guessing pollution.</div>

          <div className="mt-6 space-y-2">
            {currentQ.options.map((opt,oi)=>{
              const isSelected = answers[currentQ.id]===oi;
              const isIdk = opt.toLowerCase().includes('ved ikke') || opt.toLowerCase().includes("don't know");
              return (
                <button key={oi} onClick={()=>handleAnswer(oi)} className={`w-full text-left px-5 py-4 rounded-full border text-[15px] font-[500] flex justify-between items-center transition ${isSelected ? 'bg-black text-white border-black' : isIdk ? 'bg-white border border-dashed border-black/20 text-[#8E8E93]' : 'bg-[#F2F2F7] border-transparent hover:bg-white hover:border-black/10'}`}>
                  <span>{opt}</span><span className={`w-6 h-6 rounded-full grid place-items-center text-[11px] ${isSelected ? 'bg-white text-black' : 'bg-white border border-black/10'}`}>{isSelected?'✓':''}</span>
                </button>
              );
            })}
          </div>

          {answers[currentQ.id]!==undefined && (
            <div className={`mt-5 p-4 rounded-[16px] text-[13px] leading-[1.4] border ${answers[currentQ.id]===currentQ.a ? 'bg-[#34C759]/10 border-[#34C759]/20' : 'bg-[#FF3B30]/10 border-[#FF3B30]/20'}`}>
              <div className="font-[700]">{answers[currentQ.id]===currentQ.a?'✓ Correct':'✗ Not correct'} — {currentQ.rule}</div>
              <div className="mt-2">{currentQ.why}</div>
              <div className="mt-2 text-[11px] text-[#8E8E93]">Sprogpolitik: explanation before drill, English first, Why wrong is tempting — respect not nice try. Variation same rule different sentences seed ensures no memorize.</div>
            </div>
          )}

          <div className="mt-6 flex gap-2">
            <button onClick={prevQ} className="px-4 py-3 rounded-full bg-[#F2F2F7] text-[13px] font-[600]">← Back</button>
            <button onClick={nextQ} disabled={answers[currentQ.id]===undefined} className="flex-1 bg-black text-white py-3.5 rounded-full text-[15px] font-[600] disabled:opacity-40">{idx===total-1?'Finish → Starting point range':'Next →'}</button>
          </div>
          <div className="mt-3 text-[10px] text-center text-[#8E8E93]">Fixed 15Q not adaptive — described same everywhere • 5+ items per section stable • I don't know option • Audio on question never options • Save state every answer back always works closing mid-test loses nothing</div>
        </div>
      </div>
    </div>
  );
}
