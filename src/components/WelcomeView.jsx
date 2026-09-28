import { useState } from 'react';

// iPhone-first Welcome — native iOS feel, not web page
export default function WelcomeView({ setActive }) {
  const [step, setStep] = useState(0);

  const handleContinue = () => {
    if (navigator.vibrate) navigator.vibrate(10);
    if (step < 2) {
      setStep(s => s + 1);
    } else {
      setActive('login');
    }
  };

  const handleSkip = () => {
    if (navigator.vibrate) navigator.vibrate(10);
    setActive('login');
  };

  return (
    <div className="min-h-[100dvh] bg-[#FFFBF5] flex flex-col relative overflow-hidden">
      {/* Safe area top */}
      <div className="h-[env(safe-area-inset-top)] bg-[#FFFBF5] shrink-0" />
      
      {/* Skip button — iOS style top right */}
      <div className="flex justify-end px-6 pt-4 pb-2">
        <button 
          onClick={handleSkip}
          className="text-[15px] font-[500] text-[#8E8E93] px-4 py-2 rounded-full hover:bg-black/5 active:scale-[0.97] transition-all"
        >
          Spring over
        </button>
      </div>

      {/* Content — fits iPhone viewport */}
      <div className="flex-1 flex flex-col px-6 pb-[calc(24px+env(safe-area-inset-bottom))] max-w-[390px] mx-auto w-full">
        
        {/* Progress dots — iOS style */}
        <div className="flex justify-center gap-2 mt-4 mb-8">
          {[0,1,2].map(i => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === step ? 'w-8 bg-[#121417]' : i < step ? 'w-1.5 bg-[#121417]/30' : 'w-1.5 bg-[#121417]/15'
              }`} 
            />
          ))}
        </div>

        {/* Main content — changes per step */}
        <div className="flex-1 flex flex-col">
          {step === 0 && (
            <div className="flex-1 flex flex-col animate-fade-up">
              {/* Danish line art — iPhone sized, not stretched */}
              <div className="flex-1 flex items-center justify-center py-8">
                <div className="relative">
                  {/* Geometric Danish illustration — no AI humans */}
                  <svg width="280" height="200" viewBox="0 0 280 200" className="overflow-visible">
                    {/* Houses — line art 1.5px */}
                    <g className="danish-line-art">
                      <path d="M40 120 L40 80 L70 50 L100 80 L100 120" />
                      <path d="M55 120 L55 95 L75 95 L75 120" />
                      <path d="M60 70 L60 60 L80 60 L80 70" />
                      {/* Second house */}
                      <path d="M120 120 L120 85 L150 60 L180 85 L180 120" />
                      <path d="M135 120 L135 100 L165 100 L165 120" />
                      {/* Bicycle — line art */}
                      <circle cx="70" cy="145" r="12" />
                      <circle cx="110" cy="145" r="12" />
                      <path d="M70 145 L90 125 L110 145 M90 125 L90 115 L100 115" />
                      {/* Flag */}
                      <path d="M200 40 L200 100 M200 55 L240 55 M200 70 L240 70" stroke="#D88C7A" />
                      <path d="M200 40 L235 50 L200 60" fill="#D88C7A" stroke="none" />
                    </g>
                    {/* Soft shapes */}
                    <circle cx="220" cy="140" r="30" fill="#E3EDEA" opacity="0.6" />
                    <circle cx="50" cy="40" r="20" fill="#FBE8E2" opacity="0.5" />
                  </svg>
                </div>
              </div>

              <div className="text-center pb-8">
                <h1 className="text-[32px] font-[700] tracking-[-0.02em] leading-[1.1] text-[#121417] font-[Outfit]">
                  Lær dansk<br/>på din måde
                </h1>
                <p className="mt-4 text-[17px] leading-[1.4] text-[#6B6B6B] font-[400] max-w-[300px] mx-auto">
                  Fra Modul 1 til PD3. Personlig læringsvej baseret på dit niveau.
                </p>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="flex-1 flex flex-col animate-fade-up">
              <div className="flex-1 flex items-center justify-center py-8">
                <svg width="280" height="200" viewBox="0 0 280 200" className="overflow-visible">
                  <g className="danish-line-art">
                    {/* Path with nodes — clean visual */}
                    <path d="M40 160 Q80 120 120 100 T200 60" strokeDasharray="6 6" />
                    <circle cx="40" cy="160" r="16" fill="white" stroke="#121417" strokeWidth="1.5" />
                    <text x="40" y="164" textAnchor="middle" fontSize="12" fontWeight="700" fill="#121417">1</text>
                    <circle cx="120" cy="100" r="16" fill="#8AA99E" stroke="#8AA99E" />
                    <text x="120" y="104" textAnchor="middle" fontSize="12" fontWeight="700" fill="white">2</text>
                    <circle cx="200" cy="60" r="16" fill="white" stroke="#E8E0D6" strokeWidth="1.5" />
                    <text x="200" y="64" textAnchor="middle" fontSize="12" fontWeight="700" fill="#AEAEB2">3</text>
                    {/* Small icons */}
                    <path d="M60 140 L60 130 L70 130 L70 140" fill="none" />
                  </g>
                  <circle cx="180" cy="140" r="24" fill="#FFF8F0" opacity="0.8" />
                </svg>
              </div>

              <div className="text-center pb-8">
                <h1 className="text-[32px] font-[700] tracking-[-0.02em] leading-[1.1] text-[#121417] font-[Outfit]">
                  Din personlige<br/>læringsvej
                </h1>
                <p className="mt-4 text-[17px] leading-[1.4] text-[#6B6B6B] max-w-[300px] mx-auto">
                  Vi finder dit niveau og bygger en vej der passer til dig. Ingen unødvendig information.
                </p>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="flex-1 flex flex-col animate-fade-up">
              <div className="flex-1 flex items-center justify-center py-8">
                <svg width="280" height="200" viewBox="0 0 280 200" className="overflow-visible">
                  <g className="danish-line-art">
                    {/* Simple test illustration */}
                    <rect x="60" y="40" width="160" height="120" rx="16" fill="white" stroke="#E8E0D6" strokeWidth="1.5" />
                    <circle cx="100" cy="80" r="8" fill="#8AA99E" />
                    <path d="M120 75 L180 75 M120 90 L160 90 M120 105 L170 105" strokeLinecap="round" />
                    <circle cx="100" cy="130" r="8" fill="white" stroke="#121417" strokeWidth="1.5" />
                    <path d="M120 125 L180 125 M120 140 L160 140" stroke="#E8E0D6" />
                    {/* Checkmark */}
                    <path d="M95 78 L98 81 L105 75" stroke="#8AA99E" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                  <circle cx="60" cy="160" r="20" fill="#E3EEFF" opacity="0.6" />
                  <circle cx="220" cy="50" r="16" fill="#FBE8E2" opacity="0.5" />
                </svg>
              </div>

              <div className="text-center pb-8">
                <h1 className="text-[32px] font-[700] tracking-[-0.02em] leading-[1.1] text-[#121417] font-[Outfit]">
                  Test dit niveau<br/>på 7 minutter
                </h1>
                <p className="mt-4 text-[17px] leading-[1.4] text-[#6B6B6B] max-w-[300px] mx-auto">
                  Korte spørgsmål. Klare svar. Dit resultat bruges til at bygge din læringsvej.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Bottom actions — iOS native, fits safe area */}
        <div className="mt-auto pt-6">
          <button
            onClick={handleContinue}
            className="w-full h-[56px] bg-[#121417] text-white rounded-full text-[17px] font-[600] tracking-[-0.01em] shadow-[0_4px_16px_rgba(18,20,23,0.15)] active:scale-[0.98] active:shadow-[0_2px_8px_rgba(18,20,23,0.1)] transition-all flex items-center justify-center gap-2"
          >
            {step === 2 ? 'Kom i gang' : 'Fortsæt'}
            <span className="text-[18px]">→</span>
          </button>
          
          <div className="mt-4 flex justify-center">
            <div className="w-32 h-1 bg-[#121417] rounded-full opacity-10" />
          </div>
        </div>
      </div>
    </div>
  );
}
