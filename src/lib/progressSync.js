// Progress Sync — Fortsæt her + Markér færdig ✓ persists across devices via server
// Syncs localStorage progress to server and back

import { isLoggedIn } from './auth';

const API_BASE = '';

function getToken() {
  return localStorage.getItem('danskpath_token');
}

function getAuthHeaders() {
  const token = getToken();
  return token ? { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' };
}

// Get progress from server
export async function fetchServerProgress() {
  if (!isLoggedIn()) return null;
  try {
    const res = await fetch(`${API_BASE}/api/progress`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data;
  } catch (e) {
    console.warn('[progressSync] fetchServerProgress failed', e.message);
    return null;
  }
}

// Save progress to server
export async function saveProgressToServer(progress, scores, clearedStages, level) {
  if (!isLoggedIn()) return null;
  try {
    const res = await fetch(`${API_BASE}/api/progress`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ progress, scores, clearedStages, level })
    });
    if (!res.ok) return null;
    const data = await res.json();
    console.log('[progressSync] saved progress to server', data.overall || data.progress?.overall);
    return data;
  } catch (e) {
    console.warn('[progressSync] saveProgressToServer failed', e.message);
    return null;
  }
}

// Mark stage cleared — Fortsæt her + Markér færdig ✓ persists across devices
export async function markStageClearedServer(moduleId, grammarRequirements = []) {
  const key = `stage_${moduleId}_cleared`;
  // Always set localStorage first (offline support)
  localStorage.setItem(key, 'true');
  
  // Try to sync to server if logged in
  if (!isLoggedIn()) {
    console.log(`[progressSync] ${moduleId} cleared locally (guest, no server)`);
    return { cleared: true, local: true };
  }
  
  try {
    const res = await fetch(`${API_BASE}/api/progress/stage/${moduleId}/clear`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ grammarDone: grammarRequirements })
    });
    if (!res.ok) {
      console.warn(`[progressSync] server clear failed for ${moduleId}, keeping local`);
      return { cleared: true, local: true, server: false };
    }
    const data = await res.json();
    console.log(`✅ [progressSync] ${moduleId} cleared — server synced — ${data.overall}% overall — persists across devices`);
    // Also sync localStorage clearedStages from server response
    if(data.clearedStages) {
      Object.entries(data.clearedStages).forEach(([k,v])=>{
        if(v==='true') localStorage.setItem(k, 'true');
      });
    }
    return { cleared: true, local: true, server: true, data };
  } catch (e) {
    console.warn(`[progressSync] markStageClearedServer failed for ${moduleId}`, e.message);
    return { cleared: true, local: true, server: false };
  }
}

// Unclear stage (for reset/testing)
export async function unmarkStageClearedServer(moduleId) {
  const key = `stage_${moduleId}_cleared`;
  localStorage.removeItem(key);
  
  if (!isLoggedIn()) return { cleared: false, local: true };
  
  try {
    const res = await fetch(`${API_BASE}/api/progress/stage/${moduleId}/unclear`, {
      method: 'POST',
      headers: getAuthHeaders()
    });
    if (!res.ok) return { cleared: false, local: true, server: false };
    const data = await res.json();
    console.log(`[progressSync] ${moduleId} unclear — server synced`);
    return { cleared: false, local: true, server: true, data };
  } catch (e) {
    console.warn(`[progressSync] unmarkStageClearedServer failed`, e.message);
    return { cleared: false, local: true, server: false };
  }
}

