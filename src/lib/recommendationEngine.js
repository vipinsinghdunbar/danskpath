/**
 * Lesson Recommendation Engine
 * Analyzes user performance and recommends next lessons based on error patterns
 */

import { getAllCategories } from './completeGrammarExercises';

/**
 * Calculate error frequency by category
 */
export function analyzeErrorPatterns(userId = 'vipin') {
  const errorLog = JSON.parse(localStorage.getItem(`dansk_error_log_${userId}`) || '[]');
  const errorFrequency = {};

  errorLog.forEach(entry => {
    const code = entry.errorCode;
    if (!errorFrequency[code]) {
      errorFrequency[code] = {
        count: 0,
        lessons: [],
        questions: []
      };
    }
    errorFrequency[code].count++;
    if (!errorFrequency[code].lessons.includes(entry.lessonTitle)) {
      errorFrequency[code].lessons.push(entry.lessonTitle);
    }
    errorFrequency[code].questions.push(entry.exercise);
  });

  return errorFrequency;
}

/**
 * Get weakest categories (most errors)
 */
export function getWeakSpots(userId = 'vipin', topN = 5) {
  const errorPatterns = analyzeErrorPatterns(userId);

  return Object.entries(errorPatterns)
    .map(([code, data]) => ({
      category: code,
      errorCount: data.count,
      lessonsAffected: data.lessons.length,
      sampleErrors: data.questions.slice(0, 3)
    }))
    .sort((a, b) => b.errorCount - a.errorCount)
    .slice(0, topN);
}

/**
 * Get strongest categories (fewest errors)
 */
export function getStrengths(userId = 'vipin') {
  const progress = JSON.parse(localStorage.getItem(`dansk_user_progress_${userId}`) || '{}');
  const errorPatterns = analyzeErrorPatterns(userId);

  const categories = getAllCategories();
  const strengths = [];

  categories.forEach(cat => {
    const errors = errorPatterns[cat.code]?.count || 0;
    const lessons = Object.values(progress).filter(p => p.categoryCode === cat.code).length;

    if (lessons > 0) {
      const accuracy = lessons > 0
        ? Object.values(progress)
            .filter(p => p.categoryCode === cat.code)
            .reduce((sum, p) => sum + (p.accuracy || 0), 0) / lessons
        : 0;

      strengths.push({
        category: cat.code,
        categoryName: cat.name,
        accuracy: Math.round(accuracy),
        lessonsCompleted: lessons,
        errors: errors
      });
    }
  });

  return strengths
    .sort((a, b) => b.accuracy - a.accuracy)
    .filter(s => s.accuracy >= 80)
    .slice(0, 3);
}

/**
 * Get recommended lessons based on weak spots and learning progress
 */
export function getRecommendedLessons(userId = 'vipin') {
  const progress = JSON.parse(localStorage.getItem(`dansk_user_progress_${userId}`) || '{}');
  const allLessons = JSON.parse(localStorage.getItem('dansk_admin_lessons') || '[]');
  const weakSpots = getWeakSpots(userId, 3);
  const errorPatterns = analyzeErrorPatterns(userId);

  const recommendations = [];

  // For each weak spot, recommend lessons from that category
  weakSpots.forEach(weakSpot => {
    const relatedLessons = allLessons.filter(lesson => lesson.category === weakSpot.category);

    relatedLessons.forEach(lesson => {
      const lessonProgress = progress[lesson.id] || {};

      // Skip if already completed with 90%+ accuracy
      if (lessonProgress.completed && lessonProgress.accuracy >= 90) {
        return;
      }

      recommendations.push({
        lessonId: lesson.id,
        lessonTitle: lesson.title,
        category: lesson.category,
        priority: weakSpot.errorCount, // Higher error count = higher priority
        reason: `You had ${weakSpot.errorCount} errors in ${weakSpot.category}`,
        currentAccuracy: lessonProgress.accuracy || 0,
        attempts: lessonProgress.attempts || 0,
        difficulty: lesson.difficulty,
        completed: lessonProgress.completed || false
      });
    });
  });

  // Sort by priority (error count) then by difficulty
  return recommendations
    .sort((a, b) => {
      if (b.priority !== a.priority) return b.priority - a.priority;
      return a.attempts - b.attempts; // Prioritize less attempted lessons
    })
    .slice(0, 10); // Top 10 recommendations
}

/**
 * Get "Practice Weak Spots" mode - random exercises from weak categories
 */
