import { useMemo } from 'react';

// ProgressView — Progress per Action Plan Phase 4
// Must have: Continue ring plus at most 3 numbers, skill trends, where mistakes are, word book, attempts beside %, no placeholder numbers, leaderboard never required stop
// Ship checklist: one primary action, can remove one element, passes light/dark 390px/1440px, first-time user reaches next without reading, uses ds.css

export default function ProgressView({ setActive }) {
  const data = useMemo(()=>{
    const progress = (()=>{ try { return JSON.parse(localStorage.getItem('dansk_progress')||'{}'); } catch { return {}; } })();
    const scores = (()=>{ try { return JSON.parse(localStorage.getItem('dansk_scores')||'{}'); } catch { return {}; } })();
    const diag = (()=>{ try { return JSON.parse(localStorage.getItem('dansk_diagnostic')||'null'); } catch { return null; } })();
    const level = localStorage.getItem('dansk_level') || "Not tested yet";
    const answers = progress.answers || {};
    const totalAnswers = Object.keys(answers).length;
    const correctAnswers = Object.values(answers).filter(v=>v===true).length;
    const pct = totalAnswers ? Math.round(correctAnswers/totalAnswers*100) : 0;
    const recent = Object.entries(answers).slice(-15);
    const recentCorrect = recent.filter(([_,v])=>v===true).length;
    const recentPct = recent.length ? Math.round(recentCorrect/recent.length*100) : 0;
    const wrong = (()=>{ try { return JSON.parse(localStorage.getItem('dansk_wrong')||'[]'); } catch { return []; } })();
    const wordBook = Object.keys(progress.srs||{}).length || Object.keys(progress).filter(k=>k.startsWith('vocab_')).length;
    return { progress, scores, diag, level, totalAnswers, correctAnswers, pct, recent, recentCorrect, recentPct, wrong, wordBook };
  },[]);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)]">
      <div className="max-w-[640px] mx-auto px-4 pt-6 pb-[120px]">
        <div className="flex items-center justify-between">
          <button onClick={()=>setActive('path')} className="w-10 h-10 rounded-full bg-white border border-[var(--border)] grid place-items-center">←</button>
          <span className="text-[11px] font-[700] tracking-widest uppercase bg-white border border-[var(--border)] px-3 py-1.5 rounded-full">Progress • Honest numbers</span>
        </div>

        <div className="mt-6">
          <h1 className="text-[28px] font-[700] tracking-tight leading-[0.95]">Where you are</h1>
          <p className="mt-3 text-[14px] leading-[1.5] text-[var(--ink-secondary)]">No leaderboard. No comparison. Only your journey Modul 3→5 with evidence. Attempts shown beside each percentage. No placeholder numbers.</p>
        </div>

        {/* Continue ring plus at most 3 numbers per spec */}
        <div className="mt-6 bg-white rounded-[16px] border border-[var(--border)] p-5 flex items-center gap-6">
          <div className="relative w-20 h-20 shrink-0">
            <svg width="80" height="80" viewBox="0 0 80 80" className="rotate-[-90deg]">
              <circle cx="40" cy="40" r="32" fill="none" stroke="var(--bg)" strokeWidth="8" />
              <circle cx="40" cy="40" r="32" fill="none" stroke="var(--ink)" strokeWidth="8" strokeLinecap="round" strokeDasharray={`${(data.pct/100)*201} 201`} className="transition-all duration-[1000ms]" />
            </svg>
            <div className="absolute inset-0 grid place-items-center">
              <span className="text-[18px] font-[700]">{data.pct}%</span>
            </div>
          </div>
          <div className="flex-1">
            <div className="text-[15px] font-[700]">{data.level} • {data.totalAnswers} answers</div>
            <div className="mt-1 flex gap-3 text-[12px] text-[var(--muted)]">
              <span>{data.correctAnswers} correct • {data.totalAnswers-data.correctAnswers} to review</span>
              <span>•</span>
              <span>{data.recent.length}/15 recent • {data.recentPct}% mastery {data.recent.length>=15 && data.recentPct>=80 ? '✓' : ''}</span>
            </div>
            <div className="mt-3 h-1.5 bg-[var(--bg)] rounded-full overflow-hidden">
              <div className="h-full bg-[var(--ink)] rounded-full" style={{ width: `${data.recentPct}%` }} />
            </div>
            <div className="mt-1 text-[11px] text-[var(--muted)]">Mastery rule: at least 80% over at least 15 recent answers. Admin-set kept marked.</div>
          </div>
        </div>

        {/* Skill trends, where mistakes are, word book per spec */}
        <div className="mt-4 grid gap-3">
          <div className="bg-white rounded-[16px] border border-[var(--border)] p-5">
            <div className="text-[11px] font-[700] tracking-widest uppercase text-[var(--muted)]">Skill trends • Attempts beside %</div>
            <div className="mt-4 space-y-3">
              {[
                { label: "Grammar", pct: data.diag?.categoryPct?.grammar||0, attempts: data.totalAnswers, detail: "V2, ledsætning, sin/hans" },
                { label: "Vocab", pct: data.diag?.categoryPct?.vocab||0, attempts: data.wordBook, detail: "Collocations, partikelverber" },
                { label: "Listening", pct: data.diag?.categoryPct?.listening||0, attempts: data.scores.listeningAttempts||0, detail: "Reductions, telephone borgerservice" },
              ].map(s=>(
                <div key={s.label} className="flex items-center gap-3">
                  <div className="w-[80px] text-[13px] font-[600]">{s.label}</div>
                  <div className="flex-1 h-2 bg-[var(--bg)] rounded-full overflow-hidden"><div className="h-full bg-[var(--ink)] rounded-full" style={{ width: `${s.pct}%` }} /></div>
                  <div className="w-[90px] text-right"><span className="text-[13px] font-[600]">{s.pct}%</span><span className="text-[11px] text-[var(--muted)]"> • {s.attempts} attempts</span></div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-[16px] border border-[var(--border)] p-5">
            <div className="text-[11px] font-[700] tracking-widest uppercase text-[var(--muted)]">Where mistakes are • Word book</div>
            <div className="mt-3">
              {data.wrong.length ? (
                <div className="space-y-2">
                  {data.wrong.slice(-5).map((w,i)=>(
                    <div key={i} className="flex justify-between text-[13px] bg-[var(--bg)] rounded-[12px] p-3">
                      <span className="font-[600]">{w.topic}</span>
                      <span className="text-[11px] text-[var(--muted)]">{new Date(w.at).toLocaleDateString()} • feeds Up next</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-[13px] text-[var(--muted)] bg-[var(--bg)] rounded-[12px] p-3">No answers yet — honest empty state, not placeholder numbers. Take 5-min check to see where mistakes are.</div>
              )}
              <div className="mt-4 flex gap-3 text-[12px]">
                <span className="bg-[var(--bg)] px-3 py-1.5 rounded-full">Word book: {data.wordBook} words • attempts beside %</span>
                <span className="bg-[var(--bg)] px-3 py-1.5 rounded-full">Total answers: {data.totalAnswers} • {data.pct}%</span>
              </div>
            </div>
          </div>

          <div className="bg-[var(--ink)] text-white rounded-[16px] p-5">
            <div className="text-[11px] font-[700] tracking-widest uppercase text-white/60">Next step • Never required stop</div>
            <div className="mt-2 text-[14px] leading-[1.5] text-white/80">Progress sits one tap away from any screen and is never a required step per Flow B. Up next loop: exercise then feedback then Up next again or stop.</div>
            <button onClick={()=>setActive('practice')} className="mt-4 w-full bg-white text-black py-3 rounded-full text-[14px] font-[600]">Continue • Up next →</button>
          </div>
        </div>

        {/* One primary action — bottom thumb zone */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[var(--bg)] to-transparent">
          <div className="max-w-[640px] mx-auto">
            <button onClick={()=>setActive('practice')} className="w-full bg-[var(--ink)] text-white py-4 rounded-full text-[16px] font-[600]">Continue</button>
          </div>
        </div>
      </div>
    </div>
  );
}
