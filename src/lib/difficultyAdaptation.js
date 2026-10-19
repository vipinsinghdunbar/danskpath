/**
 * DIFFICULTY ADAPTATION ENGINE
 * Phase 4: Dynamically adjusts exercise difficulty based on user performance
 *
 * Tracks:
 * - Category accuracy (weak: <60%, medium: 60-80%, strong: >80%)
 * - Recent performance (last 5 attempts)
 * - Streak length (if on streak, bump difficulty)
 * - Time spent per exercise (faster = higher difficulty)
 */

export function getUserPerformanceStats(userId = 'vipin') {
  try {
    const key = `dansk_user_performance_${userId}`;
    const stored = localStorage.getItem(key);

    if (!stored) {
      return initializePerformanceStats();
    }

    return JSON.parse(stored);
  } catch (err) {
    console.error('Performance stats read error:', err);
    return initializePerformanceStats();
  }
}

export function initializePerformanceStats() {
  const categories = [
    'ORD', 'KOMP', 'KONJ', 'PRON', 'POSS', 'ARTKV', 'PASS',
    'SVERB', 'MOD', 'REL', 'INFGER', 'NEG', 'PREP', 'REFL', 'IDI'
  ];

  const stats = {};
  categories.forEach(cat => {
    stats[cat] = {
      accuracy: 0,
      totalAttempts: 0,
      correctAttempts: 0,
      recentAttempts: [],
      avgTimePerExercise: 0,
      difficulty: 'A1',
      categorySeverity: 'new'
    };
  });

  return stats;
}

export function recordExerciseAttempt(
  userId = 'vipin',
  category,
  exerciseId,
  isCorrect,
  timeSpentSeconds
) {
  const stats = getUserPerformanceStats(userId);

  if (!stats[category]) {
    stats[category] = {
      accuracy: 0,
      totalAttempts: 0,
      correctAttempts: 0,
      recentAttempts: [],
      avgTimePerExercise: 0,
      difficulty: 'A1',
      categorySeverity: 'new'
    };
  }

  const catStats = stats[category];

  // Update totals
  catStats.totalAttempts += 1;
  if (isCorrect) catStats.correctAttempts += 1;

  // Update recent attempts (keep last 5)
  catStats.recentAttempts.push(isCorrect);
  if (catStats.recentAttempts.length > 5) {
    catStats.recentAttempts.shift();
  }

  // Update accuracy
  catStats.accuracy = Math.round(
    (catStats.correctAttempts / catStats.totalAttempts) * 100
  );

  // Update average time
  catStats.avgTimePerExercise = Math.round(
    (catStats.avgTimePerExercise + timeSpentSeconds) / 2
  );

  // Determine severity
  catStats.categorySeverity = getCategorySeverity(catStats.accuracy);

  // Save
  localStorage.setItem(`dansk_user_performance_${userId}`, JSON.stringify(stats));

  return stats;
}

function getCategorySeverity(accuracy) {
  if (accuracy < 50) return 'very_hard';
  if (accuracy < 60) return 'hard';
  if (accuracy < 75) return 'medium';
  if (accuracy < 88) return 'easy';
  return 'mastered';
}

/**
 * Select appropriate difficulty level for a category
 * based on user's recent performance
 */
export function selectDifficultyForCategory(userId = 'vipin', category) {
  const stats = getUserPerformanceStats(userId);
  const catStats = stats[category];

  if (!catStats) {
    return 'A1'; // Default to easiest
  }

  const accuracy = catStats.accuracy;
  const recentAttempts = catStats.recentAttempts;

  // Check if on a streak (last 3 correct)
  const onStreak = recentAttempts.length >= 3 &&
                   recentAttempts.slice(-3).every(a => a === true);

  // Base difficulty from accuracy
  let difficulty = 'A1';

  if (accuracy < 50) {
    difficulty = 'A1'; // Struggling—show easier exercises
  } else if (accuracy < 65) {
    difficulty = 'A1'; // Still foundational
  } else if (accuracy < 75) {
    difficulty = 'A2'; // Getting comfortable
  } else if (accuracy < 88) {
    difficulty = 'B1'; // Competent
  } else {
    difficulty = 'B2'; // Mastery
  }

  // Bump up one level if on streak
  if (onStreak && difficulty !== 'B2') {
    const levels = ['A1', 'A2', 'B1', 'B2'];
    const currentIndex = levels.indexOf(difficulty);
    if (currentIndex < levels.length - 1) {
      difficulty = levels[currentIndex + 1];
    }
  }

  return difficulty;
}

/**
 * Get all categories sorted by difficulty (weak first)
 */
export function getCategoriesByDifficulty(userId = 'vipin') {
  const stats = getUserPerformanceStats(userId);
  const categories = Object.entries(stats);

  return categories
    .sort((a, b) => a[1].accuracy - b[1].accuracy)
    .map(([cat, catStats]) => ({
      category: cat,
      accuracy: catStats.accuracy,
      severity: catStats.categorySeverity,
      recommendedDifficulty: selectDifficultyForCategory(userId, cat),
      totalAttempts: catStats.totalAttempts
    }));
}

/**
 * Get learning metrics for dashboard
 */
export function getLearningMetrics(userId = 'vipin') {
  const stats = getUserPerformanceStats(userId);
  const categories = Object.values(stats);

  const totalAttempts = categories.reduce((sum, cat) => sum + cat.totalAttempts, 0);
  const totalCorrect = categories.reduce((sum, cat) => sum + cat.correctAttempts, 0);
  const overallAccuracy = totalAttempts > 0
    ? Math.round((totalCorrect / totalAttempts) * 100)
    : 0;

  const weakSpots = categories
    .filter(cat => cat.accuracy < 70)
    .sort((a, b) => a.accuracy - b.accuracy)
    .slice(0, 3);

  const strengths = categories
    .filter(cat => cat.accuracy > 85)
    .sort((a, b) => b.accuracy - a.accuracy)
    .slice(0, 3);

  return {
    overallAccuracy,
    totalAttempts,
    totalCorrect,
    weakSpots,
    strengths,
    categoriesTracked: categories.length,
    averageCategoryAccuracy: Math.round(
      categories.reduce((sum, cat) => sum + cat.accuracy, 0) / categories.length
    )
  };
}

/**
 * Get exercises that should be shown at appropriate difficulty
 */
export function filterExercisesByAdaptiveDifficulty(
  exercises,
  userId = 'vipin',
  categoryFilter = null
) {
  const stats = getUserPerformanceStats(userId);

  return exercises.filter(ex => {
    if (categoryFilter && ex.category !== categoryFilter) {
      return false;
    }

    const catStats = stats[ex.category];
    if (!catStats) {
      return ex.difficulty === 'A1'; // New category = start at A1
    }

    const recommendedDifficulty = selectDifficultyForCategory(userId, ex.category);

    // Show recommended difficulty ± 1 level for variety
    const levels = ['A1', 'A2', 'B1', 'B2'];
    const recIndex = levels.indexOf(recommendedDifficulty);
    const range = [
      levels[Math.max(0, recIndex - 1)],
      recommendedDifficulty,
      levels[Math.min(3, recIndex + 1)]
    ];

    return range.includes(ex.difficulty);
  });
}

/**
 * Clear all performance data (testing only)
 */
export function resetPerformanceStats(userId = 'vipin') {
  localStorage.removeItem(`dansk_user_performance_${userId}`);
  return initializePerformanceStats();
}
