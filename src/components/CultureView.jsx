import { useState } from 'react';
import { cultureModules } from '../data/culture';

export default function CultureView() {
  const [activeId, setActiveId] = useState(cultureModules[0].id);
  const active = cultureModules.find(c=>c.id===activeId);

  const markDone = () => {
    const p = JSON.parse(localStorage.getItem('dansk_progress')||'{}');
    const doneSet = new Set(p.cultureDoneIds||[]);
    doneSet.add(activeId);
    p.cultureDoneIds = Array.from(doneSet);
    p.cultureDone = doneSet.size;
    localStorage.setItem('dansk_progress', JSON.stringify(p));
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-[320px] border-r border-[#E8E2D9] bg-[#FCFBF7] overflow-y-auto">
        <div className="p-4 sticky top-0 bg-[#FCFBF7] border-b border-[#E8E2D9]">
          <h2 className="font-display font-bold text-[18px]">Kultur & PD3 • {cultureModules.length}</h2>
          <div className="text-[11px] text-[#6B7280] mt-1">Delprøve 1 - samfundsforståelse</div>
        </div>
        <div className="p-2 space-y-1">
          {cultureModules.map(m=>(
            <button key={m.id} onClick={()=>setActiveId(m.id)} className={`w-full text-left px-3 py-3 rounded-xl border ${activeId===m.id?'bg-white border-[#121212] shadow-sm':'border-transparent hover:bg-white'}`}>
              <div className="flex justify-between gap-2"><span className="text-[13px] font-medium leading-tight">{m.title}</span>{m.pd3Relevant && <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#FFD84D] border border-[#FFD84D] shrink-0 h-fit">PD3</span>}</div>
              <div className="text-[11px] text-[#6B7280] mt-1 line-clamp-2">{m.summary}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 bg-white">
        <div className="max-w-[720px] mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] px-2 py-1 rounded-full bg-[#121212] text-white">{active.level}</span>
            {active.pd3Relevant && <span className="text-[11px] px-2 py-1 rounded-full bg-[#FFD84D] border border-[#FFD84D]">PD3 Delprøve 1 relevant</span>}
            <button onClick={markDone} className="ml-auto btn-ghost text-[11px]">Marker som læst ✓</button>
          </div>
          <h1 className="display text-[32px] font-bold leading-tight">{active.title}</h1>
          <p className="mt-2 text-[14px] text-[#6B7280]">{active.summary}</p>

          <div className="mt-6 card p-6 bg-[#FCFBF7] text-[15px] leading-relaxed whitespace-pre-wrap">
            {active.content}
          </div>

          <div className="mt-6">
            <h3 className="font-display font-semibold text-[16px] mb-2">Nøgleord</h3>
            <div className="flex flex-wrap gap-1.5">
              {active.keywords.map(k=>(
                <span key={k} className="px-3 py-1 rounded-full bg-white border border-[#E8E2D9] text-[12px]">{k}</span>
              ))}
            </div>
          </div>

          {active.quiz.length>0 && (
            <div className="mt-8">
              <h3 className="font-display font-semibold text-[16px] mb-3">Mini-quiz</h3>
              {active.quiz.map((q,i)=>(
                <div key={i} className="card p-4">
                  <div className="text-[14px] font-medium">{q.q}</div>
                  <div className="mt-2 space-y-1">
                    {q.options.map((opt,oi)=>(
                      <div key={oi} className={`px-3 py-2 rounded-xl border text-[13px] ${oi===q.a?'bg-emerald-50 border-emerald-200':'bg-white border-[#E8E2D9]'}`}>{opt} {oi===q.a?'✓':''}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-10 p-4 bg-[#0B3D2E] text-white rounded-xl text-[13px] leading-relaxed">
            <b>PD3 Delprøve 1 tip:</b> 30 spørgsmål, 45 min. Handler om dansk demokrati, velfærd, arbejdsmarked, værdier. Man skal ikke kunne årstal, men forstå principper: universalisme, flad struktur, tillid, foreningsliv.
          </div>
        </div>
      </div>
    </div>
  );
}
