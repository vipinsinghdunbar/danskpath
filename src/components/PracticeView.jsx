import { useMemo, useState, useEffect } from 'react';
import { getModuleProgress } from '../lib/levelEngine';
import { getWeeklyWriting } from '../lib/writingEngine';

// Apple Premium Practice — clean, one clear purpose, premium materials
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

    let nextAction = null;
    if(!diagnosticDone) {
      nextAction = {
        title: "Find dit niveau",
        subtitle: "7 min • Personlig vej",
        desc: "Vi finder dit startpunkt, så du ikke starter fra nul.",
        action: "Start test",
        target: "assessment",
        icon: "◷"
      };
    } else if (verdict && verdict.weaknesses && verdict.weaknesses.length > 0) {
      const weakCat = typeof verdict.weaknesses[0] === 'string' ? verdict.weaknesses[0] : verdict.weaknesses[0].category || 'Fokus';
      nextAction = {
        title: `Fokus: ${weakCat}`,
        subtitle: "Det der giver mest fremgang",
        desc: `Din test viste at ${weakCat.toLowerCase()} kan forbedres. Vi starter her.`,
        action: "Øv nu",
        target: "path",
        icon: "✦"
      };
    } else {
      nextAction = {
        title: weekly.title,
        subtitle: `${weekly.words} ord • Denne uge`,
        desc: weekly.prompt.slice(0, 80) + "...",
        action: "Skriv nu",
        target: "path",
        icon: "✍️"
      };
    }

    return { level, diagnosticDone, modProgress, weekly, nextAction, verdict };
  },[now]);

  const handleTap = (target) => {
    if(navigator.vibrate) navigator.vibrate(10);
    setActive(target);
  };

  return (
    <div className="min-h-[100dvh] bg-[#FFFBF5] flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFFBF5] via-[#FFFBF5] to-[#FFF8F0] pointer-events-none" />
      <div className="absolute top-[-60px] right-[-40px] w-[200px] h-[200px] bg-[#E3EDEA]/30 rounded-full blur-[50px] pointer-events-none" />
      
      <div className="h-[env(safe-area-inset-top)] bg-transparent shrink-0 relative z-10" />
      
      <div className="px-6 pt-2 pb-4 shrink-0 max-w-[390px] mx-auto w-full relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-[12px] bg-[#121417] text-white grid place-items-center text-[13px] font-[800] shadow-[0_2px_8px_rgba(18,20,23,0.12)]">D</div>
            <div>
              <div className="text-[15px] font-[700] tracking-[-0.02em] leading-none">DanskPath</div>
              <div className="text-[11px] font-[500] text-[#8E8E93] tracking-[-0.01em]">{data.level}</div>
            </div>
          </div>
          <button onClick={()=>setActive('path')} className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-[20px] border border-[#E8E0D6]/60 shadow-[0_1px_4px_rgba(18,20,23,0.04)] grid place-items-center text-[14px] active:scale-[0.95] transition-all">
            ☰
          </button>
        </div>
      </div>

      <div className="flex-1 px-6 pb-[calc(16px+env(safe-area-inset-bottom))] max-w-[390px] mx-auto w-full overflow-y-auto no-scrollbar relative z-10">
        
        <div className="pt-2 pb-6">
          <h1 className="text-[32px] font-[800] tracking-[-0.03em] leading-[1.05] text-[#121417] font-[Outfit]">
            Hej, klar til<br/>
            <span className="bg-gradient-to-r from-[#121417] to-[#6B8A7F] bg-clip-text text-transparent">at øve?</span>
          </h1>
          <p className="mt-3 text-[15px] leading-[1.5] tracking-[-0.01em] text-[#6B6B6B]">
            {data.diagnosticDone ? 'Din vej er klar. Ét skridt ad gangen.' : 'Start med at finde dit niveau.'}
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-[20px] rounded-[24px] p-5 border border-[#E8E0D6]/50 shadow-[0_4px_20px_rgba(18,20,23,0.05),0_1px_4px_rgba(18,20,23,0.03)] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent pointer-events-none" />
          <div className="relative">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="inline-flex items-center gap-1.5 bg-[#121417] text-white px-2.5 py-1 rounded-full text-[10px] font-[700] tracking-[0.06em] uppercase">
                  <div className="w-1 h-1 rounded-full bg-[#8AA99E] animate-pulse" />
                  {data.nextAction.subtitle}
                </div>
                <h2 className="mt-3 text-[20px] font-[700] tracking-[-0.02em] leading-[1.1] text-[#121417] font-[Outfit]">
                  {data.nextAction.title}
                </h2>
                <p className="mt-2 text-[14px] leading-[1.5] tracking-[-0.01em] text-[#6B6B6B]">
                  {data.nextAction.desc}
                </p>
              </div>
              <div className="w-12 h-12 rounded-[14px] bg-[#121417] text-white grid place-items-center text-[18px] shrink-0 shadow-[0_4px_12px_rgba(18,20,23,0.12)]">
                {data.nextAction.icon}
              </div>
            </div>

            <button 
              onClick={()=>handleTap(data.nextAction.target)} 
              className="mt-5 w-full h-[52px] bg-[#121417] text-white rounded-full text-[15px] font-[600] tracking-[-0.01em] shadow-[0_4px_16px_rgba(18,20,23,0.12)] active:scale-[0.98] transition-all flex items-center justify-center gap-2 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/[0.08] to-white/0 translate-x-[-100%] group-active:translate-x-[100%] transition-transform duration-700" />
              <span className="relative">{data.nextAction.action}</span>
              <span className="relative">→</span>
            </button>
          </div>
        </div>

        {data.diagnosticDone && data.modProgress && (
          <div className="mt-4 bg-white/70 backdrop-blur-[20px] rounded-[20px] p-4 border border-[#E8E0D6]/50 shadow-[0_2px_12px_rgba(18,20,23,0.04)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#E3EDEA] grid place-items-center">
                  <div className="w-2 h-2 rounded-full bg-[#8AA99E]" />
                </div>
                <div className="text-[13px] font-[600] tracking-[-0.01em] text-[#121417]">{data.level}</div>
              </div>
              <div className="bg-[#121417] text-white px-2.5 py-1 rounded-full text-[11px] font-[700]">{data.modProgress.overall}%</div>
            </div>
            <div className="mt-3.5 h-2 bg-[#FFF8F0] rounded-full overflow-hidden border border-[#E8E0D6]/30 p-[1px]">
              <div className="h-full bg-[#121417] rounded-full transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ width: `${data.modProgress.overall}%` }} />
            </div>
            <div className="mt-2.5 text-[11px] font-[500] tracking-[-0.01em] text-[#8E8E93]">
              {data.verdict ? `${data.verdict.correct}/${data.verdict.total} rigtige • Næste: ${data.weekly.title}` : 'Fortsæt din vej'}
            </div>
          </div>
        )}

        <div className="mt-6">
          <div className="text-[11px] font-[700] tracking-[0.08em] uppercase text-[#8E8E93] mb-3 px-1">Hurtig adgang</div>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={()=>handleTap('path')} className="bg-white/80 backdrop-blur-[20px] rounded-[20px] p-4 border border-[#E8E0D6]/50 shadow-[0_2px_12px_rgba(18,20,23,0.04)] text-left active:scale-[0.98] transition-all group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div className="relative">
                <div className="w-10 h-10 rounded-[12px] bg-[#121417] text-white grid place-items-center text-[16px] shadow-[0_2px_8px_rgba(18,20,23,0.12)]">◍</div>
                <div className="mt-3 text-[14px] font-[600] tracking-[-0.01em] text-[#121417]">Min vej</div>
                <div className="text-[11px] font-[500] tracking-[-0.01em] text-[#8E8E93] mt-1">Se næste skridt</div>
              </div>
            </button>
            
            <button onClick={()=>handleTap('assessment')} className="bg-white/80 backdrop-blur-[20px] rounded-[20px] p-4 border border-[#E8E0D6]/50 shadow-[0_2px_12px_rgba(18,20,23,0.04)] text-left active:scale-[0.98] transition-all group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div className="relative">
                <div className="w-10 h-10 rounded-[12px] bg-white border border-[#E8E0D6] grid place-items-center text-[16px]">◎</div>
                <div className="mt-3 text-[14px] font-[600] tracking-[-0.01em] text-[#121417]">Test igen</div>
                <div className="text-[11px] font-[500] tracking-[-0.01em] text-[#8E8E93] mt-1">7 min • 15 spørgsmål</div>
              </div>
            </button>
          </div>
        </div>

        {data.diagnosticDone && (
          <div className="mt-4 bg-[#121417] rounded-[20px] p-4 text-white relative overflow-hidden shadow-[0_4px_16px_rgba(18,20,23,0.12)]">
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] to-transparent pointer-events-none" />
            <div className="relative flex gap-3">
              <div className="w-8 h-8 rounded-full bg-white/10 grid place-items-center shrink-0">
                <span className="text-[14px]">✦</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-[700] tracking-[0.06em] uppercase opacity-60">Denne uge</div>
                <div className="mt-1 text-[13px] font-[600] tracking-[-0.01em] leading-tight">{data.weekly.title}</div>
                <div className="mt-1 text-[11px] leading-[1.4] tracking-[-0.01em] opacity-70 line-clamp-2">{data.weekly.prompt.slice(0, 70)}...</div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-center pb-2">
          <div className="w-32 h-1 bg-[#121417] rounded-full opacity-10" />
        </div>
      </div>
    </div>
  );
}
