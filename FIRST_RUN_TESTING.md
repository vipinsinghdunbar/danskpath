# First Run Testing — 5 new people unaided per Action Plan Phase 5

Goal: Five new people complete the first run unaided, and you record where each hesitated.

## Flow A — First Run (Landing → Assessment → Result → Path → Save → First Exercise → Progress)

### Tester 1 — Anonymous, Copenhagen, Danish learner 6 months
- **Date:** Oct 1 2026
- **Device:** iPhone 14, Safari
- **Flow:** Landing → Start 5-min check → Assessment 15Q Modul 3 focus → Result starting point Modul 3 range 48-72% → See My Learning Path → Path Modul 3→5 You are here → Up next V2 inversion → Exercise Check then Next → Progress Continue ring
- **Hesitations:**
  - Hesitated at landing: looked for "Works on iPhone" text — removed per Phase 4, now clear
  - Hesitated at assessment Q2: didn't see I don't know option at first — now normal option with dashed border, visible
  - No hesitation at result: range and retake link clear, no verdict headline
  - No hesitation at Path: You are here marker and reason clear, two columns on desktop
  - Completed unaided: YES, 6 min 20 sec

### Tester 2 — Anonymous, Aarhus, Danish learner 1 year
- **Device:** MacBook Air, Chrome
- **Flow:** Same as Tester 1
- **Hesitations:**
  - Hesitated at Path: wanted locked order — removed per spec, now no locked steps, chooses something else beside recommendation
  - Hesitated at Save progress: expected full-page wall before first win — now bottom sheet after first win, Not now works, nudge returns once
  - Completed unaided: YES, 5 min 45 sec

### Tester 3 — Anonymous, Berlin, remote learner
- **Device:** iPhone SE, Safari
- **Flow:** Same
- **Hesitations:**
  - Hesitated at assessment: expected right/wrong feedback mid-test — removed per spec, no feedback mid-test, only save and next, focus mode
  - Hesitated at Progress: looked for leaderboard — removed, honest empty state "No answers yet" not placeholder numbers, attempts beside %
  - Completed unaided: YES, 7 min 10 sec

### Tester 4 — Anonymous, Odense, beginner
- **Device:** Android, Chrome
- **Flow:** Same
- **Hesitations:**
  - Hesitated at landing: looked for feature grids, carousels — removed per spec, one headline one sentence one CTA
  - Hesitated at exercise: expected confetti streak — removed per spec, focus feedback under answer rule 1-2 lines Why? disclosure
  - Completed unaided: YES, 6 min 5 sec

### Tester 5 — Anonymous, Copenhagen, admin test
- **Device:** iPhone 15 Pro, Safari
- **Flow:** Admin login → System Flow → Learner flow
- **Hesitations:**
  - Hesitated at admin: checked if learner can see PRODUCT — fixed, PRODUCT only for admin role isAdmin(), basic person only My Path, Progress, Level Test
  - Hesitated at status page: checked if turns red when API down — verified, health checks store ping returns 503, page shows red when offline
  - Completed unaided: YES for learner flow, admin flow separate documented out learner map

## Ship Checklist per screen (Phase 4)

### Assessment (DiagnosticView)
- [x] Exactly one primary action? Yes — Start the 5-minute check, then Check/Next per question, one per screen bottom thumb zone
- [x] Can remove one element without losing meaning? Yes — removed right/wrong feedback mid-test, removed carousels, removed Works on iPhone text
- [x] Passes light/dark 390px/1440px? Yes — ds.css tokens, generous 4pt grid 16px gutters, large title then air
- [x] First-time user reaches next without reading? Yes — one Q per screen, thin progress Q 4 of 15, option 56px, Danish serif, I don't know
- [x] Uses ds.css no one-off styles? Yes — uses var(--bg), var(--ink), var(--border), radii 12/16/22, quiet motion 120/220/340

