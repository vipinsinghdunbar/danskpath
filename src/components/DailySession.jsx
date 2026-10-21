import { useState, useEffect, lazy, Suspense, useRef } from 'react';
import {
  buildTodaySession,
  startSession,
  recordStep,
  getSessionSummary,
  getStreak,
  getAllSkillDifficulties,
  difficultyToCEFR,
  regenerateToday,
  labelFor,
} from '../lib/sessionEngine';

/**
 * DAILY SESSION — the one screen that runs today's practice.
 *
 * The app already contained working views for every skill (listening, reading,
 * writing, speaking, pronunciation, conversation) but none of them were routed
 * from App.jsx, so none were reachable. This component mounts them in the order
 * the session engine decides and records the outcome of each one, which is what
 * turns six separate tools into a sequenced daily session.
 */

const ListeningView = lazy(() => import('./ListeningView'));
const ReadingView = lazy(() => import('./ReadingView'));
const WritingView = lazy(() => import('./WritingView'));
const SpeakingView = lazy(() => import('./SpeakingView'));
const PronunciationView = lazy(() => import('./PronunciationView'));
const ConversationView = lazy(() => import('./ConversationView'));
const VocabView = lazy(() => import('./VocabView'));
const PracticeSession = lazy(() => import('./PracticeSession'));

const VIEWS = {
  listening: ListeningView,
  reading: ReadingView,
  writing: WritingView,
  speaking: SpeakingView,
  pronunciation: PronunciationView,
  conversation: ConversationView,
  vocab: VocabView,
  grammar: PracticeSession,
};

// Self-reported difficulty maps onto the same 0-1 scale the engine scores on.
// Used for the skill views, which have no auto-score: a written paragraph or a
// recorded answer cannot be marked by the app, but the learner's own read on
// whether it was easy or hard is a real signal, so it drives the ladder.
const SELF_REPORT = [
  { key: 'easy', label: 'For let', detail: 'Jeg var aldrig i tvivl', correct: 10, total: 10 },
  { key: 'right', label: 'Passende', detail: 'Udfordrende, men jeg klarede det', correct: 8, total: 10 },
  { key: 'hard', label: 'For svært', detail: 'Jeg gik i stå', correct: 4, total: 10 },
];

function Spinner() {
  return (
    <div className="grid place-items-center py-16">
      <div className="w-8 h-8 rounded-full border-2 border-black/10 border-t-black animate-spin" />
    </div>
  );
}

