// Progress Sync — Monotone merge per Action Plan Phase3
// Merge rule: Answers Union, Word-book max, Completed earliest date, Stage best score, Admin-set kept marked, tell learner one line merged
// Shared devices: logout clears all learner data including dansk_diagnostic

import { isLoggedIn } from './auth';

const API_BASE = '';

function getToken() {
  return localStorage.getItem('danskpath_token');
}

function getAuthHeaders() {
  const token = getToken();
  return token ? { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' };
}

function mergeProgressMonotone(local, server) {
  if (!local) return server || {};
  if (!server) return local || {};
  
  const merged = { ...local };
  
  // Answers Union per table
  merged.answers = { ...(local.answers||{}), ...(server.answers||{}) };
  // Union both ways — server may have answers local doesn't
  Object.keys(local.answers||{}).forEach(k=>{ if(!(k in merged.answers)) merged.answers[k]=local.answers[k]; });
  Object.keys(server.answers||{}).forEach(k=>{ if(!(k in merged.answers)) merged.answers[k]=server.answers[k]; });
  // Actually union = all keys from both
  merged.answers = { ...(local.answers||{}), ...(server.answers||{}) };
  // Preserve true over false if conflict? Use max (true=1)
  Object.keys(merged.answers).forEach(k=>{
    const l = local.answers?.[k];
    const s = server.answers?.[k];
    if (l===true || s===true) merged.answers[k]=true;
    else if (l!==undefined) merged.answers[k]=l;
    else merged.answers[k]=s;
  });
  
  // Word-book max per table
  merged.vocabDone = Math.max(local.vocabDone||0, server.vocabDone||0);
  merged.grammarDone = Math.max(local.grammarDone||0, server.grammarDone||0);
  merged.srs = { ...(local.srs||{}), ...(server.srs||{}) };
  Object.keys(merged.srs).forEach(k=>{
    const l = local.srs?.[k]?.level || 0;
    const s = server.srs?.[k]?.level || 0;
    merged.srs[k] = { level: Math.max(l,s) };
  });
  
  // Completed earliest date
  merged.completedSteps = { ...(local.completedSteps||{}), ...(server.completedSteps||{}) };
  Object.keys(merged.completedSteps).forEach(k=>{
    const l = local.completedSteps?.[k];
    const s = server.completedSteps?.[k];
    if (l && s) {
      merged.completedSteps[k] = new Date(l) < new Date(s) ? l : s;
    } else {
      merged.completedSteps[k] = l || s;
    }
  });
  
  // Stage best score
  merged.stageScores = { ...(local.stageScores||{}), ...(server.stageScores||{}) };
  Object.keys(merged.stageScores).forEach(k=>{
    merged.stageScores[k] = Math.max(local.stageScores?.[k]||0, server.stageScores?.[k]||0);
  });
  
  // Admin-set kept marked per table
  merged.adminSet = { ...(local.adminSet||{}), ...(server.adminSet||{}) };
  // If either marks admin-set, keep marked
  Object.keys(merged.adminSet).forEach(k=>{
    if (local.adminSet?.[k]==='true' || server.adminSet?.[k]==='true') merged.adminSet[k]='true';
  });
  
  // Overall max
  merged.overall = Math.max(local.overall||0, server.overall||0);
  
  // Cleared stages union — once cleared stays cleared
  merged.clearedStages = { ...(local.clearedStages||{}), ...(server.clearedStages||{}) };
  Object.keys(merged.clearedStages).forEach(k=>{
    if (local.clearedStages?.[k]==='true' || server.clearedStages?.[k]==='true') merged.clearedStages[k]='true';
  });
  
  return merged;
}

export async function fetchServerProgress() {
  if (!isLoggedIn()) return null;
  try {
    const res = await fetch(`${API_BASE}/api/progress`, { headers: getAuthHeaders() });
    if (!res.ok) return null;
    const data = await res.json();
    return data;
  } catch (e) {
    console.warn('[progressSync] fetchServerProgress failed', e.message);
    return null;
  }
}

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
    console.log(`[progressSync] saved ${Object.keys(progress.answers||{}).length} answers to server`);
    return data;
  } catch (e) {
    console.warn('[progressSync] saveProgressToServer failed', e.message);
    return null;
  }
}

export async function markStageClearedServer(moduleId, grammarRequirements = []) {
  const key = `stage_${moduleId}_cleared`;
  localStorage.setItem(key, 'true');
  if (!isLoggedIn()) return { cleared: true, local: true };
  try {
    const res = await fetch(`${API_BASE}/api/progress/stage/${moduleId}/clear`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ grammarDone: grammarRequirements })
    });
    if (!res.ok) return { cleared: true, local: true, server: false };
    const data = await res.json();
    console.log(`[progressSync] ${moduleId} cleared — server synced — mastery 80% over 15`);
    if(data.clearedStages) {
      Object.entries(data.clearedStages).forEach(([k,v])=>{ if(v==='true') localStorage.setItem(k, 'true'); });
    }
    return { cleared: true, local: true, server: true, data };
  } catch (e) {
    return { cleared: true, local: true, server: false };
  }
}

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
    return { cleared: false, local: true, server: true, data };
  } catch (e) {
    return { cleared: false, local: true, server: false };
  }
}

