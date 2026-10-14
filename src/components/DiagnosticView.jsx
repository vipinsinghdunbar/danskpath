import { useState } from 'react';
import WebAppShell from './WebAppShell';

const DIAGNOSTIC_QUESTIONS = {
  reading: [
    {
      id: 'r1',
      passage: 'Mit navn er Anna og jeg bor i København. Jeg arbejder som lærer på en skole. Om weekenden holder jeg af at løbe i parken.',
      question: 'Hvad hedder personen?',
      options: ['Anna', 'København', 'Lærer', 'Parken'],
      correct: 0,
      difficulty: 'A1'
    },
    {
      id: 'r2',
      passage: 'Erik har været i Danmark i fem år. Han kommer fra Sverige og taler både dansk og svensk flydende. Han mødte sin kone på universitetet.',
      question: 'Hvor kommer Erik fra?',
      options: ['Danmark', 'Sverige', 'Universitetet', 'Parken'],
      correct: 1,
      difficulty: 'A1'
    },
    {
      id: 'r3',
      passage: 'Det er vigtigt at drikke nok vand hver dag. Vand hjælper din krop med at fungere ordentligt. De fleste mennesker bør drikke mindst to liter om dagen.',
      question: 'Hvor meget vand bør de fleste mennesker drikke dagligt?',
      options: ['En liter', 'Mindst to liter', 'Tre liter', 'Det siges ikke'],
      correct: 1,
      difficulty: 'A2'
    },
    {
      id: 'r4',
      passage: 'I Danmark har vi mange traditioner. Hver jul dekorerer vi vores huse med lys og grantræer. Sankt Hans Aften fejrer vi på midsommerdagen med båltænding og sang.',
      question: 'Hvornår fejrer danskerne Sankt Hans Aften?',
      options: ['Til jul', 'På påske', 'Midsommerdagen', 'Til nytår'],
      correct: 2,
      difficulty: 'A2'
    },
    {
      id: 'r5',
      passage: 'Klimaforandringer påvirker hele verden. Temperaturen stiger, og det betyder mere vejrkaos. Vi må bruge vedvarende energi som sol og vind for at stoppe problemet.',
      question: 'Hvad skal vi gøre for at stoppe klimaproblemerne?',
      options: ['Bygge flere biler', 'Bruge vedvarende energi', 'Køre mere bil', 'Intet kan gøres'],
      correct: 1,
      difficulty: 'B1'
    }
  ],
  grammar: [
    {
      id: 'g1',
      question: 'Hun _____ til skolen hver dag.',
      options: ['går', 'gå', 'gået', 'går'],
      correct: 0,
      difficulty: 'A1'
    },
    {
      id: 'g2',
      question: 'Jeg har _____ dansk i fem år.',
      options: ['lær', 'lært', 'lærer', 'lærte'],
      correct: 1,
      difficulty: 'A2'
    },
    {
      id: 'g3',
      question: 'Han er ikke _____.',
      options: ['går', 'gik', 'gået', 'kommet'],
      correct: 3,
      difficulty: 'A2'
    },
    {
      id: 'g4',
      question: 'Hvad betyder "sin"? Hun tog sin bog med sig.',
      options: ['hans', 'mine', 'hendes egen', 'din'],
      correct: 2,
      difficulty: 'A2'
    },
    {
      id: 'g5',
      question: 'I morgen _____ jeg til mødet.',
      options: ['gå', 'gik', 'skal gå', 'gået'],
      correct: 2,
      difficulty: 'B1'
    },
    {
      id: 'g6',
      question: 'Ledsætningen: "Jeg tror at han kommer i morgen." Hvor er verbet i ledsætningen?',
      options: ['Anden position (V2)', 'Sidste position (V-last)', 'Første position', 'Det er ikke klart'],
      correct: 1,
      difficulty: 'B1'
    }
  ],
  listening: [
    {
      id: 'l1',
      audio: 'data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA==',
      transcript: 'Hej, jeg hedder Anna.',
      question: 'Hvad hedder personen?',
      options: ['Erik', 'Anna', 'Ole', 'Maria'],
      correct: 1,
      difficulty: 'A1'
    },
    {
      id: 'l2',
      audio: 'data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA==',
      transcript: 'Jeg arbejder på et kontor.',
      question: 'Hvor arbejder personen?',
      options: ['I en butik', 'På et kontor', 'I en skole', 'I et hospital'],
      correct: 1,
      difficulty: 'A2'
    },
    {
      id: 'l3',
      audio: 'data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA==',
      transcript: 'Den nye lov handler om arbejdstiderne, som skal være mere fleksible.',
      question: 'Hvad handler loven om?',
      options: ['Løn', 'Arbejdstider', 'Ferie', 'Sygdomsdag'],
      correct: 1,
      difficulty: 'B1'
    }
  ],
  speaking: [
    {
      id: 's1',
      prompt: 'Præsenter dig selv. Sig dit navn, hvor du kommer fra, og hvad du laver.',
      rubric: 'Klarhed, udtale, ordvalg',
      difficulty: 'A1'
    },
    {
      id: 's2',
      prompt: 'Beskriv din typiske dag. Hvad gør du om morgenen, til frokost, og om aftenen?',
      rubric: 'Brug af tidsubtryk, verber, ordstilling',
      difficulty: 'A2'
    },
    {
      id: 's3',
      prompt: 'Du skal spørge en dansker om vej til stationen. Hvad siger du? Hvordan svarer de?',
      rubric: 'Høflighed, spørgsmålsform, forståelse',
      difficulty: 'B1'
    }
  ]
};

