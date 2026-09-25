// Motivation Engine — for adults, no streaks/hearts/leaderboards
// Based on Self-Determination Theory: autonomy, competence, relatedness

export const realWorldUnlocks = {
  v2: { title: "Skriv korrekte emails til udlejer/kommune", desc: "Uden V2 lyder din email som engelsk. Med V2: 'I morgen kommer håndværkeren' — danskerne forstår med det samme.", functional: "Du kan skrive til udlejer uden at blive misforstået" },
  ledsaetning: { title: "Forstå og blive forstået når du forklarer hvorfor", desc: "Forskellen på 'jeg kommer ikke' og 'at jeg ikke kommer' er det danskere hører mest. Mestrer du den, lyder du ikke som nybegynder.", functional: "Du kan forklare hvorfor du er forsinket uden at lyde usikker" },
  ikke: { title: "Placér ikke rigtigt — undgå misforståelser", desc: "'Jeg kan ikke lide' vs 'Jeg kan lide ikke' — første er korrekt, anden er uforståelig.", functional: "Du kan sige hvad du ikke vil, klart" },
  koen: { title: "Husk køn — så den/det virker senere", desc: "En bil → den, et hus → det. Får du køn forkert, bliver alle senere sætninger forkerte.", functional: "Du kan pege på ting uden at skifte til engelsk" },
  flertal: { title: "Tæl og bestil — 2 biler, 3 huse", desc: "I butik, på arbejde: 'to biler' vs 'to bil' — flertal er overalt.", functional: "Du kan handle og bestille korrekt antal" },
  adjektiv: { title: "Beskriv — stor, stort, store", desc: "En stor bil, et stort hus, store huse. Uden -t/-e lyder det som barnesprog.", functional: "Du kan beskrive din lejlighed, dit job, din familie præcist" },
  sin: { title: "Sin/hans — undgå alvorlig misforståelse", desc: "Anna henter sin søn (egen) vs hendes søn (andens). Kæmpe forskel i børnehaven.", functional: "Du undgår at skabe konflikt om hvem der ejer hvad" },
  refleksiv: { title: "Glæde sig, skynde sig — hverdagsverber", desc: "Danskere siger altid 'jeg glæder mig'. Uden mig giver sætningen ingen mening.", functional: "Du kan sige du glæder dig til ferie, som danskere gør" },
  praep: { title: "Vente på, glæde sig til — faste udtryk", desc: "Præpositioner er aldrig som på engelsk. Lær dem som par: vente på, god til, tak for.", functional: "Du kan aftale møder uden at bruge forkert præposition" },
  bindeord: { title: "Forklar og argumentér — fordi, derfor, selvom", desc: "PD3 kræver argumentation: for det første, desuden, på den anden side. Bindeord er limen.", functional: "Du kan skrive 150-200 ord med struktur til PD3" },
  staerke: { title: "Stærke verber — drikke, drak, drukket", desc: "De mest brugte verber er uregelmæssige. Lær dem i familier: i-a-u.", functional: "Du kan fortælle hvad du lavede i går uden at lyde som Google Translate" },
  har_er: { title: "Har eller er — er gået vs har gået", desc: "Han er gået = han er væk. Han har gået = han har gået tur. Forskellig betydning.", functional: "Du kan sige du er kommet, ikke har kommet" },
};

export const canDoStatements = [
  { id: "dsb", level: "m2", text: "Forstå DSB-annonce: 'Toget er forsinket 20 min'", requires: { listening: 4, grammar: ["v2"] } },
  { id: "sms", level: "m1", text: "Skriv SMS: 'Jeg kommer sent, vi mødes ved stationen kl 9'", requires: { writing: 1, grammar: ["v2","praep"] } },
  { id: "udlejer", level: "m3", text: "Skriv til udlejer om håndværker + nøgle i postkasse", requires: { writing: 3, grammar: ["ledsaetning","fremtid"] } },
  { id: "laege", level: "m3", text: "Ring til læge: 'Jeg har haft ondt i halsen i 3 uger'", requires: { speaking: 2, grammar: ["har-er"] } },
  { id: "job", level: "m4", text: "Jobsamtale: fortæl om erfaring, hvorfor dig", requires: { speaking: 4, grammar: ["staerke","sin"] } },
  { id: "klage", level: "m4", text: "Klage over sko i stykker — bed om ombytning", requires: { writing: 5, grammar: ["bindeord","praep"] } },
  { id: "debat", level: "m5", text: "Skriv debat 150 ord: cykel vs bus, fordele/ulemper", requires: { writing: 10, grammar: ["bindeord","v2","ledsaetning"] } },
  { id: "pd3", level: "pd3", text: "PD3 Delprøve 4: 150-200 ord med indledning, 2 argumenter, konklusion", requires: { writing: 20, grammar: ["v2","ledsaetning","bindeord"] } },
  { id: "kaffe", level: "m2", text: "Hold kaffepause på dansk: 'Vent lidt', 'Hvad mener du?'", requires: { speaking: 1, vocab: 100 } },
  { id: "borger", level: "m3", text: "Forstå telefon fra borgerservice uden transskript", requires: { listening: 8 } },
];

