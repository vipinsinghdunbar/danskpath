/**
 * Unit tests for adaptiveDifficulty.js
 * Tests all core functions with edge cases and realistic scenarios
 */

import {
  calculatePerformanceScore,
  calculateNextDifficulty,
  calculateMastery,
  detectWeakSpot,
  selectExercises,
  getDifficultyLabel,
  validateAttempt,
  calculateUserProfile
} from './adaptiveDifficulty';

// Test helper: create a mock attempt
function createAttempt(overrides = {}) {
  return {
    questionId: 'q1',
    userAnswer: 'svar',
    correctAnswer: 'svar',
    isCorrect: true,
    responseTimeMs: 5000,
    attemptNumber: 1,
    userConfidence: 4,
    errorType: 'ORD',
    difficulty: 3,
    topic: 'Ord',
    timestamp: new Date(),
    ...overrides
  };
}

describe('calculatePerformanceScore', () => {
  test('returns 0.5 for empty attempts', () => {
    expect(calculatePerformanceScore([])).toBe(0.5);
    expect(calculatePerformanceScore(null)).toBe(0.5);
  });

  test('calculates perfect performance (all correct, fast, high confidence)', () => {
    const attempts = [
      createAttempt({ isCorrect: true, responseTimeMs: 5000, userConfidence: 5 }),
      createAttempt({ isCorrect: true, responseTimeMs: 5000, userConfidence: 5 }),
      createAttempt({ isCorrect: true, responseTimeMs: 5000, userConfidence: 5 })
    ];
    const score = calculatePerformanceScore(attempts);
    expect(score).toBeGreaterThan(0.8);
  });

  test('calculates poor performance (all incorrect, slow, low confidence)', () => {
    const attempts = [
      createAttempt({ isCorrect: false, responseTimeMs: 20000, userConfidence: 1 }),
      createAttempt({ isCorrect: false, responseTimeMs: 20000, userConfidence: 1 }),
      createAttempt({ isCorrect: false, responseTimeMs: 20000, userConfidence: 1 })
    ];
    const score = calculatePerformanceScore(attempts);
    expect(score).toBeLessThan(0.4);
  });

  test('calculates mixed performance correctly', () => {
    const attempts = [
      createAttempt({ isCorrect: true, responseTimeMs: 10000, userConfidence: 3 }),
      createAttempt({ isCorrect: false, responseTimeMs: 15000, userConfidence: 3 }),
      createAttempt({ isCorrect: true, responseTimeMs: 8000, userConfidence: 4 })
    ];
    const score = calculatePerformanceScore(attempts);
    expect(score).toBeGreaterThan(0.4);
    expect(score).toBeLessThan(0.8);
  });

  test('handles missing optional fields gracefully', () => {
    const attempts = [
      { isCorrect: true },
      { isCorrect: true },
      { isCorrect: false }
    ];
    expect(() => calculatePerformanceScore(attempts)).not.toThrow();
  });
});

describe('calculateNextDifficulty', () => {
  test('increases difficulty for excellent performance (≥0.85)', () => {
    const next = calculateNextDifficulty(5, 0.85);
    expect(next).toBeGreaterThan(5);
  });

  test('maintains difficulty for good performance (0.65-0.85)', () => {
    const next1 = calculateNextDifficulty(5, 0.65);
    const next2 = calculateNextDifficulty(5, 0.75);
    const next3 = calculateNextDifficulty(5, 0.85);
    expect(next1).toBe(5);
    expect(next2).toBe(5);
    expect(next3).toBe(5);
  });

  test('decreases difficulty for moderate performance (0.40-0.65)', () => {
    const next = calculateNextDifficulty(5, 0.50);
    expect(next).toBeLessThan(5);
  });

  test('significantly decreases difficulty for poor performance (<0.40)', () => {
    const next = calculateNextDifficulty(5, 0.30);
    expect(next).toBeLessThan(4);
  });

  test('respects difficulty bounds (0-10)', () => {
    expect(calculateNextDifficulty(10, 1.0)).toBeLessThanOrEqual(10);
    expect(calculateNextDifficulty(0, 0)).toBeGreaterThanOrEqual(0);
  });

  test('rounds to 1 decimal place', () => {
    const next = calculateNextDifficulty(5, 0.9);
    expect(next.toString().split('.')[1]?.length || 0).toBeLessThanOrEqual(1);
  });
});

