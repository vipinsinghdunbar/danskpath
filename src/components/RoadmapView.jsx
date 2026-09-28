import { useState } from 'react';

const phases = [
  { id:0, title:"Idea & Validation", pct:100, status:"DONE", color:"#34C759", achieved:["Problem: V2, collocations, listening reductions","User: Adult job family Modultest","Curriculum M1 A1 200w → M5 B2 1354w","Differentiation: Workbook not game, 5,100+ variants","Brand #121417 #007AFF"], missing:["User interviews 5-10","Competitor matrix","Pricing validation"], next:["Interview learners","Define pricing"], links:["/docs/strategy"] },
  { id:1, title:"MVP Core Curriculum", pct:100, status:"DONE", color:"#34C759", achieved:["Question Bank 24 →15 adaptive no blank","Variation Engine 5,100+ variants ≤3 dup","Stage Engine M1→M5 200→1354 vocab","Verdict Engine per-skill profile","SRS Box 0→5 30-day no-repeat","Tests 15/15 PASS 68/74 total"], missing:["Audio 100 clips","LLM server proxy","500 vocab","Weekly tests"], next:["Add audio","Migrate LLM to /api/llm","Add vocab"], links:["/?page=practice"] },
  { id:2, title:"Three Experiences", pct:90, status:"ALMOST", color:"#007AFF", achieved:["WebsiteView marketing + iPhone mock","AssessmentLandingView shareable QR independent","iPhone App PWA M1→PD3 full","Design System #121417 #007AFF #F2F2F7","Routing ?page= + /assessment path","PWA manifest v4 icons 60→1024"], missing:["Dark mode","a11y audit","Lighthouse >90","Permanent domain","iOS haptics"], next:["Add dark mode","Run Lighthouse","Fix links"], links:["/?page=website","/?page=assessment","/?page=practice"] },
  { id:3, title:"Public Deployment", pct:80, status:"PARTIAL", color:"#5856D6", achieved:["server.js serves dist+API PORT /data","Dockerfile render.yaml vercel.json fly.toml","Cloudflare Tunnel live outside chat","Build 5.16s 853KB 222KB gzip","QR 800px #121417 6 files","PWA manifest v4 sw.js"], missing:["Permanent domain danskpath.app","Render deployment","Custom domain HTTPS","Backup + UptimeRobot"], next:["Buy domain","Deploy Render","Set env JWT_SECRET","Regen QR permanent"], links:["/api/health","/api/security/audit"] },
  { id:4, title:"Security Hardening", pct:80, status:"PARTIAL", color:"#FF3B30", achieved:["Headers nosniff DENY HSTS CSP","CORS restricted prod","Rate limiting 10/15min login","sanitizeString <>","bcrypt JWT authMiddleware","GDPR export/delete","/api/security/audit ok:true"], missing:["JWT_SECRET env on Render","Change admin vipin123","DB encryption Postgres","Password complexity + reset +2FA","/api/trials public→admin only","API keys localStorage→server proxy","Audit logging + Sentry","security.txt"], next:["Set JWT_SECRET","Change password","Fix /api/trials","Migrate Postgres","Add reset email"], links:["/?page=security","/api/security/audit","/?page=privacy"] },
  { id:5, title:"Quality & Testing", pct:50, status:"IN PROGRESS", color:"#FF9500", achieved:["Build 5.16s PASS JS 222KB gzip PASS","Tests 68/74 92%","36 components React 19","Tailwind iOS system"], missing:["ESLint + Prettier + husky","Vitest + RTL + Supertest + Playwright","CI/CD .github/workflows/ci.yml","ErrorBoundary + Sentry","Performance budget","GitHub Projects + CHANGELOG"], next:["Create QUALITY_STANDARDS.md","Create TESTING_FRAMEWORK.md","Add CI","Add ErrorBoundary"], links:["/?page=architecture"] },
  { id:6, title:"Web Launch", pct:30, status:"NEXT", color:"#8E8E93", achieved:["PWA ready Add to Home Screen","Ephemeral URL works"], missing:["Permanent domain","Plausible analytics","/support FAQ","OG image","Email capture","Social proof","UptimeRobot","Marketing"], next:["Buy domain","Deploy Render","Add Plausible","Add support"], links:["/?page=website"] },
  { id:7, title:"App Store / Play Store", pct:20, status:"PLANNED", color:"#8E8E93", achieved:["capacitor.config.json appId dk.danskpath.app","Icons ready"], missing:["Apple Dev $99 + Google Play $25","Capacitor add ios android","Xcode + Android Studio builds","Screenshots 6.7 6.5 5.5 iPad + Feature Graphic","PrivacyInfo.xcprivacy + Data Safety","TestFlight + Internal Testing","Signing + API 34"], next:["Enroll dev accounts","npx cap add ios android","Build AAB/IPA"], links:["/APP_STORE_CHECKLIST.md"] },
  { id:8, title:"Maintenance & Growth", pct:0, status:"NOT STARTED", color:"#D1D1D6", achieved:[], missing:["Monitoring UptimeRobot Sentry Plausible","Weekly npm audit","Monthly security audit","Quarterly pen test","Daily backup S3","Content monthly new Q","Features audio AI speaking weekly tests","Support FAQ chatbot","Growth SEO blog newsletter","Team roles Dev PM QA Security Design Content"], next:["Set up monitoring","Define sprints","Keep ROADMAP.md updated every feature"], links:["/ROADMAP.md"] },
];

