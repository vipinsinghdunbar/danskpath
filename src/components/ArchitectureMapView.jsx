import { useState, useEffect, useRef } from 'react';

const nodes = [
  // Entry
  { id: 'user', x: 40, y: 40, w: 180, h: 80, title: 'User • iPhone', subtitle: 'Job, family, Modultest', color: 'bg-black text-white', icon: '📱', desc: 'Real person with job and family. Scans QR or opens website on iPhone Safari.' },
  { id: 'qr', x: 280, y: 40, w: 160, h: 80, title: 'QR Code', subtitle: '600x600 • Public URL', color: 'bg-white border border-black/10', icon: '◧', desc: 'Public QR → https://.../ ?page=assessment. Works outside chat. 6.3KB PNG.' },
  { id: 'website', x: 500, y: 40, w: 200, h: 80, title: 'Website • Public', subtitle: '/?page=website • Marketing', color: 'bg-[#F2F2F7] border border-black/5', icon: '◐', desc: 'Polished intro: what is app, how it works M1→5, CTA Find my level.' },
  
  // Assessment Flow
  { id: 'assessment-landing', x: 40, y: 180, w: 200, h: 90, title: 'Assessment Landing', subtitle: '/?page=assessment • QR Entry', color: 'bg-black text-white', icon: '◑', desc: 'Find your Danish level. 7-min adaptive, independent session, no admin exposed.' },
  { id: 'diagnostic', x: 300, y: 180, w: 220, h: 90, title: 'Diagnostic • 20 Q', subtitle: 'M1→M5 • 3-6→15-25 words', color: 'bg-[#007AFF] text-white', icon: '✦', desc: 'Interactive dots Q7 of 20, feedback why. M1 alphabet æøå → M5 jo/da/vel 2-3 rules combined.' },
  { id: 'verdict', x: 580, y: 180, w: 200, h: 90, title: 'Verdict Engine', subtitle: 'Beyond % • Strengths/Weak', color: 'bg-white border border-[#007AFF]/20', icon: '◎', desc: 'Per-category, per-level, strengths ≥75%, weaknesses <60%, consistency, time per Q, timeline.' },
  
  // Engines
  { id: 'variation', x: 40, y: 330, w: 200, h: 80, title: 'Variation Engine', subtitle: '5,100+ variants • No repeat', color: 'bg-[#5856D6] text-white', icon: '✧', desc: 'Same skill different sentences. Prevents memorization. hash(user_seed) → different Qs.' },
  { id: 'stage', x: 300, y: 330, w: 220, h: 80, title: 'Stage Engine M1→M5', subtitle: 'A1→B2 • 200→1354 vocab', color: 'bg-white border border-black/10', icon: '◍', desc: 'M1 3-6w SVO, M2 6-9w V2, M3 9-14w subordinate biggest shift, M4 12-18w sin/hans, M5 15-25w 2-3 rules.' },
  { id: 'srs', x: 580, y: 330, w: 200, h: 80, title: 'SRS + No Repeat', subtitle: 'Box 0→5 • 30-day rule', color: 'bg-[#F2F2F7] border border-black/5', icon: '↻', desc: 'Weak repeats until correct, safe rests 30 days. dedupKey prevents same sentence in 30 days.' },
  
  // Learning App
  { id: 'path', x: 40, y: 480, w: 200, h: 90, title: 'Path • Personal', subtitle: '/?page=path • M1→5', color: 'bg-black text-white', icon: '🗺️', desc: 'Your path from Modul 1 to PD3. Active module M1 default, alphabet to jo/da/vel.' },
  { id: 'practice', x: 300, y: 480, w: 220, h: 90, title: 'Practice • Today 15min', subtitle: '/?page=practice • iPhone App', color: 'bg-[#34C759] text-white', icon: '✦', desc: 'Grammar infinite engine, vocab SRS, listening without transcript, reading, writing 30→200.' },
  { id: 'progress', x: 580, y: 480, w: 200, h: 90, title: 'Progress • No Streaks', subtitle: '/?page=progress • Weekly', color: 'bg-white border border-black/10', icon: '📊', desc: 'Weekly progress, motivation no streaks, retest, Modultest, PD3 exam format.' },
  
  // Backend
  { id: 'api', x: 860, y: 40, w: 200, h: 80, title: 'API • Express', subtitle: '0.0.0.0:3001 • /api/*', color: 'bg-[#121417] text-white', icon: '⚡', desc: 'Node Express 5.2.1, CORS, JWT, serves dist + public, SPA fallback.' },
  { id: 'auth', x: 860, y: 150, w: 200, h: 70, title: 'Auth • JWT', subtitle: 'Vipin/vipin123 • Admin', color: 'bg-white border border-black/10', icon: '🔐', desc: 'bcryptjs, jsonwebtoken 30d, role admin vs public, /api/auth/*' },
  { id: 'questions', x: 860, y: 240, w: 200, h: 70, title: 'Question Bank', subtitle: '/api/questions • 15 Q', color: 'bg-[#F2F2F7] border border-black/5', icon: '❓', desc: '24 Q bank, random 15, public no answers, options only, no blank (fixed).' },
  { id: 'trials', x: 860, y: 320, w: 200, h: 70, title: 'Trials API', subtitle: '/api/trial/* • trialId', color: 'bg-white border border-black/10', icon: '🧪', desc: 'POST /trial/start → trialId, POST /trial/assessment → result, independent sessions.' },
  { id: 'assessment-api', x: 860, y: 400, w: 200, h: 70, title: 'Assessment Info', subtitle: '/api/assessment/info', color: 'bg-[#F2F2F7] border border-black/5', icon: '📋', desc: 'Public URL, QR path, privacy note, share instructions.' },
  
  // Storage
  { id: 'db', x: 860, y: 510, w: 200, h: 90, title: 'DB • danish-platform-db.json', subtitle: 'Portable • /data disk', color: 'bg-black text-white', icon: '💾', desc: 'users[], referrals[], trials[], assessments[], feedback[], learningPaths. 1GB disk on Render/Fly.' },
  
  // Deployment
  { id: 'tunnel', x: 40, y: 640, w: 200, h: 80, title: 'Cloudflare Tunnel', subtitle: 'Live Public • TryCloudflare', color: 'bg-[#FF9500] text-black', icon: '🌐', desc: 'https://...trycloudflare.com → localhost:3001, public outside chat, temporary.' },
  { id: 'render', x: 300, y: 640, w: 220, h: 80, title: 'Render • Permanent', subtitle: 'render.yaml • Frankfurt', color: 'bg-[#007AFF] text-white', icon: '🚀', desc: 'Free 750h + 1GB disk, $7/month always-on, custom domain danskpath.app, auto-deploy GitHub.' },
  { id: 'github', x: 580, y: 640, w: 200, h: 80, title: 'GitHub • vipinsinghdunbar', subtitle: 'danskpath • Actions', color: 'bg-white border border-black/10', icon: '🐙', desc: '2 commits main, workflow deploy.yml → GitHub Pages + trigger Render.' },
  { id: 'pwa', x: 860, y: 640, w: 200, h: 80, title: 'PWA • iPhone App', subtitle: 'manifest.json • sw.js v4', color: 'bg-[#34C759] text-white', icon: '📱', desc: 'Icons 60→1024, standalone, apple-touch-icon, install banner, offline cache.' },
];

