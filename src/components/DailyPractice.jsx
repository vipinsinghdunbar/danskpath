import { useState, useEffect } from 'react';
import { getDailyStats, getExercisesByPriority, getLearningCurveStats } from '../lib/spacedRepetition';

export default function DailyPractice({ onStartPractice, onBack }) {
  const [stats, setStats] = useState(null);
  const [byPriority, setByPriority] = useState(null);
  const [learningStats, setLearningStats] = useState(null);
  const [showFullStats, setShowFullStats] = useState(false);

  useEffect(() => {
    const userId = 'vipin';
    setStats(getDailyStats(userId));
    setByPriority(getExercisesByPriority(userId));
    setLearningStats(getLearningCurveStats(userId));
  }, []);

  if (!stats || !learningStats) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg">
        <h2 className="text-3xl font-bold mb-4">📅 Daily Practice</h2>
        <p className="text-blue-100">
          Optimize your learning with spaced repetition. Review exercises at the perfect time to maximize retention.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-lg shadow">
          <p className="text-sm text-gray-600">Due Today</p>
          <p className="text-3xl font-bold text-red-600">{stats.totalDue}</p>
          <p className="text-xs text-gray-500 mt-2">{stats.estimatedMinutesNeeded} min</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <p className="text-sm text-gray-600">Overdue</p>
          <p className="text-3xl font-bold text-orange-600">{stats.overdue}</p>
          <p className="text-xs text-gray-500 mt-2">Catch up soon</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <p className="text-sm text-gray-600">Scheduled Later</p>
          <p className="text-3xl font-bold text-blue-600">{stats.reviewScheduledForLater}</p>
          <p className="text-xs text-gray-500 mt-2">Waiting</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <p className="text-sm text-gray-600">New Today</p>
          <p className="text-3xl font-bold text-green-600">{stats.newToday}</p>
          <p className="text-xs text-gray-500 mt-2">First review</p>
        </div>
      </div>

      {/* Learning Curve */}
      <div className="p-6 bg-white rounded-lg shadow">
        <h3 className="text-xl font-bold text-gray-900 mb-6">📈 Learning Progress</h3>

        <div className="space-y-4">
          {/* Mastered */}
          <div>
            <div className="flex justify-between mb-2">
              <span className="font-semibold text-gray-900">Mastered</span>
              <span className="text-lg font-bold text-green-600">{learningStats.masteredItems}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-green-600 h-3 rounded-full"
                style={{
                  width: `${learningStats.totalExercises > 0 ? (learningStats.masteredItems / learningStats.totalExercises) * 100 : 0}%`
                }}
              ></div>
            </div>
            <p className="text-xs text-gray-600 mt-1">Exercises you've mastered</p>
          </div>

          {/* Learning */}
          <div>
            <div className="flex justify-between mb-2">
              <span className="font-semibold text-gray-900">Currently Learning</span>
              <span className="text-lg font-bold text-yellow-600">{learningStats.learningItems}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-yellow-600 h-3 rounded-full"
                style={{
                  width: `${learningStats.totalExercises > 0 ? (learningStats.learningItems / learningStats.totalExercises) * 100 : 0}%`
                }}
              ></div>
            </div>
            <p className="text-xs text-gray-600 mt-1">Actively practicing</p>
          </div>

          {/* New */}
          <div>
            <div className="flex justify-between mb-2">
              <span className="font-semibold text-gray-900">Not Yet Started</span>
              <span className="text-lg font-bold text-blue-600">{learningStats.newItems}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-600 h-3 rounded-full"
                style={{
                  width: `${learningStats.totalExercises > 0 ? (learningStats.newItems / learningStats.totalExercises) * 100 : 0}%`
                }}
              ></div>
            </div>
            <p className="text-xs text-gray-600 mt-1">Ready to begin</p>
          </div>

          {/* Accuracy */}
          <div className="pt-4 border-t">
            <div className="flex justify-between mb-2">
              <span className="font-semibold text-gray-900">Overall Accuracy</span>
              <span className="text-lg font-bold text-blue-600">{learningStats.accuracy}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-600 h-3 rounded-full"
                style={{ width: `${learningStats.accuracy}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Practice Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Hard Items */}
        <div className="p-6 bg-red-50 rounded-lg border-l-4 border-red-500">
          <h4 className="text-lg font-bold text-gray-900 mb-2">🔴 Difficult Items</h4>
          <p className="text-sm text-gray-600 mb-4">
            {byPriority.hard.length} exercises you find challenging
          </p>
          <button
            onClick={() => onStartPractice?.('hard')}
            className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700"
          >
            Practice Hard Items
          </button>
        </div>

        {/* Normal Items */}
        <div className="p-6 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
          <h4 className="text-lg font-bold text-gray-900 mb-2">🟡 Regular Review</h4>
          <p className="text-sm text-gray-600 mb-4">
            {byPriority.normal.length} exercises due for review
          </p>
          <button
            onClick={() => onStartPractice?.('normal')}
            className="w-full bg-yellow-600 text-white py-2 rounded-lg font-semibold hover:bg-yellow-700"
          >
            Daily Review
          </button>
        </div>

        {/* Easy Items */}
        <div className="p-6 bg-green-50 rounded-lg border-l-4 border-green-500">
          <h4 className="text-lg font-bold text-gray-900 mb-2">🟢 Easy Items</h4>
          <p className="text-sm text-gray-600 mb-4">
            {byPriority.easy.length} exercises you've mastered
          </p>
          <button
            onClick={() => onStartPractice?.('easy')}
            className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700"
          >
            Maintenance Review
          </button>
        </div>
      </div>

      {/* How It Works */}
      <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4">💡 How Spaced Repetition Works</h3>
        <div className="space-y-3">
          <div className="flex gap-3">
            <span className="text-2xl">1️⃣</span>
            <div>
              <p className="font-semibold text-gray-900">First Review</p>
              <p className="text-sm text-gray-600">You learn a new exercise</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-2xl">2️⃣</span>
            <div>
              <p className="font-semibold text-gray-900">1 Day Later</p>
              <p className="text-sm text-gray-600">Review it before you forget</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-2xl">3️⃣</span>
            <div>
              <p className="font-semibold text-gray-900">3, 7, 14, 30+ Days</p>
              <p className="text-sm text-gray-600">Space reviews further apart as you master it</p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="flex-1 bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700"
        >
          ← Back
        </button>
        {stats.totalDue > 0 && (
          <button
            onClick={() => onStartPractice?.('priority')}
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            🚀 Start Review ({stats.totalDue})
          </button>
        )}
      </div>
    </div>
  );
}
