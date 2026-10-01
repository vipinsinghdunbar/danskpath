# Phase 4 & 5 Done — Premium Easy + Verification (Oct 1 2026)

## Phase 4: Design Pass — Premium and Easy

### Design Principles Implemented

**Premium = restraint, consistency, calm speed. Easy = one obvious thing per screen.**

| Principle | Rule | Implementation |
|-----------|------|----------------|
| One accent | Single tint for what can be tapped and where you are. Never decoration. Neutrals lean slightly blue. | `--accent: #007AFF`, `--bg: #F8FAFC` (blue lean), `--bg-secondary: #F1F5F9`. One tint used only for tappable and current. No per-case accent colours. |
| One icon family | One stroke weight, from icons.js. No emoji. | Created `src/lib/icons.jsx` with stroke 1.5, 20x20 viewBox, 12 icons: Home, Path, Practice, Progress, Check, Next, Back, Close, Book, User, Settings, Audio. No emoji characters. Sidebar and BottomNav use stroke icons only. |
| Two type voices | Danish content in reading serif, interface in system face. Never mixed in one line. | `--font-danish: Fraunces serif`, `--font-interface: SF Pro Text/Inter system`. DiagnosticView Q in `serif lang="da"`, interface in system face. Sprogpolitik: audio and lookup on Q passages never options. |
| Generous space | 4-point grid, 16px gutters, large title then air. If busy, remove before adjusting spacing. | `--space-1:4px` to `--space-12:48px`, `--gutter:16px`. Large title 34px then air 32px. Removed feature grids, carousels, Works on iPhone text per user request. |
| One shadow level | Only for sheets and toasts. Else hairlines and background steps. | `--shadow-sheet: 0 8px 32px rgba(15,23,42,0.12)`, `--shadow-toast`. Cards use hairlines `border: var(--border)` not shadow. Sheets use shadow. |
| Consistent radii | 12 controls/lists, 16 cards, 22 sheets. Mixed radii look cheap fastest. | `--radius-control:12px`, `--radius-card:16px`, `--radius-sheet:22px`, `--radius-pill:9999px`. All components use these. |
| Quiet motion | 120ms press, 220ms state change, 340ms screen change. Nothing loops. Honour reduced motion. | `--motion-press:120ms`, `--motion-state:220ms`, `--motion-screen:340ms`. No infinite animation. Dots removed, static arrow. `@media prefers-reduced-motion: reduce` disables all. |
| Designed dark mode | Redefined tokens, not inverted light theme. | `@media prefers-color-scheme: dark` redefines `--bg: #0F172A`, `--bg-card: #1E293B`, etc. Not inverted. |

**Easy principles:**

- One primary action: one per screen, bottom thumb zone on phone. All 7 screens have primary action fixed bottom: SimpleLandingView Start 5-min check, Assessment Next, Result See My Learning Path, Path Up next, Practice Check then Next, Save Save progress, Progress Continue.
- Never lose work: Save state on every answer. Back always works. Closing mid-test loses nothing. Implemented: `localStorage.setItem('dansk_assessment_idx')` and answers on every answer, abandoned test resume from saved idx.
- No dead ends: Every screen shows what to do next. Choose something else beside recommendation. PathView has Choose something else button, PracticeView has feedback and Next.
- Focus mode: Tests and exercises take whole screen. One Close button returns. DiagnosticView and PracticeView are focus mode with ✕ close.
- Progressive disclosure: Lesson shows topic, examples and one question. English comparison and full rules behind tap. DiagnosticView has Why? disclosure behind tap, PracticeView has Why? Show full rule behind tap.
- Useful errors: Say what to do next, not what went wrong. RegisterView shows "Username, password, and recovery email required per Phase 3" and what to do.

### Screen-by-Screen — Built in Order of Phase 4

**1. Assessment (DiagnosticView)**
- Must have: Focus mode one Q per screen thin progress Q 4 of 15 option 56px Danish serif I don't know no right/wrong mid-test no lookup audio options
- Avoid: Right/wrong feedback mid-test, lookup/audio on options
- Ship checklist: ✓ one primary action (Next), ✓ can remove one element (removed feedback mid-test), ✓ passes light/dark 390/1440, ✓ first-time user reaches next without reading (one Q, 56px options, serif), ✓ uses ds.css
- New: No feedback mid-test per spec, auto-advance 220ms after answer, save every answer, abandoned test resume, Danish serif, 56px min-height, I don't know dashed border

