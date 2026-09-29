// Stage Engine — Full Danish education Modul 1 → PD3 (A1 → B2)
// Each stage has defined objectives, not just longer questions — genuine difficulty increase

export const stages = [
  {
    id: 's1',
    moduleId: 'm1',
    title: 'Modul 1 — Foundation',
    cefl: 'A1',
    objective: 'From zero: alphabet æøå, sounds, numbers 0-100, introduce yourself, family, home, time, daily routine. Write 30-50 words simple S-V-O.',
    expectedSkills: {
      grammar: ['Alphabet æøå, pronunciation, SVO basic, Present -r (jeg hedder), en/et, numbers, spørgsmål hv-ord'],
      vocab: ['Alphabet, numbers, family, home, time, daily routine, food — 200 words receptive, 100 active'],
      reading: ['Signs (Åben/Lukket), SMS 20-30 words, price tags, bus signs'],
      listening: ['Slow clear speech, alphabet dictation, numbers, no reductions'],
      writing: ['30-50 words, simple S-V-O, present only, en/et, my family, my flat'],
      speaking: ['Introduce yourself 30 sec: name, where from, family, job']
    },
    grammarRequirements: ['alfabet', 'udtale', 'svo', 'nutid', 'koen_en_et', 'tal', 'spørgsmål'],
    vocabRequirements: { count: 200, mastery: 70, type: 'A1 foundation + signs + daily' },
    difficulty: {
      sentenceLen: '3-6 words: Jeg hedder Ali. Jeg bor i Aarhus.',
      vocab: 'Most frequent 300 Danish words, concrete nouns, no abstraction',
      grammar: 'One rule per sentence: S-V-O only, present -r, en/et with article',
      example: 'Jeg hedder Anna. Jeg er 32 år. Jeg bor i Odense med min mand og to børn. (A1: S-V-O, present, en/et)',
      diffFromPrev: 'Start — zero. Here you learn ground form: Danish alphabet æøå, sounds, numbers, SVO is natural when subject first. No inversion yet.'
    },
    passingCriteria: {
      grammar: 60,
      vocab: 60,
      reading: 60,
      listening: 50,
      writing: 50,
      overall: 60,
      evidence: 'Alphabet dictation 80%, SVO correct 80%, en/et 60%, 30-50 words writing present only, 3 attempts per skill'
    },
    questionDifficulty: {
      options: 2,
      distractors: 'obvious — en vs et with picture hint, SVO vs VSO',
      context: 'Personal, concrete, visual: family photo, flat, time',
      timePerQ: '20-30 sec'
    }
  },
  {
    id: 's2',
    moduleId: 'm2',
    title: 'Modul 2 — Daily life',
    cefl: 'A1-A2',
    objective: 'Handle daily life: sick message, invitation, delay, shopping, transport. 60-80 words with V2 inversion (I dag arbejder jeg) and past -ede.',
    expectedSkills: {
      grammar: ['V2 inversion (I dag arbejder jeg), Past -ede (arbejdede), Flertal biler/huse, en/et + definite -en/-et, adjektiv basic'],
      vocab: ['Work, transport, shopping, health, time expressions — 400 words + basic collocations'],
      reading: ['Personal messages 40-60 words, invitations, DSB delay messages'],
      listening: ['Monologue slow, announcement DSB, telephone slow with transcript first'],
      writing: ['60-80 words, V2 + fordi, past tense, invitation, sick message'],
      speaking: ['Explain delay 1 min, invite to coffee, shopping dialogue']
    },
    grammarRequirements: ['v2_inversion', 'datid_ede', 'flertal', 'bestemt_en_et', 'adjektiv', 'fordi'],
    vocabRequirements: { count: 400, mastery: 70, type: 'A2 daily + collocations basic: holde fri, tage bussen' },
    difficulty: {
      sentenceLen: '6-9 words: I dag arbejder jeg hjemme, fordi jeg er syg.',
      vocab: 'Top 800 words, basic collocations: holde møde, tage bussen, holde fri',
      grammar: 'Two rules combined: V2 + past OR V2 + flertal, but not 3 rules yet. First inversion.',
      example: 'I går arbejdede jeg hjemme, fordi bussen var forsinket. Jeg tog bussen klokken 8. (V2 + past + fordi)',
      diffFromPrev: 'From S-V-O (Modul1) to V2 inversion when time first (Modul2 biggest A1→A2 shift). From present to past -ede. From 30-50 to 60-80 words. Listening: alphabet dictation → monologue/announcement. Writing: my family → sick message.'
    },
    passingCriteria: {
      grammar: 65,
      vocab: 65,
      reading: 65,
      listening: 60,
      writing: 55,
      overall: 65,
      evidence: 'V2 inversion correct 70%, past -ede correct 60%, flertal correct 60%, 60-80 words with fordi, 100 words in Box1'
    },
    questionDifficulty: {
      options: 3,
      distractors: 'close — I dag jeg vs I dag er jeg (English habit), flertal bog vs bøger',
      context: 'Daily, work, transport, health — personal but not abstract',
      timePerQ: '25-35 sec'
    }
  },
  {
    id: 's3',
    moduleId: 'm3',
    title: 'Modul 3 — Independent',
    cefl: 'A2-B1',
    objective: 'Be independent: email landlord about craftsman, message doctor, community garden post. 80-120 words with subordinate clauses at han ikke kommer.',
    expectedSkills: {
      grammar: ['Subordinate clause (at han ikke kommer), har/er perfect, reflexive glæde sig, prepositions vente på, V2 + subordinate'],
      vocab: ['Housing, health, community, work — 700 words + collocations vente på, glæde sig til'],
      reading: ['Emails 80-120 words, work reports, community posts, doctor messages'],
      listening: ['Telephone borgerservice without transcript first, DR slow news, 25% reductions'],
      writing: ['80-120 words, subordinate at/fordi/hvis, skal + infinitive, email landlord'],
      speaking: ['Explain why late, describe symptoms 2 min, landlord call']
    },
    grammarRequirements: ['ledsaetning', 'ikke_placering', 'har_er_perfect', 'refleksiv', 'praeposition', 'v2'],
    vocabRequirements: { count: 700, mastery: 70, type: 'B1 independent + collocations with prepositions' },
    difficulty: {
      sentenceLen: '9-14 words: Jeg ved, at håndværkeren ikke kommer i morgen, fordi han er syg.',
      vocab: 'Top 1300 words, collocations: vente på, glæde sig til, tage stilling til',
      grammar: 'Biggest shift: main → subordinate flips word order (ikke before verb). har vs er perfect. Two rules + subordinate.',
      example: 'Jeg har boet her i tre år, men jeg har aldrig set ham, fordi han arbejder om natten. (har perfect + men + fordi + subordinate)',
      diffFromPrev: 'From main clause only (M2) to subordinate (M3 biggest shift). From -ede past to har/er perfect. Writing 60-80 → 80-120 with hvis/fordi. Listening: announcement → telephone without transcript, 25% reductions d\'er, skaddu.'
    },
    passingCriteria: {
      grammar: 70,
      vocab: 70,
      reading: 70,
      listening: 65,
      writing: 60,
      overall: 70,
      evidence: 'Subordinate correct 60%, har/er correct 70%, telephone listening 50% without transcript, 80-120 words writing with fordi/hvis'
    },
    questionDifficulty: {
      options: 3,
      distractors: 'very close — kommer ikke vs ikke kommer (main vs subordinate), har vs er',
      context: 'Housing, health, work — independent situations',
      timePerQ: '30-45 sec'
    }
  },
  {
    id: 's4',
    moduleId: 'm4',
    title: 'Modul 4 — Fluent everyday',
    cefl: 'B1',
    objective: 'Fluent everyday: complain about broken shoes, job application, debate bike vs bus. 120-150 words with strong verbs drak/drukket and connectors selvom/hvis/når/da and sin/hans.',
    expectedSkills: {
      grammar: ['Strong verbs drikke/drak/drukket, sin/hans distinction, selvom/hvis/når/da, den/det pronoun, V2 + 2 rules'],
      vocab: ['Complaint, job, debate, transport — 1000 words + strong verbs + debate connectors'],
      reading: ['Complaints 120-150 words, job ads, debate articles, work culture'],
      listening: ['DR news normal speed, multi-speaker, podcast slow, reductions 25%'],
      writing: ['120-150 words debate with fordele/ulemper, på den ene side/på den anden side, derfor, selvom'],
      speaking: ['Job interview 3 min, complain, debate bike vs bus']
    },
    grammarRequirements: ['staerke_verber', 'sin_hans', 'bindeord_selvom', 'pronomen_den_det', 'v2', 'ledsaetning'],
    vocabRequirements: { count: 1000, mastery: 75, type: 'B1 fluent + strong verbs + debate: fordele, ulemper' },
    difficulty: {
      sentenceLen: '12-18 words: Selvom skoene kun er to uger gamle, er de allerede i stykker, derfor vil jeg gerne have pengene tilbage.',
      vocab: 'Top 2000 words, strong verbs i-a-u families, debate connectors på den ene side',
      grammar: 'From regular to strong verbs (vowel shift). From fordi/derfor to selvom/hvis/når/da. sin/hans meaning difference. 2 rules combined + subordinate.',
      example: 'Anna henter sin søn (own) vs hendes søn (other woman son) — huge meaning difference in kindergarten, critical B1.',
      diffFromPrev: 'From regular verbs (M3) to strong verbs (M4 vowel changes). From fordi/derfor to selvom/hvis/når/da. sin/hans distinction. Writing 80-120 → 120-150 debate. Listening: telephone → DR news + multi-speaker.'
    },
    passingCriteria: {
      grammar: 75,
      vocab: 75,
      reading: 75,
      listening: 70,
      writing: 65,
      overall: 75,
      evidence: 'Strong verbs correct 60%, sin/hans correct 80% critical, selvom/hvis correct 60%, debate 120-150 words with på den ene side'
    },
    questionDifficulty: {
      options: 3,
      distractors: 'tricky — sin vs hans same gender, strong verb past vs perfect',
      context: 'Complaint, job, debate — argumentation',
      timePerQ: '35-50 sec'
    }
  },
  {
    id: 's5',
    moduleId: 'm5',
    title: 'Modul 5 — PD3 ready',
    cefl: 'B1-B2',
    objective: 'PD3 ready: 150-200 words with introduction, 2 arguments, conclusion, connectors for det første/derudover/til sidst. All 17 grammar topics combined. No new grammar, only exam format + time pressure.',
    expectedSkills: {
      grammar: ['All 17 topics combined 2-3 rules at once, Passive bliver + past participle, relative der/som, modal particles jo/da/vel'],
      vocab: ['1300+ words active, 3000-4000 receptive, argumentation bæredygtig, for det første, collocations that work in speech'],
      reading: ['B2 debate 200-300 words, gapped text, argumentation, culture'],
      listening: ['DR podcast normal speed, fast telephone, multi-speaker debate, all reductions'],
      writing: ['150-200 words PD3 structure: indledning, 2 argumenter, konklusion, for det første/derudover/til sidst, jo/da'],
      speaking: ['PD3 mundtlig: picture description, monologue 2 min, discussion 4 min with jo/da/vel']
    },
    grammarRequirements: ['v2', 'ledsaetning', 'ikke', 'koen', 'flertal', 'adjektiv', 'sin', 'refleksiv', 'praeposition', 'bindeord', 'staerke', 'har_er', 'passiv', 'relativ', 'modalpartikel'],
    vocabRequirements: { count: 1354, mastery: 80, type: 'B2 PD3 ready + argumentation + 3000 receptive' },
    difficulty: {
      sentenceLen: '15-25 words: Det er jo klart, at selvom man har boet her i tre år, har man ikke nødvendigvis forstået, hvorfor danskerne deler æren med teamet.',
      vocab: 'Top 3000 receptive, argumentation: for det første, derudover, på den anden side, til sidst, bæredygtig, fællesskab',
      grammar: 'From 1 rule per sentence (M1) to 2-3 rules combined (M5). Passive, relative. Modal particles jo/da/vel for shared knowledge. PD3 structure.',
      example: 'Fleksibel arbejdstid bliver ofte fremhævet som et gode, og for mange er den det. Når man selv kan lægge sin dag... (PD3 example with V2 + subordinate + passive + connectors)',
      diffFromPrev: 'From 1 rule per sentence (M1) to 2-3 rules combined (M5). Writing 120-150 → 150-200 PD3 structure intro, 2 args, conclusion, connectors. Culture: Folketing 179, flexicurity, jantelov. Listening: DR → podcast speed. No new grammar — only exam format + time pressure.'
    },
    passingCriteria: {
      grammar: 80,
      vocab: 80,
      reading: 80,
      listening: 75,
      writing: 70,
      overall: 80,
      evidence: 'All 17 topics 80% in combined sentences, 150-200 words PD3 structure with connectors, DR podcast 60% without transcript, culture 8/10, 3 attempts per skill'
    },
    questionDifficulty: {
      options: 3,
      distractors: 'very tricky — 2-3 rules at once, close collocations, jo vs da vs vel nuance',
      context: 'PD3 debate, argumentation, culture — B2 exam',
      timePerQ: '40-60 sec'
    }
  }
];

