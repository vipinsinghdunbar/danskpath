import React, { useMemo } from 'react';

/**
 * WebDashboard — Web-first learning dashboard
 * Desktop-optimized with multi-column layout
 * Shows: progress, next lesson, recent activity, stats
 */

export default function WebDashboard({ lessons = [], progress = {} }) {
  const stats = useMemo(() => {
    const completed = Object.values(progress).filter(p => p.completed).length;
    const avgScore = Object.values(progress).length > 0
      ? Math.round(Object.values(progress).reduce((sum, p) => sum + (p.score || 0), 0) / Object.values(progress).length)
      : 0;

    return { completed, total: lessons.length, avgScore };
  }, [progress, lessons]);

  const nextLesson = useMemo(() => {
    return lessons.find(l => !progress[l.id]?.completed);
  }, [lessons, progress]);

  const recentLessons = useMemo(() => {
    return Object.entries(progress)
      .filter(([, p]) => p.completed)
      .sort((a, b) => (b[1].completedAt || 0) - (a[1].completedAt || 0))
      .slice(0, 3)
      .map(([id, p]) => ({ id, ...p }));
  }, [progress]);

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="bg-[#f2f2f7] rounded-2xl p-8 sm:p-12 text-white shadow-lg">
        <div className="max-w-2xl">
          <p className="text-[#8e8e93] font-medium text-sm mb-2">Welcome back!</p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">
            Your Danish Journey Continues
          </h1>
          <p className="text-lg text-[#8e8e93] mb-8 max-w-xl">
            You're building momentum. Let's unlock the next lesson and keep learning.
          </p>

          {nextLesson ? (
            <button className="bg-white text-[#007aff] px-8 py-3 rounded-lg font-semibold hover:bg-[#f2f2f7] transition-colors shadow-md">
              Continue with {nextLesson.title}
            </button>
          ) : (
            <button disabled className="bg-[#007aff] text-white px-8 py-3 rounded-lg font-semibold opacity-75 cursor-not-allowed">
              All lessons completed! 🎉
            </button>
          )}
        </div>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          label="Lessons Completed"
          value={stats.completed}
          total={stats.total}
          icon="🎯"
          color="amber"
        />
        <StatCard
          label="Average Score"
          value={`${stats.avgScore}%`}
          benchmark="Great progress"
          icon="📊"
          color="emerald"
        />
        <StatCard
          label="Current Level"
          value="A2"
          benchmark="Ready for B1 soon"
          icon="📈"
          color="blue"
        />
      </section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Next Lesson */}
        <div className="lg:col-span-2">
          <div className="space-y-6">
            {/* Next Lesson Card */}
            {nextLesson && (
              <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow">
                <p className="text-sm font-semibold text-[#007aff] mb-2">NEXT LESSON</p>
                <h2 className="text-3xl font-bold text-slate-900 mb-3">{nextLesson.title}</h2>
                <p className="text-slate-600 mb-6 text-lg">{nextLesson.description}</p>

                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">⏱️</span>
                    <div>
                      <p className="text-xs text-slate-500">Duration</p>
                      <p className="font-semibold text-slate-900">{nextLesson.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">📚</span>
                    <div>
                      <p className="text-xs text-slate-500">Category</p>
                      <p className="font-semibold text-slate-900 capitalize">{nextLesson.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">📍</span>
                    <div>
                      <p className="text-xs text-slate-500">Level</p>
                      <p className="font-semibold text-slate-900">{nextLesson.difficulty}</p>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-[#007aff] hover:bg-[#007aff] text-white font-semibold py-3 rounded-lg transition-colors">
                  Start Lesson →
                </button>
              </div>
            )}

            {/* Learning Path */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Your Learning Path</h3>

              <div className="space-y-3">
                {lessons.slice(0, 5).map((lesson, idx) => (
                  <div key={lesson.id} className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                      progress[lesson.id]?.completed
                        ? 'bg-emerald-100 text-emerald-700'
                        : idx === 0
                        ? 'bg-[#e5e5ea] text-[#007aff]'
                        : 'bg-slate-100 text-slate-400'
                    }`}>
                      {progress[lesson.id]?.completed ? '✓' : idx + 1}
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="font-semibold text-slate-900">{lesson.title}</p>
                      <p className="text-sm text-slate-500">{lesson.duration}</p>
                    </div>
                    {progress[lesson.id]?.score && (
                      <div className="text-right pt-1">
                        <p className="text-sm font-bold text-slate-900">{progress[lesson.id].score}%</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <button className="w-full mt-6 px-4 py-2 text-[#007aff] font-semibold hover:bg-[#f2f2f7] rounded-lg transition-colors">
                View All Lessons →
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Sidebar */}
        <div className="space-y-6">
          {/* Recent Achievements */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Recent Completions</h3>

            {recentLessons.length > 0 ? (
              <div className="space-y-3">
                {recentLessons.map(lesson => (
                  <div key={lesson.id} className="pb-3 border-b border-slate-200 last:border-0">
                    <p className="font-semibold text-slate-900 text-sm">{lesson.title}</p>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-slate-500">
                        {lesson.completedAt ? new Date(lesson.completedAt).toLocaleDateString() : 'Recently'}
                      </span>
                      <span className="font-bold text-[#007aff]">{lesson.score}%</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 text-sm">Start your first lesson to build momentum!</p>
            )}
          </div>

          {/* Quick Tips */}
          <div className="bg-[#e5f1ff] rounded-2xl border border-blue-200 p-6 shadow-sm">
            <p className="text-sm font-semibold text-blue-900 mb-3">💡 Pro Tips</p>
            <ul className="space-y-2 text-sm text-blue-800">
              <li>• Practice 20 min daily for best results</li>
              <li>• Review completed lessons weekly</li>
              <li>• Take your time with harder sections</li>
              <li>• 70% unlocks the next lesson</li>
            </ul>
          </div>

          {/* Level Progress */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Overall Progress</h3>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-slate-600">A2 Level</span>
                  <span className="text-sm font-bold text-slate-900">{Math.round((stats.completed / 6) * 100)}%</span>
                </div>
                <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#f2f2f7] transition-all duration-500"
                    style={{ width: `${(stats.completed / 6) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-slate-600">B1 Level</span>
                  <span className="text-sm font-bold text-slate-900">0%</span>
                </div>
                <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-slate-400"
                    style={{ width: '0%' }}
                  />
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-500 mt-4">Complete 6 A2 lessons to unlock B1 content</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, total, benchmark, icon, color = 'slate' }) {
  const colorMap = {
    amber: 'bg-[#e5f1ff] border-[#b8dcff]',
    emerald: 'bg-[#e6f7ed] border-[#b8e6c9]',
    blue: 'bg-[#e5f1ff] border-[#b8dcff]',
    slate: 'bg-[#f2f2f7] border-[#e5e5ea]',
  };

  return (
    <div className={`${colorMap[color]} border rounded-2xl p-6 shadow-sm`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-600 mb-1">{label}</p>
          <div className="space-y-1">
            {total ? (
              <p className="text-3xl font-bold text-slate-900">
                {value}<span className="text-lg font-semibold text-slate-600">/{total}</span>
              </p>
            ) : (
              <p className="text-3xl font-bold text-slate-900">{value}</p>
            )}
            <p className="text-xs text-slate-600">{benchmark || '—'}</p>
          </div>
        </div>
        <span className="text-3xl">{icon}</span>
      </div>
    </div>
  );
}