export function getUnlocksForTopic(topicId) {
  return realWorldUnlocks[topicId] || { title: "Dette emne flytter dig mod PD3", desc: "Hvert emne er valgt fordi det koster ved Modultest.", functional: "Du bliver mere præcis" };
}

export function getCanDoProgress() {
  try {
    const path = JSON.parse(localStorage.getItem('dansk_path')||'{}');
    const writingAttempts = JSON.parse(localStorage.getItem('dansk_writing_attempts')||'[]').length;
    const listeningDone = JSON.parse(localStorage.getItem('dansk_used_listening')||'[]').length;
    const speakingDone = JSON.parse(localStorage.getItem('dansk_speaking_attempts')||'[]').length;
    const vocabProg = Object.keys(JSON.parse(localStorage.getItem('dansk_vocab_progress')||'{}')).length;

    const grammarDoneCount = Object.keys(path).reduce((sum,k)=>sum + (path[k]?.length||0),0);

    return canDoStatements.map(item=>{
      let done = false;
      if(item.requires.grammar) {
        const needed = item.requires.grammar.length;
        const has = item.requires.grammar.filter(t=> (path[t]?.length||0) > 5).length;
        done = has >= needed;
      }
      if(item.requires.writing) done = writingAttempts >= item.requires.writing;
      if(item.requires.listening) done = listeningDone >= item.requires.listening;
      if(item.requires.speaking) done = speakingDone >= item.requires.speaking;
      if(item.requires.vocab) done = vocabProg >= item.requires.vocab;
      // Simple overall: if any requirement met
      return { ...item, done, progress: done ? 100 : Math.min(90, Math.round((grammarDoneCount/20)*100)) };
    });
  } catch {
    return canDoStatements.map(c=>({ ...c, done:false, progress:0 }));
  }
}