export function getStageById(id) {
  return stages.find(s => s.id === id || s.moduleId === id);
}

export function getStageProgress(stageId) {
  try {
    const progress = JSON.parse(localStorage.getItem('dansk_progress')||'{}');
    const path = JSON.parse(localStorage.getItem('dansk_path')||'{}');
    const scores = JSON.parse(localStorage.getItem('dansk_scores')||'{}');
    const srs = JSON.parse(localStorage.getItem('dansk_srs')||'{}');
    const stage = getStageById(stageId);
    if(!stage) return { overall: 0, cleared: false, grammarDone: 0, grammarTotal: 0, grammarPct: 0 };
    
    // Check manually cleared via Markér færdig ✓ button
    const manuallyCleared = localStorage.getItem(`stage_${stage.moduleId}_cleared`) === 'true';
    
    const grammarDone = stage.grammarRequirements.filter(t=>progress[`grammar_${t}`] || path[`grammar_${t}`] || scores[`grammar_${t}`]).length;
    const grammarTotal = stage.grammarRequirements.length;
    const grammarPct = grammarTotal ? Math.round(grammarDone / grammarTotal * 100) : 0;
    
    // Overall avg from multiple sources
    const vocabDone = Object.keys(srs).length;
    const vocabPct = Math.min(100, Math.round(vocabDone / stage.vocabRequirements.count * 100));
    const overall = Math.round((grammarPct + vocabPct) / 2);
    
    // Cleared lenient 50%/60% per spec + manually cleared
    const cleared = manuallyCleared || grammarPct >= 50 || overall >= 60 || grammarPct >= stage.passingCriteria.grammar;
    
    return {
      stage,
      grammarDone,
      grammarTotal,
      grammarPct,
      vocabDone,
      vocabPct,
      overall: manuallyCleared ? 100 : overall,
      cleared,
      manuallyCleared
    };
  } catch {
    return { overall: 0, cleared: false, grammarDone: 0, grammarTotal: 0, grammarPct: 0 };
  }
}