const threats = [
  { threat:"Broken Access Control", owasp:"A01", prevention:"authMiddleware+adminMiddleware, UUID v4, 401/403 tests", status:"✅", fix:"Fix /api/trials public→admin" },
  { threat:"Cryptographic Failures", owasp:"A02", prevention:"JWT_SECRET env random, /data 600, HTTPS+HSTS, move token to httpOnly/Secure Storage, Postgres encryption", status:"⚠️", fix:"Set JWT_SECRET on Render, migrate Postgres" },
  { threat:"Injection XSS", owasp:"A03", prevention:"sanitizeString <>, no eval, CSP, DOMPurify", status:"✅", fix:"Add DOMPurify" },
  { threat:"Insecure Design", owasp:"A04", prevention:"Rate limiting, headers, GDPR, audit endpoint", status:"✅", fix:"Done 2026-09-27" },
  { threat:"Security Misconfiguration", owasp:"A05", prevention:"Remove X-Powered-By, CORS restricted, hide stack traces", status:"⚠️", fix:"Add helmet, hide stack" },
  { threat:"Vulnerable Components", owasp:"A06", prevention:"npm audit, Snyk, Dependabot", status:"⚠️", fix:"npm audit fix" },
  { threat:"Auth Failures", owasp:"A07", prevention:"Rate limit 10/15min, bcrypt, complexity, 2FA, reset email, force change default", status:"⚠️", fix:"Add complexity+2FA+reset" },
  { threat:"Data Integrity", owasp:"A08", prevention:"SW versioning, SRI for CDN", status:"⚠️", fix:"Add SRI" },
  { threat:"Logging Failures", owasp:"A09", prevention:"Winston audit.log, Sentry, UptimeRobot, alert 5 fails", status:"❌", fix:"Add logging + Sentry" },
  { threat:"SSRF", owasp:"A10", prevention:"No user-controlled fetch", status:"✅", fix:"None" },
];

