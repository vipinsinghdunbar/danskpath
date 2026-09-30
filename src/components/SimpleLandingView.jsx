export default function SimpleLandingView({ setActive }) {
  const hasAccount = !!localStorage.getItem('danskpath_token');
  const hasAssessment = !!localStorage.getItem('dansk_diagnostic');

  return (
    <div className="min-h-screen bg-[#FFFBF5] flex flex-col">
      <div className="h-[env(safe-area-inset-top,0px)] bg-[#FFFBF5]" />
      
      {/* Header - discreet admin per spec */}
      <div className="px-6 pt-6 flex justify-between items-center max-w-[480px] mx-auto w-full">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-black text-white grid place-items-center font-bold text-[14px]">D</div>
          <span className="text-[14px] font-[700] tracking-tight">DanskPath</span>
        </div>
        <button onClick={()=>setActive('login')} className="text-[11px] text-[#8E8E93] hover:text-black">Admin</button>
      </div>

      {/* Main - extremely simple per spec: only logo/name, short headline, one-sentence, primary CTA Take the Test, secondary Already have account? Log in, discreet Admin, no long marketing */}
      <div className="flex-1 flex flex-col justify-center px-6 max-w-[480px] mx-auto w-full">
        <div className="py-16">
          <h1 className="text-[40px] font-[700] tracking-tight leading-[0.9] font-[Outfit]">
            Find your<br/>Danish level
          </h1>
          <p className="mt-4 text-[17px] leading-[1.4] text-[#3C3C43]/70">
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
        </div>
      </div>

      <div className="h-[env(safe-area-inset-bottom,0px)] bg-[#FFFBF5]" />
      
      <div className="px-6 pb-6 max-w-[480px] mx-auto w-full">
        <div className="text-[11px] text-[#8E8E93] text-center">
          Modul 1 → PD3 • A1 to B2 • No streaks • 15 min a day
        </div>
      </div>
    </div>
  );
}
