import { useMemo, useState, useEffect } from 'react';
import { getModuleProgress } from '../lib/levelEngine';
import { getWeeklyWriting } from '../lib/writingEngine';

// iPhone-first Practice — clean, one clear purpose, minimal text, no excessive CEFR
export default function PracticeView({ setActive }) {
  const [now, setNow] = useState(Date.now());
  useEffect(()=>{ const id=setInterval(()=>setNow(Date.now()), 60000); return ()=>clearInterval(id); },[]);

  const data = useMemo(()=>{
    const level = localStorage.getItem('dansk_level') || 'Modul 1';
    const diagnosticDone = !!localStorage.getItem('dansk_diagnostic');
    const verdict = (() => {
      try { return JSON.parse(localStorage.getItem('dansk_verdict')||'null'); } catch { return null; }
    })();

    const levelId = level?.includes('Modul 1') ? 'm1' : level?.includes('Modul 2') ? 'm2' : level?.includes('Modul 4') ? 'm4' : level?.includes('Modul 5') ? 'm5' : 'm3';
    const modProgress = getModuleProgress(levelId);
    const weekly = getWeeklyWriting(levelId);

    // Only relevant next step, not entire system
    let nextAction = null;
    if(!diagnosticDone) {
      nextAction = {
        title: "Find dit niveau",
        subtitle: "7 min • Personlig vej",
        desc: "Vi finder dit startpunkt, så du ikke starter fra nul.",
        action: "Start test",
        target: "assessment",
        color: "#121417"
      };
    } else if (verdict && verdict.weaknesses && verdict.weaknesses.length > 0) {
      nextAction = {
        title: `Fokus: ${verdict.weaknesses[0]}`,
        subtitle: "Det der giver mest fremgang",
        desc: `Din test viste at ${verdict.weaknesses[0]} kan forbedres. Vi starter her.`,
        action: "Øv nu",
        target: "path",
        color: "#8AA99E"
      };
    } else {
      nextAction = {
        title: weekly.title,
        subtitle: `${weekly.words} ord • Denne uge`,
        desc: weekly.prompt.slice(0, 80) + "...",
        action: "Skriv nu",
        target: "path",
        color: "#121417"
      };
    }

    return { level, diagnosticDone, modProgress, weekly, nextAction, verdict };
  },[now]);

  const handleTap = (target) => {
    if(navigator.vibrate) navigator.vibrate(10);
    setActive(target);
  };

  return (
    <div className="min-h-[100dvh] bg-[#FFFBF5] flex flex-col">
      <div className="h-[env(safe-area-inset-top)] bg-[#FFFBF5] shrink-0" />
      
      {/* Header — minimal, iPhone */}
      <div className="px-6 pt-2 pb-4 shrink-0 max-w-[390px] mx-auto w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#121417] text-white grid place-items-center text-[12px] font-[700]">D</div>
            <span className="text-[15px] font-[600] tracking-[-0.01em]">DanskPath</span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-white border border-[#E8E0D6] font-[500]">{data.level}</span>
          </div>
          <button onClick={()=>setActive('path')} className="w-9 h-9 rounded-full bg-white border border-[#E8E0D6] grid place-items-center text-[14px] active:scale-[0.95] transition-transform">
            ☰
          </button>
        </div>
      </div>

      <div className="flex-1 px-6 pb-[calc(16px+env(safe-area-inset-bottom))] max-w-[390px] mx-auto w-full overflow-y-auto no-scrollbar">
        
        {/* Greeting — clean, no excessive text */}
        <div className="pt-2 pb-6">
          <h1 className="text-[28px] font-[700] tracking-[-0.02em] leading-[1.1] text-[#121417] font-[Outfit]">
            Hej, klar til<br/>at øve?
          </h1>
          <p className="mt-2 text-[15px] leading-[1.4] text-[#6B6B6B]">
            {data.diagnosticDone ? 'Din vej er klar. Ét skridt ad gangen.' : 'Start med at finde dit niveau.'}
          </p>
        </div>

        {/* Main action — one clear purpose, one primary action */}
        <div className="bg-white rounded-[24px] p-5 border border-[#E8E0D6]/60 shadow-[0_2px_12px_rgba(18,20,23,0.04)]">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="text-[11px] font-[700] tracking-widest uppercase text-[#8E8E93]">{data.nextAction.subtitle}</div>
              <h2 className="mt-2 text-[20px] font-[700] tracking-[-0.01em] leading-[1.1] text-[#121417] font-[Outfit]">
                {data.nextAction.title}
              </h2>
              <p className="mt-2 text-[14px] leading-[1.4] text-[#6B6B6B]">
                {data.nextAction.desc}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-[#FFF8F0] border border-[#E8E0D6]/60 grid place-items-center text-[18px] shrink-0">
              {data.nextAction.target === 'assessment' ? '◷' : '✦'}
            </div>
          </div>

          <button 
            onClick={()=>handleTap(data.nextAction.target)} 
            className="mt-5 w-full h-[52px] bg-[#121417] text-white rounded-full text-[15px] font-[600] shadow-[0_2px_12px_rgba(18,20,23,0.12)] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            {data.nextAction.action}
            <span>→</span>
          </button>
        </div>

        {/* Progress — only relevant, not all CEFR levels */}
        {data.diagnosticDone && data.modProgress && (
          <div className="mt-4 bg-white rounded-[20px] p-4 border border-[#E8E0D6]/60">
            <div className="flex items-center justify-between">
              <div className="text-[13px] font-[600] text-[#121417]">{data.level} • Fremskridt</div>
              <div className="text-[12px] font-[600] text-[#8E8E93]">{data.modProgress.overall}%</div>
            </div>
            <div className="mt-3 h-2 bg-[#FFF8F0] rounded-full overflow-hidden border border-[#E8E0D6]/30">
              <div className="h-full bg-[#121417] rounded-full transition-all duration-1000" style={{ width: `${data.modProgress.overall}%` }} />
            </div>
            <div className="mt-2 text-[11px] text-[#8E8E93]">
              {data.verdict ? `${data.verdict.correct}/${data.verdict.total} rigtige i test` : 'Fortsæt din vej'}
            </div>
          </div>
        )}

        {/* Quick actions — minimal, easy to scan */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button onClick={()=>handleTap('path')} className="bg-white rounded-[16px] p-4 border border-[#E8E0D6]/60 text-left active:scale-[0.98] transition-all">
            <div className="w-8 h-8 rounded-full bg-[#E3EDEA] grid place-items-center text-[14px]">◍</div>
            <div className="mt-3 text-[14px] font-[600] text-[#121417]">Min vej</div>
            <div className="text-[11px] text-[#8E8E93] mt-1">Se næste skridt</div>
          </button>
          
          <button onClick={()=>handleTap('assessment')} className="bg-white rounded-[16px] p-4 border border-[#E8E0D6]/60 text-left active:scale-[0.98] transition-all">
            <div className="w-8 h-8 rounded-full bg-[#FFF8F0] border border-[#E8E0D6] grid place-items-center text-[14px]">◎</div>
            <div className="mt-3 text-[14px] font-[600] text-[#121417]">Test igen</div>
            <div className="text-[11px] text-[#8E8E93] mt-1">7 min • 15 spørgsmål</div>
          </button>
        </div>

        {/* Weekly — minimal */}
        {data.diagnosticDone && (
          <div className="mt-4 bg-[#E3EDEA]/30 rounded-[16px] p-4 border border-[#8AA99E]/20">
            <div className="text-[11px] font-[700] tracking-widest uppercase text-[#6B8A7F]">Denne uge</div>
            <div className="mt-1 text-[13px] font-[600] text-[#121417] leading-tight">{data.weekly.title}</div>
            <div className="mt-1 text-[12px] text-[#6B6B6B] line-clamp-2">{data.weekly.prompt.slice(0, 70)}...</div>
          </div>
        )}

        <div className="mt-8 flex justify-center pb-2">
          <div className="w-32 h-1 bg-[#121417] rounded-full opacity-10" />
        </div>
      </div>
    </div>
  );
}
