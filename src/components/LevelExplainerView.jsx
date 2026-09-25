import { modules, getAllModulesProgress, getAfterExhaustionInfo, assessments } from '../lib/levelEngine';

export default function LevelExplainerView({ setActive }) {
  const progresses = getAllModulesProgress();
  const exhaustion = getAfterExhaustionInfo();

  return (
    <div className="min-h-screen bg-[#FFFCF7] pb-[120px]">
      <div className="h-[3px] bg-[#121417] w-full" />
      <div className="max-w-[1000px] mx-auto px-5 lg:px-8 py-8">
        <div className="text-[10px] tracking-[0.2em] uppercase border border-[#121417] inline-block px-2 py-1">Niveauer · Hvor mange spørgsmål? · Sværhed</div>
        <h1 className="font-display font-[700] text-[32px] lg:text-[48px] leading-[0.9] tracking-tight mt-4">Hvor mange spørgsmål<br/>skal der til for at bestå?</h1>
        <p className="mt-4 font-serif text-[14px] leading-[1.6] max-w-[700px]">Svar på dine spørgsmål: hvad sker efter 760 brugte, hvordan stiger sværhed fra Modul 1 til 5, hvordan undgår vi gentagelse, og hvad måler assessment.</p>

        <div className="mt-8 border border-[#121417] bg-white p-6">
          <h3 className="text-[11px] uppercase tracking-widest font-[700]">Svar: Hvor mange spørgsmål per modul?</h3>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-[12px] border-collapse">
              <thead className="text-[10px] uppercase tracking-widest text-[#6B7280] border-b border-[#121417]"><tr><th className="text-left py-2">Modul</th><th>Grammatik krav</th><th>Ord</th><th>Lyt</th><th>Læs</th><th>Skriv ugentlig</th><th>Test</th><th>Samlet opgaver for at bestå</th></tr></thead>
              <tbody>
                {modules.map(m=>{
                  const total = m.requires.grammarCount + m.requires.vocabCount + m.requires.listeningCount + m.requires.readingCount + m.requires.writingCount;
                  return (
                    <tr key={m.id} className="border-b border-[#E8E2D9]">
                      <td className="py-3 font-[600]">{m.title} · {m.cefl}</td>
                      <td>{m.requires.grammarCount} items · {m.requires.grammarMasteryPct}% mastery · {m.requires.grammarTopics.length} emner</td>
                      <td>{m.requires.vocabCount}</td>
                      <td>{m.requires.listeningCount}/26</td>
                      <td>{m.requires.readingCount}/40</td>
                      <td>{m.requires.writingCount} × {m.id==='m1'?'30-50':m.id==='m2'?'60-80':m.id==='m3'?'80-120':m.id==='m4'?'120-150':'150-200'} ord (ny hver uge)</td>
                      <td>{m.test.questions}Q · {m.test.timeMin}min · {m.test.passPct}% bestå</td>
                      <td className="font-bold">{total}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-[11px] leading-[1.5] text-[#6B7280] font-serif">
            Eksempel: Modul 1 kræver 80 grammatik + 120 ord + 4 lyt + 5 læs + 2 skriv = 211 opgaver. Men du består ikke på antal — du består på mastery: 80% grammatik (sidste 20 forsøg per emne), 70% ord/lyt/læs, 60% skriv. Så du kan bestå Modul 1 på ~150-250 forsøg hvis du er præcis, eller 400 hvis du gætter.
          </div>
        </div>

        <div className="mt-6 grid lg:grid-cols-2 gap-[1px] bg-[#121417] border border-[#121417]">
          <div className="bg-[#121417] text-white p-6">
            <div className="text-[11px] uppercase tracking-widest text-white/60">Hvad sker efter 750-760 brugte grammatik?</div>
            <div className="mt-3 space-y-3 text-[13px] leading-[1.6] font-serif text-white/85">
              <div>Fast bank er 761. Efter 760 set:</div>
              <div>• <b>Fast mode (Alle/Kun nye):</b> Cyklus resetter. Men med 30-dages regel ser du ikke samme sætning igen før 30 dage. `getUnused()` filtrerer både `used Set` + timestamp &lt;30d. Hvis alle brugt → returnerer hele banken igen, men du har glemt de første (30 dage).</div>
              <div>• <b>Uendelig engine (anbefalet, ny default):</b> Aldrig samme dedupKey inden 30 dage. 15 varianter per skabelon × 17 emner = 5.100+ kontrollerede varianter. Efter 760 brugte får du stadig nye: samme regel, nye ord. Eksempel: du har set “I morgen skal jeg på arbejde” → næste gang “Om sommeren tager vi til Norge” — samme V2-regel, ny dedupKey `v2|Om sommeren|tager|vi`.</div>
              <div>• <b>Derfor ingen gentagelse:</b> Du lærer reglen, ikke svaret. Ved Modultest får du nye ord under pres — engine træner præcis det.</div>
              <div className="mt-3 pt-3 border-t border-white/10 text-[11px]">Bank: {exhaustion.totalGrammarBank} · Set: {exhaustion.totalSeen} · Tilbage fast: {exhaustion.remainingFixed} · Engine: ∞ (5100+)</div>
            </div>
          </div>
          <div className="bg-white p-6">
            <div className="text-[11px] uppercase tracking-widest font-[600]">Skrivning — ugentlig ny per niveau</div>
            <div className="mt-3 space-y-3 text-[12px] leading-[1.6] font-serif">
              <div>Før: 8 faste opgaver. Nu: ugentlig ny baseret på uge-nummer + dit modul. Ingen gentagelse i 60 dage.</div>
              <div><b>M1 A1 30-50 ord:</b> Min familie, Min dag, Min lejlighed, Besked til ven. Checklist: en/et, nutid -r, klokken.</div>
              <div><b>M2 60-80 ord:</b> Besked til kollega syg, Invitation kaffe, Tog forsinket, Handleliste. Checklist: V2 inversion, datid -ede, fordi, på mandag.</div>
              <div><b>M3 80-120 ord:</b> Email udlejer, Besked læge, Opslag fælles have, Praktik rapport. Checklist: ledsætning at han..., hvis, skal+infinitiv.</div>
              <div><b>M4 120-150 ord:</b> Klage butik, Ansøgning job, Debat cykel/bus, Rapport hjemmearbejde. Checklist: fordele/ulemper, på den ene side, selvom, derfor.</div>
              <div><b>M5/PD3 150-200 ord:</b> Fleksibel arbejdstid, Teknologi og tid, Transport debat, Hvorfor tager det tid at lære dansk?, Fælles rum, Miljø, Flexicurity. Checklist: PD3 struktur indledning-2 argumenter-konklusion, for det første, desuden, på den anden side, til sidst, V2, bindeord.</div>
              <div className="mt-2 text-[11px] text-[#6B7280]">Implementeret i `writingEngine.js`: `getWeekNumber()` → `pool[week % pool.length]`. `markWritingSeen()` gemmer dedupKey 60 dage + `dansk_writing_attempts`.</div>
            </div>
          </div>
        </div>

        <div className="mt-6 border border-[#121417] bg-white p-6">
          <div className="text-[11px] uppercase tracking-widest font-[700]">Sværhed — hvordan ændrer spørgsmål sig fra Modul 1 til 5?</div>
          <div className="mt-4 space-y-4">
            {modules.map(m=>(
              <div key={m.id} className="grid lg:grid-cols-[120px_1fr_1fr] gap-4 border-b border-[#E8E2D9] pb-4 last:border-0">
                <div className="text-[11px] uppercase tracking-widest font-[600]">{m.title} · {m.cefl}</div>
                <div className="text-[12px] leading-[1.6] font-serif">
                  <div><b>Sætninger:</b> {m.difficulty.sentenceLen}</div>
                  <div className="mt-1"><b>Grammatik:</b> {m.difficulty.grammar}</div>
                  <div className="mt-2 bg-[#FFFCF7] border border-[#E8E2D9] p-2 text-[11px]"><b>Eks:</b> {m.difficulty.example}</div>
                </div>
                <div className="text-[12px] leading-[1.6] font-serif">
                  <div className="text-[10px] uppercase tracking-widest text-[#6B7280]">Ændring fra forrige</div>
                  <div className="mt-1">{m.difficulty.diffFromPrev || "Start — grundform"}</div>
                  <div className="mt-2 text-[11px] text-[#6B7280]">Emner: {m.requires.grammarTopics.join(', ')}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 border border-[#121417] bg-[#FFFCF7] p-6">
          <div className="text-[11px] uppercase tracking-widest font-[700]">Path — hvordan forbedres den, så man ikke gentager samme øvelser?</div>
          <div className="mt-3 grid lg:grid-cols-2 gap-6 text-[12px] leading-[1.7] font-serif">
            <div className="space-y-3">
              <div><b>Modul 1→2:</b> Fra simple S-V-O til V2 inversion. Fra 30-50 ord skrivning til 60-80. Læsning: skilte/SMS → personlige fortællinger. Lytning: korte beskeder → monolog/annonce.</div>
              <div><b>Modul 2→3:</b> Fra hovedsætning til ledsætning (største skift). Fra -ede datid til har/er førnutid. Skrivning 60-80 → 80-120 med hvis/fordi. Lytning: annonce → telefon borgerservice uden transskript.</div>
              <div><b>Modul 3→4:</b> Fra regular til stærke verber (vokal skifter). Fra fordi/derfor til selvom/hvis/når/da. Sin/hans betydningsforskel. Skrivning 80-120 → 120-150 debat. Lytning: telefon → DR nyhed + multi.</div>
            </div>
            <div className="space-y-3">
              <div><b>Modul 4→5:</b> Fra 1 regel per sætning til 2-3 regler kombineret. Passiv, relativ. Skrivning 120-150 → 150-200 PD3 struktur. Kultur: Folketing 179, flexicurity, jantelov. Lytning: DR → podcast hastighed.</div>
              <div><b>Modul 5→PD3:</b> Ingen ny grammatik — kun eksamensformat + tidspres. Derfor ingen gentagelse er kritisk: du har set reglen 100 gange med nye ord, så du kan producere under pres.</div>
              <div className="mt-3 bg-white border border-[#121417] p-3 text-[11px]"><b>Ingen gentagelse garanti:</b> Fast bank resetter efter 761, men 30-dages regel + engine 5100+ varianter = du ser aldrig samme sætning inden 30 dage (60 dage for skrivning). Svage gentages til korrekte, sikre gemmes 30 dage. Path opdateres live fra `dansk_path` + `dansk_weak` + `dansk_seen`.</div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid lg:grid-cols-2 gap-[1px] bg-[#121417] border border-[#121417]">
          <div className="bg-white p-6">
            <div className="text-[11px] uppercase tracking-widest font-[700]">Assessment parametre — hvad måler vi?</div>
            <div className="mt-3 space-y-4 text-[12px] leading-[1.6] font-serif">
              <div><b>Diagnostic (første gang):</b> {assessments.diagnostic.questions}Q · {assessments.diagnostic.timeMin} min · {assessments.diagnostic.purpose}<br/>Params: {assessments.diagnostic.params.join(', ')}<br/>Scoring: {assessments.diagnostic.scoring}</div>
              <div><b>Modultest (per modul):</b> {assessments.modultest.questions} · {assessments.modultest.timeMin} · {assessments.modultest.purpose}<br/>Params: {assessments.modultest.params.join(', ')}<br/>Scoring: {assessments.modultest.scoring}</div>
              <div><b>Trial 15-min (del med ven):</b> {assessments.trial.questions}Q · {assessments.trial.timeMin} min · {assessments.trial.purpose}<br/>Params: {assessments.trial.params.join(', ')}<br/>Scoring: {assessments.trial.scoring}</div>
            </div>
          </div>
          <div className="bg-[#EEF2FB] p-6">
            <div className="text-[11px] uppercase tracking-widest font-[700] text-[#1E3A5F]">PD3 Prøve · B2 · 4 delprøver</div>
            <div className="mt-3 space-y-2 text-[12px] leading-[1.6] font-serif text-[#1E3A5F]">
              <div><b>{assessments.pd3.title}:</b> {assessments.pd3.questions}Q · {assessments.pd3.timeMin} min · {assessments.pd3.format}</div>
              {assessments.pd3.delproever.map((d,i)=><div key={i}>• {d}</div>)}
              <div className="mt-2"><b>Params:</b> {assessments.pd3.params.join(', ')}</div>
              <div><b>Scoring:</b> {assessments.pd3.scoring}</div>
            </div>
            <button onClick={()=>setActive('flow')} className="mt-4 w-full bg-[#121417] text-white py-2.5 text-[11px] uppercase tracking-widest">Se flow diagram →</button>
          </div>
        </div>

        <div className="mt-6 flex gap-2">
          <button onClick={()=>setActive('path')} className="bg-[#121417] text-white px-6 py-3 text-[11px] uppercase tracking-widest">Se din læringssti →</button>
          <button onClick={()=>setActive('grammar')} className="border border-[#121417] bg-white px-6 py-3 text-[11px] uppercase tracking-widest">Øv grammatik uendelig →</button>
          <button onClick={()=>setActive('writing')} className="border border-[#E8E2D9] bg-white px-6 py-3 text-[11px] uppercase tracking-widest">Ugens skriveopgave →</button>
        </div>
      </div>
    </div>
  );
}
