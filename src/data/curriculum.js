// DanskPath Curriculum — Real CEFR-aligned exercises
// Organized by module (1-5), difficulty (easy/medium/hard), and exercise type
// Based on CEFR framework: A1 → A2 → B1 → B2 → B2+

export const curriculumData = {
  1: {
    name: 'Modul 1',
    level: 'A1',
    description: 'Introductory Danish: greetings, basic pronouns, simple present tense',
    grammarTopics: ['Pronouns', 'Present Tense', 'Verb Conjugation', 'Simple Sentences'],
    vocab: [
      { danish: 'Hej', english: 'Hello', category: 'Greetings' },
      { danish: 'Mit navn er...', english: 'My name is...', category: 'Greetings' },
      { danish: 'Jeg', english: 'I', category: 'Pronouns' },
      { danish: 'Du', english: 'You (informal)', category: 'Pronouns' },
      { danish: 'Han', english: 'He', category: 'Pronouns' },
      { danish: 'Hun', english: 'She', category: 'Pronouns' },
      { danish: 'Vi', english: 'We', category: 'Pronouns' },
      { danish: 'Være', english: 'To be', category: 'Verbs' },
      { danish: 'Have', english: 'To have', category: 'Verbs' },
      { danish: 'Arbejde', english: 'To work', category: 'Verbs' },
    ],
    exercises: {
      grammar: {
        easy: [
          { id: 1, type: 'choice', question: 'Hvilket pronomen mangler? ___ hedder Anna.', options: ['Jeg', 'Du', 'Hun', 'De'], answer: 'Hun', explanation: 'Hun (she) matches the female name Anna' },
          { id: 2, type: 'fill-blank', question: 'Jeg ___ dansk. (at være)', answer: 'er', explanation: 'Present tense: jeg er' },
          { id: 3, type: 'choice', question: 'Hvad betyder "Hej"?', options: ['Goodbye', 'Hello', 'Thank you', 'Sorry'], answer: 'Hello', explanation: 'Hej is a casual greeting' },
          { id: 4, type: 'fill-blank', question: '___ har en hund. (pronoun)', answer: 'Han', explanation: 'Han (he) is the correct subject pronoun' },
          { id: 5, type: 'choice', question: 'Hun ___ programmør.', options: ['er', 'har', 'arbejder', 'hedder'], answer: 'er', explanation: 'Use "er" (is) to describe profession' },
        ],
        medium: [
          { id: 6, type: 'write', question: 'Oversæt: "I am a student" til dansk.', answer: 'Jeg er studerende.', explanation: 'Jeg (I) + er (am) + studerende (student)' },
          { id: 7, type: 'fill-blank', question: 'Vi ___ fra Danmark. (at være)', answer: 'er', explanation: 'Vi er (we are)' },
          { id: 8, type: 'choice', question: 'Hvilket ord betyder "job"?', options: ['Arbejde', 'Skole', 'Hus', 'Bil'], answer: 'Arbejde', explanation: 'Arbejde = work/job' },
          { id: 9, type: 'fill-blank', question: 'De ___ engelske lærere. (pronoun + verb)', answer: 'er', explanation: 'De er (they are) English teachers' },
          { id: 10, type: 'choice', question: 'Jeg ___ 25 år.', options: ['er', 'have', 'har', 'arbejder'], answer: 'er', explanation: 'Use "er" for age, not "har"' },
        ],
        hard: [
          { id: 11, type: 'write', question: 'Skriv en sætning: "My name is ... and I am a ..."', answer: 'Mit navn er [navn] og jeg er en [job].', explanation: 'Combine two simple sentences with og (and)' },
          { id: 12, type: 'fill-blank', question: 'Han ___ arbejder, men hun ___ lærer.', answer: 'er / er', explanation: 'Both use er in present tense' },
          { id: 13, type: 'choice', question: 'Hvad er det rigtige pronomen? ___ bor i Sverige. (flertal)', options: ['Vi', 'Du', 'Han', 'Hun'], answer: 'Vi', explanation: 'Vi (we) indicates plural' },
          { id: 14, type: 'write', question: 'Skriv spørgsmål: "What is your name?"', answer: 'Hvad hedder du?', explanation: 'Hvad hedder du? is the standard question' },
          { id: 15, type: 'fill-blank', question: 'De ___ i København, men vi ___ i Aarhus.', answer: 'bor / bor', explanation: 'Present tense verb bor (live) for both' },
        ],
      },
      vocab: {
        easy: [
          { id: 1, type: 'match', question: 'Match ord til betydning: Jeg / Du / Han / Hun', answer: 'Jeg=I, Du=You, Han=He, Hun=She', explanation: 'Pronoun matching' },
          { id: 2, type: 'fill-blank', question: 'Jeg hedder ___. (your name)', answer: '[any name]', explanation: 'Simple introduction' },
          { id: 3, type: 'choice', question: 'Hvad betyder "Farvel"?', options: ['Hello', 'Goodbye', 'Thank you', 'Please'], answer: 'Goodbye', explanation: 'Farvel = goodbye' },
        ],
        medium: [
          { id: 4, type: 'write', question: 'Skriv 3 danske hylsninger.', answer: 'Hej, Hallo, Godmorgen, Dav, etc.', explanation: 'Multiple greetings in Danish' },
          { id: 5, type: 'fill-blank', question: 'Jeg arbejder som ___. (profession)', answer: '[any job]', explanation: 'Vocabulary practice: professions' },
        ],
        hard: [
          { id: 6, type: 'write', question: 'Lav en dialog: Greet someone, introduce yourself, ask their name.', answer: 'A: Hej! Mit navn er X. Hvad hedder du? B: Hej! Jeg hedder Y.', explanation: 'Real-world conversation structure' },
        ],
      },
      reading: {
        easy: [
          { id: 1, type: 'choice', question: 'Læs: "Jeg hedder Anna. Jeg er 25 år og arbejder som lærer." Hvor gammel er Anna?', options: ['20', '25', '30', '35'], answer: '25', explanation: 'Direct comprehension from text' },
        ],
        medium: [
          { id: 2, type: 'write', question: 'Læs kort tekst og svar på spørgsmål på dansk.', answer: '[varies]', explanation: 'Short reading comprehension' },
        ],
      },
      writing: {
        easy: [
          { id: 1, type: 'write', question: 'Skriv 2 sætninger om dig selv.', answer: '[any 2 sentences]', explanation: 'Simple self-introduction' },
        ],
      },
    },
  },

  2: {
    name: 'Modul 2',
    level: 'A2',
    description: 'Elementary Danish: past tense, family, daily routines, basic adjectives',
    grammarTopics: ['Past Tense', 'Family & Relationships', 'Daily Routines', 'Adjectives'],
    vocab: [
      { danish: 'Mor', english: 'Mother', category: 'Family' },
      { danish: 'Far', english: 'Father', category: 'Family' },
      { danish: 'Søster', english: 'Sister', category: 'Family' },
      { danish: 'Bror', english: 'Brother', category: 'Family' },
      { danish: 'Morgen', english: 'Morning', category: 'Time' },
      { danish: 'Aften', english: 'Evening', category: 'Time' },
      { danish: 'Stå op', english: 'Wake up', category: 'Routines' },
      { danish: 'Gå i seng', english: 'Go to bed', category: 'Routines' },
      { danish: 'Spise', english: 'Eat', category: 'Verbs' },
      { danish: 'Drikke', english: 'Drink', category: 'Verbs' },
    ],
    exercises: {
      grammar: {
        easy: [
          { id: 1, type: 'fill-blank', question: 'I går ___ jeg til arbejde. (past tense)', answer: 'gik', explanation: 'Gå → gik (went)' },
          { id: 2, type: 'choice', question: 'Min mor ___ lærer.', options: ['er', 'var', 'havde', 'arbejded'], answer: 'er', explanation: 'Present tense for current profession' },
          { id: 3, type: 'fill-blank', question: 'Han ___ et kaffe denne morgen. (past)', answer: 'drak', explanation: 'Drikke → drak (drank)' },
          { id: 4, type: 'choice', question: 'Vi ___ til skolen hver dag.', options: ['går', 'gik', 'havde gået', 'vil gå'], answer: 'går', explanation: 'Habitual action in present' },
          { id: 5, type: 'fill-blank', question: 'Min søster ___ i København. (present)', answer: 'bor', explanation: 'Bor (lives) present tense' },
        ],
        medium: [
          { id: 6, type: 'write', question: 'Oversæt: "I had breakfast yesterday"', answer: 'Jeg havde morgenmad i går.', explanation: 'Had + noun in past tense' },
          { id: 7, type: 'fill-blank', question: 'De ___ i køkkenet og ___ te. (var/drak)', answer: 'var / drak', explanation: 'Past tense: var (were) + drak (drank)' },
          { id: 8, type: 'choice', question: 'Min far ___ stor. Han ___ en ingeniør.', options: ['er/er', 'var/var', 'er/var', 'var/er'], answer: 'er/er', explanation: 'Present tense for permanent traits' },
          { id: 9, type: 'fill-blank', question: 'Jeg ___ daglig morgenmad klokken 7. (at spise)', answer: 'spiser', explanation: 'Habitual action in present' },
          { id: 10, type: 'choice', question: 'Hun ___ sin mor hver dag. (at ringe)', options: ['ringer', 'ringede', 'har ringet', 'vil ringe'], answer: 'ringer', explanation: 'Present habitual' },
        ],
        hard: [
          { id: 11, type: 'write', question: 'Skriv en paragraf om din dag i går. (5 sætninger)', answer: '[varies]', explanation: 'Past tense narrative' },
          { id: 12, type: 'fill-blank', question: 'Da jeg ___ lille, ___ jeg med min søster. (var/legede)', answer: 'var / legede', explanation: 'When I was small, I played' },
          { id: 13, type: 'choice', question: 'Hvilken er rigtig? A) Han var ingeniør B) Han er var ingeniør', options: ['A', 'B', 'Begge', 'Ingen'], answer: 'A', explanation: 'Only one past verb needed' },
          { id: 14, type: 'write', question: 'Skriv om din familie. Beskriver mor, far, søskende.', answer: '[varies]', explanation: 'Family description in present' },
          { id: 15, type: 'fill-blank', question: 'Vi ___ hver søndag sammen, men i dag ___ det regn, så vi ___ hjemme.', answer: 'går / var / var', explanation: 'Mix of habitual and specific past' },
        ],
      },
      vocab: {
        easy: [
          { id: 1, type: 'match', question: 'Match familiemedlemmer: Mor / Far / Søster / Bror', answer: 'Mother/Father/Sister/Brother', explanation: 'Family vocabulary' },
          { id: 2, type: 'fill-blank', question: 'Min ___ hedder Peter. (brother)', answer: 'bror', explanation: 'Bror = brother' },
        ],
        medium: [
          { id: 3, type: 'write', question: 'Skriv ord for dagligt rutiner.', answer: 'Stå op, spise morgenmad, gå i seng, osv.', explanation: 'Daily routine vocabulary' },
        ],
      },
      reading: {
        easy: [
          { id: 1, type: 'choice', question: 'Læs: "Min far var pilot og min mor var læge." Hvad arbejdede de?', options: ['Pilot og læge', 'Lærer og pilot', 'Doktor og flyver', 'Ingeniør og sygeplejerske'], answer: 'Pilot og læge', explanation: 'Direct comprehension' },
        ],
      },
      writing: {
        easy: [
          { id: 1, type: 'write', question: 'Skriv om din morgen routine.', answer: '[varies]', explanation: 'Describe morning routine' },
        ],
      },
    },
  },

  3: {
    name: 'Modul 3',
    level: 'B1',
    description: 'Intermediate Danish: complex sentences, conditional, passive voice, narrative',
    grammarTopics: ['Complex Sentences', 'Conditional', 'Passive Voice', 'Subordinate Clauses'],
    vocab: [
      { danish: 'Fordi', english: 'Because', category: 'Conjunctions' },
      { danish: 'Selvom', english: 'Although', category: 'Conjunctions' },
      { danish: 'Hvis', english: 'If', category: 'Conditional' },
      { danish: 'Ville', english: 'Would', category: 'Conditional' },
      { danish: 'Måtte', english: 'Must/Had to', category: 'Modal' },
      { danish: 'Kunne', english: 'Could/Was able to', category: 'Modal' },
      { danish: 'Skulle', english: 'Should/Had to', category: 'Modal' },
    ],
    exercises: {
      grammar: {
        easy: [
          { id: 1, type: 'choice', question: 'Jeg kan ikke komme ___ jeg har arbejde.', options: ['fordi', 'selvom', 'hvis', 'da'], answer: 'fordi', explanation: 'Fordi (because) gives reason' },
          { id: 2, type: 'fill-blank', question: 'Hvis jeg ___ tid, ___ jeg gå til biografen.', answer: 'havde / ville', explanation: 'Conditional: hvis + past + ville' },
          { id: 3, type: 'choice', question: 'Rapporten ___ skrevet af direktøren. (passive)', options: ['blev', 'var', 'er', 'var blevet'], answer: 'blev', explanation: 'Passive past: blev + participle' },
          { id: 4, type: 'fill-blank', question: 'Da jeg kom hjem, ___ maden allerede ___ lavet.', answer: 'var / blevet', explanation: 'Perfect passive' },
          { id: 5, type: 'choice', question: 'Selvom det ___ koldt, ___ vi en lang tur.', options: ['er/tog', 'var/tog', 'var/tager', 'var/havde taget'], answer: 'var/tog', explanation: 'Although it was cold, we took a walk' },
        ],
        medium: [
          { id: 6, type: 'write', question: 'Oversæt: "If I had time, I would read the book"', answer: 'Hvis jeg havde tid, ville jeg læse bogen.', explanation: 'Conditional construction' },
          { id: 7, type: 'fill-blank', question: 'Projektet ___ gennemført af vores team ___ stor succes.', answer: 'blev / med', explanation: 'Passive voice + preposition' },
          { id: 8, type: 'choice', question: 'De ___ møde på kontoret, men de ___ ikke komme.', options: ['skulle/kunne', 'skulle/kunne ikke', 'kunne/skulle', 'skulle/ville'], answer: 'skulle/kunne ikke', explanation: 'They were supposed to but could not come' },
          { id: 9, type: 'fill-blank', question: 'Selvom hun ___ træt, ___ hun videre med arbejdet.', answer: 'var / fortsatte', explanation: 'Although she was tired, she continued' },
          { id: 10, type: 'choice', question: 'Hvornår ___ mødet afholdt?', options: ['blev', 'var', 'blev afholdt', 'var afholdt'], answer: 'blev', explanation: 'Passive: When was the meeting held?' },
        ],
        hard: [
          { id: 11, type: 'write', question: 'Skriv en kompleks sætning med "selvom" og "fordi".', answer: '[varies - e.g., Selvom han var syg, måtte han komme på arbejde fordi projektet var vigtig.]', explanation: 'Complex sentence construction' },
          { id: 12, type: 'fill-blank', question: 'If translations would continue, the project ___. (Passive)', answer: 'ville blive gennemført', explanation: 'Conditional passive' },
          { id: 13, type: 'choice', question: 'Sætningen "Hvis jeg havde vidst det, ville jeg have gjort anderledes" bruger:', options: ['Simple conditional', 'Mixed conditional', 'Perfect conditional', 'Hypothetical past'], answer: 'Perfect conditional', explanation: 'Refers to past with would-have structure' },
          { id: 14, type: 'write', question: 'Fortæl en historie med minimum 3 sammensatte sætninger.', answer: '[varies]', explanation: 'Narrative with complex structures' },
          { id: 15, type: 'fill-blank', question: 'Den dokumentation, som ___ analyseret, ___ vigtig for projektet.', answer: 'blev / var', explanation: 'Relative clause with passive' },
        ],
      },
      grammar: {
        easy: [
          { id: 1, type: 'choice', question: 'Hvad betyder "selvom"?', options: ['Because', 'Although', 'Therefore', 'However'], answer: 'Although', explanation: 'Selvom = although' },
        ],
        medium: [
          { id: 2, type: 'write', question: 'Skriv 3 ord med "ville" (would).', answer: '[varies]', explanation: 'Conditional modal practice' },
        ],
      },
      reading: {
        medium: [
          { id: 1, type: 'write', question: 'Læs en B1-tekst og svar på spørgsmål.', answer: '[varies]', explanation: 'Intermediate reading comprehension' },
        ],
      },
      writing: {
        medium: [
          { id: 1, type: 'write', question: 'Skriv et brev til en ven hvor du forklarer hvorfor du ikke kan komme til festen.', answer: '[varies]', explanation: 'Write with causal/conditional expressions' },
        ],
      },
    },
  },

  4: {
    name: 'Modul 4',
    level: 'B2',
    description: 'Upper-Intermediate Danish: advanced syntax, subjunctive, academic vocabulary, business language',
    grammarTopics: ['Subjunctive Mood', 'Advanced Syntax', 'Academic Vocabulary', 'Business Language'],
    vocab: [
      { danish: 'Påstand', english: 'Claim/Statement', category: 'Academic' },
      { danish: 'Argument', english: 'Argument', category: 'Academic' },
      { danish: 'Konklusion', english: 'Conclusion', category: 'Academic' },
      { danish: 'Samtidig', english: 'At the same time', category: 'Discourse' },
      { danish: 'Til gengæld', english: 'In return', category: 'Discourse' },
      { danish: 'Indledningsvis', english: 'Initially', category: 'Discourse' },
    ],
    exercises: {
      grammar: {
        medium: [
          { id: 1, type: 'fill-blank', question: 'Det er vigtig, at projektgruppen ___ mødes regelmæssigt. (subjunctive)', answer: 'mødes', explanation: 'Subjunctive after "det er vigtig at"' },
          { id: 2, type: 'write', question: 'Oversæt: "It is essential that the report be completed by Friday."', answer: 'Det er essentielt, at rapporten bliver færdig fredag.', explanation: 'Subjunctive in formal context' },
          { id: 3, type: 'choice', question: 'Vi foreslår, at mødet ___ til næste uge.', options: ['udsættes', 'udsætter', 'udsatte', 'ville udsætte'], answer: 'udsættes', explanation: 'Passive subjunctive after "foreslår"' },
        ],
        hard: [
          { id: 4, type: 'write', question: 'Skriv en analyse med "påstand", "argument", "konklusion".', answer: '[varies]', explanation: 'Academic essay structure' },
          { id: 5, type: 'fill-blank', question: 'Det ville være bedst, hvis alle interessenter ___ indvolveret fra starten.', answer: 'blev', explanation: 'Conditional subjunctive' },
        ],
      },
      vocab: {
        medium: [
          { id: 1, type: 'write', question: 'Skriv 5 akademiske ord på dansk.', answer: '[varies - påstand, argument, konklusion, etc.]', explanation: 'Academic vocabulary practice' },
        ],
      },
      reading: {
        hard: [
          { id: 1, type: 'write', question: 'Læs en B2 Business email og svar på spørgsmål på dansk.', answer: '[varies]', explanation: 'Professional reading comprehension' },
        ],
      },
      writing: {
        hard: [
          { id: 1, type: 'write', question: 'Skriv et formelt email til en klient med en forslag.', answer: '[varies]', explanation: 'Business Danish writing' },
        ],
      },
    },
  },

  5: {
    name: 'Modul 5',
    level: 'B2+',
    description: 'Advanced Danish: PD3 exam prep, debate language, professional writing, literature',
    grammarTopics: ['Advanced Discourse', 'PD3 Exam Format', 'Debate Structures', 'Literary Language'],
    vocab: [
      { danish: 'Således', english: 'Thus/In this way', category: 'Discourse' },
      { danish: 'Imidlertid', english: 'However', category: 'Discourse' },
      { danish: 'Derudover', english: 'Moreover', category: 'Discourse' },
      { danish: 'Virkelig', english: 'Really/Indeed', category: 'Emphasis' },
      { danish: 'Især', english: 'Especially', category: 'Emphasis' },
    ],
    exercises: {
      grammar: {
        hard: [
          { id: 1, type: 'write', question: 'Skriv et debat argument med "Således" og "Imidlertid".', answer: '[varies]', explanation: 'Debate discourse markers' },
          { id: 2, type: 'fill-blank', question: 'Forfatteren argumenterer for, at ____ bør være et offentligt ansvar.', answer: '[any major noun phrase]', explanation: 'Advanced argumentation' },
        ],
      },
      reading: {
        hard: [
          { id: 1, type: 'write', question: 'Læs et litterært uddrag og analyser stil og budskab.', answer: '[varies]', explanation: 'Literary analysis in Danish' },
        ],
      },
      writing: {
        hard: [
          { id: 1, type: 'write', question: 'Skriv en PD3 essay om et samfundsmæssigt emne.', answer: '[varies]', explanation: 'PD3 exam preparation' },
          { id: 2, type: 'write', question: 'Deltag i en dansk debat skriftligt.', answer: '[varies]', explanation: 'Formal debate writing' },
        ],
      },
    },
  },
};

// Helper function to get exercises for a specific combination
export const getExercisesForSelection = (moduleId, workbookType, difficulty, count) => {
  const module = curriculumData[moduleId];
  if (!module) return [];

  const exercises = [];
  const sections = workbookType === 'complete'
    ? ['grammar', 'vocab', 'reading', 'writing']
    : [workbookType];

  let totalAdded = 0;

  for (const section of sections) {
    if (!module.exercises[section]) continue;

    const sectionExercises = module.exercises[section][difficulty] || [];
    const exercisesToAdd = Math.ceil(count / sections.length);

    for (let i = 0; i < exercisesToAdd && totalAdded < count && i < sectionExercises.length; i++) {
      exercises.push({
        ...sectionExercises[i],
        section,
      });
      totalAdded++;
    }
  }

  return exercises.slice(0, count);
};
