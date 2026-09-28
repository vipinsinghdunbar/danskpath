// Verdict Engine — determines level beyond simple percentage
// Two learners can both score 80% but have different strengths/weaknesses

export function calculateVerdict(answers, questionBank, timeSpent) {
  // answers: { questionId: selectedOption }
  // questionBank: array of questions with category, type, level, difficulty
  
  let correct = 0;
  const byCategory = {}; // grammar, vocab, listening, reading, writing, culture
  const byType = {}; // V2, Ledsætning, Sin, etc.
  const byLevel = { A1: { correct: 0, total: 0 }, A2: { correct: 0, total: 0 }, B1: { correct: 0, total: 0 }, B2: { correct: 0, total: 0 } };
  const byDifficulty = { easy: { correct: 0, total: 0 }, medium: { correct: 0, total: 0 }, hard: { correct: 0, total: 0 } };
  const wrongDetails = [];
  const correctDetails = [];

  questionBank.forEach(q => {
    const userAns = answers[q.id];
    if(userAns === undefined) return;
    
    const isCorrect = userAns === q.a;
    if(isCorrect) correct++;
    
    // Category
    if(!byCategory[q.category]) byCategory[q.category] = { correct: 0, total: 0, questions: [] };
    byCategory[q.category].total++;
    byCategory[q.category].questions.push(q);
    if(isCorrect) byCategory[q.category].correct++;
    
    // Type
    if(!byType[q.type]) byType[q.type] = { correct: 0, total: 0 };
    byType[q.type].total++;
    if(isCorrect) byType[q.type].correct++;
    
    // Level
    const lvl = q.level || 'A2';
    if(!byLevel[lvl]) byLevel[lvl] = { correct: 0, total: 0 };
    byLevel[lvl].total++;
    if(isCorrect) byLevel[lvl].correct++;
    
    // Difficulty
    const diff = q.difficulty || (q.level==='A1'?'easy':q.level==='B2'?'hard':'medium');
    if(!byDifficulty[diff]) byDifficulty[diff] = { correct: 0, total: 0 };
    byDifficulty[diff].total++;
    if(isCorrect) byDifficulty[diff].correct++;
    
    if(isCorrect) correctDetails.push(q);
    else wrongDetails.push({ question: q, userAnswer: userAns });
  });

  const total = Object.keys(answers).length;
  const pct = total ? Math.round(correct/total*100) : 0;

  // Category percentages
  const categoryPct = {};
  Object.entries(byCategory).forEach(([cat, stats])=>{
    categoryPct[cat] = Math.round(stats.correct/stats.total*100);
  });

  // Level percentages
  const levelPct = {};
  Object.entries(byLevel).forEach(([lvl, stats])=>{
    if(stats.total>0) levelPct[lvl] = Math.round(stats.correct/stats.total*100);
  });

  // Determine overall level — not just pct, but per-level performance
  let level = "Modul 2 (A1-A2)";
  let confidence = 'low';
  
  // Logic: need good performance at lower levels to be higher level
  // If A1 <60%, can't be B1 even if overall 80% (maybe guessed)
  if((levelPct.A1||0) < 50) {
    level = "Modul 1 (A1)";
    confidence = 'high';
  } else if((levelPct.A1||0) >= 70 && (levelPct.A2||0) < 60) {
    level = "Modul 2 (A1-A2)";
    confidence = (levelPct.A1>=80)?'high':'medium';
  } else if((levelPct.A2||0) >= 65 && (levelPct.B1||0) < 60) {
    level = "Modul 3 (A2)";
    confidence = (levelPct.A2>=75)?'high':'medium';
  } else if((levelPct.B1||0) >= 65 && (levelPct.B2||0) < 60) {
    level = "Modul 4 (B1)";
    confidence = (levelPct.B1>=75)?'high':'medium';
  } else if((levelPct.B1||0) >= 70 && (levelPct.B2||0) >= 60) {
    level = "Modul 5 (B1-B2) - PD3 klar";
    confidence = (levelPct.B2>=70)?'high':'medium';
  } else {
    // Fallback to pct
    if(pct < 40) level = "Modul 2 (A1-A2)";
    else if(pct < 65) level = "Modul 3 (A2)";
    else if(pct < 80) level = "Modul 4 (B1)";
    else level = "Modul 5 (B1-B2) - PD3 klar";
    confidence = 'medium';
  }

  // Strengths / Weaknesses — per category <60% is weakness, >=70% strength
  const strengths = [];
  const weaknesses = [];
  const borderline = [];
  
  Object.entries(categoryPct).forEach(([cat, p])=>{
    if(p >= 75) strengths.push({ category: cat, pct: p, evidence: byCategory[cat] });
    else if(p < 60) weaknesses.push({ category: cat, pct: p, evidence: byCategory[cat], types: getWeakTypesInCategory(cat, byType, wrongDetails) });
    else borderline.push({ category: cat, pct: p });
  });

  // Also per type weaknesses
  const typeWeaknesses = [];
  Object.entries(byType).forEach(([type, stats])=>{
    const p = Math.round(stats.correct/stats.total*100);
    if(p < 60 && stats.total>=2) typeWeaknesses.push({ type, pct: p, total: stats.total });
  });

  // Consistency check — did learner guess?
  const isConsistent = checkConsistency(byLevel, byDifficulty);
  
  // Time check — handle array or empty
  let timePerQ = 0;
  let timeFlag = 'normal';
  try {
    if (Array.isArray(timeSpent) && timeSpent.length > 0) {
      const totalTime = timeSpent.reduce((sum, t) => sum + (typeof t === 'number' ? t : 0), 0);
      timePerQ = totalTime / (timeSpent.length || 1);
    } else if (typeof timeSpent === 'number') {
      timePerQ = timeSpent;
    } else {
      timePerQ = 12; // default
    }
    timeFlag = timePerQ < 8 ? 'too fast — maybe guessing' : timePerQ > 60 ? 'slow — careful' : 'normal';
  } catch {
    timePerQ = 12;
    timeFlag = 'normal';
  }

  // Recommended path — based on weaknesses, not just pct
  const recommendedPath = buildPath(weaknesses, typeWeaknesses, level);

  // Timeline — based on weaknesses count and level
  const timeline = buildTimeline(level, weaknesses.length, pct);

  // Verdict explanation
  const explanation = buildExplanation(level, pct, categoryPct, levelPct, strengths, weaknesses, isConsistent, timeFlag);

  return {
    correct,
    total,
    pct,
    level,
    confidence,
    byCategory,
    categoryPct,
    byType,
    byLevel,
    levelPct,
    byDifficulty,
    strengths,
    weaknesses,
    borderline,
    typeWeaknesses,
    wrongDetails,
    correctDetails,
    isConsistent,
    timePerQ,
    timeFlag,
    recommendedPath,
    timeline,
    explanation
  };
}

