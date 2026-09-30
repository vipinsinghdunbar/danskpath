export default function AssessmentLandingView({ setActive }) {
  return (
    <div className="min-h-screen bg-[#FFFBF5] flex flex-col">
      <div className="h-[env(safe-area-inset-top,0px)] bg-[#FFFBF5]" />
      
      <div className="px-6 pt-6 flex justify-between items-center max-w-[480px] mx-auto w-full">
        <button onClick={()=>setActive('simple-landing')} className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-black text-white grid place-items-center font-bold text-[14px]">D</div>
          <span className="text-[14px] font-[700] tracking-tight">DanskPath</span>
        </button>
        <button onClick={()=>setActive('login')} className="text-[11px] text-[#8E8E93] hover:text-black">Log in</button>
      </div>

      <div className="flex-1 flex flex-col justify-center px-6 max-w-[480px] mx-auto w-full">
        <div className="py-10">
          <div className="inline-flex text-[11px] font-[700] tracking-widest uppercase bg-black text-white px-3 py-1.5 rounded-full">Assessment • 7 min</div>
          
          <h1 className="mt-6 text-[32px] font-[700] tracking-tight leading-[0.95]">Find dit niveau</h1>
          
          <div className="mt-6 space-y-5">
            <div>
              <div className="text-[12px] font-[700] tracking-widest uppercase text-[#8E8E93]">What we measure</div>
              <div className="mt-2 text-[15px] leading-[1.5] text-[#3C3C43]/80">Reading, listening, vocabulary, grammar, writing — 15 questions</div>
            </div>
            
            <div>
              <div className="text-[12px] font-[700] tracking-widest uppercase text-[#8E8E93]">Duration</div>
              <div className="mt-2 text-[15px] leading-[1.5] text-[#3C3C43]/80">7 minutes • One question at a time • Progress bar</div>
            </div>
            
            <div>
              <div className="text-[12px] font-[700] tracking-widest uppercase text-[#8E8E93]">What you receive</div>
              <div className="mt-2 text-[15px] leading-[1.5] text-[#3C3C43]/80">Your level, section scores, strengths, focus areas, and a personalized path</div>
            </div>
          </div>

          <div className="mt-10">
            <button 
              onClick={()=>setActive('diagnostic')}
              className="w-full bg-black text-white py-4 rounded-full text-[17px] font-[600] shadow-[0_8px_24px_rgba(0,0,0,0.15)] active:scale-[0.98] transition-all"
            >
              Start assessment → 7 min
            </button>
            
            <div className="mt-4 text-center">
              <button onClick={()=>setActive('login')} className="text-[14px] text-[#8E8E93] hover:text-black">
                Already have an account? Log in
              </button>
            </div>
          </div>

          <div className="mt-8 text-[11px] text-[#8E8E93] leading-[1.4] text-center">
            No account needed to start • Your results stay on your device
          </div>
        </div>
      </div>

      <div className="h-[env(safe-area-inset-bottom,0px)] bg-[#FFFBF5]" />
    </div>
  );
}
