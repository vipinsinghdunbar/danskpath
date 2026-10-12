// B2/PD3 Content Expansion — Modul 4-5 and PD3 level materials
// Extends vocabulary, grammar, listening, reading, and writing for advanced learners

import { pools, pick, pickMany } from './pools';

// ==================== VOCABULARY B2/PD3 ====================

export const advancedVocab = {
  modul4: {
    // Professional/academic vocabulary
    business: [
      { da: 'en virksomhed', en: 'a company', level: 4, context: 'work' },
      { da: 'en organisation', en: 'an organisation', level: 4, context: 'work' },
      { da: 'en løsning', en: 'a solution', level: 4, context: 'work' },
      { da: 'en udfordring', en: 'a challenge', level: 4, context: 'work' },
      { da: 'at implementere', en: 'to implement', level: 4, context: 'work' },
      { da: 'at optimere', en: 'to optimise', level: 4, context: 'work' },
      { da: 'en strategi', en: 'a strategy', level: 4, context: 'work' },
      { da: 'et budget', en: 'a budget', level: 4, context: 'work' },
      { da: 'at analysere', en: 'to analyse', level: 4, context: 'work' },
      { da: 'en rapport', en: 'a report', level: 4, context: 'work' },
    ],
    // Abstract concepts
    abstract: [
      { da: 'en mulighed', en: 'a possibility', level: 4, context: 'abstract' },
      { da: 'et perspektiv', en: 'a perspective', level: 4, context: 'abstract' },
      { da: 'en betydning', en: 'a meaning', level: 4, context: 'abstract' },
      { da: 'at påvirke', en: 'to influence', level: 4, context: 'abstract' },
      { da: 'at udvikle', en: 'to develop', level: 4, context: 'abstract' },
      { da: 'en konsekvens', en: 'a consequence', level: 4, context: 'abstract' },
      { da: 'at argumentere', en: 'to argue', level: 4, context: 'abstract' },
      { da: 'at forklare', en: 'to explain', level: 4, context: 'abstract' },
    ],
  },
  modul5: {
    // Academic/sophisticated vocabulary
    academic: [
      { da: 'et synspunkt', en: 'a point of view', level: 5, context: 'academic' },
      { da: 'en tendens', en: 'a trend', level: 5, context: 'academic' },
      { da: 'et princip', en: 'a principle', level: 5, context: 'academic' },
      { da: 'at antyde', en: 'to suggest', level: 5, context: 'academic' },
      { da: 'at underbygge', en: 'to support (an argument)', level: 5, context: 'academic' },
      { da: 'at kommentere', en: 'to comment', level: 5, context: 'academic' },
      { da: 'en kritik', en: 'criticism', level: 5, context: 'academic' },
      { da: 'at være enig', en: 'to agree', level: 5, context: 'academic' },
      { da: 'at være uenig', en: 'to disagree', level: 5, context: 'academic' },
      { da: 'på den anden side', en: 'on the other hand', level: 5, context: 'academic' },
    ],
    debateReady: [
      { da: 'jeg mener', en: 'I think', level: 5, context: 'debate' },
      { da: 'jeg er overbevist om', en: 'I am convinced that', level: 5, context: 'debate' },
      { da: 'jeg kan ikke acceptere', en: 'I cannot accept', level: 5, context: 'debate' },
      { da: 'det er vigtig at bemærke', en: 'it is important to note', level: 5, context: 'debate' },
      { da: 'desuden', en: 'moreover', level: 5, context: 'debate' },
      { da: 'derfor', en: 'therefore', level: 5, context: 'debate' },
      { da: 'så længe som', en: 'as long as', level: 5, context: 'debate' },
    ],
  },
};

// ==================== GRAMMAR B2/PD3 ====================

export const advancedGrammar = {
  passive: {
    title: 'Passiv (Passive voice)',
    module: 4,
    examples: [
      { da: 'Bogen er skrevet af en dansk forfatter.', en: 'The book is written by a Danish author.' },
      { da: 'Dette job blev gjort på en time.', en: 'This job was done in an hour.' },
      { da: 'Huset skulle bygges af en arkitekt.', en: 'The house should be built by an architect.' },
    ],
    explanation: 'Passiv bruges når fokus er på handlingen eller objektet, ikke subjektet. Form: være + past participle (supinum).',
  },
  subjunction: {
    title: 'Betinget (Conditional)',
    module: 4,
    examples: [
      { da: 'Hvis jeg havde tid, ville jeg gøre det.', en: 'If I had time, I would do it.' },
      { da: 'Jeg ville være glad, hvis han kom.', en: 'I would be happy if he came.' },
      { da: 'Ville du hjælpe mig, hvis jeg spurgte?', en: 'Would you help me if I asked?' },
    ],
    explanation: 'Betinget bruges for hypotetiske eller uønskelige situationer. Form: ville + infinitiv.',
  },
  plusquamperfect: {
    title: 'Fuldbyrd fortid (Pluperfect)',
    module: 5,
    examples: [
      { da: 'Da jeg kom, havde han allerede spist.', en: 'When I arrived, he had already eaten.' },
      { da: 'Hun havde arbejdet her i 5 år før hun skiftede job.', en: 'She had worked here for 5 years before she changed jobs.' },
    ],
    explanation: 'Plusquamperfekt viser at en handling skete før en anden handling i fortiden. Form: havde + supinum.',
  },
  reportedSpeech: {
    title: 'Indirekte tale (Reported speech)',
    module: 5,
    examples: [
      { da: 'Han sagde, at han ville komme i morgen.', en: 'He said that he would come tomorrow.' },
      { da: 'Hun spurgte, om jeg ville hjælpe.', en: 'She asked if I would help.' },
      { da: 'De fortalte mig, at de havde været i Danmark før.', en: 'They told me that they had been in Denmark before.' },
    ],
    explanation: 'Indirekte tale bruges når man giver igen hvad en person sagde. Ændring af tid og perspektiv kan være nødvendig.',
  },
};

