// Simple Leitner SRS
export function getBox(itemId) {
  const data = JSON.parse(localStorage.getItem('dansk_srs')||'{}');
  return data[itemId] || 0;
}
export function setBox(itemId, box) {
  const data = JSON.parse(localStorage.getItem('dansk_srs')||'{}');
  data[itemId] = box;
  localStorage.setItem('dansk_srs', JSON.stringify(data));
}
export function updateSRS(itemId, correct) {
  const current = getBox(itemId);
  const next = correct ? Math.min(5, current+1) : 0;
  setBox(itemId, next);
  return next;
}
export function getDueItems(items, limit=20) {
  const data = JSON.parse(localStorage.getItem('dansk_srs')||'{}');
  // sort by box ascending, then random
  return [...items].sort((a,b)=>{
    const ba = data[a.id]||0;
    const bb = data[b.id]||0;
    if(ba!==bb) return ba-bb;
    return Math.random()-0.5;
  }).slice(0,limit);
}
