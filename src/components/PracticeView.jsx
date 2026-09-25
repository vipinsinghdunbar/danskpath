import { useMemo, useState, useEffect } from 'react';
import { vocabulary } from '../data/vocabulary';
import { grammarTopics } from '../data/grammar';
import { getBox } from '../lib/srs';
import { getPace, getCanDoProgress, getUnlocksForTopic } from '../lib/motivation';
import { getModuleProgress } from '../lib/levelEngine';
import { getWeeklyWriting } from '../lib/writingEngine';
import { getGoals, getGoalHelpText, getRelevantTopicsForGoals } from '../lib/goals';

function getProgress() {
  try { return JSON.parse(localStorage.getItem('dansk_progress')||'{}'); } catch { return {}; }
}
function getScores() {
  try { return JSON.parse(localStorage.getItem('dansk_scores')||'{}'); } catch { return {}; }
}

export default function PracticeView({ setActive }) {
  const [now, setNow] = useState(Date.now());
  useEffect(()=>{ const id=setInterval(()=>setNow(Date.now()), 60000); return ()=>clearInterval(id); },[]);

  const data = useMemo(()=>{
    const progress = getProgress();
    const scores = getScores();
    const srsBoxes = vocabulary.map(v=>getBox(v.id));
    const box0 = srsBoxes.filter(b=>b===0).length;
    const box1 = srsBoxes.filter(b=>b===1).length;
    const box2plus = srsBoxes.filter(b=>b>=2).length;

    const grammarDone = grammarTopics.filter(t=>progress[`grammar_${t.id}`]).length;
    const listeningAttempts = scores.listeningAttempts || 0;
    const listeningAcc = scores.listeningAcc || 0;
    const readingAttempts = scores.readingAttempts || 0;
    const writingAttempts = scores.writingAttempts || 0;
    const cultureDone = (progress.cultureDone || 0);
    const level = localStorage.getItem('dansk_level') || null;
    const diagnosticDone = !!localStorage.getItem('dansk_diagnostic');

    const pace = getPace();
    const canDo = getCanDoProgress().filter(c=>c.done).slice(-3);
    const nextCanDo = getCanDoProgress().find(c=>!c.done);
    const userGoals = getGoals();
    const relevantTopics = getRelevantTopicsForGoals();

    let recommendation = null;
    let unlock = null;

    if(!diagnosticDone) {
      recommendation = {
        title: "Find your level",
        subtitle: "7 min • Personalized path",
        why: "We don't know where you are yet. A short test places you on Modul 1-5 (A1→B2) and adapts your path from zero to PD3. No comparison, just your journey.",
        action: { label: "Take level test", target: "diagnostic", icon: "→" },
        type: "diagnostic",
        color: "#007AFF",
        time: "7 min",
      };
      unlock = { title: "Unlocks your personal path", functional: "Know exactly where to start" };
    } else if(listeningAcc < 60 && listeningAttempts < 8) {
      recommendation = {
        title: "Phone borgerservice",
        subtitle: "Without transcript first",
        why: "Danish swallows 25% of syllables. You read B1 but hear A2 — normal, and it slows you at work. 1 listening exercise now gives most progress.",
        action: { label: "Listen now", target: "listening", icon: "♪" },
        type: "listening",
        color: "#5856D6",
        time: "8 min",
      };
      unlock = getUnlocksForTopic('v2');
    } else if(relevantTopics.length>0) {
      const goalTopic = relevantTopics.find(t=>!progress[`grammar_${t}`]) || relevantTopics[0];
      const helpText = getGoalHelpText(goalTopic);
      recommendation = {
        title: getUnlocksForTopic(goalTopic).title,
        subtitle: goalTopic.toUpperCase() + " • Goal-driven",
        why: helpText ? `${helpText}. ${getUnlocksForTopic(goalTopic).desc}` : getUnlocksForTopic(goalTopic).desc,
        action: { label: `Practice ${goalTopic}`, target: "grammar", icon: "✦" },
        type: "grammar",
        color: "#007AFF",
        time: "10 min",
        goalHelp: helpText,
      };
      unlock = getUnlocksForTopic(goalTopic);
    } else if(box0 > 250) {
      recommendation = {
        title: "10 flashcards",
        subtitle: "Collocations that work in speech",
        why: `You have ${box0} words in Box 0 (not practiced). Brain learns not from seeing new words, but recognizing old ones.`,
        action: { label: "Flashcards", target: "vocab", icon: "✧" },
        type: "vocab",
        color: "#34C759",
        time: "10 min",
      };
      unlock = { title: "Say 'holde et møde' correctly", functional: "Not just 'meeting' but whole collocation" };
    } else if(grammarDone < 5) {
      recommendation = {
        title: "V2 rule — I morgen skal jeg...",
        subtitle: "Verb on position 2",
        why: "In Danish verb must be on position 2 in main clauses. In English you do it sometimes (Never have I...). In Danish always. Fastest way to fewer errors.",
        action: { label: "Practice V2", target: "grammar", icon: "✦" },
        type: "grammar",
        color: "#007AFF",
        time: "10 min",
      };
      unlock = getUnlocksForTopic('v2');
    } else if(writingAttempts < 2) {
      recommendation = {
        title: getWeeklyWriting('m3').title,
        subtitle: "80-120 words • Weekly new",
        why: "When you write, you force brain to produce V2 and subordinate clauses. Without writing, grammar stays passive.",
        action: { label: "Write now", target: "writing", icon: "✍️" },
        type: "writing",
        color: "#FF9500",
        time: "15 min",
      };
      unlock = getUnlocksForTopic('bindeord');
    } else {
      recommendation = {
        title: "Flat structure at work",
        subtitle: "Danish work culture",
        why: "Your listening is over 60% and V2 is solid. Next: understand Danish work culture — directly relevant for PD3.",
        action: { label: "Read now", target: "reading", icon: "📖" },
        type: "reading",
        color: "#5856D6",
        time: "10 min",
      };
      unlock = { title: "Understand jantelov at work", functional: "You understand why Danes share credit" };
    }

    const levelId = level?.includes('Modul 1') ? 'm1' : level?.includes('Modul 2') ? 'm2' : level?.includes('Modul 4') ? 'm4' : level?.includes('Modul 5') ? 'm5' : 'm3';
    const modProgress = getModuleProgress(levelId);
    const weeklyWriting = getWeeklyWriting(levelId);

    return { box0, box1, box2plus, grammarDone, listeningAttempts, listeningAcc, readingAttempts, writingAttempts, cultureDone, level, diagnosticDone, recommendation, unlock, progress, pace, canDo, nextCanDo, modProgress, weeklyWriting, userGoals, relevantTopics };
  },[now]);

  const handleTap = (target) => {
    if(navigator.vibrate) navigator.vibrate(10);
    setActive(target);
  };

  return (
    <div className="min-h-screen bg-[#F2F2F7] pb-[120px]">
      <div className="max-w-[1100px] mx-auto px-5 lg:px-8 pt-8">
        {/* iOS Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-black text-white grid place-items-center text-[12px] font-bold">D</div>
              <span className="text-[13px] font-[600] tracking-tight">DanskPath • Today</span>
              <span className="text-[11px] px-2.5 py-1 rounded-full bg-white shadow-sm border border-black/5">15 min • 1 hand</span>
            </div>
            <h1 className="ios-large-title">What should you<br/>practice now?</h1>
            <p className="mt-3 text-[17px] leading-[1.4] tracking-tight text-[#3C3C43]/70 max-w-[600px]">No streaks. No hearts. Just what moves you toward Modultest and PD3. One action — why it matters now, and what it unlocks in real life.</p>
            
            {data.userGoals?.length>0 ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {data.userGoals.map(g=>(
                  <span key={g.id} className="text-[13px] bg-white shadow-sm border border-black/5 rounded-full px-3.5 py-2 font-[500]">{g.icon} {g.label}</span>
                ))}
                <button onClick={()=>handleTap('diagnostic')} className="text-[13px] bg-black/5 rounded-full px-3.5 py-2 font-[500] hover:bg-black/10 transition">Edit</button>
              </div>
            ) : (
              <div className="mt-4 bg-white rounded-[20px] p-4 shadow-sm border border-black/5 inline-flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#F2F2F7] grid place-items-center">🎯</div>
                <div>
                  <div className="text-[14px] font-[600]">No goals yet</div>
                  <div className="text-[12px] text-[#8E8E93]">Pick 3 goals → more relevant practice</div>
                </div>
                <button onClick={()=>handleTap('diagnostic')} className="ml-2 w-8 h-8 rounded-full bg-black text-white grid place-items-center">→</button>
              </div>
            )}
          </div>
          <div className="hidden lg:block">
            <div className="bg-white rounded-[24px] p-5 shadow-sm border border-black/5 min-w-[200px] text-right">
              <div className="text-[11px] font-[700] tracking-widest text-[#8E8E93] uppercase">Your pace</div>
              <div className="mt-2 text-[28px] font-[700] tracking-tight">{data.pace?.daysWorkedLast7||0}/7</div>
              <div className="text-[12px] text-[#8E8E93]">days last week</div>
              <div className="mt-3 text-[11px] leading-[1.4] text-[#3C3C43]/60 line-clamp-2">{data.pace?.message?.slice(0,80)}...</div>
              <button onClick={()=>handleTap('motivation')} className="mt-4 w-full bg-black text-white rounded-full py-2.5 text-[13px] font-[600]">Motivation →</button>
            </div>
          </div>
        </div>

        {/* TODAY'S MAIN CARD - iOS style */}
        <div className="mt-8 bg-white rounded-[32px] p-7 lg:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-black/[0.04] animate-ios-in">
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-[700] tracking-widest uppercase bg-black text-white px-3 py-1.5 rounded-full">{data.recommendation.type} • {data.recommendation.time}</span>
                <span className="text-[11px] font-[600] px-3 py-1.5 rounded-full bg-[#F2F2F7] text-[#3C3C43]">{data.recommendation.priority} priority</span>
                {data.level && <span className="text-[11px] font-[500] px-3 py-1.5 rounded-full bg-white border border-black/10">{data.level}</span>}
              </div>
              
              <div className="mt-5">
                <div className="text-[12px] font-[700] tracking-widest uppercase text-[#8E8E93]">{data.recommendation.subtitle}</div>
                <h2 className="mt-2 text-[28px] lg:text-[32px] font-[700] tracking-tight leading-[0.95]">{data.recommendation.title}</h2>
                {data.recommendation.goalHelp && (
                  <div className="mt-3 inline-flex items-center gap-2 bg-[#007AFF] text-white text-[12px] font-[600] px-3.5 py-2 rounded-full">🎯 {data.recommendation.goalHelp}</div>
                )}
                <p className="mt-4 text-[17px] leading-[1.5] tracking-tight text-[#3C3C43]/80 max-w-[640px]">{data.recommendation.why}</p>
              </div>
              
              <div className="mt-6 bg-[#F2F2F7] rounded-[20px] p-5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#007AFF] text-white grid place-items-center text-[14px] shrink-0">✦</div>
                  <div>
                    <div className="text-[11px] font-[700] tracking-widest uppercase text-[#8E8E93]">Unlocks in real life</div>
                    <div className="mt-1 text-[15px] font-[600] tracking-tight">{data.unlock?.title}</div>
                    <div className="mt-1 text-[14px] leading-[1.4] text-[#3C3C43]/70">{data.unlock?.desc}</div>
                    <div className="mt-2 inline-flex text-[12px] font-[700] text-[#007AFF] bg-[#007AFF]/10 px-3 py-1 rounded-full">→ {data.unlock?.functional}</div>
                  </div>
                </div>
              </div>

              <button onClick={()=>handleTap(data.recommendation.action.target)} className="mt-7 bg-black text-white px-8 py-4 rounded-full text-[17px] font-[600] tracking-tight shadow-[0_4px_16px_rgba(0,0,0,0.2)] hover:bg-[#1C1C1E] hover:shadow-[0_8px_24px_rgba(0,0,0,0.25)] hover:-translate-y-0.5 active:scale-[0.97] transition-all flex items-center gap-2">
                {data.recommendation.action.label} <span className="text-[18px]">{data.recommendation.action.icon}</span>
              </button>
              <div className="mt-3 text-[12px] text-[#8E8E93]">15 min • one hand on bus • no repeat in 30 days • infinite variants</div>
            </div>

            <div className="hidden lg:block w-[260px] shrink-0 space-y-4">
              <div className="bg-[#F2F2F7] rounded-[20px] p-5">
                <div className="text-[11px] font-[700] tracking-widest uppercase text-[#8E8E93]">How recommendation works</div>
                <div className="mt-2 text-[13px] leading-[1.5] text-[#3C3C43]/70">System weights: listening {data.listeningAcc}% • {data.box0} new words • {data.grammarDone}/{grammarTopics.length} grammar • weakest skill &lt;60% • your personal goal. Not random, not curriculum.</div>
              </div>
              {data.nextCanDo && (
                <div className="bg-[#007AFF] rounded-[20px] p-5 text-white">
                  <div className="text-[11px] font-[700] tracking-widest uppercase text-white/70">Next functional win</div>
                  <div className="mt-2 text-[14px] font-[600] leading-tight">{data.nextCanDo.text}</div>
                  <div className="text-[11px] text-white/70 mt-2">{data.nextCanDo.level} • unlocks soon</div>
                  <div className="mt-3 w-full h-1 bg-white/20 rounded-full overflow-hidden"><div className="h-full bg-white w-[60%] rounded-full" /></div>
                </div>
              )}
              {data.modProgress && (
                <div className="bg-white rounded-[20px] p-4 border border-black/5 shadow-sm">
                  <div className="text-[11px] font-[700] tracking-widest uppercase text-[#8E8E93]">Module progress</div>
                  <div className="mt-2 flex items-baseline gap-2"><span className="text-[24px] font-[700]">{data.modProgress.overall}%</span><span className="text-[12px] text-[#8E8E93]">of {data.modProgress.moduleId}</span></div>
                  <div className="mt-2 h-1.5 bg-[#F2F2F7] rounded-full overflow-hidden"><div className="h-full bg-black rounded-full" style={{ width: `${data.modProgress.overall}%` }} /></div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* iOS Cards Grid */}
        <div className="mt-6 grid lg:grid-cols-3 gap-4">
          <div className="bg-white rounded-[24px] p-5 shadow-sm border border-black/5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#34C759]/15 text-[#34C759] grid place-items-center text-[12px]">✓</div>
              <div className="text-[13px] font-[700] tracking-tight">You can now — last 3 wins</div>
            </div>
            <div className="mt-4 space-y-3">
              {data.canDo.length>0 ? data.canDo.map(c=>(
                <div key={c.id} className="flex gap-3 text-[14px] leading-tight"><span className="text-[#34C759] mt-0.5">●</span><span className="tracking-tight">{c.text}</span></div>
              )) : <div className="text-[14px] text-[#8E8E93]">Take test first — then we show what you can do in real life.</div>}
            </div>
            <button onClick={()=>handleTap('motivation')} className="mt-5 w-full bg-[#F2F2F7] rounded-full py-3 text-[13px] font-[600] hover:bg-black/5 transition">See all can-do →</button>
          </div>
          
          <div className="bg-white rounded-[24px] p-5 shadow-sm border border-black/5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#FF9500]/15 text-[#FF9500] grid place-items-center text-[12px]">✍️</div>
              <div className="text-[13px] font-[700] tracking-tight">Weekly writing • {data.weeklyWriting.title}</div>
            </div>
            <div className="mt-3 text-[14px] leading-[1.4] tracking-tight text-[#3C3C43]/70 line-clamp-3">{data.weeklyWriting.prompt}</div>
            <div className="mt-3 inline-flex text-[11px] font-[500] px-2.5 py-1 rounded-full bg-[#F2F2F7] text-[#8E8E93]">{data.weeklyWriting.words} words • Week {data.weeklyWriting.week}</div>
            <button onClick={()=>handleTap('writing')} className="mt-4 w-full bg-black text-white rounded-full py-3 text-[13px] font-[600]">Write weekly task →</button>
          </div>
          
          <div className="bg-white rounded-[24px] p-5 shadow-sm border border-black/5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#007AFF]/15 text-[#007AFF] grid place-items-center text-[12px]">◐</div>
              <div className="text-[13px] font-[700] tracking-tight">Last 7 days — no shame</div>
            </div>
            <div className="mt-4 flex gap-1.5">
              {data.pace?.heatmap?.slice(-7).map((d,i)=>(
                <div key={i} className={`flex-1 h-[36px] rounded-full grid place-items-center text-[12px] font-[600] transition-all ${d.worked?'bg-black text-white shadow-sm':'bg-[#F2F2F7] text-[#8E8E93]'}`}>{d.worked?'✓':'·'}</div>
              ))}
            </div>
            <div className="mt-3 text-[12px] leading-[1.4] text-[#8E8E93] line-clamp-2">{data.pace?.message}</div>
          </div>
        </div>

        {/* Skills — iOS style */}
        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Vocabulary", value: data.box2plus, sub: `secure / ${vocabulary.length}`, detail: `${data.box0} new • ${data.box1} unsure`, pct: Math.round(data.box2plus/vocabulary.length*100), color: "#007AFF" },
            { label: "Grammar", value: data.grammarDone, sub: `/ ${grammarTopics.length} topics`, detail: "Infinite • 5100+ variants", pct: Math.round(data.grammarDone/grammarTopics.length*100), color: "#000" },
            { label: "Listening", value: `${data.listeningAcc||0}%`, sub: "accuracy", detail: `${data.listeningAttempts} tries • no repeat`, pct: data.listeningAcc, color: "#5856D6" },
            { label: "Writing", value: data.writingAttempts, sub: "texts", detail: `Weekly new • ${data.cultureDone}/8 culture`, pct: Math.round(data.cultureDone/8*100), color: "#FF9500" },
          ].map((s,i)=>(
            <div key={i} className="bg-white rounded-[20px] p-4 shadow-sm border border-black/5">
              <div className="text-[11px] font-[700] tracking-widest uppercase text-[#8E8E93]">{s.label}</div>
              <div className="mt-2 flex items-baseline gap-1.5"><span className="text-[24px] font-[700] tracking-tight">{s.value}</span><span className="text-[11px] text-[#8E8E93]">{s.sub}</span></div>
              <div className="mt-3 h-1 bg-[#F2F2F7] rounded-full overflow-hidden"><div className="h-full rounded-full transition-all duration-1000" style={{ width: `${s.pct}%`, background: s.color }} /></div>
              <div className="mt-2 text-[10px] text-[#8E8E93]">{s.detail}</div>
            </div>
          ))}
        </div>

        {/* Quick actions — iOS pills */}
        <div className="mt-6 bg-white rounded-[24px] p-5 shadow-sm border border-black/5">
          <div className="text-[13px] font-[700] tracking-tight">Quick practice — 15 min, one hand</div>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { title: "10 flashcards", desc: "holde et møde • SRS", icon: "✧", target: "vocab", color: "#34C759" },
              { title: "1 listening", desc: "No transcript first • DSB/DR", icon: "♪", target: "listening", color: "#5856D6" },
              { title: "2 min chat", desc: "Vent lidt, hvad mener du?", icon: "💬", target: "speaking", color: "#007AFF" },
            ].map(q=>(
              <button key={q.target} onClick={()=>handleTap(q.target)} className="text-left p-4 rounded-[20px] bg-[#F2F2F7] hover:bg-black hover:text-white group transition-all tap-haptic">
                <div className="flex items-start justify-between">
                  <div className="w-8 h-8 rounded-full bg-white group-hover:bg-white/20 grid place-items-center text-[14px] shadow-sm" style={{ color: q.color }}>{q.icon}</div>
                  <div className="w-6 h-6 rounded-full bg-black/5 group-hover:bg-white/20 grid place-items-center text-[10px]">→</div>
                </div>
                <div className="mt-3 text-[15px] font-[600] tracking-tight">{q.title}</div>
                <div className="text-[12px] text-[#8E8E93] group-hover:text-white/70 mt-1">{q.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
