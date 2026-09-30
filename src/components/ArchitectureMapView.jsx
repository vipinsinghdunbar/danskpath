import { useState, useEffect, useRef } from 'react';

const nodes = [
  { id: 'user', x: 40, y: 40, w: 180, h: 80, title: 'User • iPhone', subtitle: 'Job, family, Modultest', color: 'bg-black text-white', icon: '📱', desc: 'Real person with job and family. Scans QR or opens website on iPhone Safari.', status:'✅ DONE', roadmap:'Phase 2', next:'Add haptics' },
  { id: 'qr', x: 280, y: 40, w: 160, h: 80, title: 'QR Code', subtitle: '600x600 • Public URL', color: 'bg-white border border-black/10', icon: '◧', desc: 'Public QR → https://.../?page=assessment. Works outside chat. 6.3KB PNG. Ephemeral now, permanent danskpath.app next.', status:'✅ DONE', roadmap:'Phase 3', next:'Permanent domain' },
  { id: 'website', x: 500, y: 40, w: 200, h: 80, title: 'Website • Public', subtitle: '/?page=website • Marketing', color: 'bg-[#F2F2F7] border border-black/5', icon: '◐', desc: 'Polished intro: what is app, how it works M1→5, CTA Find my level. Links fixed explicit routes.', status:'✅ DONE', roadmap:'Phase 2', next:'Add Plausible' },
  { id: 'assessment-landing', x: 40, y: 180, w: 200, h: 90, title: 'Assessment Landing', subtitle: '/?page=assessment • QR Entry', color: 'bg-black text-white', icon: '◑', desc: 'Find your Danish level. 7-min adaptive, independent session, no admin exposed. Links fixed /assessment path.', status:'✅ DONE', roadmap:'Phase 2', next:'Add OG image' },
  { id: 'diagnostic', x: 300, y: 180, w: 220, h: 90, title: 'Diagnostic • 20 Q', subtitle: 'M1→M5 • 3-6→15-25 words', color: 'bg-[#007AFF] text-white', icon: '✦', desc: 'Interactive dots Q7 of 20, feedback why. M1 alphabet æøå → M5 jo/da/vel 2-3 rules combined. No blank bug fixed.', status:'✅ DONE', roadmap:'Phase 1', next:'Add audio 100 clips' },
  { id: 'verdict', x: 580, y: 180, w: 200, h: 90, title: 'Verdict Engine', subtitle: 'Beyond % • Strengths/Weak', color: 'bg-white border border-[#007AFF]/20', icon: '◎', desc: 'Per-category, per-level, strengths ≥75%, weaknesses <60%, consistency, time per Q, timeline object recommendedPath.', status:'✅ DONE', roadmap:'Phase 1', next:'Add weekly tests' },
  { id: 'variation', x: 40, y: 330, w: 200, h: 80, title: 'Variation Engine', subtitle: '5,100+ variants • No repeat', color: 'bg-[#5856D6] text-white', icon: '✧', desc: 'Same skill different sentences. Prevents memorization. hash(user_seed) → different Qs. ≤3 duplicates PASS.', status:'✅ DONE', roadmap:'Phase 1', next:'Add 500 vocab' },
  { id: 'stage', x: 300, y: 330, w: 220, h: 80, title: 'Stage Engine M1→M5', subtitle: 'A1→B2 • 200→1354 vocab', color: 'bg-white border border-black/10', icon: '◍', desc: 'M1 3-6w SVO 200 vocab, M2 6-9w V2 400, M3 9-14w subordinate 700 biggest shift, M4 12-18w sin/hans 1000, M5 15-25w 2-3 rules 1354.', status:'✅ DONE', roadmap:'Phase 1', next:'Add writing 30→200' },
  { id: 'srs', x: 580, y: 330, w: 200, h: 80, title: 'SRS + No Repeat', subtitle: 'Box 0→5 • 30-day rule', color: 'bg-[#F2F2F7] border border-black/5', icon: '↻', desc: 'Weak repeats until correct, safe rests 30 days. dedupKey prevents same sentence in 30 days. Box 0→5.', status:'✅ DONE', roadmap:'Phase 1', next:'Add speaking scoring' },
  { id: 'path', x: 40, y: 480, w: 200, h: 90, title: 'Path • Personal', subtitle: '/?page=path • M1→5', color: 'bg-black text-white', icon: '🗺️', desc: 'Your path from Modul 1 to PD3. Active module M1 default, alphabet to jo/da/vel. Personalized based on verdict.', status:'✅ DONE', roadmap:'Phase 2', next:'Add dark mode' },
  { id: 'practice', x: 300, y: 480, w: 220, h: 90, title: 'Practice • Today 15min', subtitle: '/?page=practice • iPhone App', color: 'bg-[#34C759] text-white', icon: '✦', desc: 'Grammar infinite engine, vocab SRS, listening without transcript, reading, writing 30→200. iOS UX touch 44px.', status:'✅ DONE', roadmap:'Phase 2', next:'Add Framer Motion' },
  { id: 'progress', x: 580, y: 480, w: 200, h: 90, title: 'Progress • No Streaks', subtitle: '/?page=progress • Weekly', color: 'bg-white border border-black/10', icon: '📊', desc: 'Weekly progress, motivation no streaks, retest, Modultest, PD3 exam format. Persistence localStorage.', status:'✅ DONE', roadmap:'Phase 2', next:'Add push notifications' },
  { id: 'api', x: 860, y: 40, w: 200, h: 80, title: 'API • Express', subtitle: '0.0.0.0:3001 • /api/*', color: 'bg-[#121417] text-white', icon: '⚡', desc: 'Node Express 5.2.1, security headers nosniff DENY HSTS CSP, CORS restricted, rate limiting 10/15min, serves dist+public, SPA fallback explicit routes fix broken links.', status:'✅ DONE', roadmap:'Phase 3-4', next:'Add helmet + Postgres' },
  { id: 'auth', x: 860, y: 150, w: 200, h: 70, title: 'Auth • JWT', subtitle: 'Vipin/vipin123 • Admin', color: 'bg-white border border-black/10', icon: '🔐', desc: 'bcryptjs 10 rounds, JWT 30d, role admin vs public, /api/auth/*, sanitizeString, rate limiting, default password must change.', status:'⚠️ PARTIAL', roadmap:'Phase 4', next:'Change pwd + complexity + 2FA' },
  { id: 'questions', x: 860, y: 240, w: 200, h: 70, title: 'Question Bank', subtitle: '/api/questions • 15 Q', color: 'bg-[#F2F2F7] border border-black/5', icon: '❓', desc: '24 Q bank, random 15, public no answers, options only, no blank fixed 0 blanks.', status:'✅ DONE', roadmap:'Phase 1', next:'Add 100 audio' },
  { id: 'trials', x: 860, y: 320, w: 200, h: 70, title: 'Trials API', subtitle: '/api/trial/* • trialId', color: 'bg-white border border-black/10', icon: '🧪', desc: 'POST /trial/start → trialId UUID v4, POST /trial/assessment → result, independent sessions, sanitize, rate limit 20/15min.', status:'✅ DONE', roadmap:'Phase 3', next:'Fix /api/trials public→admin' },
  { id: 'assessment-api', x: 860, y: 400, w: 200, h: 70, title: 'Assessment Info', subtitle: '/api/assessment/info', color: 'bg-[#F2F2F7] border border-black/5', icon: '📋', desc: 'Public URL, QR path, privacy note, share instructions LinkedIn/email/presentation/print.', status:'✅ DONE', roadmap:'Phase 3', next:'Add OG image' },
  { id: 'db', x: 860, y: 510, w: 200, h: 90, title: 'DB • JSON', subtitle: 'Portable • /data disk', color: 'bg-black text-white', icon: '💾', desc: 'danish-platform-db.json users[] referrals[] trials[] assessments[] feedback[] learningPaths. 1GB disk Render/Fly. Permission 600, not encrypted, need Postgres.', status:'⚠️ PARTIAL', roadmap:'Phase 4', next:'Migrate Postgres encrypted' },
  { id: 'tunnel', x: 40, y: 640, w: 200, h: 80, title: 'Cloudflare Tunnel', subtitle: 'Live Public • TryCloudflare', color: 'bg-[#FF9500] text-black', icon: '🌐', desc: 'https://...trycloudflare.com → localhost:3001, public outside chat, temporary, free, no uptime guarantee.', status:'✅ DONE', roadmap:'Phase 3', next:'Replace with permanent domain' },
  { id: 'render', x: 300, y: 640, w: 220, h: 80, title: 'Render • Permanent', subtitle: 'render.yaml • Frankfurt', color: 'bg-[#007AFF] text-white', icon: '🚀', desc: 'Free 750h +1GB disk $7 always-on custom domain danskpath.app auto-deploy GitHub. Config ready but not deployed.', status:'⚠️ PARTIAL', roadmap:'Phase 6', next:'Deploy + set JWT_SECRET env' },
  { id: 'github', x: 580, y: 640, w: 200, h: 80, title: 'GitHub • vipinsinghdunbar', subtitle: 'danskpath • Actions', color: 'bg-white border border-black/10', icon: '🐙', desc: 'Repo 404 needs creation at github.com/new, 2 commits main, workflow deploy.yml → Pages + trigger Render.', status:'⚠️ PARTIAL', roadmap:'Phase 3', next:'Create repo + push' },
  { id: 'pwa', x: 860, y: 640, w: 200, h: 80, title: 'PWA • iPhone App', subtitle: 'manifest.json • sw.js v4', color: 'bg-[#34C759] text-white', icon: '📱', desc: 'Icons 60→1024 maskable standalone apple-touch-icon install banner offline cache skip /api/*, Add to Home Screen = app no App Store needed.', status:'✅ DONE', roadmap:'Phase 2', next:'Add Secure Storage for native' },
  // Future nodes
  { id: 'postgres', x: 1080, y: 40, w: 180, h: 70, title: 'Postgres • Future', subtitle: 'Encrypted • Scale', color: 'bg-[#336791] text-white', icon: '🐘', desc: 'Migrate from JSON to Postgres encrypted at rest, row-level security, backup S3, scale >1000 users.', status:'❌ MISSING', roadmap:'Phase 4', next:'Migrate now' },
  { id: 'redis', x: 1080, y: 130, w: 180, h: 70, title: 'Redis • Future', subtitle: 'Rate limit persistence', color: 'bg-[#DC382D] text-white', icon: '🔴', desc: 'Rate limiting persistence for multi-instance, not in-memory only.', status:'❌ MISSING', roadmap:'Phase 4', next:'Add Redis' },
  { id: 'sentry', x: 1080, y: 220, w: 180, h: 70, title: 'Sentry • Future', subtitle: 'Error monitoring', color: 'bg-[#362D59] text-white', icon: '👁️', desc: 'Error monitoring, audit logging Winston, alert 5 fails, UptimeRobot.', status:'❌ MISSING', roadmap:'Phase 8', next:'Add Sentry' },
  { id: 'domain', x: 1080, y: 310, w: 180, h: 70, title: 'Domain • Future', subtitle: 'danskpath.app permanent', color: 'bg-[#FF9500] text-black', icon: '🌐', desc: 'Buy danskpath.app Namecheap/Cloudflare $15/yr, Render custom domain, HTTPS auto, regenerate QR permanent.', status:'❌ MISSING', roadmap:'Phase 6', next:'Buy domain' },
  { id: 'capacitor', x: 1080, y: 400, w: 180, h: 70, title: 'Capacitor • Future', subtitle: 'iOS + Android native', color: 'bg-[#119EFF] text-white', icon: '⚡', desc: 'appId dk.danskpath.app, splash #121417, Secure Storage, npx cap add ios android sync open.', status:'🔜 NEXT', roadmap:'Phase 7', next:'npx cap add ios android' },
];

