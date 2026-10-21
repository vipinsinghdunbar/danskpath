import { useState, useEffect } from 'react';
import { getWeakSpots } from '../lib/recommendationEngine';
import { getExercisesByCategory, getAllCategories } from '../lib/completeGrammarExercises';
import { selectItems, inferExerciseLevel } from '../lib/contentSelector';
import { getSkillDifficulty } from '../lib/sessionEngine';

// `autoStart` is set when the daily session opens this view. The plan has
// already chosen the duration and the focus, so asking again is a second
// configuration screen in front of a step the learner already committed to —
// which defeats the point of having a plan. With it set, the drill begins
// immediately on the plan's terms; opened on its own, the setup screen stays.
export default function PracticeSession({
  onBack,
  difficulty = null,
  autoStart = false,
  minutes = null,
}) {
  const [stage, setStage] = useState(autoStart ? 'practicing' : 'setup');
  const [duration, setDuration] = useState(minutes ?? 15); // minutes
  const [focusType, setFocusType] = useState('weak'); // weak, all, category
  const [selectedCategory, setSelectedCategory] = useState('ORD');

  const [currentIndex, setCurrentIndex] = useState(0);
  const [exercises, setExercises] = useState([]);
  const [answers, setAnswers] = useState({});
  const [streak, setStreak] = useState(0);
  const [startTime] = useState(Date.now());
  const [results, setResults] = useState(null);

  // Generate exercises based on settings.
  //
  // This previously called getRandomExercise once per slot, which draws *with*
  // replacement — so the same exercise could appear two or three times in one
  // sitting — and ignored level entirely, so the drill never got harder as the
  // learner improved. Selection now goes through contentSelector, which filters
  // to the band implied by the current difficulty and draws without replacement.
  const handleStartSession = () => {
    const exerciseCount = Math.round((duration * 60) / 90); // ~90 seconds per exercise

    // When the daily session opens this view it passes the grammar difficulty;
    // opened on its own, fall back to the stored value.
    const level = difficulty ?? getSkillDifficulty('grammar');

    let categories;
    if (focusType === 'weak') {
      categories = getWeakSpots('vipin', 3).map((w) => w.category);
    } else if (focusType === 'category') {
      categories = [selectedCategory];
    } else {
      categories = getAllCategories().map((c) => c.code);
    }
    if (!categories.length) categories = ['ORD'];

    // Spread the requested count across the chosen categories, then take each
    // category's share from the level-appropriate, unseen pool.
    const perCategory = Math.ceil(exerciseCount / categories.length);
    const newExercises = [];
    const seenIds = new Set();

    for (const category of categories) {
      const pool = getExercisesByCategory(category);
      if (!pool.length) continue;

      const picked = selectItems({
        kind: `grammar_${category}`,
        items: pool,
        difficulty: level,
        count: perCategory,
        levelOf: (ex) => inferExerciseLevel(ex.id),
      });

      for (const ex of picked) {
        if (seenIds.has(ex.id)) continue;
        seenIds.add(ex.id);
        newExercises.push({ ...ex, category });
      }
    }

    // Interleave categories instead of running them in blocks, and trim to the
    // requested length.
    newExercises.sort(() => Math.random() - 0.5);
    setExercises(newExercises.slice(0, exerciseCount));
    setStage('practicing');
    setCurrentIndex(0);
  };

  // Opened from the daily plan: generate the drill on mount so the learner
  // lands on the first question rather than a setup screen.
  useEffect(() => {
    if (autoStart && exercises.length === 0) handleStartSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoStart]);

  // Handle answer
  const handleAnswerSelect = (answer) => {
    if (currentIndex < exercises.length) {
      const exercise = exercises[currentIndex];
      const isCorrect = answer === exercise.correct;

      setAnswers({ ...answers, [currentIndex]: { answer, isCorrect } });

      if (isCorrect) {
        setStreak(streak + 1);
      } else {
        setStreak(0);
      }

      // Auto-advance after 1 second
      setTimeout(() => {
        if (currentIndex < exercises.length - 1) {
          setCurrentIndex(currentIndex + 1);
        } else {
          finishSession();
        }
      }, 1000);
    }
  };

  // Finish session
  const finishSession = () => {
    const correct = Object.values(answers).filter(a => a.isCorrect).length;
    const accuracy = Math.round((correct / exercises.length) * 100);
    const duration = Math.round((Date.now() - startTime) / 1000);
    const maxStreak = Math.max(...Object.entries(answers).reduce((max, [idx, ans]) => {
      if (!ans.isCorrect) return max;
      let count = 0;
      for (let i = parseInt(idx); i >= 0; i--) {
        if (answers[i]?.isCorrect) count++;
        else break;
      }
      return Math.max(max, count);
    }, [0]));

    const sessionResults = {
      duration,
      exercisesCompleted: exercises.length,
      correctAnswers: correct,
      accuracy,
      maxStreak,
      sessionDate: new Date().toISOString(),
      focusType,
      category: selectedCategory
    };

    // Save to history
    const userId = 'vipin';
    const history = JSON.parse(localStorage.getItem(`dansk_practice_sessions_${userId}`) || '[]');
    history.push(sessionResults);
    localStorage.setItem(`dansk_practice_sessions_${userId}`, JSON.stringify(history));

    setResults(sessionResults);
    setStage('results');
  };

  // Setup Screen
  if (stage === 'setup') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">⚡ Quick Practice</h1>
            <p className="text-gray-600 mb-8">Rapid-fire exercises to sharpen your skills</p>

            <div className="space-y-8">
              {/* Duration */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  ⏱️ Session Duration
                </label>
                <div className="flex gap-3">
                  {[10, 15, 20, 30].map(min => (
                    <button
                      key={min}
                      onClick={() => setDuration(min)}
                      className={`px-6 py-3 rounded-lg font-semibold transition ${
                        duration === min
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {min}m
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  ~{Math.round((duration * 60) / 90)} øvelser · ca. 90 sek. hver
                </p>
              </div>

              {/* Focus Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  📚 What to Practice
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer" style={{
                    borderColor: focusType === 'weak' ? '#2563eb' : '#e5e7eb',
                    backgroundColor: focusType === 'weak' ? '#eff6ff' : 'white'
                  }}>
                    <input
                      type="radio"
                      value="weak"
                      checked={focusType === 'weak'}
                      onChange={e => setFocusType(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span>
                      <p className="font-semibold text-gray-900">🔴 Weak Spots</p>
                      <p className="text-sm text-gray-600">Exercises from your weakest categories</p>
                    </span>
                  </label>

                  <label className="flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer" style={{
                    borderColor: focusType === 'all' ? '#2563eb' : '#e5e7eb',
                    backgroundColor: focusType === 'all' ? '#eff6ff' : 'white'
                  }}>
                    <input
                      type="radio"
                      value="all"
                      checked={focusType === 'all'}
                      onChange={e => setFocusType(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span>
                      <p className="font-semibold text-gray-900">🎲 Random Mix</p>
                      <p className="text-sm text-gray-600">Exercises from all categories</p>
                    </span>
                  </label>

                  <label className="flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer" style={{
                    borderColor: focusType === 'category' ? '#2563eb' : '#e5e7eb',
                    backgroundColor: focusType === 'category' ? '#eff6ff' : 'white'
                  }}>
                    <input
                      type="radio"
                      value="category"
                      checked={focusType === 'category'}
                      onChange={e => setFocusType(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span>
                      <p className="font-semibold text-gray-900">📂 Specific Category</p>
                      <p className="text-sm text-gray-600">Deep dive into one topic</p>
                    </span>
                  </label>
                </div>
              </div>

              {/* Category Selector */}
              {focusType === 'category' && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Choose Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={e => setSelectedCategory(e.target.value)}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                  >
                    {['ORD', 'KOMP', 'KONJ', 'PRON', 'POSS', 'ARTKV', 'PASS', 'SVERB', 'MOD', 'REL', 'INFGER', 'NEG', 'PREP', 'REFL', 'IDI'].map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Info */}
              <div className="p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-purple-900">
                  ⚡ <strong>Rapid Fire Mode:</strong> Minimal feedback, maximum speed. Answer and move on!
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <button
                  onClick={onBack}
                  className="flex-1 bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700"
                >
                  ← Back
                </button>
                <button
                  onClick={handleStartSession}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
                >
                  🚀 Start Session
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Practicing Screen
  if (stage === 'practicing' && exercises.length > 0) {
    const exercise = exercises[currentIndex];
    const answered = Object.keys(answers).length;
    const progress = Math.round((answered / exercises.length) * 100);

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="bg-white p-4 rounded-lg shadow mb-4">
            <div className="flex justify-between items-center mb-3">
              <p className="text-lg font-bold text-gray-900">⚡ {answered + 1}/{exercises.length}</p>
              <p className="text-lg font-bold text-red-600">🔥 {streak}</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Exercise */}
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-sm text-gray-600 mb-3">
              <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-semibold">
                {exercise.category}
              </span>
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">{exercise.question}</h2>

            {/* Quick Options */}
            <div className="grid grid-cols-2 gap-3">
              {exercise.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswerSelect(option)}
                  className="p-4 bg-gradient-to-r from-gray-100 to-gray-50 border-2 border-gray-300 rounded-lg font-semibold text-gray-900 hover:from-blue-100 hover:to-blue-50 hover:border-blue-600 transition"
                >
                  {option}
                </button>
              ))}
            </div>

            <p className="text-sm text-gray-500 mt-4 text-center">
              {answers[currentIndex] ? (
                answers[currentIndex].isCorrect ? '✅ Correct!' : '❌ Not quite'
              ) : (
                'Select an answer'
              )}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Results Screen
  if (stage === 'results' && results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">📊 Session Complete!</h2>

            <div className="mb-8">
              <p className="text-6xl font-bold text-blue-600 mb-2">{results.accuracy}%</p>
              <p className="text-gray-600">Accuracy</p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-3xl font-bold text-purple-600">{results.exercisesCompleted}</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600">Correct</p>
                <p className="text-3xl font-bold text-green-600">{results.correctAnswers}</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <p className="text-sm text-gray-600">Max Streak</p>
                <p className="text-3xl font-bold text-orange-600">🔥 {results.maxStreak}</p>
              </div>
            </div>

            <p className="text-gray-600 mb-8">
              Completed in {Math.round(results.duration / 60)} min {results.duration % 60} sec
            </p>

            <div className="flex gap-4">
              <button
                onClick={onBack}
                className="flex-1 bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700"
              >
                ← Back
              </button>
              <button
                onClick={() => setStage('setup')}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
