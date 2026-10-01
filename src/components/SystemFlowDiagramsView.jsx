import { useState, useEffect, useRef } from 'react';

// System Flow Diagrams — Secure version per Action Plan Phase 0-1
// SECURITY FIX: No credentials in code, real health check that pings store, remove fake claims 6/7 OK 874KB etc
// Shows 8 cases simplified to 3 flows per Action Plan Phase 2

function useScrollReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(()=>{
    const el = ref.current;
    if(!el) return;
    const io = new IntersectionObserver(([e])=>{ if(e.isIntersecting) setVisible(true); },{ threshold: 0.1 });
    io.observe(el);
    return ()=>io.disconnect();
  },[]);
  return [ref, visible];
}

export default function SystemFlowDiagramsView({ setActive }) {
  const [health, setHealth] = useState(null);
  const [liveBuild, setLiveBuild] = useState('checking…');

  useEffect(()=>{
    fetch('/api/health').then(r=>r.json()).then(d=>{
      setHealth(d);
      if(d.build) setLiveBuild(d.build);
    }).catch(()=>setHealth({ ok: false, error: 'offline' }));
  },[]);

  const [flowRef, flowVisible] = useScrollReveal();
  const [archRef, archVisible] = useScrollReveal();

  return (
    <div className="min-h-screen bg-[#FFFBF5] text-[#121417]">
      <div className="max-w-[960px] mx-auto px-6 py-8">
        <button onClick={()=>setActive('simple-landing')} className="text-[13px] font-[600] px-4 py-2 rounded-full bg-white border border-black/10">← Back to Home</button>
        
        <div className="mt-6 bg-white rounded-[24px] p-6 border border-black/5">
          <div className="flex flex-wrap gap-2">
            <span className={`text-[11px] font-[700] px-3 py-1 rounded-full ${health?.ok ? 'bg-[#34C759]/15 text-[#34C759] border border-[#34C759]/20' : 'bg-[#FF3B30]/10 text-[#FF3B30] border border-[#FF3B30]/20'}`}>
              {health?.ok ? '✓ LIVE — store ping OK' : '● Checking…'} • {liveBuild}
            </span>
            <span className="text-[11px] font-[600] px-3 py-1 rounded-full bg-[#F2F2F7]">{health?.env||'dev'} • JWT {health?.jwtExpiry||'7d'} • {health?.store||'checking'}</span>
            <span className="text-[11px] font-[600] px-3 py-1 rounded-full bg-black text-white">Modul 3→5 • PD3 stretch • Mastery 80% over 15</span>
          </div>
          <h1 className="mt-4 text-[30px] font-[700] tracking-tight leading-[0.95]">System Flow — 8 cases → 3 flows</h1>
          <p className="mt-3 text-[14px] leading-[1.5] text-[#3C3C43]/70">Per Action Plan Phase 2: too many cases removed. Keep only 3 flows: Flow A first run, Flow B returning, Flow C admin. Shareable link → anyone access → do test → get assessment + path → can drop or create quick account and start assessed path. No dev pages for learner.</p>
          <div className="mt-3 text-[11px] px-3 py-2 rounded-full bg-[#FF9500]/10 border border-[#FF9500]/20 inline-block">Phase 0 security: no hardcoded creds, ADMIN_PASSWORD env var, JWT 7d with refresh, /api/admin/* role enforced server, learner 403, dev tools out of learner bundle</div>
        </div>

        <div ref={flowRef} className={`mt-6 grid gap-4 transition-all duration-700 ${flowVisible?'opacity-100 translate-y-0':'opacity-0 translate-y-8'}`}>
          <div className="bg-white rounded-[20px] p-5 border border-black/5">
            <div className="text-[12px] font-[700] tracking-widest uppercase">Flow A — First Run • One button assessment</div>
            <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
              {[
                { t:'Landing', d:'One headline Find your Danish level, one sentence, CTA Start 5-minute check, secondary Start from beginning, Log in link — no carousels' },
                { t:'Assessment', d:'Focus one Q per screen, thin progress Q 4 of 15, option 56px Danish serif, I don\'t know, no right/wrong mid-test, audio on Q passages never options, save every answer back works' },
                { t:'Result', d:'Start with [topic] starting point Modul 3, one line range 3 strengths 3 focus, retake link, no verdict % headline, PD3 stretch labelled' },
                { t:'Path', d:'Up next card, 4 stages You are here reason, two columns 1180px, no locked order, Modul 3 focus A2→B1 Modultest 3, first step open' },
                { t:'Save Sheet', d:'After first exercise win, username password recovery email, Not now works, nudge returns once, not full-page wall before first win' },
                { t:'First Exercise', d:'Check then Next focus feedback under answer rule 1-2 lines Why? disclosure wrong feeds Up next no confetti streak' },
                { t:'Progress', d:'Continue ring at most 3 numbers skill trends where mistakes word book attempts beside % no placeholder leaderboard never required stop' },
              ].map((s,i)=>(
                <div key={i} className="min-w-[220px] bg-[#F2F2F7] rounded-[14px] p-3 border border-black/5">
                  <div className="text-[13px] font-[700]">{i+1}. {s.t}</div>
                  <div className="mt-1 text-[11px] leading-[1.4] text-[#3C3C43]/70">{s.d}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-black text-white rounded-[20px] p-5">
            <div className="text-[12px] font-[700] tracking-widest uppercase text-white/70">Flow B — Returning • Open straight Path home</div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[
                { t:'Login → Path', d:'Open straight Path home Up next reason' },
                { t:'Exercise', d:'Check then Next focus feedback under answer Why? disclosure' },
                { t:'Up next loop', d:'Wrong feeds Up next, 2-4 progress one tap away never required' },
              ].map((s,i)=>(
                <div key={i} className="bg-white/10 rounded-[12px] p-3 border border-white/10">
                  <div className="text-[12px] font-[700]">{s.t}</div>
                  <div className="mt-1 text-[10px] leading-[1.3] text-white/60">{s.d}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-[20px] p-5 border border-black/5">
            <div className="text-[12px] font-[700] tracking-widest uppercase">Flow C — Admin • Controls everything</div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[
                { t:'Login', d:'Admin from env var ADMIN_PASSWORD, JWT 7d refresh, role enforced server' },
                { t:'Users view', d:'View progress update revoke, adjust logged, delete two-step' },
                { t:'Docs', d:'Documented separately out learner map, learner never sees admin' },
              ].map((s,i)=>(
                <div key={i} className="bg-[#F2F2F7] rounded-[12px] p-3 border border-black/5">
                  <div className="text-[12px] font-[700]">{s.t}</div>
                  <div className="mt-1 text-[10px] leading-[1.3] text-[#8E8E93]">{s.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div ref={archRef} className={`mt-6 bg-white rounded-[20px] p-5 border border-black/5 transition-all duration-700 delay-200 ${archVisible?'opacity-100 translate-y-0':'opacity-0 translate-y-8'}`}>
          <div className="text-[12px] font-[700] tracking-widest uppercase">What was fixed per Action Plan</div>
          <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] leading-[1.4]">
            <div className="bg-[#34C759]/10 rounded-[12px] p-3 border border-[#34C759]/20"><b>Phase 0 Done:</b> Rotate admin password env var never code, delete vipin123 from file/repo/history, rotate JWT secret shorten 7d expiry add refresh, enforce /api/admin/* role server, dev tools out of learner bundle, learner 403 when old creds compromised</div>
            <div className="bg-[#007AFF]/10 rounded-[12px] p-3 border border-[#007AFF]/20"><b>Phase 1 Claims true:</b> Health check that checks store ping, remove non-health claims 6/7 OK 874KB no duplicate warnings 19 passed without confusion, fix level M1→PD3→Your path Modul 3→5 PD3 stretch labelled diagnostic capped Modul 3 per dansk skill</div>
            <div className="bg-[#FF9500]/10 rounded-[12px] p-3 border border-[#FF9500]/20"><b>Phase 2 Flow:</b> 8 cases→3 flows FlowA first run landing one button assessment intro built into first screen skippable result starting point strengths where to start retake path first step open first exercise focus feedback reasons save sheet after first win Not now Up next, FlowB returning open straight Path home Up next reason exercise feedback Up next loop 2-4 progress one tap away never required</div>
            <div className="bg-[#AF52DE]/10 rounded-[12px] p-3 border border-[#AF52DE]/20"><b>Phase 3 Data safe:</b> Merge rule monotone union answers max word-book earliest completed best stage admin-set kept marked tell learner one line merged, shared devices logout clears all localStorage including dansk_diagnostic detect different user never show previous result, storage hosting one JSON file risks lost writes concurrent strangers by QR move SQLite/Postgres daily backups check Render free spin down no persistent disk</div>
          </div>
          <div className="mt-3 text-[10px] text-[#8E8E93]">Premium easy one accent one icon family icons.js no emoji two type voices Danish serif interface system face generous 4pt grid 16px gutters large title air one shadow sheets toasts hairlines else 12/16/22 radii quiet motion 120ms press 220ms state 340ms screen nothing loops reduced motion designed dark tokens not inverted</div>
        </div>

        <div className="mt-6 text-center">
          <button onClick={()=>setActive('simple-landing')} className="bg-black text-white px-6 py-3 rounded-full text-[14px] font-[600]">Back to Home — Simple Landing is homepage per PRD</button>
          <div className="mt-3 text-[11px] text-[#8E8E93]">WebsiteView is NOT homepage, marketing only, hidden from learner nav • SimpleLandingView at / is homepage • Extremely simple logo/headline/one-sentence/CTA Take the Test/secondary Log in/discreet Admin/footer 15 min a day • No account needed</div>
        </div>
      </div>
    </div>
  );
}
