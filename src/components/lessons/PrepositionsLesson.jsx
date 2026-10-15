import { useState } from 'react';
import { useExerciseSubmission, AttemptFeedback, DifficultyIndicator, ConfidenceSelector } from '../AdaptiveExerciseWrapper';

// Prepositions Lesson
// Duration: 35 minutes
// Structure: Explanation (5min) + English Bridge (5min) + Exercises (15min) + Production (5min) + Quiz (5min)

export default function PrepositionsLesson({ lesson, onComplete, onBack, onAttemptRecorded, currentDifficulty }) {
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
    lesson?.id || 'prepositions',
    `ex${exerciseIndex + 1}`,
    'Prepositions',
    currentDifficulty || 2
  );

  const exercises = [
    // BASIC LOCATION PREPOSITIONS (1-4)
    {
      id: 'ex1',
      type: 'mcq',
      question: 'Where is the book? Choose the correct preposition:',
      options: [
        { text: 'Bogen er på bordet.', correct: true, why: 'Correct! "På" means "on" (on top of surface).' },
        { text: 'Bogen er i bordet.', correct: false, why: '"I" means "in" (inside). The book is on top, not inside the table.' },
        { text: 'Bogen er ved bordet.', correct: false, why: '"Ved" means "at" (near/beside). Use "på" for on top of.' }
      ],
      explanation: 'Location prepositions: "på" (on surface), "i" (inside), "ved" (at/beside), "under" (under).'
    },
    {
      id: 'ex2',
      type: 'fillblank',
      instruction: 'Fill in the correct preposition (i, på, ved, under):',
      sentence: 'Nøglerne ligger _____ sengen.',
      options: ['i', 'på', 'under'],
      correct: 'under',
      explanation: 'Keys lying "under" the bed. "Under" = underneath.',
      why: 'When something is beneath another object, use "under".'
    },
    {
      id: 'ex3',
      type: 'mcq',
      question: 'Complete the sentence correctly:',
      options: [
        { text: 'Jeg bor i København.', correct: true, why: 'Correct! Use "i" for cities and enclosed spaces.' },
        { text: 'Jeg bor på København.', correct: false, why: '"På" is for surfaces or islands. For cities, use "i".' },
        { text: 'Jeg bor ved København.', correct: false, why: '"Ved" means at/near. For living in a city, use "i".' }
      ],
      explanation: 'Cities use "i" (in), not "på". Exception: islands use "på" (på Sjælland).'
    },
    {
      id: 'ex4',
      type: 'fillblank',
      instruction: 'Fill in the correct preposition (i, på, ved):',
      sentence: 'Vi mødes _____ stationen.',
      options: ['i', 'på', 'ved'],
      correct: 'ved',
      explanation: 'Meeting "at" the station. "Ved" = at a specific place.',
      why: '"Ved" is used for meeting at or near a specific location like a station.'
    },

    // MOVEMENT/DIRECTION PREPOSITIONS (5-9)
    {
      id: 'ex5',
      type: 'mcq',
      question: 'Which sentence is correct?',
      options: [
        { text: 'Jeg går til arbejde hver dag.', correct: true, why: 'Correct! "Til" means "to" (destination/direction).' },
        { text: 'Jeg går i arbejde hver dag.', correct: false, why: '"I" means "in". Use "til" for going to a destination.' },
        { text: 'Jeg går på arbejde hver dag.', correct: false, why: 'Possible but less common. "Til" is standard for direction.' }
      ],
      explanation: 'Direction: "til" (to), "fra" (from), "mod" (towards), "gennem" (through).'
    },
    {
      id: 'ex6',
      type: 'fillblank',
      instruction: 'Fill in the correct preposition (til, fra, mod, gennem):',
      sentence: 'Hun kører _____ arbejde efter mødet.',
      options: ['til', 'fra', 'mod'],
      correct: 'fra',
      explanation: 'She is going "from" work after the meeting. "Fra" = from.',
      why: 'Use "fra" when indicating the starting point or leaving from a place.'
    },
    {
      id: 'ex7',
      type: 'mcq',
      question: 'Choose the correct preposition:',
      options: [
        { text: 'Vi løber mod stranden.', correct: true, why: 'Correct! "Mod" means "towards". The runners are heading toward the beach.' },
        { text: 'Vi løber til stranden.', correct: false, why: 'Also possible, but "mod" specifically emphasizes the direction/movement.' },
        { text: 'Vi løber gennem stranden.', correct: false, why: '"Gennem" means "through", not "towards".' }
      ],
      explanation: '"Mod" emphasizes movement in the direction of something; "til" is more general destination.'
    },
    {
      id: 'ex8',
      type: 'fillblank',
      instruction: 'Fill in the correct preposition (gennem, til, fra):',
      sentence: 'Vi gik _____ parken på vej hjem.',
      options: ['gennem', 'til', 'fra'],
      correct: 'gennem',
      explanation: 'We walked "through" the park on the way home. "Gennem" = through.',
      why: 'Use "gennem" when passing through or across a place.'
    },

    // TIME PREPOSITIONS (9-13)
    {
      id: 'ex9',
      type: 'mcq',
      question: 'Which is correct?',
      options: [
        { text: 'Mødet er på mandag.', correct: true, why: 'Correct! Days of week use "på".' },
        { text: 'Mødet er i mandag.', correct: false, why: 'Days use "på", not "i". (Though "i dag" = "today" is an exception.)' },
        { text: 'Mødet er ved mandag.', correct: false, why: '"Ved" is not used for days of the week.' }
      ],
      explanation: 'Days of week: "på mandag" (on Monday). Exception: "i dag" (today).'
    },
    {
      id: 'ex10',
      type: 'fillblank',
      instruction: 'Fill in the correct preposition (på, i, fra):',
      sentence: 'Vi er lukket _____ september.',
      options: ['på', 'i', 'fra'],
      correct: 'i',
      explanation: 'Closed "in" September. Months use "i".',
      why: 'Use "i" for months (i september, i juli) and longer time periods.'
    },
    {
      id: 'ex11',
      type: 'mcq',
      question: 'Choose the correct preposition:',
      options: [
        { text: 'Jeg starter på nye job i januar.', correct: true, why: 'Correct! "I" for months, "på" for job/position.' },
        { text: 'Jeg starter i nye job i januar.', correct: false, why: 'Jobs use "på" (på et nyt job), not "i".' },
        { text: 'Jeg starter på nye job på januar.', correct: false, why: 'Months use "i" (i januar), not "på".' }
      ],
      explanation: 'Jobs: "på et job". Months: "i januar". Time expressions combine both rules.'
    },
    {
      id: 'ex12',
      type: 'fillblank',
      instruction: 'Fill in the correct preposition (fra, til, i):',
      sentence: 'Skolen er åben _____ 8 til 16 hver dag.',
      options: ['fra', 'i', 'på'],
      correct: 'fra',
      explanation: '"From" 8 to 4 every day. "Fra...til" = from...to (time ranges).',
      why: 'Use "fra...til" to indicate a time range (from X to Y).'
    },

    // RELATIONSHIP/CONNECTION PREPOSITIONS (13-17)
    {
      id: 'ex13',
      type: 'mcq',
      question: 'Which sentence is correct?',
      options: [
        { text: 'Jeg taler med min veninde hver dag.', correct: true, why: 'Correct! "Med" means "with". Speaking with someone.' },
        { text: 'Jeg taler i min veninde hver dag.', correct: false, why: '"I" means "in". Use "med" for "with".' },
        { text: 'Jeg taler ved min veninde hver dag.', correct: false, why: '"Ved" means "at". Use "med" for speaking with someone.' }
      ],
      explanation: 'Relationship: "med" (with), "om" (about), "til" (to = speak to/communicate), "for" (for).'
    },
    {
      id: 'ex14',
      type: 'fillblank',
      instruction: 'Fill in the correct preposition (med, om, til, for):',
      sentence: 'Jeg taler _____ min chef _____ lønstigningen.',
      options: ['med...om', 'til...for', 'med...til'],
      correct: 'med...om',
      explanation: 'Speaking with my boss about the raise. "Med" (with) + "om" (about).',
      why: 'Combine "med" for talking with someone and "om" for the topic.'
    },
    {
      id: 'ex15',
      type: 'mcq',
      question: 'Choose the correct version:',
      options: [
        { text: 'Dette er en gave for dig.', correct: true, why: 'Correct! "For" means "for". A gift for you.' },
        { text: 'Dette er en gave til dig.', correct: false, why: '"Til" also means "for" but is less common in this context. "For" is more natural.' },
        { text: 'Dette er en gave med dig.', correct: false, why: '"Med" means "with". Use "for" for gifts intended for someone.' }
      ],
      explanation: '"For" = for (intended for), "til" = to/for (less common), "med" = with.'
    },
    {
      id: 'ex16',
      type: 'fillblank',
      instruction: 'Fill in the correct preposition (til, om, med):',
      sentence: 'Hun skrev en mail _____ sit familie _____ ferien.',
      options: ['til...om', 'med...for', 'til...til'],
      correct: 'til...om',
      explanation: 'She wrote an email to her family about the vacation. "Til" (to) + "om" (about).',
      why: 'Use "til" for writing to someone and "om" for the subject.'
    },

    // COMPLEX COMBINATIONS (17-20)
    {
      id: 'ex17',
      type: 'transformation',
      instruction: 'Transform to use the preposition shown:',
      original: 'Jeg bor i København ved siden af parken.',
      blanks: ['Jeg bor', '___', 'København', 'ved siden af parken.'],
      correct: 'i',
      explanation: 'Living in Copenhagen (city = "i").',
      why: 'Cities always use "i", even when combined with other location details.'
    },
    {
      id: 'ex18',
      type: 'mcq',
      question: 'Which sentence uses prepositions correctly?',
      options: [
        { text: 'Fra mandag til fredag arbejder jeg på kontoret.', correct: true, why: 'Correct! Time range "fra...til" + location "på kontoret".' },
        { text: 'I mandag til fredag arbejder jeg i kontoret.', correct: false, why: 'Should be "fra mandag til fredag" (not "i mandag") and "på kontoret" (not "i kontoret").' },
        { text: 'Fra på mandag til på fredag arbejder jeg ved kontoret.', correct: false, why: 'Awkward phrasing. Use "fra mandag til fredag" and "på kontoret".' }
      ],
      explanation: 'Multiple prepositions in one sentence: time range + location require correct pairing.'
    },
    {
      id: 'ex19',
      type: 'fillblank',
      instruction: 'Fill in the correct prepositions:',
      sentence: 'Jeg mødes _____ mine kollegaer _____ mødet og vi diskuterer _____ projektet.',
      options: ['med...før...om', 'til...på...for', 'ved...i...til'],
      correct: 'med...før...om',
      explanation: 'Meeting with colleagues before the meeting and discussing about the project.',
      why: '"Med" (with people), "før" (before time), "om" (about topic).'
    },
    {
      id: 'ex20',
      type: 'mcq',
      question: 'Which is the most natural and correct sentence?',
      options: [
        { text: 'Vi gå gennem parken fra arbejde til hjem på vejene.', correct: false, why: 'Grammar issues and awkward preposition use.' },
        { text: 'Vi går gennem parken fra arbejdet til hjemmet.', correct: true, why: 'Correct! "Gennem" (through), "fra...til" (from...to with proper articles).' },
        { text: 'Vi går på parken fra arbejde gennem hjemmet.', correct: false, why: '"På" is wrong for parks; use "i" or "gennem". Order is illogical.' }
      ],
      explanation: 'Complex sentence: direction + movement prepositions + proper articles with nouns.'
    }
  ];

  const quizItems = [
    {
      id: 'q1',
      type: 'mcq',
      question: 'Where does "på" mean "on" vs. "in"?',
      options: [
        { text: 'Both mean the same thing in Danish', correct: false },
        { text: '"På" = on top of surface; "i" = inside', correct: true },
        { text: '"På" is used for all location meanings', correct: false }
      ]
    },
    {
      id: 'q2',
      type: 'mcq',
      question: 'Which preposition do you use for cities?',
      options: [
        { text: 'på', correct: false },
        { text: 'i', correct: true },
        { text: 'ved', correct: false }
      ]
    },
    {
      id: 'q3',
      type: 'mcq',
      question: 'What does "fra...til" mean?',
      options: [
        { text: 'From...through', correct: false },
        { text: 'From...to (a range)', correct: true },
        { text: 'At...to', correct: false }
      ]
    },
    {
      id: 'q4',
      type: 'mcq',
      question: 'Which preposition means "with" (accompanying someone)?',
      options: [
        { text: 'ved', correct: false },
        { text: 'til', correct: false },
        { text: 'med', correct: true }
      ]
    },
    {
      id: 'q5',
      type: 'sentence',
      question: 'Complete: "Jeg bor _____ Danmark og arbejder _____ en kontor _____ København."',
      correctStarts: ['i danmark', 'på en', 'i københavnn'],
      explanation: 'Should be: "Jeg bor i Danmark og arbejder på et kontor i København."'
    }
  ];

  const handleExerciseAnswer = async (answer) => {
    const exercise = exercises[exerciseIndex];
    let isCorrect = false;
    let errorType = 'UDT'; // Default: unknown error

    if (exercise.type === 'fillblank') {
      isCorrect = answer.trim().toLowerCase() === exercise.correct.trim().toLowerCase();
      if (!isCorrect) errorType = 'PRÆ'; // Preposition error
    } else if (exercise.type === 'mcq') {
      isCorrect = answer === exercise.correct;
      if (!isCorrect) errorType = 'VALG'; // Selection error
    } else if (exercise.type === 'transformation') {
      isCorrect = answer.trim().toLowerCase() === exercise.correct.trim().toLowerCase();
      if (!isCorrect) errorType = 'PRÆ'; // Preposition error
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
      if (item.type === 'mcq') {
        const selectedOption = item.options.find(o => o.text === quizAnswers[item.id]);
        if (selectedOption?.correct) correct++;
      } else if (item.type === 'sentence') {
        const answer = quizAnswers[item.id] || '';
        if (item.correctStarts.some(start => answer.toLowerCase().includes(start.toLowerCase()))) {
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
            {section === 'exercises' && `Question ${exerciseIndex + 1}/${exercises.length}`}
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
                  <span>Common Danish prepositions and their meanings</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-600 font-[700]">2.</span>
                  <span>Location prepositions (i, på, ved, under)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-600 font-[700]">3.</span>
                  <span>Direction and movement prepositions (til, fra, mod, gennem)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-600 font-[700]">4.</span>
                  <span>Time and relationship prepositions and when to use them</span>
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
              <h2 className="text-[16px] font-[700] mb-4 text-blue-900">You already use prepositions</h2>
              <p className="text-[14px] text-blue-900 leading-[1.8] mb-4">
                In English, you use different prepositions depending on context:
              </p>
              <div className="bg-white rounded-[8px] p-4 mb-4">
                <p className="text-[14px] font-[600] mb-2">• "I live <strong>in</strong> Copenhagen"</p>
                <p className="text-[14px] font-[600] mb-2">• "The book is <strong>on</strong> the table"</p>
                <p className="text-[14px] font-[600] mb-2">• "I walk <strong>to</strong> school"</p>
                <p className="text-[14px] font-[600]">• "I speak <strong>with</strong> my friend <strong>about</strong> the plan"</p>
              </div>
            </div>

            <div className="bg-amber-50 rounded-[12px] p-6 border border-amber-200 mb-6">
              <h2 className="text-[16px] font-[700] mb-4 text-amber-900">Danish prepositions work similarly, but with differences</h2>
              <p className="text-[14px] text-amber-900 leading-[1.8] mb-4">
                Danish has its own logic for prepositions. The same word might translate differently depending on context:
              </p>
              <div className="bg-white rounded-[8px] p-4 mb-4">
                <p className="text-[14px] font-[600] mb-2"><strong>"i"</strong> = in (cities, spaces), but NOT for surfaces</p>
                <p className="text-[14px] font-[600] mb-2"><strong>"på"</strong> = on (surfaces), and also days/jobs</p>
                <p className="text-[14px] font-[600] mb-2"><strong>"ved"</strong> = at (near a place), not "on"</p>
                <p className="text-[14px] font-[600]"><strong>"til"</strong> = to (direction), and also "for" (giving)</p>
              </div>
            </div>

            <div className="bg-green-50 rounded-[12px] p-6 border border-green-200 mb-6">
              <h2 className="text-[16px] font-[700] mb-4 text-green-900">The Pattern</h2>
              <p className="text-[14px] text-green-900">
                Danish prepositions are about <strong>spatial relationships</strong> (inside vs. on top vs. near) and <strong>direction</strong> (to vs. from). Learn the categories, and you'll see the logic quickly.
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

                  {ex.type === 'transformation' && (
                    <div className="bg-gray-50 rounded-[12px] p-4 border border-gray-200 mb-4">
                      <p className="text-[12px] text-gray-600 font-[600] mb-3 uppercase">Original sentence:</p>
                      <p className="text-[14px] font-[600] mb-4">{ex.original}</p>
                      <p className="text-[12px] text-gray-600 font-[600] mb-3 uppercase">Fill in the blank:</p>
                      <div className="flex items-center gap-2 mb-4">
                        {ex.blanks.map((blank, i) => (
                          blank === '___' ? (
                            <input
                              key={i}
                              type="text"
                              placeholder="preposition"
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

                  {!feedback && (
                    <div className="mb-6">
                      <ConfidenceSelector
                        onSelect={(level) => setUserConfidence(level)}
                        label="How confident are you in your answer?"
                      />
                    </div>
                  )}

                  {feedback && (
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
                    {exerciseIndex > 0 && (
                      <button
                        onClick={() => {
                          setExerciseIndex(exerciseIndex - 1);
                          setFeedback(null);
                          setUserConfidence(null);
                          setExerciseStartTime(Date.now());
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

        {/* PRODUCTION SECTION */}
        {section === 'production' && (
          <div className="pb-6">
            <h1 className="text-[24px] font-[700] mb-4">Write in Danish</h1>
            <div className="bg-gray-50 rounded-[12px] p-4 border border-gray-200 mb-4">
              <p className="text-[14px] text-gray-900 mb-4">
                Write 3-4 sentences using different prepositions. Describe where you live, where you work, how you get there, and who you work with.
              </p>
              <textarea
                placeholder="Jeg bor i København. Jeg arbejder på et kontor ved Nørreport Station..."
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
                      placeholder="Write your answer here..."
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