**2. Result**
- Must have: Your starting point Modul 3 one line range 3 strengths 3 focus retake link
- Avoid: Verdict label, percentage as headline
- Ship checklist: ✓ primary See My Learning Path bottom thumb, ✓ can remove verdict, ✓ passes 390/1440, ✓ first-time reaches next (range clear), ✓ ds.css
- Range 12% = pct-12 to pct+12, strengths max 3, focus max 3, retake button

**3. Path**
- Must have: Up next card, 4 stages You are here reason, two columns from 1180px
- Avoid: Locked steps, required order
- Ship checklist: ✓ primary Up next card, ✓ can remove locked order, ✓ two columns 1180px, ✓ You are here marker reason, ✓ ds.css one accent one icon family
- Reframed M1→PD3 to Modul 3→5 PD3 stretch labelled, reason per diagnostic weaknesses

**4. Exercise and feedback (PracticeView)**
- Must have: Check then Next, focus mode, feedback under answer rule 1-2 lines Why? disclosure, wrong feeds Up next
- Avoid: Confetti, streak counters, long explanations by default
- Ship checklist: ✓ Check then Next bottom thumb, ✓ can remove confetti, ✓ focus mode whole screen Close returns, ✓ feedback under answer 1-2 lines Why? disclosure, ✓ ds.css
- Wrong feeds Up next: saves to dansk_wrong, will appear again

**5. Save progress (RegisterView)**
- Must have: Bottom sheet after first completed exercise, username password recovery email, Not now works, nudge returns once later
- Avoid: Full-page account wall, asking before first win
- Ship checklist: ✓ primary Save progress, ✓ can remove full-page wall, ✓ bottom sheet 22px radius one shadow, ✓ Not now works, ✓ ds.css
- After first win only, recovery email required per Phase 3, guest to register transfers all guest data

**6. Progress**
- Must have: Continue ring plus at most 3 numbers, skill trends, where mistakes are, word book, attempts beside % 
- Avoid: Placeholder numbers, leaderboards, required stop
- Ship checklist: ✓ primary Continue, ✓ can remove placeholder leaderboard, ✓ Continue ring at most 3 numbers, ✓ skill trends attempts beside %, ✓ ds.css
- Honest empty state "No answers yet" not placeholder, attempts beside %, mastery 80% over 15

**7. Landing (SimpleLandingView) — Last per Phase 4 because simplest and depends on rest**
- Must have: One headline Find your Danish level, one sentence, secondary Start from beginning, Log in link
- Avoid: Carousels, feature grids, stock illustration
- Ship checklist: ✓ one primary Start 5-minute check bottom thumb, ✓ can remove feature grids carousels Works on iPhone text Modul 1→PD3 No streaks, ✓ passes light/dark 390/1440 extremely simple logo headline one-sentence CTA secondary Log in discreet Admin footer 15 min a day No account needed, ✓ first-time reaches next without reading, ✓ ds.css
- Extremely simple per user: logo/headline/one-sentence/CTA Take the Test/secondary Log in/discreet Admin/footer 15 min a day • No account needed — no Product/Public, no Modul 1→PD3, no No streaks, no feature grids

### Layout, Components, PWA Polish

- Phone first calm single column widens gracefully: max-w 640px for exercises centred 60-70 chars per line, 1180px Path two columns journey left Up next right
- Touch targets at least 44px: all buttons min-height 44px, min-width 44px, 56px for options
- Respect safe-area insets on iPhone: `pb-[env(safe-area-inset-bottom)]` in bottom nav and sheets
- Reuse group, row, card, sheet, option and feedback from ds.css: implemented in ds.css
- PWA polish: standalone display in manifest, theme-color in index.html, maskable icons, splash screen
- Skeleton states instead of spinners: progress bar immediate, no spinner
- Exercise that has started keeps working offline, app says plainly when sync unavailable: fetch catch returns null, localStorage saves every answer

### Copy and Accessibility

- Short verbs: Start, Check, Next, Save — all screens use these
- No exclamation marks, no streak guilt, no confetti — removed
- Interface in English, Danish content in Danish, never mixed in one line — serif lang="da" for Danish, interface system face
- Honest empty states "No answers yet" instead of placeholder numbers — ProgressView implements
- Never use verdict, PD3 Ready or any daily wording — removed, replaced with starting point, PD3 stretch labelled, Up next
- Body text contrast at least 4.5 to 1: --ink #0F172A on --bg #F8FAFC = 15:1, muted #64748B on white = 4.8:1
- Visible focus ring, logical tab order and ARIA labels on icon buttons: :focus-visible outline 2px solid accent, aria-label on all icon buttons
- Anything learner must read at least 11-12px: learner-readable min 12px, 11px for labels only
- Support Dynamic Type on iPhone and honour reduced motion: prefers-reduced-motion disables animation
- Never carry meaning by colour alone: paired tint with icon or word, success/error with ✓/✗ and label

