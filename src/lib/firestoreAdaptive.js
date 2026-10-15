/**
 * Firestore integration for adaptive difficulty
 * Handles storing attempts, fetching user progress, and updating difficulty levels
 */

import { db } from '../firebase';
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  updateDoc,
  doc,
  Timestamp,
  writeBatch
} from 'firebase/firestore';

/**
 * Store a single exercise attempt
 * @param {string} userId - User's Firebase UID
 * @param {object} attemptData - Attempt data from exercise
 * @returns {Promise<string>} Document ID of created attempt
 */
export async function storeAttempt(userId, attemptData) {
  try {
    const attemptsRef = collection(db, 'users', userId, 'attempts');

    const documentData = {
      ...attemptData,
      timestamp: Timestamp.now(),
      userId // For cross-queries if needed
    };

    const docRef = await addDoc(attemptsRef, documentData);
    console.log('✓ Attempt stored:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('❌ Error storing attempt:', error);
    throw error;
  }
}

/**
 * Get recent attempts for difficulty calculation
 * @param {string} userId - User's Firebase UID
 * @param {number} count - Number of recent attempts to fetch (default: 3)
 * @returns {Promise<Array>} Array of attempts
 */
export async function getRecentAttempts(userId, count = 3) {
  try {
    const attemptsRef = collection(db, 'users', userId, 'attempts');
    const q = query(
      attemptsRef,
      orderBy('timestamp', 'desc'),
      limit(count)
    );

    const snapshot = await getDocs(q);
    const attempts = snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .reverse(); // Oldest to newest

    return attempts;
  } catch (error) {
    console.error('❌ Error fetching recent attempts:', error);
    return [];
  }
}

/**
 * Get all attempts for a user (for profile generation)
 * @param {string} userId - User's Firebase UID
 * @returns {Promise<Array>} All attempts ordered by timestamp
 */
export async function getAllAttempts(userId) {
  try {
    const attemptsRef = collection(db, 'users', userId, 'attempts');
    const q = query(
      attemptsRef,
      orderBy('timestamp', 'asc')
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('❌ Error fetching all attempts:', error);
    return [];
  }
}

/**
 * Get attempts for a specific topic/lesson
 * @param {string} userId - User's Firebase UID
 * @param {string} topic - Topic name
 * @returns {Promise<Array>} Attempts for that topic
 */
export async function getAttemptsByTopic(userId, topic) {
  try {
    const attemptsRef = collection(db, 'users', userId, 'attempts');
    const q = query(
      attemptsRef,
      where('topic', '==', topic),
      orderBy('timestamp', 'desc')
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error(`❌ Error fetching attempts for topic ${topic}:`, error);
    return [];
  }
}

/**
 * Update user's current difficulty in profile
 * @param {string} userId - User's Firebase UID
 * @param {number} newDifficulty - New difficulty level (0-10)
 * @returns {Promise<void>}
 */
export async function updateUserDifficulty(userId, newDifficulty) {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      currentDifficulty: newDifficulty,
      lastDifficultyUpdate: Timestamp.now()
    });
    console.log('✓ Difficulty updated to:', newDifficulty);
  } catch (error) {
    console.error('❌ Error updating difficulty:', error);
    throw error;
  }
}

/**
 * Update user's lesson progress with new difficulty
 * @param {string} userId - User's Firebase UID
 * @param {string} lessonId - Lesson identifier
 * @param {object} progressData - Updated progress data
 * @returns {Promise<void>}
 */
