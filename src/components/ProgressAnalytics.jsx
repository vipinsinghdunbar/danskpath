import { useState, useEffect } from 'react';

export default function ProgressAnalytics() {
  const [errorLog, setErrorLog] = useState([]);
  const [userProgress, setUserProgress] = useState({});
  const [errorFrequency, setErrorFrequency] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    // Load error log and progress
    const userId = 'vipin';
    const log = JSON.parse(localStorage.getItem(`dansk_error_log_${userId}`) || '[]');
    const progress = JSON.parse(localStorage.getItem(`dansk_user_progress_${userId}`) || '{}');

    setErrorLog(log);
    setUserProgress(progress);

    // Calculate error frequency by error code
    const frequency = {};
    log.forEach(entry => {
      const code = entry.errorCode;
      frequency[code] = (frequency[code] || 0) + 1;
    });
    setErrorFrequency(frequency);
  }, []);

  // Error code descriptions
  const errorDescriptions = {
    ORD: 'Word Order',
    PRÆ: 'Prepositions',
    BØJ: 'Conjugation',
    TID: 'Tense',
    VALG: 'Word Choice',
    KØN: 'Gender',
    STAV: 'Spelling',
    REG: 'Irregular Forms',
    UDT: 'Pronounciation',
    KOMP: 'Comparative/Superlative',
    KONJ: 'Conjunctions',
    PRON: 'Pronouns',
    POSS: 'Possessives',
    ARTKV: 'Articles & Quantifiers',
    PASS: 'Passive Voice',
    SVERB: 'S-verbs & Reflexives',
    MOD: 'Modal Verbs',
    REL: 'Relative Clauses',
    INFGER: 'Infinitive vs Gerund',
    NEG: 'Negation',
    PREP: 'Prepositions',
    REFL: 'Reflexive Verbs',
    IDI: 'Idioms & Word Choice'
  };

  const sortedErrors = Object.entries(errorFrequency)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10);

  const totalErrors = Object.values(errorFrequency).reduce((a, b) => a + b, 0);
  const totalLessons = Object.keys(userProgress).length;
  const completedLessons = Object.values(userProgress).filter(p => p.completed).length;
  const avgAccuracy = totalLessons > 0
    ? Math.round(Object.values(userProgress).reduce((sum, p) => sum + (p.accuracy || 0), 0) / totalLessons)
    : 0;

  return (
    <div className="min-h-screen bg-[#e5f1ff] p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">📊 Progress Analytics</h1>
          <p className="text-gray-600 mt-2">Track your learning progress and identify weak spots</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-sm text-gray-600 mb-2">Total Lessons</p>
            <p className="text-3xl font-bold text-blue-600">{totalLessons}</p>
            <p className="text-xs text-gray-500 mt-2">{completedLessons} completed</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-sm text-gray-600 mb-2">Average Accuracy</p>
            <p className="text-3xl font-bold text-green-600">{avgAccuracy}%</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-green-600 h-2 rounded-full"
                style={{ width: `${avgAccuracy}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-sm text-gray-600 mb-2">Total Attempts</p>
            <p className="text-3xl font-bold text-purple-600">
              {Object.values(userProgress).reduce((sum, p) => sum + (p.attempts || 0), 0)}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-sm text-gray-600 mb-2">Errors Tracked</p>
            <p className="text-3xl font-bold text-[#007aff]">{totalErrors}</p>
            <p className="text-xs text-gray-500 mt-2">Across all lessons</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Error Frequency Chart */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Error Categories</h2>

            {sortedErrors.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No errors tracked yet. Start a lesson to see your progress!</p>
            ) : (
              <div className="space-y-4">
                {sortedErrors.map(([code, count]) => {
                  const percentage = totalErrors > 0 ? (count / totalErrors) * 100 : 0;
                  return (
                    <div key={code}>
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <p className="font-semibold text-gray-900">{errorDescriptions[code] || code}</p>
                          <p className="text-sm text-gray-600">{code}</p>
                        </div>
                        <p className="text-lg font-bold text-[#007aff]">{count}</p>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-[#007aff] h-3 rounded-full transition-all"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Weak Spots */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">📍 Weak Spots</h2>

            {sortedErrors.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No data yet</p>
            ) : (
              <div className="space-y-3">
                {sortedErrors.slice(0, 5).map(([code]) => (
                  <div
                    key={code}
                    className="p-3 bg-red-50 border-l-4 border-red-500 rounded"
                  >
                    <p className="font-semibold text-gray-900">{errorDescriptions[code] || code}</p>
                    <p className="text-xs text-gray-600 mt-1">Needs practice</p>
                  </div>
                ))}
              </div>
            )}

            {/* Recommendation */}
            {sortedErrors.length > 0 && (
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="font-semibold text-gray-900 mb-2">💡 Recommendation</p>
                <p className="text-sm text-gray-700">
                  Focus on {errorDescriptions[sortedErrors[0][0]] || sortedErrors[0][0]} exercises to improve your accuracy.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Errors */}
        <div className="mt-6 bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Errors</h2>

          {errorLog.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No errors yet. Great work!</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Lesson</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Error Type</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Question</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Your Answer</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Correct Answer</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {errorLog.slice(-20).reverse().map((entry, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-6 py-3 text-sm text-gray-900">{entry.lessonTitle}</td>
                      <td className="px-6 py-3 text-sm">
                        <span className="px-3 py-1 bg-[#e5e5ea] text-[#121417] rounded-full font-semibold">
                          {entry.errorCode}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-sm text-gray-700">{entry.exercise}</td>
                      <td className="px-6 py-3 text-sm text-red-600 font-semibold">{entry.userAnswer}</td>
                      <td className="px-6 py-3 text-sm text-green-600 font-semibold">{entry.correctAnswer}</td>
                      <td className="px-6 py-3 text-sm text-gray-600">
                        {new Date(entry.date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
