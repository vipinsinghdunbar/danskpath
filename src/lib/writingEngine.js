// Writing Engine — weekly new exercises based on level
// Generates new writing prompt every week, per module, no repeat

import { getSeenMap } from './tracking';

const writingPools = {
  m1: [
    { title: "Min familie", prompt: "Skriv 30-50 ord om din familie. Hvem bor du med? Hvor bor I?", checklist: ["en/et + bestemt form", "nutid -r", "jeg/vi"], words: "30-50", example: "Jeg bor i Aarhus med min mand og to børn. Min datter går i skole..." },
    { title: "Min dag", prompt: "Skriv 30-50 ord om din dag. Hvornår står du op? Hvad laver du?", checklist: ["klokken + tid", "V2: I dag...", "nutid"], words: "30-50", example: "I dag står jeg op klokken seks. Jeg drikker kaffe og tager bussen..." },
    { title: "Min lejlighed", prompt: "Skriv 30-50 ord om din lejlighed. Hvor mange værelser?", checklist: ["en/et", "flertal", "der er"], words: "30-50", example: "Min lejlighed ligger tæt på skolen. Der er tre værelser..." },
    { title: "Besked til ven", prompt: "Skriv en kort besked (30 ord): du kommer sent i dag. Hvor mødes I?", checklist: ["V2", "klokken", "vi mødes"], words: "30", example: "Hej Ali. Jeg kommer lidt sent. Bussen kører ikke klokken otte..." },
  ],
  m2: [
    { title: "Besked til kollega", prompt: "Skriv 60-80 ord: du er syg i dag, kan ikke komme til møde. Hvornår kommer du igen?", checklist: ["V2 + inversion", "datid -ede", "fordi", "på mandag"], words: "60-80", example: "Hej alle. Jeg kan ikke komme i dag, fordi jeg er syg. Jeg kommer igen på mandag..." },
    { title: "Invitation", prompt: "Skriv 60-80 ord: inviter nabo til kaffe lørdag. Hvor og hvornår?", checklist: ["V2", "invitere til", "på lørdag", "klokken"], words: "60-80", example: "Hej nabo. Vil du komme til kaffe på lørdag? Vi mødes klokken tre hjemme hos mig..." },
    { title: "Besked om forsinkelse", prompt: "Skriv 60-80 ord: toget er forsinket, du kommer 20 min sent til jobsamtale.", checklist: ["datid", "forsinket", "derfor", "om ti minutter"], words: "60-80", example: "Hej. Toget er forsinket cirka tyve minutter. Derfor kommer jeg lidt sent..." },
    { title: "Handleliste + besked", prompt: "Skriv 60-80 ord: du handler for svigermor. Hvad køber du? Hvor meget koster det?", checklist: ["en/et + flertal", "koster", "jeg skal"], words: "60-80", example: "Jeg har købt mælk, brød og æbler. Det koster 120 kroner..." },
  ],
  m3: [
    { title: "Email til udlejer", prompt: "Skriv 80-120 ord til udlejer: håndværker kommer tirsdag, du er ikke hjemme. Hvad skal han lave? Hvor er nøglen?", checklist: ["V2", "ledsætning: at han...", "hvis", "skal + infinitiv", "på tirsdag"], words: "80-120", example: "Hej Peter. Håndværkerne kommer på tirsdag for at skifte vinduet i stuen. Jeg er ikke hjemme, men nøglen ligger i postkassen..." },
    { title: "Besked til læge", prompt: "Skriv 80-120 ord: du har ondt i halsen i 3 uger, har feber. Bed om tid. Hvad skal du huske?", checklist: ["har haft", "fordi", "jeg håber at", "hvis", "sundhedskort"], words: "80-120", example: "Hej. Jeg har haft ondt i halsen i næsten tre uger og har feber. Jeg vil gerne bestille en tid..." },
    { title: "Opslag fælles have", prompt: "Skriv 80-120 ord opslag: fælles have mellem boligblokke. Hvorfor? Hvem planlægger? Hvad dyrker I?", checklist: ["der er", "fordi", "man kan", "vi dyrker", "bindeord: desuden"], words: "80-120", example: "Vi har lavet en fælles have mellem blokkene. Ideen opstod fordi området manglede et mødested..." },
    { title: "Praktik rapport", prompt: "Skriv 80-120 ord om praktik på plejehjem. Hvad var svært? Hvad foreslog vejleder?", checklist: ["datid", "fordi", "hvis", "ledsætning", "efter en måned"], words: "80-120", example: "Jeg er i praktik på plejehjem tre dage om ugen. I begyndelsen var det svært at forstå beboerne..." },
  ],
  m4: [
    { title: "Klager til butik", prompt: "Skriv 120-150 ord klage: du har købt sko der er i stykker efter 2 uger. Hvad vil du have? Ombytning eller penge tilbage?", checklist: ["datid + førnutid", "fordi", "selvom", "derfor", "jeg vil gerne have at"], words: "120-150", example: "Jeg har købt et par sko i jeres butik for to uger siden. Desværre er de allerede i stykker..." },
    { title: "Ansøgning job", prompt: "Skriv 120-150 ord ansøgning: du søger job i supermarked. Hvad er din erfaring? Hvorfor dig?", checklist: ["jeg har arbejdet", "fordi", "jeg kan", "jeg er god til", "jeg glæder mig til"], words: "120-150", example: "Jeg søger jobbet som medarbejder i jeres butik. Jeg har erfaring fra..." },
    { title: "Debat: cykel eller bus?", prompt: "Skriv 120-150 ord debat: fordele/ulemper ved cykel vs bus for pendlere. Hvad er din løsning?", checklist: ["fordele/ulemper", "på den ene side / på den anden side", "fordi", "selvom", "derfor"], words: "120-150", example: "Mange pendlere står hver morgen med samme valg. Bussen er behagelig i regnvejr, men..." },
    { title: "Rapport: hjemmearbejde", prompt: "Skriv 120-150 ord rapport: firma har hjemmearbejde 2 dage/uge. Hvad viser undersøgelse? Hvorfor mødes tirsdag?", checklist: ["der er", "efter tre måneder", "viser at", "fordi", "selvom", "dog"], words: "120-150", example: "På vores arbejdsplads arbejder flere hjemme to dage om ugen. I begyndelsen var nogle bekymrede..." },
  ],
  m5: [
    { title: "PD3: Fleksibel arbejdstid", prompt: "Skriv 150-200 ord: fleksibel arbejdstid — fordele og pris. Indledning, 2 argumenter, konklusion. Brug bindeord.", checklist: ["V2", "indledning", "for det første / for det andet", "på den anden side", "til sidst", "konklusion", "150-200 ord"], words: "150-200", example: "Fleksibel arbejdstid bliver ofte fremhævet som et gode, og for mange er den det. Når man selv kan lægge sin dag..." },
    { title: "PD3: Teknologi og tid", prompt: "Skriv 150-200 ord: digitale løsninger lover effektivitet, men hvornår giver de ekstra arbejde? Hvad er den væsentlige opgave?", checklist: ["V2", "selvom", "hvis", "derfor", "ikke kun...men også", "argumentation"], words: "150-200", example: "Digitale løsninger bliver ofte præsenteret som enkel vej til mere effektiv service. Alligevel afhænger gevinsten..." },
    { title: "PD3: Transport debat", prompt: "Skriv 150-200 ord: debat om transport reduceres til bil vs cykel — hvorfor er det for enkelt? Hvad bør politik gøre?", checklist: ["V2", "reduceres til", "imidlertid", "derfor", "både...og", "målet bør ikke være...men"], words: "150-200", example: "Debatten om transport reduceres ofte til et valg mellem bilen og cyklen. Den modsætning overser..." },
    { title: "PD3: Hvorfor tager det tid at lære dansk?", prompt: "Skriv 150-200 ord: mange kan læse avis men ikke forstå frokoststue. Hvorfor? Hvad hjælper: læse mere eller lytte to gange?", checklist: ["V2", "forklaring", "derfor", "det der rykker er", "genkendelse vs gengivelse", "150-200 ord"], words: "150-200", example: "Mange kursister undrer sig over at de kan læse avisartikel men ikke forstå samtale i frokoststuen..." },
    { title: "PD3: Fælles rum i byen", prompt: "Skriv 150-200 ord: parker og pladser bliver levende når forskellige mennesker bruger dem forskelligt. Hvad bør planlægning gøre?", checklist: ["V2", "ikke kun...men", "først når", "derfor bør", "argumentation", "konklusion"], words: "150-200", example: "Mange byer investerer i parker og pladser, men kvaliteten afhænger ikke kun af arkitektur..." },
  ],
  pd3: [
    { title: "PD3 Delprøve 4: Miljø og forbrug", prompt: "Skriv 150-200 ord: bæredygtig udvikling — hvad kan borger, kommune og virksomhed gøre? Brug fakta + holdning.", checklist: ["PD3 struktur", "V2", "for det første", "desuden", "på den anden side", "til sidst", "bæredygtig", "konsekvens"], words: "150-200", example: "En bæredygtig udvikling kræver både borger, kommune og virksomhed. For det første..." },
    { title: "PD3 Delprøve 4: Flexicurity", prompt: "Skriv 150-200 ord: forklar flexicurity for udlænding. Fordele, ulemper, din holdning. Brug PD3 struktur.", checklist: ["PD3 struktur", "forklaring", "fordel/ulempe", "på den ene side", "på den anden side", "jeg mener at"], words: "150-200", example: "Flexicurity er den danske model for arbejdsmarkedet. Den betyder..." },
  ]
};

