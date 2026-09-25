import { useState, useEffect } from 'react';

export default function EphemeralBanner() {
  const [isEphemeral, setIsEphemeral] = useState(false);
  const [host, setHost] = useState('');

  useEffect(()=>{
    const h = window.location.host;
    setHost(h);
    // Detect e2b sandbox or localhost
    if (h.includes('e2b.app') || h.includes('localhost') || h.includes('127.0.0.1')) {
      setIsEphemeral(true);
    }
  },[]);

  if (!isEphemeral) return null;

  return (
    <div className="bg-[#FF9500] text-black text-[12px] leading-[1.4] px-4 py-3 text-center font-[500]">
      <div className="max-w-[1120px] mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
        <span>⚠️ Ephemeral preview — this link dies when chat closes.</span>
        <span className="hidden sm:inline opacity-60">•</span>
        <span>Host: <code className="bg-black/10 px-2 py-0.5 rounded-full font-mono text-[11px]">{host}</code></span>
        <span className="hidden sm:inline opacity-60">•</span>
        <a href="/DEPLOYMENT.md" target="_blank" className="underline font-[700]">Deploy to public →</a>
      </div>
    </div>
  );
}
