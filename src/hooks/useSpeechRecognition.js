import { useState, useEffect, useRef } from 'react';

export function useSpeechRecognition() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [supported, setSupported] = useState(false);
  const recRef = useRef(null);

  useEffect(()=>{
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    setSupported(!!SR);
    if(!SR) return;
    const rec = new SR();
    rec.lang = 'da-DK';
    rec.interimResults = true;
    rec.continuous = false;
    rec.onresult = (e)=>{
      const t = Array.from(e.results).map(r=>r[0].transcript).join('');
      setTranscript(t);
    };
    rec.onend = ()=> setIsListening(false);
    rec.onerror = ()=> setIsListening(false);
    recRef.current = rec;
  },[]);

  const start = () => {
    if(!recRef.current) return;
    setTranscript('');
    setIsListening(true);
    recRef.current.start();
  };
  const stop = () => {
    recRef.current?.stop();
    setIsListening(false);
  };

  return { isListening, transcript, supported, start, stop, setTranscript };
}
