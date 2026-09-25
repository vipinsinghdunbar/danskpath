import { useState, useEffect } from 'react';

export default function PWAInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(()=>{
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    setIsIOS(iOS);
    const standalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
    setIsStandalone(standalone);

    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      if (!standalone) setShowBanner(true);
    };
    window.addEventListener('beforeinstallprompt', handler);

    // Show iOS banner if not installed and not dismissed recently
    const dismissed = localStorage.getItem('pwa_banner_dismissed');
    const dismissedTime = dismissed ? parseInt(dismissed) : 0;
    const oneWeek = 7*24*60*60*1000;
    if (iOS && !standalone && Date.now() - dismissedTime > oneWeek) {
      setTimeout(()=>setShowBanner(true), 2000);
    }

    return ()=> window.removeEventListener('beforeinstallprompt', handler);
  },[]);

  if (isStandalone || !showBanner) return null;

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShowBanner(false);
      }
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    localStorage.setItem('pwa_banner_dismissed', Date.now().toString());
    setShowBanner(false);
  };

  return (
    <div className="fixed bottom-[84px] lg:bottom-6 inset-x-4 lg:left-1/2 lg:-translate-x-1/2 lg:max-w-[420px] z-[100] animate-[slideUp_0.5s_cubic-bezier(0.16,1,0.3,1)]">
      <div className="bg-black text-white rounded-[24px] p-5 shadow-[0_16px_48px_rgba(0,0,0,0.3)] border border-white/10">
        <div className="flex gap-4">
          <div className="w-12 h-12 bg-white rounded-[12px] grid place-items-center shrink-0">
            <div className="w-8 h-8 bg-black rounded-[8px] grid place-items-center text-white text-[12px] font-[800]">D</div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[15px] font-[700] leading-[1.2]">Add DanskPath to Home Screen</div>
            <div className="mt-1 text-[13px] leading-[1.4] text-white/70">
              {isIOS ? (
                <>Tap <span className="inline-flex items-center justify-center w-5 h-5 bg-white/15 rounded-[4px] text-[10px]">⎙</span> Share → <span className="text-white">Add to Home Screen</span> for app-like experience</>
              ) : (
                <>Install as app for offline, fullscreen, and fast loading</>
              )}
            </div>
          </div>
          <button onClick={handleDismiss} className="w-8 h-8 rounded-full bg-white/10 grid place-items-center text-white/60 hover:bg-white/15 shrink-0">✕</button>
        </div>
        {!isIOS && deferredPrompt && (
          <button onClick={handleInstall} className="mt-4 w-full bg-white text-black rounded-full py-3 text-[14px] font-[700] hover:bg-white/90 active:scale-[0.98] transition-all">
            Install app
          </button>
        )}
        {isIOS && (
          <div className="mt-4 bg-white/10 rounded-[12px] p-3 flex items-center gap-3 text-[12px]">
            <span className="text-[18px]">📱</span>
            <span className="text-white/80">On iPhone: Safari → Share button <span className="text-white">⎙</span> → Add to Home Screen → Add</span>
          </div>
        )}
      </div>
    </div>
  );
}
