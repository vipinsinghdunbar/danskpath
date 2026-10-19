import { useState, useEffect } from 'react';
import { getWeakSpots } from '../lib/recommendationEngine';
import { getRandomExercise } from '../lib/completeGrammarExercises';

export default function SurpriseTest({ onBack }) {
  const [testState, setTestState] = useState('confirm'); // confirm, testing, results
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [exercises, setExercises] = useState([]);
  const [startTime] = useState(Date.now());
  const [results, setResults] = useState(null);

  // Generate surprise test (10 questions from weak spots)
  const handleStartTest = () => {
    const weakSpots = getWeakSpots('vipin', 5);
    const newExercises = [];

    for (let i = 0; i < 10 && newExercises.length < 10; i++) {
      const category = weakSpots[i % weakSpots.length].category;
      const exercise = getRandomExercise(category);
      if (exercise) {
        newExercises.push({ ...exercise, category });
      }
    }

    setExercises(newExercises);
    setTestState('testing');
  };

  // Handle answer
  const handleAnswerSelect = (answer) => {
    setAnswers({ ...answers, [currentIndex]: answer });
  };

  // Move to next
  const handleNext = () => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      finishTest();
    }
  };

  // Finish test
  const finishTest = () => {
    const correct = Object.keys(answers).filter(
      idx => answers[idx] === exercises[idx].correct
    ).length;

    const accuracy = Math.round((correct / exercises.length) * 100);
    const duration = Math.round((Date.now() - startTime) / 1000);

    const testResults = {
      accuracy,
      correctAnswers: correct,
      totalQuestions: exercises.length,
      duration,
      passed: accuracy >= 80,
      testDate: new Date().toISOString(),
      category: 'surprise'
    };

    // Save to history
    const userId = 'vipin';
    const history = JSON.parse(localStorage.getItem(`dansk_surprise_tests_${userId}`) || '[]');
    history.push(testResults);
    localStorage.setItem(`dansk_surprise_tests_${userId}`, JSON.stringify(history));

    setResults(testResults);
    setTestState('results');
  };

  // Confirm Screen
  if (testState === 'confirm') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow">
            <div className="text-center mb-8">
              <p className="text-5xl mb-4">🎲</p>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Surprise Test!</h1>
              <p className="text-xl text-gray-600">
                Test yourself on your weakest areas
              </p>
            </div>

            <div className="space-y-6 mb-8">
              <div className="p-6 bg-yellow-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">What's Included:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✅ 10 random questions</li>
                  <li>✅ Focus on your weak spots</li>
                  <li>✅ No hints or explanations</li>
                  <li>✅ Immediate feedback</li>
                  <li>✅ Pass threshold: 80%+</li>
                </ul>
              </div>

              <div className="p-6 bg-orange-50 rounded-lg">
                <p className="font-semibold text-gray-900 mb-2">💪 Difficulty Level</p>
                <p className="text-gray-700">
                  This test pulls from the categories where you made the most mistakes. Good luck! 🎯
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={onBack}
                className="flex-1 bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700"
              >
                ← Cancel
              </button>
              <button
                onClick={handleStartTest}
                className="flex-1 bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700"
              >
                Let's Go! 🚀
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Testing Screen
  if (testState === 'testing' && exercises.length > 0) {
    const exercise = exercises[currentIndex];
    const progress = Math.round(((currentIndex + 1) / exercises.length) * 100);

    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 p-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="bg-white p-4 rounded-lg shadow mb-4">
            <div className="flex justify-between items-center mb-3">
              <p className="text-lg font-bold text-gray-900">
                {currentIndex + 1}/{exercises.length}
              </p>
              <p className="text-sm text-gray-600">Surprise Test</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-orange-600 h-2 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Question */}
          <div className="bg-white p-6 rounded-lg shadow mb-4">
            <p className="text-sm text-gray-600 mb-3">
              <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-semibold">
                {exercise.category}
              </span>
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">{exercise.question}</h2>

            {/* Options */}
            <div className="space-y-3 mb-6">
              {exercise.options.map((option, idx) => (
                <label
                  key={idx}
                  className={`block p-4 border-2 rounded-lg cursor-pointer transition ${
                    answers[currentIndex] === option
                      ? 'border-orange-600 bg-orange-50'
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
            <button
              onClick={handleNext}
              disabled={!answers[currentIndex]}
              className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentIndex === exercises.length - 1 ? '✓ Submit Test' : 'Next →'}
            </button>
          </div>

          {/* No Explanations Yet */}
          <div className="p-4 bg-yellow-50 rounded-lg text-sm text-gray-600 text-center">
            💡 No hints during the test - full results after you're done!
          </div>
        </div>
      </div>
    );
  }

  // Results Screen
  if (testState === 'results' && results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 p-6">
        <div className="max-w-2xl mx-auto">
          <div className={`p-8 rounded-lg shadow text-center ${
            results.passed
              ? 'bg-green-50 border-2 border-green-500'
              : 'bg-orange-50 border-2 border-orange-500'
          }`}>
            <p className="text-6xl mb-4">
              {results.passed ? '🎉' : '💪'}
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {results.passed ? 'Excellent!' : 'Keep Improving!'}
            </h2>

            <p className="text-xl text-gray-700 mb-8">
              You got {results.correctAnswers}/{results.totalQuestions} correct
            </p>

            {/* Score */}
            <div className="mb-8">
              <p className="text-6xl font-bold text-orange-600">{results.accuracy}%</p>
              <p className="text-gray-600 mt-2">
                {results.passed ? 'You passed!' : 'Come back and try again!'}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-4 bg-white rounded-lg">
                <p className="text-sm text-gray-600">Time</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(results.duration / 60)}m {results.duration % 60}s
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <p className="text-sm text-gray-600">Category</p>
                <p className="text-2xl font-bold text-gray-900">Weak Spots</p>
              </div>
            </div>

            {/* Recommendation */}
            <div className="p-4 bg-white rounded-lg mb-8 text-left">
              <p className="font-semibold text-gray-900 mb-2">📚 Recommendation:</p>
              <p className="text-sm text-gray-700">
                {results.passed
                  ? 'Great job! You\'re making progress on these weak spots. Keep practicing to maintain your gains.'
                  : 'Focus on practicing the categories where you scored lower. Use our recommendation engine to guide your studies.'}
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
                onClick={() => setTestState('confirm')}
                className="flex-1 bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700"
              >
                Try Another
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
