export default function FlowView({ setActive }) {
  return (
    <div className="min-h-screen bg-[#FFFCF7] pb-[120px]">
      <div className="h-[3px] bg-[#121417] w-full" />
      <div className="max-w-[1200px] mx-auto px-5 lg:px-8 py-8">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-[10px] tracking-[0.2em] uppercase border border-[#121417] inline-block px-2 py-1">Flow · For elev og for udvikler</div>
            <h1 className="font-display font-[700] text-[32px] lg:text-[48px] leading-[0.9] tracking-tight mt-4">Hele flowet<br/>fra forside til PD3</h1>
            <p className="mt-3 font-serif text-[14px] leading-[1.6] max-w-[560px] text-[#2D3136]">For elev: Test → Sti → Øv → PD3. Det er det. For udvikler: hele diagrammet med tracking, dedup, SRS. Ingen gamification. Kun arbejde der flytter dig.</p>
            <div className="mt-4 border-[2px] border-[#121417] bg-white p-4 shadow-[4px_4px_0px_#121417] max-w-[560px]">
              <div className="text-[11px] uppercase tracking-widest font-[700]">For elev — simpelt flow (det du skal bruge)</div>
              <div className="mt-3 flex items-center gap-2 text-[12px] font-[600] flex-wrap">
                <span className="border border-[#121417] bg-[#121417] text-white px-3 py-1.5">1. Test 7 min</span>
                <span>→</span>
                <span className="border border-[#121417] bg-white px-3 py-1.5">2. Se din sti</span>
                <span>→</span>
                <span className="border-[2px] border-[#121417] bg-[#EEF2FB] px-3 py-1.5">3. Dagens 15 min</span>
                <span>→</span>
                <span className="border border-[#121417] bg-[#121417] text-white px-3 py-1.5">4. PD3</span>
              </div>
              <div className="mt-3 text-[11px] leading-[1.5] font-serif text-[#6B7280]">1. Tag testen — vi finder dit niveau. 2. Se stien — hvor mange emner mangler til PD3. 3. Øv 15 min om dagen — én handling, hvorfor den er vigtigst, hvad den låser op i virkeligheden (skriv til udlejer, forstå DSB). 4. Bestå Modultest og PD3. Ingen hjerter, ingen streaks. 3-4 dage/uge er nok. Box0 der føles svært er meningen.</div>
            </div>
          </div>
          <button onClick={()=>setActive && setActive('landing')} className="hidden lg:block border border-[#E8E2D9] px-4 py-2 text-[11px] uppercase tracking-widest">Forside</button>
        </div>

        {/* LEGEND */}
        <div className="mt-8 flex flex-wrap gap-2 text-[10px] uppercase tracking-widest">
          <span className="border border-[#121417] bg-[#121417] text-white px-2 py-1">Entry</span>
          <span className="border border-[#2A4F9E] bg-[#EEF2FB] text-[#1E3A5F] px-2 py-1">Test / Vurdering</span>
          <span className="border border-[#121417] bg-white px-2 py-1">Studie / Sti</span>
          <span className="border border-[#E8E2D9] bg-[#FFFCF7] px-2 py-1">Bibliotek</span>
          <span className="border border-[#E8E2D9] bg-[#F8F6F1] px-2 py-1">Tracking / Data</span>
          <span className="border border-[#121417] border-dashed bg-white px-2 py-1">Del / Ekstern</span>
        </div>

        {/* FLOW DIAGRAM - DESKTOP */}
        <div className="mt-10 hidden lg:block">
          <div className="relative bg-white border border-[#121417] p-8 overflow-x-auto">
            {/* SVG arrows layer */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ width: '1100px', height: '900px' }}>
              {/* Entry -> Diagnostic */}
              <path d="M 180 80 L 180 140" stroke="#121417" strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" />
              <path d="M 180 80 L 420 80 L 420 140" stroke="#121417" strokeWidth="1" strokeDasharray="4 4" fill="none" markerEnd="url(#arrow)" />
              {/* Diagnostic -> Result */}
              <path d="M 180 230 L 180 290" stroke="#2A4F9E" strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" />
              {/* Result -> Path + Practice */}
              <path d="M 180 380 L 180 440 L 120 440 L 120 480" stroke="#121417" strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" />
              <path d="M 180 380 L 180 440 L 240 440 L 240 480" stroke="#121417" strokeWidth="1.5" fill="none" markerEnd="url(#arrow)" />
              {/* Practice -> Library */}
              <path d="M 240 570 L 240 620" stroke="#121417" strokeWidth="1" fill="none" markerEnd="url(#arrow)" />
              {/* Practice loop back */}
              <path d="M 320 520 L 500 520 L 500 440 L 300 440" stroke="#121417" strokeWidth="1" strokeDasharray="3 3" fill="none" markerEnd="url(#arrow)" />
              {/* Result -> Share */}
              <path d="M 280 350 L 600 350 L 600 140" stroke="#121417" strokeWidth="1" strokeDasharray="4 4" fill="none" markerEnd="url(#arrow)" />
              {/* Tracking connections */}
              <path d="M 360 500 L 750 500 L 750 300" stroke="#9AA0A8" strokeWidth="1" strokeDasharray="2 3" fill="none" />
              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#121417" />
                </marker>
              </defs>
            </svg>

            <div className="relative" style={{ width: '1100px', height: '850px' }}>
              {/* ENTRY */}
              <div className="absolute left-[60px] top-[20px] w-[240px] border border-[#121417] bg-[#121417] text-white p-4">
                <div className="text-[10px] uppercase tracking-widest text-white/60">Entry · Forside</div>
                <div className="mt-1 font-[600] text-[13px]">DanskPath — Arbejdshæfte</div>
                <div className="mt-2 text-[11px] leading-[1.4] text-white/70 font-serif">For voksne med job og familie. Modul 1 → PD3. Forklaring før drill. Engelsk først.</div>
                <div className="mt-3 flex gap-1"><span className="text-[9px] border border-white/20 px-1.5 py-0.5">A1→B2</span><span className="text-[9px] border border-white/20 px-1.5 py-0.5">Ingen streaks</span></div>
              </div>

              <div className="absolute left-[400px] top-[20px] w-[220px] border border-[#121417] border-dashed bg-white p-4">
                <div className="text-[10px] uppercase tracking-widest text-[#6B7280]">Entry · Ven inviteret</div>
                <div className="mt-1 font-[600] text-[12px]">?friend=true&invitedBy=Anna</div>
                <div className="mt-2 text-[11px] leading-[1.4] font-serif">Link med inviteret-af param. QR, WhatsApp, email. Virker laptop + iPhone.</div>
              </div>

              {/* DIAGNOSTIC */}
              <div className="absolute left-[60px] top-[150px] w-[240px] border border-[#2A4F9E] bg-[#EEF2FB] p-4">
                <div className="text-[10px] uppercase tracking-widest text-[#2A4F9E]">Test · 7-15 min</div>
                <div className="mt-1 font-[600] text-[13px]">Niveau-test · 15-20 spørgsmål</div>
                <div className="mt-2 text-[11px] leading-[1.4] font-serif">20Q timer 15 min. Dækker ORD/V2, TID, KØN, BØJ, PRÆ, VALG, kollokationer, reduktioner, kultur. Hver med why + close distractor.</div>
                <div className="mt-2 text-[10px] text-[#6B7280]">Markeres i dansk_seen · 30 dage regel</div>
              </div>

              {/* RESULT */}
              <div className="absolute left-[60px] top-[300px] w-[240px] border border-[#2A4F9E] bg-[#EEF2FB] p-4">
                <div className="text-[10px] uppercase tracking-widest text-[#2A4F9E]">Vurdering · Resultat</div>
                <div className="mt-1 font-[600] text-[13px]">Resultat + breakdown</div>
                <div className="mt-2 text-[11px] leading-[1.4] font-serif">
                  • Pct + level: Modul 2-5 → PD3 klar<br/>
                  • Per skill: ORD/TID/KØN/BØJ/PRÆ/VALG %<br/>
                  • Lacking: hvad mangler &lt;60%<br/>
                  • Path: personlig sti anbefaling<br/>
                  • Tid brugt, inviteret af
                </div>
                <div className="mt-2 text-[10px] border-t border-[#D6E0F5] pt-2">POST /api/trial → trial-results.json</div>
              </div>

              {/* PATH */}
              <div className="absolute left-[20px] top-[490px] w-[200px] border border-[#121417] bg-white p-4">
                <div className="text-[10px] uppercase tracking-widest">Sti · Modul 1→5</div>
                <div className="mt-1 font-[600] text-[12px]">Læringssti</div>
                <div className="mt-2 text-[11px] leading-[1.4] font-serif">Modul 1 → PD3. Viser done/total per emne. Opdateres live fra dansk_path + dansk_weak.</div>
                <div className="mt-2 h-[2px] bg-[#F0EBE2]"><div className="h-full bg-[#121417] w-[45%]" /></div>
              </div>

              {/* PRACTICE - CENTER */}
              <div className="absolute left-[260px] top-[490px] w-[220px] border-[2px] border-[#121417] bg-white p-4 shadow-[4px_4px_0px_#121417]">
                <div className="text-[10px] uppercase tracking-widest font-[700]">Studie · Daglig 15-45 min</div>
                <div className="mt-1 font-[700] text-[14px]">Øv · Anbefaling</div>
                <div className="mt-2 text-[11px] leading-[1.4] font-serif">
                  Recommendation engine:<br/>
                  1. Find svageste skill (&lt;60%)<br/>
                  2. Vælg opgave: grammar infinite / vocab Box0 / lyt uklaret / samtale<br/>
                  3. Vis med forklaring før drill<br/>
                  4. Svar → markSeen → weak → path
                </div>
                <div className="mt-3 text-[9px] uppercase tracking-widest border border-[#121417] inline-block px-2 py-1">Loop: hver dag ny anbefaling</div>
              </div>

              {/* LIBRARY */}
              <div className="absolute left-[60px] top-[630px] w-[620px] border border-[#121417] bg-[#FFFCF7] p-4">
                <div className="text-[10px] uppercase tracking-widest">Bibliotek · Uendelig engine · Nok til PD3</div>
                <div className="mt-3 grid grid-cols-3 gap-[1px] bg-[#121417] border border-[#121417]">
                  <div className="bg-white p-3"><div className="text-[11px] font-[600]">Grammatik</div><div className="text-[10px] text-[#6B7280] mt-1">761 faste + infinite engine. 15 varianter/skabelon. dedupKey 30d. V2, ledsætning, ikke, køn, flertal, adj, sin, refleksiv, den/det, præp, bindeord.</div></div>
                  <div className="bg-white p-3"><div className="text-[11px] font-[600]">Ordforråd 1052</div><div className="text-[10px] text-[#6B7280] mt-1">Kollokationer: holde møde. SRS Box0 daglig, Box1 1d, Box2 3d, Box3 7d, Box4 14d, Box5 30d. Ingen gentagelse af sikre.</div></div>
                  <div className="bg-white p-3"><div className="text-[11px] font-[600]">Lytning 26</div><div className="text-[10px] text-[#6B7280] mt-1">Telefon, DSB, DR, multi. Transskript skjult først. Reduktioner: det er→d'er. Ingen gentagelse før alle klaret.</div></div>
                  <div className="bg-white p-3"><div className="text-[11px] font-[600]">Samtale 18</div><div className="text-[10px] text-[#6B7280] mt-1">Kaffepause, borgerservice, PD3 mundtlig: billede, monolog, diskussion. Hold den på dansk-fraser.</div></div>
                  <div className="bg-white p-3"><div className="text-[11px] font-[600]">Læsning 40 + Skrivning 8</div><div className="text-[10px] text-[#6B7280] mt-1">A1→B2, tap ord for lyd. PD3 gapped+cloze. Skrivning 150-200 ord, V2-tjek + bindeord + AI-feedback.</div></div>
                  <div className="bg-white p-3"><div className="text-[11px] font-[600]">Udtale 12 + Kultur 10 + Eksamen</div><div className="text-[10px] text-[#6B7280] mt-1">Blødt d, stød, r, reduktioner. Kultur: Folketing 179, flexicurity, jantelov. PD3 Delprøve 1-4 format.</div></div>
                </div>
              </div>

              {/* TRACKING */}
              <div className="absolute left-[720px] top-[300px] w-[260px] border border-[#E8E2D9] bg-[#F8F6F1] p-4">
                <div className="text-[10px] uppercase tracking-widest">Tracking · Ingen gentagelse</div>
                <div className="mt-2 text-[11px] leading-[1.5] font-serif space-y-2">
                  <div><b>dansk_seen:</b> map id→timestamp. 30 dage regel. Engine dedupKey = emne|front|verb|subj.</div>
                  <div><b>dansk_used_*: </b> Set per liste (listening, reading). Uklarede først, reset når alle set.</div>
                  <div><b>dansk_weak:</b> forkerte svar → Svage-mode gentager til korrekte.</div>
                  <div><b>dansk_path:</b> modul→[done idx] → Path progress + ProgressView uge-rapport.</div>
                  <div><b>SRS vocab:</b> Box0-5 = 0/1/3/7/14/30 dage. isDueForReview().</div>
                  <div><b>getUnused():</b> filtrerer både used Set + timestamp &lt;30d. Hvis tom → reset cyklus.</div>
                </div>
              </div>

              {/* SHARE FLOW */}
              <div className="absolute left-[580px] top-[20px] w-[260px] border border-[#121417] border-dashed bg-white p-4">
                <div className="text-[10px] uppercase tracking-widest">Del · Sådan sender du</div>
                <div className="mt-2 text-[11px] leading-[1.5] font-serif space-y-2">
                  <div><b>1. Hurtig:</b> Kopiér preview-URL + ?invitedBy=Navn. Send WhatsApp. Virker nu, udløber når sandbox stopper.</div>
                  <div><b>2. Permanent:</b> npm run build → dist/ → Vercel/Netlify drag&drop → fast link danskpath.vercel.app</div>
                  <div><b>3. iPhone:</b> Safari → Del → Føj til hjemmeskærm → app-ikon. QR via api.qrserver.com</div>
                  <div className="mt-2 border-t border-dashed pt-2"><b>Med DB:</b> Deploy server.js til Render → ret API_BASE. Så POST /api/trial virker for alle venner.</div>
                </div>
              </div>

              {/* SURVEY + REWARD */}
              <div className="absolute left-[580px] top-[380px] w-[260px] border border-[#2A4F9E] bg-[#EEF2FB] p-4">
                <div className="text-[10px] uppercase tracking-widest text-[#2A4F9E]">Efter test · Survey + Reward</div>
                <div className="mt-2 text-[11px] leading-[1.4] font-serif">
                  Survey: NPS 0-10, hvad kan forbedres, hvad forvirrende, hvad mangler, ville anbefale?<br/>
                  POST /api/survey<br/><br/>
                  Reward: Certifikat (level + pct + dato) + unlocks: personlig sti, 10 flashcards, 1 lytteøvelse. Ingen hjerter/confetti.<br/><br/>
                  → Database view: tabel med tid, navn, level, %, score, lacking, inviteret af + stats /api/stats
                </div>
              </div>

              {/* PROGRESS */}
              <div className="absolute left-[720px] top-[580px] w-[260px] border border-[#121417] bg-white p-4">
                <div className="text-[10px] uppercase tracking-widest">Fremskridt · Dashboard</div>
                <div className="mt-2 text-[11px] leading-[1.4] font-serif">Uge-rapport, ikke leaderboard. Viser done per modul, svageste skill, tid brugt, streak-fri. Data fra dansk_path + dansk_seen. Ærlig status, ikke spil.</div>
                <div className="mt-3 text-[10px] uppercase tracking-widest">→ PD3 klar når Modul 5 &gt;75%</div>
              </div>

              {/* FINAL */}
              <div className="absolute left-[400px] top-[800px] w-[300px] border-[2px] border-[#121417] bg-[#121417] text-white p-4 text-center">
                <div className="text-[11px] uppercase tracking-widest text-white/60">Mål</div>
                <div className="mt-1 font-[700] text-[14px]">PD3 / B2 · Modultest 3 bestået på 3 måneder</div>
                <div className="mt-2 text-[11px] text-white/70 font-serif">3000-4000 receptivt ordforråd · 25+ real audio · V2 under pres · Kollokationer der virker i tale</div>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE FLOW - vertical */}
        <div className="lg:hidden mt-8 space-y-0">
          <div className="border-l-[2px] border-[#121417] ml-4 pl-6 space-y-8 pb-10">
            {[
              { title: "Forside · Arbejdshæfte", desc: "For voksne med job og familie. Modul 1 → PD3. Forklaring før drill.", color: "bg-[#121417] text-white border-[#121417]" },
              { title: "Entry · Ven inviteret ?friend=true", desc: "Link med invitedBy param + QR + WhatsApp/email. Virker laptop + iPhone.", color: "bg-white border-dashed border-[#121417]" },
              { title: "Niveau-test · 15-20Q · 15 min timer", desc: "ORD/V2, TID, KØN, BØJ, PRÆ, VALG, kollokationer, reduktioner, kultur. Hver med why + close distractor. Markeres i dansk_seen 30d.", color: "bg-[#EEF2FB] border-[#2A4F9E] text-[#1E3A5F]" },
              { title: "Resultat · breakdown per skill", desc: "Pct + level Modul 2-5, per skill ORD/TID/KØN/BØJ/PRÆ/VALG %, lacking <60%, personlig sti, tid brugt. POST /api/trial → trial-results.json", color: "bg-[#EEF2FB] border-[#2A4F9E] text-[#1E3A5F]" },
              { title: "Læringssti · Modul 1→5", desc: "Viser done/total per emne. Opdateres live fra dansk_path. V2 + inversion først (80% af B1-fejl).", color: "bg-white border-[#121417]" },
              { title: "Øv · Anbefaling engine (daglig loop)", desc: "1. Find svageste skill <60% 2. Vælg opgave: grammar infinite / vocab Box0 / lyt uklaret / samtale 3. Vis med forklaring før drill 4. Svar → markSeen → weak → path → næste anbefaling", color: "bg-white border-[2px] border-[#121417] shadow-[3px_3px_0px_#121417]" },
              { title: "Bibliotek · 761 + uendelig", desc: "Grammatik: 761 faste + infinite engine 15 varianter/skabelon → 5.100+ varianter, dedupKey 30d. Ordforråd 1052 SRS Box0-5 0/1/3/7/14/30d. Lytning 26, Samtale 18, Læsning 40, Skrivning 8, Udtale 12, Kultur 10, Eksamen PD3.", color: "bg-[#FFFCF7] border-[#121417]" },
              { title: "Tracking · Ingen gentagelse", desc: "dansk_seen map timestamp 30d, dansk_used_* Set + timestamp, dansk_weak forkerte, dansk_path modul→done, getUnused filtrerer begge, reset når alle set. isDueForReview for SRS.", color: "bg-[#F8F6F1] border-[#E8E2D9]" },
              { title: "Del · 3 måder at sende", desc: "1. Hurtig: kopiér preview-URL nu 2. Permanent: npm run build → dist → Vercel/Netlify → fast link 3. iPhone: Safari → Føj til hjemmeskærm → app-ikon. Med DB: deploy server.js til Render → ret API_BASE.", color: "bg-white border-dashed border-[#121417]" },
              { title: "Survey + Reward + Database", desc: "Survey NPS 0-10 + fritekst POST /api/survey. Reward: certifikat + unlocks (ikke hjerter). Database view tabel + /api/stats: totalTrials, avgPct, byLevel.", color: "bg-[#EEF2FB] border-[#2A4F9E]" },
              { title: "Fremskridt · Uge-rapport", desc: "Dashboard, ikke leaderboard. Viser done per modul, svageste skill, tid brugt. Ærlig status.", color: "bg-white border-[#121417]" },
              { title: "Mål · PD3 / B2 på 3 måneder", desc: "3000-4000 receptivt ordforråd, 25+ real audio, V2 under pres, kollokationer der virker i tale.", color: "bg-[#121417] text-white border-[#121417]" },
            ].map((step,i)=>(
              <div key={i} className="relative">
                <div className="absolute -left-[33px] top-1 w-[12px] h-[12px] bg-[#121417] rounded-full border-2 border-[#FFFCF7]" />
                <div className={`border p-4 ${step.color}`}>
                  <div className="text-[11px] font-[600] uppercase tracking-widest">{i+1}. {step.title}</div>
                  <div className="mt-2 text-[12px] leading-[1.5] font-serif">{step.desc}</div>
                </div>
                {i < 11 && <div className="absolute left-0 top-full w-[1px] h-8 bg-[#121417] -ml-[1px]" />}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 border border-[#121417] bg-white p-6">
          <div className="text-[11px] uppercase tracking-widest font-[600]">Sådan læser du diagrammet</div>
          <div className="mt-3 text-[13px] leading-[1.6] font-serif grid lg:grid-cols-2 gap-6">
            <div>
              <b>Sort pil = obligatorisk flow.</b> Forside → Test → Resultat → Sti/Øv → Bibliotek → Fremskridt → PD3.<br/><br/>
              <b>Stiplet pil = alternativ entry / deling.</b> Ven inviteret via ?friend=true lander direkte i invite, men gennemfører samme test og gemmes med invitedBy i databasen.<br/><br/>
              <b>Loop pil (stiplet tilbage):</b> Øv → svar → markSeen (dedupKey 30d) → weak/path opdateres → ny anbefaling. Hver dag nyt.
            </div>
            <div>
              <b>Tracking er ikke en feature, det er kernen:</b> Uden 30-dages regel og dedupKey ville du lære svar udenad. Med engine lærer du reglen. Det er derfor “nye hver gang” betyder nye kombinationer af samme regel, ikke nye regler.<br/><br/>
              <b>Deling er indbygget, ikke påklistret:</b> Trial-linket indeholder invitedBy, QR genereres live, WhatsApp/email knapper, POST til /api/trial. Database view viser hvem der mangler hvad — grundlag for at prioritere næste byg.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
