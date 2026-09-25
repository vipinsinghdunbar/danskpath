import { useState, useMemo, useEffect } from 'react';
import original from '../data/originalItems.json';
import { useTTS } from '../hooks/useTTS';
import { generateBatch, markTemplateSeen, getTemplateStats } from '../lib/templateEngine';
import { stages } from '../lib/stageEngine';

const SEEN_DAYS = 30;
function getSeenMap(){ try { return JSON.parse(localStorage.getItem('dansk_seen')||'{}'); } catch { return {}; } }
function setSeenMap(map){ localStorage.setItem('dansk_seen', JSON.stringify(map)); }
function isSeenRecently(itemId){ const map=getSeenMap(); const ts=map[itemId]; if(!ts) return false; return (Date.now()-ts)/(1000*60*60*24) < SEEN_DAYS; }
function markSeen(itemId){ const map=getSeenMap(); map[itemId]=Date.now(); setSeenMap(map); }

export default function CompleteGrammarView() {
  const [activeTopicId, setActiveTopicId] = useState(original.topics[0].id);
  const [showAnswer, setShowAnswer] = useState({});
  const [mode, setMode] = useState('infinite');
  const [infiniteItems, setInfiniteItems] = useState([]);
  const { speak } = useTTS();

  const topics = original.topics;
  const activeTopic = topics.find(t=>t.id===activeTopicId) || topics[0];

  useEffect(()=>{
    if(mode==='infinite'){
      const batch = generateBatch(activeTopicId, 20);
      setInfiniteItems(batch);
      setShowAnswer({});
    }
  },[activeTopicId, mode]);

  const handleNewBatch = () => {
    const batch = generateBatch(activeTopicId, 20);
    setInfiniteItems(batch);
    setShowAnswer({});
    window.scrollTo(0,0);
  };

  const filteredItems = useMemo(()=>{
    if(mode==='infinite') return infiniteItems;
    let items = activeTopic.items.map((it, idx)=>({ ...it, _id: `${activeTopic.id}_${idx}`, _idx: idx }));
    if(mode==='unused'){
      items = items.filter(it=>!isSeenRecently(it._id));
      if(items.length===0) items = activeTopic.items.map((it, idx)=>({ ...it, _id: `${activeTopic.id}_${idx}`, _idx: idx }));
    }
    if(mode==='weak'){
      const weak = JSON.parse(localStorage.getItem('dansk_weak')||'{}');
      items = items.filter(it=>weak[it._id]);
      if(items.length===0) items = activeTopic.items.map((it, idx)=>({ ...it, _id: `${activeTopic.id}_${idx}`, _idx: idx })).slice(0,10);
    }
    return items;
  },[activeTopicId, mode, infiniteItems]);

  const handleAnswer = (item, selected) => {
    const correct = item.correct;
    const norm = (s)=>String(s).toLowerCase().trim().replace(/[.!?]+$/,'');
    const isCorrect = norm(selected)===norm(correct) || (Array.isArray(correct) ? correct.some(c=>norm(c)===norm(selected)) : false);
    if(item.dedupKey) markTemplateSeen(item); else markSeen(item._id || item.id);
    const weak = JSON.parse(localStorage.getItem('dansk_weak')||'{}');
    const key = item._id || item.id;
    if(!isCorrect) weak[key]=true; else delete weak[key];
    localStorage.setItem('dansk_weak', JSON.stringify(weak));
    const prog = JSON.parse(localStorage.getItem('dansk_path')||'{}');
    if(!prog[activeTopic.id]) prog[activeTopic.id]=[];
    if(isCorrect && item._idx!==undefined && !prog[activeTopic.id].includes(item._idx)){
      prog[activeTopic.id].push(item._idx);
      localStorage.setItem('dansk_path', JSON.stringify(prog));
    }
    setShowAnswer(s=>({ ...s, [key]: { selected, isCorrect } }));
    if(navigator.vibrate) navigator.vibrate(10);
  };

  const progress = JSON.parse(localStorage.getItem('dansk_path')||'{}');
  const doneCount = progress[activeTopic.id]?.length || 0;
  const templateStats = getTemplateStats();
  const relatedStage = stages.find(s=> s.grammarRequirements.some(g=> activeTopic.title.toLowerCase().includes(g.toLowerCase()) || activeTopic.id.includes(g.toLowerCase().slice(0,3)) ));

  return (
    <div className="min-h-screen bg-[#F2F2F7] pb-[120px]">
      <div className="max-w-[1200px] mx-auto flex">
        {/* Sidebar iOS */}
        <div className="w-[300px] shrink-0 hidden lg:block sticky top-0 h-screen overflow-y-auto bg-white/80 backdrop-blur-2xl border-r border-black/5 p-4">
          <div className="pt-4">
            <div className="text-[11px] font-[700] tracking-widest uppercase text-[#8E8E93]">Grammar • Infinite engine</div>
            <h2 className="mt-2 text-[20px] font-[700] tracking-tight">Grammatik</h2>
            <div className="text-[12px] text-[#8E8E93] mt-1 leading-[1.4]">761 fixed + infinite. 15 variants per template → 5,100+ controlled. No repeat 30d.</div>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {[
                { id: 'infinite', label: 'Infinite' },
                { id: 'unused', label: 'New' },
                { id: 'all', label: 'All' },
                { id: 'weak', label: 'Weak' },
              ].map(m=>(
                <button key={m.id} onClick={()=>setMode(m.id)} className={`px-3 py-1.5 rounded-full text-[11px] font-[600] border transition ${mode===m.id?'bg-black text-white border-black':'bg-[#F2F2F7] border-transparent text-[#8E8E93] hover:bg-white hover:border-black/10'}`}>{m.label}</button>
              ))}
            </div>
            {relatedStage && <div className="mt-4 bg-[#007AFF]/10 rounded-[12px] p-3 border border-[#007AFF]/20"><div className="text-[10px] font-[700] uppercase text-[#007AFF]">Related Stage</div><div className="text-[12px] font-[600] mt-1">{relatedStage.title}</div><div className="text-[11px] text-[#8E8E93] mt-1">{relatedStage.objective.slice(0,80)}...</div></div>}
          </div>
          <div className="mt-6 space-y-1">
            {topics.map(t=>{
              const done = (JSON.parse(localStorage.getItem('dansk_path')||'{}')[t.id]?.length||0);
              const total = t.items.length;
              const pct = Math.round(done/total*100);
              const isActive = activeTopicId===t.id;
              return (
                <button key={t.id} onClick={()=>setActiveTopicId(t.id)} className={`w-full text-left px-4 py-3 rounded-[16px] transition ${isActive?'bg-black text-white shadow-sm':'bg-[#F2F2F7] hover:bg-white'}`}>
                  <div className="flex justify-between items-baseline"><span className={`text-[13px] leading-tight ${isActive?'font-[600] text-white':'font-[500]'}`}>{t.title}</span><span className={`text-[10px] ${isActive?'text-white/60':'text-[#8E8E93]'}`}>{done}/{total}</span></div>
                  <div className={`text-[11px] mt-1 line-clamp-2 leading-[1.3] ${isActive?'text-white/70':'text-[#8E8E93]'}`}>{t.rule?.slice(0,80)}…</div>
                  <div className="mt-2 h-1 bg-white/20 rounded-full overflow-hidden"><div className="h-full bg-white rounded-full" style={{ width: `${pct}%` }} /></div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main */}
        <div className="flex-1 min-w-0 px-5 lg:px-8 py-6">
          <div className="lg:hidden mb-4 flex gap-2 overflow-x-auto">
            <select value={activeTopicId} onChange={e=>setActiveTopicId(e.target.value)} className="flex-1 px-4 py-3 rounded-full bg-white border border-black/5 text-[14px] font-[500]">
              {topics.map(t=><option key={t.id} value={t.id}>{t.title} ({t.items.length})</option>)}
            </select>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-[600]">
            <span className="px-3 py-1 rounded-full bg-black text-white">{activeTopic.id}</span>
            <span className="px-3 py-1 rounded-full bg-white border border-black/5">{doneCount}/{activeTopic.items.length} done</span>
            <span className="text-[#8E8E93]">{mode==='infinite'?'Infinite • new variants every time':`No repeat ${SEEN_DAYS}d`}</span>
          </div>

          <h1 className="mt-4 text-[28px] font-[700] tracking-tight leading-[0.95]">{activeTopic.title}</h1>
          <p className="mt-2 text-[14px] text-[#8E8E93]">{relatedStage?`Stage ${relatedStage.moduleId.toUpperCase()} • ${relatedStage.cefl} • ${relatedStage.difficulty.sentenceLen} • ${relatedStage.difficulty.grammar}`:''}</p>

          <div className="mt-6 bg-white rounded-[24px] p-6 shadow-sm border border-black/5">
            <div className="text-[11px] font-[700] tracking-widest uppercase text-[#007AFF]">Rule — English first</div>
            <p className="mt-2 text-[17px] leading-[1.5] tracking-tight">{activeTopic.rule}</p>
            {mode==='infinite' && <div className="mt-4 bg-[#F2F2F7] rounded-[12px] p-3 text-[12px] leading-[1.4] text-[#8E8E93]"><b>Infinite active:</b> Same rule, new words every time. System remembers variants 30 days. Template 15 combos → {templateStats.totalKeys} variants seen. You learn rule, not answer.</div>}
          </div>

          {mode==='infinite' && (
            <div className="mt-6 flex gap-2 items-center"><button onClick={handleNewBatch} className="bg-black text-white px-6 py-3 rounded-full text-[13px] font-[600] tap-haptic">New 20 variants →</button><div className="text-[12px] text-[#8E8E93]">Each time new combinations. No repeat within 30 days.</div></div>
          )}

          <div className="mt-8 space-y-3">
            {filteredItems.slice(0, mode==='infinite'?20:30).map((it)=>{
              const key = it._id || it.id;
              const ans = showAnswer[key];
              return (
                <div key={key} className="bg-white rounded-[24px] p-6 shadow-sm border border-black/5">
                  <div className="flex items-center gap-2 flex-wrap"><span className="text-[11px] font-[600] px-2.5 py-1 rounded-full bg-[#F2F2F7]">{it.type || 'choice'} • {it.skill || activeTopic.skill}</span>{it.dedupKey && <span className="text-[10px] px-2 py-1 rounded-full bg-[#007AFF]/10 text-[#007AFF] border border-[#007AFF]/20">engine • {it.dedupKey.split('|').slice(0,2).join(' ')}</span>}{it.objective && <span className="text-[10px] text-[#8E8E93]">{it.objective}</span>}</div>
                  <div className="mt-3 text-[17px] font-[600] tracking-tight leading-snug">{it.q}</div>

                  {it.type==='choice' && it.options && (
                    <div className="mt-4 space-y-2">
                      {[...new Set([it.correct, ...it.options])].sort(()=>0.5-Math.random()).map((opt,oi)=>(
                        <button key={oi} onClick={()=>handleAnswer(it, opt)} className={`w-full text-left px-5 py-4 rounded-full border text-[15px] font-[500] transition tap-haptic flex justify-between ${ans ? (opt===it.correct?'bg-[#007AFF]/10 border-[#007AFF]/30 text-[#007AFF]':'') + (ans.selected===opt && opt!==it.correct?' bg-[#FF3B30]/10 border-[#FF3B30]/30':'') : 'bg-[#F2F2F7] border-transparent hover:bg-white hover:border-black/10'}`}>
                          <span>{opt}</span><span className="text-[11px]">{ans && opt===it.correct?'✓ correct':ans && ans.selected===opt?'✗ yours':''}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {it.type==='write' && (
                    <div className="mt-4"><input id={`inp-${key}`} placeholder="Write answer..." className="w-full px-5 py-4 rounded-full bg-[#F2F2F7] border-0 text-[15px] outline-none focus:ring-2 focus:ring-black/10" onKeyDown={e=>{ if(e.key==='Enter') handleAnswer(it, e.target.value.trim()); }} /><div className="mt-3 flex gap-2"><button onClick={()=>{ const el=document.getElementById(`inp-${key}`); handleAnswer(it, el.value.trim()); }} className="bg-black text-white px-5 py-2.5 rounded-full text-[13px] font-[600]">Check</button><button onClick={()=>speak(it.correct)} className="bg-[#F2F2F7] px-5 py-2.5 rounded-full text-[13px] font-[600]">▶ Listen</button></div></div>
                  )}

                  {ans && (
                    <div className={`mt-4 p-4 rounded-[16px] text-[14px] leading-[1.5] border ${ans.isCorrect?'bg-[#34C759]/10 border-[#34C759]/20':'bg-[#FF3B30]/10 border-[#FF3B30]/20'}`}>
                      <div className="font-[700] text-[12px] uppercase tracking-widest">{ans.isCorrect?'Correct':'Wrong — but important'}</div>
                      <div className="mt-2">{it.why}</div>
                      {!ans.isCorrect && <div className="mt-3 pt-3 border-t border-black/10 text-[13px]"><b>Correct:</b> {it.correct}<br/><b>Yours:</b> {ans.selected}<br/>{it.closeDistractor && <span className="text-[#8E8E93]"><b>Why tempting:</b> {it.closeDistractor}</span>}</div>}
                      <button onClick={()=>speak(it.correct)} className="mt-3 text-[11px] font-[600] px-3 py-1.5 rounded-full bg-white border border-black/10">▶ Listen correct</button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 bg-black text-white rounded-[24px] p-6">
            <div className="text-[11px] font-[700] tracking-widest uppercase text-white/60">How no-repeat works</div>
            <div className="mt-2 text-[13px] leading-[1.6] text-white/80">Each answer timestamped. For {SEEN_DAYS} days same text + close variants not shown. Fixed bank 761: "New" filters seen. Infinite engine: generates new combo from 15 safe variants per template. DedupKey = topic|front|verb|subject — remembered 30d. You never get same sentence within 30d, but same rule.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
