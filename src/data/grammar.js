export const grammarTopics = [
  {
    id: "v2",
    title: "Sætningsskemaet & V2-reglen",
    level: "A2",
    category: "Ordstilling",
    englishBridge: "English: You already do this in English in emphatic sentences: Never have I seen... Yesterday came he? No. English usually S-V-O. Danish is V2 always. Think: English does V2 sometimes, Danish does it every sentence.",
    summary: "På dansk skal verbet altid stå på plads 2 i hovedsætninger. Det er den mest brudte regel på B1.",
    lesson: "V2 betyder: Uanset hvad der står først (subjekt, tid, sted), kommer det bøjede verbum som nr. 2. Efter verbet kommer subjektet, hvis det ikke stod først (inversion). I bisætninger gælder V2 IKKE.",
    examples: [
      { da: "Jeg bor i København.", en: "I live in Copenhagen.", note: "Normal: S-V-O" },
      { da: "I København bor jeg.", en: "In Copenhagen live I.", note: "Inversion: sted først → verbum nr. 2" },
      { da: "I går købte jeg en cykel.", en: "Yesterday I bought a bike.", note: "Tid først → inversion" },
      { da: "Måske kommer han i morgen.", en: "Maybe he comes tomorrow.", note: "Måske tæller som plads 1" },
    ],
    exercises: [
      { q: "___ (I dag / jeg / arbejder) hjemme.", a: "I dag arbejder jeg hjemme.", hint: "Tid først = inversion" },
      { q: "___ (I weekenden / vi / tager) til stranden.", a: "I weekenden tager vi til stranden.", hint: "V2" },
      { q: "Jeg ved, at han ___ (ikke / kommer).", a: "Jeg ved, at han ikke kommer.", hint: "Bisætning: adverbial før verbum" },
    ]
  },
  {
    id: "inversion",
    title: "Inversion & spørgsmål",
    level: "A2",
    category: "Ordstilling",
    englishBridge: "English: You already do this in English in emphatic sentences: Never have I seen... Yesterday came he? No. English usually S-V-O. Danish is V2 always. Think: English does V2 sometimes, Danish does it every sentence.",
    summary: "Når noget andet end subjektet står først, bytter subjekt og verbum plads.",
    lesson: "Inversion sker altid når adverbial, objekt eller ledsætning står først. Spørgsmål uden hv-ord har også inversion: Kommer du i morgen?",
    examples: [
      { da: "Nu forstår jeg.", en: "Now I understand." },
      { da: "Derfor lærer jeg dansk.", en: "Therefore I learn Danish." },
      { da: "Kommer du til festen?", en: "Are you coming to the party?" },
    ],
    exercises: [
      { q: "___ kommer du? (Hvornår)", a: "Hvornår kommer du?", hint: "hv-ord + V2" },
      { q: "På mandag ___ (jeg / har) fri.", a: "På mandag har jeg fri.", hint: "" },
    ]
  },
  {
    id: "ledsaetning",
    title: "Ledsætninger",
    level: "B1",
    category: "Ordstilling",
    englishBridge: "English: You already do this in English in emphatic sentences: Never have I seen... Yesterday came he? No. English usually S-V-O. Danish is V2 always. Think: English does V2 sometimes, Danish does it every sentence.",
    summary: "I ledsætninger står centraladverbialet (ikke, aldrig, også) FØR verbet.",
    lesson: "Hovedsætning: Jeg kommer ikke. Ledsætning: ...at jeg ikke kommer. Rækkefølge: konjunktion + subjekt + adverbial + verbum + resten.",
    examples: [
      { da: "Jeg tror, at han ikke kommer.", en: "I think that he is not coming." },
      { da: "Fordi jeg aldrig har været i Jylland.", en: "Because I have never been in Jutland." },
      { da: "Hvis du også vil med.", en: "If you also want to come." },
    ],
    exercises: [
      { q: "Jeg ved, at hun ___ (ikke / har / tid).", a: "Jeg ved, at hun ikke har tid.", hint: "ikke før har" },
      { q: "Selvom han ___ (aldrig / siger / noget).", a: "Selvom han aldrig siger noget.", hint: "" },
    ]
  },
  {
    id: "spg-former",
    title: "Spørgeformer",
    level: "A2",
    category: "Ordstilling",
    englishBridge: "English: You already do this in English in emphatic sentences: Never have I seen... Yesterday came he? No. English usually S-V-O. Danish is V2 always. Think: English does V2 sometimes, Danish does it every sentence.",
    summary: "Ja/nej-spørgsmål, hv-spørgsmål og indirekte spørgsmål.",
    lesson: "Direkte: Hvor bor du? Indirekte: Jeg ved ikke, hvor du bor. (ingen inversion i indirekte).",
    examples: [
      { da: "Bor du i Aarhus?", en: "Do you live in Aarhus?" },
      { da: "Hvorfor lærer du dansk?", en: "Why do you learn Danish?" },
      { da: "Ved du, hvor bussen kører hen?", en: "Do you know where the bus goes?" },
    ],
    exercises: [
      { q: "___ hedder du? (Hvad)", a: "Hvad hedder du?", hint: "" },
      { q: "Kan du sige, hvor ___ (du / bor)?", a: "Kan du sige, hvor du bor?", hint: "Ingen inversion i indirekte" },
    ]
  },
  {
    id: "nutid",
    title: "Nutid: regelmæssige + stærke",
    level: "A2",
    category: "Verber",
    englishBridge: "English: You already do this in English in emphatic sentences: Never have I seen... Yesterday came he? No. English usually S-V-O. Danish is V2 always. Think: English does V2 sometimes, Danish does it every sentence.",
    summary: "Infinitiv + r. Men stærke verber skifter vokal.",
    lesson: "at bo → bor, at have → har, at være → er. Stærke: at skrive → skriver, at drikke → drikker. Udtale: -er ofte = [ɐ].",
    examples: [
      { da: "Jeg arbejder i en børnehave.", en: "I work in a kindergarten." },
      { da: "Han drikker kaffe hver morgen.", en: "He drinks coffee every morning." },
    ],
    exercises: [
      { q: "Hun (at skrive) ___ en mail.", a: "skriver", hint: "" },
      { q: "Vi (at bo) ___ på Nørrebro.", a: "bor", hint: "" },
    ]
  },
  {
    id: "datid",
    title: "Datid: regelmæssig & uregelmæssig",
    level: "A2",
    category: "Verber",
    englishBridge: "English: You already do this in English in emphatic sentences: Never have I seen... Yesterday came he? No. English usually S-V-O. Danish is V2 always. Think: English does V2 sometimes, Danish does it every sentence.",
    summary: "-ede, -te og stærk bøjning.",
    lesson: "Gruppe 1: at snakke → snakkede. Gruppe 2: at bo → boede. Gruppe 3: at købe → købte. Stærke: at skrive → skrev, at komme → kom.",
    examples: [
      { da: "Jeg boede i Odense sidste år.", en: "I lived in Odense last year." },
      { da: "Vi købte hus i 2021.", en: "We bought a house in 2021." },
      { da: "Han kom for sent.", en: "He came too late." },
    ],
    exercises: [
      { q: "I går (at arbejde) ___ jeg hjemme.", a: "arbejdede", hint: "" },
      { q: "Hun (at skrive) ___ en bog.", a: "skrev", hint: "stærk" },
    ]
  },
  {
    id: "har-er",
    title: "Har / er i førnutid",
    level: "B1",
    category: "Verber",
    englishBridge: "English: You already do this in English in emphatic sentences: Never have I seen... Yesterday came he? No. English usually S-V-O. Danish is V2 always. Think: English does V2 sometimes, Danish does it every sentence.",
    summary: "De fleste verber bruger har. Bevægelse + tilstandsændring bruger er.",
    lesson: "har + supinum: Jeg har boet her i 3 år. er + supinum: Jeg er flyttet. Er-verber: gå, komme, blive, rejse, flytte, vokse.",
    examples: [
      { da: "Jeg har lært meget dansk.", en: "I have learned a lot of Danish." },
      { da: "Hun er flyttet til Valby.", en: "She has moved to Valby." },
      { da: "Vi er blevet gift.", en: "We have gotten married." },
    ],
    exercises: [
      { q: "Jeg ___ (har/er) boet her i 2 år.", a: "har", hint: "ikke bevægelse" },
      { q: "De ___ (har/er) rejst til Berlin.", a: "er", hint: "bevægelse" },
    ]
  },
  {
    id: "fornutid",
    title: "Førnutid (perfektum)",
    level: "A2",
    category: "Verber",
    englishBridge: "English: You already do this in English in emphatic sentences: Never have I seen... Yesterday came he? No. English usually S-V-O. Danish is V2 always. Think: English does V2 sometimes, Danish does it every sentence.",
    summary: "har/er + supinum. Bruges til erfaring og resultat.",
    lesson: "Supinum = ge-form på dansk: spist, drukket, været, haft. Aldrig/aldrig + førnutid for erfaring.",
    examples: [
      { da: "Har du nogensinde spist smørrebrød?", en: "Have you ever eaten smørrebrød?" },
      { da: "Jeg har aldrig været på Bornholm.", en: "I have never been to Bornholm." },
    ],
    exercises: [
      { q: "Har du (at se) ___ den film?", a: "set", hint: "supinum" },
    ]
  },
  {
    id: "fordatid",
    title: "Førdatid (pluskvamperfektum)",
    level: "B1",
    category: "Verber",
    englishBridge: "English: You already do this in English in emphatic sentences: Never have I seen... Yesterday came he? No. English usually S-V-O. Danish is V2 always. Think: English does V2 sometimes, Danish does it every sentence.",
    summary: "havde/var + supinum. Noget før noget andet i datid.",
    lesson: "Da jeg kom, havde hun allerede spist. Førdatid markerer forudtid.",
    examples: [
      { da: "Jeg havde boet i Danmark i et år, før jeg fik job.", en: "" },
    ],
    exercises: [
      { q: "Da han kom, ___ (have) jeg allerede ___ (gå).", a: "havde jeg allerede gået", hint: "" },
    ]
  },
  {
    id: "modal",
    title: "Modalverber",
    level: "A2",
    category: "Verber",
    englishBridge: "English: You already do this in English in emphatic sentences: Never have I seen... Yesterday came he? No. English usually S-V-O. Danish is V2 always. Think: English does V2 sometimes, Danish does it every sentence.",
    summary: "skal, vil, kan, må, bør, tør. Infinitiv uden at efter modal.",
    lesson: "Jeg skal arbejde i morgen. Du må ikke ryge her. Må = må gerne / må ikke. Skal = pligt/fremtid.",
    examples: [
      { da: "Du skal huske at købe mælk.", en: "" },
      { da: "Må jeg låne din cykel?", en: "" },
      { da: "Jeg vil gerne lære mere.", en: "" },
    ],
    exercises: [
      { q: "Du ___ (skal) ikke ___ (at bekymre) dig.", a: "skal ikke bekymre dig", hint: "uden at" },
    ]
  },
  {
    id: "fremtid",
    title: "Fremtid",
    level: "A2",
    category: "Verber",
    englishBridge: "English: You already do this in English in emphatic sentences: Never have I seen... Yesterday came he? No. English usually S-V-O. Danish is V2 always. Think: English does V2 sometimes, Danish does it every sentence.",
    summary: "skal/vil + infinitiv, kommer til at, præs. med fremtidsbetydning.",
    lesson: "I morgen skal jeg til lægen (plan). Det kommer til at regne (prognose). Jeg rejser i næste uge (sikkert).",
    examples: [
      { da: "I morgen skal det regne hele dagen.", en: "" },
      { da: "Vi kommer til at mangle penge.", en: "" },
    ],
    exercises: [
      { q: "Det ___ (komme) til at tage lang tid.", a: "kommer til at tage", hint: "" },
    ]
  },
  {
    id: "passiv",
    title: "Passiv: s-passiv og blive-passiv",
    level: "B1",
    category: "Verber",
    englishBridge: "English: You already do this in English in emphatic sentences: Never have I seen... Yesterday came he? No. English usually S-V-O. Danish is V2 always. Think: English does V2 sometimes, Danish does it every sentence.",
    summary: "Bogen skrives / Bogen bliver skrevet. S-passiv er kort og formel.",
    lesson: "S-passiv: -s på infinitiv. Bruges i instruktioner, formelt sprog. Blive-passiv: mere hverdagsagtig og tydelig.",
    examples: [
      { da: "Her tales der dansk.", en: "" },
      { da: "Huset blev bygget i 1930.", en: "" },
      { da: "Der skrives mange mails hver dag.", en: "" },
    ],
    exercises: [
      { q: "Bilen ___ (at vaske) i går. (blive-passiv)", a: "blev vasket", hint: "" },
    ]
  },
  {
    id: "vaere-blive",
    title: "Være / blive",
    level: "A2",
    category: "Verber",
    englishBridge: "English: You already do this in English in emphatic sentences: Never have I seen... Yesterday came he? No. English usually S-V-O. Danish is V2 always. Think: English does V2 sometimes, Danish does it every sentence.",
    summary: "Være = tilstand. Blive = ændring.",
    lesson: "Jeg er træt vs. Jeg bliver træt. Han er gift vs. De bliver gift i morgen. Blive = to become.",
    examples: [
      { da: "Det bliver mørkt tidligt om vinteren.", en: "" },
      { da: "Hun er blevet bedre til dansk.", en: "" },
    ],
    exercises: [
      { q: "Det ___ (blive) koldt om aftenen.", a: "bliver", hint: "" },
    ]
  },
  {
    id: "kon",
    title: "Køn: en/et",
    level: "A1",
    category: "Navneord",
    englishBridge: "English: You already do this in English in emphatic sentences: Never have I seen... Yesterday came he? No. English usually S-V-O. Danish is V2 always. Think: English does V2 sometimes, Danish does it every sentence.",
    summary: "75% en-ord, 25% et-ord. Ingen sikker regel — lær artiklen med ordet.",
    lesson: "en bil, et hus. Ubestemt: en, et. Bestemt ental: -en, -et: bilen, huset. Vigtigt: husk køn fra start.",
    examples: [
      { da: "en kop, koppen, kopper, kopperne", en: "" },
      { da: "et barn, barnet, børn, børnene", en: "" },
    ],
    exercises: [
      { q: "___ hus (en/et)", a: "et", hint: "" },
      { q: "Bestemt form af 'bog' (en): ___", a: "bogen", hint: "" },
    ]
  },
  {
    id: "flertal",
    title: "Flertal",
    level: "A2",
    category: "Navneord",
    englishBridge: "English: You already do this in English in emphatic sentences: Never have I seen... Yesterday came he? No. English usually S-V-O. Danish is V2 always. Think: English does V2 sometimes, Danish does it every sentence.",
    summary: "-er, -e, -r, nul-endelse, uregelmæssig.",
    lesson: "en bil → biler, et hus → huse, en dag → dage, et barn → børn, en mand → mænd.",
    examples: [
      { da: "Jeg har to børn.", en: "" },
      { da: "Der er mange mennesker i byen.", en: "" },
    ],
    exercises: [
      { q: "Flertal af 'mand': ___", a: "mænd", hint: "" },
      { q: "Flertal af 'hus': ___", a: "huse", hint: "" },
    ]
  },
  {
    id: "adj",
    title: "Adjektiver: bøjning",
    level: "A2",
    category: "Navneord",
    englishBridge: "English: You already do this in English in emphatic sentences: Never have I seen... Yesterday came he? No. English usually S-V-O. Danish is V2 always. Think: English does V2 sometimes, Danish does it every sentence.",
    summary: "en stor bil, et stort hus, store biler. Komparativ: større, størst.",
    lesson: "Fælleskøn: stor, intetkøn: stort, flertal/bestemt: store. Komparativ med -ere/-est eller mere/mest.",
    examples: [
      { da: "en billig lejlighed, et billigt værelse, billige møbler", en: "" },
      { da: "Hun er dygtigere end mig.", en: "" },
    ],
    exercises: [
      { q: "et (stor) ___ hus", a: "stort", hint: "" },
      { q: "den (stor) ___ by", a: "store", hint: "bestemt" },
    ]
  },
  {
    id: "den-det",
    title: "Den/det foran adjektiv + substantiv",
    level: "B1",
    category: "Navneord",
    englishBridge: "English: You already do this in English in emphatic sentences: Never have I seen... Yesterday came he? No. English usually S-V-O. Danish is V2 always. Think: English does V2 sometimes, Danish does it every sentence.",
    summary: "Den røde bil, det store hus. Husk den/det ved bestemt form med adjektiv.",
    lesson: "Uden adj: bilen. Med adj: den røde bil. Mit/hans + adj: min røde bil (ingen den).",
    examples: [
      { da: "den gamle mand, det nye job, de unge mennesker", en: "" },
    ],
    exercises: [
      { q: "___ gamle hus (den/det)", a: "det", hint: "hus = et-ord" },
    ]
  },
  {
    id: "sin",
    title: "Sin/sit/sine",
    level: "B1",
    category: "Pronominer",
    englishBridge: "English: You already do this in English in emphatic sentences: Never have I seen... Yesterday came he? No. English usually S-V-O. Danish is V2 always. Think: English does V2 sometimes, Danish does it every sentence.",
    summary: "Sin = tilbage til subjektet (3. person). Hans/hendes = en andens.",
    lesson: "Han elsker sin kone (sin egen). Han elsker hans kone (en anden mands kone). Kæmpe betydningsforskel!",
    examples: [
      { da: "Hun vasker sit hår hver dag.", en: "" },
      { da: "De hentede deres børn.", en: "" },
      { da: "Peter hentede sin cykel.", en: "" },
    ],
    exercises: [
      { q: "Hun tager ___ (sin/hendes) taske.", a: "sin", hint: "egen taske" },
      { q: "Han besøger ___ (sin/hans) mor. (sin egen mor)", a: "sin", hint: "" },
    ]
  },
  {
    id: "refleksiv",
    title: "Refleksive pronominer",
    level: "A2",
    category: "Pronominer",
    englishBridge: "English: You already do this in English in emphatic sentences: Never have I seen... Yesterday came he? No. English usually S-V-O. Danish is V2 always. Think: English does V2 sometimes, Danish does it every sentence.",
    summary: "mig, dig, sig, os, jer, sig. Bruges ved refleksive verber.",
    lesson: "at glæde sig, at sætte sig, at skynde sig. Jeg glæder mig. Vi ses! (vi ses = vi ser hinanden / vi ses igen)",
    examples: [
      { da: "Jeg sætter mig på stolen.", en: "" },
      { da: "De skynder sig til bussen.", en: "" },
    ],
    exercises: [
      { q: "Jeg ___ (at glæde) mig til weekenden.", a: "glæder", hint: "glæder sig" },
    ]
  },
  {
    id: "man",
    title: "Man",
    level: "B1",
    category: "Pronominer",
    englishBridge: "English: You already do this in English in emphatic sentences: Never have I seen... Yesterday came he? No. English usually S-V-O. Danish is V2 always. Think: English does V2 sometimes, Danish does it every sentence.",
    summary: "Generelt subjekt. Man siger, man gør, man kan ikke...",
    lesson: "Man = people in general. Meget brugt i dansk. Man skal huske at... Man må ikke...",
    examples: [
      { da: "I Danmark siger man 'tak for i dag'.", en: "" },
      { da: "Man ved aldrig.", en: "" },
    ],
    exercises: [
      { q: "___ siger, at det bliver regnvejr.", a: "Man", hint: "" },
    ]
  },
  {
    id: "maengde",
    title: "Mængde: meget/mange, lidt/få",
    level: "A2",
    category: "Navneord",
    englishBridge: "English: You already do this in English in emphatic sentences: Never have I seen... Yesterday came he? No. English usually S-V-O. Danish is V2 always. Think: English does V2 sometimes, Danish does it every sentence.",
    summary: "Meget + utælleligt, mange + tælleligt. Lidt/få samme logik.",
    lesson: "Meget mælk, mange biler. Lidt tid, få venner. Meget/mange = meget/mange. Lidt/få = lidt/få.",
    examples: [
      { da: "Der er mange mennesker i parken.", en: "" },
      { da: "Jeg har meget arbejde i dag.", en: "" },
    ],
    exercises: [
      { q: "Jeg har ___ (mange/meget) tid.", a: "meget", hint: "tid = utælleligt" },
    ]
  },
  {
    id: "der-det",
    title: "Der/det som foreløbigt subjekt",
    level: "B1",
    category: "Pronominer",
    englishBridge: "English: You already do this in English in emphatic sentences: Never have I seen... Yesterday came he? No. English usually S-V-O. Danish is V2 always. Think: English does V2 sometimes, Danish does it every sentence.",
    summary: "Der er mange mennesker. Det er svært at lære dansk.",
    lesson: "Der = der er/er der, der bor, der findes. Det = det er, det var, det bliver. Det regner.",
    examples: [
      { da: "Der er et problem.", en: "" },
      { da: "Det er vigtigt at øve sig.", en: "" },
      { da: "Det regner i dag.", en: "" },
    ],
    exercises: [
      { q: "___ er mange biler på vejen.", a: "Der", hint: "" },
      { q: "___ er svært at forstå.", a: "Det", hint: "" },
    ]
  },
  {
    id: "praep",
    title: "Præpositioner",
    level: "A2",
    category: "Småord",
    englishBridge: "English: You already do this in English in emphatic sentences: Never have I seen... Yesterday came he? No. English usually S-V-O. Danish is V2 always. Think: English does V2 sometimes, Danish does it every sentence.",
    summary: "i, på, til, for, med, om, af, fra, hos, efter, før, under, over...",
    lesson: "i København, på Nørrebro, til fest, for to år siden, hos lægen. Præpositioner styrer ofte en bestemt kasus i andre sprog, men ikke på dansk — bare lær dem med verbet: at vente på, at tænke på.",
    examples: [
      { da: "Jeg venter på bussen.", en: "" },
      { da: "Vi taler om vejret.", en: "" },
      { da: "Hun er gift med en dansker.", en: "" },
    ],
    exercises: [
      { q: "Jeg venter ___ bussen. (på/i)", a: "på", hint: "vente på" },
      { q: "Vi taler ___ (om/på) filmen.", a: "om", hint: "" },
    ]
  },
  {
    id: "retning",
    title: "Retning: ind/ud, op/ned, hen/hjem",
    level: "B1",
    category: "Småord",
    englishBridge: "English: You already do this in English in emphatic sentences: Never have I seen... Yesterday came he? No. English usually S-V-O. Danish is V2 always. Think: English does V2 sometimes, Danish does it every sentence.",
    summary: "Retningsadverbier er meget danske. Gå ind, gå ud, tage hjem.",
    lesson: "ind = ind i, ud = ud af, op = opad, ned = nedad, hen = væk fra taler, her = til taler, hjem = til eget hjem.",
    examples: [
      { da: "Kom ind!", en: "" },
      { da: "Jeg tager hjem kl. 16.", en: "" },
      { da: "Gå op ad trappen.", en: "" },
    ],
    exercises: [
      { q: "Vi går ___ (ud/ind) i haven.", a: "ud", hint: "" },
    ]
  },
  {
    id: "ordvalg",
    title: "Ordvalg: ligge/lægge, sidde/sætte, kende/vide",
    level: "B1",
    category: "Småord",
    englishBridge: "English: You already do this in English in emphatic sentences: Never have I seen... Yesterday came he? No. English usually S-V-O. Danish is V2 always. Think: English does V2 sometimes, Danish does it every sentence.",
    summary: "Par der forvirrer alle.",
    lesson: "ligge = være, lægge = placere. sidde = være, sætte = placere. kende = kende person/sted, vide = vide fakta. Skille = adskille eller blive skilt?",
    examples: [
      { da: "Bogen ligger på bordet. Jeg lægger bogen på bordet.", en: "" },
      { da: "Jeg kender ham. Jeg ved, hvor han bor.", en: "" },
    ],
    exercises: [
      { q: "Bogen ___ (ligger/lægger) på bordet.", a: "ligger", hint: "tilstand" },
      { q: "Jeg ___ (kender/ved), hvor hun bor.", a: "ved", hint: "fakta" },
    ]
  },
  {
    id: "bindeord",
    title: "Bindeord",
    level: "B1",
    category: "Småord",
    englishBridge: "English: You already do this in English in emphatic sentences: Never have I seen... Yesterday came he? No. English usually S-V-O. Danish is V2 always. Think: English does V2 sometimes, Danish does it every sentence.",
    summary: "og, men, eller, for, så, fordi, selvom, mens, da, når, hvis, at...",
    lesson: "Sideordnende (og, men, eller, for) + hovedsætning. Underordnende (fordi, at, hvis, da) + ledsætning med omvendt adverbial-placering.",
    examples: [
      { da: "Jeg bliver hjemme, fordi jeg er syg.", en: "" },
      { da: "Selvom det regner, går vi en tur.", en: "" },
    ],
    exercises: [
      { q: "Jeg bliver hjemme, ___ (fordi/for) jeg er træt.", a: "fordi", hint: "fordi = fordi, for = for" },
    ]
  },
  {
    id: "relativ",
    title: "Relative sætninger: som/der/hvis/hvor",
    level: "B2",
    category: "Avanceret",
    englishBridge: "English: You already do this in English in emphatic sentences: Never have I seen... Yesterday came he? No. English usually S-V-O. Danish is V2 always. Think: English does V2 sometimes, Danish does it every sentence.",
    summary: "B2-markør. Huset, som jeg bor i. Manden, der kommer.",
    lesson: "der = subjekt i relativsætning, som = subjekt/objekt, hvis = ejefald, hvor = sted. Komma-regler ved relativsætninger.",
    examples: [
      { da: "Det er manden, der bor ved siden af.", en: "" },
      { da: "Bogen, som jeg læser, er spændende.", en: "" },
      { da: "Huset, hvor jeg bor, er gammelt.", en: "" },
    ],
    exercises: [
      { q: "Manden, ___ bor her, er rar. (der/som)", a: "der", hint: "subjekt" },
    ]
  },
  {
    id: "partikler",
    title: "Modalpartikler: jo, da, nok, vel, lige, bare",
    level: "B2",
    category: "Avanceret",
    englishBridge: "English: You already do this in English in emphatic sentences: Never have I seen... Yesterday came he? No. English usually S-V-O. Danish is V2 always. Think: English does V2 sometimes, Danish does it every sentence.",
    summary: "De små ord der gør dig dansk. De ændrer ikke betydning, men holdning.",
    lesson: "jo = som du ved, da = overraskelse, nok = gæt, vel = ikke sandt?, lige = dæmpning, bare = kun/opfordring. Kom nu bare! Det er jo klart! Det var da utroligt!",
    examples: [
      { da: "Det er jo ikke så svært.", en: "As you know, it's not that hard." },
      { da: "Kom nu bare!", en: "Just come on!" },
      { da: "Det er nok bedst at vente.", en: "It's probably best to wait." },
      { da: "Du kommer vel i morgen?", en: "You're coming tomorrow, right?" },
    ],
    exercises: [
      { q: "Det er ___ klart, at vi skal hjælpe. (jo)", a: "jo", hint: "fælles viden" },
      { q: "Du kommer ___ til festen? (vel)", a: "vel", hint: "bekræftelse" },
    ]
  },
];
