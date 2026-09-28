import { useState, useEffect } from 'react';
import { generateQuestionSet } from '../lib/variationEngine';
import { calculateVerdict } from '../lib/verdictEngine';
import { shuffleOptions } from '../lib/shuffleAnswers';
import InstructionsView from './InstructionsView';

// Base questions — clean, no internal labels visible to learner
const baseQuestions = [
  { id: 'q0a', q: "Hvor mange vokaler har dansk?", options: ["9 vokaler", "5 vokaler", "7 vokaler"], a: 0 },
  { id: 'q0b', q: "Vælg korrekt: ___", options: ["Jeg hedder Ali", "Hedder jeg Ali", "Jeg Ali hedder"], a: 0 },
  { id: 'q0c', q: "___ hus", options: ["et hus", "en hus", "huset en"], a: 0 },
  { id: 'q0d', q: "Hvad er 'tyve'?", options: ["20", "12", "2"], a: 0 },
  { id: 'q0e', q: "Jeg ___ i Aarhus (bo)", options: ["bor", "boer", "bo"], a: 0 },
  { id: 'q1', q: "Vælg korrekt: ___ arbejder jeg hjemme.", options: ["I dag", "I dag jeg", "I dag er jeg"], a: 0 },
  { id: 'q2', q: "Jeg ved, at han ___ kommer.", options: ["ikke", "kommer ikke", "ikke kommer"], a: 2 },
  { id: 'q3', q: "Hun elsker ___ mand.", options: ["sin", "hendes", "hans"], a: 0 },
  { id: 'q4', q: "Bogen ___ på bordet.", options: ["ligger", "lægger", "sidder"], a: 0 },
  { id: 'q5', q: "Jeg har boet her ___ 3 år.", options: ["i", "på", "om"], a: 0 },
  { id: 'q6', q: "Hvad betyder 'holde et møde'?", options: ["To have a meeting", "To leave a meeting", "To cancel a meeting"], a: 0 },
  { id: 'q7', q: "At 'slå op' betyder:", options: ["To look up a word / break up", "To close", "To open"], a: 0 },
  { id: 'q8', q: "Hvad betyder 'd'er'?", options: ["det er", "der er", "det var"], a: 0 },
  { id: 'q9', q: "Hvor mange medlemmer i Folketinget?", options: ["179", "150", "200"], a: 0 },
  { id: 'q10', q: "Hvad er 'flexicurity'?", options: ["Let at fyre + dagpenge + aktiv indsats", "Kun lav skat", "Kun høj løn"], a: 0 },
  { id: 'q11', q: "Det er manden, ___ bor ved siden af.", options: ["der", "som", "hvis"], a: 0 },
  { id: 'q12', q: "Det er ___ klart, at vi skal hjælpe.", options: ["jo", "da", "vel"], a: 0 },
  { id: 'q13', q: "At 'tage stilling til' betyder:", options: ["To take a stance / consider", "To stand up", "To take a chair"], a: 0 },
  { id: 'q14', q: "PD3 gapped text tester:", options: ["Sammenhæng og bindeord", "Kun stavning", "Kun udtale"], a: 0 },
  { id: 'q15', q: "PD3 Delprøve 4 kræver:", options: ["150-200 ord med struktur", "10 ord", "Kun sms"], a: 0 },
];

function hashStr(str){ let h=0; for(let i=0;i<str.length;i++){ h=((h<<5)-h)+str.charCodeAt(i); h=h&h; } return Math.abs(h); }