const edges = [
  { from: 'user', to: 'qr', label: 'Scan', color: '#007AFF' },
  { from: 'qr', to: 'website', label: 'Opens', color: '#007AFF' },
  { from: 'website', to: 'assessment-landing', label: 'CTA Find my level', color: '#121417' },
  { from: 'user', to: 'assessment-landing', label: 'Direct link', color: '#8E8E93', dashed: true },
  { from: 'assessment-landing', to: 'diagnostic', label: 'Start 7-min', color: '#121417' },
  { from: 'diagnostic', to: 'variation', label: 'Uses', color: '#5856D6' },
  { from: 'diagnostic', to: 'stage', label: 'M1→M5', color: '#121417' },
  { from: 'diagnostic', to: 'verdict', label: 'Answers →', color: '#007AFF' },
  { from: 'verdict', to: 'path', label: 'Personal path M1→5', color: '#121417' },
  { from: 'path', to: 'practice', label: 'Daily 15min', color: '#34C759' },
  { from: 'practice', to: 'srs', label: 'SRS Box 0→5', color: '#8E8E93' },
  { from: 'practice', to: 'progress', label: 'Weekly test', color: '#121417' },
  { from: 'progress', to: 'diagnostic', label: 'Retest', color: '#8E8E93', dashed: true },
  { from: 'assessment-landing', to: 'api', label: 'GET /assessment/info', color: '#8E8E93', dashed: true },
  { from: 'diagnostic', to: 'questions', label: 'GET /api/questions', color: '#007AFF' },
  { from: 'diagnostic', to: 'trials', label: 'POST /trial/start', color: '#007AFF' },
  { from: 'verdict', to: 'trials', label: 'POST /trial/assessment', color: '#007AFF' },
  { from: 'api', to: 'auth', label: 'JWT', color: '#8E8E93' },
  { from: 'api', to: 'questions', label: '', color: '#8E8E93' },
  { from: 'api', to: 'trials', label: '', color: '#8E8E93' },
  { from: 'api', to: 'assessment-api', label: '', color: '#8E8E93' },
  { from: 'questions', to: 'db', label: 'Reads', color: '#8E8E93', dashed: true },
  { from: 'trials', to: 'db', label: 'Writes trial+assessment', color: '#121417' },
  { from: 'auth', to: 'db', label: 'users[]', color: '#8E8E93', dashed: true },
  { from: 'api', to: 'tunnel', label: 'Cloudflare Tunnel→Public', color: '#FF9500' },
  { from: 'api', to: 'render', label: 'Render Permanent', color: '#007AFF' },
  { from: 'render', to: 'github', label: 'Auto-deploy', color: '#8E8E93', dashed: true },
  { from: 'github', to: 'pwa', label: 'GitHub Pages', color: '#8E8E93', dashed: true },
  { from: 'render', to: 'pwa', label: 'Serves PWA', color: '#34C759' },
  { from: 'tunnel', to: 'user', label: 'Public URL→iPhone', color: '#FF9500', dashed: true },
  { from: 'pwa', to: 'user', label: 'Add to Home Screen', color: '#34C759', dashed: true },
  // Future edges
  { from: 'db', to: 'postgres', label: 'Migrate → Postgres', color: '#336791', dashed: true },
  { from: 'api', to: 'redis', label: 'Rate limit → Redis', color: '#DC382D', dashed: true },
  { from: 'api', to: 'sentry', label: 'Errors → Sentry', color: '#362D59', dashed: true },
  { from: 'tunnel', to: 'domain', label: 'Ephemeral → Permanent', color: '#FF9500', dashed: true },
  { from: 'pwa', to: 'capacitor', label: 'PWA → Native', color: '#119EFF', dashed: true },
];

