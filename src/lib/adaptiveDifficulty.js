/**
 * Adaptive Difficulty Algorithm for DanskPath
 *
 * Core functions for calculating next difficulty, mastery, and selecting exercises
 * based on real-time user performance data.
 *
 * Difficulty Scale: 0-10
 * - 0-1: A1 (absolute beginner)
 * - 2-3: A2 (elementary)
 * - 4-5: B1 (intermediate)
 * - 6-7: B1+ (upper intermediate)
 * - 8-9: B2 (advanced)
 * - 10: B2+ (mastery)
 */

/**
 * Calculate performance score from a batch of attempts
 * @param {Array} attempts - Last 3 exercise attempts
 * @returns {number} Performance score 0-1
 */
export function calculatePerformanceScore(attempts) {
  if (!attempts || attempts.length === 0) return 0.5;

  // Accuracy component (60% weight)
  const correct = attempts.filter(a => a.isCorrect).length;
  const accuracy = correct / attempts.length;

  // Speed component (30% weight)
  // Target: 10 seconds, penalty for slower responses
  const avgResponseTime = attempts.reduce((sum, a) => sum + (a.responseTimeMs || 0), 0) / attempts.length;
  const targetTime = 10000; // 10 seconds in milliseconds
  const speedScore = Math.max(0, 1 - (avgResponseTime / targetTime) * 0.5);

  // Confidence component (10% weight)
  // Average user confidence rating (1-5 scale, normalized to 0-1)
  const avgConfidence = attempts.reduce((sum, a) => sum + ((a.userConfidence || 3) / 5), 0) / attempts.length;

  // Combined performance score
  const performance = (accuracy * 0.6) + (speedScore * 0.3) + (avgConfidence * 0.1);
  return Math.min(1, Math.max(0, performance));
}

/**
 * Calculate next difficulty based on performance
 * @param {number} currentDifficulty - Current difficulty (0-10)
 * @param {number} performanceScore - Performance score from calculatePerformanceScore
 * @returns {number} Next difficulty level (0-10)
 */
export function calculateNextDifficulty(currentDifficulty, performanceScore) {
  let nextDifficulty = currentDifficulty;

  if (performanceScore >= 0.85) {
    // Excellent performance: increase difficulty
    nextDifficulty = Math.min(10, currentDifficulty + 1.5);
  } else if (performanceScore >= 0.65) {
    // Good performance: maintain difficulty
    nextDifficulty = currentDifficulty;
  } else if (performanceScore >= 0.40) {
    // Moderate performance: slightly decrease
    nextDifficulty = Math.max(0, currentDifficulty - 1);
  } else {
    // Poor performance: decrease more significantly
    nextDifficulty = Math.max(0, currentDifficulty - 2);
  }

  return Math.round(nextDifficulty * 10) / 10; // Round to 1 decimal place
}

/**
 * Calculate mastery score (0-100) based on last 5 exercises
 * @param {Array} recentAttempts - Last 5 exercise attempts
 * @returns {number} Mastery score 0-100
 */
export function calculateMastery(recentAttempts) {
  if (!recentAttempts || recentAttempts.length === 0) return 0;

  const attempts = recentAttempts.slice(0, 5); // Take only last 5

  // Accuracy (60% weight): percentage of correct answers
  const accuracy = attempts.filter(a => a.isCorrect).length / attempts.length;

  // Speed (30% weight): normalized to 0-1 based on target time
  const avgTime = attempts.reduce((sum, a) => sum + (a.responseTimeMs || 10000), 0) / attempts.length;
  const targetTime = 10000; // 10 seconds
  const speed = Math.max(0, 1 - Math.abs(avgTime - targetTime) / (targetTime * 2));

  // Consistency (10% weight): low variance in performance
  const correctnessByAttempt = attempts.map(a => a.isCorrect ? 1 : 0);
  const mean = correctnessByAttempt.reduce((a, b) => a + b) / correctnessByAttempt.length;
  const variance = correctnessByAttempt.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / correctnessByAttempt.length;
  const consistency = 1 - Math.sqrt(variance); // Lower variance = higher consistency

  const masteryScore = (accuracy * 0.6) + (speed * 0.3) + (consistency * 0.1);
  return Math.round(masteryScore * 100);
}

/**
 * Determine if a weak spot was detected
 * @param {Array} recentAttempts - Last 5-10 exercise attempts
 * @returns {object|null} Detected weak spot or null
 */
export function detectWeakSpot(recentAttempts) {
  if (!recentAttempts || recentAttempts.length < 3) return null;

  const errorTypeMap = {};

  // Aggregate error types
  recentAttempts.forEach(attempt => {
    if (attempt.errorType) {
      errorTypeMap[attempt.errorType] = (errorTypeMap[attempt.errorType] || 0) + 1;
    }
  });

  // Find most common error type
  let mostCommonError = null;
  let maxCount = 0;

  Object.entries(errorTypeMap).forEach(([errorType, count]) => {
    if (count > maxCount) {
      maxCount = count;
      mostCommonError = errorType;
    }
  });

  // If error appears in >30% of attempts, it's a weak spot
  if (mostCommonError && maxCount / recentAttempts.length >= 0.3) {
    return {
      errorType: mostCommonError,
      frequency: maxCount / recentAttempts.length,
      topic: recentAttempts.filter(a => a.errorType === mostCommonError)[0]?.topic
    };
  }

  return null;
}

/**
 * Select exercises for the next batch based on current difficulty and weak spots
 * @param {number} currentDifficulty - Current difficulty (0-10)
 * @param {Array} availableExercises - Pool of available exercises
 * @param {object|null} weakSpot - Detected weak spot from detectWeakSpot
 * @param {number} batchSize - Number of exercises to select (default: 3)
 * @returns {Array} Selected exercises
 */
