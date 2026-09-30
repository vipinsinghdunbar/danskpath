import { useState, useEffect } from 'react';
import { generateQuestionSet } from '../lib/variationEngine';
import { calculateVerdict } from '../lib/verdictEngine';

const baseQuestions = [
  { id: 'q0a', category: "grammar", type: "Alfabet", level: "A1", q: "Hvor mange vokaler har dansk? (a e i o u æ ø å)", options: ["9 vokaler","5 vokaler","7 vokaler"], a: 0, why: "Dansk har 9 vokaler inkl æ ø å.", rule: "Alfabet", skill: "Alfabet" },
  { id: 'q0b', category: "grammar", type: "SVO", level: "A1", q: "Vælg korrekt SVO:", options: ["Jeg hedder Ali","Hedder jeg Ali","Jeg Ali hedder"], a: 0, why: "S-V-O altid i hovedsætning.", rule: "SVO", skill: "SVO" },
  { id: 'q0c', category: "grammar", type: "Køn", level: "A1", q: "___ hus", options: ["et hus","en hus","huset en"], a: 0, why: "et hus, en bil.", rule: "Køn", skill: "en/et" },
  { id: 'q0d', category: "vocab", type: "Tal", level: "A1", q: "Hvad er 'tyve'?", options: ["20","12","2"], a: 0, why: "tyve=20.", rule: "Tal", skill: "Tal" },
  { id: 'q0e', category: "grammar", type: "Nutid", level: "A1", q: "Jeg ___ i Aarhus (bo)", options: ["bor","boer","bo"], a: 0, why: "nutid -r. at bo → bor.", rule: "Nutid", skill: "Nutid" },
  { id: 'q1', category: "grammar", type: "V2", level: "A2", q: "Vælg korrekt: ___ arbejder jeg hjemme.", options: ["I dag","I dag jeg","I dag er jeg"], a: 0, why: "V2: tid først → inversion.", rule: "V2", skill: "V2" },
  { id: 'q2', category: "grammar", type: "Ledsætning", level: "B1", q: "Jeg ved, at han ___ kommer.", options: ["ikke","kommer ikke","ikke kommer"], a: 2, why: "Ledsætning: ikke FØR verbet.", rule: "Ledsætning", skill: "Ledsætning" },
  { id: 'q3', category: "grammar", type: "Sin", level: "B1", q: "Hun elsker ___ mand.", options: ["sin","hendes","hans"], a: 0, why: "Sin = egen mand.", rule: "Sin/sit", skill: "Refleksiv" },
  { id: 'q4', category: "grammar", type: "Ligge/lægge", level: "A2", q: "Bogen ___ på bordet.", options: ["ligger","lægger","sidder"], a: 0, why: "Ligge = tilstand.", rule: "Ligge/lægge", skill: "Verbum" },
  { id: 'q5', category: "grammar", type: "Præposition", level: "A2", q: "Jeg har boet her ___ 3 år.", options: ["i","på","om"], a: 0, why: "'I' + tid = varighed.", rule: "Præpositioner", skill: "Præposition" },
  { id: 'q6', category: "vocab", type: "Kollokationer", level: "B1", q: "Hvad betyder 'holde et møde'?", options: ["To have a meeting","To leave a meeting","To cancel"], a: 0, why: "holde et møde = have a meeting.", rule: "Kollokationer", skill: "Kollokationer" },
  { id: 'q7', category: "vocab", type: "Partikelverb", level: "B1", q: "At 'slå op' betyder:", options: ["To look up / break up","To close","To open"], a: 0, why: "slå op = look up.", rule: "Partikelverber", skill: "Partikelverb" },
  { id: 'q8', category: "listening", type: "Reduktion", level: "B1", q: "Hvad betyder 'd'er'?", options: ["det er","der er","det var"], a: 0, why: "det er → d'er.", rule: "Reduktion", skill: "Lytte" },
  { id: 'q9', category: "culture", type: "Samfund", level: "B1", q: "Hvor mange medlemmer i Folketinget?", options: ["179","150","200"], a: 0, why: "179 medlemmer.", rule: "Samfund", skill: "Samfund" },
  { id: 'q10', category: "culture", type: "Arbejdsmarked", level: "B1", q: "Hvad er 'flexicurity'?", options: ["Let at fyre + dagpenge + aktiv indsats","Kun lav skat","Kun høj løn"], a: 0, why: "Dansk model.", rule: "Arbejdsmarked", skill: "Kultur" },
  { id: 'q11', category: "grammar", type: "Relativ", level: "B1", q: "Det er manden, ___ bor ved siden af.", options: ["der","som","hvis"], a: 0, why: "Der = subjekt.", rule: "Relativ", skill: "Relativ" },
  { id: 'q12', category: "grammar", type: "Modalpartikel", level: "B2", q: "Det er ___ klart, at vi skal hjælpe. (fælles viden)", options: ["jo","da","vel"], a: 0, why: "Jo = fælles viden.", rule: "Modalpartikler", skill: "Modalpartikel" },
  { id: 'q13', category: "vocab", type: "Kollokationer", level: "B1", q: "At 'tage stilling til' betyder:", options: ["To take a stance","To stand up","To take a chair"], a: 0, why: "tage stilling til = stance.", rule: "Kollokationer", skill: "Kollokationer" },
  { id: 'q14', category: "reading", type: "Sammenhæng", level: "B1", q: "PD3 gapped text tester:", options: ["Sammenhæng og bindeord","Kun stavning","Kun udtale"], a: 0, why: "Sammenhæng og bindeord.", rule: "PD3 format", skill: "Læsning" },
  { id: 'q15', category: "writing", type: "Skrivning", level: "B1", q: "PD3 Delprøve 4 kræver:", options: ["150-200 ord med indledning, argumenter, konklusion","10 ord","Kun sms"], a: 0, why: "150-200 ord struktur.", rule: "Skrivning", skill: "Skrivning" },
];

