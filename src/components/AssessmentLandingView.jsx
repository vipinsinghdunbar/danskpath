import { useState, useEffect, useRef } from 'react';
import BrandLogo from './BrandLogo';

export default function AssessmentLandingView({ setActive }) {
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [assessmentUrl, setAssessmentUrl] = useState('');
  const canvasRef = useRef(null);

  useEffect(()=>{
    // Use current origin for ephemeral, but show production placeholder too
    const url = `${window.location.origin}/?page=assessment`;
    setAssessmentUrl(url);
    // Also store if ephemeral
    if (url.includes('e2b.app') || url.includes('localhost')) {
      console.log('Ephemeral URL:', url, '— deploy for permanent');
    }

    // Generate QR using qrcode library dynamically
    import('qrcode').then(QRCode => {
      QRCode.toDataURL(url, {
        width: 400,
        margin: 2,
        color: { dark: '#121417', light: '#FFFFFF' },
        errorCorrectionLevel: 'M'
      }).then(dataUrl => {
        setQrDataUrl(dataUrl);
      }).catch(()=>{});
      
      // Also draw on canvas for download
      if (canvasRef.current) {
        QRCode.toCanvas(canvasRef.current, url, {
          width: 400,
          margin: 2,
          color: { dark: '#121417', light: '#FFFFFF' }
        }, ()=>{});
      }
    }).catch(()=>{
      // fallback to external API
      setQrDataUrl(`https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(url)}&bgcolor=FFFFFF&color=121417`);
    });
  },[]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(assessmentUrl);
      setCopied(true);
      setTimeout(()=>setCopied(false), 2000);
      if (navigator.vibrate) navigator.vibrate(10);
    } catch {}
  };

  const handleDownloadQR = () => {
    if (!qrDataUrl) return;
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = 'danskpath-assessment-qr.png';
    a.click();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'DanskPath — Find your Danish level',
          text: 'Take 7-min Danish assessment — get your personal path from Modul 1 to PD3',
          url: assessmentUrl
        });
      } catch {}
    } else {
      handleCopy();
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F2F7] text-black">
      <header className="sticky top-0 z-40 backdrop-blur-[20px] bg-[#F2F2F7]/80 border-b border-black/5">
        <div className="max-w-[1120px] mx-auto px-5 lg:px-8 h-[64px] flex items-center justify-between">
          <button onClick={()=>setActive('landing')} className="flex items-center gap-2">
            <BrandLogo />
          </button>
          <div className="flex items-center gap-2">
            <button onClick={()=>setActive('landing')} className="text-[14px] font-[600] px-4 py-2 rounded-full hover:bg-black/5">Website</button>
            <button onClick={()=>setActive('login')} className="text-[14px] font-[600] px-4 py-2 rounded-full hover:bg-black/5">Sign in</button>
          </div>
        </div>
      </header>

      <div className="max-w-[1120px] mx-auto px-5 lg:px-8 py-10 lg:py-16">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-start">
          
          {/* Left — assessment intro */}
          <div>
            <div className="inline-flex items-center gap-2 bg-white border border-black/5 rounded-full px-3.5 py-1.5 text-[11px] font-[700] tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#007AFF] animate-pulse" /> Shareable • Independent session • No admin exposed
            </div>
            
            <h1 className="mt-6 text-[40px] lg:text-[56px] font-[800] leading-[0.9] tracking-[-0.04em]">
              Find your<br/>
              Danish level
            </h1>
            
            <p className="mt-5 text-[18px] leading-[1.5] text-[#3C3C43] max-w-[520px]">
              Take a short assessment to understand your current Danish skills and receive a personalised learning path from Modul 1 to PD3.
            </p>

            <div className="mt-8 bg-white rounded-[24px] p-6 border border-black/5 shadow-sm">
              <div className="text-[11px] font-[700] tracking-widest uppercase text-[#8E8E93]">What happens</div>
              <div className="mt-4 space-y-3">
                {[
                  { n: "1", t: "7-min adaptive test", d: "20 questions, varied per learner, from alphabet (M1) to jo/da/vel (M5)" },
                  { n: "2", t: "Your skill profile", d: "Strengths ≥75%, weaknesses <60%, per-category: grammar, vocab, listening, reading, writing, culture" },
                  { n: "3", t: "Personal path M1→5", d: "Not % but where to start: V2, collocations, listening without transcript, PD3 structure" },
                  { n: "4", t: "Independent session", d: "Each learner gets own ID, own results, no data mixing, no admin access" },
                ].map(s=>(
                  <div key={s.n} className="flex gap-3">
                    <div className="w-7 h-7 rounded-full bg-black text-white grid place-items-center text-[12px] font-[700] shrink-0">{s.n}</div>
                    <div><div className="text-[14px] font-[600]">{s.t}</div><div className="text-[13px] text-[#8E8E93] leading-[1.4] mt-0.5">{s.d}</div></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button 
                onClick={()=>setActive('diagnostic')}
                className="bg-black text-white px-8 py-4 rounded-full text-[17px] font-[600] shadow-[0_8px_24px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.25)] hover:-translate-y-0.5 active:scale-[0.97] transition-all text-center"
              >
                Start assessment → 7 min
              </button>
              <button 
                onClick={()=>setActive('landing')}
                className="bg-white border border-black/10 px-8 py-4 rounded-full text-[17px] font-[600] hover:bg-[#F2F2F7] active:scale-[0.97] transition-all text-center"
              >
                Learn about app
              </button>
            </div>

            <div className="mt-6 text-[12px] text-[#8E8E93] leading-[1.5]">
              • No account needed to start • Works on iPhone + laptop • Add to Home Screen = app<br/>
              • Each scan = new learner session • Results saved locally + optionally to cloud • No admin data exposed
            </div>

            {/* URL box */}
            <div className="mt-10 bg-black rounded-[20px] p-5 text-white">
              <div className="text-[11px] font-[700] tracking-widest uppercase opacity-60">Shareable URL — danish-learning.app/assessment</div>
              <div className="mt-3 flex items-center gap-3 bg-white/10 rounded-full px-4 py-3">
                <div className="flex-1 text-[14px] font-mono truncate">{assessmentUrl || 'Loading...'}</div>
                <button onClick={handleCopy} className="bg-white text-black px-4 py-1.5 rounded-full text-[12px] font-[700] hover:bg-white/90 active:scale-[0.97] transition">
                  {copied ? 'Copied ✓' : 'Copy'}
                </button>
              </div>
              <div className="mt-3 flex gap-2">
                <button onClick={handleShare} className="flex-1 bg-white/10 hover:bg-white/15 rounded-full py-2.5 text-[13px] font-[600] transition">Share…</button>
                <button onClick={handleDownloadQR} className="flex-1 bg-[#007AFF] hover:bg-[#007AFF]/90 rounded-full py-2.5 text-[13px] font-[600] transition">Download QR</button>
              </div>
              <div className="mt-3 text-[11px] opacity-60 leading-[1.4]">Use in person, LinkedIn, email, presentations, printed material, messages. Scanning takes person directly to assessment landing page. No admin account exposed.</div>
            </div>
          </div>

          {/* Right — QR */}
          <div className="lg:sticky lg:top-[88px]">
            <div className="bg-white rounded-[32px] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-black/[0.04] text-center">
              <div className="text-[11px] font-[700] tracking-widest uppercase text-[#8E8E93]">QR Code — Scan to test Danish</div>
              
              <div className="mt-6 mx-auto w-[280px] h-[280px] bg-[#F2F2F7] rounded-[24px] grid place-items-center p-4 border border-black/5">
                {qrDataUrl ? (
                  <img src={qrDataUrl} alt="QR code for Danish assessment" className="w-full h-full object-contain rounded-[12px]" />
                ) : (
                  <div className="w-full h-full grid place-items-center">
                    <div className="w-10 h-10 rounded-full border-2 border-black/10 border-t-black animate-spin" />
                  </div>
                )}
                <canvas ref={canvasRef} className="hidden" />
              </div>

              <div className="mt-6 inline-flex items-center gap-2 bg-[#F2F2F7] rounded-full px-4 py-2 text-[12px] font-[600]">
                <BrandLogo variant="icon" size={20} />
                <span>DanskPath • Modul 1→PD3 • A1→B2</span>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-2 text-center">
                <div className="bg-[#F2F2F7] rounded-[16px] p-3">
                  <div className="text-[18px] font-[800]">7 min</div>
                  <div className="text-[10px] text-[#8E8E93] uppercase tracking-wide font-[600]">Assessment</div>
                </div>
                <div className="bg-[#F2F2F7] rounded-[16px] p-3">
                  <div className="text-[18px] font-[800]">20 Q</div>
                  <div className="text-[10px] text-[#8E8E93] uppercase tracking-wide font-[600]">Adaptive</div>
                </div>
                <div className="bg-[#F2F2F7] rounded-[16px] p-3">
                  <div className="text-[18px] font-[800]">M1→5</div>
                  <div className="text-[10px] text-[#8E8E93] uppercase tracking-wide font-[600]">Full path</div>
                </div>
              </div>

              <div className="mt-6 text-[12px] leading-[1.5] text-[#8E8E93] text-left bg-[#F2F2F7] rounded-[16px] p-4">
                <b className="text-black">How to share:</b><br/>
                • In person: show QR, they scan with camera<br/>
                • LinkedIn: download QR + post with link<br/>
                • Email: paste link + QR image<br/>
                • Presentation: full-screen QR slide<br/>
                • Print: QR on handout, A4, poster<br/>
                • Messages: copy link, send on WhatsApp/SMS
              </div>

              <div className="mt-4 flex gap-2">
                <button onClick={()=>setActive('diagnostic')} className="flex-1 bg-black text-white rounded-full py-3 text-[14px] font-[600] hover:bg-black/90 active:scale-[0.97] transition">Test now</button>
                <button onClick={handleDownloadQR} className="flex-1 bg-white border border-black/10 rounded-full py-3 text-[14px] font-[600] hover:bg-[#F2F2F7] active:scale-[0.97] transition">Save QR</button>
              </div>
            </div>

            <div className="mt-4 bg-[#007AFF]/10 border border-[#007AFF]/15 rounded-[20px] p-4 text-[12px] leading-[1.5]">
              <b className="text-[#007AFF]">Privacy:</b> QR opens public assessment only. No admin dashboard, no personal data, no Vipin account. Each learner gets independent trialId stored in danish-platform-db.json. Admin sees anonymized results only if learner submits.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
