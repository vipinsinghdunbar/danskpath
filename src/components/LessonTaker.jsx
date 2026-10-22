import { useState, useEffect } from 'react';
import { getExercisesByCategory } from '../lib/completeGrammarExercises';

export default function LessonTaker({ lessonId, onComplete, onBack }) {
  const [lesson, setLesson] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [marking, setMarking] = useState(false);
  const [results, setResults] = useState(null);
  const [timeStarted] = useState(Date.now());

  useEffect(() => {
    // Load lesson from localStorage
    const allLessons = JSON.parse(localStorage.getItem('dansk_admin_lessons') || '[]');
    const currentLesson = allLessons.find(l => l.id === lessonId);
    setLesson(currentLesson);
  }, [lessonId]);

  if (!lesson) {
    return <div className="min-h-screen bg-blue-50 flex items-center justify-center"><p>Loading lesson...</p></div>;
  }

  const currentExercise = lesson.exercises[currentIndex];
  const isLastExercise = currentIndex === lesson.exercises.length - 1;

  const handleAnswerChange = (answer) => {
    setAnswers({ ...answers, [currentIndex]: answer });
  };

  const handleNext = () => {
    if (currentIndex < lesson.exercises.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const markAnswers = () => {
    setMarking(true);

    // Auto-mark all answers
    let correct = 0;
    const markedAnswers = lesson.exercises.map((ex, idx) => {
      const userAnswer = answers[idx];
      const isCorrect = userAnswer === ex.correct;
      if (isCorrect) correct++;

      return {
        exerciseId: ex.id,
        question: ex.question,
        userAnswer,
        correctAnswer: ex.correct,
        isCorrect,
        explanation: ex.explanation,
        errorCode: ex.errorCode
      };
    });

    const accuracy = Math.round((correct / lesson.exercises.length) * 100);
    const timeSpent = Math.round((Date.now() - timeStarted) / 1000);

    // Save results
    const userId = 'vipin';
    const progressKey = `dansk_user_progress_${userId}`;
    const progress = JSON.parse(localStorage.getItem(progressKey) || '{}');

    const lessonProgress = progress[lessonId] || {
      completed: false,
      attempts: 0,
      bestAccuracy: 0,
      errors: []
    };

    lessonProgress.attempts = (lessonProgress.attempts || 0) + 1;
    lessonProgress.accuracy = Math.max(lessonProgress.bestAccuracy || 0, accuracy);
    lessonProgress.lastAttempt = new Date().toISOString();
    lessonProgress.timeSpent = (lessonProgress.timeSpent || 0) + timeSpent;

    // Track errors
    markedAnswers.forEach(answer => {
      if (!answer.isCorrect) {
        if (!lessonProgress.errors) lessonProgress.errors = [];
        lessonProgress.errors.push({
          errorCode: answer.errorCode,
          question: answer.question,
          userAnswer: answer.userAnswer,
          correctAnswer: answer.correctAnswer,
          date: new Date().toISOString()
        });
      }
    });

    if (accuracy >= 80) {
      lessonProgress.completed = true;
    }

    progress[lessonId] = lessonProgress;
    localStorage.setItem(progressKey, JSON.stringify(progress));

    // Also save to error log for analytics
    const errorLogKey = `dansk_error_log_${userId}`;
    const errorLog = JSON.parse(localStorage.getItem(errorLogKey) || '[]');
    markedAnswers.forEach(answer => {
      if (!answer.isCorrect) {
        errorLog.push({
          lessonId,
          lessonTitle: lesson.title,
          errorCode: answer.errorCode,
          exercise: answer.question,
          userAnswer: answer.userAnswer,
          correctAnswer: answer.correctAnswer,
          date: new Date().toISOString()
        });
      }
    });
    localStorage.setItem(errorLogKey, JSON.stringify(errorLog));

    setResults({
      markedAnswers,
      accuracy,
      correct,
      total: lesson.exercises.length,
      timeSpent,
      passed: accuracy >= 80
    });
    setSubmitted(true);
    setMarking(false);
  };

  // Results View
  if (submitted && results) {
    return (
      <div className="min-h-screen bg-[#e5f1ff] p-6">
        <div className="max-w-4xl mx-auto">
          {/* Results Header */}
          <div className={`p-8 rounded-lg shadow mb-6 ${
            results.passed ? 'bg-green-50 border-2 border-green-500' : 'bg-[#f2f2f7] border-2 border-[#007aff]'
          }`}>
            <div className="text-center">
              <p className="text-6xl mb-4">{results.passed ? '🎉' : '📊'}</p>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {results.passed ? 'Excellent Work!' : 'Good Effort!'}
              </h2>
              <p className="text-xl text-gray-700 mb-6">
                You got {results.correct} out of {results.total} correct
              </p>

              {/* Accuracy */}
              <div className="bg-white p-6 rounded-lg inline-block">
                <p className="text-sm text-gray-600 mb-2">Overall Accuracy</p>
                <div className="flex items-center gap-4">
                  <div className="relative w-32 h-32">
                    <svg className="w-32 h-32 transform -rotate-90">
                      <circle cx="64" cy="64" r="56" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        fill="none"
                        stroke={results.passed ? '#10b981' : '#f59e0b'}
                        strokeWidth="8"
                        strokeDasharray={`${(results.accuracy / 100) * 351} 351`}
                      />
                    </svg>
                    <p className="absolute inset-0 flex items-center justify-center text-2xl font-bold">
                      {results.accuracy}%
                    </p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-900">Time: {results.timeSpent}s</p>
                    <p className="text-sm text-gray-600 mt-2">
                      {results.passed
                        ? 'Ready for the next lesson! 🚀'
                        : 'Review the answers below and try again.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Results */}
          <div className="space-y-4 mb-8">
            <h3 className="text-2xl font-bold text-gray-900">Review Your Answers</h3>
            {results.markedAnswers.map((answer, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-lg border-l-4 ${
                  answer.isCorrect
                    ? 'bg-green-50 border-green-500'
                    : 'bg-red-50 border-red-500'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <p className="font-semibold text-gray-900">
                    {idx + 1}. {answer.question}
                  </p>
                  <span className="text-xl">{answer.isCorrect ? '✅' : '❌'}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                  <div>
                    <p className="text-sm text-gray-600">Your answer</p>
                    <p className={`font-semibold ${answer.isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                      {answer.userAnswer || '(no answer)'}
                    </p>
                  </div>
                  {!answer.isCorrect && (
                    <div>
                      <p className="text-sm text-gray-600">Correct answer</p>
                      <p className="font-semibold text-green-700">{answer.correctAnswer}</p>
                    </div>
                  )}
                </div>

                <p className="text-sm text-gray-700 bg-white p-3 rounded">
                  <span className="font-semibold">Explanation:</span> {answer.explanation}
                </p>

                <p className="text-xs text-gray-500 mt-2">
                  Error Code: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{answer.errorCode}</span>
                </p>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              onClick={onBack}
              className="flex-1 bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition"
            >
              ← Back to Lessons
            </button>
            <button
              onClick={() => {
                setCurrentIndex(0);
                setAnswers({});
                setSubmitted(false);
                setResults(null);
              }}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Retake Lesson
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Lesson Taking View
  return (
    <div className="min-h-screen bg-[#e5f1ff] p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{lesson.title}</h1>
              <p className="text-gray-600 mt-1">{lesson.category}</p>
            </div>
            <button
              onClick={onBack}
              className="text-gray-600 hover:text-gray-900 text-2xl"
            >
              ✕
            </button>
          </div>

          {/* Progress */}
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Question {currentIndex + 1} of {lesson.exercises.length}
            </p>
            <div className="w-64 bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-600 h-3 rounded-full transition-all"
                style={{ width: `${((currentIndex + 1) / lesson.exercises.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Exercise */}
        {currentExercise && (
          <div className="bg-white p-8 rounded-lg shadow mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">{currentExercise.question}</h2>

            {/* Options */}
            <div className="space-y-3 mb-8">
              {currentExercise.options.map((option, idx) => (
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
                    name={`question-${currentIndex}`}
                    value={option}
                    checked={answers[currentIndex] === option}
                    onChange={() => handleAnswerChange(option)}
                    className="mr-3"
                  />
                  <span className="font-semibold text-gray-900">{option}</span>
                </label>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex gap-4">
              <button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ← Previous
              </button>

              {isLastExercise ? (
                <button
                  onClick={markAnswers}
                  disabled={marking}
                  className="flex-1 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50"
                >
                  {marking ? 'Marking...' : '✓ Submit & Mark'}
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700"
                >
                  Next →
                </button>
              )}
            </div>

            {/* Question Indicator */}
            <div className="mt-6 flex flex-wrap gap-2">
              {lesson.exercises.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-8 h-8 rounded-full font-semibold transition ${
                    idx === currentIndex
                      ? 'bg-blue-600 text-white'
                      : answers[idx]
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-300 text-gray-700'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
