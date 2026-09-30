import { useState, useEffect } from 'react';
import { getUser, logout } from '../lib/auth';

export default function AdminDashboardView({ setActive }) {
  const [user] = useState(()=>getUser());
  const [users, setUsers] = useState([]);
  const [trials, setTrials] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editLevel, setEditLevel] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(()=>{ loadAll(); },[]);

  const getToken = ()=> localStorage.getItem('danskpath_token');

  const loadAll = async () => {
    setLoading(true);
    try {
      const token = getToken();
      const headers = { Authorization: `Bearer ${token}` };
      const [usersRes, trialsRes, statsRes] = await Promise.all([
        fetch('/api/admin/users', { headers }).then(r=>r.json()).catch(()=>({ users: [] })),
        fetch('/api/admin/trials', { headers }).then(r=>r.json()).catch(()=>({ trials: [] })),
        fetch('/api/admin/stats', { headers }).then(r=>r.json()).catch(()=>({}))
      ]);
      setUsers(usersRes.users || []);
      setTrials(usersRes.users ? [] : (trialsRes.trials || []));
      // If users endpoint exists, use users for stats, else use trials stats
      if (usersRes.users) {
        const us = usersRes.users;
        setStats({
          totalUsers: us.length,
          totalTrials: trialsRes.trials?.length || 0,
          learners: us.filter(u=>u.role==='learner').length,
          admins: us.filter(u=>u.role==='admin').length,
          avgLevel: us.filter(u=>u.level && u.level!=='Ikke testet').length
        });
      } else {
        setStats(statsRes);
      }
    } catch(e) { console.error(e); } finally { setLoading(false); }
  };

  const handleSelectUser = async (u) => {
    try {
      const token = getToken();
      const res = await fetch(`/api/admin/user/${u.id}`, { headers: { Authorization: `Bearer ${token}` } }).then(r=>r.json());
      if (res.ok) {
        setSelectedUser(res.user);
        setEditLevel(res.user.level || '');
      } else {
        setSelectedUser(u);
        setEditLevel(u.level || '');
      }
    } catch {
      setSelectedUser(u);
      setEditLevel(u.level || '');
    }
  };

  const handleUpdateUser = async () => {
    if (!selectedUser) return;
    try {
      const token = getToken();
      const res = await fetch(`/api/admin/user/${selectedUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ level: editLevel })
      }).then(r=>r.json());
      if (res.ok) {
        alert(`Updated ${selectedUser.name} level to ${editLevel}`);
        setSelectedUser(res.user);
        loadAll();
      } else alert(res.error || 'Failed');
    } catch(e) { alert('Failed: '+e.message); }
  };

  const handleClearProgress = async () => {
    if (!selectedUser) return;
    if (!confirm(`Clear progress for ${selectedUser.name}? This will reset their cleared stages.`)) return;
    try {
      const token = getToken();
      const res = await fetch(`/api/admin/user/${selectedUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ progress: { overall: 0, clearedStages: {} }, clearedStages: {} })
      }).then(r=>r.json());
      if (res.ok) { alert('Progress cleared'); setSelectedUser(res.user); loadAll(); }
    } catch(e) { alert('Failed'); }
  };

  const handleRevokeUser = async () => {
    if (!selectedUser) return;
    if (selectedUser.role === 'admin') { alert('Cannot revoke admin from here'); return; }
    if (!confirm(`Revoke/delete user ${selectedUser.name} (${selectedUser.email})? This cannot be undone.`)) return;
    try {
      const token = getToken();
      const res = await fetch(`/api/admin/user/${selectedUser.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      }).then(r=>r.json());
      if (res.ok) { alert(res.message); setSelectedUser(null); loadAll(); }
      else alert(res.error || 'Failed');
    } catch(e) { alert('Failed: '+e.message); }
  };

  const [activeTab, setActiveTab] = useState('users'); // users | dev

  const handleLogout = () => { logout(); window.location.href = '/'; };

  const filteredUsers = users.filter(u => {
    if (!filter) return true;
    const f = filter.toLowerCase();
    return u.name.toLowerCase().includes(f) || u.email.toLowerCase().includes(f) || (u.level||'').toLowerCase().includes(f);
  });

  const devTools = [
    { id: 'website', label: 'Website', desc: 'Marketing — Danish that sticks after work and kids', icon: '◐', route: 'website' },
    { id: 'assessment', label: 'Assessment Landing', desc: 'Shareable assessment intro — what we measure / duration / what you receive', icon: '◑', route: 'assessment' },
    { id: 'diagnostic', label: 'Diagnostic Test', desc: 'Test 15Q — Question X of Y + progress bar', icon: '📝', route: 'diagnostic' },
    { id: 'path', label: 'Path Roadmap', desc: 'Din vej + Modul 1..5 + exercises per module', icon: '◍', route: 'path' },
    { id: 'practice', label: 'Practice Today', desc: 'Hej, klar til at øve? + nextAction', icon: '✦', route: 'practice' },
    { id: 'progress', label: 'Progress', desc: 'Where you are honest numbers + Weekly report', icon: '◎', route: 'progress' },
    { id: 'architecture', label: 'Architecture Map', desc: 'Interactive with motion arrows + live public URL', icon: '🗺️', route: 'architecture' },
    { id: 'roadmap', label: 'Roadmap 0→Launch', desc: 'MVP Core Curriculum 100% DONE', icon: '🛣️', route: 'roadmap' },
    { id: 'share', label: 'Share QR', desc: 'Shareable URL + QR Code 280px + stats', icon: '↗', route: 'share' },
    { id: 'flow', label: 'Flow', desc: 'How it works architecture', icon: '🗺️', route: 'flow' },
    { id: 'levels', label: 'Levels M1→5', desc: 'How hard each stage', icon: '🎯', route: 'levels' },
    { id: 'motivation', label: 'Motivation', desc: 'What keeps you coming back', icon: '💡', route: 'motivation' },
    { id: 'screenshots', label: 'Gallery', desc: 'All pages screenshots', icon: '🖼️', route: 'screenshots' },
    { id: 'audit', label: 'Status Audit', desc: 'Honest status', icon: '✓', route: 'audit' },
    { id: 'simple-landing', label: 'Simple Landing', desc: 'ONE homepage only — Find your Danish level', icon: '🏠', route: 'simple-landing' },
  ];

  if (selectedUser) {
    const u = selectedUser;
    const prog = u.progress || {};
    const cleared = u.clearedStages || prog.clearedStages || {};
    const diag = u.diagnostic;
    const verdict = u.verdict;
    return (
      <div className="min-h-screen bg-[#FFFBF5] pb-[120px]">
        <div className="max-w-[800px] mx-auto px-5 pt-6">
          <button onClick={()=>setSelectedUser(null)} className="text-[14px] bg-white border border-black/10 px-4 py-2 rounded-full">← Back to users</button>
          
          <div className="mt-6 bg-white rounded-[24px] p-6 border border-black/5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-[22px] font-[700] tracking-tight">{u.name}</h1>
                <div className="text-[13px] text-[#8E8E93] mt-1">{u.email} • {u.role} • Created {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'} • Last active {u.lastActiveAt ? new Date(u.lastActiveAt).toLocaleDateString() : '—'}</div>
                <div className="mt-3 flex gap-2">
                  <span className="text-[11px] px-2.5 py-1 rounded-full bg-black text-white">{u.level || 'Ikke testet'}</span>
                  <span className="text-[11px] px-2.5 py-1 rounded-full bg-[#F2F2F7]">{Object.keys(cleared).length} stages cleared • {prog.overall||0}% overall</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={handleRevokeUser} className="bg-[#FF3B30] text-white px-4 py-2 rounded-full text-[12px] font-[600]">Revoke / Delete</button>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="bg-[#F2F2F7] rounded-[16px] p-4">
                <div className="text-[11px] font-[700] uppercase text-[#8E8E93]">Progress</div>
                <div className="mt-2 text-[13px] font-mono text-[11px] whitespace-pre-wrap">{JSON.stringify(prog, null, 2).slice(0,800)}</div>
              </div>
              <div className="bg-[#F2F2F7] rounded-[16px] p-4">
                <div className="text-[11px] font-[700] uppercase text-[#8E8E93]">Cleared Stages</div>
                <div className="mt-2 text-[12px]">{Object.keys(cleared).length ? Object.entries(cleared).map(([k,v])=><div key={k} className="flex justify-between bg-white rounded-full px-3 py-1.5 mt-1"><span>{k}</span><span>{v}</span></div>) : 'None yet'}</div>
              </div>
            </div>

            {diag && (
              <div className="mt-6 bg-[#F2F2F7] rounded-[16px] p-4">
                <div className="text-[11px] font-[700] uppercase text-[#8E8E93]">Diagnostic</div>
                <div className="mt-2 text-[12px] font-mono whitespace-pre-wrap">{JSON.stringify(diag, null, 2).slice(0,1000)}</div>
              </div>
            )}

            {verdict && (
              <div className="mt-4 bg-black text-white rounded-[16px] p-4">
                <div className="text-[11px] font-[700] uppercase text-white/60">Verdict</div>
                <div className="mt-2 text-[12px] font-mono whitespace-pre-wrap">{JSON.stringify(verdict, null, 2).slice(0,1000)}</div>
              </div>
            )}

            <div className="mt-6 border-t border-black/5 pt-6">
              <div className="text-[13px] font-[700]">Update user — Admin can control everything</div>
              <div className="mt-3 flex gap-2">
                <input value={editLevel} onChange={e=>setEditLevel(e.target.value)} placeholder="Modul 3 (A2) etc" className="flex-1 bg-[#F2F2F7] rounded-full px-4 py-2.5 text-[13px] outline-none" />
                <button onClick={handleUpdateUser} className="bg-black text-white px-5 py-2.5 rounded-full text-[13px] font-[600]">Update level</button>
              </div>
              <div className="mt-3 flex gap-2">
                <button onClick={handleClearProgress} className="bg-white border border-black/10 px-4 py-2 rounded-full text-[12px] font-[600]">Clear progress</button>
                <button onClick={handleRevokeUser} className="bg-[#FF3B30]/10 border border-[#FF3B30]/20 text-[#FF3B30] px-4 py-2 rounded-full text-[12px] font-[600]">Revoke / Delete user</button>
              </div>
              <div className="mt-3 text-[11px] text-[#8E8E93]">Admin can look at each one's progress, update them if needed and revoke them too — per your idea.</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F2F2F7] pb-[120px]">
      <div className="max-w-[1100px] mx-auto px-5 lg:px-8 pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-black text-white grid place-items-center font-bold">A</div>
            <div>
              <div className="text-[17px] font-[700] tracking-tight">Admin — Control Everything</div>
              <div className="text-[12px] text-[#8E8E93]">{user?.email} • {users.length} accounts • {stats?.learners||0} learners • {stats?.admins||0} admins</div>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={()=>setActive('practice')} className="bg-white border border-black/10 px-4 py-2 rounded-full text-[13px] font-[600]">My Learning →</button>
            <button onClick={handleLogout} className="bg-black text-white px-4 py-2 rounded-full text-[13px] font-[600]">Logout</button>
          </div>
        </div>

        <div className="mt-6 bg-black text-white rounded-[24px] p-6">
          <div className="text-[13px] font-[700]">Admin Idea — Your Idea</div>
          <div className="mt-2 text-[13px] leading-[1.5] text-white/80">Admin account that can control everything about the accounts, look at each one's progress, update them if needed and revoke them too. Accounts created after assessment which only appears after taking test and knowing your path — to get on that path and start learning. Person creates account. Shared to anyone who can just access a link do the test, get assessment and then know the path, can drop it there or create. Quick account and start the path which he was assessed for.</div>
          <div className="mt-3 flex gap-2 flex-wrap">
            <span className="text-[11px] bg-white/15 px-3 py-1 rounded-full">Shareable link → Test → Assessment + Path</span>
            <span className="text-[11px] bg-white/15 px-3 py-1 rounded-full">Quick account after path</span>
            <span className="text-[11px] bg-white/15 px-3 py-1 rounded-full">Start assessed path</span>
            <span className="text-[11px] bg-[#34C759] px-3 py-1 rounded-full">Admin controls all</span>
          </div>
        </div>

        <div className="mt-6 flex gap-2">
          <button onClick={()=>setActiveTab('users')} className={`px-5 py-2.5 rounded-full text-[13px] font-[600] ${activeTab==='users'?'bg-black text-white':'bg-white border border-black/10'}`}>Accounts • {users.length} — Control Everything</button>
          <button onClick={()=>setActiveTab('dev')} className={`px-5 py-2.5 rounded-full text-[13px] font-[600] ${activeTab==='dev'?'bg-black text-white':'bg-white border border-black/10'}`}>Dev Tools — Admin Only Tab — See How It Works</button>
          <button onClick={()=>setActive('assessment')} className="ml-auto bg-[#007AFF] text-white px-4 py-2.5 rounded-full text-[13px] font-[600]">Test link →</button>
        </div>

        {activeTab==='dev' ? (
          <div className="mt-6 bg-white rounded-[24px] p-6 border border-black/5">
            <div className="text-[15px] font-[700]">Dev Tools — Admin Only Tab — Don't Remove, Keep for Admin to See How It Works</div>
            <div className="text-[12px] text-[#8E8E93] mt-1">You said: dont remove them but out them only for admin in a tab so we can see how it is working — per your request. These are internal pages: Website, Architecture Map, Roadmap, Share QR, Flow, Levels, Motivation, Gallery, Audit, etc. For learner they redirect to SimpleLanding ONE homepage and stay on app. For admin they are accessible here in this tab + via Sidebar PRODUCT — Admin only.</div>
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {devTools.map(tool=>(
                <button key={tool.id} onClick={()=>setActive(tool.route)} className="text-left bg-[#F2F2F7] hover:bg-black hover:text-white rounded-[16px] p-4 border border-transparent hover:border-black transition group">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-white group-hover:bg-white/20 grid place-items-center text-[14px]">{tool.icon}</span>
                    <span className="text-[13px] font-[700]">{tool.label}</span>
                  </div>
                  <div className="mt-2 text-[11px] leading-[1.4] opacity-70">{tool.desc}</div>
                  <div className="mt-3 text-[11px] font-[600]">Open {tool.route} →</div>
                </button>
              ))}
            </div>
            <div className="mt-6 bg-black text-white rounded-[16px] p-4 text-[11px] leading-[1.5]">
              <b>How it works for admin:</b> Sidebar for admin shows PRODUCT — Admin only with Website Public, Assessment Shareable, Architecture Map Dev, Roadmap Dev, Share QR Dev + LEARN. This tab also shows all dev tools. For learner (non-admin), all these routes redirect to SimpleLandingView ONE homepage — stays on app, no architectural map, no roadmap, no zero to launch, no share QR — per your feedback Why we have on side assessment, architectural map and everything? Why for any login? I need just basic person — fixed. But kept for admin in this tab so you can see how it is working — per your request dont remove them but out them only for admin in a tab.
            </div>
          </div>
        ) : (
          <>
          <div className="mt-6 bg-white rounded-[24px] p-5 border border-black/5 flex gap-3">
            <input value={filter} onChange={e=>setFilter(e.target.value)} placeholder="Search name, email, level..." className="flex-1 bg-[#F2F2F7] rounded-full px-4 py-2.5 text-[13px] outline-none" />
            <button onClick={loadAll} className="bg-black text-white px-5 py-2.5 rounded-full text-[13px] font-[600]">Refresh</button>
          </div>

          <div className="mt-6 bg-white rounded-[24px] p-6 border border-black/5">
            <div className="text-[15px] font-[700]">Accounts • {filteredUsers.length} / {users.length}</div>
            <div className="text-[12px] text-[#8E8E93] mt-1">Admin can look at each one's progress, update them if needed and revoke them too — per your idea. Accounts created after assessment only appears after taking test and knowing path.</div>
          
          {loading ? <div className="mt-4 text-[13px] text-[#8E8E93]">Loading...</div> : filteredUsers.length===0 ? <div className="mt-4 text-[13px] text-[#8E8E93]">No accounts yet. Share assessment link: {window.location.origin}/?page=assessment — anyone can access link do test, get assessment and know path, can drop or create quick account and start path which he was assessed for.</div> : (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-[12px]">
                <thead><tr className="text-[10px] font-[700] uppercase text-[#8E8E93] border-b border-black/5"><th className="text-left py-2">User</th><th className="text-left">Role</th><th className="text-left">Level</th><th className="text-left">Progress</th><th className="text-left">Cleared</th><th className="text-left">Last Active</th><th className="text-left">Actions</th></tr></thead>
                <tbody>
                  {filteredUsers.map(u=>(
                    <tr key={u.id} className="border-b border-black/5 hover:bg-[#F2F2F7]">
                      <td className="py-3"><div className="font-[600]">{u.name}</div><div className="text-[11px] text-[#8E8E93]">{u.email}</div></td>
                      <td><span className={`px-2 py-1 rounded-full text-[10px] font-[700] ${u.role==='admin'?'bg-black text-white':'bg-[#F2F2F7]'}`}>{u.role}</span></td>
                      <td className="font-[600]">{u.level || 'Ikke testet'}</td>
                      <td>{u.progress?.overall||0}% • {Object.keys(u.progress||{}).length} keys</td>
                      <td className="text-[11px]">{Object.keys(u.clearedStages||{}).length ? Object.keys(u.clearedStages).join(', ').slice(0,60) : '—'}</td>
                      <td className="text-[11px] text-[#8E8E93]">{u.lastActiveAt ? new Date(u.lastActiveAt).toLocaleDateString() : '—'}</td>
                      <td>
                        <div className="flex gap-1">
                          <button onClick={()=>handleSelectUser(u)} className="bg-black text-white px-3 py-1 rounded-full text-[11px] font-[600]">View / Update / Revoke</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="mt-6 text-[11px] text-[#8E8E93] text-center">
          Shareable link for anyone: <b>{window.location.origin}/?page=assessment</b> → Test → Assessment + Path → Quick account → Start assessed path • Admin: Vipin / vipin123 • Users: {users.length} • Build 855KB
        </div>
        </>
        )}
      </div>
    </div>
  );
}
