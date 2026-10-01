import { useState, useEffect } from 'react';
import { CheckIcon, NextIcon } from '../lib/icons.jsx';

// AssessmentLandingView — Entry to assessment per Action Plan Phase 4
// Screen: One headline, one sentence, one primary action Start 5-minute check
// Must have: focus mode, thin progress not here, Danish serif for Danish, I don't know later in test
// Avoid: Works on iPhone text, carousels, feature grids, right/wrong mid-test

export default function AssessmentLandingView({ setActive }) {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)] flex flex-col">
      <header className="px-4 lg:px-6 pt-6 pb-4 flex items-center justify-between max-w-[960px] mx-auto w-full">
        <button onClick={()=>setActive('simple-landing')} className="flex items-center gap-2 text-[14px] font-[600]">
          <span className="w-8 h-8 rounded-full bg-white border border-[var(--border)] grid place-items-center">←</span>
          Back
        </button>
        <span className="text-[11px] font-[700] tracking-widest uppercase text-[var(--muted)] bg-white border border-[var(--border)] px-3 py-1.5 rounded-full">5-min check • Modul 3 focus</span>
      </header>

      <main className="flex-1 px-4 lg:px-6 max-w-[960px] mx-auto w-full py-8 lg:py-12">
        <div className="max-w-[600px]">
          <div className="inline-flex items-center gap-2 text-[11px] font-[700] tracking-widest uppercase text-[var(--muted)]">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)]"></span>
            Your path through Modul 3 to 5 • PD3 is stretch
          </div>

          <h1 className="mt-6 text-[36px] lg:text-[48px] font-[700] tracking-tight leading-[0.9]">
            Find your<br/>Danish level
          </h1>

          <p className="mt-4 text-[17px] leading-[1.5] text-[var(--ink-secondary)]">
            5-minute check. 15 questions, Modul 3 focus A2→B1. Get your starting point with range, strengths, where to start, and retake link. No account needed.
          </p>

          <div className="mt-8 bg-white rounded-[16px] border border-[var(--border)] p-5">
            <div className="text-[11px] font-[700] tracking-widest uppercase text-[var(--muted)]">What happens • 3 flows</div>
            <div className="mt-4 space-y-3">
              {[
                { n: "1", t: "5-min check", d: "15 Q Modul 3 focus: V2, ledsætning, sin/hans, collocations, telephone borgerservice without transcript. I don't know prevents guessing." },
                { n: "2", t: "Starting point with range", d: "Not verdict. Range 12% reflects uncertainty. 3 strengths, 3 focus areas. Retake link. PD3 stretch labelled clearly above." },
                { n: "3", t: "Your path Modul 3→5", d: "You are here marker, reason for recommendation, Up next card, first step open. Mastery 80% over 15 answers." },
              ].map(s=>(
                <div key={s.n} className="flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-[var(--ink)] text-white grid place-items-center text-[12px] font-[700] shrink-0">{s.n}</div>
                  <div><div className="text-[14px] font-[600]">{s.t}</div><div className="text-[13px] text-[var(--muted)] leading-[1.4] mt-0.5">{s.d}</div></div>
                </div>
              ))}
            </div>
          </div>

          {/* One primary action per spec */}
          <div className="mt-8">
            <button 
              onClick={()=>setActive('diagnostic')}
              className="w-full lg:w-auto bg-[var(--ink)] text-white px-8 py-4 rounded-full text-[17px] font-[600] flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.97] transition-all min-h-[56px]"
            >
              Start the 5-minute check
              <NextIcon className="w-5 h-5" />
            </button>
            <div className="mt-3 flex items-center gap-3 text-[13px]">
              <button onClick={()=>setActive('simple-landing')} className="font-[600] text-[var(--muted)] hover:text-[var(--ink)] underline underline-offset-4">Start from the beginning</button>
              <span className="text-[var(--border-strong)]">•</span>
              <button onClick={()=>setActive('login')} className="font-[600] text-[var(--muted)] hover:text-[var(--ink)] underline underline-offset-4">Log in</button>
            </div>
          </div>

          <div className="mt-8 text-[11px] text-[var(--muted)] leading-[1.5] bg-white border border-[var(--border)] rounded-[12px] p-3">
            <b>Sprogpolitik:</b> Audio and lookup on questions and passages, never on answer options. Danish content in serif, interface in system face. Fixed 15Q not adaptive described same everywhere. Save state every answer back always works closing mid-test loses nothing. 5+ items per section stable.
          </div>
        </div>
      </main>
    </div>
  );
}
