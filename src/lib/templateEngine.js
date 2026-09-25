// Template Engine — generates infinite, non-repeating variants per skill
// Implements CONTENT-STRATEGY.md: objective + variables + distractors + explanation + recentlyShownRule 30d

import { pools, pick, pickMany } from './pools';
import { getSeenMap, markSeen, isSeenRecently } from './tracking';

const SEEN_DAYS = 30;

// Core: generate a V2 choice question with fresh variables
function genV2() {
  const front = pick([...pools.front.tid, ...pools.front.attitude, ...pools.front.place]);
  const subj = pick(pools.subject);
  const verb = pick(pools.verb.present);
  const rest = pick(pools.rest);
  const correct = `${front} ${verb} ${subj} ${rest}.`;
  const wrong = `${front} ${subj} ${verb} ${rest}.`; // English order trap
  const key = `v2|${front}|${verb}|${subj}`;
  return {
    id: `v2_${Date.now()}_${Math.random().toString(36).slice(2,6)}`,
    topicId: 'v2',
    skill: 'ORD',
    type: 'choice',
    q: 'Hvilken sætning er rigtig?',
    options: [wrong, correct].sort(()=>0.5-Math.random()),
    correct,
    why: `${front} er første led, så verbet ${verb} skal være nr. 2 og ${subj} nr. 3. Den anden rækkefølge er engelsk vane.`,
    dedupKey: key,
    objective: 'V2 inversion after fronted element',
    closeDistractor: 'Engelsk rækkefølge efter frontfelt'
  };
}

function genV2Write() {
  const front = pick(pools.front.tid);
  const subj = pick(pools.subject);
  const verb = pick(pools.verb.present);
  const rest = pick(pools.rest);
  const correct = `${front} ${verb} ${subj} ${rest}`;
  const scrambled = [rest, subj, verb, front.toLowerCase()].sort(()=>0.5-Math.random()).join(' / ');
  return {
    id: `v2w_${Date.now()}_${Math.random().toString(36).slice(2,6)}`,
    topicId: 'v2',
    skill: 'ORD',
    type: 'write',
    q: `Byg sætningen: ${scrambled} (start med “${front}”)`,
    options: null,
    correct,
    why: `${correct}. ${front} først, så verbet, så subjektet.`,
    dedupKey: `v2w|${front}|${verb}|${subj}`,
    objective: 'V2 write'
  };
}

function genLedsaetning() {
  const subj = pick(["han","hun","vi","de","børnene","bussen","kurset"]);
  const adv = pick(pools.adverbials);
  const verb = pick(["kommer","cykler","regner","spiser","kører","starter","mødes","ringede","arbejder"]);
  const rest = pick(["i dag","på arbejde","i morgen","oftere","i august","hjemme"]);
  const correct = `${subj} ${adv} ${verb} ${rest}.`.replace('  ',' ');
  const wrong = `${subj} ${verb} ${adv} ${rest}.`;
  const intro = pick(["Jeg ved, at …","Hun siger, at …","Vi håber, at …","Han fortæller, at …"]);
  return {
    id: `led_${Date.now()}_${Math.random().toString(36).slice(2,6)}`,
    topicId: 'ledsaetning',
    skill: 'ORD',
    type: 'choice',
    q: intro,
    options: [correct, wrong].sort(()=>0.5-Math.random()),
    correct,
    why: `Ledsætning: ${adv} før verbet — ${subj} ${adv} ${verb}. Hovedsætning ville være ${subj} ${verb} ${adv}.`,
    dedupKey: `led|${subj}|${adv}|${verb}`,
    objective: 'Ledsætning ORD'
  };
}

function genKoen() {
  const noun = pick(pools.nouns);
  const correct = noun.gender;
  const wrong = noun.gender==='en' ? 'et' : 'en';
  return {
    id: `koen_${Date.now()}_${Math.random().toString(36).slice(2,6)}`,
    topicId: 'koen',
    skill: 'KØN',
    type: 'choice',
    q: `___ ${noun.da.split(' ').slice(1).join(' ')} (${noun.en})`,
    options: ['en','et'].sort(()=>0.5-Math.random()),
    correct,
    why: `${noun.da} → bestemt ${noun.def}. Lær altid bestemt form.`,
    dedupKey: `koen|${noun.da}`,
    objective: 'En/et + bestemt form'
  };
}