function hashStr(str){ let h=0; for(let i=0;i<str.length;i++){ h=((h<<5)-h)+str.charCodeAt(i); h=h&h; } return Math.abs(h); }

export default function DiagnosticView({ setActive }) {
  const [userSeed] = useState(()=> localStorage.getItem('dansk_user_seed') || ("u_"+Math.random().toString(36).slice(2,8)+"_"+Date.now()));
  const [questions] = useState(()=> {
    const seed = userSeed;
    const varied = generateQuestionSet(seed, 5);
    const shuffled = [...baseQuestions].sort(()=> 0.5 - (hashStr(seed) % 100)/100).slice(0,15);
    return shuffled.map((q,i)=> i<5 && varied[i] ? { ...q, q: varied[i].q || q.q, options: varied[i].options || q.options } : q);
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
      const times = questions.map(q=> timePerQ[q.id] || 10);
      const v = calculateVerdict(answers, questions, times);
      setVerdict(v);
      localStorage.setItem('dansk_level', v.level);
      localStorage.setItem('dansk_diagnostic', JSON.stringify({ ...v, date: new Date().toISOString(), userSeed }));
      localStorage.setItem('dansk_verdict', JSON.stringify(v));
      setShowResult(true);
      if(navigator.vibrate) navigator.vibrate(20);
    }
  };

  const prevQ = () => { if(idx>0) setIdx(i=>i-1); };

  if(showResult && verdict) {
    const strengths = (verdict.strengths||[]).map(s=> typeof s==='string' ? { category: s, pct: 80 } : s);
    const weaknesses = (verdict.weaknesses||[]).map(w=> typeof w==='string' ? { category: w, pct: 50, types: [] } : w);
    const borderline = (verdict.borderline||[]).map(b=> typeof b==='string' ? { category: b, pct: 65 } : b);
    const typeWeak = verdict.typeWeaknesses||[];
    const path = verdict.recommendedPath || verdict.path || [];
    const timeline = typeof verdict.timeline === 'string' ? { text: verdict.timeline, months: '?', breakdown: verdict.timeline } : verdict.timeline || { text: '3-6 months', months: 4, breakdown: '' };
    const categoryPct = verdict.categoryPct||{};
    const wrongDetails = verdict.wrongDetails || [];

    return (
      <div className="min-h-screen bg-[#FFFBF5] pb-[120px]">
        <div className="max-w-[600px] mx-auto px-5 pt-6">
          {/* Simple result header per spec — level + section scores immediately useful, avoid % on top */}
          <div className="bg-white rounded-[24px] p-6 border border-black/5">
            <div className="text-[11px] font-[700] tracking-widest uppercase bg-black text-white px-3 py-1.5 rounded-full inline-flex">Dit niveau • {verdict.level}</div>
            <h1 className="mt-4 text-[28px] font-[700] tracking-tight leading-[0.95]">{verdict.level}</h1>
            <div className="mt-2 text-[14px] text-[#3C3C43]/70">{verdict.correct}/{verdict.total} rigtige • {Math.round(verdict.timePerQ||15)}s per spørgsmål</div>
            
            {/* Section scores — per spec immediately useful */}
            <div className="mt-6 grid grid-cols-2 gap-2">
              {Object.entries(categoryPct).map(([cat,pct])=>(
                <div key={cat} className="bg-[#F2F2F7] rounded-[12px] p-3 flex justify-between items-center">
                  <span className="text-[12px] font-[600] capitalize">{cat}</span>
                  <span className={`text-[13px] font-[700] px-2 py-1 rounded-full ${pct>=75?'bg-[#34C759]/15 text-[#34C759]':pct<60?'bg-[#FF9500]/15 text-[#FF9500]':'bg-white'}`}>{pct}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="bg-[#34C759]/10 rounded-[16px] p-4 border border-[#34C759]/20">
              <div className="text-[11px] font-[700] uppercase text-[#34C759]">Stærke sider</div>
              <div className="mt-2 space-y-1">
                {strengths.length ? strengths.map((s,i)=><div key={i} className="text-[13px] font-[600]">✓ {s.category} {s.pct}%</div>) : <div className="text-[12px] text-[#8E8E93]">Ingen endnu — bliv ved</div>}
              </div>
            </div>
            <div className="bg-[#FF9500]/10 rounded-[16px] p-4 border border-[#FF9500]/20">
              <div className="text-[11px] font-[700] uppercase text-[#FF9500]">Fokusområder</div>
              <div className="mt-2 space-y-1">
                {weaknesses.length ? weaknesses.map((w,i)=><div key={i} className="text-[13px] font-[600]">• {w.category} {w.pct}%</div>) : <div className="text-[12px] text-[#8E8E93]">God balance</div>}
              </div>
            </div>
          </div>

          {wrongDetails.length>0 && (
            <div className="mt-4 bg-white rounded-[16px] p-4 border border-black/5">
              <div className="text-[11px] font-[700] uppercase text-[#8E8E93]">Hvad gik galt</div>
              <div className="mt-3 space-y-2">
                {wrongDetails.slice(0,3).map((w,i)=>{
                  const q = w.question;
                  return (
                    <div key={i} className="text-[12px] bg-[#F2F2F7] rounded-[10px] p-3">
                      <div className="font-[600]">{q.q}</div>
                      <div className="mt-1 text-[#8E8E93]">Dit svar: {q.options[w.userAnswer]} • Rigtigt: {q.options[q.a]}</div>
                      <div className="mt-1">{q.why}</div>
                    </div>
                  );
                })}
                {wrongDetails.length>3 && <div className="text-[11px] text-[#8E8E93]">+{wrongDetails.length-3} flere fejl — se i Path</div>}
              </div>
            </div>
          )}

          <div className="mt-4 bg-white rounded-[16px] p-4 border border-black/5">
            <div className="text-[11px] font-[700] uppercase text-[#8E8E93]">Din vej</div>
            <div className="mt-3 space-y-2">
              {path.slice(0,3).map((p,i)=>(
                <div key={i} className="flex gap-2">
                  <div className="w-6 h-6 rounded-full bg-black text-white grid place-items-center text-[10px] font-bold shrink-0">{i+1}</div>
                  <div className="text-[13px] font-[600]">{p.title}</div>
                </div>
              ))}
            </div>
            <div className="mt-3 text-[12px] bg-black text-white rounded-[12px] p-3">{timeline.text}</div>
          </div>

          <div className="mt-6 space-y-3">
            <button onClick={()=>setActive('path')} className="w-full bg-black text-white py-4 rounded-full text-[16px] font-[600]">See My Learning Path →</button>
            <button onClick={()=>setActive('register')} className="w-full bg-[#007AFF] text-white py-3.5 rounded-full text-[15px] font-[600]">Start Learning → Create Account</button>
            <button onClick={()=>setActive('practice')} className="w-full bg-white border border-black/10 py-3 rounded-full text-[14px] font-[600]">Go to practice →</button>
            <div className="text-center text-[11px] text-[#8E8E93]">No account required to see results • Create account to save journey</div>
          </div>
        </div>
      </div>
    );
  }

  // Clean distraction-free Test=only test per spec — no learning path, no excessive text
  return (
    <div className="min-h-screen bg-[#FFFBF5] pb-[100px]">
      <div className="max-w-[480px] mx-auto px-5 pt-6">
        <div className="flex items-center justify-between">
          <div className="text-[13px] font-[600]">Question {idx+1} of {total}</div>
          <div className="text-[11px] text-[#8E8E93]">{Object.keys(answers).length}/{total} answered</div>
        </div>
        <div className="mt-3 h-1.5 bg-white rounded-full overflow-hidden border border-black/5"><div className="h-full bg-black rounded-full transition-all duration-500" style={{ width: ((idx+1)/total*100) + "%" }} /></div>

        <div className="mt-8 bg-white rounded-[24px] p-6 border border-black/5">
          <h2 className="text-[20px] font-[700] leading-tight">{currentQ.q}</h2>

          <div className="mt-6 space-y-2">
            {currentQ.options.map((opt,oi)=>{
              const isSelected = answers[currentQ.id]===oi;
              return (
                <button key={oi} onClick={()=>handleAnswer(oi)} className={`w-full text-left px-5 py-4 rounded-full border text-[15px] font-[500] flex justify-between items-center transition ${isSelected ? 'bg-black text-white border-black' : 'bg-[#F2F2F7] border-transparent hover:bg-white hover:border-black/10'}`}>
                  <span>{opt}</span><span className={`w-6 h-6 rounded-full grid place-items-center text-[11px] ${isSelected ? 'bg-white text-black' : 'bg-white border border-black/10'}`}>{isSelected?'✓':''}</span>
                </button>
              );
            })}
          </div>

          {answers[currentQ.id]!==undefined && (
            <div className={`mt-5 p-4 rounded-[16px] text-[13px] leading-[1.4] border ${answers[currentQ.id]===currentQ.a ? 'bg-[#34C759]/10 border-[#34C759]/20' : 'bg-[#FF3B30]/10 border-[#FF3B30]/20'}`}>
              <div className="font-[700]">{answers[currentQ.id]===currentQ.a?'✓ Correct':'✗ Not correct'} — {currentQ.rule}</div>
              <div className="mt-2">{currentQ.why}</div>
            </div>
          )}

          <div className="mt-6 flex gap-2">
            <button onClick={prevQ} disabled={idx===0} className="px-4 py-3 rounded-full bg-[#F2F2F7] text-[13px] font-[600] disabled:opacity-40">← Back</button>
            <button onClick={nextQ} disabled={answers[currentQ.id]===undefined} className="flex-1 bg-black text-white py-3.5 rounded-full text-[15px] font-[600] disabled:opacity-40">{idx===total-1?'Finish → See level':'Next →'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