export function getAllStagesProgress() {
  return stages.map(s => ({ stage: s, progress: getStageProgress(s.id) }));
}

export function getNextStage(currentStageId) {
  const idx = stages.findIndex(s=>s.id===currentStageId || s.moduleId===currentStageId);
  if(idx>=0 && idx<stages.length-1) return stages[idx+1];
  return null;
}

export function markStageCleared(moduleId) {
  localStorage.setItem(`stage_${moduleId}_cleared`, 'true');
  // Also set progress
  try {
    const progress = JSON.parse(localStorage.getItem('dansk_progress')||'{}');
    const stage = getStageById(moduleId);
    if(stage) {
      stage.grammarRequirements.forEach(t=>{
        progress[`grammar_${t}`] = true;
      });
      localStorage.setItem('dansk_progress', JSON.stringify(progress));
    }
  } catch {}
  return getStageProgress(moduleId);
}

export function resetProgress() {
  localStorage.removeItem('dansk_progress');
  localStorage.removeItem('dansk_path');
  localStorage.removeItem('dansk_scores');
  localStorage.removeItem('dansk_srs');
  localStorage.removeItem('dansk_seen');
  ['m1','m2','m3','m4','m5'].forEach(m=>localStorage.removeItem(`stage_${m}_cleared`));
}

export function isStageCleared(moduleId) {
  return localStorage.getItem(`stage_${moduleId}_cleared`) === 'true' || getStageProgress(moduleId).cleared;
}
