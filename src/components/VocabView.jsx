import { useState, useMemo } from 'react';
import { vocabulary, vocabThemes } from '../data/vocabulary';
import { useTTS } from '../hooks/useTTS';
import { getDueItems, updateSRS, getBox } from '../lib/srs';

export default function VocabView() {
  const [theme, setTheme] = useState('Alle');
  const [mode, setMode] = useState('list');
  const [search, setSearch] = useState('');
  const [flashIndex, setFlashIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const { speak } = useTTS();

  const filtered = useMemo(()=>{
    let list = vocabulary;
    if(theme!=='Alle') list = list.filter(v=>v.theme===theme);
    if(search){
      const s = search.toLowerCase();
      list = list.filter(v=>v.da.toLowerCase().includes(s) || v.en.toLowerCase().includes(s) || v.collocation.toLowerCase().includes(s));
    }
    return list;
  },[theme, search]);

  const due = useMemo(()=> getDueItems(filtered, 20), [filtered]);
  const currentFlash = due[flashIndex % due.length];

  const handleAnswer = (correct) => {
    if(!currentFlash) return;
    updateSRS(currentFlash.id, correct);
    setShowBack(false);
    setFlashIndex(i=>i+1);
    if(navigator.vibrate) navigator.vibrate(10);
  };

  return (
    <div className="min-h-screen bg-[#F2F2F7] pb-[120px]">
      <div className="max-w-[1100px] mx-auto px-5 lg:px-8 pt-8">
        <div className="flex items-center gap-2 mb-3"><div className="w-8 h-8 rounded-full bg-black text-white grid place-items-center text-[12px] font-bold">✧</div><span className="text-[13px] font-[600]">Vocabulary • SRS • Collocations • Infinite variants</span></div>
        <h1 className="ios-large-title">Words that work<br/>in speech</h1>
        <p className="mt-3 text-[17px] leading-[1.4] text-[#8E8E93] max-w-[600px]">Not “møde = meeting” but “holde et møde”. Collocations + SRS Box 0→5. No repeat 30d. Variation: same rule different contexts.</p>

        <div className="mt-6 flex flex-wrap gap-2 items-center">
          <div className="bg-white rounded-full p-1.5 shadow-sm border border-black/5 flex gap-1">
            {[
              { id: 'list', label: 'List' },
              { id: 'flash', label: 'Flashcards SRS' },
              { id: 'collocation', label: 'Collocations' },
            ].map(m=>(
              <button key={m.id} onClick={()=>setMode(m.id)} className={`px-4 py-2 rounded-full text-[13px] font-[600] transition ${mode===m.id?'bg-black text-white':'text-[#8E8E93] hover:text-black'}`}>{m.label}</button>
            ))}
          </div>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search: arbejde, møde, slå op..." className="px-5 py-3 rounded-full bg-white border border-black/5 text-[14px] w-[300px] outline-none focus:ring-2 focus:ring-black/10" />
        </div>

        <div className="mt-4 flex gap-1.5 flex-wrap">
          <button onClick={()=>setTheme('Alle')} className={`px-3.5 py-2 rounded-full text-[12px] font-[600] border transition ${theme==='Alle'?'bg-black text-white border-black':'bg-white border-black/5 text-[#8E8E93] hover:text-black'}`}>Alle ({vocabulary.length})</button>
          {vocabThemes.map(t=>(
            <button key={t} onClick={()=>setTheme(t)} className={`px-3.5 py-2 rounded-full text-[12px] font-[600] border transition ${theme===t?'bg-black text-white border-black':'bg-white border-black/5 text-[#8E8E93] hover:text-black'}`}>{t}</button>
          ))}
        </div>

        {mode==='flash' && (
          <div className="mt-8 max-w-[560px] mx-auto">
            <div className="text-[12px] text-[#8E8E93] text-center mb-3 font-[500]">SRS • Box {currentFlash ? getBox(currentFlash.id) : 0} • {due.length} due • {flashIndex} practiced • Variation per learner</div>
            {currentFlash ? (
              <div className="bg-white rounded-[32px] p-8 shadow-sm border border-black/5 text-center min-h-[360px] flex flex-col justify-center animate-ios-in">
                <div className="text-[11px] font-[700] tracking-widest uppercase text-[#8E8E93]">{currentFlash.theme} • {currentFlash.level} • Box {getBox(currentFlash.id)}</div>
                <div className="mt-4 text-[32px] font-[700] tracking-tight">{currentFlash.da}</div>
                {currentFlash.collocation && <div className="mt-3 text-[14px] bg-[#FFD84D]/40 inline-block px-4 py-2 rounded-full border border-[#FFD84D] font-[500]">{currentFlash.collocation}</div>}
                <div className="mt-3 text-[14px] text-[#8E8E93] italic">{currentFlash.example}</div>
                {!showBack ? (
                  <button onClick={()=>setShowBack(true)} className="mt-8 bg-black text-white px-8 py-4 rounded-full text-[15px] font-[600] mx-auto tap-haptic">Show translation</button>
                ) : (
                  <>
                    <div className="mt-6 text-[20px] font-[600]">{currentFlash.en}</div>
                    <div className="mt-6 flex justify-center gap-3">
                      <button onClick={()=>handleAnswer(false)} className="px-6 py-3 rounded-full bg-[#FF3B30]/10 border border-[#FF3B30]/20 text-[#FF3B30] text-[14px] font-[600] tap-haptic">✗ Not yet</button>
                      <button onClick={()=>handleAnswer(true)} className="px-6 py-3 rounded-full bg-[#34C759]/10 border border-[#34C759]/20 text-[#34C759] text-[14px] font-[600] tap-haptic">✓ I know it</button>
                    </div>
                  </>
                )}
                <button onClick={()=>speak(currentFlash.da)} className="mt-6 mx-auto w-10 h-10 rounded-full bg-[#F2F2F7] border border-black/5 grid place-items-center hover:bg-black hover:text-white transition">▶</button>
              </div>
            ) : <div className="bg-white rounded-[24px] p-8 text-center shadow-sm border border-black/5">No words in this filter.</div>}
          </div>
        )}

        {mode==='list' && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filtered.slice(0,120).map(v=>(
              <div key={v.id} className="bg-white rounded-[20px] p-5 shadow-sm border border-black/5 hover:shadow-md transition">
                <div className="flex justify-between items-start gap-2">
                  <div><div className="font-[600] text-[15px] tracking-tight">{v.da} <span className="text-[#8E8E93] font-normal">— {v.en}</span></div>{v.collocation && <div className="mt-2 text-[12px] bg-[#F2F2F7] px-3 py-1.5 rounded-full inline-block font-[500]">{v.collocation}</div>}<div className="mt-2 text-[12px] text-[#8E8E93] italic line-clamp-2">{v.example}</div></div>
                  <button onClick={()=>speak(v.da)} className="shrink-0 w-8 h-8 rounded-full bg-[#F2F2F7] border border-black/5 grid place-items-center text-[10px] hover:bg-black hover:text-white transition">▶</button>
                </div>
                <div className="mt-4 flex items-center gap-2 flex-wrap"><span className="text-[10px] px-2.5 py-1 rounded-full bg-[#F2F2F7] font-[600]">{v.theme}</span><span className="text-[10px] px-2.5 py-1 rounded-full bg-white border border-black/10">{v.level}</span><span className="text-[10px] text-[#8E8E93]">Box {getBox(v.id)}</span>{v.particle && <span className="text-[10px] px-2.5 py-1 rounded-full bg-[#FF9500]/10 text-[#FF9500] border border-[#FF9500]/20">particle</span>}</div>
              </div>
            ))}
          </div>
        )}

        {mode==='collocation' && (
          <div className="mt-6 space-y-3">
            <div className="bg-black text-white rounded-[24px] p-6"><div className="text-[11px] font-[700] tracking-widest uppercase text-white/60">Why collocations?</div><div className="mt-2 text-[14px] leading-[1.5] text-white/80">You don't speak single words. You say "holde et møde" not "møde". Not "beslutning" but "træffe en beslutning". This view trains only words with collocation — what works in real speech.</div></div>
            {filtered.filter(v=>v.collocation).slice(0,80).map(v=>(
              <div key={v.id} className="bg-white rounded-[20px] p-5 shadow-sm border border-black/5 flex items-center justify-between">
                <div><div className="text-[13px] text-[#8E8E93]">{v.en}</div><div className="text-[18px] font-[600] tracking-tight mt-1">{v.collocation} <span className="text-[#8E8E93] text-[14px] font-normal">({v.da})</span></div><div className="text-[13px] italic text-[#8E8E93] mt-2">{v.example}</div></div>
                <button onClick={()=>speak(v.collocation)} className="w-10 h-10 rounded-full bg-[#F2F2F7] border border-black/5 grid place-items-center hover:bg-black hover:text-white transition">▶</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
