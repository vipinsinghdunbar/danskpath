// Variation Engine — ensures different learners get different questions for same skill
// Prevents memorizing assessment — FIXED: No blank options

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
    { main: "Jeg ved", sub: "at han ikke kommer", wrong: "at han kommer ikke", en: "I know that he is not coming", q: "Jeg ved, at han ___ kommer.", options: ["ikke", "kommer ikke", "ikke kommer"], correct: "ikke kommer", why: "Ledsætning: ikke FØR verbet. Hovedsætning: 'Han kommer ikke'. Ledsætning: '...at han ikke kommer'." },
    { main: "Hun siger", sub: "at hun aldrig har set det", wrong: "at hun har aldrig set det", en: "She says she has never seen it", q: "Hun siger, at hun ___ har set det.", options: ["aldrig", "har aldrig", "aldrig har"], correct: "aldrig", why: "Ledsætning: aldrig FØR verbet." },
    { main: "Vi håber", sub: "at de også kan komme", wrong: "at de kan også komme", en: "We hope they can also come", q: "Vi håber, at de ___ kan komme.", options: ["også", "kan også", "også kan"], correct: "også", why: "Ledsætning: også FØR verbet." },
    { main: "Jeg tror", sub: "at han ikke er hjemme", wrong: "at han er ikke hjemme", en: "I think he is not home", q: "Jeg tror, at han ___ er hjemme.", options: ["ikke", "er ikke", "ikke er"], correct: "ikke", why: "Ledsætning: ikke før er." },
  ],
  Sin: [
    { sentence: "Anna henter ___ søn", correct: "sin", wrong: "hendes", options: ["sin", "hendes", "hans"], context: "own son vs other woman son", en: "Anna picks up her (own) son", q: "Anna henter ___ søn", why: "Sin = tilbage til subjektet (hendes egen søn). Hendes = anden kvindes søn." },
    { sentence: "Peter vasker ___ bil", correct: "sin", wrong: "hans", options: ["sin", "hans", "hendes"], context: "own car", en: "Peter washes his own car", q: "Peter vasker ___ bil", why: "Sin = egen bil." },
    { sentence: "Lise elsker ___ mand", correct: "sin", wrong: "hendes", options: ["sin", "hendes", "hans"], context: "own husband", en: "Lise loves her own husband", q: "Lise elsker ___ mand", why: "Sin = egen mand, stor betydningsforskel i børnehave." },
    { sentence: "Han tager ___ jakke", correct: "sin", wrong: "hans", options: ["sin", "hans", "hendes"], context: "own jacket", en: "He takes his own jacket", q: "Han tager ___ jakke", why: "Sin = subjektets egen." },
  ],
  Flertal: [
    { singular: "en bil", plural: "to biler", wrong: "to bil", en: "two cars", q: "Jeg har to ___ (en bil)", options: ["biler", "bil", "bilen"], correct: "biler", why: "Flertal: en bil → to biler." },
    { singular: "et hus", plural: "tre huse", wrong: "tre hus", en: "three houses", q: "De har tre ___ (et hus)", options: ["huse", "hus", "husene"], correct: "huse", why: "Flertal: et hus → tre huse." },
    { singular: "en bog", plural: "fem bøger", wrong: "fem bog", en: "five books", q: "Der er fem ___ på bordet (en bog)", options: ["bøger", "bog", "bøgene"], correct: "bøger", why: "Flertal: en bog → fem bøger, uregelmæssig." },
    { singular: "en dag", plural: "syv dage", wrong: "syv dag", en: "seven days", q: "Der er syv ___ i en uge (en dag)", options: ["dage", "dag", "dagene"], correct: "dage", why: "Flertal: en dag → syv dage." },
  ],
  Kollokationer: [
    { da: "holde et møde", en: "have a meeting", wrong: "leave a meeting", context: "work", q: "Hvad betyder 'holde et møde'?", options: ["To have a meeting", "To leave a meeting", "To cancel a meeting"], why: "Kollokation: holde et møde = have a meeting. Du taler i kollokationer." },
    { da: "træffe en beslutning", en: "make a decision", wrong: "meet a decision", context: "work", q: "Hvad betyder 'træffe en beslutning'?", options: ["Make a decision", "Meet a decision", "Find a decision"], why: "Træffe en beslutning = make a decision." },
    { da: "tage stilling til", en: "take a stance", wrong: "stand up", context: "debate", q: "At 'tage stilling til' betyder:", options: ["To take a stance / consider", "To stand up", "To take a chair"], why: "Kollokation: tage stilling til = take stance, kræves i debat." },
    { da: "slå op", en: "look up / break up", wrong: "close", context: "dictionary", q: "At 'slå op' betyder:", options: ["To look up a word / break up", "To close", "To open"], why: "Partikelverber: slå op = look up in dictionary." },
    { da: "holde fyraften", en: "finish work", wrong: "hold a party", context: "work", q: "At 'holde fyraften' betyder:", options: ["To finish work for the day", "To hold a party", "To be fired"], why: "Kollokation arbejde: holde fyraften = finish work." },
  ],
  Reduktion: [
    { written: "det er", spoken: "d'er", example: "d'er svært", en: "it is difficult", q: "Hvad betyder reduktionen 'd'er'?", options: ["det er", "der er", "det var"], why: "Dansk sluger: det er → d'er. 25% stavelser sluges." },
    { written: "skal du", spoken: "skaddu", example: "skaddu med?", en: "are you coming?", q: "I talesprog: 'skaddu med?' kommer fra:", options: ["skal du med?", "skal det med?", "skulle du med?"], why: "Reduktion: skal du → skaddu. Høres som ét ord." },
    { written: "jeg er", spoken: "jaj", example: "jaj hjemme", en: "I am home", q: "Hvad betyder 'jaj' i talesprog?", options: ["jeg er", "jeg var", "jeg har"], why: "Reduktion: jeg er → jaj." },
    { written: "har du", spoken: "haddu", example: "haddu tid?", en: "do you have time?", q: "Hvad betyder 'haddu' i talesprog?", options: ["har du", "havde du", "har det"], why: "Reduktion: har du → haddu." },
  ]
};