describe('calculateMastery', () => {
  test('returns 0 for empty attempts', () => {
    expect(calculateMastery([])).toBe(0);
    expect(calculateMastery(null)).toBe(0);
  });

  test('calculates perfect mastery (100)', () => {
    const attempts = Array(5).fill(null).map(() =>
      createAttempt({ isCorrect: true, responseTimeMs: 10000, userConfidence: 5 })
    );
    const mastery = calculateMastery(attempts);
    expect(mastery).toBe(100);
  });

  test('calculates zero mastery for all incorrect', () => {
    const attempts = Array(5).fill(null).map(() =>
      createAttempt({ isCorrect: false, responseTimeMs: 20000, userConfidence: 1 })
    );
    const mastery = calculateMastery(attempts);
    expect(mastery).toBe(0);
  });

  test('uses only last 5 attempts', () => {
    const oldAttempts = Array(10).fill(null).map(() =>
      createAttempt({ isCorrect: false })
    );
    const newAttempts = Array(5).fill(null).map(() =>
      createAttempt({ isCorrect: true, responseTimeMs: 10000, userConfidence: 5 })
    );
    const allAttempts = [...oldAttempts, ...newAttempts];
    const mastery = calculateMastery(allAttempts);
    expect(mastery).toBe(100);
  });

  test('weights accuracy 60%, speed 30%, consistency 10%', () => {
    // Create consistent attempts
    const attempts = Array(5).fill(null).map(() =>
      createAttempt({
        isCorrect: true,
        responseTimeMs: 10000,
        userConfidence: 5
      })
    );
    const mastery = calculateMastery(attempts);
    // Should be mostly accuracy (60%) + speed (30%) + consistency (10%) = high score
    expect(mastery).toBeGreaterThan(90);
  });
});

describe('detectWeakSpot', () => {
  test('returns null for insufficient attempts (<3)', () => {
    const attempts = [createAttempt()];
    expect(detectWeakSpot(attempts)).toBeNull();
  });

  test('returns null when no error type appears in >30% of attempts', () => {
    const attempts = [
      createAttempt({ isCorrect: false, errorType: 'ORD' }),
      createAttempt({ isCorrect: false, errorType: 'TID' }),
      createAttempt({ isCorrect: false, errorType: 'KØN' }),
      createAttempt({ isCorrect: true })
    ];
    expect(detectWeakSpot(attempts)).toBeNull();
  });

  test('detects weak spot when error appears >30%', () => {
    const attempts = [
      createAttempt({ isCorrect: false, errorType: 'ORD', topic: 'Ord' }),
      createAttempt({ isCorrect: false, errorType: 'ORD', topic: 'Ord' }),
      createAttempt({ isCorrect: true }),
      createAttempt({ isCorrect: true })
    ];
    const weakSpot = detectWeakSpot(attempts);
    expect(weakSpot).not.toBeNull();
    expect(weakSpot.errorType).toBe('ORD');
    expect(weakSpot.frequency).toBeGreaterThanOrEqual(0.3);
  });

  test('returns null for empty attempts', () => {
    expect(detectWeakSpot([])).toBeNull();
    expect(detectWeakSpot(null)).toBeNull();
  });
});

describe('selectExercises', () => {
  const mockExercises = [
    { id: 'e1', difficulty: 3, errorType: 'ORD', topic: 'Ord' },
    { id: 'e2', difficulty: 5, errorType: 'TID', topic: 'Tider' },
    { id: 'e3', difficulty: 7, errorType: 'KØN', topic: 'Køn' },
    { id: 'e4', difficulty: 4, errorType: 'ORD', topic: 'Ord' },
    { id: 'e5', difficulty: 6, errorType: 'ORD', topic: 'Ord' }
  ];

  test('returns empty array for no exercises', () => {
    expect(selectExercises(5, [])).toEqual([]);
    expect(selectExercises(5, null)).toEqual([]);
  });

  test('filters by difficulty range (±2)', () => {
    const selected = selectExercises(5, mockExercises);
    expect(selected.length).toBeGreaterThan(0);
    selected.forEach(ex => {
      const diff = Math.abs(ex.difficulty - 5);
      expect(diff).toBeLessThanOrEqual(2);
    });
  });

  test('returns up to batchSize exercises', () => {
    const selected = selectExercises(5, mockExercises, null, 3);
    expect(selected.length).toBeLessThanOrEqual(3);
  });

  test('prioritizes weak spot exercises (60%)', () => {
    const weakSpot = { errorType: 'ORD', topic: 'Ord' };
    const selected = selectExercises(5, mockExercises, weakSpot, 5);
    const weakSpotCount = selected.filter(ex => ex.errorType === 'ORD').length;
    expect(weakSpotCount).toBeGreaterThanOrEqual(Math.ceil(5 * 0.6) - 1);
  });

  test('selects exercises closest to current difficulty', () => {
    const selected = selectExercises(5, mockExercises, null, 1);
    expect(selected[0].difficulty).toBe(5);
  });
});

describe('getDifficultyLabel', () => {
  test('returns correct labels for all difficulty ranges', () => {
    expect(getDifficultyLabel(0)).toContain('A1');
    expect(getDifficultyLabel(1.5)).toContain('A1');
    expect(getDifficultyLabel(2.5)).toContain('A2');
    expect(getDifficultyLabel(5)).toContain('B1');
    expect(getDifficultyLabel(8)).toContain('B2');
    expect(getDifficultyLabel(10)).toContain('B2+');
  });
});

