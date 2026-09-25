import { useState, useRef, useEffect } from 'react';
import { conversationScenarios } from '../data/conversations';
import { getLLMConfig } from '../lib/llm';
import { callLLM, getConversationReply } from '../lib/llm';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { useTTS } from '../hooks/useTTS';

export default function ConversationView() {
  const [activeId, setActiveId] = useState(conversationScenarios[0].id);
  const active = conversationScenarios.find(c=>c.id===activeId);
  const [messages, setMessages] = useState([{ role: 'assistant', content: active.starter }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState('typed'); // typed, voice
  const { isListening, transcript, supported, start, stop } = useSpeechRecognition();
  const { speak } = useTTS();
  const bottomRef = useRef(null);

  useEffect(()=>{ bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); },[messages]);

  useEffect(()=>{
    setMessages([{ role: 'assistant', content: active.starter }]);
  },[activeId]);

  useEffect(()=>{
    if(transcript && !isListening) {
      setInput(transcript);
    }
  },[isListening, transcript]);

  const send = async () => {
    if(!input.trim()) return;
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    try {
      const cfg = getLLMConfig();
      let reply;
      if(cfg?.apiKey) {
        reply = await getConversationReply(active, newMessages);
      } else {
        // fallback scripted
        const fallbacks = [
          "Interessant! Kan du fortælle lidt mere?",
          "Ja, det forstår jeg godt. Hvad tænker du om det?",
          "Det giver mening. Har du prøvet det før?",
          "Okay, og hvad skete der så?",
          "Det lyder som en god idé. Hvorfor synes du det?",
          "Vent lidt, hvad betyder det sidste ord du sagde? Kan du forklare på dansk?",
        ];
        reply = fallbacks[Math.floor(Math.random()*fallbacks.length)] + " (offline mode - tilføj API-nøgle for rigtig AI)";
      }
      setMessages([...newMessages, { role: 'assistant', content: reply }]);
    } catch(e) {
      setMessages([...newMessages, { role: 'assistant', content: `Fejl: ${e.message}` }]);
    } finally { setLoading(false); }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-[320px] border-r border-[#E8E2D9] bg-[#FCFBF7] overflow-y-auto">
        <div className="p-4 border-b border-[#E8E2D9] sticky top-0 bg-[#FCFBF7]">
          <h2 className="font-display font-bold text-[18px]">Samtale • {conversationScenarios.length}</h2>
          <div className="text-[11px] text-[#6B7280] mt-1">Voice + typed. LLM hvis nøgle sat.</div>
          <div className="mt-3 flex gap-1.5">
            <button onClick={()=>setMode('typed')} className={`px-3 py-1 rounded-full text-[12px] border ${mode==='typed'?'bg-[#121212] text-white border-[#121212]':'bg-white border-[#E8E2D9]'}`}>⌨ Typed</button>
            <button onClick={()=>setMode('voice')} className={`px-3 py-1 rounded-full text-[12px] border ${mode==='voice'?'bg-[#121212] text-white border-[#121212]':'bg-white border-[#E8E2D9]'}`}>🎤 Voice {supported?'✓':'✗'}</button>
          </div>
        </div>
        <div className="p-2 space-y-1">
          {conversationScenarios.map(c=>(
            <button key={c.id} onClick={()=>setActiveId(c.id)} className={`w-full text-left px-3 py-3 rounded-xl border ${activeId===c.id?'bg-white border-[#121212] shadow-sm':'border-transparent hover:bg-white'}`}>
              <div className="flex justify-between"><span className="text-[13px] font-medium leading-tight">{c.title}</span><span className="text-[10px] px-2 py-0.5 rounded-full bg-white border border-[#E8E2D9]">{c.level}</span></div>
              <div className="text-[11px] text-[#6B7280] mt-1 line-clamp-2">{c.description}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col bg-white">
        <div className="p-4 border-b border-[#E8E2D9] bg-[#FCFBF7]">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display font-bold text-[20px]">{active.title}</h1>
              <div className="text-[12px] text-[#6B7280] mt-1">{active.description} • Mål: {active.goal}</div>
            </div>
            <div className="text-right">
              <div className="text-[11px] uppercase tracking-widest text-[#6B7280]">Hold-the-Danish</div>
              <div className="mt-1 flex gap-1 flex-wrap justify-end max-w-[260px]">
                {active.phrases.map(p=>(
                  <button key={p} onClick={()=>setInput(p)} className="text-[11px] px-2 py-1 rounded-full bg-white border border-[#E8E2D9] hover:bg-[#FFD84D]/30">{p}</button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#FCFBF7]/50">
          {messages.map((m,i)=>(
            <div key={i} className={`flex ${m.role==='user'?'justify-end':'justify-start'}`}>
              <div className={`max-w-[70%] rounded-2xl px-4 py-3 text-[14px] leading-relaxed ${m.role==='user'?'bg-[#121212] text-white rounded-br-sm':'bg-white border border-[#E8E2D9] rounded-bl-sm'}`}>
                {m.content}
                {m.role==='assistant' && <button onClick={()=>speak(m.content)} className="ml-2 text-[11px] opacity-60 hover:opacity-100">▶</button>}
              </div>
            </div>
          ))}
          {loading && <div className="text-[12px] text-[#6B7280]">Skriver...</div>}
          <div ref={bottomRef} />
        </div>

        <div className="p-4 border-t border-[#E8E2D9] bg-white">
          {mode==='voice' && (
            <div className="mb-3 flex items-center gap-3">
              <button onClick={isListening?stop:start} className={`px-4 py-2 rounded-full text-[13px] font-medium border ${isListening?'bg-red-600 text-white border-red-600 animate-pulse':'bg-white border-[#E8E2D9]'}`}>{isListening?'⏹ Stop optagelse':'🎤 Start optagelse (da-DK)'}</button>
              <span className="text-[12px] text-[#6B7280]">{isListening?'Lytter... sig noget på dansk': transcript ? `Genkendt: ${transcript}` : supported ? 'Tryk og tal dansk' : 'Web Speech ikke understøttet i denne browser/iframe'}</span>
            </div>
          )}
          <div className="flex gap-2">
            <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder="Skriv på dansk... (prøv at holde den på dansk!)" className="flex-1 px-4 py-3 rounded-full border border-[#E8E2D9] bg-[#FCFBF7] text-[14px] outline-none focus:border-[#121212]" />
            <button onClick={send} disabled={loading || !input.trim()} className="btn-primary disabled:opacity-40">Send</button>
          </div>
          <div className="mt-2 text-[11px] text-[#6B7280]">Tip: Hvis samtalen går i stå, brug: "vent lidt", "kan du sige det igen, langsommere?", "hvad betyder det?". Det er PD3-strategi.</div>
        </div>
      </div>
    </div>
  );
}