export function getWeakSpotExercises(userId = 'vipin', count = 10) {
  const weakSpots = getWeakSpots(userId, 3);
  const exercises = [];

  // This would need integration with exercise database
  // For now, return metadata for UI to fetch exercises
  return {
    exerciseCount: count,
    categories: weakSpots.map(w => w.category),
    estimatedTime: Math.round((count * 90) / 60), // ~90 seconds per exercise
    difficulty: 'focused'
  };
}

/**
 * Get learning statistics
 */
export function getLearningStats(userId = 'vipin') {
  const progress = JSON.parse(localStorage.getItem(`dansk_user_progress_${userId}`) || '{}');
  const errorLog = JSON.parse(localStorage.getItem(`dansk_error_log_${userId}`) || '[]');

  const stats = {
    totalLessons: Object.keys(progress).length,
    completedLessons: Object.values(progress).filter(p => p.completed).length,
    totalAttempts: Object.values(progress).reduce((sum, p) => sum + (p.attempts || 0), 0),
    totalErrors: errorLog.length,
    averageAccuracy: 0,
    totalTimeSpent: 0,
    lastPracticeDate: null,
    streakDays: 0
  };

  if (stats.totalLessons > 0) {
    stats.averageAccuracy = Math.round(
      Object.values(progress).reduce((sum, p) => sum + (p.accuracy || 0), 0) / stats.totalLessons
    );
  }

  stats.totalTimeSpent = Object.values(progress).reduce((sum, p) => sum + (p.timeSpent || 0), 0);

  if (errorLog.length > 0) {
    const dates = errorLog.map(e => new Date(e.date).toDateString());
    stats.lastPracticeDate = dates[dates.length - 1];
  }

  return stats;
}

/**
 * Determine next recommended difficulty level
 */
export function getNextDifficultyLevel(userId = 'vipin') {
  const stats = getLearningStats(userId);

  if (stats.averageAccuracy >= 85) {
    return 'advanced';
  } else if (stats.averageAccuracy >= 70) {
    return 'intermediate';
  } else {
    return 'beginner';
  }
}

/**
 * Get personalized learning path
 */
export function getLearningPath(userId = 'vipin') {
  const progress = JSON.parse(localStorage.getItem(`dansk_user_progress_${userId}`) || '{}');
  const proficiencyTest = JSON.parse(localStorage.getItem(`dansk_proficiency_tests_${userId}`) || '[]');

  const currentLevel = localStorage.getItem(`dansk_current_level_${userId}`) || 'Unknown';
  const stats = getLearningStats(userId);
  const nextDifficulty = getNextDifficultyLevel(userId);

  const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const currentLevelIndex = levels.indexOf(currentLevel);
  const nextLevel = currentLevelIndex < levels.length - 1 ? levels[currentLevelIndex + 1] : 'C2';

  // Estimate lessons needed to reach next level (based on average accuracy)
  const estimatedLessonsToNextLevel = Math.max(1, Math.round(10 / (stats.averageAccuracy || 50) * 100));

  return {
    currentLevel,
    nextLevel,
    progress: {
      lessonsCompleted: stats.completedLessons,
      estimatedLessonsToNextLevel,
      averageAccuracy: stats.averageAccuracy,
      errorRate: stats.totalErrors / Math.max(1, stats.totalAttempts)
    },
    suggestedDifficulty: nextDifficulty,
    lastTestDate: proficiencyTest.length > 0 ? proficiencyTest[proficiencyTest.length - 1].testDate : null,
    recommendations: getRecommendedLessons(userId)
  };
}

/**
 * Get achievement badges
 */
export function getAchievements(userId = 'vipin') {
  const stats = getLearningStats(userId);
  const achievements = [];

  if (stats.totalLessons >= 1) achievements.push({ id: 'first_lesson', name: 'First Lesson', emoji: '🎉' });
  if (stats.totalLessons >= 5) achievements.push({ id: 'five_lessons', name: 'Five Lessons', emoji: '📚' });
  if (stats.totalLessons >= 10) achievements.push({ id: 'ten_lessons', name: 'Ten Lessons', emoji: '🏆' });
  if (stats.averageAccuracy >= 90) achievements.push({ id: 'accuracy_master', name: 'Accuracy Master', emoji: '🎯' });
  if (stats.totalErrors === 0) achievements.push({ id: 'perfect_start', name: 'Perfect Start', emoji: '⭐' });
  if (stats.totalAttempts >= 50) achievements.push({ id: 'dedicated_learner', name: 'Dedicated Learner', emoji: '💪' });

  return achievements;
}
