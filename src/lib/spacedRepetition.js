/**
 * Spaced Repetition System (Leitner Method)
 * Optimizes practice timing based on forgetting curve
 */

/**
 * Intervals for spaced repetition (in days)
 * Based on research: 1 day → 3 days → 7 days → 14 days → 30 days
 */
const INTERVALS = [1, 3, 7, 14, 30, 60, 120];

/**
 * Calculate next review date based on performance
 */
export function calculateNextReviewDate(
  lastReviewDate,
  isCorrect,
  reviewCount = 0
) {
  const today = new Date();

  // Determine interval based on performance and review count
  let intervalIndex = 0;

  if (reviewCount >= INTERVALS.length) {
    intervalIndex = INTERVALS.length - 1; // Max interval
  } else if (!isCorrect) {
    intervalIndex = 0; // Restart if wrong
  } else {
    intervalIndex = Math.min(reviewCount, INTERVALS.length - 1);
  }

  const daysToAdd = INTERVALS[intervalIndex];
  const nextDate = new Date(today);
  nextDate.setDate(nextDate.getDate() + daysToAdd);

  return nextDate.toISOString();
}

/**
 * Initialize spaced repetition tracking for an exercise
 */
export function initializeExerciseTracking(exerciseId) {
  return {
    exerciseId,
    firstReviewDate: new Date().toISOString(),
    lastReviewDate: new Date().toISOString(),
    nextReviewDate: calculateNextReviewDate(null, true, 0),
    reviewCount: 0,
    correctCount: 0,
    incorrectCount: 0,
    difficulty: 'normal', // easy, normal, hard
    interval: 1,
    enabled: true
  };
}

/**
 * Update exercise tracking after review
 */
export function updateExerciseTracking(tracking, isCorrect) {
  const updated = { ...tracking };
  updated.lastReviewDate = new Date().toISOString();
  updated.reviewCount++;

  if (isCorrect) {
    updated.correctCount++;
    updated.nextReviewDate = calculateNextReviewDate(
      updated.lastReviewDate,
      true,
      updated.reviewCount
    );
    updated.difficulty = updated.correctCount >= 3 ? 'easy' : 'normal';
  } else {
    updated.incorrectCount++;
    updated.reviewCount = 0; // Reset count on wrong answer
    updated.nextReviewDate = calculateNextReviewDate(
      updated.lastReviewDate,
      false,
      0
    );
    updated.difficulty = 'hard';
  }

  return updated;
}

/**
 * Get all exercises due for review today
 */
export function getExercisesDueForReview(userId = 'vipin') {
  const trackingData = JSON.parse(
    localStorage.getItem(`dansk_spaced_repetition_${userId}`) || '{}'
  );
  const now = new Date();

  const due = [];
  const notDue = [];

  Object.entries(trackingData).forEach(([exerciseId, tracking]) => {
    if (!tracking.enabled) return;

    const nextReview = new Date(tracking.nextReviewDate);
    if (nextReview <= now) {
      due.push({
        ...tracking,
        daysDueBy: Math.floor((now - nextReview) / (1000 * 60 * 60 * 24))
      });
    } else {
      notDue.push({
        ...tracking,
        daysUntilDue: Math.ceil((nextReview - now) / (1000 * 60 * 60 * 24))
      });
    }
  });

  return {
    due: due.sort((a, b) => b.daysDueBy - a.daysDueBy), // Overdue first
    notDue: notDue.sort((a, b) => a.daysUntilDue - b.daysUntilDue)
  };
}

/**
 * Get daily review statistics
 */
export function getDailyStats(userId = 'vipin') {
  const { due, notDue } = getExercisesDueForReview(userId);

  return {
    totalDue: due.length,
    totalScheduled: notDue.length,
    overdue: due.filter(e => e.daysDueBy > 0).length,
    newToday: due.filter(e => e.reviewCount === 0).length,
    reviewScheduledForLater: notDue.length,
    estimatedMinutesNeeded: Math.ceil(due.length * 1.5) // ~1.5 min per exercise
  };
}

