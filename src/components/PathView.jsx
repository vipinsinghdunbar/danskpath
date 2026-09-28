import { useState, useEffect } from 'react';
import { stages, getAllStagesProgress, getStageById } from '../lib/stageEngine';
import { getWeeklyWriting } from '../lib/writingEngine';

// iPhone-first PathView — clean visual progression, minimal text, no excessive CEFR display
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

  // Only show relevant stage, not all CEFR levels permanently
  const relevantStages = (() => {
    const currentIdx = stages.findIndex(s => s.moduleId === activeModule);
    // Show only current, next, and previous — progressive disclosure
    return stages.slice(Math.max(0, currentIdx - 1), Math.min(stages.length, currentIdx + 2));
  })();

  return (
    <div className="min-h-[100dvh] bg-[#FFFBF5] flex flex-col">
      <div className="h-[env(safe-area-inset-top)] bg-[#FFFBF5] shrink-0" />
      
      {/* Header — minimal, no excessive text */}
      <div className="px-6 pt-2 pb-4 shrink-0 max-w-[390px] mx-auto w-full">
        <div className="flex items-center justify-between">
          <button 
            onClick={()=>setActive('practice')}
            className="w-9 h-9 rounded-full bg-white border border-[#E8E0D6] grid place-items-center text-[16px] active:scale-[0.95] transition-transform"
          >
            ←
          </button>
          <div className="text-[15px] font-[600] text-[#121417]">Min vej</div>
          <div className="w-9 h-9" />
        </div>
      </div>

      <div className="flex-1 px-6 pb-[calc(16px+env(safe-area-inset-bottom))] max-w-[390px] mx-auto w-full overflow-y-auto no-scrollbar">
        
        {/* Title — clean, minimal text, no large block */}
        <div className="pt-2 pb-6">
          <h1 className="text-[28px] font-[700] tracking-[-0.02em] leading-[1.1] text-[#121417] font-[Outfit]">
            Din læringsvej
          </h1>
          <p className="mt-2 text-[15px] leading-[1.4] text-[#6B6B6B]">
            {userLevel} • Næste skridt er markeret
          </p>
        </div>

        {/* Visual progression — clean, not excessive CEFR display */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[20px] top-[20px] bottom-[20px] w-[2px] bg-[#E8E0D6]/60" />
          <div 
            className="absolute left-[20px] top-[20px] w-[2px] bg-[#8AA99E] rounded-full transition-all duration-1000" 
            style={{ height: `${(relevantStages.findIndex(s => s.moduleId === activeModule) + 1) / relevantStages.length * 80}%` }}
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
                  className={`relative w-full text-left bg-white rounded-[20px] p-4 border transition-all active:scale-[0.98] flex gap-4 ${
                    isActive 
                      ? 'border-[#121417] shadow-[0_4px_16px_rgba(18,20,23,0.08)]' 
                      : 'border-[#E8E0D6]/60 shadow-[0_1px_3px_rgba(18,20,23,0.04)] hover:border-[#D6CFC3]'
                  }`}
                >
                  {/* Node */}
                  <div className={`w-10 h-10 rounded-full grid place-items-center text-[13px] font-[700] shrink-0 mt-0.5 transition-all ${
                    isPast ? 'bg-[#8AA99E] text-white' : isActive ? 'bg-[#121417] text-white shadow-[0_2px_8px_rgba(18,20,23,0.15)]' : 'bg-[#FFF8F0] border border-[#E8E0D6] text-[#8E8E93]'
                  }`}>
                    {isPast ? '✓' : idx + 1}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="text-[15px] font-[600] tracking-[-0.01em] text-[#121417] leading-tight">
                          {stage.title.split('—')[0]}
                        </div>
                        <div className="mt-1 text-[12px] font-[500] text-[#8E8E93]">
                          {stage.cefl}
                        </div>
                      </div>
                      {progress && (
                        <div className="text-[11px] font-[600] bg-[#FFF8F0] border border-[#E8E0D6] px-2.5 py-1 rounded-full">
                          {progress.overall}%
                        </div>
                      )}
                    </div>
                    
                    {isActive && (
                      <div className="mt-3 animate-fade-up">
                        <div className="text-[13px] leading-[1.4] text-[#6B6B6B] line-clamp-2">
                          {stage.objective.slice(0, 100)}...
                        </div>
                        <div className="mt-3 h-1.5 bg-[#FFF8F0] rounded-full overflow-hidden">
                          <div className="h-full bg-[#121417] rounded-full transition-all duration-1000" style={{ width: `${progress?.overall||20}%` }} />
                        </div>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active stage detail — minimal, only relevant */}
        <div className="mt-8 bg-white rounded-[24px] p-5 border border-[#E8E0D6]/60 shadow-[0_1px_3px_rgba(18,20,23,0.04)]">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-[11px] font-[700] tracking-widest uppercase text-[#8E8E93]">{activeStage.cefl}</div>
              <h2 className="mt-1 text-[18px] font-[700] tracking-[-0.01em] leading-tight text-[#121417] font-[Outfit]">
                {activeStage.title}
              </h2>
            </div>
            <div className="text-[11px] font-[600] bg-[#FFF8F0] border border-[#E8E0D6] px-2.5 py-1 rounded-full shrink-0">
              {activeProgress?.overall||0}% færdig
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              { label: "Grammatik", value: `${activeProgress?.grammarDone||0}/${activeStage.grammarRequirements.length}` },
              { label: "Ord", value: `${activeStage.vocabRequirements.count}` },
              { label: "Skrivning", value: weekly.words },
            ].map((r,i)=>(
              <div key={i} className="bg-[#FFF8F0] rounded-[12px] p-3 text-center">
                <div className="text-[11px] font-[600] text-[#8E8E93] uppercase tracking-wide">{r.label}</div>
                <div className="mt-1 text-[14px] font-[700] text-[#121417]">{r.value}</div>
              </div>
            ))}
          </div>

          <button onClick={()=>tap('practice')} className="mt-5 w-full h-[48px] bg-[#121417] text-white rounded-full text-[14px] font-[600] active:scale-[0.98] transition-all">
            Fortsæt her →
          </button>
        </div>

        {/* Weekly writing — minimal */}
        <div className="mt-4 bg-[#E3EDEA]/40 rounded-[20px] p-4 border border-[#8AA99E]/20">
          <div className="text-[11px] font-[700] tracking-widest uppercase text-[#6B8A7F]">Denne uge</div>
          <div className="mt-2 text-[14px] font-[600] text-[#121417] leading-tight">{weekly.title}</div>
          <div className="mt-1 text-[12px] leading-[1.4] text-[#6B6B6B] line-clamp-2">{weekly.prompt.slice(0, 80)}...</div>
        </div>

        {/* Bottom safe area */}
        <div className="mt-8 flex justify-center pb-2">
          <div className="w-32 h-1 bg-[#121417] rounded-full opacity-10" />
        </div>
      </div>
    </div>
  );
}
