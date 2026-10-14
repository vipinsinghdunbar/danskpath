import { useState } from 'react';
import WebAppShell from './WebAppShell';

const DIAGNOSTIC_QUESTIONS = {
  reading: [
    {
      id: 'r1',
      passage: 'Mit navn er Anna. Jeg bor i København.',
      question: 'Hvad hedder personen?',
      options: ['Erik', 'Anna', 'København', 'Dansk'],
      correct: 1,
      difficulty: 'A1'
    },
    {
      id: 'r2',
      passage: 'Jeg spiser rundstykker til morgenmad hver dag.',
      question: 'Hvornår spiser hun rundstykker?',
      options: ['Til frokost', 'Til middag', 'Til morgenmad', 'Til aften'],
      correct: 2,
      difficulty: 'A1'
    },
    {
      id: 'r3',
      passage: 'Han kommer fra Sverige. Han taler dansk og svensk.',
      question: 'Hvor mange sprog taler han?',
      options: ['Ét sprog', 'To sprog', 'Tre sprog', 'Fire sprog'],
      correct: 1,
      difficulty: 'A2'
    },
    {
      id: 'r4',
      passage: 'Det regner meget i Danmark. Vi skal drikke meget vand når vi er i solen.',
      question: 'Hvad skal vi drikke i solen?',
      options: ['Kaffe', 'Øl', 'Vand', 'Mælk'],
      correct: 2,
      difficulty: 'A2'
    },
    {
      id: 'r5',
      passage: 'Klimaforandringer påvirker verden. Temperaturen stiger. Vi må bruge mere vedvarende energi.',
      question: 'Hvad skal vi bruge mere af?',
      options: ['Benzin', 'Vedvarende energi', 'Kul', 'Gas'],
      correct: 1,
      difficulty: 'B1'
    }
  ],
  grammar: [
    {
      id: 'g1',
      question: 'Jeg _____ dansk.',
      options: ['taler', 'tale', 'talte', 'talt'],
      correct: 0,
      difficulty: 'A1'
    },
    {
      id: 'g2',
      question: 'Han _____ ikke hjem.',
      options: ['kommer', 'kommer ikke', 'er kommet ikke', 'kom ikke'],
      correct: 0,
      difficulty: 'A1'
    },
    {
      id: 'g3',
      question: 'Hvornår _____ du?',
      options: ['kommer', 'komme', 'kom', 'kommer du'],
      correct: 0,
      difficulty: 'A2'
    },
    {
      id: 'g4',
      question: 'Jeg har _____ dansk i fem år.',
      options: ['lær', 'lært', 'lærer', 'lærte'],
      correct: 1,
      difficulty: 'A2'
    },
    {
      id: 'g5',
      question: 'Hvis jeg _____, skal jeg tidligt på arbejde.',
      options: ['gik', 'går', 'gå', 'gået'],
      correct: 1,
      difficulty: 'B1'
    },
    {
      id: 'g6',
      question: 'Ledsætning: "Jeg tror at han kommer." Verbet kommer hvor?',
      options: ['Anden position', 'Sidste position', 'Første position', 'Ikke klart'],
      correct: 1,
      difficulty: 'B1'
    }
  ],
  listening: [
    {
      id: 'l1',
      text: '(Audio: Hej, mit navn er Jens)',
      question: 'Hvad hedder personen?',
      options: ['Lars', 'Jens', 'Peter', 'Ole'],
      correct: 1,
      difficulty: 'A1'
    },
    {
      id: 'l2',
      text: '(Audio: Jeg arbejder på et kontor)',
      question: 'Hvor arbejder personen?',
      options: ['I en skole', 'På et kontor', 'I en butik', 'I et hospital'],
      correct: 1,
      difficulty: 'A2'
    },
    {
      id: 'l3',
      text: '(Audio: Den nye lov handler om arbejdstiderne)',
      question: 'Hvad handler loven om?',
      options: ['Løn', 'Arbejdstider', 'Ferie', 'Sygedage'],
      correct: 1,
      difficulty: 'B1'
    }
  ],
  speaking: [
    {
      id: 's1',
      prompt: 'Sig dit navn',
      difficulty: 'A1'
    },
    {
      id: 's2',
      prompt: 'Beskriv din dag',
      difficulty: 'A2'
    },
    {
      id: 's3',
      prompt: 'Spørg om vej til stationen',
      difficulty: 'B1'
    }
  ]
};

