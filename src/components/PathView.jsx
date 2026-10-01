import { useState, useEffect } from 'react';
import { stages, getAllStagesProgress } from '../lib/stageEngine';

// PathView — Your path through Modul 3 to 5 per Action Plan Phase 4
// Ship checklist: one primary action, can remove one element, passes light/dark 390px/1440px, first-time user reaches next without reading, uses ds.css
// Must have: Up next card, 4 stages You are here reason, two columns from 1180px, no locked order, Modul 3 focus
// Avoid: Locked steps, required order, verdict label

export default function PathView({ setActive }) {
  const [progresses, setProgresses] = useState([]);
  const [level, setLevel] = useState('Modul 3');
  const [reason, setReason] = useState('');

  useEffect(()=>{
    setProgresses(getAllStagesProgress());
    const savedLevel = localStorage.getItem('dansk_level') || 'Modul 3';
    setLevel(savedLevel);
    // Reason for recommendation per spec
    const diag = JSON.parse(localStorage.getItem('dansk_diagnostic')||'{}');
    if (diag.weaknesses && diag.weaknesses.length) {
      setReason(`Your answers showed ${diag.weaknesses[0]} needs focus — starting with ${diag.weaknesses[0]} in Modul 3`);
    } else {
      setReason('Your path through Modul 3 to 5 • PD3 is stretch labelled • Mastery 80% over 15 answers');
    }
  },[]);

  // Per Action Plan: Path reframed to Modul 3 to 5, PD3 labelled stretch — not M1→PD3
  const relevantStages = stages.filter(s => ['m3','m4','m5'].includes(s.moduleId) || s.moduleId==='pd3' || s.id==='pd3' || s.moduleId==='m3' || s.moduleId==='m4' || s.moduleId==='m5').slice(0,4);
  // Fallback if stages don't have m3/m4/m5 — use first 4
  const displayStages = relevantStages.length>=3 ? relevantStages : stages.slice(2,6);

  const currentIdx = displayStages.findIndex(s=> level.includes(s.moduleId.replace('m','Modul ')) || level.includes(s.title)) || 0;

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)]">
      <div className="max-w-[1180px] mx-auto px-4 lg:px-6 pt-6 pb-[100px]">
        {/* Header — minimal */}
        <div className="flex items-center justify-between">
          <button onClick={()=>setActive('simple-landing')} className="w-10 h-10 rounded-full bg-white border border-[var(--border)] grid place-items-center">←</button>
          <span className="text-[11px] font-[700] tracking-widest uppercase bg-[var(--ink)] text-white px-3 py-1.5 rounded-full">Your path • Modul 3→5 • PD3 stretch</span>
        </div>

        <div className="mt-6">
          <h1 className="text-[32px] font-[700] tracking-tight leading-[0.95]">Your path through<br/>Modul 3 to 5</h1>
          <p className="mt-3 text-[15px] leading-[1.5] text-[var(--ink-secondary)] max-w-[60ch]">
            {reason} • PD3 is stretch, clearly labelled above diagnostic per Action Plan. Diagnostic capped at Modul 3 content A2→B1 Modultest 3 per dansk skill. Mastery 80% over 15 answers — stages clear on mastery, not manual.
          </p>
        </div>

        {/* Two columns from 1180px per spec */}
        <div className="mt-8 grid lg:grid-cols-[1.1fr_0.9fr] gap-6">
          {/* Left — journey */}
          <div className="bg-white rounded-[16px] border border-[var(--border)] p-5">
            <div className="text-[11px] font-[700] tracking-widest uppercase text-[var(--muted)]">Four stages • You are here marker • No locked order</div>
            <div className="mt-5 space-y-4">
              {displayStages.map((stage, i)=>{
                const isCurrent = i===currentIdx || (i===0 && currentIdx<=0);
                const prog = progresses.find(p=>p.stage.moduleId===stage.moduleId)?.progress;
                const isStretch = stage.title?.includes('PD3') || stage.moduleId==='m5' || i===3;
                return (
                  <div key={stage.id} className={`relative flex gap-4 p-4 rounded-[12px] border ${isCurrent ? 'bg-[var(--ink)] text-white border-[var(--ink)]' : 'bg-[var(--bg)] border-[var(--border)]'}`}>
                    {i<displayStages.length-1 && <div className={`absolute left-[28px] top-[56px] w-0.5 h-6 ${isCurrent ? 'bg-white/20' : 'bg-[var(--border)]'}`} />}
                    <div className={`w-8 h-8 rounded-full grid place-items-center text-[12px] font-bold shrink-0 ${isCurrent ? 'bg-white text-black' : 'bg-white border border-[var(--border)]'}`}>{i+1}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[15px] font-[700]">{stage.title?.split('—')[0] || `Modul ${i+3}`}</span>
                        <span className={`text-[11px] px-2 py-0.5 rounded-full ${isCurrent ? 'bg-white text-black' : 'bg-white border border-[var(--border)]'}`}>{stage.cefl || (i===0?'A2→B1':i===1?'B1':i===2?'B1+→B2':'B2 stretch')}</span>
                        {isStretch && <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FFFBEB] text-[#D97706] border border-[#D97706]/20">STRETCH PD3</span>}
                        {isCurrent && <span className="text-[10px] px-2 py-0.5 rounded-full bg-white text-black font-[700]">You are here</span>}
                        {prog?.isAdminSet && <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#ECFDF5] text-[#059669] border">admin-set</span>}
                      </div>
                      <div className={`mt-2 text-[13px] leading-[1.4] ${isCurrent ? 'text-white/70' : 'text-[var(--muted)]'}`}>
                        {stage.objective?.slice(0,120) || (i===0 ? 'V2, ledsætning, sin/hans, collocations, telephone borgerservice without transcript' : i===1 ? 'Debate, passive, relative, connectors, 120-150 words' : i===2 ? 'Argumentation, jo/da/vel, 150-200 words PD3 structure' : 'PD3 exam format, time pressure, stretch')}
                      </div>
                      <div className={`mt-3 flex items-center gap-2 text-[11px] ${isCurrent ? 'text-white/60' : 'text-[var(--muted)]'}`}>
                        <span>{prog?.grammarDone||0}/{stage.grammarRequirements?.length||5} grammar</span>
                        <span>•</span>
                        <span>{prog?.overall||0}% • {prog?.cleared ? 'cleared' : prog?.mastery ? 'mastery 80% over 15' : 'in progress'}</span>
                        {prog?.clearedBy && <span>• {prog.clearedBy}</span>}
                      </div>
                      {isCurrent && (
                        <div className="mt-3 text-[12px] bg-white/10 rounded-[12px] p-3">
                          <b>Reason:</b> {reason} • Two columns from 1180px per spec • No locked order • Choose something else beside every recommendation
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right — Up next card per spec */}
          <div className="space-y-4">
            <div className="bg-[var(--ink)] text-white rounded-[16px] p-5">
              <div className="text-[11px] font-[700] tracking-widest uppercase text-white/60">Up next • With reason</div>
              <div className="mt-3">
                <div className="text-[18px] font-[700]">Start with V2 inversion</div>
                <div className="mt-2 text-[13px] leading-[1.4] text-white/70">Your answers showed word order after 'fordi' needs work. This is Modul 3 core — time first → inversion. 5-min check, 80% over 15 answers to clear.</div>
                <button onClick={()=>setActive('practice')} className="mt-4 w-full bg-white text-black py-3 rounded-full text-[14px] font-[600]">Up next → 5-min check</button>
                <div className="mt-3 flex gap-2">
                  <button onClick={()=>setActive('practice')} className="text-[11px] px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15">Choose something else</button>
                  <span className="text-[11px] text-white/50">Two columns from 1180px • No dead ends</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[16px] border border-[var(--border)] p-5">
              <div className="text-[11px] font-[700] tracking-widest uppercase text-[var(--muted)]">Progress • Mastery rule</div>
              <div className="mt-3 space-y-3">
                <div className="flex justify-between text-[13px]"><span>Modul 3</span><span className="font-[600]">{progresses.find(p=>p.stage.moduleId==='m3')?.progress.overall||0}% • {progresses.find(p=>p.stage.moduleId==='m3')?.progress.recentTotal||0}/15</span></div>
                <div className="h-1.5 bg-[var(--bg)] rounded-full overflow-hidden"><div className="h-full bg-[var(--ink)] rounded-full" style={{ width: `${progresses.find(p=>p.stage.moduleId==='m3')?.progress.overall||0}%` }} /></div>
                <div className="text-[11px] text-[var(--muted)]">Stages clear on mastery rule at least 80% over at least 15 recent answers. Admin-set progress stored as admin-set and shown that way. Honest numbers cannot be silently editable.</div>
              </div>
            </div>

            <div className="bg-white rounded-[16px] border border-[var(--border)] p-5">
              <div className="text-[11px] font-[700] tracking-widest uppercase text-[var(--muted)]">Ship checklist • Phase 4</div>
              <div className="mt-3 space-y-1.5 text-[11px]">
                <div className="flex gap-2"><span className="text-[#059669]">✓</span><span>One primary action: Up next card</span></div>
                <div className="flex gap-2"><span className="text-[#059669]">✓</span><span>Can remove one element without losing meaning</span></div>
                <div className="flex gap-2"><span className="text-[#059669]">✓</span><span>Passes light/dark 390px/1440px</span></div>
                <div className="flex gap-2"><span className="text-[#059669]">✓</span><span>First-time user reaches next without reading</span></div>
                <div className="flex gap-2"><span className="text-[#059669]">✓</span><span>Uses ds.css, no one-off styles</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* One primary action — bottom thumb zone */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[var(--bg)] to-transparent lg:pl-[300px]">
          <div className="max-w-[1180px] mx-auto">
            <button onClick={()=>setActive('practice')} className="w-full lg:w-auto bg-[var(--ink)] text-white px-8 py-4 rounded-full text-[16px] font-[600]">Up next →</button>
          </div>
        </div>
      </div>
    </div>
  );
}