function getWeakTypesInCategory(category, byType, wrongDetails) {
  // Find which types within this category are weak
  const typesInCat = wrongDetails.filter(w=>w.question.category===category).map(w=>w.question.type);
  const counts = {};
  typesInCat.forEach(t=>counts[t]=(counts[t]||0)+1);
  return Object.entries(counts).map(([type, count])=>({ type, count }));
}

function checkConsistency(byLevel, byDifficulty) {
  // If A1 90% but A2 20% — inconsistent, maybe guessed A1 or not yet learned A2 — consistent
  // If easy 20% but hard 90% — inconsistent (guessed hard)
  const easyPct = byDifficulty.easy ? byDifficulty.easy.correct/byDifficulty.easy.total : 1;
  const hardPct = byDifficulty.hard ? byDifficulty.hard.correct/byDifficulty.hard.total : 0;
  if(easyPct < 0.5 && hardPct > 0.7) return { consistent: false, reason: 'Hard questions correct but easy wrong — maybe guessing' };
  return { consistent: true, reason: 'Performance consistent across difficulty' };
}

function buildPath(weaknesses, typeWeaknesses, level) {
  const path = [];
  
  // Priority: grammar V2 always first if weak
  const hasV2Weak = typeWeaknesses.some(t=>t.type==='V2' && t.pct<60);
  const hasSubordinateWeak = typeWeaknesses.some(t=>t.type==='Ledsætning' && t.pct<60);
  const hasSinWeak = typeWeaknesses.some(t=>t.type.includes('Sin') && t.pct<60);
  
  if(hasV2Weak || weaknesses.some(w=>w.category==='grammar' && w.pct<60)) {
    path.push({ step: 1, title: "V2 + inversion — I morgen skal jeg...", why: "80% of B1 errors are V2. Fastest way to fewer errors. You struggle with V2 based on assessment.", time: "Week 1-2", skill: "grammar", type: "V2" });
  }
  if(hasSubordinateWeak) {
    path.push({ step: path.length+1, title: "Subordinate clause — at han ikke kommer", why: "You flip word order in subordinate. Main: kommer ikke, subordinate: ikke kommer. Everyone fails first week — normal.", time: "Week 2-3", skill: "grammar", type: "Ledsætning" });
  }
  if(hasSinWeak) {
    path.push({ step: path.length+1, title: "Sin/hans — avoid serious misunderstanding", why: "Anna henter sin søn (own) vs hendes søn (other). Huge difference in kindergarten.", time: "Week 3", skill: "grammar", type: "Sin" });
  }
  if(weaknesses.some(w=>w.category==='vocab')) {
    path.push({ step: path.length+1, title: "Collocations: holde et møde, træffe beslutning", why: "You need words that work in speech, not single words. Your vocab is below 60%.", time: "Week 3-4", skill: "vocab" });
  }
  if(weaknesses.some(w=>w.category==='listening')) {
    path.push({ step: path.length+1, title: "Listening without transcript — DSB, DR, telephone", why: "Danish swallows 25% syllables. Second time you understand 30% more. Your listening is weak.", time: "Week 4-5", skill: "listening" });
  }
  if(weaknesses.some(w=>w.category==='writing')) {
    path.push({ step: path.length+1, title: "Writing 150-200 words with structure", why: "PD3 requires indledning, 2 arguments, konklusion with bindeord. Your writing needs structure.", time: "Week 5-6", skill: "writing" });
  }
  
  // Fill up to 4 steps
  if(path.length<4) {
    path.push({ step: path.length+1, title: "Culture + PD3 exam format", why: "Folketing 179, flexicurity, jantelov — needed for Delprøve 1.", time: "Week 6-8", skill: "culture" });
  }
  
  return path.slice(0,4);
}