function genFlertal() {
  const noun = pick(pools.nouns);
  const askDef = Math.random()>0.5;
  if(askDef) {
    return {
      id: `fl_${Date.now()}_${Math.random().toString(36).slice(2,6)}`,
      topicId: 'flertal',
      skill: 'BØJ',
      type: 'write',
      q: `Skriv bestemt flertal af ${noun.da}:`,
      options: null,
      correct: noun.plDef,
      why: `${noun.plDef} — flertal ${noun.pl} + -ne.`,
      dedupKey: `fl|${noun.da}|def`,
      objective: 'Flertal bestemt'
    };
  } else {
    return {
      id: `fl_${Date.now()}_${Math.random().toString(36).slice(2,6)}`,
      topicId: 'flertal',
      skill: 'BØJ',
      type: 'write',
      q: `Skriv flertal af ${noun.da}: to ___`,
      options: null,
      correct: noun.pl,
      why: `${noun.pl}. Bestemt flertal: ${noun.plDef}.`,
      dedupKey: `fl|${noun.da}|pl`,
      objective: 'Flertal ubestemt'
    };
  }
}

function genAdjektiv() {
  const adj = pick(pools.adjectives);
  const noun = pick(pools.nouns);
  const isEt = noun.gender==='et';
  const isPl = Math.random()>0.6;
  if(isPl) {
    return {
      id: `adj_${Date.now()}_${Math.random().toString(36).slice(2,6)}`,
      topicId: 'adjektiv',
      skill: 'BØJ',
      type: 'choice',
      q: `de ___ ${noun.pl} (${adj.base} — ${adj.en})`,
      options: [adj.base, adj.t, adj.e].sort(()=>0.5-Math.random()),
      correct: adj.e,
      why: `Flertal og bestemt tager -e: ${adj.e}.`,
      dedupKey: `adj|${adj.base}|${noun.da}|pl`,
      objective: 'Adjektiv flertal'
    };
  } else {
    const correct = isEt ? adj.t : adj.base;
    return {
      id: `adj_${Date.now()}_${Math.random().toString(36).slice(2,6)}`,
      topicId: 'adjektiv',
      skill: 'BØJ',
      type: 'choice',
      q: `${isEt?'et':'en'} ___ ${noun.da.split(' ').slice(1).join(' ')} (${adj.base} — ${adj.en})`,
      options: [adj.base, adj.t, adj.e].sort(()=>0.5-Math.random()),
      correct,
      why: isEt ? `Et-ord tager -t: ${adj.t}.` : `En-ord ubestemt tager grundform: ${adj.base}.`,
      dedupKey: `adj|${adj.base}|${noun.da}|${isEt?'et':'en'}`,
      objective: 'Adjektiv en/et'
    };
  }
}

function genPraep() {
  const p = pick(pools.praep);
  return {
    id: `praep_${Date.now()}_${Math.random().toString(36).slice(2,6)}`,
    topicId: 'praep',
    skill: 'PRÆ',
    type: 'choice',
    q: `Jeg bor ___ ${p.context}.`,
    options: pickMany(["i","på","om","til","for","ved","af"],4).includes(p.prep) ? pickMany(["i","på","om","til","for","ved","af"],4).sort(()=>0.5-Math.random()) : [p.prep, ...pickMany(["i","på","om","til"],3)].sort(()=>0.5-Math.random()),
    correct: p.prep,
    why: p.why,
    dedupKey: `praep|${p.context}|${p.prep}`,
    objective: 'Præposition fast udtryk',
    // ensure options contains correct
    _fixOptions: true
  };
}

