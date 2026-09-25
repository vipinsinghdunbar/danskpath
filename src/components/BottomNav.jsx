export default function BottomNav({ active, setActive }) {
  const primary = [
    { id: "practice", label: "Today", icon: "◐", sf: "house.fill" },
    { id: "path", label: "Path", icon: "◍", sf: "map.fill" },
    { id: "grammar", label: "Grammar", icon: "✦", sf: "textformat" },
    { id: "vocab", label: "Words", icon: "✧", sf: "text.book.closed.fill" },
    { id: "listening", label: "Listen", icon: "♪", sf: "waveform" },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 pb-safe px-4 pointer-events-none">
      <div className="mx-auto max-w-[400px] pointer-events-auto">
        <div className="ios-tab-bar flex items-center justify-around px-2 py-2 mb-3">
          {primary.map(item=>{
            const isActive = active===item.id;
            return (
              <button 
                key={item.id} 
                onClick={()=>{ 
                  if(navigator.vibrate) navigator.vibrate(10);
                  setActive(item.id);
                }} 
                className={`flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-full transition-all duration-300 tap-haptic ${isActive?'bg-black text-white shadow-sm':'text-[#8E8E93] hover:text-black'}`}
              >
                <span className={`text-[18px] leading-none ${isActive?'font-bold':''}`}>{item.icon}</span>
                <span className={`text-[10px] font-[600] tracking-wide ${isActive?'text-white':'text-[#8E8E93]'}`}>{item.label}</span>
              </button>
            );
          })}
          <button 
            onClick={()=>setActive('more')} 
            className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-full transition-all tap-haptic ${active==='more'?'bg-black text-white':'text-[#8E8E93]'}`}
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
    { title: "STUDY", items: [
      { id: "landing", label: "Home", desc: "Overview", icon: "🏠" },
      { id: "diagnostic", label: "Level Test", desc: "7 min", icon: "📝" },
      { id: "progress", label: "Progress", desc: "Weekly", icon: "📊" },
      { id: "motivation", label: "Motivation", desc: "No streaks", icon: "💡" },
      { id: "levels", label: "Levels", desc: "M1→PD3", icon: "🎯" },
      { id: "flow", label: "Flow", desc: "How it works", icon: "🗺️" },
      { id: "share", label: "Share", desc: "Invite friend", icon: "↗️" },
    ]},
    { title: "LIBRARY", items: [
      { id: "speaking", label: "Speaking", desc: "18 scenarios", icon: "💬" },
      { id: "reading", label: "Reading", desc: "40 texts", icon: "📖" },
      { id: "writing", label: "Writing", desc: "Weekly new", icon: "✍️" },
      { id: "pronunciation", label: "Pronunciation", desc: "12 weeks", icon: "🗣️" },
      { id: "culture", label: "Culture", desc: "PD3", icon: "🏛️" },
      { id: "exam", label: "Exam", desc: "PD3 format", icon: "🎓" },
      { id: "screenshots", label: "Gallery", desc: "All pages", icon: "🖼️" },
      { id: "audit", label: "Status", desc: "Honest", icon: "✓" },
    ]}
  ];
  return (
    <div className="lg:hidden fixed inset-0 z-50 bg-black/30 backdrop-blur-xl animate-ios-in" onClick={onClose}>
      <div className="absolute bottom-[100px] left-4 right-4 bg-white/95 backdrop-blur-2xl rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.2)] border border-white/20 max-h-[70vh] overflow-hidden flex flex-col" onClick={e=>e.stopPropagation()}>
        <div className="flex justify-between items-center px-6 h-[60px] border-b border-black/[0.06] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-black text-white grid place-items-center text-[12px] font-bold">D</div>
            <div>
              <div className="text-[15px] font-[600] tracking-tight">DanskPath</div>
              <div className="text-[11px] text-[#8E8E93]">All pages • iOS style</div>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-black/5 grid place-items-center text-[14px] hover:bg-black/10 transition">✕</button>
        </div>
        <div className="overflow-y-auto p-4 space-y-6">
          {sections.map(sec=>(
            <div key={sec.title}>
              <div className="text-[11px] font-[700] tracking-widest text-[#8E8E93] mb-3 px-2">{sec.title}</div>
              <div className="bg-[#F2F2F7] rounded-[20px] overflow-hidden">
                {sec.items.map((it,i)=>(
                  <button key={it.id} onClick={()=>{setActive(it.id); onClose(); if(navigator.vibrate) navigator.vibrate(10);}} className="w-full text-left px-4 py-3.5 flex items-center gap-3 hover:bg-white transition tap-haptic border-b border-black/[0.04] last:border-0">
                    <div className="w-8 h-8 rounded-full bg-white shadow-sm grid place-items-center text-[14px]">{it.icon}</div>
                    <div className="flex-1">
                      <div className="text-[15px] font-[500] tracking-tight">{it.label}</div>
                      <div className="text-[12px] text-[#8E8E93]">{it.desc}</div>
                    </div>
                    <div className="text-[#C7C7CC]">›</div>
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
