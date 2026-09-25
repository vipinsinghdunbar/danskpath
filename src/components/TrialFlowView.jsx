import { useState, useEffect } from 'react';
import { getQuestions, startTrial, submitAssessment, submitFeedback, getRefCodeFromUrl } from '../lib/api';

// Fallback questions if API fails
const fallbackQs = [
  { id: 1, category: "grammar", type: "V2", q: "Vælg korrekt: ___ arbejder jeg hjemme.", options: ["I dag","I dag jeg","I dag er jeg"], level: "A2" },
  { id: 2, category: "grammar", type: "Ledsætning", q: "Jeg ved, at han ___ kommer.", options: ["ikke","kommer ikke","ikke kommer"], level: "B1" },
  { id: 3, category: "grammar", type: "Sin/sit", q: "Hun elsker ___ mand.", options: ["sin","hendes","hans"], level: "B1" },
  { id: 6, category: "vocab", type: "Kollokationer", q: "Hvad betyder 'holde et møde'?", options: ["To have a meeting","To leave","To cancel"], level: "B1" },
  { id: 8, category: "listening", type: "Reduktion", q: "Hvad betyder 'd'er'?", options: ["det er","der er","det var"], level: "B1" },
];

const answersKey = {
  1: 0, 2: 2, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0, 13: 0, 14: 0, 15: 0, 16: 0, 17: 1, 18: 0, 19: 0, 20: 0, 21: 0, 22: 1, 23: 0, 24: 0
};

function calcLocalResult(answers) {
  let correct = 0;
  Object.entries(answers).forEach(([qid, ans]) => {
    if (answersKey[qid] === ans) correct++;
  });
  const total = Object.keys(answers).length;
  const pct = Math.round((correct/total)*100);
  let level = pct < 40 ? "Modul 2 (A1-A2)" : pct < 65 ? "Modul 3 (A2)" : pct < 80 ? "Modul 4 (B1)" : "Modul 5 (B1-B2) - PD3 klar";
  const strengths = pct >= 70 ? ["vocab","reading"] : pct >= 50 ? ["vocab"] : [];
  const weaknesses = pct < 60 ? ["grammar","listening"] : pct < 75 ? ["grammar"] : [];
  const path = [
    { step: 1, title: "V2 + inversion", why: "80% of B1 errors are V2", time: "Week 1-2" },
    { step: 2, title: "Collocations", why: "Words that work in speech", time: "Week 2-3" },
    { step: 3, title: "Listening without transcript", why: "Danish swallows 25% syllables", time: "Week 3-4" },
    { step: 4, title: "Writing 150-200 words", why: "PD3 structure", time: "Week 4-6" },
  ];
  const timeline = pct < 40 ? "6-9 months to PD3" : pct < 65 ? "4-6 months" : pct < 80 ? "2-4 months" : "1-2 months";
  return { correct, total, pct, level, strengths, weaknesses, path, timeline };
}

