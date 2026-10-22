import { useState } from 'react';
import { useExerciseSubmission, AttemptFeedback, DifficultyIndicator, ConfidenceSelector } from '../AdaptiveExerciseWrapper';

// Listening Lesson
// Duration: 35 minutes
// Structure: Explanation (5min) + Strategy (5min) + Exercises (15min) + Dictation (5min) + Quiz (5min)

export default function ListeningLesson({ lesson, onComplete, onBack, onAttemptRecorded, currentDifficulty }) {
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
    lesson?.id || 'listening',
    `ex${exerciseIndex + 1}`,
    'Listening',
    currentDifficulty || 2
  );

  // Listening exercises with transcripts and key phrases
  const exercises = [
    // BASIC COMPREHENSION (1-4)
    {
      id: 'ex1',
      type: 'mcq',
      audio: '(Slow Danish speech) "Hej, hvad hedder du?" "Jeg hedder Anna."',
      transcript: 'Person A: "Hej, hvad hedder du?" Person B: "Jeg hedder Anna."',
      question: 'What is the person\'s name?',
      options: [
        { text: 'Anna', correct: true, why: 'The person says "Jeg hedder Anna" (My name is Anna).' },
        { text: 'Hej', correct: false, why: '"Hej" is just a greeting, not a name.' },
        { text: 'du', correct: false, why: '"Du" means "you", not a name.' }
      ],
      explanation: 'Listen for direct answers to questions like "hvad hedder du?" (what is your name?).',
      strategy: 'Focus on the response after "Jeg hedder..." — that\'s the name.'
    },
    {
      id: 'ex2',
      type: 'mcq',
      audio: '(Slow Danish speech) "Hvor arbejder du?" "Jeg arbejder på et kontor i København."',
      transcript: 'Person A: "Hvor arbejder du?" Person B: "Jeg arbejder på et kontor i København."',
      question: 'Where does the person work?',
      options: [
        { text: 'København', correct: false, why: 'Copenhagen is where the office is, but the person works in an office (kontor).' },
        { text: 'Et kontor', correct: true, why: 'The person says "Jeg arbejder på et kontor" (I work in an office).' },
        { text: 'På et kontor i København', correct: true, why: 'This is also correct—the full answer including location.' }
      ],
      explanation: 'Listen for answers to "hvor" (where) questions. The key information is the location/place.',
      strategy: 'Distinguish between the type of place (kontor/shop/school) and the location (city/street).'
    },
    {
      id: 'ex3',
      type: 'mcq',
      audio: '(Slow Danish speech) "Hvornår starter mødet?" "Det starter klokken 14."',
      transcript: 'Person A: "Hvornår starter mødet?" Person B: "Det starter klokken 14."',
      question: 'When does the meeting start?',
      options: [
        { text: '2 PM (14:00)', correct: true, why: '"Klokken 14" means "at 14:00" or 2 PM.' },
        { text: '4 PM', correct: false, why: 'That would be "klokken 16".' },
        { text: 'Tomorrow', correct: false, why: 'The speaker doesn\'t mention when the day is.' }
      ],
      explanation: 'Learn Danish time expressions: "klokken X" (at X o\'clock) and "klokken X:30" (at X:30).',
      strategy: 'Danish uses 24-hour time. "Klokken 14" = 2 PM, "klokken 9" = 9 AM.'
    },
    {
      id: 'ex4',
      type: 'mcq',
      audio: '(Slow Danish speech) "Hvad laver du i dag?" "Jeg skal møde en veninde. Vi skal gå i biografen."',
      transcript: 'Person A: "Hvad laver du i dag?" Person B: "Jeg skal møde en veninde. Vi skal gå i biografen."',
      question: 'What is the person going to do?',
      options: [
        { text: 'Meet a friend and go to the cinema', correct: true, why: 'The person says "møde en veninde" and "gå i biografen".' },
        { text: 'Go to the cinema alone', correct: false, why: 'The person mentions meeting a friend (veninde).' },
        { text: 'Stay home with a friend', correct: false, why: 'They say "gå i biografen" (go to the cinema).' }
      ],
      explanation: 'Listen for action verbs like "gå" (go), "møde" (meet), "være" (be). Chain of events matters.',
      strategy: 'Identify WHO and WHAT. "Jeg skal møde veninde" = subject + action + object.'
    },

    // DETAIL LISTENING (5-9)
    {
      id: 'ex5',
      type: 'fillblank',
      audio: '(Medium speed) "Jeg arbejder fra mandag til fredag fra klokken 9 til 17. Jeg har pause klokken 12 til 13."',
      transcript: 'Jeg arbejder fra mandag til fredag fra klokken 9 til 17. Jeg har pause klokken 12 til 13.',
      instruction: 'Fill in the missing time:',
      sentence: 'Person works _____ to _____ with lunch at _____.',
      correct: '9 to 17 / 12 to 13',
      options: ['9 to 17', '10 to 18', '8 to 16'],
      explanation: 'Listen for specific numbers and time ranges. Danish uses 24-hour time.',
      strategy: 'Numbers can be hard—listen multiple times and focus only on the digits you hear.'
    },
    {
      id: 'ex6',
      type: 'mcq',
      audio: '(Medium speed) "Jeg taler dansk, engelsk, og lidt spansk. Mit modersmål er dansk, men jeg er opvokset i Sverige."',
      transcript: 'Jeg taler dansk, engelsk, og lidt spansk. Mit modersmål er dansk, men jeg er opvokset i Sverige.',
      question: 'How many languages does the person speak?',
      options: [
        { text: '2 languages', correct: false, why: 'The person mentions 3: Danish, English, and Spanish.' },
        { text: '3 languages', correct: true, why: '"Dansk, engelsk, og lidt spansk" = three languages.' },
        { text: '4 languages', correct: false, why: 'Only 3 are mentioned.' }
      ],
      explanation: 'Listen for lists of items. "Og" means "and". "Lidt" means "a little/some".',
      strategy: 'When you hear "og", expect a list. Count the items on your fingers.'
    },
    {
      id: 'ex7',
      type: 'mcq',
      audio: '(Medium speed) "Min familie bor i Aarhus. Jeg bor i København, men jeg besøger dem hver tredje weekend."',
      transcript: 'Min familie bor i Aarhus. Jeg bor i København, men jeg besøger dem hver tredje weekend.',
      question: 'How often does the person visit family?',
      options: [
        { text: 'Every weekend', correct: false, why: 'The person says "hver tredje weekend" (every third weekend).' },
        { text: 'Every month', correct: false, why: 'The phrase is "hver tredje weekend", not monthly.' },
        { text: 'Every third weekend', correct: true, why: '"Hver tredje weekend" = every third weekend.' }
      ],
      explanation: 'Listen for frequency expressions: "hver dag" (every day), "hver uge" (every week), "hver tredje weekend".',
      strategy: 'Numbers matter for frequency. "Tredje" = third.'
    },
    {
      id: 'ex8',
      type: 'fillblank',
      audio: '(Medium speed) "Jeg skal på ferie næste måned. Jeg skal til Spanien og Grækenland. Jeg skal være væk i tre uger."',
      transcript: 'Jeg skal på ferie næste måned. Jeg skal til Spanien og Grækenland. Jeg skal være væk i tre uger.',
      instruction: 'Where is the person going and for how long?',
      sentence: 'Going to _____ and _____ for _____.',
      correct: 'Spain and Greece / three weeks',
      options: ['Spain and Greece', 'Portugal and Italy', 'Greece and Turkey'],
      explanation: 'Listen for destinations (place names) and duration ("i tre uger" = for three weeks).',
      strategy: 'Geographic names are pronounced similarly in Danish. Listen for context clues.'
    },

    // PRACTICAL DIALOGUE (9-13)
    {
      id: 'ex9',
      type: 'mcq',
      audio: '(Natural speed) A: "Hej! Hvordan går det?" B: "Godt! Jeg har været travl hele ugen. Du?" A: "Jeg også, men jeg er glad for weekenden!"',
      transcript: 'A: "Hej! Hvordan går det?" B: "Godt! Jeg har været travl hele ugen. Du?" A: "Jeg også, men jeg er glad for weekenden!"',
      question: 'What has the person B been?',
      options: [
        { text: 'Tired', correct: false, why: 'The person says "travl" (busy).' },
        { text: 'Busy', correct: true, why: '"Jeg har været travl hele ugen" (I have been busy all week).' },
        { text: 'Sad', correct: false, why: 'The word is "travl", not "trist" (sad).' }
      ],
      explanation: 'Adjectives like "travl" (busy), "glad" (happy), "træt" (tired) describe states.',
      strategy: 'Listen for "har været [adjective]" = past state. "Er [adjective]" = current state.'
    },
    {
      id: 'ex10',
      type: 'mcq',
      audio: '(Natural speed) "Jeg skal købe en ny cykel. Den gamle er ødelagt. Jeg skal bruge den til at cykle til arbejde."',
      transcript: 'Jeg skal købe en ny cykel. Den gamle er ødelagt. Jeg skal bruge den til at cykle til arbejde.',
      question: 'Why does the person need a new bicycle?',
      options: [
        { text: 'The old one is broken', correct: true, why: '"Den gamle er ødelagt" (The old one is broken).' },
        { text: 'They want to go on vacation', correct: false, why: 'They want to cycle to work.' },
        { text: 'They like new things', correct: false, why: 'The reason is the old bike is broken.' }
      ],
      explanation: 'Listen for reasons and causes: "er ødelagt" (is broken), "skal bruge til" (need for).',
      strategy: 'When you hear "skal", expect a purpose or action. Listen for "til at..." (in order to).'
    },
    {
      id: 'ex11',
      type: 'fillblank',
      audio: '(Natural speed) "Jeg elsker at være i naturen. Om sommeren går jeg på lange ture. Om vinteren leger jeg med sneen. Det er rigtig sjovt!"',
      transcript: 'Jeg elsker at være i naturen. Om sommeren går jeg på lange ture. Om vinteren leger jeg med sneen. Det er rigtig sjovt!',
      instruction: 'What does the person do in summer and winter?',
      sentence: 'Summer: _____ / Winter: _____',
      correct: 'long walks / play in snow',
      options: ['hiking and skiing', 'long walks and playing in snow', 'camping and snowboarding'],
      explanation: 'Listen for seasonal activities: "om sommeren" (in summer), "om vinteren" (in winter).',
      strategy: 'Structure: "Om [season] [subject] [verb] [object]".'
    },

    // CONNECTED SPEECH (13-17)
    {
      id: 'ex12',
      type: 'mcq',
      audio: '(Natural speed, with contractions) "Jeg\'d gørn det hvis jeg havde tid. Men jeg er for optaget lige nu. Måske næste uge?"',
      transcript: 'Jeg ville gøre det hvis jeg havde tid. Men jeg er for optaget lige nu. Måske næste uge?',
      question: 'What does the person mean?',
      options: [
        { text: 'They will do it today', correct: false, why: 'They say they\'re too busy now.' },
        { text: 'They would do it if they had time, but they\'re busy', correct: true, why: 'Conditional: "ville gøre det hvis jeg havde tid".' },
        { text: 'They will never do it', correct: false, why: 'They say "maybe next week".' }
      ],
      explanation: 'Conditional statements use "ville" (would) + infinitive. "Hvis" = if.',
      strategy: 'In natural speech, "ville" often sounds like "vil\'d". Listen for the conditional form.'
    },
    {
      id: 'ex13',
      type: 'mcq',
      audio: '(Natural speed, rapid) "Du kan ikke gøre det på den måde. Du skal gøre det sådan her. Det er meget nemmere."',
      transcript: 'Du kan ikke gøre det på den måde. Du skal gøre det sådan her. Det er meget nemmere.',
      question: 'What is the speaker explaining?',
      options: [
        { text: 'Instructions on how to do something correctly', correct: true, why: 'They explain the wrong way, then show the right way.' },
        { text: 'Why something is too difficult', correct: false, why: 'They say the better way is "nemmere" (easier).' },
        { text: 'That the person should give up', correct: false, why: 'They\'re helping with instructions.' }
      ],
      explanation: 'Imperative: "Du skal gøre det [this way]". "Kan ikke" (cannot), "nemmere" (easier).',
      strategy: 'Listen for the contrast: "på den måde" (that way) vs. "sådan her" (this way).'
    },

    // REAL-WORLD SCENARIOS (17-20)
    {
      id: 'ex14',
      type: 'mcq',
      audio: '(Natural speed) "Hej, jeg ringer fra Danmarks Radio. Vi laver en podcast om danske startup-virksomheder. Kan du være med?"',
      transcript: 'Hej, jeg ringer fra Danmarks Radio. Vi laver en podcast om danske startup-virksomheder. Kan du være med?',
      question: 'What is the caller asking about?',
      options: [
        { text: 'A job opportunity', correct: false, why: 'They\'re asking about participating in a podcast.' },
        { text: 'Participation in a podcast about Danish startups', correct: true, why: '"Vi laver en podcast om danske startup-virksomheder. Kan du være med?"' },
        { text: 'Information about radio stations', correct: false, why: 'They\'re from the radio station, asking for participation.' }
      ],
      explanation: 'Listen for the purpose of a call. "Vi laver" (we are making), "kan du være med" (can you participate).',
      strategy: 'Real-world calls often start with who is calling and why. Listen for those two things first.'
    },
    {
      id: 'ex15',
      type: 'fillblank',
      audio: '(Natural speed, multiple speakers) "A: Skal vi mødes i morgen? B: Ja, gerne! Hvad tid? A: Omkring klokken 3. B: OK, jeg møder dig ved stationen."',
      transcript: 'A: Skal vi mødes i morgen? B: Ja, gerne! Hvad tid? A: Omkring klokken 3. B: OK, jeg møder dig ved stationen.',
      instruction: 'When and where are they meeting?',
      sentence: 'Time: _____, Location: _____',
      correct: 'around 3 PM / at the station',
      options: ['3 PM at the station', '2 PM at the store', 'morning at the office'],
      explanation: 'Extract key information: time ("omkring klokken 3") and location ("ved stationen").',
      strategy: 'In dialogues, listen for direct answers to specific questions (hvad tid = what time, hvor = where).'
    },
    {
      id: 'ex16',
      type: 'mcq',
      audio: '(Conversational speed) "Jeg har været på et kursus i JavaScript denne uge. Det var rigtig interessant og jeg lærte meget nyt. Jeg kan godt anbefale det til andre."',
      transcript: 'Jeg har været på et kursus i JavaScript denne uge. Det var rigtig interessant og jeg lærte meget nyt. Jeg kan godt anbefale det til andre.',
      question: 'What is the person\'s opinion of the course?',
      options: [
        { text: 'They didn\'t like it', correct: false, why: 'They say it was "interessant" (interesting) and they learned a lot.' },
        { text: 'They thought it was interesting and would recommend it', correct: true, why: '"Det var interessant" and "jeg kan anbefale det".' },
        { text: 'It was too difficult', correct: false, why: 'They say they learned new things, but don\'t mention difficulty.' }
      ],
      explanation: 'Opinion words: "interessant" (interesting), "sjovt" (fun), "hårdt" (hard), "anbefale" (recommend).',
      strategy: 'Listen for evaluative adjectives and recommendation language.'
    },
    {
      id: 'ex17',
      type: 'fillblank',
      audio: '(Natural speed) "Jeg skal på job-interview på onsdag. Jeg er både nervøs og spændt. Jeg har forberedt mig godt, så jeg håber på det bedste."',
      transcript: 'Jeg skal på job-interview på onsdag. Jeg er både nervøs og spændt. Jeg har forberedt mig godt, så jeg håber på det bedste.',
      instruction: 'When is the interview and what is the person\'s emotional state?',
      sentence: 'Day: _____, Feelings: _____ and _____',
      correct: 'Wednesday / nervous and excited',
      options: ['Wednesday / nervous and excited', 'Thursday / happy and hopeful', 'Monday / confident and calm'],
      explanation: 'Emotions and states: "nervøs" (nervous), "spændt" (excited), "glad" (happy), "forberedt" (prepared).',
      strategy: 'Listen for "både...og" (both...and) = two things together.'
    },

    // ADVANCED LISTENING (18-20)
    {
      id: 'ex18',
      type: 'mcq',
      audio: '(Quick conversational speed) "Det regner meget i dag. Jeg tror ikke jeg skal på tur. Det er meget dårligt vejr. Hvad siger du, skal vi blive hjemme?"',
      transcript: 'Det regner meget i dag. Jeg tror ikke jeg skal på tur. Det er meget dårligt vejr. Hvad siger du, skal vi blive hjemme?',
      question: 'What is the weather like?',
      options: [
        { text: 'Sunny', correct: false, why: 'The speaker says "det regner" (it\'s raining) and "dårligt vejr" (bad weather).' },
        { text: 'Rainy and bad', correct: true, why: '"Det regner meget" and "dårligt vejr".' },
        { text: 'Cloudy', correct: false, why: 'The speaker specifically says it\'s raining.' }
      ],
      explanation: 'Weather vocabulary: "regner" (raining), "solskin" (sunny), "koldt" (cold), "varmt" (warm), "vejr" (weather).',
      strategy: 'Weather words often follow "det er..." or "det [verb]...", describing conditions.'
    },
    {
      id: 'ex19',
      type: 'mcq',
      audio: '(Natural speed, speaker with slight accent) "Jeg er oprindeligt fra Syrien, men jeg er kommet til Danmark for tre år siden. Jeg liker det meget godt her. Jeg har fået et job og mange venner."',
      transcript: 'Jeg er oprindeligt fra Syrien, men jeg er kommet til Danmark for tre år siden. Jeg liker det meget godt her. Jeg har fået et job og mange venner.',
      question: 'How long has the person been in Denmark?',
      options: [
        { text: '1 year', correct: false, why: 'The person says "for tre år siden" (three years ago).' },
        { text: '3 years', correct: true, why: '"Jeg er kommet til Danmark for tre år siden" = 3 years ago.' },
        { text: '5 years', correct: false, why: 'The person mentions three years, not five.' }
      ],
      explanation: 'Time expressions: "for X år siden" (X years ago), "i X år" (for X years).',
      strategy: 'Numbers are crucial in biographical info. Listen carefully to time frames.'
    },
    {
      id: 'ex20',
      type: 'fillblank',
      audio: '(Conversational speed, multiple concepts) "Min drøm er at åbne min egen virksomhed om fem år. Jeg sparer op, og jeg lærer meget fra min nuværende job. Jeg tror virkelig på det og håber på succes."',
      transcript: 'Min drøm er at åbne min egen virksomhed om fem år. Jeg sparer op, og jeg lærer meget fra min nuværende job. Jeg tror virkelig på det og håber på succes.',
      instruction: 'What is the person\'s goal and timeline?',
      sentence: 'Goal: _____ own _____ in _____ years.',
      correct: 'start / business / five',
      options: ['start a business in 5 years', 'open a shop in 3 years', 'create a podcast in 2 years'],
      explanation: 'Listen for future goals and timelines: "drøm" (dream), "om X år" (in X years), "sparer op" (saving up).',
      strategy: 'When someone talks about future plans, listen for both the goal and the timeline.'
    }
  ];

  const quizItems = [
    {
      id: 'q1',
      type: 'mcq',
      question: 'What is the most important strategy for listening comprehension?',
      options: [
        { text: 'Understand every single word', correct: false },
        { text: 'Focus on key words and main ideas', correct: true },
        { text: 'Translate everything to English in your head', correct: false }
      ]
    },
    {
      id: 'q2',
      type: 'mcq',
      question: 'What does "hvad hedder du?" mean?',
      options: [
        { text: 'Where do you live?', correct: false },
        { text: 'What is your name?', correct: true },
        { text: 'How are you?', correct: false }
      ]
    },
    {
      id: 'q3',
      type: 'mcq',
      question: 'In Danish, "klokken 14" means:',
      options: [
        { text: '2 PM (14:00)', correct: true },
        { text: '1 PM', correct: false },
        { text: '4 PM (16:00)', correct: false }
      ]
    },
    {
      id: 'q4',
      type: 'mcq',
      question: 'What should you listen for in a conversation about plans?',
      options: [
        { text: 'WHO is involved, WHAT they\'re doing, WHEN, and WHERE', correct: true },
        { text: 'Only the destination', correct: false },
        { text: 'Only the time', correct: false }
      ]
    },
    {
      id: 'q5',
      type: 'sentence',
      question: 'What is one strategy for understanding "connected speech" (words blending together)?',
      correctStarts: ['listen', 'practice', 'focus', 'watch'],
      explanation: 'Strategies include: listening multiple times, focusing on stressed syllables, watching lips, practicing repetition.'
    }
  ];

  const handleExerciseAnswer = async (answer) => {
    const exercise = exercises[exerciseIndex];
    let isCorrect = false;
    let errorType = 'UDT'; // Default: unknown error

    if (exercise.type === 'fillblank') {
      isCorrect = answer.trim().toLowerCase().includes(exercise.correct.toLowerCase().split('/')[0].trim());
      if (!isCorrect) errorType = 'TID'; // Listening comprehension error
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
      strategy: exercise.strategy,
      transcript: exercise.transcript,
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
            {section === 'strategy' && 'Listening Strategies'}
            {section === 'exercises' && `Question ${exerciseIndex + 1}/${exercises.length}`}
            {section === 'production' && 'Dictation Practice'}
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
                  <span>Recognize common Danish question words and key phrases</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-600 font-[700]">2.</span>
                  <span>Extract main ideas and important details from spoken Danish</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-600 font-[700]">3.</span>
                  <span>Understand natural conversational speech and connected sounds</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-600 font-[700]">4.</span>
                  <span>Respond to real-world listening scenarios and dialogs</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-50 rounded-[12px] p-4 border border-green-200 mb-6">
              <h3 className="text-[13px] font-[700] text-green-900 mb-2">📋 Your Practice Plan</h3>
              <div className="text-[13px] text-green-900 space-y-1">
                <div>• <strong>Introduction & tips:</strong> 5 minutes</div>
                <div>• <strong>Listening strategies:</strong> 5 minutes</div>
                <div>• <strong>Practice exercises:</strong> 20 scenarios (15 minutes)</div>
                <div>• <strong>Dictation practice:</strong> Write what you hear (5 minutes)</div>
                <div>• <strong>Quiz:</strong> 5 questions (5 minutes)</div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-[12px] p-4 border border-blue-200 mb-6">
              <div className="text-[12px] text-gray-900">
                <strong>Duration:</strong> {lesson.duration} · <strong>Level:</strong> {lesson.difficulty}
              </div>
            </div>

            <button
              onClick={() => setSection('strategy')}
              className="w-full bg-black text-white py-3 rounded-full font-[600]"
            >
              Start Lesson →
            </button>
          </div>
        )}

        {/* STRATEGY SECTION */}
        {section === 'strategy' && (
          <div className="pb-6">
            <h1 className="text-[28px] font-[700] mb-6">Listening Strategies</h1>

            <div className="bg-blue-50 rounded-[12px] p-6 border border-blue-200 mb-6">
              <h2 className="text-[16px] font-[700] mb-4 text-blue-900">Strategy 1: Focus on Key Words, Not Every Word</h2>
              <p className="text-[14px] text-blue-900 leading-[1.8] mb-4">
                You don't need to understand every single word. Pick out the important ones:
              </p>
              <div className="bg-white rounded-[8px] p-4 mb-2">
                <p className="text-[13px] font-[600] mb-1">Example: "Jeg skal møde min veninde klokken 15 ved stationen."</p>
                <p className="text-[12px] text-gray-600">Key words: "møde" (meet), "veninde" (friend), "klokken 15" (3 PM), "stationen" (station)</p>
              </div>
            </div>

            <div className="bg-[#f2f2f7] rounded-[12px] p-6 border border-[#e5e5ea] mb-6">
              <h2 className="text-[16px] font-[700] mb-4 text-[#121417]">Strategy 2: Listen for Question Words</h2>
              <p className="text-[14px] text-[#121417] mb-4">Common Danish question words:</p>
              <div className="text-[13px] text-[#121417] space-y-1">
                <div>• <strong>Hvad?</strong> = What?</div>
                <div>• <strong>Hvor?</strong> = Where?</div>
                <div>• <strong>Hvornår?</strong> = When?</div>
                <div>• <strong>Hvem?</strong> = Who?</div>
                <div>• <strong>Hvorfor?</strong> = Why?</div>
                <div>• <strong>Hvordan?</strong> = How?</div>
              </div>
              <p className="text-[13px] text-[#121417] mt-3">When you hear a question word, you know what type of information to listen for.</p>
            </div>

            <div className="bg-green-50 rounded-[12px] p-6 border border-green-200 mb-6">
              <h2 className="text-[16px] font-[700] mb-4 text-green-900">Strategy 3: Notice Connected Speech</h2>
              <p className="text-[14px] text-green-900 leading-[1.8]">
                In natural Danish, words blend together. "jeg er" sounds like "jag er", "kan ikke" sounds like "kan'ke". Don't get confused—it's the same words, just connected.
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
            <h1 className="text-[24px] font-[700] mb-4">Listening Practice</h1>
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
                  <div className="bg-[#f2f2f7] rounded-[12px] p-4 border border-[#e5e5ea] mb-4">
                    <p className="text-[13px] font-[600] text-[#121417] mb-2">AUDIO:</p>
                    <p className="text-[14px] text-[#121417] italic">{ex.audio}</p>
                  </div>

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
                      <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-[12px] text-blue-900 mb-1"><strong>Transcript:</strong> {feedback.transcript}</p>
                        <p className="text-[12px] text-blue-900"><strong>Strategy:</strong> {feedback.strategy}</p>
                      </div>
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

        {/* DICTATION SECTION */}
        {section === 'production' && (
          <div className="pb-6">
            <h1 className="text-[24px] font-[700] mb-4">Dictation Practice</h1>
            <div className="bg-gray-50 rounded-[12px] p-4 border border-gray-200 mb-4">
              <p className="text-[14px] text-gray-900 mb-4">
                Listen to a short text (played slowly twice) and write what you hear. This builds your listening accuracy and spelling.
              </p>
              <p className="text-[12px] text-gray-600 mb-4">
                AUDIO: (Slow speech) "Hej, jeg hedder Maria. Jeg arbejder på et kontor i København. Jeg elsker mit job. Om weekenden går jeg på lange ture i naturens."
              </p>
              <textarea
                placeholder="Write what you hear here..."
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
