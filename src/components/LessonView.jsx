import { useState, useMemo, useEffect } from 'react';
import { useAdaptiveDifficulty } from '../hooks/useAdaptiveDifficulty';
import V2InversionLesson from './lessons/V2InversionLesson';
import PrepositionsLesson from './lessons/PrepositionsLesson';
import ListeningLesson from './lessons/ListeningLesson';
import VerbSystemLesson from './lessons/VerbSystemLesson';
import RealWorldListeningLesson from './lessons/RealWorldListeningLesson';
import ReadingComprehensionLesson from './lessons/ReadingComprehensionLesson';
import GrammarDeepDiveLesson from './lessons/GrammarDeepDiveLesson';
import VocabularyCultureLesson from './lessons/VocabularyCultureLesson';
import SpeakingPracticeLesson from './lessons/SpeakingPracticeLesson';

// Lesson System — interactive lessons with explanation + exercises
// Each lesson: ~30-40 min, balanced grammar/vocab/listening, mixed exercise types

const LESSON_TEMPLATES = [
  {
    id: 'v2-inversion',
    title: 'V2 Inversion — Word Order',
    category: 'grammar',
    description: 'Learn why the Danish verb always comes second, and how to build sentences correctly.',
    duration: '35 min',
    difficulty: 'A2',
    component: V2InversionLesson,
    prerequisite: null, // First lesson, no prerequisite
    unlockScore: 0
  },
  {
    id: 'prepositions',
    title: 'Prepositions — I, På, Ved',
    category: 'grammar',
    description: 'Master the most common prepositions and when to use each one.',
    duration: '40 min',
    difficulty: 'A2',
    component: PrepositionsLesson,
    prerequisite: 'v2-inversion', // Unlocks after V2 Inversion
    unlockScore: 70 // Requires 70% or higher
  },
  {
    id: 'listening',
    title: 'Listening — Comprehension',
    category: 'listening',
    description: 'Understand natural Danish speech: question words, key phrases, and real conversations.',
    duration: '35 min',
    difficulty: 'A2',
    component: ListeningLesson,
    prerequisite: 'v2-inversion', // Unlocks after V2 Inversion
    unlockScore: 70 // Requires 70% or higher
  },
  {
    id: 'verb-system',
    title: 'Verb System — Present vs. Past',
    category: 'grammar',
    description: 'Master regular and strong verbs, modals, and auxiliary verbs in Danish.',
    duration: '35 min',
    difficulty: 'A2',
    component: VerbSystemLesson,
    prerequisite: 'prepositions', // Unlocks after Prepositions
    unlockScore: 70 // Requires 70% or higher
  },
  {
    id: 'real-world-listening',
    title: 'Real-world Listening',
    category: 'listening',
    description: 'Understand natural-speed Danish in restaurants, shops, transit, and casual conversations.',
    duration: '40 min',
    difficulty: 'A2',
    component: RealWorldListeningLesson,
    prerequisite: 'verb-system', // Unlocks after Verb System
    unlockScore: 70 // Requires 70% or higher
  },
  {
    id: 'reading-comprehension',
    title: 'Reading Comprehension',
    category: 'reading',
    description: 'Read authentic Danish texts: news, emails, menus, signs, forms, and everyday writing.',
    duration: '40 min',
    difficulty: 'A2',
    component: ReadingComprehensionLesson,
    prerequisite: 'real-world-listening', // Unlocks after Real-world Listening
    unlockScore: 70 // Requires 70% or higher
  },
  {
    id: 'grammar-deep-dive',
    title: 'Grammar Deep-dive — Advanced Tenses & Conditionals',
    category: 'grammar',
    description: 'Master conditional tenses, hypotheticals, and complex sentence structures in Danish.',
    duration: '40 min',
    difficulty: 'B1',
    component: GrammarDeepDiveLesson,
    prerequisite: 'reading-comprehension', // Unlocks after Reading Comprehension
    unlockScore: 70 // Requires 70% or higher
  },
  {
    id: 'vocabulary-culture',
    title: 'Vocabulary & Culture — Idioms, Slang & Values',
    category: 'vocabulary',
    description: 'Learn Danish idioms, slang, and cultural expressions. Understand values like hygge, janteloven, and direct communication.',
    duration: '40 min',
    difficulty: 'B1',
    component: VocabularyCultureLesson,
    prerequisite: 'grammar-deep-dive', // Unlocks after Grammar Deep-dive
    unlockScore: 70 // Requires 70% or higher
  },
  {
    id: 'speaking-practice',
    title: 'Speaking Practice — Conversational Fluency',
    category: 'speaking',
    description: 'Master natural speech patterns, dialogue flow, and confident speaking across everyday scenarios.',
    duration: '40 min',
    difficulty: 'B1',
    component: SpeakingPracticeLesson,
    prerequisite: 'vocabulary-culture', // Unlocks after Vocabulary & Culture
    unlockScore: 70 // Requires 70% or higher
  }
];

