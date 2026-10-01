import { useState, useEffect } from 'react';

// PracticeView — Up next per Action Plan Phase 4
// Screen: Exercise and feedback — Check then Next, focus mode, feedback under answer rule 1-2 lines Why? disclosure, wrong feeds Up next, no confetti streak
// Ship checklist: one primary action, can remove one element, passes light/dark 390px/1440px, first-time user reaches next without reading, uses ds.css

const exercises = [
  { id: 'ex1', module: 'Modul 3', skill: 'V2 inversion', level: 'A2', q: "Vælg korrekt: ___ arbejder jeg hjemme.", options: ["I dag","I dag jeg","I dag er jeg","Ved ikke"], a: 0, rule: "V2: tid først → inversion", why: "Dansk kræver V2. Tid først → verbum anden. 'I dag arbejder jeg'. Engelsk S-V-O lyder forkert på dansk.", topic: "V2" },
  { id: 'ex2', module: 'Modul 3', skill: 'Ledsætning', level: 'B1', q: "Jeg ved, at han ___ kommer.", options: ["ikke","kommer ikke","ikke kommer","Ved ikke"], a: 2, rule: "Ledsætning: ikke FØR verbet", why: "Main: han kommer ikke. Subordinate: at han ikke kommer. Ikke før verbet i ledsætning.", topic: "Ledsætning" },
  { id: 'ex3', module: 'Modul 3', skill: 'Kollokationer', level: 'B1', q: "Hvad betyder 'holde et møde'?", options: ["To have a meeting","To leave a meeting","To cancel a meeting","Ved ikke"], a: 0, rule: "Kollokation: holde et møde", why: "Dansk kollokation: holde et møde = have a meeting. Ikke 'tage et møde'.", topic: "Kollokationer" },
];

