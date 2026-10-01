import { useState, useEffect } from 'react';
import BrandLogo from './BrandLogo';
import { isAdmin } from '../lib/auth';
import { HomeIcon, PathIcon, PracticeIcon, ProgressIcon, BookIcon, SettingsIcon, UserIcon } from '../lib/icons.jsx';

// Sidebar — Premium and easy per Action Plan Phase 4
// One icon family stroke, no emoji, PRODUCT only for admin role, basic person only Today My Path Progress Level Test
// 900px and wider sidebar navigation, exercises and reading centred at 640px, 1180px Path two columns

export default function Sidebar({ active, setActive, onSettings }) {
  const [admin, setAdmin] = useState(false);
  useEffect(()=>{ setAdmin(isAdmin()); },[active]);

  const learnerSections = [
    {
      title: "LEARN",
      items: [
        { id: "path", label: "My Path", meta: "M3→5", Icon: PathIcon, desc: "Your path Modul 3→5 PD3 stretch" },
        { id: "practice", label: "Up next", meta: "15 min", Icon: PracticeIcon, desc: "Exercise with reason" },
        { id: "progress", label: "Progress", meta: "Honest", Icon: ProgressIcon, desc: "Continue ring + 3 numbers" },
        { id: "diagnostic", label: "Level Test", meta: "5 min", Icon: PathIcon, desc: "Starting point range retake" },
      ]
    },
    {
      title: "LIBRARY M3→5",
      items: [
        { id: "grammar", label: "Grammar", meta: "Infinite", Icon: BookIcon },
        { id: "vocab", label: "Words", meta: "SRS", Icon: BookIcon },
        { id: "listening", label: "Listening", meta: "No transcript", Icon: BookIcon },
        { id: "speaking", label: "Conversation", meta: "18", Icon: BookIcon },
        { id: "writing", label: "Writing", meta: "Weekly", Icon: BookIcon },
      ]
    },
  ];

  const adminSections = [
    {
      title: "PRODUCT (admin only)",
      items: [
        { id: "website", label: "Website", meta: "Public", Icon: HomeIcon, desc: "Marketing only hidden from learner" },
        { id: "assessment", label: "Assessment", meta: "Shareable", Icon: PathIcon, desc: "QR + link" },
        { id: "system-flow", label: "System Flow", meta: "3 flows", Icon: PathIcon, desc: "Flow A B C" },
      ]
    },
  ];

  const sections = admin ? [...learnerSections, ...adminSections] : learnerSections;

  return (
    <div className="w-[300px] shrink-0 h-screen sticky top-0 bg-[var(--bg-card)]/80 backdrop-blur-2xl border-r border-[var(--border)] flex flex-col overflow-hidden hidden lg:flex">
      <div className="px-6 pt-8 pb-6">
        <div className="flex items-center gap-3">
          <BrandLogo variant="icon" size={40} />
          <div>
            <div className="text-[11px] font-[700] tracking-widest uppercase text-[var(--muted)]">DanskPath</div>
            <div className="text-[15px] font-[700] tracking-tight leading-none mt-0.5">Modul 3 → 5 • PD3 stretch</div>
          </div>
          <button onClick={onSettings} className="ml-auto w-8 h-8 rounded-full bg-white shadow-sm border border-[var(--border)] grid place-items-center hover:bg-[var(--ink)] hover:text-white transition" aria-label="Settings">
            <SettingsIcon className="w-4 h-4" />
          </button>
        </div>
        <div className="mt-4 bg-[var(--ink)] text-white rounded-[12px] p-3 flex items-center justify-between">
          <span className="text-[10px] font-[700] tracking-widest uppercase opacity-60">Flow</span>
          <span className="text-[11px] font-[600]">3 flows • Up next loop</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-6">
        {sections.map(sec=>(
          <div key={sec.title}>
            <div className="px-3 mb-2 text-[11px] font-[700] tracking-widest uppercase text-[var(--muted)]">{sec.title}</div>
            <div className="bg-white rounded-[12px] overflow-hidden shadow-sm border border-[var(--border)]">
              {sec.items.map(item=>{
                const isActive = active===item.id;
                return (
                  <button
                    key={item.id}
                    onClick={()=>{ if(navigator.vibrate) navigator.vibrate(10); setActive(item.id); }}
                    className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-all border-b border-[var(--border)] last:border-0 min-h-[56px] ${isActive ? 'bg-[var(--ink)] text-white' : 'hover:bg-[var(--bg)] text-[var(--ink-secondary)]'}`}
                  >
                    <span className={`w-7 h-7 rounded-full grid place-items-center ${isActive?'bg-white text-black':'bg-[var(--bg)] text-[var(--muted)] border border-[var(--border)]'}`}><item.Icon className="w-4 h-4" /></span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[14px] font-[600] tracking-tight">{item.label}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${isActive?'bg-white text-black':'bg-[var(--bg)] border border-[var(--border)]'}`}>{item.meta}</span>
                      </div>
                      {item.desc && <div className={`text-[11px] mt-0.5 truncate ${isActive?'text-white/60':'text-[var(--muted)]'}`}>{item.desc}</div>}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-[var(--border)]">
        <div className="text-[11px] text-[var(--muted)]">Premium and easy • One accent • One icon family • Two type voices • Generous 4pt grid 16px gutters • One shadow • Radii 12/16/22 • Quiet motion 120/220/340</div>
      </div>
    </div>
  );
}
