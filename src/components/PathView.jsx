import { useState, useEffect } from 'react';
import { stages, getAllStagesProgress, getStageById } from '../lib/stageEngine';
import { getWeeklyWriting } from '../lib/writingEngine';

// Apple Premium Path — clean visual progression, minimal text, only relevant
export default function PathView({ setActive }) {
  const [progresses, setProgresses] = useState([]);
  const [activeModule, setActiveModule] = useState('m1');

  useEffect(()=>{
    setProgresses(getAllStagesProgress());
    const level = localStorage.getItem('dansk_level') || 'Modul 1';
    if(level.includes('Modul 1')) setActiveModule('m1');
    else if(level.includes('Modul 2')) setActiveModule('m2');
    else if(level.includes('Modul 3')) setActiveModule('m3');
    else if(level.includes('Modul 4')) setActiveModule('m4');
    else if(level.includes('Modul 5')) setActiveModule('m5');
  },[]);

  const activeStage = getStageById(activeModule) || stages[2];
  const activeProgress = progresses.find(p=>p.stage.moduleId===activeModule)?.progress;
  const weekly = getWeeklyWriting(activeModule);
  const userLevel = localStorage.getItem('dansk_level') || 'Modul 1';

  const tap = (id) => { if(navigator.vibrate) navigator.vibrate(10); setActive(id); };

  const relevantStages = (() => {
    const currentIdx = stages.findIndex(s => s.moduleId === activeModule);
    return stages.slice(Math.max(0, currentIdx - 1), Math.min(stages.length, currentIdx + 2));
  })();

  return (
    <div className="min-h-[100dvh] bg-[#FFFBF5] flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFFBF5] via-[#FFFBF5] to-[#FFF8F0] pointer-events-none" />
      <div className="absolute top-[-80px] left-[-60px] w-[200px] h-[200px] bg-[#E3EDEA]/30 rounded-full blur-[50px] pointer-events-none" />
      
      <div className="h-[env(safe-area-inset-top)] bg-transparent shrink-0 relative z-10" />
      
      <div className="flex items-center justify-between px-6 pt-2 pb-4 shrink-0 max-w-[390px] mx-auto w-full relative z-10">
        <button 
          onClick={()=>setActive('practice')}
          className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-[20px] border border-[#E8E0D6]/60 shadow-[0_1px_4px_rgba(18,20,23,0.04)] grid place-items-center text-[16px] active:scale-[0.95] transition-all"
        >
          ←
        </button>
        <div className="bg-white/70 backdrop-blur-[20px] border border-[#E8E0D6]/50 rounded-full px-4 py-1.5 shadow-[0_1px_4px_rgba(18,20,23,0.04)]">
          <div className="text-[13px] font-[600] tracking-[-0.01em] text-[#121417]">Min vej</div>
        </div>
        <div className="w-10 h-10" />
      </div>

      <div className="flex-1 px-6 pb-[calc(16px+env(safe-area-inset-bottom))] max-w-[390px] mx-auto w-full overflow-y-auto no-scrollbar relative z-10">
        
        <div className="pt-2 pb-6">
          <h1 className="text-[30px] font-[700] tracking-[-0.03em] leading-[1.05] text-[#121417] font-[Outfit]">
            Din læringsvej
          </h1>
          <div className="mt-3 flex items-center gap-2">
            <div className="bg-[#121417] text-white px-3 py-1 rounded-full text-[11px] font-[700] tracking-wide">
              {userLevel}
            </div>
            <div className="text-[13px] text-[#8E8E93] tracking-[-0.01em]">Næste skridt markeret</div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute left-[20px] top-[24px] bottom-[24px] w-[2px] bg-[#E8E0D6]/40 rounded-full" />
          <div 
            className="absolute left-[20px] top-[24px] w-[2px] bg-[#121417] rounded-full transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]" 
            style={{ height: `${(relevantStages.findIndex(s => s.moduleId === activeModule) + 1) / relevantStages.length * 75}%` }}
          />

          <div className="space-y-4">
            {relevantStages.map((stage, idx) => {
              const isActive = activeModule === stage.moduleId;
              const isPast = stages.findIndex(s => s.moduleId === activeModule) > stages.findIndex(s => s.moduleId === stage.moduleId);
              const progress = progresses.find(p=>p.stage.id===stage.id)?.progress;
              
              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveModule(stage.moduleId)}
                  className={`relative w-full text-left rounded-[20px] p-4 border transition-all active:scale-[0.98] flex gap-4 group ${
                    isActive 
                      ? 'bg-[#121417] text-white border-[#121417] shadow-[0_8px_24px_rgba(18,20,23,0.15),0_2px_8px_rgba(18,20,23,0.1)]' 
                      : 'bg-white/80 backdrop-blur-[20px] border-[#E8E0D6]/50 shadow-[0_2px_12px_rgba(18,20,23,0.04)] hover:bg-white hover:border-[#D6CFC3] hover:shadow-[0_4px_16px_rgba(18,20,23,0.06)]'
                  }`}
                >
                  {isActive && <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] to-transparent rounded-[20px] pointer-events-none" />}
                  
                  <div className={`w-10 h-10 rounded-full grid place-items-center text-[13px] font-[700] shrink-0 mt-0.5 transition-all relative ${
                    isPast ? 'bg-white text-[#121417]' : isActive ? 'bg-white text-[#121417] shadow-[0_2px_8px_rgba(0,0,0,0.15)]' : 'bg-[#FFF8F0] border border-[#E8E0D6] text-[#8E8E93]'
                  }`}>
                    {isPast ? '✓' : idx + 1}
                  </div>

                  <div className="flex-1 min-w-0 relative">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className={`text-[15px] font-[600] tracking-[-0.01em] leading-tight ${isActive ? 'text-white' : 'text-[#121417]'}`}>
                          {stage.title.split('—')[0]}
                        </div>
                        <div className={`mt-1 text-[11px] font-[600] tracking-wide ${isActive ? 'text-white/60' : 'text-[#8E8E93]'}`}>
                          {stage.cefl}
                        </div>
                      </div>
                      {progress && (
                        <div className={`text-[11px] font-[700] px-2.5 py-1 rounded-full shrink-0 ${isActive ? 'bg-white/15 text-white' : 'bg-[#FFF8F0] border border-[#E8E0D6] text-[#6B6B6B]'}`}>
                          {progress.overall}%
                        </div>
                      )}
                    </div>
                    
                    {isActive && (
                      <div className="mt-3 animate-fade-up">
                        <div className="text-[13px] leading-[1.4] tracking-[-0.01em] text-white/70 line-clamp-2">
                          {stage.objective.slice(0, 90)}...
                        </div>
                        <div className="mt-3 h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-white rounded-full transition-all duration-1000" style={{ width: `${progress?.overall||20}%` }} />
                        </div>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 bg-white/80 backdrop-blur-[20px] rounded-[24px] p-5 border border-[#E8E0D6]/50 shadow-[0_4px_20px_rgba(18,20,23,0.05)] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent pointer-events-none" />
          <div className="relative">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-[11px] font-[700] tracking-[0.08em] uppercase text-[#8E8E93]">{activeStage.cefl}</div>
                <h2 className="mt-1.5 text-[18px] font-[700] tracking-[-0.02em] leading-tight text-[#121417] font-[Outfit]">
                  {activeStage.title}
                </h2>
              </div>
              <div className="bg-[#121417] text-white px-3 py-1.5 rounded-full text-[11px] font-[700] tracking-wide shrink-0 shadow-[0_2px_8px_rgba(18,20,23,0.15)]">
                {activeProgress?.overall||0}%
              </div>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2.5">
              {[
                { label: "Grammatik", value: `${activeProgress?.grammarDone||0}/${activeStage.grammarRequirements.length}` },
                { label: "Ord", value: `${activeStage.vocabRequirements.count}` },
                { label: "Skrivning", value: weekly.words },
              ].map((r,i)=>(
                <div key={i} className="bg-[#FFF8F0]/80 backdrop-blur-[12px] rounded-[14px] p-3 text-center border border-[#E8E0D6]/30">
                  <div className="text-[10px] font-[700] tracking-[0.06em] uppercase text-[#8E8E93]">{r.label}</div>
                  <div className="mt-1.5 text-[14px] font-[700] tracking-[-0.01em] text-[#121417]">{r.value}</div>
                </div>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-1 gap-2">
              <button onClick={()=>tap('practice')} className="w-full h-[50px] bg-[#121417] text-white rounded-full text-[14px] font-[600] tracking-[-0.01em] shadow-[0_4px_16px_rgba(18,20,23,0.12)] active:scale-[0.98] transition-all flex items-center justify-center gap-2 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/[0.08] to-white/0 translate-x-[-100%] group-active:translate-x-[100%] transition-transform duration-700" />
                <span className="relative">Fortsæt her — {activeProgress?.grammarDone||0}/{activeStage.grammarRequirements.length} grammatik</span>
                <span className="relative">→</span>
              </button>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={()=>{
                  try{
                    const p = JSON.parse(localStorage.getItem('dansk_progress')||'{}');
                    p[`stage_${activeModule}_cleared`] = true;
                    localStorage.setItem('dansk_progress', JSON.stringify(p));
                    window.location.reload();
                  }catch{}
                }} className="h-[44px] bg-white border border-[#E8E0D6] rounded-full text-[12px] font-[600] active:scale-[0.98] transition">Markér færdig ✓</button>
                <button onClick={()=>tap('grammar')} className="h-[44px] bg-[#FFF8F0] border border-[#E8E0D6]/50 rounded-full text-[12px] font-[600] active:scale-[0.98] transition">Øvelser →</button>
              </div>
              {activeProgress?.cleared && (()=>{ const next = stages[stages.findIndex(s=>s.moduleId===activeModule)+1]; return next ? <button onClick={()=>setActiveModule(next.moduleId)} className="w-full h-[44px] bg-[#007AFF] text-white rounded-full text-[12px] font-[600]">Næste: {next.title.split('—')[0]} →</button> : <button onClick={()=>tap('exam')} className="w-full h-[44px] bg-[#34C759] text-white rounded-full text-[12px] font-[600]">PD3 eksamen →</button>; })()}
            </div>
          </div>
        </div>

        <div className="mt-4 bg-[#E3EDEA]/50 backdrop-blur-[12px] rounded-[16px] p-4 border border-[#8AA99E]/20">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-[#121417] text-white grid place-items-center text-[10px]">✦</div>
            <div className="text-[11px] font-[700] tracking-[0.06em] uppercase text-[#6B8A7F]">Denne uge</div>
          </div>
          <div className="mt-2.5 text-[14px] font-[600] tracking-[-0.01em] text-[#121417] leading-tight">{weekly.title}</div>
          <div className="mt-1 text-[12px] leading-[1.4] tracking-[-0.01em] text-[#6B6B6B] line-clamp-2">{weekly.prompt.slice(0, 80)}...</div>
        </div>

        <div className="mt-8 flex justify-center pb-2">
          <div className="w-32 h-1 bg-[#121417] rounded-full opacity-10" />
        </div>
      </div>
    </div>
  );
}
