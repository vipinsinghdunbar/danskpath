// Apple Premium Instructions — iOS 17+ materials, blur, premium typography
export default function InstructionsView({ onStart, onBack, totalQuestions = 15 }) {
  return (
    <div className="min-h-[100dvh] bg-[#FFFBF5] flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFFBF5] via-[#FFFBF5] to-[#FFF8F0] pointer-events-none" />
      <div className="absolute top-[-80px] right-[-60px] w-[200px] h-[200px] bg-[#E3EDEA]/40 rounded-full blur-[50px] pointer-events-none" />
      
      <div className="h-[env(safe-area-inset-top)] bg-transparent shrink-0 relative z-10" />
      
      <div className="flex items-center justify-between px-6 pt-2 pb-4 shrink-0 max-w-[390px] mx-auto w-full relative z-10">
        <button 
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-[20px] border border-[#E8E0D6]/60 shadow-[0_1px_4px_rgba(18,20,23,0.04)] grid place-items-center text-[16px] active:scale-[0.95] transition-all"
        >
          ←
        </button>
        <div className="bg-white/70 backdrop-blur-[20px] border border-[#E8E0D6]/50 rounded-full px-4 py-1.5 shadow-[0_1px_4px_rgba(18,20,23,0.04)]">
          <div className="text-[13px] font-[600] tracking-[-0.01em] text-[#121417]">Instruktioner</div>
        </div>
        <div className="w-10 h-10" />
      </div>

      <div className="flex-1 flex flex-col px-6 pb-[calc(16px+env(safe-area-inset-bottom))] max-w-[390px] mx-auto w-full relative z-10">
        
        <div className="text-center pt-2 pb-6">
          <div className="w-20 h-20 rounded-[24px] bg-white/80 backdrop-blur-[20px] border border-[#E8E0D6]/50 shadow-[0_8px_24px_rgba(18,20,23,0.06),0_2px_8px_rgba(18,20,23,0.04)] grid place-items-center mx-auto relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-transparent pointer-events-none" />
            <svg width="36" height="36" viewBox="0 0 40 40" className="overflow-visible relative">
              <g className="danish-line-art" stroke="#121417" strokeWidth="1.5">
                <rect x="8" y="6" width="24" height="28" rx="6" fill="white" />
                <path d="M14 14 L26 14 M14 19 L22 19 M14 24 L26 24" />
                <circle cx="20" cy="32" r="3" fill="#121417" stroke="#121417" />
              </g>
            </svg>
          </div>
          <h1 className="mt-5 text-[28px] font-[700] tracking-[-0.03em] leading-[1.1] text-[#121417] font-[Outfit]">
            Sådan fungerer<br/>testen
          </h1>
          <div className="mt-3 inline-flex items-center gap-2 bg-white/70 backdrop-blur-[20px] border border-[#E8E0D6]/50 rounded-full px-3.5 py-1.5 shadow-[0_1px_4px_rgba(18,20,23,0.04)]">
            <div className="w-1.5 h-1.5 rounded-full bg-[#8AA99E] animate-pulse" />
            <span className="text-[12px] font-[600] tracking-[-0.01em] text-[#6B6B6B]">{totalQuestions} spørgsmål • Ca. 7 minutter</span>
          </div>
        </div>

        <div className="space-y-3">
          {[
            { n: 1, title: "Læs spørgsmålet grundigt", desc: "Svar baseret på den danske sætning eller situation." },
            { n: 2, title: "Kun ét svar er korrekt", desc: "Medmindre andet er angivet, er der kun ét rigtigt svar." },
            { n: 3, title: "Tag dig tid", desc: "Læs alle muligheder før du vælger. Ingen tidsbegrænsning per spørgsmål." },
            { n: 4, title: "Naviger frit", desc: "Du kan gå frem og tilbage mellem spørgsmålene." },
            { n: 5, title: "Få dit resultat bagefter", desc: "Når du er færdig, ser du dit niveau og din personlige læringsvej." }
          ].map(item => (
            <div key={item.n} className="bg-white/80 backdrop-blur-[20px] rounded-[20px] p-4 border border-[#E8E0D6]/50 shadow-[0_2px_12px_rgba(18,20,23,0.04),0_1px_4px_rgba(18,20,23,0.03)] flex gap-3.5 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div className="w-8 h-8 rounded-full bg-[#121417] text-white grid place-items-center text-[12px] font-[700] shrink-0 shadow-[0_2px_8px_rgba(18,20,23,0.15)] relative">
                {item.n}
              </div>
              <div className="flex-1 min-w-0 relative">
                <div className="text-[14px] font-[600] tracking-[-0.01em] text-[#121417] leading-tight">
                  {item.title}
                </div>
                <div className="mt-1 text-[13px] leading-[1.4] tracking-[-0.01em] text-[#6B6B6B]">
                  {item.desc}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-[#121417] rounded-[20px] p-5 text-white relative overflow-hidden shadow-[0_8px_24px_rgba(18,20,23,0.12)]">
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#8AA99E]/10 rounded-full blur-[20px] pointer-events-none" />
          <div className="relative">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-white/10 grid place-items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#8AA99E]" />
              </div>
              <div className="text-[11px] font-[700] tracking-[0.08em] uppercase opacity-60">Efter testen</div>
            </div>
            <div className="mt-3 text-[13px] leading-[1.5] tracking-[-0.01em] font-[400] opacity-90">
              Du får dit niveau (Modul 1-5), dine styrker og fokusområder, og en personlig læringsvej der starter hvor du er.
            </div>
          </div>
        </div>

        <div className="mt-auto pt-8">
          <button
            onClick={onStart}
            className="w-full h-[56px] bg-[#121417] text-white rounded-full text-[17px] font-[600] tracking-[-0.01em] shadow-[0_8px_24px_rgba(18,20,23,0.18),0_2px_8px_rgba(18,20,23,0.12)] active:scale-[0.98] active:shadow-[0_2px_8px_rgba(18,20,23,0.1)] transition-all flex items-center justify-center gap-2 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/[0.08] to-white/0 translate-x-[-100%] group-active:translate-x-[100%] transition-transform duration-700" />
            <span className="relative">Start test</span>
            <span className="relative text-[18px]">→</span>
          </button>
          
          <div className="mt-5 flex justify-center">
            <div className="w-32 h-1 bg-[#121417] rounded-full opacity-10" />
          </div>
        </div>
      </div>
    </div>
  );
}
