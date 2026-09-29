export default function SimpleLandingView({ setActive }) {
  const hasAccount = !!localStorage.getItem('danskpath_token');
  const hasAssessment = !!localStorage.getItem('dansk_diagnostic');

  return (
    <div className="min-h-screen bg-[#FFFBF5] flex flex-col">
      <div className="h-[env(safe-area-inset-top,0px)] bg-[#FFFBF5]" />
      
      {/* Header - discreet admin */}
      <div className="px-6 pt-6 flex justify-between items-center max-w-[480px] mx-auto w-full">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-black text-white grid place-items-center font-bold text-[14px]">D</div>
          <span className="text-[14px] font-[700] tracking-tight">DanskPath</span>
        </div>
        <button onClick={()=>setActive('login')} className="text-[11px] text-[#8E8E93] hover:text-black">Admin</button>
      </div>

      {/* Main - extremely simple per spec */}
      <div className="flex-1 flex flex-col justify-center px-6 max-w-[480px] mx-auto w-full">
        <div className="py-12">
          <h1 className="text-[40px] font-[700] tracking-tight leading-[0.9] font-[Outfit]">
            Find your<br/>Danish level
          </h1>
          <p className="mt-4 text-[18px] leading-[1.4] text-[#3C3C43]/70">
            Take a short assessment and get a learning path built around your needs.
          </p>

          <div className="mt-10">
            <button 
              onClick={()=>setActive('assessment')}
              className="w-full bg-black text-white py-4 rounded-full text-[17px] font-[600] shadow-[0_8px_24px_rgba(0,0,0,0.15)] active:scale-[0.98] transition-all"
            >
              Take the Test
            </button>
            
            {hasAssessment ? (
              <button 
                onClick={()=>setActive('practice')}
                className="w-full mt-3 bg-white border border-black/10 py-3.5 rounded-full text-[15px] font-[600] active:scale-[0.98] transition-all"
              >
                Continue learning → {localStorage.getItem('dansk_level') || ''}
              </button>
            ) : null}

            <div className="mt-6 text-center">
              {hasAccount ? (
                <button onClick={()=>setActive('practice')} className="text-[14px] text-[#8E8E93] hover:text-black">
                  Go to dashboard →
                </button>
              ) : (
                <button onClick={()=>setActive('login')} className="text-[14px] text-[#8E8E93] hover:text-black">
                  Already have an account? Log in
                </button>
              )}
            </div>
          </div>

          {/* Minimal info per spec - not long marketing */}
          <div className="mt-16 pt-8 border-t border-black/5">
            <div className="text-[11px] font-[700] tracking-widest uppercase text-[#8E8E93]">How it works</div>
            <div className="mt-4 space-y-3 text-[14px] leading-[1.5] text-[#3C3C43]/70">
              <div className="flex gap-3"><span className="font-[600] text-black">1.</span><span>7-min assessment of reading, listening, vocabulary, grammar, writing</span></div>
              <div className="flex gap-3"><span className="font-[600] text-black">2.</span><span>See your level, strengths, and focus areas</span></div>
              <div className="flex gap-3"><span className="font-[600] text-black">3.</span><span>Get a personalized path from Modul 1 to PD3</span></div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-[env(safe-area-inset-bottom,0px)] bg-[#FFFBF5]" />
      
      <div className="px-6 pb-6 max-w-[480px] mx-auto w-full">
        <div className="text-[11px] text-[#8E8E93] text-center">
          Modul 1 → PD3 • A1 to B2 • Full education • 15 min a day • No streaks
        </div>
      </div>
    </div>
  );
}
