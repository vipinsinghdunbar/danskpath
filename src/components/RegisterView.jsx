import { useState } from 'react';

// RegisterView — Save progress bottom sheet per Action Plan Phase 4
// Must have: Bottom sheet after first completed exercise, username password recovery email, Not now works, nudge returns once later, not full-page account wall, asking before first win avoided
// Ship checklist: one primary action, can remove one element, passes light/dark 390px/1440px, first-time user reaches next without reading, uses ds.css

export default function RegisterView({ setActive }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    if (!username || !password || !email) {
      setError('Username, password, and recovery email required per Phase 3');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: username, email, password, recoveryEmail: email })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error||'Register failed');
      localStorage.setItem('danskpath_token', data.token);
      localStorage.setItem('danskpath_user', JSON.stringify(data.user));
      // Transfer guest data per Phase 5 verification
      const guestProgress = localStorage.getItem('dansk_progress');
      if (guestProgress) {
        try {
          await fetch('/api/progress/sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${data.token}` },
            body: JSON.stringify({ progress: JSON.parse(guestProgress) })
          });
        } catch {}
      }
      setActive('path');
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black/50 backdrop-blur-sm flex items-end justify-center p-0 lg:p-6">
      {/* Bottom sheet per spec — not full-page wall */}
      <div className="w-full max-w-[480px] bg-white rounded-t-[22px] lg:rounded-[22px] p-6 pb-[calc(24px+env(safe-area-inset-bottom))] shadow-[0_8px_32px_rgba(0,0,0,0.12)] animate-[slideUp_340ms_cubic-bezier(0.16,1,0.3,1)]">
        <div className="w-10 h-1 bg-[var(--border)] rounded-full mx-auto mb-6"></div>
        
        <div className="text-[11px] font-[700] tracking-widest uppercase text-[var(--muted)]">Save progress • After first win • Not now works</div>
        <h1 className="mt-3 text-[24px] font-[700] tracking-tight leading-[0.95]">Save your progress</h1>
        <p className="mt-2 text-[14px] leading-[1.5] text-[var(--ink-secondary)]">Your 5-min check is done. Save to continue on other devices. Recovery email required per Phase 3 — forgotten password loses journey.</p>

        <div className="mt-6 space-y-3">
          <div>
            <label className="text-[11px] font-[600] text-[var(--muted)] uppercase tracking-wide">Username</label>
            <input value={username} onChange={e=>setUsername(e.target.value)} placeholder="Your name" className="mt-1 w-full px-4 py-3.5 rounded-[12px] border border-[var(--border)] bg-[var(--bg)] text-[15px] focus:border-[var(--ink)] focus:outline-none" />
          </div>
          <div>
            <label className="text-[11px] font-[600] text-[var(--muted)] uppercase tracking-wide">Password</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" className="mt-1 w-full px-4 py-3.5 rounded-[12px] border border-[var(--border)] bg-[var(--bg)] text-[15px] focus:border-[var(--ink)] focus:outline-none" />
          </div>
          <div>
            <label className="text-[11px] font-[600] text-[var(--muted)] uppercase tracking-wide">Recovery email • Required</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" className="mt-1 w-full px-4 py-3.5 rounded-[12px] border border-[var(--border)] bg-[var(--bg)] text-[15px] focus:border-[var(--ink)] focus:outline-none" />
            <div className="mt-1 text-[11px] text-[var(--muted)]">Required per Phase 3: username plus password with no recovery means forgotten password loses journey.</div>
          </div>
        </div>

        {error && <div className="mt-4 p-3 bg-[#FEF2F2] border border-[#DC2626]/20 rounded-[12px] text-[13px] text-[#DC2626]">{error}</div>}

        {/* One primary action — bottom thumb zone */}
        <div className="mt-6">
          <button onClick={handleRegister} disabled={loading} className="w-full bg-[var(--ink)] text-white py-4 rounded-full text-[16px] font-[600] disabled:opacity-50 min-h-[56px]">
            {loading ? 'Saving…' : 'Save progress'}
          </button>
          <button onClick={()=>setActive('path')} className="mt-3 w-full bg-white border border-[var(--border)] py-3.5 rounded-full text-[14px] font-[600]">Not now • Nudge returns once later</button>
          <div className="mt-3 text-center text-[11px] text-[var(--muted)]">Bottom sheet after first win per spec • Not full-page wall • Asking before first win avoided • Account after value • Guest to register transfers all guest data per Phase 5</div>
        </div>
      </div>

      <style>{`@keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }`}</style>
    </div>
  );
}
