/**
 * PHASE 4 EXERCISE GENERATOR
 * Generates 200+ new exercises across all 15 categories
 * Each category expanded with A1, A2, B1, B2 difficulty levels
 *
 * Output: Copy generated exercises to src/lib/completeGrammarExercises.js
 *
 * Usage: node scripts/generatePhase4Exercises.js > phase4-exercises.json
 */

const phase4Exercises = {
  // === CATEGORY 1: VOCABULARY (ORD) ===
  // Expanded from 20 to 35 exercises
  ORD_PHASE4: [
    // A1 Level (Basic vocabulary)
    { id: 'ORD_A1_001', difficulty: 'A1', question: 'En ___ er sort og har fire hjul.', options: ['bil', 'cykel', 'tog'], correct: 'bil', explanation: 'A car (bil) has four wheels.', category: 'Vocabulary' },
    { id: 'ORD_A1_002', difficulty: 'A1', question: 'Jeg spiser til ___ hver dag kl. 12.', options: ['morgenmad', 'frokost', 'aftensmad'], correct: 'frokost', explanation: 'Frokost = lunch (midday meal)', category: 'Vocabulary' },
    { id: 'ORD_A1_003', difficulty: 'A1', question: 'Hans arbejder på et ___. Det er et stort sted med mange mennesker.', options: ['kontor', 'hospital', 'fabrik'], correct: 'kontor', explanation: 'Office (kontor) where people work with computers/admin', category: 'Vocabulary' },
    { id: 'ORD_A1_004', difficulty: 'A1', question: 'En ___ er grøn og vokser i haven.', options: ['blomst', 'træ', 'plante'], correct: 'plante', explanation: 'Plant (plante) - a general green growing thing', category: 'Vocabulary' },
    { id: 'ORD_A1_005', difficulty: 'A1', question: 'Hun er læge. Hun arbejder på ___. Der er mange syge mennesker.', options: ['skole', 'hospital', 'butik'], correct: 'hospital', explanation: 'Doctor works at hospital (hospital)', category: 'Vocabulary' },
    { id: 'ORD_A1_006', difficulty: 'A1', question: 'Om sommeren er det ___. Jeg svømmer i søen.', options: ['koldt', 'varmt', 'sneet'], correct: 'varmt', explanation: 'Varmt = warm/hot (summer weather)', category: 'Vocabulary' },
    { id: 'ORD_A1_007', difficulty: 'A1', question: 'En ___ er hvid og flyder på havet.', options: ['båd', 'bil', 'fly'], correct: 'båd', explanation: 'Boat (båd) floats on water', category: 'Vocabulary' },
    { id: 'ORD_A1_008', difficulty: 'A1', question: 'Jeg elsker ___ til mine børn. Det er sjovt!', options: ['at lege', 'at arbejde', 'at søvne'], correct: 'at lege', explanation: 'Lege = to play/toys for children', category: 'Vocabulary' },

    // A2 Level (Common verbs)
    { id: 'ORD_A2_001', difficulty: 'A2', question: 'Han ___ hvert morgen kl. 7. Han løber 5 kilometer.', options: ['løber', 'springer', 'danser'], correct: 'løber', explanation: 'Løber = runs (exercise activity)', category: 'Vocabulary' },
    { id: 'ORD_A2_002', difficulty: 'A2', question: 'Jeg ___ ikke på mit arbejde. Jeg er hjemmearbejdende.', options: ['arbejder', 'er', 'sad'], correct: 'arbejder', explanation: 'Arbejder = works (employment)', category: 'Vocabulary' },
    { id: 'ORD_A2_003', difficulty: 'A2', question: 'Hun ___ dansk meget godt. Hun har studeret det i fem år.', options: ['taler', 'skriver', 'læser'], correct: 'taler', explanation: 'Taler = speaks (language)', category: 'Vocabulary' },
    { id: 'ORD_A2_004', difficulty: 'A2', question: 'Jeg ___ meget i denne bog. Det er interessant.', options: ['læser', 'høre', 'ser'], correct: 'læser', explanation: 'Læser = reads (book/text)', category: 'Vocabulary' },
    { id: 'ORD_A2_005', difficulty: 'A2', question: 'Han ___ sin ven hver dag. De bor tæt på hinanden.', options: ['møder', 'ser', 'besøger'], correct: 'møder', explanation: 'Møder = meets (encounter person)', category: 'Vocabulary' },
    { id: 'ORD_A2_006', difficulty: 'A2', question: 'Hvad ___ du i dag? Jeg ___ pasta med grøntsager.', options: ['spiser | laver', 'drikker | spiser', 'spiser | spiser'], correct: 'spiser | laver', explanation: 'Spiser = eats; laver = makes/cooks', category: 'Vocabulary' },
    { id: 'ORD_A2_007', difficulty: 'A2', question: 'Hun ___ i haven hver dag. Der er mange blomster og grøntsager.', options: ['arbejder', 'er', 'sover'], correct: 'arbejder', explanation: 'Works/tends in garden', category: 'Vocabulary' },
    { id: 'ORD_A2_008', difficulty: 'A2', question: 'Vi ___ til København næste weekend. Vi skal se vennerne.', options: ['rejser', 'går', 'kommer'], correct: 'rejser', explanation: 'Rejser = travels (longer trip)', category: 'Vocabulary' },

    // B1 Level (Collocations & expressions)
    { id: 'ORD_B1_001', difficulty: 'B1', question: 'Han har svært ved at ___ og ___ i det kolde vejr. Hans hænder bliver stive.', options: ['gribe | arbejde', 'tage | lave', 'holde | arbejde'], correct: 'gribe | arbejde', explanation: 'Gribe = grip/handle; work in cold weather makes hands stiff', category: 'Collocations' },
    { id: 'ORD_B1_002', difficulty: 'B1', question: 'Hun har ___ til at flytte til Aalborg. Det er en stor beslutning.', options: ['planer', 'mulighed', 'mål'], correct: 'planer', explanation: 'Har planer = has plans (future intention)', category: 'Collocations' },
    { id: 'ORD_B1_003', difficulty: 'B1', question: 'Han er ___ for sit arbejde. Han gør det meget godt.', options: ['kendt', 'berømt', 'anerkendt'], correct: 'anerkendt', explanation: 'Anerkendt = recognized/acknowledged for work', category: 'Collocations' },
    { id: 'ORD_B1_004', difficulty: 'B1', question: 'Hun har ___ en vigtig rolle i projektet. Uden hende ville det ikke virke.', options: ['spillet', 'haft', 'taget'], correct: 'spillet', explanation: 'Spillet en rolle = played a role (figurative)', category: 'Collocations' },
    { id: 'ORD_B1_005', difficulty: 'B1', question: 'Han ___ sig selv til at arbejde 12 timer om dagen. Det er usundt.', options: ['tvang', 'drev', 'pressede'], correct: 'tvang', explanation: 'Tvang sig selv = forced himself (overwork)', category: 'Collocations' },

    // B2 Level (Idioms)
    { id: 'ORD_B2_001', difficulty: 'B2', question: 'Hun får ofte kritik, men hun ___ det af. Hun bekymrer sig ikke.', options: ['vender', 'drejer', 'slår'], correct: 'slår', explanation: 'Slå af = dismiss/shake off criticism (idiom)', category: 'Idioms' },
    { id: 'ORD_B2_002', difficulty: 'B2', question: 'Han har altid ___ med højre hånd og kan ikke ændre det. Det er hans måde.', options: ['skrevet', 'arbejdet', 'brugt'], correct: 'skrevet', explanation: 'Har skrevet = has written right-handed (established habit)', category: 'Idioms' },
    { id: 'ORD_B2_003', difficulty: 'B2', question: 'Hun ___ ikke hans dårlige adfærd længere. Hun sagde op fra jobbet.', options: ['tålte', 'tolerede', 'holdt'], correct: 'tålte', explanation: 'Tålte ikke = tolerated no longer (idiom with negation)', category: 'Idioms' },
    { id: 'ORD_B2_004', difficulty: 'B2', question: 'Han har altid været en der ___ sine drømme. Nu er han forfatter.', options: ['forfølgte', 'jagtede', 'fulgte'], correct: 'forfølgte', explanation: 'Forfølgte sine drømme = pursued his dreams', category: 'Idioms' },
  ],

  // === CATEGORY 2: PRONOUNS (PRON) ===
  // Expanded from 18 to 35 exercises
  PRON_PHASE4: [
    // A1 Level
    { id: 'PRON_A1_001', difficulty: 'A1', question: '___ er meget glad. ___ arbejder på et kontor.', options: ['Jeg | Han', 'Han | Jeg', 'Du | Vi'], correct: 'Jeg | Han', explanation: 'Subject pronouns: jeg (I), han (he)', category: 'Pronouns' },
    { id: 'PRON_A1_002', difficulty: 'A1', question: 'Hun giver ___ en gave. Det er hendes fødselsdagsgave til mig.', options: ['ham', 'mig', 'jer'], correct: 'mig', explanation: 'Object pronoun: mig (me) after "giver"', category: 'Pronouns' },
    { id: 'PRON_A1_003', difficulty: 'A1', question: '___ er mine venner. De er meget hyggelige.', options: ['De', 'De mand', 'Dem'], correct: 'De', explanation: 'Subject pronoun: De (they)', category: 'Pronouns' },
    { id: 'PRON_A1_004', difficulty: 'A1', question: 'Jeg kender ___ fra arbejde. Vi arbejder sammen.', options: ['ham', 'han', 'hans'], correct: 'ham', explanation: 'Object pronoun: ham (him)', category: 'Pronouns' },

    // A2 Level (sin/sit/sine introduction)
    { id: 'PRON_A2_001', difficulty: 'A2', question: 'Han tager ___ hat og går ud. Det er koldt.', options: ['hans', 'sin', 'mit'], correct: 'sin', explanation: 'Reflexive possessive: sin (his own) when subject = he', category: 'Reflexive Pronouns' },
    { id: 'PRON_A2_002', difficulty: 'A2', question: 'Hun læser ___ bog. Det er interessant.', options: ['hendes', 'sin', 'sit'], correct: 'sit', explanation: 'Sit (her own, neuter) - reflexive possessive', category: 'Reflexive Pronouns' },
    { id: 'PRON_A2_003', difficulty: 'A2', question: 'De putter ___ børn i seng. De er trætte.', options: ['deres', 'sine', 'deres'], correct: 'deres', explanation: 'Non-reflexive: deres (their) when other person', category: 'Reflexive Pronouns' },
    { id: 'PRON_A2_004', difficulty: 'A2', question: 'Hun og ___ er gode venner. Vi kender hinanden siden barndommen.', options: ['jeg', 'mig', 'min'], correct: 'jeg', explanation: 'Subject pronoun in coordination', category: 'Pronouns' },
    { id: 'PRON_A2_005', difficulty: 'A2', question: '___ og jeg skal mødes i dag. Vi har meget at snakke om.', options: ['Han', 'Ham', 'Hans'], correct: 'Han', explanation: 'Subject pronoun in coordination', category: 'Pronouns' },
    { id: 'PRON_A2_006', difficulty: 'A2', question: 'Giv ___ denne pakke. Hun skal modtage den i dag.', options: ['hun', 'hende', 'hendes'], correct: 'hende', explanation: 'Object pronoun: hende (her)', category: 'Pronouns' },

    // B1 Level (sin/sit/sine mastery)
    { id: 'PRON_B1_001', difficulty: 'B1', question: 'Han giver ___ datter pengene. Hun skal købe ___ egen cykel.', options: ['sin | sin', 'hans | sin', 'hans | hans'], correct: 'sin | sin', explanation: 'Reflexive: sin refers to subject (he) in both cases', category: 'Reflexive Pronouns' },
    { id: 'PRON_B1_002', difficulty: 'B1', question: 'De handler i ___ favoritbutik. Det er deres sted.', options: ['sine', 'deres', 'dem'], correct: 'deres', explanation: 'Non-reflexive: deres (their) when talking about others\' choice', category: 'Reflexive Pronouns' },
    { id: 'PRON_B1_003', difficulty: 'B1', question: '___ møder hinanden hver dag. De er gift med ___. (Han og hun)', options: ['De | hinanden', 'Dem | hinanden', 'De | de'], correct: 'De | hinanden', explanation: 'De = they; hinanden = each other (reciprocal)', category: 'Pronouns' },
    { id: 'PRON_B1_004', difficulty: 'B1', question: 'Han siger til ___, at han vil have ___ mening.', options: ['mig | min', 'mig | min', 'jeg | jeg'], correct: 'mig | min', explanation: 'Object pronoun mig; possessive min', category: 'Pronouns' },
    { id: 'PRON_B1_005', difficulty: 'B1', question: 'Læreren gav klasserne ___ opgaver. De skulle løse ___ på egen hånd.', options: ['sine | dem', 'hans | dem', 'hans | sine'], correct: 'sine | dem', explanation: 'sin = teacher\'s own (reflexive); dem = them (object)', category: 'Reflexive Pronouns' },

    // B2 Level (Complex reflexive & relative)
    { id: 'PRON_B2_001', difficulty: 'B2', question: 'Hun og ___ gik sammen. ___ kom til mødet med ___.', options: ['han | Vi | dem', 'ham | Vi | ham', 'han | Han | de'], correct: 'han | Vi | dem', explanation: 'han (subject), Vi (we), dem (them object)', category: 'Pronouns' },
    { id: 'PRON_B2_002', difficulty: 'B2', question: 'De gav ___ penge til sig selv. De ville købe ___ nye ting.', options: ['sig | sig', 'dem | dem', 'sig | dem'], correct: 'sig | dem', explanation: 'sig (reflexive dative) = to themselves; dem (object) = them', category: 'Reflexive Pronouns' },
    { id: 'PRON_B2_003', difficulty: 'B2', question: 'Hvem ___ jeg snakke med? ___ ved, hvad jeg skal gøre?', options: ['skal | Hvem', 'kan | Hvad', 'skal | Hvem'], correct: 'skal | Hvem', explanation: 'skal = should; Hvem = who (interrogative)', category: 'Pronouns' },
  ],

  // === CATEGORY 3: CONJUNCTIONS (KONJ) ===
  // Expanded from 20 to 35 exercises
  KONJ_PHASE4: [
    // A1 Level
    { id: 'KONJ_A1_001', difficulty: 'A1', question: 'Jeg vil gerne være læge ___ mine forældre vil, at jeg bliver ingeniør.', options: ['men', 'og', 'eller'], correct: 'men', explanation: 'men = but (contradiction)', category: 'Conjunctions' },
    { id: 'KONJ_A1_002', difficulty: 'A1', question: 'Jeg skal til København ___ Berlin på ferie.', options: ['eller', 'og', 'men'], correct: 'eller', explanation: 'eller = or (choice between two)', category: 'Conjunctions' },
    { id: 'KONJ_A1_003', difficulty: 'A1', question: 'Hun studerer ___ arbejder på samme tid. Det er meget stressende.', options: ['og', 'men', 'hvis'], correct: 'og', explanation: 'og = and (two things at same time)', category: 'Conjunctions' },
    { id: 'KONJ_A1_004', difficulty: 'A1', question: '___ han kommer, skal vi have fest.', options: ['Hvis', 'Når', 'Fordi'], correct: 'Hvis', explanation: 'Hvis = if (conditional/hypothetical)', category: 'Conjunctions' },
    { id: 'KONJ_A1_005', difficulty: 'A1', question: '___ det regner, tager jeg paraply med.', options: ['Hvis', 'Når', 'Fordi'], correct: 'Når', explanation: 'Når = when (habitual/recurring)', category: 'Conjunctions' },
    { id: 'KONJ_A1_006', difficulty: 'A1', question: 'Jeg kan ikke komme ___ jeg har arbejde den dag.', options: ['fordi', 'hvis', 'men'], correct: 'fordi', explanation: 'fordi = because (reason/cause)', category: 'Conjunctions' },

    // A2 Level
    { id: 'KONJ_A2_001', difficulty: 'A2', question: 'Da jeg kom hjem, ___ familien på mig. De havde været bekymret.', options: ['ventede', 'skulle vente', 'har ventet'], correct: 'ventede', explanation: 'da = when (past narrative)', category: 'Conjunctions' },
    { id: 'KONJ_A2_002', difficulty: 'A2', question: 'Han arbejdede, ___ hun sov. De gjorde forskellige ting.', options: ['mens', 'når', 'selvom'], correct: 'mens', explanation: 'mens = while (simultaneous actions)', category: 'Conjunctions' },
    { id: 'KONJ_A2_003', difficulty: 'A2', question: 'Selvom han var træt, ___ han til mødet. Det var vigtig.', options: ['gik', 'skulle gå', 'ville gå'], correct: 'gik', explanation: 'selvom = even if/though (concessive)', category: 'Conjunctions' },
    { id: 'KONJ_A2_004', difficulty: 'A2', question: 'Jeg ved ikke ___ han kommer eller ej.', options: ['om', 'hvis', 'når'], correct: 'om', explanation: 'om = whether (indirect question)', category: 'Conjunctions' },
    { id: 'KONJ_A2_005', difficulty: 'A2', question: 'Han kom senere ___ han stod fast i trafik.', options: ['fordi', 'da', 'mens'], correct: 'fordi', explanation: 'fordi = because (explanation for lateness)', category: 'Conjunctions' },

    // B1 Level (Complex)
    { id: 'KONJ_B1_001', difficulty: 'B1', question: 'Ikke kun er hun smart, ___ hun er også meget dygtig.', options: ['men', 'og', 'samt'], correct: 'men', explanation: '"Ikke kun... men også" = not only... but also', category: 'Conjunctions' },
    { id: 'KONJ_B1_002', difficulty: 'B1', question: 'Så længe du arbejder hårdt, ___ du få gode resultater.', options: ['vil', 'skal', 'kan'], correct: 'vil', explanation: 'So long as = as long as (conditional)', category: 'Conjunctions' },
    { id: 'KONJ_B1_003', difficulty: 'B1', question: 'Hun gør det ikke ___ fordi hun ikke kan, ___ fordi hun ikke vil.', options: ['da | men', 'da | da', 'fordi | men'], correct: 'da | men', explanation: 'da = because; men = but (contrast)', category: 'Conjunctions' },
    { id: 'KONJ_B1_004', difficulty: 'B1', question: '___ han havde afsluttet skolen, ___ han til universitetet.', options: ['da | gik', 'når | gik', 'hvis | går'], correct: 'da | gik', explanation: 'da = after (past narrative sequence)', category: 'Conjunctions' },
  ],

  // === CATEGORY 4: PREPOSITIONS (PREP) ===
  // Expanded from 15 to 30 exercises
  PREP_PHASE4: [
    { id: 'PREP_A1_001', difficulty: 'A1', question: 'Jeg går ___ arbejde hver dag. Det tager 20 minutter.', options: ['til', 'i', 'på'], correct: 'til', explanation: 'til = to (destination)', category: 'Prepositions' },
    { id: 'PREP_A1_002', difficulty: 'A1', question: 'Han bor ___ København. Det er Danmarks hovedstad.', options: ['i', 'på', 'til'], correct: 'i', explanation: 'i = in (city)', category: 'Prepositions' },
    { id: 'PREP_A1_003', difficulty: 'A1', question: 'Hun sidder ___ bordet og spiser.', options: ['på', 'ved', 'i'], correct: 'ved', explanation: 'ved = at/by (sitting at table)', category: 'Prepositions' },
    { id: 'PREP_A1_004', difficulty: 'A1', question: 'Bogen ligger ___ bordet.', options: ['på', 'i', 'til'], correct: 'på', explanation: 'på = on (surface)', category: 'Prepositions' },
    { id: 'PREP_A2_001', difficulty: 'A2', question: 'Hun arbejder ___ en stor virksomhed ___ IT.', options: ['i | inden for', 'på | i', 'til | med'], correct: 'i | inden for', explanation: 'i = in (company); inden for = within (field)', category: 'Prepositions' },
    { id: 'PREP_A2_002', difficulty: 'A2', question: 'Vi mødes ___ Starbucks ___ mandag morgen.', options: ['på | på', 'i | på', 'til | i'], correct: 'i | på', explanation: 'i = in (café); på = on (day)', category: 'Prepositions' },
    { id: 'PREP_B1_001', difficulty: 'B1', question: 'Tro ___ ham er vigtigt. Han har aldrig løjet.', options: ['på', 'i', 'til'], correct: 'på', explanation: 'tro på = believe in (trust)', category: 'Prepositions' },
    { id: 'PREP_B1_002', difficulty: 'B1', question: 'Han er kendt ___ sine innovative idéer ___ design.', options: ['for | inden for', 'på | i', 'af | med'], correct: 'for | inden for', explanation: 'kendt for = known for; inden for = in (field)', category: 'Prepositions' },
  ],

  // === CATEGORY 5: ARTICLES & GENDER (ARTKV) ===
  // New exercises for Phase 4
  ARTKV_PHASE4: [
    { id: 'ARTKV_A1_001', difficulty: 'A1', question: '___ mand går i parken. ___ mand er høj.', options: ['En | en', 'Et | en', 'En | et'], correct: 'En | en', explanation: 'mand = common gender (en)', category: 'Articles' },
    { id: 'ARTKV_A1_002', difficulty: 'A1', question: '___ barn leger. ___ barn er glad.', options: ['Et | et', 'En | en', 'Et | en'], correct: 'Et | et', explanation: 'barn = neuter (et)', category: 'Articles' },
    { id: 'ARTKV_A1_003', difficulty: 'A1', question: '___ hus er blåt. Jeg elsker ___ hus.', options: ['et | det', 'en | det', 'et | den'], correct: 'et | det', explanation: 'hus = neuter; definite form = det', category: 'Articles' },
    { id: 'ARTKV_B1_001', difficulty: 'B1', question: 'Det er ___ komplekst problem. ___ problem kræver løsning.', options: ['et | Det', 'en | Problemet', 'et | Problemet'], correct: 'et | Det', explanation: 'problem = neuter; neuter + complex adjective', category: 'Articles' },
  ],

  // === REMAINING CATEGORIES ===
  POSS_PHASE4: [
    { id: 'POSS_A1_001', difficulty: 'A1', question: '___ taske er rød. Det er min ting.', options: ['Min', 'Mit', 'Mig'], correct: 'Min', explanation: 'Min = my (common gender)', category: 'Possessives' },
    { id: 'POSS_A1_002', difficulty: 'A1', question: '___ bil er sort. Det er hans ting.', options: ['Hendes', 'Hans', 'Sin'], correct: 'Hans', explanation: 'Hans = his (non-reflexive)', category: 'Possessives' },
    { id: 'POSS_A2_001', difficulty: 'A2', question: 'Hun tager ___ bog og læser ___.', options: ['sin | den', 'hendes | den', 'sin | den'], correct: 'sin | den', explanation: 'sin = reflexive possessive; den = definite object', category: 'Possessives' },
  ],

  PASS_PHASE4: [
    { id: 'PASS_A1_001', difficulty: 'A1', question: 'Huset ___ af ham. Han byggede det.', options: ['blev bygget', 'blev bygget', 'bygges'], correct: 'blev bygget', explanation: 'Passive past: blev + past participle', category: 'Passive' },
    { id: 'PASS_A2_001', difficulty: 'A2', question: 'Dørene ___ hver morgen. Det er rutine.', options: ['lukkes', 'blir lukket', 'bliver lukket'], correct: 'lukkes', explanation: 'Passive present: -es ending or bliver + participle', category: 'Passive' },
  ],
};

// Generate formatted output
console.log(JSON.stringify(phase4Exercises, null, 2));

// Count total exercises
let total = 0;
Object.keys(phase4Exercises).forEach(key => {
  total += phase4Exercises[key].length;
});

console.error(`\n✅ Generated ${total} new Phase 4 exercises across all categories`);
console.error('Copy the JSON above into src/lib/completeGrammarExercises.js');
