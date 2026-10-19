import { useState, useEffect } from 'react';
import { getRecommendedLessons, getWeakSpots, getStrengths, getLearningPath, getAchievements } from '../lib/recommendationEngine';

export default function RecommendedLessons({ onStartLesson }) {
  const [recommendations, setRecommendations] = useState([]);
  const [weakSpots, setWeakSpots] = useState([]);
  const [strengths, setStrengths] = useState([]);
  const [learningPath, setLearningPath] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [activeTab, setActiveTab] = useState('recommended');

  useEffect(() => {
    const userId = 'vipin';
    setRecommendations(getRecommendedLessons(userId));
    setWeakSpots(getWeakSpots(userId, 5));
    setStrengths(getStrengths(userId));
    setLearningPath(getLearningPath(userId));
    setAchievements(getAchievements(userId));
  }, []);

  // Recommended Lessons Tab
  const renderRecommended = () => {
    if (recommendations.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-500">
            No recommendations yet. Complete some lessons first! 📚
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {recommendations.slice(0, 8).map((rec, idx) => (
          <div
            key={rec.lessonId}
            className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-l-4 border-blue-500"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-blue-600">#{idx + 1}</span>
                  <h4 className="font-semibold text-gray-900">{rec.lessonTitle}</h4>
                </div>
                <p className="text-sm text-gray-600">{rec.reason}</p>
              </div>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                {rec.category}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4 text-sm">
              <div>
                <p className="text-gray-600">Accuracy</p>
                <p className="font-bold text-gray-900">{rec.currentAccuracy}%</p>
              </div>
              <div>
                <p className="text-gray-600">Attempts</p>
                <p className="font-bold text-gray-900">{rec.attempts}</p>
              </div>
              <div>
                <p className="text-gray-600">Difficulty</p>
                <p className="font-bold text-gray-900 capitalize">{rec.difficulty}</p>
              </div>
            </div>

            <button
              onClick={() => onStartLesson?.(rec.lessonId)}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700"
            >
              {rec.completed ? '📖 Review' : '▶️ Start'}
            </button>
          </div>
        ))}
      </div>
    );
  };

  // Weak Spots Tab
  const renderWeakSpots = () => {
    if (weakSpots.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-green-600 font-semibold">🎉 No weak spots! Great work!</p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {weakSpots.map((spot, idx) => {
          const percentage = (spot.errorCount / weakSpots[0].errorCount) * 100;
          return (
            <div key={spot.category} className="p-4 bg-red-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold text-gray-900">{idx + 1}. {spot.category}</h4>
                <span className="text-sm font-bold text-red-600">{spot.errorCount} errors</span>
              </div>

              <div className="w-full bg-red-200 rounded-full h-3 mb-3">
                <div
                  className="bg-red-600 h-3 rounded-full"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>

              <p className="text-sm text-gray-600 mb-2">
                Affected {spot.lessonsAffected} lesson{spot.lessonsAffected !== 1 ? 's' : ''}
              </p>

              <details className="text-sm">
                <summary className="cursor-pointer text-gray-700 hover:text-gray-900 font-semibold">
                  Sample errors (click to expand)
                </summary>
                <ul className="mt-2 space-y-1 pl-4 border-l-2 border-gray-300 text-gray-700">
                  {spot.sampleErrors.slice(0, 3).map((err, i) => (
                    <li key={i}>• {err}</li>
                  ))}
                </ul>
              </details>
            </div>
          );
        })}
      </div>
    );
  };

  // Strengths Tab
  const renderStrengths = () => {
    if (strengths.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-500">Keep practicing to unlock strengths! 📚</p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {strengths.map((strength, idx) => (
          <div key={strength.category} className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-semibold text-gray-900">{idx + 1}. {strength.categoryName}</h4>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-bold">
                ✅ {strength.accuracy}%
              </span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
              <div
                className="bg-green-600 h-3 rounded-full"
                style={{ width: `${strength.accuracy}%` }}
              ></div>
            </div>

            <p className="text-sm text-gray-600">
              {strength.lessonsCompleted} lesson{strength.lessonsCompleted !== 1 ? 's' : ''} completed • {strength.errors} error{strength.errors !== 1 ? 's' : ''}
            </p>
          </div>
        ))}
      </div>
    );
  };

  // Learning Path Tab
  const renderLearningPath = () => {
    if (!learningPath) return null;

    return (
      <div className="space-y-6">
        {/* Current Level */}
        <div className="p-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg">
          <p className="text-sm opacity-90 mb-2">Current Level</p>
          <div className="text-4xl font-bold mb-4">{learningPath.currentLevel}</div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="opacity-75">Lessons Completed</p>
              <p className="font-bold text-lg">{learningPath.progress.lessonsCompleted}</p>
            </div>
            <div>
              <p className="opacity-75">Average Accuracy</p>
              <p className="font-bold text-lg">{learningPath.progress.averageAccuracy}%</p>
            </div>
          </div>
        </div>

        {/* Progress to Next Level */}
        <div className="p-6 bg-white rounded-lg border">
          <p className="font-semibold text-gray-900 mb-4">
            Progress to {learningPath.nextLevel}
          </p>

          <div className="bg-gray-200 rounded-full h-4 mb-3">
            <div
              className="bg-blue-600 h-4 rounded-full transition-all"
              style={{
                width: `${Math.min(
                  100,
                  (learningPath.progress.lessonsCompleted / (learningPath.progress.lessonsCompleted + learningPath.progress.estimatedLessonsToNextLevel)) * 100
                )}%`
              }}
            ></div>
          </div>

          <p className="text-sm text-gray-600">
            Complete {learningPath.progress.estimatedLessonsToNextLevel} more lessons at {learningPath.suggestedDifficulty} difficulty
          </p>
        </div>

        {/* CEFR Levels */}
        <div className="p-6 bg-white rounded-lg border">
          <p className="font-semibold text-gray-900 mb-4">CEFR Progression</p>
          <div className="space-y-2">
            {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map(level => (
              <div key={level} className="flex items-center gap-3">
                <div className={`px-3 py-1 rounded font-bold text-sm ${
                  level === learningPath.currentLevel
                    ? 'bg-blue-500 text-white'
                    : level < learningPath.currentLevel
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {level}
                </div>
                <span className="text-sm text-gray-600">
                  {level === learningPath.currentLevel && '← You are here'}
                  {level < learningPath.currentLevel && '✅ Completed'}
                  {level > learningPath.currentLevel && 'Next target'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Achievements */}
      {achievements.length > 0 && (
        <div className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
          <h3 className="font-semibold text-gray-900 mb-4">🏆 Your Achievements</h3>
          <div className="flex flex-wrap gap-3">
            {achievements.map(ach => (
              <div
                key={ach.id}
                className="px-3 py-2 bg-white rounded-lg shadow-sm flex items-center gap-2"
              >
                <span className="text-xl">{ach.emoji}</span>
                <span className="text-sm font-semibold text-gray-900">{ach.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 bg-white p-2 rounded-lg shadow-sm overflow-x-auto">
        {['recommended', 'weakSpots', 'strengths', 'path'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded font-semibold whitespace-nowrap transition ${
              activeTab === tab
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tab === 'recommended' && '⭐ Recommended'}
            {tab === 'weakSpots' && '📍 Weak Spots'}
            {tab === 'strengths' && '💪 Strengths'}
            {tab === 'path' && '🗺️ Path'}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white p-6 rounded-lg">
        {activeTab === 'recommended' && renderRecommended()}
        {activeTab === 'weakSpots' && renderWeakSpots()}
        {activeTab === 'strengths' && renderStrengths()}
        {activeTab === 'path' && renderLearningPath()}
      </div>
    </div>
  );
}
