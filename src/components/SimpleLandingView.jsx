import { useState, useEffect } from 'react';
import { isAdmin } from '../lib/auth';
import { HomeIcon, CheckIcon, NextIcon } from '../lib/icons.jsx';

// SimpleLandingView — ONE homepage only per Action Plan Phase 4
// Ship checklist: one primary action, can remove one element without losing meaning, passes light/dark 390px/1440px, first-time user reaches next step without reading, uses ds.css no one-off styles
// Screen: One headline Find your Danish level, one sentence, CTA Start 5-minute check, secondary Start from beginning, Log in link — no carousels, no feature grids

export default function SimpleLandingView({ setActive }) {
  const [showAdmin, setShowAdmin] = useState(false);
  useEffect(()=>{ setShowAdmin(isAdmin()); },[]);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)] flex flex-col">
      {/* Header — minimal, logo only */}
      <header className="px-4 lg:px-6 pt-6 pb-4 flex items-center justify-between max-w-[960px] mx-auto w-full">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[var(--ink)] text-[var(--bg-card)] grid place-items-center text-[12px] font-bold">D</div>
          <span className="text-[14px] font-[700] tracking-tight">DanskPath</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={()=>setActive('login')} className="text-[13px] font-[600] px-4 py-2 rounded-full bg-white border border-[var(--border)] hover:border-[var(--border-strong)] transition-colors">Log in</button>
          {showAdmin && <button onClick={()=>setActive('admin')} className="text-[11px] font-[600] px-3 py-1.5 rounded-full bg-[var(--ink)] text-white">Admin</button>}
        </div>
      </header>

      {/* Main — one headline, one sentence, one primary action */}
      <main className="flex-1 flex flex-col px-4 lg:px-6 max-w-[960px] mx-auto w-full">
        <div className="flex-1 flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12 py-8 lg:py-16">
          {/* Left — content */}
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 text-[11px] font-[700] tracking-widest uppercase text-[var(--muted)] bg-white border border-[var(--border)] px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse"></span>
              Modul 3 → 5 • PD3 stretch labelled
            </div>
            
            <h1 className="mt-6 text-[40px] lg:text-[56px] font-[700] tracking-tight leading-[0.9] max-w-[12ch]">
              Find your<br/>Danish level
            </h1>
            
            <p className="mt-4 text-[17px] leading-[1.5] text-[var(--ink-secondary)] max-w-[32ch]">
              5-minute check. Get your starting point in Modul 3 to 5, with range and retake. No account needed.
            </p>

            {/* Primary action — bottom thumb zone on phone */}
            <div className="mt-8 lg:mt-10">
              <button 
                onClick={()=>setActive('assessment')} 
                className="w-full lg:w-auto bg-[var(--ink)] text-white px-8 py-4 rounded-full text-[17px] font-[600] flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.97] transition-all min-h-[56px]"
                aria-label="Start the 5-minute check"
              >
                Start the 5-minute check
                <NextIcon className="w-5 h-5" />
              </button>
              
              <div className="mt-3 flex items-center gap-3 text-[13px]">
                <button onClick={()=>setActive('practice')} className="font-[600] text-[var(--muted)] hover:text-[var(--ink)] underline underline-offset-4">Start from the beginning</button>
                <span className="text-[var(--border-strong)]">•</span>
                <span className="text-[var(--muted)]">15 min a day • No account needed</span>
              </div>
            </div>

            {/* Trust — minimal, no feature grids */}
            <div className="mt-10 lg:mt-12 flex gap-6 text-[11px] text-[var(--muted)]">
              <span className="flex items-center gap-1.5"><CheckIcon className="w-4 h-4" /> English interface</span>
              <span className="flex items-center gap-1.5"><CheckIcon className="w-4 h-4" /> Danish content</span>
              <span className="flex items-center gap-1.5"><CheckIcon className="w-4 h-4" /> Mastery 80% over 15</span>
            </div>
          </div>

          {/* Right — visual, not carousel, not illustration */}
          <div className="flex-1 lg:max-w-[380px]">
            <div className="bg-white rounded-[16px] border border-[var(--border)] p-5">
              <div className="text-[11px] font-[700] tracking-widest uppercase text-[var(--muted)]">Your path • Modul 3 to 5</div>
              <div className="mt-4 space-y-3">
                {[
                  { m: 'Modul 3', d: 'A2→B1 • Modultest 3 • V2, ledsætning, sin/hans', active: true },
                  { m: 'Modul 4', d: 'B1→B1+ • Debate • Passive, relative', active: false },
                  { m: 'Modul 5', d: 'B1+→B2 • PD3 stretch • Modal particles', active: false, stretch: true },
                  { m: 'PD3', d: 'Stretch • Exam format • 150-200 words', active: false, stretch: true },
                ].map((s,i)=>(
                  <div key={i} className={`flex gap-3 p-3 rounded-[12px] border ${s.active ? 'bg-[var(--ink)] text-white border-[var(--ink)]' : 'bg-[var(--bg)] border-[var(--border)]'}`}>
                    <div className={`w-6 h-6 rounded-full grid place-items-center text-[10px] font-bold shrink-0 ${s.active ? 'bg-white text-black' : 'bg-white border border-[var(--border)]'}`}>{i+1}</div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] font-[700]">{s.m}</span>
                        {s.stretch && <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--warning-soft)] text-[var(--warning)] border border-[var(--warning)]/20">STRETCH</span>}
                        {s.active && <span className="text-[10px] px-2 py-0.5 rounded-full bg-white text-black">You are here</span>}
                      </div>
                      <div className={`mt-1 text-[11px] leading-[1.4] ${s.active ? 'text-white/70' : 'text-[var(--muted)]'}`}>{s.d}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-[11px] text-[var(--muted)] leading-[1.4]">Diagnostic capped at Modul 3 per dansk skill. PD3 is stretch, clearly labelled above. Pitch one notch simpler.</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer — minimal */}
      <footer className="px-4 lg:px-6 py-6 border-t border-[var(--border)] max-w-[960px] mx-auto w-full">
        <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] text-[var(--muted)]">
          <span>15 min a day • No account needed • English interface, Danish content • Serif for Danish</span>
          <div className="flex gap-4">
            <button onClick={()=>setActive('privacy')} className="hover:text-[var(--ink)] underline underline-offset-4">Privacy</button>
            <button onClick={()=>setActive('terms')} className="hover:text-[var(--ink)] underline underline-offset-4">Terms</button>
            <span>© 2026 DanskPath</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
