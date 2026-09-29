import { useState, useEffect } from 'react';
import { stages, getAllStagesProgress, getStageById, markStageCleared } from '../lib/stageEngine';
import { getGoals } from '../lib/goals';
import { getWeeklyWriting } from '../lib/writingEngine';

function getProgress() {
  try { return JSON.parse(localStorage.getItem('dansk_progress')||'{}'); } catch { return {}; }
}
function getScores() {
  try { return JSON.parse(localStorage.getItem('dansk_scores')||'{}'); } catch { return {}; }
}

export default function RoadmapView({ setActive }) {
  const [progresses, setProgresses] = useState([]);
  const [activeModule, setActiveModule] = useState('m1');
  const [level, setLevel] = useState(null);
  const [diagnostic, setDiagnostic] = useState(null);
  const [goals, setGoals] = useState([]);
  const [progress, setProgress] = useState({});
  const [scores, setScores] = useState({});

  useEffect(()=>{
    setProgresses(getAllStagesProgress());
    setGoals(getGoals());
    setProgress(getProgress());
    setScores(getScores());
    const lvl = localStorage.getItem('dansk_level') || null;
    setLevel(lvl);
    try {
      const diag = JSON.parse(localStorage.getItem('dansk_diagnostic')||'null');
      setDiagnostic(diag);
    } catch {}
    if(lvl){
      if(lvl.includes('Modul 1')) setActiveModule('m1');
      else if(lvl.includes('Modul 2')) setActiveModule('m2');
      else if(lvl.includes('Modul 3')) setActiveModule('m3');
      else if(lvl.includes('Modul 4')) setActiveModule('m4');
      else if(lvl.includes('Modul 5')) setActiveModule('m5');
      else setActiveModule('m3');
    }
  },[]);

  const activeStage = getStageById(activeModule) || stages[2];
  const activeProgress = progresses.find(p=>p.stage.moduleId===activeModule)?.progress;
  const weekly = getWeeklyWriting(activeModule);

  const tap = (id) => { 
    if(navigator.vibrate) navigator.vibrate(10); 
    console.log(`[RoadmapView] tap ${id} from ${activeModule}`);
    setActive(id); 
  };

  const markDone = () => {
    if(navigator.vibrate) navigator.vibrate(20);
    markStageCleared(activeModule);
    setProgresses(getAllStagesProgress());
    setTimeout(()=>tap('practice'), 300);
  };

  const totalStages = stages.length;
  const clearedCount = progresses.filter(p=>p.progress?.cleared).length;
  const overallPct = Math.round((clearedCount / totalStages) * 100) || (level ? 20 : 0);

  const getNextActivity = () => {
    if(!diagnostic) return { title: "Take level test", desc: "7 min to find your start", action: "diagnostic", color: "#007AFF" };
    if(!activeProgress?.cleared){
      const remainingGrammar = activeStage.grammarRequirements.filter(t=>!progress[`grammar_${t}`]);
      if(remainingGrammar.length > 0) return { title: `Practice ${remainingGrammar[0]}`, desc: `${remainingGrammar.length} grammar topics left in ${activeStage.title}`, action: "grammar", color: "#121417" };
      return { title: "Weekly writing", desc: weekly.title, action: "writing", color: "#FF9500" };
    }
    const nextStage = stages[stages.findIndex(s=>s.moduleId===activeModule)+1];
    if(nextStage) return { title: `Start ${nextStage.title}`, desc: nextStage.objective.slice(0,80)+"...", action: "path", color: "#34C759" };
    return { title: "PD3 Exam simulation", desc: "You are ready — practice exam format", action: "exam", color: "#5856D6" };
  };

  const nextActivity = getNextActivity();

  return (
    <div className="min-h-screen bg-[#F2F2F7] pb-[120px]">
      <div className="max-w-[1120px] mx-auto px-5 lg:px-8 pt-6">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-black text-white grid place-items-center font-bold text-[12px]">R</div>
            <div>
              <div className="text-[14px] font-[700] tracking-tight">Your Learning Roadmap • M1 → PD3 • Vertical Timeline</div>
              <div className="text-[11px] text-black/50">Current: {level || "Not yet assessed"} • {clearedCount}/{totalStages} stages cleared • {overallPct}% journey • Select any section to see what you will learn</div>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={()=>tap('practice')} className="px-4 py-2 rounded-full bg-black text-white text-[12px] font-[600]">Practice →</button>
            <button onClick={()=>tap('path')} className="px-4 py-2 rounded-full bg-white border border-black/10 text-[12px] font-[600]">Path detail</button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-6 bg-white rounded-[20px] p-4 border border-black/5 shadow-sm">
          <div className="flex justify-between items-center">
            <span className="text-[11px] font-[700] tracking-widest uppercase text-[#8E8E93]">Overall Journey • Modul 1 → PD3</span>
            <span className="text-[12px] font-[600]">{overallPct}% • {level || "Start with test"}</span>
          </div>
          <div className="mt-3 h-2 bg-[#F2F2F7] rounded-full overflow-hidden">
            <div className="h-full bg-black rounded-full transition-all duration-1000" style={{ width: `${overallPct}%` }} />
          </div>
        </div>

        <div className="mt-6 grid lg:grid-cols-[320px_1fr] gap-6">
          {/* LEFT — Vertical Roadmap */}
          <div className="space-y-4">
            <div className="bg-white rounded-[24px] p-5 border border-black/5 shadow-sm">
              <div className="text-[11px] font-[700] tracking-widest uppercase text-[#8E8E93]">Roadmap — Select any section</div>
              <div className="mt-4 relative">
                <div className="absolute left-[16px] top-[8px] bottom-[8px] w-[2px] border-l-2 border-dashed border-black/10" />
                <div className="space-y-1">
                  {stages.map((s, idx)=>{
                    const prog = progresses.find(p=>p.stage.moduleId===s.moduleId)?.progress;
                    const isActive = activeModule===s.moduleId;
                    const isCleared = prog?.cleared;
                    return (
                      <button key={s.moduleId} onClick={()=>{ if(navigator.vibrate) navigator.vibrate(10); setActiveModule(s.moduleId); }} className={`relative w-full text-left pl-[48px] pr-3 py-3.5 rounded-[16px] border transition text-left ${isActive ? 'bg-black text-white border-black shadow-lg scale-[1.02]' : isCleared ? 'bg-[#34C759]/10 border-[#34C759]/20' : 'bg-[#F2F2F7] border-transparent hover:bg-white hover:border-black/10'}`}>
                        <div className={`absolute left-0 top-[14px] w-8 h-8 rounded-full grid place-items-center text-[11px] font-bold border-2 ${isCleared ? 'bg-[#34C759] text-white border-[#34C759]' : isActive ? 'bg-[#007AFF] text-white border-[#007AFF]' : 'bg-white text-[#8E8E93] border-black/10'}`}>{isCleared?'✓':idx+1}</div>
                        <div className="text-[12px] font-[700] leading-tight">{s.title.split('—')[0]}</div>
                        <div className={`text-[11px] mt-0.5 ${isActive?'text-white/60':'text-[#8E8E93]'}`}>{s.cefl} • {prog?.overall||0}% • {s.grammarRequirements.length} topics</div>
                        {isActive && <div className="mt-2 text-[10px] bg-white/20 text-white px-2 py-1 rounded-full inline-flex">Fortsæt her — {prog?.grammarDone||0}/{s.grammarRequirements.length}</div>}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="mt-4 p-3 bg-[#007AFF]/10 rounded-[12px] border border-[#007AFF]/20">
                <div className="text-[11px] font-[600] text-[#007AFF]">💡 Tip: Every clickable delivers</div>
                <div className="text-[11px] text-[#007AFF]/70 mt-1">Click any section → see what you will learn on right. Fortsæt her → practice. Markér færdig ✓ → next stage.</div>
              </div>
            </div>

            <div className="bg-white rounded-[20px] p-5 border border-black/5 shadow-sm">
              <div className="text-[11px] font-[700] tracking-widest uppercase text-[#8E8E93]">Your Level • From Assessment</div>
              {diagnostic ? (
                <>
                  <div className="mt-3 flex items-baseline gap-2"><span className="text-[24px] font-[700]">{diagnostic.pct}%</span><span className="text-[12px] font-[600] bg-black text-white px-2.5 py-1 rounded-full">{level}</span></div>
                  <div className="mt-2 text-[11px] text-[#8E8E93]">A1: {diagnostic.levelPct?.A1||0}% • A2: {diagnostic.levelPct?.A2||0}% • B1: {diagnostic.levelPct?.B1||0}% • B2: {diagnostic.levelPct?.B2||0}%</div>
                  <button onClick={()=>tap('diagnostic')} className="mt-3 w-full bg-[#F2F2F7] rounded-full py-2 text-[11px] font-[600]">See full analysis →</button>
                </>
              ) : (
                <>
                  <div className="mt-3 text-[14px] font-[600]">Not yet assessed</div>
                  <button onClick={()=>tap('diagnostic')} className="mt-3 w-full bg-black text-white rounded-full py-2 text-[11px] font-[600]">Take level test → 7 min</button>
                </>
              )}
            </div>

            <div className="rounded-[20px] p-5 border shadow-sm" style={{ background: nextActivity.color, color: nextActivity.color==="#F2F2F7"?"black":"white" }}>
              <div className="text-[11px] font-[700] tracking-widest uppercase opacity-70">Next Recommended • Auto-guided</div>
              <div className="mt-2 text-[16px] font-[700] leading-tight">{nextActivity.title}</div>
              <div className="mt-1 text-[12px] opacity-80">{nextActivity.desc}</div>
              <button onClick={()=>tap(nextActivity.action)} className="mt-3 w-full bg-white text-black rounded-full py-2.5 text-[12px] font-[600]">Start now →</button>
            </div>
          </div>

          {/* RIGHT — Detail */}
          <div className="space-y-4">
            <div className="bg-white rounded-[24px] p-6 border border-black/5 shadow-sm">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <div className="inline-flex text-[11px] font-[700] tracking-widest uppercase bg-black text-white px-3 py-1.5 rounded-full">{activeStage.moduleId} • {activeStage.cefl} • Selected — what you will learn</div>
                  <h2 className="mt-3 text-[22px] font-[700] tracking-tight leading-[0.95]">{activeStage.title}</h2>
                  <p className="mt-2 text-[13px] leading-[1.5] text-[#3C3C43]/70">{activeStage.objective}</p>
                </div>
                <div className="text-right bg-[#F2F2F7] rounded-[14px] p-2.5">
                  <div className="text-[10px] font-[700] uppercase text-[#8E8E93]">To pass</div>
                  <div className="text-[11px] font-[600]">{activeStage.passingCriteria.overall}%</div>
                  <div className={`mt-1 text-[11px] px-2 py-1 rounded-full font-[600] ${activeProgress?.cleared?'bg-[#34C759] text-white':'bg-black text-white'}`}>{activeProgress?.cleared?'✓ Cleared':`${activeProgress?.overall||0}%`}</div>
                </div>
              </div>

              {/* Fortsæt her + Markér færdig — FIXED */}
              <div className="mt-5 bg-[#F2F2F7] rounded-[16px] p-4 flex flex-wrap gap-3 items-center justify-between">
                <div>
                  <div className="text-[13px] font-[700]">Fortsæt her — {activeProgress?.grammarDone||0}/{activeStage.grammarRequirements.length} emner</div>
                  <div className="text-[11px] text-[#8E8E93]">{activeProgress?.cleared?'✓ Stage cleared — next unlocked':`◍ I gang — ${activeProgress?.overall||0}%`}</div>
                </div>
                <div className="flex gap-2">
                  {!activeProgress?.cleared ? (
                    <>
                      <button onClick={markDone} className="px-4 py-2 rounded-full bg-[#34C759] text-white text-[12px] font-[600]">Markér færdig ✓</button>
                      <button onClick={()=>tap('practice')} className="px-4 py-2 rounded-full bg-black text-white text-[12px] font-[600]">Fortsæt her →</button>
                    </>
                  ) : (
                    <button onClick={()=>{ const idx=stages.findIndex(s=>s.moduleId===activeModule); if(idx>=0&&idx<stages.length-1){ setActiveModule(stages[idx+1].moduleId); setTimeout(()=>tap('practice'),500);} else tap('practice'); }} className="px-4 py-2 rounded-full bg-black text-white text-[12px] font-[600]">Continue to next stage →</button>
                  )}
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  { label: "Grammar", value: `${activeProgress?.grammarDone||0}/${activeStage.grammarRequirements.length}`, pct: activeProgress?.grammarPct||0, detail: `${activeStage.grammarRequirements.length} topics`, action: "grammar" },
                  { label: "Vocab", value: `${activeStage.vocabRequirements.count}`, pct: 45, detail: activeStage.vocabRequirements.type.split(' ')[0], action: "vocab" },
                  { label: "Writing", value: "Weekly", pct: 50, detail: "60d no repeat", action: "writing" },
                ].map((r,i)=>(
                  <button key={i} onClick={()=>tap(r.action)} className="bg-[#F2F2F7] rounded-[14px] p-3 text-left hover:bg-black hover:text-white group transition">
                    <div className="text-[10px] font-[700] uppercase opacity-60">{r.label}</div>
                    <div className="mt-1 text-[16px] font-[700]">{r.value}</div>
                    <div className="text-[10px] opacity-60">{r.detail}</div>
                    <div className="mt-2 h-1 bg-white rounded-full overflow-hidden"><div className="h-full bg-black group-hover:bg-white rounded-full" style={{ width: `${r.pct}%` }} /></div>
                  </button>
                ))}
              </div>

              <div className="mt-5">
                <div className="text-[12px] font-[700]">What you will learn in this section</div>
                <div className="mt-3 bg-[#F2F2F7] rounded-[16px] p-4">
                  <div className="text-[11px] font-[700] uppercase text-[#8E8E93]">Difficulty + Example</div>
                  <div className="mt-2 text-[12px]"><b>Sentences:</b> {activeStage.difficulty.sentenceLen}</div>
                  <div className="text-[12px]"><b>Grammar:</b> {activeStage.difficulty.grammar}</div>
                  <div className="mt-2 bg-white rounded-[10px] p-2.5 border text-[11px]"><b>Example:</b> {activeStage.difficulty.example}</div>
                  <div className="mt-2 text-[11px] text-[#8E8E93]">Topics: {activeStage.grammarRequirements.join(', ')}</div>
                </div>
                <div className="mt-3 bg-black text-white rounded-[16px] p-4">
                  <div className="text-[11px] font-[700] uppercase text-white/60">Expected skills</div>
                  <div className="mt-2 grid grid-cols-1 gap-1 text-[11px]">{Object.entries(activeStage.expectedSkills).slice(0,3).map(([k,v])=><div key={k}><b>{k}:</b> {Array.isArray(v)?v[0]:v}</div>)}</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[20px] p-5 border border-black/5 shadow-sm">
              <div className="text-[12px] font-[700]">All stages — click any to see what you will learn</div>
              <div className="mt-3 space-y-1.5">
                {stages.map(s=>{
                  const p = progresses.find(pp=>pp.stage.id===s.id)?.progress;
                  const isActive = activeModule===s.moduleId;
                  return (
                    <button key={s.id} onClick={()=>setActiveModule(s.moduleId)} className={`w-full text-left p-2.5 rounded-[12px] flex justify-between items-center border transition ${isActive?'bg-black text-white border-black':'bg-[#F2F2F7] border-transparent hover:bg-white hover:border-black/10'}`}>
                      <div><div className="text-[12px] font-[600]">{s.title}</div><div className={`text-[10px] ${isActive?'text-white/60':'text-[#8E8E93]'}`}>{s.cefl} • {s.difficulty.sentenceLen}</div></div>
                      <div className={`text-[10px] px-2 py-1 rounded-full font-[600] ${p?.cleared ? 'bg-[#34C759] text-white' : isActive ? 'bg-white/20 text-white' : 'bg-white border border-black/10'}`}>{p?.cleared?'✓':`${p?.overall||0}%`}</div>
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
            <button onClick={()=>tap('diagnostic')} className="px-6 py-3 rounded-full bg-white border border-black/10 text-[13px] font-[600]">Retake test</button>
            <button onClick={()=>{
              if(confirm('Reset all progress?')){
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
          <div className="mt-3 text-[11px] text-black/50">Vertical Roadmap Fixed • Select any section → see what you will learn • Fortsæt her + Markér færdig ✓ → practice + next stage • Every clickable delivers</div>
        </div>
      </div>
    </div>
  );
}