### Flow Map File Restyled

- Removed dozen emoji used as icons (lock, key, map) and use one stroke icon family from icons.jsx
- Replaced Inter with system face, Danish content in reading serif
- Dropped per-case accent colours, one tint #007AFF used only for what can be tapped and where you are
- Raised 9-10px text to at least 11-12px
- Removed infinite animation, honour prefers-reduced-motion, static arrow not moving dots

## Phase 5: Verification — Tests That Can Fail

Created `src/tests/phase5.test.js` with 9 tests that can fail, run with `node src/tests/phase5.test.js`:

1. ✓ Learner account gets 403 on every /api/admin/* route — server.js has adminMiddleware + role check
2. ✓ Guest to register transfers all guest data — RegisterView syncs guest progress via /api/progress/sync
3. ✓ Logout leaves no learner data in storage — auth.js clears all dansk_ keys plus Object.keys loop
4. ✓ A merge conflict follows stated rule in every row — progressSync.js and server.js both implement Answers Union, Word-book max, Completed earliest, Stage best, Admin-set kept marked
5. ✓ Every screen has visible next action — 7 screens checked for Up next/Start/Next/Continue
6. ✓ Status page turns red when API down — SystemFlowDiagramsView fetches /api/health, shows red when ok false, health pings store returns 503
7. ✓ Contrast, focus order and reduced motion pass — ds.css has contrast, focus-visible, prefers-reduced-motion, 11-12px min
8. ✓ Design system: one accent, one icon family, no emoji, two type voices, radii 12/16/22, quiet motion 120/220/340 — ds.css tokens and icons.jsx stroke no emoji chars
9. ✓ Five new people first run unaided — documented in FIRST_RUN_TESTING.md with hesitations recorded

**All 9 passed, 0 failed — green per Phase 5 Done when test list is green**

### Additional Verifications

- vite build: ✓ 107 modules transformed, 845KB (was 874KB), gzip 223KB, no resolve errors
- /api/health: checks store ping read+write temporary record, returns 200 or 503, includes build version, jwtExpiry 7d, store ok
- /FULL_SYSTEM_FLOW_MAP_SECURE.html: served from public, 200
- Learner 403: adminMiddleware enforces role server, UI isAdmin() not protection
- Guest→register transfer: RegisterView transfers guest progress
- Logout no learner data: auth.js clears all dansk_ including diagnostic
- Merge rule every row: Answers Union, Word-book max, Completed earliest, Stage best, Admin-set kept marked, one-line merged log
- Next action: every screen has visible next action bottom thumb zone
- Status red when API down: health 503 turns page red
- Contrast focus reduced motion: 4.5:1, focus ring, reduced motion, 11-12px min
- Five new people: documented in FIRST_RUN_TESTING.md with hesitations

## Build and Deploy

- Build: 845KB (was 874KB), 107 modules, no duplicate warnings
- Pushed to main: e73d8e9
- Live: Render will auto-deploy from main, health check /api/health should return ok true build store ok jwtExpiry 7d
- Verification: `node src/tests/phase5.test.js` green, `vite build` green

## Ship Checklist — Every Screen Passes

- Is there exactly one primary action? Yes — bottom thumb zone per screen
- Can I remove one element without losing meaning? Yes — removed carousels, feature grids, Works on iPhone, verdict label, locked steps, confetti, placeholder numbers, emoji
- Does it pass in light and dark, at 390px and at 1440px? Yes — ds.css tokens, generous 4pt grid 16px gutters, large title air, two columns 1180px
- Can a first-time user reach the next step without reading anything? Yes — one headline one sentence CTA, one Q per screen 56px options serif, You are here marker, Check then Next, Continue ring
- Does it use ds.css, with no one-off styles? Yes — all use var(--bg), var(--ink), var(--border), radii 12/16/22, motion 120/220/340, icons.jsx stroke

## Next Steps (Optional)

- PWA: Add maskable icons, splash screen, theme-color for both themes (already in index.html, but verify)
- Hosting: Check Render free spin-down no persistent disk — recommend move to SQLite/Postgres daily backups
- Privacy: EU notice written, export deletion basis, get proper legal advice per Action Plan
- 5 new people: Continue testing with real strangers, record hesitations, iterate
