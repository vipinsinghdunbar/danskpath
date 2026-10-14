import { useState, useMemo } from 'react';

// Learning Roadmap — MVP Phase 2: Generate personalized learning path from assessment results
// Uses assessment results to create a structured learning path covering all Danish language competencies

const LEARNING_MODULES = {
  'A1-Foundation': {
    title: 'A1 Foundation',
    description: 'Basic Danish fundamentals',
    estimatedHours: 20,
    topics: [
      { name: 'Numbers 0-100', hours: 2 },
      { name: 'Common greetings & basic phrases', hours: 2 },
      { name: 'Personal pronouns', hours: 2 },
      { name: 'Simple present tense', hours: 3 },
      { name: 'Basic vocabulary (family, food, colors)', hours: 4 },
      { name: 'Listening: slow speech patterns', hours: 3 },
      { name: 'Reading: simple texts', hours: 2 },
    ]
  },
  'A2-Elementary': {
    title: 'A2 Elementary',
    description: 'Elementary communication skills',
    estimatedHours: 25,
    topics: [
      { name: 'V2 inversion (word order)', hours: 4 },
      { name: 'Present & past tense variations', hours: 4 },
      { name: 'Prepositions (i, på, ved)', hours: 3 },
      { name: 'Plural forms & articles', hours: 3 },
      { name: 'Common collocations & phrases', hours: 3 },
      { name: 'Listening: daily conversations', hours: 3 },
      { name: 'Reading: short messages & simple texts', hours: 2 },
      { name: 'Writing: basic sentences & messages', hours: 3 },
      { name: 'Pronunciation: Danish sound patterns', hours: 2 },
    ]
  },
  'B1-Intermediate': {
    title: 'B1 Intermediate',
    description: 'Independent communication',
    estimatedHours: 35,
    topics: [
      { name: 'Ledsætning (subordinate clauses)', hours: 4 },
      { name: 'Sin/sit/sine (reflexive possessives)', hours: 3 },
      { name: 'Modal particles (jo, da, vel)', hours: 4 },
      { name: 'Particle verbs & phrasal verbs', hours: 4 },
      { name: 'Advanced collocations & idioms', hours: 4 },
      { name: 'Listening: news, conversations, media', hours: 4 },
      { name: 'Reading: articles, stories, longer texts', hours: 4 },
      { name: 'Writing: paragraphs with arguments', hours: 4 },
      { name: 'Speaking: presentations & discussions', hours: 3 },
      { name: 'Cultural context & Danish customs', hours: 3 },
    ]
  },
  'B2-Upper-Intermediate': {
    title: 'B2 Upper Intermediate',
    description: 'Fluent communication',
    estimatedHours: 40,
    topics: [
      { name: 'Complex sentence structures', hours: 5 },
      { name: 'Conditional & subjunctive moods', hours: 4 },
      { name: 'Advanced pronunciation & intonation', hours: 3 },
      { name: 'Literary & formal language', hours: 5 },
      { name: 'Listening: Danish radio, podcasts, films', hours: 5 },
      { name: 'Reading: literature, academic texts', hours: 5 },
      { name: 'Writing: essays, formal letters, creative writing', hours: 5 },
      { name: 'Speaking: nuanced conversations & debates', hours: 4 },
      { name: 'Danish culture, literature & history', hours: 4 },
    ]
  },
  'C1-Advanced': {
    title: 'C1 Advanced',
    description: 'Mastery level Danish',
    estimatedHours: 50,
    topics: [
      { name: 'Subtle grammatical nuances', hours: 6 },
      { name: 'Regional dialects & variations', hours: 4 },
      { name: 'Professional & technical language', hours: 6 },
      { name: 'Listening: complex media, accents, dialects', hours: 6 },
      { name: 'Reading: complex literature & academic work', hours: 6 },
      { name: 'Writing: sophisticated essays & creative works', hours: 6 },
      { name: 'Speaking: native-like fluency', hours: 6 },
      { name: 'Danish society, politics & culture', hours: 4 },
    ]
  },
};