export default function LessonView({ onBackToDashboard, userId }) {
  const [currentLessonId, setCurrentLessonId] = useState(null);
  const [lessonProgress, setLessonProgress] = useState({});
  const [initialDifficulty, setInitialDifficulty] = useState(2); // A2 level start
  const [difficultyAdjustment, setDifficultyAdjustment] = useState(null);

  // Initialize adaptive difficulty
  const {
    currentDifficulty,
    mastery,
    weakSpot,
    recordAttempt,
    checkDifficultyAdjustment
  } = useAdaptiveDifficulty(userId, initialDifficulty, []);

  // Load lesson progress from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('dansk_lesson_progress');
      if (stored) {
        setLessonProgress(JSON.parse(stored));
      }
    } catch {
      setLessonProgress({});
    }
  }, []);

  // Save lesson progress to localStorage whenever it changes
  useEffect(() => {
    if (Object.keys(lessonProgress).length > 0) {
      localStorage.setItem('dansk_lesson_progress', JSON.stringify(lessonProgress));
    }
  }, [lessonProgress]);

  // Determine which lessons are unlocked based on prerequisites
  const lessonsWithUnlockStatus = useMemo(() => {
    return LESSON_TEMPLATES.map(lesson => {
      let unlocked = true;
      let lockedReason = '';

      if (lesson.prerequisite) {
        const prereqProgress = lessonProgress[lesson.prerequisite];
        if (!prereqProgress || !prereqProgress.completed) {
          unlocked = false;
          const prereqLesson = LESSON_TEMPLATES.find(l => l.id === lesson.prerequisite);
          lockedReason = `Complete "${prereqLesson.title}" first`;
        } else if (prereqProgress.score < lesson.unlockScore) {
          unlocked = false;
          lockedReason = `Score ${lesson.unlockScore}%+ on prerequisite (you got ${prereqProgress.score}%)`;
        }
      }

      return { ...lesson, unlocked, lockedReason };
    });
  }, [lessonProgress]);

  const currentLesson = useMemo(() => {
    if (!currentLessonId) return null;
    return lessonsWithUnlockStatus.find(l => l.id === currentLessonId);
  }, [currentLessonId, lessonsWithUnlockStatus]);

  const handleLessonComplete = async (score) => {
    const updatedProgress = {
      ...lessonProgress,
      [currentLessonId]: { completed: true, score, date: new Date().toISOString(), difficulty: currentDifficulty }
    };
    setLessonProgress(updatedProgress);
    localStorage.setItem('dansk_lesson_progress', JSON.stringify(updatedProgress));

    // Check for difficulty adjustment after lesson
    const adjustment = await checkDifficultyAdjustment();
    if (adjustment) {
      setDifficultyAdjustment(adjustment);
      // Show adjustment notification for 3 seconds
      setTimeout(() => setDifficultyAdjustment(null), 3000);
    }

    // Return to menu after 1.5 seconds
    setTimeout(() => {
      setCurrentLessonId(null);
    }, 1500);
  };

  const handleAttemptRecorded = async (attemptData) => {
    try {
      await recordAttempt(attemptData);
    } catch (error) {
      console.error('Failed to record attempt:', error);
    }
  };

  if (currentLesson && currentLesson.component) {
    const Component = currentLesson.component;
    return (
      <>
        {/* Difficulty Adjustment Notification */}
        {difficultyAdjustment && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-in">
            <div className={`px-4 py-3 rounded-lg text-white text-sm font-medium ${
              difficultyAdjustment.newDifficulty > difficultyAdjustment.oldDifficulty
                ? 'bg-green-600'
                : 'bg-blue-600'
            }`}>
              {difficultyAdjustment.newDifficulty > difficultyAdjustment.oldDifficulty
                ? '⬆️ Sværhedsgrad øget!'
                : '⬅️ Sværhedsgrad tilpasset'}
              {' • '}{difficultyAdjustment.reason}
            </div>
          </div>
        )}
        {/* Weak Spot Alert */}
        {weakSpot && (
          <div className="fixed top-14 left-1/2 transform -translate-x-1/2 z-50 animate-in">
            <div className="px-4 py-2 rounded-lg bg-[#e5e5ea] border border-[#e5e5ea] text-[#121417] text-sm font-medium">
              ⚠️ Svagt punkt opdaget: {weakSpot.errorType} ({Math.round(weakSpot.frequency * 100)}%)
            </div>
          </div>
        )}
        <Component
          lesson={currentLesson}
          onComplete={handleLessonComplete}
          onBack={() => setCurrentLessonId(null)}
          onAttemptRecorded={handleAttemptRecorded}
          currentDifficulty={currentDifficulty}
        />
      </>
    );
  }

  // Lesson Menu
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[600px] mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBackToDashboard}
            className="w-10 h-10 rounded-full bg-gray-100 grid place-items-center text-gray-900 font-[600]"
            aria-label="Back"
          >
            ←
          </button>
          <h1 className="text-[28px] font-[700]">Lessons</h1>
          <div className="w-10"></div>
        </div>

        {/* Progress Overview */}
        <div className="bg-gray-50 rounded-[12px] p-4 border border-gray-200 mb-6">
          <div className="text-[11px] text-gray-600 font-[600] mb-2 uppercase tracking-widest">
            Your Learning Progress
          </div>
          <div className="grid grid-cols-4 gap-3">
            <div className="text-center">
              <div className="text-[24px] font-[700] text-green-600">
                {Object.values(lessonProgress).filter(p => p.completed).length}
              </div>
              <div className="text-[12px] text-gray-600">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-[24px] font-[700] text-blue-600">
                {lessonsWithUnlockStatus.filter(l => l.unlocked).length}
              </div>
              <div className="text-[12px] text-gray-600">Unlocked</div>
            </div>
            <div className="text-center">
              <div className="text-[24px] font-[700] text-gray-900">
                {Object.values(lessonProgress).length > 0
                  ? Math.round(Object.values(lessonProgress).reduce((sum, p) => sum + (p.score || 0), 0) / Object.values(lessonProgress).length)
                  : 0}%
              </div>
              <div className="text-[12px] text-gray-600">Avg Score</div>
            </div>
            <div className="text-center">
              <div className="text-[24px] font-[700] text-purple-600">
                {Math.round(mastery)}%
              </div>
              <div className="text-[12px] text-gray-600">Mastery</div>
            </div>
          </div>
        </div>

        {/* Available Lessons */}
        <div className="mb-6">
          <h2 className="text-[11px] font-[700] tracking-widest uppercase text-gray-600 mb-3">
            Grammar & Listening
          </h2>
          <div className="space-y-3">
            {lessonsWithUnlockStatus.map((lesson, idx) => {
              const progress = lessonProgress[lesson.id];
              const isCompleted = progress?.completed;
              const score = progress?.score;

              return (
                <div key={lesson.id}>
                  <button
                    onClick={() => {
                      if (lesson.unlocked && lesson.component) {
                        setCurrentLessonId(lesson.id);
                      }
                    }}
                    disabled={!lesson.unlocked || !lesson.component}
                    className={`w-full p-4 rounded-[12px] border text-left transition-all ${
                      isCompleted
                        ? 'bg-green-50 border-green-200'
                        : lesson.unlocked && lesson.component
                        ? 'bg-white border-gray-200 hover:border-gray-300 cursor-pointer'
                        : 'bg-gray-50 border-gray-200 opacity-60 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-[14px] font-[700] text-gray-900">{lesson.title}</h3>
                          {idx + 1 <= lessonsWithUnlockStatus.length && (
                            <span className="text-[11px] font-[600] text-gray-500">#{idx + 1}</span>
                          )}
                        </div>
                        <p className="text-[12px] text-gray-600 mt-1">{lesson.description}</p>
                      </div>
                      {isCompleted && (
                        <div className="ml-3 text-right">
                          <div className="text-[14px] font-[700] text-green-700">✓</div>
                          <div className="text-[11px] text-green-700 font-[600]">{score}%</div>
                        </div>
                      )}
                      {!lesson.unlocked && (
                        <div className="ml-3 text-[18px]">
                          🔒
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-gray-500">
                      <span className="px-2 py-1 bg-gray-100 rounded-full font-[600]">
                        {lesson.difficulty}
                      </span>
                      <span>•</span>
                      <span>{lesson.duration}</span>
                    </div>
                  </button>

                  {!lesson.unlocked && (
                    <div className="mt-2 px-4 py-2 bg-[#f2f2f7] rounded-[8px] border border-[#e5e5ea]">
                      <p className="text-[12px] text-[#121417]">
                        <strong>Locked:</strong> {lesson.lockedReason}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Guidance */}
        <div className="bg-blue-50 rounded-[12px] p-4 border border-blue-200 mb-6">
          <div className="text-[12px] text-gray-900 leading-[1.6]">
            <strong>How it works:</strong> Each lesson explains a grammar topic, bridges it to English, then gives you exercises to practice. Complete all exercises to unlock the next lesson.
          </div>
        </div>
      </div>
    </div>
  );
}
