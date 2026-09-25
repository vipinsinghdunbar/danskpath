export const examParts = [
  {
    id: "1",
    title: "Delprøve 1: Læse- og samfundsforståelse",
    time: "45 min",
    description: "30 spørgsmål om danske samfundsforhold + læseforståelse af kortere tekster.",
    tasks: [
      { type: "mc", q: "Hvor mange medlemmer er der i Folketinget?", options: ["179","150","200"], a: 0 },
      { type: "mc", q: "Hvad er SU?", options: ["Statens Uddannelsesstøtte - penge til studerende","En skat","En fagforening"], a: 0 },
      { type: "mc", q: "Hvornår har man ret til dagpenge?", options: ["Når man har arbejdet og er medlem af a-kasse","Altid","Kun hvis man er syg"], a: 0 },
    ]
  },
  {
    id: "2a",
    title: "Delprøve 2A: Læseforståelse",
    time: "60 min",
    description: "Længere artikel + 10 multiple choice om gist, detalje og holdning.",
    tasks: []
  },
  {
    id: "2b",
    title: "Delprøve 2B: Gapped text",
    time: "30 min",
    description: "Indsæt 6-8 sætninger i en tekst. Test af sammenhæng og bindeord.",
    tasks: [
      { text: "På danske arbejdspladser er der flad struktur. Det betyder, at chefen spørger om din mening. [GAP 1] Hvis du ikke siger noget, tror chefen, at du er enig. [GAP 2] Man forventer, at du selv tager ansvar for dine opgaver. [GAP 3]", gaps: ["Det er ikke kun høflighed - han mener det faktisk.","Derfor er det vigtigt at sige noget til møder.","Du skal ikke vente på detaljerede instruktioner."], options: ["Det er ikke kun høflighed - han mener det faktisk.","Derfor er det vigtigt at sige noget til møder.","Du skal ikke vente på detaljerede instruktioner.","Man holder ofte fredagsbar om fredagen."] }
    ]
  },
  {
    id: "3",
    title: "Delprøve 3: Cloze (ordforråd + grammatik)",
    time: "45 min",
    description: "3 tekster med 8 huller hver. Vælg det rigtige ord fra 3 muligheder.",
    tasks: [
      { sentence: "Jeg har boet i Danmark ___ 3 år.", options: ["i","på","om"], a: 0 },
      { sentence: "Selvom det regner, ___ vi en tur.", options: ["går","går vi","vi går"], a: 1 },
      { sentence: "Hun er ___ til dansk.", options: ["dygtig","dygtigt","dygtige"], a: 0 },
    ]
  },
  {
    id: "4",
    title: "Delprøve 4: Skriftlig fremstilling",
    time: "90 min",
    description: "Skriv 150-200 ord. Vurderes på indhold, sammenhæng, ordforråd og grammatik.",
    tasks: []
  },
  {
    id: "oral",
    title: "Mundtlig: Samtale + billede + rollespil",
    time: "20 min",
    description: "Del 1: Præsentér dig. Del 2: Beskriv et billede. Del 3: Diskuter et emne. Del 4: Rollespil.",
    tasks: [
      { prompt: "Beskriv billedet: En familie spiser aftensmad sammen. Hvad ser du? Hvad tænker du om familieliv i Danmark?" },
      { prompt: "Rollespil: Du skal klage til din udlejer over larm. Din partner er udlejeren." },
    ]
  },
];
