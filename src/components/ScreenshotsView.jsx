import { useState } from 'react';

const pages = [
  { id: 'landing', name: 'Forside (Landing)', desc: 'Hvad er DanskPath, 3 flaskehalse, 8 søjler, CTA til test' },
  { id: 'share', name: 'Del 15-min trial', desc: 'Invitér ven, QR, WhatsApp, DB tracking, reward flow' },
  { id: 'diagnostic', name: 'Niveau-test', desc: '15 spørgsmål, engelsk først, grunde på hvert svar, timer' },
  { id: 'practice', name: 'Øv (Anbefalet)', desc: 'Adaptiv anbefaling baseret på svagheder, ingen gentagelse' },
  { id: 'path', name: 'Læringssti', desc: 'Modul 1→PD3 med tracking, done/total, Du er her' },
  { id: 'grammar', name: 'Grammatik 761 items', desc: 'Original bank, 17 emner, 14 dage no-repeat, svage-mode' },
  { id: 'vocab', name: 'Ordforråd 1052', desc: 'Kollokationer + SRS Box 0-5, partikelverber' },
  { id: 'listening', name: 'Lytning 26', desc: 'Telefon, DSB, DR, multi, reduktionsordbog, tracking ✓' },
  { id: 'speaking', name: 'Samtale 18', desc: 'Voice input, PD3 mundtlig billede/monolog/diskussion' },
  { id: 'reading', name: 'Læsning 40', desc: 'A1 skilte → B2 debat, tap ord for lyd, gapped+cloze' },
  { id: 'writing', name: 'Skrivning 8', desc: 'A1→B2, V2/bindeord tjek, AI-feedback med nøgle' },
  { id: 'pronunciation', name: 'Udtale 12 uger', desc: 'Blødt d, stød, r, reduktioner, self-recording' },
  { id: 'culture', name: 'Kultur 10', desc: 'PD3 Del 1, demokrati, velfærd, historie, arbejdsliv' },
  { id: 'exam', name: 'Eksamen PD3', desc: '6 delprøver, timer simulation, format forklaring' },
  { id: 'progress', name: 'Fremskridt', desc: 'Ærlig dashboard, ingen streaks, uge-rapport' },
  { id: 'motivation', name: 'Motivation', desc: 'Pace til PD3, heatmap uden skam, can-do sejre, real-world unlocks, refleksion' },
  { id: 'flow', name: 'Flow diagram', desc: 'User journey, beslutningstræ, SRS, ingen gamification' },
  { id: 'levels', name: 'Niveauer & krav', desc: 'Modul 1→PD3 1354 ord, skrive, lytte, kultur — hvad mangler' },
  { id: 'connect', name: 'Forbind enheder', desc: 'Laptop + iPhone, QR, export/import sync' },
  { id: 'audit', name: 'Coverage Audit', desc: 'Live counts fra kodebasen, ærlig status' },
  { id: 'original', name: 'Original single-file', desc: '656KB standalone, 761 items, offline' },
];

export default function ScreenshotsView({ setActive }) {
  const [selected, setSelected] = useState(pages[0]);
  const [viewMode, setViewMode] = useState('desktop'); // desktop, mobile

  return (
    <div className="p-4 lg:p-8 max-w-[1400px] mx-auto pb-[100px] space-y-6">
      <div>
        <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest bg-[#121417] text-white px-3 py-1 rounded-full">Screenshots • alle sider • interaktiv</div>
        <h1 className="display text-[32px] font-bold leading-tight mt-3">Alle sider — klik for at åbne live</h1>
        <p className="text-[13px] text-[#6B7280] mt-2">Hver screenshot er taget fra den kørende app. Klik på en side for at åbne den live i appen. Desktop + mobile.</p>
        <div className="mt-4 flex gap-2">
          <button onClick={()=>setViewMode('desktop')} className={`px-4 py-2 rounded-full text-[12px] border ${viewMode==='desktop'?'bg-[#121417] text-white border-[#121417]':'bg-white border-[#E8E2D9]'}`}>Desktop (1280px)</button>
          <button onClick={()=>setViewMode('mobile')} className={`px-4 py-2 rounded-full text-[12px] border ${viewMode==='mobile'?'bg-[#121417] text-white border-[#121417]':'bg-white border-[#E8E2D9]'}`}>Mobile (390px)</button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[320px_1fr] gap-6">
        <div className="space-y-1 max-h-[80vh] overflow-y-auto">
          {pages.map(p=>(
            <button key={p.id} onClick={()=>setSelected(p)} className={`w-full text-left p-3 rounded-xl border ${selected.id===p.id?'bg-[#121417] text-white border-[#121417]':'bg-white border-[#E8E2D9] hover:border-[#121417]'}`}>
              <div className="text-[13px] font-medium">{p.name}</div>
              <div className={`text-[11px] mt-1 leading-snug ${selected.id===p.id?'text-white/60':'text-[#6B7280]'}`}>{p.desc}</div>
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-display font-semibold text-[18px]">{selected.name} — {viewMode}</h2>
            <button onClick={()=>setActive(selected.id)} className="btn-accent text-[12px]">Åbn live → {selected.id}</button>
          </div>
          <div className="card p-2 bg-[#F8F6F1] overflow-auto max-h-[80vh]">
            <img src={`/screenshots/${selected.id}${viewMode==='mobile' ? '-mobile' : ''}.png`} alt={selected.name} className="w-full rounded-xl border border-[#E8E2D9] shadow-sm" onError={e=>{
              // fallback to desktop if mobile missing
              if(viewMode==='mobile') e.target.src=`/screenshots/${selected.id}.png`;
            }} />
          </div>
          <div className="text-[11px] text-[#6B7280]">Screenshot fra {viewMode} • Taget med Playwright Chromium • Interaktiv: klik "Åbn live" for at prøve siden i appen (med tracking, ingen gentagelse, PWA).</div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {pages.map(p=>(
          <div key={p.id} className="card p-2">
            <img src={`/screenshots/${p.id}.png`} alt={p.id} className="w-full h-[160px] object-cover object-top rounded-lg border border-[#E8E2D9]" />
            <div className="mt-2 text-[11px] font-medium truncate">{p.name}</div>
            <button onClick={()=>{ setSelected(p); setViewMode('desktop'); window.scrollTo(0,0); }} className="mt-1 text-[10px] px-2 py-1 rounded-full bg-[#F8F6F1] border border-[#E8E2D9]">Vis stor</button>
          </div>
        ))}
      </div>
    </div>
  );
}
