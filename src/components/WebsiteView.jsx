import { useState, useEffect } from 'react';
import BrandLogo from './BrandLogo';
export default function WebsiteView({ setActive }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(()=>{ const onScroll = ()=> setScrolled(window.scrollY>20); window.addEventListener('scroll', onScroll); return ()=> window.removeEventListener('scroll', onScroll); },[]);
  return (
    <div className="min-h-screen bg-cream text-charcoal">
      <header className={`sticky top-0 z-40 backdrop-blur-[20px] border-b ${scrolled ? 'bg-white/85 border-line' : 'bg-cream/80 border-transparent'}`}>
        <div className="max-w-[1120px] mx-auto px-5 lg:px-8 h-[64px] flex items-center justify-between"><BrandLogo /><div className="flex items-center gap-1.5"><button onClick={()=>setActive('assessment')} className="text-[14px] font-[600] px-4 py-2 rounded-full hover:bg-paper hidden sm:block">Vurdering</button><button onClick={()=>setActive('login')} className="text-[14px] font-[600] px-4 py-2 rounded-full hover:bg-paper">Log ind</button><button onClick={()=>setActive('assessment')} className="bg-charcoal text-white text-[14px] font-[600] px-5 py-2.5 rounded-full">Kom i gang</button></div></div>
      </header>
      <section className="max-w-[1120px] mx-auto px-5 lg:px-8 pt-[48px] lg:pt-[80px] pb-[48px]">
        <h1 className="text-[42px] lg:text-[64px] font-[700] leading-[0.92] font-display">Lær Dansk<br/><span className="text-sage-dark">M1 til PD3</span><br/><span className="text-[32px] lg:text-[36px] font-[500] text-ink/60">Din skræddersyede vej</span></h1>
        <p className="mt-6 text-[18px] text-ink/70 max-w-[520px]">DanskPath er din skræddersyede vej til sproglig mestring — fra M1 til PD3. Dansk design, ingen AI mennesker, kun linje kunst.</p>
        <div className="mt-8 flex gap-3"><button onClick={()=>setActive('assessment')} className="btn-terracotta px-8 py-4">Start din læring nu →</button><button onClick={()=>setActive('path')} className="btn-ghost px-8 py-4 bg-white">Se Modul 1→5 sti</button></div>
      </section>
      <footer className="border-t border-line/60 py-8"><div className="max-w-[1120px] mx-auto px-5 lg:px-8 text-[12px] text-ink/40">DanskPath © 2025 • København • Dansk Design • Ingen AI mennesker</div></footer>
    </div>
  );
}