// Full sync localStorage → server (on login, on app start)
export async function syncLocalToServer() {
  if (!isLoggedIn()) return null;
  
  try {
    const progress = JSON.parse(localStorage.getItem('dansk_progress')||'{}');
    const scores = JSON.parse(localStorage.getItem('dansk_scores')||'{}');
    const level = localStorage.getItem('dansk_level');
    const diagnostic = JSON.parse(localStorage.getItem('dansk_diagnostic')||'null');
    const verdict = JSON.parse(localStorage.getItem('dansk_verdict')||'null');
    
    // Collect cleared stages from localStorage
    const clearedStages = {};
    ['m1','m2','m3','m4','m5'].forEach(m=>{
      const key = `stage_${m}_cleared`;
      if(localStorage.getItem(key)==='true') clearedStages[key] = 'true';
    });
    // Also from progress.clearedStages
    if(progress.clearedStages) {
      Object.assign(clearedStages, progress.clearedStages);
    }
    
    const res = await fetch(`${API_BASE}/api/progress/sync`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ progress, scores, clearedStages, level, diagnostic, verdict })
    });
    if (!res.ok) return null;
    const data = await res.json();
    console.log(`✅ [progressSync] full sync local → server — ${Object.keys(clearedStages).length} cleared stages — ${data.progress?.overall||0}% overall`);
    
    // Merge server cleared stages back to localStorage (server wins for cleared — once cleared stays cleared across devices)
    if(data.clearedStages) {
      Object.entries(data.clearedStages).forEach(([k,v])=>{
        if(v==='true') localStorage.setItem(k, 'true');
      });
    }
    if(data.progress) {
      const existingProgress = JSON.parse(localStorage.getItem('dansk_progress')||'{}');
      const merged = { ...existingProgress, ...data.progress, clearedStages: data.clearedStages };
      localStorage.setItem('dansk_progress', JSON.stringify(merged));
    }
    
    return data;
  } catch (e) {
    console.warn('[progressSync] syncLocalToServer failed', e.message);
    return null;
  }
}

// Load server progress → localStorage (on login, on app start for registered user)
export async function loadServerToLocal() {
  if (!isLoggedIn()) return null;
  
  try {
    const data = await fetchServerProgress();
    if(!data) return null;
    
    console.log(`[progressSync] loading server → local — ${Object.keys(data.clearedStages||{}).length} cleared stages`);
    
    // Merge cleared stages to localStorage
    if(data.clearedStages) {
      Object.entries(data.clearedStages).forEach(([k,v])=>{
        if(v==='true') localStorage.setItem(k, 'true');
      });
    }
    // Merge progress
    if(data.progress) {
      const existing = JSON.parse(localStorage.getItem('dansk_progress')||'{}');
      const merged = { ...existing, ...data.progress, clearedStages: data.clearedStages };
      localStorage.setItem('dansk_progress', JSON.stringify(merged));
    }
    if(data.scores) {
      const existingScores = JSON.parse(localStorage.getItem('dansk_scores')||'{}');
      const mergedScores = { ...existingScores, ...data.scores };
      localStorage.setItem('dansk_scores', JSON.stringify(mergedScores));
    }
    if(data.level) {
      localStorage.setItem('dansk_level', data.level);
    }
    if(data.diagnostic) {
      localStorage.setItem('dansk_diagnostic', JSON.stringify(data.diagnostic));
    }
    if(data.verdict) {
      localStorage.setItem('dansk_verdict', JSON.stringify(data.verdict));
    }
    
    return data;
  } catch (e) {
    console.warn('[progressSync] loadServerToLocal failed', e.message);
    return null;
  }
}

// Reset progress both local and server
export async function resetProgressBoth() {
  // Local
  localStorage.removeItem('dansk_progress');
  localStorage.removeItem('dansk_path');
  localStorage.removeItem('dansk_scores');
  localStorage.removeItem('dansk_srs');
  localStorage.removeItem('dansk_seen');
  ['m1','m2','m3','m4','m5'].forEach(m=>localStorage.removeItem(`stage_${m}_cleared`));
  
  // Server if logged in
  if(isLoggedIn()) {
    try {
      await fetch(`${API_BASE}/api/progress`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ progress: {}, scores: {}, clearedStages: {}, level: null })
      });
      console.log('[progressSync] reset progress both local and server');
    } catch {}
  }
}
