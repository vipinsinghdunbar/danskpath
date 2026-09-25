# DanskPath — Three Experiences, One Product

## Architecture

```
                    DANISH LEARNING PRODUCT
                             │
            ┌────────────────┼────────────────┐
            │                │                │
         WEBSITE          ASSESSMENT       iPHONE APP
            │                │                │
       Learn about it     Test Danish       Full learning
            │                │                │
            └───────────────┼────────────────┘
                            │
                    SHARED ACCOUNT /
                    LEARNER SYSTEM
                    danish-platform-db.json
```

## 1. 📱 Full iPhone App

**Entry:** `/?page=practice` or after diagnostic, or Add to Home Screen

**Features:**
- Account creation and login (Vipin / vipin123 admin)
- Initial assessment (7-min, 20 Q, M1→M5)
- Danish level assessment per skill
- Personalised learning path M1→M5
- Modules 1-5 with lessons
- Reading, Listening, Writing, Grammar, Vocabulary, Practice
- Weekly tests, Progress tracking, Reassessment
- Personalised recommendations
- Motivation and progress features
- Profile/settings

**iPhone PWA:**
- App icon: 60, 120, 180, 192, 512, 1024 PNG
- Manifest: name DanskPath — Modul 1 til PD3, short_name DanskPath, display standalone, theme #121417, background #F2F2F7
- Service Worker: cache v4, network-first for navigation, cache-first for assets, skip API
- iOS meta: apple-mobile-web-app-capable yes, status-bar black-translucent, apple-touch-icon 180
- Install banner: shows if not standalone, iOS instructions Share → Add to Home Screen
- Touch targets: 44px min, tap-haptic with vibrate 10ms, active scale 0.97
- Navigation: Sidebar desktop (300px), BottomNav mobile (floating pill, blur, 5 primary + More)
- Light mode: #F2F2F7 background, white cards, black primary, #007AFF accent
- Fast loading: vite 5.4.8, lazy DiagnosticView, Suspense fallback spinner
- Loading/error states: spinner, soft backgrounds for feedback

**Test checklist:**
- [x] manifest.json valid with all icons
- [x] sw.js registers and caches
- [x] apple-touch-icon exists
- [x] Add to Home Screen banner shows on iOS
- [x] BottomNav iOS pill style
- [x] All learning views accessible
- [x] Login works (Vipin/vipin123)
- [x] Diagnostic saves to localStorage + backend
- [x] Path updates from mistakes
- [x] Data persistence via localStorage + DB

## 2. 🔗 Shareable Assessment

**Entry:** `/?page=assessment` or `/assessment` (SPA fallback)
**Shareable URL:** `https://{domain}/?page=assessment`
**Pretty URL:** `/assessment` (served via SPA fallback)

**Landing page (AssessmentLandingView):**
- Title: Find your Danish level
- Subtitle: Take a short assessment to understand your current Danish skills and receive a personalised learning path.
- Sections: What happens (4 steps), URL box with copy/share/download QR, QR visual
- Privacy note: No admin exposed, independent session

