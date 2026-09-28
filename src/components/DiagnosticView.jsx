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
    // Generate varied set and shuffle answers randomly
    const varied = generateQuestionSet(seed, 5);
    const shuffledBase = [...baseQuestions].sort(()=> 0.5 - (hashStr(seed) % 100)/100).slice(0,15);
    
    // Merge and randomize answer positions
    const mixed = shuffledBase.map((q,i)=> {
      const baseQ = i<5 && varied[i] ? { ...q, q: varied[i].q || q.q, options: varied[i].options || q.options } : q;
      // Randomize answer position for each question
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
    setAnswers(prev=>({...prev, [currentQ.id]: optIdx}));
    if(navigator.vibrate) navigator.vibrate(10);
    
    // Auto-advance after short delay for better UX
    setTimeout(() => {
      if(idx < total-1) {
        setIdx(i=>i+1);
      } else {
        // Calculate result
        const v = calculateVerdict(answers, questions, []);
        // Include current answer
        const finalAnswers = {...answers, [currentQ.id]: optIdx};
        const finalVerdict = calculateVerdict(finalAnswers, questions, []);
        setVerdict(finalVerdict);
        localStorage.setItem('dansk_level', finalVerdict.level);
        localStorage.setItem('dansk_diagnostic', JSON.stringify({ ...finalVerdict, date: new Date().toISOString(), userSeed }));
        localStorage.setItem('dansk_verdict', JSON.stringify(finalVerdict));
        setShowResult(true);
        if(navigator.vibrate) navigator.vibrate(20);
      }
    }, 300);
  };

  const nextQ = () => {
    if(idx < total-1) {
      setIdx(i=>i+1);
    } else {
      const v = calculateVerdict(answers, questions, []);
      setVerdict(v);
      localStorage.setItem('dansk_level', v.level);
      localStorage.setItem('dansk_diagnostic', JSON.stringify({ ...v, date: new Date().toISOString(), userSeed }));
      localStorage.setItem('dansk_verdict', JSON.stringify(v));
      setShowResult(true);
      if(navigator.vibrate) navigator.vibrate(20);
    }
  };

  const prevQ = () => { 
    if(idx>0) {
      setIdx(i=>i-1);
      if(navigator.vibrate) navigator.vibrate(10);
    }
  };

  // Instructions screen before test
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

  // Results screen — clean, minimal, no excessive internal data
  if(showResult && verdict) {
    return (
      <div className="min-h-[100dvh] bg-[#FFFBF5] flex flex-col">
        <div className="h-[env(safe-area-inset-top)] bg-[#FFFBF5] shrink-0" />
        
        <div className="flex-1 px-6 pb-[calc(16px+env(safe-area-inset-bottom))] max-w-[390px] mx-auto w-full overflow-y-auto no-scrollbar">
          <div className="pt-6 pb-8 text-center">
            <div className="w-20 h-20 rounded-full bg-[#121417] text-white grid place-items-center text-[28px] font-[700] mx-auto shadow-[0_8px_24px_rgba(18,20,23,0.15)]">
              {verdict.pct}%
            </div>
            <h1 className="mt-5 text-[28px] font-[700] tracking-[-0.02em] leading-[1.1] text-[#121417] font-[Outfit]">
              Dit niveau er<br/>{verdict.level}
            </h1>
            <p className="mt-3 text-[15px] leading-[1.4] text-[#6B6B6B] max-w-[300px] mx-auto">
              {verdict.correct} ud af {verdict.total} rigtige • Gennemsnit {verdict.timeAvg || 8}s per spørgsmål
            </p>
          </div>

          {/* Clean result cards — no excessive internal labels */}
          <div className="space-y-3">
            {verdict.strengths && verdict.strengths.length > 0 && (
              <div className="bg-white rounded-[20px] p-5 border border-[#E8E0D6]/60 shadow-[0_1px_3px_rgba(18,20,23,0.04)]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#E3EDEA] grid place-items-center text-[12px]">✓</div>
                  <div className="text-[13px] font-[700] tracking-wide text-[#121417]">Dine styrker</div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {verdict.strengths.slice(0,4).map(s=>(
                    <span key={s} className="text-[12px] font-[500] bg-[#E3EDEA] text-[#6B8A7F] px-3 py-1.5 rounded-full">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {verdict.weaknesses && verdict.weaknesses.length > 0 && (
              <div className="bg-white rounded-[20px] p-5 border border-[#E8E0D6]/60 shadow-[0_1px_3px_rgba(18,20,23,0.04)]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#FBE8E2] grid place-items-center text-[12px]">•</div>
                  <div className="text-[13px] font-[700] tracking-wide text-[#121417]">Fokusområder</div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {verdict.weaknesses.slice(0,4).map(s=>(
                    <span key={s} className="text-[12px] font-[500] bg-[#FBE8E2] text-[#B86E5A] px-3 py-1.5 rounded-full">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-[#121417] rounded-[20px] p-5 text-white">
              <div className="text-[11px] font-[700] tracking-widest uppercase opacity-60">Din læringsvej</div>
              <div className="mt-2 text-[14px] leading-[1.4] font-[500]">
                Vi starter med det der giver dig mest fremgang. Din vej er bygget ud fra dine svar.
              </div>
              <div className="mt-3 text-[12px] opacity-70">
                Estimeret: {verdict.timeline || '3-4 måneder'} til næste niveau
              </div>
            </div>
          </div>

          {/* Primary action — one clear action */}
          <div className="mt-8 space-y-3">
            <button 
              onClick={()=>setActive('path')} 
              className="w-full h-[56px] bg-[#121417] text-white rounded-full text-[17px] font-[600] shadow-[0_4px_16px_rgba(18,20,23,0.15)] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              Se min læringsvej
              <span>→</span>
            </button>
            
            <button 
              onClick={()=>setActive('practice')} 
              className="w-full h-[52px] bg-white border border-[#E8E0D6] rounded-full text-[15px] font-[600] text-[#121417] active:scale-[0.98] transition-all"
            >
              Gå til øvelser
            </button>
          </div>

          <div className="mt-6 flex justify-center pb-4">
            <div className="w-32 h-1 bg-[#121417] rounded-full opacity-10" />
          </div>
        </div>
      </div>
    );
  }

  // Test screen — clean, distraction-free, iPhone-first, only test focus
  return (
    <div className="min-h-[100dvh] bg-[#FFFBF5] flex flex-col relative overflow-hidden">
      <div className="h-[env(safe-area-inset-top)] bg-[#FFFBF5] shrink-0" />
      
      {/* Header — minimal, only progress, no learning path, no module progression */}
      <div className="px-6 pt-2 pb-4 shrink-0 max-w-[390px] mx-auto w-full">
        <div className="flex items-center justify-between">
          <button 
            onClick={prevQ}
            disabled={idx===0}
            className="w-9 h-9 rounded-full bg-white border border-[#E8E0D6] grid place-items-center text-[16px] disabled:opacity-30 active:scale-[0.95] transition-all"
          >
            ←
          </button>
          
          <div className="text-center">
            <div className="text-[13px] font-[600] text-[#121417]">
              {idx+1} af {total}
            </div>
            <div className="text-[11px] text-[#8E8E93] mt-0.5">
              {answeredCount} besvaret
            </div>
          </div>
          
          <button 
            onClick={() => setActive('assessment')}
            className="w-9 h-9 rounded-full bg-white border border-[#E8E0D6] grid place-items-center text-[14px] active:scale-[0.95] transition-all"
          >
            ✕
          </button>
        </div>

        {/* Progress bar — clean, no excessive info */}
        <div className="mt-4 h-1.5 bg-[#E8E0D6]/60 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#121417] rounded-full transition-all duration-500 ease-out" 
            style={{ width: `${progress}%` }} 
          />
        </div>
      </div>

      {/* Question — only focus, no variation, no expected action, no internal labels */}
      <div className="flex-1 px-6 pb-[calc(16px+env(safe-area-inset-bottom))] max-w-[390px] mx-auto w-full flex flex-col overflow-y-auto no-scrollbar">
        <div className="flex-1 flex flex-col justify-center py-6">
          <h2 className="text-[22px] font-[600] tracking-[-0.01em] leading-[1.25] text-[#121417] font-[Outfit]">
            {currentQ.q}
          </h2>

          {/* Options — randomized, no pattern, clean iPhone pills */}
          <div className="mt-8 space-y-3">
            {currentQ.options.map((opt,oi)=>{
              const isSelected = answers[currentQ.id]===oi;
              return (
                <button 
                  key={oi} 
                  onClick={()=>handleAnswer(oi)} 
                  className={`w-full text-left min-h-[56px] px-5 py-4 rounded-full border text-[16px] font-[500] leading-[1.3] flex items-center justify-between gap-3 transition-all active:scale-[0.98] ${
                    isSelected 
                      ? 'bg-[#121417] text-white border-[#121417] shadow-[0_4px_16px_rgba(18,20,23,0.15)]' 
                      : 'bg-white border-[#E8E0D6] text-[#121417] hover:border-[#D6CFC3] hover:shadow-[0_2px_8px_rgba(18,20,23,0.06)]'
                  }`}
                >
                  <span className="flex-1">{opt}</span>
                  <span className={`w-6 h-6 rounded-full grid place-items-center text-[11px] font-[700] shrink-0 transition-all ${
                    isSelected ? 'bg-white text-[#121417]' : 'bg-[#FFF8F0] border border-[#E8E0D6] text-[#8E8E93]'
                  }`}>
                    {isSelected ? '✓' : String.fromCharCode(65+oi)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom — minimal, no principle explanation, no excessive text */}
        <div className="mt-auto pt-6">
          <div className="flex gap-3">
            <button 
              onClick={prevQ} 
              disabled={idx===0} 
              className="h-[52px] px-6 rounded-full bg-white border border-[#E8E0D6] text-[14px] font-[600] text-[#121417] disabled:opacity-30 active:scale-[0.98] transition-all"
            >
              Tilbage
            </button>
            <button 
              onClick={nextQ} 
              disabled={answers[currentQ.id]===undefined} 
              className="flex-1 h-[52px] bg-[#121417] text-white rounded-full text-[15px] font-[600] disabled:opacity-30 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              {idx===total-1 ? 'Afslut' : 'Næste'}
              <span>→</span>
            </button>
          </div>
          
          <div className="mt-4 flex justify-center">
            <div className="w-32 h-1 bg-[#121417] rounded-full opacity-10" />
          </div>
        </div>
      </div>
    </div>
  );
}