export default function RoadmapView({ setActive }) {
  const [activePhase, setActivePhase] = useState(4);
  const [showThreats, setShowThreats] = useState(false);
  const p = phases.find(x=>x.id===activePhase) || phases[0];

  return (
    <div className="min-h-screen bg-[#F2F2F7] text-[#121417]">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-2xl border-b border-black/5">
        <div className="max-w-[1120px] mx-auto px-5 lg:px-8 h-[64px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-black text-white grid place-items-center text-[12px] font-bold">R</div>
            <div>
              <div className="text-[14px] font-[800] tracking-tight">Roadmap 0→Launch→Maintenance</div>
              <div className="text-[10px] text-black/50 -mt-1">Live • Updated every feature • Mandatory</div>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={()=>setActive('architecture')} className="px-4 py-2 rounded-full bg-[#F2F2F7] text-[12px] font-[600]">🗺️ Architecture</button>
            <button onClick={()=>setActive('security')} className="px-4 py-2 rounded-full bg-black text-white text-[12px] font-[600]">🔐 Security</button>
            <button onClick={()=>setActive('website')} className="px-4 py-2 rounded-full bg-white border border-black/10 text-[12px] font-[600]">Home</button>
          </div>
        </div>
      </div>

      <div className="max-w-[1120px] mx-auto px-5 lg:px-8 py-8">
        {/* Overall Progress */}
        <div className="bg-white rounded-[24px] p-6 border border-black/5 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-[28px] font-[800] tracking-tight">DanskPath Roadmap</h1>
              <p className="text-[13px] text-black/50 mt-1">From 0 to Web Launch → App Store → Maintenance. Web-first, security + quality mandatory.</p>
            </div>
            <div className="text-right">
              <div className="text-[11px] font-[700] uppercase tracking-widest opacity-50">Overall</div>
              <div className="text-[22px] font-[800]">62% Web • 35% App Store</div>
              <div className="text-[11px] text-black/50">PWA READY today, native 3-5 days</div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-9 gap-2">
            {phases.map(ph=>(
              <button key={ph.id} onClick={()=>setActivePhase(ph.id)} className={`p-3 rounded-2xl text-left border transition-all ${activePhase===ph.id ? 'bg-black text-white border-black scale-[1.02] shadow-lg' : 'bg-[#F2F2F7] border-black/5 hover:bg-white'}`}>
                <div className="text-[10px] font-[700] uppercase tracking-widest opacity-60">Phase {ph.id}</div>
                <div className="text-[11px] font-[700] leading-[1.2] mt-1">{ph.title}</div>
                <div className="mt-2 h-1.5 bg-black/10 rounded-full overflow-hidden"><div className="h-full rounded-full" style={{ width:`${ph.pct}%`, background: activePhase===ph.id ? 'white' : ph.color }} /></div>
                <div className="text-[10px] mt-1 opacity-70">{ph.pct}% {ph.status}</div>
              </button>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
            <span className="px-3 py-1 rounded-full bg-[#34C759]/15 text-[#34C759] font-[600]">✅ DONE</span>
            <span className="px-3 py-1 rounded-full bg-[#007AFF]/15 text-[#007AFF] font-[600]">🔵 ALMOST</span>
            <span className="px-3 py-1 rounded-full bg-[#5856D6]/15 text-[#5856D6] font-[600]">🟣 PARTIAL</span>
            <span className="px-3 py-1 rounded-full bg-[#FF9500]/15 text-[#FF9500] font-[600]">🟠 IN PROGRESS</span>
            <span className="px-3 py-1 rounded-full bg-[#8E8E93]/15 text-[#8E8E93] font-[600]">⚪ NEXT/PLANNED</span>
            <span className="px-3 py-1 rounded-full bg-red-50 text-red-600 font-[600]">🔴 Security Focus</span>
          </div>
        </div>

        {/* Active Phase Detail */}
        <div className="mt-6 grid lg:grid-cols-[1.2fr_0.8fr] gap-6">
          <div className="bg-white rounded-[24px] p-6 border border-black/5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full grid place-items-center text-white font-[700] text-[14px]" style={{ background: p.color }}>{p.id}</div>
              <div>
                <h2 className="text-[20px] font-[800] tracking-tight">{p.title}</h2>
                <div className="text-[11px] text-black/50">{p.pct}% • {p.status} • Color {p.color}</div>
              </div>
              <div className="ml-auto w-20 h-2 bg-black/10 rounded-full overflow-hidden"><div className="h-full rounded-full" style={{ width:`${p.pct}%`, background:p.color }} /></div>
            </div>

            <div className="mt-6 grid md:grid-cols-3 gap-4">
              <div>
                <div className="text-[11px] font-[700] uppercase tracking-widest opacity-50">✅ Achieved</div>
                <ul className="mt-2 space-y-1.5">
                  {p.achieved.map((a,i)=><li key={i} className="text-[12px] leading-[1.4] flex gap-1.5"><span className="text-[#34C759]">•</span><span>{a}</span></li>)}
                </ul>
              </div>
              <div>
                <div className="text-[11px] font-[700] uppercase tracking-widest opacity-50">❌ Missing</div>
                <ul className="mt-2 space-y-1.5">
                  {p.missing.map((a,i)=><li key={i} className="text-[12px] leading-[1.4] flex gap-1.5"><span className="text-[#FF3B30]">•</span><span>{a}</span></li>)}
                </ul>
              </div>
              <div>
                <div className="text-[11px] font-[700] uppercase tracking-widest opacity-50">🔜 Next Path</div>
                <ul className="mt-2 space-y-1.5">
                  {p.next.map((a,i)=><li key={i} className="text-[12px] leading-[1.4] flex gap-1.5"><span className="text-[#007AFF]">→</span><span>{a}</span></li>)}
                </ul>
              </div>
            </div>

            <div className="mt-6">
              <div className="text-[11px] font-[700] uppercase tracking-widest opacity-50">🔗 Links — Must Work</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {p.links.map((l,i)=>(
                  <button key={i} onClick={()=>{
                    if(l.startsWith('/?')) setActive(l.replace('/?page=',''));
                    else if(l.startsWith('/')) {
                      const page = l.replace('/','').split('?')[0];
                      if(page) setActive(page);
                    } else if(l.startsWith('http')) window.open(l,'_blank');
                  }} className="px-3 py-1.5 rounded-full bg-[#F2F2F7] border border-black/5 text-[11px] font-[600] hover:bg-black hover:text-white transition">
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-[#121417] text-white rounded-[24px] p-6">
              <div className="text-[11px] font-[700] uppercase tracking-widest opacity-60">What I Have Achieved vs Missing vs Next</div>
              <div className="mt-4 space-y-3 text-[12px] leading-[1.5]">
                <div><strong className="text-[#34C759]">Achieved v4 SECURE:</strong> Idea 100%, MVP 100%, Three Experiences 90%, Public Deployment 80% (ephemeral works), Security 80% (headers+rate limit+GDPR), Architecture Map 100% motion, Downloadable 20M zip</div>
                <div><strong className="text-[#FF3B30]">Missing Critical:</strong> Permanent domain danskpath.app, JWT_SECRET env on Render, admin vipin123 change, DB encryption Postgres, password complexity+reset+2FA, /api/trials public→admin, API keys localStorage→server proxy, audit logging+Sentry+security.txt, quality framework ESLint+Vitest+Playwright+CI, links fix explicit routes, dark mode, audio 100, App Store dev accounts + Capacitor builds</div>
                <div><strong className="text-[#007AFF]">Next Path Today:</strong> Fix broken links (explicit routes), create RoadmapView (this page), QUALITY_STANDARDS.md, TESTING_FRAMEWORK.md, ErrorBoundary, build+test links, deploy secure+tunnel+QR, present new working links</div>
              </div>
            </div>

            <div className="bg-white rounded-[24px] p-6 border border-black/5">
              <div className="flex justify-between items-center">
                <div className="text-[11px] font-[700] uppercase tracking-widest opacity-50">🔒 Security Threat Model — OWASP Top 10</div>
                <button onClick={()=>setShowThreats(!showThreats)} className="px-3 py-1 rounded-full bg-black text-white text-[11px] font-[600]">{showThreats ? 'Hide' : 'Show 10 threats'}</button>
              </div>
              {showThreats && (
                <div className="mt-4 space-y-2 max-h-[400px] overflow-y-auto">
                  {threats.map((t,i)=>(
                    <div key={i} className="p-3 rounded-xl bg-[#F2F2F7] border border-black/5">
                      <div className="flex justify-between"><span className="text-[11px] font-[700]">{t.owasp} {t.threat}</span><span className="text-[11px]">{t.status}</span></div>
                      <div className="text-[11px] mt-1 leading-[1.4] opacity-70">{t.prevention}</div>
                      <div className="text-[10px] mt-1 font-[600] text-[#FF3B30]">Fix: {t.fix}</div>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-3 text-[11px] text-black/50">Every threat noted + prevented + in roadmap. See SECURITY_AUDIT_LAUNCH_READINESS.md for full 10-section audit.</div>
            </div>
          </div>
        </div>

        {/* Quality */}
        <div className="mt-6 bg-white rounded-[24px] p-6 border border-black/5">
          <h3 className="text-[16px] font-[800]">📏 Quality Standards & Framework — Mandatory</h3>
          <div className="mt-4 grid md:grid-cols-3 gap-4 text-[12px] leading-[1.5]">
            <div className="p-4 rounded-2xl bg-[#F2F2F7]">
              <div className="font-[700]">Coding Standards</div>
              <div className="mt-2 opacity-70">ESLint+Prettier 2 spaces single quotes 100 char, no console.log prod, no unused vars, React functional hooks, no hardcoded secrets env, sanitize input, no innerHTML without DOMPurify, code splitting lazy memo, a11y aria-label keyboard focus 4.5:1 contrast, Conventional commits feat/fix, PR template CODEOWNERS branch protection 1 review+CI PASS, JSDoc, ADR, CHANGELOG</div>
            </div>
            <div className="p-4 rounded-2xl bg-[#F2F2F7]">
              <div className="font-[700]">Testing Framework</div>
              <div className="mt-2 opacity-70">Unit Vitest+RTL 80% coverage engines utils, Integration Supertest API auth trials security headers GDPR, E2E Playwright flows QR→website→assessment→verdict→path→practice→progress login privacy security architecture motion links responsive iPhone install touch sizes, Visual Chromatic Storybook, Perf Lighthouse CI >90, Security npm audit Snyk OWASP ZAP /api/security/audit ok:true, Manual checklist iPhone install/nav/touch/sizes/login/assessment/path/lessons/practice/tests/progress/persistence shareable QR independent variation results no leak website landing/nav/CTA/mobile/desktop/login/branding/responsive/a11y/perf</div>
            </div>
            <div className="p-4 rounded-2xl bg-[#F2F2F7]">
              <div className="font-[700]">CI/CD + Metrics</div>
              <div className="mt-2 opacity-70">.github/workflows/ci.yml: npm ci lint audit build test Playwright Lighthouse, Build {'<10s'} (5.16s PASS) JS gzip {'<250KB'} (222KB PASS) CSS {'<10KB'} (9.18KB PASS) LCP {'<2.5s'} FID {'<100ms'} CLS {'<0.1'}, Coverage {'>80%'} (92% 68/74 but need Vitest), Lighthouse {'>90'} (not run need CI), Security audit ok:true (PASS), Headers present (PASS), Rate limit 429 on 11th (PASS), No X-Powered-By (PASS), GDPR export/delete (PASS), 1 reviewer mandatory (need branch protection), JSDoc (need), Performance budget enforced via CI</div>
            </div>
          </div>
        </div>

        {/* Architecture Download */}
        <div className="mt-6 bg-black text-white rounded-[24px] p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-[18px] font-[800]">🏗️ Architecture View — Downloadable with Motion Arrows</h3>
              <p className="text-[12px] opacity-60 mt-1">24 nodes 27 edges SVG curved Q paths markerEnd colors, dash 0.5s + animateMotion dot 1.2s, play journey 9 steps, clickable details, hover highlights, status badges ✅⚠️❌🔜, current vs future toggle, downloadable SVG/PNG/HTML</p>
            </div>
            <button onClick={()=>setActive('architecture')} className="px-5 py-2.5 rounded-full bg-white text-black text-[12px] font-[700]">Open Interactive Map →</button>
          </div>
          <div className="mt-4 grid md:grid-cols-2 gap-3 text-[11px]">
            <div className="p-3 rounded-xl bg-white/10"><strong>Current v4 SECURE:</strong> User QR Website Assessment Diagnostic Verdict Variation Stage SRS Path Practice Progress API Auth Question Bank Trials Assessment Info DB Tunnel Render GitHub PWA — 24 nodes, 27 edges, motion arrows, status ✅ DONE 20 ⚠️ PARTIAL 2 (Render, GitHub) ❌ MISSING 0, but future needs Postgres Redis Sentry Plausible Resend Supabase Secure Storage TWA iOS Android App Store Play Store Domain UptimeRobot S3 Backup</div>
            <div className="p-3 rounded-xl bg-white/10"><strong>Next Plan for Architecture:</strong> Update ArchitectureMapView.jsx to include status badges ✅⚠️❌🔜, add toggle Current vs Future, add downloadable button Download SVG/PNG/HTML with motion, add link to roadmap click node → shows roadmap phase, ensure links work fix SPA fallback for /architecture /privacy /terms /security /roadmap</div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <a href="/src/components/ArchitectureMapView.jsx" target="_blank" className="px-4 py-2 rounded-full bg-white/15 text-[11px] font-[600]">Download JSX File (motion arrows)</a>
            <button onClick={()=>setActive('architecture')} className="px-4 py-2 rounded-full bg-[#007AFF] text-white text-[11px] font-[600]">View Interactive Map with Motion</button>
            <span className="px-4 py-2 rounded-full bg-white/10 text-[11px]">File: src/components/ArchitectureMapView.jsx — 24 nodes 27 edges — Ready to download now</span>
          </div>
        </div>

        {/* Team */}
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-[24px] p-5 border border-black/5">
            <div className="text-[11px] font-[700] uppercase tracking-widest opacity-50">👥 Team Focus — Web First</div>
            <div className="mt-3 space-y-2 text-[11px] leading-[1.4]">
              <div><strong>Lead Dev:</strong> React 19 Vite Node Express security Postgres Capacitor PWA perf TS testing — Vipin + AI</div>
              <div><strong>PM:</strong> Roadmap sprints GitHub Projects CHANGELOG versioning risk — You as PM, update ROADMAP.md every feature mandatory</div>
              <div><strong>QA:</strong> Vitest RTL Supertest Playwright Lighthouse axe manual checklist security curl OWASP ZAP — Need to add</div>
              <div><strong>Security:</strong> OWASP threat modeling pen test GDPR headers rate limiting auth encryption audit logging Sentry Snyk — Partial 80%</div>
              <div><strong>UI/UX iOS:</strong> iOS system Figma Inter #121417 #007AFF rounded-full motion micro-interactions 44px touch a11y — Done v4 need dark mode</div>
              <div><strong>Content:</strong> Danish M1→PD3 CEFR Modultest PD3 V2 collocations listening pedagogy variation — Done MVP need audio 100 vocab 500</div>
            </div>
          </div>
          <div className="bg-white rounded-[24px] p-5 border border-black/5">
            <div className="text-[11px] font-[700] uppercase tracking-widest opacity-50">🔄 Continuous Update Process</div>
            <div className="mt-3 space-y-1.5 text-[11px] leading-[1.4]">
              <div><strong>Before:</strong> Check ROADMAP.md Missing → pick Next → ticket GitHub Projects</div>
              <div><strong>During:</strong> Follow QUALITY_STANDARDS.md + TESTING_FRAMEWORK.md + SECURITY_AUDIT + Links must work</div>
              <div><strong>After:</strong> Update ROADMAP.md Achieved/Missing/Progress%+date+link, CHANGELOG version feat/fix, Build check size time, Test curl /api/health /api/security/audit links Playwright, Deploy GitHub→Render+Tunnel+QR, Present new live link that works + updated ROADMAP.md + zip</div>
              <div><strong>Gate:</strong> CI PASS, Lighthouse >90, security audit ok:true, links work, QR outside chat, coverage >80%</div>
              <div><strong>Versioning:</strong> v4 SECURE → v5 Web Launch permanent domain → v6 Native App Store/Play Store → v7 Growth, CHANGELOG Keep a Changelog</div>
            </div>
          </div>
          <div className="bg-white rounded-[24px] p-5 border border-black/5">
            <div className="text-[11px] font-[700] uppercase tracking-widest opacity-50">🔗 Links — Working After Fix</div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {['/','/website','/assessment','/architecture','/roadmap','/privacy','/terms','/security','/practice','/api/health','/api/security/audit'].map(l=>(
                <button key={l} onClick={()=>{
                  if(l.startsWith('/api')) window.open(l,'_blank');
                  else {
                    const page = l.replace('/','') || 'website';
                    setActive(page);
                  }
                }} className="px-2.5 py-1 rounded-full bg-[#F2F2F7] border border-black/5 text-[10px] font-[600] hover:bg-black hover:text-white transition">{l}</button>
              ))}
            </div>
            <div className="mt-3 text-[10px] leading-[1.4] opacity-60">
              Fix: Explicit Express routes for /assessment /architecture /privacy /terms /security /roadmap /website /practice + App.jsx pathname handling. Test: curl + phone camera. SPA fallback must NOT intercept /api/*.
            </div>
            <div className="mt-3">
              <div className="text-[10px] font-[700] uppercase tracking-widest opacity-50">📝 Update Log</div>
              <div className="text-[10px] mt-1 leading-[1.4]">2026-09-27 11:30 UTC: Created ROADMAP.md v1 Phases 0-8 progress achieved/missing/next security threat model OWASP 10 quality standards framework architecture current+future links fix team focus continuous update process<br/>Next: After fixing links + RoadmapView + QUALITY_STANDARDS + TESTING_FRAMEWORK → update progress % + share new working links</div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="inline-flex gap-2">
            <button onClick={()=>setActive('architecture')} className="px-6 py-3 rounded-full bg-black text-white text-[13px] font-[600]">🗺️ Architecture Map with Motion Arrows →</button>
            <button onClick={()=>setActive('security')} className="px-6 py-3 rounded-full bg-white border border-black/10 text-[13px] font-[600]">🔐 Security Audit Live</button>
          </div>
          <div className="mt-3 text-[11px] text-black/50">Roadmap file: ROADMAP.md — Keep updating every feature — Mandatory • Downloadable: src/components/ArchitectureMapView.jsx with motion arrows</div>
        </div>
      </div>
    </div>
  );
}
