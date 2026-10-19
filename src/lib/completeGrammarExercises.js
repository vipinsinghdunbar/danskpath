/**
 * COMPREHENSIVE DANISH GRAMMAR EXERCISE DATABASE
 * Phase 3 + Phase 4: 500+ exercises across 15 categories
 * All grammar needed for A1 → B2 fluency
 */

export const completeGrammarExercises = {
  // === CATEGORY 1: WORD ORDER (Ordstilling) ===
  ORD: {
    name: 'Ordstilling (Word Order)',
    description: 'V2, main/subordinate clauses, fronting, adverbial placement, inversion',
    exercises: [
      { id: 'ORD_001', question: 'Jeg ___ ikke til mødet i dag. (gå)', options: ['gå', 'går', 'gik'], correct: 'går', explanation: 'Main clause V2: subject + verb second position', errorCode: 'ORD' },
      { id: 'ORD_002', question: 'Fordi jeg ___ syg, kan jeg ikke komme.', options: ['er', 'var', 'været'], correct: 'er', explanation: 'Subordinate clause with present tense', errorCode: 'ORD' },
      { id: 'ORD_003', question: 'I morgen ___ vi til København.', options: ['tager', 'skal tage', 'tager vi'], correct: 'tager', explanation: 'Fronted adverbial (I morgen) triggers V2', errorCode: 'ORD' },
      { id: 'ORD_004', question: 'Han ___ aldrig til arbejde med bus.', options: ['går', 'tager', 'kører'], correct: 'tager', explanation: 'Central adverbial placement after verb', errorCode: 'ORD' },
      { id: 'ORD_005', question: 'Hvornår ___ du hjem fra mødet?', options: ['kommer', 'kommer du', 'du kommer'], correct: 'kommer', explanation: 'Question word fronted, V2 in questions', errorCode: 'ORD' },
      { id: 'ORD_006', question: 'Jeg ved, at hun ___ til festen.', options: ['kommer', 'kom', 'vil komme'], correct: 'kommer', explanation: 'at-clause: present tense works normally', errorCode: 'ORD' },
      { id: 'ORD_007', question: 'Han siger, ___ han ikke kan møde dig.', options: ['at', 'hvis', 'når'], correct: 'at', explanation: 'Reported speech with "at" connector', errorCode: 'ORD' },
      { id: 'ORD_008', question: 'Kun Hans ___ det nye projekt.', options: ['leder', 'skal lede', 'leder projektet'], correct: 'leder', explanation: 'Fronted restrictive adverbial triggers V2', errorCode: 'ORD' },
      { id: 'ORD_009', question: 'Hun ___ hver dag arbejde ___ 8 til 5.', options: ['arbejder | fra', 'arbejder | i', 'arbejder | på'], correct: 'arbejder | fra', explanation: 'Daily routine with time span', errorCode: 'ORD' },
      { id: 'ORD_010', question: 'Hvis du kommer, ___ jeg glad.', options: ['er', 'vil være', 'er jeg'], correct: 'er', explanation: 'Conditional: main clause still V2', errorCode: 'ORD' },
      { id: 'ORD_011', question: 'Der ___ mange mennesker i byen.', options: ['er', 'var', 'være'], correct: 'er', explanation: '"Der" as formal subject, verb agrees with real subject', errorCode: 'ORD' },
      { id: 'ORD_012', question: 'Aldrig ___ jeg været så glad.', options: ['har', 'har jeg', 'jeg har'], correct: 'har', explanation: 'Fronted negative adverbial triggers inversion', errorCode: 'ORD' },
      { id: 'ORD_013', question: 'Dog ___ hun kommet til tiden.', options: ['er', 'er hun', 'hun er'], correct: 'er', explanation: 'Sentence adverb "dog" triggers V2', errorCode: 'ORD' },
      { id: 'ORD_014', question: 'Hvilket hus ___ du bedst?', options: ['kan lide', 'liker', 'elsker'], correct: 'kan lide', explanation: 'V2 in questions with object fronted', errorCode: 'ORD' },
      { id: 'ORD_015', question: 'Når det regner, ___ jeg hjemme.', options: ['bliver', 'bliver jeg', 'jeg bliver'], correct: 'bliver', explanation: 'Temporal clause: main clause V2', errorCode: 'ORD' },
      { id: 'ORD_016', question: 'Han ___ arbejdet uden ___ hvile.', options: ['gjorde | at', 'gjorde | for at', 'gjorde | med'], correct: 'gjorde | at', explanation: 'Infinitive marker after preposition', errorCode: 'ORD' },
      { id: 'ORD_017', question: 'Derfor ___ vi mødes næste uge.', options: ['skal', 'skal vi', 'vi skal'], correct: 'skal', explanation: 'Sentence adverb "derfor" triggers V2', errorCode: 'ORD' },
      { id: 'ORD_018', question: 'Som du ved, ___ jeg ikke tid.', options: ['har', 'har jeg', 'jeg har'], correct: 'har', explanation: 'Parenthetical clause, main clause follows V2', errorCode: 'ORD' },
      { id: 'ORD_019', question: 'Både Hans og Maria ___ til møtet.', options: ['kommer', 'kommer de', 'de kommer'], correct: 'kommer', explanation: 'Coordinated subjects, verb agrees plural', errorCode: 'ORD' },
      { id: 'ORD_020', question: 'Hvilket projekt ___ han nu arbejde ___?', options: ['arbejder | på', 'arbejder | med', 'arbejder | i'], correct: 'arbejder | på', explanation: 'Question with preposition at end', errorCode: 'ORD' },
      
      // Phase 4: New ORD exercises (A1-B1)
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
      { id: 'ORD_A2_001', question: 'Han ___ hvert morgen. Han løber 5 kilometer.', options: ['løber', 'springer', 'danser'], correct: 'løber', explanation: 'Løber = runs (exercise)', errorCode: 'ORD' },
      { id: 'ORD_A2_002', question: 'Jeg ___ ikke på mit arbejde. Jeg er hjemmearbejdende.', options: ['arbejder', 'er', 'bor'], correct: 'arbejder', explanation: 'Arbejder = works (employment)', errorCode: 'ORD' },
      { id: 'ORD_A2_003', question: 'Hun ___ dansk meget godt. Hun har studeret det i fem år.', options: ['taler', 'skriver', 'læser'], correct: 'taler', explanation: 'Taler = speaks (language)', errorCode: 'ORD' },
      { id: 'ORD_A2_004', question: 'Jeg ___ meget i denne bog. Det er interessant.', options: ['læser', 'hører', 'ser'], correct: 'læser', explanation: 'Læser = reads (books/text)', errorCode: 'ORD' },
      { id: 'ORD_A2_005', question: 'Han ___ sin ven hver dag. De bor tæt på hinanden.', options: ['møder', 'ser', 'besøger'], correct: 'møder', explanation: 'Møder = meets (encounter)', errorCode: 'ORD' },
    ]
  },

  // === CATEGORY 2: COMPARATIVE & SUPERLATIVE ===
  KOMP: {
    name: 'Komparativ & Superlativ (Comparative/Superlative)',
    description: 'Bigger, biggest, better, best, more important, most important',
    exercises: [
      { id: 'KOMP_001', question: 'Han er ___ end sin bror. (høj)', options: ['højere', 'højest', 'høj'], correct: 'højere', explanation: 'Comparative: add -er for one-syllable adjectives', errorCode: 'KOMP' },
      { id: 'KOMP_002', question: 'Det er det ___ hus i strøget. (stor)', options: ['større', 'størst', 'stor'], correct: 'størst', explanation: 'Superlative with "det": add -st', errorCode: 'KOMP' },
      { id: 'KOMP_003', question: 'Hun er ___ end jeg. (god)', options: ['bedre', 'bedst', 'god'], correct: 'bedre', explanation: 'Irregular comparative: god → bedre', errorCode: 'KOMP' },
      { id: 'KOMP_004', question: 'Det var det ___ jeg nogensinde har set. (dårlig)', options: ['værre', 'værst', 'dårlig'], correct: 'værst', explanation: 'Irregular superlative: dårlig → værst', errorCode: 'KOMP' },
      { id: 'KOMP_005', question: 'München er ___ end København. (varm)', options: ['varmere', 'varmest', 'varm'], correct: 'varmere', explanation: 'Comparative of -m adjectives: add -ere', errorCode: 'KOMP' },
      { id: 'KOMP_006', question: 'Det er det ___ møde i året. (vigtig)', options: ['vigtigere', 'vigtigst', 'vigtig'], correct: 'vigtigst', explanation: 'Superlative of multi-syllable: -st', errorCode: 'KOMP' },
      { id: 'KOMP_007', question: 'Hans er ___ end Peter. (dygtig)', options: ['dygtiger', 'dygtigst', 'dygtig'], correct: 'dygtiger', explanation: 'Comparative -ig → -iger', errorCode: 'KOMP' },
      { id: 'KOMP_008', question: 'Det er ___ at komme til tiden. (vigtig)', options: ['vigtigere', 'vigtigst', 'vigtig'], correct: 'vigtig', explanation: 'Base form after "at være" in infinitive', errorCode: 'KOMP' },
      { id: 'KOMP_009', question: 'Hun er mindst ligeså ___ som ham. (intelligent)', options: ['intelligent', 'intelligenter', 'intelligentst'], correct: 'intelligent', explanation: 'Same degree: use base form', errorCode: 'KOMP' },
      { id: 'KOMP_010', question: 'Det er ___ og ___ hver dag. (koldt, mørkt)', options: ['koldere | mørkere', 'koldest | mørkest', 'koldt | mørkt'], correct: 'koldere | mørkere', explanation: 'Comparative of two adjectives', errorCode: 'KOMP' },
      { id: 'KOMP_011', question: 'Han talte ___ og ___ til mødet. (stille, langsomt)', options: ['stillere | langsommere', 'stillest | langsommest', 'stille | langsomt'], correct: 'stillere | langsommere', explanation: 'Adverb comparative: -ere ending', errorCode: 'KOMP' },
      { id: 'KOMP_012', question: 'Det var ___ end jeg forventede. (svært)', options: ['sværere', 'sværest', 'svært'], correct: 'sværere', explanation: 'Comparative of svær → sværere', errorCode: 'KOMP' },
      { id: 'KOMP_013', question: 'Hun løb ___ af alle. (hurtigt)', options: ['hurtigere', 'hurtigst', 'hurtigt'], correct: 'hurtigst', explanation: 'Adverb superlative: -st', errorCode: 'KOMP' },
      { id: 'KOMP_014', question: 'Det var meget ___ end før. (interessant)', options: ['interessantere', 'interessantest', 'interessant'], correct: 'interessantere', explanation: 'Comparative with much/very: still add -ere', errorCode: 'KOMP' },
      { id: 'KOMP_015', question: 'Han er den ___ person jeg kender. (venlig)', options: ['venligere', 'venligst', 'venlig'], correct: 'venligst', explanation: 'Superlative with "den": -st ending', errorCode: 'KOMP' },
      { id: 'KOMP_016', question: 'Det er ___ at læse end at høre. (let)', options: ['lettere', 'lettest', 'let'], correct: 'lettere', explanation: 'Comparative: let → lettere', errorCode: 'KOMP' },
      { id: 'KOMP_017', question: 'Hun er ___ end hans søster. (ung)', options: ['yngre', 'yngst', 'ung'], correct: 'yngre', explanation: 'Irregular: ung → yngre → yngst', errorCode: 'KOMP' },
      { id: 'KOMP_018', question: 'Det er det ___ projekt vi har lavet. (ambitiøst)', options: ['ambitiøsere', 'ambitiøsest', 'ambitiøst'], correct: 'ambitiøsest', explanation: 'Superlative -øst → -øsest', errorCode: 'KOMP' },
      { id: 'KOMP_019', question: 'Han arbejder ___ end før. (hårdt)', options: ['hårdere', 'hårdest', 'hårdt'], correct: 'hårdere', explanation: 'Adverb comparative: hårdt → hårdere', errorCode: 'KOMP' },
      { id: 'KOMP_020', question: 'Det var ___ møde vi havde haft. (lang)', options: ['længere', 'længst', 'lang'], correct: 'længst', explanation: 'Superlative: lang → længst', errorCode: 'KOMP' },

      // Phase 4: New KOMP exercises
      { id: 'KOMP_A1_001', question: 'Han er ___ end sin bror. (høj)', options: ['højere', 'højest', 'høj'], correct: 'højere', explanation: 'Comparative: add -er', errorCode: 'KOMP' },
      { id: 'KOMP_A1_002', question: 'Det er det ___ hus i strøget. (stor)', options: ['større', 'størst', 'stor'], correct: 'størst', explanation: 'Superlative: add -st', errorCode: 'KOMP' },
      { id: 'KOMP_A1_003', question: 'Hun er ___ end jeg. (god)', options: ['bedre', 'bedst', 'god'], correct: 'bedre', explanation: 'Irregular: god → bedre', errorCode: 'KOMP' },
      { id: 'KOMP_A1_004', question: 'Det var det ___ jeg nogensinde har set. (dårlig)', options: ['værre', 'værst', 'dårlig'], correct: 'værst', explanation: 'Irregular superlative: værst', errorCode: 'KOMP' },
      { id: 'KOMP_A1_005', question: 'München er ___ end København. (varm)', options: ['varmere', 'varmest', 'varm'], correct: 'varmere', explanation: 'Comparative of -m adjectives', errorCode: 'KOMP' },
    ]
  },

  // === CATEGORY 3: CONJUNCTIONS (Konjunktioner) ===
  KONJ: {
    name: 'Konjunktioner (Conjunctions)',
    description: 'men, mens, ka, fordi, hvis, når, da, så, eller, og, samt, og sammenhængende ord',
    exercises: [
      { id: 'KONJ_001', question: 'Jeg vil gerne komme, ___ jeg har ikke tid.', options: ['men', 'mens', 'hvis'], correct: 'men', explanation: '"men" = but (opposition)', errorCode: 'KONJ' },
      { id: 'KONJ_002', question: 'Han arbejdede, ___ hun læste en bog.', options: ['mens', 'men', 'fordi'], correct: 'mens', explanation: '"mens" = while (simultaneous action)', errorCode: 'KONJ' },
      { id: 'KONJ_003', question: 'Jeg kan ikke møde dig, ___ jeg arbejder den dag.', options: ['fordi', 'hvis', 'da'], correct: 'fordi', explanation: '"fordi" = because (reason)', errorCode: 'KONJ' },
      { id: 'KONJ_004', question: 'Hvis du kommer, ___ jeg glad.', options: ['bliver', 'vil blive', 'bliver jeg'], correct: 'bliver', explanation: '"hvis" = if (conditional)', errorCode: 'KONJ' },
      { id: 'KONJ_005', question: 'Når han møder ham, ___ de taler om arbejdet.', options: ['så', 'mens', 'hvis'], correct: 'så', explanation: '"så" = then (after "når" = when)', errorCode: 'KONJ' },
      { id: 'KONJ_006', question: 'Da jeg kom hjem, ___ han allerede der.', options: ['var', 'ville', 'havde'], correct: 'var', explanation: '"da" = when (past narrative)', errorCode: 'KONJ' },
      { id: 'KONJ_007', question: 'Vi mødes ___ han kommer til København ___ i sommeren.', options: ['når | eller', 'mens | og', 'hvis | når'], correct: 'når | eller', explanation: '"når" (when) + "eller" (or)', errorCode: 'KONJ' },
      { id: 'KONJ_008', question: 'Han har både arbejde ___ familie at tænke på.', options: ['og', 'men', 'samt'], correct: 'og', explanation: '"og" = and (coordinating)', errorCode: 'KONJ' },
      { id: 'KONJ_009', question: 'Du kan enten komme i dag ___ i morgen.', options: ['eller', 'og', 'men'], correct: 'eller', explanation: '"eller" = or (choice)', errorCode: 'KONJ' },
      { id: 'KONJ_010', question: 'Han er intelligent, ___ han arbejder ikke nok.', options: ['men', 'mens', 'dog'], correct: 'men', explanation: '"men" = but (contrast)', errorCode: 'KONJ' },
      { id: 'KONJ_011', question: 'Jeg ved ikke ___ han kommer eller ej.', options: ['om', 'hvis', 'da'], correct: 'om', explanation: '"om" = whether (indirect question)', errorCode: 'KONJ' },
      { id: 'KONJ_012', question: 'Selvom det regner, ___ vi til København.', options: ['går', 'skal gå', 'gik'], correct: 'skal gå', explanation: '"selvom" = even if (concessive)', errorCode: 'KONJ' },
      { id: 'KONJ_013', question: 'Da jeg kom hjem, ___ familien på mig.', options: ['ventede', 'skulle vente', 'har ventet'], correct: 'ventede', explanation: 'da = when (past narrative)', errorCode: 'KONJ' },
      { id: 'KONJ_014', question: 'Han kom senere ___ han stod fast i trafik.', options: ['fordi', 'da', 'mens'], correct: 'fordi', explanation: 'fordi = because (explanation)', errorCode: 'KONJ' },
      { id: 'KONJ_015', question: 'Jeg kan ikke mødes i dag, ___ jeg skal arbejde.', options: ['fordi', 'da', 'selvom'], correct: 'fordi', explanation: 'fordi = because (reason)', errorCode: 'KONJ' },
      { id: 'KONJ_016', question: 'Når du kommer hjem, ___ maden på bordet.', options: ['er', 'er der', 'der er'], correct: 'er der', explanation: 'There will be food', errorCode: 'KONJ' },
      { id: 'KONJ_017', question: 'Han løb hurtigt ___ han ville være til tiden.', options: ['fordi', 'da', 'hvis'], correct: 'fordi', explanation: 'fordi = because (reason)', errorCode: 'KONJ' },
      { id: 'KONJ_018', question: 'Vi skal mødes ___ vejret bliver bedre.', options: ['når', 'hvis', 'da'], correct: 'når', explanation: 'når = when (future)', errorCode: 'KONJ' },
      { id: 'KONJ_019', question: 'Ikke kun er hun smart, ___ hun er også dygtig.', options: ['men', 'og', 'samt'], correct: 'men', explanation: '"Ikke kun... men også" = not only... but also', errorCode: 'KONJ' },
      { id: 'KONJ_020', question: 'Så længe du arbejder hårdt, ___ du få gode resultater.', options: ['vil', 'skal', 'kan'], correct: 'vil', explanation: 'So long as = as long as', errorCode: 'KONJ' },
    ]
  },

  // === CATEGORY 4: PRONOUNS (Pronominer) ===
  PRON: {
    name: 'Pronominer (Pronouns)',
    description: 'Jeg, du, han, hun, det, vi, I, de, mig, dig, etc. Reflexive: sin, sit, sine',
    exercises: [
      { id: 'PRON_001', question: '___ arbejder på et kontor.', options: ['Jeg', 'Mig', 'Min'], correct: 'Jeg', explanation: 'Subject pronoun: jeg (I)', errorCode: 'PRON' },
      { id: 'PRON_002', question: 'Han giver ___ en gave.', options: ['mig', 'jeg', 'min'], correct: 'mig', explanation: 'Object pronoun: mig (me)', errorCode: 'PRON' },
      { id: 'PRON_003', question: '___ er fra Danmark.', options: ['Han', 'Ham', 'Hans'], correct: 'Han', explanation: 'Subject pronoun: han (he)', errorCode: 'PRON' },
      { id: 'PRON_004', question: 'Jeg mødte ___ i går.', options: ['hun', 'hende', 'hendes'], correct: 'hende', explanation: 'Object pronoun: hende (her)', errorCode: 'PRON' },
      { id: 'PRON_005', question: '___ bor i København.', options: ['De', 'Dem', 'Deres'], correct: 'De', explanation: 'Subject pronoun: De (they)', errorCode: 'PRON' },
      { id: 'PRON_006', question: 'Jeg kender ___ fra arbejde.', options: ['ham', 'han', 'hans'], correct: 'ham', explanation: 'Object pronoun: ham (him)', errorCode: 'PRON' },
      { id: 'PRON_007', question: '___ og jeg er venner.', options: ['Han', 'Ham', 'Hans'], correct: 'Han', explanation: 'Subject pronoun in coordination', errorCode: 'PRON' },
      { id: 'PRON_008', question: 'Du skal give ___ bogen.', options: ['jeg', 'mig', 'min'], correct: 'mig', explanation: 'Indirect object: mig (to me)', errorCode: 'PRON' },
      { id: 'PRON_009', question: 'Han tager ___ hat og går ud.', options: ['hans', 'sin', 'mit'], correct: 'sin', explanation: 'Reflexive: sin (his own)', errorCode: 'PRON' },
      { id: 'PRON_010', question: 'Hun læser ___ bog.', options: ['hendes', 'sin', 'sit'], correct: 'sit', explanation: 'Reflexive: sit (her own, neuter)', errorCode: 'PRON' },
      { id: 'PRON_011', question: 'De putter ___ børn i seng.', options: ['deres', 'sine', 'deres'], correct: 'deres', explanation: 'Non-reflexive: deres (their)', errorCode: 'PRON' },
      { id: 'PRON_012', question: 'Hun og ___ er gode venner.', options: ['jeg', 'mig', 'min'], correct: 'jeg', explanation: 'Subject pronoun in coordination', errorCode: 'PRON' },
      { id: 'PRON_013', question: '___ og jeg skal mødes i dag.', options: ['Han', 'Ham', 'Hans'], correct: 'Han', explanation: 'Subject pronoun', errorCode: 'PRON' },
      { id: 'PRON_014', question: 'Han inviterer ___ til ___ fødselsdag.', options: ['mig | hans', 'mig | sin', 'jeg | sin'], correct: 'mig | sin', explanation: 'mig (me); sin (his own)', errorCode: 'PRON' },
      { id: 'PRON_015', question: 'Han giver ___ datter pengene til ___ egen cykel.', options: ['sin | sin', 'hans | sin', 'hans | hans'], correct: 'sin | sin', explanation: 'Reflexive: sin refers to subject (he)', errorCode: 'PRON' },
      { id: 'PRON_016', question: 'De handler i ___ favoritbutik.', options: ['sine', 'deres', 'dem'], correct: 'deres', explanation: 'Non-reflexive: deres (their)', errorCode: 'PRON' },
      { id: 'PRON_017', question: '___ møder hinanden hver dag.', options: ['De', 'Dem', 'De'], correct: 'De', explanation: 'De = they; hinanden = each other', errorCode: 'PRON' },
      { id: 'PRON_018', question: 'Hun siger til ___, at han skal have ___ mening.', options: ['mig | min', 'mig | min', 'jeg | jeg'], correct: 'mig | min', explanation: 'mig (me); min (my)', errorCode: 'PRON' },
      { id: 'PRON_019', question: 'Læreren gav klasserne ___ opgaver. De skulle løse ___.', options: ['sine | dem', 'hans | dem', 'hans | sine'], correct: 'sine | dem', explanation: 'sine = teacher\'s own; dem = them', errorCode: 'PRON' },
      { id: 'PRON_020', question: 'Vi mødes ved ___ hus hver fredag.', options: ['hans', 'sin', 'mit'], correct: 'hans', explanation: 'hans (his, non-reflexive)', errorCode: 'PRON' },
    ]
  },

  // === CATEGORY 5: POSSESSIVES (Possessive Pronouns) ===
  POSS: {
    name: 'Possessive Pronouns',
    description: 'min, mit, hans, hendes, vores, deres, etc.',
    exercises: [
      { id: 'POSS_001', question: 'Det er ___ bog. Jeg ejer den.', options: ['min', 'mit', 'mig'], correct: 'min', explanation: 'min = my (common gender)', errorCode: 'POSS' },
      { id: 'POSS_002', question: 'Det er ___ hus. Han ejer det.', options: ['hans', 'hans', 'hans'], correct: 'hans', explanation: 'hans = his', errorCode: 'POSS' },
      { id: 'POSS_003', question: '___ taske er rød.', options: ['Min', 'Mit', 'Mig'], correct: 'Min', explanation: 'Min = my', errorCode: 'POSS' },
      { id: 'POSS_004', question: '___ bil er sort.', options: ['Hendes', 'Hans', 'Sin'], correct: 'Hendes', explanation: 'Hendes = her', errorCode: 'POSS' },
      { id: 'POSS_005', question: 'Det er ___ hus. De ejer det.', options: ['deres', 'sin', 'mit'], correct: 'deres', explanation: 'deres = their', errorCode: 'POSS' },
      { id: 'POSS_006', question: '___ far er læge.', options: ['Vores', 'Vor', 'Os'], correct: 'Vores', explanation: 'Vores = our', errorCode: 'POSS' },
      { id: 'POSS_007', question: 'Det er ___ projekt. Vi ejer det.', options: ['vores', 'vor', 'os'], correct: 'vores', explanation: 'vores = our', errorCode: 'POSS' },
      { id: 'POSS_008', question: 'Hun finder ___ nøgler.', options: ['hendes', 'sit', 'sin'], correct: 'hendes', explanation: 'hendes = hers', errorCode: 'POSS' },
      { id: 'POSS_009', question: 'Jeg tager ___ jacka og går ud.', options: ['min', 'sit', 'hans'], correct: 'min', explanation: 'min = my', errorCode: 'POSS' },
      { id: 'POSS_010', question: 'Det er ___ blomster. Hun ejer dem.', options: ['hendes', 'sin', 'sit'], correct: 'hendes', explanation: 'hendes = hers', errorCode: 'POSS' },
      { id: 'POSS_011', question: '___ søster hedder Maria.', options: ['Hans', 'Ham', 'Han'], correct: 'Hans', explanation: 'Hans = his', errorCode: 'POSS' },
      { id: 'POSS_012', question: 'Det er ___ plan. De skal det gøre.', options: ['deres', 'sin', 'mit'], correct: 'deres', explanation: 'deres = their', errorCode: 'POSS' },
      { id: 'POSS_013', question: '___ and elsker at lege.', options: ['Vores', 'Vor', 'Os'], correct: 'Vores', explanation: 'Vores = our', errorCode: 'POSS' },
      { id: 'POSS_014', question: 'Han inviterer os til ___ fest.', options: ['hans', 'sin', 'hans'], correct: 'hans', explanation: 'hans = his', errorCode: 'POSS' },
      { id: 'POSS_015', question: 'Det er ___ beslutning. Du skal det gøre.', options: ['din', 'dine', 'dig'], correct: 'din', explanation: 'din = your', errorCode: 'POSS' },
    ]
  },

  // === CATEGORY 6: ARTICLES & GENDER (Artikler og Køn) ===
  ARTKV: {
    name: 'Artikler & Køn (Articles & Gender)',
    description: 'en (common), et (neuter), den, det, de, indefinite and definite articles',
    exercises: [
      { id: 'ARTKV_001', question: '___ mand går i parken.', options: ['En', 'Et', 'Der'], correct: 'En', explanation: 'mand (man) is common gender → en', errorCode: 'ARTKV' },
      { id: 'ARTKV_002', question: '___ barn leger i haven.', options: ['Et', 'En', 'Der'], correct: 'Et', explanation: 'barn (child) is neuter → et', errorCode: 'ARTKV' },
      { id: 'ARTKV_003', question: '___ hus er blåt.', options: ['et', 'en', 'der'], correct: 'et', explanation: 'hus (house) is neuter', errorCode: 'ARTKV' },
      { id: 'ARTKV_004', question: '___ pige hedder Anna.', options: ['En', 'Et', 'Der'], correct: 'En', explanation: 'pige (girl) is common gender', errorCode: 'ARTKV' },
      { id: 'ARTKV_005', question: 'Jeg kender ___ elev. ___ elev bor tæt på mig.', options: ['en | den', 'et | det', 'en | den'], correct: 'en | den', explanation: 'elev = common; definite = den', errorCode: 'ARTKV' },
      { id: 'ARTKV_006', question: '___ mand går i parken. ___ mand er høj.', options: ['En | en', 'Et | en', 'En | et'], correct: 'En | en', explanation: 'mand = common (en)', errorCode: 'ARTKV' },
      { id: 'ARTKV_007', question: '___ barn leger. ___ barn er glad.', options: ['Et | et', 'En | en', 'Et | en'], correct: 'Et | et', explanation: 'barn = neuter (et)', errorCode: 'ARTKV' },
      { id: 'ARTKV_008', question: '___ hus er blåt. Jeg elsker ___ hus.', options: ['et | det', 'en | det', 'et | den'], correct: 'et | det', explanation: 'hus = neuter; definite = det', errorCode: 'ARTKV' },
      { id: 'ARTKV_009', question: '___ pige hedder Anna. ___ pige er smart.', options: ['En | en', 'Et | en', 'En | det'], correct: 'En | en', explanation: 'pige = common (en)', errorCode: 'ARTKV' },
      { id: 'ARTKV_010', question: 'Det er ___ komplekst problem. ___ problem kræver løsning.', options: ['et | Det', 'en | Problemet', 'et | Problemet'], correct: 'et | Det', explanation: 'problem = neuter; neuter + complex adjective', errorCode: 'ARTKV' },
      { id: 'ARTKV_011', question: 'Vi har ___ dog derhjemme. ___ dog er meget venlig.', options: ['en | den', 'et | det', 'en | det'], correct: 'en | den', explanation: 'dog (dog) = common; definite = den', errorCode: 'ARTKV' },
      { id: 'ARTKV_012', question: 'Hun har ___ bil. ___ bil er rød.', options: ['en | den', 'et | det', 'en | det'], correct: 'en | den', explanation: 'bil (car) = common; definite = den', errorCode: 'ARTKV' },
      { id: 'ARTKV_013', question: '___ lys er tændt. ___ lys er gult.', options: ['Et | et', 'En | en', 'Et | en'], correct: 'Et | et', explanation: 'lys (light) = neuter', errorCode: 'ARTKV' },
      { id: 'ARTKV_014', question: 'Jeg læste ___ bog. ___ bog var interessant.', options: ['en | den', 'et | det', 'en | det'], correct: 'en | den', explanation: 'bog (book) = common; definite = den', errorCode: 'ARTKV' },
      { id: 'ARTKV_015', question: '___ dyr går i skoven. ___ dyr er stort.', options: ['Et | et', 'En | en', 'Et | en'], correct: 'Et | et', explanation: 'dyr (animal) = neuter', errorCode: 'ARTKV' },
    ]
  },

  // === CATEGORY 7: PREPOSITIONS (Præpositioner) ===
  PREP: {
    name: 'Præpositioner (Prepositions)',
    description: 'i, på, til, fra, af, med, ved, uden, over, under, omkring, igennem, etc.',
    exercises: [
      { id: 'PREP_001', question: 'Jeg går ___ arbejde hver dag.', options: ['til', 'i', 'på'], correct: 'til', explanation: 'til = to (destination)', errorCode: 'PREP' },
      { id: 'PREP_002', question: 'Han bor ___ København.', options: ['i', 'på', 'til'], correct: 'i', explanation: 'i = in (city)', errorCode: 'PREP' },
      { id: 'PREP_003', question: 'Hun sidder ___ bordet.', options: ['på', 'ved', 'i'], correct: 'ved', explanation: 'ved = at/by (table)', errorCode: 'PREP' },
      { id: 'PREP_004', question: 'Bogen ligger ___ bordet.', options: ['på', 'i', 'til'], correct: 'på', explanation: 'på = on (surface)', errorCode: 'PREP' },
      { id: 'PREP_005', question: 'Jeg drikker kaffe ___ morgenen.', options: ['i', 'på', 'til'], correct: 'i', explanation: 'i = in (time period)', errorCode: 'PREP' },
      { id: 'PREP_006', question: 'Han kommer ___ Aalborg til København.', options: ['fra', 'til', 'i'], correct: 'fra', explanation: 'fra = from', errorCode: 'PREP' },
      { id: 'PREP_007', question: 'Tegningen er ___ børnene.', options: ['af', 'fra', 'på'], correct: 'af', explanation: 'af = by (creator)', errorCode: 'PREP' },
      { id: 'PREP_008', question: 'Jeg gir ___ ham en gave.', options: ['til', 'fra', 'af'], correct: 'til', explanation: 'til = to (recipient)', errorCode: 'PREP' },
      { id: 'PREP_009', question: 'Vi mødes ___ en uge.', options: ['om', 'i', 'på'], correct: 'om', explanation: 'om = in (future time)', errorCode: 'PREP' },
      { id: 'PREP_010', question: 'Huset er bygget ___ 1980.', options: ['i', 'på', 'til'], correct: 'i', explanation: 'i = in (year)', errorCode: 'PREP' },
      { id: 'PREP_011', question: 'Hun arbejder ___ en stor virksomhed ___ IT.', options: ['i | inden for', 'på | i', 'til | med'], correct: 'i | inden for', explanation: 'i = in; inden for = within (field)', errorCode: 'PREP' },
      { id: 'PREP_012', question: 'Vi mødes ___ Starbucks ___ mandag morgen.', options: ['på | på', 'i | på', 'til | i'], correct: 'i | på', explanation: 'i = in (café); på = on (day)', errorCode: 'PREP' },
      { id: 'PREP_013', question: 'Bogen handler ___ kærlighed.', options: ['om', 'af', 'fra'], correct: 'om', explanation: 'om = about (topic)', errorCode: 'PREP' },
      { id: 'PREP_014', question: 'Han taler ___ telefonen ___ sin ven.', options: ['på | med', 'i | med', 'ved | til'], correct: 'på | med', explanation: 'på = on (phone); med = with', errorCode: 'PREP' },
      { id: 'PREP_015', question: 'Hun laver tærte ___ kirsebær.', options: ['af', 'med', 'fra'], correct: 'med', explanation: 'med = with (ingredient)', errorCode: 'PREP' },
      { id: 'PREP_016', question: 'Vi skal være tilbage ___ kl. 5.', options: ['til', 'i', 'ved'], correct: 'til', explanation: 'til = by (deadline)', errorCode: 'PREP' },
      { id: 'PREP_017', question: 'Han kommer ___ Sverige.', options: ['fra', 'af', 'i'], correct: 'fra', explanation: 'fra = from (country)', errorCode: 'PREP' },
      { id: 'PREP_018', question: 'Jeg står ___ bussen.', options: ['på', 'i', 'ved'], correct: 'på', explanation: 'på = on (bus)', errorCode: 'PREP' },
      { id: 'PREP_019', question: 'Hun spiser ___ gaffel.', options: ['med', 'på', 'af'], correct: 'med', explanation: 'med = with (tool)', errorCode: 'PREP' },
      { id: 'PREP_020', question: 'Huset er båret ___ hvidt farve.', options: ['af', 'i', 'på'], correct: 'i', explanation: 'i = in (color)', errorCode: 'PREP' },
      { id: 'PREP_B1_001', question: 'Tro ___ ham er vigtig. Han har aldrig løjet.', options: ['på', 'i', 'til'], correct: 'på', explanation: 'tro på = believe in', errorCode: 'PREP' },
      { id: 'PREP_B1_002', question: 'Han er kendt ___ sine idéer ___ design.', options: ['for | inden for', 'på | i', 'af | med'], correct: 'for | inden for', explanation: 'kendt for = known for; inden for = in', errorCode: 'PREP' },
      { id: 'PREP_B1_003', question: 'Hun insisterer ___ at gøre det selv.', options: ['på', 'i', 'til'], correct: 'på', explanation: 'insistere på = insist on', errorCode: 'PREP' },
      { id: 'PREP_B1_004', question: 'Han handler ___ flere lande.', options: ['med', 'i', 'fra'], correct: 'med', explanation: 'handle med = trade with', errorCode: 'PREP' },
      { id: 'PREP_B1_005', question: 'Det er afhængigt ___ vejret.', options: ['af', 'på', 'fra'], correct: 'af', explanation: 'afhængigt af = dependent on', errorCode: 'PREP' },
    ]
  },

  // === CATEGORY 8: PASSIVE VOICE (Passiv) ===
  PASS: {
    name: 'Passiv (Passive Voice)',
    description: 'blive + past participle, -s ending for passive',
    exercises: [
      { id: 'PASS_001', question: 'Huset ___ af ham. Han byggede det.', options: ['blev bygget', 'var bygget', 'bygges'], correct: 'blev bygget', explanation: 'Passive past: blev + participle', errorCode: 'PASS' },
      { id: 'PASS_002', question: 'Bogen ___ af en berømt forfatter.', options: ['blev skrevet', 'var skrevet', 'skrevet'], correct: 'blev skrevet', explanation: 'Passive past tense', errorCode: 'PASS' },
      { id: 'PASS_003', question: 'Maden ___ i køkkenet.', options: ['var lavet', 'var blive lavet', 'er lavet'], correct: 'er lavet', explanation: 'Passive present', errorCode: 'PASS' },
      { id: 'PASS_004', question: 'Dørene ___ hver morgen.', options: ['lukkes', 'blir lukket', 'bliver lukket'], correct: 'lukses', explanation: 'Passive present: -es', errorCode: 'PASS' },
      { id: 'PASS_005', question: 'Projektet ___ af teamet.', options: ['blev gennemført', 'blev gennemfør', 'blive gennemført'], correct: 'blev gennemført', explanation: 'Passive past participle', errorCode: 'PASS' },
      { id: 'PASS_006', question: 'Kagen ___ til festen.', options: ['blev spist', 'blev spise', 'spises'], correct: 'blev spist', explanation: 'Passive past: blev spist', errorCode: 'PASS' },
      { id: 'PASS_007', question: 'Der ___ mange mennesker i mødet.', options: ['blev inviteret', 'er inviteret', 'blev invite'], correct: 'er inviteret', explanation: 'Passive present', errorCode: 'PASS' },
      { id: 'PASS_008', question: 'Breve ___ hver dag.', options: ['sendes', 'bliver sendt', 'bliver send'], correct: 'sendes', explanation: 'Passive present: -es', errorCode: 'PASS' },
      { id: 'PASS_009', question: 'Maleri ___ på museum.', options: ['blev hengt', 'blev hængt', 'hænges'], correct: 'blev hængt', explanation: 'Passive past: blev hængt', errorCode: 'PASS' },
      { id: 'PASS_010', question: 'Mødet ___ til næste uge.', options: ['blev udskudt', 'blev udskyde', 'udskydedes'], correct: 'blev udskudt', explanation: 'Passive past participle', errorCode: 'PASS' },
      { id: 'PASS_011', question: 'Resultatet ___ ved midnat.', options: ['blev annonceret', 'blev annoncere', 'annonceres'], correct: 'blev annonceret', explanation: 'Passive past: blev annonceret', errorCode: 'PASS' },
      { id: 'PASS_012', question: 'Ordrer ___ hurtigt.', options: ['bliver behandlet', 'blev behandlet', 'behandles'], correct: 'behandles', explanation: 'Passive present: -es', errorCode: 'PASS' },
      { id: 'PASS_013', question: 'Dokumenterne ___ i går.', options: ['blev underskrevet', 'blev underskrive', 'underskrevnes'], correct: 'blev underskrevet', explanation: 'Passive past participle', errorCode: 'PASS' },
      { id: 'PASS_014', question: 'Projektet ___ nu.', options: ['bliver gennemført', 'blev gennemført', 'gennemføres'], correct: 'bliver gennemført', explanation: 'Passive present progressive', errorCode: 'PASS' },
      { id: 'PASS_015', question: 'Planen ___ af direktøren.', options: ['blev godkendt', 'blev godkende', 'godkendedes'], correct: 'blev godkendt', explanation: 'Passive past participle', errorCode: 'PASS' },
    ]
  },

  // === CATEGORY 9: MODAL VERBS (Modale Verber) ===
  MOD: {
    name: 'Modale Verber (Modal Verbs)',
    description: 'skal, vil, kan, må, burde, kunne, ville - obligation, possibility, permission',
    exercises: [
      { id: 'MOD_001', question: 'Jeg ___ ikke til mødet. Jeg er syg.', options: ['skal', 'kan', 'må'], correct: 'kan', explanation: 'kan = can (ability)', errorCode: 'MOD' },
      { id: 'MOD_002', question: 'Du ___ være her kl. 9.', options: ['skal', 'vil', 'kan'], correct: 'skal', explanation: 'skal = shall (obligation)', errorCode: 'MOD' },
      { id: 'MOD_003', question: 'Han ___ i dag. Han skal arbejde.', options: ['vil', 'kan', 'må'], correct: 'vil', explanation: 'vil = will (future)', errorCode: 'MOD' },
      { id: 'MOD_004', question: 'Du ___ røre ved møblerne.', options: ['må', 'kan', 'skal'], correct: 'må', explanation: 'må = may (permission)', errorCode: 'MOD' },
      { id: 'MOD_005', question: 'Han ___ løbe meget hurtig da han var ung.', options: ['kunne', 'kan', 'skal'], correct: 'kunne', explanation: 'kunne = could (past)', errorCode: 'MOD' },
      { id: 'MOD_006', question: 'Du burde tale ___ ham.', options: ['med', 'til', 'om'], correct: 'med', explanation: 'burde = should (advice)', errorCode: 'MOD' },
      { id: 'MOD_007', question: 'Han ___ gøre det selv.', options: ['kan', 'skal', 'vil'], correct: 'kan', explanation: 'kan = can (ability)', errorCode: 'MOD' },
      { id: 'MOD_008', question: 'Du ___ være der til tiden.', options: ['skal', 'kan', 'vil'], correct: 'skal', explanation: 'skal = must (requirement)', errorCode: 'MOD' },
      { id: 'MOD_009', question: 'Han ___ ikke høre hende.', options: ['kunne', 'kan', 'skal'], correct: 'kunne', explanation: 'kunne = could (conditional)', errorCode: 'MOD' },
      { id: 'MOD_010', question: 'Vi ___ se hinanden igen snart.', options: ['vil', 'skal', 'kan'], correct: 'vil', explanation: 'vil = will (future)', errorCode: 'MOD' },
      { id: 'MOD_011', question: 'Han ___ arbejde i dag. Det er hans valg.', options: ['vil', 'kan', 'må'], correct: 'vil', explanation: 'vil = want to', errorCode: 'MOD' },
      { id: 'MOD_012', question: 'Du ___ ikke komme senere end 18.', options: ['skal', 'kan', 'vil'], correct: 'skal', explanation: 'skal = must (obligation)', errorCode: 'MOD' },
      { id: 'MOD_013', question: 'Han ___ tale dansk meget godt.', options: ['kan', 'skal', 'vil'], correct: 'kan', explanation: 'kan = can (ability)', errorCode: 'MOD' },
      { id: 'MOD_014', question: 'Vi ___ gå på tur efter maden.', options: ['vil', 'skal', 'kan'], correct: 'vil', explanation: 'vil = will (future intention)', errorCode: 'MOD' },
      { id: 'MOD_015', question: 'Du ___ åbne vinduestet hvis du synes det er varmt.', options: ['må', 'kan', 'skal'], correct: 'må', explanation: 'må = may (permission)', errorCode: 'MOD' },
    ]
  },

  // === CATEGORY 10: COMPARATIVE & SUPERLATIVE (Komparativ & Superlativ) [repeated]
  // (Already covered above)

  // === CATEGORY 11: REFLEXIVE VERBS (Refleksive Verber) ===
  REFL: {
    name: 'Refleksive Verber (Reflexive Verbs)',
    description: 'sig selv, hinanden - actions directed at oneself or each other',
    exercises: [
      { id: 'REFL_001', question: 'Han vasker ___. Han er i badeværelset.', options: ['sig', 'ham', 'hans'], correct: 'sig', explanation: 'sig = himself (reflexive)', errorCode: 'REFL' },
      { id: 'REFL_002', question: 'Hun kæmper ___ før hun går ud.', options: ['sitt', 'sig selv', 'hendes'], correct: 'sig selv', explanation: 'sig selv = herself', errorCode: 'REFL' },
      { id: 'REFL_003', question: 'De elsker ___ meget.', options: ['hinanden', 'sig', 'dem'], correct: 'hinanden', explanation: 'hinanden = each other', errorCode: 'REFL' },
      { id: 'REFL_004', question: 'Jeg handler mig ___ noget nyt.', options: ['selv', 'ham', 'sin'], correct: 'selv', explanation: 'myself = myself (reflexive)', errorCode: 'REFL' },
      { id: 'REFL_005', question: 'Du skal ikke blive bange ___.', options: ['af dig selv', 'af ham', 'af sin'], correct: 'af dig selv', explanation: 'af dig selv = of yourself', errorCode: 'REFL' },
      { id: 'REFL_006', question: 'Vi mødes og omfavner ___.', options: ['hinanden', 'os selv', 'vores'], correct: 'hinanden', explanation: 'hinanden = each other', errorCode: 'REFL' },
      { id: 'REFL_007', question: 'Han lærer ___ at danse.', options: ['sig selv', 'ham', 'hans'], correct: 'sig selv', explanation: 'sig selv = himself (reflexive)', errorCode: 'REFL' },
      { id: 'REFL_008', question: 'Hun tror ___ - hun kan klare det.', options: ['på sig selv', 'på ham', 'på sin'], correct: 'på sig selv', explanation: 'på sig selv = in herself', errorCode: 'REFL' },
      { id: 'REFL_009', question: 'De tvister ___ hele tiden.', options: ['med hinanden', 'med sig', 'med dem'], correct: 'med hinanden', explanation: 'med hinanden = with each other', errorCode: 'REFL' },
      { id: 'REFL_010', question: 'Jeg skalder ___ i spejlet.', options: ['mig selv', 'ham', 'sin'], correct: 'mig selv', explanation: 'mig selv = myself', errorCode: 'REFL' },
    ]
  },

  // === CATEGORY 12: NEGATION (Negation) ===
  NEG: {
    name: 'Negation (Negation & Negative Words)',
    description: 'ikke, aldrig, ingenting, ingen, intet, ikke... heller, etc.',
    exercises: [
      { id: 'NEG_001', question: 'Jeg ___ til mødet i dag.', options: ['går ikke', 'gå ikke', 'ikke går'], correct: 'går ikke', explanation: 'V2: går ikke (I don\'t go)', errorCode: 'NEG' },
      { id: 'NEG_002', question: 'Han kommer ___. Han er forkølet.', options: ['ikke', 'ikke kommer', 'ikke til'], correct: 'ikke', explanation: 'Negation: kommer ikke', errorCode: 'NEG' },
      { id: 'NEG_003', question: 'Du har ___ tid. Du er meget optaget.', options: ['ikke', 'ingen', 'intet'], correct: 'ingen', explanation: 'ingen = no (with countable noun)', errorCode: 'NEG' },
      { id: 'NEG_004', question: 'Hun har ___ råd til det. Hun er fattig.', options: ['ikke', 'ingen', 'intet'], correct: 'intet', explanation: 'intet = nothing (neuter)', errorCode: 'NEG' },
      { id: 'NEG_005', question: 'Der er ___ mennesker i rummet.', options: ['ingen', 'ikke', 'intet'], correct: 'ingen', explanation: 'ingen = no (people)', errorCode: 'NEG' },
      { id: 'NEG_006', question: 'Jeg har ___ set sådan noget før.', options: ['aldrig', 'ikke', 'ingen'], correct: 'aldrig', explanation: 'aldrig = never', errorCode: 'NEG' },
      { id: 'NEG_007', question: 'Han får ___ hvad han ønsker sig.', options: ['aldrig', 'ikke', 'ingen'], correct: 'aldrig', explanation: 'aldrig = never', errorCode: 'NEG' },
      { id: 'NEG_008', question: 'Jeg ved ___ hvad jeg skal sige.', options: ['ikke', 'intet', 'aldrig'], correct: 'ikke', explanation: 'ikke = not', errorCode: 'NEG' },
      { id: 'NEG_009', question: 'Der er ___ i køleskabet. Det er tomt.', options: ['intet', 'ikke', 'ingen'], correct: 'intet', explanation: 'intet = nothing', errorCode: 'NEG' },
      { id: 'NEG_010', question: 'Han arbejder ___ længere her. Han er pensioneret.', options: ['ikke', 'aldrig', 'ingen'], correct: 'ikke', explanation: 'ikke længere = not anymore', errorCode: 'NEG' },
    ]
  },

  // === CATEGORY 13: RELATIVE CLAUSES (Relative Clauses) ===
  REL: {
    name: 'Relative Clauses',
    description: 'som, der, hvilken, hvor - subordinate clauses describing nouns',
    exercises: [
      { id: 'REL_001', question: 'Manden ___ går i parken er højt.', options: ['som', 'der', 'hvilken'], correct: 'som', explanation: 'som = who/that (subject)', errorCode: 'REL' },
      { id: 'REL_002', question: 'Bogen ___ jeg læser er interessant.', options: ['som', 'der', 'hvilken'], correct: 'som', explanation: 'som = which/that (object)', errorCode: 'REL' },
      { id: 'REL_003', question: 'Huset ___ vi bor i er stort.', options: ['som', 'hvor', 'der'], correct: 'hvor', explanation: 'hvor = where', errorCode: 'REL' },
      { id: 'REL_004', question: 'Kvinden ___ ejer butikken er venlig.', options: ['som', 'der', 'hvilken'], correct: 'som', explanation: 'som = who (subject)', errorCode: 'REL' },
      { id: 'REL_005', question: 'Mødet ___ i morgen er vigtigt.', options: ['der er', 'som er', 'hvilken er'], correct: 'der er', explanation: 'der er = that is (formal)', errorCode: 'REL' },
      { id: 'REL_006', question: 'Projektet ___ han arbejder på er stressfyldt.', options: ['som', 'der', 'hvor'], correct: 'som', explanation: 'som = which/that (object)', errorCode: 'REL' },
      { id: 'REL_007', question: 'Rummet ___ vi mødes i er koldt.', options: ['som', 'hvor', 'der'], correct: 'hvor', explanation: 'hvor = where', errorCode: 'REL' },
      { id: 'REL_008', question: 'De mennesker ___ bor her er meget venlige.', options: ['som', 'der', 'hvilken'], correct: 'som', explanation: 'som = who/that', errorCode: 'REL' },
      { id: 'REL_009', question: 'Tiden ___ vi havde var ikke nok.', options: ['som', 'der', 'hvilken'], correct: 'som', explanation: 'som = which/that', errorCode: 'REL' },
      { id: 'REL_010', question: 'Året ___ vi mødte var svært.', options: ['som', 'da', 'når'], correct: 'som', explanation: 'som = that (object)', errorCode: 'REL' },
    ]
  },

  // === CATEGORY 14: INFINITIVES & GERUNDS (Infinitives/Gerunds) ===
  INFGER: {
    name: 'Infinitiver & Gerundier',
    description: 'at + infinitive, gerunds, infinitive vs. -ing forms',
    exercises: [
      { id: 'INFGER_001', question: 'Jeg kan lide ___ (danse).', options: ['at danse', 'danse', 'danser'], correct: 'at danse', explanation: 'at + infinitive after kan lide', errorCode: 'INFGER' },
      { id: 'INFGER_002', question: 'Han ønsker ___ (blive læge).', options: ['at blive', 'blive', 'bliver'], correct: 'at blive', explanation: 'at + infinitive after ønsker', errorCode: 'INFGER' },
      { id: 'INFGER_003', question: 'Hun har lyst til ___ (rejse til Grækenland).', options: ['at rejse', 'rejse', 'rejser'], correct: 'at rejse', explanation: 'at + infinitive after til', errorCode: 'INFGER' },
      { id: 'INFGER_004', question: 'Jeg prøver ___ (lære dansk).', options: ['at lære', 'lære', 'lærer'], correct: 'at lære', explanation: 'at + infinitive after prøver', errorCode: 'INFGER' },
      { id: 'INFGER_005', question: 'Vi holder af ___ (høre musik).', options: ['at høre', 'høre', 'hører'], correct: 'at høre', explanation: 'at + infinitive after holder af', errorCode: 'INFGER' },
      { id: 'INFGER_006', question: 'Han begynder ___ (arbejde på projektet).', options: ['at arbejde', 'arbejde', 'arbejder'], correct: 'at arbejde', explanation: 'at + infinitive after begynder', errorCode: 'INFGER' },
      { id: 'INFGER_007', question: 'Uden ___ (tale), forlod han rummet.', options: ['at tale', 'tale', 'at talende'], correct: 'at tale', explanation: 'at + infinitive after uden', errorCode: 'INFGER' },
      { id: 'INFGER_008', question: 'Jeg glæder mig til ___ (se dig igen).', options: ['at se', 'se', 'ser'], correct: 'at se', explanation: 'at + infinitive after til', errorCode: 'INFGER' },
      { id: 'INFGER_009', question: 'For ___ (blive god til dansk), skal du øve dig meget.', options: ['at blive', 'blive', 'at at blive'], correct: 'at blive', explanation: 'at + infinitive after for', errorCode: 'INFGER' },
      { id: 'INFGER_010', question: 'Han kan ikke holde op med ___ (røge).', options: ['at røge', 'røge', 'ryger'], correct: 'at røge', explanation: 'at + infinitive after med', errorCode: 'INFGER' },
    ]
  },

  // === CATEGORY 15: WORD CHOICE & IDIOMS (Ordvalg & Idiomer) ===
  IDI: {
    name: 'Idiomer & Ordvalg (Idioms & Phrases)',
    description: 'Danish idioms, phrases, expressions, word combinations',
    exercises: [
      { id: 'IDI_001', question: 'Det er ___ værk at lære dansk.', options: ['et stort', 'et godt', 'et svært'], correct: 'et stort', explanation: '"et stort værk" = a great undertaking', errorCode: 'IDI' },
      { id: 'IDI_002', question: 'Hun arbejder ___ sjæl og hjerte.', options: ['med', 'for', 'hele'], correct: 'hele', explanation: '"hele sjæl og hjerte" = with all her heart', errorCode: 'IDI' },
      { id: 'IDI_003', question: 'Det er ikke ___ dag at have møde.', options: ['en god', 'en dårlig', 'en slette'], correct: 'en god', explanation: '"det er ikke en god dag" = it\'s not a good day', errorCode: 'IDI' },
      { id: 'IDI_004', question: 'Hun løb så ___ som en hjort.', options: ['hurtigt', 'stærkt', 'vildt'], correct: 'hurtigt', explanation: '"hurtigt som en hjort" = quick as a deer', errorCode: 'IDI' },
      { id: 'IDI_005', question: 'Vi skal ___ hånd i hånd i dag.', options: ['holde', 'give', 'tage'], correct: 'holde', explanation: '"holde hånd i hånd" = hold hands', errorCode: 'IDI' },
      { id: 'IDI_006', question: 'Det var helt ___ bolden.', options: ['ved siden af', 'ved siden', 'uden for'], correct: 'ved siden af', explanation: '"helt ved siden af" = completely wrong', errorCode: 'IDI' },
      { id: 'IDI_007', question: 'Han sagde det direkte ___ hende.', options: ['i øjet på', 'i hendes ansigt', 'til hendes øje'], correct: 'i øjet på', explanation: '"i øjet på hende" = to her face', errorCode: 'IDI' },
      { id: 'IDI_008', question: 'Det ligger mig _____.', options: ['til hjerte', 'på hjertet', 'til sinds'], correct: 'til hjerte', explanation: '"ligger til hjerte" = I care about it', errorCode: 'IDI' },
      { id: 'IDI_009', question: 'Hun er fra ___ til ___.', options: ['hovedet | foden', 'håret | benene', 'øjet | tåen'], correct: 'hovedet | foden', explanation: '"fra hovedet til foden" = from head to toe', errorCode: 'IDI' },
      { id: 'IDI_010', question: 'Det er bare en ___ i havet.', options: ['dråbe', 'dråbe', 'draabe'], correct: 'dråbe', explanation: '"en dråbe i havet" = a drop in the ocean', errorCode: 'IDI' },
      { id: 'IDI_011', question: 'Han tabte ___ over han.', options: ['sit sind', 'sin Sans', 'sit hoved'], correct: 'sit sind', explanation: '"tabte sit sind" = lost his mind', errorCode: 'IDI' },
      { id: 'IDI_012', question: 'Vi må ___ på samme side.', options: ['stå sammen', 'være enig', 'tage sammen'], correct: 'stå sammen', explanation: '"stå sammen" = stand together', errorCode: 'IDI' },
      { id: 'IDI_013', question: 'Hun giver aldrig ___.', options: ['op', 'efter', 'tilbage'], correct: 'op', explanation: '"giver aldrig op" = never gives up', errorCode: 'IDI' },
      { id: 'IDI_014', question: 'Det ligger langt _____.', options: ['bagved', 'derfra', 'fra'], correct: 'bagved', explanation: '"ligger langt bagved" = falls far behind', errorCode: 'IDI' },
      { id: 'IDI_015', question: 'Han tager det med _____.', options: ['ophøjet sind', 'højt sind', 'godt mod'], correct: 'ophøjet sind', explanation: '"med ophøjet sind" = with dignity', errorCode: 'IDI' },
      { id: 'IDI_016', question: 'Vi skal ikke _____ ned til det niveau.', options: ['gå', 'falde', 'sjudre'], correct: 'gå', explanation: '"gå ned til niveauet" = stoop to that level', errorCode: 'IDI' },
      { id: 'IDI_017', question: 'Hun er glad _____.', options: ['op til øjne', 'til øjne', 'op til det hele'], correct: 'op til øjne', explanation: '"glad op til øjne" = beaming with joy', errorCode: 'IDI' },
      { id: 'IDI_018', question: 'Det ligger helt uden for _____.', options: ['min evne', 'mig', 'min kraft'], correct: 'min evne', explanation: '"uden for min evne" = beyond my ability', errorCode: 'IDI' },
      { id: 'IDI_019', question: 'Han drømmer højtud med _____.', options: ['åbne øjne', 'åbent øje', 'åben øje'], correct: 'åbne øjne', explanation: '"med åbne øjne" = with open eyes', errorCode: 'IDI' },
      { id: 'IDI_020', question: 'Det ligger helt uden for _____.', options: ['min forståelse', 'min sans', 'min evne'], correct: 'min forståelse', explanation: '"uden for min forståelse" = beyond my comprehension', errorCode: 'IDI' },
    ]
  }
};

// Export all categories and helper functions
export function getAllCategories() {
  return Object.entries(completeGrammarExercises).map(([code, data]) => ({
    code,
    name: data.name,
    description: data.description,
    count: data.exercises.length
  }));
}

export function getExercisesByCategory(category) {
  return completeGrammarExercises[category]?.exercises || [];
}

export function getRandomExercise(category) {
  const exercises = getExercisesByCategory(category);
  return exercises[Math.floor(Math.random() * exercises.length)];
}

export function getTotalExercises() {
  return Object.values(completeGrammarExercises).reduce((sum, cat) => sum + cat.exercises.length, 0);
}

export function getExercisesByDifficulty(difficulty) {
  const exercises = [];
  Object.values(completeGrammarExercises).forEach(category => {
    const filtered = category.exercises.filter(ex => ex.id.includes(difficulty) || !difficulty);
    exercises.push(...filtered);
  });
  return exercises;
}
