/**
 * VIDEO EXPLANATIONS LIBRARY
 * Phase 4: Links exercise categories to explanation videos
 *
 * Videos hosted on YouTube (unlisted playlist)
 * Each category has 1-3 videos covering different difficulty levels
 */

export const videoExplanations = {
  // === ORD (Vocabulary) ===
  ORD: {
    name: 'Vocabulary (Ordforråd)',
    videos: [
      {
        id: 'ORD_BASICS',
        title: 'Common Errors with Articles: en vs et',
        difficulty: 'A1',
        youtubeId: 'TODO_ORD_A1',
        duration: 120,
        description: 'Learn why Danish has two articles and how to choose correctly',
        relatedExercises: ['ORD_001', 'ORD_002', 'ORD_003']
      },
      {
        id: 'ORD_COMMON_VERBS',
        title: 'Essential Verbs: at arbejde, at bo, at gå',
        difficulty: 'A1',
        youtubeId: 'TODO_ORD_VERBS',
        duration: 90,
        description: 'Master the most common Danish verbs with pronunciation',
        relatedExercises: ['ORD_A2_001', 'ORD_A2_002', 'ORD_A2_003']
      },
      {
        id: 'ORD_COLLOCATIONS',
        title: 'Common Collocations: at spille en rolle, at have svært ved',
        difficulty: 'B1',
        youtubeId: 'TODO_ORD_B1',
        duration: 120,
        description: 'Phrases that native speakers use naturally',
        relatedExercises: ['ORD_B1_001', 'ORD_B1_002']
      }
    ]
  },

  // === KONJ (Conjunctions) ===
  KONJ: {
    name: 'Conjunctions (Konjunktioner)',
    videos: [
      {
        id: 'KONJ_BASICS',
        title: 'The Three "og/men/eller" - Simple Conjunctions',
        difficulty: 'A1',
        youtubeId: 'TODO_KONJ_A1',
        duration: 100,
        description: 'And, but, or - when to use each one',
        relatedExercises: ['KONJ_A1_001', 'KONJ_A1_002', 'KONJ_A1_003']
      },
      {
        id: 'KONJ_COMPLEX',
        title: 'Complex Conjunctions: da, mens, selvom, fordi',
        difficulty: 'A2',
        youtubeId: 'TODO_KONJ_A2',
        duration: 140,
        description: 'When, while, because, even if - with examples and exercises',
        relatedExercises: ['KONJ_A2_001', 'KONJ_A2_002', 'KONJ_A2_003']
      },
      {
        id: 'KONJ_ADVANCED',
        title: 'Advanced Structures: ikke kun... men også, så længe',
        difficulty: 'B1',
        youtubeId: 'TODO_KONJ_B1',
        duration: 130,
        description: 'Not only... but also and advanced conditional patterns',
        relatedExercises: ['KONJ_B1_001', 'KONJ_B1_002']
      }
    ]
  },

  // === PRON (Pronouns) ===
  PRON: {
    name: 'Pronouns (Pronominer)',
    videos: [
      {
        id: 'PRON_BASICS',
        title: 'Subject and Object Pronouns: jeg, han, hende, det',
        difficulty: 'A1',
        youtubeId: 'TODO_PRON_A1',
        duration: 110,
        description: 'I, he, she, it - subject vs object positions',
        relatedExercises: ['PRON_A1_001', 'PRON_A1_002']
      },
      {
        id: 'PRON_REFLEXIVE',
        title: 'Reflexive Pronouns: sin, sit, sine vs hans, hendes',
        difficulty: 'A2',
        youtubeId: 'TODO_PRON_A2',
        duration: 150,
        description: 'The trickiest Danish grammar - sin/sit/sine explained clearly',
        relatedExercises: ['PRON_A2_001', 'PRON_A2_002', 'PRON_A2_003']
      },
      {
        id: 'PRON_ADVANCED',
        title: 'Reciprocal Pronouns: hinanden, advanced reflexives',
        difficulty: 'B1',
        youtubeId: 'TODO_PRON_B1',
        duration: 120,
        description: 'Each other and complex pronoun situations',
        relatedExercises: ['PRON_B1_001', 'PRON_B1_002']
      }
    ]
  },

  // === PREP (Prepositions) ===
  PREP: {
    name: 'Prepositions (Præpositioner)',
    videos: [
      {
        id: 'PREP_I_PA',
        title: 'The i/på distinction: In vs On in Danish',
        difficulty: 'A1',
        youtubeId: 'TODO_PREP_A1',
        duration: 120,
        description: 'i København vs på en ø - location prepositions clarified',
        relatedExercises: ['PREP_A1_001', 'PREP_A1_002']
      },
      {
        id: 'PREP_TIME',
        title: 'Time Prepositions: i, på, om, til, siden',
        difficulty: 'A2',
        youtubeId: 'TODO_PREP_TIME',
        duration: 110,
        description: 'When to use each preposition for temporal expressions',
        relatedExercises: ['PREP_A2_001', 'PREP_A2_002']
      },
      {
        id: 'PREP_EXPRESSIONS',
        title: 'Phrasal Patterns: tro på, være kendt for, arbejde inden for',
        difficulty: 'B1',
        youtubeId: 'TODO_PREP_B1',
        duration: 130,
        description: 'Common phrases with prepositions that native speakers use',
        relatedExercises: ['PREP_B1_001', 'PREP_B1_002']
      }
    ]
  },

  // === PASS (Passive) ===
  PASS: {
    name: 'Passive Voice (Passiv)',
    videos: [
      {
        id: 'PASS_INTRO',
        title: 'Introduction to Danish Passive: blive + past participle',
        difficulty: 'A2',
        youtubeId: 'TODO_PASS_A2',
        duration: 130,
        description: 'How Danish forms passive voice - simple explanation with examples',
        relatedExercises: ['PASS_A1_001', 'PASS_A2_001']
      }
    ]
  },

  // === MOD (Modal Verbs) ===
  MOD: {
    name: 'Modal Verbs (Modale Verber)',
    videos: [
      {
        id: 'MOD_BASICS',
        title: 'Modal Verbs: skal, vil, kan, må, burde',
        difficulty: 'A1',
        youtubeId: 'TODO_MOD_A1',
        duration: 140,
        description: 'Must, will, can, may - meaning and usage in Danish',
        relatedExercises: []
      }
    ]
  },

  // === ARTKV (Articles & Gender) ===
  ARTKV: {
    name: 'Articles & Gender (Artikler og Køn)',
    videos: [
      {
        id: 'ARTKV_INTRO',
        title: 'Danish Article System: en, et, den, det, de',
        difficulty: 'A1',
        youtubeId: 'TODO_ARTKV_A1',
        duration: 150,
        description: 'Why Danish has two genders and how articles work with them',
        relatedExercises: ['ARTKV_A1_001', 'ARTKV_A1_002']
      }
    ]
  },

  // === KOMP (Comparison) ===
  KOMP: {
    name: 'Comparative & Superlative (Komparativ & Superlativ)',
    videos: [
      {
        id: 'KOMP_REGULAR',
        title: 'Regular Comparatives: -er and -est endings',
        difficulty: 'A1',
        youtubeId: 'TODO_KOMP_A1',
        duration: 120,
        description: 'Bigger, biggest - regular comparison formation',
        relatedExercises: ['KOMP_001', 'KOMP_002']
      },
      {
        id: 'KOMP_IRREGULAR',
        title: 'Irregular Comparatives: god/bedre/bedst, lille/mindre/mindst',
        difficulty: 'A2',
        youtubeId: 'TODO_KOMP_A2',
        duration: 130,
        description: 'Common exceptions to the -er/-est rule',
        relatedExercises: ['KOMP_003', 'KOMP_004']
      }
    ]
  }
};