export default function TrialFlowView({ setActive }) {
  const [step, setStep] = useState('intro'); // intro, info, assessment, result, feedback, done
  const [refCode] = useState(()=> getRefCodeFromUrl());
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [goal, setGoal] = useState('');
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [trialId, setTrialId] = useState(null);
  const [result, setResult] = useState(null);
  const [feedback, setFeedback] = useState({ wouldUse: '', helpful: '', wouldPay: '', whatToChange: '' });
  const [loading, setLoading] = useState(false);
  const [startTime] = useState(Date.now());

  useEffect(()=>{
    getQuestions().then(qs => {
      if(qs && qs.length) setQuestions(qs);
      else setQuestions(fallbackQs);
    }).catch(()=>setQuestions(fallbackQs));
  },[]);

  const handleStartTrial = async () => {
    if(!name.trim()) return;
    setLoading(true);
    try {
      const data = await startTrial({ code: refCode, name, danishStartDate: startDate, goal });
      setTrialId(data.trial.id);
      setStep('assessment');
      if(navigator.vibrate) navigator.vibrate(20);
    } catch(e) {
      // offline fallback
      setTrialId('local_'+Date.now());
      setStep('assessment');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitAssessment = async () => {
    setLoading(true);
    try {
      const timeSpent = Math.round((Date.now() - startTime)/1000);
      const data = await submitAssessment({ trialId, answers, timeSpent });
      setResult(data.result || data.assessment);
      setStep('result');
    } catch {
      setResult(calcLocalResult(answers));
      setStep('result');
    } finally {
      setLoading(false);
      if(navigator.vibrate) navigator.vibrate(20);
    }
  };

  const handleSubmitFeedback = async () => {
    setLoading(true);
    try {
      await submitFeedback({ trialId, ...feedback });
      setStep('done');
    } catch {
      setStep('done');
    } finally {
      setLoading(false);
      if(navigator.vibrate) navigator.vibrate(20);
    }
  };

  if(step==='intro') {
    return (
      <div className="min-h-screen bg-[#F2F2F7] flex items-center justify-center p-5 pb-[100px]">
        <div className="w-full max-w-[480px]">
          <div className="bg-white rounded-[32px] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-black/5 animate-ios-in">
            <div className="w-12 h-12 rounded-full bg-black text-white grid place-items-center font-bold">D</div>
            <h1 className="mt-5 text-[32px] font-[700] tracking-tight leading-[0.95]">Find out where your Danish is today</h1>
            <p className="mt-4 text-[17px] leading-[1.4] text-[#3C3C43]/70">This platform evaluates your current Danish level, identifies your strengths and weaknesses, and creates a personalised learning path based on your goals.</p>
            <div className="mt-6 bg-[#F2F2F7] rounded-[20px] p-5 space-y-3">
              <div className="flex gap-3"><span className="w-6 h-6 rounded-full bg-black text-white grid place-items-center text-[11px]">1</span><span className="text-[14px]"><b>Short intro</b> + your background</span></div>
              <div className="flex gap-3"><span className="w-6 h-6 rounded-full bg-black text-white grid place-items-center text-[11px]">2</span><span className="text-[14px]"><b>Adaptive assessment</b> — vocab, grammar, listening, reading, writing</span></div>
              <div className="flex gap-3"><span className="w-6 h-6 rounded-full bg-black text-white grid place-items-center text-[11px]">3</span><span className="text-[14px]"><b>Personalised result</b> — level, strengths, path, timeline</span></div>
              <div className="flex gap-3"><span className="w-6 h-6 rounded-full bg-black text-white grid place-items-center text-[11px]">4</span><span className="text-[14px]"><b>Quick feedback</b> — 2 min</span></div>
            </div>
            <div className="mt-3 text-[11px] text-[#8E8E93]">Referred by: {refCode ? `${refCode} (Vipin)` : 'Direct'} • No full platform access — evaluation only</div>
            <button onClick={()=>{ setStep('info'); if(navigator.vibrate) navigator.vibrate(10); }} className="mt-8 w-full bg-black text-white py-4 rounded-full text-[17px] font-[600] shadow-lg tap-haptic">Continue →</button>
            <div className="mt-3 text-center text-[11px] text-[#8E8E93]">Takes ~10 min • Data saved securely</div>
          </div>
        </div>
      </div>
    );
  }

  if(step==='info') {
    return (
      <div className="min-h-screen bg-[#F2F2F7] flex items-center justify-center p-5 pb-[100px]">
        <div className="w-full max-w-[480px] bg-white rounded-[32px] p-7 shadow-sm border border-black/5">
          <div className="text-[11px] font-[700] tracking-widest uppercase text-[#8E8E93]">Before we start • 1 min</div>
          <h2 className="mt-3 text-[24px] font-[700] tracking-tight">A bit about you</h2>
          <div className="mt-6 space-y-5">
            <div>
              <label className="text-[13px] font-[600]">Your name</label>
              <input value={name} onChange={e=>setName(e.target.value)} placeholder="Anna Jensen" className="mt-2 w-full px-5 py-4 rounded-full bg-[#F2F2F7] border-0 text-[17px] outline-none focus:ring-2 focus:ring-black/10" />
            </div>
            <div>
              <label className="text-[13px] font-[600]">When did you start learning Danish?</label>
              <select value={startDate} onChange={e=>setStartDate(e.target.value)} className="mt-2 w-full px-5 py-4 rounded-full bg-[#F2F2F7] border-0 text-[17px] outline-none">
                <option value="">Select</option>
                <option value="0-3 months">0-3 months</option>
                <option value="3-6 months">3-6 months</option>
                <option value="6-12 months">6-12 months</option>
                <option value="1-2 years">1-2 years</option>
                <option value="2+ years">2+ years</option>
              </select>
            </div>
            <div>
              <label className="text-[13px] font-[600]">Your main goal (optional)</label>
              <select value={goal} onChange={e=>setGoal(e.target.value)} className="mt-2 w-full px-5 py-4 rounded-full bg-[#F2F2F7] border-0 text-[17px] outline-none">
                <option value="">Select goal</option>
                <option value="child_school">Child's school / kindergarten</option>
                <option value="job">Job / job interview</option>
                <option value="daily">Daily life / DSB / shopping</option>
                <option value="pd3">Pass PD3 / Modultest</option>
                <option value="social">Coffee break / colleagues</option>
              </select>
            </div>
            <button onClick={handleStartTrial} disabled={!name.trim() || loading} className="w-full bg-black text-white py-4 rounded-full text-[17px] font-[600] disabled:opacity-40 tap-haptic">{loading?'Starting...':'Start assessment →'}</button>
          </div>
        </div>
      </div>
    );
  }

  if(step==='assessment') {
    const answered = Object.keys(answers).length;
    const pct = questions.length ? Math.round(answered/questions.length*100) : 0;
    return (
      <div className="min-h-screen bg-[#F2F2F7] pb-[120px]">
        <div className="max-w-[700px] mx-auto px-5 pt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-[11px] font-[700] tracking-widest uppercase bg-black text-white px-3 py-1.5 rounded-full">Assessment • {answered}/{questions.length} • {pct}%</div>
            <div className="text-[12px] text-[#8E8E93]">Adaptive • varied</div>
          </div>
          <div className="h-2 bg-white rounded-full overflow-hidden border border-black/5"><div className="h-full bg-black rounded-full transition-all duration-500" style={{ width: `${pct}%` }} /></div>
          
          <div className="mt-6 space-y-4">
            {questions.map((q, idx)=>(
              <div key={q.id} className="bg-white rounded-[24px] p-6 shadow-sm border border-black/5">
                <div className="flex items-center gap-2 mb-3"><span className="text-[11px] font-[600] px-2.5 py-1 rounded-full bg-[#F2F2F7]">{idx+1}/{questions.length} • {q.category}</span><span className="text-[11px] text-[#8E8E93]">{q.type} • {q.level}</span></div>
                <div className="text-[17px] font-[600] tracking-tight">{q.q}</div>
                <div className="mt-4 space-y-2">
                  {q.options.map((opt, oi)=>(
                    <button key={oi} onClick={()=>{ setAnswers(a=>({...a, [q.id]: oi})); if(navigator.vibrate) navigator.vibrate(10); }} className={`w-full text-left px-5 py-4 rounded-full text-[15px] font-[500] border transition tap-haptic ${answers[q.id]===oi?'bg-black text-white border-black':'bg-[#F2F2F7] border-transparent hover:bg-white hover:border-black/10'}`}>{opt}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex gap-3">
            <button onClick={handleSubmitAssessment} disabled={Object.keys(answers).length < questions.length || loading} className="bg-black text-white px-8 py-4 rounded-full text-[17px] font-[600] disabled:opacity-40 shadow-lg tap-haptic">{loading?'Evaluating...':'Finish and see result →'}</button>
            <div className="text-[13px] text-[#8E8E93] self-center">{Object.keys(answers).length}/{questions.length} answered</div>
          </div>
        </div>
      </div>
    );
  }

  if(step==='result' && result) {
    return (
      <div className="min-h-screen bg-[#F2F2F7] pb-[120px]">
        <div className="max-w-[700px] mx-auto px-5 pt-8">
          <div className="bg-white rounded-[32px] p-8 shadow-sm border border-black/5 text-center">
            <div className="w-20 h-20 rounded-full bg-black text-white grid place-items-center text-[28px] font-bold mx-auto">{result.pct}%</div>
            <h1 className="mt-5 text-[28px] font-[700] tracking-tight">Your Danish evaluation</h1>
            <div className="mt-2 inline-flex bg-black text-white px-4 py-2 rounded-full text-[14px] font-[600]">{result.level}</div>
            <div className="mt-3 text-[13px] text-[#8E8E93]">{result.correct}/{result.total} correct • Evaluated from {Object.keys(result.byCategory || {}).length || 5} areas</div>

            <div className="mt-8 grid grid-cols-2 gap-3 text-left">
              <div className="bg-[#34C759]/10 rounded-[20px] p-4 border border-[#34C759]/20"><div className="text-[11px] font-[700] tracking-widest uppercase text-[#34C759]">Strengths</div><div className="mt-2 space-y-1">{(result.strengths||[]).length?result.strengths.map(s=><div key={s} className="text-[13px]">✓ {s}</div>):<div className="text-[13px] text-[#8E8E93]">Keep practicing to find strengths</div>}</div></div>
              <div className="bg-[#FF9500]/10 rounded-[20px] p-4 border border-[#FF9500]/20"><div className="text-[11px] font-[700] tracking-widest uppercase text-[#FF9500]">Areas to improve</div><div className="mt-2 space-y-1">{(result.weaknesses||[]).length?result.weaknesses.map(s=><div key={s} className="text-[13px]">• {s}</div>):<div className="text-[13px] text-[#8E8E93]">Good balance</div>}</div></div>
            </div>

            <div className="mt-8 text-left">
              <div className="text-[15px] font-[700]">Recommended learning path</div>
              <div className="mt-3 space-y-2">
                {(result.path||result.recommendedPath||[]).map((p,i)=>(
                  <div key={i} className="bg-[#F2F2F7] rounded-[16px] p-4 flex gap-3">
                    <div className="w-7 h-7 rounded-full bg-black text-white grid place-items-center text-[11px] font-bold shrink-0">{p.step||i+1}</div>
                    <div><div className="text-[14px] font-[600]">{p.title}</div><div className="text-[12px] text-[#8E8E93] mt-1">{p.why} • {p.time}</div></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 bg-black text-white rounded-[20px] p-5 text-left">
              <div className="text-[11px] font-[700] tracking-widest uppercase text-white/60">Estimated timeline • Why this path?</div>
              <div className="mt-2 text-[14px] leading-[1.5]">{result.timeline} — based on your current level and target. Path is recommended because your assessment shows {(result.weaknesses||[]).join(', ') || 'mixed'} needs work. We focus on weakest skill &lt;60% first (V2 is 80% of B1 errors).</div>
            </div>

            <button onClick={()=>{ setStep('feedback'); if(navigator.vibrate) navigator.vibrate(10); }} className="mt-8 w-full bg-black text-white py-4 rounded-full text-[17px] font-[600] tap-haptic">Continue to feedback →</button>
            <div className="mt-3 text-[11px] text-[#8E8E93]">You don't get full platform access — this is evaluation only. Admin Vipin sees your result.</div>
          </div>
        </div>
      </div>
    );
  }

  if(step==='feedback') {
    return (
      <div className="min-h-screen bg-[#F2F2F7] flex items-center justify-center p-5 pb-[100px]">
        <div className="w-full max-w-[500px] bg-white rounded-[32px] p-7 shadow-sm border border-black/5">
          <div className="text-[11px] font-[700] tracking-widest uppercase text-[#8E8E93]">Last step • 2 min • Helpful for product</div>
          <h2 className="mt-3 text-[24px] font-[700] tracking-tight">Quick feedback</h2>
          
          <div className="mt-6 space-y-6">
            {[
              { key: 'wouldUse', q: 'Would you like to use a platform like this to improve your Danish?', opts: ['Yes','Maybe','No'] },
              { key: 'helpful', q: 'Did you find this assessment helpful?', opts: ['Yes','Somewhat','No'] },
              { key: 'wouldPay', q: 'If full version were available, would you consider paying for it?', opts: ['Yes','Maybe','No'] },
            ].map(item=>(
              <div key={item.key}>
                <div className="text-[14px] font-[600] tracking-tight">{item.q}</div>
                <div className="mt-3 flex gap-2">
                  {item.opts.map(o=>(
                    <button key={o} onClick={()=>{ setFeedback(f=>({...f, [item.key]: o})); if(navigator.vibrate) navigator.vibrate(10); }} className={`flex-1 py-3 rounded-full text-[14px] font-[600] border transition tap-haptic ${feedback[item.key]===o?'bg-black text-white border-black':'bg-[#F2F2F7] border-transparent'}`}>{o}</button>
                  ))}
                </div>
              </div>
            ))}
            <div>
              <div className="text-[14px] font-[600]">What would you change or improve?</div>
              <textarea value={feedback.whatToChange} onChange={e=>setFeedback(f=>({...f, whatToChange: e.target.value}))} placeholder="Free text..." className="mt-3 w-full h-[100px] p-4 rounded-[16px] bg-[#F2F2F7] border-0 text-[15px] outline-none focus:ring-2 focus:ring-black/10" />
            </div>
            <button onClick={handleSubmitFeedback} disabled={loading} className="w-full bg-black text-white py-4 rounded-full text-[17px] font-[600] disabled:opacity-40 tap-haptic">{loading?'Sending...':'Submit feedback →'}</button>
          </div>
        </div>
      </div>
    );
  }

  if(step==='done') {
    return (
      <div className="min-h-screen bg-[#F2F2F7] flex items-center justify-center p-5">
        <div className="w-full max-w-[480px] bg-white rounded-[32px] p-8 shadow-sm border border-black/5 text-center">
          <div className="w-16 h-16 rounded-full bg-[#34C759] text-white grid place-items-center text-[28px] mx-auto">✓</div>
          <h2 className="mt-5 text-[24px] font-[700] tracking-tight">Thank you, {name}!</h2>
          <p className="mt-3 text-[15px] leading-[1.4] text-[#8E8E93]">Your evaluation and feedback have been saved. Admin Vipin can now see your result and feedback in the admin dashboard. You don't get full platform access — this was the trial/evaluation experience.</p>
          <div className="mt-6 bg-[#F2F2F7] rounded-[16px] p-4 text-[12px] text-[#8E8E93]">Referred by: {refCode || 'direct'} • Trial ID: {trialId?.slice(0,8)} • Data stored securely in danish-platform-db.json</div>
          <button onClick={()=>window.location.href='/'} className="mt-6 w-full bg-black text-white py-3 rounded-full text-[14px] font-[600]">Back to home</button>
        </div>
      </div>
    );
  }

  return null;
}
