# DanskPath — Modul 1 → PD3 / A1 to B2 — Full Danish Education

Modern Danish learning platform for adults on Danskuddannelse 1-3. From alphabet æøå to PD3 debate with jo/da/vel. Workbook, not a game. No streaks.

**Live:** https://danskpath.onrender.com — Build PASS 897KB gzip 233KB — `/api/health` ok true users 1 env production secure true

## ✅ Personal MVP — Usable Today on Phone

**Full PRD Definition of Done 26-step MVP implemented:**

Product Overview 7 steps: Discover level → Understand strengths → Personalized path → What to learn next → Complete exercises → Track progress → Continue without repeat.

Primary principle guest-first journey: **Open → Understand → Assessment → Results → Strengths/Weaknesses → Path → Preview → Start Learning → Create Account → Transfer → Dashboard → Exercise → Progress → Next** — no dead ends, clear next action every screen.

### Core Flow Per Spec (No Account Before Value)

```
LANDING (logo, headline Find your Danish level, one-sentence, CTA Take the Test, secondary Already have account? Log in, discreet Admin)
  → TAKE TEST → INTRO (what measures, duration 7min, what receives)
  → ASSESSMENT (one question at a time Question X of Y + progress bar, randomized answers no learnable pattern)
  → RESULTS (level + section scores + strengths separately from focus areas, avoid negative language)
  → STRENGTHS (timeline object crash fixed)
  → PATH (Din læringsvej M1→PD3 Apple premium timeline with Fortsæt her + Markér færdig ✓)
  → PREVIEW → START LEARNING → CREATE ACCOUNT (username/password/confirm only, guestData transfer atomic)
  → SAVE JOURNEY (assessment answers/score/overall level/section levels/strengths/weaknesses/recommended path/current phase/initial progress transferred)
  → DASHBOARD → CURRENT PHASE → TODAY'S EXERCISE → COMPLETE → PROGRESS → NEXT
```

**Persistence:** Important learner data persists after close/refresh/logout/return, saved journey available after login.

**Success criteria met:**
- Shared link → assessment → results → path → account → first exercise → progress without confusion ✓
- Returning Login → current journey → exercise → complete → progress without repeat ✓

**Reset Progress for Testing:** ProgressView + RoadmapView have red `Reset progress` button that clears `localStorage` (`dansk_progress`, `path`, `scores`, `srs`, `seen`, `level`, `diagnostic`, `verdict`, `user_seed`, `welcomed`, `token`, `user`) and returns to `/?page=simple-landing` — use for testing 26 tests.

### How to Use Today on Phone (iPhone-first PWA)

1. Open https://danskpath.onrender.com/?page=simple-landing → Add to Home Screen = PWA
2. Take the Test → Instructions 5 bullets + what happens after → Start Test → 15Q randomized shuffleAnswers Fisher-Yates
3. Results Dit niveau beyond % strengths weaknesses timeline → See My Learning Path → Din læringsvej M1→PD3 vertical timeline
4. Fortsæt her — grammarDone/grammarRequirements + Markér færdig ✓ sets stage_mX_cleared true reload
5. Practice Today → What should you practice now? → Grammar infinite 761+5100 variants, Vocab SRS Box 0→5 200→1354, Listening A2 B1 B2 no transcript first, Reading 40 texts gapped cloze, Writing weekly 60d no repeat, Exam PD3 6 parts
6. Roadmap Your Learning Roadmap M1→PD3 current level goals skills progress next recommended Start now →
7. Progress Where you are honest numbers + Weekly report auto from your data + Reset progress for testing
8. Register Start Learning Create Account with guest transfer atomic + offline fallback local_token

**Apple Premium HIG:** SF Pro, ultra-thin material blur, vibrancy, large titles 40px Outfit, grouped inset, spring animations, haptic vibrate 20, premium cards 32px, refined spacing, safe-area insets, 390px max-w, 48-56px buttons, one clear primary action per screen.

## 🌟 Three Experiences, One Product (Updated Per Full Spec)

```
                    DANISH LEARNING PRODUCT
                             │
            ┌────────────────┼────────────────┐
            │                │                │
         WEBSITE          ASSESSMENT       iPHONE APP
            │                │                │
       Simple Landing     Test Danish       Full learning
       Find your level    7-min 15Q         M1→PD3 today
            │                │                │
            └───────────────┼────────────────┘
                            │
                    SHARED ACCOUNT /
                    LEARNER SYSTEM + GUEST TRANSFER
```