/**
 * Get exercises by difficulty/priority
 */
export function getExercisesByPriority(userId = 'vipin') {
  const { due } = getExercisesDueForReview(userId);

  return {
    hard: due.filter(e => e.difficulty === 'hard').slice(0, 5),
    normal: due.filter(e => e.difficulty === 'normal').slice(0, 5),
    easy: due.filter(e => e.difficulty === 'easy').slice(0, 5)
  };
}

/**
 * Get learning curve stats
 */
export function getLearningCurveStats(userId = 'vipin') {
  const trackingData = JSON.parse(
    localStorage.getItem(`dansk_spaced_repetition_${userId}`) || '{}'
  );

  let totalReviews = 0;
  let totalCorrect = 0;
  let masteredItems = 0;
  let learningItems = 0;
  let newItems = 0;

  Object.values(trackingData).forEach(tracking => {
    totalReviews += tracking.reviewCount;
    totalCorrect += tracking.correctCount;

    if (tracking.reviewCount === 0) {
      newItems++;
    } else if (tracking.difficulty === 'easy' && tracking.correctCount >= 3) {
      masteredItems++;
    } else {
      learningItems++;
    }
  });

  const accuracy = totalReviews > 0 ? Math.round((totalCorrect / totalReviews) * 100) : 0;

  return {
    totalExercises: Object.keys(trackingData).length,
    totalReviews,
    accuracy,
    masteredItems,
    learningItems,
    newItems,
    retentionRate: accuracy
  };
}

/**
 * Save tracking data to localStorage
 */
export function saveTracking(userId, trackingData) {
  localStorage.setItem(`dansk_spaced_repetition_${userId}`, JSON.stringify(trackingData));
}

/**
 * Load tracking data from localStorage
 */
export function loadTracking(userId = 'vipin') {
  return JSON.parse(
    localStorage.getItem(`dansk_spaced_repetition_${userId}`) || '{}'
  );
}

/**
 * Get next exercise to review
 */
export function getNextExerciseToReview(userId = 'vipin') {
  const { due } = getExercisesDueForReview(userId);

  if (due.length === 0) return null;

  // Prioritize: hard > overdue > normal
  const hard = due.filter(e => e.difficulty === 'hard')[0];
  if (hard) return hard;

  const overdue = due.filter(e => e.daysDueBy > 0)[0];
  if (overdue) return overdue;

  return due[0];
}

/**
 * Get progress toward mastery
 */
export function getMasteryProgress(exerciseId, userId = 'vipin') {
  const tracking = loadTracking(userId)[exerciseId];

  if (!tracking) return { stage: 'new', progress: 0 };

  const stages = [
    { name: 'new', range: [0, 0], description: 'Not started' },
    { name: 'learning', range: [1, 2], description: 'Learning' },
    { name: 'familiar', range: [3, 5], description: 'Familiar' },
    { name: 'competent', range: [6, 15], description: 'Competent' },
    { name: 'mastered', range: [16, 100], description: 'Mastered' }
  ];

  const stage = stages.find(s => tracking.reviewCount >= s.range[0] && tracking.reviewCount <= s.range[1]);

  return {
    stage: stage?.name || 'mastered',
    progress: Math.min(100, Math.round((tracking.reviewCount / 15) * 100)),
    reviewCount: tracking.reviewCount,
    correctCount: tracking.correctCount,
    accuracy: tracking.reviewCount > 0 ? Math.round((tracking.correctCount / tracking.reviewCount) * 100) : 0
  };
}

/**
 * Export stats for analytics
 */
export function getAnalyticsData(userId = 'vipin') {
  const learningCurve = getLearningCurveStats(userId);
  const dailyStats = getDailyStats(userId);
  const tracking = loadTracking(userId);

  return {
    learningCurve,
    dailyStats,
    totalTrackedExercises: Object.keys(tracking).length,
    lastReviewedDate: Object.values(tracking).reduce(
      (latest, t) => {
        const d = new Date(t.lastReviewDate);
        return d > latest ? d : latest;
      },
      new Date(0)
    ).toISOString()
  };
}
