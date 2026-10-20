/**
 * COMPREHENSIVE DANISH GRAMMAR EXERCISE DATABASE
 * All grammar categories, ALL exercises needed for A1 → C2
 * 15 categories: 300 baseline + 135 Phase 4 = 435 total exercises
 */

import { phase4NewExercises } from './phase4NewExercises.js';

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
      { id: 'ORD_019', question: 'Både Hans og Maria ___ til mødet.', options: ['kommer', 'kommer de', 'de kommer'], correct: 'kommer', explanation: 'Coordinated subjects, verb agrees plural', errorCode: 'ORD' },
      { id: 'ORD_020', question: 'Hvilket projekt ___ han nu arbejde ___?', options: ['arbejder | på', 'arbejder | med', 'arbejder | i'], correct: 'arbejder | på', explanation: 'Question with preposition at end', errorCode: 'ORD' }
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
      { id: 'KOMP_020', question: 'Det var ___ møde vi havde haft. (lang)', options: ['længere', 'længst', 'lang'], correct: 'længst', explanation: 'Superlative: lang → længst', errorCode: 'KOMP' }
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
      { id: 'KONJ_013', question: 'Han kom for sent, derfor ___ mødet udsat.', options: ['blev', 'blev mødet', 'mødet blev'], correct: 'blev', explanation: '"derfor" = therefore (consequence)', errorCode: 'KONJ' },
      { id: 'KONJ_014', question: 'Sådan som han taler, ___ han fra Jylland.', options: ['er', 'kommer', 'ser ud'], correct: 'kommer', explanation: '"sådan som" = the way (comparison)', errorCode: 'KONJ' },
      { id: 'KONJ_015', question: 'Jeg holder af dansk, ___ det er vanskeligt.', options: ['selvom', 'fordi', 'da'], correct: 'selvom', explanation: '"selvom" = although (concession)', errorCode: 'KONJ' },
      { id: 'KONJ_016', question: 'Du skal lære dansk, ___ du skal arbejde her.', options: ['fordi', 'hvis', 'da'], correct: 'fordi', explanation: '"fordi" = because (reason)', errorCode: 'KONJ' },
      { id: 'KONJ_017', question: 'Hun sang ___ hun arbejdede.', options: ['mens', 'men', 'når'], correct: 'mens', explanation: '"mens" = while (simultaneous)', errorCode: 'KONJ' },
      { id: 'KONJ_018', question: 'Derudover ___ han også interesseret i sport.', options: ['er', 'var', 'vil'], correct: 'er', explanation: '"derudover" = moreover (addition)', errorCode: 'KONJ' },
      { id: 'KONJ_019', question: 'Som han sagde, ___ mødet aflyst.', options: ['var', 'blev', 'er'], correct: 'var', explanation: '"som" = as (reported thought)', errorCode: 'KONJ' },
      { id: 'KONJ_020', question: 'Du skal både arbejde ___ studere.', options: ['og', 'men', 'eller'], correct: 'og', explanation: '"både...og" = both...and', errorCode: 'KONJ' }
    ]
  },

  // === CATEGORY 4: PRONOUNS (Pronomener) ===
  PRON: {
    name: 'Pronomener (Pronouns)',
    description: 'jeg, du, han, hun, den, det, de, mig, dig, ham, hende, dem, sig, os, jer, mig selv, etc.',
    exercises: [
      { id: 'PRON_001', question: '___ er jeg glad.', options: ['Det', 'Den', 'Dem'], correct: 'Det', explanation: '"Det" as formal subject or neuter pronoun', errorCode: 'PRON' },
      { id: 'PRON_002', question: 'Hun gav ___ en bog.', options: ['mig', 'jeg', 'min'], correct: 'mig', explanation: 'Object pronoun: "mig" (me)', errorCode: 'PRON' },
      { id: 'PRON_003', question: 'Han talte med ___, ikke med hende.', options: ['mig', 'jeg', 'min'], correct: 'mig', explanation: 'Object of preposition: mig', errorCode: 'PRON' },
      { id: 'PRON_004', question: 'Vi mødte ___ på gaden.', options: ['dem', 'de', 'deres'], correct: 'dem', explanation: 'Object pronoun: "dem" (them)', errorCode: 'PRON' },
      { id: 'PRON_005', question: '___ tog mit kørekort.', options: ['Han', 'Mig', 'Sig'], correct: 'Han', explanation: 'Subject pronoun: "han" (he)', errorCode: 'PRON' },
      { id: 'PRON_006', question: 'Hun spurgte ___ direkte.', options: ['ham', 'han', 'hans'], correct: 'ham', explanation: 'Object pronoun: "ham" (him)', errorCode: 'PRON' },
      { id: 'PRON_007', question: 'Vi deler sekretæren mellem ___.', options: ['os', 'vi', 'vores'], correct: 'os', explanation: 'Object pronoun: "os" (us)', errorCode: 'PRON' },
      { id: 'PRON_008', question: 'Gavn Det kunne være ___ der skal løse det.', options: ['jer', 'I', 'jeres'], correct: 'jer', explanation: 'Object pronoun: "jer" (you plural object)', errorCode: 'PRON' },
      { id: 'PRON_009', question: 'Han sagde det til ___ selv.', options: ['sig', 'ham', 'hans'], correct: 'sig', explanation: 'Reflexive pronoun: "sig" (himself/herself/itself)', errorCode: 'PRON' },
      { id: 'PRON_010', question: 'Vi skal mødes, du og ___.', options: ['jeg', 'mig', 'min'], correct: 'jeg', explanation: 'Subject after "og": nominative "jeg"', errorCode: 'PRON' },
      { id: 'PRON_011', question: '___ går til mødet hver tirsdag.', options: ['Den', 'Det', 'De'], correct: 'De', explanation: 'Plural pronoun: "de" (they)', errorCode: 'PRON' },
      { id: 'PRON_012', question: 'Hvem var det? Det var ___.', options: ['mig', 'jeg', 'min'], correct: 'mig', explanation: 'After "var": accusative "mig"', errorCode: 'PRON' },
      { id: 'PRON_013', question: 'Hun giver ___ en chance.', options: ['sig selv', 'hende selv', 'hendes selv'], correct: 'sig selv', explanation: 'Reflexive with "selv": sig selv', errorCode: 'PRON' },
      { id: 'PRON_014', question: '___ skal mødes i dag?', options: ['Hvem', 'Hvilken', 'Hvor'], correct: 'Hvem', explanation: 'Interrogative pronoun: "hvem" (who)', errorCode: 'PRON' },
      { id: 'PRON_015', question: 'Den person, ___ kom, var høj.', options: ['som', 'der', 'hvilken'], correct: 'som', explanation: 'Relative pronoun: "som" (whom/that)', errorCode: 'PRON' },
      { id: 'PRON_016', question: 'Han og ___ arbejder sammen.', options: ['mig', 'jeg', 'min'], correct: 'jeg', explanation: 'Subject after "og": nominative', errorCode: 'PRON' },
      { id: 'PRON_017', question: 'Mellem ___ og dig er der ingen hemmeligheder.', options: ['mig', 'jeg', 'min'], correct: 'mig', explanation: 'Object of preposition: "mig"', errorCode: 'PRON' },
      { id: 'PRON_018', question: '___ sagde hun intet om.', options: ['Det', 'Den', 'Dem'], correct: 'Det', explanation: 'Neuter object: "det"', errorCode: 'PRON' },
      { id: 'PRON_019', question: 'Både han og ___ har været der.', options: ['jeg', 'mig', 'min'], correct: 'jeg', explanation: 'Subject after "både...og": nominative', errorCode: 'PRON' },
      { id: 'PRON_020', question: '___ mennesker her er meget venlige.', options: ['Disse', 'Dette', 'Dem'], correct: 'Disse', explanation: 'Demonstrative plural: "disse" (these)', errorCode: 'PRON' }
    ]
  },

  // === CATEGORY 5: POSSESSIVES (Possessive adjectives/pronouns) ===
  POSS: {
    name: 'Possessiver (Possessive Adjectives)',
    description: 'min, din, hans, hendes, vores, jeres, deres, sin/sit/sine',
    exercises: [
      { id: 'POSS_001', question: '___ hus er stort.', options: ['Min', 'Mig', 'Mig selv'], correct: 'Min', explanation: 'Possessive adjective: "min" (my)', errorCode: 'POSS' },
      { id: 'POSS_002', question: '___ bil er hvid.', options: ['Din', 'Dig', 'Dine'], correct: 'Din', explanation: 'Possessive adjective: "din" (your singular)', errorCode: 'POSS' },
      { id: 'POSS_003', question: '___ navn er Hans.', options: ['Hans', 'Hans\'', 'Hanses'], correct: 'Hans', explanation: 'Possessive adjective: "hans" (his)', errorCode: 'POSS' },
      { id: 'POSS_004', question: '___ forældre er fra Sverige.', options: ['Hendes', 'Hun', 'Hendes\''], correct: 'Hendes', explanation: 'Possessive adjective: "hendes" (her)', errorCode: 'POSS' },
      { id: 'POSS_005', question: '___ møde er vigtig.', options: ['Vores', 'Vi', 'Vor'], correct: 'Vores', explanation: 'Possessive adjective: "vores" (our)', errorCode: 'POSS' },
      { id: 'POSS_006', question: '___ projekt skal være færdigt i dag.', options: ['Jeres', 'I', 'Jer'], correct: 'Jeres', explanation: 'Possessive adjective: "jeres" (your plural)', errorCode: 'POSS' },
      { id: 'POSS_007', question: '___ børn går i skole.', options: ['Deres', 'Dem', 'De'], correct: 'Deres', explanation: 'Possessive adjective: "deres" (their)', errorCode: 'POSS' },
      { id: 'POSS_008', question: 'Han tog ___ bog med hjem.', options: ['sin', 'hans', 'sit'], correct: 'sin', explanation: 'Reflexive possessive: "sin" agrees with masculine noun', errorCode: 'POSS' },
      { id: 'POSS_009', question: 'Hun tog ___ hus med hjem.', options: ['sit', 'hendes', 'sin'], correct: 'sit', explanation: 'Reflexive possessive: "sit" agrees with neuter noun', errorCode: 'POSS' },
      { id: 'POSS_010', question: 'De tog ___ biler med hjem.', options: ['sine', 'deres', 'deres'], correct: 'sine', explanation: 'Reflexive possessive plural: "sine"', errorCode: 'POSS' },
      { id: 'POSS_011', question: '___ søster er læge.', options: ['Min', 'Mit', 'Mig'], correct: 'Min', explanation: 'Possessive adjective agreeing with common noun', errorCode: 'POSS' },
      { id: 'POSS_012', question: '___ øje er blåt.', options: ['Mit', 'Min', 'Mig'], correct: 'Mit', explanation: 'Possessive adjective agreeing with neuter noun', errorCode: 'POSS' },
      { id: 'POSS_013', question: '___ hænder er kolde.', options: ['Mine', 'Mit', 'Min'], correct: 'Mine', explanation: 'Possessive plural: "mine" (my)', errorCode: 'POSS' },
      { id: 'POSS_014', question: 'Hun sagde, at ___ drømme var vigtige.', options: ['sine', 'hendes', 'sine'], correct: 'sine', explanation: 'Reflexive: refers back to subject "hun"', errorCode: 'POSS' },
      { id: 'POSS_015', question: '___ arbejde var ikke færdigt.', options: ['Sit', 'Hans', 'Sine'], correct: 'Hans', explanation: 'No reflexive needed (object pronoun)', errorCode: 'POSS' },
      { id: 'POSS_016', question: 'Vi delte ___ tanker med hinanden.', options: ['vores', 'sine', 'vor'], correct: 'vores', explanation: 'Collective possessive: "vores" (our)', errorCode: 'POSS' },
      { id: 'POSS_017', question: 'De sagde, at ___ børn skulle møde kl. 8.', options: ['deres', 'sine', 'de'], correct: 'deres', explanation: 'Non-reflexive: refers to someone else\'s children', errorCode: 'POSS' },
      { id: 'POSS_018', question: '___ øjne var tørre.', options: ['Dine', 'Dit', 'Din'], correct: 'Dine', explanation: 'Possessive plural: "dine" (your)', errorCode: 'POSS' },
      { id: 'POSS_019', question: 'Han gav ___ venner en invitation.', options: ['sine', 'hans', 'sit'], correct: 'sine', explanation: 'Reflexive plural: "sine" (his own)', errorCode: 'POSS' },
      { id: 'POSS_020', question: '___ navn var glemte.', options: ['Deres', 'Deres\'', 'De'], correct: 'Deres', explanation: 'Possessive adjective: "deres" (their)', errorCode: 'POSS' }
    ]
  },

  // === CATEGORY 6: ARTICLES & QUANTIFIERS (Artikler & Kvantificering) ===
  ARTKV: {
    name: 'Artikler & Kvantificering (Articles & Quantifiers)',
    description: 'en, et, den, det, de, nogle, mange, få, hele, alt, ingen, intet',
    exercises: [
      { id: 'ARTKV_001', question: '___ hund løb på gaden.', options: ['En', 'Et'], correct: 'En', explanation: 'Common gender noun: "en hund"', errorCode: 'ARTKV' },
      { id: 'ARTKV_002', question: '___ hus var stort.', options: ['Et', 'En'], correct: 'Et', explanation: 'Neuter noun: "et hus"', errorCode: 'ARTKV' },
      { id: 'ARTKV_003', question: '___ mennesker her er venlige.', options: ['De', 'Nogle', 'De nogle'], correct: 'De', explanation: 'Definite article plural: "de"', errorCode: 'ARTKV' },
      { id: 'ARTKV_004', question: 'Der var ___ mennesker i mødet.', options: ['nogle', 'alle', 'de'], correct: 'nogle', explanation: 'Indefinite quantifier: "nogle" (some)', errorCode: 'ARTKV' },
      { id: 'ARTKV_005', question: '___ mennesker kom ikke.', options: ['Ingen', 'Intet', 'Alt'], correct: 'Ingen', explanation: 'Negative quantifier: "ingen" (no/none)', errorCode: 'ARTKV' },
      { id: 'ARTKV_006', question: '___ tid for at rejse.', options: ['Intet', 'Ingen', 'Alt'], correct: 'Intet', explanation: 'Neuter negative: "intet" (nothing)', errorCode: 'ARTKV' },
      { id: 'ARTKV_007', question: '___ mennesker arbejdede der.', options: ['Mange', 'Hele', 'Alle'], correct: 'Mange', explanation: 'Quantifier: "mange" (many)', errorCode: 'ARTKV' },
      { id: 'ARTKV_008', question: '___ dag var det varmt.', options: ['Hele', 'Alt', 'Alle'], correct: 'Hele', explanation: '"hele" = whole/entire day', errorCode: 'ARTKV' },
      { id: 'ARTKV_009', question: '___ er muligt, hvis man prøver.', options: ['Alt', 'Hele', 'Alle'], correct: 'Alt', explanation: '"alt" = everything', errorCode: 'ARTKV' },
      { id: 'ARTKV_010', question: '___ mennesker kom til mødet.', options: ['Alle', 'Hele', 'Alt'], correct: 'Alle', explanation: '"alle" = everyone (plural)', errorCode: 'ARTKV' },
      { id: 'ARTKV_011', question: '___ bog var interessant.', options: ['Den', 'Det', 'De'], correct: 'Den', explanation: 'Definite article singular common: "den"', errorCode: 'ARTKV' },
      { id: 'ARTKV_012', question: '___ hus var hvidt.', options: ['Det', 'Den', 'De'], correct: 'Det', explanation: 'Definite article singular neuter: "det"', errorCode: 'ARTKV' },
      { id: 'ARTKV_013', question: '___ mennesker vi mødte var fra Danmark.', options: ['De', 'Den', 'Det'], correct: 'De', explanation: 'Definite article plural: "de"', errorCode: 'ARTKV' },
      { id: 'ARTKV_014', question: '___ få mennesker kom til mødet.', options: ['Bare', 'Få', 'Nogle'], correct: 'Få', explanation: '"få" = few', errorCode: 'ARTKV' },
      { id: 'ARTKV_015', question: 'Hun har ___ veninder fra universitetet.', options: ['flere', 'mange', 'nogen'], correct: 'flere', explanation: '"flere" = more/several', errorCode: 'ARTKV' },
      { id: 'ARTKV_016', question: '___ person skal kunne løse denne opgave.', options: ['Enhver', 'Hele', 'Alt'], correct: 'Enhver', explanation: '"enhver" = every (person)', errorCode: 'ARTKV' },
      { id: 'ARTKV_017', question: 'Der var ___ penge i kassen.', options: ['ingen', 'intet', 'alle'], correct: 'ingen', explanation: '"ingen" for countable plurals (penge=plural)', errorCode: 'ARTKV' },
      { id: 'ARTKV_018', question: '___ det han sagde var sandt.', options: ['Ikke alt', 'Intet', 'Ingen'], correct: 'Ikke alt', explanation: '"ikke alt" = not everything', errorCode: 'ARTKV' },
      { id: 'ARTKV_019', question: 'Hun havde ___ tid til at hjælpe.', options: ['ingen', 'intet', 'alt'], correct: 'ingen', explanation: '"ingen tid" = no time', errorCode: 'ARTKV' },
      { id: 'ARTKV_020', question: '___ mennesker i verden kan tale dansk.', options: ['Få', 'Hele', 'Nogle'], correct: 'Få', explanation: '"få mennesker" = few people', errorCode: 'ARTKV' }
    ]
  },

  // === CATEGORY 7: PASSIVE VOICE (Passiv) ===
  PASS: {
    name: 'Passiv (Passive Voice)',
    description: 'blive + past participle, s-verbs, passive constructions',
    exercises: [
      { id: 'PASS_001', question: 'Bogen ___ skrevet af forfatteren.', options: ['var', 'blev', 'var blevet'], correct: 'blev', explanation: '"blev skrevet" = was written (simple past passive)', errorCode: 'PASS' },
      { id: 'PASS_002', question: 'Mødet ___ aflyst på grund af vejret.', options: ['var', 'blev', 'er'], correct: 'blev', explanation: '"blev aflyst" = was cancelled', errorCode: 'PASS' },
      { id: 'PASS_003', question: 'Projektet ___ planlagt i detaljer.', options: ['blev', 'var', 'var blevet'], correct: 'blev', explanation: 'Past passive: "blev planlagt"', errorCode: 'PASS' },
      { id: 'PASS_004', question: 'Maden ___ lavet af kokken.', options: ['var', 'blev', 'er lavet'], correct: 'blev', explanation: '"blev lavet" = was made', errorCode: 'PASS' },
      { id: 'PASS_005', question: 'Det ___ sagt, at han kommer i dag.', options: ['blev', 'var', 'er'], correct: 'blev', explanation: '"blev sagt" = was said', errorCode: 'PASS' },
      { id: 'PASS_006', question: 'Hundene ___ fodret hver dag.', options: ['bliver', 'var', 'blev'], correct: 'bliver', explanation: 'Present passive: "bliver fodret" (are fed)', errorCode: 'PASS' },
      { id: 'PASS_007', question: 'Huset ___ solgt for en høj pris.', options: ['var', 'blev', 'er'], correct: 'blev', explanation: '"blev solgt" = was sold', errorCode: 'PASS' },
      { id: 'PASS_008', question: 'Lektionen ___ forklaret klart.', options: ['blev', 'var', 'var blevet'], correct: 'blev', explanation: '"blev forklaret" = was explained', errorCode: 'PASS' },
      { id: 'PASS_009', question: 'Opgaven ___ løst af alle eleverne.', options: ['var', 'blev', 'er'], correct: 'blev', explanation: '"blev løst" = was solved', errorCode: 'PASS' },
      { id: 'PASS_010', question: 'Systemet ___ installeret af IT-specialisten.', options: ['blev', 'var', 'er'], correct: 'blev', explanation: '"blev installeret" = was installed', errorCode: 'PASS' },
      { id: 'PASS_011', question: 'Rapporten ___ skrevet på dansk.', options: ['blev', 'var', 'er'], correct: 'blev', explanation: '"blev skrevet" = was written', errorCode: 'PASS' },
      { id: 'PASS_012', question: 'Det nya kontor ___ bygget i området.', options: ['blev', 'var', 'er'], correct: 'blev', explanation: '"blev bygget" = was built', errorCode: 'PASS' },
      { id: 'PASS_013', question: 'Alle dokumenter ___ arkiveret ordentligt.', options: ['blev', 'var', 'er'], correct: 'blev', explanation: '"blev arkiveret" = were archived', errorCode: 'PASS' },
      { id: 'PASS_014', question: 'Goderne ___ leveret til tiden.', options: ['blev', 'var', 'er'], correct: 'blev', explanation: '"blev leveret" = were delivered', errorCode: 'PASS' },
      { id: 'PASS_015', question: 'Møtet ___ arrangeret af direktøren.', options: ['blev', 'var', 'er'], correct: 'blev', explanation: '"blev arrangeret" = was arranged', errorCode: 'PASS' },
      { id: 'PASS_016', question: 'Vejledningen ___ givet til de nye medarbeidere.', options: ['blev', 'var', 'er'], correct: 'blev', explanation: '"blev givet" = was given', errorCode: 'PASS' },
      { id: 'PASS_017', question: 'Han ___ ønsket tillykke på hans fødselsdag.', options: ['blev', 'var', 'er'], correct: 'blev', explanation: '"blev ønsket" = was wished/congratulated', errorCode: 'PASS' },
      { id: 'PASS_018', question: 'Budgettet ___ godkendt af bestyrelsen.', options: ['blev', 'var', 'er'], correct: 'blev', explanation: '"blev godkendt" = was approved', errorCode: 'PASS' },
      { id: 'PASS_019', question: 'Webside ___ opdateret i dag.', options: ['blev', 'var', 'er'], correct: 'blev', explanation: '"blev opdateret" = was updated', errorCode: 'PASS' },
      { id: 'PASS_020', question: 'Musikken ___ spillet hele aftenen.', options: ['blev', 'var', 'er'], correct: 'blev', explanation: '"blev spillet" = was played', errorCode: 'PASS' }
    ]
  },

  // === CATEGORY 8: S-VERBS (S-verber, reflexive verbs) ===
  SVERB: {
    name: 'S-verber (S-verbs & Reflexives)',
    description: 'sig, mig, dig, os, jer, ses, hørtes, troede sig, føler sig',
    exercises: [
      { id: 'SVERB_001', question: 'Han ___ sig selv i spejlet.', options: ['så', 'ser', 'set'], correct: 'ser', explanation: '"ser sig" = sees himself (reflexive)', errorCode: 'SVERB' },
      { id: 'SVERB_002', question: 'Vi ___ os godt sammen.', options: ['forstår', 'forstår os', 'forstå sig'], correct: 'forstår', explanation: 'Reflexive: "forstår os" = understand each other', errorCode: 'SVERB' },
      { id: 'SVERB_003', question: 'De ___ sig meget om.', options: ['elskede', 'elsker sig', 'elsker'], correct: 'elsker', explanation: 'Reflexive: "elsker sig" = love each other', errorCode: 'SVERB' },
      { id: 'SVERB_004', question: 'Hun ___ sig tilfredsst med resultatet.', options: ['følte', 'følte sig', 'føler'], correct: 'følte sig', explanation: '"følte sig tilfredsst" = felt satisfied', errorCode: 'SVERB' },
      { id: 'SVERB_005', question: 'De ___ sig på festen.', options: ['morede', 'morede sig', 'morere'], correct: 'morede sig', explanation: '"morede sig" = enjoyed themselves/had fun', errorCode: 'SVERB' },
      { id: 'SVERB_006', question: 'Han ___ sig dårlig sammen med kollegerne.', options: ['afsnittet', 'afsnittet sig', 'afsnittes'], correct: 'afsnittet sig', explanation: '"afsnittet sig" = kept distance/felt apart', errorCode: 'SVERB' },
      { id: 'SVERB_007', question: 'Møtet ___ afgørelsen på mødet (de møtes)', options: ['saw', 'saw sig', 'sies'], correct: 'sies', explanation: 's-verb (passive meaning): "sies" = it is said', errorCode: 'SVERB' },
      { id: 'SVERB_008', question: 'Vi ___ os i morgen igen.', options: ['ser', 'ses', 'sies'], correct: 'ses', explanation: '"ses" = see each other (reciprocal)', errorCode: 'SVERB' },
      { id: 'SVERB_009', question: 'Hans stemme ___ godt gennem vinduet.', options: ['høres', 'høres sig', 'hørte'], correct: 'høres', explanation: '"høres" = is heard (s-verb)', errorCode: 'SVERB' },
      { id: 'SVERB_010', question: 'Han ___ sig som en leder.', options: ['opfører', 'opfører sig', 'opføres'], correct: 'opfører sig', explanation: '"opfører sig" = behaves (reflexive)', errorCode: 'SVERB' },
      { id: 'SVERB_011', question: 'Hun ___ sig i det nye job.', options: ['tilpassede', 'tilpassede sig', 'tilpassedes'], correct: 'tilpassede sig', explanation: '"tilpassede sig" = adjusted herself', errorCode: 'SVERB' },
      { id: 'SVERB_012', question: 'De ___ sig efter kl. 10.', options: ['mødes', 'mødes sig', 'mødte'], correct: 'mødes', explanation: '"mødes" = meet each other (reciprocal)', errorCode: 'SVERB' },
      { id: 'SVERB_013', question: 'Han ___ sig skyldig for sin fejl.', options: ['følte', 'følte sig', 'føler'], correct: 'følte sig', explanation: '"følte sig skyldig" = felt guilty', errorCode: 'SVERB' },
      { id: 'SVERB_014', question: 'Hun ___ sig meget glad over nyheden.', options: ['gjorde', 'gjorde sig', 'viste sig'], correct: 'gjorde sig', explanation: '"gjorde sig glad" = became/made herself happy', errorCode: 'SVERB' },
      { id: 'SVERB_015', question: 'Det ___ som en god idé.', options: ['virker', 'virkes', 'virker sig'], correct: 'virker', explanation: '"virker" = seems/appears (s-verb property)', errorCode: 'SVERB' },
      { id: 'SVERB_016', question: 'Vi ___ os efter hinanden.', options: ['søgte', 'søgte os', 'søger'], correct: 'søgte', explanation: 'Reflexive: "søgte os" = sought/searched for each other', errorCode: 'SVERB' },
      { id: 'SVERB_017', question: 'Hun ___ sig meget udmattet efter marathonen.', options: ['følte', 'følte sig', 'føler'], correct: 'følte sig', explanation: '"følte sig udmattet" = felt exhausted', errorCode: 'SVERB' },
      { id: 'SVERB_018', question: 'De ___ sig fra hverdagen i weekenden.', options: ['slappede', 'slappede af sig', 'slappes af'], correct: 'slappede af sig', explanation: '"slappede af sig" = relaxed', errorCode: 'SVERB' },
      { id: 'SVERB_019', question: 'Han ___ sig på sin bedre side.', options: ['viste', 'viste sig', 'vises'], correct: 'viste sig', explanation: '"viste sig" = showed himself (reflexive)', errorCode: 'SVERB' },
      { id: 'SVERB_020', question: 'Vi ___ os alle rundt om bordet.', options: ['satte', 'satte os', 'sidder'], correct: 'satte os', explanation: '"satte os" = sat down (reflexive)', errorCode: 'SVERB' }
    ]
  },

  // === CATEGORY 9: MODAL VERBS (Modale verber) ===
  MOD: {
    name: 'Modale verber (Modal Verbs)',
    description: 'kan, skal, vil, må, bør, kunne, skulle, ville, måtte, burde',
    exercises: [
      { id: 'MOD_001', question: 'Jeg ___ komme til møtet i dag.', options: ['kan', 'skal', 'vil'], correct: 'kan', explanation: '"kan" = can/is able to', errorCode: 'MOD' },
      { id: 'MOD_002', question: 'Du ___ møde til tiden.', options: ['kan', 'skal', 'vil'], correct: 'skal', explanation: '"skal" = must/should (obligation)', errorCode: 'MOD' },
      { id: 'MOD_003', question: 'Han ___ ikke arbejde i dag pga. sygdom.', options: ['kan', 'skal', 'vil'], correct: 'kan', explanation: '"kan ikke" = cannot', errorCode: 'MOD' },
      { id: 'MOD_004', question: 'Vi ___ mødes i morgen.', options: ['kan', 'skal', 'vil'], correct: 'vil', explanation: '"vil" = will (future intention)', errorCode: 'MOD' },
      { id: 'MOD_005', question: 'Hun ___ møde hvis hun har tid.', options: ['kan', 'må', 'vil'], correct: 'kan', explanation: '"kan" = is able to (ability)', errorCode: 'MOD' },
      { id: 'MOD_006', question: 'Du ___ ikke spise her.', options: ['kan', 'må', 'skal'], correct: 'må', explanation: '"må ikke" = must not (permission/prohibition)', errorCode: 'MOD' },
      { id: 'MOD_007', question: 'I ___ være hjemme kl. 10.', options: ['skal', 'kan', 'vil'], correct: 'skal', explanation: '"skal" = must be (obligation)', errorCode: 'MOD' },
      { id: 'MOD_008', question: 'Han ___ komme, eller ___ han blive?', options: ['vil | skal', 'skal | kan', 'kan | må'], correct: 'vil | skal', explanation: '"vil" = will + "skal" = will/is to', errorCode: 'MOD' },
      { id: 'MOD_009', question: 'Du ___ lære dansk bedre.', options: ['bør', 'skal', 'kan'], correct: 'bør', explanation: '"bør" = should (advice/recommendation)', errorCode: 'MOD' },
      { id: 'MOD_010', question: 'Han ___ være der allerede.', options: ['kunne', 'skulle', 'ville'], correct: 'skulle', explanation: '"skulle" = was supposed to', errorCode: 'MOD' },
      { id: 'MOD_011', question: 'Det ___ regne i morgen.', options: ['kan', 'ville', 'skal'], correct: 'kan', explanation: '"kan" = might/could (possibility)', errorCode: 'MOD' },
      { id: 'MOD_012', question: 'Jeg ___ ikke hans navn.', options: ['kan huske', 'må', 'skal'], correct: 'kan huske', explanation: '"kan huske" = can remember', errorCode: 'MOD' },
      { id: 'MOD_013', question: 'Han ___ kommet hvis han havde vidst det.', options: ['ville', 'kunne', 'måtte'], correct: 'ville', explanation: 'Conditional past: "ville have kommet"', errorCode: 'MOD' },
      { id: 'MOD_014', question: 'Du ___ gøre det, hvis du ønsker.', options: ['kan', 'må', 'skal'], correct: 'kan', explanation: '"kan" = may/are able to', errorCode: 'MOD' },
      { id: 'MOD_015', question: 'Det ___ være hans hus.', options: ['kan', 'må', 'vil'], correct: 'kan', explanation: '"kan" = might/could be', errorCode: 'MOD' },
      { id: 'MOD_016', question: 'Jeg ___ gøre mine lektier nu.', options: ['skal', 'kan', 'vil'], correct: 'skal', explanation: '"skal" = have to (obligation)', errorCode: 'MOD' },
      { id: 'MOD_017', question: 'Han ___ arbejde mere intensivt.', options: ['bør', 'kan', 'vil'], correct: 'bør', explanation: '"bør" = should/ought to', errorCode: 'MOD' },
      { id: 'MOD_018', question: 'Hun ___ ikke møde på grund af sygdom.', options: ['kunne', 'kunnt', 'kan'], correct: 'kunne', explanation: 'Past tense: "kunne ikke" = could not', errorCode: 'MOD' },
      { id: 'MOD_019', question: 'Du ___ ikke glemme dine nøgler.', options: ['må', 'skal', 'kan'], correct: 'må', explanation: '"må ikke" = must not (negated permission)', errorCode: 'MOD' },
      { id: 'MOD_020', question: 'Vi ___ mødes hver uge.', options: ['skal', 'kan', 'vil'], correct: 'skal', explanation: '"skal" = are to meet (arrangement)', errorCode: 'MOD' }
    ]
  },

  // === CATEGORY 10: RELATIVE CLAUSES (Relative clauses & pronouns) ===
  REL: {
    name: 'Relative clauses (Ledsætninger)',
    description: 'som, der, hvis, hvor, hvad, med som/der/hvis etc.',
    exercises: [
      { id: 'REL_001', question: 'Manden, ___ kom her, var min chef.', options: ['som', 'der', 'hvis'], correct: 'som', explanation: '"som" = who/whom (object relative pronoun)', errorCode: 'REL' },
      { id: 'REL_002', question: 'Det hus, ___ ligger ved siden af, er stort.', options: ['som', 'der', 'hvis'], correct: 'som', explanation: '"som" relative pronoun for house', errorCode: 'REL' },
      { id: 'REL_003', question: 'Ville du kende det dyr, ___ jeg så?', options: ['som', 'der', 'hvis'], correct: 'som', explanation: '"som" as object: the animal that I saw', errorCode: 'REL' },
      { id: 'REL_004', question: 'Den dag, ___ han kom, var speciel.', options: ['som', 'der', 'da'], correct: 'som', explanation: '"som" or temporal "da": the day when', errorCode: 'REL' },
      { id: 'REL_005', question: 'Det hus, ___ står på hjørnet, er gammelt.', options: ['som', 'der', 'hvis'], correct: 'som', explanation: '"som" = which (stands on corner)', errorCode: 'REL' },
      { id: 'REL_006', question: 'Han købt bogen, ___ jeg anbefalede.', options: ['som', 'der', 'hvis'], correct: 'som', explanation: '"som" = that (which I recommended)', errorCode: 'REL' },
      { id: 'REL_007', question: 'Det er det man, ___ jeg arbejder med.', options: ['som', 'der', 'hvis'], correct: 'som', explanation: '"som" = that (whom I work with)', errorCode: 'REL' },
      { id: 'REL_008', question: 'Det sted, ___ vi mødes, er stille.', options: ['hvor', 'som', 'der'], correct: 'hvor', explanation: '"hvor" = where (locative relative)', errorCode: 'REL' },
      { id: 'REL_009', question: 'Det år, ___ han blev født, var 1990.', options: ['hvor', 'da', 'som'], correct: 'da', explanation: '"da" or "hvor" = when (temporal)', errorCode: 'REL' },
      { id: 'REL_010', question: 'Det, ___ han sagde, var sandt.', options: ['som', 'hvad', 'der'], correct: 'hvad', explanation: '"hvad" = what (nominal relative)', errorCode: 'REL' },
      { id: 'REL_011', question: 'Den person, ___ jeg mødte, var høj.', options: ['som', 'der', 'hvis'], correct: 'som', explanation: '"som" = whom (object)', errorCode: 'REL' },
      { id: 'REL_012', question: 'Gaven, ___ han gav mig, var fin.', options: ['som', 'der', 'hvis'], correct: 'som', explanation: '"som" = that (which he gave me)', errorCode: 'REL' },
      { id: 'REL_013', question: 'Det bog, ___ er på bordet, er min.', options: ['som', 'der', 'hvis'], correct: 'som', explanation: '"som" = that (is on the table)', errorCode: 'REL' },
      { id: 'REL_014', question: 'Han arbejder på stedet, ___ ligger nær København.', options: ['hvor', 'som', 'der'], correct: 'hvor', explanation: '"hvor" = where (locative)', errorCode: 'REL' },
      { id: 'REL_015', question: 'Ville du gøre det, ___ jeg beder?', options: ['som', 'hvad', 'hvis'], correct: 'som', explanation: '"som" = that (which I ask)', errorCode: 'REL' },
      { id: 'REL_016', question: 'Alle mennesker, ___ kom, var venlige.', options: ['som', 'der', 'hvis'], correct: 'som', explanation: '"som" = who/that (came)', errorCode: 'REL' },
      { id: 'REL_017', question: 'Det hus, ___ lys brenner, må være hjem.', options: ['hvor', 'som', 'hvis'], correct: 'hvor', explanation: '"hvor" = where (lights burn)', errorCode: 'REL' },
      { id: 'REL_018', question: 'Hvad er det, ___ du vil?', options: ['som', 'hvad', 'der'], correct: 'som', explanation: '"som" = that (what you want)', errorCode: 'REL' },
      { id: 'REL_019', question: 'Den gang, ___ vi mødes, var sjovt.', options: ['da', 'hvor', 'som'], correct: 'da', explanation: '"da" = when (temporal relative)', errorCode: 'REL' },
      { id: 'REL_020', question: 'Det firma, ___ han arbejder, er stort.', options: ['hvor', 'som', 'hvad'], correct: 'hvor', explanation: '"hvor" = where (at which company)', errorCode: 'REL' }
    ]
  },

  // === CATEGORY 11: INFINITIVE vs GERUND ===
  INFGER: {
    name: 'Infinitiv vs Gerundium',
    description: 'at + infinitive, -ing forms, verbal nouns',
    exercises: [
      { id: 'INFGER_001', question: 'Han begyndte ___ arbejde.', options: ['at', 'for at', '-ing'], correct: 'at', explanation: '"at arbejde" = to work (infinitive)', errorCode: 'INFGER' },
      { id: 'INFGER_002', question: 'Han drømte om ___ læge.', options: ['at blive', 'blive', 'bliven'], correct: 'at blive', explanation: '"om at blive" = about becoming', errorCode: 'INFGER' },
      { id: 'INFGER_003', question: 'Det er svært ___ lære dansk.', options: ['at', 'for at', 'the'], correct: 'at', explanation: '"at lære" = to learn (infinitive)', errorCode: 'INFGER' },
      { id: 'INFGER_004', question: 'Hun kan ikke ___ arbejde.', options: ['til at', 'at', 'for at'], correct: 'at', explanation: '"kan ikke arbejde" (no "at" with modals)', errorCode: 'INFGER' },
      { id: 'INFGER_005', question: 'Jeg kommer ___ mødet.', options: ['til at', 'at', 'for'], correct: 'til at', explanation: '"til at møde" = to meet/come to meet', errorCode: 'INFGER' },
      { id: 'INFGER_006', question: 'Han løb ___ hjælpe.', options: ['for at', 'at', 'til at'], correct: 'for at', explanation: '"for at hjælpe" = in order to help (purpose)', errorCode: 'INFGER' },
      { id: 'INFGER_007', question: 'Det handler om ___ være præcis.', options: ['at', 'for at', '-ing'], correct: 'at', explanation: '"om at være" = about being', errorCode: 'INFGER' },
      { id: 'INFGER_008', question: 'Hun nægter ___ svare.', options: ['at', 'for at', '-ing'], correct: 'at', explanation: '"nægter at svare" = refuses to answer', errorCode: 'INFGER' },
      { id: 'INFGER_009', question: 'Det vigtigste er ___ prøve.', options: ['at', 'for at', '-ing'], correct: 'at', explanation: '"er at prøve" = is to try', errorCode: 'INFGER' },
      { id: 'INFGER_010', question: 'Han ønsker ___ møde dig.', options: ['at', 'for at', '-ing'], correct: 'at', explanation: '"ønsker at møde" = wishes to meet', errorCode: 'INFGER' },
      { id: 'INFGER_011', question: 'Vi må ___ komme til tiden.', options: ['at', 'intet (ingenting)', 'for at'], correct: 'intet (ingenting)', explanation: 'Modal verbs do not use "at"', errorCode: 'INFGER' },
      { id: 'INFGER_012', question: 'Det er vigtigt ___ have tid til resten.', options: ['at', 'for at', '-ing'], correct: 'at', explanation: '"at have" = to have (infinitive)', errorCode: 'INFGER' },
      { id: 'INFGER_013', question: 'Hun bad mig ___ hjælpe.', options: ['at', 'for at', '-ing'], correct: 'at', explanation: '"bad mig at hjælpe" = asked me to help', errorCode: 'INFGER' },
      { id: 'INFGER_014', question: 'Han forglemte ___ købe med.', options: ['at', 'for at', '-ing'], correct: 'at', explanation: '"forglemte at købe" = forgot to buy', errorCode: 'INFGER' },
      { id: 'INFGER_015', question: 'Det hjælper ___ tale dansk hver dag.', options: ['at', 'for at', '-ing'], correct: 'at', explanation: '"hjælper at tale" = helps to speak', errorCode: 'INFGER' },
      { id: 'INFGER_016', question: 'Hun erklærede sig skyldig i ___ stjæle.', options: ['at', 'for at', '-ing'], correct: 'at', explanation: '"i at stjæle" = in stealing (but often used as gerund-like)', errorCode: 'INFGER' },
      { id: 'INFGER_017', question: 'Han bad om lov ___ gå hjem.', options: ['at', 'for at', 'til'], correct: 'at', explanation: '"lov at gå" = permission to go', errorCode: 'INFGER' },
      { id: 'INFGER_018', question: 'Det lykkedes ham ___ vinde løbet.', options: ['at', 'for at', '-ing'], correct: 'at', explanation: '"lykkedes at vinde" = managed to win', errorCode: 'INFGER' },
      { id: 'INFGER_019', question: 'Han fortsætter ___ arbejde.', options: ['med at', 'at', 'for at'], correct: 'med at', explanation: '"med at arbejde" = with working/to continue working', errorCode: 'INFGER' },
      { id: 'INFGER_020', question: 'Hun er glad ___ møde dig igen.', options: ['at', 'for at', 'over'], correct: 'at', explanation: '"glad at møde" = happy to meet', errorCode: 'INFGER' }
    ]
  },

  // === CATEGORY 12: NEGATION (Nægtelse) ===
  NEG: {
    name: 'Nægtelse (Negation)',
    description: 'ikke, aldrig, ingen, intet, ingenting, heller ikke',
    exercises: [
      { id: 'NEG_001', question: 'Jeg går ___ til mødet.', options: ['ikke', 'aldrig', 'ingen'], correct: 'ikke', explanation: '"ikke" = not (general negation)', errorCode: 'NEG' },
      { id: 'NEG_002', question: 'Han ___ kommer til møterne.', options: ['ikke', 'aldrig', 'ingen'], correct: 'aldrig', explanation: '"aldrig" = never (absolute negation)', errorCode: 'NEG' },
      { id: 'NEG_003', question: '___ mennesker kom til møtet.', options: ['Ingen', 'Ikke', 'Aldrig'], correct: 'Ingen', explanation: '"ingen" = no/none (people)', errorCode: 'NEG' },
      { id: 'NEG_004', question: 'Der var ___ tid til det.', options: ['intet', 'ikke', 'aldrig'], correct: 'intet', explanation: '"intet" = nothing (neuter)', errorCode: 'NEG' },
      { id: 'NEG_005', question: 'Jeg ___ ønsker at gå.', options: ['ikke', 'aldrig', 'ingen'], correct: 'ikke', explanation: '"ikke" = not (simple negation)', errorCode: 'NEG' },
      { id: 'NEG_006', question: 'Han har ___ været der.', options: ['ikke', 'aldrig', 'ingen'], correct: 'aldrig', explanation: '"aldrig" = never (has never been)', errorCode: 'NEG' },
      { id: 'NEG_007', question: 'Der er ___ luft i rummet.', options: ['ingen', 'ikke', 'intet'], correct: 'ingen', explanation: '"ingen luft" = no air', errorCode: 'NEG' },
      { id: 'NEG_008', question: 'Det er ___. Han kommer ___.', options: ['ikke noget | ikke', 'intet | aldrig', 'ingenting | ikke'], correct: 'ikke noget | ikke', explanation: '"ikke noget" = nothing special; "ikke" = will not come', errorCode: 'NEG' },
      { id: 'NEG_009', question: 'Jeg ønsker ___ at være alene.', options: ['ikke', 'aldrig', 'ingen'], correct: 'ikke', explanation: '"ikke at være" = not to be', errorCode: 'NEG' },
      { id: 'NEG_010', question: 'Han siger ___ til nogen.', options: ['intet', 'ikke', 'aldrig'], correct: 'intet', explanation: '"intet" = nothing (to anyone)', errorCode: 'NEG' },
      { id: 'NEG_011', question: 'Vi har ___ penge til det.', options: ['ingen', 'ikke', 'intet'], correct: 'ingen', explanation: '"ingen penge" = no money', errorCode: 'NEG' },
      { id: 'NEG_012', question: 'Jeg ___ kan lide det.', options: ['ikke', 'aldrig', 'ingen'], correct: 'ikke', explanation: '"ikke kan lide" = do not like', errorCode: 'NEG' },
      { id: 'NEG_013', question: 'Han er ___ interesseret i sport.', options: ['ikke', 'aldrig', 'ingen'], correct: 'ikke', explanation: '"ikke interesseret" = not interested', errorCode: 'NEG' },
      { id: 'NEG_014', question: 'Det hændt ___.', options: ['ingenting', 'intet', 'aldrig'], correct: 'ingenting', explanation: '"ingenting" = nothing/nothing happened', errorCode: 'NEG' },
      { id: 'NEG_015', question: 'Jeg spiste ___ i dag.', options: ['intet', 'ikke', 'aldrig'], correct: 'intet', explanation: '"intet" = nothing (ate nothing)', errorCode: 'NEG' },
      { id: 'NEG_016', question: 'Hun ___ ville tale med ham.', options: ['ikke', 'aldrig', 'ingen'], correct: 'ikke', explanation: '"ikke ville" = would not', errorCode: 'NEG' },
      { id: 'NEG_017', question: '___ kan gøre det bedre end han.', options: ['Ingen', 'Intet', 'Ikke'], correct: 'Ingen', explanation: '"ingen kan" = no one can', errorCode: 'NEG' },
      { id: 'NEG_018', question: 'Det var ___ hans skyld.', options: ['ikke', 'aldrig', 'ingen'], correct: 'ikke', explanation: '"ikke hans skyld" = not his fault', errorCode: 'NEG' },
      { id: 'NEG_019', question: 'Jeg ___ tror på det.', options: ['ikke', 'aldrig', 'ingen'], correct: 'ikke', explanation: '"ikke tror" = do not believe', errorCode: 'NEG' },
      { id: 'NEG_020', question: 'Vi har ___ hørt fra ham.', options: ['ikke', 'aldrig', 'intet'], correct: 'aldrig', explanation: '"aldrig hørt" = never heard', errorCode: 'NEG' }
    ]
  },

  // === CATEGORY 13: PREPOSITIONS (Præpositioner) ===
  PREP: {
    name: 'Præpositioner (Prepositions)',
    description: 'i, på, til, fra, med, uden, af, for, over, under, mellem, omkring',
    exercises: [
      { id: 'PREP_001', question: 'Jeg bor ___ København.', options: ['i', 'på'], correct: 'i', explanation: '"i København" = in Copenhagen', errorCode: 'PREP' },
      { id: 'PREP_002', question: 'Han arbejder ___ kontoret.', options: ['i', 'på'], correct: 'på', explanation: '"på kontoret" = at the office', errorCode: 'PREP' },
      { id: 'PREP_003', question: 'Vi mødes ___ mandag.', options: ['i', 'på'], correct: 'på', explanation: '"på mandag" = on Monday', errorCode: 'PREP' },
      { id: 'PREP_004', question: 'Hun kom ___ Sverige.', options: ['fra', 'til'], correct: 'fra', explanation: '"fra Sverige" = from Sweden', errorCode: 'PREP' },
      { id: 'PREP_005', question: 'Vi går ___ mødet nu.', options: ['til', 'i'], correct: 'til', explanation: '"til mødet" = to the meeting', errorCode: 'PREP' },
      { id: 'PREP_006', question: 'Han talte ___ hende meget venligt.', options: ['med', 'til'], correct: 'med', explanation: '"med hende" = with her', errorCode: 'PREP' },
      { id: 'PREP_007', question: 'Jeg kan ikke gøre det ___ hjælp.', options: ['uden', 'med'], correct: 'uden', explanation: '"uden hjælp" = without help', errorCode: 'PREP' },
      { id: 'PREP_008', question: 'Det er lavet ___ ham.', options: ['af', 'til'], correct: 'af', explanation: '"af ham" = by him (agent)', errorCode: 'PREP' },
      { id: 'PREP_009', question: 'Det er ___ mig.', options: ['for', 'til'], correct: 'for', explanation: '"for mig" = for me', errorCode: 'PREP' },
      { id: 'PREP_010', question: 'Bogen ligger ___ bordet.', options: ['under', 'på'], correct: 'under', explanation: '"under bordet" = under the table', errorCode: 'PREP' },
      { id: 'PREP_011', question: 'Huset ligger ___ to søer.', options: ['mellem', 'blandt'], correct: 'mellem', explanation: '"mellem to søer" = between two lakes', errorCode: 'PREP' },
      { id: 'PREP_012', question: 'Mennesker ___ huset var glade.', options: ['omkring', 'ved'], correct: 'omkring', explanation: '"omkring huset" = around the house', errorCode: 'PREP' },
      { id: 'PREP_013', question: 'Han står ___ døren.', options: ['ved', 'på'], correct: 'ved', explanation: '"ved døren" = by/at the door', errorCode: 'PREP' },
      { id: 'PREP_014', question: 'Vi talker ___ dansk.', options: ['i', 'på'], correct: 'på', explanation: '"på dansk" = in Danish (language)', errorCode: 'PREP' },
      { id: 'PREP_015', question: 'Møtet er ___ 10 til 12.', options: ['fra | til', 'i | til', 'på | til'], correct: 'fra | til', explanation: '"fra 10 til 12" = from 10 to 12', errorCode: 'PREP' },
      { id: 'PREP_016', question: 'Hun tror ___ Gud.', options: ['på', 'i'], correct: 'på', explanation: '"tror på" = believes in', errorCode: 'PREP' },
      { id: 'PREP_017', question: 'Katten ligger ___ sengen.', options: ['på', 'i'], correct: 'på', explanation: '"på sengen" = on the bed', errorCode: 'PREP' },
      { id: 'PREP_018', question: 'Han er gift ___ sin college.', options: ['med', 'til'], correct: 'med', explanation: '"gift med" = married to', errorCode: 'PREP' },
      { id: 'PREP_019', question: 'Vi arbejder ___ det hele dag.', options: ['med', 'på'], correct: 'med', explanation: '"arbejder med" = works with', errorCode: 'PREP' },
      { id: 'PREP_020', question: 'Det hus ligger ___ skogen.', options: ['ved', 'i'], correct: 'ved', explanation: '"ved skoven" = by the forest', errorCode: 'PREP' }
    ]
  },

  // === CATEGORY 14: REFLEXIVE VERBS (Reflexive constructions) ===
  REFL: {
    name: 'Refleksive verber (Reflexive Verbs)',
    description: 'sig, mig selv, dig selv, os selv, jer selv, hinanden, gensidigt',
    exercises: [
      { id: 'REFL_001', question: 'Han skyllede ___ af.', options: ['sig', 'ham', 'sig selv'], correct: 'sig', explanation: '"skyllede sig" = washed himself', errorCode: 'REFL' },
      { id: 'REFL_002', question: 'Hun ___ sig om sin søster.', options: ['bringer', 'bekymrer', 'tager'], correct: 'bekymrer', explanation: '"bekymrer sig" = worries/cares', errorCode: 'REFL' },
      { id: 'REFL_003', question: 'De klagte ___ deres arbejdsforhold.', options: ['over sig', 'over', 'sig over'], correct: 'over', explanation: '"klagede over" = complained about', errorCode: 'REFL' },
      { id: 'REFL_004', question: 'Han skamder ___ af sin opførsel.', options: ['sig', 'ham', 'mig'], correct: 'sig', explanation: '"skammer sig" = is ashamed', errorCode: 'REFL' },
      { id: 'REFL_005', question: 'Vi møder ___ hver dag.', options: ['os', 'hinanden', 'osself'], correct: 'os', explanation: '"møder os" = meet ourselves/each other', errorCode: 'REFL' },
      { id: 'REFL_006', question: 'De kigger ___ i øjnene.', options: ['hinanden i', 'sig i', 'os i'], correct: 'hinanden i', explanation: '"kigger hinanden i øjnene" = look each other in the eyes', errorCode: 'REFL' },
      { id: 'REFL_007', question: 'Han ___ sig selv i spejlet.', options: ['ser', 'kikket', 'sår'], correct: 'ser', explanation: '"ser sig selv" = sees himself', errorCode: 'REFL' },
      { id: 'REFL_008', question: 'Hun gav ___ selv øksebilsvar.', options: ['sig', 'ham', 'mig'], correct: 'sig', explanation: '"gav sig selv" = gave herself', errorCode: 'REFL' },
      { id: 'REFL_009', question: 'De holder ___ hånden.', options: ['hinanden i', 'sig i', 'os i'], correct: 'hinanden i', explanation: '"holder hinanden i hånden" = hold each other\'s hands', errorCode: 'REFL' },
      { id: 'REFL_010', question: 'Han forsvarer ___ selv.', options: ['sig', 'ham', 'mig'], correct: 'sig', explanation: '"forsvarer sig selv" = defends himself', errorCode: 'REFL' },
      { id: 'REFL_011', question: 'Vi elsker ___ til døden.', options: ['hinanden', 'os', 'sig'], correct: 'hinanden', explanation: '"elsker hinanden" = love each other', errorCode: 'REFL' },
      { id: 'REFL_012', question: 'Hun påklavede __  hende nye kjole.', options: ['sig', 'ham', 'mig'], correct: 'sig', explanation: '"påklædte sig" = dressed herself', errorCode: 'REFL' },
      { id: 'REFL_013', question: 'De slår ___ på ryggen.', options: ['hinanden', 'sig', 'os'], correct: 'hinanden', explanation: '"slår hinanden på ryggen" = pat each other on the back', errorCode: 'REFL' },
      { id: 'REFL_014', question: 'Han slog ___ selv.', options: ['sig', 'ham', 'mig'], correct: 'sig', explanation: '"slog sig selv" = hit himself', errorCode: 'REFL' },
      { id: 'REFL_015', question: 'Vi skændes ___ hele tiden.', options: ['med os', 'med hinanden', 'os'], correct: 'med hinanden', explanation: '"skændes med hinanden" = argue with each other', errorCode: 'REFL' },
      { id: 'REFL_016', question: 'Hun fandt ___ selv.', options: ['sig', 'ham', 'mig'], correct: 'sig', explanation: '"fandt sig selv" = found herself', errorCode: 'REFL' },
      { id: 'REFL_017', question: 'De omfavner ___ lykkelig.', options: ['hinanden', 'sig', 'os'], correct: 'hinanden', explanation: '"omfavner hinanden" = embrace each other', errorCode: 'REFL' },
      { id: 'REFL_018', question: 'Han skylder ___ selv.', options: ['sig', 'ham', 'mig'], correct: 'sig', explanation: '"skylder sig selv" = owes himself', errorCode: 'REFL' },
      { id: 'REFL_019', question: 'Vi hilser ___ venligt.', options: ['hinanden', 'os', 'sig'], correct: 'hinanden', explanation: '"hilser hinanden" = greet each other', errorCode: 'REFL' },
      { id: 'REFL_020', question: 'Hun talte til ___ selv.', options: ['sig', 'ham', 'mig'], correct: 'sig', explanation: '"talte til sig selv" = talked to herself', errorCode: 'REFL' }
    ]
  },

  // === CATEGORY 15: WORD CHOICE & IDIOMS (Ordvalg & Idiomer) ===
  IDI: {
    name: 'Idiomer & Ordvalg (Idioms & Phrases)',
    description: 'Danish idioms, phrases, expressions, word combinations',
    exercises: [
      { id: 'IDI_001', question: 'Det er ___ værk at lære dansk.', options: ['et stort', 'et godt', 'et svært'], correct: 'et stort', explanation: '"et stort værk" = a great work/undertaking', errorCode: 'IDI' },
      { id: 'IDI_002', question: 'Han arbejder ___ sjæl og hjerte.', options: ['med', 'for', 'hele'], correct: 'hele', explanation: '"hele sjæl og hjerte" = with all his heart and soul', errorCode: 'IDI' },
      { id: 'IDI_003', question: 'Det er ikke ___ dag at have møde.', options: ['en god', 'en dårlig', 'en slette'], correct: 'en god', explanation: '"det er ikke en god dag" = it\'s not a good day', errorCode: 'IDI' },
      { id: 'IDI_004', question: 'Hun løb så ___ som en hjort.', options: ['hurtigt', 'stærkt', 'vildt'], correct: 'hurtigt', explanation: '"hurtigt som en hjort" = quick as a deer', errorCode: 'IDI' },
      { id: 'IDI_005', question: 'Vi skal ___ hånd ___ hånd i dag.', options: ['holde | i', 'give | i', 'tage | af'], correct: 'holde | i', explanation: '"holde hånd i hånd" = hold hands', errorCode: 'IDI' },
      { id: 'IDI_006', question: 'Det var ___ i bolden.', options: ['helt ved siden af', 'helt ved siden', 'uden for'], correct: 'helt ved siden af', explanation: '"helt ved siden af" = completely beside the point', errorCode: 'IDI' },
      { id: 'IDI_007', question: 'Han sagde det direkte _____.', options: ['i øjet på hende', 'i hendes ansigt', 'til hendes øje'], correct: 'i øjet på hende', explanation: '"i øjet på hende" = to her face/directly', errorCode: 'IDI' },
      { id: 'IDI_008', question: 'Det ligger mig ikke ___.', options: ['til hjerte', 'på hjertet', 'til sinds'], correct: 'til hjerte', explanation: '"ligger mig til hjerte" = I care about it', errorCode: 'IDI' },
      { id: 'IDI_009', question: 'Hun er fra toppen af ___ til tåserne.', options: ['hovedet | foden', 'håret | benene', 'øjet | tåen'], correct: 'hovedet | foden', explanation: '"fra hovedet til foden" = from head to toe', errorCode: 'IDI' },
      { id: 'IDI_010', question: 'Det er bare en _____ under vandet.', options: ['dråbe | i havet', 'dråbe | i vandet', 'draabe | i havet'], correct: 'dråbe | i havet', explanation: '"bare en dråbe i havet" = just a drop in the ocean', errorCode: 'IDI' },
      { id: 'IDI_011', question: 'Han tabte ___ over han.', options: ['sit sind', 'sin Sans', 'sit hoved'], correct: 'sit sind', explanation: '"tabte sit sind" = lost his mind', errorCode: 'IDI' },
      { id: 'IDI_012', question: 'Vi må ___ på samme side.', options: ['stå sammen', 'være enig', 'tage sammen'], correct: 'stå sammen', explanation: '"stå sammen" = stand together', errorCode: 'IDI' },
      { id: 'IDI_013', question: 'Hun giver aldrig ___.', options: ['op', 'efter', 'tilbage'], correct: 'op', explanation: '"giver aldrig op" = never gives up', errorCode: 'IDI' },
      { id: 'IDI_014', question: 'Det ligger langt _____.', options: ['bagved', 'derfra', 'fra'], correct: 'bagved', explanation: '"ligger langt bagved" = falls far behind', errorCode: 'IDI' },
      { id: 'IDI_015', question: 'Han tager det med _____.', options: ['ophøjet sind', 'højt sind', 'godt mod'], correct: 'ophøjet sind', explanation: '"med ophøjet sind" = with dignity', errorCode: 'IDI' },
      { id: 'IDI_016', question: 'Vi skal ikke _____ ned til niveauet.', options: ['gå', 'falde', 'sjudre'], correct: 'gå', explanation: '"gå ned til niveauet" = stoop to that level', errorCode: 'IDI' },
      { id: 'IDI_017', question: 'Hun er glad _____.', options: ['op til øjne', 'til øjne', 'op til det hele'], correct: 'op til øjne', explanation: '"glad op til øjne" = beaming with joy', errorCode: 'IDI' },
      { id: 'IDI_018', question: 'Det ligger helt uden for _____.', options: ['min evne', 'mig', 'min kraft'], correct: 'min evne', explanation: '"uden for min evne" = beyond my ability', errorCode: 'IDI' },
      { id: 'IDI_019', question: 'Han drømmer højtud med _____.', options: ['åbne øjne', 'åbent øje', 'åben øje'], correct: 'åbne øjne', explanation: '"med åbne øjne" = with open eyes/knowingly', errorCode: 'IDI' },
      { id: 'IDI_020', question: 'Det ligger helt uden for _____.', options: ['min forståelse', 'min sans', 'min evne'], correct: 'min forståelse', explanation: '"uden for min forståelse" = beyond my comprehension', errorCode: 'IDI' }
    ]
  }
};

// ---------------------------------------------------------------------------
// PHASE 4 MERGE (additive, runtime)
// Phase 4 exercises live in their own file and are appended into the matching
// category here. This is deliberately additive: nothing in the 300 baseline
// above is rewritten or removed. Unknown categories and duplicate ids are
// skipped rather than silently overwriting anything.
// ---------------------------------------------------------------------------
for (const [category, incoming] of Object.entries(phase4NewExercises)) {
  const target = completeGrammarExercises[category];
  if (!target) {
    console.warn(`[phase4] unknown category "${category}" — skipped`);
    continue;
  }
  const seen = new Set(target.exercises.map((ex) => ex.id));
  for (const ex of incoming) {
    if (seen.has(ex.id)) continue;
    seen.add(ex.id);
    target.exercises.push(ex);
  }
}

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
