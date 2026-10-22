import React, { useMemo } from 'react';

/**
 * PostAssessmentDashboard — Personalized dashboard shown after diagnostic test
 * Shows skill breakdown, recommendations, and Phase 1 lesson roadmap
 * Adaptive content based on assessment results
 */

export default function PostAssessmentDashboard({ onStartLesson }) {
  const diagnosticData = JSON.parse(localStorage.getItem('dansk_diagnostic') || '{}');
  const scores = diagnosticData.scores || { reading: 0, grammar: 0, listening: 0, speaking: 0 };
  const overallLevel = diagnosticData.overallLevel || 'A1';

  // Determine lowest skill to recommend focus
  const lowestSkill = useMemo(() => {
    const skills = Object.entries(scores)
      .sort(([, a], [, b]) => a - b);
    return skills[0];
  }, [scores]);

  const skillLevelMap = (score) => {
    if (score >= 80) return 'B1';
    if (score >= 65) return 'A2';
    return 'A1';
  };

  // Phase 1 lessons ordered by recommendation
  const phase1Lessons = [
    { id: 'articles', title: 'Articles & Gender', subtitle: 'en / et', category: 'grammar', difficulty: 'A1', duration: '40 min', recommended: true },
    { id: 'pronouns', title: 'Pronouns', subtitle: 'jeg, du, han, hun, det, vi, I, de', category: 'grammar', difficulty: 'A1', duration: '40 min', recommended: false },
    { id: 'present-past', title: 'Present & Past Tense', subtitle: 'Basic verb conjugation', category: 'grammar', difficulty: 'A1', duration: '40 min', recommended: false },
    { id: 'perfect-tense', title: 'Perfect Tense', subtitle: 'har + past participle', category: 'grammar', difficulty: 'A2', duration: '40 min', recommended: false },
    { id: 'v2-word-order', title: 'V2 Word Order', subtitle: 'Danish word order rules', category: 'grammar', difficulty: 'A2', duration: '40 min', recommended: false },
    { id: 'subordinate-clauses', title: 'Subordinate Clauses', subtitle: 'Ledsætninger', category: 'grammar', difficulty: 'A2', duration: '40 min', recommended: false },
    { id: 'adjectives', title: 'Adjectives', subtitle: 'Agreement & inflection', category: 'grammar', difficulty: 'A2', duration: '40 min', recommended: false },
    { id: 'prepositions', title: 'Prepositions', subtitle: 'i, på, ved, fra, til', category: 'grammar', difficulty: 'A2', duration: '40 min', recommended: false },
    { id: 'negation', title: 'Negation', subtitle: 'ikke, intet, ingen', category: 'grammar', difficulty: 'A2', duration: '40 min', recommended: false },
    { id: 'listening-speaking', title: 'Listening & Speaking Foundations', subtitle: 'Pronunciation & common phrases', category: 'listening', difficulty: 'A1', duration: '40 min', recommended: lowestSkill[0] === 'listening' || lowestSkill[0] === 'speaking' },
  ];

  const getRecommendationText = () => {
    const [skill, score] = lowestSkill;
    const skillName = skill.charAt(0).toUpperCase() + skill.slice(1);

    if (skill === 'listening') {
      return `Your listening is the lowest score (${score}%). We recommend starting with our Listening & Speaking Foundations lesson to build confidence with Danish pronunciation and natural speech patterns.`;
    } else if (skill === 'speaking') {
      return `Your speaking is the lowest score (${score}%). Build confidence by practicing with our Listening & Speaking Foundations lesson, featuring pronunciation guidance and common conversation phrases.`;
    } else if (skill === 'grammar') {
      return `Your grammar score is ${score}%. Start with Articles & Gender, the foundation for all Danish sentence structures.`;
    } else {
      return `Your reading score is ${score}%. Begin with Articles & Gender to solidify grammatical foundations, which will improve your reading comprehension.`;
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Welcome Section */}
      <section className="bg-[#f2f2f7] rounded-2xl p-8 sm:p-12 text-white shadow-lg">
        <div>
          <p className="text-[#8e8e93] font-medium text-sm mb-2 uppercase tracking-wide">Assessment Complete</p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">
            Welcome to Your Learning Path
          </h1>
          <p className="text-lg text-[#8e8e93] mb-6 max-w-2xl">
            Based on your assessment, we've personalized a learning path tailored to strengthen your weaker areas and build on your strengths.
          </p>

          <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white">
            <span className="text-2xl font-bold">{overallLevel}</span>
            <span className="text-sm">Overall Level</span>
          </div>
        </div>
      </section>

      {/* Skills Breakdown Section */}
      <section className="bg-white rounded-2xl shadow-sm p-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Your Skills Breakdown</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {['reading', 'grammar', 'listening', 'speaking'].map(skill => (
            <div key={skill} className={`p-6 rounded-xl text-center border-2 ${
              lowestSkill[0] === skill
                ? 'bg-red-50 border-red-200'
                : 'bg-slate-50 border-slate-200'
            }`}>
              <div className={`text-4xl font-bold mb-2 ${
                lowestSkill[0] === skill
                  ? 'text-red-600'
                  : 'text-[#007aff]'
              }`}>
                {scores[skill]}%
              </div>
              <div className="font-semibold text-slate-900 capitalize mb-2">
                {skill}
              </div>
              <div className={`text-sm font-medium ${
                lowestSkill[0] === skill
                  ? 'text-red-700'
                  : 'text-slate-600'
              }`}>
                {skillLevelMap(scores[skill])}
              </div>

              {/* Progress bar */}
              <div className="mt-3 w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all ${
                    lowestSkill[0] === skill
                      ? 'bg-red-500'
                      : 'bg-[#f2f2f7]'
                  }`}
                  style={{ width: `${scores[skill]}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Recommendation Box */}
        <div className="bg-[#f2f2f7] border-l-4 border-[#007aff] p-6 rounded-lg">
          <h3 className="font-semibold text-[#121417] mb-2 flex items-center gap-2">
            <span className="text-xl">💡</span>
            Personalized Recommendation
          </h3>
          <p className="text-[#121417] leading-relaxed">
            {getRecommendationText()}
          </p>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          label="Phase 1 Lessons"
          value={phase1Lessons.length}
          subtitle="Core grammar + skills"
          icon="📚"
        />
        <StatCard
          label="Time per Lesson"
          value="40 min"
          subtitle="Complete at your pace"
          icon="⏱️"
        />
        <StatCard
          label="Your Level"
          value={overallLevel}
          subtitle={`${overallLevel === 'A1' ? 'Building foundations' : overallLevel === 'A2' ? 'Getting comfortable' : 'Solid skills'}`}
          icon="📈"
        />
      </section>

      {/* Phase 1 Lessons */}
      <section className="bg-white rounded-2xl shadow-sm p-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Phase 1 — Core Grammar & Skills</h2>

        <div className="space-y-4">
          {phase1Lessons.map((lesson, idx) => (
            <button
              key={lesson.id}
              onClick={() => onStartLesson?.(lesson.id)}
              className={`w-full text-left p-6 rounded-xl border-2 transition-all ${
                lesson.recommended
                  ? 'bg-[#f2f2f7] border-[#e5e5ea] hover:shadow-md hover:border-[#007aff]'
                  : 'bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  {/* Lesson Number */}
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                    lesson.recommended
                      ? 'bg-[#007aff] text-white'
                      : 'bg-slate-200 text-slate-700'
                  }`}>
                    {idx + 1}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-slate-900">
                        {lesson.title}
                      </h3>
                      {lesson.recommended && (
                        <span className="inline-flex items-center gap-1 bg-[#007aff] text-white text-xs px-2 py-1 rounded-full">
                          <span>⭐</span> For You
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-600">
                      {lesson.subtitle}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-600">
                      <span className="font-medium">{lesson.category}</span>
                      <span>•</span>
                      <span>{lesson.difficulty} Level</span>
                      <span>•</span>
                      <span>{lesson.duration}</span>
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <div className="text-slate-400 flex-shrink-0 text-lg">
                  →
                </div>
              </div>
            </button>
          ))}
        </div>

        <p className="text-sm text-slate-600 mt-6 text-center">
          Complete Phase 1 in 2-3 weeks at your own pace. Phase 2 & 3 coming soon with advanced grammar and exam prep.
        </p>
      </section>

      {/* Getting Started CTA */}
      <section className="bg-[#f2f2f7] rounded-2xl p-8 sm:p-12 text-white text-center">
        <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
        <p className="text-slate-300 mb-8 max-w-xl mx-auto">
          Your personalized learning path is ready. Start with Lesson 1 and build your Danish skills week by week.
        </p>
        <button
          onClick={() => onStartLesson?.('articles')}
          className="bg-[#f2f2f7] text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
        >
          Start Lesson 1: Articles & Gender →
        </button>
      </section>
    </div>
  );
}

function StatCard({ label, value, subtitle, icon }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
      <div className="text-3xl mb-3">{icon}</div>
      <div className="text-4xl font-bold text-[#007aff] mb-2">
        {value}
      </div>
      <div className="font-semibold text-slate-900 mb-1">
        {label}
      </div>
      {subtitle && (
        <div className="text-sm text-slate-600">
          {subtitle}
        </div>
      )}
    </div>
  );
}
