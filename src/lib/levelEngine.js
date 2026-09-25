// Level Engine — how many questions to clear a level, difficulty progression, no-repeat guarantee
// Modul 1 (A1) -> Modul 2 (A1-A2) -> Modul 3 (A2) -> Modul 4 (A2-B1) -> Modul 5 (B1-B2) -> PD3 (B2)

import { getSeenMap, getRepetitionStats } from './tracking';
import { generateBatch } from './templateEngine';

export const modules = [
  {
    id: "m1",
    title: "Modul 1",
    cefl: "A1",
    desc: "Start. Alfabet, tal, præsentation. Ingen forudsætninger.",
    // How many to clear?
    requires: {
      grammarTopics: ["koen","flertal","nutid-datid","spoergsmaal","praep"],
      grammarCount: 80, // must answer 80 grammar items with >=75% correct in last 20 per topic
      grammarMasteryPct: 75,
      vocabCount: 120, // 120 ord fra A1 Basis
      listeningCount: 4,
      readingCount: 5,
      writingCount: 2, // 30-50 ord
      speakingCount: 2,
    },
    test: { questions: 20, timeMin: 20, passPct: 60 },
    difficulty: {
      sentenceLen: "4-6 ord, nutid, ingen ledsætning",
      vocab: "A1 Basis: familie, tal, farver, mad, bolig simple",
      grammar: "en/et + flertal -er/-e, nutid -r, hv-spørgsmål, i/på/til",
      example: "En bil → bilen. Jeg bor i Danmark. Hvor bor du?",
    }
  },
  {
    id: "m2",
    title: "Modul 2",
    cefl: "A1-A2",
    desc: "Hverdag. Du kan klare dig i butik og på arbejde med korte beskeder.",
    requires: {
      grammarTopics: ["v2","ikke","nutid-datid","adjektiv","dendet","modal"],
      grammarCount: 140,
      grammarMasteryPct: 75,
      vocabCount: 250,
      listeningCount: 8,
      readingCount: 10,
      writingCount: 4, // 60-80 ord
      speakingCount: 4,
    },
    test: { questions: 25, timeMin: 25, passPct: 60 },
    difficulty: {
      sentenceLen: "6-9 ord, V2 inversion, datid -ede",
      vocab: "Arbejde, bolig, transport, tid, A1 Basis repeteret",
      grammar: "V2: I morgen skal jeg..., ikke efter verbet, datid -ede, adj: en stor / et stort, den/det pronoun",
      example: "I morgen skal jeg på arbejde. Jeg drikker ikke kaffe. et stort hus.",
      diffFromPrev: "Fra Modul 1: +V2-reglen (før var S-V-O altid, nu verbet nr.2 når tid først). +datid. +adjektiv bøjning. Sætninger længere, 2 led foran."
    }
  },
  {
    id: "m3",
    title: "Modul 3",
    cefl: "A2",
    desc: "Det er her de fleste starter. Hverdagssprog med forklaring.",
    requires: {
      grammarTopics: ["ledsaetning","har-er","fremtid","flertal","refleksiv","bindeord","praep"],
      grammarCount: 180,
      grammarMasteryPct: 78,
      vocabCount: 450,
      listeningCount: 14,
      readingCount: 18,
      writingCount: 7, // 80-120 ord
      speakingCount: 8,
    },
    test: { questions: 30, timeMin: 30, passPct: 65 },
    difficulty: {
      sentenceLen: "8-12 ord, ledsætning, førnutid har/er",
      vocab: "Arbejde, bolig, familie, sundhed, samfund simple, kollokationer: holde møde",
      grammar: "Ledsætning: jeg ved at han ikke kommer (ikke før verbet), har/er: er gået vs har spist, skal + infinitiv fremtid, refleksiv: glæde sig, bindeord fordi/derfor",
      example: "Jeg ved at han ikke kommer i dag. Jeg er gået klokken syv. Jeg glæder mig til ferien.",
      diffFromPrev: "Fra Modul 2: +ledsætning (sværeste skift — ordstillingen vender). +har/er forskel. +refleksiv. Nu 2 verber i sætning, skal + infinitiv uden at/-r."
    }
  },
  {
    id: "m4",
    title: "Modul 4",
    cefl: "A2-B1",
    desc: "Arbejde og samfund. Flaskehals: V2 under pres + lytning uden transskript.",
    requires: {
      grammarTopics: ["staerke","sin","adjektiv","bindeord","praep","modal","har-er"],
      grammarCount: 220,
      grammarMasteryPct: 80,
      vocabCount: 700,
      listeningCount: 20,
      readingCount: 28,
      writingCount: 12, // 120-150 ord
      speakingCount: 14,
    },
    test: { questions: 35, timeMin: 35, passPct: 68 },
    difficulty: {
      sentenceLen: "10-15 ord, stærke verber, sin/hans, selvom/hvis/når/da",
      vocab: "Sundhed, samfund, møder, det offentlige, følelser, partikelverber: slå op, finde ud af",
      grammar: "Stærke verber: drikke→drak→drukket (vokal skifter), sin/hans (egen vs andens), bindeord: selvom (indrømmelse), hvis/når/da (tid/betingelse), præp fast: vente på, god til",
      example: "Selvom det regner, tager jeg cyklen. Anna henter sin søn (egen) vs hendes søn (andens). Jeg har drukket kaffe.",
      diffFromPrev: "Fra Modul 3: +stærke verber (ingen -ede/-te, vokalen gør arbejdet). +sin/hans betydningsforskel (stor). +bindeord der starter ledsætning → ny ordstilling igen. Lytning: transskript skjult først, DSB/DR hastighed."
    }
  },
  {
    id: "m5",
    title: "Modul 5",
    cefl: "B1-B2",
    desc: "PD3-klar. Argumentation, kultur, register. Skrivning 150-200 ord.",
    requires: {
      grammarTopics: ["v2","ledsaetning","staerke","sin","refleksiv","dendet","praep","bindeord","adjektiv","flertal","har-er","fremtid","modal"],
      grammarCount: 320, // all topics repeteret via infinite engine
      grammarMasteryPct: 82,
      vocabCount: 950,
      listeningCount: 26, // all 26
      readingCount: 38, // almost all 40
      writingCount: 20, // weekly new
      speakingCount: 18, // all scenarios
    },
    test: { questions: 40, timeMin: 45, passPct: 70 },
    difficulty: {
      sentenceLen: "12-20 ord, passiv, relativ, argumentation, 2 ledsætninger",
      vocab: "Miljø, økonomi, natur, uddannelse, samfund, bindeord avanceret: desuden, alligevel, på den anden side, kollokationer + partikelverber B2",
      grammar: "Alle 17 emner repeteret via uendelig engine med sværere varianter: passiv (bliver + participium), relativ der/som/hvis, V2 under pres med 3 led, ledsætning i ledsætning, skriftlig struktur: indledning-argument-konklusion + bindeord",
      example: "Det er ærgerligt at vi ikke mødes oftere, selvom vi bor tæt på. Bogen, der ligger på bordet, er min. Der bliver talt meget om flexicurity.",
      diffFromPrev: "Fra Modul 4: +alle emner i samme opgave (tidligere 1 regel, nu 2-3 regler i én sætning). +passiv + relativ. +skriftlig argumentation 150-200 ord med strukturkrav. +kultur PD3 Delprøve1: Folketing 179, flexicurity, jantelov. Lytning: podcast hastighed, ingen transskript første gang."
    }
  },
  {
    id: "pd3",
    title: "PD3 Eksamen",
    cefl: "B2",
    desc: "4 delprøver + mundtlig. Tidspres. Ingen nye regler — kun kombination og pres.",
    requires: {
      grammarTopics: ["v2","ledsaetning","staerke","sin","refleksiv","dendet","praep","bindeord","adjektiv","flertal","har-er","fremtid","modal","koen","ikke","spoergsmaal"],
      grammarCount: 450, // mastery via infinite
      grammarMasteryPct: 85,
      vocabCount: 1052, // all
      listeningCount: 26,
      readingCount: 40,
      writingCount: 30,
      speakingCount: 18,
      cultureCount: 10,
    },
    test: { questions: 50, timeMin: 60, passPct: 75, format: "PD3 4 delprøver" },
    difficulty: {
      sentenceLen: "PD3 format: gapped text, cloze, lyt Delprøve2, skriv 150-200 ord, mundtlig billede/monolog/diskussion",
      vocab: "Alle 1052 + 3000-4000 receptivt mål via kollokationer",
      grammar: "Ingen nye regler — alt fra Modul 1-5 kombineret under tidspres. V2 + ledsætning + sin/hans + stærke verber i samme tekst.",
      example: "PD3 Delprøve 4: Skriv 150-200 ord om fordele/ulemper ved fleksibel arbejdstid. Krav: V2, bindeord, indledning, 2 argumenter, konklusion.",
      diffFromPrev: "Fra Modul 5: ingen ny grammatik — kun eksamensformat + tid + kombination. Det er derfor uendelig engine er vigtig: du har set reglen 100 gange med nye ord, så du kan producere under pres."
    }
  }
];