/**
 * Get videos for a specific category
 */
export function getVideosForCategory(category) {
  return videoExplanations[category] || null;
}

/**
 * Get a specific video by ID
 */
export function getVideoById(videoId) {
  for (const category of Object.values(videoExplanations)) {
    const video = category.videos?.find(v => v.id === videoId);
    if (video) return video;
  }
  return null;
}

/**
 * Get videos for a specific difficulty level
 */
export function getVideosByDifficulty(difficulty) {
  const videos = [];
  for (const category of Object.values(videoExplanations)) {
    const categoryVideos = category.videos
      ?.filter(v => v.difficulty === difficulty)
      .map(v => ({ ...v, category: category.name })) || [];
    videos.push(...categoryVideos);
  }
  return videos;
}

/**
 * Get all available videos (for video library page)
 */
export function getAllVideos() {
  const videos = [];
  for (const [categoryKey, category] of Object.entries(videoExplanations)) {
    category.videos?.forEach(video => {
      videos.push({
        ...video,
        categoryKey,
        categoryName: category.name
      });
    });
  }
  return videos;
}

/**
 * Check if YouTube video ID is set (not TODO)
 */
export function isVideoReady(videoId) {
  const video = getVideoById(videoId);
  if (!video) return false;
  return !video.youtubeId.startsWith('TODO');
}

/**
 * Get YouTube embed URL
 */
export function getYouTubeEmbedUrl(youtubeId) {
  if (!youtubeId || youtubeId.startsWith('TODO')) {
    return null;
  }
  return `https://www.youtube.com/embed/${youtubeId}?rel=0`;
}