// Full sync localStorage → server with monotone merge per Action Plan Phase3
export async function syncLocalToServer() {
  if (!isLoggedIn()) return null;
  try {
    // Fetch server first then merge per Phase3
    const serverData = await fetchServerProgress();
    const localProgress = JSON.parse(localStorage.getItem('dansk_progress')||'{}');
    const localScores = JSON.parse(localStorage.getItem('dansk_scores')||'{}');
    const level = localStorage.getItem('dansk_level');
    const diagnostic = JSON.parse(localStorage.getItem('dansk_diagnostic')||'null');
    const verdict = JSON.parse(localStorage.getItem('dansk_verdict')||'null');
    
    const clearedStages = {};
    ['m1','m2','m3','m4','m5'].forEach(m=>{
      const key = `stage_${m}_cleared`;
      if(localStorage.getItem(key)==='true') clearedStages[key] = 'true';
    });
    if(localProgress.clearedStages) Object.assign(clearedStages, localProgress.clearedStages);
    
    const serverProgress = serverData?.progress || {};
    const mergedProgress = mergeProgressMonotone(localProgress, serverProgress);
    mergedProgress.clearedStages = { ...(clearedStages), ...(serverData?.clearedStages||{}), ...(mergedProgress.clearedStages||{}) };
    Object.keys(mergedProgress.clearedStages).forEach(k=>{
      if (clearedStages[k]==='true' || serverData?.clearedStages?.[k]==='true') mergedProgress.clearedStages[k]='true';
    });
    
    const res = await fetch(`${API_BASE}/api/progress/sync`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ progress: mergedProgress, scores: localScores, clearedStages: mergedProgress.clearedStages, level, diagnostic, verdict })
    });
    if (!res.ok) return null;
    const data = await res.json();
    
    // Tell learner one line merged per Action Plan
    const mergedCount = Object.keys(mergedProgress.answers||{}).length;
    console.log(`Merged ${mergedCount} stages • ${mergedCount} answers union • word-book max • earliest completed • best scores • admin-set kept marked`);
    
    if(data.clearedStages) {
      Object.entries(data.clearedStages).forEach(([k,v])=>{ if(v==='true') localStorage.setItem(k, 'true'); });
    }
    if(data.progress) {
      localStorage.setItem('dansk_progress', JSON.stringify(data.progress));
    }
    return data;
  } catch (e) {
    console.warn('[progressSync] syncLocalToServer failed', e.message);
    return null;
  }
}

export async function loadServerToLocal() {
  if (!isLoggedIn()) return null;
  try {
    const data = await fetchServerProgress();
    if(!data) return null;
    
    const localProgress = JSON.parse(localStorage.getItem('dansk_progress')||'{}');
    const serverProgress = data.progress || {};
    const mergedProgress = mergeProgressMonotone(localProgress, serverProgress);
    
    // Only set diagnostic/verdict if local missing per Phase3 shared device rule
    const hasLocalDiagnostic = !!localStorage.getItem('dansk_diagnostic');
    
    console.log(`Merged ${Object.keys(mergedProgress.answers||{}).length} stages from server • monotone union`);
    
    if(data.clearedStages) {
      Object.entries(data.clearedStages).forEach(([k,v])=>{ if(v==='true') localStorage.setItem(k, 'true'); });
    }
    localStorage.setItem('dansk_progress', JSON.stringify(mergedProgress));
    
    if(data.scores) {
      const existingScores = JSON.parse(localStorage.getItem('dansk_scores')||'{}');
      const mergedScores = { ...existingScores, ...data.scores };
      Object.keys(mergedScores).forEach(k=>{
        mergedScores[k] = Math.max(existingScores[k]||0, data.scores[k]||0);
      });
      localStorage.setItem('dansk_scores', JSON.stringify(mergedScores));
    }
    if(data.level && !localStorage.getItem('dansk_level')) {
      localStorage.setItem('dansk_level', data.level);
    }
    if(data.diagnostic && !hasLocalDiagnostic) {
      localStorage.setItem('dansk_diagnostic', JSON.stringify(data.diagnostic));
    }
    if(data.verdict && !localStorage.getItem('dansk_verdict')) {
      localStorage.setItem('dansk_verdict', JSON.stringify(data.verdict));
    }
    return data;
  } catch (e) {
    console.warn('[progressSync] loadServerToLocal failed', e.message);
    return null;
  }
}

export async function resetProgressBoth() {
  localStorage.removeItem('dansk_progress');
  localStorage.removeItem('dansk_path');
  localStorage.removeItem('dansk_scores');
  localStorage.removeItem('dansk_srs');
  localStorage.removeItem('dansk_seen');
  ['m1','m2','m3','m4','m5'].forEach(m=>localStorage.removeItem(`stage_${m}_cleared`));
  if(isLoggedIn()) {
    try {
      await fetch(`${API_BASE}/api/progress`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ progress: {}, scores: {}, clearedStages: {}, level: null })
      });
    } catch {}
  }
}

export { mergeProgressMonotone };