export function getModuleById(id) { return modules.find(m=>m.id===id); }

export function getModuleProgress(moduleId) {
  try {
    const seenMap = getSeenMap();
    const path = JSON.parse(localStorage.getItem('dansk_path')||'{}');
    const weak = JSON.parse(localStorage.getItem('dansk_weak')||'{}');
    const vocabProgress = JSON.parse(localStorage.getItem('dansk_vocab_progress')||'{}'); // Box
    const usedListening = JSON.parse(localStorage.getItem('dansk_used_listening')||'[]');
    const usedReading = JSON.parse(localStorage.getItem('dansk_used_reading')||'[]');
    const writingAttempts = JSON.parse(localStorage.getItem('dansk_writing_attempts')||'[]');
    const speakingAttempts = JSON.parse(localStorage.getItem('dansk_speaking_attempts')||'[]');

    const mod = getModuleById(moduleId);
    if(!mod) return null;

    // Grammar progress: count done per required topics
    let grammarDone = 0;
    let grammarTotalNeeded = mod.requires.grammarCount;
    mod.requires.grammarTopics.forEach(topicId=>{
      const done = path[topicId]?.length || 0;
      grammarDone += done;
    });

    // Vocab done: count of words in Box >=2 (learning) + Box5 (mastered)
    const vocabDone = Object.keys(vocabProgress).length;

    const listeningDone = usedListening.length;
    const readingDone = usedReading.length;
    const writingDone = writingAttempts.length;
    const speakingDone = speakingAttempts.length;

    // Calculate pct per requirement
    const grammarPct = Math.min(100, Math.round(grammarDone / grammarTotalNeeded * 100));
    const vocabPct = Math.min(100, Math.round(vocabDone / mod.requires.vocabCount * 100));
    const listeningPct = Math.min(100, Math.round(listeningDone / mod.requires.listeningCount * 100));
    const readingPct = Math.min(100, Math.round(readingDone / mod.requires.readingCount * 100));
    const writingPct = Math.min(100, Math.round(writingDone / mod.requires.writingCount * 100));

    const overall = Math.round((grammarPct*0.35 + vocabPct*0.25 + listeningPct*0.15 + readingPct*0.15 + writingPct*0.10));

    // Is cleared?
    const cleared = grammarPct>=80 && vocabPct>=70 && listeningPct>=70 && readingPct>=70 && writingPct>=60;

    return {
      moduleId,
      grammarDone,
      grammarTotalNeeded,
      grammarPct,
      vocabDone,
      vocabNeeded: mod.requires.vocabCount,
      vocabPct,
      listeningDone,
      listeningNeeded: mod.requires.listeningCount,
      listeningPct,
      readingDone,
      readingNeeded: mod.requires.readingCount,
      readingPct,
      writingDone,
      writingNeeded: mod.requires.writingCount,
      writingPct,
      speakingDone,
      overall,
      cleared,
      totalSeen: Object.keys(seenMap).length,
    };
  } catch(e) {
    console.error(e);
    return null;
  }
}

