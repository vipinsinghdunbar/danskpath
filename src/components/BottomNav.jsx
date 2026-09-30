export default function BottomNav({ active, setActive }) {
  const primary = [
    { id: "practice", label: "Today", icon: "◐" },
    { id: "path", label: "Path", icon: "◍" },
    { id: "progress", label: "Progress", icon: "◎" },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 pb-safe px-4 pointer-events-none">
      <div className="mx-auto max-w-[400px] pointer-events-auto">
        <div className="ios-tab-bar flex items-center justify-around px-2 py-2 mb-3 bg-white/80 backdrop-blur-xl rounded-full shadow-lg border border-black/5">
          {primary.map(item=>{
            const isActive = active===item.id;
            return (
              <button 
                key={item.id} 
                onClick={()=>{ 
                  if(navigator.vibrate) navigator.vibrate(10);
                  setActive(item.id);
                }} 
                className={`flex flex-col items-center justify-center gap-1 px-6 py-2 rounded-full transition-all ${isActive?'bg-black text-white shadow-sm':'text-[#8E8E93]'}`}
              >
                <span className="text-[18px] leading-none">{item.icon}</span>
                <span className="text-[10px] font-[600]">{item.label}</span>
              </button>
            );
          })}
          <button 
            onClick={()=>setActive('more')} 
            className={`flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-full ${active==='more'?'bg-black text-white':'text-[#8E8E93]'}`}
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
      { id: "simple-landing", label: "Home", desc: "Find your level", icon: "🏠" },
      { id: "practice", label: "Today", desc: "What to practice", icon: "✦" },
      { id: "path", label: "My Path", desc: "Modul 1→5", icon: "◍" },
      { id: "progress", label: "Progress", desc: "Weekly report", icon: "📊" },
      { id: "diagnostic", label: "Level Test", desc: "7 min", icon: "📝" },
    ]},
  ];
  return (
    <div className="lg:hidden fixed inset-0 z-50 bg-black/30 backdrop-blur-xl" onClick={onClose}>
      <div className="absolute bottom-[100px] left-4 right-4 bg-white/95 backdrop-blur-2xl rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.2)] border border-white/20 max-h-[60vh] overflow-hidden flex flex-col" onClick={e=>e.stopPropagation()}>
        <div className="flex justify-between items-center px-6 h-[60px] border-b border-black/[0.06] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-black text-white grid place-items-center text-[12px] font-bold">D</div>
            <div>
              <div className="text-[15px] font-[600] tracking-tight">DanskPath</div>
              <div className="text-[11px] text-[#8E8E93]">Learn Danish • 15 min a day</div>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-black/5 grid place-items-center text-[14px]">✕</button>
        </div>
        <div className="overflow-y-auto p-4 space-y-6">
          {sections.map(sec=>(
            <div key={sec.title}>
              <div className="text-[11px] font-[700] tracking-widest text-[#8E8E93] mb-3 px-2">{sec.title}</div>
              <div className="bg-[#F2F2F7] rounded-[20px] overflow-hidden">
                {sec.items.map((it)=>(
                  <button key={it.id} onClick={()=>{setActive(it.id); onClose(); if(navigator.vibrate) navigator.vibrate(10);}} className="w-full text-left px-4 py-3.5 flex items-center gap-3 hover:bg-white transition border-b border-black/[0.04] last:border-0">
                    <div className="w-8 h-8 rounded-full bg-white shadow-sm grid place-items-center text-[14px]">{it.icon}</div>
                    <div className="flex-1">
                      <div className="text-[15px] font-[500]">{it.label}</div>
                      <div className="text-[12px] text-[#8E8E93]">{it.desc}</div>
                    </div>
                    <div className="text-[#C7C7CC]">›</div>
                  </button>
                ))}
              </div>
            </div>
          ))}
          <div className="text-center text-[11px] text-[#8E8E93] py-2">
            15 min a day • No account needed to start
          </div>
        </div>
      </div>
    </div>
  );
}
