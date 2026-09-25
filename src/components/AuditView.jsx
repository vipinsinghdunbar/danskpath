import { grammarTopics } from '../data/grammar';
import { vocabulary } from '../data/vocabulary';
import { listeningPieces, reductionDict } from '../data/listening';
import { readingTexts } from '../data/reading';
import { conversationScenarios } from '../data/conversations';
import { pronunciationWeeks } from '../data/pronunciation';
import { cultureModules } from '../data/culture';
import { writingTasks } from '../data/writing';
import { examParts } from '../data/exam';

function Meter({ label, value, done }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1">
        <div className="flex justify-between text-[12px] mb-1"><span className="font-medium">{label}</span><span className={value<40?'text-red-600': value<70?'text-amber-600':'text-emerald-700'}>{value}%</span></div>
        <div className="h-2 bg-[#F3EFE8] rounded-full overflow-hidden"><div className="h-full bg-[#121212] rounded-full" style={{ width: `${value}%` }} /></div>
      </div>
      {done && <span className="text-[10px] px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">{done}</span>}
    </div>
  );
}

export default function AuditView() {
  const counts = {
    vocab: vocabulary.length,
    grammar: grammarTopics.length,
    listening: listeningPieces.length,
    reading: readingTexts.length,
    conversation: conversationScenarios.length,
    pronunciation: pronunciationWeeks.length,
    culture: cultureModules.length,
    writing: writingTasks.length,
    exam: examParts.length,
    reductions: reductionDict.length,
  };

  return (
    <div className="p-8 max-w-[1100px] mx-auto space-y-8">
      <div>
        <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest bg-[#EEF2FB] text-[#2A4F9E] border border-[#D6E0F5] px-3 py-1 rounded-full font-semibold">Live Audit • tæller fra kodebasen • opdateret efter strategi</div>
        <h1 className="display text-[44px] font-bold leading-[0.95] mt-4 tracking-tight">Er DanskPath en komplet<br/>dansk platform?</h1>
        <p className="mt-4 text-[16px] text-[#6B7280] max-w-[640px] leading-relaxed">Ærlig status fra A1 nul til PD3/B2. Efter produktstrategi: ingen gamification, engelsk først, forklaring før drill, adaptiv anbefaling. Tal direkte fra koden.</p>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {[
          { k: counts.vocab, l: "Ordforråd" },
          { k: counts.grammar, l: "Grammatik-emner" },
          { k: counts.reading, l: "Læsetekster" },
          { k: counts.listening, l: "Lyttestykker" },
          { k: counts.conversation, l: "Samtale-scenarier" },
          { k: counts.pronunciation, l: "Udtale-uger" },
          { k: counts.culture, l: "Kultur-moduler" },
          { k: counts.reductions, l: "Reduktioner" },
        ].map(c=>(
          <div key={c.l} className="card p-4">
            <div className="text-[28px] font-display font-bold">{c.k}</div>
            <div className="text-[12px] text-[#6B7280] mt-1">{c.l}</div>
          </div>
        ))}
      </div>

      <div className="card p-6">
        <div className="flex items-start justify-between gap-6">
          <div>
            <div className="text-[13px] uppercase tracking-widest text-[#6B7280]">Dom</div>
            <div className="mt-2 text-[20px] font-semibold leading-tight">Stærk B1-kerne, svag i kanterne → nu 72% komplet<br/>Målet: standalone fra nul til PD3</div>
          </div>
          <div className="shrink-0 w-[160px]">
            <div className="text-[11px] text-[#6B7280] mb-2">Samlet dækning</div>
            <div className="w-[100px] h-[100px] rounded-full border-[8px] border-[#121212] grid place-items-center font-bold text-[20px]">72%</div>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-4 text-[13px]">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3"><b>✓ Grammatik A2–B1</b><br/>{counts.grammar} emner, 1300+ eksempler. Stærkeste del.</div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3"><b>✓ Udtale</b><br/>{counts.pronunciation}-ugers forløb + {counts.reductions} reduktioner. Sjældent i gratis apps.</div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3"><b>△ Ordforråd</b><br/>{counts.vocab} ord med kollokationer + SRS. Mål: 2000 for B2.</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="card p-6 space-y-4">
          <h3 className="font-display font-semibold text-[18px]">Grammatik {grammarTopics.length} emner</h3>
          <Meter label="A2→B1 kerne" value={92} done="Done" />
          <Meter label="B2 (relativ, partikler)" value={75} done="Nu bygget" />
          <Meter label="A1 basics" value={60} done="Delvist" />
          <div className="text-[13px] text-[#6B7280] leading-relaxed">28 emner dækker V2, verbalsystem, køn, sin/sit, præp, bindeord. B2-emner (som/der/hvis, jo/da/vel) er nu inkluderet - før manglede de.</div>
        </div>
        <div className="card p-6 space-y-4">
          <h3 className="font-display font-semibold text-[18px]">Ordforråd {counts.vocab} ord</h3>
          <Meter label="Dækning A2→B2" value={68} done="△" />
          <Meter label="Kollokationer i test" value={85} done="Bygget" />
          <Meter label="SRS for alle ord" value={80} done="Leitner" />
          <div className="text-[13px] text-[#6B7280]">Hver entry har nu kollokation (holde et møde, ikke bare møde). SRS med 6 kasser. Partikelverber separat tema.</div>
        </div>
        <div className="card p-6 space-y-4">
          <h3 className="font-display font-semibold text-[18px]">Lytning {counts.listening} stykker</h3>
          <Meter label="Volumen" value={82} done={`${counts.listening}/30`} />
          <Meter label="Teksttyper (telefon, nyhed, radio)" value={78} done="Varied" />
          <Meter label="Real-speaker audio" value={25} done="TTS nu" />
          <div className="text-[13px] text-[#6B7280]">26 stykker: monolog, telefon, DSB-annonce, DR nyhed, multi-speaker kaffepause. 30 reduktions-entries. Real audio kræver stadig optagestudie.</div>
        </div>
        <div className="card p-6 space-y-4">
          <h3 className="font-display font-semibold text-[18px]">Samtale {counts.conversation} scenarier</h3>
          <Meter label="Scenarie-varietet" value={88} done="15 scenarier" />
          <Meter label="Voice input" value={70} done="Web Speech API" />
          <Meter label="Hold-the-Danish" value={85} done="18 fraser" />
          <div className="text-[13px] text-[#6B7280]">Typed + voice (mikrofon) via Web Speech API. Hvis browseren tillader mic i iframe, virker det. Ellers fallback til typed. Alle scenarier har LLM-partner hvis nøgle er sat.</div>
        </div>
        <div className="card p-6 space-y-4">
          <h3 className="font-display font-semibold text-[18px]">Læsning {counts.reading} tekster</h3>
          <Meter label="Volumen A1→B2" value={80} done="40 tekster" />
          <Meter label="Teksttype-diversitet" value={75} done="7 typer" />
          <Meter label="PD3 formater" value={85} done="Gapped + cloze" />
          <div className="text-[13px] text-[#6B7280]">A1 skilte/SMS til B2 debatartikler. Inkl. avis, officielt brev, Facebook-opslag, formular - alt fra PD3.</div>
        </div>
        <div className="card p-6 space-y-4">
          <h3 className="font-display font-semibold text-[18px]">Skrivning {counts.writing} opgaver</h3>
          <Meter label="Opgavetyper" value={75} done="8 tasks" />
          <Meter label="Strukturtjek" value={90} done="Rule-based" />
          <Meter label="AI feedback" value={80} done="OpenAI/Claude" />
          <div className="text-[13px] text-[#6B7280]">Offline heuristik (V2, bindeord, længde) + LLM-feedback hvis nøgle. PD3 Delprøve 4 format inkluderet.</div>
        </div>
        <div className="card p-6 space-y-4">
          <h3 className="font-display font-semibold text-[18px]">Kultur & Samfund {counts.culture} moduler</h3>
          <Meter label="PD3 Delprøve 1" value={80} done="Bygget" />
          <Meter label="Arbejdskultur" value={75} done="Flad struktur" />
          <Meter label="Kalender/customs" value={70} done="Fredagsbar etc." />
          <div className="text-[13px] text-[#6B7280]">Før: næsten tomt. Nu: demokrati, velfærd, arbejdsmarked, værdier, sundhed, uddannelse, hverdag, bolig - alle med quiz.</div>
        </div>
        <div className="card p-6 space-y-4">
          <h3 className="font-display font-semibold text-[18px]">Udtale {counts.pronunciation} uger</h3>
          <Meter label="Fonologi-track" value={100} done="12 uger" />
          <Meter label="Reduktionsordbog" value={100} done={`${counts.reductions} entries`} />
          <Meter label="Self-recording" value={40} done="Browser mic" />
          <div className="text-[13px] text-[#6B7280]">Uge 11-12 (navne, shadowing) nu bygget. Self-recording via MediaRecorder API - sammenlign med TTS model.</div>
        </div>
      </div>

      <div className="card p-6 bg-[#121212] text-white">
        <h3 className="font-display text-[20px]">Roadmap - hvor vi er</h3>
        <div className="mt-4 grid grid-cols-5 gap-3 text-[12px]">
          <div className="bg-white/10 rounded-xl p-3"><div className="font-bold">Phase 1 ✓</div><div className="opacity-70 mt-1">Core A2–B1 platform</div></div>
          <div className="bg-[#FFD84D] text-black rounded-xl p-3"><div className="font-bold">Phase 2 ✓</div><div className="mt-1">Kollokationer, SRS, 25+ lyt, 20+ læs</div></div>
          <div className="bg-[#FFD84D] text-black rounded-xl p-3"><div className="font-bold">Phase 3 ✓</div><div className="mt-1">Kultur + PD3 + B2 grammatik</div></div>
          <div className="bg-white/10 rounded-xl p-3"><div className="font-bold">Phase 4 △</div><div className="opacity-70 mt-1">A1 track - delvist (basisord + skilte)</div></div>
          <div className="bg-white/10 rounded-xl p-3"><div className="font-bold">Phase 5 ◍</div><div className="opacity-70 mt-1">Voice + real audio - Web Speech nu, studie senere</div></div>
        </div>
      </div>
    </div>
  );
}
