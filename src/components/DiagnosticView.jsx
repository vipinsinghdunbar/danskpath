import { useState, useEffect } from 'react';
import { goals as allGoals, saveGoals, getGoals } from '../lib/goals';
import { generateQuestionSet } from '../lib/variationEngine';
import { calculateVerdict } from '../lib/verdictEngine';
import { getStageById } from '../lib/stageEngine';

const baseQuestions = [
  // M1 Foundation — A1 — 3-6 words, alphabet, SVO, en/et, nutid, tal
  { id: 'q0a', category: "grammar", type: "Alfabet", level: "A1", q: "Hvor mange vokaler har dansk? (a e i o u æ ø å)", options: ["9 vokaler","5 vokaler","7 vokaler"], a: 0, why: "Dansk har 9 vokaler inkl æ ø å. Modul 1 starter her — alfabet og udtale.", rule: "Alfabet", skill: "Alfabet", difficulty: "easy" },
  { id: 'q0b', category: "grammar", type: "SVO", level: "A1", q: "Vælg korrekt SVO: ___", options: ["Jeg hedder Ali","Hedder jeg Ali","Jeg Ali hedder"], a: 0, why: "M1: S-V-O altid i hovedsætning. Jeg (S) hedder (V) Ali (O). Basis før V2.", rule: "SVO", skill: "SVO", difficulty: "easy" },
  { id: 'q0c', category: "grammar", type: "Køn", level: "A1", q: "___ hus (køn)", options: ["et hus","en hus","huset en"], a: 0, why: "M1: en/et køn. et hus, en bil. Ingen regel — skal læres. 200 ord.", rule: "Køn", skill: "en/et", difficulty: "easy" },
  { id: 'q0d', category: "vocab", type: "Tal", level: "A1", q: "Hvad er 'tyve'?", options: ["20","12","2"], a: 0, why: "M1: tal 0-100. tyve=20, tredive=30. Basis for pris, tid, adresse.", rule: "Tal", skill: "Tal", difficulty: "easy" },
  { id: 'q0e', category: "grammar", type: "Nutid", level: "A1", q: "Jeg ___ i Aarhus (bo)", options: ["bor","boer","bo"], a: 0, why: "M1: nutid -r. at bo → bor. Jeg bor, du bor, vi bor — ingen bøjning efter person.", rule: "Nutid", skill: "Nutid", difficulty: "easy" },
  // M2 Daily — A1-A2 — 6-9 words V2 inversion datid
  { id: 'q1', category: "grammar", type: "V2", level: "A2", q: "Vælg korrekt: ___ arbejder jeg hjemme.", options: ["I dag","I dag jeg","I dag er jeg"], a: 0, why: "V2: tid først → inversion. 'I dag arbejder jeg'. På engelsk: 'Today I work' (ingen inversion). På dansk altid inversion.", rule: "V2", skill: "V2 inversion", difficulty: "easy" },
  { id: 'q2', category: "grammar", type: "Ledsætning", level: "B1", q: "Jeg ved, at han ___ kommer.", options: ["ikke","kommer ikke","ikke kommer"], a: 2, why: "Ledsætning: centraladverbial (ikke, aldrig, også) FØR verbet. Hovedsætning: 'Han kommer ikke'. Ledsætning: '...at han ikke kommer'.", rule: "Ledsætning", skill: "Ledsætning", difficulty: "medium" },
  { id: 'q3', category: "grammar", type: "Sin", level: "B1", q: "Hun elsker ___ mand.", options: ["sin","hendes","hans"], a: 0, why: "Sin = tilbage til subjektet (hendes egen mand). 'Hendes mand' = en anden kvindes mand. Kæmpe betydningsforskel i børnehave.", rule: "Sin/sit", skill: "Refleksiv", difficulty: "medium" },
  { id: 'q4', category: "grammar", type: "Ligge/lægge", level: "A2", q: "Bogen ___ på bordet.", options: ["ligger","lægger","sidder"], a: 0, why: "Ligge = tilstand (bogen er der). Lægge = handling (jeg lægger bogen). Som engelsk lie vs lay.", rule: "Ligge/lægge", skill: "Verbum", difficulty: "easy" },
  { id: 'q5', category: "grammar", type: "Præposition", level: "A2", q: "Jeg har boet her ___ 3 år.", options: ["i","på","om"], a: 0, why: "'I' + tid = varighed. 'På' bruges til dage: på mandag. 'Om' = fremtid: om 3 dage.", rule: "Præpositioner", skill: "Præposition", difficulty: "easy" },
  { id: 'q6', category: "vocab", type: "Kollokationer", level: "B1", q: "Hvad betyder 'holde et møde'?", options: ["To have a meeting","To leave a meeting","To cancel a meeting"], a: 0, why: "Kollokation: holde et møde = have a meeting. Ikke bare 'møde' men hele frasen. Du taler i kollokationer, ikke enkeltord.", rule: "Kollokationer", skill: "Kollokationer", difficulty: "medium" },
  { id: 'q7', category: "vocab", type: "Partikelverb", level: "B1", q: "At 'slå op' betyder:", options: ["To look up a word / break up","To close","To open"], a: 0, why: "Partikelverber: slå op = look up in dictionary. Afhænger af partikel. Fast med præposition.", rule: "Partikelverber", skill: "Partikelverb", difficulty: "medium" },
  { id: 'q8', category: "listening", type: "Reduktion", level: "B1", q: "Hvad betyder reduktionen 'd'er'?", options: ["det er","der er","det var"], a: 0, why: "Dansk sluger: det er → d'er. Skal du → skaddu. Det er derfor lytning er svært — 25% stavelser sluges.", rule: "Reduktion", skill: "Lytte reduktion", difficulty: "medium" },
  { id: 'q9', category: "culture", type: "Samfund", level: "B1", q: "Hvor mange medlemmer i Folketinget?", options: ["179","150","200"], a: 0, why: "PD3 Delprøve 1: 179 medlemmer. Grundlovsdag 5. juni. Testes i medborgerskab.", rule: "Samfund", skill: "Samfund", difficulty: "easy" },
  { id: 'q10', category: "culture", type: "Arbejdsmarked", level: "B1", q: "Hvad er 'flexicurity'?", options: ["Let at fyre + dagpenge + aktiv indsats","Kun lav skat","Kun høj løn"], a: 0, why: "Dansk arbejdsmarkedsmodel: let at fyre, let at få nyt job, dagpenge imellem. PD3 nøglebegreb.", rule: "Arbejdsmarked", skill: "Kultur", difficulty: "medium" },
  { id: 'q11', category: "grammar", type: "Relativ", level: "B1", q: "Det er manden, ___ bor ved siden af.", options: ["der","som","hvis"], a: 0, why: "Der = subjekt i relativsætning. Som kan også, men der er mest præcis for subjekt. B1-B2 krav.", rule: "Relativ", skill: "Relativsætning", difficulty: "medium" },
  { id: 'q12', category: "grammar", type: "Modalpartikel", level: "B2", q: "Det er ___ klart, at vi skal hjælpe. (fælles viden)", options: ["jo","da","vel"], a: 0, why: "Jo = som du ved, fælles viden. Vel = bekræftelse (ikke sandt?), da = overraskelse. B2: nuancer der koster i PD3 skrivning.", rule: "Modalpartikler", skill: "Modalpartikel", difficulty: "hard" },
  { id: 'q13', category: "vocab", type: "Kollokationer", level: "B1", q: "At 'tage stilling til' betyder:", options: ["To take a stance / consider","To stand up","To take a chair"], a: 0, why: "Kollokation: tage stilling til = take stance. Ikke ordret. Kræves i debat-tekst B1.", rule: "Kollokationer", skill: "Kollokationer", difficulty: "medium" },
  { id: 'q14', category: "reading", type: "Sammenhæng", level: "B1", q: "PD3 gapped text tester:", options: ["Sammenhæng og bindeord","Kun stavning","Kun udtale"], a: 0, why: "Gapped text: indsæt sætninger der skaber sammenhæng. Tester logik og bindeord: derfor, selvom, mens.", rule: "PD3 format", skill: "Læsning", difficulty: "medium" },
  { id: 'q15', category: "writing", type: "Skrivning", level: "B1", q: "PD3 Delprøve 4 kræver:", options: ["150-200 ord med indledning, argumenter, konklusion","10 ord","Kun sms"], a: 0, why: "PD3 skrivning: 150-200 ord, struktur, V2, bindeord. Uden struktur under 5.", rule: "Skrivning", skill: "Skrivning", difficulty: "easy" },
  { id: 'q16', category: "grammar", type: "V2", level: "A2", q: "På mandag ___ hun nyt job.", options: ["starter","hun starter","er hun starter"], a: 0, why: "V2 igen, ny variation: På mandag = front → inversion starter hun. Samme regel, andre ord — forhindrer memorering.", rule: "V2", skill: "V2 inversion", difficulty: "easy" },
  { id: 'q17', category: "grammar", type: "Flertal", level: "A2", q: "To ___ er på bordet.", options: ["bøger","bog","bøgene"], a: 0, why: "Flertal: en bog → to bøger. Uregelmæssig. A2 kerne.", rule: "Flertal", skill: "Flertal", difficulty: "easy" },
  { id: 'q18', category: "listening", type: "Reduktion", level: "B1", q: "I talesprog: 'skaddu med?' kommer fra:", options: ["skal du med?","skal det med?","skulle du med?"], a: 0, why: "Reduktion: skal du → skaddu. Høres som ét ord. Derfor lytning er hård selvom du læser B1.", rule: "Reduktion", skill: "Lytte reduktion", difficulty: "medium" },
  { id: 'q19', category: "vocab", type: "Kollokationer", level: "B1", q: "At 'holde fyraften' betyder:", options: ["To finish work for the day","To hold a party","To be fired"], a: 0, why: "Kollokation arbejde: holde fyraften = finish. Vigtig i kaffepause-snak.", rule: "Kollokationer", skill: "Kollokationer", difficulty: "medium" },
  { id: 'q20', category: "grammar", type: "Bindeord", level: "B1", q: "___ det regner, går vi en tur.", options: ["Selvom","Derfor","Fordi"], a: 0, why: "Selvom = although (kontrast). Derfor = therefore (konsekvens). Fordi = because (årsag). Bindeord skaber sammenhæng i PD3.", rule: "Bindeord", skill: "Bindeord", difficulty: "medium" },
];