export function getAllModulesProgress() {
  return modules.map(m=>({ module: m, progress: getModuleProgress(m.id) }));
}

export function getNextModule(currentModuleId) {
  const idx = modules.findIndex(m=>m.id===currentModuleId);
  if(idx<0) return modules[0]; // default Modul 1 — full education from zero
  if(idx < modules.length-1) return modules[idx+1];
  return modules[modules.length-1];
}

// What happens after using 750/760 grammar questions?
export function getAfterExhaustionInfo() {
  const stats = getRepetitionStats();
  return {
    totalGrammarBank: 761,
    totalSeen: stats.totalSeen,
    remainingFixed: Math.max(0, 761 - stats.totalSeen),
    whatNext: [
      "Fast bank (761) er brugt op → cyklus resetter, men med 30-dages regel: du ser ikke samme sætning igen før 30 dage er gået.",
      "Uendelig engine (anbefalet) → aldrig samme dedupKey inden 30 dage. 15 varianter per skabelon × 17 emner = 5.100+ kontrollerede varianter. Efter 760 brugte, får du stadig nye kombinationer: samme regel, nye ord.",
      "Eksempel: du har set 'I morgen skal jeg på arbejde' — næste gang får du 'Om sommeren tager vi til Norge' — samme V2-regel, nye ord, ny dedupKey.",
      "Derfor lærer du reglen, ikke svaret. Ved Modultest får du nye ord under pres — engine træner præcis det.",
      "Path forbedres: fra Modul 1-2 simple S-V-O til Modul 5 kombineret V2 + ledsætning + sin/hans i samme sætning."
    ]
  };
}

