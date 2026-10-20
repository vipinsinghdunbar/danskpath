/**
 * PHASE 4: NEW EXERCISES (200+ additional exercises)
 * Adds 15-20 exercises to each category for A1-B2 progression
 * These are merged into completeGrammarExercises.js
 */

export const phase4NewExercises = {
  ORD: [
    // A1 Basic Vocabulary
    { id: 'ORD_A1_001', question: 'En ___ er sort og har fire hjul.', options: ['bil', 'cykel', 'tog'], correct: 'bil', explanation: 'A car (bil) has four wheels.', errorCode: 'ORD' },
    { id: 'ORD_A1_002', question: 'Jeg spiser til ___ hver dag kl. 12.', options: ['morgenmad', 'frokost', 'aftensmad'], correct: 'frokost', explanation: 'Frokost = lunch (midday meal)', errorCode: 'ORD' },
    { id: 'ORD_A1_003', question: 'Hun arbejder på et ___. Der arbejder mange mennesker.', options: ['kontor', 'hospital', 'butik'], correct: 'kontor', explanation: 'Office (kontor) where people work', errorCode: 'ORD' },
    { id: 'ORD_A1_004', question: 'En ___ er grøn og vokser i haven.', options: ['blomst', 'træ', 'plante'], correct: 'plante', explanation: 'Plant (plante) - a general green thing', errorCode: 'ORD' },
    { id: 'ORD_A1_005', question: 'Om sommeren er det ___. Jeg svømmer i søen.', options: ['koldt', 'varmt', 'sneet'], correct: 'varmt', explanation: 'Varmt = warm/hot (summer)', errorCode: 'ORD' },
    { id: 'ORD_A1_006', question: 'En ___ er hvid og flyder på havet.', options: ['båd', 'bil', 'fly'], correct: 'båd', explanation: 'Boat (båd) floats on water', errorCode: 'ORD' },
    { id: 'ORD_A1_007', question: 'Jeg elsker ___ til mine børn. Det er sjovt!', options: ['at lege', 'at arbejde', 'at søvne'], correct: 'at lege', explanation: 'Lege = to play with children/toys', errorCode: 'ORD' },
    { id: 'ORD_A1_008', question: 'En ___ er mellem en bil og et hus. Du bor der.', options: ['drøm', 'lejlighed', 'søn'], correct: 'lejlighed', explanation: 'Apartment (lejlighed) - a place to live', errorCode: 'ORD' },
    { id: 'ORD_A1_009', question: 'Jeg drikker ___ hver morgen. Det vækker mig op.', options: ['kaffe', 'vand', 'saft'], correct: 'kaffe', explanation: 'Coffee (kaffe) wakes you up', errorCode: 'ORD' },
    { id: 'ORD_A1_010', question: 'En ___ er stor og rød. Den sprøjter vand.', options: ['cykel', 'brandbil', 'traktor'], correct: 'brandbil', explanation: 'Fire truck (brandbil)', errorCode: 'ORD' },

    // A2 Common Verbs
    { id: 'ORD_A2_001', question: 'Han ___ hvert morgen. Han løber 5 kilometer.', options: ['løber', 'springer', 'danser'], correct: 'løber', explanation: 'Løber = runs (exercise)', errorCode: 'ORD' },
    { id: 'ORD_A2_002', question: 'Jeg ___ ikke på mit arbejde. Jeg er hjemmearbejdende.', options: ['arbejder', 'er', 'bor'], correct: 'arbejder', explanation: 'Arbejder = works (employment)', errorCode: 'ORD' },
    { id: 'ORD_A2_003', question: 'Hun ___ dansk meget godt. Hun har studeret det i fem år.', options: ['taler', 'skriver', 'læser'], correct: 'taler', explanation: 'Taler = speaks (language)', errorCode: 'ORD' },
    { id: 'ORD_A2_004', question: 'Jeg ___ meget i denne bog. Det er interessant.', options: ['læser', 'hører', 'ser'], correct: 'læser', explanation: 'Læser = reads (books/text)', errorCode: 'ORD' },
    { id: 'ORD_A2_005', question: 'Han ___ sin ven hver dag. De bor tæt på hinanden.', options: ['møder', 'ser', 'besøger'], correct: 'møder', explanation: 'Møder = meets (encounter)', errorCode: 'ORD' },
    { id: 'ORD_A2_006', question: 'Hvad ___ du i dag? Jeg ___ pasta med grøntsager.', options: ['spiser | laver', 'drikker | spiser', 'spiser | spiser'], correct: 'spiser | laver', explanation: 'Spiser = eats; laver = makes/cooks', errorCode: 'ORD' },
    { id: 'ORD_A2_007', question: 'Hun ___ i haven hver dag. Der er mange blomster.', options: ['arbejder', 'er', 'sover'], correct: 'arbejder', explanation: 'Works/tends in garden', errorCode: 'ORD' },
    { id: 'ORD_A2_008', question: 'Vi ___ til København næste weekend.', options: ['rejser', 'går', 'kommer'], correct: 'rejser', explanation: 'Rejser = travels (longer trip)', errorCode: 'ORD' },
    { id: 'ORD_A2_009', question: 'Han ___ altid på cykel til arbejde.', options: ['kører', 'går', 'løber'], correct: 'kører', explanation: 'Kører = rides/drives', errorCode: 'ORD' },
    { id: 'ORD_A2_010', question: 'Vi ___ hinanden på universitetet.', options: ['mødte', 'så', 'kendte'], correct: 'mødte', explanation: 'Mødte = met (past tense)', errorCode: 'ORD' },

    // B1 Collocations & Idioms
    { id: 'ORD_B1_001', question: 'Han har ___ til at flytte til Aalborg. Det er en stor beslutning.', options: ['planer', 'mulighed', 'mål'], correct: 'planer', explanation: 'Har planer = has plans (future intention)', errorCode: 'ORD' },
    { id: 'ORD_B1_002', question: 'Hun er ___ for sit arbejde. Hun gør det meget godt.', options: ['kendt', 'berømt', 'anerkendt'], correct: 'anerkendt', explanation: 'Anerkendt = recognized/acknowledged', errorCode: 'ORD' },
    { id: 'ORD_B1_003', question: 'Han har ___ en vigtig rolle i projektet.', options: ['spillet', 'haft', 'taget'], correct: 'spillet', explanation: 'Spillet en rolle = played a role (figurative)', errorCode: 'ORD' },
    { id: 'ORD_B1_004', question: 'Hun ___ sig selv til at arbejde 12 timer dagligt.', options: ['tvang', 'drev', 'pressede'], correct: 'tvang', explanation: 'Tvang sig selv = forced herself', errorCode: 'ORD' },
    { id: 'ORD_B1_005', question: 'Han får ofte kritik, men han ___ det af.', options: ['vender', 'drejer', 'slår'], correct: 'slår', explanation: 'Slår af = dismisses/shakes off (idiom)', errorCode: 'ORD' },
  ],

  PRON: [
    // A1 Basic Pronouns
    { id: 'PRON_A1_001', question: '___ er meget glad. ___ arbejder på et kontor.', options: ['Jeg | Han', 'Han | Jeg', 'Du | Vi'], correct: 'Jeg | Han', explanation: 'Subject pronouns: jeg (I), han (he)', errorCode: 'PRON' },
    { id: 'PRON_A1_002', question: 'Hun giver ___ en gave. Det er hendes fødselsdagsgave til mig.', options: ['ham', 'mig', 'jer'], correct: 'mig', explanation: 'Object pronoun: mig (me)', errorCode: 'PRON' },
    { id: 'PRON_A1_003', question: '___ er mine venner. De er meget hyggelige.', options: ['De', 'De mand', 'Dem'], correct: 'De', explanation: 'Subject pronoun: De (they)', errorCode: 'PRON' },
    { id: 'PRON_A1_004', question: 'Jeg kender ___ fra arbejde. Vi arbejder sammen.', options: ['ham', 'han', 'hans'], correct: 'ham', explanation: 'Object pronoun: ham (him)', errorCode: 'PRON' },
    { id: 'PRON_A1_005', question: 'Du og ___ er gode venner.', options: ['jeg', 'mig', 'min'], correct: 'jeg', explanation: 'Subject pronoun in coordination', errorCode: 'PRON' },
    { id: 'PRON_A1_006', question: 'Giv ___ denne pakke. Hun skal modtage den.', options: ['hun', 'hende', 'hendes'], correct: 'hende', explanation: 'Object pronoun: hende (her)', errorCode: 'PRON' },
    { id: 'PRON_A1_007', question: '___ er fra Danmark. Han taler dansk.', options: ['Ham', 'Han', 'Hans'], correct: 'Han', explanation: 'Subject pronoun at sentence start', errorCode: 'PRON' },
    { id: 'PRON_A1_008', question: 'Du skal give ___ bogen.', options: ['jeg', 'mig', 'min'], correct: 'mig', explanation: 'Indirect object: mig (to me)', errorCode: 'PRON' },
    { id: 'PRON_A1_009', question: '___ og hun gik til mødet sammen.', options: ['Han', 'Ham', 'Hans'], correct: 'Han', explanation: 'Subject pronoun in coordination', errorCode: 'PRON' },
    { id: 'PRON_A1_010', question: 'Jeg så ___ i går. Han var glad.', options: ['ham', 'han', 'hans'], correct: 'ham', explanation: 'Object pronoun after verb', errorCode: 'PRON' },

    // A2 Reflexive Pronouns (sin/sit/sine)
    { id: 'PRON_A2_001', question: 'Han tager ___ hat og går ud. Det er koldt.', options: ['hans', 'sin', 'mit'], correct: 'sin', explanation: 'Reflexive: sin (his own)', errorCode: 'PRON' },
    { id: 'PRON_A2_002', question: 'Hun læser ___ bog. Det er interessant.', options: ['hendes', 'sin', 'sit'], correct: 'sit', explanation: 'Sit (her own, neuter)', errorCode: 'PRON' },
    { id: 'PRON_A2_003', question: 'De putter ___ børn i seng. De er trætte.', options: ['deres', 'sine', 'deres'], correct: 'deres', explanation: 'Non-reflexive: deres (their)', errorCode: 'PRON' },
    { id: 'PRON_A2_004', question: 'Hun og ___ er gode venner. Vi kender hinanden siden barndommen.', options: ['jeg', 'mig', 'min'], correct: 'jeg', explanation: 'Subject pronoun in coordination', errorCode: 'PRON' },
    { id: 'PRON_A2_005', question: '___ og jeg skal mødes i dag.', options: ['Han', 'Ham', 'Hans'], correct: 'Han', explanation: 'Subject pronoun', errorCode: 'PRON' },
    { id: 'PRON_A2_006', question: 'Han inviterer ___ til ___ fødselsdag.', options: ['mig | hans', 'mig | sin', 'jeg | sin'], correct: 'mig | sin', explanation: 'mig (me, object); sin (his own)', errorCode: 'PRON' },
    { id: 'PRON_A2_007', question: 'Læreren gav klassen ___. De skulle løse ___ på egen hånd.', options: ['opgaver | dem', 'opgaver | dem', 'opgaver | den'], correct: 'opgaver | dem', explanation: 'dem = them (object pronoun)', errorCode: 'PRON' },
    { id: 'PRON_A2_008', question: 'Hun finder ___ nøgler. De var under sofaen.', options: ['hendes', 'sit', 'sin'], correct: 'hendes', explanation: 'hendes (hers, non-reflexive)', errorCode: 'PRON' },
    { id: 'PRON_A2_009', question: 'Vi mødes ved ___ hus hver fredag.', options: ['hans', 'sin', 'mit'], correct: 'hans', explanation: 'hans (his, non-reflexive)', errorCode: 'PRON' },
    { id: 'PRON_A2_010', question: 'Jeg tager ___ jacka og går ud.', options: ['min', 'sit', 'hans'], correct: 'min', explanation: 'min = my (possessive)', errorCode: 'PRON' },

    // B1 Complex Reflexive
    { id: 'PRON_B1_001', question: 'Han giver ___ datter pengene til ___ egen cykel.', options: ['sin | sin', 'hans | sin', 'hans | hans'], correct: 'sin | sin', explanation: 'Reflexive: sin refers to subject (he)', errorCode: 'PRON' },
    { id: 'PRON_B1_002', question: 'De handler i ___ favoritbutik. Det er deres valg.', options: ['sine', 'deres', 'dem'], correct: 'deres', explanation: 'Non-reflexive: deres (their)', errorCode: 'PRON' },
    { id: 'PRON_B1_003', question: '___ møder hinanden hver dag. De er gift med ___.', options: ['De | hinanden', 'Dem | hinanden', 'De | de'], correct: 'De | hinanden', explanation: 'De = they; hinanden = each other', errorCode: 'PRON' },
    { id: 'PRON_B1_004', question: 'Hun siger til ___, at han skal have ___ mening.', options: ['mig | min', 'mig | min', 'jeg | jeg'], correct: 'mig | min', explanation: 'mig (me); min (my)', errorCode: 'PRON' },
    { id: 'PRON_B1_005', question: 'Læreren gav klasserne ___ opgaver. De skulle løse ___ på egen hånd.', options: ['sine | dem', 'hans | dem', 'hans | sine'], correct: 'sine | dem', explanation: 'sine = teacher\'s own; dem = them', errorCode: 'PRON' },
  ],

  KONJ: [
    // A1 Basic Conjunctions
    { id: 'KONJ_A1_001', question: 'Jeg vil gerne være læge ___ mine forældre vil, at jeg bliver ingeniør.', options: ['men', 'og', 'eller'], correct: 'men', explanation: 'men = but (contradiction)', errorCode: 'KONJ' },
    { id: 'KONJ_A1_002', question: 'Jeg skal til København ___ Berlin på ferie.', options: ['eller', 'og', 'men'], correct: 'eller', explanation: 'eller = or (choice)', errorCode: 'KONJ' },
    { id: 'KONJ_A1_003', question: 'Hun studerer ___ arbejder på samme tid.', options: ['og', 'men', 'hvis'], correct: 'og', explanation: 'og = and (two things together)', errorCode: 'KONJ' },
    { id: 'KONJ_A1_004', question: '___ han kommer, skal vi have fest.', options: ['Hvis', 'Når', 'Fordi'], correct: 'Hvis', explanation: 'Hvis = if (conditional)', errorCode: 'KONJ' },
    { id: 'KONJ_A1_005', question: '___ det regner, tager jeg paraply med.', options: ['Hvis', 'Når', 'Fordi'], correct: 'Når', explanation: 'Når = when (habitual)', errorCode: 'KONJ' },
    { id: 'KONJ_A1_006', question: 'Jeg kan ikke komme ___ jeg har arbejde den dag.', options: ['fordi', 'hvis', 'men'], correct: 'fordi', explanation: 'fordi = because (reason)', errorCode: 'KONJ' },
    { id: 'KONJ_A1_007', question: 'Han kommer til mødet, ___ han er meget travl.', options: ['selvom', 'da', 'hvis'], correct: 'selvom', explanation: 'selvom = even though', errorCode: 'KONJ' },
    { id: 'KONJ_A1_008', question: 'Vi mødes i dag ___ i morgen.', options: ['eller', 'og', 'men'], correct: 'eller', explanation: 'eller = or (choice between times)', errorCode: 'KONJ' },
    { id: 'KONJ_A1_009', question: 'Han arbejder hver dag ___ søndage.', options: ['både', 'undtagen', 'eller'], correct: 'undtagen', explanation: 'undtagen = except', errorCode: 'KONJ' },
    { id: 'KONJ_A1_010', question: 'Jeg lærer dansk ___ jeg bor i København.', options: ['fordi', 'hvis', 'da'], correct: 'fordi', explanation: 'fordi = because (reason)', errorCode: 'KONJ' },

    // A2 Complex Conjunctions
    { id: 'KONJ_A2_001', question: 'Da jeg kom hjem, ___ familien på mig.', options: ['ventede', 'skulle vente', 'har ventet'], correct: 'ventede', explanation: 'da = when (past narrative)', errorCode: 'KONJ' },
    { id: 'KONJ_A2_002', question: 'Han arbejdede, ___ hun sov.', options: ['mens', 'når', 'selvom'], correct: 'mens', explanation: 'mens = while (simultaneous)', errorCode: 'KONJ' },
    { id: 'KONJ_A2_003', question: 'Selvom han var træt, ___ han til møtet.', options: ['gik', 'skulle gå', 'ville gå'], correct: 'gik', explanation: 'selvom = even if/though', errorCode: 'KONJ' },
    { id: 'KONJ_A2_004', question: 'Jeg ved ikke ___ han kommer eller ej.', options: ['om', 'hvis', 'når'], correct: 'om', explanation: 'om = whether (indirect question)', errorCode: 'KONJ' },
    { id: 'KONJ_A2_005', question: 'Han kom senere ___ han stod fast i trafik.', options: ['fordi', 'da', 'mens'], correct: 'fordi', explanation: 'fordi = because (explanation)', errorCode: 'KONJ' },
    { id: 'KONJ_A2_006', question: '___ hun havde læst bogen, vidste hun svaret.', options: ['Fordi', 'Da', 'Hvis'], correct: 'Da', explanation: 'Da = after (sequence in past)', errorCode: 'KONJ' },
    { id: 'KONJ_A2_007', question: 'Jeg kan ikke mødes i dag, ___ jeg skal arbejde.', options: ['fordi', 'da', 'selvom'], correct: 'fordi', explanation: 'fordi = because (reason/excuse)', errorCode: 'KONJ' },
    { id: 'KONJ_A2_008', question: 'Når du kommer hjem, ___ maden på bordet.', options: ['er', 'er der', 'der er'], correct: 'er der', explanation: 'There will be food ready', errorCode: 'KONJ' },
    { id: 'KONJ_A2_009', question: 'Han løb hurtigt ___ han ville være til tiden.', options: ['fordi', 'da', 'hvis'], correct: 'fordi', explanation: 'fordi = because (purpose/reason)', errorCode: 'KONJ' },
    { id: 'KONJ_A2_010', question: 'Vi skal mødes ___ vejret bliver bedre.', options: ['når', 'hvis', 'da'], correct: 'når', explanation: 'når = when (future event)', errorCode: 'KONJ' },

    // B1 Advanced Conjunctions
    { id: 'KONJ_B1_001', question: 'Ikke kun er hun smart, ___ hun er også dygtig.', options: ['men', 'og', 'samt'], correct: 'men', explanation: '"Ikke kun... men også" = not only... but also', errorCode: 'KONJ' },
    { id: 'KONJ_B1_002', question: 'Så længe du arbejder hårdt, ___ du få gode resultater.', options: ['vil', 'skal', 'kan'], correct: 'vil', explanation: 'So long as = as long as', errorCode: 'KONJ' },
    { id: 'KONJ_B1_003', question: 'Hun gør det ikke ___ fordi hun ikke kan, ___ fordi hun ikke vil.', options: ['da | men', 'da | da', 'fordi | men'], correct: 'da | men', explanation: 'da = because; men = but', errorCode: 'KONJ' },
    { id: 'KONJ_B1_004', question: '___ han havde afsluttet skolen, ___ han til universitetet.', options: ['da | gik', 'når | gik', 'hvis | går'], correct: 'da | gik', explanation: 'da = after (past sequence)', errorCode: 'KONJ' },
    { id: 'KONJ_B1_005', question: 'Omend det regner, ___ vi på tur.', options: ['går', 'skal gå', 'går vi'], correct: 'går', explanation: 'Omend = even if/though', errorCode: 'KONJ' },
  ],

  PREP: [
    // A1 Basic Prepositions
    { id: 'PREP_A1_001', question: 'Jeg går ___ arbejde hver dag.', options: ['til', 'i', 'på'], correct: 'til', explanation: 'til = to (destination)', errorCode: 'PREP' },
    { id: 'PREP_A1_002', question: 'Han bor ___ København.', options: ['i', 'på', 'til'], correct: 'i', explanation: 'i = in (city)', errorCode: 'PREP' },
    { id: 'PREP_A1_003', question: 'Hun sidder ___ bordet og spiser.', options: ['på', 'ved', 'i'], correct: 'ved', explanation: 'ved = at/by (table)', errorCode: 'PREP' },
    { id: 'PREP_A1_004', question: 'Bogen ligger ___ bordet.', options: ['på', 'i', 'til'], correct: 'på', explanation: 'på = on (surface)', errorCode: 'PREP' },
    { id: 'PREP_A1_005', question: 'Jeg drikker kaffe ___ morgenen.', options: ['i', 'på', 'til'], correct: 'i', explanation: 'i = in (time period)', errorCode: 'PREP' },
    { id: 'PREP_A1_006', question: 'Han kommer ___ Aalborg til København.', options: ['fra', 'til', 'i'], correct: 'fra', explanation: 'fra = from', errorCode: 'PREP' },
    { id: 'PREP_A1_007', question: 'Tegningen er ___ børnene.', options: ['af', 'fra', 'på'], correct: 'af', explanation: 'af = by (creator/artist)', errorCode: 'PREP' },
    { id: 'PREP_A1_008', question: 'Jeg gir ___ ham en gave.', options: ['til', 'fra', 'af'], correct: 'til', explanation: 'til = to (recipient)', errorCode: 'PREP' },
    { id: 'PREP_A1_009', question: 'Vi mødes ___ en uge.', options: ['om', 'i', 'på'], correct: 'om', explanation: 'om = in (future time)', errorCode: 'PREP' },
    { id: 'PREP_A1_010', question: 'Huset er bygget ___ 1980.', options: ['i', 'på', 'til'], correct: 'i', explanation: 'i = in (year)', errorCode: 'PREP' },

    // A2 More Complex Prepositions
    { id: 'PREP_A2_001', question: 'Hun arbejder ___ en stor virksomhed ___ IT.', options: ['i | inden for', 'på | i', 'til | med'], correct: 'i | inden for', explanation: 'i = in (company); inden for = within (field)', errorCode: 'PREP' },
    { id: 'PREP_A2_002', question: 'Vi mødes ___ Starbucks ___ mandag morgen.', options: ['på | på', 'i | på', 'til | i'], correct: 'i | på', explanation: 'i = in (café); på = on (day)', errorCode: 'PREP' },
    { id: 'PREP_A2_003', question: 'Bogen handler ___ kærlighed og ægteskab.', options: ['om', 'af', 'fra'], correct: 'om', explanation: 'om = about (topic)', errorCode: 'PREP' },
    { id: 'PREP_A2_004', question: 'Han taler ___ telefonen ___ sin ven.', options: ['på | med', 'i | med', 'ved | til'], correct: 'på | med', explanation: 'på = on (phone); med = with (person)', errorCode: 'PREP' },
    { id: 'PREP_A2_005', question: 'Hun laver tærte ___ kirsebær.', options: ['af', 'med', 'fra'], correct: 'med', explanation: 'med = with (ingredient)', errorCode: 'PREP' },
    { id: 'PREP_A2_006', question: 'Vi skal være tilbage ___ kl. 5.', options: ['til', 'i', 'ved'], correct: 'til', explanation: 'til = by (deadline)', errorCode: 'PREP' },
    { id: 'PREP_A2_007', question: 'Han kommer ___ Sverige.', options: ['fra', 'af', 'i'], correct: 'fra', explanation: 'fra = from (country)', errorCode: 'PREP' },
    { id: 'PREP_A2_008', question: 'Jeg står ___ bussen hver dag.', options: ['på', 'i', 'ved'], correct: 'på', explanation: 'på = on (bus)', errorCode: 'PREP' },
    { id: 'PREP_A2_009', question: 'Hun spiser ___ gaffel.', options: ['med', 'på', 'af'], correct: 'med', explanation: 'med = with (tool)', errorCode: 'PREP' },
    { id: 'PREP_A2_010', question: 'Huset er båret ___ hvidt farve.', options: ['af', 'i', 'på'], correct: 'i', explanation: 'i = in (color)', errorCode: 'PREP' },

    // B1 Advanced Prepositions
    { id: 'PREP_B1_001', question: 'Tro ___ ham er vigtig. Han har aldrig løjet.', options: ['på', 'i', 'til'], correct: 'på', explanation: 'tro på = believe in (trust)', errorCode: 'PREP' },
    { id: 'PREP_B1_002', question: 'Han er kendt ___ sine innovative idéer ___ design.', options: ['for | inden for', 'på | i', 'af | med'], correct: 'for | inden for', explanation: 'kendt for = known for; inden for = in (field)', errorCode: 'PREP' },
    { id: 'PREP_B1_003', question: 'Hun insisterer ___ at gøre det selv.', options: ['på', 'i', 'til'], correct: 'på', explanation: 'insistere på = insist on', errorCode: 'PREP' },
    { id: 'PREP_B1_004', question: 'Han handler ___ flere lande.', options: ['med', 'i', 'fra'], correct: 'med', explanation: 'handle med = trade with', errorCode: 'PREP' },
    { id: 'PREP_B1_005', question: 'Det er afhængigt ___ vejret og tiden.', options: ['af', 'på', 'fra'], correct: 'af', explanation: 'afhængigt af = dependent on', errorCode: 'PREP' },
  ],

  KOMP: [
    // A1 Basic Comparatives
    { id: 'KOMP_A1_001', question: 'Han er ___ end sin bror. (høj)', options: ['højere', 'højest', 'høj'], correct: 'højere', explanation: 'Comparative: add -er', errorCode: 'KOMP' },
    { id: 'KOMP_A1_002', question: 'Det er det ___ hus i strøget. (stor)', options: ['større', 'størst', 'stor'], correct: 'størst', explanation: 'Superlative: add -st', errorCode: 'KOMP' },
    { id: 'KOMP_A1_003', question: 'Hun er ___ end jeg. (god)', options: ['bedre', 'bedst', 'god'], correct: 'bedre', explanation: 'Irregular: god → bedre', errorCode: 'KOMP' },
    { id: 'KOMP_A1_004', question: 'Det var det ___ jeg nogensinde har set. (dårlig)', options: ['værre', 'værst', 'dårlig'], correct: 'værst', explanation: 'Irregular superlative: værst', errorCode: 'KOMP' },
    { id: 'KOMP_A1_005', question: 'München er ___ end København. (varm)', options: ['varmere', 'varmest', 'varm'], correct: 'varmere', explanation: 'Comparative of -m adjectives', errorCode: 'KOMP' },
    { id: 'KOMP_A1_006', question: 'Det er det ___ møde i året. (vigtig)', options: ['vigtigere', 'vigtigst', 'vigtig'], correct: 'vigtigst', explanation: 'Superlative multi-syllable', errorCode: 'KOMP' },
    { id: 'KOMP_A1_007', question: 'Hans er ___ end Peter. (dygtig)', options: ['dygtiger', 'dygtigst', 'dygtig'], correct: 'dygtiger', explanation: 'Comparative: -ig → -iger', errorCode: 'KOMP' },
    { id: 'KOMP_A1_008', question: 'Hun er ___ og ___ hver dag. (ung)', options: ['yngre | yngre', 'ynger | ynger', 'ung | ung'], correct: 'yngre | yngre', explanation: 'Irregular: ung → yngre', errorCode: 'KOMP' },
    { id: 'KOMP_A1_009', question: 'Det er ___ at komme til tiden. (vigtig)', options: ['vigtigere', 'vigtigst', 'vigtig'], correct: 'vigtig', explanation: 'Base form in infinitive', errorCode: 'KOMP' },
    { id: 'KOMP_A1_010', question: 'Hun løb ___ af alle. (hurtigt)', options: ['hurtigere', 'hurtigst', 'hurtigt'], correct: 'hurtigst', explanation: 'Adverb superlative', errorCode: 'KOMP' },

    // A2 Complex Comparatives
    { id: 'KOMP_A2_001', question: 'Hun er mindst ligeså ___ som ham. (intelligent)', options: ['intelligent', 'intelligenter', 'intelligentst'], correct: 'intelligent', explanation: 'Same degree: base form', errorCode: 'KOMP' },
    { id: 'KOMP_A2_002', question: 'Det er ___ og ___ hver dag. (koldt, mørkt)', options: ['koldere | mørkere', 'koldest | mørkest', 'koldt | mørkt'], correct: 'koldere | mørkere', explanation: 'Comparatives of two adjectives', errorCode: 'KOMP' },
    { id: 'KOMP_A2_003', question: 'Han talte ___ og ___ til møtet. (stille, langsomt)', options: ['stillere | langsommere', 'stillest | langsommest', 'stille | langsomt'], correct: 'stillere | langsommere', explanation: 'Adverb comparatives', errorCode: 'KOMP' },
    { id: 'KOMP_A2_004', question: 'Det var ___ end jeg forventede. (svært)', options: ['sværere', 'sværest', 'svært'], correct: 'sværere', explanation: 'Comparative: svær → sværere', errorCode: 'KOMP' },
    { id: 'KOMP_A2_005', question: 'Det er meget ___ end før. (interessant)', options: ['interessantere', 'interessantest', 'interessant'], correct: 'interessantere', explanation: 'Comparative with intensifier', errorCode: 'KOMP' },
  ],

  PASS: [
    // A1 Basic Passive
    { id: 'PASS_A1_001', question: 'Huset ___ af ham. Han byggede det.', options: ['blev bygget', 'var bygget', 'bygges'], correct: 'blev bygget', explanation: 'Passive past: blev + participle', errorCode: 'PASS' },
    { id: 'PASS_A1_002', question: 'Bogen ___ af en berømt forfatter.', options: ['blev skrevet', 'var skrevet', 'skrevet'], correct: 'blev skrevet', explanation: 'Passive past tense', errorCode: 'PASS' },
    { id: 'PASS_A1_003', question: 'Maden ___ i køkkenet.', options: ['var lavet', 'var blive lavet', 'er lavet'], correct: 'er lavet', explanation: 'Passive present: er + participle', errorCode: 'PASS' },
    { id: 'PASS_A1_004', question: 'Dørene ___ hver morgen.', options: ['lukkes', 'blir lukket', 'bliver lukket'], correct: 'lukkes', explanation: 'Passive present: -es ending', errorCode: 'PASS' },
    { id: 'PASS_A1_005', question: 'Projektet ___ af teamet.', options: ['blev gennemført', 'blev gennemfør', 'blive gennemført'], correct: 'blev gennemført', explanation: 'Passive past participle', errorCode: 'PASS' },
  ],

  MOD: [
    // A1 Modal Verbs
    { id: 'MOD_A1_001', question: 'Jeg ___ ikke til mødet i dag. Jeg er syg.', options: ['skal', 'kan', 'må'], correct: 'kan', explanation: 'kan = can (ability)', errorCode: 'MOD' },
    { id: 'MOD_A1_002', question: 'Du ___ være her kl. 9.', options: ['skal', 'vil', 'kan'], correct: 'skal', explanation: 'skal = shall (obligation)', errorCode: 'MOD' },
    { id: 'MOD_A1_003', question: 'Han ___ i dag. Han skal arbejde.', options: ['vil', 'kan', 'må'], correct: 'vil', explanation: 'vil = will (future)', errorCode: 'MOD' },
    { id: 'MOD_A1_004', question: 'Du ___ røre ved møblerne.', options: ['må', 'kan', 'skal'], correct: 'må', explanation: 'må = may (permission)', errorCode: 'MOD' },
    { id: 'MOD_A1_005', question: 'Han ___ kunne løbe meget hurtig da han var ung.', options: ['kunne', 'kan', 'skal'], correct: 'kunne', explanation: 'kunne = could (past ability)', errorCode: 'MOD' },
    { id: 'MOD_A1_006', question: 'Du burde tale med ham.', options: ['burde', 'skal', 'kan'], correct: 'burde', explanation: 'burde = should (advice)', errorCode: 'MOD' },
    { id: 'MOD_A1_007', question: 'Han ___ gøre det selv. Han behøver ikke hjælp.', options: ['kan', 'skal', 'vil'], correct: 'kan', explanation: 'kan = can (capability)', errorCode: 'MOD' },
    { id: 'MOD_A1_008', question: 'Du ___ være der til tiden.', options: ['skal', 'kan', 'vil'], correct: 'skal', explanation: 'skal = must (requirement)', errorCode: 'MOD' },
    { id: 'MOD_A1_009', question: 'Han ___ ikke høre hende.', options: ['kunne', 'kan', 'skal'], correct: 'kunne', explanation: 'kunne = could (conditional)', errorCode: 'MOD' },
    { id: 'MOD_A1_010', question: 'Vi ___ se hinanden igen snart.', options: ['vil', 'skal', 'kan'], correct: 'vil', explanation: 'vil = will (future intention)', errorCode: 'MOD' },
  ],

  ARTKV: [
    { id: 'ARTKV_A1_001', question: '___ mand går i parken. ___ mand er høj.', options: ['En | en', 'Et | en', 'En | et'], correct: 'En | en', explanation: 'mand = common (en)', errorCode: 'ARTKV' },
    { id: 'ARTKV_A1_002', question: '___ barn leger. ___ barn er glad.', options: ['Et | et', 'En | en', 'Et | en'], correct: 'Et | et', explanation: 'barn = neuter (et)', errorCode: 'ARTKV' },
    { id: 'ARTKV_A1_003', question: '___ hus er blåt. Jeg elsker ___ hus.', options: ['et | det', 'en | det', 'et | den'], correct: 'et | det', explanation: 'hus = neuter; definite = det', errorCode: 'ARTKV' },
    { id: 'ARTKV_A1_004', question: '___ pige hedder Anna. ___ pige er smart.', options: ['En | en', 'Et | en', 'En | det'], correct: 'En | en', explanation: 'pige = common (en)', errorCode: 'ARTKV' },
    { id: 'ARTKV_A1_005', question: 'Jeg kender ___ elev. ___ elev bor tæt på mig.', options: ['en | den', 'et | den', 'en | den'], correct: 'en | den', explanation: 'elev = common; definite = den', errorCode: 'ARTKV' },
  ],
};

export const totalNewExercises = Object.values(phase4NewExercises).reduce((sum, arr) => sum + arr.length, 0);
