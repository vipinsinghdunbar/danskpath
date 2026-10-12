import { useState, useEffect } from 'react';
import { TrendingUp, Calendar, Target, Award, Clock, BarChart3 } from 'lucide-react';

export default function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [timeRange, setTimeRange] = useState('30d'); // 7d, 30d, 90d, all
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/analytics?range=${timeRange}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setAnalytics(data);
      }
    } catch (err) {
      console.error('Failed to fetch analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !analytics) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-[#E5E5EA] rounded-lg w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1,2,3].map(i => <div key={i} className="h-40 bg-[#E5E5EA] rounded-xl"></div>)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#121417] mb-4">Your Learning Analytics</h1>

        {/* Time range selector */}
        <div className="flex gap-2">
          {[
            { label: 'Last 7 days', value: '7d' },
            { label: 'Last 30 days', value: '30d' },
            { label: 'Last 90 days', value: '90d' },
            { label: 'All time', value: 'all' },
          ].map(option => (
            <button
              key={option.value}
              onClick={() => setTimeRange(option.value)}
              className={`px-4 py-2 rounded-full font-semibold transition-all ${
                timeRange === option.value
                  ? 'bg-[#007AFF] text-white'
                  : 'bg-[#E5E5EA] text-[#121417] hover:bg-[#D1D1D6]'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Total exercises */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E5E5EA]">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-[#8E8E93] text-sm font-semibold mb-1">Total Exercises</p>
              <p className="text-3xl font-bold text-[#121417]">{analytics.totalExercises}</p>
            </div>
            <div className="bg-[#007AFF]/10 p-3 rounded-lg">
              <BarChart3 className="w-5 h-5 text-[#007AFF]" />
            </div>
          </div>
          <p className="text-xs text-[#34C759] font-semibold">
            +{analytics.exercisesThisWeek} this week
          </p>
        </div>

        {/* Accuracy rate */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E5E5EA]">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-[#8E8E93] text-sm font-semibold mb-1">Accuracy Rate</p>
              <p className="text-3xl font-bold text-[#121417]">{analytics.accuracyRate}%</p>
            </div>
            <div className="bg-[#5856D6]/10 p-3 rounded-lg">
              <Target className="w-5 h-5 text-[#5856D6]" />
            </div>
          </div>
          <div className="w-full bg-[#E5E5EA] rounded-full h-2 overflow-hidden">
            <div
              className="bg-[#5856D6] h-full rounded-full"
              style={{ width: `${analytics.accuracyRate}%` }}
            ></div>
          </div>
        </div>

        {/* Current streak */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E5E5EA]">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-[#8E8E93] text-sm font-semibold mb-1">Current Streak</p>
              <p className="text-3xl font-bold text-[#121417]">{analytics.streak}</p>
            </div>
            <div className="bg-[#FF3B30]/10 p-3 rounded-lg">
              <Award className="w-5 h-5 text-[#FF3B30]" />
            </div>
          </div>
          <p className="text-xs text-[#8E8E93]">
            {analytics.streakMessage || 'Keep it up!'}
          </p>
        </div>

        {/* Avg. daily time */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E5E5EA]">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-[#8E8E93] text-sm font-semibold mb-1">Avg. Daily Time</p>
              <p className="text-3xl font-bold text-[#121417]">{analytics.avgDailyMinutes}m</p>
            </div>
            <div className="bg-[#34C759]/10 p-3 rounded-lg">
              <Clock className="w-5 h-5 text-[#34C759]" />
            </div>
          </div>
          <p className="text-xs text-[#8E8E93]">
            {analytics.totalMinutes} min total
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Progress by skill */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E5E5EA]">
          <h3 className="text-lg font-bold text-[#121417] mb-6">Progress by Skill</h3>
          <div className="space-y-4">
            {(analytics.skillProgress || [
              { skill: 'Grammar', accuracy: 78, exercises: 45 },
              { skill: 'Vocabulary', accuracy: 85, exercises: 62 },
              { skill: 'Listening', accuracy: 72, exercises: 28 },
              { skill: 'Reading', accuracy: 81, exercises: 35 },
              { skill: 'Writing', accuracy: 68, exercises: 15 },
            ]).map(item => (
              <div key={item.skill}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-[#121417]">{item.skill}</span>
                  <span className="text-sm font-bold text-[#007AFF]">{item.accuracy}%</span>
                </div>
                <div className="w-full bg-[#E5E5EA] rounded-full h-2">
                  <div
                    className="bg-[#007AFF] h-full rounded-full"
                    style={{ width: `${item.accuracy}%` }}
                  ></div>
                </div>
                <p className="text-xs text-[#8E8E93] mt-1">
                  {item.exercises} exercises completed
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Activity heatmap */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E5E5EA]">
          <h3 className="text-lg font-bold text-[#121417] mb-6">Activity This Week</h3>
          <div className="space-y-2">
            {(analytics.weekActivity || [
              { day: 'Monday', minutes: 45, exercises: 12 },
              { day: 'Tuesday', minutes: 0, exercises: 0 },
              { day: 'Wednesday', minutes: 60, exercises: 18 },
              { day: 'Thursday', minutes: 30, exercises: 8 },
              { day: 'Friday', minutes: 55, exercises: 15 },
              { day: 'Saturday', minutes: 75, exercises: 22 },
              { day: 'Sunday', minutes: 40, exercises: 10 },
            ]).map(item => (
              <div key={item.day}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-[#121417]">{item.day}</span>
                  <span className="text-xs text-[#8E8E93]">
                    {item.minutes > 0 ? `${item.minutes} min • ${item.exercises} ex` : 'Rest day'}
                  </span>
                </div>
                <div className="w-full bg-[#E5E5EA] rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${item.minutes > 50 ? 'bg-[#34C759]' : item.minutes > 0 ? 'bg-[#FF9500]' : 'bg-[#E5E5EA]'}`}
                    style={{ width: `${Math.min(item.minutes / 2, 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Improvement areas & Strengths */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Focus areas */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E5E5EA]">
          <h3 className="text-lg font-bold text-[#121417] mb-4">Focus Areas</h3>
          <p className="text-sm text-[#8E8E93] mb-4">Topics where you need more practice:</p>
          <div className="space-y-3">
            {(analytics.focusAreas || [
              { topic: 'Subordinate clauses', accuracy: 62, exercises: 8 },
              { topic: 'Passive voice', accuracy: 58, exercises: 5 },
              { topic: 'Prepositions', accuracy: 71, exercises: 12 },
            ]).map(item => (
              <div key={item.topic} className="bg-[#FFF3CD] border border-[#FFEAA7] rounded-lg p-3">
                <p className="font-semibold text-[#856404] text-sm mb-1">{item.topic}</p>
                <p className="text-xs text-[#5D4037]">
                  {item.accuracy}% accuracy • {item.exercises} exercises
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Strengths */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E5E5EA]">
          <h3 className="text-lg font-bold text-[#121417] mb-4">Your Strengths</h3>
          <p className="text-sm text-[#8E8E93] mb-4">Topics you've mastered:</p>
          <div className="space-y-3">
            {(analytics.strengths || [
              { topic: 'Present tense', accuracy: 94, exercises: 28 },
              { topic: 'Common vocabulary', accuracy: 92, exercises: 35 },
              { topic: 'SVO word order', accuracy: 89, exercises: 22 },
            ]).map(item => (
              <div key={item.topic} className="bg-[#D4EDDA] border border-[#C3E6CB] rounded-lg p-3">
                <p className="font-semibold text-[#155724] text-sm mb-1">✓ {item.topic}</p>
                <p className="text-xs text-[#155724]">
                  {item.accuracy}% accuracy • {item.exercises} exercises
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Goals & Recommendations */}
      <div className="bg-gradient-to-br from-[#007AFF]/5 to-[#5856D6]/5 rounded-xl p-8 border border-[#007AFF]/10">
        <h3 className="text-lg font-bold text-[#121417] mb-4 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-[#007AFF]" />
          Recommendations
        </h3>

        <div className="space-y-3">
          <div className="flex gap-3">
            <div className="w-1.5 h-6 bg-[#007AFF] rounded-full flex-shrink-0"></div>
            <div>
              <p className="font-semibold text-[#121417] text-sm mb-1">
                Focus on subordinate clauses this week
              </p>
              <p className="text-xs text-[#8E8E93]">
                You're at 62% accuracy. Try 3-4 exercises per day to improve rapidly.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-1.5 h-6 bg-[#34C759] rounded-full flex-shrink-0"></div>
            <div>
              <p className="font-semibold text-[#121417] text-sm mb-1">
                Maintain your 7-day streak
              </p>
              <p className="text-xs text-[#8E8E93]">
                You're doing great! Just 10 minutes daily will keep your momentum going.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-1.5 h-6 bg-[#FF9500] rounded-full flex-shrink-0"></div>
            <div>
              <p className="font-semibold text-[#121417] text-sm mb-1">
                Try a speaking exercise
              </p>
              <p className="text-xs text-[#8E8E93]">
                You've completed 185 exercises! Recording a speaking practice will diversify your learning.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Export data */}
      <div className="mt-8 pt-8 border-t border-[#E5E5EA]">
        <button className="px-6 py-3 bg-[#E5E5EA] text-[#121417] rounded-lg font-semibold hover:bg-[#D1D1D6] active:scale-95 transition-all">
          📊 Export Analytics as PDF
        </button>
      </div>
    </div>
  );
}
