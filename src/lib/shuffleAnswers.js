// Shuffle answers utility — fixes correct answer always being first option
// Randomizes correct answer position to prevent pattern learning

export function shuffleOptions(question, seed = null) {
  // Create array of options with original indices
  const optionsWithIndex = question.options.map((opt, idx) => ({
    text: opt,
    originalIndex: idx,
    isCorrect: idx === question.a
  }));

  // Fisher-Yates shuffle with optional seed for consistency per user
  const shuffled = [...optionsWithIndex];
  let random = seed ? seededRandom(seed) : Math.random;
  if (typeof random === 'function' && seed) {
    // seeded random
  } else {
    random = Math.random;
  }

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor((typeof random === 'function' ? random() : Math.random()) * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // Find new correct index
  const newCorrectIndex = shuffled.findIndex(opt => opt.isCorrect);
  
  return {
    ...question,
    options: shuffled.map(opt => opt.text),
    a: newCorrectIndex,
    originalCorrectIndex: question.a
  };
}

function seededRandom(seed) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  let state = Math.abs(hash);
  return function() {
    state = (state * 9301 + 49297) % 233280;
    return state / 233280;
  };
}

export function shuffleQuestionSet(questions, userSeed = null) {
  return questions.map((q, idx) => {
    const seed = userSeed ? `${userSeed}_${q.id}_${idx}` : `${q.id}_${idx}_${Date.now()}`;
    return shuffleOptions(q, seed);
  });
}

// Test that randomization works
export function testRandomization() {
  const testQ = {
    id: 'test',
    q: 'Test question',
    options: ['Correct', 'Wrong1', 'Wrong2', 'Wrong3'],
    a: 0
  };
  
  const results = [];
  for (let i = 0; i < 20; i++) {
    const shuffled = shuffleOptions(testQ, `seed_${i}`);
    results.push(shuffled.a);
  }
  
  const distribution = results.reduce((acc, pos) => {
    acc[pos] = (acc[pos] || 0) + 1;
    return acc;
  }, {});
  
  return {
    results,
    distribution,
    isRandom: Object.keys(distribution).length > 1 && Math.max(...Object.values(distribution)) < 15,
    message: Object.keys(distribution).length > 1 ? '✅ Answers randomized' : '❌ Still fixed pattern'
  };
}
