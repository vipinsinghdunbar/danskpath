import { useState, useEffect } from 'react';
import { getExercisesByCategory } from '../lib/completeGrammarExercises';

export default function UserLessonDashboard({
  onStartLesson,
  onViewAnalytics,
  onOpenAdmin,
  onTakeProficiencyTest,
  onViewRecommendations,
  onViewDailyPractice,
  onTakeSurpriseTest
}) {
  const [lessons, setLessons] = useState([]);
  const [userProgress, setUserProgress] = useState({});
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Load lessons from localStorage (created by admin)
    const savedLessons = JSON.parse(localStorage.getItem('dansk_admin_lessons') || '[]');
    setLessons(savedLessons);

    // Load user progress
    const userId = 'vipin'; // Hard-coded for MVP
    const savedProgress = JSON.parse(localStorage.getItem(`dansk_user_progress_${userId}`) || '{}');
    setUserProgress(savedProgress);
  }, []);

  const getProgressStats = (lessonId) => {
    const progress = userProgress[lessonId] || {};
    return {
      completed: progress.completed || false,
      accuracy: progress.accuracy || 0,
      attempts: progress.attempts || 0,
      lastAttempt: progress.lastAttempt || null,
      timeSpent: progress.timeSpent || 0,
      errors: progress.errors || []
    };
  };

  const filteredLessons = filter === 'all' ? lessons : lessons.filter(l => l.category === filter);

  const categories = [...new Set(lessons.map(l => l.category))];

  return (
    <div className="min-h-screen bg-[#e5f1ff] p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">📚 Your Lessons</h1>
            <p className="text-gray-600 mt-2">Choose a lesson to begin practicing Danish grammar</p>
          </div>
          {onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
            >
              ⚙️ Admin Panel
            </button>
          )}
        </div>

        {/* Phase 3 Features Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <button
            onClick={onTakeProficiencyTest}
            className="p-4 bg-[#e5f1ff] text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition"
          >
            <p className="text-2xl mb-2">🧪</p>
            <p className="font-semibold">Proficiency Test</p>
            <p className="text-xs opacity-90 mt-1">Measure your level</p>
          </button>

          <button
            onClick={onViewRecommendations}
            className="p-4 bg-[#f2f2f7] text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition"
          >
            <p className="text-2xl mb-2">⭐</p>
            <p className="font-semibold">Recommended</p>
            <p className="text-xs opacity-90 mt-1">Personalized lessons</p>
          </button>

          <button
            onClick={onViewDailyPractice}
            className="p-4 bg-[#f2f2f7] text-white rounded-lg hover:from-green-600 hover:to-green-700 transition"
          >
            <p className="text-2xl mb-2">📅</p>
            <p className="font-semibold">Daily Practice</p>
            <p className="text-xs opacity-90 mt-1">Spaced repetition</p>
          </button>

          <button
            onClick={onTakeSurpriseTest}
            className="p-4 bg-[#f2f2f7] text-white rounded-lg hover: hover: transition"
          >
            <p className="text-2xl mb-2">🎲</p>
            <p className="font-semibold">Surprise Test</p>
            <p className="text-xs opacity-90 mt-1">Pop quiz challenge</p>
          </button>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm text-gray-600">Total Lessons</p>
            <p className="text-3xl font-bold text-blue-600">{lessons.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm text-gray-600">Completed</p>
            <p className="text-3xl font-bold text-green-600">
              {lessons.filter(l => getProgressStats(l.id).completed).length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm text-gray-600">Average Accuracy</p>
            <p className="text-3xl font-bold text-purple-600">
              {lessons.length > 0
                ? Math.round(
                    lessons.reduce((sum, l) => sum + (getProgressStats(l.id).accuracy || 0), 0) / lessons.length
                  )
                : 0}%
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm text-gray-600">Total Time</p>
            <p className="text-3xl font-bold text-[#007aff]">
              {Math.round(
                lessons.reduce((sum, l) => sum + (getProgressStats(l.id).timeSpent || 0), 0) / 60
              )}m
            </p>
          </div>
        </div>

        {/* Filter and Analytics */}
        <div className="mb-6 flex gap-2 flex-wrap items-center">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            All Lessons
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                filter === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
          {onViewAnalytics && (
            <button
              onClick={onViewAnalytics}
              className="ml-auto px-4 py-2 rounded-lg font-semibold bg-green-600 text-white hover:bg-green-700 transition"
            >
              📊 View Analytics
            </button>
          )}
        </div>

        {/* Lessons Grid */}
        {filteredLessons.length === 0 ? (
          <div className="bg-white p-12 rounded-lg shadow text-center">
            <p className="text-xl text-gray-600 mb-4">No lessons yet</p>
            <p className="text-gray-500">Go to Admin Panel to create your first lesson</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLessons.map(lesson => {
              const stats = getProgressStats(lesson.id);
              const progressPercent = Math.min(100, stats.attempts * 20); // Each attempt = 20%

              return (
                <div
                  key={lesson.id}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
                >
                  {/* Header */}
                  <div className={`p-6 ${
                    stats.completed ? 'bg-green-50' : 'bg-blue-50'
                  }`}>
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-bold text-gray-900">{lesson.title}</h3>
                      {stats.completed && <span className="text-2xl">✅</span>}
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{lesson.category}</p>
                    <p className="text-xs text-gray-500">{lesson.exerciseCount} exercises</p>
                  </div>

                  {/* Progress Bar */}
                  <div className="px-6 py-3 bg-gray-50">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-700">Progress</span>
                      <span className="text-sm font-bold text-blue-600">{Math.round(progressPercent)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${progressPercent}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="px-6 py-4 bg-white">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-600">Accuracy</p>
                        <p className="text-lg font-bold text-gray-900">{stats.accuracy}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Attempts</p>
                        <p className="text-lg font-bold text-gray-900">{stats.attempts}</p>
                      </div>
                    </div>
                    {stats.lastAttempt && (
                      <p className="text-xs text-gray-500 mb-4">
                        Last: {new Date(stats.lastAttempt).toLocaleDateString()}
                      </p>
                    )}
                  </div>

                  {/* Action */}
                  <div className="px-6 py-4 border-t">
                    <button
                      onClick={() => onStartLesson(lesson.id)}
                      className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                      {stats.completed ? 'Review' : 'Start'} Lesson
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
