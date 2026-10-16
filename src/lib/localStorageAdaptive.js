/**
 * LocalStorage-based adaptive difficulty tracking
 * Stores exercise attempts and user progress in browser localStorage
 */

/**
 * Store a single exercise attempt
 * @param {string} userId - User's ID
 * @param {object} attemptData - Attempt data from exercise
 * @returns {Promise<string>} ID of created attempt
 */
export async function storeAttempt(userId, attemptData) {
  try {
    const attempts = JSON.parse(localStorage.getItem(`attempts_${userId}`) || '[]');

    const attempt = {
      id: Date.now().toString(),
      user_id: userId,
      lesson_type: attemptData.lessonType,
      topic: attemptData.topic,
      exercise_id: attemptData.exerciseId,
      is_correct: attemptData.isCorrect,
      response_time: attemptData.responseTimeMs,
      confidence: attemptData.confidence,
      error_type: attemptData.errorType || null,
      timestamp: new Date().toISOString()
    };

    attempts.push(attempt);
    localStorage.setItem(`attempts_${userId}`, JSON.stringify(attempts));

    console.log('✓ Attempt stored:', attempt.id);
    return attempt.id;
  } catch (error) {
    console.error('❌ Error storing attempt:', error);
    throw error;
  }
}

/**
 * Get recent attempts for difficulty calculation
 * @param {string} userId - User's ID
 * @param {number} count - Number of recent attempts to fetch (default: 3)
 * @returns {Promise<Array>} Array of attempts
 */
export async function getRecentAttempts(userId, count = 3) {
  try {
    const attempts = JSON.parse(localStorage.getItem(`attempts_${userId}`) || '[]');
    return attempts.slice(-count).reverse();
  } catch (error) {
    console.error('❌ Error fetching recent attempts:', error);
    return [];
  }
}

/**
 * Get all attempts for a user
 * @param {string} userId - User's ID
 * @returns {Promise<Array>} All attempts ordered by timestamp
 */
export async function getAllAttempts(userId) {
  try {
    const attempts = JSON.parse(localStorage.getItem(`attempts_${userId}`) || '[]');
    return attempts;
  } catch (error) {
    console.error('❌ Error fetching all attempts:', error);
    return [];
  }
}

/**
 * Get attempts for a specific topic
 * @param {string} userId - User's ID
 * @param {string} topic - Topic name
 * @returns {Promise<Array>} Attempts for that topic
 */
export async function getAttemptsByTopic(userId, topic) {
  try {
    const attempts = JSON.parse(localStorage.getItem(`attempts_${userId}`) || '[]');
    return attempts.filter(a => a.topic === topic);
  } catch (error) {
    console.error(`❌ Error fetching attempts for topic ${topic}:`, error);
    return [];
  }
}

/**
 * Get user's progress stats for dashboard
 * @param {string} userId - User's ID
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

    const correctCount = attempts.filter(a => a.is_correct).length;
    const accuracy = (correctCount / attempts.length) * 100;

    // Calculate topics progression
    const topicMap = {};
    attempts.forEach(attempt => {
      if (attempt.topic) {
        const correct = attempt.is_correct ? 1 : 0;
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

    return {
      totalExercises: attempts.length,
      correctExercises: correctCount,
      accuracy: Math.round(accuracy),
      currentDifficulty: 5,
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
 * @param {string} userId - User's ID
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

    const correctCount = recentAttempts.filter(a => a.is_correct).length;
    const accuracy = correctCount / recentAttempts.length;

    let reasoning = '';
    let difficulty = 5; // Start at medium

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
 * @param {string} userId - User's ID
 * @param {number} sampleSize - Number of recent attempts to analyze (default: 10)
 * @returns {Promise<object>} Weak spots ranked by frequency
 */
export async function analyzeWeakSpots(userId, sampleSize = 10) {
  try {
    const attempts = await getRecentAttempts(userId, sampleSize);

    const errorTypeMap = {};
    const topicMap = {};

    attempts.forEach(attempt => {
      if (!attempt.is_correct) {
        const errorType = attempt.error_type || 'UKENDT';
        errorTypeMap[errorType] = (errorTypeMap[errorType] || 0) + 1;

        const topic = attempt.topic || 'Ukendt';
        topicMap[topic] = (topicMap[topic] || 0) + 1;
      }
    });

    const errorTypeStats = Object.entries(errorTypeMap)
      .map(([errorType, count]) => ({
        errorType,
        errors: count,
        frequency: Math.round((count / attempts.length) * 100)
      }))
      .sort((a, b) => b.errors - a.errors);

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
      totalErrors: attempts.filter(a => !a.is_correct).length
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
 * @param {string} userId - User's ID
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