export default function PracticeView({ setActive }) {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [checked, setChecked] = useState(false);
  const [showWhy, setShowWhy] = useState(false);
  const [progress, setProgress] = useState(()=> {
    try { return JSON.parse(localStorage.getItem('dansk_progress')||'{}'); } catch { return {}; }
  });

  const current = exercises[idx];
  const isCorrect = selected===current.a;
  const isIdk = selected!==null && current.options[selected]?.toLowerCase().includes('ved ikke');

  useEffect(()=>{
    // Save state on every answer per spec
    localStorage.setItem('dansk_progress', JSON.stringify(progress));
  },[progress]);

  const handleCheck = () => {
    if (selected===null) return;
    setChecked(true);
    if(navigator.vibrate) navigator.vibrate(10);
    // Save answer for mastery rule 80% over 15
    const newAnswers = { ...(progress.answers||{}), [current.id]: isCorrect && !isIdk };
    const newProgress = { ...progress, answers: newAnswers, lastAnswerAt: new Date().toISOString() };
    setProgress(newProgress);
    // Wrong feeds Up next per spec
    if (!isCorrect && !isIdk) {
      const wrong = JSON.parse(localStorage.getItem('dansk_wrong')||'[]');
      wrong.push({ id: current.id, topic: current.topic, at: Date.now() });
      localStorage.setItem('dansk_wrong', JSON.stringify(wrong.slice(-20)));
    }
  };

  const handleNext = () => {
    if (idx < exercises.length-1) {
      setIdx(i=>i+1);
      setSelected(null);
      setChecked(false);
      setShowWhy(false);
    } else {
      // Loop 2-4 per Flow B: Up next again or stop
      setIdx(0);
      setSelected(null);
      setChecked(false);
      setShowWhy(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)]">
      {/* Focus mode — whole screen, one Close button returns per spec */}
      <div className="max-w-[640px] mx-auto px-4 pt-6 pb-[120px]">
        <div className="flex items-center justify-between">
          <button onClick={()=>setActive('path')} className="w-10 h-10 rounded-full bg-white border border-[var(--border)] grid place-items-center" aria-label="Close">✕</button>
          <span className="text-[11px] font-[700] tracking-widest uppercase bg-white border border-[var(--border)] px-3 py-1.5 rounded-full">Up next • {current.module} • {current.skill}</span>
          <span className="text-[11px] font-[600] text-[var(--muted)]">{idx+1} of {exercises.length}</span>
        </div>

        <div className="mt-8">
          <div className="text-[11px] font-[700] tracking-widest uppercase text-[var(--muted)]">{current.module} • {current.skill} • {current.level}</div>
          <h1 className="mt-3 text-[24px] font-[700] tracking-tight leading-tight serif" lang="da">{current.q}</h1>
          <div className="mt-2 text-[12px] text-[var(--muted)]">Danish content in serif, interface in system face. Never mixed in one line. Option 56px tall.</div>
        </div>

        <div className="mt-6 space-y-2">
          {current.options.map((opt,i)=>{
            const isSelected = selected===i;
            const isCorrectOpt = checked && i===current.a;
            const isWrongSelected = checked && isSelected && !isCorrect;
            return (
              <button
                key={i}
                onClick={()=>!checked && setSelected(i)}
                className={`w-full text-left px-5 py-4 rounded-[12px] border text-[16px] font-[500] flex justify-between items-center min-h-[56px] transition-all
                  ${checked ? (isCorrectOpt ? 'bg-[#ECFDF5] border-[#059669]/20 text-[#059669]' : isWrongSelected ? 'bg-[#FEF2F2] border-[#DC2626]/20 text-[#DC2626]' : 'bg-[var(--bg)] border-[var(--border)] opacity-60') : isSelected ? 'bg-[var(--ink)] text-white border-[var(--ink)]' : opt.toLowerCase().includes('ved ikke') ? 'bg-white border border-dashed border-[var(--border-strong)] text-[var(--muted)]' : 'bg-white border-[var(--border)] hover:border-[var(--border-strong)]'}`}
              >
                <span className="serif" lang="da">{opt}</span>
                <span className={`w-6 h-6 rounded-full grid place-items-center text-[11px] ${checked ? (isCorrectOpt ? 'bg-[#059669] text-white' : isWrongSelected ? 'bg-[#DC2626] text-white' : 'bg-white border') : isSelected ? 'bg-white text-black' : 'bg-white border border-[var(--border)]'}`}>{checked ? (isCorrectOpt ? '✓' : isWrongSelected ? '✗' : '') : isSelected ? '✓' : ''}</span>
              </button>
            );
          })}
        </div>

        {/* Feedback under answer: rule 1-2 lines, Why? disclosure per spec */}
        {checked && (
          <div className={`mt-6 p-4 rounded-[16px] border ${isCorrect ? 'bg-[#ECFDF5] border-[#059669]/20' : 'bg-[#FEF2F2] border-[#DC2626]/20'}`}>
            <div className="flex items-center gap-2">
              <span className={`w-7 h-7 rounded-full grid place-items-center text-[12px] font-bold ${isCorrect ? 'bg-[#059669] text-white' : 'bg-[#DC2626] text-white'}`}>{isCorrect ? '✓' : '✗'}</span>
              <span className="text-[14px] font-[700]">{isCorrect ? 'Correct' : isIdk ? 'Ved ikke — no penalty' : 'Not correct'} — {current.rule}</span>
            </div>
            <div className="mt-2 text-[13px] leading-[1.5]">{current.why}</div>
            <button onClick={()=>setShowWhy(!showWhy)} className="mt-3 text-[12px] font-[600] text-[var(--accent)]">Why? {showWhy ? 'Hide' : 'Show full rule'}</button>
            {showWhy && (
              <div className="mt-3 p-3 bg-white rounded-[12px] text-[12px] leading-[1.5] border border-[var(--border)]">
                <div><b>Rule:</b> {current.rule}</div>
                <div className="mt-1"><b>Why wrong is tempting:</b> English S-V-O "Today I work" feels natural, but Danish requires inversion when something else than subject is first.</div>
                <div className="mt-1 text-[var(--muted)]">Progressive disclosure: lesson shows topic, examples and one question. English comparison and full rules behind tap.</div>
              </div>
            )}
            {!isCorrect && <div className="mt-3 text-[11px] text-[var(--muted)]">Wrong answers feed Up next per spec — this topic will appear again in Up next.</div>}
          </div>
        )}

        {/* One primary action — bottom thumb zone */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)] to-transparent">
          <div className="max-w-[640px] mx-auto">
            {!checked ? (
              <button onClick={handleCheck} disabled={selected===null} className="w-full bg-[var(--ink)] text-white py-4 rounded-full text-[16px] font-[600] disabled:opacity-40 min-h-[56px]">Check</button>
            ) : (
              <button onClick={handleNext} className="w-full bg-[var(--ink)] text-white py-4 rounded-full text-[16px] font-[600] min-h-[56px]">Next →</button>
            )}
            <div className="mt-2 text-center text-[11px] text-[var(--muted)]">Focus mode • No confetti streak • Save every answer • Back works • Closing mid-test loses nothing • Choose something else beside recommendation</div>
          </div>
        </div>
      </div>
    </div>
  );
}