export default function DiagnosticView({ onComplete }) {
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState({});
  const [answers, setAnswers] = useState({});
  const [speakingRatings, setSpeakingRatings] = useState({});
  const [testStarted, setTestStarted] = useState(false);
  const [testComplete, setTestComplete] = useState(false);

  const categories = ['reading', 'grammar', 'listening', 'speaking'];

  const handleStartTest = () => {
    setTestStarted(true);
    setCurrentCategory('reading');
  };

  const handleAnswer = (questionId, answerIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleNextQuestion = () => {
    const questions = DIAGNOSTIC_QUESTIONS[currentCategory];
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      moveToNextCategory();
    }
  };

  const moveToNextCategory = () => {
    const currentIdx = categories.indexOf(currentCategory);
    if (currentIdx < categories.length - 1) {
      const nextCategory = categories[currentIdx + 1];
      calculateCategoryScore(currentCategory);
      setCurrentCategory(nextCategory);
      setCurrentQuestionIndex(0);
    } else {
      calculateCategoryScore(currentCategory);
      setTestComplete(true);
    }
  };

  const calculateCategoryScore = (category) => {
    const questions = DIAGNOSTIC_QUESTIONS[category];
    const categoryAnswers = questions.filter(q => answers[q.id] !== undefined);
    
    if (category === 'speaking') {
      const avgRating = Object.values(speakingRatings).reduce((a, b) => a + b, 0) / Object.keys(speakingRatings).length || 0;
      const speakingScore = (avgRating / 5) * 100;
      setScores(prev => ({
        ...prev,
        [category]: Math.round(speakingScore)
      }));
    } else {
      const correct = categoryAnswers.filter(q => answers[q.id] === q.correct).length;
      const percentage = (correct / categoryAnswers.length) * 100;
      setScores(prev => ({
        ...prev,
        [category]: Math.round(percentage)
      }));
    }
  };

  const handleSpeakingRating = (questionId, rating) => {
    setSpeakingRatings(prev => ({
      ...prev,
      [questionId]: rating
    }));
  };

  const determineLevelFromScores = () => {
    const avgScore = (scores.reading + scores.grammar + scores.listening + scores.speaking) / 4;
    if (avgScore >= 80) return 'B1';
    if (avgScore >= 65) return 'A2';
    return 'A1';
  };

  const handleTestComplete = () => {
    const overallLevel = determineLevelFromScores();
    const diagnosticData = {
      timestamp: new Date().toISOString(),
      scores,
      overallLevel,
      answers
    };
    
    localStorage.setItem('dansk_diagnostic', JSON.stringify({
      scores: scores,
      level: overallLevel,
      timestamp: new Date().toISOString()
    }));
    localStorage.setItem('dansk_verdict', JSON.stringify(diagnosticData));
    
    onComplete();
  };

  if (!testStarted) {
    return (
      <WebAppShell variant="assessment">
        <div className="max-w-2xl mx-auto p-8 py-20">
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <h1 className="text-4xl font-bold text-slate-900 mb-6">
              Danish Diagnostic Test
            </h1>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              This test evaluates your Danish skills across four areas: reading, grammar, listening, and speaking. It takes about 20–25 minutes and adapts to your level.
            </p>
            <div className="bg-blue-50 p-6 rounded-lg mb-8 text-left">
              <h3 className="font-semibold text-slate-900 mb-4">What you'll see:</h3>
              <ul className="space-y-2 text-slate-700">
                <li>✓ <strong>Reading:</strong> 5 passages with comprehension questions</li>
                <li>✓ <strong>Grammar:</strong> 6 sentence-level exercises</li>
                <li>✓ <strong>Listening:</strong> 3 audio clips with questions</li>
                <li>✓ <strong>Speaking:</strong> 3 prompts (optional recording or text)</li>
              </ul>
            </div>
            <button
              onClick={handleStartTest}
              className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all"
            >
              Start Test →
            </button>
          </div>
        </div>
      </WebAppShell>
    );
  }

  if (testComplete) {
    const overallLevel = determineLevelFromScores();
    const levels = {
      'reading': scores.reading >= 80 ? 'B1' : scores.reading >= 65 ? 'A2' : 'A1',
      'grammar': scores.grammar >= 80 ? 'B1' : scores.grammar >= 65 ? 'A2' : 'A1',
      'listening': scores.listening >= 80 ? 'B1' : scores.listening >= 65 ? 'A2' : 'A1',
      'speaking': scores.speaking >= 80 ? 'B1' : scores.speaking >= 65 ? 'A2' : 'A1'
    };

    return (
      <WebAppShell variant="assessment">
        <div className="max-w-3xl mx-auto p-8 py-12">
          <div className="bg-white rounded-lg shadow-lg p-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-2 text-center">
              Your Danish Level
            </h1>
            <p className="text-center text-slate-600 mb-12">
              Based on your answers across all four skills
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {['reading', 'grammar', 'listening', 'speaking'].map(skill => (
                <div key={skill} className="bg-slate-50 p-6 rounded-lg text-center">
                  <div className="text-2xl font-bold text-amber-600 mb-2">
                    {scores[skill]}%
                  </div>
                  <div className="font-semibold text-slate-900 capitalize mb-2">
                    {skill}
                  </div>
                  <div className="text-sm text-slate-600">
                    Level {levels[skill]}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded mb-8">
              <h3 className="font-bold text-slate-900 mb-3">Overall Level</h3>
              <p className="text-2xl font-bold text-blue-600 mb-4">
                {overallLevel} (mixed profile)
              </p>
              <p className="text-slate-700">
                {overallLevel === 'B1' && 'You have solid B1 skills across the board. You can converse, read news, and understand most authentic Danish. Focus on advanced grammar and native idioms.'}
                {overallLevel === 'A2' && 'You have A2 skills with some B1 pockets. Your reading is likely stronger than listening. Build listening comprehension and verb fluency through daily exposure.'}
                {overallLevel === 'A1' && 'You are solidly A1. Master articles, basic verb tenses, and word order first. Increase your exposure to spoken Danish through TV and podcasts.'}
              </p>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-600 p-6 rounded mb-8">
              <h3 className="font-bold text-slate-900 mb-3">Recommended Learning Path</h3>
              <ul className="space-y-2 text-slate-700">
                {levels.listening === 'A1' && (
                  <li>→ <strong>Start with:</strong> Listening and speaking foundations (audio drills, native speed)</li>
                )}
                {levels.grammar === 'A1' && (
                  <li>→ <strong>Strengthen:</strong> Articles, basic word order, verb tenses</li>
                )}
                {levels.grammar === 'A2' && (
                  <li>→ <strong>Next:</strong> Advanced grammar (subordinate clauses, perfect tense, prepositions)</li>
                )}
                {levels.reading === 'B1' && (
                  <li>→ <strong>Leverage:</strong> Your reading strength — use B1 texts as input material</li>
                )}
              </ul>
            </div>

            <button
              onClick={handleTestComplete}
              className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all"
            >
              View Lessons & Dashboard →
            </button>
          </div>
        </div>
      </WebAppShell>
    );
  }

  const question = DIAGNOSTIC_QUESTIONS[currentCategory][currentQuestionIndex];
  const categoryCount = categories.indexOf(currentCategory) + 1;
  const totalCategories = categories.length;
  const questionCount = currentQuestionIndex + 1;
  const totalQuestions = DIAGNOSTIC_QUESTIONS[currentCategory].length;

  return (
    <WebAppShell variant="assessment">
      <div className="max-w-3xl mx-auto p-8 py-12">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm text-slate-600 font-semibold uppercase">
                {currentCategory} • Question {questionCount} of {totalQuestions}
              </div>
              <div className="text-lg font-bold text-slate-900 mt-1">
                {categoryCount} of {totalCategories} Skills
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-amber-600">
                {Math.round((categoryCount - 1 + questionCount / totalQuestions) / totalCategories * 100)}%
              </div>
              <div className="text-xs text-slate-600">Complete</div>
            </div>
          </div>
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-amber-600 to-orange-600 h-full transition-all"
              style={{
                width: `${(categoryCount - 1 + questionCount / totalQuestions) / totalCategories * 100}%`
              }}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-10">
          {/* Reading Section */}
          {currentCategory === 'reading' && (
            <>
              <div className="bg-slate-50 p-6 rounded-lg mb-8 border-l-4 border-slate-300">
                <p className="text-slate-800 leading-relaxed text-base">
                  {question.passage}
                </p>
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-6">
                {question.question}
              </h3>
              <div className="space-y-3">
                {question.options.map((option, idx) => (
                  <label key={idx} className="flex items-center p-4 border-2 border-slate-200 rounded-lg cursor-pointer hover:border-amber-600 hover:bg-amber-50 transition">
                    <input
                      type="radio"
                      name={question.id}
                      checked={answers[question.id] === idx}
                      onChange={() => handleAnswer(question.id, idx)}
                      className="w-4 h-4 accent-amber-600"
                    />
                    <span className="ml-4 text-slate-800 font-medium">{option}</span>
                  </label>
                ))}
              </div>
            </>
          )}

          {/* Grammar Section */}
          {currentCategory === 'grammar' && (
            <>
              <h3 className="font-bold text-xl text-slate-900 mb-6 text-center">
                {question.question}
              </h3>
              <div className="space-y-3">
                {question.options.map((option, idx) => (
                  <label key={idx} className="flex items-center p-4 border-2 border-slate-200 rounded-lg cursor-pointer hover:border-amber-600 hover:bg-amber-50 transition">
                    <input
                      type="radio"
                      name={question.id}
                      checked={answers[question.id] === idx}
                      onChange={() => handleAnswer(question.id, idx)}
                      className="w-4 h-4 accent-amber-600"
                    />
                    <span className="ml-4 text-slate-800 font-medium">{option}</span>
                  </label>
                ))}
              </div>
            </>
          )}

          {/* Listening Section */}
          {currentCategory === 'listening' && (
            <>
              <div className="bg-slate-50 p-8 rounded-lg mb-8 text-center">
                <div className="text-5xl mb-4">🔊</div>
                <p className="text-slate-600 text-sm mb-4">Play the audio (in production, real Danish native speech)</p>
                <div className="bg-white p-4 rounded border border-slate-200 text-slate-800 italic">
                  "{question.transcript}"
                </div>
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-6">
                {question.question}
              </h3>
              <div className="space-y-3">
                {question.options.map((option, idx) => (
                  <label key={idx} className="flex items-center p-4 border-2 border-slate-200 rounded-lg cursor-pointer hover:border-amber-600 hover:bg-amber-50 transition">
                    <input
                      type="radio"
                      name={question.id}
                      checked={answers[question.id] === idx}
                      onChange={() => handleAnswer(question.id, idx)}
                      className="w-4 h-4 accent-amber-600"
                    />
                    <span className="ml-4 text-slate-800 font-medium">{option}</span>
                  </label>
                ))}
              </div>
            </>
          )}

          {/* Speaking Section */}
          {currentCategory === 'speaking' && (
            <>
              <h3 className="font-bold text-lg text-slate-900 mb-4">
                {question.prompt}
              </h3>
              <p className="text-slate-600 text-sm mb-6">
                Answer in Danish. You can type your response or optionally record yourself.
              </p>
              <div className="bg-amber-50 p-6 rounded-lg mb-6 border border-amber-200">
                <textarea
                  placeholder="Your response in Danish (optional)..."
                  className="w-full p-4 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 resize-none"
                  rows={4}
                  defaultValue={answers[question.id] || ''}
                  onChange={(e) => handleAnswer(question.id, e.target.value)}
                />
              </div>
              <div className="mb-8">
                <label className="block text-slate-900 font-semibold mb-4">
                  Rate your confidence (1–5):
                </label>
                <div className="flex gap-3">
                  {[1, 2, 3, 4, 5].map(rating => (
                    <button
                      key={rating}
                      onClick={() => handleSpeakingRating(question.id, rating)}
                      className={`w-12 h-12 rounded-lg font-bold transition ${
                        speakingRatings[question.id] === rating
                          ? 'bg-amber-600 text-white'
                          : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                      }`}
                    >
                      {rating}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Navigation */}
          <div className="flex gap-4 mt-10">
            {currentQuestionIndex > 0 || categoryCount > 1 ? (
              <button
                onClick={() => {
                  if (currentQuestionIndex > 0) {
                    setCurrentQuestionIndex(currentQuestionIndex - 1);
                  }
                }}
                className="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition"
              >
                ← Previous
              </button>
            ) : null}
            <button
              onClick={handleNextQuestion}
              disabled={answers[question.id] === undefined && currentCategory !== 'speaking'}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {categoryCount === totalCategories && questionCount === totalQuestions ? 'See Results →' : 'Next →'}
            </button>
          </div>
        </div>
      </div>
    </WebAppShell>
  );
}
