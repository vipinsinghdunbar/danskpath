import { useState } from 'react';
import { readingTexts } from '../data/reading';
import { useTTS } from '../hooks/useTTS';

export default function ReadingView() {
  const [level, setLevel] = useState('Alle');
  const [typeFilter, setTypeFilter] = useState('Alle');
  const [active, setActive] = useState(readingTexts[4]);
  const [answers, setAnswers] = useState({});
  const [showGlossary, setShowGlossary] = useState(false);
  const { speak } = useTTS();

  const filtered = readingTexts.filter(t=>{
    if(level!=='Alle' && t.level!==level) return false;
    if(typeFilter!=='Alle' && t.type!==typeFilter) return false;
    return true;
  });

  const types = [...new Set(readingTexts.map(r=>r.type))];

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-[360px] border-r border-[#E8E2D9] bg-[#FCFBF7] overflow-y-auto">
        <div className="p-4 sticky top-0 bg-[#FCFBF7] border-b border-[#E8E2D9]">
          <h2 className="font-display font-bold text-[18px]">Læsning • {readingTexts.length}</h2>
          <div className="flex gap-1.5 mt-3 flex-wrap">
            {['Alle','A1','A2','B1','B2'].map(l=>(
              <button key={l} onClick={()=>setLevel(l)} className={`px-3 py-1 rounded-full text-[11px] border ${level===l?'bg-[#121212] text-white border-[#121212]':'bg-white border-[#E8E2D9]'}`}>{l}</button>
            ))}
          </div>
          <div className="flex gap-1.5 mt-2 flex-wrap">
            <button onClick={()=>setTypeFilter('Alle')} className={`px-2.5 py-1 rounded-full text-[10px] border ${typeFilter==='Alle'?'bg-[#121212] text-white border-[#121212]':'bg-white border-[#E8E2D9]'}`}>Alle typer</button>
            {types.map(tp=>(
              <button key={tp} onClick={()=>setTypeFilter(tp)} className={`px-2.5 py-1 rounded-full text-[10px] border ${typeFilter===tp?'bg-[#121212] text-white border-[#121212]':'bg-white border-[#E8E2D9]'}`}>{tp}</button>
            ))}
          </div>
        </div>
        <div className="p-2 space-y-1">
          {filtered.map(t=>(
            <button key={t.id} onClick={()=>setActive(t)} className={`w-full text-left px-3 py-3 rounded-xl border ${active.id===t.id?'bg-white border-[#121212] shadow-sm':'border-transparent hover:bg-white'}`}>
              <div className="flex justify-between gap-2"><span className="text-[13px] font-medium leading-tight line-clamp-2">{t.title}</span><span className="shrink-0 text-[10px] px-2 py-0.5 rounded-full bg-white border border-[#E8E2D9]">{t.level}</span></div>
              <div className="text-[11px] text-[#6B7280] mt-1">{t.type} • {t.words} ord</div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 bg-white">
        <div className="max-w-[720px] mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] px-2 py-1 rounded-full bg-[#121212] text-white">{active.level}</span>
            <span className="text-[11px] uppercase tracking-widest text-[#6B7280]">{active.type} • {active.words} ord</span>
          </div>
          <h1 className="display text-[30px] font-bold leading-tight">{active.title}</h1>

          <div className="mt-6 flex gap-2">
            <button onClick={()=>speak(active.text)} className="btn-ghost text-[13px]">▶ Lyt (TTS)</button>
            <button onClick={()=>setShowGlossary(!showGlossary)} className="btn-ghost text-[13px]">{showGlossary?'Skjul gloser':'Vis gloser'}</button>
          </div>

          <div className="mt-6 card p-8 bg-[#FCFBF7] leading-relaxed text-[16px] whitespace-pre-wrap">
            {active.text.split(/(\s+)/).map((tok,i)=>{
              const clean = tok.toLowerCase().replace(/[.,!?;:()"“”]/g,'');
              const hasGloss = active.glossary && active.glossary[clean];
              if(hasGloss) {
                return <span key={i} className="bg-[#FFD84D]/40 border-b border-[#FFD84D] cursor-help" title={active.glossary[clean]}>{tok}</span>;
              }
              return <span key={i}>{tok}</span>;
            })}
          </div>

          {showGlossary && active.glossary && Object.keys(active.glossary).length>0 && (
            <div className="mt-4 card p-4">
              <div className="text-[12px] uppercase tracking-widest text-[#6B7280] mb-2">Gloser</div>
              <div className="grid grid-cols-2 gap-2 text-[13px]">
                {Object.entries(active.glossary).map(([da,en])=>(
                  <div key={da} className="flex justify-between border-b border-[#E8E2D9]/60 py-1"><span className="font-medium">{da}</span><span className="text-[#6B7280]">{en}</span></div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8">
            <h3 className="font-display font-semibold text-[18px] mb-3">Spørgsmål</h3>
            <div className="space-y-3">
              {active.questions.map((q,qi)=>(
                <div key={qi} className="card p-4">
                  <div className="text-[14px] font-medium">{q.q}</div>
                  <div className="mt-3 space-y-2">
                    {q.options.map((opt,oi)=>(
                      <button key={oi} onClick={()=>setAnswers(a=>({...a, [`${active.id}-${qi}`]: oi}))} className={`w-full text-left px-3 py-2 rounded-xl border text-[13px] ${answers[`${active.id}-${qi}`]===oi ? (oi===q.a?'bg-emerald-50 border-emerald-300':'bg-red-50 border-red-300') : 'bg-white border-[#E8E2D9] hover:bg-[#FCFBF7]'}`}>
                        {opt}
                      </button>
                    ))}
                  </div>
                  {answers[`${active.id}-${qi}`]!==undefined && (
                    <div className="mt-2 text-[12px]">{answers[`${active.id}-${qi}`]===q.a ? '✓ Rigtigt!' : `✗ Forkert. Rigtigt: ${q.options[q.a]}`}</div>
                  )}
                </div>
              ))}
              {active.gaps && (
                <div className="card p-4 bg-amber-50 border-amber-200">
                  <div className="text-[13px] font-medium">PD3 Gapped text - træk sætninger</div>
                  <div className="mt-2 text-[13px] text-[#6B7280]">Gaps: {active.gaps.join(' | ')}</div>
                </div>
              )}
              {active.cloze && (
                <div className="card p-4 bg-blue-50 border-blue-200">
                  <div className="text-[13px] font-medium">PD3 Cloze - ord der mangler:</div>
                  <div className="mt-2 flex flex-wrap gap-1.5">{active.cloze.map((w,i)=><span key={i} className="px-2 py-1 rounded-full bg-white border border-blue-200 text-[12px]">{w}</span>)}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