export function selectExercises(currentDifficulty, availableExercises, weakSpot = null, batchSize = 3) {
  if (!availableExercises || availableExercises.length === 0) return [];

  let selectedPool = availableExercises;

  // Filter by difficulty range (±2 levels for exploration)
  const minDifficulty = Math.max(0, currentDifficulty - 2);
  const maxDifficulty = Math.min(10, currentDifficulty + 2);
  selectedPool = selectedPool.filter(ex =>
    (ex.difficulty || 5) >= minDifficulty && (ex.difficulty || 5) <= maxDifficulty
  );

  // If weak spot detected, prioritize related exercises
  if (weakSpot && weakSpot.errorType) {
    const weakSpotExercises = selectedPool.filter(ex =>
      ex.errorType === weakSpot.errorType || ex.topic === weakSpot.topic
    );

    if (weakSpotExercises.length > 0) {
      // Take 60% from weak spot, 40% from general pool
      const weakSpotCount = Math.ceil(batchSize * 0.6);
      const generalCount = batchSize - weakSpotCount;

      const selected = weakSpotExercises.slice(0, weakSpotCount);
      const remaining = selectedPool.filter(ex => !weakSpotExercises.includes(ex));
      selected.push(...remaining.slice(0, generalCount));

      return selected;
    }
  }

  // Return exercises closest to current difficulty
  selectedPool.sort((a, b) => {
    const aDiff = Math.abs((a.difficulty || 5) - currentDifficulty);
    const bDiff = Math.abs((b.difficulty || 5) - currentDifficulty);
    return aDiff - bDiff;
  });

  return selectedPool.slice(0, batchSize);
}

/**
 * Get difficulty label for display
 * @param {number} difficulty - Difficulty 0-10
 * @returns {string} Human-readable difficulty label
 */
export function getDifficultyLabel(difficulty) {
  if (difficulty < 0.5) return 'A1 Absolut Begynder';
  if (difficulty < 1.5) return 'A1 Alfabet & Ord';
  if (difficulty < 2.5) return 'A2 Elementær';
  if (difficulty < 3.5) return 'A2 Enkel Kommunikation';
  if (difficulty < 4.5) return 'B1 Mellemnivaet';
  if (difficulty < 5.5) return 'B1 Daglig Samtale';
  if (difficulty < 6.5) return 'B1+ Øget Sikkerhed';
  if (difficulty < 7.5) return 'B1+ Kompleks Kommunikation';
  if (difficulty < 8.5) return 'B2 Avanceret';
  if (difficulty < 9.5) return 'B2 Flydende Dansk';
  return 'B2+ Mesterskab';
}

/**
 * Validate attempt data before storing
 * @param {object} attempt - Attempt data to validate
 * @returns {object} Validation result {isValid: boolean, errors: array}
 */
export function validateAttempt(attempt) {
  const errors = [];

  if (typeof attempt.userAnswer !== 'string') {
    errors.push('userAnswer must be a string');
  }
  if (typeof attempt.isCorrect !== 'boolean') {
    errors.push('isCorrect must be a boolean');
  }
  if (typeof attempt.responseTimeMs !== 'number' || attempt.responseTimeMs < 0) {
    errors.push('responseTimeMs must be a non-negative number');
  }
  if (!['ORD', 'TID', 'KØN', 'BØJ', 'PRÆ', 'VALG', 'STAV', 'REG', 'UDT'].includes(attempt.errorType)) {
    errors.push('errorType must be one of: ORD, TID, KØN, BØJ, PRÆ, VALG, STAV, REG, UDT');
  }
  if (typeof attempt.userConfidence !== 'number' || attempt.userConfidence < 1 || attempt.userConfidence > 5) {
    errors.push('userConfidence must be a number between 1-5');
  }
  if (typeof attempt.difficulty !== 'number' || attempt.difficulty < 0 || attempt.difficulty > 10) {
    errors.push('difficulty must be a number between 0-10');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Calculate comprehensive user profile based on all attempts
 * @param {Array} allAttempts - All user attempts
 * @returns {object} User profile with stats
 */
export function calculateUserProfile(allAttempts) {
  if (!allAttempts || allAttempts.length === 0) {
    return {
      totalAttempts: 0,
      totalCorrect: 0,
      accuracy: 0,
      averageResponseTime: 0,
      currentDifficulty: 0,
      estimatedLevel: 'A1 Absolut Begynder',
      weakSpots: []
    };
  }

  const totalAttempts = allAttempts.length;
  const totalCorrect = allAttempts.filter(a => a.isCorrect).length;
  const accuracy = totalCorrect / totalAttempts;
  const averageResponseTime = allAttempts.reduce((sum, a) => sum + (a.responseTimeMs || 0), 0) / totalAttempts;
  const currentDifficulty = allAttempts[allAttempts.length - 1]?.difficulty || 0;

  // Identify weak spots
  const errorTypeMap = {};
  allAttempts.forEach(attempt => {
    if (!attempt.isCorrect && attempt.errorType) {
      errorTypeMap[attempt.errorType] = (errorTypeMap[attempt.errorType] || 0) + 1;
    }
  });

  const weakSpots = Object.entries(errorTypeMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([errorType, count]) => ({
      errorType,
      occurrences: count,
      percentage: Math.round((count / totalAttempts) * 100)
    }));

  return {
    totalAttempts,
    totalCorrect,
    accuracy: Math.round(accuracy * 100),
    averageResponseTime: Math.round(averageResponseTime),
    currentDifficulty: Math.round(currentDifficulty * 10) / 10,
    estimatedLevel: getDifficultyLabel(currentDifficulty),
    weakSpots
  };
}
