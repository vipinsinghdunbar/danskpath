import { HomeIcon, PathIcon, PracticeIcon, ProgressIcon, BookIcon } from '../lib/icons.jsx';

// BottomNav — Premium and easy per Action Plan Phase 4
// Phone first 390px full-width 16px gutters bottom tab bar translucent material four areas: Path, Practice, Conversation, Progress
// Touch targets at least 44px, respect safe-area insets on iPhone, reuse ds.css, one icon family no emoji, consistent radii 12/16/22, quiet motion 120/220/340

export default function BottomNav({ active, setActive }) {
  const primary = [
    { id: "path", label: "Path", Icon: PathIcon },
    { id: "practice", label: "Up next", Icon: PracticeIcon },
    { id: "speaking", label: "Conversation", Icon: BookIcon },
    { id: "progress", label: "Progress", Icon: ProgressIcon },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 pb-[env(safe-area-inset-bottom)] px-4 pointer-events-none">
      <div className="mx-auto max-w-[400px] pointer-events-auto">
        <div className="bg-white/80 backdrop-blur-2xl border border-[var(--border)] rounded-full flex items-center justify-around px-2 py-2 mb-3 shadow-[var(--shadow-sheet)]">
          {primary.map(item=>{
            const isActive = active===item.id;
            return (
              <button 
                key={item.id} 
                onClick={()=>{ 
                  if(navigator.vibrate) navigator.vibrate(10);
                  setActive(item.id);
                }} 
                className={`flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-full transition-all duration-[220ms] min-w-[44px] min-h-[44px] ${isActive?'bg-[var(--ink)] text-white shadow-sm':'text-[var(--muted)] hover:text-[var(--ink)]'}`}
                aria-label={item.label}
              >
                <item.Icon className="w-5 h-5" />
                <span className={`text-[10px] font-[600] tracking-wide ${isActive?'text-white':'text-[var(--muted)]'}`}>{item.label}</span>
              </button>
            );
          })}
          <button 
            onClick={()=>setActive('more')} 
            className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-full transition-all min-w-[44px] min-h-[44px] ${active==='more'?'bg-[var(--ink)] text-white':'text-[var(--muted)]'}`}
            aria-label="More"
          >
            <span className="text-[16px]">•••</span>
            <span className="text-[10px] font-[600]">More</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export function MoreSheet({ active, setActive, onClose }) {
  if(active!=='more') return null;
  const sections = [
    { title: "LEARN", items: [
      { id: "diagnostic", label: "Level Test", desc: "5-min check", Icon: PathIcon },
      { id: "grammar", label: "Grammar", desc: "Infinite variants", Icon: BookIcon },
      { id: "vocab", label: "Words", desc: "SRS", Icon: BookIcon },
      { id: "listening", label: "Listening", desc: "Without transcript", Icon: BookIcon },
      { id: "writing", label: "Writing", desc: "Weekly", Icon: BookIcon },
    ]},
    { title: "SYSTEM", items: [
      { id: "simple-landing", label: "Home", desc: "Find your level", Icon: HomeIcon },
      { id: "privacy", label: "Privacy", desc: "EU notice", Icon: BookIcon },
      { id: "progress", label: "Progress", desc: "Honest numbers", Icon: ProgressIcon },
    ]}
  ];
  return (
    <div className="lg:hidden fixed inset-0 z-50 bg-black/30 backdrop-blur-xl" onClick={onClose}>
      <div className="absolute bottom-[100px] left-4 right-4 bg-white/95 backdrop-blur-2xl rounded-[22px] shadow-[var(--shadow-sheet)] border border-white/20 max-h-[70vh] overflow-hidden flex flex-col" onClick={e=>e.stopPropagation()}>
        <div className="flex justify-between items-center px-6 h-[60px] border-b border-[var(--border)] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[var(--ink)] text-white grid place-items-center text-[12px] font-bold">D</div>
            <div>
              <div className="text-[15px] font-[600] tracking-tight">DanskPath</div>
              <div className="text-[11px] text-[var(--muted)]">All pages • iOS style • One icon family</div>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-[var(--bg)] grid place-items-center text-[14px] hover:bg-[var(--border)] transition">✕</button>
        </div>
        <div className="overflow-y-auto p-4 space-y-6">
          {sections.map(sec=>(
            <div key={sec.title}>
              <div className="text-[11px] font-[700] tracking-widest text-[var(--muted)] mb-3 px-2">{sec.title}</div>
              <div className="bg-[var(--bg)] rounded-[12px] overflow-hidden border border-[var(--border)]">
                {sec.items.map((it)=>(
                  <button key={it.id} onClick={()=>{setActive(it.id); onClose(); if(navigator.vibrate) navigator.vibrate(10);}} className="w-full text-left px-4 py-3.5 flex items-center gap-3 hover:bg-white transition border-b border-[var(--border)] last:border-0 min-h-[56px]">
                    <div className="w-8 h-8 rounded-full bg-white shadow-sm grid place-items-center border border-[var(--border)]"><it.Icon className="w-4 h-4" /></div>
                    <div className="flex-1">
                      <div className="text-[15px] font-[500] tracking-tight">{it.label}</div>
                      <div className="text-[12px] text-[var(--muted)]">{it.desc}</div>
                    </div>
                    <div className="text-[var(--muted)]">›</div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
