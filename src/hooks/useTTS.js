import { useState, useCallback } from 'react';

export function useTTS() {
  const [speaking, setSpeaking] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const speak = useCallback((text, id=null, rate=0.9) => {
    if(!('speechSynthesis' in window)) {
      alert("Din browser understøtter ikke tale.");
      return;
    }
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    // Try to find Danish voice
    const voices = window.speechSynthesis.getVoices();
    const daVoice = voices.find(v=>v.lang.startsWith('da')) || voices.find(v=>v.lang.startsWith('da-DK'));
    if(daVoice) utter.voice = daVoice;
    utter.lang = 'da-DK';
    utter.rate = rate;
    utter.onstart = () => { setSpeaking(true); setCurrentId(id); };
    utter.onend = () => { setSpeaking(false); setCurrentId(null); };
    utter.onerror = () => { setSpeaking(false); setCurrentId(null); };
    window.speechSynthesis.speak(utter);
  }, []);

  const stop = useCallback(()=>{
    window.speechSynthesis.cancel();
    setSpeaking(false);
    setCurrentId(null);
  },[]);

  return { speak, stop, speaking, currentId };
}
