import { NextIcon } from '../lib/icons.jsx';

// AssessmentLandingView — Entry to assessment per Action Plan Phase 4
// Screen: One headline, one sentence, one primary action Start 5-minute check
// Simplified: Back button only, no path preview, no "What happens" explanation

export default function AssessmentLandingView({ setActive }) {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)] flex flex-col">
      <header className="px-4 lg:px-6 pt-6 pb-4 flex items-center max-w-[960px] mx-auto w-full">
        <button onClick={()=>setActive('simple-landing')} className="flex items-center gap-2 text-[14px] font-[600]">
          <span className="w-8 h-8 rounded-full bg-white border border-[var(--border)] grid place-items-center">←</span>
          Back
        </button>
      </header>

      <main className="flex-1 flex flex-col px-4 lg:px-6 max-w-[960px] mx-auto w-full">
        <div className="flex-1 flex flex-col lg:items-center justify-center gap-8 py-8 lg:py-16 max-w-[600px]">
          <h1 className="text-[40px] lg:text-[56px] font-[700] tracking-tight leading-[0.9]">
            Find your Danish level
          </h1>

          <p className="text-[17px] leading-[1.5] text-[var(--ink-secondary)]">
            Take a quick 5-minute check to discover your starting point. No account needed.
          </p>

          <div className="mt-4">
            <button
              onClick={()=>setActive('diagnostic')}
              className="bg-[var(--ink)] text-white px-8 py-4 rounded-full text-[17px] font-[600] flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.97] transition-all min-h-[56px]"
            >
              Start the 5-minute check
              <NextIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
