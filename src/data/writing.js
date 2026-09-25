export const writingTasks = [
  {
    id: "a1_besked",
    level: "A1",
    title: "Kort besked til chefen",
    prompt: "Du er syg i dag. Skriv en kort besked til din chef (3-4 sætninger). Brug: hej, jeg er syg, jeg kommer ikke i dag, hilsen.",
    minWords: 15,
    maxWords: 50,
    checklist: ["hilsen","jeg er syg","i dag"],
    example: "Hej Lars\nJeg er syg i dag, så jeg kommer ikke på arbejde. Jeg har feber og hovedpine. Jeg håber, jeg er rask i morgen.\nHilsen Ali"
  },
  {
    id: "a2_email",
    level: "A2",
    title: "Email: Byt vagt",
    prompt: "Skriv en email til din kollega. Du vil gerne bytte vagt på fredag, fordi du skal til lægen. 50-80 ord. Husk: emne, hilsen, forklaring, spørgsmål, afslutning.",
    minWords: 50,
    maxWords: 100,
    checklist: ["hej","fordi","kan du","hilsen","fredag","lægen"],
    example: "Emne: Bytte vagt fredag\nHej Mette\nJeg skriver, fordi jeg har fået en tid hos lægen på fredag kl. 10. Kan vi bytte vagt? Jeg kan tage din vagt på mandag i stedet for. Sig til, om det kan lade sig gøre.\nMange hilsner\nFatima"
  },
  {
    id: "b1_email",
    level: "B1",
    title: "Formel email: Klage over larm",
    prompt: "Din nabo larmer meget om aftenen. Skriv en email til din udlejer (70-100 ord). Beskriv problemet, hvornår det sker, og hvad du ønsker.",
    minWords: 70,
    maxWords: 120,
    checklist: ["fordi","derfor","om aftenen","jeg vil gerne","hilsen","larmer"],
    example: "Kære udlejer\nJeg skriver, fordi min nabo i lejlighed 3.th larmer meget om aftenen, især efter kl. 22. Det er svært at sove, og jeg har små børn. Jeg har prøvet at snakke med naboen, men det hjælper ikke. Derfor vil jeg gerne bede jer om hjælp. Kan I sende en advarsel?\nVenlig hilsen\nAhmed, 2.th"
  },
  {
    id: "b1_argument",
    level: "B1",
    title: "Argumenterende tekst: Skal børn have mobil i skolen?",
    prompt: "Skriv en argumenterende tekst (120-160 ord). For og imod mobiltelefoner i skolen. Brug bindeord: først, derudover, på den anden side, derfor, til sidst.",
    minWords: 120,
    maxWords: 180,
    checklist: ["fordi","derudover","på den anden side","jeg synes","derfor","til sidst","for eksempel"],
    example: "Jeg synes, at børn ikke skal have mobil i skolen. Først og fremmest forstyrrer mobiler undervisningen. Derudover er det dårligt for fællesskabet, når børn sidder med hver sin skærm i pausen. På den anden side kan mobiler være nyttige, for eksempel til at slå ord op. Men jeg synes, fordelene er mindre end ulemperne. Derfor mener jeg, at skolen skal samle mobilerne ind om morgenen og give dem tilbage efter skole."
  },
  {
    id: "b2_debat",
    level: "B2",
    title: "Debatindlæg: Skal man tale dansk i pausen?",
    prompt: "Skriv et debatindlæg til din arbejdsplads' intranet (150-200 ord). Emne: Skal man tale dansk i pausen, selvom ikke alle forstår det? Tag stilling og argumentér med eksempler. Brug formelt men personligt sprog.",
    minWords: 150,
    maxWords: 220,
    checklist: ["jeg mener","fordi","for eksempel","på den ene side","på den anden side","derfor","til sidst","efter min mening"],
    example: "Efter min mening skal vi tale dansk i pausen, men med respekt. Jeg forstår, at det kan føles ekskluderende, hvis man ikke forstår alt. Men hvis vi altid skifter til engelsk, lærer man aldrig dansk. Pausen er faktisk det bedste sted at øve, fordi man snakker om hverdagsting. For eksempel lærte jeg ordet 'hygge' i en pause. På den anden side skal vi huske at inkludere alle. Hvis én ikke forstår, kan man kort forklare på engelsk og så fortsætte på dansk. Derfor foreslår jeg, at vi som udgangspunkt taler dansk, men hjælper hinanden."
  },
  {
    id: "pd3_4",
    level: "B2",
    title: "PD3 Delprøve 4: Fordele og ulemper ved at bo i storby",
    prompt: "PD3 opgave: Skriv 150-200 ord om fordele og ulemper ved at bo i en storby som København. Husk indledning, 2-3 argumenter for, 1-2 imod, konklusion. Brug V2 og ledsætninger korrekt.",
    minWords: 150,
    maxWords: 210,
    checklist: ["for det første","derudover","på den anden side","jeg synes","fordi","selvom","derfor"],
    example: "At bo i en storby har både fordele og ulemper. For det første er der mange muligheder for arbejde og uddannelse. Derudover er der et stort kulturliv med museer, caféer og koncerter. Man kan også nemt komme rundt med bus, tog og cykel.\nPå den anden side er det dyrt at bo i København, og det kan være svært at finde en lejlighed. Der er også meget larm og forurening. Selvom jeg godt kan lide byen, savner jeg nogle gange naturen og roen på landet.\nAlt i alt synes jeg, at fordelene er større end ulemperne, især når man er ung og gerne vil have mange muligheder."
  },
  {
    id: "formal_letter",
    level: "B2",
    title: "Formelt brev: Ansøgning om praktik",
    prompt: "Skriv en ansøgning om praktikplads (150-180 ord). Fortæl om din baggrund, hvorfor du søger, og hvad du kan bidrage med.",
    minWords: 140,
    maxWords: 200,
    checklist: ["jeg søger","jeg har erfaring","jeg er","fordi","jeg vil gerne","med venlig hilsen"],
    example: ""
  },
  {
    id: "complaint",
    level: "B1",
    title: "Klage: Forsinket levering",
    prompt: "Du har bestilt en vare, som ikke er kommet. Skriv en klage-email (80-120 ord).",
    minWords: 80,
    maxWords: 130,
    checklist: ["jeg har bestilt","jeg har ikke modtaget","jeg vil gerne","fordi"],
    example: ""
  },
];
