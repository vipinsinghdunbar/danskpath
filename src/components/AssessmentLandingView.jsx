import { useState, useEffect } from 'react';

// iPhone-first Assessment Landing — clean, minimal, part of onboarding flow
export default function AssessmentLandingView({ setActive }) {
  const [userLevel] = useState(() => localStorage.getItem('dansk_level') || null);
  const [hasCompleted] = useState(() => !!localStorage.getItem('dansk_diagnostic'));

  return (
    <div className="min-h-[100dvh] bg-[#FFFBF5] flex flex-col">
      <div className="h-[env(safe-area-inset-top)] bg-[#FFFBF5] shrink-0" />
      
      {/* Header — minimal */}
      <div className="flex items-center justify-between px-6 pt-2 pb-4 shrink-0 max-w-[390px] mx-auto w-full">
        <button 
          onClick={()=>setActive('welcome')}
          className="w-9 h-9 rounded-full bg-white border border-[#E8E0D6] grid place-items-center text-[16px] active:scale-[0.95] transition-transform"
        >
          ←
        </button>
        <div className="text-[15px] font-[600] text-[#121417]">Dit niveau</div>
        <div className="w-9 h-9" />
      </div>

      <div className="flex-1 px-6 pb-[calc(16px+env(safe-area-inset-bottom))] max-w-[390px] mx-auto w-full flex flex-col overflow-y-auto no-scrollbar">
        
        {/* Main — iPhone sized illustration */}
        <div className="flex-1 flex flex-col justify-center py-6">
          <div className="flex justify-center mb-8">
            <svg width="200" height="160" viewBox="0 0 200 160" className="overflow-visible">
              <g className="danish-line-art">
                <rect x="30" y="20" width="140" height="100" rx="20" fill="white" stroke="#E8E0D6" strokeWidth="1.5" />
                <circle cx="70" cy="55" r="10" fill="#E3EDEA" stroke="#8AA99E" strokeWidth="1.5" />
                <path d="M95 50 L145 50 M95 65 L135 65 M95 80 L145 80" strokeLinecap="round" />
                <path d="M60 105 L140 105" stroke="#E8E0D6" strokeWidth="1" />
                {/* Small flag */}
                <path d="M150 25 L150 45 M150 30 L165 30 M150 35 L165 35" stroke="#D88C7A" />
              </g>
              <circle cx="40" cy="130" r="16" fill="#FFF8F0" opacity="0.8" />
              <circle cx="160" cy="130" r="12" fill="#E3EEFF" opacity="0.6" />
            </svg>
          </div>

          <div className="text-center">
            <h1 className="text-[28px] font-[700] tracking-[-0.02em] leading-[1.1] text-[#121417] font-[Outfit]">
              {hasCompleted ? 'Dit niveau' : 'Find dit niveau'}
            </h1>
            <p className="mt-3 text-[15px] leading-[1.5] text-[#6B6B6B] max-w-[300px] mx-auto">
              {hasCompleted 
                ? `Du er ${userLevel || 'Modul 1'}. Vil du teste igen eller se din læringsvej?`
                : '7 minutter. 15 spørgsmål. Vi finder dit startpunkt og bygger din personlige vej.'
              }
            </p>
          </div>

          {/* What happens — clean, minimal, no excessive text */}
          <div className="mt-8 space-y-3">
            {[
              { icon: "◷", title: "7 minutter", desc: "Korte, klare spørgsmål" },
              { icon: "◎", title: "Dit niveau", desc: "Modul 1 til 5, A1 til B2" },
              { icon: "→", title: "Din vej", desc: "Personlig læringsvej bagefter" },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-[16px] p-4 border border-[#E8E0D6]/60 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FFF8F0] border border-[#E8E0D6]/60 grid place-items-center text-[14px] font-[700] text-[#121417]">
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[14px] font-[600] text-[#121417]">{item.title}</div>
                  <div className="text-[12px] text-[#8E8E93] mt-0.5">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions — one clear primary */}
        <div className="mt-auto pt-6 space-y-3">
          <button 
            onClick={()=>setActive('diagnostic')}
            className="w-full h-[56px] bg-[#121417] text-white rounded-full text-[17px] font-[600] tracking-[-0.01em] shadow-[0_4px_16px_rgba(18,20,23,0.15)] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            {hasCompleted ? 'Test igen' : 'Start test'}
            <span>→</span>
          </button>
          
          {hasCompleted && (
            <button 
              onClick={()=>setActive('path')}
              className="w-full h-[52px] bg-white border border-[#E8E0D6] rounded-full text-[15px] font-[600] text-[#121417] active:scale-[0.98] transition-all"
            >
              Se min læringsvej
            </button>
          )}

          <div className="flex justify-center pt-2">
            <div className="w-32 h-1 bg-[#121417] rounded-full opacity-10" />
          </div>
        </div>
      </div>
    </div>
  );
}
