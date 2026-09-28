import { useState } from 'react';
import { login } from '../lib/auth';

// iPhone-first Login — fits completely within viewport, native iOS feel
export default function LoginView({ onLoggedIn, setActive }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState('login'); // login or signup

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
      // After login, go to assessment to find level
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
      setTimeout(() => setActive('assessment'), 100);
    } catch (e) {
      // Create demo account if doesn't exist
      try {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: 'demo', password: 'demo123', email: 'demo@danskpath.dk' })
        });
        if (res.ok) {
          const data = await login('demo', 'demo123');
          onLoggedIn(data.user);
          setTimeout(() => setActive('assessment'), 100);
        } else {
          setError('Kunne ikke oprette demo. Prøv manuel login.');
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
      {/* Safe area top */}
      <div className="h-[env(safe-area-inset-top)] bg-[#FFFBF5] shrink-0" />
      
      {/* Header — iOS back button */}
      <div className="flex items-center justify-between px-6 pt-2 pb-4 shrink-0">
        <button 
          onClick={() => setActive('welcome')}
          className="w-9 h-9 rounded-full bg-white border border-[#E8E0D6] grid place-items-center text-[16px] active:scale-[0.95] transition-transform"
        >
          ←
        </button>
        <div className="text-[15px] font-[600] text-[#121417]">Log ind</div>
        <div className="w-9 h-9" />
      </div>

      {/* Content — iPhone sized, fits viewport */}
      <div className="flex-1 flex flex-col px-6 pb-[calc(16px+env(safe-area-inset-bottom))] max-w-[390px] mx-auto w-full overflow-y-auto no-scrollbar">
        
        {/* Logo + Title — compact, not stretched */}
        <div className="text-center pt-2 pb-6">
          <div className="w-16 h-16 rounded-[20px] bg-[#121417] text-white grid place-items-center text-[24px] font-[700] mx-auto shadow-[0_4px_16px_rgba(18,20,23,0.15)] font-[Outfit]">
            D
          </div>
          <h1 className="mt-4 text-[28px] font-[700] tracking-[-0.02em] leading-[1.1] text-[#121417] font-[Outfit]">
            {mode === 'login' ? 'Velkommen tilbage' : 'Opret konto'}
          </h1>
          <p className="mt-2 text-[15px] leading-[1.4] text-[#6B6B6B]">
            {mode === 'login' ? 'Log ind for at fortsætte din rejse' : 'Start din danske læringsrejse'}
          </p>
        </div>

        {/* Mode switch — iOS segmented control */}
        <div className="flex bg-[#FFF8F0] rounded-full p-1 border border-[#E8E0D6] mb-6">
          <button
            onClick={() => setMode('login')}
            className={`flex-1 h-9 rounded-full text-[14px] font-[600] transition-all ${
              mode === 'login' ? 'bg-[#121417] text-white shadow-sm' : 'text-[#8E8E93]'
            }`}
          >
            Log ind
          </button>
          <button
            onClick={() => setMode('signup')}
            className={`flex-1 h-9 rounded-full text-[14px] font-[600] transition-all ${
              mode === 'signup' ? 'bg-[#121417] text-white shadow-sm' : 'text-[#8E8E93]'
            }`}
          >
            Opret
          </button>
        </div>

        {/* Form — iPhone inputs, 48px min height, correct spacing */}
        <div className="space-y-4">
          <div>
            <label className="text-[12px] font-[600] tracking-wide text-[#8E8E93] ml-1">Navn eller email</label>
            <input 
              value={name} 
              onChange={e=>setName(e.target.value)} 
              placeholder="Dit navn"
              autoCapitalize="off"
              autoCorrect="off"
              className="mt-2 w-full h-[52px] px-5 rounded-full bg-white border border-[#E8E0D6] text-[16px] font-[500] text-[#121417] placeholder:text-[#AEAEB2] outline-none focus:border-[#8AA99E] focus:ring-[3px] focus:ring-[#8AA99E]/15 transition-all"
            />
          </div>
          
          <div>
            <label className="text-[12px] font-[600] tracking-wide text-[#8E8E93] ml-1">Adgangskode</label>
            <input 
              type="password" 
              value={password} 
              onChange={e=>setPassword(e.target.value)} 
              placeholder="••••••••"
              className="mt-2 w-full h-[52px] px-5 rounded-full bg-white border border-[#E8E0D6] text-[16px] font-[500] text-[#121417] placeholder:text-[#AEAEB2] outline-none focus:border-[#8AA99E] focus:ring-[3px] focus:ring-[#8AA99E]/15 transition-all"
              onKeyDown={e=>e.key==='Enter'&&handleLogin()}
            />
          </div>

          {error && (
            <div className="bg-[#FBE8E2] border border-[#D88C7A]/20 rounded-[16px] p-3 text-[13px] text-[#B86E5A] leading-[1.4] animate-fade-up">
              {error}
            </div>
          )}

          {/* Primary action — 56px iOS, clear, full width */}
          <button 
            onClick={handleLogin} 
            disabled={loading || !name.trim() || !password.trim()} 
            className="w-full h-[56px] bg-[#121417] text-white rounded-full text-[17px] font-[600] tracking-[-0.01em] shadow-[0_4px_16px_rgba(18,20,23,0.15)] active:scale-[0.98] disabled:opacity-40 disabled:active:scale-100 transition-all flex items-center justify-center gap-2 mt-2"
          >
            {loading ? (
              <div className="w-5 h-5 rounded-full border-2 border-white/20 border-t-white animate-spin" />
            ) : (
              <>
                {mode === 'login' ? 'Log ind' : 'Opret konto'}
                <span>→</span>
              </>
            )}
          </button>

          {/* Demo quick login — secondary */}
          <button
            onClick={handleDemoLogin}
            disabled={loading}
            className="w-full h-[52px] bg-white border border-[#E8E0D6] rounded-full text-[15px] font-[600] text-[#121417] active:scale-[0.98] disabled:opacity-40 transition-all"
          >
            Prøv demo uden konto
          </button>
        </div>

        {/* Bottom info — minimal, not excessive */}
        <div className="mt-auto pt-8 pb-2">
          <div className="bg-[#FFF8F0] rounded-[16px] p-4 border border-[#E8E0D6]/60">
            <div className="text-[11px] font-[700] tracking-widest uppercase text-[#8E8E93]">Hvad sker der nu?</div>
            <div className="mt-2 text-[13px] leading-[1.4] text-[#6B6B6B] space-y-1">
              <div>• Find dit niveau på 7 minutter</div>
              <div>• Få din personlige læringsvej</div>
              <div>• Start med det der giver mest mening</div>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <div className="w-32 h-1 bg-[#121417] rounded-full opacity-10 mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}
