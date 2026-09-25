import { useState, useEffect } from 'react';
import { createReferral, getReferrals } from '../lib/api';
import { getUser } from '../lib/auth';

export default function ShareTrialView({ setActive }) {
  const [referrals, setReferrals] = useState([]);
  const [newLink, setNewLink] = useState(null);
  const [loading, setLoading] = useState(false);
  const user = getUser();

  useEffect(()=>{
    getReferrals().then(d=>setReferrals(d.referrals||[])).catch(()=>{});
  },[]);

  const handleCreate = async () => {
    setLoading(true);
    try {
      const baseUrl = window.location.origin;
      const data = await createReferral(baseUrl, `By ${user?.name||'Vipin'} ${new Date().toLocaleDateString()}`);
      setNewLink(data.referral);
      setReferrals(prev=>[data.referral, ...prev]);
      navigator.clipboard?.writeText(data.referral.link);
      if(navigator.vibrate) navigator.vibrate(20);
    } catch(e) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://danskpath.app';

  return (
    <div className="min-h-screen bg-[#F2F2F7] pb-[120px]">
      <div className="max-w-[900px] mx-auto px-5 lg:px-8 pt-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-full bg-black text-white grid place-items-center font-bold text-[12px]">↗</div>
          <span className="text-[13px] font-[600]">Share trial • Admin only</span>
        </div>
        <h1 className="ios-large-title">Refer someone<br/>for a trial</h1>
        <p className="mt-3 text-[17px] leading-[1.4] text-[#3C3C43]/70 max-w-[600px]">Generates a shareable trial link. Send via WhatsApp, Messages, email, LinkedIn. Person gets evaluation only, not full platform. You see their results in Admin Dashboard.</p>

        <div className="mt-8 bg-black rounded-[32px] p-7 text-white shadow-lg">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-[15px] font-[700]">Generate trial link</div>
              <div className="text-[13px] text-white/60 mt-1">Link format: {origin}/?ref=CODE • Code is 8 chars, tracks uses</div>
            </div>
            <button onClick={handleCreate} disabled={loading} className="bg-white text-black px-6 py-3 rounded-full text-[14px] font-[600] disabled:opacity-50 tap-haptic">{loading?'Generating...':'Generate link →'}</button>
          </div>
          {newLink && (
            <div className="mt-6 bg-white/10 rounded-[20px] p-5 border border-white/10">
              <div className="text-[11px] font-bold uppercase text-white/60">New link • copied to clipboard</div>
              <div className="mt-2 text-[15px] font-mono break-all">{newLink.link}</div>
              <div className="mt-2 flex gap-2">
                <button onClick={()=>window.open(`https://wa.me/?text=${encodeURIComponent(`Prøv min dansk-test (10 min evaluation): ${newLink.link}`)}`)} className="bg-[#25D366] text-white px-4 py-2 rounded-full text-[12px] font-[600]">WhatsApp</button>
                <button onClick={()=>window.open(`mailto:?subject=Danish evaluation&body=${encodeURIComponent(newLink.link)}`)} className="bg-white text-black px-4 py-2 rounded-full text-[12px] font-[600]">Email</button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 grid lg:grid-cols-3 gap-4">
          <div className="bg-white rounded-[24px] p-6 shadow-sm border border-black/5">
            <div className="text-[13px] font-[700]">1. Fastest — share now</div>
            <div className="mt-3 text-[13px] leading-[1.5] text-[#8E8E93]">Your current URL works for anyone while dev server runs. For permanent link, deploy dist to Vercel/Netlify.</div>
            <div className="mt-3 bg-[#F2F2F7] rounded-full px-4 py-3 font-mono text-[11px] break-all">{origin}</div>
            <button onClick={()=>{ navigator.clipboard.writeText(origin); alert('Copied'); }} className="mt-3 w-full bg-[#F2F2F7] py-2.5 rounded-full text-[12px] font-[600]">Copy link</button>
          </div>
          <div className="bg-white rounded-[24px] p-6 shadow-sm border border-black/5">
            <div className="text-[13px] font-[700]">2. QR • iPhone</div>
            <div className="mt-3 flex justify-center"><img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(origin)}`} alt="QR" className="w-[140px] h-[140px] rounded-[16px] border border-black/5" /></div>
            <div className="mt-3 text-[11px] text-[#8E8E93] text-center">Scan with iPhone camera → Add to Home Screen</div>
          </div>
          <div className="bg-white rounded-[24px] p-6 shadow-sm border border-black/5">
            <div className="text-[13px] font-[700]">3. With database</div>
            <div className="mt-3 text-[12px] leading-[1.5] text-[#8E8E93]">Deploy server.js to Render/Railway, set API_BASE. Then /api/trial works for all friends, data in danish-platform-db.json.</div>
            <button onClick={()=>setActive('admin')} className="mt-4 w-full bg-black text-white py-2.5 rounded-full text-[12px] font-[600]">See trial users → Admin</button>
          </div>
        </div>

        {referrals.length>0 && (
          <div className="mt-8 bg-white rounded-[24px] p-6 shadow-sm border border-black/5">
            <div className="text-[13px] font-[700]">Your referral links • {referrals.length}</div>
            <div className="mt-4 space-y-2">
              {referrals.map(r=>(
                <div key={r.id} className="bg-[#F2F2F7] rounded-full px-4 py-3 flex justify-between items-center gap-2">
                  <span className="font-mono text-[12px] truncate">{r.code} • uses {r.uses} • {new Date(r.createdAt).toLocaleDateString()}</span>
                  <button onClick={()=>{ navigator.clipboard.writeText(r.link); alert('Copied '+r.code); }} className="bg-black text-white px-3 py-1.5 rounded-full text-[11px] font-bold shrink-0">Copy</button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 flex gap-3">
          <button onClick={()=>setActive('admin')} className="bg-black text-white px-6 py-3 rounded-full text-[14px] font-[600]">Admin Dashboard →</button>
          <button onClick={()=>setActive('landing')} className="bg-white border border-black/10 px-6 py-3 rounded-full text-[14px] font-[600]">Home</button>
        </div>
      </div>
    </div>
  );
}
