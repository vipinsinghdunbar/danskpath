import { useState, useEffect } from 'react';
import { getAllCategories, getRandomExercise } from '../lib/completeGrammarExercises';

export default function ProficiencyTest({ onTestComplete, onBack }) {
  const [testState, setTestState] = useState('start'); // start, testing, results
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [difficulty, setDifficulty] = useState('intermediate'); // beginner, intermediate, advanced
  const [questions, setQuestions] = useState([]);
  const [categoryScores, setCategoryScores] = useState({});
  const [timeStarted] = useState(Date.now());
  const [results, setResults] = useState(null);

  const DIFFICULTY_MAP = {
    beginner: { min: 0, max: 2, label: 'A1-A2' },
    intermediate: { min: 2, max: 4, label: 'B1-B2' },
    advanced: { min: 4, max: 5, label: 'C1-C2' }
  };

  const CEFR_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

  // Generate questions for current difficulty
  const generateQuestions = (newDifficulty) => {
    const categories = getAllCategories();
    const newQuestions = [];
    const categorySet = new Set();

    // Get 40 random questions across categories
    while (newQuestions.length < 40) {
      const randomCat = categories[Math.floor(Math.random() * categories.length)];
      const exercise = getRandomExercise(randomCat.code);

      if (exercise) {
        // Add metadata about category
        const questionWithCategory = {
          ...exercise,
          category: randomCat.code,
          categoryName: randomCat.name,
          difficulty: newDifficulty
        };
        newQuestions.push(questionWithCategory);
        categorySet.add(randomCat.code);
      }
    }

    setQuestions(newQuestions);
    return newQuestions;
  };

  // Start test
  const handleStartTest = () => {
    const newQuestions = generateQuestions(difficulty);
    setTestState('testing');
    setCurrentIndex(0);
    setAnswers({});
  };

  // Handle answer selection
  const handleAnswerSelect = (answer) => {
    setAnswers({ ...answers, [currentIndex]: answer });
  };

  // Move to next question
  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      const currentQuestion = questions[currentIndex];
      const isCorrect = answers[currentIndex] === currentQuestion.correct;

      // Update category scores
      const catScore = categoryScores[currentQuestion.category] || { correct: 0, total: 0 };
      setCategoryScores({
        ...categoryScores,
        [currentQuestion.category]: {
          correct: catScore.correct + (isCorrect ? 1 : 0),
          total: catScore.total + 1
        }
      });

      // Adaptive difficulty: after 15 questions, adjust if needed
      if (currentIndex === 14) {
        const correct = Object.keys(answers).filter(
          idx => answers[idx] === questions[idx].correct
        ).length;
        const accuracy = correct / 15;

        if (accuracy >= 0.85 && difficulty !== 'advanced') {
          setDifficulty('advanced');
        } else if (accuracy < 0.60 && difficulty !== 'beginner') {
          setDifficulty('beginner');
        }
      }

      setCurrentIndex(currentIndex + 1);
    }
  };

  // Complete test and calculate results
  const handleCompleteTest = () => {
    // Calculate scores
    let totalCorrect = 0;
    const finalCategoryScores = { ...categoryScores };

    Object.entries(answers).forEach(([idx, answer]) => {
      const question = questions[idx];
      if (answer === question.correct) {
        totalCorrect++;
      }
    });

    const accuracy = Math.round((totalCorrect / questions.length) * 100);

    // Determine CEFR level based on accuracy
    let cefrLevel = 'A1';
    if (accuracy >= 90) cefrLevel = 'C2';
    else if (accuracy >= 85) cefrLevel = 'C1';
    else if (accuracy >= 75) cefrLevel = 'B2';
    else if (accuracy >= 65) cefrLevel = 'B1';
    else if (accuracy >= 50) cefrLevel = 'A2';
    else cefrLevel = 'A1';

    // Calculate category-specific scores
    Object.entries(finalCategoryScores).forEach(([cat, scores]) => {
      finalCategoryScores[cat].percentage = Math.round((scores.correct / scores.total) * 100);
    });

    const testResults = {
      cefrLevel,
      accuracy,
      correctAnswers: totalCorrect,
      totalQuestions: questions.length,
      duration: Math.round((Date.now() - timeStarted) / 1000),
      categoryScores: finalCategoryScores,
      testDate: new Date().toISOString(),
      difficulty
    };

    // Save to localStorage
    const userId = 'vipin';
    const testHistory = JSON.parse(localStorage.getItem(`dansk_proficiency_tests_${userId}`) || '[]');
    testHistory.push(testResults);
    localStorage.setItem(`dansk_proficiency_tests_${userId}`, JSON.stringify(testHistory));

    // Also save current level
    localStorage.setItem(`dansk_current_level_${userId}`, cefrLevel);

    setResults(testResults);
    setTestState('results');
    onTestComplete?.(testResults);
  };

  // Start screen
  if (testState === 'start') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">🧪 Proficiency Test</h1>
              <p className="text-xl text-gray-600">Discover your Danish level (A1-C2)</p>
            </div>

            <div className="space-y-6 mb-8">
              <div className="p-6 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">How It Works:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✅ 40 questions across all grammar categories</li>
                  <li>✅ Adaptive difficulty (adjusts based on your answers)</li>
                  <li>✅ Takes 10-15 minutes</li>
                  <li>✅ Your level updates in real-time</li>
                  <li>✅ Detailed category breakdown</li>
                </ul>
              </div>

              <div className="space-y-4">
                <p className="font-semibold text-gray-900">Start at difficulty level:</p>
                <div className="grid grid-cols-3 gap-4">
                  {['beginner', 'intermediate', 'advanced'].map(level => (
                    <button
                      key={level}
                      onClick={() => setDifficulty(level)}
                      className={`p-4 rounded-lg font-semibold transition ${
                        difficulty === level
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {level === 'beginner' && 'Beginner\n(A1-A2)'}
                      {level === 'intermediate' && 'Intermediate\n(B1-B2)'}
                      {level === 'advanced' && 'Advanced\n(C1-C2)'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={onBack}
                className="flex-1 bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700"
              >
                ← Back
              </button>
              <button
                onClick={handleStartTest}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
              >
                Start Test →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Testing screen
  if (testState === 'testing' && questions.length > 0) {
    const currentQuestion = questions[currentIndex];
    const progress = Math.round(((currentIndex + 1) / questions.length) * 100);

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Proficiency Test</h2>
              <button
                onClick={onBack}
                className="text-gray-600 hover:text-gray-900 text-2xl"
              >
                ✕
              </button>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Question {currentIndex + 1} of {questions.length}</span>
                <span className="text-sm font-semibold text-blue-600">{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-600 h-3 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Question */}
          <div className="bg-white p-8 rounded-lg shadow">
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">
                Category: <span className="font-semibold text-gray-900">{currentQuestion.categoryName}</span>
              </p>
              <h3 className="text-xl font-bold text-gray-900">{currentQuestion.question}</h3>
            </div>

            {/* Options */}
            <div className="space-y-3 mb-8">
              {currentQuestion.options.map((option, idx) => (
                <label
                  key={idx}
                  className={`block p-4 border-2 rounded-lg cursor-pointer transition ${
                    answers[currentIndex] === option
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-300 bg-white hover:border-gray-400'
                  }`}
                >
                  <input
                    type="radio"
                    name={`q${currentIndex}`}
                    value={option}
                    checked={answers[currentIndex] === option}
                    onChange={() => handleAnswerSelect(option)}
                    className="mr-3"
                  />
                  <span className="font-semibold text-gray-900">{option}</span>
                </label>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex gap-4">
              <button
                onClick={handleNext}
                disabled={!answers[currentIndex]}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentIndex === questions.length - 1 ? '✓ Complete Test' : 'Next Question →'}
              </button>
            </div>

            {currentIndex === questions.length - 1 && !answers[currentIndex] && (
              <p className="text-sm text-gray-600 mt-3 text-center">
                Answer the question above to complete the test
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Results screen
  if (testState === 'results' && results) {
    const levelColors = {
      'A1': 'bg-red-100 text-red-800',
      'A2': 'bg-orange-100 text-orange-800',
      'B1': 'bg-yellow-100 text-yellow-800',
      'B2': 'bg-blue-100 text-blue-800',
      'C1': 'bg-purple-100 text-purple-800',
      'C2': 'bg-green-100 text-green-800'
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-3xl mx-auto">
          {/* Results Header */}
          <div className="bg-white p-8 rounded-lg shadow mb-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Result</h2>
              <div className={`inline-block px-6 py-3 rounded-lg text-2xl font-bold ${levelColors[results.cefrLevel]}`}>
                {results.cefrLevel}
              </div>
              <p className="text-gray-600 mt-4">CEFR Level: European Framework Level {results.cefrLevel}</p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center">
                <p className="text-sm text-gray-600">Accuracy</p>
                <p className="text-3xl font-bold text-blue-600">{results.accuracy}%</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Correct Answers</p>
                <p className="text-3xl font-bold text-green-600">{results.correctAnswers}/{results.totalQuestions}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Time</p>
                <p className="text-3xl font-bold text-orange-600">{Math.round(results.duration / 60)}m</p>
              </div>
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Strength by Category</h3>
            <div className="space-y-3">
              {Object.entries(results.categoryScores)
                .sort((a, b) => b[1].percentage - a[1].percentage)
                .map(([category, scores]) => (
                  <div key={category}>
                    <div className="flex justify-between mb-1">
                      <p className="font-semibold text-gray-900">{category}</p>
                      <p className="font-bold text-gray-700">{scores.percentage}%</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${scores.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Recommendation */}
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">📚 Next Steps</h3>
            <p className="text-gray-700 mb-4">
              {results.accuracy >= 90
                ? "Excellent work! You're ready for more advanced challenges. Try the Advanced lessons."
                : results.accuracy >= 75
                ? "Great progress! Focus on lessons in categories where you scored lower."
                : results.accuracy >= 60
                ? "Good start! Practice more exercises to strengthen weaker areas."
                : "Keep practicing! Start with Beginner lessons to build a strong foundation."}
            </p>

            {/* Weak Categories */}
            {Object.entries(results.categoryScores).some(([_, scores]) => scores.percentage < 70) && (
              <div className="p-4 bg-orange-50 rounded-lg">
                <p className="font-semibold text-orange-900 mb-2">📍 Focus Areas:</p>
                <ul className="space-y-1">
                  {Object.entries(results.categoryScores)
                    .filter(([_, scores]) => scores.percentage < 70)
                    .slice(0, 3)
                    .map(([category, scores]) => (
                      <li key={category} className="text-sm text-orange-900">
                        • {category}: {scores.percentage}% (Practice more)
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              onClick={onBack}
              className="flex-1 bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700"
            >
              ← Back to Dashboard
            </button>
            <button
              onClick={() => setTestState('start')}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
            >
              Retake Test
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
