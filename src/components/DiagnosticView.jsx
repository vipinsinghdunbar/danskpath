import { useState, useRef, useEffect, useMemo } from 'react';
import { readingTexts } from '../data/reading';
import { listeningPieces } from '../data/listening';
import { writingTasks } from '../data/writing';
import { getExercisesByCategory, getAllCategories } from '../lib/completeGrammarExercises';
import { useTTS } from '../hooks/useTTS';

/**
 * PLACEMENT TEST
 *
 * Rebuilt after the first real user took it and reported, correctly, that the
 * audio did not work, speaking could not be recorded, reading was a single
 * question, writing was missing entirely, and the level was too easy.
 *
 * The causes were all the same shape. The old version carried seventeen
 * hardcoded toy items instead of using the content the app already had:
 *
 *   - "Listening" printed the transcript on screen — including the answer:
 *     the item read "(Audio: Hej, mit navn er Jens)" above the question "Hvad
 *     hedder personen?". There was no audio anywhere in the component.
 *   - "Speaking" showed a prompt and asked the learner to rate themselves.
 *     No microphone, no recording.
 *   - Reading passages were one or two sentences with a single question. The
 *     hardest, labelled B1, was three short sentences.
 *   - Writing did not exist.
 *
 * Meanwhile the app already held 40 levelled reading texts with comprehension
 * questions, 26 listening pieces with transcripts, 8 writing tasks with word
 * targets, 435 levelled grammar exercises, a working Danish text-to-speech
 * hook, and microphone recording in SpeakingView. This version uses all of it.
 *
 * Speaking stays self-assessed, because no browser can grade a spoken answer
 * honestly — but the learner now actually records and hears themselves back,
 * which is the part that makes the self-assessment worth anything.
 */

// Levels in order, used for both selection and scoring.
const LADDER = ['A1', 'A2', 'B1', 'B2'];

/** Pick one item per level, preferring ones with the most questions. */
function ladderPick(pool, levels, { minQuestions = 1 } = {}) {
  return levels
    .map((level) => {
      const atLevel = pool
        .filter((x) => x.level === level && (x.questions?.length ?? 0) >= minQuestions)
        .sort((a, b) => (b.questions?.length ?? 0) - (a.questions?.length ?? 0));
      return atLevel[0] ?? null;
    })
    .filter(Boolean);
}

/** Grammar items spread across the ladder, two per level where they exist. */
function grammarLadder() {
  const levelOf = (id) => (/_(A1|A2|B1|B2)_/.exec(id) || [])[1] ?? null;
  const all = getAllCategories().flatMap((c) =>
    getExercisesByCategory(c.code).map((ex) => ({ ...ex, category: c.code })),
  );
  const out = [];
  for (const level of LADDER) {
    const atLevel = all.filter((ex) => levelOf(ex.id) === level);
    // Untagged items are the general pool; use them where a band is thin.
    const fallback = all.filter((ex) => levelOf(ex.id) === null);
    const source = atLevel.length >= 2 ? atLevel : [...atLevel, ...fallback];
    for (let i = 0; i < 2 && source.length; i += 1) {
      const pick = source[Math.floor(Math.random() * source.length)];
      if (pick && !out.some((o) => o.id === pick.id)) out.push({ ...pick, level });
    }
  }
  return out;
}

/**
 * Score a written answer on what can be checked without judging Danish style:
 * length against the task's own target, connectives, a subordinate clause, and
 * personal voice. Deliberately not a quality grade.
 */
function scoreWriting(text, task) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  if (!words) return { pct: 0, words, notes: ['Intet skrevet.'] };

  const lower = text.toLowerCase();
  const connectors = ['fordi', 'derfor', 'men', 'selvom', 'og', 'så', 'desuden', 'for eksempel'];
  const found = connectors.filter((c) => lower.includes(c));
  const subordinate = /\b(at|fordi|hvis|når|som|selvom)\b/.test(lower);
  const personal = /\bjeg\b/.test(lower);

  const notes = [];
  let pct = 0;

  if (words >= task.minWords) { pct += 40; notes.push(`${words} ord — længden er opfyldt.`); }
  else { pct += Math.round((words / task.minWords) * 40); notes.push(`${words} af ${task.minWords} ord — for kort.`); }

  if (found.length >= 2) { pct += 25; notes.push(`Bindeord brugt: ${found.slice(0, 3).join(', ')}.`); }
  else if (found.length === 1) { pct += 12; notes.push('Kun ét bindeord — prøv fordi, derfor, selvom.'); }
  else notes.push('Ingen bindeord — teksten hænger ikke sammen endnu.');

  if (subordinate) { pct += 20; notes.push('Du bruger ledsætning.'); }
  else notes.push('Ingen ledsætning — prøv "…, fordi jeg…".');

  if (personal) { pct += 15; notes.push('Personlig stil med "jeg".'); }
  else notes.push('Brug "jeg" — der forventes personlig stil.');

  return { pct: Math.min(100, pct), words, notes };
}