const edges = [
  // Entry flow
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
  
  // Backend flow
  { from: 'assessment-landing', to: 'api', label: 'GET /api/assessment/info', color: '#8E8E93', dashed: true },
  { from: 'diagnostic', to: 'questions', label: 'GET /api/questions', color: '#007AFF' },
  { from: 'diagnostic', to: 'trials', label: 'POST /api/trial/start', color: '#007AFF' },
  { from: 'verdict', to: 'trials', label: 'POST /trial/assessment', color: '#007AFF' },
  { from: 'api', to: 'auth', label: 'JWT', color: '#8E8E93' },
  { from: 'api', to: 'questions', label: '', color: '#8E8E93' },
  { from: 'api', to: 'trials', label: '', color: '#8E8E93' },
  { from: 'api', to: 'assessment-api', label: '', color: '#8E8E93' },
  { from: 'questions', to: 'db', label: 'Reads', color: '#8E8E93', dashed: true },
  { from: 'trials', to: 'db', label: 'Writes trial + assessment', color: '#121417' },
  { from: 'auth', to: 'db', label: 'users[]', color: '#8E8E93', dashed: true },
  
  // Deployment
  { from: 'api', to: 'tunnel', label: 'Cloudflare Tunnel → Public', color: '#FF9500' },
  { from: 'api', to: 'render', label: 'Render Permanent', color: '#007AFF' },
  { from: 'render', to: 'github', label: 'Auto-deploy', color: '#8E8E93', dashed: true },
  { from: 'github', to: 'pwa', label: 'GitHub Pages', color: '#8E8E93', dashed: true },
  { from: 'render', to: 'pwa', label: 'Serves PWA', color: '#34C759' },
  { from: 'tunnel', to: 'user', label: 'Public URL → iPhone', color: '#FF9500', dashed: true },
  { from: 'pwa', to: 'user', label: 'Add to Home Screen', color: '#34C759', dashed: true },
];

