// Auth lib — handles JWT token, login, admin check
// Phase 3: Logout clears all learner data from localStorage, including dansk_diagnostic per Action Plan
const TOKEN_KEY = 'danskpath_token';
const USER_KEY = 'danskpath_user';

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token, user) {
  localStorage.setItem(TOKEN_KEY, token);
  if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY) || 'null');
  } catch { return null; }
}

export function isLoggedIn() {
  return !!getToken();
}

export function isAdmin() {
  const u = getUser();
  return u?.role === 'admin';
}

export function logout() {
  // Phase 3: Logout clears all learner data from localStorage, including dansk_diagnostic
  // Detect different user on same device and never show previous person's result
  const keysToClear = [
    TOKEN_KEY, USER_KEY, 
    'dansk_diagnostic','dansk_verdict','dansk_level','dansk_progress','dansk_scores','dansk_path','dansk_srs','dansk_seen','dansk_user_seed','dansk_goals','dansk_welcomed','dansk_assessment_idx','dansk_assessment_answers','dansk_wrong',
    'danskpath_user','danskpath_token'
  ];
  ['m1','m2','m3','m4','m5'].forEach(m=> keysToClear.push(`stage_${m}_cleared`));
  keysToClear.forEach(k => { try { localStorage.removeItem(k); } catch {} });
  try { 
    Object.keys(localStorage).forEach(k => { 
      if (k.startsWith('dansk_')) localStorage.removeItem(k); 
    }); 
  } catch {}
}

export async function login(emailOrName, password) {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: emailOrName, name: emailOrName, password })
  });
  const data = await res.json();
  if (!data.ok) throw new Error(data.error || 'Login failed');
  // Detect different user on same device and never show previous person's result
  const prevUser = getUser();
  if (prevUser && prevUser.id !== data.user.id) {
    // Different user — clear previous learner data
    try {
      Object.keys(localStorage).forEach(k => {
        if (k.startsWith('dansk_') && k!=='dansk_user_seed') localStorage.removeItem(k);
      });
    } catch {}
  }
  setToken(data.token, data.user);
  return data;
}

export async function fetchMe() {
  const token = getToken();
  if (!token) return null;
  const res = await fetch('/api/auth/me', {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) {
    logout();
    return null;
  }
  const data = await res.json();
  if (data.ok && data.user) {
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    return data.user;
  }
  return null;
}

export function getAuthHeader() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}
