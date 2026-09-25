import { useState, useEffect } from 'react';
import BrandLogo from './BrandLogo';

export default function WebsiteView({ setActive }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(()=>{
    const onScroll = ()=> setScrolled(window.scrollY>20);
    window.addEventListener('scroll', onScroll);
    return ()=> window.removeEventListener('scroll', onScroll);
  },[]);

  return (
    <div className="min-h-screen bg-[#F2F2F7] text-black selection:bg-black selection:text-white">
      {/* Header */}
      <header className={`sticky top-0 z-40 backdrop-blur-[20px] border-b transition-all ${scrolled ? 'bg-white/80 border-black/5' : 'bg-[#F2F2F7]/80 border-transparent'}`}>
        <div className="max-w-[1120px] mx-auto px-5 lg:px-8 h-[64px] flex items-center justify-between">
          <BrandLogo />
          <div className="flex items-center gap-2">
            <button onClick={()=>setActive('assessment')} className="text-[14px] font-[600] px-4 py-2 rounded-full hover:bg-black/5 transition">Assessment</button>
            <button onClick={()=>setActive('login')} className="text-[14px] font-[600] px-4 py-2 rounded-full hover:bg-black/5 transition">Sign in</button>
            <button onClick={()=>setActive('assessment')} className="bg-black text-white text-[14px] font-[600] px-5 py-2.5 rounded-full hover:bg-black/90 active:scale-[0.97] transition-all">Find my level</button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-[1120px] mx-auto px-5 lg:px-8 pt-[48px] lg:pt-[72px] pb-[48px]">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white border border-black/5 rounded-full px-3.5 py-1.5 text-[11px] font-[600] tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#34C759] animate-pulse" /> Modul 1 → PD3 • A1 to B2 • Full education
            </div>
            <h1 className="mt-6 text-[40px] lg:text-[64px] font-[800] leading-[0.9] tracking-[-0.04em]">
              Danish that<br/>
              <span className="text-[#007AFF]">sticks</span> after<br/>
              work and kids.
            </h1>
            <p className="mt-6 text-[18px] lg:text-[20px] leading-[1.45] tracking-[-0.01em] text-[#3C3C43] max-w-[520px]">
              A workbook, not a game. For adults on Danskuddannelse 1–3. From alphabet and æøå to PD3 debate with jo/da/vel. Explanation before drill. English first, then Danish.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={()=>setActive('assessment')} className="bg-black text-white px-8 py-4 rounded-full text-[17px] font-[600] shadow-[0_8px_24px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.25)] hover:-translate-y-0.5 active:scale-[0.97] transition-all">
                Find my Danish level → 7 min
              </button>
              <button onClick={()=>setActive('path')} className="bg-white border border-black/10 px-8 py-4 rounded-full text-[17px] font-[600] hover:bg-[#F2F2F7] active:scale-[0.97] transition-all">
                See Modul 1→5 path
              </button>
            </div>
            <div className="mt-6 flex items-center gap-4 text-[12px] text-[#8E8E93]">
              <span className="flex items-center gap-1.5"><span className="w-4 h-4 rounded-full bg-black text-white grid place-items-center text-[10px]">✓</span> No streaks</span>
              <span className="flex items-center gap-1.5"><span className="w-4 h-4 rounded-full bg-black text-white grid place-items-center text-[10px]">✓</span> No ads</span>
              <span className="flex items-center gap-1.5"><span className="w-4 h-4 rounded-full bg-black text-white grid place-items-center text-[10px]">✓</span> Works offline</span>
            </div>
          </div>

          {/* iPhone mock */}
          <div className="relative lg:h-[680px] flex items-center justify-center">
            <div className="relative w-[320px] h-[640px] bg-black rounded-[56px] p-3 shadow-[0_32px_80px_rgba(0,0,0,0.25),0_8px_24px_rgba(0,0,0,0.15)]">
              <div className="w-full h-full bg-[#F2F2F7] rounded-[44px] overflow-hidden relative">
                <div className="absolute top-0 inset-x-0 h-[36px] bg-white flex items-center justify-center">
                  <div className="w-[90px] h-[6px] bg-black rounded-full" />
                </div>
                <div className="pt-[44px] px-5 pb-6 h-full overflow-y-auto">
                  <div className="flex items-center justify-between">
                    <div className="text-[11px] font-[700] tracking-widest uppercase text-[#8E8E93]">Today • 15 min</div>
                    <div className="w-8 h-8 bg-black rounded-full grid place-items-center text-white text-[12px]">D</div>
                  </div>
                  <div className="mt-4 bg-white rounded-[24px] p-5 shadow-sm border border-black/5">
                    <div className="text-[11px] font-[700] tracking-widest uppercase bg-[#007AFF]/10 text-[#007AFF] inline-block px-2.5 py-1 rounded-full">Rule — English first</div>
                    <p className="mt-3 text-[16px] leading-[1.4] font-[600] tracking-tight">Verb is always #2. Time first → inversion.</p>
                    <div className="mt-4 space-y-2">
                      <div className="bg-[#F2F2F7] rounded-full px-4 py-3 text-[14px] flex justify-between"><span>I dag jeg arbejder</span><span className="text-[#8E8E93] text-[11px]">English habit</span></div>
                      <div className="bg-black text-white rounded-full px-4 py-3 text-[14px] flex justify-between"><span>I dag arbejder jeg ✓</span><span className="text-[11px] opacity-60">Correct</span></div>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="bg-white rounded-[20px] p-4 border border-black/5">
                      <div className="text-[22px] font-[800]">6.2k</div>
                      <div className="text-[11px] text-[#8E8E93]">Words • SRS</div>
                    </div>
                    <div className="bg-[#007AFF] rounded-[20px] p-4 text-white">
                      <div className="text-[22px] font-[800]">M3</div>
                      <div className="text-[11px] text-white/70">Modul 3 • 42%</div>
                    </div>
                  </div>
                  <div className="mt-4 bg-black text-white rounded-[24px] p-5">
                    <div className="text-[12px] font-[700] uppercase tracking-widest opacity-60">Your path after test</div>
                    <div className="mt-3 space-y-2.5">
                      <div className="flex gap-3 items-center"><div className="w-6 h-6 rounded-full bg-white/15 grid place-items-center text-[11px]">1</div><div className="text-[13px]">V2 + inversion • 10 min</div></div>
                      <div className="flex gap-3 items-center"><div className="w-6 h-6 rounded-full bg-white/15 grid place-items-center text-[11px]">2</div><div className="text-[13px]">Collocations • holde møde</div></div>
                      <div className="flex gap-3 items-center"><div className="w-6 h-6 rounded-full bg-white/15 grid place-items-center text-[11px]">3</div><div className="text-[13px]">Listening without transcript</div></div>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-2 inset-x-0 flex justify-center"><div className="w-[120px] h-[5px] bg-black rounded-full" /></div>
              </div>
            </div>
            <div className="absolute -z-10 w-[400px] h-[400px] bg-[#007AFF]/10 rounded-full blur-[60px] top-[20%]" />
          </div>
        </div>
      </section>

      {/* What is app */}
      <section className="bg-white border-y border-black/5">
        <div className="max-w-[1120px] mx-auto px-5 lg:px-8 py-[64px] lg:py-[88px]">
          <div className="max-w-[720px]">
            <div className="text-[11px] font-[700] tracking-[0.14em] uppercase text-[#8E8E93]">What is DanskPath?</div>
            <h2 className="mt-3 text-[32px] lg:text-[44px] font-[800] leading-[0.95] tracking-[-0.03em]">A workbook that moves you from Modul 1 to PD3. No Duolingo. No streaks. Just what works.</h2>
            <p className="mt-6 text-[17px] leading-[1.6] text-[#3C3C43]">
              Built for you with job, family and a Modultest — whether you start from zero (Modul 1) or middle. Not a game. A place to work. Explanation before drill. English first, then Danish. And a path that adapts to your mistakes from Modul 1 to PD3.
            </p>
          </div>
          <div className="mt-12 grid lg:grid-cols-3 gap-[1px] bg-black/5 border border-black/5 rounded-[24px] overflow-hidden">
            {[
              { title: "From alphabet to PD3 debate", desc: "Modul 1: alphabet, sounds æøå, SVO. Modul 5: jo/da/vel, passive, argumentative writing. Full path.", icon: "◐" },
              { title: "Produce V2 under pressure", desc: "Inversion, subordinate, placement of ikke. What costs at Modultest 1-5 and PD3.", icon: "✦" },
              { title: "Words that work in speech", desc: "Not 'møde = meeting' but 'holde et møde'. Collocations from Modul 1, 300 → 2000 words to PD3.", icon: "✧" },
              { title: "Listening without transcript first", desc: "Danish swallows 25% syllables. You hear 'd'er' not 'det er'. Second time you get 30% more.", icon: "♪" },
              { title: "Writing 30 → 200 words", desc: "Weekly new task. From SMS (Modul 1) to PD3 debate with structure: for det første, desuden, til sidst.", icon: "✎" },
              { title: "Personal path, no repeat", desc: "SRS Box 0→5, 30-day no-repeat rule. 5,100+ variants. You learn rule, not answer.", icon: "◎" },
            ].map((f,i)=>(
              <div key={i} className="bg-[#F2F2F7] lg:bg-white p-6 lg:p-8">
                <div className="w-10 h-10 rounded-full bg-black text-white grid place-items-center text-[14px]">{f.icon}</div>
                <div className="mt-4 text-[16px] font-[700] leading-[1.2] tracking-[-0.01em]">{f.title}</div>
                <div className="mt-2 text-[14px] leading-[1.5] text-[#8E8E93]">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-[1120px] mx-auto px-5 lg:px-8 py-[64px] lg:py-[88px]">
        <div className="text-[11px] font-[700] tracking-[0.14em] uppercase text-[#8E8E93]">How it works</div>
        <div className="mt-12 grid lg:grid-cols-5 gap-6">
          {[
            { n: "1", title: "Assess", desc: "7-min adaptive test. Not % but per-skill profile. From alphabet if Modul 1, to PD3 if B2.", color: "#007AFF" },
            { n: "2", title: "Personalise", desc: "We set your path: grammar, words, listening, reading. From M1 to M5. Adapted to your errors.", color: "#5856D6" },
            { n: "3", title: "Learn", desc: "15–45 min on phone, one hand. From 4-6 words (M1) to 15-25 words with 3 rules (M5).", color: "#34C759" },
            { n: "4", title: "Practise", desc: "Weak topics repeat until correct. Safe topics rest 30 days. Infinite engine → new variants.", color: "#FF9500" },
            { n: "5", title: "Progress", desc: "Retest, weekly writing, Modultest. Path updates live from your mistakes.", color: "#121417" },
          ].map(s=>(
            <div key={s.n} className="relative">
              <div className="w-10 h-10 rounded-full grid place-items-center text-white text-[14px] font-[700]" style={{ background: s.color }}>{s.n}</div>
              <div className="mt-4 text-[17px] font-[700] tracking-[-0.01em]">{s.title}</div>
              <div className="mt-2 text-[14px] leading-[1.5] text-[#8E8E93]">{s.desc}</div>
              {s.n !== "5" && <div className="hidden lg:block absolute top-[20px] left-[48px] right-[-24px] h-[1px] bg-black/10" />}
            </div>
          ))}
        </div>

        <div className="mt-16 grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center bg-black rounded-[32px] p-8 lg:p-12 text-white overflow-hidden relative">
          <div>
            <div className="text-[11px] font-[700] tracking-widest uppercase opacity-60">Full Danish education — Modul 1→5</div>
            <div className="mt-4 grid grid-cols-1 gap-3">
              {[
                { m: "M1", t: "A1 Foundation", d: "Alphabet æøå, SVO, en/et, 200 words, 30-50 ord writing", w: "30%" },
                { m: "M2", t: "A1-A2 V2", d: "V2 inversion, datid -ede, fordi, 400 words", w: "45%" },
                { m: "M3", t: "A2 Subordinate", d: "Ledsætning biggest shift, har/er, 700 words", w: "60%" },
                { m: "M4", t: "B1 sin/hans", d: "Strong verbs, selvom/hvis, 1000 words, debate", w: "80%" },
                { m: "M5", t: "B1-B2 PD3", d: "Passive, jo/da/vel, 1354 words, 150-200 PD3 writing", w: "95%" },
              ].map(r=>(
                <div key={r.m} className="flex gap-3 items-center">
                  <div className="w-10 text-[11px] font-[700] opacity-60">{r.m}</div>
                  <div className="flex-1">
                    <div className="flex justify-between"><span className="text-[13px] font-[600]">{r.t}</span><span className="text-[11px] opacity-60">{r.d}</span></div>
                    <div className="mt-1 h-1 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-white rounded-full" style={{ width: r.w }} /></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white text-black rounded-[24px] p-6">
            <div className="text-[11px] font-[700] tracking-widest uppercase text-[#8E8E93]">Sample — genuine difficulty increase</div>
            <div className="mt-4 space-y-3 text-[13px] leading-[1.5]">
              <div><b>M1</b> 3-6 words: <span className="font-mono bg-[#F2F2F7] px-2 py-1 rounded-full">Jeg hedder Ali.</span></div>
              <div><b>M2</b> 6-9 words: <span className="font-mono bg-[#F2F2F7] px-2 py-1 rounded-full">I dag arbejder jeg hjemme.</span></div>
              <div><b>M3</b> 9-14: <span className="font-mono bg-[#F2F2F7] px-2 py-1 rounded-full text-[11px]">Jeg ved, at han ikke kommer i dag.</span></div>
              <div><b>M5</b> 15-25, 3 rules: <span className="font-mono bg-black text-white px-2 py-1 rounded-full text-[11px]">Det er jo klart, at selvom... da/vel</span></div>
            </div>
            <div className="mt-4 text-[11px] text-[#8E8E93]">Not longer questions — 2-3 rules combined in one sentence, like real Danish.</div>
          </div>
          <div className="absolute -right-20 -bottom-20 w-[300px] h-[300px] bg-[#007AFF]/20 rounded-full blur-[40px]" />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white border-t border-black/5">
        <div className="max-w-[1120px] mx-auto px-5 lg:px-8 py-[72px] text-center">
          <h2 className="text-[36px] lg:text-[52px] font-[800] leading-[0.9] tracking-[-0.03em]">Ready to find your<br/>Danish level?</h2>
          <p className="mt-4 text-[17px] text-[#8E8E93] max-w-[520px] mx-auto">7 minutes. 20 questions. Adaptive. You get strengths, weaknesses, and your personal path from Modul 1 to PD3.</p>
          <div className="mt-8 flex justify-center gap-3">
            <button onClick={()=>setActive('assessment')} className="bg-black text-white px-10 py-5 rounded-full text-[17px] font-[600] shadow-[0_8px_24px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.25)] hover:-translate-y-0.5 active:scale-[0.97] transition-all">
              Find my level → 7 min
            </button>
          </div>
          <div className="mt-6 text-[12px] text-[#8E8E93]">No account needed for test • Works on iPhone + laptop • Add to Home Screen = app</div>
        </div>
      </section>

      <footer className="border-t border-black/5 py-8">
        <div className="max-w-[1120px] mx-auto px-5 lg:px-8 flex flex-col lg:flex-row justify-between gap-4 text-[12px] text-[#8E8E93]">
          <div className="flex items-center gap-3">
            <BrandLogo />
            <span>© 2026 DanskPath • Full education Modul 1→PD3</span>
          </div>
          <div className="flex gap-4">
            <button onClick={()=>setActive('assessment')} className="hover:text-black">Assessment</button>
            <button onClick={()=>setActive('share')} className="hover:text-black">Share QR</button>
            <button onClick={()=>setActive('login')} className="hover:text-black">Admin</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
