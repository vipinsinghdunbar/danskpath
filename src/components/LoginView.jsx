import { useState } from 'react';
import { login } from '../lib/auth';

export default function LoginView({ onLoggedIn, setActive }) {
  const [name, setName] = useState('Vipin');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      const data = await login(name, password);
      if(navigator.vibrate) navigator.vibrate(20);
      onLoggedIn(data.user);
    } catch(e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F2F7] flex items-center justify-center p-5 pb-[120px]">
      <div className="w-full max-w-[400px]">
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full bg-black text-white grid place-items-center text-[32px] font-bold mx-auto shadow-lg">D</div>
          <h1 className="mt-5 text-[32px] font-[700] tracking-tight">DanskPath</h1>
          <p className="mt-2 text-[15px] text-[#8E8E93]">Admin • Vipin • Secure login</p>
          <div className="mt-3 inline-flex bg-white rounded-full px-3 py-1 text-[11px] font-[600] shadow-sm border border-black/5">Modul 1 → PD3 / A1 to B2 • Full education • iOS PWA</div>
        </div>

        <div className="bg-white rounded-[32px] p-7 shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-black/5">
          <div className="text-[13px] font-[700] tracking-tight">Welcome back, Vipin</div>
          <div className="text-[12px] text-[#8E8E93] mt-1">Admin / Main User • Your Danish dashboard</div>

          <div className="mt-6 space-y-4">
            <div>
              <label className="text-[11px] font-[700] tracking-widest uppercase text-[#8E8E93]">Name / Email</label>
              <input value={name} onChange={e=>setName(e.target.value)} placeholder="Vipin or vipin@danskpath.dk" className="mt-2 w-full px-5 py-4 rounded-full bg-[#F2F2F7] border-0 text-[17px] font-[500] outline-none focus:ring-2 focus:ring-black/10" />
            </div>
            <div>
              <label className="text-[11px] font-[700] tracking-widest uppercase text-[#8E8E93]">Password</label>
              <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" className="mt-2 w-full px-5 py-4 rounded-full bg-[#F2F2F7] border-0 text-[17px] outline-none focus:ring-2 focus:ring-black/10" onKeyDown={e=>e.key==='Enter'&&handleLogin()} />
              <div className="mt-2 text-[11px] text-[#8E8E93]">Default: vipin123 — change after first login in settings</div>
            </div>

            {error && <div className="bg-[#FF3B30]/10 border border-[#FF3B30]/20 rounded-[16px] p-3 text-[13px] text-[#FF3B30]">{error}</div>}

            <button onClick={handleLogin} disabled={loading || !name || !password} className="w-full bg-black text-white py-4 rounded-full text-[17px] font-[600] shadow-[0_4px_16px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.25)] hover:-translate-y-0.5 active:scale-[0.97] transition-all disabled:opacity-40 tap-haptic">
              {loading ? 'Logging in...' : 'Log in securely →'}
            </button>

            <div className="text-center">
              <button onClick={()=>setActive('landing')} className="text-[13px] text-[#8E8E93] hover:text-black">← Back to landing</button>
            </div>
          </div>

          <div className="mt-8 bg-[#F2F2F7] rounded-[16px] p-4">
            <div className="text-[11px] font-[700] tracking-widest uppercase text-[#8E8E93]">Two experiences</div>
            <div className="mt-2 text-[12px] leading-[1.5] text-[#3C3C43]/70 space-y-1">
              <div>• <b>Vipin/Admin:</b> Full platform + learning journey + trial analytics</div>
              <div>• <b>Trial user:</b> Intro → info → assessment → result → feedback → stop. No full access.</div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-[11px] text-[#8E8E93]">Secure • JWT • bcrypt • Data in danish-platform-db.json • Portable</div>
      </div>
    </div>
  );
}
