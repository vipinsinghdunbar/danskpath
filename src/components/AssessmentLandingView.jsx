import { useState, useEffect } from 'react';

// Apple Premium Assessment Landing — iPhone minimal, premium
export default function AssessmentLandingView({ setActive }) {
  const [userLevel] = useState(() => localStorage.getItem('dansk_level') || null);
  const [hasCompleted] = useState(() => !!localStorage.getItem('dansk_diagnostic'));

  return (
    <div className="min-h-[100dvh] bg-[#FFFBF5] flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFFBF5] via-[#FFFBF5] to-[#FFF8F0] pointer-events-none" />
      <div className="absolute top-[-80px] right-[-60px] w-[200px] h-[200px] bg-[#E3EDEA]/30 rounded-full blur-[50px] pointer-events-none" />
      
      <div className="h-[env(safe-area-inset-top)] bg-transparent shrink-0 relative z-10" />
      
      <div className="flex items-center justify-between px-6 pt-2 pb-4 shrink-0 max-w-[390px] mx-auto w-full relative z-10">
        <button 
          onClick={()=>setActive('welcome')}
          className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-[20px] border border-[#E8E0D6]/60 shadow-[0_1px_4px_rgba(18,20,23,0.04)] grid place-items-center text-[16px] active:scale-[0.95] transition-all"
        >
          ←
        </button>
        <div className="bg-white/70 backdrop-blur-[20px] border border-[#E8E0D6]/50 rounded-full px-4 py-1.5 shadow-[0_1px_4px_rgba(18,20,23,0.04)]">
          <div className="text-[13px] font-[600] tracking-[-0.01em] text-[#121417]">Dit niveau</div>
        </div>
        <div className="w-10 h-10" />
      </div>

      <div className="flex-1 px-6 pb-[calc(16px+env(safe-area-inset-bottom))] max-w-[390px] mx-auto w-full flex flex-col overflow-y-auto no-scrollbar relative z-10">
        
        <div className="flex-1 flex flex-col justify-center py-4">
          <div className="flex justify-center mb-8">
            <div className="w-[200px] h-[160px] bg-white/70 backdrop-blur-[20px] rounded-[32px] border border-[#E8E0D6]/50 shadow-[0_8px_32px_rgba(18,20,23,0.06),0_2px_8px_rgba(18,20,23,0.04)] grid place-items-center p-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent pointer-events-none" />
              <svg width="140" height="110" viewBox="0 0 200 160" className="overflow-visible relative">
                <g className="danish-line-art" strokeWidth="1.5">
                  <rect x="30" y="20" width="140" height="100" rx="20" fill="white" stroke="#E8E0D6" />
                  <circle cx="70" cy="55" r="10" fill="#121417" stroke="#121417" />
                  <path d="M65 53 L68 56 L75 49" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M95 50 L145 50 M95 65 L135 65 M95 80 L145 80" strokeLinecap="round" />
                  <path d="M60 105 L140 105" stroke="#E8E0D6" strokeWidth="1" />
                  <path d="M150 25 L150 45 M150 30 L165 30 M150 35 L165 35" stroke="#D88C7A" />
                </g>
                <circle cx="40" cy="130" r="12" fill="#FFF8F0" opacity="0.8" />
                <circle cx="160" cy="130" r="10" fill="#E3EEFF" opacity="0.6" />
              </svg>
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-[30px] font-[800] tracking-[-0.03em] leading-[1.05] text-[#121417] font-[Outfit]">
              {hasCompleted ? 'Dit niveau' : 'Find dit niveau'}
            </h1>
            <p className="mt-3 text-[15px] leading-[1.5] tracking-[-0.01em] text-[#6B6B6B] max-w-[300px] mx-auto">
              {hasCompleted 
                ? `Du er ${userLevel || 'Modul 1'}. Vil du teste igen eller se din vej?`
                : '7 minutter. 15 spørgsmål. Vi finder dit startpunkt.'
              }
            </p>
          </div>

          <div className="mt-8 space-y-3">
            {[
              { icon: "◷", title: "7 minutter", desc: "Korte, klare spørgsmål", color: "#121417" },
              { icon: "◎", title: "Dit niveau", desc: "Modul 1 til 5, A1 til B2", color: "#8AA99E" },
              { icon: "→", title: "Din vej", desc: "Personlig læringsvej bagefter", color: "#D88C7A" },
            ].map((item, i) => (
              <div key={i} className="bg-white/80 backdrop-blur-[20px] rounded-[20px] p-4 border border-[#E8E0D6]/50 shadow-[0_2px_12px_rgba(18,20,23,0.04)] flex items-center gap-3.5 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <div className="w-11 h-11 rounded-[12px] bg-[#121417] text-white grid place-items-center text-[16px] font-[700] shadow-[0_2px_8px_rgba(18,20,23,0.12)] relative">
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0 relative">
                  <div className="text-[14px] font-[600] tracking-[-0.01em] text-[#121417]">{item.title}</div>
                  <div className="text-[12px] font-[500] tracking-[-0.01em] text-[#8E8E93] mt-0.5">{item.desc}</div>
                </div>
                <div className="w-6 h-6 rounded-full bg-[#FFF8F0] border border-[#E8E0D6] grid place-items-center text-[10px] text-[#8E8E93] relative">
                  {i+1}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto pt-6 space-y-3">
          <button 
            onClick={()=>setActive('diagnostic')}
            className="w-full h-[56px] bg-[#121417] text-white rounded-full text-[17px] font-[600] tracking-[-0.01em] shadow-[0_8px_24px_rgba(18,20,23,0.18),0_2px_8px_rgba(18,20,23,0.12)] active:scale-[0.98] active:shadow-[0_2px_8px_rgba(18,20,23,0.1)] transition-all flex items-center justify-center gap-2 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/[0.08] to-white/0 translate-x-[-100%] group-active:translate-x-[100%] transition-transform duration-700" />
            <span className="relative">{hasCompleted ? 'Test igen' : 'Start test'}</span>
            <span className="relative text-[18px]">→</span>
          </button>
          
          {hasCompleted && (
            <button 
              onClick={()=>setActive('path')}
              className="w-full h-[52px] bg-white/80 backdrop-blur-[20px] border border-[#E8E0D6]/60 rounded-full text-[15px] font-[600] tracking-[-0.01em] text-[#121417] shadow-[0_1px_4px_rgba(18,20,23,0.04)] active:scale-[0.98] transition-all"
            >
              Se min læringsvej
            </button>
          )}

          <div className="flex justify-center pt-3">
            <div className="w-32 h-1 bg-[#121417] rounded-full opacity-10" />
          </div>
        </div>
      </div>
    </div>
  );
}
