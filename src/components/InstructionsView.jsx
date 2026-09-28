// iPhone-first Instructions screen — clean, 5 bullet points, what happens after
export default function InstructionsView({ onStart, onBack, totalQuestions = 15 }) {
  return (
    <div className="min-h-[100dvh] bg-[#FFFBF5] flex flex-col relative overflow-hidden">
      <div className="h-[env(safe-area-inset-top)] bg-[#FFFBF5] shrink-0" />
      
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-2 pb-4 shrink-0">
        <button 
          onClick={onBack}
          className="w-9 h-9 rounded-full bg-white border border-[#E8E0D6] grid place-items-center text-[16px] active:scale-[0.95] transition-transform"
        >
          ←
        </button>
        <div className="text-[15px] font-[600] text-[#121417]">Instruktioner</div>
        <div className="w-9 h-9" />
      </div>

      <div className="flex-1 flex flex-col px-6 pb-[calc(16px+env(safe-area-inset-bottom))] max-w-[390px] mx-auto w-full">
        
        {/* Icon */}
        <div className="text-center pt-4 pb-6">
          <div className="w-20 h-20 rounded-[24px] bg-white border border-[#E8E0D6] shadow-[0_4px_16px_rgba(18,20,23,0.06)] grid place-items-center mx-auto">
            <svg width="40" height="40" viewBox="0 0 40 40" className="overflow-visible">
              <g className="danish-line-art" stroke="#121417">
                <rect x="8" y="6" width="24" height="28" rx="6" fill="white" />
                <path d="M14 14 L26 14 M14 19 L22 19 M14 24 L26 24" />
                <circle cx="20" cy="32" r="3" fill="#8AA99E" stroke="#8AA99E" />
              </g>
            </svg>
          </div>
          <h1 className="mt-5 text-[26px] font-[700] tracking-[-0.02em] leading-[1.1] text-[#121417] font-[Outfit]">
            Sådan fungerer testen
          </h1>
          <p className="mt-2 text-[15px] leading-[1.4] text-[#6B6B6B]">
            {totalQuestions} spørgsmål • Ca. 7 minutter
          </p>
        </div>

        {/* Instructions — 5 clear bullet points */}
        <div className="space-y-3">
          {[
            {
              n: 1,
              title: "Læs spørgsmålet grundigt",
              desc: "Svar baseret på den danske sætning eller situation."
            },
            {
              n: 2,
              title: "Kun ét svar er korrekt",
              desc: "Medmindre andet er angivet, er der kun ét rigtigt svar."
            },
            {
              n: 3,
              title: "Tag dig tid",
              desc: "Læs alle muligheder før du vælger. Der er ingen tidsbegrænsning per spørgsmål."
            },
            {
              n: 4,
              title: "Naviger frit",
              desc: "Du kan gå frem og tilbage mellem spørgsmålene."
            },
            {
              n: 5,
              title: "Få dit resultat bagefter",
              desc: "Når du er færdig, ser du dit niveau og din personlige læringsvej."
            }
          ].map(item => (
            <div key={item.n} className="bg-white rounded-[16px] p-4 border border-[#E8E0D6]/60 shadow-[0_1px_3px_rgba(18,20,23,0.04)] flex gap-3">
              <div className="w-7 h-7 rounded-full bg-[#121417] text-white grid place-items-center text-[12px] font-[700] shrink-0 mt-0.5">
                {item.n}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[14px] font-[600] tracking-[-0.01em] text-[#121417] leading-tight">
                  {item.title}
                </div>
                <div className="mt-1 text-[13px] leading-[1.4] text-[#6B6B6B]">
                  {item.desc}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* What happens after — brief */}
        <div className="mt-6 bg-[#E3EDEA]/60 rounded-[16px] p-4 border border-[#8AA99E]/20">
          <div className="text-[11px] font-[700] tracking-widest uppercase text-[#6B8A7F]">Efter testen</div>
          <div className="mt-2 text-[13px] leading-[1.5] text-[#3C3C43]">
            Du får dit niveau (Modul 1-5), dine styrker og områder til forbedring, og en personlig læringsvej der starter hvor du er — ikke fra begyndelsen.
          </div>
        </div>

        {/* Bottom action — one clear primary action */}
        <div className="mt-auto pt-8">
          <button
            onClick={onStart}
            className="w-full h-[56px] bg-[#121417] text-white rounded-full text-[17px] font-[600] tracking-[-0.01em] shadow-[0_4px_16px_rgba(18,20,23,0.15)] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            Start test
            <span>→</span>
          </button>
          
          <div className="mt-4 flex justify-center">
            <div className="w-32 h-1 bg-[#121417] rounded-full opacity-10" />
          </div>
        </div>
      </div>
    </div>
  );
}