const FOCUS_AREAS = {
  grammar: {
    label: 'Grammar',
    color: '#3B82F6', // blue
    bgColor: '#EFF6FF',
    topics: ['V2 inversion', 'Ledsætning', 'Sin/sit/sine', 'Modal particles', 'Verb conjugation', 'Word order', 'Prepositions']
  },
  vocab: {
    label: 'Vocabulary',
    color: '#8B5CF6', // purple
    bgColor: '#FAF5FF',
    topics: ['Numbers', 'Collocations', 'Particle verbs', 'Idioms', 'Daily vocabulary', 'Professional terms', 'Academic language']
  },
  listening: {
    label: 'Listening',
    color: '#EC4899', // pink
    bgColor: '#FDF2F8',
    topics: ['Slow speech', 'Conversations', 'Media', 'Phone Danish', 'Accents', 'Rapid speech', 'Understanding nuance']
  },
  reading: {
    label: 'Reading',
    color: '#F59E0B', // amber
    bgColor: '#FFFBF0',
    topics: ['Simple texts', 'Messages', 'Articles', 'Stories', 'Literature', 'Academic texts']
  },
  writing: {
    label: 'Writing',
    color: '#10B981', // emerald
    bgColor: '#F0FDF4',
    topics: ['Messages', 'Sentences', 'Paragraphs', 'Essays', 'Letters', 'Creative writing']
  },
  pronunciation: {
    label: 'Pronunciation',
    color: '#06B6D4', // cyan
    bgColor: '#F0F9FA',
    topics: ['Danish sounds', 'Intonation', 'Stress patterns', 'Regional accents', 'Speech rhythm']
  },
};

