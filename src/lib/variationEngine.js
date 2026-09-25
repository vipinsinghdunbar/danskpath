// Variation Engine — ensures different learners get different questions for same skill
// Prevents memorizing assessment

const variationTemplates = {
  V2: [
    { front: "I dag", subject: "jeg", verb: "arbejder", rest: "hjemme", en: "Today I work at home" },
    { front: "I morgen", subject: "vi", verb: "skal", rest: "til København", en: "Tomorrow we go to Copenhagen" },
    { front: "I går", subject: "han", verb: "kom", rest: "for sent", en: "Yesterday he came late" },
    { front: "På mandag", subject: "hun", verb: "starter", rest: "nyt job", en: "On Monday she starts new job" },
    { front: "Derfor", subject: "jeg", verb: "tager", rest: "bussen", en: "Therefore I take the bus" },
    { front: "Om aftenen", subject: "vi", verb: "spiser", rest: "sammen", en: "In evening we eat together" },
  ],
  Ledsætning: [
    { main: "Jeg ved", sub: "at han ikke kommer", wrong: "at han kommer ikke", en: "I know that he is not coming" },
    { main: "Hun siger", sub: "at hun aldrig har set det", wrong: "at hun har aldrig set det", en: "She says she has never seen it" },
    { main: "Vi håber", sub: "at de også kan komme", wrong: "at de kan også komme", en: "We hope they can also come" },
  ],
  Sin: [
    { sentence: "Anna henter ___ søn", correct: "sin", wrong: "hendes", context: "own son vs other woman son", en: "Anna picks up her (own) son" },
    { sentence: "Peter vasker ___ bil", correct: "sin", wrong: "hans", context: "own car", en: "Peter washes his own car" },
    { sentence: "Lise elsker ___ mand", correct: "sin", wrong: "hendes", context: "own husband", en: "Lise loves her own husband" },
  ],
  Flertal: [
    { singular: "en bil", plural: "to biler", wrong: "to bil", en: "two cars" },
    { singular: "et hus", plural: "tre huse", wrong: "tre hus", en: "three houses" },
    { singular: "en bog", plural: "fem bøger", wrong: "fem bog", en: "five books" },
  ],
  Kollokationer: [
    { da: "holde et møde", en: "have a meeting", wrong: "leave a meeting", context: "work" },
    { da: "træffe en beslutning", en: "make a decision", wrong: "meet a decision", context: "work" },
    { da: "tage stilling til", en: "take a stance", wrong: "stand up", context: "debate" },
    { da: "slå op", en: "look up / break up", wrong: "close", context: "dictionary / relationship" },
    { da: "holde fyraften", en: "finish work", wrong: "hold a party", context: "work" },
  ],
  Reduktion: [
    { written: "det er", spoken: "d'er", example: "d'er svært", en: "it is difficult" },
    { written: "skal du", spoken: "skaddu", example: "skaddu med?", en: "are you coming?" },
    { written: "jeg er", spoken: "jaj", example: "jaj hjemme", en: "I am home" },
    { written: "har du", spoken: "haddu", example: "haddu tid?", en: "do you have time?" },
  ]
};

export function generateVariation(skill, type, seed) {
  // seed = userId or trialId or random — ensures different learners get different
  const templates = variationTemplates[type] || variationTemplates.V2;
  const idx = seed ? (hashCode(seed) % templates.length) : Math.floor(Math.random()*templates.length);
  const template = templates[Math.abs(idx) % templates.length];
  
  // Add variation: names, places, verbs, contexts
  const names = ["Anna", "Peter", "Lise", "Ali", "Sara", "Mikkel"];
  const places = ["Aarhus", "København", "Odense", "Aalborg", "Esbjerg"];
  const name = names[Math.floor(Math.random()*names.length)];
  const place = places[Math.floor(Math.random()*places.length)];
  
  return {
    ...template,
    variation: { name, place, seed, idx },
    dedupKey: `${type}|${template.front||template.da||template.written}|${name}|${place}|${seed}`
  };
}

function hashCode(str) {
  let hash = 0;
  for(let i=0;i<str.length;i++) {
    const char = str.charCodeAt(i);
    hash = ((hash<<5)-hash)+char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

export function generateQuestionSet(userId, count = 15) {
  // Generates adaptive varied set — different for different userId
  const categories = ['grammar', 'vocab', 'listening', 'reading', 'writing', 'culture'];
  const types = ['V2', 'Ledsætning', 'Sin', 'Flertal', 'Kollokationer', 'Reduktion'];
  
  const questions = [];
  const usedDedup = new Set();
  
  for(let i=0;i<count;i++) {
    const type = types[i % types.length];
    const seed = `${userId}_${i}_${Date.now()}`;
    let variation;
    let attempts = 0;
    do {
      variation = generateVariation('grammar', type, `${seed}_${attempts}`);
      attempts++;
    } while(usedDedup.has(variation.dedupKey) && attempts<10);
    
    usedDedup.add(variation.dedupKey);
    
    // Build question from variation
    let q;
    if(type==='V2') {
      q = {
        id: `var_${type}_${i}_${Date.now()}`,
        category: 'grammar',
        type,
        level: i<5?'A2':i<10?'B1':'B2',
        q: `Vælg korrekt: ${variation.front} ___ ${variation.rest}.`,
        options: [`${variation.subject} ${variation.verb}`, `${variation.front} ${variation.subject}`, `${variation.subject} ${variation.front}`],
        a: 0,
        why: `V2: ${variation.front} først → inversion. '${variation.front} ${variation.verb} ${variation.subject}'. En: ${variation.en}`,
        variation
      };
    } else if(type==='Kollokationer') {
      q = {
        id: `var_${type}_${i}_${Date.now()}`,
        category: 'vocab',
        type,
        level: 'B1',
        q: `Hvad betyder '${variation.da}'?`,
        options: [variation.en, variation.wrong, 'To close'],
        a: 0,
        why: `Kollokation: ${variation.da} = ${variation.en}. Context: ${variation.context}`,
        variation
      };
    } else {
      q = {
        id: `var_${type}_${i}_${Date.now()}`,
        category: type==='Reduktion'?'listening':'grammar',
        type,
        level: 'B1',
        q: `${type}: ${variation.q || variation.sentence || variation.written}`,
        options: variation.options || [variation.correct||variation.spoken, variation.wrong||'forkert', 'ved ikke'],
        a: 0,
        why: variation.why || `Regel: ${type}`,
        variation
      };
    }
    
    questions.push(q);
  }
  
  return questions;
}

export function testVariation() {
  // Test that different learners get different questions
  const set1 = generateQuestionSet('user_anna', 5);
  const set2 = generateQuestionSet('user_peter', 5);
  const same = set1.filter((q,i)=>q.q===set2[i]?.q).length;
  return {
    set1: set1.map(q=>q.q),
    set2: set2.map(q=>q.q),
    sameCount: same,
    varied: same < 3,
    message: same < 3 ? '✅ Variation works — different learners get different questions' : '❌ Too similar — need more variation'
  };
}
