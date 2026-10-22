import React, { useState } from 'react';

/**
 * Lesson 1: Articles & Gender (en/et)
 * Phase 1 - Core Grammar Foundation
 * 6 sections teaching Danish article system
 */

const LESSON_SECTIONS = [
  {
    id: 'section1',
    title: 'How English Does It',
    type: 'explanation',
    content: (
      <div className="space-y-6">
        <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg">
          <h4 className="font-bold text-blue-900 mb-3">The English Article System</h4>
          <p className="text-blue-800 mb-4">English has just one article: "the" (definite) and "a/an" (indefinite).</p>

          <div className="space-y-3 bg-white p-4 rounded">
            <div className="flex gap-4">
              <div className="font-mono font-bold text-blue-600 w-12">✓</div>
              <div>
                <div className="font-semibold text-gray-900">The pen</div>
                <div className="text-sm text-gray-600">Definite - a specific pen we know</div>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="font-mono font-bold text-blue-600 w-12">✓</div>
              <div>
                <div className="font-semibold text-gray-900">A pen</div>
                <div className="text-sm text-gray-600">Indefinite - any pen, no specific one</div>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="font-mono font-bold text-[#007aff] w-12">✗</div>
              <div>
                <div className="font-semibold text-gray-900">Pen (no article)</div>
                <div className="text-sm text-gray-600">Not common - we usually need an article</div>
              </div>
            </div>
          </div>

          <p className="text-blue-800 mt-4 text-sm">
            <strong>Key point:</strong> English doesn't distinguish between "masculine" and "feminine" or "neuter" nouns. All nouns use the same articles.
          </p>
        </div>
      </div>
    )
  },

  {
    id: 'section2',
    title: 'How Danish Does It',
    type: 'explanation',
    content: (
      <div className="space-y-6">
        <div className="bg-[#f2f2f7] border-l-4 border-[#007aff] p-6 rounded-lg">
          <h4 className="font-bold text-[#121417] mb-3">The Danish Article System (en/et)</h4>
          <p className="text-[#121417] mb-4">Danish has <strong>gender</strong> — every noun is either <strong>common (en)</strong> or <strong>neuter (et)</strong>. This changes the article!</p>

          <div className="space-y-4 bg-white p-4 rounded mt-3">
            <div className="border-b pb-4">
              <div className="font-bold text-[#121417] mb-2 flex items-center gap-2">
                <span className="text-xl">🔴</span> Common Gender (en)
              </div>
              <div className="text-gray-700">
                <div className="font-mono text-sm mb-2">en mand</div>
                <div className="text-sm text-gray-600">a man (or: the man = manden)</div>
              </div>
              <div className="text-gray-700 mt-2">
                <div className="font-mono text-sm mb-2">en bog</div>
                <div className="text-sm text-gray-600">a book (or: the book = bogen)</div>
              </div>
            </div>

            <div>
              <div className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                <span className="text-xl">🔵</span> Neuter Gender (et)
              </div>
              <div className="text-gray-700">
                <div className="font-mono text-sm mb-2">et barn</div>
                <div className="text-sm text-gray-600">a child (or: the child = barnet)</div>
              </div>
              <div className="text-gray-700 mt-2">
                <div className="font-mono text-sm mb-2">et hus</div>
                <div className="text-sm text-gray-600">a house (or: the house = huset)</div>
              </div>
            </div>
          </div>

          <p className="text-[#121417] mt-4 text-sm bg-[#e5e5ea] p-3 rounded">
            <strong>⚠️ Important:</strong> When you learn a new Danish noun, you MUST learn its gender (en or et). This will become automatic with practice.
          </p>
        </div>
      </div>
    )
  },

  {
    id: 'section3',
    title: 'The Pattern: Indefinite Articles',
    type: 'explanation',
    content: (
      <div className="space-y-6">
        <h4 className="font-bold text-gray-900">Indefinite Articles (a/an)</h4>
        <p className="text-gray-700">Use <strong>en</strong> or <strong>et</strong> when introducing something new or non-specific:</p>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-red-50 p-4 rounded-lg border-2 border-red-200">
            <div className="font-bold text-red-900 mb-3">Common Gender (en)</div>
            <div className="space-y-2 text-sm">
              <div className="font-mono font-bold">en mand</div>
              <div className="text-gray-700">a man</div>
              <div className="font-mono font-bold mt-3">en dør</div>
              <div className="text-gray-700">a door</div>
              <div className="font-mono font-bold mt-3">en cykel</div>
              <div className="text-gray-700">a bicycle</div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
            <div className="font-bold text-blue-900 mb-3">Neuter Gender (et)</div>
            <div className="space-y-2 text-sm">
              <div className="font-mono font-bold">et barn</div>
              <div className="text-gray-700">a child</div>
              <div className="font-mono font-bold mt-3">et bord</div>
              <div className="text-gray-700">a table</div>
              <div className="font-mono font-bold mt-3">et vindue</div>
              <div className="text-gray-700">a window</div>
            </div>
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
          <p className="text-green-900 text-sm">
            <strong>Example in context:</strong><br/>
            "Jeg har <strong>en cykel</strong>" = I have a bicycle<br/>
            (introducing what you have - indefinite)
          </p>
        </div>
      </div>
    )
  },

  {
    id: 'section4',
    title: 'The Pattern: Definite Articles',
    type: 'explanation',
    content: (
      <div className="space-y-6">
        <h4 className="font-bold text-gray-900">Definite Articles (the)</h4>
        <p className="text-gray-700">Use <strong>-en</strong> or <strong>-et</strong> suffix when referring to something specific or known:</p>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-red-50 p-4 rounded-lg border-2 border-red-200">
            <div className="font-bold text-red-900 mb-3">Common Gender (add -en)</div>
            <div className="space-y-2 text-sm">
              <div>
                <div className="font-mono font-bold">manden</div>
                <div className="text-gray-700">the man</div>
              </div>
              <div className="mt-2">
                <div className="font-mono font-bold">døren</div>
                <div className="text-gray-700">the door</div>
              </div>
              <div className="mt-2">
                <div className="font-mono font-bold">cyklen</div>
                <div className="text-gray-700">the bicycle</div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
            <div className="font-bold text-blue-900 mb-3">Neuter Gender (add -et)</div>
            <div className="space-y-2 text-sm">
              <div>
                <div className="font-mono font-bold">barnet</div>
                <div className="text-gray-700">the child</div>
              </div>
              <div className="mt-2">
                <div className="font-mono font-bold">bordet</div>
                <div className="text-gray-700">the table</div>
              </div>
              <div className="mt-2">
                <div className="font-mono font-bold">vinduet</div>
                <div className="text-gray-700">the window</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
          <p className="text-green-900 text-sm">
            <strong>Example in context:</strong><br/>
            "Cyklen er blå" = The bicycle is blue<br/>
            (referring to a specific bicycle - definite)
          </p>
        </div>
      </div>
    )
  },

  {
    id: 'section5',
    title: 'Practice Exercises',
    type: 'exercise',
    content: (
      <ExerciseSection />
    )
  },

  {
    id: 'section6',
    title: 'Key Takeaways',
    type: 'summary',
    content: (
      <div className="space-y-4">
        <div className="bg-[#f2f2f7] p-6 rounded-lg border-2 border-[#e5e5ea]">
          <h4 className="font-bold text-[#121417] mb-4 flex items-center gap-2">
            <span className="text-xl">🎯</span> What You've Learned
          </h4>

          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="text-2xl">✓</div>
              <div>
                <div className="font-semibold text-gray-900">Two Genders</div>
                <div className="text-sm text-gray-700">Danish nouns are either common (en) or neuter (et)</div>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="text-2xl">✓</div>
              <div>
                <div className="font-semibold text-gray-900">Indefinite Articles</div>
                <div className="text-sm text-gray-700">Use "en" or "et" before a noun when it's new or general</div>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="text-2xl">✓</div>
              <div>
                <div className="font-semibold text-gray-900">Definite Articles</div>
                <div className="text-sm text-gray-700">Add "-en" or "-et" to the noun when it's specific or known</div>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="text-2xl">✓</div>
              <div>
                <div className="font-semibold text-gray-900">Learn Gender with Vocabulary</div>
                <div className="text-sm text-gray-700">Always memorize the article when you learn a new word</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500 text-sm text-blue-900">
          <strong>Next Step:</strong> In the next lesson, you'll learn about pronouns (jeg, du, han, hun, det, vi...) and how they change based on gender and case.
        </div>
      </div>
    )
  }
];