export async function updateLessonProgress(userId, lessonId, progressData) {
  try {
    const userRef = doc(db, 'users', userId);
    const currentPath = `lessonProgress.${lessonId}`;

    // Get current data to merge
    const userData = await getDocs(query(
      collection(db, 'users'),
      where('__name__', '==', userId)
    ));

    if (userData.docs.length > 0) {
      const currentProgress = userData.docs[0].data().lessonProgress || {};
      const updatedProgress = {
        ...currentProgress,
        [lessonId]: {
          ...(currentProgress[lessonId] || {}),
          ...progressData,
          lastUpdated: Timestamp.now()
        }
      };

      await updateDoc(userRef, {
        lessonProgress: updatedProgress
      });
      console.log('✓ Lesson progress updated:', lessonId);
    }
  } catch (error) {
    console.error('❌ Error updating lesson progress:', error);
    throw error;
  }
}

/**
 * Store batch of attempts (e.g., end of session)
 * @param {string} userId - User's Firebase UID
 * @param {Array} attempts - Array of attempt data
 * @returns {Promise<Array>} IDs of stored attempts
 */
export async function storeBatchAttempts(userId, attempts) {
  try {
    const attemptsRef = collection(db, 'users', userId, 'attempts');
    const batch = writeBatch(db);
    const docIds = [];

    attempts.forEach(attemptData => {
      const newDocRef = doc(attemptsRef);
      batch.set(newDocRef, {
        ...attemptData,
        timestamp: Timestamp.now(),
        userId
      });
      docIds.push(newDocRef.id);
    });

    await batch.commit();
    console.log('✓ Batch of', attempts.length, 'attempts stored');
    return docIds;
  } catch (error) {
    console.error('❌ Error storing batch attempts:', error);
    throw error;
  }
}

/**
 * Get user's progress stats for dashboard
 * @param {string} userId - User's Firebase UID
 * @returns {Promise<object>} User progress stats
 */
export async function getUserProgressStats(userId) {
  try {
    const attempts = await getAllAttempts(userId);

    if (attempts.length === 0) {
      return {
        totalExercises: 0,
        correctExercises: 0,
        accuracy: 0,
        currentDifficulty: 0,
        estimatedLevel: 'A1 Absolut Begynder',
        topicsProgressed: [],
        lastActive: null
      };
    }

    const correctCount = attempts.filter(a => a.isCorrect).length;
    const accuracy = (correctCount / attempts.length) * 100;

    // Calculate topics progression
    const topicMap = {};
    attempts.forEach(attempt => {
      if (attempt.topic) {
        const correct = attempt.isCorrect ? 1 : 0;
        if (!topicMap[attempt.topic]) {
          topicMap[attempt.topic] = { correct: 0, total: 0 };
        }
        topicMap[attempt.topic].correct += correct;
        topicMap[attempt.topic].total += 1;
      }
    });

    const topicsProgressed = Object.entries(topicMap).map(([topic, stats]) => ({
      topic,
      accuracy: Math.round((stats.correct / stats.total) * 100),
      exercises: stats.total
    }));

    const lastAttempt = attempts[attempts.length - 1];
    const currentDifficulty = lastAttempt?.difficulty || 0;

    return {
      totalExercises: attempts.length,
      correctExercises: correctCount,
      accuracy: Math.round(accuracy),
      currentDifficulty,
      topicsProgressed: topicsProgressed.sort((a, b) => b.exercises - a.exercises),
      lastActive: lastAttempt?.timestamp || null
    };
  } catch (error) {
    console.error('❌ Error calculating user stats:', error);
    return {
      totalExercises: 0,
      correctExercises: 0,
      accuracy: 0,
      currentDifficulty: 0,
      topicsProgressed: [],
      lastActive: null
    };
  }
}

/**
 * Get difficulty recommendations for next lesson
 * @param {string} userId - User's Firebase UID
 * @returns {Promise<object>} Recommendation with difficulty and reasoning
 */