### 1. 🌐 Public Website — Simple Landing Per Spec

- **Entry:** `/?page=simple-landing` or `/` (default per spec)
- **Content:** Logo D DanskPath + discreet Admin 11px #8E8E93 top-right, headline Find your Danish level 40px Outfit, one-sentence Take a short assessment and get a learning path built around your needs, CTA Take the Test black pill 17px shadow, secondary Already have account? Log in / Continue learning if hasAssessment, How it works 3 bullets, footer Modul 1→PD3
- **No:** Long marketing, feature grids, competing CTAs
- **File:** `src/components/SimpleLandingView.jsx` — 480px max-w safe-area

### 2. 🔗 Shareable Assessment + QR — Guest-First No Account Before Value

- **Entry:** `/?page=assessment` → Intro → `/?page=diagnostic` 15Q
- **Shareable URLs:** See QR Codes section below
- **QR Code:** Scan to test Danish level, independent session per learner trialId, no admin exposed
- **Features:** 7-min adaptive test, 15 Q, M1→M5, 5,100+ variants, shuffleAnswers Fisher-Yates randomized no learnable pattern, InstructionsView 5 bullets + what happens after, one question at a time Question X of Y + progress bar
- **Results:** Immediately useful level + section scores + strengths separately from focus areas, avoid negative discouraging language, See My Learning Path primary, Go to practice secondary, Start Learning → Create Account blue, No account required text
- **Files:** `src/components/AssessmentLandingView.jsx`, `DiagnosticView.jsx`, `InstructionsView.jsx`, `lib/shuffleAnswers.js`

### 3. 📱 Full iPhone App (PWA) — Personal MVP Today

- **Entry:** `/?page=practice` or Add to Home Screen
- **Complete M1→PD3:** alphabet SVO 30-50 → V2 60-80 → subordinate 80-120 → sin/hans 120-150 → PD3 debate 150-200
- **Grammar infinite engine:** 17 topics 761 base + 5100 variants, Explanation before drill, English first, Why wrong is tempting, Variation same rule different sentences seed ensures no memorize
- **Vocab SRS:** Box 0→5 200→1354 no repeat 30d, hold et møde etc.
- **Listening:** A2 B1 B2 DSB/DR no transcript first, attempts acc
- **Reading:** 40 texts gapped cloze
- **Writing:** weekly checklist words week no repeat 60d
- **Culture:** 8 done
- **Exam:** PD3 6 parts
- **StageEngine:** getStageProgress checks dansk_progress/path/scores/srs overall avg manuallyCleared cleared lenient 50%/60% markStageCleared resetProgress
- **PWA:** app icon, manifest, sw.js, iOS install banner, offline, safe-area
- **Files:** `src/components/PracticeView.jsx`, `PathView.jsx`, `RoadmapView.jsx`, `ProgressView.jsx`, `CompleteGrammarView.jsx`, `lib/stageEngine.js`

## 🔗 QR Codes — 12 Share Links + Gallery

**Live Gallery:** https://danskpath.onrender.com/qr-codes.html + https://danskpath.onrender.com/qr/

**Generated 12 QR codes 800px #121417 M error correction:**

| QR | URL | Label | Use |
|----|-----|-------|-----|
| `qr-simple-landing.png` | `/?page=simple-landing` | Landing — Find your Danish level | Main share, Open→Understand per spec |
| `qr-assessment.png` | `/?page=assessment` | Assessment — Find dit niveau | Share link → assessment intro what measures/duration/what receives |
| `qr-diagnostic.png` | `/?page=diagnostic` | Test — 7 min 15 Q randomized | Direct to questions, shuffleAnswers fix correct not always first |
| `qr-path.png` | `/?page=path` | Path — Din læringsvej M1→PD3 | Path preview after results, Apple premium timeline |
| `qr-roadmap.png` | `/?page=roadmap` | Roadmap — Your Learning Roadmap | Full education roadmap M1→PD3 progress next recommended |
| `qr-practice.png` | `/?page=practice` | Practice — Today | Dashboard current phase today's exercise |
| `qr-register.png` | `/?page=register` | Register — Start Learning guest transfer | Create account username/password/confirm atomic transfer |
| `qr-login.png` | `/?page=login` | Login — Already have account | Returning learner Login→current journey→exercise no repeat |
| `qr-admin.png` | `/?page=login` | **Admin — Discreet Access Owner Only** | **Discreet** — not shown on public landing except small Admin link top-right 11px #8E8E93 per spec, opens login then admin if Vipin/vipin123, owner only QR, red dashed border in gallery |
| `qr-personal-mvp.png` | `/personal-mvp.html` | Personal MVP Status | Definition of success fixed blockers core journey verification |
| `qr-practice-experience.png` | `/practice-experience.html` | Practice Experience Flow Chart | Flow chart SVG 1000x880 + 6 practice types how they look how to do it |
| `qr-journey-map.png` | `/journey-map.html` | Journey Map Roadmaps | After test analysis + roadmap 4 cases M1 9mo M3 6mo M4 4mo Vipin M5 2mo |

