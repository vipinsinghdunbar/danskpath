export default function TermsView({ setActive }) {
  return (
    <div className="min-h-screen bg-[#F2F2F7] text-[#121417]">
      <div className="max-w-[800px] mx-auto px-6 py-12">
        <button onClick={()=>setActive('website')} className="mb-6 px-4 py-2 rounded-full bg-white border border-black/10 text-[13px] font-[600]">← Back</button>
        <div className="bg-white rounded-[24px] p-8 shadow-sm border border-black/5">
          <h1 className="text-[28px] font-[800] tracking-tight">Terms of Use</h1>
          <p className="text-[13px] text-black/50 mt-2">Effective Sep 27, 2026</p>
          <div className="mt-6 text-[14px] leading-[1.7] space-y-4">
            <p><strong>Service:</strong> DanskPath M1→PD3 Danish education, 7-min assessment, personal path, SRS, 15min/day.</p>
            <p><strong>Accounts:</strong> Trial without account via trialId, or create account name+password (email optional). Change default admin vipin123 after first login. One account per person.</p>
            <p><strong>Content:</strong> You own writing/speaking attempts, grant license for service. No illegal/hateful.</p>
            <p><strong>Acceptable:</strong> No scraping question bank, no brute force (rate limited 10/15min), no admin access without role.</p>
            <p><strong>IP:</strong> Curriculum, question bank, engines © DanskPath. No copy/redistribute.</p>
            <p><strong>Disclaimer:</strong> As-is, no guarantee PD3 pass, AI feedback may be inaccurate.</p>
            <p><strong>Liability:</strong> Limited to amount paid (currently free) under Danish law.</p>
            <p><strong>Termination:</strong> Delete via DELETE /api/user/data. We may terminate for violation.</p>
            <p><strong>Law:</strong> Danish law, Copenhagen City Court.</p>
            <p><strong>Contact:</strong> support@danskpath.dk, privacy@danskpath.dk</p>
            <p className="text-[12px] text-black/50">Full: TERMS.md in repo.</p>
          </div>
          <div className="mt-8 flex gap-3">
            <button onClick={()=>setActive('privacy')} className="px-5 py-2.5 rounded-full bg-black text-white text-[13px] font-[600]">Privacy</button>
            <button onClick={()=>setActive('website')} className="px-5 py-2.5 rounded-full bg-[#F2F2F7] text-[13px] font-[600]">Home</button>
          </div>
        </div>
      </div>
    </div>
  );
}