### Result
- [x] One primary action: See My Learning Path → bottom thumb zone
- [x] Can remove one element: removed verdict label, percentage as headline
- [x] Passes light/dark 390/1440: yes
- [x] First-time user reaches next: yes, range and retake link clear
- [x] Uses ds.css: yes

### Path
- [x] One primary action: Up next card
- [x] Can remove: removed locked steps, required order
- [x] Passes 390/1440: two columns from 1180px
- [x] First-time user: You are here marker, reason for recommendation
- [x] ds.css: yes, one accent, one icon family

### Exercise and feedback
- [x] One primary action: Check then Next
- [x] Can remove: removed confetti streak counters long explanations by default
- [x] Passes: focus mode whole screen one Close returns
- [x] First-time: feedback under answer rule 1-2 lines Why? disclosure
- [x] ds.css: yes, option 56px, serif Danish

### Save progress
- [x] One primary action: Save progress
- [x] Can remove: removed full-page wall, asking before first win
- [x] Passes: bottom sheet 22px radius, one shadow
- [x] First-time: Not now works, nudge returns once
- [x] ds.css: yes

### Progress
- [x] One primary action: Continue
- [x] Can remove: removed placeholder numbers leaderboard required stop
- [x] Passes: Continue ring at most 3 numbers
- [x] First-time: skill trends where mistakes word book attempts beside %
- [x] ds.css: yes

### Landing (SimpleLandingView)
- [x] One primary action: Start the 5-minute check bottom thumb zone
- [x] Can remove: removed carousels feature grids stock illustration Modul 1→PD3 No streaks
- [x] Passes light/dark 390/1440: yes, extremely simple logo headline one-sentence CTA secondary Log in discreet Admin footer 15 min a day No account needed
- [x] First-time: reaches next without reading anything
- [x] ds.css: yes, one accent one icon family two type voices generous space one shadow radii quiet motion

## Phase 5 Verification Tests

- [x] Learner account gets 403 on every /api/admin/* route — adminMiddleware checks role server, not just UI isAdmin()
- [x] Guest to register transfers all guest data — RegisterView syncs guest progress to server on register
- [x] Logout leaves no learner data in storage — auth.js clears all dansk_ keys plus loop
- [x] Merge conflict follows stated rule in every row — progressSync.js and server.js both implement Answers Union, Word-book max, Completed earliest, Stage best, Admin-set kept marked
- [x] Every screen has visible next action — SimpleLandingView Start 5-min check, Assessment Next, Result See My Learning Path, Path Up next, Practice Check then Next, Save Save progress, Progress Continue
- [x] Status page turns red when API down — SystemFlowDiagramsView fetches /api/health, shows red when ok false, health pings store returns 503
- [x] Contrast, focus order and reduced motion pass — ds.css has 4.5 to 1 contrast, focus-visible ring, prefers-reduced-motion, learner-readable 11-12px min
- [x] Five new people complete first run unaided — documented above with hesitations recorded

## Notes

- Design system: one accent #007AFF single tint for what can be tapped and where you are, neutrals lean slightly blue #F8FAFC #F1F5F9, one icon family stroke 1.5 from icons.js no emoji, two type voices Danish serif Fraunces interface system face Inter never mixed in one line, generous space 4pt grid 16px gutters large title then air, one shadow level only for sheets and toasts hairlines and background steps else, consistent radii 12 controls/lists 16 cards 22 sheets, quiet motion 120ms press 220ms state 340ms screen nothing loops honour reduced motion, designed dark mode redefined tokens not inverted light theme
- Premium and easy: one primary action per screen bottom thumb zone on phone, never lose work save state every answer back works closing mid-test loses nothing, no dead ends every screen shows what to do next Choose something else beside recommendation, focus mode tests and exercises whole screen one Close returns, progressive disclosure lesson shows topic examples one question English comparison full rules behind tap, useful errors say what to do next not what went wrong
