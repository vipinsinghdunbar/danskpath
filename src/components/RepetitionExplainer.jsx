import { useState, useEffect } from 'react';
import { getRepetitionStats, getSeenMap } from '../lib/tracking';
import { getTemplateStats } from '../lib/templateEngine';
import original from '../data/originalItems.json';
import { vocabulary } from '../data/vocabulary';
import { listeningPieces } from '../data/listening';
import { readingTexts } from '../data/reading';

export default function RepetitionExplainer() {
  const [stats, setStats] = useState(null);
  const [tStats, setTStats] = useState(null);

  useEffect(()=>{
    setStats(getRepetitionStats());
    setTStats(getTemplateStats());
  },[]);

  const totalGrammar = original.topics.reduce((s,t)=>s+t.items.length,0);

  return (
    <div className="min-h-screen bg-[#FFFCF7] pb-[100px]">
      <div className="h-[3px] bg-[#121417] w-full" />
      <div className="max-w-[900px] mx-auto px-5 lg:px-8 py-8">
        <div className="text-[10px] tracking-[0.2em] uppercase border border-[#121417] inline-block px-2 py-1">Gentagelse · Template-engine</div>
        <h1 className="font-display font-[700] text-[32px] lg:text-[44px] leading-[0.9] tracking-tight mt-4">Er spørgsmålene<br/>nye hver gang?</h1>
        <p className="mt-4 font-serif text-[15px] leading-[1.6] max-w-[640px]">Kort svar: Ja — indtil du har set alt, så starter cyklussen forfra. Men svage gentages hurtigere. Og med ny uendelig engine: samme regel, nye ord hver gang — du lærer reglen, ikke svaret.</p>

        <div className="mt-8 grid lg:grid-cols-3 gap-[1px] bg-[#121417] border border-[#121417]">
          <div className="bg-[#121417] text-white p-6 lg:col-span-2">
            <div className="text-[11px] uppercase tracking-widest text-white/60">Original strategi — din CONTENT-STRATEGY.md</div>
            <p className="mt-3 font-serif text-[13px] leading-[1.6] text-white/85">
              “The question pool should be a <b className="text-white">content engine</b>, not fixed questions shuffled. Each exercise is authored as learning objective + variables, acceptable answers, close distractors, explanation rules, level, skill tags.”<br/><br/>
              “Each template needs at least 15 safe variable combinations. That gives 5,100+ controlled variants before AI generation, while keeping every answer and explanation teachable.”<br/><br/>
              “recentlyShownRule: exclude this text and its close variants for 30 days”
            </p>
            <div className="mt-4 text-[11px] text-white/50">Implementeret nu: templateEngine.js med dedupKey + 30-dages regel.</div>
          </div>
          <div className="bg-white p-6">
            <div className="text-[11px] uppercase tracking-widest font-[600]">Din tracking lige nu</div>
            {stats ? (
              <div className="mt-4 space-y-2 text-[12px] font-serif">
                <div className="flex justify-between border-b border-[#E8E2D9] py-2"><span>Total set</span><span className="font-bold">{stats.totalSeen}</span></div>
                <div className="flex justify-between border-b border-[#E8E2D9] py-2"><span>I dag</span><span>{stats.byAge.today}</span></div>
                <div className="flex justify-between border-b border-[#E8E2D9] py-2"><span>Seneste uge</span><span>{stats.byAge.week}</span></div>
                <div className="flex justify-between border-b border-[#E8E2D9] py-2"><span>Seneste 30 dage</span><span>{stats.byAge.month}</span></div>
                <div className="flex justify-between py-2"><span>Ældre end 30 dage</span><span>{stats.byAge.older}</span></div>
                {tStats && <div className="mt-4 text-[11px] text-[#6B7280]">Engine emner: {tStats.topics.length} · {tStats.topics.join(', ')}</div>}
              </div>
            ) : <div className="text-[12px] text-[#6B7280] mt-4">Ingen data — tag en test.</div>}
            <button onClick={()=>{ localStorage.clear(); window.location.reload(); }} className="mt-4 w-full border border-[#121417] py-2 text-[11px] uppercase tracking-widest hover:bg-[#121417] hover:text-white">Nulstil tracking</button>
          </div>
        </div>

        <div className="mt-8 border border-[#121417] bg-white p-6">
          <h3 className="text-[11px] uppercase tracking-widest font-[600]">Nyhed: Uendelig engine — sådan virker den</h3>
          <div className="mt-4 grid lg:grid-cols-2 gap-6 text-[13px] leading-[1.6] font-serif">
            <div>
              <b>Eksempel V2-skabelon:</b><br/>
              Objective: Inversion efter forfelt<br/>
              Template: <code className="bg-[#FFFCF7] border px-1">{'{front} {verb} {subject} {rest}.'}</code><br/>
              Variables: front=[I morgen, Om sommeren, Hver dag...], subject=[jeg, vi, Anna...], verb=[skal, tager...], rest=[på arbejde, til Norge...]<br/><br/>
              <b>Generering:</b> Vælg tilfældig kombination der ikke er set inden 30 dage. DedupKey = <code className="bg-[#FFFCF7] border px-1">v2|I morgen|skal|jeg</code>. Gem timestamp i <code className="bg-[#FFFCF7] border px-1">dansk_seen</code>. Næste gang samme dedupKey inden 30 dage → skip, vælg ny.
            </div>
            <div>
              <b>Hvorfor det er bedre end fast bank:</b><br/>
              Fast bank (761): du kan lære svaret udenad. Engine: du kan kun lære reglen. Samme forklaring, nye ord. Det er det der flytter dig ved Modultest — du skal producere V2 under pres med nye ord, ikke genkende gamle sætninger.<br/><br/>
              <b>15 varianter per skabelon:</b> 17 emner × 15 = 255 kerne-skabeloner, hver med 3–5 variable slots → 5.100+ kontrollerede varianter før AI. Alle svar og forklaringer er underviselige — ingen LLM-hallucination.
            </div>
          </div>
        </div>

        <div className="mt-6 grid lg:grid-cols-2 gap-[1px] bg-[#121417] border border-[#121417]">
          <div className="bg-white p-6">
            <div className="text-[11px] uppercase tracking-widest font-[600]">Grammatik — {totalGrammar} faste + uendelig</div>
            <div className="mt-3 text-[13px] leading-[1.6] font-serif space-y-2">
              <div><b>Er de nye hver gang?</b> Ja — i “Uendelig” mode: nye varianter hver gang. I “Kun nye” mode: faste items, ingen gentagelse i 30 dage.</div>
              <div><b>Hvor ofte gentages?</b>
                <ul className="list-disc list-inside mt-1 text-[12px]">
                  <li>Uendelig: aldrig samme dedupKey inden 30 dage, så nye ord</li>
                  <li>Kun nye: ingen gentagelse i 30 dage, reset når alle 761 set</li>
                  <li>Svage: kun forkerte, gentages til korrekte</li>
                  <li>Alle: viser alt</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="bg-white p-6">
            <div className="text-[11px] uppercase tracking-widest font-[600]">Ordforråd — 1052 · SRS</div>
            <div className="mt-3 text-[13px] leading-[1.6] font-serif space-y-2">
              <div><b>Er de nye hver gang?</b> Ja via Leitner Box 0–5.</div>
              <div><b>Hvor ofte?</b>
                <ul className="list-disc list-inside mt-1 text-[12px]">
                  <li>Box 0 nye: daglig</li>
                  <li>Box1: 1 dag, Box2: 3 dage, Box3: 7 dage, Box4: 14 dage, Box5: 30 dage</li>
                  <li>Sikre ord (Box5) vises ikke i 30 dage</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="bg-white p-6">
            <div className="text-[11px] uppercase tracking-widest font-[600]">Lytning — 26 · Læsning — 40</div>
            <div className="mt-3 text-[13px] leading-[1.6] font-serif">
              Ingen gentagelse før alle klaret. `dansk_used_listening` + timestamp. Uklarede først, klarede 60% opacity. Når alle 26 klaret → reset. Samme for læsning.
            </div>
          </div>
          <div className="bg-white p-6">
            <div className="text-[11px] uppercase tracking-widest font-[600]">Diagnostic 15 · Trial 20</div>
            <div className="mt-3 text-[13px] leading-[1.6] font-serif">
              Fixed set men markeres set i `dansk_seen`. Næste gang i “Kun nye” får du varianter fra 761-bank eller uendelig engine — ikke samme 20. Trial link inkluderer `invitedBy` og gemmes i database med breakdown per skill.
            </div>
          </div>
        </div>

        <div className="mt-6 border border-[#121417] bg-[#121417] text-white p-6">
          <div className="text-[11px] uppercase tracking-widest text-white/60">Opsummering</div>
          <table className="mt-4 w-full text-[11px] border-collapse">
            <thead className="text-[10px] uppercase tracking-widest text-white/50 border-b border-white/20"><tr><th className="text-left py-2">Øvelse</th><th className="text-left">Total</th><th className="text-left">Nye hver gang?</th><th className="text-left">Gentagelse</th></tr></thead>
            <tbody className="text-white/80 font-serif">
              <tr className="border-b border-white/10"><td className="py-3">Grammatik fast</td><td>761</td><td>Ja i Kun nye</td><td>Ingen i 30 dage, reset når alle set</td></tr>
              <tr className="border-b border-white/10"><td className="py-3">Grammatik uendelig</td><td>∞</td><td>Ja altid</td><td>DedupKey 30 dage, nye kombinationer</td></tr>
              <tr className="border-b border-white/10"><td className="py-3">Ordforråd</td><td>1052</td><td>Ja via SRS</td><td>Box0 daglig → Box5 30d</td></tr>
              <tr className="border-b border-white/10"><td className="py-3">Lytning</td><td>26</td><td>Ja til alle klaret</td><td>Ingen før alle klaret, så reset</td></tr>
              <tr className="border-b border-white/10"><td className="py-3">Læsning</td><td>40</td><td>Ja til alle læst</td><td>Samme</td></tr>
              <tr><td className="py-3">Trial 20</td><td>20</td><td>Første gang fixed, så varianter</td><td>Markeres set, næste gang nye</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
