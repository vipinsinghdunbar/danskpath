import { useState, useEffect } from 'react';
import { stages, getAllStagesProgress, getStageById } from '../lib/stageEngine';
import { markStageClearedServer } from '../lib/progressSync';

export default function PathView({ setActive }) {
  const [progresses, setProgresses] = useState([]);
  const [activeModule, setActiveModule] = useState('m1');

  useEffect(()=>{
    setProgresses(getAllStagesProgress());
    const level = localStorage.getItem('dansk_level') || 'Modul 1';
    if(level.includes('Modul 1')) setActiveModule('m1');
    else if(level.includes('Modul 2')) setActiveModule('m2');
    else if(level.includes('Modul 3')) setActiveModule('m3');
    else if(level.includes('Modul 4')) setActiveModule('m4');
    else if(level.includes('Modul 5')) setActiveModule('m5');
    else setActiveModule('m1');
  },[]);

  const activeStage = getStageById(activeModule) || stages[0];
  const activeProgress = progresses.find(p=>p.stage.moduleId===activeModule)?.progress || { overall: 0, cleared: false, grammarDone: 0, grammarTotal: activeStage.grammarRequirements.length };

  const tap = (id) => { 
    if(navigator.vibrate) navigator.vibrate(10); 
    setActive(id); 
  };

  const markDone = async () => {
    if(navigator.vibrate) navigator.vibrate(20);
    const key = `stage_${activeModule}_cleared`;
    localStorage.setItem(key, 'true');
    try {
      const progress = JSON.parse(localStorage.getItem('dansk_progress')||'{}');
      activeStage.grammarRequirements.forEach(t=>{
        progress[`grammar_${t}`] = true;
      });
      localStorage.setItem('dansk_progress', JSON.stringify(progress));
    } catch {}
    try {
      await markStageClearedServer(activeModule, activeStage.grammarRequirements);
    } catch {}
    setProgresses(getAllStagesProgress());
    setTimeout(()=>{
      tap('practice');
    }, 300);
  };

  const continueToNext = () => {
    if(navigator.vibrate) navigator.vibrate(10);
    const idx = stages.findIndex(s=>s.moduleId===activeModule);
    if(idx>=0 && idx<stages.length-1){
      const next = stages[idx+1];
      setActiveModule(next.moduleId);
      window.scrollTo(0,0);
      setTimeout(()=>tap('practice'), 600);
    } else {
      tap('practice');
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFBF5] pb-[120px]">
      <div className="max-w-[1100px] mx-auto px-5 lg:px-8 pt-6">
        {/* Header - minimal, no long marketing */}
        <div className="flex items-center justify-between">
          <button onClick={()=>setActive('simple-landing')} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-black text-white grid place-items-center font-bold text-[12px]">D</div>
            <span className="text-[13px] font-[700]">DanskPath</span>
          </button>
          <span className="text-[11px] text-[#8E8E93]">Learning Path</span>
        </div>

        <div className="mt-8">
          <h1 className="text-[28px] font-[700] tracking-tight leading-[0.95]">Din vej</h1>
          <p className="mt-2 text-[15px] leading-[1.4] text-[#3C3C43]/70 max-w-[500px]">Vælg et modul til venstre for at se hvad du lærer.</p>
        </div>

        <div className="mt-8 grid lg:grid-cols-[300px_1fr] gap-6">
          {/* LEFT — Vertical Roadmap - minimal */}
          <div className="bg-white rounded-[24px] p-4 shadow-sm border border-black/5 h-fit lg:sticky lg:top-6">
            <div className="relative">
              <div className="absolute left-[16px] top-[8px] bottom-[8px] w-[2px] border-l-2 border-dashed border-black/10" />
              
              <div className="space-y-2">
                {stages.map((s, idx)=>{
                  const isActive = activeModule===s.moduleId;
                  const prog = progresses.find(p=>p.stage.id===s.id)?.progress;
                  const isDone = prog?.cleared;
                  
                  return (
                    <button 
                      key={s.id} 
                      onClick={()=>{
                        if(navigator.vibrate) navigator.vibrate(10);
                        setActiveModule(s.moduleId);
                      }} 
                      className={`relative w-full text-left pl-[48px] pr-3 py-3 rounded-[16px] border transition-all ${isActive ? 'bg-black text-white border-black shadow' : isDone ? 'bg-[#34C759]/10 border-[#34C759]/20' : 'bg-[#F2F2F7] border-transparent hover:bg-white'}`}
                    >
                      <div className={`absolute left-0 top-[14px] w-8 h-8 rounded-full grid place-items-center text-[11px] font-bold border-2 ${isDone ? 'bg-[#34C759] text-white border-[#34C759]' : isActive ? 'bg-white text-black border-white' : 'bg-white text-[#8E8E93] border-black/10'}`}>
                        {isDone ? '✓' : idx+1}
                      </div>
                      
                      <div className={`text-[13px] font-[700] leading-tight ${isActive ? 'text-white' : 'text-black'}`}>Modul {idx+1}</div>
                      <div className={`text-[11px] mt-0.5 ${isActive ? 'text-white/60' : 'text-[#8E8E93]'}`}>{s.cefl} • {prog?.overall||0}%</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT — What you will learn in selected section - minimal, no excessive text */}
          <div className="space-y-4">
            <div className="bg-white rounded-[24px] p-6 shadow-sm border border-black/5">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <div className="text-[11px] font-[700] tracking-widest uppercase bg-black text-white px-3 py-1 rounded-full inline-flex">Modul {stages.findIndex(s=>s.moduleId===activeModule)+1} • {activeStage.cefl}</div>
                  <h2 className="mt-3 text-[22px] font-[700] tracking-tight">{activeStage.title.replace('Modul','Modul').split('—')[0].trim()}</h2>
                  <p className="mt-2 text-[14px] leading-[1.5] text-[#3C3C43]/70">{activeStage.objective.slice(0,120)}...</p>
                </div>
                <div className={`text-[11px] px-2.5 py-1 rounded-full font-[600] ${activeProgress?.cleared ? 'bg-[#34C759] text-white' : 'bg-[#F2F2F7]'}`}>
                  {activeProgress?.cleared ? '✓ Cleared' : `${activeProgress?.overall||0}%`}
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="bg-[#F2F2F7] rounded-[14px] p-3">
                  <div className="text-[10px] font-[700] uppercase text-[#8E8E93]">Grammar</div>
                  <div className="mt-1 text-[14px] font-[700]">{activeProgress?.grammarDone||0}/{activeStage.grammarRequirements.length}</div>
                </div>
                <div className="bg-[#F2F2F7] rounded-[14px] p-3">
                  <div className="text-[10px] font-[700] uppercase text-[#8E8E93]">Vocab</div>
                  <div className="mt-1 text-[14px] font-[700]">{activeStage.vocabRequirements.count} ord</div>
                </div>
              </div>

              <div className="mt-5 flex gap-2 flex-wrap">
                {!activeProgress?.cleared ? (
                  <>
                    <button onClick={markDone} className="px-5 py-2.5 rounded-full bg-[#34C759] text-white text-[13px] font-[600]">Markér færdig ✓</button>
                    <button onClick={()=>tap('practice')} className="px-5 py-2.5 rounded-full bg-black text-white text-[13px] font-[600]">Øvelser →</button>
                  </>
                ) : (
                  <>
                    <button onClick={continueToNext} className="px-5 py-2.5 rounded-full bg-black text-white text-[13px] font-[600]">Continue →</button>
                    <button onClick={()=>tap('practice')} className="px-5 py-2.5 rounded-full bg-white border border-black/10 text-[13px] font-[600]">Øvelser →</button>
                  </>
                )}
              </div>

              <div className="mt-5">
                <div className="text-[11px] font-[700] uppercase text-[#8E8E93]">What you will learn</div>
                <div className="mt-2 text-[13px] leading-[1.5] text-[#3C3C43]/80">{activeStage.difficulty.sentenceLen} • {activeStage.difficulty.grammar.slice(0,80)}...</div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {activeStage.grammarRequirements.slice(0,4).map(g=><span key={g} className="text-[11px] bg-[#F2F2F7] px-2.5 py-1 rounded-full">{g}</span>)}
                  {activeStage.grammarRequirements.length>4 && <span className="text-[11px] text-[#8E8E93]">+{activeStage.grammarRequirements.length-4} more</span>}
                </div>
              </div>

              <div className="mt-5">
                <div className="text-[11px] font-[700] uppercase text-[#8E8E93]">What you will learn in this module — {activeStage.cefl}</div>
                <div className="mt-2 text-[13px] leading-[1.5] bg-[#F2F2F7] rounded-[12px] p-3">
                  <div><b>Objective:</b> {activeStage.objective}</div>
                  <div className="mt-2"><b>Grammar:</b> {activeStage.grammarRequirements.join(', ')}</div>
                  <div className="mt-1"><b>Vocab:</b> {activeStage.vocabRequirements.count} ord • {activeStage.vocabRequirements.type} • {activeStage.vocabRequirements.mastery}% mastery</div>
                  <div className="mt-1"><b>Sentence:</b> {activeStage.difficulty.sentenceLen}</div>
                  <div className="mt-1 text-[11px] text-[#8E8E93]"><b>Diff from prev:</b> {activeStage.difficulty.diffFromPrev}</div>
                </div>
              </div>

              <div className="mt-5">
                <div className="text-[11px] font-[700] uppercase text-[#8E8E93]">Exercises in this module — stays on app, no architectural map</div>
                <div className="mt-2 space-y-2">
                  {activeStage.moduleId==='m1' && (
                    <>
                      <div className="flex gap-2 items-start text-[13px] bg-[#F2F2F7] rounded-[12px] p-3"><span className="w-6 h-6 rounded-full bg-black text-white grid place-items-center text-[10px] shrink-0">1</span><div><b>Grammatik:</b> Alfabet æøå, SVO (Jeg hedder Ali), nutid -r, en/et • 3-6 ord sætninger • Example: Jeg hedder Anna. Jeg er 32 år.</div></div>
                      <div className="flex gap-2 items-start text-[13px] bg-[#F2F2F7] rounded-[12px] p-3"><span className="w-6 h-6 rounded-full bg-[#F2F2F7] border border-black/10 grid place-items-center text-[10px] shrink-0">2</span><div><b>Ord • 200 ord:</b> family, home, time, daily routine • 10 flashcards • Box 0→5 SRS • receptive 200, active 100</div></div>
                      <div className="flex gap-2 items-start text-[13px] bg-[#F2F2F7] rounded-[12px] p-3"><span className="w-6 h-6 rounded-full bg-[#F2F2F7] border border-black/10 grid place-items-center text-[10px] shrink-0">3</span><div><b>Lyt • A1:</b> Alphabet dictation, numbers, slow clear speech • No reductions • Signs Åben/Lukket</div></div>
                      <div className="flex gap-2 items-start text-[13px] bg-[#F2F2F7] rounded-[12px] p-3"><span className="w-6 h-6 rounded-full bg-[#F2F2F7] border border-black/10 grid place-items-center text-[10px] shrink-0">4</span><div><b>Skriv • 30-50 ord:</b> My family, my flat • S-V-O only, present -r, en/et • Introduce yourself 30 sec</div></div>
                    </>
                  )}
                  {activeStage.moduleId==='m2' && (
                    <>
                      <div className="flex gap-2 items-start text-[13px] bg-[#F2F2F7] rounded-[12px] p-3"><span className="w-6 h-6 rounded-full bg-black text-white grid place-items-center text-[10px] shrink-0">1</span><div><b>Grammatik:</b> V2 inversion I dag arbejder jeg hjemme, past -ede arbejdede, flertal biler/huse, en/et + definite -en/-et, fordi • 6-9 ord: I dag arbejder jeg hjemme, fordi jeg er syg.</div></div>
                      <div className="flex gap-2 items-start text-[13px] bg-[#F2F2F7] rounded-[12px] p-3"><span className="w-6 h-6 rounded-full bg-[#F2F2F7] border border-black/10 grid place-items-center text-[10px] shrink-0">2</span><div><b>Ord • 400 ord:</b> work, transport, shopping, health • collocations holde fri, tage bussen, holde møde • Box SRS</div></div>
                      <div className="flex gap-2 items-start text-[13px] bg-[#F2F2F7] rounded-[12px] p-3"><span className="w-6 h-6 rounded-full bg-[#F2F2F7] border border-black/10 grid place-items-center text-[10px] shrink-0">3</span><div><b>Lyt • A1-A2:</b> Monologue slow, DSB announcement delay, telephone slow with transcript first • DSB</div></div>
                      <div className="flex gap-2 items-start text-[13px] bg-[#F2F2F7] rounded-[12px] p-3"><span className="w-6 h-6 rounded-full bg-[#F2F2F7] border border-black/10 grid place-items-center text-[10px] shrink-0">4</span><div><b>Skriv • 60-80 ord:</b> Sick message, invitation, delay • V2 + fordi, past -ede • Explain delay 1 min</div></div>
                    </>
                  )}
                  {activeStage.moduleId==='m3' && (
                    <>
                      <div className="flex gap-2 items-start text-[13px] bg-[#007AFF]/10 rounded-[12px] p-3 border border-[#007AFF]/20"><span className="w-6 h-6 rounded-full bg-[#007AFF] text-white grid place-items-center text-[10px] shrink-0">1</span><div><b>Grammatik M3 Independent A2-B1:</b> Subordinate at han ikke kommer (ikke FØR verbet), har/er perfect Jeg har boet her i 3 år, reflexive glæde sig, prepositions vente på • 9-14 ord: Jeg ved, at håndværkeren ikke kommer i morgen, fordi han er syg. • Biggest shift: main → subordinate flips word order</div></div>
                      <div className="flex gap-2 items-start text-[13px] bg-[#F2F2F7] rounded-[12px] p-3"><span className="w-6 h-6 rounded-full bg-[#F2F2F7] border border-black/10 grid place-items-center text-[10px] shrink-0">2</span><div><b>Ord • 700 ord:</b> housing, health, community, work • collocations vente på, glæde sig til, tage stilling til • 700 ord B1 independent</div></div>
                      <div className="flex gap-2 items-start text-[13px] bg-[#F2F2F7] rounded-[12px] p-3"><span className="w-6 h-6 rounded-full bg-[#F2F2F7] border border-black/10 grid place-items-center text-[10px] shrink-0">3</span><div><b>Lyt • B1 telephone:</b> Borgerservice without transcript first, DR slow news, 25% reductions d'er, skaddu • No transcript first</div></div>
                      <div className="flex gap-2 items-start text-[13px] bg-[#F2F2F7] rounded-[12px] p-3"><span className="w-6 h-6 rounded-full bg-[#F2F2F7] border border-black/10 grid place-items-center text-[10px] shrink-0">4</span><div><b>Skriv • 80-120 ord:</b> Email landlord about craftsman, message doctor, community garden post • subordinate at/fordi/hvis, skal + infinitive • Explain why late 2 min</div></div>
                    </>
                  )}
                  {activeStage.moduleId==='m4' && (
                    <>
                      <div className="flex gap-2 items-start text-[13px] bg-[#FF9500]/10 rounded-[12px] p-3 border border-[#FF9500]/20"><span className="w-6 h-6 rounded-full bg-[#FF9500] text-white grid place-items-center text-[10px] shrink-0">1</span><div><b>Grammatik M4 Fluent B1:</b> Strong verbs drikke/drak/drukket vowel shift, sin/hans distinction critical Anna henter sin søn vs hendes søn, selvom/hvis/når/da, den/det pronoun • 12-18 ord: Selvom skoene kun er to uger gamle, er de allerede i stykker, derfor vil jeg gerne have pengene tilbage. • From regular to strong verbs</div></div>
                      <div className="flex gap-2 items-start text-[13px] bg-[#F2F2F7] rounded-[12px] p-3"><span className="w-6 h-6 rounded-full bg-[#F2F2F7] border border-black/10 grid place-items-center text-[10px] shrink-0">2</span><div><b>Ord • 1000 ord:</b> complaint, job, debate, transport • strong verbs i-a-u families, debate connectors fordele, ulemper, på den ene side</div></div>
                      <div className="flex gap-2 items-start text-[13px] bg-[#F2F2F7] rounded-[12px] p-3"><span className="w-6 h-6 rounded-full bg-[#F2F2F7] border border-black/10 grid place-items-center text-[10px] shrink-0">3</span><div><b>Lyt • B1:</b> DR news normal speed, multi-speaker, podcast slow, reductions 25% • DR + multi-speaker</div></div>
                      <div className="flex gap-2 items-start text-[13px] bg-[#F2F2F7] rounded-[12px] p-3"><span className="w-6 h-6 rounded-full bg-[#F2F2F7] border border-black/10 grid place-items-center text-[10px] shrink-0">4</span><div><b>Skriv • 120-150 ord:</b> Complain broken shoes, job application, debate bike vs bus • fordele/ulemper, på den ene side/på den anden side, derfor, selvom • Job interview 3 min</div></div>
                    </>
                  )}
                  {activeStage.moduleId==='m5' && (
                    <>
                      <div className="flex gap-2 items-start text-[13px] bg-black text-white rounded-[12px] p-3"><span className="w-6 h-6 rounded-full bg-white text-black grid place-items-center text-[10px] shrink-0">1</span><div><b>Grammatik M5 PD3 ready B1-B2:</b> All 17 topics combined 2-3 rules at once, Passive bliver + past participle, relative der/som, modal particles jo/da/vel shared knowledge • 15-25 ord: Det er jo klart, at selvom man har boet her i tre år, har man ikke nødvendigvis forstået, hvorfor danskerne deler æren med teamet. • From 1 rule to 2-3 combined • No new grammar, only exam format + time pressure</div></div>
                      <div className="flex gap-2 items-start text-[13px] bg-[#F2F2F7] rounded-[12px] p-3"><span className="w-6 h-6 rounded-full bg-[#F2F2F7] border border-black/10 grid place-items-center text-[10px] shrink-0">2</span><div><b>Ord • 1354 active, 3000-4000 receptive:</b> argumentation bæredygtig, for det første, derudover, til sidst, fællesskab • collocations that work in speech</div></div>
                      <div className="flex gap-2 items-start text-[13px] bg-[#F2F2F7] rounded-[12px] p-3"><span className="w-6 h-6 rounded-full bg-[#F2F2F7] border border-black/10 grid place-items-center text-[10px] shrink-0">3</span><div><b>Lyt • B2:</b> DR podcast normal speed, fast telephone, multi-speaker debate, all reductions • Podcast speed • PD3 mundtlig picture description 2 min + discussion 4 min with jo/da/vel</div></div>
                      <div className="flex gap-2 items-start text-[13px] bg-[#F2F2F7] rounded-[12px] p-3"><span className="w-6 h-6 rounded-full bg-[#F2F2F7] border border-black/10 grid place-items-center text-[10px] shrink-0">4</span><div><b>Skriv • 150-200 ord PD3:</b> PD3 structure indledning, 2 argumenter, konklusion, for det første/derudover/til sidst, jo/da • Culture: Folketing 179, flexicurity, jantelov • Exam PD3 6 parts • 150-200 ord</div></div>
                    </>
                  )}
                  {/* Fallback for unknown */}
                  {!['m1','m2','m3','m4','m5'].includes(activeStage.moduleId) && (
                    <>
                      <div className="flex gap-2 items-center text-[13px]"><span className="w-6 h-6 rounded-full bg-black text-white grid place-items-center text-[10px]">1</span> Practice {activeStage.grammarRequirements[0] || 'grammar'} • {activeStage.difficulty.sentenceLen.split(':')[0] || '6-9 words'}</div>
                      <div className="flex gap-2 items-center text-[13px]"><span className="w-6 h-6 rounded-full bg-[#F2F2F7] grid place-items-center text-[10px]">2</span> 10 flashcards • {activeStage.vocabRequirements.count} ord • {activeStage.vocabRequirements.type.split(' ')[0] || 'daily'}</div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[20px] p-4 border border-black/5 flex gap-2">
              <button onClick={()=>tap('practice')} className="flex-1 bg-black text-white py-3 rounded-full text-[13px] font-[600]">Practice →</button>
              <button onClick={()=>tap('progress')} className="flex-1 bg-[#F2F2F7] py-3 rounded-full text-[13px] font-[600]">Progress →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
