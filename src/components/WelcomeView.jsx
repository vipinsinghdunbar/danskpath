import { useState } from 'react';

export default function WelcomeView({ setActive }) {
  const [step, setStep] = useState(0);
  const steps = [
    {
      title: "Lær dansk\npå din måde",
      subtitle: "Fra alfabet til PD3 — din vej, dit tempo",
      desc: "Modul 1 (A1) → Modul 5 (B1-B2) PD3 klar. Ingen hjerter, ingen streaks. Kun hvad der flytter dig mod Modultest og PD3.",
      cta: "Kom i gang →",
      visual: "🏠"
    },
    {
      title: "Find dit\nniveau først",
      subtitle: "7 minutter • 15 spørgsmål • Din personlige vej",
      desc: "Vi tester ikke bare %. Vi ser per niveau A1/A2/B1/B2, per kategori grammatik/ordforråd/lytning, og bygger din vej fra din svageste færdighed <60% først.",
      cta: "Forstå testen →",
      visual: "📊"
    },
    {
      title: "Øv det der\nvirker i tale",
      subtitle: "15 min • én hånd • på bussen • uendelige varianter",
      desc: "Ikke 'møde = meeting' men 'holde et møde'. Kollokationer + SRS Box 0→5. Lytning uden tekst først — dansk sluger 25% stavelser. Skrivning ugentlig ny, ingen gentagelse 60 dage.",
      cta: "Start din rejse →",
      visual: "✧"
    }
  ];

  const current = steps[step];

  const handleNext = () => {
    if (navigator.vibrate) navigator.vibrate(10);
    if (step < steps.length - 1) {
      setStep(s => s + 1);
    } else {
      localStorage.setItem('dansk_welcomed', 'true');
      setActive('assessment');
    }
  };

  const handleSkip = () => {
    localStorage.setItem('dansk_welcomed', 'true');
    setActive('assessment');
  };

  return (
    <div className="min-h-screen bg-[#FFFBF5] flex flex-col">
      {/* iPhone safe area top */}
      <div className="h-[env(safe-area-inset-top,0px)] bg-[#FFFBF5]" />
      
      {/* Header dots */}
      <div className="px-6 pt-6 flex justify-between items-center">
        <div className="flex gap-1.5">
          {steps.map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i === step ? 'w-6 bg-black' : i < step ? 'w-1.5 bg-black/30' : 'w-1.5 bg-black/10'}`} />
          ))}
        </div>
        <button onClick={handleSkip} className="text-[13px] font-[600] text-[#8E8E93] px-3 py-1.5 rounded-full hover:bg-black/5">Spring over</button>
      </div>

      {/* Main content - fits iPhone without overflow */}
      <div className="flex-1 flex flex-col px-6 pt-8 pb-6 max-w-[440px] mx-auto w-full">
        {/* Visual */}
        <div className="flex-1 flex flex-col">
          <div className="w-full aspect-[4/3] bg-white rounded-[32px] border border-black/5 shadow-sm grid place-items-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FFFBF5] to-[#F2F2F7]" />
            <div className="relative text-[80px]">{current.visual}</div>
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-black text-white rounded-full px-3 py-1.5 text-[11px] font-[600] inline-flex">Modul {step + 1} • {['Foundation A1', 'Independent A2', 'Fluent B1'][step]}</div>
            </div>
          </div>

          <div className="mt-8">
            <h1 className="text-[36px] font-[700] tracking-tight leading-[0.9] whitespace-pre-line">{current.title}</h1>
            <p className="mt-3 text-[15px] font-[600] leading-tight">{current.subtitle}</p>
            <p className="mt-3 text-[15px] leading-[1.5] text-[#3C3C43]/70">{current.desc}</p>
          </div>
        </div>

        {/* Bottom CTA - always visible, no overflow */}
        <div className="mt-8">
          <button 
            onClick={handleNext}
            className="w-full bg-black text-white py-4 rounded-full text-[17px] font-[600] shadow-[0_8px_24px_rgba(0,0,0,0.15)] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            {current.cta}
          </button>
          
          {step > 0 && (
            <button 
              onClick={() => setStep(s => s - 1)}
              className="w-full mt-3 bg-white border border-black/10 py-3.5 rounded-full text-[15px] font-[600] active:scale-[0.98] transition-all"
            >
              ← Tilbage
            </button>
          )}

          <div className="mt-4 flex justify-center gap-2">
            <span className="text-[11px] text-[#8E8E93]">M1 → PD3 • A1 til B2 • Full education</span>
            <span className="text-[11px] text-[#8E8E93]">•</span>
            <span className="text-[11px] text-[#8E8E93]">15 min • én hånd</span>
          </div>
        </div>
      </div>

      {/* iPhone safe area bottom */}
      <div className="h-[env(safe-area-inset-bottom,0px)] bg-[#FFFBF5]" />
    </div>
  );
}