export default function Lesson1ArticlesGender({ onComplete, onNext }) {
  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState(new Set());
  const [exerciseAnswers, setExerciseAnswers] = useState({});

  const handleSectionComplete = () => {
    const newCompleted = new Set(completedSections);
    newCompleted.add(currentSection);
    setCompletedSections(newCompleted);
  };

  const moveToNextSection = () => {
    handleSectionComplete();
    if (currentSection < LESSON_SECTIONS.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      // Lesson complete
      onComplete?.();
    }
  };

  const currentLessonSection = LESSON_SECTIONS[currentSection];
  const progressPercent = ((currentSection + 1) / LESSON_SECTIONS.length) * 100;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 border-b-4 border-[#007aff]">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Lesson 1: Articles & Gender
            </h1>
            <p className="text-gray-600 mt-2">Learn the Danish gender system (en/et)</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">SECTION {currentSection + 1} / {LESSON_SECTIONS.length}</div>
            <div className="text-2xl font-bold text-[#007aff]">{Math.round(progressPercent)}%</div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
          <div
            className="bg-[#f2f2f7] h-full transition-all"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Meta */}
        <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
          <span>⏱️ 40 minutes</span>
          <span>📚 Grammar</span>
          <span>📊 A1 Level</span>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {currentLessonSection.title}
        </h2>

        <div className="prose prose-sm max-w-none">
          {currentLessonSection.content}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-4 justify-between">
        <button
          onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
          disabled={currentSection === 0}
          className="px-6 py-3 rounded-lg border-2 border-gray-300 text-gray-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
        >
          ← Previous Section
        </button>

        <div className="flex gap-2">
          {LESSON_SECTIONS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSection(idx)}
              className={`w-8 h-8 rounded-full font-bold text-sm transition-colors ${
                idx === currentSection
                  ? 'bg-[#007aff] text-white'
                  : completedSections.has(idx)
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {completedSections.has(idx) ? '✓' : idx + 1}
            </button>
          ))}
        </div>

        <button
          onClick={moveToNextSection}
          className="px-6 py-3 rounded-lg bg-[#f2f2f7] text-white font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
        >
          {currentSection === LESSON_SECTIONS.length - 1 ? 'Complete Lesson →' : 'Next Section →'}
        </button>
      </div>
    </div>
  );
}

function ExerciseSection() {
  const [answers, setAnswers] = useState({});
  const exercises = [
    { id: 'ex1', question: 'Which article? "_____ mand" (a man)', options: ['en', 'et'], correct: 'en' },
    { id: 'ex2', question: 'Definite form: "mand" → "_____" (the man)', options: ['manden', 'mannet'], correct: 'manden' },
    { id: 'ex3', question: 'Which article? "_____ barn" (a child)', options: ['en', 'et'], correct: 'et' },
    { id: 'ex4', question: 'Definite form: "barn" → "_____" (the child)', options: ['barnen', 'barnet'], correct: 'barnet' },
  ];

  return (
    <div className="space-y-4">
      {exercises.map((ex) => (
        <div key={ex.id} className="p-4 border-2 border-gray-200 rounded-lg hover:border-[#e5e5ea] transition-colors">
          <p className="font-semibold text-gray-900 mb-3">{ex.question}</p>
          <div className="flex gap-2">
            {ex.options.map((opt) => (
              <button
                key={opt}
                onClick={() => setAnswers({...answers, [ex.id]: opt})}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  answers[ex.id] === opt
                    ? answers[ex.id] === ex.correct
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