// Pace calculator — weeks to PD3 at current pace, no streak punishment
export function getPace() {
  try {
    const seenMap = JSON.parse(localStorage.getItem('dansk_seen')||'{}');
    const now = Date.now();
    const oneDay = 1000*60*60*24;
    const last7Days = Object.values(seenMap).filter(ts=> (now - ts) < 7*oneDay).length;
    const last30Days = Object.values(seenMap).filter(ts=> (now - ts) < 30*oneDay).length;

    const avgPerDayLast7 = last7Days / 7;
    const avgPerDayLast30 = last30Days / 30;

    // Estimate: need ~1354 tasks for M5 (from levelEngine) to be PD3-ready
    // At current pace, how many weeks?
    const needed = 1354;
    const done = Object.keys(seenMap).length;
    const remaining = Math.max(0, needed - done);

    const weeksAt7DayPace = avgPerDayLast7 > 0 ? Math.ceil(remaining / (avgPerDayLast7 * 7)) : null;
    const weeksAt30DayPace = avgPerDayLast30 > 0 ? Math.ceil(remaining / (avgPerDayLast30 * 7)) : null;

    // Calendar heatmap last 30 days: count per day
    const heatmap = [];
    for(let i=29;i>=0;i--) {
      const dayStart = new Date();
      dayStart.setHours(0,0,0,0);
      dayStart.setDate(dayStart.getDate() - i);
      const dayEnd = new Date(dayStart);
      dayEnd.setDate(dayEnd.getDate()+1);
      const count = Object.values(seenMap).filter(ts=>{
        const d = new Date(ts);
        return d >= dayStart && d < dayEnd;
      }).length;
      heatmap.push({ date: dayStart.toISOString().slice(0,10), count, worked: count>0 });
    }

    const daysWorkedLast7 = heatmap.slice(-7).filter(d=>d.worked).length;
    const daysWorkedLast30 = heatmap.filter(d=>d.worked).length;

    // Honest message, not shaming
    let message = "";
    if(daysWorkedLast7===0) message = "Ingen øvning sidste 7 dage — helt okay. 15 min i dag er nok til at komme tilbage. SRS glemmer ikke alt på 2 uger.";
    else if(daysWorkedLast7 < 3) message = `Du har øvet ${daysWorkedLast7} af sidste 7 dage. Det er nok. Forskning: 3-4 dage om ugen er nok til at bestå Modultest 3 på 3 måneder.`;
    else if(daysWorkedLast7 >= 5) message = `Du har øvet ${daysWorkedLast7} af sidste 7 dage. Stærk rytme. Ved dette tempo er du PD3-klar om ca. ${weeksAt7DayPace||'?'} uger.`;
    else message = `Du har øvet ${daysWorkedLast7} af sidste 7 dage. God rytme. Ved 15 min om dagen er du klar til Modultest 4 om ~4-6 uger.`;

    return {
      last7Days,
      last30Days,
      avgPerDayLast7: Math.round(avgPerDayLast7*10)/10,
      avgPerDayLast30: Math.round(avgPerDayLast30*10)/10,
      daysWorkedLast7,
      daysWorkedLast30,
      heatmap,
      weeksAt7DayPace,
      weeksAt30DayPace,
      done,
      remaining,
      message,
    };
  } catch(e) {
    return { last7Days:0, last30Days:0, avgPerDayLast7:0, avgPerDayLast30:0, daysWorkedLast7:0, daysWorkedLast30:0, heatmap:[], weeksAt7DayPace:null, weeksAt30DayPace:null, done:0, remaining:1354, message: "Tag testen først — så kan vi beregne dit tempo." };
  }
}

// Weekly reflection
export function getReflectionPrompt() {
  const prompts = [
    { q: "Hvad var sværest denne uge?", hint: "V2? Ledsætning? Lytning uden transskript? Skriv 1 linje." },
    { q: "Hvad gik bedre end sidste uge?", hint: "Forstod du DSB-annonce? Skrev du til udlejer uden Google Translate?" },
    { q: "Hvad vil du øve næste uge?", hint: "Vælg 1 emne: V2, sin/hans, lytning, skrivning. Kun 1." },
  ];
  const week = Math.floor(Date.now() / (1000*60*60*24*7)) % prompts.length;
  return prompts[week];
}

export function saveReflection(text) {
  const reflections = JSON.parse(localStorage.getItem('dansk_reflections')||'[]');
  reflections.push({ date: new Date().toISOString(), text });
  localStorage.setItem('dansk_reflections', JSON.stringify(reflections.slice(-20))); // keep last 20
}

export function getReflections() {
  try { return JSON.parse(localStorage.getItem('dansk_reflections')||'[]'); } catch { return []; }
}

