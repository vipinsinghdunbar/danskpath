import { useState } from 'react';

export default function LandingPage({ setActive }) {
  const [showInstall, setShowInstall] = useState(false);
  const previewUrl = typeof window !== 'undefined' ? window.location.origin : 'https://5173-...e2b.app';

  return (
    <div className="min-h-screen bg-[#F2F2F7] text-black pb-[120px] lg:pb-0">
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-2xl border-b border-black/5">
        <div className="max-w-[1100px] mx-auto px-5 lg:px-8 h-[56px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-black text-white grid place-items-center font-bold text-[14px]">D</div>
            <div>
              <div className="text-[15px] font-[700] tracking-tight leading-none">DanskPath</div>
              <div className="text-[11px] text-[#8E8E93] font-[500]">Modul 1 → PD3 / A1 to B2 • Full education</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={()=>setShowInstall(!showInstall)} className="hidden sm:flex text-[13px] font-[600] bg-[#F2F2F7] px-4 py-2 rounded-full hover:bg-black hover:text-white transition">iPhone</button>
            <button onClick={()=>setActive('diagnostic')} className="bg-black text-white text-[14px] font-[600] px-5 py-2.5 rounded-full hover:bg-[#1C1C1E] transition tap-haptic">Level test →</button>
          </div>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-5 lg:px-8">
        {/* Hero — iOS large title */}
        <div className="pt-12 lg:pt-20 pb-10">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border border-black/5 text-[12px] font-[600]">
            <span className="w-2 h-2 rounded-full bg-[#34C759] animate-pulse" /> For adults on Danskuddannelse • Modul 1,2,3,4,5 • PD3 • A1→B2 full path
          </div>
          <h1 className="ios-large-title text-[40px] lg:text-[64px] mt-6 max-w-[800px]">
            A workbook<br/>
            that moves you<br/>
            from <span className="text-[#007AFF]">Modul 1</span> to PD3.
          </h1>
          <div className="mt-8 grid lg:grid-cols-[560px_1fr] gap-8 items-start">
            <div>
              <p className="text-[20px] leading-[1.4] tracking-tight text-[#1C1C1E]/80">
                Built for you with job, family and a Modultest — whether you start from zero (Modul 1) or middle (Modul 3). Not a game. A place to work. Explanation before drill. English first, then Danish. And a path that adapts to your mistakes from Modul 1 to PD3.
              </p>
              <div className="mt-6 bg-black text-white rounded-[20px] p-5">
                <div className="text-[11px] font-[700] tracking-widest uppercase text-white/60">Full Danish education — Modul 1→5</div>
                <div className="mt-3 grid grid-cols-5 gap-2 text-[11px]">
                  <div className="bg-white/10 rounded-[12px] p-2.5"><div className="font-[700]">M1</div><div className="text-white/60 mt-1">A1 • Alphabet, pronunciation, SVO, present, 30-50 words</div></div>
                  <div className="bg-white/10 rounded-[12px] p-2.5"><div className="font-[700]">M2</div><div className="text-white/60 mt-1">A1-A2 • V2, past -ede, 60-80 words</div></div>
                  <div className="bg-white/10 rounded-[12px] p-2.5"><div className="font-[700]">M3</div><div className="text-white/60 mt-1">A2 • Subordinate, 80-120 words</div></div>
                  <div className="bg-white/10 rounded-[12px] p-2.5"><div className="font-[700]">M4</div><div className="text-white/60 mt-1">B1 • sin/hans, 120-150 words</div></div>
                  <div className="bg-white/10 rounded-[12px] p-2.5"><div className="font-[700]">M5</div><div className="text-white/60 mt-1">B1-B2 • PD3 ready, 150-200 words</div></div>
                </div>
                <div className="mt-3 text-[11px] text-white/60">Genuine difficulty increase: 4-6 words → 15-25 words with 2-3 grammar rules combined. Not just longer questions.</div>
              </div>
            </div>
            <div className="bg-white rounded-[24px] p-6 shadow-sm border border-black/5">
              <div className="text-[11px] font-[700] tracking-widest uppercase text-[#8E8E93]">What we train daily — from zero</div>
              <div className="mt-4 space-y-4">
                <div className="flex gap-3"><div className="w-8 h-8 rounded-full bg-[#007AFF]/10 text-[#007AFF] grid place-items-center text-[12px] shrink-0">1</div><div><div className="text-[14px] font-[600]">From alphabet to PD3 debate</div><div className="text-[13px] text-[#8E8E93] leading-[1.4] mt-1">Modul 1: alphabet, sounds æøå, SVO. Modul 5: jo/da/vel, passive, argumentative writing. Full path.</div></div></div>
                <div className="flex gap-3"><div className="w-8 h-8 rounded-full bg-[#5856D6]/10 text-[#5856D6] grid place-items-center text-[12px] shrink-0">2</div><div><div className="text-[14px] font-[600]">Produce V2 under pressure</div><div className="text-[13px] text-[#8E8E93] leading-[1.4] mt-1">Inversion, subordinate, placement of ikke. What costs at Modultest 1-5 and PD3.</div></div></div>
                <div className="flex gap-3"><div className="w-8 h-8 rounded-full bg-[#34C759]/10 text-[#34C759] grid place-items-center text-[12px] shrink-0">3</div><div><div className="text-[14px] font-[600]">Words that work in speech</div><div className="text-[13px] text-[#8E8E93] leading-[1.4] mt-1">Not “møde = meeting” but “holde et møde”. Collocations from Modul 1, 300 → 2000 words to PD3.</div></div></div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <button onClick={()=>setActive('diagnostic')} className="bg-black text-white px-8 py-4 rounded-full text-[17px] font-[600] shadow-[0_4px_16px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.25)] hover:-translate-y-0.5 active:scale-[0.97] transition-all tap-haptic">Start: Take test (7 min) →</button>
            <button onClick={()=>setActive('path')} className="bg-white border border-black/10 px-8 py-4 rounded-full text-[17px] font-[600] hover:bg-[#F2F2F7] transition tap-haptic">See Modul 1→5 path</button>
          </div>
        </div>

        {/* Sample page */}
        <div className="mt-6 grid lg:grid-cols-[1.15fr_0.85fr] gap-6">
          <div className="bg-white rounded-[32px] p-7 shadow-sm border border-black/5">
            <div className="flex justify-between text-[11px] font-[600] tracking-widest uppercase text-[#8E8E93] pb-4 border-b border-black/5">
              <span>Modul 1→5 • Topic 02 • V2 rule</span><span>No repeat in 30 days • Full education</span>
            </div>
            <div className="mt-6">
              <div className="inline-flex text-[11px] font-[700] tracking-widest uppercase bg-[#007AFF]/10 text-[#007AFF] px-3 py-1 rounded-full">Rule — English first — Works from Modul 1</div>
              <p className="mt-3 text-[17px] leading-[1.5] tracking-tight">In English you say “Never have I seen...” — something first, verb jumps before subject. In Danish it happens every time. Whatever is first — time, place, therefore — verb is #2. You learn this in Modul 2, master it to PD3.</p>
            </div>
            <div className="mt-6 bg-[#F2F2F7] rounded-[20px] p-5">
              <div className="text-[13px] font-[600]">Which sentence is correct? — Modul 2 example, same rule new words every time</div>
              <div className="mt-3 space-y-2">
                <div className="bg-white rounded-full px-4 py-3 text-[14px] border border-black/5 flex justify-between"><span>I morgen jeg skal på arbejde.</span><span className="text-[11px] text-[#8E8E93]">English order • Modul 1 habit</span></div>
                <div className="bg-black text-white rounded-full px-4 py-3 text-[14px] flex justify-between"><span>I morgen skal jeg på arbejde. ✓</span><span>Correct • Modul 2→PD3</span></div>
              </div>
              <div className="mt-3 text-[12px] leading-[1.4] bg-white rounded-[12px] p-3 border border-black/5">I morgen is first element, so verb must be #2. Second is English habit. Same rule from Modul 2 to Modul 5, but sentences grow: Modul 2 "I dag arbejder jeg hjemme" (4 words) → Modul 5 "I morgen skal jeg selvom det regner holde et møde" (15 words, 3 rules).</div>
            </div>
            <div className="mt-4 text-[11px] text-[#8E8E93]">Template-engine: same rule, new words every time. 15 variants per template → 5,100+ controlled variants. Covers Modul 1→5, prevents memorisation.</div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-black/5">
              <div className="px-5 py-4 border-b border-black/5 flex justify-between items-center">
                <div className="text-[13px] font-[700]">Your path after test — Modul 1→5</div>
                <div className="text-[11px] px-2.5 py-1 rounded-full bg-[#34C759]/10 text-[#34C759] font-[600]">Live • adaptive • Full education</div>
              </div>
              <div className="p-2 space-y-1">
                <div className="bg-[#F2F2F7] rounded-[16px] px-4 py-3 flex gap-3"><span className="text-[11px] text-[#8E8E93]">M1</span><div><div className="text-[14px] font-[500]">Alphabet, SVO, present</div><div className="text-[11px] text-[#8E8E93]">30-50 words • A1 Foundation</div></div></div>
                <div className="bg-black text-white rounded-[16px] px-4 py-3 flex gap-3"><span className="text-[11px] opacity-60">M2</span><div><div className="text-[14px] font-[600]">V2 + inversion</div><div className="text-[11px] text-white/60">10 min • 80% of B1 errors • Modul 2 start</div></div><span className="ml-auto">→</span></div>
                <div className="bg-[#F2F2F7] rounded-[16px] px-4 py-3 flex gap-3"><span className="text-[11px] text-[#8E8E93]">M3</span><div><div className="text-[14px] font-[500]">Subordinate: at han ikke kommer</div><div className="text-[11px] text-[#8E8E93]">Biggest shift har/er</div></div></div>
                <div className="bg-white border border-black/5 rounded-[16px] px-4 py-3 flex gap-3"><span className="text-[11px] text-[#8E8E93]">M4</span><div><div className="text-[14px] font-[500]">sin/hans, selvom, stærke verber</div><div className="text-[11px] text-[#8E8E93]">120-150 words debate</div></div></div>
                <div className="bg-white border border-black/5 rounded-[16px] px-4 py-3 flex gap-3 opacity-60"><span className="text-[11px] text-[#8E8E93]">M5</span><div><div className="text-[14px] font-[500]">PD3 ready: jo/da/vel + passive + 150-200 words</div><div className="text-[11px] text-[#8E8E93]">Argumentative writing</div></div></div>
              </div>
              <div className="px-5 py-3 text-[11px] font-[500] text-[#8E8E93] bg-[#F2F2F7]">No repetitions • SRS Box 0→5 • 30-day rule • Covers Modul 1→5 full education</div>
            </div>

            <div className="bg-white rounded-[24px] p-5 shadow-sm border border-black/5">
              <div className="text-[11px] font-[700] tracking-widest uppercase text-[#8E8E93]">Full education content — Modul 1→PD3</div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {[
                  "Modul 1: A1 Foundation",
                  "Modul 2: A1-A2 V2",
                  "Modul 3: A2 Subordinate",
                  "Modul 4: B1 sin/hans",
                  "Modul 5: B1-B2 PD3",
                  "Infinite grammar 5100+",
                  "Infinite vocab • SRS",
                  "Listening • M1→PD3",
                  "40 reading • weekly writing",
                  "12 weeks pronunciation",
                  "10 culture • PD3",
                  "PD3 exam format"
                ].map(c=>(
                  <div key={c} className="bg-[#F2F2F7] rounded-full px-3 py-2 text-[11px] font-[500] text-center">{c}</div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* How it works */}
        <div className="mt-12 grid lg:grid-cols-3 gap-4">
          {[
            { n: "1", title: "Take test", desc: "20 questions A1→B2. We find your module (1–5). English first, explanation on each answer. 7 minutes. Works from zero.", color: "#007AFF" },
            { n: "2", title: "Get your path Modul 1→5", desc: "We set your path: grammar, words, listening, reading. From alphabet if Modul 1, to PD3 debate if Modul 5. Adapted to your errors, not curriculum. 30-day rule.", color: "#5856D6" },
            { n: "3", title: "Practice daily", desc: "15–45 min on phone, one hand. From 4-6 words (Modul 1) to 15-25 words with 3 rules (Modul 5). Recommendation shifts after your real weaknesses. Infinite engine gives new variants.", color: "#34C759" },
          ].map(s=>(
            <div key={s.n} className="bg-white rounded-[24px] p-6 shadow-sm border border-black/5">
              <div className="w-8 h-8 rounded-full text-white grid place-items-center font-bold text-[14px]" style={{ background: s.color }}>{s.n}</div>
              <div className="mt-4 text-[17px] font-[700] tracking-tight">{s.title}</div>
              <div className="mt-2 text-[14px] leading-[1.5] text-[#8E8E93]">{s.desc}</div>
            </div>
          ))}
        </div>

        {/* Install */}
        {showInstall && (
          <div className="mt-12 bg-white rounded-[32px] p-8 shadow-sm border border-black/5">
            <h3 className="text-[20px] font-[700] tracking-tight">Run on iPhone — how</h3>
            <div className="mt-6 grid lg:grid-cols-2 gap-8">
              <div className="text-[14px] leading-[1.5]">
                <b>Direct link</b><br/>
                1. Open Safari on iPhone<br/>
                2. Go to: <code className="bg-[#F2F2F7] px-2 py-1 rounded-full text-[12px] break-all">{previewUrl}</code><br/>
                3. Share icon (square with arrow) → “Add to Home Screen”<br/>
                4. Now DanskPath is app icon, fullscreen — Modul 1→PD3 always with you
              </div>
              <div className="bg-[#F2F2F7] rounded-[20px] p-5">
                <div className="text-[11px] font-[700] tracking-widest uppercase text-[#8E8E93]">QR for iPhone</div>
                <div className="mt-3 w-[160px] h-[160px] bg-white rounded-[16px] border border-black/5 grid place-items-center text-[10px] text-center p-2 shadow-sm">
                  Scan with camera<br/><br/>
                  <span className="font-mono text-[8px] break-all">{previewUrl}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-16 mb-12 flex flex-col items-center">
          <button onClick={()=>setActive('diagnostic')} className="bg-black text-white px-10 py-5 rounded-full text-[17px] font-[600] shadow-[0_8px_24px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.25)] hover:-translate-y-0.5 active:scale-[0.97] transition-all tap-haptic">Start now: Take test → get your path Modul 1→PD3</button>
          <div className="mt-4 text-[12px] text-[#8E8E93] font-[500]">7 minutes • No login • Covers Modul 1→5 full education • Data stays on your device</div>
        </div>
      </div>
    </div>
  );
}
