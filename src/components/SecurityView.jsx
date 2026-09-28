import { useEffect, useState } from 'react';

export default function SecurityView({ setActive }) {
  const [audit, setAudit] = useState(null);
  const [headers, setHeaders] = useState(null);
  useEffect(()=>{
    fetch('/api/security/audit').then(r=>r.json()).then(setAudit).catch(()=>{});
    fetch('/api/health').then(r=>{
      setHeaders(Object.fromEntries(r.headers.entries()));
    }).catch(()=>{});
  },[]);
  return (
    <div className="min-h-screen bg-[#F2F2F7] text-[#121417]">
      <div className="max-w-[900px] mx-auto px-6 py-12">
        <button onClick={()=>setActive('website')} className="mb-6 px-4 py-2 rounded-full bg-white border border-black/10 text-[13px] font-[600]">← Back</button>
        <div className="bg-white rounded-[24px] p-8 shadow-sm border border-black/5">
          <h1 className="text-[28px] font-[800] tracking-tight">🔐 Security Audit — Live</h1>
          <p className="text-[13px] text-black/50 mt-2">Real-time check of production security posture</p>
          
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl bg-[#F2F2F7]"><div className="text-[11px] font-[700] uppercase tracking-widest opacity-50">Headers</div><div className="text-[13px] font-[600] mt-1">{audit?.headers ? '✅ CSP, HSTS, DENY' : 'Checking...'}</div></div>
            <div className="p-4 rounded-2xl bg-[#F2F2F7]"><div className="text-[11px] font-[700] uppercase tracking-widest opacity-50">Rate Limit</div><div className="text-[13px] font-[600] mt-1">{audit?.rateLimit ? '✅ 10/15min login' : '...'}</div></div>
            <div className="p-4 rounded-2xl bg-[#F2F2F7]"><div className="text-[11px] font-[700] uppercase tracking-widest opacity-50">Auth</div><div className="text-[13px] font-[600] mt-1">{audit?.auth?.jwt ? `✅ JWT ${audit.auth.expiry}` : '...'}</div></div>
            <div className="p-4 rounded-2xl bg-[#F2F2F7]"><div className="text-[11px] font-[700] uppercase tracking-widest opacity-50">Storage</div><div className="text-[13px] font-[600] mt-1">{audit?.storage?.type || 'json-file'}</div></div>
          </div>

          {audit && (
            <div className="mt-6">
              <h3 className="text-[14px] font-[700]">Audit Result — {audit.ok ? '✅ PASS (no high issues)' : '⚠️ Issues Found'}</h3>
              <div className="mt-3 space-y-2">
                {audit.issues?.map((iss,i)=>(
                  <div key={i} className={`p-3 rounded-xl text-[12px] ${iss.level==='high' ? 'bg-red-50 border border-red-200 text-red-800' : 'bg-yellow-50 border border-yellow-200 text-yellow-800'}`}>
                    <strong>{iss.level.toUpperCase()}:</strong> {iss.msg} {iss.fix && <span className="block mt-1 font-[600]">Fix: {iss.fix}</span>}
                  </div>
                ))}
                {audit.issues?.length===0 && <div className="p-3 rounded-xl bg-green-50 border border-green-200 text-green-800 text-[12px]">No high issues. Ready for production if JWT_SECRET env set.</div>}
              </div>
            </div>
          )}

          <div className="mt-6">
            <h3 className="text-[14px] font-[700]">What We Collect (Data Safety)</h3>
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 text-[12px]">
              <div className="p-3 rounded-xl bg-[#F2F2F7]">Name, email (optional) — personalization</div>
              <div className="p-3 rounded-xl bg-[#F2F2F7]">Assessment answers 15-20Q — level</div>
              <div className="p-3 rounded-xl bg-[#F2F2F7]">Usage: lessons, SRS box — progress</div>
              <div className="p-3 rounded-xl bg-[#F2F2F7]">No location, no tracking, no ads</div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-[14px] font-[700]">GDPR Rights</h3>
            <div className="flex flex-wrap gap-2 mt-3">
              <button onClick={()=>fetch('/api/user/export',{headers:{Authorization:`Bearer ${localStorage.getItem('danskpath_token')||''}`}}).then(r=>r.json()).then(d=>alert(JSON.stringify(d).slice(0,500)))} className="px-4 py-2 rounded-full bg-black text-white text-[12px] font-[600]">Export My Data (GET /api/user/export)</button>
              <button onClick={()=>{ if(confirm('Delete your trials & anonymize?')) fetch('/api/user/data?anonymize=true',{method:'DELETE',headers:{Authorization:`Bearer ${localStorage.getItem('danskpath_token')||''}`}}).then(r=>r.json()).then(d=>alert(d.message))}} className="px-4 py-2 rounded-full bg-white border border-black/10 text-[12px] font-[600]">Delete My Data (DELETE /api/user/data)</button>
            </div>
          </div>

          <div className="mt-8 p-4 rounded-2xl bg-[#121417] text-white text-[12px] leading-[1.6]">
            <strong>Launch Readiness: 62% PWA READY, 35% App Store</strong><br/>
            Blocking for App Store: Permanent domain, privacy policy URL, Capacitor wrapper, Apple Dev account, JWT_SECRET env, change admin password.<br/>
            See SECURITY_AUDIT_LAUNCH_READINESS.md, APP_STORE_CHECKLIST.md, DOWNLOADABLE_PACKAGES.md for full guide.
          </div>

          <div className="mt-6 flex gap-3">
            <button onClick={()=>setActive('privacy')} className="px-5 py-2.5 rounded-full bg-black text-white text-[13px] font-[600]">Privacy</button>
            <button onClick={()=>setActive('terms')} className="px-5 py-2.5 rounded-full bg-[#F2F2F7] text-[13px] font-[600]">Terms</button>
            <a href="/SECURITY_AUDIT_LAUNCH_READINESS.md" target="_blank" className="px-5 py-2.5 rounded-full bg-white border border-black/10 text-[13px] font-[600]">Full Audit MD</a>
          </div>
        </div>
      </div>
    </div>
  );
}