// ==================== PD3 EXAM PREP ====================

export const pd3ExamFormat = {
  part1: {
    name: 'Forståelse af højtlæsning (Understanding of listening)',
    description: 'Listen to a 4-5 minute monologue and answer 10 multiple choice questions.',
    duration: '10 minutes',
    content: {
      topics: [
        'Work experience presentations',
        'Political debates',
        'News broadcasts',
        'Documentary passages',
        'Academic lectures',
      ],
      difficulty: 'B2-C1 speech pace and vocabulary',
    },
  },
  part2: {
    name: 'Skriftlig fremstilling (Written production)',
    description: 'Write a 200-300 word argumentative text on a given topic.',
    duration: '45 minutes',
    requirements: [
      'Clear introduction with thesis.',
      'At least 3 body paragraphs with arguments.',
      'Conclusion with summary or call to action.',
      'Use of advanced vocabulary and structures.',
      'Correct spelling and grammar.',
    ],
    topics: [
      'Environmental policy',
      'Education reform',
      'Workplace diversity',
      'Digital technology ethics',
      'Immigration and integration',
    ],
  },
  part3: {
    name: 'Mundtlig fremstilling (Oral presentation)',
    description: 'Present a 3-4 minute prepared talk on a topic, then discussion.',
    duration: '15 minutes',
    structure: [
      'Introduction (30 seconds)',
      'Main presentation (2.5 minutes)',
      'Q&A with examiner (2 minutes)',
    ],
    assessmentCriteria: [
      'Vocabulary range and accuracy.',
      'Grammar accuracy.',
      'Fluency and coherence.',
      'Interaction and response to questions.',
    ],
  },
  part4: {
    name: 'Dialog (Conversation)',
    description: 'Have a 5-7 minute conversation with the examiner.',
    duration: '10 minutes',
    topics: [
      'Personal goals and dreams',
      'Cultural topics',
      'Hypothetical scenarios',
      'Problem-solving discussions',
    ],
  },
  part5: {
    name: 'Læseforståelse (Reading comprehension)',
    description: 'Read 2-3 texts and answer 20-25 comprehension questions.',
    duration: '45 minutes',
    textTypes: [
      'Newspaper articles',
      'Academic extracts',
      'Opinion pieces',
      'Non-fiction excerpts',
    ],
  },
  part6: {
    name: 'Skriftlig fremstilling — Essay',
    description: 'Write a 250-350 word formal essay or letter.',
    duration: '60 minutes',
    formats: [
      'Formal complaint letter',
      'Persuasive essay',
      'Analytical essay',
      'Proposal or recommendation',
    ],
  },
};

// ==================== LISTENING MATERIALS B2/PD3 ====================

export const listeningMaterials = {
  modul4: [
    {
      id: 'listen_m4_1',
      title: 'Job Interview (B2)',
      duration: '3:45',
      transcript: `Interviewer: Tak, fordi du kom. Fortæl mig om dit seneste job.
      Kandidat: Ja, jeg arbejdede som projektleder i 3 år. Det var en meget givende erfaring...`,
      questions: [
        { q: 'Hvor længe arbejdede kandidaten i sit seneste job?', options: ['2 år', '3 år', '4 år'], correct: 1 },
      ],
    },
  ],
  modul5: [
    {
      id: 'listen_m5_1',
      title: 'Political Debate (B2-C1)',
      duration: '5:20',
      transcript: 'Debate between politicians on climate policy...',
      questions: [
        { q: 'Hvad er hovedargumentet for den grønne energi?', options: ['Lavere omkostninger', 'Miljøbeskyttelse', 'Job creation'], correct: 1 },
      ],
    },
  ],
};

// ==================== READING MATERIALS B2/PD3 ====================