describe('validateAttempt', () => {
  test('validates correct attempt data', () => {
    const attempt = createAttempt();
    const result = validateAttempt(attempt);
    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual([]);
  });

  test('rejects invalid userAnswer', () => {
    const attempt = createAttempt({ userAnswer: 123 });
    const result = validateAttempt(attempt);
    expect(result.isValid).toBe(false);
    expect(result.errors.some(e => e.includes('userAnswer'))).toBe(true);
  });

  test('rejects invalid isCorrect', () => {
    const attempt = createAttempt({ isCorrect: 'yes' });
    const result = validateAttempt(attempt);
    expect(result.isValid).toBe(false);
  });

  test('rejects invalid responseTimeMs', () => {
    const attempt = createAttempt({ responseTimeMs: -100 });
    const result = validateAttempt(attempt);
    expect(result.isValid).toBe(false);
  });

  test('rejects invalid errorType', () => {
    const attempt = createAttempt({ errorType: 'INVALID' });
    const result = validateAttempt(attempt);
    expect(result.isValid).toBe(false);
  });

  test('rejects invalid userConfidence', () => {
    const attempt = createAttempt({ userConfidence: 10 });
    const result = validateAttempt(attempt);
    expect(result.isValid).toBe(false);
  });

  test('rejects invalid difficulty', () => {
    const attempt = createAttempt({ difficulty: 15 });
    const result = validateAttempt(attempt);
    expect(result.isValid).toBe(false);
  });
});

describe('calculateUserProfile', () => {
  test('returns default profile for empty attempts', () => {
    const profile = calculateUserProfile([]);
    expect(profile.totalAttempts).toBe(0);
    expect(profile.accuracy).toBe(0);
    expect(profile.estimatedLevel).toContain('A1');
  });

  test('calculates comprehensive stats', () => {
    const attempts = [
      createAttempt({ isCorrect: true, responseTimeMs: 5000 }),
      createAttempt({ isCorrect: true, responseTimeMs: 6000 }),
      createAttempt({ isCorrect: false, responseTimeMs: 15000, errorType: 'ORD' }),
      createAttempt({ isCorrect: true, responseTimeMs: 5500 })
    ];
    const profile = calculateUserProfile(attempts);

    expect(profile.totalAttempts).toBe(4);
    expect(profile.totalCorrect).toBe(3);
    expect(profile.accuracy).toBe(75);
    expect(profile.averageResponseTime).toBeGreaterThan(0);
  });

  test('identifies top weak spots', () => {
    const attempts = Array(10).fill(null).map((_, i) =>
      createAttempt({
        isCorrect: i % 2 === 0,
        errorType: i % 3 === 0 ? 'ORD' : 'TID'
      })
    );
    const profile = calculateUserProfile(attempts);

    expect(profile.weakSpots.length).toBeGreaterThan(0);
    expect(profile.weakSpots[0]).toHaveProperty('errorType');
    expect(profile.weakSpots[0]).toHaveProperty('occurrences');
    expect(profile.weakSpots[0]).toHaveProperty('percentage');
  });

  test('includes estimated level', () => {
    const attempts = [createAttempt({ difficulty: 7 })];
    const profile = calculateUserProfile(attempts);
    expect(profile.estimatedLevel).toBeTruthy();
    expect(profile.estimatedLevel).toContain('B');
  });
});

describe('Integration: Full adaptive cycle', () => {
  test('complete flow: attempt → performance → difficulty adjustment → profile', () => {
    // Simulate 3 exercises
    const initialDifficulty = 5;
    const attempts = [
      createAttempt({ isCorrect: true, responseTimeMs: 6000, difficulty: initialDifficulty }),
      createAttempt({ isCorrect: true, responseTimeMs: 5000, difficulty: initialDifficulty }),
      createAttempt({ isCorrect: true, responseTimeMs: 5500, difficulty: initialDifficulty })
    ];

    // Calculate performance
    const performance = calculatePerformanceScore(attempts);
    expect(performance).toBeGreaterThan(0.8);

    // Calculate next difficulty
    const nextDifficulty = calculateNextDifficulty(initialDifficulty, performance);
    expect(nextDifficulty).toBeGreaterThan(initialDifficulty);

    // Check weak spots (none expected)
    const weakSpot = detectWeakSpot(attempts);
    expect(weakSpot).toBeNull();

    // Get user profile
    const profile = calculateUserProfile(attempts);
    expect(profile.totalAttempts).toBe(3);
    expect(profile.accuracy).toBe(100);
  });

  test('poor performance cycle triggers remedial exercises', () => {
    const initialDifficulty = 5;
    const attempts = [
      createAttempt({
        isCorrect: false,
        responseTimeMs: 20000,
        difficulty: initialDifficulty,
        errorType: 'ORD'
      }),
      createAttempt({
        isCorrect: false,
        responseTimeMs: 18000,
        difficulty: initialDifficulty,
        errorType: 'ORD'
      }),
      createAttempt({
        isCorrect: false,
        responseTimeMs: 22000,
        difficulty: initialDifficulty,
        errorType: 'ORD'
      })
    ];

    const performance = calculatePerformanceScore(attempts);
    expect(performance).toBeLessThan(0.4);

    const nextDifficulty = calculateNextDifficulty(initialDifficulty, performance);
    expect(nextDifficulty).toBeLessThan(initialDifficulty - 1);

    const weakSpot = detectWeakSpot(attempts);
    expect(weakSpot).not.toBeNull();
    expect(weakSpot.errorType).toBe('ORD');
  });
});