function Dots({ current, total }) {
  return (
    <div className="flex gap-1 items-center">
      {Array.from({ length: total }).map((_, i) => {
        const active = i < current;
        return <div key={i} className={active ? "w-2.5 h-2.5 rounded-full bg-black transition-all" : "w-2.5 h-2.5 rounded-full bg-black/15 transition-all"} />;
      })}
    </div>
  );
}

function hashStr(str){ let h=0; for(let i=0;i<str.length;i++){ h=((h<<5)-h)+str.charCodeAt(i); h=h&h; } return Math.abs(h); }

export default function DiagnosticView({ setActive }) {
  const [userSeed] = useState(()=> localStorage.getItem('dansk_user_seed') || ("u_"+Math.random().toString(36).slice(2,8)+"_"+Date.now()));
  const [questions, setQuestions] = useState(()=> {
    const seed = userSeed;
    const varied = generateQuestionSet(seed, 5);
    const shuffled = [...baseQuestions].sort(()=> 0.5 - (hashStr(seed) % 100)/100).slice(0,15);
    const mixed = shuffled.map((q,i)=> i<5 && varied[i] ? { ...q, q: varied[i].q || q.q, options: varied[i].options || q.options, variation: varied[i].variation } : q);
    return mixed;
  });
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timePerQ, setTimePerQ] = useState({});
  const [qStart, setQStart] = useState(Date.now());
  const [showResult, setShowResult] = useState(false);
  const [verdict, setVerdict] = useState(null);
  const [selectedGoals, setSelectedGoals] = useState(()=> {
    try { return JSON.parse(localStorage.getItem('dansk_goals')||'[]'); } catch { return []; }
  });
  const [goalsStep, setGoalsStep] = useState(false);

  useEffect(()=>{ localStorage.setItem('dansk_user_seed', userSeed); },[userSeed]);
  useEffect(()=>{ setQStart(Date.now()); },[idx]);

  const currentQ = questions[idx];
  const answered = Object.keys(answers).length;
  const total = questions.length;

  const handleAnswer = (optIdx) => {
    const time = Math.round((Date.now()-qStart)/1000);
    setTimePerQ(prev=>({...prev, [currentQ.id]: time}));
    setAnswers(prev=>({...prev, [currentQ.id]: optIdx}));
    if(navigator.vibrate) navigator.vibrate(10);
  };

  const nextQ = () => {
    if(idx < total-1) {
      setIdx(i=>i+1);
    } else {
      const times = questions.map(q=> timePerQ[q.id] || 10);
      const v = calculateVerdict(answers, questions, times);
      setVerdict(v);
      localStorage.setItem('dansk_level', v.level);
      localStorage.setItem('dansk_diagnostic', JSON.stringify({ ...v, date: new Date().toISOString(), userSeed }));
      localStorage.setItem('dansk_verdict', JSON.stringify(v));
      setShowResult(true);
      if(navigator.vibrate) navigator.vibrate(20);
    }
  };

  const prevQ = () => { if(idx>0) setIdx(i=>i-1); };

  const toggleGoal = (id) => {
    if(navigator.vibrate) navigator.vibrate(10);
    setSelectedGoals(prev=>{
      if(prev.includes(id)) return prev.filter(x=>x!==id);
      if(prev.length>=3) return [...prev.slice(1), id];
      return [...prev, id];
    });
  };

  const handleSaveGoals = () => {
    saveGoals(selectedGoals);
    setGoalsStep(false);
    if(navigator.vibrate) navigator.vibrate(20);
  };

  if(showResult && verdict) {
    // Fix: verdictEngine returns objects, not strings — normalize for display
    const strengths = (verdict.strengths||[]).map(s=> typeof s==='string' ? { category: s, pct: 80 } : s);
    const weaknesses = (verdict.weaknesses||[]).map(w=> typeof w==='string' ? { category: w, pct: 50, types: [] } : w);
    const borderline = (verdict.borderline||[]).map(b=> typeof b==='string' ? { category: b, pct: 65 } : b);
    const typeWeak = verdict.typeWeaknesses||[];
    const path = verdict.recommendedPath || verdict.path || [];
    const timeline = typeof verdict.timeline === 'string' ? { text: verdict.timeline, months: '?', breakdown: verdict.timeline } : verdict.timeline || { text: '3-6 months', months: 4, breakdown: '' };
    const levelPct = verdict.levelPct||{};
    const categoryPct = verdict.categoryPct||{};
    const consistency = verdict.isConsistent || verdict.consistency || { consistent: true, reason: '' };
    const timePerQ = verdict.timePerQ || verdict.timeAvg || 15;
    const timeFlag = verdict.timeFlag || 'normal';
    const explanation = verdict.explanation || {};
    const expSummary = typeof explanation === 'string' ? explanation : explanation.summary || '';
    const wrongDetails = verdict.wrongDetails || [];

    return (
      <div className="min-h-screen bg-[#F2F2F7] pb-[120px]">
        <div className="max-w-[800px] mx-auto px-5 lg:px-8 pt-8">
          <div className="bg-white rounded-[32px] p-8 shadow-sm border border-black/5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="inline-flex text-[11px] font-[700] tracking-widest uppercase bg-[#007AFF] text-white px-3 py-1.5 rounded-full">Dit niveau fundet • {verdict.level}</div>
                <h1 className="mt-4 text-[34px] font-[700] tracking-tight leading-[0.95]">Your Danish —<br/>{verdict.level}</h1>
                <div className="mt-3 text-[17px] leading-[1.4] text-[#3C3C43]/70 max-w-[560px]">
                  {expSummary || `Not just ${verdict.pct}% — we show what kind of ${verdict.pct}%. Two learners can both score ${verdict.pct}% but need different paths. Your path is built from your weakest skill <60% first.`}
                </div>
              </div>
              <div className="bg-black text-white rounded-[24px] px-6 py-5 text-center min-w-[160px]">
                <div className="text-[13px] font-[600] tracking-widest uppercase text-white/60">Niveau</div>
                <div className="mt-1 text-[20px] font-[700] tracking-tight leading-tight">{verdict.level}</div>
                <div className="mt-3 text-[11px] font-[600] bg-white/15 rounded-full px-3 py-1.5">{verdict.correct}/{verdict.total} rigtige • {Math.round(timePerQ)}s / spørgsmål</div>
                <div className="mt-2 text-[11px] text-white/60">Confidence: {verdict.confidence||'medium'} • {timeFlag}</div>
              </div>
            </div>

            {/* Section scores — per spec: immediately useful level + section scores + strengths separately from focus areas */}
            <div className="mt-8 bg-[#F2F2F7] rounded-[20px] p-5">
              <div className="text-[11px] font-[700] tracking-widest uppercase text-[#8E8E93]">Dine resultater per område — ikke kun %</div>
              <div className="mt-3 grid grid-cols-2 lg:grid-cols-3 gap-3">
                {Object.entries(categoryPct).map(([cat,pct])=>(
                  <div key={cat} className="bg-white rounded-[12px] p-3 border border-black/5 flex justify-between items-center">
                    <div><div className="text-[11px] font-[700] uppercase">{cat}</div><div className="text-[10px] text-[#8E8E93]">{cat==='grammar'?'Grammatik':cat==='vocab'?'Ordforråd':cat==='listening'?'Lytning':cat==='reading'?'Læsning':cat==='writing'?'Skrivning':cat==='culture'?'Kultur':cat}</div></div>
                    <div className={`text-[16px] font-[700] px-2.5 py-1 rounded-full ${pct>=75?'bg-[#34C759]/15 text-[#34C759]':pct<60?'bg-[#FF9500]/15 text-[#FF9500]':'bg-black/5'}`}>{pct}%</div>
                  </div>
                ))}
              </div>
              <div className="mt-3 grid grid-cols-2 lg:grid-cols-4 gap-3">
                {Object.entries(levelPct).map(([lvl,pct])=>(
                  <div key={lvl} className="bg-white rounded-[12px] p-3 border border-black/5"><div className="text-[11px] font-[700] uppercase">{lvl}</div><div className="text-[18px] font-[700]">{pct}%</div></div>
                ))}
              </div>
              <div className="mt-3 text-[13px] leading-[1.4] text-[#3C3C43]/70">
                Niveau kræver mindst 70% på lavere niveauer for at rykke op. Fx hvis A1 er 40% bliver du i Modul 1 selvom samlet 80% (måske gættet).
                {consistency && consistency.consistent===false ? <span className="text-[#FF3B30] font-[600]"> Uregelmæssig: let {consistency.easyPct||'?'}% vs svær {consistency.hardPct||'?'}% — tyder på gæt.</span> : <span className="text-[#34C759]"> {consistency.reason||'Konsistent præstation.'}</span>}
              </div>
            </div>

            <div className="mt-6 grid lg:grid-cols-3 gap-3">
              <div className="bg-[#34C759]/10 rounded-[20px] p-5 border border-[#34C759]/20">
                <div className="text-[11px] font-[700] tracking-widest uppercase text-[#34C759]">Stærke sider 75%+ — behold</div>
                <div className="mt-3 space-y-2">
                  {strengths.length ? strengths.map((s,i)=><div key={i} className="text-[14px] font-[600]">✓ {s.category} — {s.pct}%</div>) : <div className="text-[13px] text-[#8E8E93]">Ingen styrke endnu 75%+ — bliv ved, 3 forsøg per færdighed.</div>}
                </div>
                <div className="mt-3 text-[11px] text-[#8E8E93]">Behold disse — over-øv ikke.</div>
              </div>
              <div className="bg-[#FF9500]/10 rounded-[20px] p-5 border border-[#FF9500]/20">
                <div className="text-[11px] font-[700] tracking-widest uppercase text-[#FF9500]">Fokusområder &lt;60% — vi starter her</div>
                <div className="mt-3 space-y-2">
                  {weaknesses.length ? weaknesses.map((w,i)=>(
                    <div key={i} className="text-[14px] font-[600]">
                      • {w.category} — {w.pct}%
                      {w.types && w.types.length ? <span className="text-[12px] font-[400] text-[#8E8E93]"> → {w.types.map(t=>t.type||t).join(', ')}</span> : null}
                      {typeWeak.filter(t=>t.type && w.category==='grammar').length ? <span className="text-[11px] block mt-1 font-[400] text-[#8E8E93]">Svage typer: {typeWeak.map(t=>`${t.type} ${t.pct}%`).join(', ')}</span> : null}
                    </div>
                  )) : <div className="text-[13px] text-[#8E8E93]">God balance — ingen område &lt;60%.</div>}
                </div>
                <div className="mt-3 text-[11px] text-[#8E8E93]">Vi bygger din vej fra disse først — undgår negativt sprog, fokus på næste skridt.</div>
              </div>
              <div className="bg-white rounded-[20px] p-5 border border-black/5">
                <div className="text-[11px] font-[700] tracking-widest uppercase text-[#8E8E93]">I gang 60-74% + Tempo</div>
                <div className="mt-3 space-y-1">
                  {borderline.length ? borderline.map((b,i)=><div key={i} className="text-[13px]">○ {b.category} — {b.pct}%</div>) : <div className="text-[13px] text-[#8E8E93]">Ingen borderline — enten stærk eller fokus.</div>}
                  <div className="mt-3 text-[12px] font-[600]">Gns {Math.round(timePerQ)}s / spørgsmål — {timeFlag}</div>
                  <div className="mt-2 text-[11px] text-[#8E8E93] leading-[1.4]">{typeof explanation === 'object' ? explanation.timeExpl||explanation.whyPath||'' : expSummary}</div>
                </div>
              </div>
            </div>

            {/* What was wrong — logical analysis */}
            {wrongDetails.length>0 && (
              <div className="mt-8 bg-white rounded-[20px] p-5 border border-black/5">
                <div className="text-[11px] font-[700] tracking-widest uppercase text-[#8E8E93]">Hvad gik galt — logisk analyse af dine fejl</div>
                <div className="mt-3 space-y-3">
                  {wrongDetails.map((w,i)=>{
                    const q = w.question;
                    const userOpt = q.options[w.userAnswer]||'—';
                    const correctOpt = q.options[q.a]||'—';
                    return (
                      <div key={i} className="bg-[#F2F2F7] rounded-[14px] p-3">
                        <div className="flex justify-between gap-2"><span className="text-[13px] font-[600]">{q.q}</span><span className="text-[10px] px-2 py-1 rounded-full bg-[#FF3B30] text-white shrink-0">Forkert</span></div>
                        <div className="mt-1 text-[11px] text-[#8E8E93]">{q.category} • {q.type} • {q.level} • {q.rule}</div>
                        <div className="mt-2 text-[12px]"><span className="text-[#FF3B30]">Dit svar:</span> {userOpt} • <span className="text-[#34C759]">Rigtigt:</span> {correctOpt}</div>
                        <div className="mt-2 text-[12px] leading-[1.4] bg-white rounded-[10px] p-2 border border-black/5"><b>Hvorfor:</b> {q.why}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="mt-8">
              <div className="text-[15px] font-[700] tracking-tight">Din personlige vej — bygget fra svageste færdighed</div>
              <div className="mt-4 space-y-2">
                {path.length ? path.map((p,i)=>(
                  <div key={i} className="bg-[#F2F2F7] rounded-[16px] p-4 flex gap-3 items-start">
                    <div className="w-7 h-7 rounded-full bg-black text-white grid place-items-center text-[11px] font-bold shrink-0">{p.step||i+1}</div>
                    <div className="flex-1"><div className="text-[14px] font-[600] tracking-tight">{p.title} {p.skill?`• ${p.skill}`:''}</div><div className="text-[12px] text-[#8E8E93] mt-1">{p.why} • {p.time||''}</div><div className="mt-2 inline-flex text-[11px] bg-white px-2.5 py-1 rounded-full border border-black/5">{p.type||p.skill||''} {p.skill?'fokus':''}</div></div>
                  </div>
                )) : <div className="text-[13px] text-[#8E8E93]">Din vej genereres — fokus på svageste område &lt;60% først. V2 er 80% af B1 fejl, så altid prioritet hvis svag.</div>}
              </div>
              <div className="mt-4 bg-black text-white rounded-[20px] p-5"><div className="text-[11px] font-[700] tracking-widest uppercase text-white/60">Tidslinje • Hvorfor denne vej?</div><div className="mt-2 text-[14px] leading-[1.5]">Estimeret: {timeline.text||`${timeline.months} måneder`} — {timeline.breakdown||`Base for ${verdict.level} + ${weaknesses.length} fokusområder × 0.5 måned`}. Hvorfor? Din test viser {weaknesses.map(w=>`${w.category} ${w.pct}%`).join(', ')||'blandet'} &lt;60%. Vi fokuserer V2 først fordi 80% af B1 fejl er V2. {timeline.weekly||'3-4 dage/uge er nok.'}</div></div>
            </div>

            {goalsStep ? (
              <div className="mt-8 bg-[#F2F2F7] rounded-[24px] p-6">
                <div className="text-[15px] font-[700] tracking-tight">🎯 Your why — pick up to 3 goals</div>
                <div className="text-[13px] text-[#8E8E93] mt-2 leading-[1.4]">We adapt recommendation to your goal.</div>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {allGoals.map(g=>{
                    const sel = selectedGoals.includes(g.id);
                    return (
                      <button key={g.id} onClick={()=>toggleGoal(g.id)} className={sel ? "text-left p-4 rounded-[16px] border bg-black text-white border-black" : "text-left p-4 rounded-[16px] border bg-white border-black/5"}>
                        <div className="flex items-start justify-between gap-2"><div className="text-[14px] font-[600]">{g.icon} {g.label}</div><div className={sel ? "w-6 h-6 rounded-full grid place-items-center text-[11px] bg-white text-black" : "w-6 h-6 rounded-full grid place-items-center text-[11px] bg-[#F2F2F7]"}>{sel?'✓':''}</div></div>
                        <div className={sel ? "text-[11px] mt-1 leading-[1.3] text-white/70" : "text-[11px] mt-1 leading-[1.3] text-[#8E8E93]"}>{g.desc}</div>
                      </button>
                    );
                  })}
                </div>
                <div className="mt-5 flex gap-2"><button onClick={handleSaveGoals} disabled={selectedGoals.length===0} className="flex-1 bg-black text-white py-4 rounded-full text-[15px] font-[600] disabled:opacity-40">Save {selectedGoals.length} goals → Practice</button><button onClick={()=>setGoalsStep(false)} className="px-5 py-4 rounded-full bg-white border border-black/10 text-[14px] font-[600]">Skip</button></div>
              </div>
            ) : (
              <div className="mt-8 space-y-4">
                <div className="flex gap-3 justify-center flex-wrap">
                  <button onClick={()=>setActive('path')} className="bg-black text-white px-8 py-4 rounded-full text-[16px] font-[600] shadow-[0_8px_24px_rgba(0,0,0,0.15)]">See My Learning Path →</button>
                  <button onClick={()=>setActive('practice')} className="bg-white border border-black/10 px-6 py-3.5 rounded-full text-[15px] font-[600]">Go to practice →</button>
                </div>
                <div className="flex gap-3 justify-center flex-wrap">
                  <button onClick={()=>setActive('register')} className="bg-[#007AFF] text-white px-8 py-3.5 rounded-full text-[15px] font-[600]">Start Learning → Create Account</button>
                  <button onClick={()=>setGoalsStep(true)} className="bg-[#F2F2F7] px-5 py-3.5 rounded-full text-[13px] font-[600]">Edit goals ({getGoals().length||selectedGoals.length})</button>
                </div>
                <div className="text-center text-[11px] text-[#8E8E93]">No account required to see results • Path preview free • Create account to save journey per spec</div>
              </div>
            )}
          </div>

          <div className="mt-8 space-y-3">
            <h3 className="text-[20px] font-[700] tracking-tight">Review — why answers are correct, what to do next</h3>
            <div className="text-[13px] text-[#8E8E93]">Each answer shows rule, why your wrong choice was tempting, and which stage it belongs to. Never lost.</div>
            {questions.map(q=>{
              const userAns = answers[q.id];
              const correct = userAns===q.a;
              const stage = getStageById(q.level==='A1'?'m1':q.level==='A2'?'m2':q.level==='B1'?'m3':q.level==='B2'?'m4':'m3');
              const cardClass = correct ? "bg-white rounded-[20px] p-5 shadow-sm border border-[#34C759]/20" : "bg-white rounded-[20px] p-5 shadow-sm border border-[#FF3B30]/20";
              const badgeClass = correct ? "text-[11px] px-2.5 py-1 rounded-full font-[600] shrink-0 bg-[#34C759] text-white" : "text-[11px] px-2.5 py-1 rounded-full font-[600] shrink-0 bg-[#FF3B30] text-white";
              return (
                <div key={q.id} className={cardClass}>
                  <div className="flex justify-between gap-3"><span className="text-[14px] font-[500] leading-tight">{q.q}</span><span className={badgeClass}>{correct?'Correct':'Wrong'}</span></div>
                  <div className="mt-2 flex gap-2 flex-wrap"><span className="text-[11px] px-2 py-1 rounded-full bg-[#F2F2F7]">{q.category} {q.type} {q.level}</span><span className="text-[11px] px-2 py-1 rounded-full bg-black text-white">{stage ? stage.title : q.level}</span><span className="text-[11px] text-[#8E8E93]">{timePerQ[q.id]||'?'}s {q.difficulty}</span></div>
                  <div className="mt-2 text-[12px] text-[#8E8E93]">Your answer: {q.options[userAns]} • Correct: {q.options[q.a]}</div>
                  <div className="mt-3 text-[13px] leading-[1.4] bg-[#F2F2F7] rounded-[12px] p-3"><b>Why:</b> {q.why}<br/><b>What next:</b> Practice {q.rule} in {stage ? stage.title : 'current stage'} — {stage ? stage.objective.slice(0,100) : ''}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F2F2F7] pb-[120px]">
      <div className="max-w-[760px] mx-auto px-5 lg:px-8 pt-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="text-[13px] font-[600] tracking-tight">Question {idx+1} of {total}</div>
            <Dots current={idx+1} total={total} />
          </div>
          <div className="text-[11px] font-[600] px-3 py-1.5 rounded-full bg-white border border-black/5 shadow-sm">{currentQ.category} {currentQ.type} {currentQ.level} {currentQ.difficulty}</div>
        </div>

        <div className="mt-3 h-2 bg-white rounded-full overflow-hidden border border-black/5 shadow-sm"><div className="h-full bg-black rounded-full transition-all duration-500" style={{ width: ((idx+1)/total*100) + "%" }} /></div>
        <div className="mt-2 flex justify-between text-[11px] text-[#8E8E93]"><span>{((idx+1)/total*100).toFixed(0) + "% " + answered + " answered"}</span><span>{timePerQ[currentQ.id] ? timePerQ[currentQ.id]+"s" : ""}</span></div>

        <div className="mt-8 bg-white rounded-[32px] p-7 shadow-sm border border-black/5">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[11px] font-[700] tracking-widest uppercase bg-black text-white px-3 py-1.5 rounded-full">{currentQ.category}</span>
            <span className="text-[11px] font-[600] px-2.5 py-1 rounded-full bg-[#F2F2F7]">{currentQ.skill}</span>
            <span className="text-[11px] text-[#8E8E93]">{currentQ.rule} {currentQ.difficulty}</span>
          </div>

          <h2 className="text-[24px] font-[700] tracking-tight leading-tight">{currentQ.q}</h2>
          <div className="mt-2 text-[13px] text-[#8E8E93]">Expected action: Choose correct option. After choosing you get why, not just correct/wrong. You are never lost — next step always obvious.</div>

          {currentQ.variation ? <div className="mt-3 inline-flex text-[11px] bg-[#007AFF]/10 text-[#007AFF] px-3 py-1 rounded-full">Variation: {currentQ.variation.name||'Anna'} {currentQ.variation.place||'København'} Seed {userSeed.slice(0,6)} different learners different sentences</div> : null}

          <div className="mt-6 space-y-2">
            {currentQ.options.map((opt,oi)=>{
              const isSelected = answers[currentQ.id]===oi;
              const btnClass = isSelected ? "w-full text-left px-6 py-4 rounded-full border text-[17px] font-[500] flex justify-between items-center bg-black text-white border-black" : "w-full text-left px-6 py-4 rounded-full border text-[17px] font-[500] flex justify-between items-center bg-[#F2F2F7] border-transparent";
              const dotClass = isSelected ? "w-7 h-7 rounded-full grid place-items-center text-[12px] bg-white text-black" : "w-7 h-7 rounded-full grid place-items-center text-[12px] bg-white border border-black/10";
              return (
                <button key={oi} onClick={()=>handleAnswer(oi)} className={btnClass}>
                  <span>{opt}</span><span className={dotClass}>{isSelected?'✓':''}</span>
                </button>
              );
            })}
          </div>

          {answers[currentQ.id]!==undefined ? (
            <div className={answers[currentQ.id]===currentQ.a ? "mt-6 p-5 rounded-[20px] text-[15px] leading-[1.5] border bg-[#34C759]/10 border-[#34C759]/20" : "mt-6 p-5 rounded-[20px] text-[15px] leading-[1.5] border bg-[#FF3B30]/10 border-[#FF3B30]/20"}>
              <div className="flex items-center gap-2"><span className={answers[currentQ.id]===currentQ.a ? "w-7 h-7 rounded-full grid place-items-center text-[12px] font-bold bg-[#34C759] text-white" : "w-7 h-7 rounded-full grid place-items-center text-[12px] font-bold bg-[#FF3B30] text-white"}>{answers[currentQ.id]===currentQ.a?'✓':'✗'}</span><b>{answers[currentQ.id]===currentQ.a?'Correct':'Not correct, but important learning'} — {currentQ.rule}</b></div>
              <div className="mt-3">{currentQ.why}</div>
              <div className="mt-4 bg-white rounded-[12px] p-3 text-[13px] border border-black/5"><b>What next:</b> {answers[currentQ.id]===currentQ.a?'Great, keep going — this is '+currentQ.skill+' in '+currentQ.level+'.':'Practice '+currentQ.skill+' — this is Stage '+(currentQ.level==='A2'?'2':currentQ.level==='B1'?'3':'4')+' bottleneck. 80% of B1 errors are V2, so this matters.'} Next question will be {idx+1<total-1?questions[idx+1].type:'result'} {idx+1<total-1?questions[idx+1].level:'final'}.</div>
            </div>
          ) : null}

          <div className="mt-8 flex gap-3">
            <button onClick={prevQ} disabled={idx===0} className="px-5 py-3.5 rounded-full bg-[#F2F2F7] text-[14px] font-[600] disabled:opacity-40">← Back</button>
            <button onClick={nextQ} disabled={answers[currentQ.id]===undefined} className="flex-1 bg-black text-white py-4 rounded-full text-[17px] font-[600] shadow-lg disabled:opacity-40"> {idx===total-1?'Finish and see level beyond % →':'Next Q '+(idx+2)+' of '+total+' →'} </button>
          </div>

          <div className="mt-4 text-[11px] text-[#8E8E93] text-center">Interactive, not questionnaire • You always know where you are • Variation prevents memorisation • Different learners get different sentences for same skill</div>
        </div>

        <div className="mt-6 bg-black text-white rounded-[24px] p-5">
          <div className="text-[11px] font-[700] tracking-widest uppercase text-white/60">Principle: explanation before drill, English first</div>
          <div className="mt-2 text-[14px] leading-[1.5] text-white/90">Each question shows where Danish differs from English. You already know V2 in English (Never have I...). In Danish you do it always. That's the bridge. After test we show not just %, but per-category less 60% weakness, 75%+ strength, consistency, time — and build path from weakest.</div>
        </div>
      </div>
    </div>
  );
}
