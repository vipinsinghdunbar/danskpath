/**
 * Wrapper component for exercises to track attempts with adaptive difficulty
 * Used by lesson components to record exercise submissions
 */

import { useCallback } from 'react';

/**
 * Hook to wrap exercise submission handlers for adaptive tracking
 * @param {Function} onAttemptRecorded - Callback when attempt is recorded
 * @param {string} lessonId - ID of the lesson
 * @param {string} questionId - ID of the question
 * @param {string} topic - Topic/category of the exercise
 * @param {number} currentDifficulty - Current difficulty level
 * @returns {Function} Wrapped submission handler
 */
export function useExerciseSubmission(onAttemptRecorded, lessonId, questionId, topic, currentDifficulty) {
  return useCallback(async (userAnswer, correctAnswer, options = {}) => {
    const startTime = options.startTime || Date.now();
    const responseTime = Date.now() - startTime;

    // Determine if correct
    const isCorrect = userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase();

    // Default values
    const userConfidence = options.userConfidence || 3; // 1-5 scale
    const errorType = options.errorType || 'UKENDT';

    // Create attempt record
    const attemptData = {
      questionId,
      lessonId,
      userAnswer,
      correctAnswer,
      isCorrect,
      responseTimeMs: Math.max(100, Math.min(60000, responseTime)), // 100ms to 60s
      attemptNumber: options.attemptNumber || 1,
      userConfidence: Math.max(1, Math.min(5, userConfidence)),
      errorType,
      difficulty: currentDifficulty,
      topic,
      timestamp: new Date().toISOString()
    };

    // Call the parent handler
    if (onAttemptRecorded) {
      try {
        await onAttemptRecorded(attemptData);
      } catch (error) {
        console.error('Error recording attempt:', error);
        // Don't fail the UX on tracking error
      }
    }

    return attemptData;
  }, [onAttemptRecorded, lessonId, questionId, topic, currentDifficulty]);
}

/**
 * Component to display attempt feedback with adaptive context
 */
export function AttemptFeedback({ isCorrect, explanation, weakSpot, difficulty }) {
  if (!isCorrect && weakSpot) {
    return (
      <div className="mt-3 p-3 bg-[#f2f2f7] border border-[#e5e5ea] rounded-lg">
        <div className="text-[12px] text-[#121417]">
          <strong>⚠️ Svagt punkt:</strong> Du slår til med {weakSpot.errorType}. Vi fokuserer på dette område.
        </div>
        {explanation && (
          <div className="mt-2 text-[12px] text-[#121417]">
            <strong>Forklaring:</strong> {explanation}
          </div>
        )}
      </div>
    );
  }

  if (isCorrect) {
    return (
      <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
        <div className="text-[12px] text-green-900">
          <strong>✓ Rigtigt!</strong> Godt arbejde.
        </div>
        {explanation && (
          <div className="mt-2 text-[12px] text-green-800">
            <strong>Forklaring:</strong> {explanation}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
      <div className="text-[12px] text-red-900">
        <strong>✗ Desværre ikke rigtigt.</strong>
      </div>
      {explanation && (
        <div className="mt-2 text-[12px] text-red-800">
          <strong>Forklaring:</strong> {explanation}
        </div>
      )}
    </div>
  );
}

/**
 * Component to display difficulty level with visual indicator
 */
export function DifficultyIndicator({ difficulty }) {
  const getLabel = (diff) => {
    if (diff < 0.5) return 'A1 Absolut Begynder';
    if (diff < 1.5) return 'A1 Alfabet & Ord';
    if (diff < 2.5) return 'A2 Elementær';
    if (diff < 3.5) return 'A2 Enkel Kommunikation';
    if (diff < 4.5) return 'B1 Mellemnivaet';
    if (diff < 5.5) return 'B1 Daglig Samtale';
    if (diff < 6.5) return 'B1+ Øget Sikkerhed';
    if (diff < 7.5) return 'B1+ Kompleks Kommunikation';
    if (diff < 8.5) return 'B2 Avanceret';
    if (diff < 9.5) return 'B2 Flydende Dansk';
    return 'B2+ Mesterskab';
  };

  const getColor = (diff) => {
    if (diff < 2) return 'bg-blue-100 text-blue-800';
    if (diff < 4) return 'bg-green-100 text-green-800';
    if (diff < 6) return 'bg-[#e5e5ea] text-[#121417]';
    if (diff < 8) return 'bg-[#e5e5ea] text-[#121417]';
    return 'bg-red-100 text-red-800';
  };

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-[11px] font-semibold ${getColor(difficulty)}`}>
      {getLabel(difficulty)}
    </span>
  );
}

/**
 * Component for confidence selector (1-5 scale)
 */
export function ConfidenceSelector({ onSelect, label = 'Hvor sikker var du?' }) {
  return (
    <div className="my-4">
      <div className="text-[12px] font-semibold text-gray-700 mb-2">{label}</div>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map(level => (
          <button
            key={level}
            onClick={() => onSelect(level)}
            className="px-3 py-2 rounded-lg border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition text-[12px] font-medium"
          >
            {'⭐'.repeat(level)}
          </button>
        ))}
      </div>
    </div>
  );
}
