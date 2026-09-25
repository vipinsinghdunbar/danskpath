import { useState } from 'react';
import { grammarTopics } from '../data/grammar';
import { useTTS } from '../hooks/useTTS';

export default function GrammarView() {
  const [activeId, setActiveId] = useState(grammarTopics[0].id);
  const [showAnswers, setShowAnswers] = useState({});
  const { speak, speaking, currentId } = useTTS();
  const active = grammarTopics.find(g=>g.id===activeId);

  const markDone = (id) => {
    const p = JSON.parse(localStorage.getItem('dansk_progress')||'{}');
    p[`grammar_${id}`] = true;
    localStorage.setItem('dansk_progress', JSON.stringify(p));
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-[320px] border-r border-[#E8E2D9] bg-[#F8F6F1] overflow-y-auto hidden lg:block">
        <div className="p-4 sticky top-0 bg-[#F8F6F1] border-b border-[#E8E2D9]">
          <h2 className="font-display font-bold text-[18px]">Grammatik · Uendelig engine</h2>
          <div className="text-[11px] text-[#6B7280] mt-1">Forklaring før drill. Engelsk først. Nok til PD3.</div>
          <div className="mt-2 text-[11px] px-2 py-1 rounded-full bg-[#EEF2FB] border border-[#D6E0F5] text-[#2A4F9E] inline-block">Princip: V2 er 80% af B1-fejl — normalt</div>
          <details className="mt-2 text-[10px] text-[#6B7280]"><summary className="cursor-pointer">Detaljer</summary>{grammarTopics.length} emner · 761 base + uendelig · 30-dage regel ingen gentagelse</details>
        </div>
        <div className="p-2 space-y-1">
          {grammarTopics.map(t=>{
            const done = (()=>{ try { return JSON.parse(localStorage.getItem('dansk_progress')||'{}')[`grammar_${t.id}`]; } catch { return false; } })();
            return (
              <button key={t.id} onClick={()=>setActiveId(t.id)} className={`w-full text-left px-3 py-3 rounded-xl border transition ${activeId===t.id?'bg-white border-[#121417] shadow-sm':'bg-transparent border-transparent hover:bg-white'}`}>
                <div className="flex justify-between items-start gap-2">
                  <div className="text-[13px] font-medium leading-tight">{done?'✓ ':''}{t.title}</div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border ${t.level==='A1'?'bg-emerald-50 border-emerald-200': t.level==='A2'?'bg-blue-50 border-blue-200': t.level==='B1'?'bg-amber-50 border-amber-200':'bg-red-50 border-red-200'}`}>{t.level}</span>
                </div>
                <div className="text-[11px] text-[#6B7280] mt-1 line-clamp-2">{t.summary}</div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 lg:p-8 bg-white pb-[100px] lg:pb-8">
        <div className="max-w-[760px] mx-auto">
          {/* Mobile selector */}
          <div className="lg:hidden mb-4">
            <select value={activeId} onChange={e=>setActiveId(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-[#E8E2D9] bg-[#F8F6F1] text-[14px]">
              {grammarTopics.map(t=><option key={t.id} value={t.id}>{t.title} ({t.level})</option>)}
            </select>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] px-2 py-1 rounded-full bg-[#121417] text-white">{active.level}</span>
            <span className="text-[11px] uppercase tracking-widest text-[#6B7280]">{active.category}</span>
            <span className="text-[11px] px-2 py-1 rounded-full bg-[#EEF2FB] border border-[#D6E0F5] text-[#2A4F9E]">Engelsk først → Dansk</span>
          </div>
          <h1 className="display text-[30px] lg:text-[36px] font-bold leading-[0.95] tracking-tight">{active.title}</h1>
          <p className="mt-3 text-[14px] leading-relaxed text-[#2D3136]">{active.summary}</p>

          {/* English first bridge */}
          <div className="mt-6 card p-5 bg-[#EEF2FB] border-[#D6E0F5]">
            <div className="text-[11px] uppercase tracking-widest text-[#2A4F9E] font-medium mb-2">🇬🇧 Engelsk først — broen du allerede har</div>
            <p className="text-[14px] leading-relaxed text-[#1E3A5F]">{active.englishBridge || "På engelsk gør du V2 nogle gange: 'Never have I seen...'. På dansk gør du det i hver sætning. Du ejer allerede mekanismen."}</p>
          </div>

          <div className="mt-6 card p-6 bg-[#F8F6F1]">
            <div className="text-[11px] uppercase tracking-widest text-[#6B7280] mb-2 font-medium">Lektion — forklaring før drill</div>
            <p className="text-[15px] leading-relaxed">{active.lesson}</p>
          </div>

          <div className="mt-8">
            <h3 className="font-display font-semibold text-[18px] mb-3">Eksempler • tap for lyd</h3>
            <div className="space-y-2">
              {active.examples.map((ex,i)=>(
                <div key={i} className="flex items-center justify-between gap-3 card p-3 card-hover">
                  <div>
                    <div className="font-medium text-[15px]">{ex.da}</div>
                    {ex.en && <div className="text-[13px] text-[#6B7280]">{ex.en}</div>}
                    {ex.note && <div className="text-[11px] text-[#9CA3AF] mt-1">{ex.note}</div>}
                  </div>
                  <button onClick={()=>speak(ex.da, `${active.id}-${i}`)} className={`shrink-0 w-9 h-9 rounded-full grid place-items-center border ${speaking && currentId===`${active.id}-${i}`?'bg-[#121417] text-white animate-pulse':'bg-white border-[#E8E2D9] hover:bg-[#F8F6F1]'}`}>▶</button>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-display font-semibold text-[18px] mb-1">Øvelser — med grunde på hvert svar</h3>
            <p className="text-[12px] text-[#6B7280] mb-3">Ikke bare rigtigt/forkert. Hvorfor er det rigtigt, hvorfor er dit svar fristende?</p>
            <div className="space-y-3">
              {active.exercises.map((ex,i)=>{
                const key = `${active.id}-${i}`;
                const shown = showAnswers[key];
                return (
                  <div key={i} className="card p-4">
                    <div className="text-[14px] font-medium">{ex.q}</div>
                    {ex.hint && <div className="text-[11px] text-[#6B7280] mt-1">Hint: {ex.hint}</div>}
                    <div className="mt-3 flex gap-2 flex-wrap">
                      <button onClick={()=>setShowAnswers(s=>({...s, [key]: !s[key]}))} className="btn-ghost text-[13px]">{shown ? 'Skjul svar' : 'Vis svar + forklaring'}</button>
                      {shown && <div className="text-[13px] bg-[#EEF2FB] border border-[#D6E0F5] px-3 py-2 rounded-xl text-[#1E3A5F]"><b>{ex.a}</b> — {ex.why || ex.hint || "V2: verbet på plads 2. På engelsk S-V-O, på dansk V2. Dit fejl-svar er fristende fordi engelsk ikke inverterer her."}</div>}
                    </div>
                    {shown && (
                      <div className="mt-3 text-[12px] leading-relaxed bg-[#F8F6F1] border border-[#E8E2D9] rounded-xl p-3">
                        <b>Hvorfor er dit fejl-svar fristende?</b> Fordi du tænker på engelsk S-V-O: "I dag jeg arbejder" lyder som "Today I work". Men dansk kræver inversion når noget andet end subjektet står først. Derfor: "I dag arbejder jeg".<br/>
                        <b>Regel:</b> {active.summary}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <button onClick={()=>{markDone(active.id); alert('Markeret som klaret! Næste anbefaling opdateres i Øv.');}} className="mt-6 btn-accent">Marker som klaret ✓</button>
          </div>

          <div className="mt-6 border border-[#2A4F9E] bg-[#EEF2FB] p-4 text-[12px] leading-[1.6]">
            <div className="text-[11px] uppercase tracking-widest font-[600] text-[#1E3A5F]">Normaliser kampen — du er ikke alene</div>
            <div className="mt-2 font-serif text-[#1E3A5F] space-y-1">
              <div>• 80% af B1-fejl er V2 — normalt. Andre på Modul 1-5 kæmper også med dette.</div>
              <div>• Ledsætning vender ordstillingen: 'ikke kommer' ikke 'kommer ikke' — alle fejler første uge.</div>
              <div>• Sin/hans: 'Anna henter sin søn' vs 'hendes søn' — stor forskel i børnehaven, derfor vigtigt.</div>
              <div>• Box0 der føles svært er meningen. SRS virker fordi du glemmer — anden gang 30% bedre.</div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-[#121417] text-white rounded-xl text-[13px] leading-relaxed">
            <b>PD3-tip + ærlig feedback:</b> V2-fejl koster dyrt i Delprøve 3 og 4. Tjek altid: står verbet på plads 2? I ledsætninger: står 'ikke' FØR verbet? Vi siger ikke "nice try" — vi siger hvad du skrev, hvad der er korrekt, og hvorfor.
          </div>
        </div>
      </div>
    </div>
  );
}