// Assessment parameters
export const assessments = {
  diagnostic: {
    title: "Niveau-test (første gang)",
    questions: 15,
    timeMin: 7,
    purpose: "Find startmodul Modul 2-5. Ikke bestå/ikke-bestå.",
    params: ["ORD/V2", "TID/datid", "KØN/en-et", "BØJ/adj", "PRÆ/vente på", "VALG/kollokationer", "LYT/reduktioner", "KULTUR/Folketing"],
    scoring: "Per skill % (kræver 3 forsøg før ranking). Samlet pct → level: <40% Modul2, <60% Modul3, <75% Modul4, >=75% Modul5",
    noRepeat: "Markeres i dansk_seen 30 dage, så næste gang nye varianter"
  },
  modultest: {
    title: "Modultest (per modul)",
    questions: "20-40 stigende per modul (M1 20, M2 25, M3 30, M4 35, M5 40)",
    timeMin: "20-45 min stigende",
    purpose: "Bestå modul → lås næste op. Krav 60-70% stigende.",
    params: ["Grammar mastery >=75-82% per emne", "Vocab count per modul", "Listening count", "Reading count", "Writing count + checklist (V2, bindeord, struktur)", "Tid brugt"],
    scoring: "80% grammar + 70% vocab/listening/reading + 60% writing = modul cleared. Ellers: anbefalet sti med svage emner.",
    noRepeat: "Uendelig engine sikrer nye varianter hver Modultest, selv samme modul retake."
  },
  trial: {
    title: "15-min trial (del med ven)",
    questions: 20,
    timeMin: 15,
    purpose: "Hurtig vurdering til ven + database. Samme som diagnostic men med invitedBy + QR + WhatsApp + survey + reward.",
    params: ["ORD, TID, KØN, BØJ, PRÆ, VALG, LYT reduktioner, KULTUR Folketing/flexicurity/jantelov", "Breakdown per skill", "Lacking <60%", "Personlig sti", "Tid brugt"],
    scoring: "Pct → level, lacking list, path anbefaling. Gemmes POST /api/trial med id, timestamp, name, email, level, pct, breakdown, lacking, path, timeSpent, invitedBy",
    noRepeat: "Markeres 30 dage, så ven ikke får samme 20 igen"
  },
  pd3: {
    title: "PD3 Prøve (B2)",
    questions: 50,
    timeMin: 60,
    format: "4 delprøver + mundtlig",
    purpose: "Eksamensformat. Ingen nye regler — kun kombination under tidspres.",
    delproever: [
      "Delprøve 1: Læseforståelse + kultur (Folketing, velfærd, arbejdsmarked) — gapped text + cloze",
      "Delprøve 2: Lytteforståelse — DSB, DR, telefon, multi-speaker, reduktioner",
      "Delprøve 3: Mundtlig — billedebeskrivelse, monolog, diskussion + hold den på dansk-fraser",
      "Delprøve 4: Skriftlig — 150-200 ord, struktur: indledning, 2 argumenter, konklusion, V2, bindeord"
    ],
    params: ["Alle 17 grammatik emner kombineret", "1052 ord + 3000-4000 receptivt via kollokationer", "26 lyt + 40 læs + 30 skriv + 18 tale", "Kultur 10", "Tid + struktur + V2 under pres"],
    scoring: "75% for at være PD3-klar. Efter PD3: klar til videregående, statsborgerskab, arbejde på dansk.",
  }
};
