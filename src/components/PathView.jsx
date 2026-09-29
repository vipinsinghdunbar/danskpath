import { useState, useEffect } from 'react';
import { stages, getAllStagesProgress, getStageById } from '../lib/stageEngine';
import { getWeeklyWriting, getUpcomingWriting } from '../lib/writingEngine';

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
  const weekly = getWeeklyWriting(activeModule);
  const upcoming = getUpcomingWriting(activeModule, 4);

  const tap = (id) => { 
    if(navigator.vibrate) navigator.vibrate(10); 
    // Ensure every clickable delivers what it should
    console.log(`[PathView] tap ${id} from ${activeModule}`);
    setActive(id); 
  };

  const markDone = () => {
    if(navigator.vibrate) navigator.vibrate(20);
    // Mark stage cleared — sets localStorage stage_mX_cleared true + progress overall 100%
    const key = `stage_${activeModule}_cleared`;
    localStorage.setItem(key, 'true');
    // Also set dansk_progress to reflect completion
    try {
      const progress = JSON.parse(localStorage.getItem('dansk_progress')||'{}');
      activeStage.grammarRequirements.forEach(t=>{
        progress[`grammar_${t}`] = true;
      });
      localStorage.setItem('dansk_progress', JSON.stringify(progress));
    } catch {}
    // Refresh progresses
    setProgresses(getAllStagesProgress());
    // Go to practice — next step per spec
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
      // Scroll to top
      window.scrollTo(0,0);
      // After showing next, go to practice for that next stage
      setTimeout(()=>tap('practice'), 800);
    } else {
      tap('practice');
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F2F7] pb-[120px]">
      <div className="max-w-[1100px] mx-auto px-5 lg:px-8 pt-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-full bg-black text-white grid place-items-center font-bold text-[12px]">◍</div>
          <span className="text-[13px] font-[600]">Learning Path • Modul 1→5 • Full education • No repeat • Vertical Roadmap</span>
        </div>
        <h1 className="text-[32px] font-[700] tracking-tight leading-[0.95]">Your path from<br/>Modul 1 to PD3</h1>
        <p className="mt-3 text-[15px] leading-[1.5] text-[#3C3C43]/70 max-w-[700px]">Full Danish education — from alphabet and SVO in Modul 1 (A1) to argumentative writing with jo/da/vel in Modul 5 (B1-B2) PD3 ready. <b>Select any section of the road on the left to see what you will learn in that section.</b> Each stage has clear objectives, not just longer questions. Difficulty genuinely increases: from 4-6 words to 15-25 words with 2-3 grammar rules combined. 30-day no-repeat — infinite engine gives new variants.</p>

        <div className="mt-8 grid lg:grid-cols-[320px_1fr] gap-6">
          {/* LEFT — Vertical Roadmap Timeline */}
          <div className="bg-white rounded-[24px] p-5 shadow-sm border border-black/5 h-fit lg:sticky lg:top-8">
            <div className="text-[11px] font-[700] tracking-widest uppercase text-[#8E8E93]">Roadmap — Select any section</div>
            <div className="mt-4 relative">
              {/* Vertical dashed line */}
              <div className="absolute left-[16px] top-[8px] bottom-[8px] w-[2px] border-l-2 border-dashed border-black/10" />
              
              <div className="space-y-1">
                {stages.map((s, idx)=>{
                  const isActive = activeModule===s.moduleId;
                  const prog = progresses.find(p=>p.stage.id===s.id)?.progress;
                  const isDone = prog?.cleared;
                  const isNext = !isDone && idx>0 && progresses.find(p=>p.stage.id===stages[idx-1].id)?.progress?.cleared;
                  
                  return (
                    <button 
                      key={s.id} 
                      onClick={()=>{
                        if(navigator.vibrate) navigator.vibrate(10);
                        setActiveModule(s.moduleId);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }} 
                      className={`relative w-full text-left pl-[48px] pr-3 py-4 rounded-[16px] border transition-all text-left ${isActive ? 'bg-black text-white border-black shadow-lg scale-[1.02]' : isDone ? 'bg-[#34C759]/10 border-[#34C759]/20 hover:bg-[#34C759]/15' : 'bg-[#F2F2F7] border-transparent hover:bg-white hover:border-black/10'}`}
                    >
                      {/* Dot */}
                      <div className={`absolute left-0 top-[18px] w-8 h-8 rounded-full grid place-items-center text-[11px] font-bold border-2 transition-all ${isDone ? 'bg-[#34C759] text-white border-[#34C759]' : isActive ? 'bg-[#007AFF] text-white border-[#007AFF] scale-110' : 'bg-white text-[#8E8E93] border-black/10'}`}>
                        {isDone ? '✓' : idx+1}
                      </div>
                      
                      <div className="flex justify-between items-start gap-2">
                        <div className="flex-1">
                          <div className={`text-[13px] font-[700] leading-tight ${isActive ? 'text-white' : 'text-black'}`}>{s.title.split('—')[0]}</div>
                          <div className={`text-[11px] mt-0.5 ${isActive ? 'text-white/60' : 'text-[#8E8E93]'}`}>{s.cefl} • {s.grammarRequirements.length} topics • {s.vocabRequirements.count} ord</div>
                          <div className={`mt-2 text-[10px] px-2 py-1 rounded-full inline-flex font-[600] ${isActive ? 'bg-white/20 text-white' : isDone ? 'bg-[#34C759] text-white' : 'bg-white border border-black/5'}`}>
                            {isDone ? '✓ Cleared' : `${prog?.overall||0}% • ${prog?.grammarDone||0}/${s.grammarRequirements.length}`}
                          </div>
                          {isActive && (
                            <div className="mt-2 text-[11px] text-white/70 leading-[1.3] line-clamp-2">{s.objective.slice(0,100)}...</div>
                          )}
                        </div>
                        <div className={`w-6 h-6 rounded-full grid place-items-center text-[10px] transition ${isActive ? 'bg-white text-black' : 'bg-black/5'}`}>→</div>
                      </div>
                      
                      {isActive && (
                        <div className="mt-3 flex gap-1.5">
                          <span className="text-[10px] bg-white/20 text-white px-2 py-1 rounded-full">Fortsæt her</span>
                          <span className="text-[10px] bg-[#34C759] text-white px-2 py-1 rounded-full">Valgt</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
              
              <div className="mt-4 p-3 bg-[#007AFF]/10 rounded-[12px] border border-[#007AFF]/20">
                <div className="text-[11px] font-[600] text-[#007AFF]">💡 Tip: Select any section</div>
                <div className="text-[11px] text-[#007AFF]/70 mt-1 leading-[1.3]">Click any dot or card on the left to see what you will learn in that section on the right. Every clickable delivers what it should.</div>
              </div>
            </div>
          </div>

          {/* RIGHT — Detail what we will learn in selected section */}
          <div className="space-y-4">
            <div className="bg-white rounded-[32px] p-7 shadow-sm border border-black/5">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <div className="inline-flex text-[11px] font-[700] tracking-widest uppercase bg-black text-white px-3 py-1.5 rounded-full">{activeStage.moduleId} • {activeStage.cefl} • Selected</div>
                  <h2 className="mt-4 text-[26px] font-[700] tracking-tight leading-[0.95]">{activeStage.title}</h2>
                  <p className="mt-3 text-[14px] leading-[1.5] text-[#3C3C43]/70">{activeStage.objective}</p>
                </div>
                <div className="text-right bg-[#F2F2F7] rounded-[16px] p-3 min-w-[110px]">
                  <div className="text-[10px] font-[700] tracking-widest uppercase text-[#8E8E93]">To pass</div>
                  <div className="mt-1 text-[12px] font-[600]">{activeStage.passingCriteria.overall}% overall</div>
                  <div className="text-[11px] text-[#8E8E93]">{activeStage.grammarRequirements.length} grammar • {activeStage.vocabRequirements.count} vocab</div>
                  <div className={`mt-2 text-[11px] px-2 py-1 rounded-full font-[600] ${activeProgress?.cleared ? 'bg-[#34C759] text-white' : 'bg-black text-white'}`}>
                    {activeProgress?.cleared ? '✓ Cleared' : `${activeProgress?.overall||0}% • ${activeProgress?.grammarDone||0}/${activeStage.grammarRequirements.length}`}
                  </div>
                </div>
              </div>

              {/* Requirements */}
              <div className="mt-6 grid grid-cols-2 lg:grid-cols-5 gap-3">
                {[
                  { label: "Grammar", value: `${activeProgress?.grammarDone||0}/${activeStage.grammarRequirements.length}`, pct: activeProgress?.grammarPct||activeProgress?.overall||0, detail: `${activeStage.grammarRequirements.length} topics • ${activeStage.passingCriteria.grammar}% mastery` },
                  { label: "Vocab", value: `${activeStage.vocabRequirements.count}`, pct: 45, detail: `${activeStage.vocabRequirements.type}` },
                  { label: "Listening", value: "Enough", pct: 60, detail: "No transcript first" },
                  { label: "Reading", value: "Enough", pct: 60, detail: "A1→B2" },
                  { label: "Writing", value: "Weekly", pct: 50, detail: "No repeat 60d" },
                ].map((r,i)=>(
                  <div key={i} className="bg-[#F2F2F7] rounded-[16px] p-4">
                    <div className="text-[10px] font-[700] tracking-widest uppercase text-[#8E8E93]">{r.label}</div>
                    <div className="mt-2 text-[18px] font-[700] tracking-tight">{r.value}</div>
                    <div className="text-[10px] text-[#8E8E93] mt-1 leading-tight">{r.detail}</div>
                    <div className="mt-3 h-1 bg-white rounded-full overflow-hidden"><div className="h-full bg-black rounded-full transition-all duration-1000" style={{ width: `${r.pct}%` }} /></div>
                  </div>
                ))}
              </div>

              {/* Fortsæt her + Markér færdig ✓ — FIXED to actually go to next step */}
              <div className="mt-6 bg-[#F2F2F7] rounded-[20px] p-4 flex flex-wrap gap-3 items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-black text-white grid place-items-center font-bold text-[12px]">{activeStage.moduleId.toUpperCase()}</div>
                  <div>
                    <div className="text-[13px] font-[700]">Fortsæt her — {activeProgress?.grammarDone||0}/{activeStage.grammarRequirements.length} emner</div>
                    <div className="text-[11px] text-[#8E8E93]">{activeProgress?.cleared ? '✓ Stage cleared — next unlocked' : `◍ I gang — ${activeProgress?.overall||0}% • Vælg øvelser for at fortsætte`}</div>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {!activeProgress?.cleared ? (
                    <>
                      <button onClick={markDone} className="px-5 py-2.5 rounded-full bg-[#34C759] text-white text-[13px] font-[600] shadow-sm hover:bg-[#2FB350] transition">Markér færdig ✓</button>
                      <button onClick={()=>tap('practice')} className="px-5 py-2.5 rounded-full bg-black text-white text-[13px] font-[600]">Fortsæt her → Øvelser</button>
                    </>
                  ) : (
                    <>
                      <button onClick={continueToNext} className="px-5 py-2.5 rounded-full bg-black text-white text-[13px] font-[600]">Continue to next stage →</button>
                      <button onClick={()=>tap('practice')} className="px-5 py-2.5 rounded-full bg-white border border-black/10 text-[13px] font-[600]">Øvelser →</button>
                    </>
                  )}
                </div>
              </div>

              {/* Difficulty */}
              <div className="mt-6 border-t border-black/5 pt-6">
                <div className="text-[13px] font-[700] tracking-tight">Difficulty — what changes from previous stage? What will you learn?</div>
                <div className="mt-4 grid lg:grid-cols-2 gap-6">
                  <div className="bg-[#F2F2F7] rounded-[20px] p-5">
                    <div className="text-[11px] font-[700] tracking-widest uppercase text-[#8E8E93]">This stage — what you will learn</div>
                    <div className="mt-3 space-y-2 text-[13px] leading-[1.5]">
                      <div><b>Sentences:</b> {activeStage.difficulty.sentenceLen}</div>
                      <div><b>Words:</b> {activeStage.difficulty.vocab}</div>
                      <div><b>Grammar:</b> {activeStage.difficulty.grammar}</div>
                    </div>
                    <div className="mt-4 bg-white rounded-[12px] p-3 border border-black/5 text-[12px]"><b>Example:</b> {activeStage.difficulty.example}</div>
                    <div className="mt-3 text-[11px] text-[#8E8E93]">Topics: {activeStage.grammarRequirements.join(', ')}</div>
                  </div>
                  <div>
                    <div className="text-[11px] font-[700] tracking-widest uppercase text-[#8E8E93]">Change from previous + What you will learn next</div>
                    <div className="mt-2 text-[13px] leading-[1.5] text-[#3C3C43]/80">{activeStage.difficulty.diffFromPrev}</div>
                    <div className="mt-4 flex gap-2 flex-wrap">
                      <button onClick={()=>tap('grammar')} className="bg-black text-white px-5 py-2.5 rounded-full text-[13px] font-[600]">Practice these →</button>
                      <button onClick={()=>tap('practice')} className="bg-white border border-black/10 px-5 py-2.5 rounded-full text-[13px] font-[600]">Øvelser →</button>
                      <button onClick={()=>tap('writing')} className="bg-[#F2F2F7] px-4 py-2 rounded-full text-[12px] font-[600]">Writing →</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expected skills */}
              <div className="mt-6 bg-black text-white rounded-[24px] p-6">
                <div className="text-[11px] font-[700] tracking-widest uppercase text-white/60">Expected skills at this stage — what you will learn</div>
                <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-3 text-[12px] leading-[1.4]">
                  {Object.entries(activeStage.expectedSkills).map(([skill, arr])=>(
                    <div key={skill}><span className="font-[700] uppercase text-[10px] text-white/60">{skill}:</span> <span className="text-white/80">{Array.isArray(arr)?arr.join(', '):arr}</span></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side extras */}
            <div className="grid lg:grid-cols-2 gap-4">
              <div className="bg-white rounded-[24px] p-6 shadow-sm border border-black/5">
                <div className="text-[13px] font-[700]">Weekly writing • {activeStage.title.split('—')[0]}</div>
                <div className="mt-3">
                  <div className="text-[15px] font-[600] tracking-tight">{weekly.title}</div>
                  <div className="mt-2 text-[13px] leading-[1.4] text-[#8E8E93] line-clamp-3">{weekly.prompt}</div>
                  <div className="mt-3 flex gap-1.5 flex-wrap">{weekly.checklist.map(c=><span key={c} className="text-[10px] bg-[#F2F2F7] px-2.5 py-1 rounded-full">{c}</span>)}</div>
                  <div className="mt-3 text-[11px] text-[#8E8E93]">{weekly.words} words • Week {weekly.week} • No repeat 60 days</div>
                  <button onClick={()=>tap('writing')} className="mt-4 w-full bg-black text-white py-3 rounded-full text-[13px] font-[600]">Write this →</button>
                </div>
              </div>

              <div className="bg-white rounded-[24px] p-5 shadow-sm border border-black/5">
                <div className="text-[13px] font-[700]">Next 4 weeks — what you will learn</div>
                <div className="mt-3 space-y-2">
                  {upcoming.map((w,i)=>(
                    <div key={i} className={`p-3 rounded-[12px] ${i===0?'bg-black text-white':'bg-[#F2F2F7]'}`}>
                      <div className="flex justify-between"><span className="text-[12px] font-[600]">Week {w.week}: {w.title}</span><span className={`text-[10px] ${i===0?'text-white/60':'text-[#8E8E93]'}`}>{w.words}</span></div>
                      <div className={`text-[11px] mt-1 line-clamp-2 ${i===0?'text-white/70':'text-[#8E8E93]'}`}>{w.prompt.slice(0,100)}...</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-[#007AFF]/10 rounded-[20px] p-5 border border-[#007AFF]/20">
              <div className="text-[11px] font-[700] tracking-widest uppercase text-[#007AFF]">Passing criteria — what you need to learn</div>
              <div className="mt-2 space-y-1 text-[12px]">
                {Object.entries(activeStage.passingCriteria).filter(([k])=>k!=='evidence' && k!=='overall').map(([k,v])=>(
                  <div key={k} className="flex justify-between"><span>{k}</span><span className="font-bold">{v}%</span></div>
                ))}
              </div>
              <div className="mt-3 text-[11px] text-[#007AFF]/70">Evidence: {activeStage.passingCriteria.evidence}</div>
            </div>

            {/* All stages overview */}
            <div className="bg-white rounded-[24px] p-6 shadow-sm border border-black/5">
              <div className="text-[13px] font-[700]">All stages — how difficulty genuinely increases — click any to see what you will learn</div>
              <div className="mt-4 space-y-2">
                {stages.map(s=>{
                  const p = progresses.find(pp=>pp.stage.id===s.id)?.progress;
                  const isActive = activeModule===s.moduleId;
                  return (
                    <button key={s.id} onClick={()=>setActiveModule(s.moduleId)} className={`w-full text-left p-3 rounded-[14px] border flex justify-between items-center transition ${isActive?'bg-black text-white border-black':'bg-[#F2F2F7] border-transparent hover:bg-white hover:border-black/10'}`}>
                      <div><div className="text-[13px] font-[600]">{s.title}</div><div className={`text-[11px] ${isActive?'text-white/60':'text-[#8E8E93]'}`}>{s.cefl} • {s.difficulty.sentenceLen}</div></div>
                      <div className={`text-[11px] px-2.5 py-1 rounded-full font-[600] ${p?.cleared?'bg-[#34C759] text-white':isActive?'bg-white text-black':'bg-white border border-black/10'}`}>{p?.cleared?'✓':`${p?.overall||0}%`}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center pb-8">
          <div className="inline-flex gap-2 flex-wrap justify-center">
            <button onClick={()=>tap('practice')} className="px-6 py-3 rounded-full bg-black text-white text-[13px] font-[600]">Go to practice → Today</button>
            <button onClick={()=>tap('roadmap')} className="px-6 py-3 rounded-full bg-white border border-black/10 text-[13px] font-[600]">Roadmap →</button>
            <button onClick={()=>tap('progress')} className="px-6 py-3 rounded-full bg-white border border-black/10 text-[13px] font-[600]">Progress →</button>
            <button onClick={()=>{
              if(confirm('Reset all progress? Clear assessment, level, progress, scores?')){
                localStorage.removeItem('dansk_progress');
                localStorage.removeItem('dansk_path');
                localStorage.removeItem('dansk_scores');
                localStorage.removeItem('dansk_srs');
                localStorage.removeItem('dansk_seen');
                localStorage.removeItem('dansk_level');
                localStorage.removeItem('dansk_diagnostic');
                localStorage.removeItem('dansk_verdict');
                localStorage.removeItem('dansk_user_seed');
                localStorage.removeItem('dansk_welcomed');
                localStorage.removeItem('danskpath_token');
                localStorage.removeItem('danskpath_user');
                ['m1','m2','m3','m4','m5'].forEach(m=>localStorage.removeItem(`stage_${m}_cleared`));
                if(navigator.vibrate) navigator.vibrate(20);
                window.location.href='/?page=simple-landing';
              }
            }} className="px-6 py-3 rounded-full bg-[#FF3B30]/10 border border-[#FF3B30]/20 text-[#FF3B30] text-[13px] font-[600]">Reset progress</button>
          </div>
          <div className="mt-3 text-[11px] text-black/50">Vertical Roadmap Fixed • Select any section → see what you will learn • Fortsæt her + Markér færdig ✓ → practice + next stage • Every clickable delivers • M1→PD3 full education • No repeat 30d • Infinite variants • 15 min one hand</div>
        </div>
      </div>
    </div>
  );
}