export async function getDifficultyRecommendation(userId) {
  try {
    const recentAttempts = await getRecentAttempts(userId, 5);

    if (recentAttempts.length === 0) {
      return {
        suggestedDifficulty: 0.5,
        reasoning: 'Nybegynder - starter på A1',
        attempts: 0
      };
    }

    const correctCount = recentAttempts.filter(a => a.isCorrect).length;
    const accuracy = correctCount / recentAttempts.length;
    const avgResponseTime = recentAttempts.reduce((sum, a) => sum + (a.responseTimeMs || 0), 0) / recentAttempts.length;

    let reasoning = '';
    let difficulty = recentAttempts[recentAttempts.length - 1]?.difficulty || 5;

    if (accuracy >= 0.85) {
      difficulty = Math.min(10, difficulty + 1.5);
      reasoning = 'Udmærket præstation - øg sværhedsgrad';
    } else if (accuracy >= 0.65) {
      reasoning = 'God præstation - hold samme sværhedsgrad';
    } else if (accuracy >= 0.40) {
      difficulty = Math.max(0, difficulty - 1);
      reasoning = 'Moderat præstation - reducerer sværhedsgrad';
    } else {
      difficulty = Math.max(0, difficulty - 2);
      reasoning = 'Svag præstation - reducerer betydeligt';
    }

    return {
      suggestedDifficulty: Math.round(difficulty * 10) / 10,
      reasoning,
      accuracy: Math.round(accuracy * 100),
      avgResponseTime: Math.round(avgResponseTime),
      attempts: recentAttempts.length
    };
  } catch (error) {
    console.error('❌ Error getting recommendation:', error);
    return {
      suggestedDifficulty: 5,
      reasoning: 'Fejl ved læsning af progress',
      attempts: 0
    };
  }
}

/**
 * Analyze weak spots from user's attempts
 * @param {string} userId - User's Firebase UID
 * @param {number} sampleSize - Number of recent attempts to analyze (default: 10)
 * @returns {Promise<Array>} Weak spots ranked by frequency
 */
export async function analyzeWeakSpots(userId, sampleSize = 10) {
  try {
    const attempts = await getRecentAttempts(userId, sampleSize);

    const errorTypeMap = {};
    const topicMap = {};

    attempts.forEach(attempt => {
      if (!attempt.isCorrect) {
        // Track error types
        const errorType = attempt.errorType || 'UKENDT';
        errorTypeMap[errorType] = (errorTypeMap[errorType] || 0) + 1;

        // Track topics
        const topic = attempt.topic || 'Ukendt';
        topicMap[topic] = (topicMap[topic] || 0) + 1;
      }
    });

    // Format error types
    const errorTypeStats = Object.entries(errorTypeMap)
      .map(([errorType, count]) => ({
        errorType,
        errors: count,
        frequency: Math.round((count / attempts.length) * 100)
      }))
      .sort((a, b) => b.errors - a.errors);

    // Format topics
    const topicStats = Object.entries(topicMap)
      .map(([topic, count]) => ({
        topic,
        errors: count,
        frequency: Math.round((count / attempts.length) * 100)
      }))
      .sort((a, b) => b.errors - a.errors);

    return {
      errorTypes: errorTypeStats.slice(0, 5),
      topics: topicStats.slice(0, 5),
      sampledAttempts: attempts.length,
      totalErrors: attempts.filter(a => !a.isCorrect).length
    };
  } catch (error) {
    console.error('❌ Error analyzing weak spots:', error);
    return {
      errorTypes: [],
      topics: [],
      sampledAttempts: 0,
      totalErrors: 0
    };
  }
}

/**
 * Export user data for analysis/backup
 * @param {string} userId - User's Firebase UID
 * @returns {Promise<object>} Complete user data
 */
export async function exportUserData(userId) {
  try {
    const attempts = await getAllAttempts(userId);
    const stats = await getUserProgressStats(userId);
    const weakSpots = await analyzeWeakSpots(userId);

    return {
      userId,
      exportDate: new Date().toISOString(),
      stats,
      weakSpots,
      attempts,
      totalRecords: attempts.length
    };
  } catch (error) {
    console.error('❌ Error exporting user data:', error);
    throw error;
  }
}