export default function DiagnosticView({ setActive }) {
  const [userSeed] = useState(()=> localStorage.getItem('dansk_user_seed') || ("u_"+Math.random().toString(36).slice(2,8)+"_"+Date.now()));
  const [showInstructions, setShowInstructions] = useState(true);
  const [questions, setQuestions] = useState(()=> {
    const seed = userSeed;
    const varied = generateQuestionSet(seed, 5);
    const shuffledBase = [...baseQuestions].sort(()=> 0.5 - (hashStr(seed) % 100)/100).slice(0,15);
    
    const mixed = shuffledBase.map((q,i)=> {
      const baseQ = i<5 && varied[i] ? { ...q, q: varied[i].q || q.q, options: varied[i].options || q.options } : q;
      const shuffleSeed = `${seed}_${baseQ.id}_${i}`;
      return shuffleOptions(baseQ, shuffleSeed);
    });
    
    return mixed;
  });
  
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [verdict, setVerdict] = useState(null);

  useEffect(()=>{ localStorage.setItem('dansk_user_seed', userSeed); },[userSeed]);

  const currentQ = questions[idx];
  const total = questions.length;
  const progress = ((idx+1)/total)*100;
  const answeredCount = Object.keys(answers).length;

  const handleAnswer = (optIdx) => {
    const newAnswers = {...answers, [currentQ.id]: optIdx};
    setAnswers(newAnswers);
    if(navigator.vibrate) navigator.vibrate(10);
    
    setTimeout(() => {
      if(idx < total-1) {
        setIdx(i=>i+1);
      } else {
        try {
          const finalVerdict = calculateVerdict(newAnswers, questions, []);
          // Fix verdict structure for UI — ensure safe values
          const safeVerdict = {
            ...finalVerdict,
            // Extract string values from object arrays
            strengthsList: (finalVerdict.strengths || []).map(s => typeof s === 'string' ? s : s.category || s.type || 'Styrke').slice(0,4),
            weaknessesList: (finalVerdict.weaknesses || []).map(w => typeof w === 'string' ? w : w.category || w.type || 'Fokus').slice(0,4),
            timelineText: typeof finalVerdict.timeline === 'string' ? finalVerdict.timeline : finalVerdict.timeline?.text || `${finalVerdict.timeline?.months || 3} måneder til næste niveau`,
            timelineMonths: finalVerdict.timeline?.months || 3
          };
          setVerdict(safeVerdict);
          localStorage.setItem('dansk_level', finalVerdict.level);
          localStorage.setItem('dansk_diagnostic', JSON.stringify({ ...finalVerdict, date: new Date().toISOString(), userSeed }));
          localStorage.setItem('dansk_verdict', JSON.stringify(finalVerdict));
          localStorage.setItem('dansk_welcomed', 'true');
          setShowResult(true);
          if(navigator.vibrate) navigator.vibrate([20, 30, 20]);
        } catch (e) {
          console.error('Verdict error:', e);
          // Fallback verdict if calculation fails
          const fallback = {
            pct: Math.round(Object.keys(newAnswers).length / total * 70),
            correct: Object.keys(newAnswers).length,
            total: total,
            level: "Modul 2 (A1-A2)",
            strengthsList: ["Grammatik", "Ordforråd"],
            weaknessesList: ["Lytning", "Skrivning"],
            timelineText: "3-4 måneder til næste niveau",
            timelineMonths: 3,
            strengths: [],
            weaknesses: []
          };
          setVerdict(fallback);
          localStorage.setItem('dansk_level', fallback.level);
          localStorage.setItem('dansk_diagnostic', JSON.stringify({ ...fallback, date: new Date().toISOString(), userSeed }));
          setShowResult(true);
        }
      }
    }, 280);
  };

  const nextQ = () => {
    if(idx < total-1) {
      setIdx(i=>i+1);
    } else {
      try {
        const v = calculateVerdict(answers, questions, []);
        const safeVerdict = {
          ...v,
          strengthsList: (v.strengths || []).map(s => typeof s === 'string' ? s : s.category || s.type || 'Styrke').slice(0,4),
          weaknessesList: (v.weaknesses || []).map(w => typeof w === 'string' ? w : w.category || w.type || 'Fokus').slice(0,4),
          timelineText: typeof v.timeline === 'string' ? v.timeline : v.timeline?.text || `${v.timeline?.months || 3} måneder til næste niveau`,
          timelineMonths: v.timeline?.months || 3
        };
        setVerdict(safeVerdict);
        localStorage.setItem('dansk_level', v.level);
        localStorage.setItem('dansk_diagnostic', JSON.stringify({ ...v, date: new Date().toISOString(), userSeed }));
        localStorage.setItem('dansk_verdict', JSON.stringify(v));
        localStorage.setItem('dansk_welcomed', 'true');
        setShowResult(true);
        if(navigator.vibrate) navigator.vibrate([20, 30, 20]);
      } catch (e) {
        console.error('Verdict error:', e);
        const fallback = {
          pct: 65,
          correct: Object.keys(answers).length,
          total: total,
          level: "Modul 2 (A1-A2)",
          strengthsList: ["Grammatik"],
          weaknessesList: ["Lytning"],
          timelineText: "3-4 måneder",
          timelineMonths: 3,
          strengths: [],
          weaknesses: []
        };
        setVerdict(fallback);
        setShowResult(true);
      }
    }
  };

  const prevQ = () => { 
    if(idx>0) {
      setIdx(i=>i-1);
      if(navigator.vibrate) navigator.vibrate(10);
    }
  };

  if (showInstructions) {
    return (
      <InstructionsView 
        totalQuestions={total}
        onStart={() => {
          setShowInstructions(false);
          if(navigator.vibrate) navigator.vibrate(10);
        }}
        onBack={() => setActive('assessment')}
      />
    );
  }

  // Apple Premium Results — native iOS feel, materials, blur, premium typography
  if(showResult && verdict) {
    return (
      <div className="min-h-[100dvh] bg-[#FFFBF5] flex flex-col relative overflow-hidden">
        {/* Subtle gradient background — Apple premium */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFFBF5] via-[#FFFBF5] to-[#FFF8F0] pointer-events-none" />
        <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-[#E3EDEA]/40 rounded-full blur-[60px] pointer-events-none" />
        <div className="absolute top-[200px] right-[-80px] w-[200px] h-[200px] bg-[#FBE8E2]/30 rounded-full blur-[50px] pointer-events-none" />
        
        <div className="h-[env(safe-area-inset-top)] bg-transparent shrink-0 relative z-10" />
        
        <div className="flex-1 px-6 pb-[calc(16px+env(safe-area-inset-bottom))] max-w-[390px] mx-auto w-full overflow-y-auto no-scrollbar relative z-10">
          {/* Celebration — Apple premium */}
          <div className="pt-8 pb-6 text-center">
            <div className="relative inline-block">
              <div className="w-24 h-24 rounded-[28px] bg-[#121417] text-white grid place-items-center shadow-[0_12px_32px_rgba(18,20,23,0.18),0_4px_12px_rgba(18,20,23,0.12)] relative overflow-hidden">
                {/* Subtle inner highlight — Apple premium */}
                <div className="absolute inset-[1px] rounded-[27px] bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                <div className="relative">
                  <div className="text-[32px] font-[800] tracking-[-0.02em] leading-none">{verdict.pct}%</div>
                  <div className="text-[10px] font-[600] tracking-widest uppercase opacity-60 mt-1">Resultat</div>
                </div>
              </div>
              {/* Glow */}
              <div className="absolute inset-0 w-24 h-24 rounded-[28px] bg-[#121417]/20 blur-[20px] -z-10" />
            </div>
            
            <h1 className="mt-6 text-[30px] font-[700] tracking-[-0.03em] leading-[1.05] text-[#121417] font-[Outfit]">
              Dit niveau er<br/>
              <span className="bg-gradient-to-r from-[#121417] to-[#6B8A7F] bg-clip-text text-transparent">
                {verdict.level}
              </span>
            </h1>
            <p className="mt-3 text-[15px] leading-[1.5] text-[#6B6B6B] max-w-[300px] mx-auto font-[400]">
              {verdict.correct} ud af {verdict.total} rigtige • Din personlige vej er klar
            </p>
          </div>

          {/* Apple premium cards — materials, blur */}
          <div className="space-y-3">
            {verdict.strengthsList && verdict.strengthsList.length > 0 && (
              <div className="bg-white/80 backdrop-blur-[20px] rounded-[20px] p-5 border border-[#E8E0D6]/50 shadow-[0_2px_16px_rgba(18,20,23,0.04),0_1px_4px_rgba(18,20,23,0.03)]">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#121417] text-white grid place-items-center">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6L4.5 8.5L10 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="text-[13px] font-[600] tracking-[-0.01em] text-[#121417]">Dine styrker</div>
                </div>
                <div className="mt-3.5 flex flex-wrap gap-2">
                  {verdict.strengthsList.map((s, i)=>(
                    <span key={i} className="text-[12px] font-[600] bg-[#121417] text-white px-3.5 py-2 rounded-full tracking-[-0.01em] shadow-[0_1px_4px_rgba(18,20,23,0.08)]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {verdict.weaknessesList && verdict.weaknessesList.length > 0 && (
              <div className="bg-white/80 backdrop-blur-[20px] rounded-[20px] p-5 border border-[#E8E0D6]/50 shadow-[0_2px_16px_rgba(18,20,23,0.04),0_1px_4px_rgba(18,20,23,0.03)]">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#FFF8F0] border border-[#E8E0D6] grid place-items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D88C7A]" />
                  </div>
                  <div className="text-[13px] font-[600] tracking-[-0.01em] text-[#121417]">Fokusområder</div>
                </div>
                <div className="mt-3.5 flex flex-wrap gap-2">
                  {verdict.weaknessesList.map((s, i)=>(
                    <span key={i} className="text-[12px] font-[500] bg-[#FFF8F0] border border-[#E8E0D6] text-[#6B6B6B] px-3.5 py-2 rounded-full tracking-[-0.01em]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Premium dark card — Apple */}
            <div className="bg-[#121417] rounded-[24px] p-6 text-white relative overflow-hidden shadow-[0_8px_24px_rgba(18,20,23,0.15),0_2px_8px_rgba(18,20,23,0.1)]">
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-transparent pointer-events-none" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#8AA99E]/10 rounded-full blur-[30px] pointer-events-none" />
              
              <div className="relative">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-white/10 grid place-items-center">
                    <div className="w-2 h-2 rounded-full bg-[#8AA99E] animate-pulse" />
                  </div>
                  <div className="text-[11px] font-[700] tracking-[0.08em] uppercase opacity-60">Din læringsvej</div>
                </div>
                <div className="mt-3 text-[15px] leading-[1.5] font-[500] tracking-[-0.01em]">
                  Vi starter med det der giver dig mest fremgang. Din vej er bygget ud fra dine svar — ikke fra begyndelsen.
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <div className="h-[1px] flex-1 bg-white/10" />
                  <div className="text-[12px] font-[500] opacity-70 tracking-[-0.01em]">
                    {verdict.timelineText}
                  </div>
                  <div className="h-[1px] flex-1 bg-white/10" />
                </div>
              </div>
            </div>
          </div>

          {/* Next steps — Apple premium, clear hierarchy */}
          <div className="mt-8">
            <div className="text-[11px] font-[700] tracking-[0.08em] uppercase text-[#8E8E93] mb-3 px-1">Næste skridt</div>
            
            <div className="space-y-3">
              <button 
                onClick={()=>{
                  if(navigator.vibrate) navigator.vibrate(10);
                  setActive('path');
                }} 
                className="w-full h-[56px] bg-[#121417] text-white rounded-full text-[17px] font-[600] tracking-[-0.01em] shadow-[0_8px_24px_rgba(18,20,23,0.18),0_2px_8px_rgba(18,20,23,0.12)] active:scale-[0.98] active:shadow-[0_2px_8px_rgba(18,20,23,0.1)] transition-all flex items-center justify-center gap-2 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/[0.08] to-white/0 translate-x-[-100%] group-active:translate-x-[100%] transition-transform duration-700" />
                <span className="relative">Se min læringsvej</span>
                <span className="relative text-[18px]">→</span>
              </button>
              
              <button 
                onClick={()=>{
                  if(navigator.vibrate) navigator.vibrate(10);
                  setActive('practice');
                }} 
                className="w-full h-[52px] bg-white/80 backdrop-blur-[20px] border border-[#E8E0D6]/60 rounded-full text-[15px] font-[600] tracking-[-0.01em] text-[#121417] shadow-[0_2px_12px_rgba(18,20,23,0.04)] active:scale-[0.98] transition-all"
              >
                Gå til øvelser
              </button>
            </div>

            <div className="mt-6 bg-[#FFF8F0]/80 backdrop-blur-[12px] rounded-[16px] p-4 border border-[#E8E0D6]/40">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-white border border-[#E8E0D6]/60 grid place-items-center shrink-0">
                  <span className="text-[14px]">💡</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-[600] tracking-[-0.01em] text-[#121417]">Hvad sker der nu?</div>
                  <div className="mt-1 text-[12px] leading-[1.5] text-[#6B6B6B]">
                    Din læringsvej viser kun det der er relevant for dig. Vi starter med dine fokusområder — ikke hele systemet på én gang.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center pb-2">
            <div className="w-32 h-1 bg-[#121417] rounded-full opacity-10" />
          </div>
        </div>
      </div>
    );
  }

  // Apple Premium Test — clean, distraction-free, native iOS
  return (
    <div className="min-h-[100dvh] bg-[#FFFBF5] flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFFBF5] to-[#FFF8F0]/50 pointer-events-none" />
      
      <div className="h-[env(safe-area-inset-top)] bg-transparent shrink-0 relative z-10" />
      
      {/* Header — Apple premium, minimal, blur */}
      <div className="px-6 pt-2 pb-4 shrink-0 max-w-[390px] mx-auto w-full relative z-10">
        <div className="flex items-center justify-between">
          <button 
            onClick={prevQ}
            disabled={idx===0}
            className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-[20px] border border-[#E8E0D6]/60 shadow-[0_1px_4px_rgba(18,20,23,0.04)] grid place-items-center text-[16px] disabled:opacity-30 active:scale-[0.95] transition-all"
          >
            ←
          </button>
          
          <div className="bg-white/80 backdrop-blur-[20px] border border-[#E8E0D6]/50 rounded-full px-4 py-2 shadow-[0_1px_4px_rgba(18,20,23,0.04)]">
            <div className="flex items-center gap-2.5">
              <div className="text-[13px] font-[600] tracking-[-0.01em] text-[#121417]">
                {idx+1} / {total}
              </div>
              <div className="w-[1px] h-3 bg-[#E8E0D6]" />
              <div className="text-[11px] font-[500] text-[#8E8E93]">
                {answeredCount} besvaret
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => setActive('assessment')}
            className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-[20px] border border-[#E8E0D6]/60 shadow-[0_1px_4px_rgba(18,20,23,0.04)] grid place-items-center text-[14px] active:scale-[0.95] transition-all"
          >
            ✕
          </button>
        </div>

        {/* Progress — Apple premium, thin, rounded */}
        <div className="mt-5 h-[4px] bg-[#E8E0D6]/40 rounded-full overflow-hidden p-[1px]">
          <div className="h-full bg-[#121417] rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#121417] to-[#6B8A7F] rounded-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] relative overflow-hidden" 
              style={{ width: `${progress}%` }} 
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 animate-[shimmer_2s_ease-in-out_infinite]" />
            </div>
          </div>
        </div>
      </div>

      {/* Question — Apple premium, only focus */}
      <div className="flex-1 px-6 pb-[calc(16px+env(safe-area-inset-bottom))] max-w-[390px] mx-auto w-full flex flex-col overflow-y-auto no-scrollbar relative z-10">
        <div className="flex-1 flex flex-col justify-center py-8">
          <h2 className="text-[24px] font-[600] tracking-[-0.02em] leading-[1.25] text-[#121417] font-[Outfit]">
            {currentQ.q}
          </h2>

          <div className="mt-10 space-y-3">
            {currentQ.options.map((opt,oi)=>{
              const isSelected = answers[currentQ.id]===oi;
              return (
                <button 
                  key={oi} 
                  onClick={()=>handleAnswer(oi)} 
                  className={`group w-full text-left min-h-[60px] px-5 py-4 rounded-full border text-[16px] font-[500] leading-[1.3] flex items-center justify-between gap-3 transition-all active:scale-[0.98] relative overflow-hidden ${
                    isSelected 
                      ? 'bg-[#121417] text-white border-[#121417] shadow-[0_8px_24px_rgba(18,20,23,0.18),0_2px_8px_rgba(18,20,23,0.12)]' 
                      : 'bg-white/80 backdrop-blur-[20px] border-[#E8E0D6]/60 text-[#121417] shadow-[0_1px_4px_rgba(18,20,23,0.04)] hover:border-[#D6CFC3] hover:shadow-[0_4px_12px_rgba(18,20,23,0.06)] hover:bg-white'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/[0.08] to-white/0 translate-x-[-100%] group-active:translate-x-[100%] transition-transform duration-700" />
                  )}
                  <span className="flex-1 relative">{opt}</span>
                  <span className={`w-7 h-7 rounded-full grid place-items-center text-[11px] font-[700] shrink-0 transition-all relative ${
                    isSelected ? 'bg-white text-[#121417] shadow-[0_1px_4px_rgba(0,0,0,0.1)]' : 'bg-[#FFF8F0] border border-[#E8E0D6] text-[#8E8E93] group-hover:border-[#D6CFC3]'
                  }`}>
                    {isSelected ? (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6L4.5 8.5L10 3" stroke="#121417" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : String.fromCharCode(65+oi)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-auto pt-6">
          <div className="flex gap-3">
            <button 
              onClick={prevQ} 
              disabled={idx===0} 
              className="h-[52px] px-6 rounded-full bg-white/80 backdrop-blur-[20px] border border-[#E8E0D6]/60 text-[14px] font-[600] tracking-[-0.01em] text-[#121417] shadow-[0_1px_4px_rgba(18,20,23,0.04)] disabled:opacity-30 active:scale-[0.98] transition-all"
            >
              Tilbage
            </button>
            <button 
              onClick={nextQ} 
              disabled={answers[currentQ.id]===undefined} 
              className="flex-1 h-[52px] bg-[#121417] text-white rounded-full text-[15px] font-[600] tracking-[-0.01em] shadow-[0_4px_16px_rgba(18,20,23,0.15)] disabled:opacity-30 active:scale-[0.98] disabled:active:scale-100 transition-all flex items-center justify-center gap-2 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/[0.08] to-white/0 translate-x-[-100%] group-active:translate-x-[100%] transition-transform duration-700" />
              <span className="relative">{idx===total-1 ? 'Afslut' : 'Næste'}</span>
              <span className="relative">→</span>
            </button>
          </div>
          
          <div className="mt-5 flex justify-center">
            <div className="w-32 h-1 bg-[#121417] rounded-full opacity-10" />
          </div>
        </div>
      </div>
    </div>
  );
}