**How to share — per spec Next Development Stage:**
- In person: Show QR, they scan with camera → directly to assessment
- LinkedIn: Download QR + post with link
- Email: Paste link + QR image
- Presentation: Full-screen QR slide
- Print: QR on handout A4 poster
- Messages: Copy link WhatsApp SMS
- Guest flow: No account required to see results, create account to save journey — Open→Understand→Assessment→Results→Strengths→Path→Preview→Start Learning→Create Account→Transfer→Dashboard→Exercise→Progress→Next
- Privacy: QR opens public assessment only, no admin exposed, each learner independent trialId
- Admin discreet: Admin QR opens login, then admin if Vipin/vipin123, not shown on landing except small Admin link top-right 11px #8E8E93 per spec
- Reset Progress: ProgressView + RoadmapView have Reset progress button that clears localStorage and returns to simple-landing for testing 26 Definition of Done tests

**Regenerate:**
```bash
npm ci --include=dev
node generate-all-qr.mjs
# Output: public/qr/*.png + public/qr-*.png + public/qr/index.html + public/qr-codes.html
```

## 🔐 Admin — Discreet Access Per Spec

**Discreet per spec:** Landing extremely simple — only logo/name, short headline, one-sentence explanation, primary CTA Take the Test, secondary Already have account? Log in, **discreet Admin access**, no long marketing/feature grids/competing CTAs.

**Implementation:**
- SimpleLandingView: Header `Admin` button `text-[11px] text-[#8E8E93] hover:text-black` top-right — per spec discreet
- App.jsx: `/?page=login` → LoginView → if admin Vipin/vipin123 → admin dashboard
- AdminDashboardView: Dashboard users/active/assessments, user list username level current phase progress last active, user detail Account Assessment Level Section Results Strengths Weaknesses Path Current Phase Completed Exercises Activity
- Server: `/api/auth/login` rateLimit 10/15min sanitizeString name 100 pwd 6-128 duplicate check bcrypt hash JWT sign
- **QR:** `qr-admin.png` → `/?page=login` — owner only, red dashed border in gallery, not shown in public marketing

**Login:** Vipin / vipin123 (change after first login via /api/auth/setup)

**Security:**
- Passwords bcrypt never plain text, JWT secure, logout clears token user localStorage
- Learners cannot access other users data, admin data, admin enforced server-side
- Guest assessment independent trialId not exposed to another user, transfer only correct account via `/api/auth/register` with guestData diagnostic/level/verdict/goals/progress/scores parsed JSON atomic

## 🚀 Quick Start

```bash
npm ci --include=dev
npm run build
npm start
# Frontend: http://localhost:5173
# Backend: http://localhost:3001
# Health: http://localhost:3001/api/health
# Build: 897KB gzip 233KB CSS 73KB gzip 12KB DiagnosticView 37KB gzip 11KB 101 modules 3.8s
```

## 📦 Deployment

### Render (Recommended, Free, Persistent DB, Frankfurt)

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://dashboard.render.com/blueprint/new)

- `render.yaml` included — one-click blueprint
- Free: 750h/month, 1GB disk, sleeps after 15 min
- Starter $7/month: always-on, no sleep, custom domain danskpath.app
- Cost: $0/month + $12/year domain, or $7/month + $12/year for always-on
- Live: https://danskpath.onrender.com — 200 OK / /personal-mvp.html /?page=simple-landing /qr-codes.html /qr/qr-assessment.png /api/health ok true users 1 secure true

```bash
git push origin main # Render auto-deploys
```

### Vercel (Fast CDN)
```bash
npm i -g vercel
vercel --prod
# Public URL: https://danskpath.vercel.app
```

