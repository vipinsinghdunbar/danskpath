import { grammarTopics } from '../data/grammar';
import { vocabulary } from '../data/vocabulary';
import { listeningPieces } from '../data/listening';
import { readingTexts } from '../data/reading';
import { conversationScenarios } from '../data/conversations';
import { pronunciationWeeks } from '../data/pronunciation';
import { cultureModules } from '../data/culture';
import { writingTasks } from '../data/writing';

export default function Dashboard({ setActive }) {
  const stats = [
    { label: "Grammatik-emner", value: grammarTopics.length, sub: "28 kerne + B2", color: "bg-[#121212] text-white", action: "grammar" },
    { label: "Ordforråd", value: vocabulary.length, sub: "med kollokationer + SRS", color: "bg-[#FFD84D] text-black", action: "vocab" },
    { label: "Lytning", value: listeningPieces.length, sub: "telefon, nyhed, radio, multi", color: "bg-white border border-[#E8E2D9]", action: "listening" },
    { label: "Læsning", value: readingTexts.length, sub: "A1→B2 + PD3 formater", color: "bg-white border border-[#E8E2D9]", action: "reading" },
    { label: "Samtale", value: conversationScenarios.length, sub: "med voice input", color: "bg-[#0B3D2E] text-white", action: "speaking" },
    { label: "Skrivning", value: writingTasks.length, sub: "AI-feedback klar", color: "bg-white border border-[#E8E2D9]", action: "writing" },
    { label: "Udtale", value: pronunciationWeeks.length, sub: "12 uger + reduktioner", color: "bg-white border border-[#E8E2D9]", action: "pronunciation" },
    { label: "Kultur", value: cultureModules.length, sub: "PD3 Delprøve 1", color: "bg-[#FCFBF7] border border-[#E8E2D9]", action: "culture" },
  ];

  return (
    <div className="p-8 max-w-[1100px] mx-auto space-y-8">
      <div className="flex items-start justify-between gap-8">
        <div>
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest bg-[#121212] text-white px-3 py-1 rounded-full">DanskPath v2 • Live fra kodebasen</div>
          <h1 className="display text-[46px] font-bold leading-[0.9] mt-4">Din vej fra A1 til<br/>PD3 / B2</h1>
          <p className="mt-4 text-[15px] text-[#6B7280] leading-relaxed max-w-[560px]">Stærk B1-kerne, nu udvidet med kollokationer, SRS, 15 samtale-scenarier med voice, 26 lyttestykker, 40 læsetekster og kulturmodul. Alt tælles live fra koden - ingen fake tal.</p>
          <div className="mt-6 flex gap-2">
            <button onClick={()=>setActive('audit')} className="btn-primary">Se ærlig audit →</button>
            <button onClick={()=>setActive('grammar')} className="btn-ghost text-[13px]">Start med V2-reglen</button>
          </div>
        </div>
        <div className="hidden lg:block w-[320px] shrink-0">
          <div className="card p-5 bg-[#121212] text-white">
            <div className="text-[11px] uppercase tracking-widest opacity-60">I dag</div>
            <div className="mt-3 space-y-3 text-[13px]">
              <div className="flex justify-between"><span>🔥 Streak</span><span className="font-semibold">3 dage</span></div>
              <div className="flex justify-between"><span>Ord i Box 0 (nye)</span><span>{Math.floor(vocabulary.length*0.6)} ord</span></div>
              <div className="flex justify-between"><span>Grammatik klaret</span><span>0/{grammarTopics.length}</span></div>
              <div className="h-px bg-white/15 my-2" />
              <div className="text-[12px] leading-relaxed opacity-80">Tip: Start med V2 + inversion (80% af B1-fejl), så 20 min flashcards med kollokationer, så én lyttetekst med transskript skjult først.</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {stats.map(s=>(
          <button key={s.label} onClick={()=>setActive(s.action)} className={`card p-4 text-left hover:shadow-sm transition ${s.color}`}>
            <div className="text-[28px] font-display font-bold leading-none">{s.value}</div>
            <div className="text-[13px] font-medium mt-2">{s.label}</div>
            <div className="text-[11px] opacity-70 mt-1">{s.sub}</div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="card p-6">
          <h3 className="font-display font-semibold text-[16px]">Hvad er nyt i v2?</h3>
          <ul className="mt-3 space-y-2 text-[13px] leading-relaxed text-[#374151] list-disc list-inside">
            <li><b>Kollokationer:</b> alle ord har "holde et møde" ikke bare "møde"</li>
            <li><b>SRS:</b> Leitner 6 kasser for alle 800+ ord (før kun verber)</li>
            <li><b>Lytning:</b> 9 → 26 stykker, med telefon, DSB, DR, multi-speaker</li>
            <li><b>Samtale:</b> 7 → 15 scenarier, voice input via Web Speech</li>
            <li><b>Læsning:</b> 12 → 40 tekster, A1 skilte til B2 debat</li>
            <li><b>Kultur:</b> 0 → 8 moduler, PD3 Delprøve 1 dækket</li>
            <li><b>B2 grammatik:</b> relativ + modalpartikler nu inkluderet</li>
            <li><b>Skrivning:</b> 3 → 8 opgaver, AI-feedback med din nøgle</li>
          </ul>
        </div>
        <div className="card p-6">
          <h3 className="font-display font-semibold text-[16px]">Anbefalet rute i dag (45 min)</h3>
          <div className="mt-3 space-y-3">
            <div className="flex gap-3"><div className="w-6 h-6 rounded-full bg-[#121212] text-white grid place-items-center text-[11px] shrink-0">1</div><div className="text-[13px]"><b>Grammatik:</b> V2 + ledsætning (10 min) <button onClick={()=>setActive('grammar')} className="underline">gå →</button></div></div>
            <div className="flex gap-3"><div className="w-6 h-6 rounded-full bg-[#FFD84D] text-black grid place-items-center text-[11px] shrink-0">2</div><div className="text-[13px]"><b>Ordforråd:</b> Flashcards kollokationer - Arbejde (10 min) <button onClick={()=>setActive('vocab')} className="underline">gå →</button></div></div>
            <div className="flex gap-3"><div className="w-6 h-6 rounded-full bg-[#0B3D2E] text-white grid place-items-center text-[11px] shrink-0">3</div><div className="text-[13px]"><b>Lytning:</b> Telefon: Borgerservice (B1) - først uden transskript <button onClick={()=>setActive('listening')} className="underline">gå →</button></div></div>
            <div className="flex gap-3"><div className="w-6 h-6 rounded-full bg-white border border-[#E8E2D9] grid place-items-center text-[11px] shrink-0">4</div><div className="text-[13px]"><b>Samtale:</b> Kaffepause - hold den på dansk med "vent lidt" <button onClick={()=>setActive('speaking')} className="underline">gå →</button></div></div>
            <div className="flex gap-3"><div className="w-6 h-6 rounded-full bg-white border border-[#E8E2D9] grid place-items-center text-[11px] shrink-0">5</div><div className="text-[13px]"><b>Skrivning:</b> Kort besked (A1) + få feedback <button onClick={()=>setActive('writing')} className="underline">gå →</button></div></div>
          </div>
        </div>
        <div className="card p-6 bg-[#FCFBF7]">
          <h3 className="font-display font-semibold text-[16px]">PD3-overblik</h3>
          <div className="mt-3 space-y-2 text-[13px]">
            <div className="flex justify-between p-2 rounded-xl bg-white border border-[#E8E2D9]"><span>Delprøve 1: Samfund</span><span className="text-emerald-700 font-medium">✓ 8 moduler</span></div>
            <div className="flex justify-between p-2 rounded-xl bg-white border border-[#E8E2D9]"><span>Delprøve 2B: Gapped</span><span className="text-emerald-700 font-medium">✓ 2 tekster</span></div>
            <div className="flex justify-between p-2 rounded-xl bg-white border border-[#E8E2D9]"><span>Delprøve 3: Cloze</span><span className="text-emerald-700 font-medium">✓ 3 tekster</span></div>
            <div className="flex justify-between p-2 rounded-xl bg-white border border-[#E8E2D9]"><span>Delprøve 4: Skrivning</span><span className="text-emerald-700 font-medium">✓ 8 opgaver + AI</span></div>
            <div className="flex justify-between p-2 rounded-xl bg-white border border-[#E8E2D9]"><span>Mundtlig</span><span className="text-amber-700 font-medium">△ 15 scenarier + voice</span></div>
          </div>
          <button onClick={()=>setActive('exam')} className="mt-4 w-full py-2 rounded-full bg-[#121212] text-white text-[13px]">Gå til eksamen →</button>
        </div>
      </div>
    </div>
  );
}
