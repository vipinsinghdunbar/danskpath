import { useState, useMemo } from 'react';

export default function ProgressDashboard({ onRetake, onViewRoadmap, onBackFromLessons }) {
  const [selectedAssessment, setSelectedAssessment] = useState(null);

  // Get current and historical assessment data
  const { currentVerdict, assessmentHistory, progressMetrics } = useMemo(() => {
    try {
      const current = localStorage.getItem('dansk_verdict');
      const currentVerdict = current ? JSON.parse(current) : null;

      const history = localStorage.getItem('dansk_assessment_history');
      const assessmentHistory = history ? JSON.parse(history) : [];

      // Calculate progress metrics
      let progressMetrics = {
        totalAttempts: assessmentHistory.length + (currentVerdict ? 1 : 0),
        improvementTrend: 0,
        categoryTrends: { grammar: 0, vocab: 0, listening: 0 }
      };

      if (assessmentHistory.length >= 2) {
        const previous = assessmentHistory[assessmentHistory.length - 1];
        const current = assessmentHistory[assessmentHistory.length - 1];
        if (previous && current) {
          progressMetrics.improvementTrend = (current.verdict?.pct || 0) - (previous.verdict?.pct || 0);
        }
      }

      return { currentVerdict, assessmentHistory, progressMetrics };
    } catch {
      return { currentVerdict: null, assessmentHistory: [], progressMetrics: { totalAttempts: 0 } };
    }
  }, []);

  const allAssessments = useMemo(() => {
    const all = [...assessmentHistory];
    if (currentVerdict) {
      const currentDiagnostic = localStorage.getItem('dansk_diagnostic');
      all.push({
        timestamp: new Date().toISOString(),
        diagnostic: currentDiagnostic ? JSON.parse(currentDiagnostic) : null,
        verdict: currentVerdict,
        id: 'current',
        isCurrent: true
      });
    }
    return all.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  }, [assessmentHistory, currentVerdict]);

  const displayAssessment = selectedAssessment !== null ? allAssessments[selectedAssessment] : allAssessments[allAssessments.length - 1];

  if (!currentVerdict) {
    return (
      <div className="min-h-screen bg-white text-gray-900 flex items-center justify-center">
        <div className="text-center max-w-[400px] px-4">
          <p className="text-gray-600 mb-6">No assessment data found. Take your first assessment to get started.</p>
          <button
            onClick={onRetake}
            className="bg-black text-white px-6 py-3 rounded-full font-[600]"
          >
            Start Assessment
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-DK', { month: 'short', day: 'numeric' });
  };

  const getDaysAgo = (isoString) => {
    const date = new Date(isoString);
    const now = new Date();
    const diff = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    if (diff === 0) return 'Today';
    if (diff === 1) return 'Yesterday';
    return `${diff} days ago`;
  };

  const getProgressColor = (current, previous) => {
    if (!previous) return 'text-gray-400';
    if (current > previous) return 'text-green-600';
    if (current < previous) return 'text-red-600';
    return 'text-gray-400';
  };

  const getArrow = (current, previous) => {
    if (!previous) return '';
    if (current > previous) return '↑';
    if (current < previous) return '↓';
    return '→';
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="max-w-[600px] mx-auto px-4 pt-6 pb-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-[28px] font-[700]">Your Progress</h1>
          <div className="text-[11px] font-[700] tracking-widest uppercase bg-black text-white px-3 py-1.5 rounded-full">
            {allAssessments.length} Assessments
          </div>
        </div>

        {/* Current Status Card */}
        {displayAssessment && (
          <div className="bg-gray-50 rounded-[12px] p-6 mb-6 border border-gray-200">
            <div className="text-[11px] text-gray-600 font-[600] mb-2 uppercase tracking-widest">
              {displayAssessment.isCurrent ? 'Latest Assessment' : formatDate(displayAssessment.timestamp)}
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              {/* Accuracy */}
              <div>
                <div className="text-[11px] text-gray-500 font-[600] mb-1">Accuracy</div>
                <div className="text-[28px] font-[700]">{displayAssessment.verdict.pct}%</div>
                <div className="text-[12px] text-gray-500 mt-1">
                  {displayAssessment.verdict.correct}/{displayAssessment.verdict.total} correct
                </div>
              </div>

              {/* Level */}
              <div>
                <div className="text-[11px] text-gray-500 font-[600] mb-1">Level</div>
                <div className="text-[28px] font-[700]">{displayAssessment.verdict.level}</div>
                <div className="text-[12px] text-gray-500 mt-1">Proficiency</div>
              </div>

              {/* Confidence */}
              <div>
                <div className="text-[11px] text-gray-500 font-[600] mb-1">Confidence</div>
                <div className="text-[28px] font-[700]">
                  {displayAssessment.verdict.total - displayAssessment.verdict.idkCount}
                </div>
                <div className="text-[12px] text-gray-500 mt-1">Answered</div>
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[13px]">
                <span className="text-gray-600">Grammar</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-blue-600"
                      style={{ width: `${displayAssessment.verdict.categoryPct.grammar}%` }}
                    ></div>
                  </div>
                  <span className="font-[600] w-10 text-right">{displayAssessment.verdict.categoryPct.grammar}%</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-[13px]">
                <span className="text-gray-600">Vocabulary</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-purple-600"
                      style={{ width: `${displayAssessment.verdict.categoryPct.vocab}%` }}
                    ></div>
                  </div>
                  <span className="font-[600] w-10 text-right">{displayAssessment.verdict.categoryPct.vocab}%</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-[13px]">
                <span className="text-gray-600">Listening</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-pink-600"
                      style={{ width: `${displayAssessment.verdict.categoryPct.listening}%` }}
                    ></div>
                  </div>
                  <span className="font-[600] w-10 text-right">{displayAssessment.verdict.categoryPct.listening}%</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Assessment History Timeline */}
        {allAssessments.length > 1 && (
          <div className="mb-6">
            <h2 className="text-[11px] font-[700] tracking-widest uppercase text-gray-600 mb-3">
              Assessment History
            </h2>
            <div className="space-y-2">
              {allAssessments.map((assessment, idx) => {
                const prev = idx > 0 ? allAssessments[idx - 1] : null;
                const accuracyDiff = prev ? assessment.verdict.pct - prev.verdict.pct : 0;

                return (
                  <button
                    key={assessment.id}
                    onClick={() => setSelectedAssessment(idx)}
                    className={`w-full flex items-center justify-between p-3 rounded-[12px] border transition-all ${
                      selectedAssessment === idx
                        ? 'bg-black text-white border-black'
                        : 'bg-white border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-left">
                      <div className={`text-[13px] font-[600] ${selectedAssessment === idx ? 'text-white' : 'text-gray-900'}`}>
                        {formatDate(assessment.timestamp)}
                      </div>
                      <div className={`text-[12px] ${selectedAssessment === idx ? 'text-gray-300' : 'text-gray-500'}`}>
                        {getDaysAgo(assessment.timestamp)}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className={`text-[18px] font-[700] ${selectedAssessment === idx ? 'text-white' : 'text-gray-900'}`}>
                        {assessment.verdict.pct}%
                      </div>
                      {prev && (
                        <div className={`text-[11px] font-[600] ${getProgressColor(assessment.verdict.pct, prev.verdict.pct)}`}>
                          {getArrow(assessment.verdict.pct, prev.verdict.pct)} {Math.abs(accuracyDiff)}%
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Strengths & Areas to Focus */}
        {displayAssessment && (
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-green-50 rounded-[12px] p-4 border border-green-200">
              <div className="text-[11px] font-[700] uppercase text-green-700 mb-2">Strengths</div>
              <div className="space-y-1">
                {displayAssessment.verdict.strengths.length ? (
                  displayAssessment.verdict.strengths.map((s, i) => (
                    <div key={i} className="text-[12px] font-[600] capitalize text-gray-900">
                      ✓ {s}
                    </div>
                  ))
                ) : (
                  <div className="text-[12px] text-gray-600">Balanced across skills</div>
                )}
              </div>
            </div>

            <div className="bg-amber-50 rounded-[12px] p-4 border border-amber-200">
              <div className="text-[11px] font-[700] uppercase text-amber-700 mb-2">Focus Areas</div>
              <div className="space-y-1">
                {displayAssessment.verdict.weaknesses.length ? (
                  displayAssessment.verdict.weaknesses.map((w, i) => (
                    <div key={i} className="text-[12px] font-[600] capitalize text-gray-900">
                      • {w}
                    </div>
                  ))
                ) : (
                  <div className="text-[12px] text-gray-600">Strong across all areas</div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3 pb-6">
          <button
            onClick={onViewRoadmap}
            className="w-full bg-black text-white py-3 rounded-full font-[600]"
          >
            View Learning Roadmap →
          </button>
          <button
            onClick={onRetake}
            className="w-full border border-gray-300 py-3 rounded-full font-[600] text-gray-900"
          >
            Retake Assessment
          </button>
        </div>

        {/* Guidance */}
        <div className="bg-blue-50 rounded-[12px] p-4 border border-blue-200 mb-6">
          <div className="text-[12px] text-gray-900 leading-[1.6]">
            <strong>Pro tip:</strong> Retake this assessment every 2 weeks to track your progress. Your baseline is your first assessment—improvements show up here.
          </div>
        </div>
      </div>
    </div>
  );
}