function getWeekNumber() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const diff = now - start;
  const oneWeek = 1000 * 60 * 60 * 24 * 7;
  return Math.floor(diff / oneWeek);
}

export function getWritingForLevel(levelId, count=1) {
  const pool = writingPools[levelId] || writingPools['m3'];
  const seenMap = getSeenMap();
  // Filter out seen in last 60 days for writing (longer)
  const available = pool.filter(item=>{
    const key = `write|${levelId}|${item.title}`;
    const ts = seenMap[key];
    if(!ts) return true;
    const days = (Date.now()-ts)/(1000*60*60*24);
    return days > 60;
  });
  const source = available.length>0 ? available : pool;
  // Pick based on week number for weekly new
  const week = getWeekNumber();
  const startIdx = week % source.length;
  const result = [];
  for(let i=0;i<count;i++) {
    const idx = (startIdx + i) % source.length;
    result.push({ ...source[idx], id: `write_${levelId}_${week}_${idx}_${Date.now()}`, levelId, week, dedupKey: `write|${levelId}|${source[idx].title}` });
  }
  return result;
}

export function getWeeklyWriting(levelId) {
  // Returns 1 new writing exercise per week per level, based on week number
  return getWritingForLevel(levelId, 1)[0];
}

export function getAllWritingLevels() {
  return Object.keys(writingPools);
}

