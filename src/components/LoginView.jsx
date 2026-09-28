import { useState } from 'react';
import { login } from '../lib/auth';

// Apple Premium Login — iOS 17+ native, materials, blur, premium
export default function LoginView({ onLoggedIn, setActive }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState('login');

  const handleLogin = async () => {
    if (!name.trim() || !password.trim()) {
      setError('Udfyld begge felter');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const data = await login(name, password);
      if (navigator.vibrate) navigator.vibrate(20);
      onLoggedIn(data.user);
      localStorage.setItem('dansk_welcomed', 'true');
      setTimeout(() => setActive('assessment'), 100);
    } catch (e) {
      setError(e.message || 'Forkert login. Prøv igen.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setName('demo');
    setPassword('demo123');
    setError('');
    setLoading(true);
    try {
      const data = await login('demo', 'demo123');
      if (navigator.vibrate) navigator.vibrate(20);
      onLoggedIn(data.user);
      localStorage.setItem('dansk_welcomed', 'true');
      setTimeout(() => setActive('assessment'), 100);
    } catch (e) {
      try {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: 'demo', password: 'demo123', email: 'demo@danskpath.dk' })
        });
        if (res.ok) {
          const data = await login('demo', 'demo123');
          onLoggedIn(data.user);
          localStorage.setItem('dansk_welcomed', 'true');
          setTimeout(() => setActive('assessment'), 100);
        } else {
          setError('Kunne ikke oprette demo. Prøv: Vipin / vipin123');
        }
      } catch {
        setError('Demo login fejlede. Prøv: Vipin / vipin123');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[100dvh] bg-[#FFFBF5] flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFFBF5] via-[#FFFBF5] to-[#FFF8F0] pointer-events-none" />
      <div className="absolute top-[-100px] right-[-80px] w-[240px] h-[240px] bg-[#E3EDEA]/40 rounded-full blur-[60px] pointer-events-none" />
      
      <div className="h-[env(safe-area-inset-top)] bg-transparent shrink-0 relative z-10" />
      
      <div className="flex items-center justify-between px-6 pt-2 pb-4 shrink-0 max-w-[390px] mx-auto w-full relative z-10">
        <button 
          onClick={() => setActive('welcome')}
          className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-[20px] border border-[#E8E0D6]/60 shadow-[0_1px_4px_rgba(18,20,23,0.04)] grid place-items-center text-[16px] active:scale-[0.95] transition-all"
        >
          ←
        </button>
        <div className="bg-white/70 backdrop-blur-[20px] border border-[#E8E0D6]/50 rounded-full px-4 py-1.5 shadow-[0_1px_4px_rgba(18,20,23,0.04)]">
          <div className="text-[13px] font-[600] tracking-[-0.01em] text-[#121417]">Log ind</div>
        </div>
        <div className="w-10 h-10" />
      </div>

      <div className="flex-1 flex flex-col px-6 pb-[calc(16px+env(safe-area-inset-bottom))] max-w-[390px] mx-auto w-full overflow-y-auto no-scrollbar relative z-10">
        
        <div className="text-center pt-2 pb-6">
          <div className="relative inline-block">
            <div className="w-20 h-20 rounded-[24px] bg-[#121417] text-white grid place-items-center text-[28px] font-[800] mx-auto shadow-[0_8px_24px_rgba(18,20,23,0.15),0_2px_8px_rgba(18,20,23,0.1)] relative overflow-hidden font-[Outfit]">
              <div className="absolute inset-[1px] rounded-[23px] bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
              <span className="relative">D</span>
            </div>
            <div className="absolute inset-0 w-20 h-20 rounded-[24px] bg-[#121417]/15 blur-[16px] -z-10" />
          </div>
          <h1 className="mt-5 text-[28px] font-[700] tracking-[-0.03em] leading-[1.1] text-[#121417] font-[Outfit]">
            {mode === 'login' ? 'Velkommen tilbage' : 'Opret konto'}
          </h1>
          <p className="mt-2.5 text-[15px] leading-[1.5] tracking-[-0.01em] text-[#6B6B6B]">
            {mode === 'login' ? 'Log ind for at fortsætte din rejse' : 'Start din danske læringsrejse'}
          </p>
        </div>

        <div className="flex bg-white/60 backdrop-blur-[20px] rounded-full p-1.5 border border-[#E8E0D6]/50 shadow-[0_1px_4px_rgba(18,20,23,0.04)] mb-7">
          <button
            onClick={() => setMode('login')}
            className={`flex-1 h-10 rounded-full text-[14px] font-[600] tracking-[-0.01em] transition-all ${
              mode === 'login' ? 'bg-[#121417] text-white shadow-[0_2px_8px_rgba(18,20,23,0.15)]' : 'text-[#8E8E93]'
            }`}
          >
            Log ind
          </button>
          <button
            onClick={() => setMode('signup')}
            className={`flex-1 h-10 rounded-full text-[14px] font-[600] tracking-[-0.01em] transition-all ${
              mode === 'signup' ? 'bg-[#121417] text-white shadow-[0_2px_8px_rgba(18,20,23,0.15)]' : 'text-[#8E8E93]'
            }`}
          >
            Opret
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-[11px] font-[700] tracking-[0.06em] uppercase text-[#8E8E93] ml-1">Navn eller email</label>
            <input 
              value={name} 
              onChange={e=>setName(e.target.value)} 
              placeholder="Dit navn"
              autoCapitalize="off"
              autoCorrect="off"
              className="mt-2 w-full h-[56px] px-5 rounded-full bg-white/80 backdrop-blur-[20px] border border-[#E8E0D6]/60 text-[16px] font-[500] tracking-[-0.01em] text-[#121417] placeholder:text-[#AEAEB2] outline-none focus:border-[#121417]/20 focus:ring-[4px] focus:ring-[#121417]/[0.06] shadow-[0_1px_4px_rgba(18,20,23,0.04)] transition-all"
            />
          </div>
          
          <div>
            <label className="text-[11px] font-[700] tracking-[0.06em] uppercase text-[#8E8E93] ml-1">Adgangskode</label>
            <input 
              type="password" 
              value={password} 
              onChange={e=>setPassword(e.target.value)} 
              placeholder="••••••••"
              className="mt-2 w-full h-[56px] px-5 rounded-full bg-white/80 backdrop-blur-[20px] border border-[#E8E0D6]/60 text-[16px] font-[500] tracking-[-0.01em] text-[#121417] placeholder:text-[#AEAEB2] outline-none focus:border-[#121417]/20 focus:ring-[4px] focus:ring-[#121417]/[0.06] shadow-[0_1px_4px_rgba(18,20,23,0.04)] transition-all"
              onKeyDown={e=>e.key==='Enter'&&handleLogin()}
            />
          </div>

          {error && (
            <div className="bg-[#FBE8E2]/80 backdrop-blur-[12px] border border-[#D88C7A]/20 rounded-[16px] p-3.5 text-[13px] leading-[1.4] tracking-[-0.01em] text-[#B86E5A] animate-fade-up shadow-[0_2px_8px_rgba(216,140,122,0.08)]">
              {error}
            </div>
          )}

          <button 
            onClick={handleLogin} 
            disabled={loading || !name.trim() || !password.trim()} 
            className="w-full h-[56px] bg-[#121417] text-white rounded-full text-[17px] font-[600] tracking-[-0.01em] shadow-[0_8px_24px_rgba(18,20,23,0.18),0_2px_8px_rgba(18,20,23,0.12)] active:scale-[0.98] active:shadow-[0_2px_8px_rgba(18,20,23,0.1)] disabled:opacity-40 disabled:active:scale-100 transition-all flex items-center justify-center gap-2 mt-2 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/[0.08] to-white/0 translate-x-[-100%] group-active:translate-x-[100%] transition-transform duration-700" />
            {loading ? (
              <div className="w-5 h-5 rounded-full border-2 border-white/20 border-t-white animate-spin relative" />
            ) : (
              <>
                <span className="relative">{mode === 'login' ? 'Log ind' : 'Opret konto'}</span>
                <span className="relative text-[18px]">→</span>
              </>
            )}
          </button>

          <button
            onClick={handleDemoLogin}
            disabled={loading}
            className="w-full h-[52px] bg-white/80 backdrop-blur-[20px] border border-[#E8E0D6]/60 rounded-full text-[15px] font-[600] tracking-[-0.01em] text-[#121417] shadow-[0_1px_4px_rgba(18,20,23,0.04)] active:scale-[0.98] disabled:opacity-40 transition-all"
          >
            Prøv demo uden konto
          </button>
        </div>

        <div className="mt-auto pt-8 pb-2">
          <div className="bg-white/60 backdrop-blur-[20px] rounded-[20px] p-4 border border-[#E8E0D6]/40 shadow-[0_2px_12px_rgba(18,20,23,0.04)]">
            <div className="flex items-center gap-2 mb-2.5">
              <div className="w-5 h-5 rounded-full bg-[#121417] text-white grid place-items-center text-[10px]">✓</div>
              <div className="text-[11px] font-[700] tracking-[0.06em] uppercase text-[#8E8E93]">Hvad sker der nu?</div>
            </div>
            <div className="space-y-2">
              {[
                "Find dit niveau på 7 minutter",
                "Få din personlige læringsvej",
                "Start med det der giver mest mening"
              ].map((t,i)=>(
                <div key={i} className="flex items-center gap-2.5 text-[13px] leading-[1.4] tracking-[-0.01em] text-[#6B6B6B]">
                  <div className="w-1 h-1 rounded-full bg-[#8AA99E] shrink-0" />
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-6 flex justify-center">
            <div className="w-32 h-1 bg-[#121417] rounded-full opacity-10" />
          </div>
        </div>
      </div>
    </div>
  );
}