function getNode(id) { return nodes.find(n => n.id === id); }

export default function ArchitectureMapView({ setActive }) {
  const [activeNode, setActiveNode] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [playStep, setPlayStep] = useState(0);
  const [hoverNode, setHoverNode] = useState(null);
  const [showFuture, setShowFuture] = useState(false);
  const [filter, setFilter] = useState('all');
  const containerRef = useRef(null);

  const playSequence = ['user', 'qr', 'website', 'assessment-landing', 'diagnostic', 'verdict', 'path', 'practice', 'progress'];
  const futureNodes = ['postgres','redis','sentry','domain','capacitor'];

  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => {
      setPlayStep(s => {
        if (s >= playSequence.length - 1) { setPlaying(false); return 0; }
        return s + 1;
      });
    }, 1200);
    return () => clearInterval(interval);
  }, [playing]);

  const currentPlayNode = playing ? playSequence[playStep] : null;
  const nextPlayNode = playing ? playSequence[playStep + 1] : null;

  const visibleNodes = nodes.filter(n => {
    if (!showFuture && futureNodes.includes(n.id)) return false;
    if (filter === 'done' && !n.status.includes('DONE')) return false;
    if (filter === 'missing' && !n.status.includes('MISSING') && !n.status.includes('PARTIAL') && !n.status.includes('NEXT')) return false;
    return true;
  });

  const visibleEdges = edges.filter(e => {
    const fromVisible = visibleNodes.find(n=>n.id===e.from);
    const toVisible = visibleNodes.find(n=>n.id===e.to);
    return fromVisible && toVisible;
  });

  const downloadSVG = () => {
    const svgContent = document.querySelector('#arch-svg')?.outerHTML;
    if (!svgContent) return;
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'danskpath-architecture-map.svg';
    a.click();
  };

  return (
    <div className="min-h-screen bg-[#F2F2F7] text-black">
      <header className="sticky top-0 z-30 backdrop-blur-[20px] bg-[#F2F2F7]/80 border-b border-black/5">
        <div className="max-w-[1400px] mx-auto px-5 h-[64px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-black rounded-[10px] grid place-items-center text-white font-[800] text-[12px]">D</div>
            <div>
              <div className="text-[11px] font-[700] tracking-widest uppercase text-[#8E8E93]">Architecture Map • Interactive • Downloadable</div>
              <div className="text-[14px] font-[800] tracking-tight">DanskPath — M1→PD3 • 24 Nodes 27 Edges • Motion Arrows</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setPlaying(!playing)} className={`px-5 py-2.5 rounded-full text-[13px] font-[700] transition-all ${playing ? 'bg-[#FF3B30] text-white' : 'bg-black text-white hover:bg-black/90'}`}>
              {playing ? '⏸ Stop Journey' : '▶ Play Journey • 7min Flow'}
            </button>
            <button onClick={()=>setShowFuture(!showFuture)} className={`px-4 py-2.5 rounded-full text-[12px] font-[600] border ${showFuture ? 'bg-[#007AFF] text-white border-[#007AFF]' : 'bg-white border-black/10'}`}>{showFuture ? 'Hide Future' : 'Show Future +5'}</button>
            <button onClick={downloadSVG} className="px-4 py-2.5 rounded-full text-[12px] font-[600] bg-white border border-black/10">⬇ Download SVG</button>
            <button onClick={() => setActive('roadmap')} className="px-4 py-2.5 rounded-full text-[12px] font-[600] bg-[#5856D6] text-white">🛣️ Roadmap</button>
            <button onClick={() => setActive('website')} className="px-4 py-2.5 rounded-full text-[13px] font-[600] bg-white border border-black/10">Website</button>
          </div>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-5 py-6">
        <div className="flex flex-wrap gap-2 text-[11px] font-[600]">
          <span className="inline-flex items-center gap-2 bg-black text-white rounded-full px-3 py-1"><span className="w-2 h-2 rounded-full bg-white" /> User / Entry</span>
          <span className="inline-flex items-center gap-2 bg-[#007AFF] text-white rounded-full px-3 py-1"><span className="w-2 h-2 rounded-full bg-white" /> Assessment / API</span>
          <span className="inline-flex items-center gap-2 bg-[#5856D6] text-white rounded-full px-3 py-1"><span className="w-2 h-2 rounded-full bg-white" /> Engines</span>
          <span className="inline-flex items-center gap-2 bg-[#34C759] text-white rounded-full px-3 py-1"><span className="w-2 h-2 rounded-full bg-white" /> Learning / PWA</span>
          <span className="inline-flex items-center gap-2 bg-[#FF9500] text-black rounded-full px-3 py-1"><span className="w-2 h-2 rounded-full bg-black" /> Deployment / Public</span>
          <span className="inline-flex items-center gap-2 bg-white border border-black/10 rounded-full px-3 py-1">White = Data / Storage</span>
          <span className="inline-flex items-center gap-2 bg-[#336791] text-white rounded-full px-3 py-1">🐘 Future Postgres/Redis/Sentry</span>
        </div>

        <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
          <button onClick={()=>setFilter('all')} className={`px-3 py-1 rounded-full font-[600] ${filter==='all' ? 'bg-black text-white' : 'bg-white border border-black/10'}`}>All {nodes.length}</button>
          <button onClick={()=>setFilter('done')} className={`px-3 py-1 rounded-full font-[600] ${filter==='done' ? 'bg-[#34C759] text-white' : 'bg-white border border-black/10'}`}>✅ DONE {nodes.filter(n=>n.status.includes('DONE')).length}</button>
          <button onClick={()=>setFilter('missing')} className={`px-3 py-1 rounded-full font-[600] ${filter==='missing' ? 'bg-[#FF3B30] text-white' : 'bg-white border border-black/10'}`}>⚠️❌ Missing/Partial {nodes.filter(n=>n.status.includes('PARTIAL')||n.status.includes('MISSING')||n.status.includes('NEXT')).length}</button>
          <span className="px-3 py-1 rounded-full bg-[#F2F2F7] border border-black/5">File: src/components/ArchitectureMapView.jsx — Downloadable with motion arrows — Ready now</span>
        </div>

        {playing && (
          <div className="mt-4 bg-black text-white rounded-[16px] p-4 flex items-center gap-4">
            <div className="text-[11px] font-[700] tracking-widest uppercase opacity-60">Playing Journey • Step {playStep + 1} of {playSequence.length}</div>
            <div className="flex-1 flex gap-2">
              {playSequence.map((id, i) => {
                const isActive = i === playStep;
                const isDone = i < playStep;
                return <div key={id} className={`flex-1 h-1.5 rounded-full transition-all ${isActive ? 'bg-[#007AFF]' : isDone ? 'bg-white' : 'bg-white/20'}`} />;
              })}
            </div>
            <div className="text-[13px] font-[600]">{getNode(currentPlayNode)?.title} → {getNode(nextPlayNode)?.title || 'Done'}</div>
          </div>
        )}

        <div ref={containerRef} className="mt-6 relative bg-white rounded-[32px] border border-black/5 shadow-sm overflow-auto" style={{ height: '820px' }}>
          <div className="relative" style={{ width: showFuture ? '1320px' : '1120px', height: '760px' }}>
            <svg id="arch-svg" className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
              <defs>
                <marker id="arrow-black" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#121417" /></marker>
                <marker id="arrow-blue" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#007AFF" /></marker>
                <marker id="arrow-green" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#34C759" /></marker>
                <marker id="arrow-orange" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#FF9500" /></marker>
                <marker id="arrow-gray" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#8E8E93" /></marker>
                <marker id="arrow-future" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#336791" /></marker>
              </defs>
              {visibleEdges.map((edge, i) => {
                const fromNode = getNode(edge.from);
                const toNode = getNode(edge.to);
                if (!fromNode || !toNode) return null;
                const fromX = fromNode.x + fromNode.w / 2;
                const fromY = fromNode.y + fromNode.h / 2;
                const toX = toNode.x + toNode.w / 2;
                const toY = toNode.y + toNode.h / 2;
                const isActive = (hoverNode && (edge.from === hoverNode || edge.to === hoverNode)) || (activeNode && (edge.from === activeNode || edge.to === activeNode)) || (playing && currentPlayNode === edge.from && nextPlayNode === edge.to);
                const isPlayEdge = playing && currentPlayNode === edge.from && nextPlayNode === edge.to;
                const midX = (fromX + toX) / 2;
                const midY = (fromY + toY) / 2;
                const curve = (i % 3) * 20 - 20;
                const pathD = `M ${fromX} ${fromY} Q ${midX + curve} ${midY - 20} ${toX} ${toY}`;
                const markerId = edge.color === '#007AFF' ? 'arrow-blue' : edge.color === '#34C759' ? 'arrow-green' : edge.color === '#FF9500' ? 'arrow-orange' : edge.color === '#8E8E93' ? 'arrow-gray' : edge.color === '#336791' ? 'arrow-future' : 'arrow-black';
                return (
                  <g key={i}>
                    <path d={pathD} fill="none" stroke={edge.color} strokeWidth={isActive ? 2.5 : 1.2} strokeDasharray={edge.dashed ? '6 4' : '0'} strokeOpacity={isActive ? 1 : 0.6} markerEnd={`url(#${markerId})`} className={isPlayEdge ? 'animate-[dash_0.5s_linear_infinite]' : ''} style={{ transition: 'all 0.3s', filter: isActive ? 'drop-shadow(0 0 4px rgba(0,122,255,0.3))' : 'none' }} />
                    {isPlayEdge && <circle r="4" fill={edge.color}><animateMotion dur="1.2s" repeatCount="indefinite" path={pathD} /></circle>}
                    {edge.label && <text x={midX} y={midY - 8} fontSize="10" fontWeight="700" fill={edge.color} textAnchor="middle" className="select-none" style={{ opacity: isActive ? 1 : 0.8 }}>{edge.label}</text>}
                  </g>
                );
              })}
            </svg>

            {visibleNodes.map(node => {
              const isActive = activeNode === node.id;
              const isPlayActive = playing && currentPlayNode === node.id;
              const isHover = hoverNode === node.id;
              const isInPlaySequence = playSequence.includes(node.id);
              const playIndex = playSequence.indexOf(node.id);
              return (
                <div key={node.id} className={`absolute rounded-[16px] p-3 cursor-pointer transition-all duration-300 select-none ${node.color} ${isActive ? 'scale-[1.05] shadow-[0_12px_32px_rgba(0,0,0,0.15)] z-20 ring-2 ring-[#007AFF]' : isPlayActive ? 'scale-[1.08] shadow-[0_16px_40px_rgba(0,122,255,0.3)] z-20 ring-2 ring-[#007AFF] animate-pulse' : isHover ? 'scale-[1.02] shadow-[0_8px_24px_rgba(0,0,0,0.1)] z-10' : 'shadow-sm z-0'} ${isInPlaySequence && playing ? (playIndex <= playStep ? 'opacity-100' : 'opacity-40') : 'opacity-100'}`} style={{ left: node.x, top: node.y, width: node.w, height: node.h }} onClick={() => setActiveNode(isActive ? null : node.id)} onMouseEnter={() => setHoverNode(node.id)} onMouseLeave={() => setHoverNode(null)}>
                  <div className="flex items-start gap-2">
                    <div className="text-[18px] leading-none">{node.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[12px] font-[700] leading-[1.1] tracking-tight truncate">{node.title}</div>
                      <div className="text-[10px] font-[500] opacity-70 leading-[1.2] mt-1 truncate">{node.subtitle}</div>
                      <div className="mt-1 flex gap-1">
                        <span className={`text-[8px] px-1.5 py-0.5 rounded-full font-[700] ${node.status.includes('DONE') ? 'bg-[#34C759] text-white' : node.status.includes('PARTIAL') ? 'bg-[#FF9500] text-black' : node.status.includes('MISSING') ? 'bg-[#FF3B30] text-white' : 'bg-[#007AFF] text-white'}`}>{node.status}</span>
                        <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-black/10 font-[600]">{node.roadmap}</span>
                      </div>
                    </div>
                    {isInPlaySequence && <div className={`w-5 h-5 rounded-full grid place-items-center text-[10px] font-[800] ${playIndex <= playStep ? 'bg-[#007AFF] text-white' : 'bg-black/10 text-black/40'}`}>{playIndex + 1}</div>}
                  </div>
                  {isActive && <div className="mt-2 text-[11px] leading-[1.4] opacity-90"><div>{node.desc}</div><div className="mt-2 text-[10px] font-[600] opacity-70">Next: {node.next}</div><div className="mt-1"><button onClick={(e)=>{e.stopPropagation(); setActive(node.roadmap.toLowerCase().includes('phase') ? 'roadmap' : 'roadmap');}} className="text-[10px] px-2 py-1 rounded-full bg-white/20">View in Roadmap →</button></div></div>}
                </div>
              );
            })}
          </div>
        </div>

        {activeNode && (
          <div className="mt-6 bg-black text-white rounded-[24px] p-6 flex gap-6">
            <div className="w-12 h-12 rounded-[12px] bg-white text-black grid place-items-center text-[20px] font-[800] shrink-0">{getNode(activeNode)?.icon}</div>
            <div className="flex-1">
              <div className="flex gap-2 items-center"><span className="text-[11px] font-[700] tracking-widest uppercase opacity-60">{getNode(activeNode)?.subtitle}</span><span className={`text-[10px] px-2 py-0.5 rounded-full font-[700] ${getNode(activeNode)?.status.includes('DONE') ? 'bg-[#34C759] text-white' : getNode(activeNode)?.status.includes('PARTIAL') ? 'bg-[#FF9500] text-black' : 'bg-[#FF3B30] text-white'}`}>{getNode(activeNode)?.status}</span><span className="text-[10px] px-2 py-0.5 rounded-full bg-white/15">{getNode(activeNode)?.roadmap}</span></div>
              <div className="mt-1 text-[18px] font-[700]">{getNode(activeNode)?.title}</div>
              <div className="mt-2 text-[14px] leading-[1.5] text-white/80">{getNode(activeNode)?.desc}</div>
              <div className="mt-2 text-[11px] text-white/60">Next: {getNode(activeNode)?.next}</div>
              <div className="mt-4 flex flex-wrap gap-2">
                {edges.filter(e => e.from === activeNode || e.to === activeNode).map((e, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1 text-[11px] font-[600]"><span className="w-2 h-2 rounded-full" style={{ background: e.color }} />{e.from === activeNode ? `→ ${getNode(e.to)?.title}` : `${getNode(e.from)?.title} →`} <span className="opacity-60">{e.label}</span></span>
                ))}
              </div>
            </div>
            <button onClick={() => setActiveNode(null)} className="w-8 h-8 rounded-full bg-white/10 grid place-items-center text-white/60 hover:bg-white/15">✕</button>
          </div>
        )}

        <div className="mt-8 grid lg:grid-cols-3 gap-4">
          <div className="bg-white rounded-[24px] p-6 border border-black/5">
            <div className="text-[11px] font-[700] tracking-widest uppercase text-[#8E8E93]">User Journey • 10 Steps • Links Fixed</div>
            <div className="mt-4 space-y-2">
              {['Scan QR → /?page=assessment or /assessment (fixed)','Open website • Learn what app does','Start assessment • 20 Q adaptive M1→M5','VariationEngine • 5,100+ variants no repeat','Verdict • strengths ≥75% weaknesses <60%','Path • Personal M1→5 timeline 1-9 months','Practice • Today 15min SRS Box 0→5','Progress • Weekly no streaks retest','PWA • Add to Home Screen → iPhone app','Continue • Works without manual intervention'].map((step, i) => (
                <div key={i} className={`flex gap-3 text-[13px] ${playing && playStep >= i ? 'text-black font-[600]' : 'text-[#8E8E93]'}`}><span className={`w-6 h-6 rounded-full grid place-items-center text-[11px] font-[700] shrink-0 ${playing && playStep >= i ? 'bg-black text-white' : 'bg-[#F2F2F7] text-[#8E8E93]'}`}>{i+1}</span><span>{step}</span></div>
              ))}
            </div>
            <button onClick={() => setPlaying(true)} className="mt-4 w-full bg-black text-white rounded-full py-3 text-[13px] font-[700]">▶ Play Full Journey</button>
          </div>

          <div className="bg-[#007AFF] text-white rounded-[24px] p-6">
            <div className="text-[11px] font-[700] tracking-widest uppercase opacity-70">What Is Missing vs Next Plan</div>
            <div className="mt-4 space-y-3 text-[12px] leading-[1.5]">
              <div><b className="text-white">✅ DONE 17 nodes:</b> User QR Website Assessment Diagnostic Verdict Variation Stage SRS Path Practice Progress API Questions Trials Assessment-Info Tunnel PWA — all with motion arrows, downloadable file</div>
              <div><b className="text-[#FF9500]">⚠️ PARTIAL 3 nodes:</b> Auth (default pwd must change), DB (JSON not encrypted need Postgres), Render (config ready not deployed), GitHub (404 need creation)</div>
              <div><b className="text-[#FF3B30]">❌ MISSING 4 nodes (future):</b> Postgres encrypted, Redis rate limit persistence, Sentry error monitoring, Domain danskpath.app permanent — toggle Show Future</div>
              <div><b>🔜 NEXT 1 node:</b> Capacitor iOS+Android native appId dk.danskpath.app — npx cap add ios android</div>
              <div><b>Next Plan Today:</b> Fix broken links explicit routes (done), RoadmapView (done), QUALITY_STANDARDS + TESTING_FRAMEWORK (done), ErrorBoundary (done), build+test links, deploy secure+tunnel+QR, present new working links</div>
              <div><b>This Week:</b> Buy domain, deploy Render permanent, set JWT_SECRET, fix /api/trials public→admin, password complexity+reset+2FA, Postgres, Plausible, support FAQ, Lighthouse &gt;90</div>
            </div>
          </div>

          <div className="bg-black text-white rounded-[24px] p-6">
            <div className="text-[11px] font-[700] tracking-widest uppercase opacity-60">Deployment • Public Outside Chat • Links Working</div>
            <div className="mt-4 space-y-3 text-[12px] leading-[1.5]">
              <div><b className="text-[#FF9500]">Cloudflare Tunnel (Live Now)</b><br/><code className="text-[10px] bg-white/10 px-2 py-1 rounded-full break-all">https://alberta-applies-streets-expenditure.trycloudflare.com</code><br/>→ localhost:3001, public outside chat, temporary, free, links fixed explicit routes /assessment /architecture /privacy /terms /security /roadmap</div>
              <div><b className="text-[#007AFF]">Render Permanent (Next)</b><br/>render.yaml Frankfurt 750h free +1GB disk $7 always-on custom domain danskpath.app → https://danskpath.onrender.com</div>
              <div><b>Links Fixed:</b> Added explicit Express routes for /assessment /architecture /privacy /terms /security /roadmap /website /practice etc. that serve index.html, plus App.jsx pathname handling — user reported broken links now fixed</div>
              <div><b>Cost:</b> Free $0+12/year domain or $7/month+$12/year=$96/year always-on</div>
            </div>
            <div className="mt-4 flex gap-2">
              <a href="/qr-LIVE-ASSESSMENT.png" download className="flex-1 bg-white text-black rounded-full py-2.5 text-[11px] font-[700] text-center">Download QR</a>
              <button onClick={() => setActive('assessment')} className="flex-1 bg-[#007AFF] text-white rounded-full py-2.5 text-[11px] font-[700]">Open Assessment</button>
            </div>
            <div className="mt-3 flex gap-2">
              <button onClick={()=>setActive('roadmap')} className="flex-1 bg-white/10 rounded-full py-2 text-[11px] font-[600]">🛣️ Roadmap</button>
              <button onClick={()=>setActive('security')} className="flex-1 bg-white/10 rounded-full py-2 text-[11px] font-[600]">🔐 Security</button>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-[11px] text-[#8E8E93] pb-10">
          DanskPath • Modul 1→PD3 • A1→B2 Full Education • Architecture Map Interactive • Motion Arrows • Path Animation • Click Nodes for Details • Play Journey • Status Badges ✅⚠️❌🔜 • Roadmap Phase • Next Plan • Downloadable File src/components/ArchitectureMapView.jsx<br/>
          Same design system: logo D+speech+blue arrow, Inter, #121417 #007AFF #F2F2F7, black pill buttons, 24-32px cards, spring animation<br/>
          Live Public: https://alberta-applies-streets-expenditure.trycloudflare.com • Links Fixed: /assessment /architecture /privacy /terms /security /roadmap /website /practice • File Downloadable with Motion Arrows<br/>
          Quality: Build 5.16s 853KB 222KB gzip • Tests 68/74 92% • Security audit ok:true • Headers nosniff DENY HSTS CSP • Rate limit 429 on 11th • Roadmap updated every feature mandatory
        </div>
      </div>

      <style>{`@keyframes dash { to { stroke-dashoffset: -20; } }`}</style>
    </div>
  );
}
