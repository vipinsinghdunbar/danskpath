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
          {showAdmin ? (
            <button onClick={()=>setActive('admin')} className="text-[11px] font-[600] px-3 py-1.5 rounded-full bg-[var(--ink)] text-white">Admin</button>
          ) : (
            <button onClick={()=>setActive('admin-login')} className="text-[10px] font-[600] px-2 py-1 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors">Admin</button>
          )}
        </div>
      </header>

      {/* Main — one headline, one sentence, one primary action */}
      <main className="flex-1 flex flex-col px-4 lg:px-6 max-w-[960px] mx-auto w-full">
        <div className="flex-1 flex flex-col lg:items-center justify-center gap-8 py-8 lg:py-16">
          {/* Content — centered, no right column */}
          <div className="flex-1 max-w-[600px] text-center lg:text-left">
            <h1 className="text-[40px] lg:text-[56px] font-[700] tracking-tight leading-[0.9]">
              Find your Danish level
            </h1>

            <p className="mt-4 text-[17px] leading-[1.5] text-[var(--ink-secondary)] max-w-[32ch]">
              Take a quick 5-minute assessment to discover your starting point. No account needed.
            </p>

            {/* Primary action — one clear button */}
            <div className="mt-8 lg:mt-10">
              <button
                onClick={()=>setActive('assessment')}
                className="w-full lg:w-auto bg-[var(--ink)] text-white px-8 py-4 rounded-full text-[17px] font-[600] flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.97] transition-all min-h-[56px]"
                aria-label="Start the 5-minute assessment"
              >
                Start 5-minute assessment
                <NextIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer — minimal */}
      <footer className="px-4 lg:px-6 py-4 border-t border-[var(--border)] max-w-[960px] mx-auto w-full">
        <div className="flex flex-wrap items-center justify-center gap-4 text-[12px] text-[var(--ink-secondary)]">
          <button onClick={()=>setActive('privacy')} className="hover:text-[var(--ink)] underline underline-offset-4">Privacy</button>
          <span className="text-[var(--border)]">•</span>
          <button onClick={()=>setActive('terms')} className="hover:text-[var(--ink)] underline underline-offset-4">Terms</button>
          <span className="text-[var(--border)]">•</span>
          <span>© 2026 DanskPath</span>
        </div>
      </footer>
    </div>
  );
}
