// Tracking to avoid repeats - based on original platform.js SEEN_DAYS + close variants avoidance
// Original: SEEN_DAYS = 14, recentlyShownRule: exclude text and close variants for 30 days
// We use 30 days for grammar, SRS intervals for vocab, cycle reset for listening/reading

const SEEN_DAYS = 30; // increased from 14 to 30 as per original spec
const SRS_INTERVALS = { 0: 0, 1: 1, 2: 3, 3: 7, 4: 14, 5: 30 }; // days

export function getUsed(key) {
  try { return new Set(JSON.parse(localStorage.getItem(`dansk_used_${key}`)||'[]')); } catch { return new Set(); }
}
export function markUsed(key, id) {
  const used = getUsed(key);
  used.add(id);
  localStorage.setItem(`dansk_used_${key}`, JSON.stringify(Array.from(used)));
  // Also store timestamp for time-based filtering
  const seenMap = getSeenMap();
  seenMap[`${key}_${id}`] = Date.now();
  setSeenMap(seenMap);
}
export function clearUsed(key) {
  localStorage.removeItem(`dansk_used_${key}`);
}
export function getUnused(items, key) {
  const used = getUsed(key);
  const seenMap = getSeenMap();
  const now = Date.now();
  const unused = items.filter(it=>{
    if(used.has(it.id)) return false;
    const ts = seenMap[`${key}_${it.id}`];
    if(ts) {
      const days = (now - ts) / (1000*60*60*24);
      if(days < SEEN_DAYS) return false;
    }
    return true;
  });
  return unused.length>0 ? unused : items; // if all used or seen recently, reset cycle
}

export function getSeenMap() {
  try { return JSON.parse(localStorage.getItem('dansk_seen')||'{}'); } catch { return {}; }
}
export function setSeenMap(map) { localStorage.setItem('dansk_seen', JSON.stringify(map)); }
export function isSeenRecently(id, days = SEEN_DAYS) {
  const map = getSeenMap();
  const ts = map[id];
  if(!ts) return false;
  const d = (Date.now() - ts) / (1000*60*60*24);
  return d < days;
}
export function markSeen(id) {
  const map = getSeenMap();
  map[id] = Date.now();
  setSeenMap(map);
}

// SRS helpers for vocab
export function getSRSInterval(box) { return SRS_INTERVALS[box] || 30; }
export function isDueForReview(itemId, box) {
  const map = getSeenMap();
  const ts = map[`vocab_${itemId}`];
  if(!ts) return true; // never seen = due
  if(box===0) return true; // new always due
  const days = (Date.now() - ts) / (1000*60*60*24);
  return days >= getSRSInterval(box);
}

// Path tracking
export function getPathProgress() {
  try { return JSON.parse(localStorage.getItem('dansk_path')||'{}'); } catch { return {}; }
}
export function setPathItemDone(moduleId, itemId) {
  const p = getPathProgress();
  if(!p[moduleId]) p[moduleId]=[];
  if(!p[moduleId].includes(itemId)) p[moduleId].push(itemId);
  localStorage.setItem('dansk_path', JSON.stringify(p));
}
export function isPathItemDone(moduleId, itemId) {
  const p = getPathProgress();
  return p[moduleId]?.includes(itemId);
}

// Stats for how often repeat
export function getRepetitionStats() {
  const seen = getSeenMap();
  const now = Date.now();
  const stats = { totalSeen: Object.keys(seen).length, byAge: { today:0, week:0, month:0, older:0 } };
  Object.values(seen).forEach(ts=>{
    const days = (now - ts)/(1000*60*60*24);
    if(days<1) stats.byAge.today++;
    else if(days<7) stats.byAge.week++;
    else if(days<30) stats.byAge.month++;
    else stats.byAge.older++;
  });
  return stats;
}