// What is impoverished / needs improvement (honest audit for motivation)
export const motivationAudit = {
  impoverished: [
    { area: "For mange tal", issue: "761, 1052, 26, 40 — overvældende. Føles som pensum, ikke som arbejde.", fix: "Skjul tal i UI. Vis 'uendelig engine' og 'nok til PD3' i stedet. Kun i Status vises tal." },
    { area: "For mange sider", issue: "15+ sider i sidebar — valgparalyse. Travl voksen vil have 1 knap: 'Dagens 15 min'.", fix: "Gør Øv til én handling: Today's work. Resten i Bibliotek sekundært. Bundnav kun 3: Øv, Sti, Bibliotek." },
    { area: "Grammatik liste overvældende", issue: "Viser 761 items på én gang — ligner lektie, ikke hjælp.", fix: "Vis kun uendelig engine som default. Skjul fast bank bag 'Vis alle 761'. Vis real-world unlock per emne." },
    { area: "Skrivning kræver nøgle", issue: "AI-feedback kræver OpenAI/Claude nøgle — friktion. Offline feedback føles tynd.", fix: "Forbedr offline heuristik: tjek V2, bindeord, ordantal, gentagelser. Vis før/efter sammenligning. Gem eksempler på god feedback uden nøgle." },
    { area: "Ingen personlige mål", issue: "Appen ved dit niveau, men ikke dit hvorfor: barnets skole, jobsamtale, kommune.", fix: "Tilføj 3 mål ved start: 'Jeg skal tale med mit barns lærer', 'Jobsamtale', 'Forstå DSB'. Anbefal indhold der tjener målet." },
    { area: "Ingen før/efter", issue: "Du ser % men ikke at du er blevet bedre til at skrive til udlejer.", fix: "Gem første skrivning vs nuværende. Vis side-by-side. Vis can-do: 'Du kan nu: forstå DSB, skrive klage, holde kaffepause på dansk'." },
    { area: "Ingen tid / deadline", issue: "Modultest om 3 måneder er abstrakt. Ingen nedtælling, ingen konsekvens.", fix: "Lad bruger sætte Modultest dato. Vis nedtælling + 'ved 15 min/dag er du klar om X uger' (pace calculator). Ærlig, ikke truende." },
    { area: "Flow diagram for komplekst", issue: "Flow diagram er for udvikler, ikke for elev. For mange pile.", fix: "For elev: simpelt flow Test → Sti → Øv → PD3. Detaljer i Værktøjer." },
  ],
  improvements: [
    { title: "Én daglig handling: Dagens 15 min", desc: "I stedet for 10 valg: én knap med hvorfor dette er det vigtigste nu, og hvad det låser op i virkeligheden (f.eks. 'Skriv til udlejer uden at blive misforstået').", impact: "Høj — reducerer valgparalyse, øger tilbagevenden" },
    { title: "Real-world unlocks per emne", desc: "Hvert grammatik-emne viser: 'Dette låser op: du kan skrive til udlejer / undgå konflikt i børnehave / forstå DSB'. Ikke point.", impact: "Høj — autonomi + kompetence, SDT" },
    { title: "Pace til PD3, ikke streaks", desc: "Vis 'Ved dit nuværende tempo (4 af 7 dage, 12 opgaver/dag) er du PD3-klar om 14 uger'. Kalender heatmap uden rød skam-farve, kun sort/hvid: arbejdede / arbejdede ikke. Besked: 'Ingen øvning sidste 7 dage — helt okay. 15 min i dag er nok.'", impact: "Høj — ærlig, ikke straffende, forskning: 3-4 dage/uge nok" },
    { title: "Can-do liste — funktionelle sejre", desc: "I stedet for %: 'Du kan nu: forstå DSB-annonce, skrive SMS om forsinkelse, holde kaffepause på dansk, skrive til udlejer'. Grøn når done, grå når næste. Tjekkes via path/writing/listening.", impact: "Meget høj — kompetence, tangible" },
    { title: "Før/efter skrivning", desc: "Gem første tekst vs nuværende. Vis side-by-side med forbedringer: V2 rettet, bindeord tilføjet, ordantal. Motivation kommer af at se egen fremgang.", impact: "Høj — især for skrivning" },
    { title: "Personlige mål (3 mål)", desc: "Ved start: vælg 3 mål fra liste: Barnets skole, Jobsamtale, Læge, Kommune, DSB, Kaffepause, PD3. Anbefalingen vægter disse mål. Viser 'Dette hjælper dit mål: tale med dit barns lærer'.", impact: "Meget høj — autonomi + relatedness" },
    { title: "Ugentlig refleksion 2 min", desc: "Hver mandag: 3 spørgsmål: Hvad var sværest? Hvad gik bedre? Hvad vil du næste uge? Kun 1 emne. Gemmes lokalt. Bygger vane uden streaks.", impact: "Medium-høj — refleksion > streaks" },
    { title: "Normalisér kampen", desc: "Vis 'Andre på Modul 1-5 kæmper også med V2 — det er normalt. 80% af B1-fejl er V2.' + 'Det er meningen at Box0-1 skal føles svært'.", impact: "Medium — reducerer skam" },
    { title: "Forenkl navigation", desc: "Bundnav: kun Øv, Sti, Bibliotek. Resten i 'Mere'. Skjul tal 761/1052 i overskrifter, vis 'Uendelig' og 'Nok til PD3'.", impact: "Medium — reducerer overload" },
    { title: "Ærlig projektion: hvis du stopper vs fortsætter", desc: "Vis SRS decay: 'Hvis du stopper 2 uger, falder Box2→Box1, du skal repetere 40 ord. Hvis du fortsætter 15 min/dag, er du klar til Modultest 4 om 5 uger.'", impact: "Medium — ærlig, ikke manipulativ" },
  ]
};
