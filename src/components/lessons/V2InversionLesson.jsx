import { useState } from 'react';

// V2 Inversion Lesson
// Duration: 35 minutes
// Structure: Explanation (5min) + English Bridge (5min) + Exercises (15min) + Production (5min) + Quiz (5min)

export default function V2InversionLesson({ lesson, onComplete, onBack }) {
  const [section, setSection] = useState('intro'); // intro, english, exercises, production, quiz, complete
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState({});
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});

  const exercises = [
    // BASIC BUILD EXERCISES (1-4)
    {
      id: 'ex1',
      type: 'build',
      instruction: 'Rearrange the words to form a correct sentence. Remember: finite verb in position 2!',
      words: ['arbejder', 'I dag', 'hjemme', 'jeg'],
      correct: 'I dag arbejder jeg hjemme.',
      explanation: 'I dag (fronted time) → verb in position 2 (arbejder) → subject (jeg). This is V2 inversion.',
      why: 'When you start a sentence with an adverbial like "I dag", the verb must still come in position 2, so the subject moves after the verb.'
    },
    {
      id: 'ex2',
      type: 'build',
      instruction: 'Rearrange the words to form a correct sentence:',
      words: ['spiser', 'morgenen', 'rugbrød', 'vi'],
      correct: 'Morgenen spiser vi rugbrød.',
      explanation: 'Morgenen (fronted time) → spiser (verb) → vi (subject). Time expressions trigger V2 inversion.',
      why: 'Any fronted adverbial requires the verb to come in position 2.'
    },
    {
      id: 'ex3',
      type: 'build',
      instruction: 'Rearrange the words to form a correct sentence:',
      words: ['ikke', 'kan', 'jeg', 'det'],
      correct: 'Det kan jeg ikke.',
      explanation: 'Det (object fronted) → kan (verb) → jeg (subject) → ikke (negation at end).',
      why: 'Even when you front the object (det), the verb still comes in position 2.'
    },
    {
      id: 'ex4',
      type: 'build',
      instruction: 'Rearrange the words to form a correct sentence:',
      words: ['skal', 'i morgen', 'møde', 'han', 'mig'],
      correct: 'I morgen skal han møde mig.',
      explanation: 'I morgen (fronted time) → skal (verb) → han (subject) → møde (infinitive) → mig (object).',
      why: 'Modal verbs like "skal" also follow the V2 rule in position 2.'
    },

    // MCQ EXERCISES (5-10)
    {
      id: 'ex5',
      type: 'mcq',
      question: 'Choose the correct sentence:',
      options: [
        { text: 'I dag jeg arbejder hjemme.', correct: false, why: 'Verb should come before the subject when something is fronted.' },
        { text: 'Jeg arbejder i dag hjemme.', correct: false, why: 'Possible, but this is not V2 inversion.' },
        { text: 'I dag arbejder jeg hjemme.', correct: true, why: 'Correct! V2 is maintained: fronted element (I dag) → verb (arbejder) → subject (jeg).' }
      ],
      explanation: 'V2 word order means the finite verb always comes in the second position, regardless of what comes first.'
    },
    {
      id: 'ex6',
      type: 'mcq',
      question: 'Which sentence has correct V2 inversion?',
      options: [
        { text: 'Aldrig jeg har hørt det før.', correct: false, why: 'The verb "har" should come before "jeg".' },
        { text: 'Aldrig har jeg hørt det før.', correct: true, why: 'Correct! Aldrig → har (verb) → jeg (subject) → rest of sentence.' },
        { text: 'Jeg aldrig har hørt det før.', correct: false, why: 'This is standard word order, not V2 inversion.' }
      ],
      explanation: 'Central adverbials like "aldrig" (never) trigger V2 inversion just like other fronted elements.'
    },
    {
      id: 'ex7',
      type: 'mcq',
      question: 'Pick the correct sentence:',
      options: [
        { text: 'Gårdag gik vi til biografen.', correct: true, why: 'Correct! Gårdag (time) → gik (verb) → vi (subject).' },
        { text: 'Gårdag vi gik til biografen.', correct: false, why: 'Subject comes too early; verb should be in position 2.' },
        { text: 'Vi gik gårdag til biografen.', correct: false, why: 'No inversion; verb is in position 2 only because nothing is fronted.' }
      ],
      explanation: 'When you front a time expression (gårdag = yesterday), the verb must follow in position 2.'
    },
    {
      id: 'ex8',
      type: 'mcq',
      question: 'Which is correct?',
      options: [
        { text: 'Kun jeg kan det.', correct: false, why: '"Kun" (only) triggers inversion, so the verb should come first, but there is no main verb here.' },
        { text: 'Kun kan jeg det.', correct: true, why: 'Correct! Kun (fronted adverbial) → kan (verb) → jeg (subject). Modal verb "kan" in position 2.' },
        { text: 'Jeg kun kan det.', correct: false, why: 'No inversion; "kan" is not in position 2.' }
      ],
      explanation: 'Restrictive adverbials like "kun" (only) trigger V2 inversion with modal verbs too.'
    },
    {
      id: 'ex9',
      type: 'mcq',
      question: 'Select the correct version:',
      options: [
        { text: 'I morgen skal jeg på arbejde.', correct: true, why: 'Correct! I morgen → skal → jeg. The modal verb "skal" is in position 2.' },
        { text: 'I morgen jeg skal på arbejde.', correct: false, why: 'Subject comes before the verb; verb should be in position 2.' },
        { text: 'Jeg skal i morgen på arbejde.', correct: false, why: 'No inversion; standard word order.' }
      ],
      explanation: 'Time expressions like "i morgen" (tomorrow) always trigger V2 inversion, even with modal verbs.'
    },

    // FILL-IN-THE-BLANK EXERCISES (10-14)
    {
      id: 'ex10',
      type: 'fillblank',
      instruction: 'Fill in the missing verb:',
      sentence: 'Aldrig _____ jeg så noget sådan før.',
      options: ['har', 'jeg har', 'ville'],
      correct: 'har',
      explanation: 'Aldrig (fronted adverbial) → verb (har) → subject (jeg). The verb "har" must come in position 2.',
      why: 'Central adverbials like "aldrig" trigger inversion. The main verb moves to position 2.'
    },
    {
      id: 'ex11',
      type: 'fillblank',
      instruction: 'Fill in the missing verb (present tense of "blive"):',
      sentence: 'I dag _____ det meget koldt.',
      options: ['bliver', 'det bliver', 'vil blive'],
      correct: 'bliver',
      explanation: 'I dag (fronted time) → bliver (verb) → det (subject/placeholder). Verb in position 2.',
      why: 'Even weather/impersonal sentences follow V2 inversion.'
    },
    {
      id: 'ex12',
      type: 'fillblank',
      instruction: 'Fill in the missing auxiliary verb:',
      sentence: 'Kun på weekender _____ vi tid til hinanden.',
      options: ['har', 'vi har', 'kunne'],
      correct: 'har',
      explanation: 'Kun på weekender (fronted adverbial phrase) → har (verb) → vi (subject).',
      why: 'Multi-word adverbials also trigger V2 inversion.'
    },
    {
      id: 'ex13',
      type: 'fillblank',
      instruction: 'Fill in the missing modal verb:',
      sentence: 'Aldrig _____ vi give op på vores drømme.',
      options: ['vil', 'vi vil', 'skulle'],
      correct: 'vil',
      explanation: 'Aldrig (fronted) → vil (modal verb in position 2) → vi (subject) → infinitive (give).',
      why: 'Modal verbs follow the same V2 rule as main verbs.'
    },

    // TRANSFORMATION EXERCISES (14-20)
    {
      id: 'ex14',
      type: 'transformation',
      instruction: 'Transform the sentence to start with "Forrige år":',
      original: 'Jeg rejste til Danmark forrige år.',
      blanks: ['Forrige år', '___', 'jeg', 'til Danmark.'],
      correct: 'rejste',
      explanation: 'Forrige år (fronted time) → rejste (verb) → jeg (subject). Past tense of "rejse".',
      why: 'Any fronted adverbial requires the verb to move to position 2, creating the inversion pattern.'
    },
    {
      id: 'ex15',
      type: 'transformation',
      instruction: 'Transform the sentence to start with "Gårdagen":',
      original: 'Han kom hjem fra arbejde gårdagen.',
      blanks: ['Gårdagen', '___', 'han', 'hjem fra arbejde.'],
      correct: 'kom',
      explanation: 'Gårdagen (fronted time) → kom (past tense of komme) → han (subject).',
      why: 'When you move a time expression to the front, the verb follows in position 2.'
    },
    {
      id: 'ex16',
      type: 'transformation',
      instruction: 'Transform to start with "I dag":',
      original: 'Vi skal mødes med venner i dag.',
      blanks: ['I dag', '___', 'vi', 'mødes med venner.'],
      correct: 'skal',
      explanation: 'I dag (fronted time) → skal (modal verb in position 2) → vi (subject) → mødes (infinitive).',
      why: 'Modal verbs in position 2 are followed by the infinitive form of the main verb.'
    },
    {
      id: 'ex17',
      type: 'transformation',
      instruction: 'Transform to start with "Næste uge":',
      original: 'Jeg skal begynde på det nye job næste uge.',
      blanks: ['Næste uge', '___', 'jeg', 'begynde på det nye job.'],
      correct: 'skal',
      explanation: 'Næste uge (fronted time) → skal (modal verb in position 2) → jeg (subject) → begynde (infinitive).',
      why: 'Modal verbs always come in position 2, followed by infinitives.'
    },
    {
      id: 'ex18',
      type: 'transformation',
      instruction: 'Transform to start with "Aldrig":',
      original: 'Jeg vil give op på mine mål.',
      blanks: ['Aldrig', '___', 'jeg', 'give op på mine mål.'],
      correct: 'vil',
      explanation: 'Aldrig (fronted central adverbial) → vil (modal verb in position 2) → jeg (subject) → infinitive (give).',
      why: 'Central adverbials trigger the same V2 inversion as time expressions.'
    },
    {
      id: 'ex19',
      type: 'transformation',
      instruction: 'Transform to start with "Det":',
      original: 'Jeg kan ikke forstå det.',
      blanks: ['Det', '___', 'jeg', 'ikke forstå.'],
      correct: 'kan',
      explanation: 'Det (fronted object) → kan (modal verb in position 2) → jeg (subject) → ikke (negation) → forstå (infinitive).',
      why: 'Even objects can be fronted, triggering V2 inversion.'
    },
    {
      id: 'ex20',
      type: 'transformation',
      instruction: 'Transform to start with "Kun på weekends":',
      original: 'Vi har tid til at være sammen kun på weekends.',
      blanks: ['Kun på weekends', '___', 'vi', 'tid til at være sammen.'],
      correct: 'har',
      explanation: 'Kun på weekends (fronted adverbial phrase) → har (verb in position 2) → vi (subject) → rest of sentence.',
      why: 'Multi-word adverbial phrases trigger the same V2 rule.'
    }
  ];

  const quizItems = [
    {
      id: 'q1',
      type: 'mcq',
      question: 'Where does the finite verb go in a V2 sentence?',
      options: [
        { text: 'In position 1', correct: false },
        { text: 'In position 2', correct: true },
        { text: 'In position 3', correct: false }
      ]
    },
    {
      id: 'q2',
      type: 'mcq',
      question: 'Choose the correct sentence:',
      options: [
        { text: 'Jeg i dag arbejder.', correct: false },
        { text: 'I dag arbejder jeg.', correct: true },
        { text: 'Arbejder jeg i dag.', correct: false }
      ]
    },
    {
      id: 'q3',
      type: 'sentence',
      question: 'Form a sentence starting with "Aldrig" using the words: aldrig, jeg, været, så, sådan',
      correctStarts: ['aldrig', 'været'],
      explanation: 'Should be: "Aldrig været jeg så sådan." (verb in position 2)'
    },
    {
      id: 'q4',
      type: 'mcq',
      question: 'What happens to the subject when you start with a time expression?',
      options: [
        { text: 'It comes first', correct: false },
        { text: 'It comes after the verb', correct: true },
        { text: 'It disappears', correct: false }
      ]
    },
    {
      id: 'q5',
      type: 'mcq',
      question: 'Which sentence shows correct V2 inversion?',
      options: [
        { text: 'Jeg rejste i dag til butikken.', correct: false },
        { text: 'I dag rejste jeg til butikken.', correct: true },
        { text: 'Rejste i dag jeg til butikken.', correct: false }
      ]
    }
  ];

  const handleExerciseAnswer = (answer) => {
    const exercise = exercises[exerciseIndex];
    let isCorrect = false;

    if (exercise.type === 'build') {
      isCorrect = answer.trim() === exercise.correct.trim();
    } else if (exercise.type === 'fillblank' || exercise.type === 'transformation') {
      isCorrect = answer.trim().toLowerCase() === exercise.correct.trim().toLowerCase();
    } else if (exercise.type === 'mcq') {
      isCorrect = answer === exercise.correct;
    }

    setFeedback({
      isCorrect,
      explanation: exercise.explanation,
      why: exercise.why
    });
  };

  const handleQuizAnswer = (qid, answer) => {
    setQuizAnswers(prev => ({ ...prev, [qid]: answer }));
  };

  const calculateQuizScore = () => {
    let correct = 0;
    quizItems.forEach(item => {
      if (item.type === 'mcq') {
        const selectedOption = item.options.find(o => o.text === quizAnswers[item.id]);
        if (selectedOption?.correct) correct++;
      } else if (item.type === 'sentence') {
        const answer = quizAnswers[item.id] || '';
        if (item.correctStarts.some(start => answer.toLowerCase().startsWith(start.toLowerCase()))) {
          correct++;
        }
      }
    });
    return Math.round((correct / quizItems.length) * 100);
  };

  // Render based on section
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
        {/* Header with progress */}
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
            {section === 'exercises' && `Exercise ${exerciseIndex + 1}/${exercises.length}`}
            {section === 'production' && 'Write in Danish'}
            {section === 'quiz' && `Question ${quizIndex + 1}/${quizItems.length}`}
          </div>
        </div>

        {/* INTRO SECTION */}
        {section === 'intro' && (
          <div className="pb-6">
            <h1 className="text-[32px] font-[700] mb-2">{lesson.title}</h1>
            <p className="text-[16px] text-gray-600 mb-8">{lesson.description}</p>

            <div className="bg-gray-50 rounded-[12px] p-6 border border-gray-200 mb-6">
              <h2 className="text-[16px] font-[700] mb-4">What You'll Learn</h2>
              <ul className="space-y-3 text-[14px]">
                <li className="flex gap-3">
                  <span className="text-blue-600 font-[700]">1.</span>
                  <span>Why the Danish verb always comes second (V2 rule)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-600 font-[700]">2.</span>
                  <span>How to recognize when inversion happens</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-600 font-[700]">3.</span>
                  <span>How to apply it in real sentences</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-600 font-[700]">4.</span>
                  <span>Common mistakes and why they happen</span>
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

        {/* ENGLISH BRIDGE SECTION */}
        {section === 'english' && (
          <div className="pb-6">
            <h1 className="text-[28px] font-[700] mb-6">The English Bridge</h1>

            <div className="bg-blue-50 rounded-[12px] p-6 border border-blue-200 mb-6">
              <h2 className="text-[16px] font-[700] mb-4 text-blue-900">You already do this in English</h2>
              <p className="text-[14px] text-blue-900 leading-[1.8] mb-4">
                When you want to emphasize something, English puts it first and flips the subject and verb:
              </p>
              <div className="bg-white rounded-[8px] p-4 mb-4">
                <p className="text-[14px] font-[600] mb-2">Normal: I have never seen anything like it.</p>
                <p className="text-[14px] font-[600] text-blue-700">Emphasis: Never have I seen anything like it.</p>
                <p className="text-[12px] text-gray-600 mt-2">Notice: the verb "have" jumps to position 2.</p>
              </div>
              <p className="text-[14px] text-blue-900">
                You use this inversion in English for emphasis with certain adverbials (Never, Rarely, Hardly, Scarcely, Only).
              </p>
            </div>

            <div className="bg-amber-50 rounded-[12px] p-6 border border-amber-200 mb-6">
              <h2 className="text-[16px] font-[700] mb-4 text-amber-900">Here's where Danish is different</h2>
              <p className="text-[14px] text-amber-900 leading-[1.8] mb-4">
                In Danish, **every sentence does this**. The verb must always come in position 2, no matter what comes first.
              </p>
              <div className="bg-white rounded-[8px] p-4 mb-4">
                <p className="text-[14px] font-[600] mb-2">Normal word order:</p>
                <p className="text-[14px] font-[600] mb-4">Jeg arbejder i dag hjemme.</p>
                <p className="text-[14px] font-[600] mb-2">Fronted adverbial:</p>
                <p className="text-[14px] font-[600] text-amber-700">I dag arbejder jeg hjemme.</p>
                <p className="text-[12px] text-gray-600 mt-2">
                  Position 1: I dag (fronted) | Position 2: arbejder (verb) | Position 3: jeg (subject)
                </p>
              </div>
            </div>

            <div className="bg-green-50 rounded-[12px] p-6 border border-green-200 mb-6">
              <h2 className="text-[16px] font-[700] mb-4 text-green-900">The Key Insight</h2>
              <p className="text-[14px] text-green-900">
                You don't need to learn a new rule. You already know inversion from English. Danish just uses it <strong>all the time</strong>, not just for emphasis. Run the same mechanism on every sentence.
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

        {/* EXERCISES SECTION */}
        {section === 'exercises' && (
          <div className="pb-6">
            <h1 className="text-[24px] font-[700] mb-4">Practice Worksheet</h1>
            <div className="bg-gray-50 rounded-[12px] p-4 border border-gray-200 mb-6">
              <div className="text-[12px] text-gray-600 font-[600] mb-2 uppercase tracking-widest">
                Question {exerciseIndex + 1} of {exercises.length}
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
                  <h2 className="text-[18px] font-[700] mb-4">{ex.instruction}</h2>

                  {ex.type === 'build' && (
                    <div className="bg-gray-50 rounded-[12px] p-4 border border-gray-200 mb-4">
                      <div className="text-[12px] text-gray-600 font-[600] mb-3 uppercase">Words to arrange:</div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {ex.words.map((word, i) => (
                          <div
                            key={i}
                            className="px-3 py-2 bg-white border border-gray-300 rounded-full text-[14px] font-[600]"
                          >
                            {word}
                          </div>
                        ))}
                      </div>
                      <input
                        type="text"
                        placeholder="Type the complete sentence..."
                        onBlur={(e) => handleExerciseAnswer(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-[8px] text-[14px]"
                      />
                    </div>
                  )}

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

                  {ex.type === 'transformation' && (
                    <div className="bg-gray-50 rounded-[12px] p-4 border border-gray-200 mb-4">
                      <p className="text-[12px] text-gray-600 font-[600] mb-3 uppercase">Original sentence:</p>
                      <p className="text-[14px] font-[600] mb-4">{ex.original}</p>
                      <p className="text-[12px] text-gray-600 font-[600] mb-3 uppercase">Transform to:</p>
                      <div className="flex items-center gap-2 mb-4">
                        {ex.blanks.map((blank, i) => (
                          blank === '___' ? (
                            <input
                              key={i}
                              type="text"
                              placeholder="word"
                              onBlur={(e) => handleExerciseAnswer(e.target.value)}
                              className="flex-1 p-2 border border-gray-300 rounded-[6px] text-[14px] text-center"
                            />
                          ) : (
                            <span key={i} className="text-[14px] font-[600]">{blank}</span>
                          )
                        ))}
                      </div>
                    </div>
                  )}

                  {feedback && (
                    <div className={`rounded-[12px] p-4 border mb-4 ${
                      feedback.isCorrect
                        ? 'bg-green-50 border-green-200'
                        : 'bg-red-50 border-red-200'
                    }`}>
                      <p className={`text-[14px] font-[700] mb-2 ${
                        feedback.isCorrect ? 'text-green-800' : 'text-red-800'
                      }`}>
                        {feedback.isCorrect ? '✓ Correct!' : '✗ Not quite right.'}
                      </p>
                      <p className="text-[13px] text-gray-900 mb-2"><strong>Why:</strong> {feedback.why}</p>
                      <p className="text-[13px] text-gray-900"><strong>Explanation:</strong> {feedback.explanation}</p>
                    </div>
                  )}

                  <div className="flex gap-3">
                    {exerciseIndex > 0 && (
                      <button
                        onClick={() => {
                          setExerciseIndex(exerciseIndex - 1);
                          setFeedback(null);
                        }}
                        className="flex-1 border border-gray-300 py-3 rounded-full font-[600]"
                      >
                        Previous
                      </button>
                    )}
                    <button
                      onClick={() => {
                        if (exerciseIndex < exercises.length - 1) {
                          setExerciseIndex(exerciseIndex + 1);
                          setFeedback(null);
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

        {/* PRODUCTION SECTION */}
        {section === 'production' && (
          <div className="pb-6">
            <h1 className="text-[24px] font-[700] mb-4">Write in Danish</h1>
            <div className="bg-gray-50 rounded-[12px] p-4 border border-gray-200 mb-4">
              <p className="text-[14px] text-gray-900 mb-4">
                Write three sentences in Danish, each starting with a different adverbial. Remember: verb in position 2!
              </p>
              <textarea
                placeholder="Start with 'I dag ...', then 'Aldrig ...', then 'Morgenen ...'"
                className="w-full p-3 border border-gray-300 rounded-[8px] text-[14px] h-32 resize-none"
              />
            </div>
            <button
              onClick={() => setSection('quiz')}
              className="w-full bg-black text-white py-3 rounded-full font-[600]"
            >
              Continue to Quiz →
            </button>
          </div>
        )}

        {/* QUIZ SECTION */}
        {section === 'quiz' && (
          <div className="pb-6">
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
              const item = quizItems[quizIndex];
              return (
                <div>
                  <h2 className="text-[18px] font-[700] mb-4">{item.question}</h2>

                  {item.type === 'mcq' && (
                    <div className="space-y-2 mb-6">
                      {item.options.map((opt, i) => (
                        <button
                          key={i}
                          onClick={() => handleQuizAnswer(item.id, opt.text)}
                          className={`w-full p-3 text-left border rounded-[8px] transition-colors text-[14px] font-[600] ${
                            quizAnswers[item.id] === opt.text
                              ? 'bg-blue-100 border-blue-500'
                              : 'border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {opt.text}
                        </button>
                      ))}
                    </div>
                  )}

                  {item.type === 'sentence' && (
                    <input
                      type="text"
                      placeholder="Write your sentence here..."
                      value={quizAnswers[item.id] || ''}
                      onChange={(e) => handleQuizAnswer(item.id, e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-[8px] text-[14px] mb-6"
                    />
                  )}

                  <div className="flex gap-3">
                    {quizIndex > 0 && (
                      <button
                        onClick={() => setQuizIndex(quizIndex - 1)}
                        className="flex-1 border border-gray-300 py-3 rounded-full font-[600]"
                      >
                        Previous
                      </button>
                    )}
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
