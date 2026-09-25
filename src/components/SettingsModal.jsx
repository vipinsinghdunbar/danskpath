import { useState, useEffect } from 'react';
import { getLLMConfig, saveLLMConfig } from '../lib/llm';

export default function SettingsModal({ open, onClose }) {
  const [provider, setProvider] = useState('openai');
  const [apiKey, setApiKey] = useState('');
  const [model, setModel] = useState('gpt-4o-mini');
  const [saved, setSaved] = useState(false);

  useEffect(()=>{
    if(open) {
      const cfg = getLLMConfig();
      if(cfg) {
        setProvider(cfg.provider||'openai');
        setApiKey(cfg.apiKey||'');
        setModel(cfg.model||'gpt-4o-mini');
      }
    }
  },[open]);

  const handleSave = () => {
    saveLLMConfig({ provider, apiKey, model });
    setSaved(true);
    setTimeout(()=>setSaved(false),2000);
  };

  if(!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm grid place-items-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-[520px] p-6 shadow-xl border border-[#E8E2D9]">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="font-display font-bold text-[20px]">Indstillinger • LLM</h2>
            <p className="text-[13px] text-[#6B7280] mt-1">Tilføj din egen API-nøgle for AI-feedback og samtale. Gemmes kun lokalt i din browser.</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full border border-[#E8E2D9] grid place-items-center">✕</button>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <label className="text-[12px] font-medium uppercase tracking-widest">Provider</label>
            <div className="mt-2 flex gap-2">
              <button onClick={()=>{setProvider('openai'); setModel('gpt-4o-mini');}} className={`px-4 py-2 rounded-full text-[13px] border ${provider==='openai'?'bg-[#121212] text-white border-[#121212]':'bg-white border-[#E8E2D9]'}`}>OpenAI (anbefalet)</button>
              <button onClick={()=>{setProvider('anthropic'); setModel('claude-3-5-haiku-20241022');}} className={`px-4 py-2 rounded-full text-[13px] border ${provider==='anthropic'?'bg-[#121212] text-white border-[#121212]':'bg-white border-[#E8E2D9]'}`}>Anthropic Claude</button>
            </div>
            <div className="text-[11px] text-[#6B7280] mt-2">OpenAI virker direkte i browser. Anthropic kræver ofte proxy pga CORS - prøv alligevel, men OpenAI er sikrest.</div>
          </div>

          <div>
            <label className="text-[12px] font-medium uppercase tracking-widest">API-nøgle</label>
            <input value={apiKey} onChange={e=>setApiKey(e.target.value)} placeholder={provider==='openai'?'sk-proj-...':'sk-ant-...'} type="password" className="mt-2 w-full px-4 py-3 rounded-xl border border-[#E8E2D9] bg-[#FCFBF7] text-[14px] outline-none focus:border-[#121212] focus:bg-white" />
          </div>

          <div>
            <label className="text-[12px] font-medium uppercase tracking-widest">Model</label>
            <input value={model} onChange={e=>setModel(e.target.value)} className="mt-2 w-full px-4 py-2 rounded-full border border-[#E8E2D9] bg-white text-[13px]" />
            <div className="text-[11px] text-[#6B7280] mt-1">OpenAI: gpt-4o-mini (billig), gpt-4o. Anthropic: claude-3-5-haiku-20241022, claude-3-5-sonnet-20241022</div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-[12px] leading-relaxed">
            <b>Privatliv:</b> Nøglen gemmes kun i localStorage på din enhed. Den sendes direkte til OpenAI/Anthropic, aldrig til vores server (der er ingen server). Du kan slette den når som helst.
          </div>

          <div className="flex gap-2">
            <button onClick={handleSave} className="btn-primary">{saved?'✓ Gemt!':'Gem nøgle'}</button>
            <button onClick={()=>{setApiKey(''); saveLLMConfig({ provider, apiKey: '', model });}} className="btn-ghost text-[13px]">Slet nøgle</button>
            <button onClick={onClose} className="btn-ghost text-[13px] ml-auto">Luk</button>
          </div>

          <div className="pt-4 border-t border-[#E8E2D9] text-[12px] text-[#6B7280] leading-relaxed">
            <b>Uden nøgle:</b> Appen virker 100% offline med regel-baseret feedback og scripted samtaler. Med nøgle får du rigtig PD3-feedback og fri samtale på B1/B2.
          </div>
        </div>
      </div>
    </div>
  );
}
