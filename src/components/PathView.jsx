import { useState, useEffect } from 'react';
import { stages, getAllStagesProgress, getStageById } from '../lib/stageEngine';
import { markStageClearedServer } from '../lib/progressSync';

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
    else setActiveModule('m1');
  },[]);

  const activeStage = getStageById(activeModule) || stages[0];
  const activeProgress = progresses.find(p=>p.stage.moduleId===activeModule)?.progress || { overall: 0, cleared: false, grammarDone: 0, grammarTotal: activeStage.grammarRequirements.length };

  const tap = (id) => { 
    if(navigator.vibrate) navigator.vibrate(10); 
    setActive(id); 
  };

  const markDone = async () => {
    if(navigator.vibrate) navigator.vibrate(20);
    const key = `stage_${activeModule}_cleared`;
    localStorage.setItem(key, 'true');
    try {
      const progress = JSON.parse(localStorage.getItem('dansk_progress')||'{}');
      activeStage.grammarRequirements.forEach(t=>{
        progress[`grammar_${t}`] = true;
      });
      localStorage.setItem('dansk_progress', JSON.stringify(progress));
    } catch {}
    try {
      await markStageClearedServer(activeModule, activeStage.grammarRequirements);
    } catch {}
    setProgresses(getAllStagesProgress());
    setTimeout(()=>{
      tap('practice');
    }, 300);
  };

  const continueToNext = () => {
    if(navigator.vibrate) navigator.vibrate(10);
    const idx = stages.findIndex(s=>s.moduleId===activeModule);
    if(idx>=0 && idx<stages.length-1){
      const next = stages[idx+1];
      setActiveModule(next.moduleId);
      window.scrollTo(0,0);
      setTimeout(()=>tap('practice'), 600);
    } else {
      tap('practice');
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFBF5] pb-[120px]">
      <div className="max-w-[1100px] mx-auto px-5 lg:px-8 pt-6">
        {/* Header - minimal, no long marketing */}
        <div className="flex items-center justify-between">
          <button onClick={()=>setActive('simple-landing')} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-black text-white grid place-items-center font-bold text-[12px]">D</div>
            <span className="text-[13px] font-[700]">DanskPath</span>
          </button>
          <span className="text-[11px] text-[#8E8E93]">Learning Path</span>
        </div>

        <div className="mt-8">
          <h1 className="text-[28px] font-[700] tracking-tight leading-[0.95]">Din vej</h1>
          <p className="mt-2 text-[15px] leading-[1.4] text-[#3C3C43]/70 max-w-[500px]">Vælg et modul til venstre for at se hvad du lærer.</p>
        </div>

        <div className="mt-8 grid lg:grid-cols-[300px_1fr] gap-6">
          {/* LEFT — Vertical Roadmap - minimal */}
          <div className="bg-white rounded-[24px] p-4 shadow-sm border border-black/5 h-fit lg:sticky lg:top-6">
            <div className="relative">
              <div className="absolute left-[16px] top-[8px] bottom-[8px] w-[2px] border-l-2 border-dashed border-black/10" />
              
              <div className="space-y-2">
                {stages.map((s, idx)=>{
                  const isActive = activeModule===s.moduleId;
                  const prog = progresses.find(p=>p.stage.id===s.id)?.progress;
                  const isDone = prog?.cleared;
                  
                  return (
                    <button 
                      key={s.id} 
                      onClick={()=>{
                        if(navigator.vibrate) navigator.vibrate(10);
                        setActiveModule(s.moduleId);
                      }} 
                      className={`relative w-full text-left pl-[48px] pr-3 py-3 rounded-[16px] border transition-all ${isActive ? 'bg-black text-white border-black shadow' : isDone ? 'bg-[#34C759]/10 border-[#34C759]/20' : 'bg-[#F2F2F7] border-transparent hover:bg-white'}`}
                    >
                      <div className={`absolute left-0 top-[14px] w-8 h-8 rounded-full grid place-items-center text-[11px] font-bold border-2 ${isDone ? 'bg-[#34C759] text-white border-[#34C759]' : isActive ? 'bg-white text-black border-white' : 'bg-white text-[#8E8E93] border-black/10'}`}>
                        {isDone ? '✓' : idx+1}
                      </div>
                      
                      <div className={`text-[13px] font-[700] leading-tight ${isActive ? 'text-white' : 'text-black'}`}>Modul {idx+1}</div>
                      <div className={`text-[11px] mt-0.5 ${isActive ? 'text-white/60' : 'text-[#8E8E93]'}`}>{s.cefl} • {prog?.overall||0}%</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT — What you will learn in selected section - minimal, no excessive text */}
          <div className="space-y-4">
            <div className="bg-white rounded-[24px] p-6 shadow-sm border border-black/5">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <div className="text-[11px] font-[700] tracking-widest uppercase bg-black text-white px-3 py-1 rounded-full inline-flex">Modul {stages.findIndex(s=>s.moduleId===activeModule)+1} • {activeStage.cefl}</div>
                  <h2 className="mt-3 text-[22px] font-[700] tracking-tight">{activeStage.title.replace('Modul','Modul').split('—')[0].trim()}</h2>
                  <p className="mt-2 text-[14px] leading-[1.5] text-[#3C3C43]/70">{activeStage.objective.slice(0,120)}...</p>
                </div>
                <div className={`text-[11px] px-2.5 py-1 rounded-full font-[600] ${activeProgress?.cleared ? 'bg-[#34C759] text-white' : 'bg-[#F2F2F7]'}`}>
                  {activeProgress?.cleared ? '✓ Cleared' : `${activeProgress?.overall||0}%`}
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="bg-[#F2F2F7] rounded-[14px] p-3">
                  <div className="text-[10px] font-[700] uppercase text-[#8E8E93]">Grammar</div>
                  <div className="mt-1 text-[14px] font-[700]">{activeProgress?.grammarDone||0}/{activeStage.grammarRequirements.length}</div>
                </div>
                <div className="bg-[#F2F2F7] rounded-[14px] p-3">
                  <div className="text-[10px] font-[700] uppercase text-[#8E8E93]">Vocab</div>
                  <div className="mt-1 text-[14px] font-[700]">{activeStage.vocabRequirements.count} ord</div>
                </div>
              </div>

              <div className="mt-5 flex gap-2 flex-wrap">
                {!activeProgress?.cleared ? (
                  <>
                    <button onClick={markDone} className="px-5 py-2.5 rounded-full bg-[#34C759] text-white text-[13px] font-[600]">Markér færdig ✓</button>
                    <button onClick={()=>tap('practice')} className="px-5 py-2.5 rounded-full bg-black text-white text-[13px] font-[600]">Øvelser →</button>
                  </>
                ) : (
                  <>
                    <button onClick={continueToNext} className="px-5 py-2.5 rounded-full bg-black text-white text-[13px] font-[600]">Continue →</button>
                    <button onClick={()=>tap('practice')} className="px-5 py-2.5 rounded-full bg-white border border-black/10 text-[13px] font-[600]">Øvelser →</button>
                  </>
                )}
              </div>

              <div className="mt-5">
                <div className="text-[11px] font-[700] uppercase text-[#8E8E93]">What you will learn</div>
                <div className="mt-2 text-[13px] leading-[1.5] text-[#3C3C43]/80">{activeStage.difficulty.sentenceLen} • {activeStage.difficulty.grammar.slice(0,80)}...</div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {activeStage.grammarRequirements.slice(0,4).map(g=><span key={g} className="text-[11px] bg-[#F2F2F7] px-2.5 py-1 rounded-full">{g}</span>)}
                  {activeStage.grammarRequirements.length>4 && <span className="text-[11px] text-[#8E8E93]">+{activeStage.grammarRequirements.length-4} more</span>}
                </div>
              </div>

              <div className="mt-5">
                <div className="text-[11px] font-[700] uppercase text-[#8E8E93]">Exercises in this module</div>
                <div className="mt-2 space-y-2">
                  <div className="flex gap-2 items-center text-[13px]"><span className="w-6 h-6 rounded-full bg-black text-white grid place-items-center text-[10px]">1</span> Practice {activeStage.grammarRequirements[0] || 'grammar'} • {activeStage.difficulty.sentenceLen.split(':')[0] || '6-9 words'}</div>
                  <div className="flex gap-2 items-center text-[13px]"><span className="w-6 h-6 rounded-full bg-[#F2F2F7] grid place-items-center text-[10px]">2</span> 10 flashcards • {activeStage.vocabRequirements.count} ord • {activeStage.vocabRequirements.type.split(' ')[0] || 'daily'}</div>
                  <div className="flex gap-2 items-center text-[13px]"><span className="w-6 h-6 rounded-full bg-[#F2F2F7] grid place-items-center text-[10px]">3</span> 1 listening • {activeStage.moduleId==='m1' ? 'alphabet dictation' : activeStage.moduleId==='m2' ? 'DSB announcement' : 'borgerservice phone'}</div>
                  <div className="flex gap-2 items-center text-[13px]"><span className="w-6 h-6 rounded-full bg-[#F2F2F7] grid place-items-center text-[10px]">4</span> Write • {activeStage.moduleId==='m1' ? '30-50 ord my family' : activeStage.moduleId==='m2' ? '60-80 ord sick message' : activeStage.moduleId==='m3' ? '80-120 ord email landlord' : '120-200 ord debate'}</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[20px] p-4 border border-black/5 flex gap-2">
              <button onClick={()=>tap('practice')} className="flex-1 bg-black text-white py-3 rounded-full text-[13px] font-[600]">Practice →</button>
              <button onClick={()=>tap('progress')} className="flex-1 bg-[#F2F2F7] py-3 rounded-full text-[13px] font-[600]">Progress →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
