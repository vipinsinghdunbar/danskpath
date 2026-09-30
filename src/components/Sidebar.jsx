import BrandLogo from './BrandLogo';
import { isAdmin } from '../lib/auth';

const learnerSections = [
  {
    title: "LEARN",
    items: [
      { id: "practice", label: "Today", meta: "15 min", icon: "✦" },
      { id: "path", label: "My Path", meta: "M1→5", icon: "◍" },
      { id: "progress", label: "Progress", meta: "Weekly", icon: "◎" },
      { id: "diagnostic", label: "Level Test", meta: "7 min", icon: "◑" },
    ]
  }
];

const adminSections = [
  {
    title: "PRODUCT — Admin only",
    items: [
      { id: "website", label: "Website", meta: "Public", icon: "◐" },
      { id: "assessment", label: "Assessment", meta: "Shareable", icon: "◑" },
      { id: "architecture", label: "Architecture Map", meta: "Dev", icon: "🗺️" },
      { id: "roadmap", label: "Roadmap", meta: "Dev", icon: "🛣️" },
      { id: "share", label: "Share QR", meta: "Dev", icon: "↗" },
    ]
  },
  {
    title: "LEARN",
    items: [
      { id: "practice", label: "Today", meta: "15 min", icon: "✦" },
      { id: "path", label: "Path", meta: "M1→5", icon: "◍" },
      { id: "diagnostic", label: "Level Test", meta: "7 min", icon: "◑" },
      { id: "progress", label: "Progress", meta: "Weekly", icon: "◎" },
    ]
  }
];

export default function Sidebar({ active, setActive, onSettings }) {
  const showAdmin = isAdmin();
  const sections = showAdmin ? adminSections : learnerSections;

  return (
    <div className="w-[300px] shrink-0 h-screen sticky top-0 bg-[#F2F2F7]/80 backdrop-blur-2xl border-r border-black/5 flex flex-col overflow-hidden hidden lg:flex">
      <div className="px-6 pt-8 pb-6">
        <div className="flex items-center gap-3">
          <BrandLogo variant="icon" size={40} />
          <div>
            <div className="text-[11px] font-[700] tracking-widest uppercase text-[#8E8E93]">DanskPath</div>
            <div className="text-[17px] font-[800] tracking-tight leading-none mt-0.5">Learn Danish</div>
          </div>
          <button onClick={onSettings} className="ml-auto w-8 h-8 rounded-full bg-white shadow-sm border border-black/5 grid place-items-center text-[12px] hover:bg-black hover:text-white transition">⚙</button>
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
                    className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-all border-b border-black/5 last:border-0 ${isActive ? 'bg-black text-white' : 'hover:bg-[#F2F2F7] text-[#1C1C1E]'}`}
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
        <div className="text-[11px] text-[#8E8E93] text-center">
          15 min a day • No account needed to start
        </div>
      </div>
    </div>
  );
}
