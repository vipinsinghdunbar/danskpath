import { useState, useEffect } from 'react';
import { stages, getAllStagesProgress, getStageById } from '../lib/stageEngine';
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

  const tap = (id) => { if(navigator.vibrate) navigator.vibrate(10); setActive(id); };

  // Calculate overall journey progress
  const totalStages = stages.length;
  const clearedCount = progresses.filter(p=>p.progress?.cleared).length;
  const overallPct = Math.round((clearedCount / totalStages) * 100) || (level ? 20 : 0);

  // Determine next recommended activity
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
              <div className="text-[14px] font-[700] tracking-tight">Your Learning Roadmap • M1 → PD3</div>
              <div className="text-[11px] text-black/50">Current: {level || "Not yet assessed"} • {clearedCount}/{totalStages} stages cleared • {overallPct}% journey</div>
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
          <div className="mt-3 flex gap-1.5 overflow-x-auto">
            {stages.map(s=>{
              const prog = progresses.find(p=>p.stage.moduleId===s.moduleId)?.progress;
              const isActive = activeModule===s.moduleId;
              const isCleared = prog?.cleared;
              return (
                <button key={s.moduleId} onClick={()=>setActiveModule(s.moduleId)} className={`shrink-0 px-3 py-2 rounded-full text-[11px] font-[600] border transition ${isActive ? 'bg-black text-white border-black' : isCleared ? 'bg-[#34C759] text-white border-[#34C759]' : 'bg-white border-black/10 text-[#8E8E93]'}`}>
                  {s.moduleId.toUpperCase()} {isCleared ? '✓' : ''} • {s.cefl}
                </button>
              );
            })}
          </div>
        </div>

        {/* Goals + Diagnostic summary */}
        <div className="mt-6 grid lg:grid-cols-3 gap-4">
          <div className="bg-white rounded-[20px] p-5 border border-black/5 shadow-sm">
            <div className="text-[11px] font-[700] tracking-widest uppercase text-[#8E8E93]">Your Level • From Assessment</div>
            {diagnostic ? (
              <>
                <div className="mt-3 flex items-baseline gap-2"><span className="text-[28px] font-[700] tracking-tight">{diagnostic.pct}%</span><span className="text-[13px] font-[600] bg-black text-white px-2.5 py-1 rounded-full">{level}</span></div>
                <div className="mt-2 text-[12px] text-[#8E8E93]">A1: {diagnostic.levelPct?.A1||0}% • A2: {diagnostic.levelPct?.A2||0}% • B1: {diagnostic.levelPct?.B1||0}% • B2: {diagnostic.levelPct?.B2||0}%</div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {(diagnostic.strengths||[]).slice(0,3).map((s,i)=><span key={i} className="text-[10px] px-2 py-1 rounded-full bg-[#34C759]/10 border border-[#34C759]/20 text-[#34C759] font-[600]">✓ {typeof s==='string'?s:s.category||s.type}</span>)}
                  {(diagnostic.weaknesses||[]).slice(0,3).map((w,i)=><span key={i} className="text-[10px] px-2 py-1 rounded-full bg-[#FF9500]/10 border border-[#FF9500]/20 text-[#FF9500] font-[600]">• {typeof w==='string'?w:w.category||w.type}</span>)}
                </div>
                <button onClick={()=>tap('practice')} className="mt-4 w-full bg-[#F2F2F7] rounded-full py-2.5 text-[12px] font-[600]">See full analysis →</button>
              </>
            ) : (
              <>
                <div className="mt-3 text-[15px] font-[600]">Not yet assessed</div>
                <div className="text-[12px] text-[#8E8E93] mt-1">Take 7-min test to get personal path from weakest skill first</div>
                <button onClick={()=>tap('diagnostic')} className="mt-4 w-full bg-black text-white rounded-full py-2.5 text-[12px] font-[600]">Take level test → 7 min</button>
              </>
            )}
          </div>

          <div className="bg-white rounded-[20px] p-5 border border-black/5 shadow-sm">
            <div className="text-[11px] font-[700] tracking-widest uppercase text-[#8E8E93]">Your Goals • Why you learn</div>
            {goals.length>0 ? (
              <>
                <div className="mt-3 flex flex-wrap gap-2">{goals.map(g=><span key={g.id} className="text-[12px] bg-[#F2F2F7] border border-black/5 rounded-full px-3 py-1.5 font-[500]">{g.icon} {g.label}</span>)}</div>
                <div className="mt-3 text-[11px] text-[#8E8E93]">We adapt recommendations to your goals</div>
                <button onClick={()=>tap('diagnostic')} className="mt-3 text-[11px] font-[600] underline">Edit goals</button>
              </>
            ) : (
              <>
                <div className="mt-3 text-[14px] font-[600]">No goals yet</div>
                <div className="text-[12px] text-[#8E8E93] mt-1">Pick 3 goals in assessment → more relevant practice</div>
                <button onClick={()=>tap('diagnostic')} className="mt-4 w-full bg-[#F2F2F7] rounded-full py-2.5 text-[12px] font-[600]">Pick goals →</button>
              </>
            )}
            <div className="mt-4 pt-4 border-t border-black/5">
              <div className="text-[11px] font-[700] tracking-widest uppercase text-[#8E8E93]">Skills Progress</div>
              <div className="mt-2 grid grid-cols-2 gap-2 text-[11px]">
                <div className="bg-[#F2F2F7] rounded-[10px] p-2"><div className="font-[600]">Grammar</div><div className="text-[#8E8E93]">{Object.keys(progress).filter(k=>k.startsWith('grammar_')).length}/17 topics</div></div>
                <div className="bg-[#F2F2F7] rounded-[10px] p-2"><div className="font-[600]">Listening</div><div className="text-[#8E8E93]">{scores.listeningAcc||0}% acc • {scores.listeningAttempts||0} tries</div></div>
                <div className="bg-[#F2F2F7] rounded-[10px] p-2"><div className="font-[600]">Writing</div><div className="text-[#8E8E93]">{scores.writingAttempts||0} texts</div></div>
                <div className="bg-[#F2F2F7] rounded-[10px] p-2"><div className="font-[600]">Vocab</div><div className="text-[#8E8E93]">Box 0→5 SRS</div></div>
              </div>
            </div>
          </div>

          <div className="rounded-[20px] p-5 border shadow-sm" style={{ background: nextActivity.color, color: nextActivity.color==="#F2F2F7"?"black":"white" }}>
            <div className="text-[11px] font-[700] tracking-widest uppercase opacity-70">Next Recommended • Auto-guided</div>
            <div className="mt-3 text-[18px] font-[700] leading-tight">{nextActivity.title}</div>
            <div className="mt-2 text-[13px] opacity-80 leading-[1.4]">{nextActivity.desc}</div>
            <button onClick={()=>tap(nextActivity.action)} className="mt-4 w-full bg-white text-black rounded-full py-3 text-[13px] font-[600]">Start now →</button>
            <div className="mt-3 text-[10px] opacity-60">System guides you — no wondering what to do. 15 min, one hand, bus-friendly.</div>
          </div>
        </div>

        {/* Active Stage Detail */}
        <div className="mt-6 grid lg:grid-cols-[1.2fr_0.8fr] gap-4">
          <div className="bg-white rounded-[24px] p-6 border border-black/5 shadow-sm">
            <div className="flex justify-between items-start gap-4">
              <div>
                <div className="inline-flex text-[11px] font-[700] tracking-widest uppercase bg-black text-white px-3 py-1.5 rounded-full">{activeStage.moduleId} • {activeStage.cefl}</div>
                <h2 className="mt-3 text-[24px] font-[700] tracking-tight leading-[0.95]">{activeStage.title}</h2>
                <p className="mt-2 text-[13px] leading-[1.5] text-[#3C3C43]/70">{activeStage.objective}</p>
              </div>
              <div className="text-right bg-[#F2F2F7] rounded-[14px] p-2.5">
                <div className="text-[10px] font-[700] tracking-widest uppercase text-[#8E8E93]">To pass</div>
                <div className="mt-1 text-[11px] font-[600]">{activeStage.passingCriteria.overall}% overall</div>
                <div className={`mt-1 text-[11px] px-2 py-1 rounded-full font-[600] ${activeProgress?.cleared?'bg-black text-white':'bg-white border border-black/10'}`}>{activeProgress?.cleared?'✓ Cleared':`${activeProgress?.overall||0}%`}</div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 lg:grid-cols-5 gap-2">
              {[
                { label: "Grammar", value: `${activeProgress?.grammarDone||0}/${activeStage.grammarRequirements.length}`, pct: activeProgress?.grammarPct||0, detail: `${activeStage.grammarRequirements.length} topics`, action: "grammar" },
                { label: "Vocab", value: `${activeStage.vocabRequirements.count}`, pct: 45, detail: activeStage.vocabRequirements.type.split(' ')[0], action: "vocab" },
                { label: "Listening", value: scores.listeningAttempts||0, pct: scores.listeningAcc||0, detail: "No transcript first", action: "listening" },
                { label: "Reading", value: "A1→B2", pct: 60, detail: "Gapped cloze", action: "reading" },
                { label: "Writing", value: "Weekly", pct: 50, detail: "60d no repeat", action: "writing" },
              ].map((r,i)=>(
                <button key={i} onClick={()=>tap(r.action)} className="bg-[#F2F2F7] rounded-[14px] p-3 text-left hover:bg-black hover:text-white group transition">
                  <div className="text-[10px] font-[700] tracking-widest uppercase opacity-60">{r.label}</div>
                  <div className="mt-1 text-[16px] font-[700] tracking-tight">{r.value}</div>
                  <div className="text-[10px] opacity-60 mt-1 leading-tight group-hover:text-white/70">{r.detail}</div>
                  <div className="mt-2 h-1 bg-white rounded-full overflow-hidden"><div className="h-full bg-black group-hover:bg-white rounded-full transition-all" style={{ width: `${r.pct}%` }} /></div>
                </button>
              ))}
            </div>

            <div className="mt-6 border-t border-black/5 pt-5">
              <div className="text-[12px] font-[700]">What changes from previous stage?</div>
              <div className="mt-3 grid lg:grid-cols-2 gap-4">
                <div className="bg-[#F2F2F7] rounded-[16px] p-4">
                  <div className="text-[11px] font-[700] tracking-widest uppercase text-[#8E8E93]">This stage</div>
                  <div className="mt-2 space-y-1.5 text-[12px] leading-[1.4]">
                    <div><b>Sentences:</b> {activeStage.difficulty.sentenceLen}</div>
                    <div><b>Words:</b> {activeStage.difficulty.vocab}</div>
                    <div><b>Grammar:</b> {activeStage.difficulty.grammar}</div>
                  </div>
                  <div className="mt-3 bg-white rounded-[10px] p-2.5 border border-black/5 text-[11px]"><b>Example:</b> {activeStage.difficulty.example}</div>
                </div>
                <div>
                  <div className="text-[11px] font-[700] tracking-widest uppercase text-[#8E8E93]">Change from previous</div>
                  <div className="mt-2 text-[12px] leading-[1.4] text-[#3C3C43]/80">{activeStage.difficulty.diffFromPrev}</div>
                  <div className="mt-3 flex flex-wrap gap-1">{activeStage.grammarRequirements.map(t=><span key={t} className="text-[10px] bg-[#F2F2F7] px-2 py-1 rounded-full">{t}</span>)}</div>
                  <button onClick={()=>tap('grammar')} className="mt-4 bg-black text-white px-4 py-2 rounded-full text-[12px] font-[600]">Practice these →</button>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-black text-white rounded-[20px] p-5">
              <div className="text-[11px] font-[700] tracking-widest uppercase text-white/60">Expected skills at this stage</div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] leading-[1.3]">
                {Object.entries(activeStage.expectedSkills).map(([skill, arr])=>(
                  <div key={skill}><span className="font-[700] uppercase text-[10px] text-white/60">{skill}:</span> <span className="text-white/80">{Array.isArray(arr)?arr.join(', ').slice(0,80):arr}</span></div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-[20px] p-5 border border-black/5 shadow-sm">
              <div className="text-[12px] font-[700]">Weekly writing • {activeStage.title.split('—')[0]}</div>
              <div className="mt-2">
                <div className="text-[14px] font-[600] tracking-tight">{weekly.title}</div>
                <div className="mt-1 text-[12px] leading-[1.4] text-[#8E8E93] line-clamp-3">{weekly.prompt}</div>
                <div className="mt-2 flex gap-1 flex-wrap">{weekly.checklist.map(c=><span key={c} className="text-[10px] bg-[#F2F2F7] px-2 py-1 rounded-full">{c}</span>)}</div>
                <div className="mt-2 text-[10px] text-[#8E8E93]">{weekly.words} words • Week {weekly.week} • No repeat 60d</div>
                <button onClick={()=>tap('writing')} className="mt-3 w-full bg-black text-white py-2.5 rounded-full text-[12px] font-[600]">Write this →</button>
              </div>
            </div>

            <div className="bg-white rounded-[20px] p-4 border border-black/5 shadow-sm">
              <div className="text-[12px] font-[700]">All stages — difficulty increases</div>
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

            <div className="bg-[#007AFF]/10 rounded-[16px] p-4 border border-[#007AFF]/20">
              <div className="text-[11px] font-[700] tracking-widest uppercase text-[#007AFF]">Passing criteria • {activeStage.moduleId}</div>
              <div className="mt-2 space-y-1 text-[11px]">
                {Object.entries(activeStage.passingCriteria).filter(([k])=>k!=='evidence' && k!=='overall').map(([k,v])=>(
                  <div key={k} className="flex justify-between"><span>{k}</span><span className="font-bold">{v}%</span></div>
                ))}
              </div>
              <div className="mt-2 text-[10px] text-[#007AFF]/70">Evidence: {activeStage.passingCriteria.evidence}</div>
            </div>

            <div className="bg-white rounded-[16px] p-4 border border-black/5">
              <div className="text-[11px] font-[700] tracking-widest uppercase text-[#8E8E93]">Quick actions • 15 min one hand</div>
              <div className="mt-3 grid grid-cols-1 gap-2">
                {[
                  { label: "10 flashcards", desc: "holde et møde • SRS Box 0→5", target: "vocab", icon: "✧" },
                  { label: "1 listening", desc: "No transcript first • DSB/DR", target: "listening", icon: "♪" },
                  { label: "Write weekly", desc: `${weekly.words} words • ${weekly.title.slice(0,30)}`, target: "writing", icon: "✍️" },
                ].map(q=>(
                  <button key={q.target} onClick={()=>tap(q.target)} className="text-left p-3 rounded-[14px] bg-[#F2F2F7] hover:bg-black hover:text-white group transition flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white group-hover:bg-white/20 grid place-items-center text-[12px] shadow-sm">{q.icon}</div>
                    <div className="flex-1"><div className="text-[13px] font-[600]">{q.label}</div><div className="text-[11px] opacity-60 group-hover:text-white/70">{q.desc}</div></div>
                    <div className="w-6 h-6 rounded-full bg-black/5 group-hover:bg-white/20 grid place-items-center text-[10px]">→</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center pb-8">
          <div className="inline-flex gap-2">
            <button onClick={()=>tap('practice')} className="px-6 py-3 rounded-full bg-black text-white text-[13px] font-[600]">Go to practice → Today</button>
            <button onClick={()=>tap('diagnostic')} className="px-6 py-3 rounded-full bg-white border border-black/10 text-[13px] font-[600]">Retake test</button>
          </div>
          <div className="mt-3 text-[11px] text-black/50">Personal MVP • M1→PD3 full education • No repeat 30d • Infinite variants • 15 min one hand</div>
        </div>
      </div>
    </div>
  );
}
