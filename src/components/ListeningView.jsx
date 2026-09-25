import { useState } from 'react';
import { listeningPieces, reductionDict } from '../data/listening';
import { useTTS } from '../hooks/useTTS';
import { getUsed, markUsed, getUnused } from '../lib/tracking';

export default function ListeningView() {
  const [level, setLevel] = useState('Alle');
  const [active, setActive] = useState(listeningPieces[0]);
  const [showTranscript, setShowTranscript] = useState(false);
  const [answers, setAnswers] = useState({});
  const { speak, speaking } = useTTS();

  const saveScore = (correct, total, pieceId) => {
    const acc = total ? Math.round(correct/total*100) : 0;
    const prev = JSON.parse(localStorage.getItem('dansk_scores')||'{}');
    const attempts = (prev.listeningAttempts||0)+1;
    const prevAcc = prev.listeningAcc||0;
    const newAcc = Math.round((prevAcc*(attempts-1) + acc)/attempts);
    localStorage.setItem('dansk_scores', JSON.stringify({ ...prev, listeningAttempts: attempts, listeningAcc: newAcc }));
    markUsed('listening', pieceId);
  };

  const filteredBase = level==='Alle' ? listeningPieces : listeningPieces.filter(p=>p.level===level);
  const used = getUsed('listening');
  const filtered = filteredBase.map(p=>({ ...p, done: used.has(p.id) })).sort((a,b)=> (a.done?1:0)-(b.done?1:0));

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-[360px] border-r border-[#E8E2D9] bg-[#FCFBF7] overflow-y-auto">
        <div className="p-4 sticky top-0 bg-[#FCFBF7] border-b border-[#E8E2D9]">
          <h2 className="font-display font-bold text-[18px]">Lytning · Nok til PD3</h2>
          <div className="flex gap-1.5 mt-3">
            {['Alle','A2','B1','B2'].map(l=>(
              <button key={l} onClick={()=>setLevel(l)} className={`px-3 py-1 rounded-full text-[12px] border ${level===l?'bg-[#121212] text-white border-[#121212]':'bg-white border-[#E8E2D9]'}`}>{l}</button>
            ))}
          </div>
          <div className="mt-3 text-[11px] text-[#6B7280]">Typer: monolog, telefon, nyhed, radio, multi-speaker, annonce, instruktion — uden transskript først</div>
          <details className="mt-2 text-[10px] text-[#6B7280]"><summary>Detaljer</summary>{listeningPieces.length} stykker + uendelig · ingen gentagelse før alle klaret</details>
        </div>
        <div className="p-2 space-y-1">
          {filtered.map(p=>(
            <button key={p.id} onClick={()=>{setActive(p); setShowTranscript(false);}} className={`w-full text-left px-3 py-3 rounded-xl border ${active.id===p.id?'bg-white border-[#121417] shadow-sm':'border-transparent hover:bg-white'} ${p.done?'opacity-60':''}`}>
              <div className="flex justify-between"><span className="text-[13px] font-medium leading-tight">{p.done?'✓ ':''}{p.title}</span><span className="text-[10px] px-2 py-0.5 rounded-full bg-white border border-[#E8E2D9]">{p.level}</span></div>
              <div className="text-[11px] text-[#6B7280] mt-1">{p.type} • {p.duration} {p.done?'• klaret':''}</div>
            </button>
          ))}
        </div>
        <div className="p-4 border-t border-[#E8E2D9]">
          <h3 className="font-semibold text-[13px]">Reduktionsordbog • {reductionDict.length}</h3>
          <div className="mt-2 space-y-1 max-h-[300px] overflow-y-auto">
            {reductionDict.map((r,i)=>(
              <div key={i} className="text-[11px] flex justify-between gap-2 py-1 border-b border-[#E8E2D9]/60"><span>{r.written} → <b>{r.spoken}</b></span><button onClick={()=>speak(r.written)} className="text-[10px]">▶</button></div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 bg-white">
        <div className="max-w-[700px] mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] px-2 py-1 rounded-full bg-[#121212] text-white">{active.level}</span>
            <span className="text-[11px] uppercase tracking-widest text-[#6B7280]">{active.type} • {active.duration}</span>
          </div>
          <h1 className="display text-[30px] font-bold">{active.title}</h1>

          <div className="mt-6 flex gap-3">
            <button onClick={()=>speak(active.transcript)} className={`btn-primary ${speaking?'animate-pulse':''}`}>▶ Afspil (TTS da-DK)</button>
            <button onClick={()=>setShowTranscript(!showTranscript)} className="btn-ghost text-[13px]">{showTranscript?'Skjul transskript':'Vis transskript'}</button>
          </div>

          {showTranscript && (
            <div className="mt-6 card p-6 bg-[#FCFBF7]">
              <div className="text-[12px] uppercase tracking-widest text-[#6B7280] mb-3">Transskript</div>
              <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{active.transcript}</p>
            </div>
          )}

          <div className="mt-8">
            <h3 className="font-display font-semibold text-[18px] mb-3">Forståelsesspørgsmål</h3>
            <div className="space-y-3">
                  {active.questions.map((q,qi)=>(
                <div key={qi} className="card p-4">
                  <div className="text-[14px] font-medium">{q.q}</div>
                  <div className="mt-3 space-y-2">
                    {q.options.map((opt,oi)=>(
                      <button key={oi} onClick={()=>{
                        const newAns = { ...answers, [`${active.id}-${qi}`]: oi };
                        setAnswers(newAns);
                        const correct = active.questions.filter((qq,jj)=> newAns[`${active.id}-${jj}`]===qq.a).length;
                        const total = Object.keys(newAns).filter(k=>k.startsWith(`${active.id}-`)).length;
                        if(total===active.questions.length) saveScore(correct, total, active.id);
                      }} className={`w-full text-left px-3 py-2 rounded-xl border text-[13px] ${answers[`${active.id}-${qi}`]===oi ? (oi===q.a?'bg-emerald-50 border-emerald-300':'bg-red-50 border-red-300') : 'bg-white border-[#E8E2D9] hover:bg-[#F8F6F1]'}`}>
                        {opt} {answers[`${active.id}-${qi}`]===oi && (oi===q.a?'✓':'✗')}
                      </button>
                    ))}
                  </div>
                  {answers[`${active.id}-${qi}`]!==undefined && (
                    <div className="mt-2 text-[12px] text-[#6B7280]">{answers[`${active.id}-${qi}`]===q.a ? 'Rigtigt!' : `Forkert. Rigtigt svar: ${q.options[q.a]}`}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-xl text-[13px] leading-relaxed">
            <b>Real-speaker tip:</b> TTS er kun træning. For at forstå rigtig dansk, hør DR Radio og markér reduktioner. Denne app har 30 entries — prøv at finde flere selv og tilføj dem til din egen liste.
          </div>
        </div>
      </div>
    </div>
  );
}
