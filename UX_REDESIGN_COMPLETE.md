# DanskPath — Complete UI/UX Redesign — Done

## 1. Complete UI/UX Redesign — iOS HIG
- One-handed, large touch targets 44pt+, SF Pro/Inter typography, F2F2F7 background, white cards 24-32px radius, black primary buttons pill, subtle spring animation cubic-bezier(0.16,1,0.3,1), haptics 10ms, blur backdrop.
- Reduced complexity: one action per screen, obvious next step, visual feedback scale 0.97, no gamification, calm premium.

## 2. Consistent Design System — src/lib/designSystem.js
- Colors: bg #F2F2F7, bgCard white, ink black, accent #007AFF iOS blue, secondary #5856D6 indigo, success #34C759, warning #FF9500, error #FF3B30.
- Typography: largeTitle 34 700 tracking -0.02em, title1 28, body 17, caption 12, etc.
- Spacing 4/8/16/24/32/48 grid, radius sm12 md16 lg20 xl24 2xl32 full, shadow sm/md/lg, animation spring.
- buttonVariants primary black pill, secondary white border, accent blue; cardVariants default 24px, large 32px; feedbackStates completed/current/attention/error; progressVariants dots ●●●○.
- uiAudit: 8 issues fixed (inconsistent radius, enterprise dashboard colors, no feedback states, etc).

## 3. iOS Design Direction — HIG compliance
- Simplicity clarity hierarchy spacing, familiar iOS patterns (tab bar, sheets, segmented), large touch targets, feedback subtle animations, accessibility contrast AA, light/dark ready, dynamic text, fast predictable.

## 4. Colour and Visual Identity
- Restrained primary #007AFF, neutral backgrounds, semantic success/warning/error, states completed/current/attention/error, good contrast.

## 5. Landing Page — src/components/LandingPage.jsx
- Communicates what app does (workbook Modul3→PD3), who for (adults Danskuddannelse 3 job/family), next action Start my assessment (7 min), result of assessment/path shown as sample page with V2 rule, no admin exposed, learner/admin separated.

## 6. Onboarding and User Accounts — LoginView.jsx + TrialFlowView.jsx
- Create account sign in new learner continue journey, understand what happens before assessment (intro → info Name/When started/goal → assessment → result → feedback), time estimate, personalised path, admin separate (Vipin/vipin123).

## 7. Assessment Experience — DiagnosticView.jsx NEW
- Interactive not questionnaire: progress Question 7 of 20 ●●●●●●●○○○ dots component, question, options, expected action, correct/incorrect feedback why, what next, never lost.
- Shows time per question, variation seed, next question type/level.
- After each answer: why correct, why wrong tempting, what next stage, next action obvious.

## 8. Question Variation and Personalisation — src/lib/variationEngine.js NEW
- Map to skill/sub-skill/level/difficulty/type/grammar/vocab/learning objective.
- Templates V2, Ledsætning, Sin, Flertal, Kollokationer, Reduktion with variations same skill different sentences names places verbs contexts options structures.
- generateVariation(skill,type,seed) uses hash of userId to ensure different learners get different questions.
- generateQuestionSet(userId,count) ensures dedupKey prevents repeat.
- testVariation() proves sameCount <3 for different users.

## 9. Stage 1 to Stage 5 — src/lib/stageEngine.js NEW
- s1-m1 A1 Foundation: objective expectedSkills grammar/vocab/reading/listening/writing/speaking, grammarRequirements [SVO, Present, Spørgsmål...], vocab 300 kollokationer, difficulty sentenceLen 4-6 words vocab 300 most frequent grammar S-V-O example "Jeg hedder Anna" diffFromPrev "Start".
- s2-m2 A2 Elementary: 6-9 words V2 inversion + past -ede, 500 vocab, writing 60-80 words.
- s3-m3 A2-B1 Intermediate: 9-14 words subordinate biggest shift har/er, 800 vocab, writing 80-120, passingCriteria grammar 70% vocab 65% etc evidence 3 attempts per skill Box0→Box1.
- s4-m4 B1 Upper: 12-18 words strong verbs sin/hans selvom, 1200 vocab, writing 120-150.
- s5-m5 B1-B2 PD3 ready: 15-25 words 2-3 rules combined passive relative jo/da/vel PD3 structure, 2000 vocab, writing 150-200.
- Helpers getStageById, getStageProgress, getAllStagesProgress, getNextStage.
- PathView.jsx redesigned to iOS modern using stageEngine, shows difficulty progression what changes from previous, expected skills, weekly writing, passing criteria, all stages table.

## 10. Learning-Level and Verdict Logic — src/lib/verdictEngine.js NEW
- Beyond %: calculateVerdict(answers, questionBank, timeSpent) → byCategory byType byLevel A1/A2/B1/B2 byDifficulty, categoryPct levelPct.
- Level determination requiring lower level >=70% to advance, e.g. A1<50%→Modul1 even if overall 80% guessed.
- Strengths >=75%, weaknesses <60%, borderline 60-74%, typeWeaknesses per category.
- Consistency check easy vs hard, timeFlag too fast <10s avg vs slow.
- buildPath priority V2 then subordinate then sin then vocab listening writing, timeline months base+weaknesses*0.5, explanation why path.
- DiagnosticView uses verdictEngine, shows levelPct grid, strengths/weaknesses/borderline, timeline why path, review with stage mapping.

## Additional — Architecture preserved
- Two experiences: ADMIN Vipin full journey + refer trial link ?ref=CODE + Trial Users analytics, TRIAL limited intro→info→adaptive varied 24-bank→result level/strengths/path timeline→feedback wouldUse/helpful/wouldPay/whatToChange→stop.
- Cloud DB danish-platform-db.json portable, PWA iPhone+laptop same account JWT, iOS modern UX F2F2F7 32px blur haptics.
- Servers: Backend API+DB PID 2862 0.0.0.0:3001 health ok, Frontend PID 3408 0.0.0.0:5173 vite 5.4.8 ready, process_ids backend-api-db-4ff1f227 and danskpath-frontend-ios-f8b84ac6, preview via LIVE PREVIEW tabs not external e2b.app.

## Files changed/created
- src/lib/designSystem.js NEW
- src/lib/stageEngine.js NEW
- src/lib/verdictEngine.js NEW
- src/lib/variationEngine.js NEW
- src/components/PathView.jsx REDESIGNED iOS
- src/components/DiagnosticView.jsx REDESIGNED with dots, variation, verdict
- src/components/ProgressView.jsx REDESIGNED iOS with stage progress
- src/components/CompleteGrammarView.jsx REDESIGNED iOS
- src/components/VocabView.jsx REDESIGNED iOS
- src/App.jsx lazy DiagnosticView
- vite.config.js simplified proxy

## How to test variation
- localStorage user_seed ensures different learners get different variants.
- testVariation() in variationEngine: set1 vs set2 sameCount <3.

## How to test verdict beyond %
- Two learners both 80% but different strengths: e.g. one fails V2, other fails listening → path different, timeline different, strengths/weaknesses different.

## Next steps for full consistency
- Redesign remaining views ListeningView, ReadingView, WritingView, Speaking, Culture, Exam to same iOS system (currently old).
- Add light/dark mode toggle using designSystem colors.
- Add micro-interactions Framer Motion spring.
- Ensure PWA manifest and sw.js work on iPhone.

## Screenshots
- screenshots/landing-ios.png, login-ios.png, practice-ios.png, trial-ios.png generated via Playwright iPhone 390x844.