function genNutidDatid() {
  const v = pick(pools.verbParadigms);
  const useDatid = Math.random()>0.5;
  if(useDatid) {
    return {
      id: `tid_${Date.now()}_${Math.random().toString(36).slice(2,6)}`,
      topicId: 'nutid-datid',
      skill: 'TID',
      type: 'choice',
      q: `I går ___ jeg tidligt. (${v.inf} — ${v.en})`,
      options: [v.nutid, v.datid, v.førnutid, v.inf].sort(()=>0.5-Math.random()),
      correct: v.datid,
      why: `${v.datid} er datid. ${v.group} — ${v.inf} → ${v.datid} → ${v.førnutid}.`,
      dedupKey: `tid|${v.inf}|datid`,
      objective: 'Datid gruppe'
    };
  } else {
    return {
      id: `tid_${Date.now()}_${Math.random().toString(36).slice(2,6)}`,
      topicId: 'nutid-datid',
      skill: 'TID',
      type: 'write',
      q: `Skriv nutid af ${v.inf}: Jeg ___ hver dag.`,
      options: null,
      correct: v.nutid,
      why: `${v.nutid} — stamme + -r, samme for alle personer.`,
      dedupKey: `tid|${v.inf}|nutid`,
      objective: 'Nutid -r'
    };
  }
}

function genBindeord() {
  const pair = Math.random()>0.5 ? 
    { q: "Jeg tager toget, ___ min cykel er i stykker.", correct: "fordi", why: "fordi giver grunden og starter ledsætning. Derfor ville give konsekvensen.", distractors: ["derfor","selvom","men"] } :
    { q: "Min cykel er i stykker. ___ tager jeg toget.", correct: "Derfor", why: "Derfor er hovedsætningsbindeord — verbet lige efter: derfor tager jeg.", distractors: ["Fordi","Selvom","Hvis"] };
  return {
    id: `bind_${Date.now()}_${Math.random().toString(36).slice(2,6)}`,
    topicId: 'bindeord',
    skill: 'VALG',
    type: 'choice',
    q: pair.q,
    options: [pair.correct, ...pair.distractors].sort(()=>0.5-Math.random()),
    correct: pair.correct,
    why: pair.why,
    dedupKey: `bind|${pair.q}|${pair.correct}`,
    objective: 'Bindeord hoved/led'
  };
}

// Registry
const generators = {
  v2: () => Math.random()>0.5 ? genV2() : genV2Write(),
  ledsaetning: genLedsaetning,
  koen: genKoen,
  flertal: genFlertal,
  adjektiv: genAdjektiv,
  praep: genPraep,
  'nutid-datid': genNutidDatid,
  bindeord: genBindeord,
  // fallback for topics not yet templated — use original items as engine will later fill
  ikke: genLedsaetning, // similar logic
  spoergsmaal: genV2,
  staerke: genNutidDatid,
  'har-er': genNutidDatid,
  fremtid: genNutidDatid,
  modal: genNutidDatid,
  sin: genKoen,
  refleksiv: genKoen,
  dendet: genKoen,
};

export function generateForTopic(topicId, attempts=20) {
  const gen = generators[topicId] || generators['v2'];
  const seen = getSeenMap();
  for(let i=0;i<attempts;i++) {
    const item = gen();
    // Fix options to include correct if needed
    if(item._fixOptions && item.options && !item.options.includes(item.correct)) {
      item.options[0]=item.correct;
      item.options = [...new Set(item.options)].sort(()=>0.5-Math.random());
    }
    // dedup check 30 days
    const dedupKey = item.dedupKey;
    if(seen[dedupKey]) {
      const days = (Date.now()-seen[dedupKey])/(1000*60*60*24);
      if(days < SEEN_DAYS) continue; // skip, recently shown
    }
    return item;
  }
  // if all recent, return last anyway (reset cycle)
  const item = gen();
  return item;
}

export function generateBatch(topicId, count=20) {
  const batch=[];
  const usedKeys=new Set();
  let tries=0;
  while(batch.length<count && tries<100) {
    tries++;
    const item = generateForTopic(topicId, 5);
    if(usedKeys.has(item.dedupKey)) continue;
    usedKeys.add(item.dedupKey);
    batch.push(item);
  }
  return batch;
}

// Mark as seen with dedupKey + id
export function markTemplateSeen(item) {
  const map = getSeenMap();
  const now = Date.now();
  map[item.dedupKey]=now;
  map[item.id]=now;
  localStorage.setItem('dansk_seen', JSON.stringify(map));
}

// Stats
export function getTemplateStats() {
  const seen = getSeenMap();
  return {
    totalKeys: Object.keys(seen).length,
    topics: Object.keys(generators)
  };
}