### Fly.io (Closest to Copenhagen — Stockholm region)
```bash
fly launch --copy-config
fly volumes create danskpath_data --region arn --size 1
fly deploy
# Public URL: https://danskpath.fly.dev
```

### Docker
```bash
docker build -t danskpath .
docker run -d -p 3001:3001 -v /data:/data -e NODE_ENV=production danskpath
```

## 🎨 Brand Identity — Scandinavian iPhone Premium

- **Theme:** Single theme across website + assessment + iPhone app — Scandinavian iPhone style premium per spec
- **Logo:** D + speech bubble + blue arrow forward, black #121417 + blue #007AFF, works at 24px
- **Typography:** Inter + SF Pro + Outfit 40px headline, iOS HIG, 14px body, 11px uppercase tracking-widest
- **Colors:** bg #FFFBF5 / #F2F2F7, card white, ink black #121417, accent #007AFF, success #34C759, error #FF3B30, muted #8E8E93
- **Design System:** `src/lib/designSystem.js` — Apple premium HIG: SF Pro, ultra-thin material blur, vibrancy, large titles, grouped inset, spring animations, haptic, premium cards 32px, refined spacing, polished native iOS feel
- **iPhone-first:** App designed specifically for iPhone screens fix sizing proportions viewport spacing typography buttons cards navigation safe-areas env(safe-area-inset-top/bottom) nothing desktop/web squeezed must feel polished native iOS, 390px max-w, 48-56px buttons, one clear purpose one clear primary action
- **No:** AI-generated humans, transitions animations excess, variation/expected action internal labels visible, Principle explanation before drill, learning path during test, excessive text main learning/path screen, all CEFR levels permanently displayed — progressively reveal relevant only

## 📱 iPhone PWA

- Manifest: `public/manifest.json`
- Service Worker: `public/sw.js` v4
- Icons: 60,120,180,192,512,1024 + apple-touch-icon
- Install: Safari → Share ⎙ → Add to Home Screen
- Live: https://danskpath.onrender.com → Add to Home Screen = PWA 390px safe-area

## 🧪 Testing — Definition of Done 26 Tests

**New User Acceptance Test (10 steps):**
1. Open → simple landing loads mobile friendly CTA visible ✓
2. Start Assessment → intro appears sections explained ✓
3. Complete Assessment → one question at a time progress Question 7 of 15 + bar ████████░░ answers submit final question ✓
4. Results → overall level A2 section scores strengths weaknesses no account required ✓
5. Recommended Path → personalized path generated complete path visible current phase identified future phases visible path contains actual exercises ✓
6. Create Account → RegisterView username password confirm validation works ✓
7. Transfer Assessment → Assessment + Results + Strengths + Weaknesses + Path preserved no repeat ✓
8. Dashboard → auto logged in level visible current phase visible progress visible next activity visible ✓
9. First Exercise → opens instructions clear answer submit feedback complete ✓
10. Progress → exercise completed phase progress updates overall progress updates next exercise available ✓

**Returning User:** Login → Dashboard no assessment again, Current Phase → Next Incomplete, Refresh after exercise logout login progress remains ✓

**Admin:** Admin login separate learner cannot access, Dashboard total users active assessments, User list, User detail ✓

**Security:** Passwords bcrypt, JWT secure, logout works, learners cannot access other users, guest assessment independent trialId ✓

**Mobile:** Landing Assessment Results Path Account Dashboard Exercise Progress Profile all 390px dvh safe-area no overflow ✓

**Exercise:** Every active phase contains exercises phase.exercises.length >0 ✓

**Data Persistence:** Assessment saved → Results saved → Path saved → Account created → Data transferred → Exercise completed → Progress saved → logout → login → Progress still exists ✓

**No Dead Ends:** Landing→Assessment→Results→Path→Account→Dashboard→Exercise→Progress→Next all work ✓

**Testing Guide:** `/TESTING_GUIDE.html` — Live: `/LIVE_NOW.html` + `/DEPLOYMENT_LIVE.html` + `/personal-mvp.html` + `/practice-experience.html` + `/journey-map.html` + `/qr-codes.html`

**Reset Progress:** Use ProgressView or RoadmapView Reset progress button for testing 26 tests

## 📂 Structure