function buildTimeline(level, weaknessesCount, pct) {
  const base = level.includes('Modul 2') ? 9 : level.includes('Modul 3') ? 6 : level.includes('Modul 4') ? 4 : 2;
  const extra = weaknessesCount * 0.5;
  const totalMonths = Math.round(base + extra);
  return {
    months: totalMonths,
    text: `${totalMonths} months to PD3 with 15 min/day, 4 days/week`,
    breakdown: `Base for ${level}: ${base} months + ${weaknessesCount} weaknesses × 0.5 = ${totalMonths} months`,
    weekly: "3-4 days/week is enough — research: enough to pass Modultest 3 in 3 months"
  };
}

function buildExplanation(level, pct, categoryPct, levelPct, strengths, weaknesses, isConsistent, timeFlag) {
  return {
    summary: `You scored ${pct}% overall, but level is ${level} based on per-level performance, not just percentage. A1: ${levelPct.A1||0}%, A2: ${levelPct.A2||0}%, B1: ${levelPct.B1||0}%, B2: ${levelPct.B2||0}%.`,
    strengthsExpl: strengths.length ? `Strengths in ${strengths.map(s=>s.category).join(', ')} — you are above 75% there.` : 'No clear strengths yet — keep practicing, 3 attempts per skill needed.',
    weaknessesExpl: weaknesses.length ? `Weaknesses in ${weaknesses.map(w=>w.category).join(', ')} — below 60%. These drive your path.` : 'Good balance — no major weaknesses.',
    consistencyExpl: isConsistent.reason,
    timeExpl: `Time per question: ${timeFlag}`,
    whyPath: `Path focuses on weakest skill <60% first, not fixed curriculum. V2 is 80% of B1 errors, so always priority if weak.`
  };
}