const SECTIONS = [
  { key: 'reading', label: 'Læsning', blurb: 'Tre tekster med spørgsmål til indholdet.' },
  { key: 'listening', label: 'Lytning', blurb: 'Tre lydklip. Du kan høre hvert klip igen.' },
  { key: 'grammar', label: 'Grammatik', blurb: 'Otte opgaver fra A1 til B2.' },
  { key: 'writing', label: 'Skrivning', blurb: 'Én kort skriveopgave.' },
  { key: 'speaking', label: 'Tale', blurb: 'Én taleopgave. Du optager dig selv.' },
];

export default function DiagnosticView({ onComplete }) {
  const [stage, setStage] = useState('start');
  const [sectionIndex, setSectionIndex] = useState(0);
  const [itemIndex, setItemIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [written, setWritten] = useState('');
  const [speakingRating, setSpeakingRating] = useState(null);
  const [revealed, setRevealed] = useState(false);

  const { speak, stop, speaking } = useTTS();

  // Fixed for the life of the test, so a re-render cannot reshuffle it.
  const test = useMemo(() => ({
    reading: ladderPick(readingTexts, ['A2', 'B1', 'B2']),
    listening: ladderPick(listeningPieces, ['A2', 'B1', 'B2']),
    grammar: grammarLadder(),
    writing: writingTasks.find((t) => t.level === 'A2') ?? writingTasks[0],
    speaking: {
      prompt: 'Fortæl om din vej til Danmark, og hvad du laver her. Tal i cirka et minut.',
      level: 'A2–B1',
    },
  }), []);

  const section = SECTIONS[sectionIndex];

  useEffect(() => () => stop(), [stop]);

  // ---- recording ---------------------------------------------------------
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [micError, setMicError] = useState(null);
  const [seconds, setSeconds] = useState(0);
  const recorderRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);

  const startRecording = async () => {
    setMicError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const rec = new MediaRecorder(stream);
      chunksRef.current = [];
      rec.ondataavailable = (e) => chunksRef.current.push(e.data);
      rec.onstop = () => {
        setAudioURL(URL.createObjectURL(new Blob(chunksRef.current, { type: 'audio/webm' })));
        stream.getTracks().forEach((t) => t.stop());
      };
      rec.start();
      recorderRef.current = rec;
      setRecording(true);
      setSeconds(0);
      timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    } catch (err) {
      setMicError(
        err?.name === 'NotAllowedError'
          ? 'Mikrofonen blev afvist. Tillad adgang i browseren og prøv igen.'
          : `Mikrofonen kunne ikke startes: ${err?.message ?? 'ukendt fejl'}`,
      );
    }
  };

  const stopRecording = () => {
    recorderRef.current?.stop();
    clearInterval(timerRef.current);
    setRecording(false);
  };

  useEffect(() => () => clearInterval(timerRef.current), []);

  // ---- answering ---------------------------------------------------------
  const recordAnswer = (key, value) => setAnswers((a) => ({ ...a, [key]: value }));

  const finishTest = () => {
    const pct = (correct, total) => (total ? Math.round((correct / total) * 100) : 0);

    // Questions in data/reading.js and data/listening.js store the correct
    // option index as `a`, not `correct`. Reading the wrong field scored every
    // comprehension answer as wrong.
    const correctIndex = (q) => (typeof q.a === 'number' ? q.a : q.correct);

    let rCorrect = 0, rTotal = 0;
    test.reading.forEach((t, ti) =>
      (t.questions ?? []).forEach((q, qi) => {
        rTotal += 1;
        if (answers[`r${ti}-${qi}`] === correctIndex(q)) rCorrect += 1;
      }));

    let lCorrect = 0, lTotal = 0;
    test.listening.forEach((t, ti) =>
      (t.questions ?? []).forEach((q, qi) => {
        lTotal += 1;
        if (answers[`l${ti}-${qi}`] === correctIndex(q)) lCorrect += 1;
      }));

    let gCorrect = 0;
    test.grammar.forEach((ex, i) => { if (answers[`g${i}`] === ex.correct) gCorrect += 1; });

    const writingScore = scoreWriting(written, test.writing);
    const speakingPct = { let: 90, passende: 70, svaert: 40 }[speakingRating] ?? 50;

    const scores = {
      reading: pct(rCorrect, rTotal),
      listening: pct(lCorrect, lTotal),
      grammar: pct(gCorrect, test.grammar.length),
      writing: writingScore.pct,
      speaking: speakingPct,
    };

    const values = Object.values(scores);
    const avg = values.reduce((s, v) => s + v, 0) / values.length;
    const overallLevel = avg >= 80 ? 'B2' : avg >= 62 ? 'B1' : avg >= 42 ? 'A2' : 'A1';

    const payload = {
      timestamp: new Date().toISOString(),
      scores,
      overallLevel,
      detail: { writing: writingScore, speakingSelfReport: speakingRating },
    };
    try {
      localStorage.setItem('dansk_diagnostic', JSON.stringify(payload));
      localStorage.setItem('dansk_verdict', JSON.stringify(payload));
      localStorage.setItem('dansk_level', overallLevel);
    } catch (err) {
      console.warn('[diagnostic] could not save', err);
    }
    setStage('results');
    setResult(payload);
  };

  const [result, setResult] = useState(null);

  const nextItem = (itemCount) => {
    setRevealed(false);
    if (itemIndex + 1 < itemCount) { setItemIndex(itemIndex + 1); return; }
    stop();
    if (sectionIndex + 1 < SECTIONS.length) { setSectionIndex(sectionIndex + 1); setItemIndex(0); return; }
    finishTest();
  };

  // ---- shared chrome -----------------------------------------------------
  const Shell = ({ children, footer }) => (
    <div className="min-h-screen bg-[#f2f2f7]">
      <header className="bg-white border-b border-[#e5e5ea] sticky top-0 z-10">
        <div className="page py-3 flex items-center gap-4">
          <div className="flex-1 min-w-0">
            <div className="font-bold text-[15px]">{section?.label ?? 'Niveautest'}</div>
            <div className="text-[11px] text-[#8e8e93]">
              Del {sectionIndex + 1} af {SECTIONS.length}
            </div>
          </div>
          <div className="flex gap-1.5">
            {SECTIONS.map((s, i) => (
              <div key={s.key}
                className={`h-1.5 w-7 rounded-full ${i < sectionIndex ? 'bg-[#121417]' : i === sectionIndex ? 'bg-[#007aff]' : 'bg-[#e5e5ea]'}`} />
            ))}
          </div>
        </div>
      </header>
      <main className="page py-9 pb-32"><div className="prose-col">{children}</div></main>
      {footer && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#e5e5ea] z-20">
          <div className="page py-4">{footer}</div>
        </div>
      )}
    </div>
  );

  const Options = ({ options, value, onChange }) => (
    <div className="grid gap-2.5 mt-5">
      {options.map((o, i) => (
        <button key={i} onClick={() => onChange(i)}
          className={`text-left px-4 py-3.5 rounded-xl border transition-colors ${
            value === i ? 'border-[#007aff] bg-[#e5f1ff]' : 'border-[#e5e5ea] bg-white hover:border-[#c7c7cc]'
          }`}>
          <span className="text-[12px] text-[#8e8e93] mr-2.5">{String.fromCharCode(65 + i)}</span>
          <span className="text-[15px]">{o}</span>
        </button>
      ))}
    </div>
  );

  const NextButton = ({ disabled, onClick, label = 'Næste' }) => (
    <button onClick={onClick} disabled={disabled}
      className="w-full py-3.5 rounded-xl bg-[#121417] text-white text-[15px] font-medium hover:bg-black disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
      {label}
    </button>
  );

  // ---- start -------------------------------------------------------------
  if (stage === 'start') {
    return (
      <div className="min-h-screen bg-[#f2f2f7] py-12"><div className="page"><div className="max-w-[680px] bg-white rounded-2xl border border-[#e5e5ea] p-8">
          <h1 className="text-[27px] font-bold leading-tight mb-2">Find dit niveau</h1>
          <p className="text-[15px] text-[#8e8e93] mb-6 leading-relaxed">
            Fem dele, cirka 15 minutter. Hver færdighed måles for sig — de fleste
            ligger ikke på samme niveau i alle fem, og det er præcis det testen
            skal finde ud af.
          </p>
          <ol className="mb-7">
            {SECTIONS.map((s, i) => (
              <li key={s.key} className="flex gap-3.5 py-2.5 border-t border-[#e5e5ea]">
                <span className="text-[12px] text-[#8e8e93] tabular-nums pt-1 w-4">{i + 1}</span>
                <div>
                  <div className="text-[15px] font-medium">{s.label}</div>
                  <div className="text-[13px] text-[#8e8e93]">{s.blurb}</div>
                </div>
              </li>
            ))}
          </ol>
          <p className="text-[13px] text-[#8e8e93] mb-5">
            Lytning afspilles af browseren, og tale optages med din mikrofon. Giv
            adgang når den spørger — optagelsen bliver på din egen maskine.
          </p>
          <button onClick={() => setStage('test')}
            className="w-full py-3.5 rounded-xl bg-[#007aff] text-white text-[15px] font-semibold hover:bg-[#0051d5] transition-colors">
            Start testen
          </button>
        </div></div>
      </div>
    );
  }

  // ---- results -----------------------------------------------------------
  if (stage === 'results' && result) {
    const rows = [
      ['Læsning', result.scores.reading],
      ['Lytning', result.scores.listening],
      ['Grammatik', result.scores.grammar],
      ['Skrivning', result.scores.writing],
      ['Tale', result.scores.speaking],
    ];
    const band = (p) => (p >= 80 ? 'B2' : p >= 62 ? 'B1' : p >= 42 ? 'A2' : 'A1');
    return (
      <div className="min-h-screen bg-[#f2f2f7] py-12"><div className="page"><div className="max-w-[680px] bg-white rounded-2xl border border-[#e5e5ea] p-8">
          <div className="text-[12px] uppercase tracking-wide text-[#8e8e93] mb-1.5">Dit resultat</div>
          <h1 className="text-[27px] font-bold mb-2">Samlet: {result.overallLevel}</h1>
          <p className="text-[15px] text-[#8e8e93] mb-7 leading-relaxed">
            Det samlede tal er et gennemsnit. Det er de fem tal nedenfor appen
            bruger — hver færdighed starter på sit eget niveau.
          </p>
          <div className="mb-7">
            {rows.map(([label, pct]) => (
              <div key={label} className="flex items-center gap-4 py-3 border-t border-[#e5e5ea]">
                <span className="text-[15px] w-[92px]">{label}</span>
                <div className="flex-1 h-2 rounded-full bg-[#f2f2f7] overflow-hidden">
                  <div className="h-full bg-[#007aff]" style={{ width: `${pct}%` }} />
                </div>
                <span className="text-[13px] tabular-nums text-[#8e8e93] w-10 text-right">{pct}%</span>
                <span className="text-[13px] font-semibold w-7 text-right">{band(pct)}</span>
              </div>
            ))}
          </div>
          {result.detail?.writing?.notes?.length > 0 && (
            <div className="mb-7 p-4 rounded-xl bg-[#f2f2f7]">
              <div className="text-[12px] uppercase tracking-wide text-[#8e8e93] mb-2">Om din tekst</div>
              <ul className="text-[13.5px] text-[#3a3f45] leading-relaxed">
                {result.detail.writing.notes.map((n, i) => <li key={i}>· {n}</li>)}
              </ul>
            </div>
          )}
          <button onClick={onComplete}
            className="w-full py-3.5 rounded-xl bg-[#007aff] text-white text-[15px] font-semibold hover:bg-[#0051d5] transition-colors">
            Videre til dagens session
          </button>
        </div></div>
      </div>
    );
  }

  // ---- reading -----------------------------------------------------------
  if (section.key === 'reading') {
    const text = test.reading[itemIndex];
    if (!text) return <Shell><p>Ingen tekster.</p></Shell>;
    const questions = text.questions ?? [];
    const allAnswered = questions.every((_, qi) => answers[`r${itemIndex}-${qi}`] !== undefined);
    return (
      <Shell footer={<NextButton disabled={!allAnswered} onClick={() => nextItem(test.reading.length)} />}>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#121417] text-white">{text.level}</span>
          <span className="text-[11px] uppercase tracking-widest text-[#8e8e93]">{text.words} ord · tekst {itemIndex + 1}/{test.reading.length}</span>
        </div>
        <h2 className="text-[22px] font-bold mb-4">{text.title}</h2>
        <div className="bg-white rounded-2xl border border-[#e5e5ea] p-6 text-[16px] leading-relaxed whitespace-pre-wrap mb-7" style={{ fontFamily: 'Georgia, serif' }}>
          {text.text}
        </div>
        {questions.map((q, qi) => (
          <div key={qi} className="mb-7">
            <div className="text-[12px] text-[#8e8e93] mb-1.5">Spørgsmål {qi + 1} af {questions.length}</div>
            <div className="text-[17px] font-semibold">{q.q ?? q.question}</div>
            <Options options={q.options} value={answers[`r${itemIndex}-${qi}`]} onChange={(v) => recordAnswer(`r${itemIndex}-${qi}`, v)} />
          </div>
        ))}
      </Shell>
    );
  }

  // ---- listening ---------------------------------------------------------
  if (section.key === 'listening') {
    const clip = test.listening[itemIndex];
    if (!clip) return <Shell><p>Ingen lydklip.</p></Shell>;
    const questions = clip.questions ?? [];
    const allAnswered = questions.every((_, qi) => answers[`l${itemIndex}-${qi}`] !== undefined);
    return (
      <Shell footer={<NextButton disabled={!allAnswered} onClick={() => nextItem(test.listening.length)} />}>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#121417] text-white">{clip.level}</span>
          <span className="text-[11px] uppercase tracking-widest text-[#8e8e93]">{clip.type} · klip {itemIndex + 1}/{test.listening.length}</span>
        </div>
        <h2 className="text-[22px] font-bold mb-5">{clip.title}</h2>

        <div className="bg-white rounded-2xl border border-[#e5e5ea] p-6 mb-7">
          <button onClick={() => speak(clip.transcript, clip.id)}
            className="w-full py-4 rounded-xl bg-[#007aff] text-white text-[15px] font-semibold hover:bg-[#0051d5] transition-colors">
            {speaking ? 'Afspiller …' : 'Afspil lyd'}
          </button>
          <p className="text-[13px] text-[#8e8e93] mt-3 text-center">
            Du kan afspille klippet så mange gange du vil.
          </p>
          {/* The transcript stays hidden until the learner asks: the old version
              printed it above the question, which gave the answer away. */}
          <button onClick={() => setRevealed(!revealed)}
            className="w-full mt-3 text-[13px] text-[#8e8e93] hover:text-[#121417] transition-colors">
            {revealed ? 'Skjul teksten' : 'Vis teksten (tæller som sværere)'}
          </button>
          {revealed && (
            <div className="mt-3 p-4 rounded-xl bg-[#f2f2f7] text-[15px] leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>
              {clip.transcript}
            </div>
          )}
        </div>

        {questions.map((q, qi) => (
          <div key={qi} className="mb-7">
            <div className="text-[12px] text-[#8e8e93] mb-1.5">Spørgsmål {qi + 1} af {questions.length}</div>
            <div className="text-[17px] font-semibold">{q.q ?? q.question}</div>
            <Options options={q.options} value={answers[`l${itemIndex}-${qi}`]} onChange={(v) => recordAnswer(`l${itemIndex}-${qi}`, v)} />
          </div>
        ))}
      </Shell>
    );
  }

  // ---- grammar -----------------------------------------------------------
  if (section.key === 'grammar') {
    const ex = test.grammar[itemIndex];
    if (!ex) return <Shell><p>Ingen opgaver.</p></Shell>;
    const chosen = answers[`g${itemIndex}`];
    return (
      <Shell footer={<NextButton disabled={chosen === undefined} onClick={() => nextItem(test.grammar.length)} />}>
        <div className="flex items-center gap-2 mb-5">
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#121417] text-white">{ex.level}</span>
          <span className="text-[11px] uppercase tracking-widest text-[#8e8e93]">
            {ex.category} · opgave {itemIndex + 1}/{test.grammar.length}
          </span>
        </div>
        <div className="bg-white rounded-2xl border border-[#e5e5ea] p-6">
          <div className="text-[19px] font-semibold" style={{ fontFamily: 'Georgia, serif' }}>{ex.question}</div>
          <Options options={ex.options} value={ex.options.indexOf(chosen)} onChange={(i) => recordAnswer(`g${itemIndex}`, ex.options[i])} />
        </div>
      </Shell>
    );
  }

  // ---- writing -----------------------------------------------------------
  if (section.key === 'writing') {
    const task = test.writing;
    const words = written.trim().split(/\s+/).filter(Boolean).length;
    return (
      <Shell footer={<NextButton disabled={words < 5} onClick={() => nextItem(1)} label={words < 5 ? 'Skriv mindst et par sætninger' : 'Næste'} />}>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#121417] text-white">{task.level}</span>
          <span className="text-[11px] uppercase tracking-widest text-[#8e8e93]">{task.minWords}–{task.maxWords} ord</span>
        </div>
        <h2 className="text-[22px] font-bold mb-3">{task.title}</h2>
        <p className="text-[16px] leading-relaxed mb-5" style={{ fontFamily: 'Georgia, serif' }}>{task.prompt}</p>
        <textarea
          id="diagnostic-writing"
          value={written}
          onChange={(e) => setWritten(e.target.value)}
          rows={10}
          placeholder="Skriv dit svar her …"
          className="w-full p-4 rounded-2xl border border-[#e5e5ea] bg-white text-[16px] leading-relaxed outline-none focus:border-[#007aff] transition-colors"
          style={{ fontFamily: 'Georgia, serif' }}
        />
        <div className="flex justify-between text-[13px] text-[#8e8e93] mt-2">
          <span>{words} ord</span>
          <span>{words < task.minWords ? `${task.minWords - words} flere til minimum` : 'Længden er opfyldt'}</span>
        </div>
      </Shell>
    );
  }

  // ---- speaking ----------------------------------------------------------
  const canFinish = speakingRating !== null;
  return (
    <Shell footer={<NextButton disabled={!canFinish} onClick={finishTest} label="Afslut testen" />}>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#121417] text-white">{test.speaking.level}</span>
        <span className="text-[11px] uppercase tracking-widest text-[#8e8e93]">cirka 1 minut</span>
      </div>
      <h2 className="text-[22px] font-bold mb-3">Taleopgave</h2>
      <p className="text-[17px] leading-relaxed mb-6" style={{ fontFamily: 'Georgia, serif' }}>{test.speaking.prompt}</p>

      <div className="bg-white rounded-2xl border border-[#e5e5ea] p-6 mb-7">
        {micError && (
          <div className="mb-4 p-3.5 rounded-xl bg-[#ffeceb] text-[#ff3b30] text-[13.5px]">{micError}</div>
        )}
        {!recording ? (
          <button onClick={startRecording}
            className="w-full py-4 rounded-xl bg-[#ff3b30] text-white text-[15px] font-semibold hover:opacity-90 transition-opacity">
            {audioURL ? 'Optag igen' : 'Start optagelse'}
          </button>
        ) : (
          <button onClick={stopRecording}
            className="w-full py-4 rounded-xl bg-[#121417] text-white text-[15px] font-semibold tabular-nums">
            Stop optagelse · {String(Math.floor(seconds / 60)).padStart(2, '0')}:{String(seconds % 60).padStart(2, '0')}
          </button>
        )}
        {audioURL && !recording && (
          <audio controls src={audioURL} className="w-full mt-4" />
        )}
        <p className="text-[13px] text-[#8e8e93] mt-3">
          Optagelsen bliver på din maskine og sendes ingen steder.
        </p>
      </div>

      <div className="mb-3 text-[15px] font-semibold">Hvordan gik det?</div>
      <p className="text-[13.5px] text-[#8e8e93] mb-4 leading-relaxed">
        Ingen browser kan bedømme en talt besvarelse ærligt, så dette er din egen
        vurdering. Lyt optagelsen igennem først — det er dét der gør vurderingen
        noget værd.
      </p>
      <div className="grid gap-2.5">
        {[
          ['let', 'Det gik let', 'Jeg talte flydende og var ikke i tvivl'],
          ['passende', 'Det gik nogenlunde', 'Jeg kom igennem, men søgte efter ord'],
          ['svaert', 'Det var svært', 'Jeg gik i stå eller skiftede til engelsk'],
        ].map(([key, title, detail]) => (
          <button key={key} onClick={() => setSpeakingRating(key)}
            className={`text-left px-4 py-3.5 rounded-xl border transition-colors ${
              speakingRating === key ? 'border-[#007aff] bg-[#e5f1ff]' : 'border-[#e5e5ea] bg-white hover:border-[#c7c7cc]'
            }`}>
            <div className="text-[15px] font-medium">{title}</div>
            <div className="text-[13px] text-[#8e8e93]">{detail}</div>
          </button>
        ))}
      </div>
    </Shell>
  );
}