export const readingMaterials = {
  cloze: [
    {
      id: 'read_cloze_1',
      level: 4,
      text: 'En succesfuld virksomhed _____ (skal/skulle) altid fokusere på kunderne. Dette _____ (er/var) vigtigst for langsigtet vækst.',
      blanks: ['skal', 'er'],
      explanation: 'Præsens bruges for generelle sandheder. "Skal" for prioritet.',
    },
  ],
};

// ==================== SPEAKING PRACTICE B2/PD3 ====================

export const speakingTopics = {
  modul4: [
    {
      id: 'speak_m4_1',
      topic: 'Din karriere og ambitioner',
      prompts: [
        'Hvad er dit drømmejob?',
        'Hvilke færdigheder skal du udvikle?',
        'Hvor ser du dig selv om 5 år?',
      ],
      targetLength: '2-3 minutter',
    },
    {
      id: 'speak_m4_2',
      topic: 'Kultur og kunst',
      prompts: [
        'Hvad er din yndlingsfilm eller bog?',
        'Hvorfor er kultur vigtig for samfundet?',
        'Hvordan påvirker kunst mennesker?',
      ],
      targetLength: '2-3 minutter',
    },
  ],
  modul5: [
    {
      id: 'speak_m5_1',
      topic: 'Argumentation og debat',
      prompts: [
        'Er teknologi god eller dårlig for samfundet?',
        'Bør uddannelse være gratis for alle?',
        'Hvordan kan vi løse klima krisen?',
      ],
      targetLength: '3-4 minutter',
      requires: 'Use advanced vocabulary, express arguments, respond to counter-arguments',
    },
  ],
};

// ==================== WRITING EXERCISES B2/PD3 ====================

export const writingExercises = {
  modul4: [
    {
      id: 'write_m4_1',
      type: 'Formal email',
      topic: 'Request for information from a company',
      requirements: [
        'Clear subject line',
        'Polite greeting',
        'Purpose of email in first paragraph',
        'Specific questions',
        'Professional closing',
      ],
      minWords: 150,
      maxWords: 250,
    },
    {
      id: 'write_m4_2',
      type: 'Description',
      topic: 'Describe a place that is important to you',
      requirements: [
        'Introduction: what is the place?',
        'Physical description',
        'Why is it important?',
        'Personal memories or experiences',
      ],
      minWords: 200,
      maxWords: 300,
    },
  ],
  modul5: [
    {
      id: 'write_m5_1',
      type: 'Argumentative essay',
      topic: 'Should Denmark invest more in renewable energy?',
      requirements: [
        'Thesis in introduction',
        'At least 3 main arguments with examples',
        'Counter-argument and refutation',
        'Conclusion with call to action',
        'Use of transition words: desuden, dog, derfor, etc.',
      ],
      minWords: 250,
      maxWords: 350,
    },
    {
      id: 'write_m5_2',
      type: 'Opinion letter',
      topic: 'Letter to local politician on a community issue',
      requirements: [
        'Formal structure (date, address, greeting, closing)',
        'Clear statement of position',
        'Evidence and reasoning',
        'Request for action or response',
      ],
      minWords: 200,
      maxWords: 300,
    },
  ],
};

// ==================== HELPER: Quiz Question Generator ====================

export function genB2PD3Question() {
  const levels = [4, 5];
  const level = pick(levels);
  const types = ['vocab', 'grammar', 'listening', 'reading'];
  const type = pick(types);

  if (type === 'vocab') {
    const vocab = level === 4
      ? pick(advancedVocab.modul4.business)
      : pick(advancedVocab.modul5.academic);

    return {
      id: `b2pd3_vocab_${Date.now()}`,
      type: 'choice',
      level,
      q: `Hvad betyder "${vocab.da}"?`,
      options: [vocab.en, 'Something else 1', 'Something else 2'].sort(() => 0.5 - Math.random()),
      correct: vocab.en,
      context: vocab.context,
    };
  }

  if (type === 'grammar') {
    const grammar = level === 4 ? advancedGrammar.passive : advancedGrammar.reportedSpeech;
    const example = pick(grammar.examples);
    return {
      id: `b2pd3_grammar_${Date.now()}`,
      type: 'choice',
      level,
      title: grammar.title,
      q: `Translate: "${example.en}"`,
      options: [example.da, 'Wrong 1', 'Wrong 2'].sort(() => 0.5 - Math.random()),
      correct: example.da,
      explanation: grammar.explanation,
    };
  }

  return {
    id: `b2pd3_custom_${Date.now()}`,
    type: 'choice',
    level,
    q: 'Sample question for B2/PD3 level',
    options: ['Option A', 'Option B', 'Option C'],
    correct: 'Option A',
  };
}

export default {
  advancedVocab,
  advancedGrammar,
  pd3ExamFormat,
  listeningMaterials,
  readingMaterials,
  speakingTopics,
  writingExercises,
  genB2PD3Question,
};
