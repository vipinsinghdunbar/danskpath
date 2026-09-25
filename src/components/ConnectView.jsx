import { useState, useEffect } from 'react';

export default function ConnectView() {
  const [url, setUrl] = useState('');
  const [progressJson, setProgressJson] = useState('');
  const [importText, setImportText] = useState('');

  useEffect(()=>{
    setUrl(window.location.origin);
    const all = {
      diagnostic: localStorage.getItem('dansk_diagnostic'),
      level: localStorage.getItem('dansk_level'),
      progress: localStorage.getItem('dansk_progress'),
      scores: localStorage.getItem('dansk_scores'),
      srs: localStorage.getItem('dansk_srs'),
      seen: localStorage.getItem('dansk_seen'),
      weak: localStorage.getItem('dansk_weak'),
      used_listening: localStorage.getItem('dansk_used_listening'),
      path: localStorage.getItem('dansk_path'),
      llm: localStorage.getItem('dansk_llm'),
    };
    setProgressJson(JSON.stringify(all, null, 2));
  },[]);

  const exportData = () => {
    const blob = new Blob([progressJson], { type: 'application/json' });
    const u = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = u;
    a.download = `danskpath-backup-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
  };

  const importData = () => {
    try {
      const data = JSON.parse(importText);
      Object.entries(data).forEach(([k,v])=>{
        if(v) localStorage.setItem(k.startsWith('dansk_') ? k : `dansk_${k}`, typeof v==='string' ? v : JSON.stringify(v));
        if(k==='level') localStorage.setItem('dansk_level', v);
        if(k==='diagnostic') localStorage.setItem('dansk_diagnostic', typeof v==='string'? v : JSON.stringify(v));
      });
      // Also handle flat keys
      if(data.diagnostic) localStorage.setItem('dansk_diagnostic', data.diagnostic);
      if(data.level) localStorage.setItem('dansk_level', data.level);
      if(data.progress) localStorage.setItem('dansk_progress', data.progress);
      if(data.scores) localStorage.setItem('dansk_scores', data.scores);
      if(data.srs) localStorage.setItem('dansk_srs', data.srs);
      if(data.seen) localStorage.setItem('dansk_seen', data.seen);
      if(data.weak) localStorage.setItem('dansk_weak', data.weak);
      if(data.path) localStorage.setItem('dansk_path', data.path);
      alert('Importeret! Genindlæser...');
      window.location.reload();
    } catch(e) { alert('Fejl: '+e.message); }
  };

  const copyUrl = () => { navigator.clipboard.writeText(url); alert('Link kopieret!'); };

  return (
    <div className="p-4 lg:p-8 max-w-[900px] mx-auto pb-[100px] space-y-6">
      <div>
        <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest bg-[#121417] text-white px-3 py-1 rounded-full">Forbind laptop + iPhone</div>
        <h1 className="display text-[32px] font-bold leading-tight mt-3">Brug DanskPath overalt</h1>
        <p className="mt-2 text-[14px] text-[#6B7280] leading-relaxed">Din nuværende session kører i skyen. Du kan åbne den på laptop, iPhone, iPad — samme link. Data ligger i browserens localStorage, så du skal eksportere/importere indtil backend (Supabase) er klar.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="font-display font-semibold text-[16px]">1. Åbn på din laptop lige nu</h3>
          <div className="mt-3 text-[13px] leading-relaxed space-y-3">
            <div>Dette er dit live link (virker på laptop + iPhone så længe denne session kører):</div>
            <div className="flex gap-2">
              <code className="flex-1 bg-[#F8F6F1] border border-[#E8E2D9] px-3 py-2 rounded-xl text-[12px] break-all">{url}</code>
              <button onClick={copyUrl} className="btn-ghost text-[12px] shrink-0">Kopiér</button>
            </div>
            <div className="bg-[#EEF2FB] border border-[#D6E0F5] rounded-xl p-3 text-[12px]">
              <b>På laptop:</b> Åbn linket i Chrome/Edge. Det er den nye React-app med landing → test → sti.<br/>
              <b>På iPhone:</b> Åbn linket i <b>Safari</b> → Del-ikon → "Føj til hjemmeskærm" → nu som app-ikon.
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-[13px] font-medium">QR til iPhone — scan med kamera</h4>
            <div className="mt-3 flex gap-4 items-start">
              <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`} alt="QR" className="w-[160px] h-[160px] border border-[#E8E2D9] rounded-xl" />
              <div className="text-[11px] text-[#6B7280] leading-snug">Scan med iPhone kamera → åbn i Safari → Føj til hjemmeskærm. Chrome på iOS kan ikke installere PWA ordentligt — brug Safari.</div>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="font-display font-semibold text-[16px]">2. Kør på din egen laptop (permanent)</h3>
          <div className="mt-3 text-[13px] leading-relaxed space-y-3">
            <div><b>Mulighed A: Uden server (nemmest)</b><br/>Brug <code>danskpath-standalone.html</code> — enkelt fil, 656KB, virker offline. Dobbeltklik → åbner i browser. Kopiér til iPhone via AirDrop, åbn i Safari.</div>
            <div><b>Mulighed B: React-app lokalt</b><br/>
              <code className="block bg-[#121417] text-white px-3 py-2 rounded-xl text-[11px] mt-1">
                unzip danskpath-laptop.zip<br/>
                cd danskpath<br/>
                npm install<br/>
                npm run dev -- --host 0.0.0.0<br/>
              </code>
              Så åbn på laptop: <code>http://localhost:5173</code><br/>
              På iPhone (samme WiFi): <code>http://[din-laptop-ip]:5173</code> — find IP via `ipconfig` (Windows) eller `ifconfig` (Mac).
            </div>
            <div><b>Mulighed C: Deploy permanent link</b><br/>
              <code className="block bg-[#F8F6F1] border border-[#E8E2D9] px-3 py-2 rounded-xl text-[11px] mt-1">
                npm run build<br/>
                # træk dist/ til netlify.com/drop<br/>
                # eller vercel --prod
              </code>
              Så har du `https://danskpath.dk` der virker overalt, altid.
            </div>
          </div>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="font-display font-semibold text-[16px]">3. Synkronisér laptop ↔ iPhone (indtil backend)</h3>
        <p className="text-[12px] text-[#6B7280] mt-1">Data ligger i localStorage per browser. Eksporter fra én enhed, importer på den anden. Ingen data sendes til server.</p>
        <div className="mt-4 grid lg:grid-cols-2 gap-4">
          <div>
            <div className="text-[12px] font-medium mb-2">Eksporter (fra denne enhed)</div>
            <button onClick={exportData} className="btn-primary text-[12px]">Download backup JSON</button>
            <details className="mt-3"><summary className="text-[11px] text-[#6B7280] cursor-pointer">Vis JSON</summary><pre className="mt-2 bg-[#F8F6F1] border border-[#E8E2D9] p-3 rounded-xl text-[10px] max-h-[200px] overflow-auto">{progressJson.slice(0,3000)}</pre></details>
          </div>
          <div>
            <div className="text-[12px] font-medium mb-2">Importer (på anden enhed)</div>
            <textarea value={importText} onChange={e=>setImportText(e.target.value)} placeholder="Indsæt JSON her..." className="w-full h-[120px] px-3 py-2 rounded-xl border border-[#E8E2D9] bg-[#F8F6F1] text-[11px] font-mono" />
            <button onClick={importData} className="mt-2 btn-ghost text-[12px]">Importer og genindlæs</button>
          </div>
        </div>
        <div className="mt-4 text-[11px] text-[#6B7280] bg-amber-50 border border-amber-200 rounded-xl p-3">
          <b>Phase 5 (næste):</b> Supabase backend → rigtig login, progress følger dig på tværs af enheder, lærer-dashboard. Indtil da: brug export/import eller samme enhed. Original `sync.js` spejler allerede til Claude artifact private doc når siden kører som artifact.
        </div>
      </div>

      <div className="card p-5 bg-[#121417] text-white">
        <h3 className="font-display font-semibold">Hvad er forskellen på de to versioner?</h3>
        <div className="mt-3 grid lg:grid-cols-2 gap-4 text-[12px] leading-relaxed text-white/80">
          <div><b className="text-white">Ny React-app (denne):</b> Landing → test → evaluering → sti med tracking, ingen gentagelse (14 dage + SRS), bottom nav, PWA, 1052 ord, 761 grammatik-items, 26 lytning, 18 samtale incl. PD3 mundtlig.</div>
          <div><b className="text-white">Original single-file (danskpath-standalone.html):</b> 656KB, ingen server, virker offline, samme 14-dages no-repeat logik fra platform.js, 761 items, perfekt til iPhone via AirDrop.</div>
        </div>
      </div>
    </div>
  );
}
