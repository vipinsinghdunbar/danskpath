import { useState, useEffect } from 'react';

export function useProgress() {
  const [progress, setProgress] = useState(()=>{
    try {
      return JSON.parse(localStorage.getItem('dansk_progress')||'{}');
    } catch { return {}; }
  });

  useEffect(()=>{
    localStorage.setItem('dansk_progress', JSON.stringify(progress));
  },[progress]);

  const markDone = (key, value=true) => {
    setProgress(p=>({ ...p, [key]: value }));
  };

  const get = (key) => progress[key];

  return { progress, markDone, get };
}