export default function DailySession({ onBack }) {
  const [session, setSession] = useState(null);
  const [activeStepId, setActiveStepId] = useState(null);
  const [difficulties, setDifficulties] = useState({});
  const [streak, setStreak] = useState(0);
  const stepStartedAt = useRef(null);

  useEffect(() => {
    let cancelled = false;
    buildTodaySession().then((built) => {
      if (cancelled) return;
      setSession(built);
      setDifficulties(getAllSkillDifficulties());
      setStreak(getStreak());
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const refresh = async () => {
    const built = await buildTodaySession();
    setSession(built);
    setDifficulties(getAllSkillDifficulties());
    setStreak(getStreak());
  };

  const openStep = (stepId) => {
    startSession();
    stepStartedAt.current = Date.now();
    setActiveStepId(stepId);
  };

  const finishStep = (stepId, result) => {
    const elapsed = stepStartedAt.current ? Date.now() - stepStartedAt.current : null;
    const payload = { ...result };

    // Derive a per-item pace from the real time on task when we know the item
    // count, so the pace component of the score reflects this sitting rather
    // than a default guess.
    if (elapsed && result?.total) {
      payload.avgResponseMs = Math.round(elapsed / result.total);
    }

    recordStep(stepId, payload);
    setActiveStepId(null);
    stepStartedAt.current = null;
    refresh();
  };

  if (!session) return <Spinner />;

  const activeStep = session.steps.find((s) => s.id === activeStepId);
  const doneCount = session.steps.filter((s) => s.done).length;
  const allDone = doneCount === session.steps.length;

  // ---- A step is open: mount its view, with a completion bar underneath ----
  if (activeStep) {
    const View = VIEWS[activeStep.kind];
    const isGrammar = activeStep.kind === 'grammar';

    return (
      <div className="min-h-screen bg-[#f2f2f7] flex flex-col">
        <header className="border-b border-[#e5e5ea] bg-white/80 backdrop-blur sticky top-0 z-20">
          <div className="max-w-5xl mx-auto px-5 py-3 flex items-center gap-4">
            <button
              onClick={() => setActiveStepId(null)}
              className="text-[13px] text-[#8e8e93] hover:text-[#121417] transition-colors"
            >
              ← Dagens plan
            </button>
            <div className="flex-1 min-w-0">
              <div className="font-display font-bold text-[15px] truncate">
                {activeStep.label}
                {activeStep.itemTitle ? ` · ${activeStep.itemTitle}` : ''}
              </div>
              <div className="text-[11px] text-[#8e8e93]">
                Niveau {activeStep.cefr} · ca. {activeStep.estimatedMinutes} min
              </div>
            </div>
            <div className="text-[11px] text-[#8e8e93] tabular-nums">
              Trin {session.steps.indexOf(activeStep) + 1}/{session.steps.length}
            </div>
          </div>
        </header>

        {/* Padded to clear the fixed completion bar below. */}
        <div className="flex-1 pb-[150px]">
          <Suspense fallback={<Spinner />}>
            {View ? (
              <View
                topic={activeStep.topic}
                difficulty={activeStep.difficulty}
                level={activeStep.cefr}
                preselectId={activeStep.itemId}
                preselectIds={activeStep.itemIds}
                sessionMode
                autoStart
                minutes={activeStep.estimatedMinutes}
                onComplete={(res) => finishStep(activeStep.id, res ?? {})}
              />
            ) : (
              <div className="max-w-xl mx-auto p-8 text-[14px] text-[#8e8e93]">
                Denne øvelsestype er endnu ikke tilgængelig.
              </div>
            )}
          </Suspense>
        </div>

        {/* Grammar reports its own accuracy; the skill views cannot be
            auto-marked, so they close on a self-report instead. */}
        {/* Fixed rather than sticky: this sits inside the app shell's own
            scroll container, where `sticky bottom-0` did not pin and the
            control ended up below the fold — so the way to finish a step was
            invisible until you scrolled past the whole exercise. */}
        <footer className="border-t border-[#e5e5ea] bg-white fixed bottom-0 left-0 right-0 z-30">
          <div className="max-w-5xl mx-auto px-5 py-4">
            {isGrammar ? (
              <button
                onClick={() => finishStep(activeStep.id, {})}
                className="w-full py-3 rounded-xl bg-[#121417] text-white text-[14px] font-medium hover:bg-black transition-colors"
              >
                Marker som færdig
              </button>
            ) : (
              <>
                <div className="text-[12px] text-[#8e8e93] mb-2.5">
                  Hvordan føltes det? Dit svar justerer niveauet i morgen.
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {SELF_REPORT.map((option) => (
                    <button
                      key={option.key}
                      onClick={() =>
                        finishStep(activeStep.id, {
                          correct: option.correct,
                          total: option.total,
                          selfReport: option.key,
                        })
                      }
                      className="px-3 py-2.5 rounded-xl border border-[#e5e5ea] bg-[#ffffff] hover:border-[#121417] hover:bg-white transition-colors text-left"
                    >
                      <div className="text-[13px] font-medium">{option.label}</div>
                      <div className="text-[11px] text-[#8e8e93] leading-tight mt-0.5">
                        {option.detail}
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </footer>
      </div>
    );
  }

  // ---- Plan overview ----
  return (
    <div className="min-h-screen bg-[#f2f2f7]">
      <header className="border-b border-[#e5e5ea] bg-white/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-5 py-3 flex items-center gap-4">
          {onBack && (
            <button
              onClick={onBack}
              className="text-[13px] text-[#8e8e93] hover:text-[#121417] transition-colors"
            >
              ← Tilbage
            </button>
          )}
          <div className="flex-1" />
          {streak > 0 && (
            <div className="text-[12px] text-[#8e8e93] tabular-nums">
              {streak} dag{streak === 1 ? '' : 'e'} i træk
            </div>
          )}
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-5 py-8">
        <div className="mb-8">
          <div className="text-[12px] uppercase tracking-wide text-[#8e8e93] mb-1.5">
            {session.moduleTitle}
            {session.moduleCefr ? ` · ${session.moduleCefr}` : ''}
          </div>
          <h1 className="font-display font-bold text-[30px] leading-tight mb-2">
            {allDone ? 'Dagens session er klaret' : 'Dagens session'}
          </h1>
          <p className="text-[14px] text-[#8e8e93] leading-relaxed">
            {allDone
              ? 'Alle trin er gennemført. Niveauerne er justeret til i morgen.'
              : `${session.steps.length} trin, ca. ${session.estimatedMinutes} minutter. Rækkefølgen er valgt ud fra hvor du står i ${session.moduleTitle}.`}
          </p>
        </div>

        <div className="mb-6 flex items-center gap-3">
          <div className="flex-1 h-1.5 rounded-full bg-[#e5e5ea] overflow-hidden">
            <div
              className="h-full bg-[#121417] transition-all duration-500"
              style={{ width: `${(doneCount / session.steps.length) * 100}%` }}
            />
          </div>
          <div className="text-[12px] text-[#8e8e93] tabular-nums">
            {doneCount}/{session.steps.length}
          </div>
        </div>

        <ol className="space-y-2.5">
          {session.steps.map((step, index) => {
            const isNext = !step.done && session.steps.slice(0, index).every((s) => s.done);
            return (
              <li key={step.id}>
                <button
                  onClick={() => openStep(step.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-colors ${
                    step.done
                      ? 'border-[#e5e5ea] bg-white/50'
                      : isNext
                        ? 'border-[#121417] bg-white'
                        : 'border-[#e5e5ea] bg-white hover:border-[#c7c7cc]'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`mt-0.5 w-6 h-6 shrink-0 rounded-full grid place-items-center text-[11px] font-medium tabular-nums ${
                        step.done
                          ? 'bg-[#121417] text-white'
                          : 'border border-[#c7c7cc] text-[#8e8e93]'
                      }`}
                    >
                      {step.done ? '✓' : index + 1}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span
                          className={`font-display font-bold text-[16px] ${
                            step.done ? 'text-[#8e8e93]' : ''
                          }`}
                        >
                          {step.label}
                        </span>
                        <span className="text-[11px] px-1.5 py-0.5 rounded bg-[#f2f2f7] text-[#8e8e93]">
                          {step.cefr}
                        </span>
                        <span className="text-[11px] text-[#8e8e93]">
                          ca. {step.estimatedMinutes} min
                        </span>
                      </div>

                      {step.itemTitle && (
                        <p className="text-[12.5px] mt-1 truncate">{step.itemTitle}</p>
                      )}

                      <p className="text-[12.5px] text-[#8e8e93] leading-snug mt-1">
                        {step.reason}
                      </p>

                      {step.done && typeof step.accuracy === 'number' && (
                        <p className="text-[11.5px] text-[#8e8e93] mt-1.5 tabular-nums">
                          {step.accuracy}%
                          {typeof step.difficultyAfter === 'number' &&
                            step.difficultyAfter !== step.difficulty && (
                              <>
                                {' · niveau '}
                                {step.difficultyAfter > step.difficulty ? 'op' : 'ned'} til{' '}
                                {difficultyToCEFR(step.difficultyAfter)}
                              </>
                            )}
                        </p>
                      )}
                    </div>

                    {!step.done && (
                      <span className="text-[13px] text-[#8e8e93] shrink-0 mt-0.5">
                        {isNext ? 'Start' : 'Åbn'}
                      </span>
                    )}
                  </div>
                </button>
              </li>
            );
          })}
        </ol>

        <div className="mt-8 pt-6 border-t border-[#e5e5ea]">
          <div className="text-[12px] uppercase tracking-wide text-[#8e8e93] mb-3">
            Dine niveauer
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {Object.entries(difficulties).map(([skill, value]) => (
              <div key={skill} className="text-[12.5px]">
                <span className="text-[#8e8e93]">{labelFor(skill)}</span>{' '}
                <span className="font-medium tabular-nums">{difficultyToCEFR(value)}</span>
              </div>
            ))}
          </div>

          <button
            onClick={async () => {
              await regenerateToday();
              refresh();
            }}
            className="mt-6 text-[12.5px] text-[#8e8e93] underline underline-offset-2 hover:text-[#121417] transition-colors"
          >
            Giv mig en anden session
          </button>
        </div>
      </main>
    </div>
  );
}
