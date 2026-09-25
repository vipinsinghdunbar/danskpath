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
  },[]);

  const activeStage = getStageById(activeModule) || stages[2];
  const activeProgress = progresses.find(p=>p.stage.moduleId===activeModule)?.progress;
  const weekly = getWeeklyWriting(activeModule);
  const upcoming = getUpcomingWriting(activeModule, 4);

  const tap = (id) => { if(navigator.vibrate) navigator.vibrate(10); setActive(id); };

  return (
    <div className="min-h-screen bg-[#F2F2F7] pb-[120px]">
      <div className="max-w-[1100px] mx-auto px-5 lg:px-8 pt-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-full bg-black text-white grid place-items-center font-bold text-[12px]">◍</div>
          <span className="text-[13px] font-[600]">Learning Path • Modul 1→5 • Full education • No repeat</span>
        </div>
        <h1 className="ios-large-title">Your path from<br/>Modul 1 to PD3</h1>
        <p className="mt-3 text-[17px] leading-[1.4] text-[#3C3C43]/70 max-w-[700px]">Full Danish education — from alphabet and SVO in Modul 1 (A1) to argumentative writing with jo/da/vel in Modul 5 (B1-B2) PD3 ready. Each stage has clear objectives, not just longer questions. Difficulty genuinely increases: from 4-6 words to 15-25 words with 2-3 grammar rules combined. 30-day no-repeat — infinite engine gives new variants of same rule.</p>

        {/* Module selector — iOS segmented */}
        <div className="mt-8 bg-white rounded-full p-1.5 shadow-sm border border-black/5 flex gap-1 overflow-x-auto max-w-fit">
          {stages.map(s=>{
            const isActive = activeModule===s.moduleId;
            const prog = progresses.find(p=>p.stage.id===s.id)?.progress;
            return (
              <button key={s.id} onClick={()=>setActiveModule(s.moduleId)} className={`px-5 py-2.5 rounded-full text-[13px] font-[600] whitespace-nowrap transition-all tap-haptic ${isActive?'bg-black text-white shadow-sm':'text-[#8E8E93] hover:text-black'}`}>
                {s.title.split('—')[0]} • {s.cefl} {prog?.overall?`• ${prog.overall}%`:''}
              </button>
            );
          })}
        </div>

        {/* Active stage detail — iOS cards */}
        <div className="mt-8 grid lg:grid-cols-[1.3fr_0.7fr] gap-4">
          <div className="bg-white rounded-[32px] p-7 shadow-sm border border-black/5">
            <div className="flex justify-between items-start gap-4">
              <div>
                <div className="inline-flex text-[11px] font-[700] tracking-widest uppercase bg-black text-white px-3 py-1.5 rounded-full">{activeStage.moduleId} • {activeStage.cefl}</div>
                <h2 className="mt-4 text-[28px] font-[700] tracking-tight leading-[0.95]">{activeStage.title}</h2>
                <p className="mt-3 text-[15px] leading-[1.5] text-[#3C3C43]/70">{activeStage.objective}</p>
              </div>
              <div className="text-right bg-[#F2F2F7] rounded-[16px] p-3">
                <div className="text-[10px] font-[700] tracking-widest uppercase text-[#8E8E93]">To pass</div>
                <div className="mt-1 text-[12px] font-[600]">{activeStage.passingCriteria.overall}% overall</div>
                <div className="text-[11px] text-[#8E8E93]">{activeStage.grammarRequirements.length} grammar • {activeStage.vocabRequirements.count} vocab</div>
              </div>
            </div>

            {/* Requirements — iOS style */}
            <div className="mt-7 grid grid-cols-3 lg:grid-cols-5 gap-3">
              {[
                { label: "Grammar", value: `${activeProgress?.grammarDone||0}/${activeStage.grammarRequirements.length}`, pct: activeProgress?.grammarPct||0, detail: `${activeStage.grammarRequirements.length} topics • ${activeStage.passingCriteria.grammar}% mastery` },
                { label: "Vocab", value: `${activeStage.vocabRequirements.count}`, pct: 45, detail: `${activeStage.vocabRequirements.type}` },
                { label: "Listening", value: "Enough", pct: 60, detail: "No transcript first" },
                { label: "Reading", value: "Enough", pct: 60, detail: "A1→B2" },
                { label: "Writing", value: "Weekly", pct: 50, detail: "No repeat 60d" },
              ].map((r,i)=>(
                <div key={i} className="bg-[#F2F2F7] rounded-[16px] p-4">
                  <div className="text-[10px] font-[700] tracking-widest uppercase text-[#8E8E93]">{r.label}</div>
                  <div className="mt-2 text-[20px] font-[700] tracking-tight">{r.value}</div>
                  <div className="text-[10px] text-[#8E8E93] mt-1 leading-tight">{r.detail}</div>
                  <div className="mt-3 h-1 bg-white rounded-full overflow-hidden"><div className="h-full bg-black rounded-full transition-all duration-1000" style={{ width: `${r.pct}%` }} /></div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex gap-2">
              <div className={`px-4 py-2 rounded-full text-[12px] font-[600] ${activeProgress?.cleared?'bg-black text-white':'bg-[#F2F2F7] text-[#8E8E93]'}`}>{activeProgress?.cleared?'✓ Stage cleared — next unlocked':`◍ In progress — ${activeProgress?.overall||0}%`}</div>
            </div>

            {/* Difficulty progression — iOS */}
            <div className="mt-8 border-t border-black/5 pt-6">
              <div className="text-[13px] font-[700] tracking-tight">Difficulty — what changes from previous stage?</div>
              <div className="mt-4 grid lg:grid-cols-2 gap-6">
                <div className="bg-[#F2F2F7] rounded-[20px] p-5">
                  <div className="text-[11px] font-[700] tracking-widest uppercase text-[#8E8E93]">This stage</div>
                  <div className="mt-3 space-y-2 text-[13px] leading-[1.5]">
                    <div><b>Sentences:</b> {activeStage.difficulty.sentenceLen}</div>
                    <div><b>Words:</b> {activeStage.difficulty.vocab}</div>
                    <div><b>Grammar:</b> {activeStage.difficulty.grammar}</div>
                  </div>
                  <div className="mt-4 bg-white rounded-[12px] p-3 border border-black/5 text-[12px]"><b>Example:</b> {activeStage.difficulty.example}</div>
                </div>
                <div>
                  <div className="text-[11px] font-[700] tracking-widest uppercase text-[#8E8E93]">Change from previous</div>
                  <div className="mt-2 text-[13px] leading-[1.5] text-[#3C3C43]/80">{activeStage.difficulty.diffFromPrev}</div>
                  <div className="mt-4 text-[11px] text-[#8E8E93]">Topics: {activeStage.grammarRequirements.join(', ')}</div>
                  <button onClick={()=>tap('grammar')} className="mt-4 bg-black text-white px-5 py-2.5 rounded-full text-[13px] font-[600] tap-haptic">Practice these →</button>
                </div>
              </div>
            </div>

            {/* Expected skills */}
            <div className="mt-8 bg-black text-white rounded-[24px] p-6">
              <div className="text-[11px] font-[700] tracking-widest uppercase text-white/60">Expected skills at this stage</div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-[12px] leading-[1.4]">
                {Object.entries(activeStage.expectedSkills).map(([skill, arr])=>(
                  <div key={skill}><span className="font-[700] uppercase text-[10px] text-white/60">{skill}:</span> <span className="text-white/80">{Array.isArray(arr)?arr.join(', '):arr}</span></div>
                ))}
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="space-y-4">
            <div className="bg-white rounded-[24px] p-6 shadow-sm border border-black/5">
              <div className="text-[13px] font-[700]">Weekly writing • {activeStage.title.split('—')[0]}</div>
              <div className="mt-3">
                <div className="text-[15px] font-[600] tracking-tight">{weekly.title}</div>
                <div className="mt-2 text-[13px] leading-[1.4] text-[#8E8E93] line-clamp-3">{weekly.prompt}</div>
                <div className="mt-3 flex gap-1.5 flex-wrap">{weekly.checklist.map(c=><span key={c} className="text-[10px] bg-[#F2F2F7] px-2.5 py-1 rounded-full">{c}</span>)}</div>
                <div className="mt-3 text-[11px] text-[#8E8E93]">{weekly.words} words • Week {weekly.week} • No repeat 60 days</div>
                <button onClick={()=>tap('writing')} className="mt-4 w-full bg-black text-white py-3 rounded-full text-[13px] font-[600] tap-haptic">Write this →</button>
              </div>
            </div>

            <div className="bg-white rounded-[24px] p-5 shadow-sm border border-black/5">
              <div className="text-[13px] font-[700]">Next 4 weeks</div>
              <div className="mt-3 space-y-2">
                {upcoming.map((w,i)=>(
                  <div key={i} className={`p-3 rounded-[12px] ${i===0?'bg-black text-white':'bg-[#F2F2F7]'}`}>
                    <div className="flex justify-between"><span className="text-[12px] font-[600]">Week {w.week}: {w.title}</span><span className={`text-[10px] ${i===0?'text-white/60':'text-[#8E8E93]'}`}>{w.words}</span></div>
                    <div className={`text-[11px] mt-1 line-clamp-2 ${i===0?'text-white/70':'text-[#8E8E93]'}`}>{w.prompt.slice(0,100)}...</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#007AFF]/10 rounded-[20px] p-5 border border-[#007AFF]/20">
              <div className="text-[11px] font-[700] tracking-widest uppercase text-[#007AFF]">Passing criteria</div>
              <div className="mt-2 space-y-1 text-[12px]">
                {Object.entries(activeStage.passingCriteria).filter(([k])=>k!=='evidence' && k!=='overall').map(([k,v])=>(
                  <div key={k} className="flex justify-between"><span>{k}</span><span className="font-bold">{v}%</span></div>
                ))}
              </div>
              <div className="mt-3 text-[11px] text-[#007AFF]/70">Evidence: {activeStage.passingCriteria.evidence}</div>
            </div>
          </div>
        </div>

        {/* All stages overview — iOS table */}
        <div className="mt-8 bg-white rounded-[24px] p-6 shadow-sm border border-black/5">
          <div className="text-[13px] font-[700]">All stages — how difficulty genuinely increases</div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-[12px]">
              <thead className="text-[11px] font-[700] uppercase text-[#8E8E93] border-b border-black/5"><tr><th className="text-left py-2">Stage</th><th>CEFR</th><th>Sentence</th><th>Grammar</th><th>Writing</th><th>Evidence</th></tr></thead>
              <tbody>
                {stages.map(s=>{
                  const p = progresses.find(pp=>pp.stage.id===s.id)?.progress;
                  return (
                    <tr key={s.id} className={`border-b border-black/5 ${activeModule===s.moduleId?'bg-[#F2F2F7]':''}`}><td className="py-3 font-[600]">{s.title}</td><td>{s.cefl}</td><td className="text-[11px]">{s.difficulty.sentenceLen}</td><td className="text-[11px]">{s.grammarRequirements.length} topics</td><td className="text-[11px]">{s.moduleId==='m1'?'30-50':s.moduleId==='m2'?'60-80':s.moduleId==='m3'?'80-120':s.moduleId==='m4'?'120-150':'150-200'} words</td><td className="text-[10px] text-[#8E8E93]">{p?.cleared?'✓ cleared':`${p?.overall||0}%`}</td></tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
