import { useState } from 'react';
import { useExerciseSubmission, AttemptFeedback, DifficultyIndicator, ConfidenceSelector } from '../AdaptiveExerciseWrapper';

// Verb System Lesson — Present vs. Past Tense
// Duration: 35 minutes
// Structure: Explanation (5min) + English Bridge (5min) + Exercises (15min) + Production (5min) + Quiz (5min)

export default function VerbSystemLesson({ lesson, onComplete, onBack, onAttemptRecorded, currentDifficulty }) {
  const [section, setSection] = useState('intro');
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState({});
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [userConfidence, setUserConfidence] = useState(null);
  const [exerciseStartTime, setExerciseStartTime] = useState(Date.now());

  // Initialize adaptive submission hook
  const handleExerciseSubmit = useExerciseSubmission(
    onAttemptRecorded,
    lesson?.id || 'verb-system',
    `ex${exerciseIndex + 1}`,
    'Verb System',
    currentDifficulty || 2
  );

  const exercises = [
    // REGULAR VERBS: PRESENT VS PAST (1-5)
    {
      id: 'ex1',
      type: 'mcq',
      question: 'Which is the correct present tense?',
      options: [
        { text: 'Jeg arbejder hver dag.', correct: true, why: 'Correct! Present tense: arbeju + -r = arbejder.' },
        { text: 'Jeg arbejdede hver dag.', correct: false, why: 'This is past tense (-ede ending).' },
        { text: 'Jeg arbejdet hver dag.', correct: false, why: 'Not a valid form. Regular verbs use -r for present.' }
      ],
      explanation: 'Regular verbs in present tense: add -r to the infinitive (arbejde → arbejder).',
      why: 'Danish verb conjugation is simple: same form for all persons. Just add -r.'
    },
    {
      id: 'ex2',
      type: 'mcq',
      question: 'What is the past tense of "arbejde"?',
      options: [
        { text: 'Jeg arbejder i går.', correct: false, why: 'This is present tense. Past tense needs -ede ending.' },
        { text: 'Jeg arbejdede i går.', correct: true, why: 'Correct! Past tense: arbejd + -ede = arbejdede.' },
        { text: 'Jeg arbejde i går.', correct: false, why: 'Missing the past tense ending.' }
      ],
      explanation: 'Regular verbs in past tense: add -ede to the stem (arbejde → arbejdede).',
      why: 'The -ede ending is the standard past tense marker for regular verbs.'
    },
    {
      id: 'ex3',
      type: 'fillblank',
      instruction: 'Choose the correct present tense verb:',
      sentence: 'Han _____ på kontoret hver dag.',
      options: ['arbejder', 'arbejdede', 'vil arbejde'],
      correct: 'arbejder',
      explanation: 'Present tense: arbejde + -r = arbejder. "Hver dag" signals present/habitual.',
      why: 'Time expressions like "hver dag" (every day) indicate present tense.'
    },
    {
      id: 'ex4',
      type: 'fillblank',
      instruction: 'Choose the correct past tense verb:',
      sentence: 'Hun _____ på mødet i går.',
      options: ['taler', 'talte', 'vil tale'],
      correct: 'talte',
      explanation: 'Past tense: taleINF stem = tal + -te = talte. "I går" (yesterday) signals past.',
      why: 'Verbs ending in -e use -de ending in past tense, but "tale" → "talte" is the spoken form.'
    },
    {
      id: 'ex5',
      type: 'mcq',
      question: 'Which pair is correct (present/past)?',
      options: [
        { text: 'spiller / spillede', correct: true, why: 'Correct! Present: spil + -ler = spiller. Past: spil + -lede = spillede.' },
        { text: 'spiller / spillte', correct: false, why: 'Past tense should be -lede, not -te.' },
        { text: 'spille / spillede', correct: false, why: 'Present should have -r ending.' }
      ],
      explanation: 'Verbs ending in a vowel + consonant double the consonant: spil → spiller → spillede.',
      why: 'Doubled consonants change the vowel sound: short vowel (spiller) vs. long vowel.'
    },

    // STRONG VERBS (6-10)
    {
      id: 'ex6',
      type: 'mcq',
      question: 'What is the past tense of "komme" (to come)?',
      options: [
        { text: 'kom', correct: true, why: 'Correct! "Komme" is strong: kom + -∅ = kom (vowel changes).' },
        { text: 'kommede', correct: false, why: 'This looks like regular past, but "komme" is strong (irregular).' },
        { text: 'kommer', correct: false, why: 'This is present tense, not past.' }
      ],
      explanation: 'Strong verbs change their vowel in past tense: komme → kom. No ending needed.',
      why: 'Strong verbs are historical remnants. The vowel shift is the marker, not an ending.'
    },
    {
      id: 'ex7',
      type: 'fillblank',
      instruction: 'Fill in the correct past tense (strong verb):',
      sentence: 'Jeg _____ til Danmark sidste år.',
      options: ['rejse', 'rejste', 'rejser'],
      correct: 'rejste',
      explanation: 'Past tense of "rejse": reis + -te = rejste. This is actually regular (-te ending).',
      why: 'Many verbs that look strong follow regular patterns once you identify the stem.'
    },
    {
      id: 'ex8',
      type: 'mcq',
      question: 'Which is the correct present → past pair?',
      options: [
        { text: 'drikke / drak', correct: true, why: 'Correct! Strong verb with vowel change: drikke → drak.' },
        { text: 'drikke / drikkede', correct: false, why: '"Drikke" is strong, not regular. No -ede ending.' },
        { text: 'drikker / drak', correct: false, why: '"Drikker" is present. "Drak" is past, but verb form changes.' }
      ],
      explanation: 'Strong verbs like "drikke" (drink) change vowels: drikke → drak. Common in Danish.',
      why: 'These vowel-changing verbs must be learned by heart; there\'s no rule.'
    },
    {
      id: 'ex9',
      type: 'fillblank',
      instruction: 'Fill in the present tense (what do they do now?):',
      sentence: 'Vi _____ kaffe hver morgen.',
      options: ['drikker', 'drak', 'drukket'],
      correct: 'drikker',
      explanation: 'Present tense of "drikke": drink + -er = drikker (even though past is "drak").',
      why: 'Present tense stays regular even for strong verbs that change in past.'
    },
    {
      id: 'ex10',
      type: 'mcq',
      question: 'What did they do yesterday? (Past tense)',
      options: [
        { text: 'Vi drikker kaffe i går.', correct: false, why: '"Drikker" is present. Past tense needs "drak".' },
        { text: 'Vi drak kaffe i går.', correct: true, why: 'Correct! Past tense of "drikke" is "drak".' },
        { text: 'Vi drukket kaffe i går.', correct: false, why: '"Drukket" is past participle, not simple past.' }
      ],
      explanation: 'Past tense of strong verb "drikke" is "drak". Used with "i går" (yesterday).',
      why: 'Strong verbs follow their own vowel-change pattern in simple past.'
    },

    // MODAL VERBS (11-14)
    {
      id: 'ex11',
      type: 'mcq',
      question: 'What is the past tense of "kunne" (can/be able to)?',
      options: [
        { text: 'kan', correct: false, why: 'That\'s present tense.' },
        { text: 'kunne', correct: false, why: 'That\'s the infinitive.' },
        { text: 'kunne', correct: true, why: 'Past tense of "kunne" is also "kunne" (no change) — it\'s irregular.' }
      ],
      explanation: 'Modal verbs like "kunne" don\'t change form between present and past in speech, but context matters.',
      why: 'Many modals have the same form in present and past; listen for context clues.'
    },
    {
      id: 'ex12',
      type: 'fillblank',
      instruction: 'Choose the correct form:',
      sentence: 'Jeg _____ ikke komme til mødet i dag.',
      options: ['kan', 'kunne', 'kan ikke'],
      correct: 'kan',
      explanation: 'Present tense: kan + infinitive = kan ikke komme (cannot come).',
      why: 'Modal verbs like "kan" are followed by infinitives without "at".'
    },
    {
      id: 'ex13',
      type: 'mcq',
      question: 'What is the past tense here?',
      options: [
        { text: 'Jeg skal møde ham i dag.', correct: false, why: 'This is present/future with "skal". "I dag" = today.' },
        { text: 'Jeg skulle møde ham i dag.', correct: true, why: 'Past: "skulle" (was supposed to meet him today).' },
        { text: 'Jeg skal møde ham i går.', correct: false, why: '"Skal" is present; "i går" is contradictory.' }
      ],
      explanation: 'Modal "skal" → past "skulle". Used for "was supposed to" or past intentions.',
      why: 'Modal verbs change slightly but the infinitive structure stays the same.'
    },
    {
      id: 'ex14',
      type: 'fillblank',
      instruction: 'Fill in the correct past tense modal:',
      sentence: 'Vi _____ gå til mødet, men det blev aflyst.',
      options: ['skal', 'skulle', 'vil'],
      correct: 'skulle',
      explanation: 'Past: skulle + infinitive = skulle gå (were supposed to go, but it was cancelled).',
      why: '"Men det blev aflyst" (but it was cancelled) signals past context, so "skulle" fits.'
    },

    // AUXILIARY VERBS: HAVE / BE (15-17)
    {
      id: 'ex15',
      type: 'mcq',
      question: 'What is the correct present perfect?',
      options: [
        { text: 'Jeg er spist middag.', correct: false, why: 'You eat with "har", not "er". "Er" is for movement/change.' },
        { text: 'Jeg har spist middag.', correct: true, why: 'Correct! "Har" + past participle = har spist (have eaten).' },
        { text: 'Jeg spist middag.', correct: false, why: 'Missing the auxiliary verb.' }
      ],
      explanation: 'Present perfect: har + past participle. Used with "er" only for movement (jeg er kørt).',
      why: '"Har spist" (have eaten) vs. "er kørt" (have driven/gone) — different auxiliaries for different verbs.'
    },
    {
      id: 'ex16',
      type: 'fillblank',
      instruction: 'Choose the correct auxiliary:',
      sentence: 'Han _____ allerede gået til arbejde.',
      options: ['har', 'er', 'skal'],
      correct: 'er',
      explanation: 'Movement verb: er + gået (has gone to work). "Gå" (to go) uses "er" as auxiliary.',
      why: 'Movement/change verbs use "er" instead of "har" in perfect tense.'
    },
    {
      id: 'ex17',
      type: 'mcq',
      question: 'Which is grammatically correct?',
      options: [
        { text: 'De er kommet til mødet.', correct: true, why: 'Correct! "Komme" (come) = movement = "er" + kommet.' },
        { text: 'De har kommet til mødet.', correct: false, why: '"Komme" uses "er", not "har".' },
        { text: 'De kommet til mødet.', correct: false, why: 'Missing the auxiliary verb.' }
      ],
      explanation: 'Movement verbs: er + past participle. "Komme" (come) → er kommet.',
      why: 'Danish distinguishes between "har" (actions) and "er" (movement/change).'
    },

    // PAST PARTICIPLES (18-20)
    {
      id: 'ex18',
      type: 'fillblank',
      instruction: 'What is the past participle of "spille"?',
      sentence: 'Vi har _____ fodbold hele formiddagen.',
      options: ['spillet', 'spillede', 'spille'],
      correct: 'spillet',
      explanation: 'Past participle: spil + -t = spillet. Used after "har" in present perfect.',
      why: 'Past participles end in -t/-et for regular verbs.'
    },
    {
      id: 'ex19',
      type: 'mcq',
      question: 'Which is the correct past participle?',
      options: [
        { text: 'Jeg har købt en ny cykel.', correct: true, why: 'Correct! Past participle of "købe" is "købt".' },
        { text: 'Jeg har købte en ny cykel.', correct: false, why: '"Købte" is past tense (-te), not participle (-t).' },
        { text: 'Jeg har købe en ny cykel.', correct: false, why: '"Købe" is infinitive, not past participle.' }
      ],
      explanation: 'Past participles of regular verbs: stem + -t. Used in perfect tenses and passives.',
      why: 'Participles are different from simple past: "købte" (past) vs. "købt" (participle).'
    },
    {
      id: 'ex20',
      type: 'mcq',
      question: 'Complete with the correct form:',
      options: [
        { text: 'Maden er lavet af min mor.', correct: true, why: 'Correct! Past participle "lavet" in passive construction.' },
        { text: 'Maden er lavede af min mor.', correct: false, why: '"Lavede" is past tense. Use participle "lavet".' },
        { text: 'Maden er lav af min mor.', correct: false, why: 'Missing the participle ending.' }
      ],
      explanation: 'Passive voice: er + past participle. "Maden er lavet" (The food is made).',
      why: 'Past participles form passives: subject + er + participle + agent.'
    }
  ];

  const quizItems = [
    {
      id: 'q1',
      type: 'mcq',
      question: 'How do you form the present tense of regular verbs?',
      options: [
        { text: 'Add -ede to the infinitive', correct: false },
        { text: 'Add -r to the infinitive', correct: true },
        { text: 'Add -t to the stem', correct: false }
      ]
    },
    {
      id: 'q2',
      type: 'mcq',
      question: 'What is the past tense ending for regular verbs?',
      options: [
        { text: '-r', correct: false },
        { text: '-ede or -te', correct: true },
        { text: '-et', correct: false }
      ]
    },
    {
      id: 'q3',
      type: 'mcq',
      question: 'Which auxiliary verb is used for eating in the present perfect?',
      options: [
        { text: 'er', correct: false },
        { text: 'skulle', correct: false },
        { text: 'har', correct: true }
      ]
    },
    {
      id: 'q4',
      type: 'mcq',
      question: 'Which auxiliary is used for "coming" in the present perfect?',
      options: [
        { text: 'har', correct: false },
        { text: 'er', correct: true },
        { text: 'vil', correct: false }
      ]
    },
    {
      id: 'q5',
      type: 'mcq',
      question: 'What is a past participle used for?',
      options: [
        { text: 'Forming present tense', correct: false },
        { text: 'Forming perfect tenses and passives', correct: true },
        { text: 'Forming future tense', correct: false }
      ]
    }
  ];

  const handleExerciseAnswer = async (answer) => {
    const exercise = exercises[exerciseIndex];
    let isCorrect = false;
    let errorType = 'UDT'; // Default: unknown error

    if (exercise.type === 'fillblank') {
      isCorrect = answer.trim().toLowerCase() === exercise.correct.trim().toLowerCase();
      if (!isCorrect) errorType = 'BØJ'; // Verb conjugation error
    } else if (exercise.type === 'mcq') {
      isCorrect = answer === exercise.correct;
      if (!isCorrect) errorType = 'VALG'; // Selection error
    }

    // Record attempt with adaptive tracking
    if (onAttemptRecorded && userConfidence) {
      await handleExerciseSubmit(answer, exercise.correct, {
        userConfidence,
        errorType,
        startTime: exerciseStartTime,
        attemptNumber: 1
      });
    }

    setFeedback({
      isCorrect,
      explanation: exercise.explanation,
      why: exercise.why,
      weakSpot: !isCorrect ? { errorType, frequency: 1 } : null
    });

    // Reset confidence for next exercise
    setUserConfidence(null);
  };

  const handleQuizAnswer = (qid, answer) => {
    setQuizAnswers(prev => ({ ...prev, [qid]: answer }));
  };

  const calculateQuizScore = () => {
    let correct = 0;
    quizItems.forEach(item => {
      const selectedOption = item.options.find(o => o.text === quizAnswers[item.id]);
      if (selectedOption?.correct) correct++;
    });
    return Math.round((correct / quizItems.length) * 100);
  };

  if (section === 'complete') {
    const score = calculateQuizScore();
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="max-w-[400px] mx-auto px-4 text-center">
          <div className="text-[48px] mb-4">✓</div>
          <h1 className="text-[28px] font-[700] mb-4">Lesson Complete!</h1>
          <p className="text-[16px] text-gray-600 mb-2">Your score:</p>
          <div className="text-[48px] font-[700] text-gray-900 mb-6">{score}%</div>
          <button
            onClick={() => onComplete(score)}
            className="w-full bg-black text-white py-3 rounded-full font-[600] mb-3"
          >
            Return to Lessons
          </button>
          <button
            onClick={onBack}
            className="w-full border border-gray-300 py-3 rounded-full font-[600]"
          >
            Practice Another Topic
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[600px] mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-gray-100 grid place-items-center text-gray-900 font-[600]"
            aria-label="Back"
          >
            ←
          </button>
          <div className="text-[11px] font-[700] tracking-widest uppercase bg-black text-white px-3 py-1.5 rounded-full">
            {section === 'intro' && 'Introduction'}
            {section === 'english' && 'The English Bridge'}
            {section === 'exercises' && `Question ${exerciseIndex + 1}/${exercises.length}`}
            {section === 'production' && 'Write in Danish'}
            {section === 'quiz' && `Question ${quizIndex + 1}/${quizItems.length}`}
          </div>
        </div>

        {section === 'intro' && (
          <div className="pb-6">
            <h1 className="text-[32px] font-[700] mb-2">{lesson.title}</h1>
            <p className="text-[16px] text-gray-600 mb-8">{lesson.description}</p>

            <div className="bg-gray-50 rounded-[12px] p-6 border border-gray-200 mb-6">
              <h2 className="text-[16px] font-[700] mb-4">What You'll Learn</h2>
              <ul className="space-y-3 text-[14px]">
                <li className="flex gap-3">
                  <span className="text-blue-600 font-[700]">1.</span>
                  <span>Regular verbs: how to form present and past tense.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-600 font-[700]">2.</span>
                  <span>Strong verbs: vowel changes and irregular patterns.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-600 font-[700]">3.</span>
                  <span>Modal verbs: skal, kunne, vil, må and their past forms.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-600 font-[700]">4.</span>
                  <span>Auxiliary verbs: har vs. er in perfect tenses.</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-50 rounded-[12px] p-4 border border-green-200 mb-6">
              <h3 className="text-[13px] font-[700] text-green-900 mb-2">📋 Your Practice Plan</h3>
              <div className="text-[13px] text-green-900 space-y-1">
                <div>• <strong>Explanation:</strong> 5 minutes</div>
                <div>• <strong>English bridge:</strong> 5 minutes</div>
                <div>• <strong>Practice worksheet:</strong> 20 questions (15 minutes)</div>
                <div>• <strong>Free writing:</strong> 5 minutes</div>
                <div>• <strong>Quiz:</strong> 5 questions (5 minutes)</div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-[12px] p-4 border border-blue-200 mb-6">
              <div className="text-[12px] text-gray-900">
                <strong>Duration:</strong> {lesson.duration} · <strong>Level:</strong> {lesson.difficulty}
              </div>
            </div>

            <button
              onClick={() => setSection('english')}
              className="w-full bg-black text-white py-3 rounded-full font-[600]"
            >
              Start Lesson →
            </button>
          </div>
        )}

        {section === 'english' && (
          <div className="pb-6">
            <h1 className="text-[28px] font-[700] mb-6">The English Bridge</h1>

            <div className="bg-blue-50 rounded-[12px] p-6 border border-blue-200 mb-6">
              <h2 className="text-[16px] font-[700] mb-4 text-blue-900">English has three main tenses</h2>
              <p className="text-[14px] text-blue-900 leading-[1.8] mb-4">
                In English, you form tenses with auxiliaries:
              </p>
              <div className="bg-white rounded-[8px] p-4 mb-4">
                <p className="text-[14px] font-[600] mb-2">• <strong>Present:</strong> "I work" (simple)</p>
                <p className="text-[14px] font-[600] mb-2">• <strong>Past:</strong> "I worked" (simple)</p>
                <p className="text-[14px] font-[600]">• <strong>Perfect:</strong> "I have worked" (with "have")</p>
              </div>
            </div>

            <div className="bg-[#f2f2f7] rounded-[12px] p-6 border border-[#e5e5ea] mb-6">
              <h2 className="text-[16px] font-[700] mb-4 text-[#121417]">Danish verbs are simpler</h2>
              <p className="text-[14px] text-[#121417] leading-[1.8] mb-4">
                Danish doesn't conjugate for person (I/you/he/she), but you must learn:
              </p>
              <div className="bg-white rounded-[8px] p-4 mb-4">
                <p className="text-[14px] font-[600] mb-2"><strong>Regular verbs:</strong> add -r (present) or -ede (past)</p>
                <p className="text-[14px] font-[600] mb-2"><strong>Strong verbs:</strong> change vowels (komme → kom)</p>
                <p className="text-[14px] font-[600]"><strong>Modals & auxiliaries:</strong> separate rules (skal, har, er)</p>
              </div>
            </div>

            <div className="bg-green-50 rounded-[12px] p-6 border border-green-200 mb-6">
              <h2 className="text-[16px] font-[700] mb-4 text-green-900">Why this matters</h2>
              <p className="text-[14px] text-green-900">
                Verbs are the backbone of Danish sentences. Master these patterns now, and you unlock almost any sentence you'll encounter.
              </p>
            </div>

            <button
              onClick={() => setSection('exercises')}
              className="w-full bg-black text-white py-3 rounded-full font-[600]"
            >
              Try Exercises →
            </button>
          </div>
        )}

        {section === 'exercises' && (
          <div className="pb-6">
            <h1 className="text-[24px] font-[700] mb-4">Practice Worksheet</h1>
            <div className="bg-gray-50 rounded-[12px] p-4 border border-gray-200 mb-6">
              <div className="flex items-center justify-between mb-2">
                <div className="text-[12px] text-gray-600 font-[600] uppercase tracking-widest">
                  Question {exerciseIndex + 1} of {exercises.length}
                </div>
                <DifficultyIndicator difficulty={currentDifficulty || 2} />
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-blue-600 h-full transition-all"
                  style={{ width: `${((exerciseIndex + 1) / exercises.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {(() => {
              const ex = exercises[exerciseIndex];
              return (
                <div>
                  <h2 className="text-[18px] font-[700] mb-4">{ex.question || ex.instruction}</h2>

                  {ex.type === 'fillblank' && (
                    <div className="bg-gray-50 rounded-[12px] p-4 border border-gray-200 mb-4">
                      <p className="text-[14px] mb-4">{ex.sentence}</p>
                      <div className="space-y-2">
                        {ex.options.map((opt, i) => (
                          <button
                            key={i}
                            onClick={() => handleExerciseAnswer(opt)}
                            className="w-full p-3 text-left border border-gray-300 rounded-[8px] hover:bg-white transition-colors text-[14px] font-[600]"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {ex.type === 'mcq' && (
                    <div className="bg-gray-50 rounded-[12px] p-4 border border-gray-200 mb-4">
                      <div className="space-y-2">
                        {ex.options.map((opt, i) => (
                          <button
                            key={i}
                            onClick={() => handleExerciseAnswer(opt.text)}
                            className="w-full p-3 text-left border border-gray-300 rounded-[8px] hover:bg-white transition-colors text-[14px] font-[600]"
                          >
                            {opt.text}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {!feedback.isCorrect && !feedback.explanation && (
                    <div className="mb-6">
                      <ConfidenceSelector
                        onSelect={(level) => setUserConfidence(level)}
                        label="How confident are you in your answer?"
                      />
                    </div>
                  )}

                  {feedback.isCorrect !== undefined && feedback.explanation && (
                    <>
                      <AttemptFeedback
                        isCorrect={feedback.isCorrect}
                        explanation={feedback.explanation}
                        weakSpot={feedback.weakSpot}
                        difficulty={currentDifficulty || 2}
                      />
                      {feedback.why && (
                        <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <p className="text-[12px] text-blue-900"><strong>Why this rule:</strong> {feedback.why}</p>
                        </div>
                      )}
                    </>
                  )}

                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setFeedback({});
                        setUserConfidence(null);
                        setExerciseStartTime(Date.now());
                        if (exerciseIndex > 0) setExerciseIndex(exerciseIndex - 1);
                      }}
                      className="flex-1 border border-gray-300 py-3 rounded-full font-[600] disabled:opacity-50"
                      disabled={exerciseIndex === 0}
                    >
                      ← Back
                    </button>
                    <button
                      onClick={() => {
                        if (exerciseIndex < exercises.length - 1) {
                          setExerciseIndex(exerciseIndex + 1);
                          setFeedback({});
                          setUserConfidence(null);
                          setExerciseStartTime(Date.now());
                        } else {
                          setSection('production');
                        }
                      }}
                      className="flex-1 bg-black text-white py-3 rounded-full font-[600]"
                    >
                      {exerciseIndex === exercises.length - 1 ? 'Next →' : 'Next →'}
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {section === 'production' && (
          <div className="pb-6">
            <h1 className="text-[24px] font-[700] mb-6">Write in Danish</h1>
            <div className="bg-blue-50 rounded-[12px] p-4 border border-blue-200 mb-6">
              <p className="text-[14px] text-blue-900">
                Write 3 sentences in Danish about your daily routine. Use both present and past tense. For example: "Jeg arbejder på kontoret" (I work in the office) and "I går arbejdede jeg hjemme" (Yesterday I worked at home).
              </p>
            </div>
            <textarea
              placeholder="Write your sentences here..."
              className="w-full p-4 border border-gray-300 rounded-[12px] mb-4 text-[14px] focus:outline-none focus:border-black"
              rows={6}
            />
            <div className="flex gap-3">
              <button
                onClick={() => setSection('exercises')}
                className="flex-1 border border-gray-300 py-3 rounded-full font-[600]"
              >
                ← Back
              </button>
              <button
                onClick={() => {
                  setQuizIndex(0);
                  setQuizAnswers({});
                  setSection('quiz');
                }}
                className="flex-1 bg-black text-white py-3 rounded-full font-[600]"
              >
                Take Quiz →
              </button>
            </div>
          </div>
        )}

        {section === 'quiz' && (
          <div className="pb-6">
            <h1 className="text-[24px] font-[700] mb-4">Quiz</h1>
            <div className="bg-gray-50 rounded-[12px] p-4 border border-gray-200 mb-6">
              <div className="text-[12px] text-gray-600 font-[600] mb-2 uppercase tracking-widest">
                Question {quizIndex + 1} of {quizItems.length}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-blue-600 h-full transition-all"
                  style={{ width: `${((quizIndex + 1) / quizItems.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {(() => {
              const q = quizItems[quizIndex];
              return (
                <div>
                  <h2 className="text-[18px] font-[700] mb-4">{q.question}</h2>

                  {q.type === 'mcq' && (
                    <div className="bg-gray-50 rounded-[12px] p-4 border border-gray-200 mb-4">
                      <div className="space-y-2">
                        {q.options.map((opt, i) => (
                          <button
                            key={i}
                            onClick={() => handleQuizAnswer(q.id, opt.text)}
                            className={`w-full p-3 text-left border rounded-[8px] transition-colors text-[14px] font-[600] ${
                              quizAnswers[q.id] === opt.text
                                ? 'bg-blue-100 border-blue-300'
                                : 'bg-white border-gray-300'
                            }`}
                          >
                            {opt.text}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        if (quizIndex > 0) setQuizIndex(quizIndex - 1);
                      }}
                      className="flex-1 border border-gray-300 py-3 rounded-full font-[600] disabled:opacity-50"
                      disabled={quizIndex === 0}
                    >
                      ← Back
                    </button>
                    <button
                      onClick={() => {
                        if (quizIndex < quizItems.length - 1) {
                          setQuizIndex(quizIndex + 1);
                        } else {
                          setSection('complete');
                        }
                      }}
                      className="flex-1 bg-black text-white py-3 rounded-full font-[600]"
                    >
                      {quizIndex === quizItems.length - 1 ? 'Finish →' : 'Next →'}
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
}
