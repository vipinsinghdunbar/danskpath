import { useState } from 'react';
import { examParts } from '../data/exam';

export default function ExamView() {
  const [activeId, setActiveId] = useState(examParts[0].id);
  const active = examParts.find(e=>e.id===activeId);
  const [timerActive, setTimerActive] = useState(false);
  const [seconds, setSeconds] = useState(0);

  // simple timer
  useState(()=>{
    if(!timerActive) return;
    const id = setInterval(()=>setSeconds(s=>s+1),1000);
    return ()=>clearInterval(id);
  });

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-[320px] border-r border-[#E8E2D9] bg-[#FCFBF7] overflow-y-auto">
        <div className="p-4 sticky top-0 bg-[#FCFBF7] border-b border-[#E8E2D9]">
          <h2 className="font-display font-bold text-[18px]">Eksamen PD3</h2>
          <div className="text-[11px] text-[#6B7280] mt-1">6 delprøver • 4 skriftlige + mundtlig</div>
          <button onClick={()=>{setTimerActive(!timerActive); if(!timerActive) setSeconds(0);}} className={`mt-3 w-full py-2 rounded-full text-[12px] border font-medium ${timerActive?'bg-red-600 text-white border-red-600':'bg-white border-[#E8E2D9]'}`}>{timerActive?`⏱ ${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,'0')} - Stop`:'⏱ Start eksamenstimer'}</button>
        </div>
        <div className="p-2 space-y-1">
          {examParts.map(p=>(
            <button key={p.id} onClick={()=>setActiveId(p.id)} className={`w-full text-left px-3 py-3 rounded-xl border ${activeId===p.id?'bg-white border-[#121212] shadow-sm':'border-transparent hover:bg-white'}`}>
              <div className="text-[13px] font-medium leading-tight">{p.title}</div>
              <div className="text-[11px] text-[#6B7280] mt-1">{p.time} • {p.description.slice(0,60)}...</div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 bg-white">
        <div className="max-w-[720px] mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] px-2 py-1 rounded-full bg-[#121212] text-white">{active.time}</span>
            <span className="text-[11px] uppercase tracking-widest text-[#6B7280]">PD3</span>
          </div>
          <h1 className="display text-[30px] font-bold leading-tight">{active.title}</h1>
          <p className="mt-3 text-[14px] text-[#6B7280] leading-relaxed">{active.description}</p>

          <div className="mt-8 space-y-4">
            {active.tasks.length===0 ? (
              <div className="card p-6 bg-[#FCFBF7] text-[14px] text-[#6B7280]">Denne delprøve bruger indhold fra andre moduler (læsning, skrivning). Gå til Læsning for Delprøve 2A/2B/3, og Skrivning for Delprøve 4. Her er formatet forklaret.</div>
            ) : active.tasks.map((t,i)=>(
              <div key={i} className="card p-5">
                {t.q && (
                  <>
                    <div className="text-[14px] font-medium">{t.q}</div>
                    <div className="mt-3 space-y-2">
                      {t.options.map((opt,oi)=>(
                        <div key={oi} className={`px-3 py-2 rounded-xl border text-[13px] ${oi===t.a?'bg-emerald-50 border-emerald-200':'bg-white border-[#E8E2D9]'}`}>{opt}</div>
                      ))}
                    </div>
                  </>
                )}
                {t.text && (
                  <>
                    <div className="text-[14px] leading-relaxed">{t.text}</div>
                    {t.gaps && <div className="mt-3 text-[12px] text-[#6B7280]">Gaps: {t.gaps.join(' | ')}</div>}
                    {t.options && <div className="mt-3 flex flex-wrap gap-1.5">{t.options.map((o,oi)=><span key={oi} className="px-2 py-1 rounded-full bg-white border border-[#E8E2D9] text-[11px]">{o}</span>)}</div>}
                  </>
                )}
                {t.sentence && (
                  <>
                    <div className="text-[14px]">{t.sentence}</div>
                    <div className="mt-2 flex gap-2">{t.options.map((o,oi)=><span key={oi} className={`px-3 py-1 rounded-full border text-[12px] ${oi===t.a?'bg-emerald-50 border-emerald-200':'bg-white border-[#E8E2D9]'}`}>{o}</span>)}</div>
                  </>
                )}
                {t.prompt && <div className="text-[14px] italic bg-[#FCFBF7] p-3 rounded-xl border border-[#E8E2D9]">{t.prompt}</div>}
              </div>
            ))}
          </div>

          <div className="mt-10 p-5 bg-[#121212] text-white rounded-xl">
            <h3 className="font-display font-semibold text-[16px]">Simuleret eksamen - sådan øver du</h3>
            <ol className="mt-3 text-[13px] leading-relaxed list-decimal list-inside space-y-1 opacity-90">
              <li>Sæt timer på {active.time} (knappen i venstre side).</li>
              <li>Lav Delprøve 2B + 3 fra Læsning-modulet (gapped + cloze).</li>
              <li>Skriv Delprøve 4 i Skrivning-modulet uden hjælpemidler, kun ordbog.</li>
              <li>Brug AI-feedback bagefter til at rette.</li>
              <li>Mundtlig: optag dig selv på 2 min om et billede.</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