export default function DiagnosticView({ onComplete }) {
  const [stage, setStage] = useState('start'); // start, category, results
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState({});
  const [answers, setAnswers] = useState({});
  const [speakingRatings, setSpeakingRatings] = useState({});

  const categories = ['reading', 'grammar', 'listening', 'speaking'];

  const handleStartTest = () => {
    setStage('category');
    setCurrentCategory('reading');
  };

  const handleAnswer = (answerIndex) => {
    const question = DIAGNOSTIC_QUESTIONS[currentCategory][currentQuestionIndex];
    setAnswers(prev => ({
      ...prev,
      [question.id]: answerIndex
    }));
    moveToNext();
  };

  const handleSpeakingRating = (rating) => {
    const question = DIAGNOSTIC_QUESTIONS[currentCategory][currentQuestionIndex];
    setSpeakingRatings(prev => ({
      ...prev,
      [question.id]: rating
    }));
    moveToNext();
  };

  const moveToNext = () => {
    const questions = DIAGNOSTIC_QUESTIONS[currentCategory];
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Move to next category
      const currentIdx = categories.indexOf(currentCategory);
      calculateCategoryScore(currentCategory);
      if (currentIdx < categories.length - 1) {
        const nextCategory = categories[currentIdx + 1];
        setCurrentCategory(nextCategory);
        setCurrentQuestionIndex(0);
      } else {
        // Test complete
        calculateCategoryScore(currentCategory);
        setStage('results');
      }
    }
  };

  const calculateCategoryScore = (category) => {
    const questions = DIAGNOSTIC_QUESTIONS[category];
    
    if (category === 'speaking') {
      const ratings = Object.values(speakingRatings);
      const avgRating = ratings.length > 0 ? ratings.reduce((a, b) => a + b, 0) / ratings.length : 0;
      const speakingScore = (avgRating / 5) * 100;
      setScores(prev => ({
        ...prev,
        [category]: Math.round(speakingScore)
      }));
    } else {
      const categoryAnswers = questions.filter(q => answers[q.id] !== undefined);
      if (categoryAnswers.length > 0) {
        const correct = categoryAnswers.filter(q => answers[q.id] === q.correct).length;
        const percentage = (correct / categoryAnswers.length) * 100;
        setScores(prev => ({
          ...prev,
          [category]: Math.round(percentage)
        }));
      }
    }
  };

  const determineLevelFromScores = () => {
    const avgScore = (scores.reading || 0 + scores.grammar || 0 + scores.listening || 0 + scores.speaking || 0) / 4;
    if (avgScore >= 80) return 'B1';
    if (avgScore >= 65) return 'A2';
    return 'A1';
  };

  const handleTestComplete = () => {
    const overallLevel = determineLevelFromScores();
    const diagnosticData = {
      timestamp: new Date().toISOString(),
      scores,
      overallLevel
    };
    
    localStorage.setItem('dansk_diagnostic', JSON.stringify(diagnosticData));
    localStorage.setItem('dansk_verdict', JSON.stringify(diagnosticData));
    localStorage.setItem('dansk_level', overallLevel);
    
    onComplete();
  };

  // ===== STAGE: START =====
  if (stage === 'start') {
    return (
      <WebAppShell variant="assessment">
        <div className="max-w-2xl mx-auto p-6 py-16">
          <div className="bg-white rounded-lg shadow p-10 text-center">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">
              Danish Assessment
            </h1>
            <p className="text-slate-600 mb-8 text-lg">
              20 minutes • 4 skills • No sign-up
            </p>
            
            <div className="space-y-3 mb-10 text-left max-w-xs mx-auto">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold">1</div>
                <span className="text-slate-700">Reading</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold">2</div>
                <span className="text-slate-700">Grammar</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold">3</div>
                <span className="text-slate-700">Listening</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold">4</div>
                <span className="text-slate-700">Speaking</span>
              </div>
            </div>

            <button
              onClick={handleStartTest}
              className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
            >
              Start Test →
            </button>
          </div>
        </div>
      </WebAppShell>
    );
  }

  // ===== STAGE: CATEGORY (Taking test) =====
  if (stage === 'category') {
    const question = DIAGNOSTIC_QUESTIONS[currentCategory][currentQuestionIndex];
    const categoryCount = categories.indexOf(currentCategory) + 1;
    const totalCategories = categories.length;
    const questionCount = currentQuestionIndex + 1;
    const totalQuestions = DIAGNOSTIC_QUESTIONS[currentCategory].length;
    const progress = ((categoryCount - 1) * 5 + questionCount) / (totalCategories * 5) * 100;

    return (
      <WebAppShell variant="assessment">
        <div className="max-w-2xl mx-auto p-6 py-8">
          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-slate-600 mb-2">
              <span className="font-semibold uppercase">{currentCategory}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-600 to-orange-600 h-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* READING */}
            {currentCategory === 'reading' && (
              <>
                <div className="bg-slate-50 p-6 rounded-lg mb-8 border-l-4 border-slate-300">
                  <p className="text-slate-800 text-base leading-relaxed">
                    {question.passage}
                  </p>
                </div>
                <h3 className="font-semibold text-slate-900 mb-6 text-lg">
                  {question.question}
                </h3>
                <div className="space-y-3">
                  {question.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(idx)}
                      className="w-full text-left p-4 border-2 border-slate-200 rounded-lg hover:border-amber-600 hover:bg-amber-50 transition"
                    >
                      <span className="text-slate-800 font-medium">{option}</span>
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* GRAMMAR */}
            {currentCategory === 'grammar' && (
              <>
                <h3 className="font-semibold text-slate-900 mb-8 text-xl text-center">
                  {question.question}
                </h3>
                <div className="space-y-3">
                  {question.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(idx)}
                      className="w-full text-left p-4 border-2 border-slate-200 rounded-lg hover:border-amber-600 hover:bg-amber-50 transition"
                    >
                      <span className="text-slate-800 font-medium">{option}</span>
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* LISTENING */}
            {currentCategory === 'listening' && (
              <>
                <div className="bg-slate-50 p-8 rounded-lg mb-8 text-center border-l-4 border-blue-300">
                  <div className="text-4xl mb-3">🔊</div>
                  <p className="text-slate-700 font-medium mb-2">{question.text}</p>
                  <p className="text-sm text-slate-600">(In production: native Danish audio)</p>
                </div>
                <h3 className="font-semibold text-slate-900 mb-6 text-lg">
                  {question.question}
                </h3>
                <div className="space-y-3">
                  {question.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(idx)}
                      className="w-full text-left p-4 border-2 border-slate-200 rounded-lg hover:border-amber-600 hover:bg-amber-50 transition"
                    >
                      <span className="text-slate-800 font-medium">{option}</span>
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* SPEAKING */}
            {currentCategory === 'speaking' && (
              <>
                <h3 className="font-semibold text-slate-900 mb-4 text-lg">
                  {question.prompt}
                </h3>
                <p className="text-slate-600 text-sm mb-6">
                  Answer in Danish (speaking or typing). How confident are you?
                </p>
                <div className="bg-amber-50 p-8 rounded-lg border-2 border-amber-200 mb-8">
                  <p className="text-center text-slate-600 mb-4">Your confidence level:</p>
                  <div className="flex justify-center gap-3">
                    {[1, 2, 3, 4, 5].map(rating => (
                      <button
                        key={rating}
                        onClick={() => handleSpeakingRating(rating)}
                        className={`w-14 h-14 rounded-lg font-bold text-lg transition ${
                          speakingRatings[question.id] === rating
                            ? 'bg-amber-600 text-white'
                            : 'bg-white border-2 border-amber-300 text-amber-700 hover:bg-amber-100'
                        }`}
                      >
                        {rating}
                      </button>
                    ))}
                  </div>
                  <p className="text-center text-xs text-slate-600 mt-4">Not confident ← → Very confident</p>
                </div>
              </>
            )}
          </div>

          {/* Question counter */}
          <div className="text-center mt-6 text-sm text-slate-600">
            Question {questionCount} of {totalQuestions}
          </div>
        </div>
      </WebAppShell>
    );
  }

  // ===== STAGE: RESULTS =====
  if (stage === 'results') {
    const overallLevel = determineLevelFromScores();
    const levels = {
      'reading': scores.reading >= 80 ? 'B1' : scores.reading >= 65 ? 'A2' : 'A1',
      'grammar': scores.grammar >= 80 ? 'B1' : scores.grammar >= 65 ? 'A2' : 'A1',
      'listening': scores.listening >= 80 ? 'B1' : scores.listening >= 65 ? 'A2' : 'A1',
      'speaking': scores.speaking >= 80 ? 'B1' : scores.speaking >= 65 ? 'A2' : 'A1'
    };

    return (
      <WebAppShell variant="assessment">
        <div className="max-w-2xl mx-auto p-6 py-12">
          <div className="bg-white rounded-lg shadow-lg p-10">
            <h1 className="text-3xl font-bold text-slate-900 mb-2 text-center">
              Your Level
            </h1>
            <p className="text-center text-slate-600 mb-10 text-lg">
              {overallLevel === 'B1' && 'You are B1 — Solid skills across the board.'}
              {overallLevel === 'A2' && 'You are A2 — Getting comfortable.'}
              {overallLevel === 'A1' && 'You are A1 — Building foundations.'}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-10">
              {['reading', 'grammar', 'listening', 'speaking'].map(skill => (
                <div key={skill} className="bg-slate-50 p-6 rounded-lg text-center border-2 border-slate-200">
                  <div className="text-3xl font-bold text-amber-600 mb-2">
                    {scores[skill]}%
                  </div>
                  <div className="font-semibold text-slate-900 capitalize text-sm">
                    {skill}
                  </div>
                  <div className="text-xs text-slate-600 mt-2">
                    {levels[skill]}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleTestComplete}
              className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all"
            >
              Continue to Lessons →
            </button>
          </div>
        </div>
      </WebAppShell>
    );
  }
}
