/**
 * React hook for managing adaptive difficulty in exercises
 * Handles performance tracking, difficulty adjustments, and weak spot detection
 */

import { useState, useCallback, useEffect } from 'react';
import {
  calculatePerformanceScore,
  calculateNextDifficulty,
  calculateMastery,
  detectWeakSpot,
  selectExercises,
  validateAttempt
} from '../lib/adaptiveDifficulty';
import {
  storeAttempt,
  getRecentAttempts,
  updateUserDifficulty,
  analyzeWeakSpots
} from '../lib/supabaseAdaptive';

/**
 * Hook for managing adaptive difficulty
 * @param {string} userId - User's Firebase UID
 * @param {number} initialDifficulty - Starting difficulty (0-10)
 * @param {Array} availableExercises - Pool of available exercises
 * @returns {object} Difficulty state and methods
 */
export function useAdaptiveDifficulty(userId, initialDifficulty = 0, availableExercises = []) {
  const [currentDifficulty, setCurrentDifficulty] = useState(initialDifficulty);
  const [attempts, setAttempts] = useState([]);
  const [mastery, setMastery] = useState(0);
  const [weakSpot, setWeakSpot] = useState(null);
  const [nextExercises, setNextExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load recent attempts on mount
  useEffect(() => {
    const loadAttempts = async () => {
      try {
        setLoading(true);
        const recent = await getRecentAttempts(userId, 5);
        setAttempts(recent);

        if (recent.length > 0) {
          const newMastery = calculateMastery(recent);
          setMastery(newMastery);
        }
      } catch (err) {
        console.error('Error loading attempts:', err);
        setError('Kunne ikke indlæse øvelser');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      loadAttempts();
    }
  }, [userId]);

  /**
   * Record a single exercise attempt
   * @param {object} attemptData - Attempt data from exercise component
   * @returns {Promise<boolean>} Success status
   */
  const recordAttempt = useCallback(async (attemptData) => {
    try {
      // Validate attempt data
      const validation = validateAttempt(attemptData);
      if (!validation.isValid) {
        setError(`Ugyldig øvelses data: ${validation.errors[0]}`);
        return false;
      }

      // Store attempt in Firestore
      await storeAttempt(userId, attemptData);

      // Update local state
      const newAttempts = [...attempts, attemptData];
      setAttempts(newAttempts);

      return true;
    } catch (err) {
      console.error('Error recording attempt:', err);
      setError('Fejl ved lagring af øvelse');
      return false;
    }
  }, [userId, attempts]);

  /**
   * Check if difficulty adjustment is needed (every 3 exercises)
   * @returns {Promise<object|null>} Adjustment data or null
   */
  const checkDifficultyAdjustment = useCallback(async () => {
    try {
      if (attempts.length % 3 !== 0 || attempts.length === 0) {
        return null;
      }

      // Calculate performance from last 3 attempts
      const last3 = attempts.slice(-3);
      const performance = calculatePerformanceScore(last3);

      // Calculate next difficulty
      const nextDiff = calculateNextDifficulty(currentDifficulty, performance);

      // Only adjust if different from current
      if (Math.abs(nextDiff - currentDifficulty) > 0.1) {
        setCurrentDifficulty(nextDiff);

        // Update in Firestore
        await updateUserDifficulty(userId, nextDiff);

        return {
          oldDifficulty: currentDifficulty,
          newDifficulty: nextDiff,
          performance: Math.round(performance * 100),
          reason: getAdjustmentReason(performance)
        };
      }

      return null;
    } catch (err) {
      console.error('Error checking difficulty:', err);
      return null;
    }
  }, [attempts, currentDifficulty, userId]);

  /**
   * Update weak spot detection and exercise selection
   * @returns {Promise<void>}
   */
  const updateWeakSpots = useCallback(async () => {
    try {
      if (attempts.length < 3) return;

      const detected = detectWeakSpot(attempts);
      setWeakSpot(detected);

      // Select next exercises based on weak spot
      const selected = selectExercises(
        currentDifficulty,
        availableExercises,
        detected,
        3
      );
      setNextExercises(selected);
    } catch (err) {
      console.error('Error detecting weak spots:', err);
    }
  }, [attempts, currentDifficulty, availableExercises]);

  /**
   * Update mastery score
   * @returns {void}
   */
  const updateMasteryScore = useCallback(() => {
    if (attempts.length > 0) {
      const newMastery = calculateMastery(attempts);
      setMastery(newMastery);
    }
  }, [attempts]);

  /**
   * Get full session summary
   * @returns {Promise<object>} Session summary with stats
   */
  const getSessionSummary = useCallback(async () => {
    try {
      const performance = attempts.length >= 3
        ? calculatePerformanceScore(attempts.slice(-3))
        : 0;

      const weakSpots = await analyzeWeakSpots(userId);

      return {
        totalAttempts: attempts.length,
        correctAttempts: attempts.filter(a => a.isCorrect).length,
        accuracy: attempts.length > 0
          ? Math.round((attempts.filter(a => a.isCorrect).length / attempts.length) * 100)
          : 0,
        currentDifficulty: Math.round(currentDifficulty * 10) / 10,
        mastery,
        lastPerformance: Math.round(performance * 100),
        weakSpots: weakSpots.errorTypes.slice(0, 3),
        sessionStarted: attempts[0]?.timestamp || new Date(),
        lastAttempt: attempts[attempts.length - 1]?.timestamp || new Date()
      };
    } catch (err) {
      console.error('Error generating summary:', err);
      return null;
    }
  }, [attempts, currentDifficulty, mastery, userId]);

  /**
   * Reset difficulty to initial value
   * @param {number} newInitial - New initial difficulty
   * @returns {void}
   */
  const resetDifficulty = useCallback((newInitial = 0) => {
    setCurrentDifficulty(newInitial);
    setAttempts([]);
    setMastery(0);
    setWeakSpot(null);
    setError(null);
  }, []);

  /**
   * Clear error message
   * @returns {void}
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    // State
    currentDifficulty,
    attempts,
    mastery,
    weakSpot,
    nextExercises,
    loading,
    error,

    // Methods
    recordAttempt,
    checkDifficultyAdjustment,
    updateWeakSpots,
    updateMasteryScore,
    getSessionSummary,
    resetDifficulty,
    clearError
  };
}

/**
 * Helper to get human-readable adjustment reason
 * @param {number} performance - Performance score 0-1
 * @returns {string} Reason in Danish
 */
function getAdjustmentReason(performance) {
  if (performance >= 0.85) {
    return 'Udmærket præstation - øger sværhedsgrad';
  } else if (performance >= 0.65) {
    return 'God præstation - holder samme sværhedsgrad';
  } else if (performance >= 0.40) {
    return 'Moderat præstation - reducerer sværhedsgrad';
  } else {
    return 'Svag præstation - reducerer betydeligt';
  }
}

/**
 * Hook for getting exercise recommendations
 * @param {string} userId - User's Firebase UID
 * @param {number} difficulty - Current difficulty
 * @param {Array} allExercises - All available exercises
 * @returns {object} Exercise recommendations
 */
export function useExerciseRecommendations(userId, difficulty, allExercises) {
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadRecommendations = async () => {
      try {
        setLoading(true);
        const recent = await getRecentAttempts(userId, 5);
        const detected = detectWeakSpot(recent);

        const selected = selectExercises(difficulty, allExercises, detected, 5);
        setRecommended(selected);
      } catch (err) {
        console.error('Error loading recommendations:', err);
      } finally {
        setLoading(false);
      }
    };

    if (userId && allExercises.length > 0) {
      loadRecommendations();
    }
  }, [userId, difficulty, allExercises]);

  return {
    recommended,
    loading
  };
}

/**
 * Hook for displaying progress and achievements
 * @param {number} mastery - Mastery score 0-100
 * @param {number} attempts - Number of attempts
 * @returns {object} Achievement data
 */
export function useAchievements(mastery, attempts) {
  const achievements = [];

  // Attempt milestones
  if (attempts === 1) achievements.push({ id: 'first_attempt', label: 'Første øvelse', icon: '🎯' });
  if (attempts === 10) achievements.push({ id: 'ten_attempts', label: 'Dygtig øver', icon: '💪' });
  if (attempts === 50) achievements.push({ id: 'fifty_attempts', label: 'Dedikeret elev', icon: '🔥' });
  if (attempts === 100) achievements.push({ id: 'hundred_attempts', label: 'Master', icon: '👑' });

  // Mastery milestones
  if (mastery >= 50) achievements.push({ id: 'fifty_mastery', label: '50% Mesterskab', icon: '⭐' });
  if (mastery >= 75) achievements.push({ id: 'seventy_five_mastery', label: '75% Mesterskab', icon: '✨' });
  if (mastery >= 90) achievements.push({ id: 'ninety_mastery', label: '90% Mesterskab', icon: '🏆' });

  return {
    achievements,
    nextMilestone: attempts < 10 ? 10 : attempts < 50 ? 50 : attempts < 100 ? 100 : null
  };
}
