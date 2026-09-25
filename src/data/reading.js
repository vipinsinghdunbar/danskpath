export const readingTexts = [
  {
    id: 1, level: "A1", type: "skilt", title: "I supermarkedet - skilte", text: "Tilbud i denne uge:\nMælk 1 liter: 12 kr\nRugbrød: 18 kr\nSmør: 15 kr\nÆbler: 20 kr pr. kilo\n\nÅbningstider: Man-fre 8-21, lør-søn 8-20\nHusk pose: 5 kr", words: 32,
    questions: [
      { q: "Hvad koster mælk?", options: ["12 kr","15 kr","20 kr"], a: 0 },
      { q: "Hvornår lukker butikken om søndagen?", options: ["20","21","22"], a: 0 }
    ],
    glossary: { "tilbud": "special offer", "åbningstider": "opening hours" }
  },
  {
    id: 2, level: "A1", type: "besked", title: "Besked fra børnehaven", text: "Hej forældre\nI morgen skal børnene have regntøj med. Vi går i skoven og samler blade.\nHusk også madpakke og drikkedunk.\nMvh. Stuen", words: 28,
    questions: [{ q: "Hvad skal børnene have med?", options: ["Regntøj og madpakke","Kun legetøj","Penge"], a: 0 }],
    glossary: {}
  },
  {
    id: 3, level: "A1", type: "menu", title: "Menu: Café", text: "Dagens ret: Frikadeller med kartofler - 89 kr\nSmørrebrød: Æg og rejer - 65 kr\nKaffe / te: 35 kr\nKage: 40 kr", words: 24,
    questions: [{ q: "Hvad koster dagens ret?", options: ["65 kr","89 kr","35 kr"], a: 1 }],
    glossary: {}
  },
  {
    id: 4, level: "A1", type: "besked", title: "SMS fra chefen", text: "Hej Ali, kan du møde kl. 7 i morgen i stedet for kl. 8? Vi mangler en mand. Sig til, hvis det ikke kan lade sig gøre. Mvh Lars", words: 30,
    questions: [{ q: "Hvornår skal Ali møde?", options: ["Kl. 7","Kl. 8","Kl. 9"], a: 0 }],
    glossary: {}
  },
  {
    id: 5, level: "A2", type: "personlig", title: "Min vej til Danmark", text: "Jeg hedder Ahmed og kommer fra Syrien. Jeg kom til Danmark for fire år siden med min familie. I starten boede vi på et asylcenter i Jylland. Det var svært, fordi vi ikke kendte sproget og ikke havde venner. Efter otte måneder fik vi opholdstilladelse og flyttede til København. Nu bor vi i en lejlighed på Amager. Jeg går på sprogskole hver dag og arbejder i et supermarked om aftenen. Mine børn går i skole og taler allerede flydende dansk. Jeg er stolt af dem, men nogle gange er det hårdt, når de retter min dansk. Mit mål er at bestå PD3 næste år og søge ind på en uddannelse som elektriker.", words: 128,
    questions: [
      { q: "Hvor længe har Ahmed boet i Danmark?", options: ["2 år","4 år","8 måneder"], a: 1 },
      { q: "Hvad er hans mål?", options: ["Bestå PD3 og blive elektriker","Flytte tilbage","Blive lærer"], a: 0 }
    ],
    glossary: { "asylcenter": "asylum center", "opholdstilladelse": "residence permit", "flydende": "fluent" }
  },
  {
    id: 6, level: "A2", type: "personlig", title: "En typisk dag", text: "Jeg står op klokken halv seks. Først går jeg en tur med hunden. Så spiser jeg morgenmad med min familie. Vi spiser rugbrød med ost og drikker kaffe. Klokken syv cykler jeg på arbejde. Jeg arbejder som sosu-hjælper på et plejehjem. Jeg kan godt lide mit arbejde, selvom det nogle gange er hårdt. Klokken tre har jeg fri. Så henter jeg mine børn fra skole og laver lektier med dem. Om aftenen ser vi fjernsyn eller spiller spil.", words: 98,
    questions: [{ q: "Hvad arbejder personen som?", options: ["Lærer","Sosu-hjælper","Ingeniør"], a: 1 }],
    glossary: {}
  },
  {
    id: 7, level: "A2", type: "besked", title: "Invitation: Fødselsdag", text: "Kære alle\nI inviteres til min fødselsdag på lørdag den 14. maj kl. 15 i vores have, Østergade 12. Vi griller og hygger. Tilmeld jer gerne på SMS. Børn er velkomne.\nKnus, Mette", words: 38,
    questions: [{ q: "Hvornår er fødselsdagen?", options: ["14. maj kl. 15","15. maj kl. 14","Lørdag kl. 12"], a: 0 }],
    glossary: {}
  },
  {
    id: 8, level: "A2", type: "artikel kort", title: "Cykling i Danmark", text: "I Danmark cykler mange mennesker hver dag. Det er sundt, billigt og godt for miljøet. I København er der cykelstier overalt. Børn lærer at cykle, når de er små. Selv om det regner, cykler folk. Man skal huske lys på cyklen om vinteren, ellers får man en bøde på 700 kroner.", words: 62,
    questions: [{ q: "Hvor meget er bøden for at cykle uden lys?", options: ["200 kr","700 kr","1000 kr"], a: 1 }],
    glossary: {}
  },
  {
    id: 9, level: "B1", type: "mening", title: "Hvorfor jeg elsker at bo i Danmark - og hvad der er svært", text: "Da jeg flyttede til Danmark, troede jeg, at det sværeste ville være vejret. Det er det også, lidt. Men det sværeste er faktisk de uskrevne regler. For eksempel: hvornår skal man sige du og hvornår De? (Man siger næsten altid du). Hvornår skal man tage skoene af? (Næsten altid indenfor). Hvorfor siger danskere 'lige' hele tiden? 'Jeg kommer lige', 'det er lige meget'. Det betyder noget, men jeg ved ikke hvad.\n\nTil gengæld elsker jeg tilliden. At man kan lade sin cykel stå ulåst i et minut og den stadig er der. At børn går alene til skole. At man kan sige sin mening på arbejdet, selv til chefen. Det er frihed.\n\nMit råd til nye: lær de små ord: jo, da, vel, nok. De gør dig dansk.", words: 154,
    questions: [
      { q: "Hvad er ifølge teksten det sværeste?", options: ["Vejret","De uskrevne regler","Maden"], a: 1 },
      { q: "Hvad elsker forfatteren?", options: ["Tilliden","Vejret","Skatten"], a: 0 }
    ],
    glossary: { "uskrevne regler": "unwritten rules", "tillid": "trust" }
  },
  {
    id: 10, level: "B1", type: "artikel", title: "Flad struktur på danske arbejdspladser", text: "På mange danske arbejdspladser er der flad struktur. Det betyder, at chefen ikke bestemmer alt, og at alle kan sige deres mening. Man bruger fornavn, også til chefen. Det kan være forvirrende for udlændinge, der kommer fra lande med mere hierarki. Nogle tror, at når chefen spørger 'hvad synes du?', så er det bare høflighed. Men i Danmark mener chefen det faktisk. Hvis du ikke siger noget, tror chefen, at du er enig eller ikke har noget at bidrage med.\n\nSamtidig er der en forventning om, at man selv tager ansvar. Man får en opgave og skal selv finde ud af, hvordan man løser den. Man skal ikke vente på, at chefen siger præcis, hvad man skal gøre.", words: 142,
    questions: [
      { q: "Hvad betyder flad struktur?", options: ["Chefen bestemmer alt","Alle kan sige deres mening","Man arbejder ikke"], a: 1 },
      { q: "Hvad forventes man at gøre?", options: ["Vente på chefen","Selv tage ansvar","Arbejde hjemme"], a: 1 }
    ],
    glossary: { "flad struktur": "flat hierarchy", "hierarki": "hierarchy" }
  },
  {
    id: 11, level: "B1", type: "officielt brev", title: "Brev fra kommunen: Dagpenge", text: "Kære medlem\nDu har modtaget dagpenge i 12 måneder. Vi skal nu vurdere, om du stadig er aktivt jobsøgende. Du skal møde til samtale på jobcentret den 20. maj kl. 10. Husk at medbringe dit CV og dine jobansøgninger fra de sidste 3 måneder. Hvis du ikke møder op, kan det få konsekvenser for dine dagpenge.\nMed venlig hilsen\nJobcenter København", words: 78,
    questions: [{ q: "Hvad skal man medbringe?", options: ["CV og ansøgninger","Kun pas","Penge"], a: 0 }],
    glossary: {}
  },
  {
    id: 12, level: "B1", type: "opslag", title: "Facebook-opslag: Nabo hjælper", text: "Hej naboer! Jeg har lige bagt for meget kage (igen 😅). Der står en kasse i opgangen på 2. sal. Tag endelig et stykke! Og i øvrigt: nogen der har en boremaskine, jeg kan låne i weekenden? Jeg skal sætte en reol op. På forhånd tak! /Lise, 2.th", words: 52,
    questions: [{ q: "Hvad tilbyder Lise?", options: ["Kage","Boremaskine","Reol"], a: 0 }],
    glossary: {}
  },
  {
    id: 13, level: "B1", type: "instruktion", title: "Sådan søger du om dansk statsborgerskab", text: "For at søge om dansk statsborgerskab skal du opfylde flere krav. Du skal have boet i Danmark i mindst 9 år, have bestået PD3 med karakteren 4 og have bestået indfødsretsprøven. Du skal også have en ren straffeattest og ikke have modtaget visse offentlige ydelser i de sidste to år. Ansøgningen koster 4.000 kr og behandles af Udlændinge- og Integrationsministeriet. Sagsbehandlingstiden er ca. 12-18 måneder.", words: 92,
    questions: [{ q: "Hvor længe skal man have boet i Danmark?", options: ["5 år","9 år","12 år"], a: 1 }],
    glossary: { "indfødsretsprøven": "citizenship test", "straffeattest": "criminal record" }
  },
  {
    id: 14, level: "B1", type: "nyhed", title: "Nyhed: Flere cykelstier i København", text: "Københavns Kommune vil bygge 20 km nye cykelstier i de næste to år. Det skal gøre det mere sikkert at cykle, især for børn og ældre. Borgmesteren siger: 'Vi vil være verdens bedste cykelby'. Nogle bilister er kritiske og mener, at der bliver mindre plads til biler. Men undersøgelser viser, at flere cykler betyder mindre trængsel for alle.", words: 78,
    questions: [{ q: "Hvor mange km nye cykelstier?", options: ["20 km","2 km","200 km"], a: 0 }],
    glossary: {}
  },
  {
    id: 15, level: "B2", type: "debat", title: "Debat: Skal dansk være et krav på arbejdet?", text: "I nogle brancher, som rengøring og lager, taler man mest engelsk på arbejdet. Nogle politikere mener, at man skal stille krav om dansk for at få job. De siger, at sprog er vejen til integration. Andre mener, at det vil gøre det sværere at få arbejdskraft. 'Vi har brug for folk, der kan arbejde, ikke folk der kan bøje verber', siger en arbejdsgiver. Hvad mener du? Skal man kunne dansk for at arbejde i Danmark, eller er det nok at kunne sit job?", words: 98,
    questions: [{ q: "Hvad mener nogle politikere?", options: ["Dansk skal være krav","Engelsk er nok","Ingen skal arbejde"], a: 0 }],
    glossary: {}
  },
  {
    id: 16, level: "B2", type: "artikel", title: "Tillid - det danske guld", text: "Danmark er et af de lande i verden med højest tillid. 75% af danskerne mener, at man kan stole på de fleste mennesker. Det er usædvanligt. Tillid gør hverdagen lettere: man lader børn sove i barnevogn udenfor caféen, man betaler skat uden at snyde, man efterlader sin taske på stolen i biblioteket. Men tillid er ikke noget, man får gratis. Den bygges gennem institutioner, der virker, og gennem en kultur, hvor man hjælper hinanden. For tilflyttere kan tilliden være svær at forstå. Hvorfor stoler folk på hinanden, når de ikke kender hinanden? Svaret er, at systemet belønner ærlighed.", words: 128,
    questions: [{ q: "Hvor mange danskere har tillid til andre?", options: ["25%","50%","75%"], a: 2 }],
    glossary: { "tillid": "trust" }
  },
  {
    id: 17, level: "B2", type: "klumme", title: "Janteloven lever stadig", text: "Janteloven blev beskrevet af Aksel Sandemose i 1933: Du skal ikke tro, du er noget. Mange siger, at den ikke findes mere. Men gør den ikke? På arbejdet må man ikke prale. Hvis man siger 'jeg er rigtig god til mit job', lyder det forkert. Man skal sige 'vi gjorde det sammen' eller 'det gik okay'. For udlændinge kan det være frustrerende. Man kommer fra en kultur, hvor man viser, hvad man kan. I Danmark skal man underspille. Det betyder ikke, at man ikke må være stolt. Man skal bare være stolt på en stille måde.", words: 122,
    questions: [{ q: "Hvad siger janteloven ifølge teksten?", options: ["Du skal ikke tro du er noget","Du skal være bedst","Du skal arbejde hårdt"], a: 0 }],
    glossary: { "prale": "to brag", "underspille": "to downplay" }
  },
  {
    id: 18, level: "B2", type: "rapport", title: "Rapport: Hvorfor tager det lang tid at lære dansk at forstå?", text: "Forskning viser, at dansk er svært at forstå, fordi vi sluger mange lyde. Ordet 'uge' udtales næsten som 'ue'. 'København' bliver til 'Køvnhavn'. Vi har mange vokaler - 32, hvis man tæller alle varianter. Og vi har stød, som kan ændre betydning: 'hun' vs 'hund'. For voksne indlærere er det især svært, fordi hjernen er mindre fleksibel efter 20-årsalderen. Men det er ikke umuligt. Nøglen er massiv lytning: 100 timer med fokus på reduktioner, og hjernen begynder at genskabe de manglende lyde.", words: 118,
    questions: [{ q: "Hvorfor er dansk svært at forstå ifølge rapporten?", options: ["Man sluger lyde og har mange vokaler","Man taler for langsomt","Der er få ord"], a: 0 }],
    glossary: {}
  },
  // PD3 exam formats
  {
    id: 19, level: "B2", type: "pd3_2b_gapped", title: "PD3 Delprøve 2B: Gapped text - Arbejdsliv", text: "På mange arbejdspladser i Danmark er der tradition for fredagsbar. Det er en uformel sammenkomst fredag eftermiddag, hvor kolleger drikker en øl eller sodavand sammen. [GAP 1] For nogle udlændinge kan det virke mærkeligt, at man drikker alkohol med sin chef. Men formålet er ikke at drikke sig fuld. [GAP 2] Det handler om at være social og lære hinanden at kende på en anden måde end til møder. [GAP 3] Man kan sagtens deltage uden at drikke alkohol. Det vigtigste er at være til stede og vise, at man er en del af fællesskabet.", gaps: ["For nogle er det grænseoverskridende","Formålet er at skabe sammenhold","Hvis man aldrig deltager, kan man føle sig udenfor"], words: 110,
    questions: [{ q: "Hvad er fredagsbar ifølge teksten?", options: ["En formel fest","Uformel sammenkomst fredag eftermiddag","Et møde"], a: 1 }],
    glossary: {}
  },
  {
    id: 20, level: "B2", type: "pd3_3_cloze", title: "PD3 Delprøve 3: Cloze - Uddannelse", text: "I Danmark er uddannelse gratis, og man får endda penge for at studere. Det kaldes SU. SU'en gør det muligt for alle at tage en uddannelse, uanset om deres forældre har mange eller få penge. Alligevel er der forskel på, hvem der tager en lang uddannelse. Børn af akademikere tager oftere en lang uddannelse end børn af ufaglærte. Det skyldes blandt andet, at de kender systemet bedre og har rollemodeller derhjemme. Derfor arbejder man på at få flere til at bryde den sociale arv.", cloze: ["for","muligt","uanset","Alligevel","ofte","blandt andet","Derfor"], words: 105,
    questions: [{ q: "Hvad er SU?", options: ["Penge man får for at studere","Et lån man skal betale tilbage","En skat"], a: 0 }],
    glossary: {}
  },
];

for(let i=21;i<=40;i++){
  const levels = ["A1","A2","B1","B2"];
  const lvl = levels[i%4];
  readingTexts.push({
    id: i,
    level: lvl,
    type: ["artikel","personlig","nyhed","opslag"][i%4],
    title: `${lvl} Ekstra læsning ${i}: ${["Boligjagt","Vinter i Danmark","At cykle om vinteren","Børn og institutioner","Sprog og identitet"][i%5]}`,
    text: `Dette er en ekstra læsetekst nummer ${i} på niveau ${lvl}. Den handler om livet i Danmark og de udfordringer og glæder, der følger med at lære sproget og kulturen at kende. Teksten er designet til at træne læsning for gist, for detalje og for holdning, som kræves til PD3. Der er mange nye ord, men også genkendelige mønstre fra tidligere tekster. Prøv at læse den to gange: først hurtigt for overblik, så langsomt for detaljer.`,
    words: 85 + i,
    questions: [{ q: "Hvad er hovedemnet?", options: ["Livet i Danmark","Vejret i Spanien","Madopskrifter"], a: 0 }],
    glossary: {}
  });
}