export function generateVariation(skill, type, seed) {
  const templates = variationTemplates[type] || variationTemplates.V2;
  const idx = seed ? (hashCode(seed) % templates.length) : Math.floor(Math.random()*templates.length);
  const template = templates[Math.abs(idx) % templates.length];
  
  const names = ["Anna", "Peter", "Lise", "Ali", "Sara", "Mikkel"];
  const places = ["Aarhus", "København", "Odense", "Aalborg", "Esbjerg"];
  const name = names[Math.floor(Math.random()*names.length)];
  const place = places[Math.floor(Math.random()*places.length)];
  
  return {
    ...template,
    variation: { name, place, seed, idx },
    dedupKey: `${type}|${template.q||template.da||template.written}|${name}|${place}|${seed}`
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
    
    // Build question from variation — FIXED: always valid q and options
    let q;
    if(type==='V2') {
      q = {
        id: `var_${type}_${i}_${Date.now()}_${Math.random().toString(36).slice(2,6)}`,
        category: 'grammar',
        type,
        level: i<5?'A2':i<10?'B1':'B2',
        q: `Vælg korrekt: ${variation.front} ___ ${variation.rest}.`,
        options: [`${variation.subject} ${variation.verb}`, `${variation.front} ${variation.subject}`, `${variation.subject} ${variation.front}`],
        a: 0,
        why: `V2: ${variation.front} først → inversion. '${variation.front} ${variation.verb} ${variation.subject}'. En: ${variation.en}`,
        variation
      };
    } else if(type==='Kollokationer' || type==='Reduktion') {
      // These already have proper q and options in template
      q = {
        id: `var_${type}_${i}_${Date.now()}_${Math.random().toString(36).slice(2,6)}`,
        category: type==='Reduktion'?'listening':'vocab',
        type,
        level: 'B1',
        q: variation.q,
        options: variation.options,
        a: 0,
        why: variation.why,
        variation
      };
    } else if(type==='Ledsætning') {
      q = {
        id: `var_${type}_${i}_${Date.now()}_${Math.random().toString(36).slice(2,6)}`,
        category: 'grammar',
        type,
        level: 'B1',
        q: variation.q,
        options: variation.options,
        a: 0,
        why: variation.why,
        variation
      };
    } else if(type==='Sin') {
      q = {
        id: `var_${type}_${i}_${Date.now()}_${Math.random().toString(36).slice(2,6)}`,
        category: 'grammar',
        type,
        level: 'B1',
        q: variation.q,
        options: variation.options,
        a: 0,
        why: variation.why,
        variation
      };
    } else if(type==='Flertal') {
      q = {
        id: `var_${type}_${i}_${Date.now()}_${Math.random().toString(36).slice(2,6)}`,
        category: 'grammar',
        type,
        level: 'A2',
        q: variation.q,
        options: variation.options,
        a: 0,
        why: variation.why,
        variation
      };
    } else {
      // Fallback — should never happen, but ensure no blank
      q = {
        id: `var_${type}_${i}_${Date.now()}`,
        category: 'grammar',
        type,
        level: 'B1',
        q: variation.q || `${type}: Vælg korrekt`,
        options: variation.options || [variation.correct||"korrekt", variation.wrong||"forkert", "ved ikke"],
        a: 0,
        why: variation.why || `Regel: ${type}`,
        variation
      };
    }
    
    // Final validation — ensure no blank
    if (!q.q || q.q.includes('undefined') || !q.options || q.options.some(o => !o || o === 'undefined' || o.trim() === '')) {
      console.error('❌ Generated invalid question, fixing:', q);
      // Replace with safe fallback
      q.q = q.q?.replace(/undefined/g, '___') || `${type}: Vælg korrekt`;
      q.options = q.options?.map(o => (!o || o === 'undefined' || o.trim() === '') ? 'ved ikke' : o) || ['korrekt', 'forkert', 'ved ikke'];
      if (q.options.length < 2) q.options = ['korrekt', 'forkert', 'ved ikke'];
    }
    
    questions.push(q);
  }
  
  return questions;
}

export function testVariation() {
  const set1 = generateQuestionSet('user_anna', 5);
  const set2 = generateQuestionSet('user_peter', 5);
  const same = set1.filter((q,i)=>q.q===set2[i]?.q).length;
  
  // Check for blanks
  const blanks1 = set1.filter(q => !q.q || q.q.includes('undefined') || q.options.some(o => !o || o === 'undefined')).length;
  const blanks2 = set2.filter(q => !q.q || q.q.includes('undefined') || q.options.some(o => !o || o === 'undefined')).length;
  
  return {
    set1: set1.map(q=>q.q),
    set2: set2.map(q=>q.q),
    sameCount: same,
    blanks: blanks1 + blanks2,
    varied: same < 3 && blanks1===0 && blanks2===0,
    message: (same < 3 && blanks1===0 && blanks2===0) ? '✅ Variation works — different learners get different questions, no blanks' : `❌ Issues: same=${same}, blanks=${blanks1+blanks2}`
  };
}
