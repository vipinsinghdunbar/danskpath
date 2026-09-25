import { useState } from 'react';
import { pronunciationWeeks } from '../data/pronunciation';
import { reductionDict } from '../data/listening';
import { useTTS } from '../hooks/useTTS';

export default function PronunciationView() {
  const [activeWeek, setActiveWeek] = useState(1);
  const week = pronunciationWeeks.find(w=>w.week===activeWeek);
  const { speak } = useTTS();
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);

  const startRec = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      const chunks = [];
      mr.ondataavailable = e=>chunks.push(e.data);
      mr.onstop = ()=>{
        const blob = new Blob(chunks, { type: 'audio/webm' });
        setAudioUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach(t=>t.stop());
      };
      mr.start();
      setMediaRecorder(mr);
      setRecording(true);
      setTimeout(()=>{ mr.stop(); setRecording(false); }, 5000);
    } catch(e) { alert("Mikrofon ikke tilladt: "+e.message); }
  };
  const stopRec = () => { mediaRecorder?.stop(); setRecording(false); };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-[280px] border-r border-[#E8E2D9] bg-[#FCFBF7] overflow-y-auto">
        <div className="p-4 border-b border-[#E8E2D9] sticky top-0 bg-[#FCFBF7]">
          <h2 className="font-display font-bold text-[18px]">Udtale • 12 uger</h2>
          <div className="text-[11px] text-[#6B7280] mt-1">Blødt d, stød, r, reduktioner</div>
        </div>
        <div className="p-2 space-y-1">
          {pronunciationWeeks.map(w=>(
            <button key={w.week} onClick={()=>setActiveWeek(w.week)} className={`w-full text-left px-3 py-3 rounded-xl border ${activeWeek===w.week?'bg-white border-[#121212] shadow-sm':'border-transparent hover:bg-white'}`}>
              <div className="text-[11px] uppercase tracking-widest text-[#6B7280]">Uge {w.week}</div>
              <div className="text-[13px] font-medium">{w.title}</div>
              <div className="text-[11px] text-[#6B7280] mt-1 line-clamp-2">{w.focus}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 bg-white">
        <div className="max-w-[760px] mx-auto">
          <div className="text-[11px] uppercase tracking-widest text-[#6B7280]">Uge {week.week}</div>
          <h1 className="display text-[32px] font-bold mt-1">{week.title} — {week.focus}</h1>
          <div className="mt-4 card p-6 bg-[#FCFBF7]">
            <div className="text-[12px] uppercase tracking-widest text-[#6B7280] mb-2">Regel</div>
            <p className="text-[15px] leading-relaxed">{week.rule}</p>
          </div>

          <div className="mt-8">
            <h3 className="font-display font-semibold text-[18px] mb-3">Eksempler</h3>
            <div className="grid grid-cols-2 gap-2">
              {week.examples.map((ex,i)=>(
                <div key={i} className="card p-3 flex justify-between items-center">
                  <div>
                    <div className="font-medium">{ex.da}</div>
                    {ex.spoken && <div className="text-[12px] text-[#6B7280]">→ {ex.spoken}</div>}
                    {ex.en && <div className="text-[11px] text-[#6B7280]">{ex.en}</div>}
                  </div>
                  <button onClick={()=>speak(ex.da)} className="w-8 h-8 rounded-full border border-[#E8E2D9] grid place-items-center text-[10px]">▶</button>
                </div>
              ))}
            </div>
          </div>

          {week.minimal.length>0 && (
            <div className="mt-6">
              <h3 className="font-display font-semibold text-[16px] mb-2">Minimalpar</h3>
              <div className="flex flex-wrap gap-2">
                {week.minimal.map((pair,i)=>(
                  <div key={i} className="px-3 py-2 rounded-full bg-white border border-[#E8E2D9] text-[13px]">{pair.join(' vs ')}</div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 card p-4 bg-[#FFD84D]/20 border-[#FFD84D]">
            <div className="text-[12px] uppercase tracking-widest text-[#6B7280] mb-1">Drill</div>
            <div className="text-[14px]">{week.drill}</div>
            <button onClick={()=>speak(week.drill)} className="mt-3 btn-ghost text-[12px]">▶ Lyt til drill</button>
          </div>

          <div className="mt-10 card p-6">
            <h3 className="font-display font-semibold text-[18px]">Optag dig selv</h3>
            <p className="text-[13px] text-[#6B7280] mt-1">Sammenlign med modellen. Browser optager lokalt - sendes ikke nogen steder.</p>
            <div className="mt-4 flex gap-3 items-center">
              <button onClick={recording?stopRec:startRec} className={`px-4 py-2 rounded-full text-[13px] border ${recording?'bg-red-600 text-white border-red-600 animate-pulse':'bg-white border-[#E8E2D9]'}`}>{recording?'⏹ Stop (5s max)':'● Optag 5 sek'}</button>
              {audioUrl && <audio controls src={audioUrl} className="h-8" />}
            </div>
          </div>

          <div className="mt-10">
            <h3 className="font-display font-semibold text-[18px] mb-3">Reduktionsordbog • {reductionDict.length}</h3>
            <div className="grid grid-cols-2 gap-2">
              {reductionDict.slice(0,16).map((r,i)=>(
                <div key={i} className="card p-3 text-[12px] flex justify-between"><span>{r.written} → <b>{r.spoken}</b></span><button onClick={()=>speak(r.written)} className="text-[10px]">▶</button></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
