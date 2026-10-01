import { useState, useEffect, useRef } from 'react';
import { PathIcon, PracticeIcon, ProgressIcon, HomeIcon, CheckIcon } from '../lib/icons.jsx';

// System Flow Diagrams — Secure + Design System per Action Plan Phase 4
// Remove dozen emoji used as icons and use one stroke icon family, replace Inter with system face, Danish serif, drop per-case accent colours one tint, raise 9-10px to 11-12px, remove infinite animation or honour prefers-reduced-motion

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
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)]">
      <div className="max-w-[960px] mx-auto px-4 lg:px-6 py-6">
        <button onClick={()=>setActive('simple-landing')} className="text-[13px] font-[600] px-4 py-2 rounded-full bg-white border border-[var(--border)]">← Back to Home</button>
        
        <div className="mt-6 bg-white rounded-[16px] p-6 border border-[var(--border)]">
          <div className="flex flex-wrap gap-2">
            <span className={`text-[11px] font-[700] px-3 py-1 rounded-full border ${health?.ok ? 'bg-[#ECFDF5] text-[#059669] border-[#059669]/20' : 'bg-[#FEF2F2] text-[#DC2626] border-[#DC2626]/20'}`}>
              {health?.ok ? '✓ LIVE — store ping OK' : '● Checking…'} • {liveBuild}
            </span>
            <span className="text-[11px] font-[600] px-3 py-1 rounded-full bg-[var(--bg)] border border-[var(--border)]">{health?.env||'dev'} • JWT {health?.jwtExpiry||'7d'} • {health?.store||'checking'}</span>
            <span className="text-[11px] font-[600] px-3 py-1 rounded-full bg-[var(--ink)] text-white">Modul 3→5 • PD3 stretch • Mastery 80% over 15</span>
          </div>
          <h1 className="mt-4 text-[30px] font-[700] tracking-tight leading-[0.95]">System Flow — 8 cases → 3 flows</h1>
          <p className="mt-3 text-[14px] leading-[1.5] text-[var(--ink-secondary)]">Per Action Plan Phase 2: too many cases removed. Keep only 3 flows: Flow A first run, Flow B returning, Flow C admin. Shareable link → anyone access → do test → get assessment + path → can drop or create quick account and start assessed path. No dev pages for learner. One icon family stroke, no emoji, one accent, Danish serif, 11-12px min, quiet motion.</p>
          <div className="mt-3 text-[11px] px-3 py-2 rounded-[12px] bg-[#FFFBEB] border border-[#D97706]/20 inline-block font-[600]">Phase 0 security: no hardcoded creds, ADMIN_PASSWORD env var, JWT 7d with refresh, /api/admin/* role enforced server, learner 403, dev tools out of learner bundle • One accent, one icon family, two type voices, generous 4pt grid 16px gutters, one shadow, radii 12/16/22, quiet motion 120/220/340, designed dark mode</div>
        </div>

        <div ref={flowRef} className={`mt-6 grid gap-4 transition-all duration-[340ms] ${flowVisible?'opacity-100 translate-y-0':'opacity-0 translate-y-8'}`}>
          <div className="bg-white rounded-[16px] p-5 border border-[var(--border)]">
            <div className="flex items-center gap-2 text-[12px] font-[700] tracking-widest uppercase"><PathIcon className="w-4 h-4" /> Flow A — First Run • One button assessment</div>
            <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
              {[
                { t:'Landing', d:'One headline Find your Danish level, one sentence, CTA Start 5-minute check, secondary Start from beginning, Log in link — no carousels', icon: HomeIcon },
                { t:'Assessment', d:'Focus one Q per screen, thin progress Q 4 of 15, option 56px Danish serif, I don\'t know, no right/wrong mid-test, audio on Q passages never options, save every answer back works', icon: PathIcon },
                { t:'Result', d:'Start with [topic] starting point Modul 3, one line range 3 strengths 3 focus, retake link, no verdict % headline, PD3 stretch labelled', icon: CheckIcon },
                { t:'Path', d:'Up next card, 4 stages You are here reason, two columns 1180px, no locked order, Modul 3 focus A2→B1 Modultest 3, first step open', icon: PathIcon },
                { t:'Save Sheet', d:'After first exercise win, username password recovery email, Not now works, nudge returns once, not full-page wall before first win', icon: HomeIcon },
                { t:'First Exercise', d:'Check then Next focus feedback under answer rule 1-2 lines Why? disclosure wrong feeds Up next no confetti streak', icon: PracticeIcon },
                { t:'Progress', d:'Continue ring at most 3 numbers skill trends where mistakes word book attempts beside % no placeholder leaderboard never required stop', icon: ProgressIcon },
              ].map((s,i)=>(
                <div key={i} className="min-w-[220px] bg-[var(--bg)] rounded-[12px] p-3 border border-[var(--border)]">
                  <div className="flex items-center gap-2 text-[13px] font-[700]"><s.icon className="w-4 h-4" /> {i+1}. {s.t}</div>
                  <div className="mt-1 text-[11px] leading-[1.4] text-[var(--muted)]">{s.d}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[var(--ink)] text-white rounded-[16px] p-5">
            <div className="flex items-center gap-2 text-[12px] font-[700] tracking-widest uppercase text-white/70"><PracticeIcon className="w-4 h-4" /> Flow B — Returning • Open straight Path home</div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[
                { t:'Login → Path', d:'Open straight Path home Up next reason' },
                { t:'Exercise', d:'Check then Next focus feedback under answer Why? disclosure' },
                { t:'Up next loop', d:'Wrong feeds Up next, 2-4 progress one tap away never required' },
              ].map((s,i)=>(
                <div key={i} className="bg-white/10 rounded-[12px] p-3 border border-white/10">
                  <div className="text-[12px] font-[700]">{s.t}</div>
                  <div className="mt-1 text-[11px] leading-[1.3] text-white/60">{s.d}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-[16px] p-5 border border-[var(--border)]">
            <div className="flex items-center gap-2 text-[12px] font-[700] tracking-widest uppercase"><ProgressIcon className="w-4 h-4" /> Flow C — Admin • Controls everything</div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[
                { t:'Login', d:'Admin from env var ADMIN_PASSWORD, JWT 7d refresh, role enforced server' },
                { t:'Users view', d:'View progress update revoke, adjust logged, delete two-step' },
                { t:'Docs', d:'Documented separately out learner map, learner never sees admin' },
              ].map((s,i)=>(
                <div key={i} className="bg-[var(--bg)] rounded-[12px] p-3 border border-[var(--border)]">
                  <div className="text-[12px] font-[700]">{s.t}</div>
                  <div className="mt-1 text-[11px] leading-[1.3] text-[var(--muted)]">{s.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div ref={archRef} className={`mt-6 bg-white rounded-[16px] p-5 border border-[var(--border)] transition-all duration-[340ms] delay-200 ${archVisible?'opacity-100 translate-y-0':'opacity-0 translate-y-8'}`}>
          <div className="text-[12px] font-[700] tracking-widest uppercase">What was fixed per Action Plan • Ship checklist</div>
          <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] leading-[1.4]">
            <div className="bg-[#ECFDF5] rounded-[12px] p-3 border border-[#059669]/20"><b>Phase 0 Done:</b> Rotate admin password env var never code, delete vipin123, rotate JWT 7d refresh, enforce /api/admin/* role server, dev tools out learner bundle, learner 403</div>
            <div className="bg-[var(--accent-soft)] rounded-[12px] p-3 border border-[var(--accent)]/20"><b>Phase 1 Claims true:</b> Health check store ping, remove non-health claims, fix level Modul 3→5 PD3 stretch labelled diagnostic capped Modul 3</div>
            <div className="bg-[#FFFBEB] rounded-[12px] p-3 border border-[#D97706]/20"><b>Phase 2 Flow:</b> 8 cases→3 flows, account after first win, 5+ items per section I don't know, starting point range retake, sprogpolitik audio on Q not options, Today→Up next</div>
            <div className="bg-[#F5F3FF] rounded-[12px] p-3 border border-[#8B5CF6]/20"><b>Phase 3 Data safe:</b> Merge rule monotone union max earliest best admin-set kept marked, logout clears all, password recovery email required, deletion two-step, abandoned test resume, offline plain</div>
            <div className="bg-[var(--bg)] rounded-[12px] p-3 border border-[var(--border)] col-span-2"><b>Phase 4 Design pass:</b> Premium easy one accent one icon family icons.js no emoji two type voices Danish serif interface system face generous 4pt grid 16px gutters large title air one shadow sheets toasts hairlines else 12/16/22 radii quiet motion 120ms press 220ms state 340ms screen nothing loops reduced motion designed dark tokens not inverted, one primary bottom thumb phone never lose work save every answer back works closing mid-test loses nothing no dead ends focus mode progressive disclosure useful errors • Ship checklist: one primary action, can remove one element, passes light/dark 390px/1440px, first-time user reaches next without reading, uses ds.css</div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button onClick={()=>setActive('simple-landing')} className="bg-[var(--ink)] text-white px-6 py-3 rounded-full text-[14px] font-[600]">Back to Home — Simple Landing is homepage</button>
          <div className="mt-3 text-[11px] text-[var(--muted)]">WebsiteView is NOT homepage, marketing only, hidden from learner nav • SimpleLandingView at / is homepage • Extremely simple • 15 min a day • No account needed • One icon family • No emoji</div>
        </div>
      </div>
    </div>
  );
}
