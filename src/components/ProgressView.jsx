import { useMemo } from 'react';
import { vocabulary } from '../data/vocabulary';
import { grammarTopics } from '../data/grammar';
import { listeningPieces } from '../data/listening';
import { readingTexts } from '../data/reading';
import { getBox } from '../lib/srs';
import { getAllStagesProgress } from '../lib/stageEngine';

export default function ProgressView({ setActive }) {
  const data = useMemo(()=>{
    const progress = (()=>{ try { return JSON.parse(localStorage.getItem('dansk_progress')||'{}'); } catch { return {}; } })();
    const scores = (()=>{ try { return JSON.parse(localStorage.getItem('dansk_scores')||'{}'); } catch { return {}; } })();
    const srs = vocabulary.map(v=>getBox(v.id));
    const box0 = srs.filter(b=>b===0).length;
    const box1 = srs.filter(b=>b===1).length;
    const box2 = srs.filter(b=>b>=2).length;
    const grammarDone = grammarTopics.filter(t=>progress[`grammar_${t.id}`]).length;
    const diagnostic = (()=>{ try { return JSON.parse(localStorage.getItem('dansk_diagnostic')||'null'); } catch { return null; } })();
    const verdict = (()=>{ try { return JSON.parse(localStorage.getItem('dansk_verdict')||'null'); } catch { return null; } })();
    const level = localStorage.getItem('dansk_level') || "Ikke testet";
    const stageProgress = getAllStagesProgress();
    return { box0, box1, box2, grammarDone, scores, diagnostic, level, progress, verdict, stageProgress };
  },[]);

  const tap = (id)=>{ if(navigator.vibrate) navigator.vibrate(10); setActive(id); };

  return (
    <div className="min-h-screen bg-[#F2F2F7] pb-[120px]">
      <div className="max-w-[1100px] mx-auto px-5 lg:px-8 pt-8">
        <div className="flex items-center gap-2 mb-3"><div className="w-8 h-8 rounded-full bg-black text-white grid place-items-center text-[12px] font-bold">◍</div><span className="text-[13px] font-[600]">Progress • No streaks • Just work</span></div>
        <h1 className="ios-large-title">Where you are —<br/>honest numbers</h1>
        <p className="mt-3 text-[17px] leading-[1.4] text-[#8E8E93] max-w-[600px]">No leaderboard. No comparison. Only your journey from Stage 1 to Stage 5, with evidence to progress. Each stage requires passing criteria, not just %.</p>

        <div className="mt-8 grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 bg-white rounded-[32px] p-7 shadow-sm border border-black/5">
            <div className="text-[13px] font-[700] tracking-tight">Overview</div>
            <div className="mt-5 grid grid-cols-3 gap-3">
              <div className="bg-[#F2F2F7] rounded-[20px] p-4"><div className="text-[11px] font-[700] tracking-widest uppercase text-[#8E8E93]">Level</div><div className="mt-2 text-[15px] font-[600] tracking-tight">{data.level}</div><div className="text-[11px] text-[#8E8E93] mt-1">{data.diagnostic ? `${data.diagnostic.pct}% • ${new Date(data.diagnostic.date).toLocaleDateString()}` : "Take test"} • {data.verdict?.timeAvg||'?'}s avg</div></div>
              <div className="bg-[#F2F2F7] rounded-[20px] p-4"><div className="text-[11px] font-[700] tracking-widest uppercase text-[#8E8E93]">Secure words</div><div className="mt-2 text-[24px] font-[700] tracking-tight">{data.box2}</div><div className="text-[11px] text-[#8E8E93] mt-1">of {vocabulary.length} • {Math.round(data.box2/vocabulary.length*100)}%</div><div className="mt-2 h-1 bg-white rounded-full overflow-hidden"><div className="h-full bg-black rounded-full" style={{ width: `${Math.round(data.box2/vocabulary.length*100)}%` }} /></div></div>
              <div className="bg-[#F2F2F7] rounded-[20px] p-4"><div className="text-[11px] font-[700] tracking-widest uppercase text-[#8E8E93]">Grammar</div><div className="mt-2 text-[24px] font-[700] tracking-tight">{data.grammarDone}</div><div className="text-[11px] text-[#8E8E93] mt-1">of {grammarTopics.length} topics • {data.verdict?`${data.verdict.weaknesses.length} weak`:'-'}</div><div className="mt-2 h-1 bg-white rounded-full overflow-hidden"><div className="h-full bg-[#007AFF] rounded-full" style={{ width: `${Math.round(data.grammarDone/grammarTopics.length*100)}%` }} /></div></div>
            </div>

            <div className="mt-8">
              <div className="text-[13px] font-[700] tracking-tight">Stage 1 → 5 progress — evidence to progress</div>
              <div className="mt-4 space-y-2">
                {data.stageProgress.map(sp=>(
                  <div key={sp.stage.id} className="bg-[#F2F2F7] rounded-[16px] p-4 flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full grid place-items-center text-[12px] font-bold ${sp.progress.cleared?'bg-black text-white':'bg-white border border-black/10'}`}>{sp.progress.cleared?'✓':sp.stage.moduleId.toUpperCase()}</div>
                    <div className="flex-1"><div className="text-[14px] font-[600] tracking-tight">{sp.stage.title} • {sp.stage.cefl} • {sp.progress.overall}%</div><div className="text-[11px] text-[#8E8E93] mt-1">{sp.stage.objective.slice(0,100)}...</div><div className="mt-2 h-1 bg-white rounded-full overflow-hidden"><div className="h-full bg-black rounded-full transition-all duration-1000" style={{ width: `${sp.progress.overall}%` }} /></div></div>
                    <div className="text-right"><div className="text-[11px] font-[600] px-2.5 py-1 rounded-full bg-white border border-black/5">{sp.progress.cleared?'Cleared':'In progress'}</div><div className="text-[10px] text-[#8E8E93] mt-1">{sp.stage.passingCriteria.overall}% to pass</div></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <div className="text-[13px] font-[700] tracking-tight">Skills — not just %</div>
              <div className="mt-4 space-y-3">
                {[
                  { label: "Listening", value: data.scores.listeningAcc||0, sub: `${data.scores.listeningAttempts||0} attempts • ${listeningPieces.length} pieces • ${data.verdict?.byCategory?.listening?data.verdict.byCategory.listening+'%':''} in test` },
                  { label: "Reading", value: Math.min(100, (data.scores.readingAttempts||0)/readingTexts.length*100), sub: `${data.scores.readingAttempts||0} texts • ${readingTexts.length} available` },
                  { label: "Writing", value: Math.min(100, (data.scores.writingAttempts||0)/8*100), sub: `${data.scores.writingAttempts||0} texts • 8 tasks • weekly new` },
                  { label: "Culture", value: Math.round((data.progress.cultureDone||0)/8*100), sub: `${data.progress.cultureDone||0}/8 modules • PD3 Part 1` },
                ].map(s=>(
                  <div key={s.label} className="flex items-center gap-3 bg-[#F2F2F7] rounded-[16px] p-4">
                    <div className="w-[80px] text-[13px] font-[600]">{s.label}</div>
                    <div className="flex-1 h-2 bg-white rounded-full overflow-hidden"><div className="h-full bg-black rounded-full transition-all duration-1000" style={{ width: `${s.value}%` }} /></div>
                    <div className="w-[50px] text-[13px] font-[600] text-right">{Math.round(s.value)}%</div>
                  </div>
                ))}
              </div>
            </div>

            {data.verdict && (
              <div className="mt-8 bg-black text-white rounded-[24px] p-6">
                <div className="text-[11px] font-[700] tracking-widest uppercase text-white/60">Verdict beyond %</div>
                <div className="mt-3 grid grid-cols-2 gap-3 text-[12px]">
                  <div className="bg-white/10 rounded-[12px] p-3"><div className="text-white/60 text-[10px] uppercase">Strengths ≥75%</div><div className="mt-1">{data.verdict.strengths.join(', ')||'None yet'}</div></div>
                  <div className="bg-white/10 rounded-[12px] p-3"><div className="text-white/60 text-[10px] uppercase">Weaknesses &lt;60%</div><div className="mt-1">{data.verdict.weaknesses.join(', ')||'Balanced'}</div></div>
                </div>
                <div className="mt-3 text-[12px] text-white/70">Time {data.verdict.timeAvg}s avg • {data.verdict.consistency.consistent?'Consistent':'Inconsistent pattern'} • {data.verdict.explanation}</div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-[24px] p-6 shadow-sm border border-black/5">
              <div className="text-[13px] font-[700] tracking-tight">Next step — honest recommendation</div>
              <div className="mt-3 text-[14px] leading-[1.5] text-[#3C3C43]/80">
                {data.box0>200 && "You have many new words. Spend 15 min on flashcards with collocations before adding new words."}
                {data.box0<=200 && (data.scores.listeningAcc||0)<60 && "Your listening is under 60%. Normal — Danish swallows syllables. Practice 1 phone call with transcript hidden first."}
                {data.box0<=200 && (data.scores.listeningAcc||0)>=60 && "Good listening. Next: write 150 words with connectors (fordi, derfor, selvom) and get feedback."}
                {data.verdict && data.verdict.weaknesses.length>0 && ` Focus: ${data.verdict.weaknesses[0]} — ${data.verdict.typeWeaknesses?.[data.verdict.weaknesses[0]]?.join(', ')||'needs work'}.`}
              </div>
              <button onClick={()=>tap('practice')} className="mt-4 w-full bg-black text-white rounded-full py-3 text-[13px] font-[600] tap-haptic">Go to recommended →</button>
            </div>

            <div className="bg-[#007AFF]/10 rounded-[24px] p-6 border border-[#007AFF]/20">
              <div className="text-[11px] font-[700] tracking-widest uppercase text-[#007AFF]">What works for you?</div>
              <div className="mt-3 text-[13px] leading-[1.5] text-[#1C1C1E]/80 space-y-2">
                <div>• <b>Explanation before drill:</b> You learned {data.grammarDone} topics with explanation first.</div>
                <div>• <b>English first:</b> V2 exists in English ("Never have I..."), in Danish always. Bridge works.</div>
                <div>• <b>Why wrong is tempting:</b> Every wrong answer shows why it's tempting — respect, not "nice try".</div>
                <div>• <b>Variation:</b> Same rule, different sentences — {localStorage.getItem('dansk_user_seed')?.slice(0,8)||'seed'} ensures you don't memorize.</div>
              </div>
            </div>

            <div className="bg-white rounded-[24px] p-5 shadow-sm border border-black/5">
              <div className="text-[11px] font-[700] tracking-widest uppercase text-[#8E8E93]">Weekly report — auto from your data</div>
              <div className="mt-3 text-[12px] leading-[1.5] font-mono bg-[#F2F2F7] p-4 rounded-[16px] whitespace-pre-wrap">
                {`Vocab: ${data.box2} secure (Box2+), ${data.box1} unsure, ${data.box0} new
Grammar: ${data.grammarDone}/${grammarTopics.length} topics
Listening: ${data.scores.listeningAttempts||0} tries, ${data.scores.listeningAcc||0}% acc
Reading: ${data.scores.readingAttempts||0} texts
Writing: ${data.scores.writingAttempts||0} texts
Culture: ${data.progress.cultureDone||0}/8

Stage progress: ${data.stageProgress.map(s=>`${s.stage.moduleId}:${s.progress.overall}%${s.progress.cleared?'✓':''}`).join(' • ')}

Recommendation: ${data.verdict?`Focus ${data.verdict.weaknesses[0]||'balance'} • ${data.verdict.timeline}`:data.box0>200?'Vocab focus':'Listening or writing'}`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
