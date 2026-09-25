import BrandLogo from './BrandLogo';

const sections = [
  {
    title: "PRODUCT",
    items: [
      { id: "website", label: "Website", meta: "Public", icon: "◐", desc: "Marketing + intro" },
      { id: "assessment", label: "Assessment", meta: "Shareable", icon: "◑", desc: "QR + link" },
      { id: "share", label: "Share QR", meta: "QR code", icon: "↗", desc: "For LinkedIn etc" },
    ]
  },
  {
    title: "IPHONE APP — LEARN",
    items: [
      { id: "practice", label: "Today", meta: "15 min", icon: "✦" },
      { id: "path", label: "Path", meta: "M1→5", icon: "◍" },
      { id: "diagnostic", label: "Level Test", meta: "7 min", icon: "◑" },
      { id: "progress", label: "Progress", meta: "Weekly", icon: "◎" },
    ]
  },
  {
    title: "LIBRARY M1→PD3",
    items: [
      { id: "grammar", label: "Grammar", meta: "Infinite", icon: "✎" },
      { id: "vocab", label: "Words", meta: "SRS", icon: "✧" },
      { id: "listening", label: "Listening", meta: "PD3", icon: "♪" },
      { id: "speaking", label: "Speaking", meta: "18", icon: "◐" },
      { id: "reading", label: "Reading", meta: "PD3", icon: "◑" },
      { id: "writing", label: "Writing", meta: "Weekly", icon: "✍" },
      { id: "pronunciation", label: "Pronounce", meta: "12w", icon: "◍" },
      { id: "culture", label: "Culture", meta: "PD3", icon: "◎" },
      { id: "exam", label: "Exam", meta: "PD3", icon: "✦" },
    ]
  },
  {
    title: "SYSTEM",
    items: [
      { id: "levels", label: "Levels M1→5", meta: "How hard", icon: "🎯" },
      { id: "flow", label: "Flow", meta: "Architecture", icon: "🗺️" },
      { id: "motivation", label: "Motivation", meta: "No streaks", icon: "💡" },
      { id: "audit", label: "Status", meta: "Honest", icon: "✓" },
    ]
  }
];

export default function Sidebar({ active, setActive, onSettings }) {
  return (
    <div className="w-[300px] shrink-0 h-screen sticky top-0 bg-[#F2F2F7]/80 backdrop-blur-2xl border-r border-black/5 flex flex-col overflow-hidden hidden lg:flex">
      {/* Header — iOS style with new logo */}
      <div className="px-6 pt-8 pb-6">
        <div className="flex items-center gap-3">
          <BrandLogo variant="icon" size={40} />
          <div>
            <div className="text-[11px] font-[700] tracking-widest uppercase text-[#8E8E93]">DanskPath</div>
            <div className="text-[17px] font-[800] tracking-tight leading-none mt-0.5">Modul 1 → PD3</div>
          </div>
          <button onClick={onSettings} className="ml-auto w-8 h-8 rounded-full bg-white shadow-sm border border-black/5 grid place-items-center text-[12px] hover:bg-black hover:text-white transition">⚙</button>
        </div>
        <div className="mt-4 bg-black text-white rounded-[16px] p-3 shadow-sm flex items-center justify-between">
          <span className="text-[10px] font-[700] tracking-widest uppercase opacity-60">3 experiences</span>
          <span className="text-[11px] font-[600]">Website • Assessment • iPhone App</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-6">
        {sections.map(sec=>(
          <div key={sec.title}>
            <div className="px-3 mb-2 text-[11px] font-[700] tracking-widest uppercase text-[#8E8E93]">{sec.title}</div>
            <div className="bg-white rounded-[20px] overflow-hidden shadow-sm border border-black/5">
              {sec.items.map(item=>{
                const isActive = active===item.id;
                return (
                  <button
                    key={item.id}
                    onClick={()=>{ if(navigator.vibrate) navigator.vibrate(10); setActive(item.id); }}
                    className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-all border-b border-black/5 last:border-0 tap-haptic ${isActive ? 'bg-black text-white' : 'hover:bg-[#F2F2F7] text-[#1C1C1E]'}`}
                  >
                    <span className={`w-7 h-7 rounded-full grid place-items-center text-[12px] ${isActive?'bg-white text-black':'bg-[#F2F2F7] text-[#8E8E93]'}`}>{item.icon}</span>
                    <span className={`text-[14px] tracking-tight flex-1 ${isActive?'font-[600]':'font-[500]'}`}>{item.label}</span>
                    <span className={`text-[11px] px-2 py-0.5 rounded-full ${isActive?'bg-white/20 text-white':'bg-[#F2F2F7] text-[#8E8E93]'}`}>{item.meta}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="px-5 py-5">
        <div className="bg-white rounded-[20px] p-4 shadow-sm border border-black/5">
          <div className="text-[11px] font-[700] tracking-widest uppercase text-[#8E8E93]">Architecture</div>
          <div className="mt-2 text-[11px] leading-[1.4] font-mono">
            <div>WEBSITE → ASSESSMENT → APP</div>
            <div className="mt-1 text-[#8E8E93]">Same design system</div>
            <div className="text-[#8E8E93]">Shared account system</div>
            <div className="text-[#8E8E93]">Admin isolated</div>
          </div>
          <div className="mt-3 text-[10px] font-[600] tracking-widest uppercase text-[#8E8E93]">No streaks • No hearts • Just work</div>
        </div>
      </div>
    </div>
  );
}