function getNode(id) {
  return nodes.find(n => n.id === id);
}

export default function ArchitectureMapView({ setActive }) {
  const [activeNode, setActiveNode] = useState(null);
  const [activeEdge, setActiveEdge] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [playStep, setPlayStep] = useState(0);
  const [hoverNode, setHoverNode] = useState(null);
  const containerRef = useRef(null);

  const playSequence = ['user', 'qr', 'website', 'assessment-landing', 'diagnostic', 'verdict', 'path', 'practice', 'progress'];

  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => {
      setPlayStep(s => {
        if (s >= playSequence.length - 1) {
          setPlaying(false);
          return 0;
        }
        return s + 1;
      });
    }, 1200);
    return () => clearInterval(interval);
  }, [playing, playSequence.length]);

  const currentPlayNode = playing ? playSequence[playStep] : null;
  const nextPlayNode = playing ? playSequence[playStep + 1] : null;

  return (
    <div className="min-h-screen bg-[#F2F2F7] text-black">
      <header className="sticky top-0 z-30 backdrop-blur-[20px] bg-[#F2F2F7]/80 border-b border-black/5">
        <div className="max-w-[1400px] mx-auto px-5 h-[64px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-black rounded-[10px] grid place-items-center text-white font-[800] text-[12px]">D</div>
            <div>
              <div className="text-[11px] font-[700] tracking-widest uppercase text-[#8E8E93]">Architecture Map • Interactive</div>
              <div className="text-[14px] font-[800] tracking-tight">DanskPath — Modul 1→PD3 • Full System</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setPlaying(!playing)} className={`px-5 py-2.5 rounded-full text-[13px] font-[700] transition-all ${playing ? 'bg-[#FF3B30] text-white' : 'bg-black text-white hover:bg-black/90'}`}>
              {playing ? '⏸ Stop Journey' : '▶ Play Journey • 7min Flow'}
            </button>
            <button onClick={() => setActive('website')} className="px-4 py-2.5 rounded-full text-[13px] font-[600] bg-white border border-black/10 hover:bg-[#F2F2F7]">Website</button>
            <button onClick={() => setActive('assessment')} className="px-4 py-2.5 rounded-full text-[13px] font-[600] bg-[#007AFF] text-white">Assessment + QR</button>
          </div>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-5 py-6">
        {/* Legend */}
        <div className="flex flex-wrap gap-3 text-[11px] font-[600]">
          <span className="inline-flex items-center gap-2 bg-black text-white rounded-full px-3 py-1"><span className="w-2 h-2 rounded-full bg-white" /> User / Entry</span>
          <span className="inline-flex items-center gap-2 bg-[#007AFF] text-white rounded-full px-3 py-1"><span className="w-2 h-2 rounded-full bg-white" /> Assessment / API</span>
          <span className="inline-flex items-center gap-2 bg-[#5856D6] text-white rounded-full px-3 py-1"><span className="w-2 h-2 rounded-full bg-white" /> Engines</span>
          <span className="inline-flex items-center gap-2 bg-[#34C759] text-white rounded-full px-3 py-1"><span className="w-2 h-2 rounded-full bg-white" /> Learning / PWA</span>
          <span className="inline-flex items-center gap-2 bg-[#FF9500] text-black rounded-full px-3 py-1"><span className="w-2 h-2 rounded-full bg-black" /> Deployment / Public</span>
          <span className="inline-flex items-center gap-2 bg-white border border-black/10 rounded-full px-3 py-1">White = Data / Storage</span>
        </div>

        {/* Journey progress */}
        {playing && (
          <div className="mt-4 bg-black text-white rounded-[16px] p-4 flex items-center gap-4">
            <div className="text-[11px] font-[700] tracking-widest uppercase opacity-60">Playing Journey • Step {playStep + 1} of {playSequence.length}</div>
            <div className="flex-1 flex gap-2">
              {playSequence.map((id, i) => {
                const node = getNode(id);
                const isActive = i === playStep;
                const isDone = i < playStep;
                return (
                  <div key={id} className={`flex-1 h-1.5 rounded-full transition-all ${isActive ? 'bg-[#007AFF]' : isDone ? 'bg-white' : 'bg-white/20'}`} />
                );
              })}
            </div>
            <div className="text-[13px] font-[600]">{getNode(currentPlayNode)?.title} → {getNode(nextPlayNode)?.title || 'Done'}</div>
          </div>
        )}

        {/* Main Canvas */}
        <div ref={containerRef} className="mt-6 relative bg-white rounded-[32px] border border-black/5 shadow-sm overflow-auto" style={{ height: '820px' }}>
          <div className="relative" style={{ width: '1120px', height: '760px' }}>
            {/* SVG Arrows */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
              <defs>
                <marker id="arrow-black" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#121417" />
                </marker>
                <marker id="arrow-blue" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#007AFF" />
                </marker>
                <marker id="arrow-green" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#34C759" />
                </marker>
                <marker id="arrow-orange" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#FF9500" />
                </marker>
                <marker id="arrow-gray" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#8E8E93" />
                </marker>
              </defs>

              {edges.map((edge, i) => {
                const fromNode = getNode(edge.from);
                const toNode = getNode(edge.to);
                if (!fromNode || !toNode) return null;

                const fromX = fromNode.x + fromNode.w / 2;
                const fromY = fromNode.y + fromNode.h / 2;
                const toX = toNode.x + toNode.w / 2;
                const toY = toNode.y + toNode.h / 2;

                const isActive = (hoverNode && (edge.from === hoverNode || edge.to === hoverNode)) || 
                                (activeNode && (edge.from === activeNode || edge.to === activeNode)) ||
                                (playing && currentPlayNode === edge.from && nextPlayNode === edge.to);

                const isPlayEdge = playing && currentPlayNode === edge.from && nextPlayNode === edge.to;

                // Calculate path — straight or curved
                const dx = toX - fromX;
                const dy = toY - fromY;
                const dist = Math.sqrt(dx*dx + dy*dy);
                const midX = (fromX + toX) / 2;
                const midY = (fromY + toY) / 2;
                // Add slight curve for overlapping
                const curve = (i % 3) * 20 - 20;

                const pathD = `M ${fromX} ${fromY} Q ${midX + curve} ${midY - 20} ${toX} ${toY}`;

                const markerId = edge.color === '#007AFF' ? 'arrow-blue' : edge.color === '#34C759' ? 'arrow-green' : edge.color === '#FF9500' ? 'arrow-orange' : edge.color === '#8E8E93' ? 'arrow-gray' : 'arrow-black';

                return (
                  <g key={i}>
                    <path
                      d={pathD}
                      fill="none"
                      stroke={isActive ? edge.color : edge.color}
                      strokeWidth={isActive ? 2.5 : 1.2}
                      strokeDasharray={edge.dashed ? '6 4' : isPlayEdge ? '0' : '0'}
                      strokeOpacity={isActive ? 1 : 0.6}
                      markerEnd={`url(#${markerId})`}
                      className={isPlayEdge ? 'animate-[dash_0.5s_linear_infinite]' : ''}
                      style={{
                        transition: 'all 0.3s',
                        filter: isActive ? 'drop-shadow(0 0 4px rgba(0,122,255,0.3))' : 'none'
                      }}
                    />
                    {/* Motion dot */}
                    {isPlayEdge && (
                      <circle r="4" fill={edge.color} className="drop-shadow">
                        <animateMotion dur="1.2s" repeatCount="indefinite" path={pathD} />
                      </circle>
                    )}
                    {/* Label */}
                    {edge.label && (
                      <text x={midX} y={midY - 8} fontSize="10" fontWeight="700" fill={edge.color} textAnchor="middle" className="select-none" style={{ background: 'white', opacity: isActive ? 1 : 0.8 }}>
                        {edge.label}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Nodes */}
            {nodes.map(node => {
              const isActive = activeNode === node.id;
              const isPlayActive = playing && currentPlayNode === node.id;
              const isHover = hoverNode === node.id;
              const isInPlaySequence = playSequence.includes(node.id);
              const playIndex = playSequence.indexOf(node.id);

              return (
                <div
                  key={node.id}
                  className={`absolute rounded-[16px] p-3 cursor-pointer transition-all duration-300 select-none ${node.color} ${isActive ? 'scale-[1.05] shadow-[0_12px_32px_rgba(0,0,0,0.15)] z-20 ring-2 ring-[#007AFF]' : isPlayActive ? 'scale-[1.08] shadow-[0_16px_40px_rgba(0,122,255,0.3)] z-20 ring-2 ring-[#007AFF] animate-pulse' : isHover ? 'scale-[1.02] shadow-[0_8px_24px_rgba(0,0,0,0.1)] z-10' : 'shadow-sm z-0'} ${isInPlaySequence && playing ? (playIndex <= playStep ? 'opacity-100' : 'opacity-40') : 'opacity-100'}`}
                  style={{ left: node.x, top: node.y, width: node.w, height: node.h }}
                  onClick={() => setActiveNode(isActive ? null : node.id)}
                  onMouseEnter={() => setHoverNode(node.id)}
                  onMouseLeave={() => setHoverNode(null)}
                >
                  <div className="flex items-start gap-2">
                    <div className="text-[18px] leading-none">{node.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[12px] font-[700] leading-[1.1] tracking-tight truncate">{node.title}</div>
                      <div className="text-[10px] font-[500] opacity-70 leading-[1.2] mt-1 truncate">{node.subtitle}</div>
                    </div>
                    {isInPlaySequence && (
                      <div className={`w-5 h-5 rounded-full grid place-items-center text-[10px] font-[800] ${playIndex <= playStep ? 'bg-[#007AFF] text-white' : 'bg-black/10 text-black/40'}`}>
                        {playIndex + 1}
                      </div>
                    )}
                  </div>
                  {isActive && (
                    <div className="mt-2 text-[11px] leading-[1.4] opacity-90">
                      {node.desc}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Details Panel */}
        {activeNode && (
          <div className="mt-6 bg-black text-white rounded-[24px] p-6 flex gap-6">
            <div className="w-12 h-12 rounded-[12px] bg-white text-black grid place-items-center text-[20px] font-[800] shrink-0">
              {getNode(activeNode)?.icon}
            </div>
            <div className="flex-1">
              <div className="text-[11px] font-[700] tracking-widest uppercase opacity-60">{getNode(activeNode)?.subtitle}</div>
              <div className="mt-1 text-[18px] font-[700]">{getNode(activeNode)?.title}</div>
              <div className="mt-2 text-[14px] leading-[1.5] text-white/80">{getNode(activeNode)?.desc}</div>
              <div className="mt-4 flex flex-wrap gap-2">
                {edges.filter(e => e.from === activeNode || e.to === activeNode).map((e, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1 text-[11px] font-[600]">
                    <span className="w-2 h-2 rounded-full" style={{ background: e.color }} />
                    {e.from === activeNode ? `→ ${getNode(e.to)?.title}` : `${getNode(e.from)?.title} →`} 
                    <span className="opacity-60">{e.label}</span>
                  </span>
                ))}
              </div>
            </div>
            <button onClick={() => setActiveNode(null)} className="w-8 h-8 rounded-full bg-white/10 grid place-items-center text-white/60 hover:bg-white/15">✕</button>
          </div>
        )}

        {/* Flow Steps */}
        <div className="mt-8 grid lg:grid-cols-3 gap-4">
          <div className="bg-white rounded-[24px] p-6 border border-black/5">
            <div className="text-[11px] font-[700] tracking-widest uppercase text-[#8E8E93]">User Journey • 10 Steps</div>
            <div className="mt-4 space-y-2">
              {[
                'Scan QR → https://.../ ?page=assessment',
                'Open website • Learn what app does',
                'Start assessment • 20 Q adaptive M1→M5',
                'VariationEngine • 5,100+ variants, no repeat',
                'Verdict • strengths ≥75%, weaknesses <60%',
                'Path • Personal M1→5, timeline 1-9 months',
                'Practice • Today 15min, SRS Box 0→5',
                'Progress • Weekly, no streaks, retest',
                'PWA • Add to Home Screen → iPhone app',
                'Continue • Works without manual intervention'
              ].map((step, i) => (
                <div key={i} className={`flex gap-3 text-[13px] ${playing && playStep >= i ? 'text-black font-[600]' : 'text-[#8E8E93]'}`}>
                  <span className={`w-6 h-6 rounded-full grid place-items-center text-[11px] font-[700] shrink-0 ${playing && playStep >= i ? 'bg-black text-white' : 'bg-[#F2F2F7] text-[#8E8E93]'}`}>{i+1}</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
            <button onClick={() => setPlaying(true)} className="mt-4 w-full bg-black text-white rounded-full py-3 text-[13px] font-[700]">▶ Play Full Journey</button>
          </div>

          <div className="bg-[#007AFF] text-white rounded-[24px] p-6">
            <div className="text-[11px] font-[700] tracking-widest uppercase opacity-70">Data Flow • Engines</div>
            <div className="mt-4 space-y-3 text-[13px] leading-[1.5]">
              <div><b>1. Question Bank</b> 24 Q → random 15, public no answers, no blank (fixed)</div>
              <div><b>2. VariationEngine</b> hash(user_seed) → different Qs same skill, 4 templates × 6 types = 24, dedupKey 30-day no repeat → 5,100+ variants</div>
              <div><b>3. StageEngine</b> M1 3-6w 200 vocab → M5 15-25w 1354 vocab 2-3 rules combined, genuine difficulty not longer Qs</div>
              <div><b>4. VerdictEngine</b> Beyond %: byCategory, byLevel, strengths, weaknesses, typeWeaknesses, consistency, timePerQ, recommendedPath, timeline object</div>
              <div><b>5. SRS</b> Box 0→5, weak repeats until correct, safe rests 30 days, no repeat via dedupKey</div>
              <div><b>6. WritingEngine</b> Weekly new per module, 30→200 words, dedupKey 60 days</div>
            </div>
          </div>

          <div className="bg-black text-white rounded-[24px] p-6">
            <div className="text-[11px] font-[700] tracking-widest uppercase opacity-60">Deployment • Public Outside Chat</div>
            <div className="mt-4 space-y-3 text-[13px] leading-[1.5]">
              <div><b className="text-[#FF9500]">Cloudflare Tunnel (Live Now)</b><br/><code className="text-[11px] bg-white/10 px-2 py-1 rounded-full">https://trucks-sandy...trycloudflare.com</code><br/>→ localhost:3001, public outside chat, temporary, free</div>
              <div><b className="text-[#007AFF]">Render Permanent (Recommended)</b><br/>render.yaml, Frankfurt, 750h free + 1GB disk, $7/month always-on, custom domain danskpath.app<br/>→ https://danskpath.onrender.com</div>
              <div><b>GitHub</b> vipinsinghdunbar/danskpath, 3 commits, Actions deploy.yml → Pages + trigger Render<br/>→ https://vipinsinghdunbar.github.io/danskpath/</div>
              <div><b>PWA</b> manifest.json, sw.js v4, icons 60→1024, standalone, apple-touch-icon, install banner</div>
              <div><b>Cost</b> Free $0+12/year domain, or $7/month+$12/year=$96/year always-on</div>
            </div>
            <div className="mt-4 flex gap-2">
              <a href="/qr-LIVE-ASSESSMENT.png" download className="flex-1 bg-white text-black rounded-full py-2.5 text-[12px] font-[700] text-center">Download QR</a>
              <button onClick={() => setActive('assessment')} className="flex-1 bg-[#007AFF] text-white rounded-full py-2.5 text-[12px] font-[700]">Open Assessment</button>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-[11px] text-[#8E8E93] pb-10">
          DanskPath • Modul 1→PD3 • A1→B2 Full Education • Architecture Map Interactive • Motion Arrows • Path Animation • Click Nodes for Details • Play Journey<br/>
          Same design system: logo D+speech+blue arrow, Inter, #121417 #007AFF #F2F2F7, black pill buttons, 24-32px cards, spring animation<br/>
          Live Public: https://trucks-sandy-sanyo-tin.trycloudflare.com • E2B: https://5173-ik1t6d5enxwfmhfkhf8wb.e2b.app • GitHub: vipinsinghdunbar/danskpath
        </div>
      </div>

      <style>{`
        @keyframes dash {
          to { stroke-dashoffset: -20; }
        }
      `}</style>
    </div>
  );
}