**QR Code:**
- Generated via `qrcode` npm library (400x400, margin 2, dark #121417, light #FFFFFF)
- Fallback to api.qrserver.com if library fails
- Canvas for download
- File: danskpath-assessment-qr.png
- Easy to share: in person, LinkedIn, email, presentations, printed, messages
- Scanning takes directly to assessment landing page

**Learner flow:**
1. Open shared link or scan QR
2. See short explanation (WebsiteView → AssessmentLandingView)
3. Start assessment (diagnostic 20 Q, adaptive, varied per learner via variationEngine)
4. Answer questions (interactive dots Question X of 20, feedback why)
5. Receive questions adapted to performance (M1→M5, 3-6 words to 15-25 words)
6. Complete assessment
7. Receive overview of Danish skills (verdictEngine: per-category, per-level, strengths ≥75%, weaknesses <60%)
8. See strengths and areas for improvement
9. See suggested starting point (Modul 1→5, timeline 1-9 months)
10. Optionally continue into full learning experience (practice, path)

**Independence:**
- Each learner gets own trialId via /api/trial/start
- trialId stored in localStorage `dansk_trial_id` + `dansk_user_seed`
- Questions varied via hash(seed) → different variants same skill
- No data mixing: answers stored per trialId in DB
- No admin exposure: public /api/questions returns no answers, only options

**Backend:**
- GET /api/questions → 15 random from bank, no answers
- POST /api/trial/start → creates trial with referralId, code, name, danishStartDate, goal
- POST /api/trial/assessment → calculates result, saves assessment, returns level, pct, strengths, weaknesses, path, timeline
- GET /api/assessment/info → shareable URL info, privacy, instructions
- DB: danish-platform-db.json portable, trials[], assessments[], feedback[]

**Test checklist:**
- [x] Link works (/?page=assessment)
- [x] QR code generates and downloads
- [x] New user can start independently (own trialId)
- [x] Questions are generated correctly (15 Q, varied)
- [x] Questions are sufficiently varied (variationEngine + hash)
- [x] Results saved correctly (DB + localStorage)
- [x] Assessment cannot expose another user's info (no answers in public API, trialId isolated)
- [x] Privacy: no admin dashboard in assessment flow

## 3. 🌐 Public Website

**Entry:** `/` or `/?page=website` (default if no diagnostic)

**Sections:**
- Header: logo, nav Assessment, Sign in, CTA Find my level
- Hero: badge Modul 1→PD3, title Danish that sticks after work and kids, subtitle workbook not game, CTAs, trust badges No streaks/No ads/Works offline, iPhone mock with Today view
- What is app: 6 features grid (alphabet to PD3 debate, V2 under pressure, words that work, listening without transcript, writing 30→200, personal path no repeat)
- How it works: 5 steps Assess→Personalise→Learn→Practise→Progress with connectors, plus M1→M5 difficulty progression and sample sentences 3-6→15-25 words
- CTA: Ready to find your Danish level, 7 min, 20 Q, adaptive
- Footer: logo, ©, links Assessment/Share QR/Admin

**Design system (shared):**
- Logo: D + speech bubble + blue arrow forward, black #121417 + blue #007AFF, works at 24px, full variant with wordmark DanskPath Modul 1→PD3
- Brand identity: Modern, Friendly, Educational, Scandinavian, Clean, Trustworthy, not traditional school/government
- Typography: Inter 400/500/600/700/800, SF Pro fallback, largeTitle 34, title1 28, body 17, footnote 13
- Color palette: bg #F2F2F7, bgCard #FFFFFF, ink #000000, secondaryLabel #3C3C43 60%, tertiaryLabel #8E8E93, accent #007AFF, accent2 #5856D6, success #34C759, warning #FF9500, error #FF3B30, m1 #007AFF, m2 #5856D6, m3 #AF52DE, m4 #FF2D55, m5 #000000
- Buttons: primary black pill 17px 600 shadow, secondary white border, accent blue, ghost #F2F2F7, tap-haptic scale 0.97 + vibrate
- Cards: default white rounded 24px p-6 shadow-sm border black/5, large 32px p-7 shadow 8px 32px, secondary #F2F2F7 20px, accent black text white 24px
- Icons: rounded D + speech + arrow, works at small size, favicon, social/share image 512
- Spacing: xs 4, sm 8, md 16, lg 24, xl 32, 2xl 48, 4px base grid
- Interaction: spring cubic-bezier(0.16,1,0.3,1), fast 150ms, normal 300ms, slow 500ms
- Tone of voice: Direct, no bullshit, for adults with job/family, explanation before drill, English first

**Test checklist:**
- [x] Landing page loads
- [x] Navigation works (website ↔ assessment ↔ login ↔ practice)
- [x] CTA buttons go to assessment
- [x] Mobile layout (iPhone 390px) works
- [x] Desktop layout (1120px) works
- [x] Assessment entry from website
- [x] Login entry from website
- [x] Logo and branding consistent
- [x] Responsive behavior
- [x] Accessibility (contrast, touch targets)
- [x] Performance (vite 201ms ready)

## End-to-End Journey Test

**Scan QR code**
- QR generated via qrcode library, 400x400, dark #121417
- Download as danskpath-assessment-qr.png
- Share via LinkedIn, email, presentation, print, messages
- Scan with iPhone camera → opens https://{domain}/?page=assessment

**Open website**
- / → WebsiteView with hero, what is app, how it works
- Same logo, brand, typography, colors, buttons, cards

**Understand what product does**
- What is app: workbook M1→PD3, not game, for adults job/family
- How it works: 5 steps, M1→M5 progression 3-6→15-25 words 2-3 rules combined

**Start Danish assessment**
- CTA Find my level → /?page=assessment → AssessmentLandingView
- Explanation: 7-min adaptive, skill profile, personal path M1→5, independent session
- Button Start assessment → 7 min → /?page=diagnostic

**Create learner session**
- DiagnosticView: intro → info Name/When started/goal → assessment → result → feedback → stop
- Trial start: POST /api/trial/start with name, danishStartDate, goal → trialId
- Seed: localStorage dansk_user_seed for variation

**Complete assessment**
- 20 questions, interactive dots Question 7 of 20, feedback why
- Variation: same skill different sentences via variationEngine (V2, Ledsætning, Sin, Flertal, Kollokationer, Reduktion)
- Prevent memorisation: 15 variants per template → 5,100+ controlled variants

**Receive skill profile**
- Verdict beyond %: per-category (grammar, vocab, listening, reading, writing, culture), per-level (A1→B2), strengths ≥75%, weaknesses <60%, consistency, time per question
- Timeline: 1-9 months to PD3 based on pct

**Receive recommended starting point**
- Modul 1→5 suggestion: M1 alphabet SVO 30-50, M2 V2 60-80, M3 subordinate 80-120, M4 sin/hans 120-150, M5 PD3 150-200
- Path: 4 steps V2+inversion, collocations, listening without transcript, writing structure

**Enter personalised learning path**
- PathView: activeModule m1 default, title Your path from Modul 1 to PD3, subtitle alphabet to jo/da/vel full path
- Modules: M1 3-6 words, M2 6-9, M3 9-14, M4 12-18, M5 15-25 2-3 rules
- No repeat: SRS Box 0→5, 30-day rule

**Complete lesson**
- PracticeView: why copy Modul 1-5 A1→B2 from zero to PD3
- Grammar: infinite engine, same rule new words, dedupKey 30 days

**Practise**
- Weak topics repeat until correct, safe topics rest 30 days
- Haptic feedback, correct/incorrect states, explanation English first

**Take test**
- Modultest per module: questions, timeMin, passPct
- PD3: 4 delprøver, 150-200 words writing, gapped text, listening, reading

**Receive updated progress**
- ProgressView: weekly, streaks-free, motivation no streaks
- Dashboard: audit, levels, flow

**Continue learning**
- Works without manual intervention
- Data persistence: localStorage + DB portable

## Files

- /public/manifest.json — PWA manifest with new branding
- /public/sw.js — Service worker v4 cache
- /public/icon-*.png — App icons 60,120,180,192,512,1024 + apple-touch-icon
- /public/logo-concept.png — Logo concept
- /src/components/BrandLogo.jsx — New logo component icon/full/app variants
- /src/components/WebsiteView.jsx — Public website / landing page
- /src/components/AssessmentLandingView.jsx — Shareable assessment with QR
- /src/components/PWAInstallBanner.jsx — iOS install prompt
- /src/components/LandingPage.jsx — Legacy landing updated to M1→PD3
- /src/App.jsx — Three experiences routing
- /src/lib/designSystem.js — iOS HIG design system
- /server.js — Backend with /api/assessment/info + SPA fallback

## Admin vs Public Separation

- Admin: /?page=admin, requires JWT, role admin, Vipin/vipin123
- Public website: /?page=website, no auth
- Assessment: /?page=assessment, no auth, independent trialId
- Full app: /?page=practice, uses localStorage diagnostic, no admin required
- API: /api/questions public no answers, /api/trial/* public, /api/admin/* requires auth+admin
- DB: danish-platform-db.json, users[], referrals[], trials[], assessments[], feedback[]

## Final Deliverables

1. 📱 Full iPhone App: PWA with new logo, branding, polished iOS UI/UX, complete learning platform M1→PD3
2. 🔗 Shareable Assessment: link /?page=assessment + QR code downloadable, independent sessions, no admin exposed
3. 🌐 Public Website: polished intro, what/how/CTA, same visual identity, directs to assessment and login

All three connected to same underlying learning, assessment, personalisation system while keeping admin, personal learner data and public users properly separated.
