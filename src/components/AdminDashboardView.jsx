import { useState, useEffect } from 'react';
import { getAdminTrials, getAdminStats, createReferral, getReferrals } from '../lib/api';
import { getUser, logout } from '../lib/auth';

export default function AdminDashboardView({ setActive }) {
  const [user] = useState(()=>getUser());
  const [trials, setTrials] = useState([]);
  const [stats, setStats] = useState(null);
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newLink, setNewLink] = useState(null);
  const [selectedTrial, setSelectedTrial] = useState(null);

  useEffect(()=>{
    loadAll();
  },[]);

  const loadAll = async () => {
    setLoading(true);
    try {
      const [trialsData, statsData, refsData] = await Promise.all([
        getAdminTrials().catch(()=>({ trials: [] })),
        getAdminStats().catch(()=>({})),
        getReferrals().catch(()=>({ referrals: [] }))
      ]);
      setTrials(trialsData.trials || []);
      setStats(statsData);
      setReferrals(refsData.referrals || []);
    } catch(e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateReferral = async () => {
    const baseUrl = window.location.origin;
    try {
      const data = await createReferral(baseUrl, `Referral by ${user.name} ${new Date().toLocaleDateString()}`);
      setNewLink(data.referral);
      loadAll();
      if(navigator.vibrate) navigator.vibrate(20);
      // copy to clipboard
      navigator.clipboard?.writeText(data.referral.link);
    } catch(e) {
      alert('Failed: '+e.message);
    }
  };

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  if(selectedTrial) {
    const t = selectedTrial;
    const a = t.assessment;
    const f = t.feedback;
    return (
      <div className="min-h-screen bg-[#F2F2F7] pb-[120px]">
        <div className="max-w-[800px] mx-auto px-5 pt-6">
          <button onClick={()=>setSelectedTrial(null)} className="text-[14px] bg-white border border-black/10 px-4 py-2 rounded-full">← Back to dashboard</button>
          <div className="mt-6 bg-white rounded-[32px] p-8 shadow-sm border border-black/5">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-[24px] font-[700] tracking-tight">{t.name}</h1>
                <div className="text-[13px] text-[#8E8E93] mt-1">{t.email} • Started Danish: {t.danishStartDate} • Goal: {t.goal} • {new Date(t.createdAt).toLocaleString()}</div>
                <div className="mt-2 text-[11px] px-2.5 py-1 rounded-full bg-[#F2F2F7] inline-block">Referred by {t.invitedBy} • Code {t.code} • {t.status}</div>
              </div>
              <div className="text-right"><div className="text-[32px] font-bold">{a?.pct||'—'}%</div><div className="text-[12px] text-[#8E8E93]">{a?.level||'No assessment'}</div></div>
            </div>

            {a && (
              <>
                <div className="mt-8 grid grid-cols-2 gap-3">
                  <div className="bg-[#34C759]/10 rounded-[16px] p-4"><div className="text-[11px] font-bold uppercase text-[#34C759]">Strengths</div><div className="mt-2 text-[13px]">{a.strengths?.join(', ')||'—'}</div></div>
                  <div className="bg-[#FF9500]/10 rounded-[16px] p-4"><div className="text-[11px] font-bold uppercase text-[#FF9500]">Weaknesses</div><div className="mt-2 text-[13px]">{a.weaknesses?.join(', ')||'—'}</div></div>
                </div>
                <div className="mt-6">
                  <div className="text-[13px] font-bold">Breakdown by category</div>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {Object.entries(a.breakdown||{}).map(([cat, s])=>(
                      <div key={cat} className="bg-[#F2F2F7] rounded-full px-3 py-2 text-[12px] flex justify-between"><span>{cat}</span><span className="font-bold">{s.correct}/{s.total} • {Math.round(s.correct/s.total*100)}%</span></div>
                    ))}
                  </div>
                </div>
                <div className="mt-6">
                  <div className="text-[13px] font-bold">Recommended path</div>
                  <div className="mt-2 space-y-2">
                    {(a.recommendedPath||[]).map((p,i)=>(
                      <div key={i} className="bg-[#F2F2F7] rounded-[12px] p-3 flex gap-3"><span className="w-6 h-6 rounded-full bg-black text-white grid place-items-center text-[10px]">{p.step}</span><div><div className="text-[13px] font-[600]">{p.title}</div><div className="text-[11px] text-[#8E8E93]">{p.why} • {p.time}</div></div></div>
                    ))}
                  </div>
                  <div className="mt-3 text-[12px] text-[#8E8E93]">Timeline: {a.timeline}</div>
                </div>
              </>
            )}

            {f && (
              <div className="mt-8 bg-black text-white rounded-[20px] p-5">
                <div className="text-[11px] font-bold uppercase text-white/60">Feedback</div>
                <div className="mt-2 space-y-1 text-[13px]">
                  <div>Would use: <b>{f.wouldUse}</b></div>
                  <div>Helpful: <b>{f.helpful}</b></div>
                  <div>Would pay: <b>{f.wouldPay}</b></div>
                  <div>NPS: {f.nps||'—'}</div>
                  <div className="mt-2">What to change: {f.whatToChange||'—'}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F2F2F7] pb-[120px]">
      <div className="max-w-[1100px] mx-auto px-5 lg:px-8 pt-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-black text-white grid place-items-center font-bold">V</div>
            <div>
              <div className="text-[17px] font-[700] tracking-tight">Vipin • Admin Dashboard</div>
              <div className="text-[12px] text-[#8E8E93]">Control centre • {user?.email}</div>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={()=>setActive('practice')} className="bg-white border border-black/10 px-4 py-2 rounded-full text-[13px] font-[600]">My Learning →</button>
            <button onClick={handleLogout} className="bg-black text-white px-4 py-2 rounded-full text-[13px] font-[600]">Logout</button>
          </div>
        </div>

        {/* My Learning Journey */}
        <div className="mt-8 bg-white rounded-[32px] p-7 shadow-sm border border-black/5">
          <div className="text-[15px] font-[700] tracking-tight">My Danish-learning journey — Vipin</div>
          <div className="mt-1 text-[13px] text-[#8E8E93]">Assessment → Evaluation → Personalised Path → Learning → Practice → Testing → Progress → Reassessment</div>
          <div className="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-3">
            <button onClick={()=>setActive('practice')} className="bg-black text-white rounded-[20px] p-4 text-left tap-haptic"><div className="text-[12px] opacity-70">Today</div><div className="text-[15px] font-[600] mt-1">Start Learning →</div><div className="text-[11px] opacity-60 mt-1">Dagens 15 min</div></button>
            <button onClick={()=>setActive('path')} className="bg-[#F2F2F7] rounded-[20px] p-4 text-left"><div className="text-[11px] font-bold uppercase text-[#8E8E93]">Path</div><div className="text-[14px] font-[600] mt-1">My Learning Path</div></button>
            <button onClick={()=>setActive('diagnostic')} className="bg-[#F2F2F7] rounded-[20px] p-4 text-left"><div className="text-[11px] font-bold uppercase text-[#8E8E93]">Assessment</div><div className="text-[14px] font-[600] mt-1">Re-assess</div></button>
            <button onClick={()=>setActive('progress')} className="bg-[#F2F2F7] rounded-[20px] p-4 text-left"><div className="text-[11px] font-bold uppercase text-[#8E8E93]">Progress</div><div className="text-[14px] font-[600] mt-1">Strengths & Timeline</div></button>
          </div>
        </div>

        {/* Stats */}
        {stats && (
          <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-[20px] p-5 shadow-sm border border-black/5"><div className="text-[11px] font-bold uppercase text-[#8E8E93]">Total trials</div><div className="text-[28px] font-bold mt-1">{stats.totalTrials||0}</div><div className="text-[11px] text-[#8E8E93]">{stats.totalAssessments||0} assessments • {stats.totalFeedback||0} feedback</div></div>
            <div className="bg-white rounded-[20px] p-5 shadow-sm border border-black/5"><div className="text-[11px] font-bold uppercase text-[#8E8E93]">Avg score</div><div className="text-[28px] font-bold mt-1">{stats.avgPct||0}%</div><div className="text-[11px] text-[#8E8E93]">Across all trials</div></div>
            <div className="bg-white rounded-[20px] p-5 shadow-sm border border-black/5"><div className="text-[11px] font-bold uppercase text-[#8E8E93]">Would use</div><div className="text-[14px] font-[600] mt-1">Yes: {stats.wouldUse?.Yes||0} • Maybe: {stats.wouldUse?.Maybe||0} • No: {stats.wouldUse?.No||0}</div></div>
            <div className="bg-white rounded-[20px] p-5 shadow-sm border border-black/5"><div className="text-[11px] font-bold uppercase text-[#8E8E93]">Would pay</div><div className="text-[14px] font-[600] mt-1">Yes: {stats.wouldPay?.Yes||0} • Maybe: {stats.wouldPay?.Maybe||0} • No: {stats.wouldPay?.No||0}</div></div>
          </div>
        )}

        {/* Refer someone */}
        <div className="mt-6 bg-black rounded-[32px] p-7 text-white">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-[15px] font-[700]">Refer someone for a trial</div>
              <div className="text-[13px] text-white/60 mt-1 max-w-[500px]">Generates a shareable trial link. Send via WhatsApp, Messages, email, LinkedIn. Person gets evaluation only, not full platform.</div>
            </div>
            <button onClick={handleCreateReferral} className="bg-white text-black px-6 py-3 rounded-full text-[14px] font-[600] tap-haptic">Generate link →</button>
          </div>
          {newLink && (
            <div className="mt-5 bg-white/10 rounded-[16px] p-4 border border-white/10">
              <div className="text-[11px] font-bold uppercase text-white/60">New link generated • copied to clipboard</div>
              <div className="mt-2 text-[14px] font-mono break-all">{newLink.link}</div>
              <div className="mt-1 text-[11px] text-white/60">Code: {newLink.code} • Share this</div>
            </div>
          )}
          {referrals.length>0 && (
            <div className="mt-6">
              <div className="text-[11px] font-bold uppercase text-white/60">Your referral links</div>
              <div className="mt-3 space-y-2">
                {referrals.slice(0,5).map(r=>(
                  <div key={r.id} className="bg-white/10 rounded-full px-4 py-3 flex justify-between items-center text-[12px]"><span className="font-mono">{r.code} • {r.link.slice(0,40)}... • uses {r.uses}</span><button onClick={()=>{ navigator.clipboard?.writeText(r.link); alert('Copied'); }} className="bg-white text-black px-3 py-1 rounded-full text-[11px] font-bold">Copy</button></div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Trial Users Table */}
        <div className="mt-6 bg-white rounded-[24px] p-6 shadow-sm border border-black/5">
          <div className="flex items-center justify-between">
            <div className="text-[15px] font-[700]">Trial Users • {trials.length}</div>
            <button onClick={loadAll} className="text-[12px] bg-[#F2F2F7] px-3 py-1.5 rounded-full">Refresh</button>
          </div>
          {loading ? <div className="mt-4 text-[13px] text-[#8E8E93]">Loading...</div> : trials.length===0 ? <div className="mt-4 text-[13px] text-[#8E8E93]">No trials yet. Generate a link above and share.</div> : (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-[12px]">
                <thead><tr className="text-[11px] font-bold uppercase text-[#8E8E93] border-b border-black/5"><th className="text-left py-2">User</th><th className="text-left">When</th><th className="text-left">Score</th><th className="text-left">Level</th><th className="text-left">Strengths</th><th className="text-left">Weaknesses</th><th className="text-left">Would use</th><th className="text-left">Would pay</th><th className="text-left">Feedback</th></tr></thead>
                <tbody>
                  {trials.map(t=>(
                    <tr key={t.id} className="border-b border-black/5 hover:bg-[#F2F2F7] cursor-pointer" onClick={()=>setSelectedTrial(t)}>
                      <td className="py-3 font-[600]">{t.name} <span className="text-[#8E8E93] font-[400]">{t.danishStartDate}</span></td>
                      <td className="text-[#8E8E93]">{new Date(t.createdAt).toLocaleDateString()}</td>
                      <td className="font-bold">{t.assessment?.pct||t.pct||'—'}%</td>
                      <td className="text-[11px]">{t.assessment?.level||'—'}</td>
                      <td className="text-[11px]">{t.assessment?.strengths?.join(', ')||'—'}</td>
                      <td className="text-[11px]">{t.assessment?.weaknesses?.join(', ')||'—'}</td>
                      <td><span className={`px-2 py-1 rounded-full text-[10px] font-bold ${t.feedback?.wouldUse==='Yes'?'bg-[#34C759] text-white': t.feedback?.wouldUse==='Maybe'?'bg-[#FF9500] text-white':'bg-[#F2F2F7]'}`}>{t.feedback?.wouldUse||'—'}</span></td>
                      <td><span className={`px-2 py-1 rounded-full text-[10px] font-bold ${t.feedback?.wouldPay==='Yes'?'bg-black text-white':'bg-[#F2F2F7]'}`}>{t.feedback?.wouldPay||'—'}</span></td>
                      <td className="max-w-[150px] truncate text-[#8E8E93]">{t.feedback?.whatToChange||'—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="mt-6 text-[11px] text-[#8E8E93] text-center">Database: danish-platform-db.json • Portable • iPhone + Laptop same data • PWA ready • Auth: JWT + bcrypt</div>
      </div>
    </div>
  );
}
