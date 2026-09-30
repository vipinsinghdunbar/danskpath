import { useState, useEffect } from 'react';
import { getPace, getCanDoProgress, getUnlocksForTopic, getReflectionPrompt, saveReflection, getReflections, motivationAudit } from '../lib/motivation';
import { getGoals, getAllGoals, saveGoals } from '../lib/goals';
import { getFirstAndLatest } from '../lib/writingEngine';

export default function MotivationView({ setActive }) {
  const [pace, setPace] = useState(null);
  const [canDo, setCanDo] = useState([]);
  const [reflection, setReflection] = useState('');
  const [reflections, setReflections] = useState([]);
  const [prompt, setPrompt] = useState(null);
  const [userGoals, setUserGoals] = useState([]);
  const [beforeAfter, setBeforeAfter] = useState(null);

  useEffect(()=>{
    setPace(getPace());
    setCanDo(getCanDoProgress());
    setPrompt(getReflectionPrompt());
    setReflections(getReflections());
    setUserGoals(getGoals());
    setBeforeAfter(getFirstAndLatest());
  },[]);

  const handleSaveReflection = () => {
    if(!reflection.trim()) return;
    if(navigator.vibrate) navigator.vibrate(10);
    saveReflection(reflection);
    setReflections(getReflections());
    setReflection('');
  };

  const tap = (id) => { if(navigator.vibrate) navigator.vibrate(10); setActive(id); };

  return (
    <div className="min-h-screen bg-[#F2F2F7] pb-[120px]">
      <div className="max-w-[1100px] mx-auto px-5 lg:px-8 pt-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-full bg-black text-white grid place-items-center text-[12px] font-bold">D</div>
          <span className="text-[13px] font-[600]">Motivation</span>
        </div>
        <h1 className="ios-large-title">What keeps you<br/>coming back?</h1>
        <p className="mt-3 text-[17px] leading-[1.4] tracking-tight text-[#3C3C43]/70 max-w-[640px]">Can you write to your landlord without being misunderstood? Do you understand DSB announcements? Are you closer to PD3 than last week?</p>

        {/* Goals — iOS card */}
        <div className="mt-8 bg-white rounded-[32px] p-6 shadow-sm border border-black/5">
          <div className="flex items-center justify-between">
            <div className="text-[13px] font-[700] tracking-tight flex items-center gap-2"><span className="w-6 h-6 rounded-full bg-black text-white grid place-items-center text-[11px]">🎯</span> Your 3 goals — your why</div>
            <span className="text-[11px] px-2.5 py-1 rounded-full bg-[#F2F2F7] text-[#8E8E93]">{userGoals.length}/3</span>
          </div>
          {userGoals.length>0 ? (
            <>
              <div className="mt-4 flex flex-wrap gap-2">
                {userGoals.map(g=>(
                  <span key={g.id} className="bg-[#F2F2F7] border border-black/5 rounded-full px-4 py-2 text-[14px] font-[500]">{g.icon} {g.label}</span>
                ))}
              </div>
              <div className="mt-3 text-[13px] text-[#8E8E93]">Your practice is weighted toward these goals. Practicing {userGoals.flatMap(g=>g.mapsTo).slice(0,3).join(', ')} directly helps.</div>
              {beforeAfter && beforeAfter.count>=2 && (
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="bg-[#F2F2F7] rounded-[20px] p-4"><div className="text-[10px] font-[700] tracking-widest uppercase text-[#8E8E93]">First text</div><div className="mt-2 text-[13px] leading-[1.4] line-clamp-3">{beforeAfter.first.text}</div><div className="mt-2 text-[11px] text-[#8E8E93]">{beforeAfter.first.words} words</div></div>
                  <div className="bg-[#007AFF] rounded-[20px] p-4 text-white"><div className="text-[10px] font-[700] tracking-widest uppercase text-white/70">Latest</div><div className="mt-2 text-[13px] leading-[1.4] line-clamp-3">{beforeAfter.latest.text}</div><div className="mt-2 text-[11px] font-[600]">+{beforeAfter.improvement} words • {beforeAfter.count} total — improving</div></div>
                </div>
              )}
            </>
          ) : (
            <div className="mt-4 text-[14px] text-[#8E8E93]">No goals yet — recommendation is generic. Pick 3 so we can show 'This helps your goal'.</div>
          )}
          <div className="mt-5 grid grid-cols-2 gap-2">
            {getAllGoals().map(g=>{
              const sel = userGoals.some(ug=>ug.id===g.id);
              return (
                <button key={g.id} onClick={()=>{
                  const ids = getGoals().map(x=>x.id);
                  const newIds = ids.includes(g.id) ? ids.filter(x=>x!==g.id) : [...ids.slice(-2), g.id];
                  saveGoals(newIds);
                  setUserGoals(getGoals());
                  if(navigator.vibrate) navigator.vibrate(10);
                }} className={`text-left p-3 rounded-[16px] border transition tap-haptic ${sel?'bg-black text-white border-black':'bg-[#F2F2F7] border-black/5 hover:bg-white'}`}>
                  <div className="text-[13px] font-[600]">{g.icon} {g.label} {sel?'✓':''}</div>
                  <div className={`text-[11px] mt-1 ${sel?'text-white/70':'text-[#8E8E93]'}`}>{g.desc}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Pace — iOS Health style */}
        <div className="mt-6 grid lg:grid-cols-[1.2fr_0.8fr] gap-4">
          <div className="bg-white rounded-[32px] p-6 shadow-sm border border-black/5">
            <div className="text-[13px] font-[700] tracking-tight">Your pace • Honest projection</div>
            {pace ? (
              <>
                <div className="mt-5 grid grid-cols-3 gap-3">
                  <div className="bg-[#F2F2F7] rounded-[20px] p-4"><div className="text-[10px] font-[700] tracking-widest uppercase text-[#8E8E93]">Last 7 days</div><div className="text-[28px] font-[700] tracking-tight mt-1">{pace.daysWorkedLast7}/7</div><div className="text-[11px] text-[#8E8E93]">{pace.last7Days} tasks • {pace.avgPerDayLast7}/day</div></div>
                  <div className="bg-[#F2F2F7] rounded-[20px] p-4"><div className="text-[10px] font-[700] tracking-widest uppercase text-[#8E8E93]">Last 30 days</div><div className="text-[28px] font-[700] tracking-tight mt-1">{pace.daysWorkedLast30}/30</div><div className="text-[11px] text-[#8E8E93]">{pace.last30Days} tasks</div></div>
                  <div className="bg-black rounded-[20px] p-4 text-white"><div className="text-[10px] font-[700] tracking-widest uppercase text-white/60">To PD3</div><div className="text-[28px] font-[700] tracking-tight mt-1">{pace.weeksAt7DayPace ? `${pace.weeksAt7DayPace}w` : '—'}</div><div className="text-[11px] text-white/60">{pace.remaining} left</div></div>
                </div>
                <div className="mt-4 bg-[#F2F2F7] rounded-[16px] p-4 text-[14px] leading-[1.5] tracking-tight">{pace.message}</div>
                <div className="mt-5">
                  <div className="text-[11px] font-[700] tracking-widest uppercase text-[#8E8E93]">Last 30 days — no shame color</div>
                  <div className="mt-3 flex gap-[3px]">
                    {pace.heatmap.map((d,i)=>(
                      <div key={i} className={`flex-1 h-[32px] rounded-full grid place-items-center text-[10px] font-[600] ${d.worked?'bg-black text-white':'bg-[#F2F2F7] text-[#8E8E93]'}`} title={`${d.date}: ${d.count}`}>{d.worked?'✓':''}</div>
                    ))}
                  </div>
                  <div className="mt-2 text-[11px] text-[#8E8E93]">Black = worked • Gray = not • No red, no punishment. 3-4 days/week is enough.</div>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="bg-[#E5F1FF] rounded-[16px] p-4"><div className="text-[11px] font-[700] uppercase">If you continue 15 min/day:</div><div className="mt-1 text-[12px] leading-[1.4]">Modultest 3 in 3-4 weeks, Modultest 4 in 8-10 weeks, PD3 in {pace.weeksAt7DayPace||'14-20'} weeks.</div></div>
                  <div className="bg-[#F2F2F7] rounded-[16px] p-4"><div className="text-[11px] font-[700] uppercase">If you stop 2 weeks:</div><div className="mt-1 text-[12px] leading-[1.4]">Box2→Box1 (~40 words to repeat). Not disaster — 15 min today brings you back.</div></div>
                </div>
              </>
            ) : <div className="text-[14px] text-[#8E8E93]">No data — take test first.</div>}
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-[24px] p-5 shadow-sm border border-black/5">
              <div className="text-[13px] font-[700]">Weekly reflection • 2 min</div>
              <div className="mt-3">
                <div className="text-[14px] font-[600] tracking-tight">{prompt?.q}</div>
                <div className="text-[12px] text-[#8E8E93] mt-1">{prompt?.hint}</div>
                <textarea value={reflection} onChange={e=>setReflection(e.target.value)} placeholder="Write 1-2 lines..." className="mt-3 w-full h-[90px] p-4 rounded-[16px] bg-[#F2F2F7] border-0 text-[15px] outline-none focus:ring-2 focus:ring-black/10" />
                <button onClick={handleSaveReflection} className="mt-3 w-full bg-black text-white py-3.5 rounded-full text-[14px] font-[600] tap-haptic">Save reflection</button>
              </div>
              {reflections.length>0 && (
                <div className="mt-5 border-t border-black/5 pt-4">
                  <div className="text-[11px] font-[700] tracking-widest uppercase text-[#8E8E93]">Previous</div>
                  <div className="mt-3 space-y-2 max-h-[120px] overflow-y-auto">
                    {reflections.slice(-5).reverse().map((r,i)=>(
                      <div key={i} className="text-[12px] leading-[1.4] bg-[#F2F2F7] rounded-full px-3 py-2"><span className="text-[#8E8E93]">{new Date(r.date).toLocaleDateString()}</span>: {r.text}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white rounded-[24px] p-5 shadow-sm border border-black/5">
              <div className="text-[13px] font-[700]">Normalize struggle</div>
              <div className="mt-3 text-[13px] leading-[1.5] space-y-2 text-[#3C3C43]/80">
                <div>• Others on Modul 1-5 also struggle with V2 — normal. 80% of B1 errors are V2.</div>
                <div>• Box0-1 should feel hard — that's the point.</div>
                <div>• Subordinate clause flips word order — everyone fails first week.</div>
                <div>• Listening without transcript feels impossible first time — second time 30% better.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Can-do */}
        <div className="mt-6 bg-white rounded-[24px] p-6 shadow-sm border border-black/5">
          <div className="text-[13px] font-[700]">You can now — functional wins (not %)</div>
          <div className="mt-4 grid lg:grid-cols-2 gap-2">
            {canDo.map(item=>(
              <div key={item.id} className={`p-4 rounded-[16px] flex gap-3 ${item.done?'bg-black text-white':'bg-[#F2F2F7]'}`}>
                <div className={`w-7 h-7 rounded-full grid place-items-center text-[12px] shrink-0 ${item.done?'bg-white text-black':'bg-white border border-black/5'}`}>{item.done?'✓':'○'}</div>
                <div>
                  <div className="text-[14px] font-[500] leading-tight">{item.text}</div>
                  <div className={`text-[11px] mt-1 ${item.done?'text-white/60':'text-[#8E8E93]'}`}>{item.level} • {item.done?'Unlocked':'Next'}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Unlocks */}
        <div className="mt-6 bg-white rounded-[24px] p-6 shadow-sm border border-black/5">
          <div className="text-[13px] font-[700]">What does each topic unlock in real life?</div>
          <div className="mt-4 grid lg:grid-cols-3 gap-3">
            {Object.keys({ v2:1, ledsaetning:1, sin:1, praep:1, bindeord:1, staerke:1 }).map(topicId=>{
              const unlock = getUnlocksForTopic(topicId);
              return (
                <div key={topicId} className="bg-[#F2F2F7] rounded-[20px] p-4">
                  <div className="text-[10px] font-[700] tracking-widest uppercase bg-black text-white px-2 py-1 rounded-full inline-block">{topicId}</div>
                  <div className="mt-3 text-[13px] font-[600] tracking-tight">{unlock.title}</div>
                  <div className="mt-1 text-[12px] leading-[1.4] text-[#8E8E93]">{unlock.desc}</div>
                  <div className="mt-2 text-[11px] font-[600] text-[#007AFF]">→ {unlock.functional}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <button onClick={()=>tap('practice')} className="bg-black text-white px-6 py-3.5 rounded-full text-[14px] font-[600] tap-haptic">Today's 15 min →</button>
          <button onClick={()=>tap('levels')} className="bg-white border border-black/10 px-6 py-3.5 rounded-full text-[14px] font-[600]">Levels</button>
        </div>
      </div>
    </div>
  );
}