export function markWritingSeen(item) {
  const map = JSON.parse(localStorage.getItem('dansk_seen')||'{}');
  map[item.dedupKey]=Date.now();
  map[item.id]=Date.now();
  localStorage.setItem('dansk_seen', JSON.stringify(map));
  // Also track attempt
  const attempts = JSON.parse(localStorage.getItem('dansk_writing_attempts')||'[]');
  attempts.push({ id: item.id, title: item.title, levelId: item.levelId, date: new Date().toISOString(), week: item.week });
  localStorage.setItem('dansk_writing_attempts', JSON.stringify(attempts));
}

export function getWritingProgress() {
  try {
    const attempts = JSON.parse(localStorage.getItem('dansk_writing_attempts')||'[]');
    const byLevel = {};
    attempts.forEach(a=>{
      if(!byLevel[a.levelId]) byLevel[a.levelId]=0;
      byLevel[a.levelId]++;
    });
    return { total: attempts.length, byLevel, attempts };
  } catch { return { total:0, byLevel:{}, attempts:[] }; }
}

// Before/after storage
export function saveWritingText(task, text) {
  try {
    const all = JSON.parse(localStorage.getItem('dansk_writing_texts')||'[]');
    all.push({ id: task.id, title: task.title, levelId: task.levelId, text, date: new Date().toISOString(), words: text.trim().split(/\s+/).filter(Boolean).length });
    localStorage.setItem('dansk_writing_texts', JSON.stringify(all.slice(-30)));
  } catch {}
}

export function getWritingTexts() {
  try { return JSON.parse(localStorage.getItem('dansk_writing_texts')||'[]'); } catch { return []; }
}

export function getFirstAndLatest() {
  const texts = getWritingTexts();
  if(texts.length<2) return { first: texts[0]||null, latest: texts[texts.length-1]||null, count: texts.length };
  return { first: texts[0], latest: texts[texts.length-1], count: texts.length, improvement: texts[texts.length-1].words - texts[0].words };
}

// For PathView: generate next week's writing in advance
export function getUpcomingWriting(levelId, weeks=4) {
  const pool = writingPools[levelId] || writingPools['m3'];
  const week = getWeekNumber();
  const upcoming=[];
  for(let w=0;w<weeks;w++) {
    const idx = (week + w) % pool.length;
    upcoming.push({ week: week+w, ...pool[idx] });
  }
  return upcoming;
}
