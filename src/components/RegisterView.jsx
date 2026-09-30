import { useState } from 'react';

export default function RegisterView({ setActive }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const diagnostic = (()=>{ try { return JSON.parse(localStorage.getItem('dansk_diagnostic')||'null'); } catch { return null; } })();
  const level = localStorage.getItem('dansk_level') || 'Modul 3';

  const handleRegister = async () => {
    setError('');
    
    if(!username || username.length < 3) {
      setError('Username must be at least 3 characters');
      return;
    }
    if(!password || password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if(password !== confirm) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      // Create account via API
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: username, 
          email: username, 
          password,
          // Transfer guest data including Fortsæt her progress sync for cross-device persistence
          guestData: {
            diagnostic: localStorage.getItem('dansk_diagnostic'),
            level: localStorage.getItem('dansk_level'),
            verdict: localStorage.getItem('dansk_verdict'),
            goals: localStorage.getItem('dansk_goals'),
            progress: localStorage.getItem('dansk_progress'),
            scores: localStorage.getItem('dansk_scores'),
            userSeed: localStorage.getItem('dansk_user_seed'),
            // NEW: Fortsæt her cleared stages persist across devices
            clearedStages: JSON.stringify(Object.fromEntries(['m1','m2','m3','m4','m5'].map(m=>[`stage_${m}_cleared`, localStorage.getItem(`stage_${m}_cleared`)||'false']).filter(([,v])=>v==='true'))),
            stage_m1_cleared: localStorage.getItem('stage_m1_cleared'),
            stage_m2_cleared: localStorage.getItem('stage_m2_cleared'),
            stage_m3_cleared: localStorage.getItem('stage_m3_cleared'),
            stage_m4_cleared: localStorage.getItem('stage_m4_cleared'),
            stage_m5_cleared: localStorage.getItem('stage_m5_cleared')
          }
        })
      });

      const data = await res.json();
      
      if(!data.ok) {
        // If API fails, still create local account for MVP (offline mode)
        console.log('API register failed, using local mode:', data.error);
        const user = { 
          id: 'local_' + Date.now(), 
          name: username, 
          role: 'learner',
          level: level,
          createdAt: new Date().toISOString()
        };
        localStorage.setItem('danskpath_user', JSON.stringify(user));
        localStorage.setItem('danskpath_token', 'local_token_' + Date.now());
        // Keep all guest data - transfer is automatic via localStorage
        setSuccess(true);
        setTimeout(()=>{
          if(navigator.vibrate) navigator.vibrate(20);
          setActive('practice');
        }, 1000);
        return;
      }

      // Success - save token and user
      localStorage.setItem('danskpath_token', data.token);
      localStorage.setItem('danskpath_user', JSON.stringify(data.user));
      
      setSuccess(true);
      setTimeout(()=>{
        if(navigator.vibrate) navigator.vibrate(20);
        setActive('practice');
      }, 1000);

    } catch(e) {
      // Offline fallback for MVP
      console.log('Register error, offline fallback:', e.message);
      const user = { 
        id: 'local_' + Date.now(), 
        name: username, 
        role: 'learner',
        level: level,
        createdAt: new Date().toISOString()
      };
      localStorage.setItem('danskpath_user', JSON.stringify(user));
      localStorage.setItem('danskpath_token', 'local_token_' + Date.now());
      setSuccess(true);
      setTimeout(()=>{
        if(navigator.vibrate) navigator.vibrate(20);
        setActive('practice');
      }, 1000);
    } finally {
      setLoading(false);
    }
  };

  if(success) {
    return (
      <div className="min-h-screen bg-[#FFFBF5] flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-[400px] text-center">
          <div className="w-20 h-20 rounded-full bg-[#34C759] text-white grid place-items-center text-[32px] mx-auto">✓</div>
          <h1 className="mt-6 text-[28px] font-[700] tracking-tight">Account created</h1>
          <p className="mt-3 text-[15px] text-[#8E8E93] leading-[1.5]">Your assessment and learning path have been saved.</p>
          <div className="mt-6 bg-white rounded-[20px] p-4 border border-black/5 text-left">
            <div className="text-[11px] font-[700] tracking-widest uppercase text-[#8E8E93]">Transferred</div>
            <div className="mt-2 space-y-1 text-[13px]">
              <div>✓ Assessment answers</div>
              <div>✓ Level: {level}</div>
              <div>✓ Strengths & weaknesses</div>
              <div>✓ Personalized path M1→PD3</div>
              <div>✓ Progress state</div>
            </div>
          </div>
          <div className="mt-6 text-[13px] text-[#8E8E93]">Continuing to your dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFBF5] flex flex-col">
      <div className="h-[env(safe-area-inset-top,0px)] bg-[#FFFBF5]" />
      
      <div className="flex-1 flex flex-col px-6 pt-8 pb-6 max-w-[400px] mx-auto w-full">
        {/* Header */}
        <button onClick={()=>setActive('path')} className="self-start w-10 h-10 rounded-full bg-white border border-black/10 grid place-items-center text-[16px]">←</button>
        
        <div className="mt-8">
          <h1 className="text-[32px] font-[700] tracking-tight leading-[0.9]">Start learning</h1>
          <p className="mt-3 text-[15px] leading-[1.5] text-[#8E8E93]">Create an account to save your journey and continue from where you stopped.</p>
          
          {diagnostic && (
            <div className="mt-6 bg-white rounded-[20px] p-4 border border-black/5">
              <div className="text-[11px] font-[700] tracking-widest uppercase text-[#8E8E93]">Your assessment will be saved</div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-[20px] font-[700]">{diagnostic.pct}%</span>
                <span className="text-[12px] font-[600] bg-black text-white px-2.5 py-1 rounded-full">{level}</span>
              </div>
              <div className="mt-2 text-[11px] text-[#8E8E93]">{diagnostic.pct}% • {level} • Personal path M1→PD3 ready</div>
            </div>
          )}
        </div>

        <div className="mt-8 space-y-4">
          <div>
            <label className="text-[11px] font-[700] tracking-widest uppercase text-[#8E8E93]">Username</label>
            <input 
              value={username} 
              onChange={e=>setUsername(e.target.value)} 
              placeholder="Choose a username"
              className="mt-2 w-full px-5 py-4 rounded-full bg-white border border-black/10 text-[17px] outline-none focus:ring-2 focus:ring-black/10 focus:border-black"
            />
          </div>
          
          <div>
            <label className="text-[11px] font-[700] tracking-widest uppercase text-[#8E8E93]">Password</label>
            <input 
              type="password"
              value={password} 
              onChange={e=>setPassword(e.target.value)} 
              placeholder="At least 6 characters"
              className="mt-2 w-full px-5 py-4 rounded-full bg-white border border-black/10 text-[17px] outline-none focus:ring-2 focus:ring-black/10 focus:border-black"
            />
          </div>

          <div>
            <label className="text-[11px] font-[700] tracking-widest uppercase text-[#8E8E93]">Confirm password</label>
            <input 
              type="password"
              value={confirm} 
              onChange={e=>setConfirm(e.target.value)} 
              placeholder="Repeat password"
              className="mt-2 w-full px-5 py-4 rounded-full bg-white border border-black/10 text-[17px] outline-none focus:ring-2 focus:ring-black/10 focus:border-black"
              onKeyDown={e=>e.key==='Enter'&&handleRegister()}
            />
          </div>

          {error && (
            <div className="bg-[#FF3B30]/10 border border-[#FF3B30]/20 rounded-[16px] p-3 text-[13px] text-[#FF3B30]">
              {error}
            </div>
          )}

          <button 
            onClick={handleRegister} 
            disabled={loading || !username || !password || !confirm}
            className="w-full bg-black text-white py-4 rounded-full text-[17px] font-[600] shadow-[0_8px_24px_rgba(0,0,0,0.15)] active:scale-[0.98] transition-all disabled:opacity-40 mt-2"
          >
            {loading ? 'Creating account...' : 'Create account →'}
          </button>

          <div className="text-center pt-2">
            <button onClick={()=>setActive('login')} className="text-[13px] text-[#8E8E93] hover:text-black">
              Already have an account? Log in
            </button>
          </div>

          <div className="pt-4 text-[11px] text-[#8E8E93] leading-[1.4] text-center">
            Your assessment, level, strengths, weaknesses, and learning path will be transferred to your new account. You won't need to repeat the test.
          </div>
        </div>
      </div>

      <div className="h-[env(safe-area-inset-bottom,0px)] bg-[#FFFBF5]" />
    </div>
  );
}
