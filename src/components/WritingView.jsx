import { useState, useEffect } from 'react';
import { writingTasks } from '../data/writing';
import { getLLMConfig, getWritingFeedback, ruleBasedWritingFeedback } from '../lib/llm';
import { getWeeklyWriting, getUpcomingWriting, getWritingForLevel, markWritingSeen, getWritingProgress, saveWritingText, getFirstAndLatest, getWritingTexts } from '../lib/writingEngine';
import { getModuleProgress } from '../lib/levelEngine';
import { getGoals } from '../lib/goals';

export default function WritingView() {
  const [levelId, setLevelId] = useState(()=> {
    const lvl = localStorage.getItem('dansk_level') || 'Modul 1';
    if(lvl.includes('Modul 1')) return 'm1';
    if(lvl.includes('Modul 2')) return 'm2';
    if(lvl.includes('Modul 3')) return 'm3';
    if(lvl.includes('Modul 4')) return 'm4';
    if(lvl.includes('Modul 5')) return 'm5';
    return 'm3';
  });
  const [active, setActive] = useState(()=> getWeeklyWriting(levelId));
  const [text, setText] = useState('');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const [writingProg, setWritingProg] = useState(null);
  const [firstLatest, setFirstLatest] = useState(null);
  const [allTexts, setAllTexts] = useState([]);

  useEffect(()=>{
    setActive(getWeeklyWriting(levelId));
    setWritingProg(getWritingProgress());
    setFirstLatest(getFirstAndLatest());
    setAllTexts(getWritingTexts());
  },[levelId]);

  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const upcoming = getUpcomingWriting(levelId, 4);

  const handleFeedback = async () => {
    setLoading(true);
    setFeedback('');
    try {
      const cfg = getLLMConfig();
      let fb;
      if(cfg?.apiKey) {
        fb = await getWritingFeedback(active, text);
      } else {
        fb = ruleBasedWritingFeedback(active, text);
      }
      setFeedback(fb);
      markWritingSeen(active);
      saveWritingText(active, text);
      setWritingProg(getWritingProgress());
      setFirstLatest(getFirstAndLatest());
      setAllTexts(getWritingTexts());
    } catch(e) {
      setFeedback(`Fejl: ${e.message}\n\nFallback:\n` + ruleBasedWritingFeedback(active, text));
      saveWritingText(active, text);
    } finally { setLoading(false); }
  };

  const handleNewWeekly = () => {
    // Force new by picking next in pool
    const pool = getWritingForLevel(levelId, 5);
    const next = pool[Math.floor(Math.random()*pool.length)];
    setActive(next);
    setText('');
    setFeedback('');
  };

  return (
    <div className="min-h-screen bg-[#FFFCF7] flex">
      {/* Left: levels + weekly */}
      <div className="w-[320px] border-r border-[#121417] bg-white overflow-y-auto hidden lg:block shrink-0">
        <div className="p-5 border-b border-[#121417] sticky top-0 bg-white">
          <div className="text-[10px] tracking-[0.2em] uppercase">Skrivning · Ugentlig ny</div>
          <h2 className="font-display font-[700] text-[18px] leading-[0.9] mt-2">Skrivning</h2>
          <div className="text-[11px] text-[#6B7280] mt-2 leading-[1.4]">Hver uge ny opgave baseret på dit modul. Ingen gentagelse i 60 dage. PD3: 150-200 ord med struktur.</div>
          <div className="mt-4 flex flex-wrap gap-1">
            {[
              { id: 'm1', label: 'M1 A1 30-50 ord' },
              { id: 'm2', label: 'M2 60-80 ord' },
              { id: 'm3', label: 'M3 80-120 ord' },
              { id: 'm4', label: 'M4 120-150 ord' },
              { id: 'm5', label: 'M5 150-200 PD3' },
              { id: 'pd3', label: 'PD3 150-200' },
            ].map(l=>(
              <button key={l.id} onClick={()=>setLevelId(l.id)} className={`px-2.5 py-1 text-[10px] uppercase tracking-widest border ${levelId===l.id?'bg-[#121417] text-white border-[#121417]':'bg-white border-[#E8E2D9]'}`}>{l.label}</button>
            ))}
          </div>
        </div>

        <div className="p-3 space-y-3">
          <div className="border border-[#121417] bg-[#FFFCF7] p-4">
            <div className="text-[11px] uppercase tracking-widest font-[600]">Denne uge</div>
            <div className="mt-2 text-[13px] font-[600]">{active.title}</div>
            <div className="text-[11px] text-[#6B7280] mt-1">{active.words} · Uge {active.week}</div>
            <div className="mt-2 text-[11px] leading-[1.4] font-serif">{active.prompt.slice(0,120)}...</div>
          </div>

          <div>
            <div className="text-[10px] uppercase tracking-widest text-[#6B7280] px-2 mb-2">Næste 4 uger</div>
            <div className="space-y-[1px] bg-[#E8E2D9] border border-[#E8E2D9]">
              {upcoming.map((w,i)=>(
                <button key={i} onClick={()=>{ setActive({ ...w, id: `write_${levelId}_${w.week}_${i}_${Date.now()}`, levelId, week: w.week, dedupKey: `write|${levelId}|${w.title}` }); setText(''); setFeedback(''); }} className={`w-full text-left p-3 ${i===0?'bg-[#EEF2FB]':'bg-white hover:bg-[#FFFCF7]'}`}>
                  <div className="text-[12px] font-[500]">Uge {w.week}: {w.title}</div>
                  <div className="text-[10px] text-[#6B7280]">{w.words}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[10px] uppercase tracking-widest text-[#6B7280] px-2 mb-2">Arkiv · 8 faste</div>
            <div className="space-y-[1px] bg-[#E8E2D9] border border-[#E8E2D9]">
              {writingTasks.map(t=>(
                <button key={t.id} onClick={()=>{ setActive({ ...t, levelId, week: 0, dedupKey: `write|archive|${t.id}` }); setText(''); setFeedback(''); }} className="w-full text-left p-3 bg-white hover:bg-[#FFFCF7]">
                  <div className="text-[12px] font-[500]">{t.title}</div>
                  <div className="text-[10px] text-[#6B7280]">{t.minWords}-{t.maxWords} ord · {t.level}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="border border-[#E8E2D9] bg-[#F8F6F1] p-3 text-[11px]">
            <div className="font-[600] uppercase tracking-widest text-[10px]">Fremskridt skrivning</div>
            <div className="mt-1">Total: {writingProg?.total||0}</div>
            <div className="text-[10px] text-[#6B7280]">{Object.entries(writingProg?.byLevel||{}).map(([k,v])=>`${k}: ${v}`).join(' · ') || 'Ingen endnu'}</div>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 overflow-y-auto pb-[100px]">
        <div className="max-w-[760px] mx-auto px-5 lg:px-8 py-6 lg:py-10">
          <div className="lg:hidden mb-4 flex flex-wrap gap-1">
            {['m1','m2','m3','m4','m5','pd3'].map(l=>(
              <button key={l} onClick={()=>setLevelId(l)} className={`px-3 py-1.5 text-[10px] uppercase tracking-widest border ${levelId===l?'bg-[#121417] text-white':'bg-white border-[#E8E2D9]'}`}>{l}</button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest">
            <span className="border border-[#121417] bg-[#121417] text-white px-2 py-1">{levelId}</span>
            <span className="border border-[#E8E2D9] px-2 py-1 bg-white">{active.words} ord</span>
            <span className="text-[#6B7280]">Uge {active.week} · ingen gentagelse i 60 dage</span>
          </div>

          <h1 className="font-display font-[700] text-[28px] lg:text-[36px] leading-[0.9] tracking-tight mt-4">{active.title}</h1>

          <div className="mt-6 border border-[#121417] bg-white p-5 lg:p-6">
            <div className="text-[10px] uppercase tracking-widest text-[#6B7280]">Opgave · {active.words} ord</div>
            <p className="mt-2 font-serif text-[14px] leading-[1.6]">{active.prompt}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {active.checklist.map(c=>(
                <span key={c} className={`text-[11px] px-2.5 py-1 border ${text.toLowerCase().includes(c.toLowerCase().split(' ')[0])?'bg-[#EEF2FB] border-[#2A4F9E] text-[#1E3A5F]':'bg-[#FFFCF7] border-[#E8E2D9] text-[#6B7280]'}`}>{c} {text.toLowerCase().includes(c.toLowerCase().split(' ')[0])?'✓':''}</span>
              ))}
            </div>
            {active.example && (
              <details className="mt-4 text-[12px]">
                <summary className="cursor-pointer uppercase tracking-widest text-[11px] border border-[#E8E2D9] inline-block px-2 py-1 hover:border-[#121417]">Vis eksempel</summary>
                <div className="mt-3 p-4 bg-[#FFFCF7] border border-[#E8E2D9] whitespace-pre-wrap font-serif text-[13px] leading-[1.6]">{active.example}</div>
              </details>
            )}
          </div>

          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <label className="text-[11px] uppercase tracking-widest font-[600]">Din tekst</label>
              <span className={`text-[11px] px-2 py-1 border ${wordCount < (active.minWords||30) ? 'bg-[#FFF1F1] border-red-200 text-red-700' : wordCount > (active.maxWords||200) ? 'bg-amber-50 border-amber-200 text-amber-700' : 'bg-[#EEF2FB] border-[#D6E0F5] text-[#1E3A5F]'}`}>{wordCount} ord / {active.minWords||active.words}</span>
            </div>
            <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="Skriv på dansk her..." className="w-full min-h-[240px] p-4 border border-[#121417] bg-[#FFFCF7] text-[15px] leading-[1.6] font-serif outline-none focus:bg-white" />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button onClick={handleFeedback} disabled={loading || wordCount<5} className="bg-[#121417] text-white px-6 py-3 text-[11px] uppercase tracking-widest disabled:opacity-40 hover:bg-[#2A4F9E]">{loading?'Analyserer...':'Få feedback'}</button>
            <button onClick={()=>setText('')} className="border border-[#E8E2D9] px-6 py-3 text-[11px] uppercase tracking-widest bg-white hover:border-[#121417]">Ryd</button>
            <button onClick={handleNewWeekly} className="border border-[#E8E2D9] px-6 py-3 text-[11px] uppercase tracking-widest bg-white hover:border-[#121417]">Ny opgave samme niveau →</button>
            <div className="text-[11px] text-[#6B7280] self-center">{getLLMConfig()?.apiKey ? 'AI-feedback aktiv' : 'Offline heuristik — tilføj nøgle i Indstillinger for AI'}</div>
          </div>

          {feedback && (
            <div className="mt-8 border border-[#121417] bg-white p-6">
              <div className="text-[11px] uppercase tracking-widest text-[#6B7280]">Feedback · V2 + bindeord + struktur · Offline virker uden nøgle</div>
              <div className="mt-3 text-[14px] leading-[1.7] font-serif whitespace-pre-wrap">{feedback}</div>
            </div>
          )}

          {/* Before/After */}
          <div className="mt-8 border border-[#121417] bg-[#FFFCF7] p-5">
            <div className="text-[11px] uppercase tracking-widest font-[600]">Før / Efter — din fremgang</div>
            {!firstLatest || firstLatest.count<1 ? (
              <div className="mt-2 text-[12px] text-[#6B7280] font-serif">Ingen tekster gemt endnu. Når du får feedback, gemmes teksten lokalt. Efter 2 tekster viser vi før/efter side-by-side — motivation kommer af at se egen fremgang.</div>
            ) : firstLatest.count===1 ? (
              <div className="mt-3 border border-[#E8E2D9] bg-white p-4">
                <div className="text-[11px] uppercase tracking-widest text-[#6B7280]">Første tekst · {new Date(firstLatest.first.date).toLocaleDateString('da-DK')} · {firstLatest.first.words} ord</div>
                <div className="mt-2 text-[13px] font-serif leading-[1.6] whitespace-pre-wrap">{firstLatest.first.text.slice(0,400)}{firstLatest.first.text.length>400?'...':''}</div>
                <div className="mt-2 text-[11px] text-[#6B7280]">Skriv én mere — så viser vi side-by-side.</div>
              </div>
            ) : (
              <div className="mt-3 grid lg:grid-cols-2 gap-[1px] bg-[#121417] border border-[#121417]">
                <div className="bg-white p-4">
                  <div className="text-[10px] uppercase tracking-widest text-[#6B7280]">Første · {new Date(firstLatest.first.date).toLocaleDateString('da-DK')} · {firstLatest.first.words} ord · {firstLatest.first.title}</div>
                  <div className="mt-2 text-[12px] font-serif leading-[1.6] whitespace-pre-wrap max-h-[200px] overflow-y-auto">{firstLatest.first.text}</div>
                </div>
                <div className="bg-[#EEF2FB] p-4">
                  <div className="text-[10px] uppercase tracking-widest text-[#1E3A5F]">Seneste · {new Date(firstLatest.latest.date).toLocaleDateString('da-DK')} · {firstLatest.latest.words} ord · {firstLatest.latest.title} · {firstLatest.count} tekster total</div>
                  <div className="mt-2 text-[12px] font-serif leading-[1.6] whitespace-pre-wrap max-h-[200px] overflow-y-auto">{firstLatest.latest.text}</div>
                  <div className="mt-3 text-[11px] font-[600] text-[#2A4F9E]">Fremskridt: {firstLatest.improvement>0?`+${firstLatest.improvement} ord vs første`:`${firstLatest.improvement} ord vs første`} · {allTexts.length} tekster gemt lokalt</div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 border border-[#121417] bg-[#121417] text-white p-5">
            <div className="text-[11px] uppercase tracking-widest text-white/60">PD3 bedømmelse + Normaliser kampen</div>
            <div className="mt-2 text-[13px] leading-[1.6] font-serif text-white/85">Indhold (30%), sammenhæng (25%), ordforråd (25%), grammatik (20%). V2-fejl og manglende bindeord trækker meget ned. Brug: for det første, derudover, på den anden side, derfor, til sidst.<br/><br/>Normalt: 80% af B1-fejl er V2. Andre på Modul 1-5 kæmper også med ledsætning. Box0 der føles svært er meningen — SRS virker fordi du glemmer. Anden gang forstår du 30% mere. Det er ikke dig, det er dansk.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
