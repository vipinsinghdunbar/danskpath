/**
 * Complete Danish Grammar Exercise Database
 * 9 categories x 10+ exercises each = comprehensive practice
 */

export const grammarExercises = {
  ORD: {
    name: 'Ordstilling (Word Order)',
    description: 'V2, main/subordinate clauses, fronting, adverbial placement',
    exercises: [
      {
        id: 'ORD_001',
        question: 'Jeg ___ ikke til mødet i dag. (gå)',
        options: ['gå', 'går', 'gik'],
        correct: 'går',
        explanation: 'Main clause: V2 (verb second). Subject + verb = present tense',
        errorCode: 'ORD'
      },
      {
        id: 'ORD_002',
        question: 'Fordi jeg ___ syg, kan jeg ikke komme.',
        options: ['er', 'var', 'været'],
        correct: 'er',
        explanation: 'Subordinate clause with present tense. Verb placement does not change',
        errorCode: 'ORD'
      },
      {
        id: 'ORD_003',
        question: 'I morgen ___ vi til København.',
        options: ['tager', 'skal tage', 'tager vi'],
        correct: 'tager',
        explanation: 'Fronted time expression (I morgen) → V2 rule. Verb must be in position 2',
        errorCode: 'ORD'
      },
      {
        id: 'ORD_004',
        question: 'Han ___ aldrig til arbejde med bus.',
        options: ['går', 'tager', 'kører'],
        correct: 'tager',
        explanation: 'Central adverbial (aldrig) placement. V + adverbial + object',
        errorCode: 'ORD'
      },
      {
        id: 'ORD_005',
        question: 'Hvornår ___ du hjem fra mødet?',
        options: ['kommer', 'kommer du', 'du kommer'],
        correct: 'kommer',
        explanation: 'Question word (fronted) → inversion. V2 in questions too',
        errorCode: 'ORD'
      },
      {
        id: 'ORD_006',
        question: 'Jeg ved, at hun ___ til festen.',
        options: ['kommer', 'kom', 'vil komme'],
        correct: 'kommer',
        explanation: 'Subordinate clause: verb at end is NOT required after "at". Present tense',
        errorCode: 'ORD'
      },
      {
        id: 'ORD_007',
        question: 'Han siger, ___ han ikke kan møde dig.',
        options: ['at', 'hvis', 'når'],
        correct: 'at',
        explanation: 'Reported speech marker. "at" introduces the reported clause',
        errorCode: 'ORD'
      },
      {
        id: 'ORD_008',
        question: 'Hvis du kommer, ___ jeg glad.',
        options: ['er', 'vil være', 'er jeg'],
        correct: 'er',
        explanation: 'Conditional clause. Main clause still follows V2',
        errorCode: 'ORD'
      },
      {
        id: 'ORD_009',
        question: 'Det er vigtigt, ___ du kommer til tiden.',
        options: ['at', 'som', 'der'],
        correct: 'at',
        explanation: 'Infinitive marker before verb in formal construction',
        errorCode: 'ORD'
      },
      {
        id: 'ORD_010',
        question: 'Kun Hans ___ det nye projekt.',
        options: ['leder', 'skal lede', 'leder projektet'],
        correct: 'leder',
        explanation: 'Fronted adverbial (Kun) → V2. Central adverbial after verb',
        errorCode: 'ORD'
      }
    ]
  },

  PRÆ: {
    name: 'Præpositioner (Prepositions)',
    description: 'i vs på, location vs direction, time expressions',
    exercises: [
      {
        id: 'PRÆ_001',
        question: 'Han arbejder ___ kontoret.',
        options: ['i', 'på'],
        correct: 'på',
        explanation: 'Location at a place of work uses "på". i = enclosed space',
        errorCode: 'PRÆ'
      },
      {
        id: 'PRÆ_002',
        question: 'Vi mødes ___ København næste uge.',
        options: ['i', 'på'],
        correct: 'i',
        explanation: 'Cities use "i" (in the city). på is used for institutions',
        errorCode: 'PRÆ'
      },
      {
        id: 'PRÆ_003',
        question: 'Mødet er ___ mandag.',
        options: ['i', 'på'],
        correct: 'på',
        explanation: 'Days of the week use "på" for specific timing',
        errorCode: 'PRÆ'
      },
      {
        id: 'PRÆ_004',
        question: 'Hun bor ___ København.',
        options: ['i', 'på'],
        correct: 'i',
        explanation: 'Residential location in a city uses "i"',
        errorCode: 'PRÆ'
      },
      {
        id: 'PRÆ_005',
        question: 'Gå ___ biblioteket og hent bogen.',
        options: ['i', 'til'],
        correct: 'i',
        explanation: 'Direction into an enclosed space uses "i" (going into the library)',
        errorCode: 'PRÆ'
      },
      {
        id: 'PRÆ_006',
        question: 'Vi skal ___ mødet ___ 10 minutter.',
        options: ['på | om', 'i | på', 'til | i'],
        correct: 'på | om',
        explanation: 'på mødet (at the meeting) + om 10 minutter (in 10 minutes)',
        errorCode: 'PRÆ'
      },
      {
        id: 'PRÆ_007',
        question: 'Det er nok ___ dag.',
        options: ['en', 'i', 'på'],
        correct: 'en',
        explanation: 'Articles: "en dag" (a day). Not a preposition needed here',
        errorCode: 'PRÆ'
      },
      {
        id: 'PRÆ_008',
        question: 'Hun taler ___ engelsk og dansk.',
        options: ['på', 'med', 'i'],
        correct: 'på',
        explanation: '"tale på" = speak in (a language)',
        errorCode: 'PRÆ'
      },
      {
        id: 'PRÆ_009',
        question: 'Vi arbejder ___ projektet ___ tre timer.',
        options: ['med | i', 'på | for', 'med | på'],
        correct: 'med | i',
        explanation: 'arbejde med (work with) + i tre timer (for three hours)',
        errorCode: 'PRÆ'
      },
      {
        id: 'PRÆ_010',
        question: 'Jeg skal ____ arbejde klokken 8.',
        options: ['på', 'til'],
        correct: 'til',
        explanation: 'til arbejde = to work. Direction to a place',
        errorCode: 'PRÆ'
      }
    ]
  },

  BØJ: {
    name: 'Bøjning (Inflection & Agreement)',
    description: 'Adjective agreement, definite/indefinite, plurals, double definiteness',
    exercises: [
      {
        id: 'BØJ_001',
        question: 'Han er en ___ mand. (høj)',
        options: ['høj', 'højt', 'høje'],
        correct: 'høj',
        explanation: 'Indefinite singular (en mand) → base form "høj"',
        errorCode: 'BØJ'
      },
      {
        id: 'BØJ_002',
        question: 'Det er et ___ hus. (stor)',
        options: ['stor', 'stort', 'store'],
        correct: 'stort',
        explanation: 'Neuter (et) + adjective → add -t ending',
        errorCode: 'BØJ'
      },
      {
        id: 'BØJ_003',
        question: 'Hun har ___ øjne. (blå)',
        options: ['blå', 'blåt', 'blåe'],
        correct: 'blå',
        explanation: 'Plural + definite → no change for blå (invariant color)',
        errorCode: 'BØJ'
      },
      {
        id: 'BØJ_004',
        question: 'De er ___ mennesker. (venlig)',
        options: ['venlig', 'venligt', 'venlige'],
        correct: 'venlige',
        explanation: 'Plural → add -e ending',
        errorCode: 'BØJ'
      },
      {
        id: 'BØJ_005',
        question: 'Den ___ dreng er her. (ung)',
        options: ['ung', 'ungt', 'unge'],
        correct: 'unge',
        explanation: 'Definite (den) + plural → -e ending',
        errorCode: 'BØJ'
      },
      {
        id: 'BØJ_006',
        question: 'Jeg har ___ biler. (tre)',
        options: ['bil', 'biler'],
        correct: 'biler',
        explanation: 'Plural of "bil" = "biler"',
        errorCode: 'BØJ'
      },
      {
        id: 'BØJ_007',
        question: 'Det ___ projekt var svært. (ny)',
        options: ['ny', 'nyt', 'nye'],
        correct: 'nye',
        explanation: 'Definite form "det nye projekt" (double definiteness with det + adjective)',
        errorCode: 'BØJ'
      },
      {
        id: 'BØJ_008',
        question: 'Hun køber ___ dage hvert billetter. (tre)',
        options: ['tre', 'tredie', 'tredive'],
        correct: 'tre',
        explanation: 'Cardinal number "tre" with plural noun',
        errorCode: 'BØJ'
      },
      {
        id: 'BØJ_009',
        question: 'Den ___ kvinde hedder Anna. (dansk)',
        options: ['dansk', 'danskt', 'danske'],
        correct: 'danske',
        explanation: 'Definite singular feminine → -e ending. Exception: "-sk" words',
        errorCode: 'BØJ'
      },
      {
        id: 'BØJ_010',
        question: 'Et ___ og en ___ bil. (rødt, røde)',
        options: ['rødt | røde', 'røde | rødt', 'rødt | rødt'],
        correct: 'rødt | røde',
        explanation: 'Neuter singular (et hus) + common plural (biler). Agreement required',
        errorCode: 'BØJ'
      }
    ]
  },

  TID: {
    name: 'Tempus (Tense & Verb Forms)',
    description: 'Present, past, perfect, strong verbs, future constructions',
    exercises: [
      {
        id: 'TID_001',
        question: 'Han ___ til arbejde hver dag. (gå)',
        options: ['går', 'gik', 'går går'],
        correct: 'går',
        explanation: 'Habitual present: regularly goes to work. Present tense',
        errorCode: 'TID'
      },
      {
        id: 'TID_002',
        question: 'Jeg ___ din email igår. (læse)',
        options: ['leste', 'læste', 'læst'],
        correct: 'læste',
        explanation: 'Regular verb, past tense. Stem "læs" + -te ending',
        errorCode: 'TID'
      },
      {
        id: 'TID_003',
        question: 'Han ___ til Århus for en uge siden. (køre)',
        options: ['kørte', 'kørt', 'køre'],
        correct: 'kørte',
        explanation: 'Past tense of regular verb køre. -te ending',
        errorCode: 'TID'
      },
      {
        id: 'TID_004',
        question: 'Jeg ___ aldrig været til Rom. (være)',
        options: ['er', 'var', 'been'],
        correct: 'er',
        explanation: 'Present perfect with "har" or "er". This uses "er"',
        errorCode: 'TID'
      },
      {
        id: 'TID_005',
        question: 'Hun ___ allerede hjemme. (være)',
        options: ['er', 'var', 'var været'],
        correct: 'er',
        explanation: 'Simple present describing current state',
        errorCode: 'TID'
      },
      {
        id: 'TID_006',
        question: 'Vi ___ mødet sidste fredag. (holde)',
        options: ['holdt', 'hold', 'holder'],
        correct: 'holdt',
        explanation: 'Strong verb "holde" → past "holdt"',
        errorCode: 'TID'
      },
      {
        id: 'TID_007',
        question: 'Han ___ aldrig set sådan noget. (have)',
        options: ['har', 'havde', 'have'],
        correct: 'har',
        explanation: 'Present perfect: "har" + past participle "set"',
        errorCode: 'TID'
      },
      {
        id: 'TID_008',
        question: 'Når du kommer, ___ jeg spise. (skulle)',
        options: ['skal', 'skulle', 'vil'],
        correct: 'skal',
        explanation: 'Future with "skal" in present tense context',
        errorCode: 'TID'
      },
      {
        id: 'TID_009',
        question: 'Hun ___ præsentationen gort før mødet. (gøre)',
        options: ['gjorde', 'gjort', 'gøre'],
        correct: 'gjorde',
        explanation: 'Irregular past: "gøre" → "gjorde"',
        errorCode: 'TID'
      },
      {
        id: 'TID_010',
        question: 'Vi ___ været til mødet klokken 9. (være)',
        options: ['skulle', 'var', 'ville'],
        correct: 'skulle',
        explanation: 'Past modal: "skulle" (was supposed to) + infinitive',
        errorCode: 'TID'
      }
    ]
  },

  VALG: {
    name: 'Ordvalg (Word Choice & Collocation)',
    description: 'Common phrases, register, collocations, synonyms',
    exercises: [
      {
        id: 'VALG_001',
        question: 'Jeg skal ___ til mødet. (gå/deltage/tage)',
        options: ['gå', 'deltage i', 'tage til'],
        correct: 'deltage i',
        explanation: 'Correct collocation: "deltage i mødet" (participate in the meeting)',
        errorCode: 'VALG'
      },
      {
        id: 'VALG_002',
        question: 'Hun ___ et møde hver mandag. (afholder/holder/gør)',
        options: ['afholder', 'holder', 'gør'],
        correct: 'afholder',
        explanation: 'Professional collocation: "afholder møde" (holds a meeting)',
        errorCode: 'VALG'
      },
      {
        id: 'VALG_003',
        question: 'Vi ___ en god løsning på problemet. (fandt/opfandt/finde)',
        options: ['fandt', 'opfandt', 'finde'],
        correct: 'fandt',
        explanation: 'Find a solution = "finde" (not opfinde=invent). Past tense',
        errorCode: 'VALG'
      },
      {
        id: 'VALG_004',
        question: 'Det er ikke muligt at ___ mødet. (aflægge/aflyse/ændre)',
        options: ['aflægge', 'aflyse', 'ændre'],
        correct: 'aflyse',
        explanation: '"Aflyse mødet" = cancel the meeting',
        errorCode: 'VALG'
      },
      {
        id: 'VALG_005',
        question: 'Jeg ___ ikke mening med det. (har/ser/har set)',
        options: ['har', 'ser', 'har set'],
        correct: 'har',
        explanation: '"Have mening" = make sense. Present tense',
        errorCode: 'VALG'
      },
      {
        id: 'VALG_006',
        question: 'Han ___ meget stort på det projekt. (arbejder/lægger vægt/fører)',
        options: ['arbejder', 'lægger vægt', 'fører'],
        correct: 'lægger vægt',
        explanation: '"Lægge vægt på" = place importance on',
        errorCode: 'VALG'
      },
      {
        id: 'VALG_007',
        question: 'Vi skal ___ på hinanden. (stole/tro/lide)',
        options: ['stole', 'tro', 'lide'],
        correct: 'stole',
        explanation: '"Stole på" = trust/rely on',
        errorCode: 'VALG'
      },
      {
        id: 'VALG_008',
        question: 'Han er meget ___ i sit arbejde. (interessant/interesseret/interessing)',
        options: ['interessant', 'interesseret', 'interessing'],
        correct: 'interesseret',
        explanation: '"Være interesseret i" = be interested in',
        errorCode: 'VALG'
      },
      {
        id: 'VALG_009',
        question: 'Vi skal ___ ordet til direktøren. (tage/give/sige)',
        options: ['tage', 'give', 'sige'],
        correct: 'give',
        explanation: '"Give ordet" = give the floor/word to someone',
        errorCode: 'VALG'
      },
      {
        id: 'VALG_010',
        question: 'Det er vigtigt at ___ tiden. (holde/følge/respektere)',
        options: ['holde', 'følge', 'respektere'],
        correct: 'holde',
        explanation: '"Holde tiden" = keep to the schedule/be on time',
        errorCode: 'VALG'
      }
    ]
  },

  KØN: {
    name: 'Køn (Noun Gender)',
    description: 'en vs et distinction, patterns, irregulars',
    exercises: [
      {
        id: 'KØN_001',
        question: '___ mand er her.',
        options: ['En', 'Et'],
        correct: 'En',
        explanation: 'mand (man) is common gender → en',
        errorCode: 'KØN'
      },
      {
        id: 'KØN_002',
        question: '___ hus er stort.',
        options: ['En', 'Et'],
        correct: 'Et',
        explanation: 'hus (house) is neuter gender → et',
        errorCode: 'KØN'
      },
      {
        id: 'KØN_003',
        question: '___ projekt skal gøres.',
        options: ['En', 'Et'],
        correct: 'Et',
        explanation: 'projekt (project) ends in -t sound → neuter → et',
        errorCode: 'KØN'
      },
      {
        id: 'KØN_004',
        question: '___ møde er vigtig.',
        options: ['En', 'Et'],
        correct: 'Et',
        explanation: 'møde (meeting) is neuter → et',
        errorCode: 'KØN'
      },
      {
        id: 'KØN_005',
        question: '___ email kom i dag.',
        options: ['En', 'Et'],
        correct: 'En',
        explanation: 'email is typically common gender (loanword) → en',
        errorCode: 'KØN'
      },
      {
        id: 'KØN_006',
        question: '___ bok ligger på bordet.',
        options: ['En', 'Et'],
        correct: 'En',
        explanation: 'bog (book) is common gender → en',
        errorCode: 'KØN'
      },
      {
        id: 'KØN_007',
        question: '___ dag er lang.',
        options: ['En', 'Et'],
        correct: 'En',
        explanation: 'dag (day) is common gender → en',
        errorCode: 'KØN'
      },
      {
        id: 'KØN_008',
        question: '___ bord er brunt.',
        options: ['En', 'Et'],
        correct: 'Et',
        explanation: 'bord (table) is neuter → et',
        errorCode: 'KØN'
      },
      {
        id: 'KØN_009',
        question: '___ stol er ny.',
        options: ['En', 'Et'],
        correct: 'En',
        explanation: 'stol (chair) is common gender → en',
        errorCode: 'KØN'
      },
      {
        id: 'KØN_010',
        question: '___ vindue er åbent.',
        options: ['En', 'Et'],
        correct: 'Et',
        explanation: 'vindue (window) is neuter → et',
        errorCode: 'KØN'
      }
    ]
  },

  STAV: {
    name: 'Stavning (Spelling)',
    description: 'Double consonants, vowel distinctions, common errors',
    exercises: [
      {
        id: 'STAV_001',
        question: 'Korrekt stavning: ___ (mand singular)',
        options: ['mand', 'mann', 'mande'],
        correct: 'mand',
        explanation: 'Danish uses single consonant in "mand". Not German "Mann"',
        errorCode: 'STAV'
      },
      {
        id: 'STAV_002',
        question: 'Korrekt stavning af mangler ordendelt: ___',
        options: ['møde', 'møte', 'moede'],
        correct: 'møde',
        explanation: 'ø is a single vowel character (not oe). møde (meeting)',
        errorCode: 'STAV'
      },
      {
        id: 'STAV_003',
        question: 'Plural af "mand" er: ___',
        options: ['mander', 'mnd', 'mænde'],
        correct: 'mander',
        explanation: 'Regular plural adds -er after single consonant',
        errorCode: 'STAV'
      },
      {
        id: 'STAV_004',
        question: 'Korrekt stavning: ___ (far)',
        options: ['fader', 'faer', 'far'],
        correct: 'fader',
        explanation: 'Plural of "far" (father) → "fader"',
        errorCode: 'STAV'
      },
      {
        id: 'STAV_005',
        question: 'Stavningen af tal fem: ___',
        options: ['fem', 'fem', 'femm'],
        correct: 'fem',
        explanation: 'fem (five) with single m',
        errorCode: 'STAV'
      },
      {
        id: 'STAV_006',
        question: 'Når vi fordobler stavelse: "sige" → "___"',
        options: ['sige', 'sigge', 'siige'],
        correct: 'sige',
        explanation: 'No doubling in Danish "sige" (say). Keep single consonant',
        errorCode: 'STAV'
      },
      {
        id: 'STAV_007',
        question: 'Stavning: ___ (god)',
        options: ['god', 'godd', 'godt'],
        correct: 'god',
        explanation: 'Common gender singular "god" (good) - base form',
        errorCode: 'STAV'
      },
      {
        id: 'STAV_008',
        question: 'Stavning af kjole: ___',
        options: ['kjole', 'chola', 'kjolee'],
        correct: 'kjole',
        explanation: 'Danish dress word: kjole (kj + ole)',
        errorCode: 'STAV'
      },
      {
        id: 'STAV_009',
        question: 'Pluralform af "kvinde": ___',
        options: ['kvinder', 'kvinnder', 'kvinderne'],
        correct: 'kvinder',
        explanation: 'Plural "kvinder" from "kvinde" (woman)',
        errorCode: 'STAV'
      },
      {
        id: 'STAV_010',
        question: 'Korrekt stavning: ___ (år)',
        options: ['år', 'aar', 'aaar'],
        correct: 'år',
        explanation: 'Danish year: år (å is one vowel character)',
        errorCode: 'STAV'
      }
    ]
  },

  REG: {
    name: 'Register (Formal/Informal Style)',
    description: 'Workplace communication, politeness, formality levels',
    exercises: [
      {
        id: 'REG_001',
        question: 'I formelt møde, hvad siger du? ___',
        options: ['Hej!', 'Goddag!', 'Hallo!'],
        correct: 'Goddag!',
        explanation: '"Goddag" is formal greeting. "Hej" is informal',
        errorCode: 'REG'
      },
      {
        id: 'REG_002',
        question: 'Til direktøren siger du: "___"',
        options: ['Hej Lars!', 'Goddag, Directør', 'Har du tid?'],
        correct: 'Goddag, Directør',
        explanation: 'Formal address with title. Avoid first name only',
        errorCode: 'REG'
      },
      {
        id: 'REG_003',
        question: 'Arbejdsmail afsluttes: ___',
        options: ['Hilsen', 'XOXO', 'Hej'],
        correct: 'Hilsen',
        explanation: '"Hilsen" (Regards) is standard formal closing',
        errorCode: 'REG'
      },
      {
        id: 'REG_004',
        question: 'Uformel: "Du skal komme" → Formel: "___"',
        options: ['De skal komme', 'I skal komme', 'Han skal komme'],
        correct: 'De skal komme',
        explanation: 'Formal "De" (capital D) for polite address',
        errorCode: 'REG'
      },
      {
        id: 'REG_005',
        question: 'I mødet, uformel: "Nej, jeg vil ikke" → Formel: "___"',
        options: ['Nej, jeg kan ikke acceptere det', 'Nej selvfølgelig ikke', 'Nej det passer ikke'],
        correct: 'Nej, jeg kan ikke acceptere det',
        explanation: 'More diplomatic and formal phrasing in professional setting',
        errorCode: 'REG'
      },
      {
        id: 'REG_006',
        question: 'Uformel: "Hvad vil du?" → Formel: "___"',
        options: ['Hvad kan jeg gøre for Dem?', 'Hvad ønsker du?', 'Hvad skal det være?'],
        correct: 'Hvad kan jeg gøre for Dem?',
        explanation: 'Formal: offer help with "for Dem" (capital D)',
        errorCode: 'REG'
      },
      {
        id: 'REG_007',
        question: 'I casual vengroup: "Var det sjovt?" → I møde: "___"',
        options: ['Var det godt?', 'Var det interessant?', 'Var det okay?'],
        correct: 'Var det interessant?',
        explanation: '"Interessant" is more formal/professional than "sjovt"',
        errorCode: 'REG'
      },
      {
        id: 'REG_008',
        question: 'Uformel: "Det ville være mega cool" → Formel: "___"',
        options: ['Det ville være meget interessant', 'Det skulle være sjovt', 'Det var fedt'],
        correct: 'Det ville være meget interessant',
        explanation: 'Replace slang with formal vocabulary',
        errorCode: 'REG'
      },
      {
        id: 'REG_009',
        question: 'I email til ukendt person: ___',
        options: ['Hej', 'Goddag', 'Hallo'],
        correct: 'Goddag',
        explanation: '"Goddag" for formal/unknown recipients',
        errorCode: 'REG'
      },
      {
        id: 'REG_010',
        question: 'Arbejdsmøde slutter: "Vi mødes ___"',
        options: ['i morgen igen!', 'næste onsdag igen', 'snart igen!'],
        correct: 'næste onsdag igen',
        explanation: 'Specific, formal timing. Avoid casual "i morgen igen"',
        errorCode: 'REG'
      }
    ]
  },

  UDT: {
    name: 'Udtale (Pronunciation)',
    description: 'Stød, soft d, vowels, reduction, sound patterns',
    exercises: [
      {
        id: 'UDT_001',
        question: 'Stød på: ___',
        options: ['hund', 'hun', 'hand'],
        correct: 'hun',
        explanation: 'hun (she) has stød. hund (dog) does not',
        errorCode: 'UDT'
      },
      {
        id: 'UDT_002',
        question: 'Blødt "d" på: ___',
        options: ['mad', 'gave', 'gade'],
        correct: 'gade',
        explanation: 'gade (street): d between vowels becomes [ð] soft',
        errorCode: 'UDT'
      },
      {
        id: 'UDT_003',
        question: 'Tal som udtales: "fem" [fem], "ni" [_]',
        options: ['[ni]', '[nʊ]', '[ny]'],
        correct: '[ny]',
        explanation: 'ni (nine) has rounded front vowel [y]',
        errorCode: 'UDT'
      },
      {
        id: 'UDT_004',
        question: 'Ordet "købe" udtales med:',
        options: ['open [ø]', 'rounded [ø]', '[ɔ]'],
        correct: 'rounded [ø]',
        explanation: 'købe (buy): ø is rounded front vowel',
        errorCode: 'UDT'
      },
      {
        id: 'UDT_005',
        question: 'Ordet "mand" reduceres som: "maⁿ" eller ___',
        options: ['"mand"', '"man"', '"mɑ̃"'],
        correct: '"man"',
        explanation: 'Reduction: final -nd reduces to nasal -n sound',
        errorCode: 'UDT'
      },
      {
        id: 'UDT_006',
        question: 'Ordet "ikke" udtales helt kort: ___',
        options: ['[ˈɪɡ̚ə]', '[ɪk]', '[ɪkə]'],
        correct: '[ɪk]',
        explanation: 'ikke reduces to just [ɪk] in normal speech',
        errorCode: 'UDT'
      },
      {
        id: 'UDT_007',
        question: 'Ordet "mig" udtales:',
        options: ['[mɛj]', '[mɪ]', '[maj]'],
        correct: '[maj]',
        explanation: 'mig has diphthong [aj]',
        errorCode: 'UDT'
      },
      {
        id: 'UDT_008',
        question: 'R-lyd i dansk er:',
        options: ['alveolar trill', 'uvular', 'tap'],
        correct: 'uvular',
        explanation: 'Danish r is uvular [ʁ], not alveolar',
        errorCode: 'UDT'
      },
      {
        id: 'UDT_009',
        question: 'Ordet "det er" reduceres: "det er" → "___"',
        options: ['[det ɛʁ]', '[də ɛʁ]', '[dæ ɛʁ]'],
        correct: '[də ɛʁ]',
        explanation: 'Schwa reduction: det → [də]',
        errorCode: 'UDT'
      },
      {
        id: 'UDT_010',
        question: 'Stød markeres på:',
        options: ['kort stavelse', 'lang stavelse', 'begge'],
        correct: 'kort stavelse',
        explanation: 'Stød appears on short syllables (stressed syllable)',
        errorCode: 'UDT'
      }
    ]
  }
};

export function getExercisesByCategory(category) {
  return grammarExercises[category]?.exercises || [];
}

export function getRandomExercise(category) {
  const exercises = getExercisesByCategory(category);
  return exercises[Math.floor(Math.random() * exercises.length)];
}

export function getAllCategories() {
  return Object.entries(grammarExercises).map(([code, data]) => ({
    code,
    name: data.name,
    description: data.description,
    count: data.exercises.length
  }));
}
