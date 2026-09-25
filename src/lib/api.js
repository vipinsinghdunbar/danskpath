// API lib — talks to backend (port 3001) or same origin in prod
const API_BASE = ''; // same origin, vite proxy or prod static

export async function api(path, opts = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...opts,
    headers: { 'Content-Type': 'application/json', ...(opts.headers || {}) }
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'API error');
  return data;
}

// Questions — adaptive varied
export async function getQuestions() {
  try {
    const data = await api('/api/questions');
    return data.questions;
  } catch {
    // fallback to local
    return null;
  }
}

export async function startTrial({ code, name, danishStartDate, goal, invitedBy }) {
  return await api('/api/trial/start', {
    method: 'POST',
    body: JSON.stringify({ code, name, danishStartDate, goal, invitedBy })
  });
}

export async function submitAssessment({ trialId, answers, timeSpent }) {
  return await api('/api/trial/assessment', {
    method: 'POST',
    body: JSON.stringify({ trialId, answers, timeSpent })
  });
}

export async function submitFeedback({ trialId, wouldUse, helpful, wouldPay, whatToChange, nps }) {
  return await api('/api/trial/feedback', {
    method: 'POST',
    body: JSON.stringify({ trialId, wouldUse, helpful, wouldPay, whatToChange, nps })
  });
}

export async function createReferral(baseUrl, note) {
  const { getAuthHeader } = await import('./auth.js');
  return await api('/api/referrals', {
    method: 'POST',
    headers: getAuthHeader(),
    body: JSON.stringify({ baseUrl, note })
  });
}

export async function getReferrals() {
  const { getAuthHeader } = await import('./auth.js');
  return await api('/api/referrals', {
    headers: getAuthHeader()
  });
}

export async function getAdminTrials() {
  const { getAuthHeader } = await import('./auth.js');
  return await api('/api/admin/trials', {
    headers: getAuthHeader()
  });
}

export async function getAdminStats() {
  const { getAuthHeader } = await import('./auth.js');
  return await api('/api/admin/stats', {
    headers: getAuthHeader()
  });
}

export function getRefCodeFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('ref') || params.get('code') || params.get('invitedBy') || null;
}

export function isTrialLink() {
  const params = new URLSearchParams(window.location.search);
  return params.has('ref') || params.has('trial') || params.has('friend') || window.location.pathname.startsWith('/trial');
}
