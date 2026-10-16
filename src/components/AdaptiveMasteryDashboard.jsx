/**
 * Adaptive Mastery Dashboard
 * Displays mastery progress, weak spots, and difficulty level
 * Part of Phase 2a MVP
 */

import { useState, useEffect } from 'react';
import { useExerciseRecommendations, useAchievements } from '../hooks/useAdaptiveDifficulty';
import { getUserProgressStats, analyzeWeakSpots } from '../lib/supabaseAdaptive';
import { getDifficultyLabel } from '../lib/adaptiveDifficulty';

export default function AdaptiveMasteryDashboard({ userId, currentDifficulty, mastery, attempts }) {
  const [stats, setStats] = useState(null);
  const [weakSpots, setWeakSpots] = useState(null);
  const [loading, setLoading] = useState(true);

  const { recommended } = useExerciseRecommendations(userId, currentDifficulty, []);
  const { achievements, nextMilestone } = useAchievements(mastery, attempts.length);

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        const [progressStats, weakSpotData] = await Promise.all([
          getUserProgressStats(userId),
          analyzeWeakSpots(userId)
        ]);
        setStats(progressStats);
        setWeakSpots(weakSpotData);
      } catch (error) {
        console.error('Error loading stats:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      loadStats();
    }
  }, [userId]);

  if (loading || !stats) {
    return (
      <div className="min-h-screen bg-gray-50 grid place-items-center">
        <div className="w-10 h-10 rounded-full border-2 border-gray-300 border-t-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-[32px] font-[700]">Din Læringsrejse</h1>
          <p className="text-gray-600 mt-2">Adaptive sværhedsgrad baseret på dine øvelser og fejl.</p>
        </div>

        {/* Main Mastery Card */}
        <div className="bg-white rounded-[16px] border border-gray-200 p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Mastery Progress Ring */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-32 h-32">
                <svg width="128" height="128" viewBox="0 0 128 128" className="rotate-[-90deg]">
                  <circle cx="64" cy="64" r="56" fill="none" stroke="#f3f4f6" strokeWidth="12" />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    fill="none"
                    stroke={mastery >= 75 ? '#10b981' : mastery >= 50 ? '#f59e0b' : '#ef4444'}
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={`${(mastery / 100) * 352} 352`}
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 grid place-items-center">
                  <div className="text-center">
                    <div className="text-[32px] font-[700] text-gray-900">{Math.round(mastery)}%</div>
                    <div className="text-[11px] text-gray-600 font-semibold">Mesterskab</div>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <div className="text-[14px] font-semibold text-gray-900">
                  {getDifficultyLabel(currentDifficulty)}
                </div>
                <div className="text-[12px] text-gray-600 mt-1">
                  {attempts.length} øvelser gennemført
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4">
                <div className="text-[11px] text-gray-600 font-semibold uppercase">Rigtige svar</div>
                <div className="text-[24px] font-[700] text-gray-900">
                  {stats.correctExercises}/{stats.totalExercises}
                </div>
                <div className="text-[12px] text-gray-600 mt-1">
                  {stats.accuracy}% nøjagtighed
                </div>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <div className="text-[11px] text-gray-600 font-semibold uppercase">Gennemsnitlig tid</div>
                <div className="text-[24px] font-[700] text-gray-900">
                  {stats.averageResponseTime}ms
                </div>
                <div className="text-[12px] text-gray-600 mt-1">
                  {stats.averageResponseTime < 5000 ? 'Hurtigt tempo' : stats.averageResponseTime < 10000 ? 'Moderat tempo' : 'Grundigt arbejde'}
                </div>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <div className="text-[11px] text-gray-600 font-semibold uppercase">Emner med fokus</div>
                <div className="text-[24px] font-[700] text-gray-900">
                  {stats.topicsProgressed.length}
                </div>
                <div className="text-[12px] text-gray-600 mt-1">
                  Område(r) under øvelse
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Topics Progress */}
        {stats.topicsProgressed.length > 0 && (
          <div className="bg-white rounded-[16px] border border-gray-200 p-6">
            <h2 className="text-[16px] font-[700] text-gray-900 mb-4">Emner efter område</h2>
            <div className="space-y-3">
              {stats.topicsProgressed.map(topic => (
                <div key={topic.topic}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[13px] font-semibold text-gray-900">{topic.topic}</span>
                    <span className="text-[12px] text-gray-600">{topic.accuracy}% • {topic.exercises} øvelser</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
                      style={{ width: `${topic.accuracy}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Weak Spots */}
        {weakSpots && (weakSpots.errorTypes.length > 0 || weakSpots.topics.length > 0) && (
          <div className="bg-white rounded-[16px] border border-amber-200 bg-amber-50 p-6">
            <h2 className="text-[16px] font-[700] text-amber-900 mb-4">⚠️ Svage punkter</h2>

            {weakSpots.errorTypes.length > 0 && (
              <div className="mb-4">
                <div className="text-[12px] font-semibold text-amber-900 mb-3 uppercase">Fejltyper</div>
                <div className="space-y-2">
                  {weakSpots.errorTypes.map(error => (
                    <div key={error.errorType} className="flex items-center justify-between p-2 bg-white rounded-lg border border-amber-200">
                      <span className="text-[13px] font-medium text-amber-900">{error.errorType}</span>
                      <span className="text-[11px] text-amber-700">{error.frequency}% af fejlene</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {weakSpots.topics.length > 0 && (
              <div>
                <div className="text-[12px] font-semibold text-amber-900 mb-3 uppercase">Emner med fokus</div>
                <div className="space-y-2">
                  {weakSpots.topics.map(topic => (
                    <div key={topic.topic} className="flex items-center justify-between p-2 bg-white rounded-lg border border-amber-200">
                      <span className="text-[13px] font-medium text-amber-900">{topic.topic}</span>
                      <span className="text-[11px] text-amber-700">{topic.errors} fejl</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-4 p-3 bg-white rounded-lg border border-amber-200">
              <p className="text-[12px] text-amber-900">
                💡 <strong>Tip:</strong> Vi øger andelen af øvelser fra disse områder for at hjælpe dig med at blive stærk.
              </p>
            </div>
          </div>
        )}

        {/* Achievements */}
        {achievements.length > 0 && (
          <div className="bg-white rounded-[16px] border border-gray-200 p-6">
            <h2 className="text-[16px] font-[700] text-gray-900 mb-4">🏆 Præstationer</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {achievements.map(achievement => (
                <div key={achievement.id} className="text-center p-4 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-lg border border-yellow-200">
                  <div className="text-[24px] mb-2">{achievement.icon}</div>
                  <div className="text-[12px] font-semibold text-gray-900">{achievement.label}</div>
                </div>
              ))}
            </div>
            {nextMilestone && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-[12px] text-blue-900">
                  Næste milepæl: <strong>{nextMilestone} øvelser</strong> eller <strong>90% mesterskab</strong>
                </p>
              </div>
            )}
          </div>
        )}

        {/* Recommendations */}
        {recommended.length > 0 && (
          <div className="bg-white rounded-[16px] border border-gray-200 p-6">
            <h2 className="text-[16px] font-[700] text-gray-900 mb-4">📚 Anbefalet næste øvelse</h2>
            <div className="space-y-2">
              {recommended.slice(0, 3).map((exercise, idx) => (
                <div key={exercise.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="text-[13px] font-semibold text-gray-900">{idx + 1}. {exercise.topic || 'Øvelse'}</div>
                  {exercise.errorType && (
                    <div className="text-[11px] text-gray-600 mt-1">
                      Fokus: {exercise.errorType}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
