import { useEffect, useState } from 'react';

export default function PrivacyView({ setActive }) {
  const [md, setMd] = useState('');
  useEffect(()=>{ fetch('/PRIVACY_POLICY.md').then(r=>r.text()).then(setMd).catch(()=>fetch('/privacy-policy').then(r=>r.text()).catch(()=>{})); },[]);
  return (
    <div className="min-h-screen bg-[#F2F2F7] text-[#121417]">
      <div className="max-w-[800px] mx-auto px-6 py-12">
        <button onClick={()=>setActive('website')} className="mb-6 px-4 py-2 rounded-full bg-white border border-black/10 text-[13px] font-[600]">← Back to Home</button>
        <div className="bg-white rounded-[24px] p-8 shadow-sm border border-black/5">
          <h1 className="text-[28px] font-[800] tracking-tight">Privacy Policy</h1>
          <p className="text-[13px] text-black/50 mt-2">Effective Sep 27, 2026 — DanskPath M1→PD3</p>
          <div className="prose prose-sm max-w-none mt-6 text-[14px] leading-[1.7] whitespace-pre-wrap">
{`DanskPath — Privacy Policy (Summary)

We collect minimal data for education:
• Name, email (optional), danishStartDate, goal
• Assessment answers (15-20Q)
• Feedback (wouldUse, helpful, NPS)
• Usage: lessons completed, SRS box, time spent

We do NOT collect:
• Location, camera/mic (Permissions-Policy denies except explicit pronunciation)
• Contacts, tracking across apps, ads

Sharing:
• No third parties except hosting (Render/Vercel/Fly EU Frankfurt)
• If you enable AI feedback with your own OpenAI/Anthropic key, data goes to them

Storage:
• JSON file danish-platform-db.json on server disk /data (persistent)
• localStorage on device (dansk_path, vocab_progress, etc.)

Retention: Until you request deletion or 2 years auto-delete (planned)

Your Rights (GDPR):
• Access: GET /api/user/export
• Deletion: DELETE /api/user/data?anonymize=true or privacy@danskpath.dk
• Correction in Settings
• Complaint: Datatilsynet DK

Security:
• bcrypt passwords, JWT 30d, HTTPS HSTS, rate limiting, CSP, X-Frame DENY
• No system 100% secure — breach notified within 72h

Contact: privacy@danskpath.dk, support@danskpath.dk, Copenhagen DK

Full version: See PRIVACY_POLICY.md in repo or /api/security/audit for technical audit.

App Store Label:
• Contact Info: Name, Email (optional) — linked, not tracking
• User Content: Assessment answers — linked, not tracking
• Usage Data: Product interaction — linked, not tracking
• No tracking, no ads.

Children: Not directed to under 13.
`}
          </div>
          <div className="mt-8 flex gap-3">
            <button onClick={()=>setActive('terms')} className="px-5 py-2.5 rounded-full bg-black text-white text-[13px] font-[600]">Terms</button>
            <button onClick={()=>setActive('security')} className="px-5 py-2.5 rounded-full bg-[#F2F2F7] text-[13px] font-[600]">Security Audit</button>
            <a href="/api/security/audit" target="_blank" className="px-5 py-2.5 rounded-full bg-white border border-black/10 text-[13px] font-[600]">/api/security/audit</a>
          </div>
        </div>
      </div>
    </div>
  );
}