export default function LearningRoadmapView({ onRetake, onStartLessons }) {
  const [expandedModule, setExpandedModule] = useState(null);

  // Get assessment results from localStorage
  const verdict = useMemo(() => {
    try {
      const stored = localStorage.getItem('dansk_verdict');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }, []);

  const diagnostic = useMemo(() => {
    try {
      const stored = localStorage.getItem('dansk_diagnostic');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }, []);

  // Determine learning path based on assessment results
  const learningPath = useMemo(() => {
    if (!verdict) return [];

    const startingLevel = verdict.level;
    const modules = [];

    // Determine which modules to include
    if (startingLevel === 'Modul 1') {
      modules.push('A1-Foundation', 'A2-Elementary', 'B1-Intermediate');
    } else if (startingLevel === 'Modul 2') {
      modules.push('A2-Elementary', 'B1-Intermediate', 'B2-Upper-Intermediate');
    } else if (startingLevel === 'Modul 3') {
      modules.push('B1-Intermediate', 'B2-Upper-Intermediate', 'C1-Advanced');
    } else {
      modules.push('B2-Upper-Intermediate', 'C1-Advanced');
    }

    return modules.map(key => ({
      key,
      ...LEARNING_MODULES[key]
    }));
  }, [verdict]);

  // Identify focus areas based on weaknesses
  const focusAreas = useMemo(() => {
    if (!verdict || !verdict.weaknesses) return [];
    return verdict.weaknesses.filter(w => FOCUS_AREAS[w]).map(w => ({
      key: w,
      ...FOCUS_AREAS[w]
    }));
  }, [verdict]);

  // Calculate total hours
  const totalHours = useMemo(() => {
    return learningPath.reduce((sum, module) => sum + module.estimatedHours, 0);
  }, [learningPath]);

  if (!verdict || !diagnostic) {
    return (
      <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[var(--muted)]">No assessment data found. Please take the assessment first.</p>
          <button
            onClick={onRetake}
            className="mt-4 px-6 py-2 bg-[var(--ink)] text-white rounded-full font-[600]"
          >
            Take Assessment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)]">
      {/* Header */}
      <div className="max-w-[600px] mx-auto px-4 pt-6 pb-8">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onRetake}
            className="w-10 h-10 rounded-full bg-white border border-[var(--border)] grid place-items-center"
            aria-label="Back"
          >
            ←
          </button>
          <span className="text-[11px] font-[700] tracking-widest uppercase bg-[var(--ink)] text-white px-3 py-1.5 rounded-full">
            Your Learning Roadmap
          </span>
        </div>

        {/* Results Summary */}
        <div className="mb-8">
          <div className="text-[11px] font-[700] tracking-widest uppercase text-[var(--muted)] mb-2">
            Assessment Results
          </div>
          <h1 className="text-[32px] font-[700] tracking-tight leading-[0.95] mb-4">
            Your starting point:<br />
            {verdict.level}
          </h1>
          <p className="text-[14px] leading-[1.6] text-[var(--ink-secondary)] mb-4">
            Based on your performance ({verdict.pct}% accuracy on core questions), here's your personalized learning roadmap to become proficient in Danish.
          </p>

          {/* Key stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-white rounded-[12px] p-3 border border-[var(--border)] text-center">
              <div className="text-[11px] text-[var(--muted)] font-[600] mb-1">Accuracy</div>
              <div className="text-[24px] font-[700]">{verdict.pct}%</div>
            </div>
            <div className="bg-white rounded-[12px] p-3 border border-[var(--border)] text-center">
              <div className="text-[11px] text-[var(--muted)] font-[600] mb-1">Total Hours</div>
              <div className="text-[24px] font-[700]">{totalHours}h</div>
            </div>
            <div className="bg-white rounded-[12px] p-3 border border-[var(--border)] text-center">
              <div className="text-[11px] text-[var(--muted)] font-[600] mb-1">Modules</div>
              <div className="text-[24px] font-[700]">{learningPath.length}</div>
            </div>
          </div>
        </div>

        {/* Strengths & Weaknesses */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <div className="bg-[#ECFDF5] rounded-[12px] p-4 border border-[#059669]/20">
            <div className="text-[11px] font-[700] uppercase text-[#059669] mb-2">Strengths</div>
            <div className="space-y-1">
              {verdict.strengths.length ? (
                verdict.strengths.map((s, i) => (
                  <div key={i} className="text-[13px] font-[600] capitalize">
                    ✓ {s}
                  </div>
                ))
              ) : (
                <div className="text-[12px] text-[var(--muted)]">Continue practicing</div>
              )}
            </div>
          </div>
          <div className="bg-[#FFFBEB] rounded-[12px] p-4 border border-[#D97706]/20">
            <div className="text-[11px] font-[700] uppercase text-[#D97706] mb-2">Focus Areas</div>
            <div className="space-y-1">
              {focusAreas.length ? (
                focusAreas.map((a, i) => (
                  <div key={i} className="text-[13px] font-[600]">
                    • {a.label}
                  </div>
                ))
              ) : (
                <div className="text-[12px] text-[var(--muted)]">Balanced skills</div>
              )}
            </div>
          </div>
        </div>

        {/* Learning Modules */}
        <div className="mb-8">
          <div className="text-[11px] font-[700] tracking-widest uppercase text-[var(--muted)] mb-4">
            Your Learning Path
          </div>
          <div className="space-y-3">
            {learningPath.map((module, idx) => (
              <div key={module.key} className="bg-white rounded-[12px] border border-[var(--border)] overflow-hidden">
                <button
                  onClick={() => setExpandedModule(expandedModule === module.key ? null : module.key)}
                  className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-[var(--bg)] transition-colors"
                >
                  <div>
                    <div className="text-[13px] font-[700]">
                      {idx + 1}. {module.title}
                    </div>
                    <div className="text-[12px] text-[var(--muted)] mt-1">
                      {module.estimatedHours} hours • {module.topics.length} topics
                    </div>
                  </div>
                  <div className="text-[20px]">
                    {expandedModule === module.key ? '−' : '+'}
                  </div>
                </button>

                {expandedModule === module.key && (
                  <div className="px-4 py-4 bg-[var(--bg)] border-t border-[var(--border)]">
                    <div className="text-[12px] text-[var(--ink-secondary)] mb-3">
                      {module.description}
                    </div>
                    <div className="space-y-2">
                      {module.topics.map((topic, i) => (
                        <div key={i} className="flex items-center justify-between text-[12px]">
                          <span className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--muted)]"></span>
                            {topic.name}
                          </span>
                          <span className="text-[var(--muted)] font-[600]">{topic.hours}h</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Focus Areas Detail */}
        {focusAreas.length > 0 && (
          <div className="mb-8">
            <div className="text-[11px] font-[700] tracking-widest uppercase text-[var(--muted)] mb-4">
              Recommended Focus
            </div>
            <div className="space-y-2">
              {focusAreas.map((area) => (
                <div
                  key={area.key}
                  className="rounded-[12px] p-3 border"
                  style={{
                    backgroundColor: area.bgColor,
                    borderColor: area.color + '30',
                  }}
                >
                  <div
                    className="text-[13px] font-[700] mb-2"
                    style={{ color: area.color }}
                  >
                    {area.label}
                  </div>
                  <div className="text-[12px] text-[var(--ink-secondary)]">
                    {area.topics.slice(0, 4).join(' • ')}
                    {area.topics.length > 4 && `... and ${area.topics.length - 4} more`}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="pb-6 space-y-3">
          <button
            onClick={onStartLessons}
            className="w-full bg-[var(--ink)] text-white py-3 rounded-full font-[600] text-[16px]"
          >
            Start Learning →
          </button>
          <button
            onClick={onRetake}
            className="w-full bg-white border border-[var(--border)] py-3 rounded-full font-[600] text-[14px]"
          >
            Retake Assessment
          </button>
        </div>
      </div>
    </div>
  );
}
