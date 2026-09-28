import { useState } from 'react';

// Apple Premium Welcome — native iOS 17+ feel, materials, blur, premium typography
export default function WelcomeView({ setActive }) {
  const [step, setStep] = useState(0);

  const handleContinue = () => {
    if (navigator.vibrate) navigator.vibrate(10);
    if (step < 2) {
      setStep(s => s + 1);
    } else {
      localStorage.setItem('dansk_welcomed', 'true');
      setActive('login');
    }
  };

  const handleSkip = () => {
    if (navigator.vibrate) navigator.vibrate(10);
    localStorage.setItem('dansk_welcomed', 'true');
    setActive('login');
  };

  return (
    <div className="min-h-[100dvh] bg-[#FFFBF5] flex flex-col relative overflow-hidden">
      {/* Apple premium background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFFBF5] via-[#FFFBF5] to-[#FFF8F0] pointer-events-none" />
      <div className="absolute top-[-120px] right-[-80px] w-[280px] h-[280px] bg-[#E3EDEA]/50 rounded-full blur-[60px] pointer-events-none" />
      <div className="absolute bottom-[100px] left-[-100px] w-[300px] h-[300px] bg-[#FBE8E2]/40 rounded-full blur-[70px] pointer-events-none" />
      
      <div className="h-[env(safe-area-inset-top)] bg-transparent shrink-0 relative z-10" />
      
      {/* Skip — iOS 17 style */}
      <div className="flex justify-end px-6 pt-2 pb-2 relative z-10">
        <button 
          onClick={handleSkip}
          className="text-[15px] font-[500] tracking-[-0.01em] text-[#8E8E93] bg-white/70 backdrop-blur-[20px] border border-[#E8E0D6]/50 px-4 py-2 rounded-full shadow-[0_1px_4px_rgba(18,20,23,0.04)] hover:bg-white active:scale-[0.97] transition-all"
        >
          Spring over
        </button>
      </div>

      <div className="flex-1 flex flex-col px-6 pb-[calc(20px+env(safe-area-inset-bottom))] max-w-[390px] mx-auto w-full relative z-10">
        
        {/* Progress — Apple premium */}
        <div className="flex justify-center gap-2 mt-6 mb-10">
          {[0,1,2].map(i => (
            <div 
              key={i} 
              className={`h-1 rounded-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                i === step ? 'w-8 bg-[#121417] shadow-[0_1px_4px_rgba(18,20,23,0.15)]' : i < step ? 'w-1.5 bg-[#121417]/30' : 'w-1.5 bg-[#121417]/10'
              }`} 
            />
          ))}
        </div>

        <div className="flex-1 flex flex-col">
          {step === 0 && (
            <div className="flex-1 flex flex-col animate-fade-up">
              <div className="flex-1 flex items-center justify-center py-6">
                <div className="relative">
                  <div className="w-[280px] h-[200px] bg-white/70 backdrop-blur-[20px] rounded-[32px] border border-[#E8E0D6]/50 shadow-[0_8px_32px_rgba(18,20,23,0.06),0_2px_8px_rgba(18,20,23,0.04)] grid place-items-center p-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent pointer-events-none" />
                    <svg width="200" height="140" viewBox="0 0 280 200" className="overflow-visible relative">
                      <g className="danish-line-art">
                        <path d="M40 120 L40 80 L70 50 L100 80 L100 120" strokeWidth="1.5" />
                        <path d="M55 120 L55 95 L75 95 L75 120" strokeWidth="1.5" />
                        <path d="M120 120 L120 85 L150 60 L180 85 L180 120" strokeWidth="1.5" />
                        <path d="M135 120 L135 100 L165 100 L165 120" strokeWidth="1.5" />
                        <circle cx="70" cy="145" r="12" strokeWidth="1.5" />
                        <circle cx="110" cy="145" r="12" strokeWidth="1.5" />
                        <path d="M70 145 L90 125 L110 145 M90 125 L90 115 L100 115" strokeWidth="1.5" />
                        <path d="M200 40 L200 100 M200 55 L240 55 M200 70 L240 70" stroke="#D88C7A" strokeWidth="1.5" />
                        <path d="M200 40 L235 50 L200 60" fill="#D88C7A" stroke="none" />
                      </g>
                      <circle cx="220" cy="140" r="24" fill="#E3EDEA" opacity="0.5" />
                      <circle cx="50" cy="40" r="16" fill="#FBE8E2" opacity="0.4" />
                    </svg>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-[#121417]/5 rounded-full blur-[16px] -z-10" />
                </div>
              </div>

              <div className="text-center pb-6">
                <h1 className="text-[34px] font-[800] tracking-[-0.03em] leading-[1.05] text-[#121417] font-[Outfit]">
                  Lær dansk<br/>
                  <span className="bg-gradient-to-r from-[#121417] to-[#6B8A7F] bg-clip-text text-transparent">
                    på din måde
                  </span>
                </h1>
                <p className="mt-4 text-[17px] leading-[1.5] tracking-[-0.01em] text-[#6B6B6B] font-[400] max-w-[300px] mx-auto">
                  Fra Modul 1 til PD3. Personlig læringsvej baseret på dit niveau.
                </p>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="flex-1 flex flex-col animate-fade-up">
              <div className="flex-1 flex items-center justify-center py-6">
                <div className="w-[280px] h-[200px] bg-white/70 backdrop-blur-[20px] rounded-[32px] border border-[#E8E0D6]/50 shadow-[0_8px_32px_rgba(18,20,23,0.06)] grid place-items-center p-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent pointer-events-none" />
                  <svg width="200" height="140" viewBox="0 0 280 200" className="overflow-visible relative">
                    <g className="danish-line-art">
                      <path d="M40 160 Q80 120 120 100 T200 60" strokeDasharray="6 6" strokeWidth="1.5" />
                      <circle cx="40" cy="160" r="16" fill="white" stroke="#121417" strokeWidth="1.5" />
                      <text x="40" y="164" textAnchor="middle" fontSize="12" fontWeight="700" fill="#121417">1</text>
                      <circle cx="120" cy="100" r="20" fill="#121417" stroke="#121417" strokeWidth="1.5" className="shadow-[0_4px_12px_rgba(18,20,23,0.2)]" />
                      <text x="120" y="104" textAnchor="middle" fontSize="13" fontWeight="700" fill="white">2</text>
                      <circle cx="200" cy="60" r="16" fill="white" stroke="#E8E0D6" strokeWidth="1.5" />
                      <text x="200" y="64" textAnchor="middle" fontSize="12" fontWeight="700" fill="#AEAEB2">3</text>
                    </g>
                    <circle cx="180" cy="140" r="20" fill="#FFF8F0" opacity="0.8" />
                  </svg>
                </div>
              </div>

              <div className="text-center pb-6">
                <h1 className="text-[34px] font-[800] tracking-[-0.03em] leading-[1.05] text-[#121417] font-[Outfit]">
                  Din personlige<br/>
                  <span className="bg-gradient-to-r from-[#121417] to-[#8AA99E] bg-clip-text text-transparent">
                    læringsvej
                  </span>
                </h1>
                <p className="mt-4 text-[17px] leading-[1.5] tracking-[-0.01em] text-[#6B6B6B] max-w-[300px] mx-auto">
                  Vi finder dit niveau og bygger en vej der passer til dig.
                </p>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="flex-1 flex flex-col animate-fade-up">
              <div className="flex-1 flex items-center justify-center py-6">
                <div className="w-[280px] h-[200px] bg-white/70 backdrop-blur-[20px] rounded-[32px] border border-[#E8E0D6]/50 shadow-[0_8px_32px_rgba(18,20,23,0.06)] grid place-items-center p-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent pointer-events-none" />
                  <svg width="200" height="140" viewBox="0 0 280 200" className="overflow-visible relative">
                    <g className="danish-line-art">
                      <rect x="60" y="40" width="160" height="120" rx="20" fill="white" stroke="#E8E0D6" strokeWidth="1.5" />
                      <circle cx="100" cy="80" r="10" fill="#121417" stroke="#121417" />
                      <path d="M95 78 L98 81 L105 75" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M120 75 L180 75 M120 90 L160 90 M120 105 L170 105" strokeLinecap="round" strokeWidth="1.5" />
                      <circle cx="100" cy="130" r="10" fill="white" stroke="#E8E0D6" strokeWidth="1.5" />
                      <path d="M120 125 L180 125 M120 140 L160 140" stroke="#E8E0D6" strokeWidth="1.5" />
                    </g>
                    <circle cx="60" cy="160" r="16" fill="#E3EEFF" opacity="0.5" />
                    <circle cx="220" cy="50" r="12" fill="#FBE8E2" opacity="0.4" />
                  </svg>
                </div>
              </div>

              <div className="text-center pb-6">
                <h1 className="text-[34px] font-[800] tracking-[-0.03em] leading-[1.05] text-[#121417] font-[Outfit]">
                  Test dit niveau<br/>
                  <span className="text-[#8AA99E]">på 7 minutter</span>
                </h1>
                <p className="mt-4 text-[17px] leading-[1.5] tracking-[-0.01em] text-[#6B6B6B] max-w-[300px] mx-auto">
                  Korte spørgsmål. Klare svar. Dit resultat bruges til din læringsvej.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-auto pt-6">
          <button
            onClick={handleContinue}
            className="w-full h-[56px] bg-[#121417] text-white rounded-full text-[17px] font-[600] tracking-[-0.01em] shadow-[0_8px_24px_rgba(18,20,23,0.18),0_2px_8px_rgba(18,20,23,0.12)] active:scale-[0.98] active:shadow-[0_2px_8px_rgba(18,20,23,0.1)] transition-all flex items-center justify-center gap-2 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/[0.08] to-white/0 translate-x-[-100%] group-active:translate-x-[100%] transition-transform duration-700" />
            <span className="relative">{step === 2 ? 'Kom i gang' : 'Fortsæt'}</span>
            <span className="relative text-[18px]">→</span>
          </button>
          
          <div className="mt-6 flex justify-center">
            <div className="w-32 h-1 bg-[#121417] rounded-full opacity-10" />
          </div>
        </div>
      </div>
    </div>
  );
}