- `src/components/SimpleLandingView.jsx` — Per spec simple landing logo D DanskPath + discreet Admin + headline Find your Danish level + one-sentence + CTA Take the Test + secondary Already have account? Log in + How it works 3 bullets + footer Modul 1→PD3 480px safe-area
- `src/components/RegisterView.jsx` — Per PRD account creation username/password/confirm validation 3/6 chars POST /api/auth/register with guestData dansk_diagnostic/level/verdict/goals/progress/scores/user_seed offline fallback local_token local_id role learner success Account created Your assessment saved transferred checklist
- `src/components/AssessmentLandingView.jsx` — Assessment intro what measures/duration/what receives after per PRD
- `src/components/DiagnosticView.jsx` — CTAs per spec Results→See Learning Path→Path Preview→Start Learning→Create Account See My Learning Path primary Go to practice secondary Start Learning → Create Account blue Edit goals No account required
- `src/components/PathView.jsx` — Apple premium 390px timeline restored Fortsæt her — grammarDone/grammarRequirements + Markér færdig ✓ sets stage_mX_cleared true reload Øvelser → Continue to next stage / PD3 exam →
- `src/components/RoadmapView.jsx` — Your Learning Roadmap M1→PD3 full education no repeat 30d infinite variants 15 min one hand Reset progress
- `src/components/ProgressView.jsx` — Where you are honest numbers Weekly report auto from your data Reset progress clears localStorage returns to simple-landing
- `src/components/PracticeView.jsx` — Today What should you practice now?
- `src/components/WelcomeView.jsx` — iPhone-first onboarding Welcome→Log in/Sign up→Find initial Danish level→Start learning journey
- `src/components/InstructionsView.jsx` — Dedicated instructions ~5 bullets + what happens after + Start Test → questions
- `src/lib/shuffleAnswers.js` — shuffleOptions Fisher-Yates with seed fixes correct always first randomizes position
- `src/lib/stageEngine.js` — getStageProgress checks dansk_progress/path/scores/srs overall avg manuallyCleared cleared lenient 50%/60% markStageCleared resetProgress
- `src/App.jsx` — Routing per PRD spec handles /register /simple-landing default '/' → simple-landing guest flow Do NOT force account before value guest diag && !isLoggedIn → path preview register route added nav hidden for simple-landing/register cases register → RegisterView simple-landing → SimpleLandingView
- `server.js` — /api/auth/register rateLimit 10/15min sanitizeString name 100 password 6-128 duplicate check bcrypt hash creates user id uuid role learner transfers guestData diagnostic/level/verdict/goals/progress/scores parsed JSON JWT sign returns token user
- `public/qr/` — 12 QR codes 800px #121417: qr-simple-landing, qr-assessment, qr-diagnostic, qr-path, qr-roadmap, qr-practice, qr-register, qr-login, qr-admin discreet owner only, qr-personal-mvp, qr-practice-experience, qr-journey-map
- `public/qr-codes.html` — Gallery with open + download + how to share per spec
- `public/personal-mvp.html` — Full MVP guide + how to use today phone
- `public/practice-experience.html` — Flow chart SVG 1000x880 + 6 practice types detailed how they look how to do it
- `public/journey-map.html` — After test analysis + roadmap 4 cases M1 9mo M3 6mo M4 4mo Vipin M5 2mo
- `src/components/BrandLogo.jsx` — New logo D speech bubble blue arrow
- `server.js` — Express API + DB + serves dist
- `danish-platform-db.json` — Portable DB users trials assessments

## 💰 Cost

- Free: $0/month + $12/year domain (Render free sleeps)
- Production: $7/month + $12/year = $96/year (always-on, recommended for QR)
- Proper: $15-20/month + $12/year (100+ users, real Postgres)

See `DEPLOYMENT.md` for details.

## 👤 Author

Vipin Singh Dunbar — vipinsinghdunbar

Full Danish education Modul 1→PD3, A1→B2, built for adults with job and family. Personal MVP core journey fully functional end-to-end usable today. Definition of Done 26 tests pass. Guest-first Open→Understand→Assessment→Results→Strengths→Path→Preview→Start Learning→Create Account→Transfer→Dashboard→Exercise→Progress→Next no dead ends clear next action every screen persistence required important learner data persists after close/refresh/logout/return saved journey available after login.

Live: https://danskpath.onrender.com — QR: https://danskpath.onrender.com/qr-codes.html — Health: /api/health ok true users 1 env production secure true — Build: 897KB gzip 233KB — Commit: 1dbf360 feat Full product spec MVP Definition of Done 26 tests guest flow no account before value + Reset Progress + QR codes
