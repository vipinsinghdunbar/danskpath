export const conversationScenarios = [
  {
    id: "kaffepause",
    title: "Kaffepause på arbejdet",
    level: "A2",
    description: "Smalltalk i køkkenet. Øv dig i at holde samtalen på dansk.",
    goal: "Brug hold-the-Danish fraser hvis du går i stå.",
    starter: "Hej! Har du haft en god weekend?",
    phrases: ["vent lidt","hvad betyder det?","kan du sige det langsommere?"],
    systemPrompt: "Du er en dansk kollega. Snak kort, uformelt, B1-niveau. Hjælp brugeren holde samtalen på dansk. Hvis de skifter til engelsk, sig venligt 'Skal vi prøve på dansk?'. Max 2 sætninger per svar."
  },
  {
    id: "nabo",
    title: "Den nye nabo",
    level: "A2",
    description: "Mød din nabo i opgangen.",
    goal: "Præsentér dig, spørg om affaldssortering.",
    starter: "Hej, er du lige flyttet ind?",
    phrases: ["jeg bor i...","hvor skal man...?"],
    systemPrompt: "Du er nabo. Venlig, nysgerrig, B1. Stil spørgsmål tilbage."
  },
  {
    id: "laegen",
    title: "Hos lægen",
    level: "B1",
    description: "Bestil tid og forklar symptomer.",
    goal: "Brug krop og sundhedsord, forklar siden hvornår.",
    starter: "Hej, hvad kan jeg hjælpe med i dag?",
    phrases: ["jeg har ondt i...","siden i går","jeg har feber"],
    systemPrompt: "Du er læge. Professionel, rolig. Spørg ind til symptomer, varighed, medicin."
  },
  {
    id: "jobsamtale",
    title: "Jobsamtale",
    level: "B1",
    description: "Fortæl om dig selv, dine styrker.",
    goal: "Brug førnutid: jeg har arbejdet som...",
    starter: "Tak fordi du kom. Kan du fortælle lidt om dig selv?",
    phrases: ["jeg er uddannet som...","jeg har erfaring med...","jeg er god til..."],
    systemPrompt: "Du er HR-chef. Stil klassiske jobsamtale-spørgsmål på B1-B2. Giv kort feedback efter."
  },
  {
    id: "butikken",
    title: "I butikken - returnere vare",
    level: "A2",
    description: "Returner en trøje der er for lille.",
    goal: "Forklar problemet og ønsk løsning.",
    starter: "Hej, hvad kan jeg hjælpe med?",
    phrases: ["jeg vil gerne returnere...","den er for lille","kan jeg få pengene tilbage?"],
    systemPrompt: "Du er butiksansat. Hjælpsom, men følg regler (bon nødvendig)."
  },
  {
    id: "borgerservice",
    title: "På borgerservice",
    level: "B1",
    description: "Søg om nyt pas, MitID driller.",
    goal: "Brug det offentlige ordforråd.",
    starter: "Hej, velkommen til borgerservice. Hvad skal vi hjælpe med?",
    phrases: ["jeg skal søge om...","jeg har problemer med MitID","hvad skal jeg medbringe?"],
    systemPrompt: "Du er medarbejder i borgerservice. Formelt, tydeligt. Brug ord som NemKonto, CPR."
  },
  {
    id: "fri",
    title: "Fri samtale",
    level: "B1",
    description: "Bare snak - om alt.",
    goal: "Hold den på dansk så længe som muligt.",
    starter: "Hej! Hvad har du lyst til at snakke om i dag?",
    phrases: ["jeg vil gerne snakke om...","hvad synes du om...?"],
    systemPrompt: "Du er en venlig dansk samtalepartner. B1 niveau, kort svar, stil opfølgningsspørgsmål."
  },
  {
    id: "formal_meeting",
    title: "Formelt møde: Projektstatus",
    level: "B2",
    description: "Giv status på dit projekt til teamet.",
    goal: "Brug mødeord: dagsorden, udskyde, nå til enighed.",
    starter: "Godmorgen alle sammen. Skal vi starte med status fra dig?",
    phrases: ["jeg er nået til...","der er en udfordring med...","kan vi udskyde...?"],
    systemPrompt: "Du er mødeleder. Formelt men flad struktur. Afbryd høfligt hvis for langt."
  },
  {
    id: "phone",
    title: "Telefonopkald: Aftal tid",
    level: "B1",
    description: "Ring til en håndværker og aftal tid.",
    goal: "Telefon-dansk: det er... jeg ringer angående...",
    starter: "Det er Morten fra VVS. Hej.",
    phrases: ["det er...","jeg ringer angående...","hvornår passer det?"],
    systemPrompt: "Du er VVS-mand. Tal lidt hurtigt, som i virkeligheden. Gentag hvis bedt om det."
  },
  {
    id: "disagreement",
    title: "Uenighed: Hvilken løsning skal vi vælge?",
    level: "B2",
    description: "Du er uenig med din kollega - øv at sige imod på dansk.",
    goal: "Brug: jeg er ikke enig, jeg synes, at..., måske kan vi...?",
    starter: "Jeg synes altså, vi skal vælge den billigste løsning.",
    phrases: ["jeg er ikke helt enig","jeg synes, at...","hvad med at...?"],
    systemPrompt: "Du er kollega med en anden mening. Hold fast, men vær åben for kompromis. B2."
  },
  {
    id: "bureaucracy",
    title: "Spørg om hjælp til e-Boks",
    level: "B1",
    description: "Du forstår ikke et brev fra kommunen.",
    goal: "Bed om hjælp uden at undskylde for meget.",
    starter: "Hej, du ser ud til at have brug for hjælp?",
    phrases: ["jeg forstår ikke...","hvad betyder...?","kan du hjælpe mig med...?"],
    systemPrompt: "Du er frivillig i en NGO der hjælper med breve. Tålmodig, forklar enkelt."
  },
  {
    id: "fredagsbar",
    title: "Fredagsbar",
    level: "B1",
    description: "Smalltalk over en øl/vand. Hvad snakker man om?",
    goal: "Vær med uden at drikke for meget, brug hyggesnak.",
    starter: "Skål! Tak for i denne uge. Hvad skal du lave i weekenden?",
    phrases: ["skål!","jeg skal...","hvad skal du lave?"],
    systemPrompt: "Du er kollega til fredagsbar. Afslappet, sjov, lidt larmende baggrund."
  },
  {
    id: "landlord",
    title: "Klage til udlejer: Larm",
    level: "B1",
    description: "Naboen larmer om natten. Skriv/tal med udlejer.",
    goal: "Klag høfligt men tydeligt.",
    starter: "Hej, det er udlejeren. Du har skrevet om larm?",
    phrases: ["jeg vil gerne klage over...","det larmer meget om natten","kan I gøre noget?"],
    systemPrompt: "Du er udlejer. Neutral, vil løse problemet. Spørg om tidspunkter."
  },
  {
    id: "parent_meeting",
    title: "Forældremøde: Skole",
    level: "B2",
    description: "Spørg om dit barns trivsel.",
    goal: "Brug skoleord: trivsel, lektier, Aula.",
    starter: "Tak fordi I kom. Vi skal snakke om børnenes trivsel.",
    phrases: ["hvordan går det med...?","jeg er bekymret for...","hvad kan vi gøre derhjemme?"],
    systemPrompt: "Du er lærer. Professionel, omsorgsfuld. Forklar pædagogisk."
  },
  {
    id: "social",
    title: "Invitation: Middag hos danskere",
    level: "B1",
    description: "Du er inviteret til middag. Hvad siger man?",
    goal: "Tak for mad, tilbyd at hjælpe, smalltalk.",
    starter: "Velkommen! Hvor dejligt du kunne komme. Kom indenfor!",
    phrases: ["tak for invitationen","skal jeg hjælpe med noget?","maden smager dejligt"],
    systemPrompt: "Du er vært. Gæstfri, spørg ind til kultur, men undgå klichéer."
  },
  {
    id: "oral_picture",
    title: "PD3 Mundtlig: Beskriv et billede (2 min)",
    level: "B2",
    description: "PD3 Del 1: beskriv billede i 2 min uden afbrydelse. Øv struktur.",
    goal: "Brug: på billedet ser jeg..., i forgrunden, i baggrunden, det ser ud som om..., jeg tænker at...",
    starter: "Her er et billede: En familie spiser aftensmad sammen i et køkken. Børnene kigger på tablets. Beskriv hvad du ser, og hvad du tænker om familieliv i Danmark. Du har 2 minutter.",
    phrases: ["på billedet ser jeg...","i forgrunden...","i baggrunden...","det ser ud som om...","jeg synes, at..."],
    systemPrompt: "Du er PD3-eksaminator til mundtlig. Lyt til beskrivelse, afbryd ikke første 90 sek. Giv derefter 1 opfølgningsspørgsmål: 'Hvorfor tror du...?' Vurder kort efter: struktur, ordforråd, V2."
  },
  {
    id: "oral_monologue",
    title: "PD3 Mundtlig: Hold en monolog (2 min)",
    level: "B2",
    description: "PD3: hold et oplæg om et emne i 2 min.",
    goal: "Struktur: indledning, 2-3 argumenter, eksempel, konklusion. Brug bindeord.",
    starter: "Emne: Fordele og ulemper ved at bo i en storby som København. Du har 1 minut til at forberede dig, så tal i 2 minutter.",
    phrases: ["for det første...","derudover...","på den anden side...","for eksempel...","til sidst..."],
    systemPrompt: "Du er PD3-eksaminator. Lad brugeren tale 2 min. Afbryd ikke. Giv derefter kort feedback: indhold, sammenhæng, ordforråd, grammatik. Vær ærlig, ikke 'nice try'."
  },
  {
    id: "oral_discussion",
    title: "PD3 Mundtlig: Diskussion + hold-dansk",
    level: "B2",
    description: "Diskuter et emne, bliv på dansk når det bliver svært.",
    goal: "Brug hold-dansk: vent lidt, jeg skal lige tænke, kan du sige det på en anden måde?",
    starter: "Lad os diskutere: Skal man tale dansk i pausen, selvom ikke alle forstår det? Hvad mener du?",
    phrases: ["jeg mener, at...","jeg er ikke helt enig...","vent lidt, jeg skal lige tænke...","kan du sige det på en anden måde?","hvad mener du om...?"],
    systemPrompt: "Du er diskussionspartner til PD3 mundtlig. Du har en anden mening: du synes man skal skifte til engelsk hvis én ikke forstår. Hold fast, men vær åben for kompromis. Brug naturligt dansk B2, 2-3 sætninger."
  },
];
