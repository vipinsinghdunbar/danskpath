import { useState, useMemo } from 'react';
import V2InversionLesson from './lessons/V2InversionLesson';
import PrepositionsLesson from './lessons/PrepositionsLesson';
import ListeningLesson from './lessons/ListeningLesson';

// Lesson System — interactive lessons with explanation + exercises
// Each lesson: ~30-40 min, balanced grammar/vocab/listening, mixed exercise types

const LESSONS = [
  {
    id: 'v2-inversion',
    title: 'V2 Inversion — Word Order',
    category: 'grammar',
    description: 'Learn why the Danish verb always comes second, and how to build sentences correctly.',
    duration: '35 min',
    difficulty: 'A2',
    component: V2InversionLesson,
    unlocked: true,
    completed: false
  },
  {
    id: 'prepositions',
    title: 'Prepositions — I, På, Ved',
    category: 'grammar',
    description: 'Master the most common prepositions and when to use each one.',
    duration: '40 min',
    difficulty: 'A2',
    component: PrepositionsLesson,
    unlocked: true,
    completed: false
  },
  {
    id: 'listening',
    title: 'Listening — Comprehension',
    category: 'listening',
    description: 'Understand natural Danish speech: question words, key phrases, and real conversations.',
    duration: '35 min',
    difficulty: 'A2',
    component: ListeningLesson,
    unlocked: true,
    completed: false
  }
];

export default function LessonView({ onBackToDashboard }) {
  const [currentLessonId, setCurrentLessonId] = useState(null);
  const [lessonProgress, setLessonProgress] = useState({});

  const currentLesson = useMemo(() => {
    if (!currentLessonId) return null;
    return LESSONS.find(l => l.id === currentLessonId);
  }, [currentLessonId]);

  const handleLessonComplete = (score) => {
    setLessonProgress(prev => ({
      ...prev,
      [currentLessonId]: { completed: true, score, date: new Date().toISOString() }
    }));
    // Mark lesson as completed in state
    setTimeout(() => {
      setCurrentLessonId(null);
    }, 1500);
  };

  if (currentLesson && currentLesson.component) {
    const Component = currentLesson.component;
    return (
      <Component
        lesson={currentLesson}
        onComplete={handleLessonComplete}
        onBack={() => setCurrentLessonId(null)}
      />
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
            Your Progress
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <div className="text-[24px] font-[700] text-gray-900">
                {Object.values(lessonProgress).filter(p => p.completed).length}
              </div>
              <div className="text-[12px] text-gray-600">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-[24px] font-[700] text-gray-900">
                {LESSONS.filter(l => l.unlocked).length}
              </div>
              <div className="text-[12px] text-gray-600">Available</div>
            </div>
            <div className="text-center">
              <div className="text-[24px] font-[700] text-gray-900">
                {Math.round(Object.values(lessonProgress).reduce((sum, p) => sum + (p.score || 0), 0) / Math.max(Object.keys(lessonProgress).length, 1))}%
              </div>
              <div className="text-[12px] text-gray-600">Avg Score</div>
            </div>
          </div>
        </div>

        {/* Available Lessons */}
        <div className="mb-6">
          <h2 className="text-[11px] font-[700] tracking-widest uppercase text-gray-600 mb-3">
            Grammar & Listening
          </h2>
          <div className="space-y-3">
            {LESSONS.map(lesson => {
              const progress = lessonProgress[lesson.id];
              const isCompleted = progress?.completed;
              const score = progress?.score;

              return (
                <button
                  key={lesson.id}
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
                      : 'bg-gray-50 border-gray-200 opacity-50 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="text-[14px] font-[700] text-gray-900">{lesson.title}</h3>
                      <p className="text-[12px] text-gray-600 mt-1">{lesson.description}</p>
                    </div>
                    {isCompleted && (
                      <div className="ml-3 text-right">
                        <div className="text-[14px] font-[700] text-green-700">✓</div>
                        <div className="text-[11px] text-green-700 font-[600]">{score}%</div>
                      </div>
                    )}
                    {!lesson.unlocked && (
                      <div className="ml-3 text-[12px] text-gray-500 font-[600]">
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
