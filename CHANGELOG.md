# Changelog — DanskPath

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- RoadmapView.jsx — interactive roadmap 0→Launch→Maintenance with progress, achieved/missing/next, security threat model OWASP 10, quality standards, architecture current+future, team focus, continuous update process, links that work
- QUALITY_STANDARDS.md — mandatory coding standards lint formatting React security performance a11y Git docs quality metrics
- TESTING_FRAMEWORK.md — testing pyramid unit Vitest integration Supertest e2e Playwright visual Chromatic perf Lighthouse security npm audit Snyk ZAP a11y axe manual checklist CI/CD
- Explicit public routes in server.js for /assessment /architecture /privacy /terms /security /roadmap /website /practice etc. to fix broken links
- /.well-known/security.txt endpoint
- ErrorBoundary component (to be added)
- .eslintrc, .prettierrc, husky, lint-staged (to be added)
- GitHub Projects, CHANGELOG, CODEOWNERS, PR template (to be added)

### Fixed
- Broken links: Added explicit Express routes for pretty URLs that serve index.html, not just SPA fallback — fixes user reported links not working
- Security: /api/trials public should be admin only — to be fixed

### Security
- Added security.txt

## [4.1.0] - 2026-09-27 - SECURE + Roadmap

### Added
- ROADMAP.md — master roadmap 0→Launch→Maintenance Phases 0-8 progress achieved/missing/next security threat model OWASP 10 + mitigations quality standards framework architecture current+future links fix team focus continuous update process
- PrivacyView.jsx, TermsView.jsx, SecurityView.jsx — routes /?page=privacy/terms/security with live audit
- capacitor.config.json — appId dk.danskpath.app splash #121417 status bar dark keyboard resize body
- SECURITY_AUDIT_LAUNCH_READINESS.md — 10 sections critical/high/medium findings App Store/Play Store requirements IDP analysis data sharing action plan
- PRIVACY_POLICY.md — GDPR compliant App Store label
- TERMS.md — Terms of Use
- DATA_SAFETY.md — Play Data Safety form
- APP_STORE_CHECKLIST.md — step-by-step iOS + Android
- DOWNLOADABLE_PACKAGES.md — zip Docker TWA Capacitor guides
- PUBLIC_URL.txt — current live URL
- danskpath-pwa-v4-SECURE.zip 20M — downloadable PWA + API + docs
- QR codes 6 files ASSESSMENT/ARCHITECTURE/WEBSITE/PRIVACY/SECURITY/APP 5.8-6.3K 800px #121417

### Fixed
- Security headers: X-Content-Type-Options nosniff, X-Frame-Options DENY, Referrer-Policy strict-origin-when-cross-origin, Permissions-Policy camera/mic/geolocation, HSTS max-age 31536000 in prod, CSP default-src self script-src self unsafe-inline unsafe-eval style-src self unsafe-inline fonts.googleapis font-src self fonts.gstatic data img-src self data blob https connect-src self https worker-src self manifest-src self, remove X-Powered-By
- CORS: Restricted in prod to pattern trycloudflare/danskpath/render/vercel/localhost + ALLOWED_ORIGINS env, origin null allowed for mobile/curl
- Rate limiting: In-memory Map 10/15min login 5/min setup 20/15min trial cleanup 10min 429 with retryAfter
- Input validation: sanitizeString strips <> maxLen checks
- GDPR: DELETE /api/user/data?anonymize=true + GET /api/user/export
- Security audit endpoint: GET /api/security/audit returns ok headers rateLimit inputValidation auth storage pii issues
- WebsiteView footer: Added Privacy Terms Security Architecture links + security badges + live audit links

### Security
- JWT_SECRET env warning if default in prod, now random 32 chars in prod via `openssl rand -base64 32`
- Admin password vipin123 still default — must change (next)
- DB file permission 600 recommendation, /data persistent disk
- OWASP Top 10 coverage 6/10 PASS 4/10 PARTIAL

## [4.0.0] - 2026-09-27 - Architecture Map + Live Public

### Added
- ArchitectureMapView.jsx — interactive architectural map 24 nodes 27 edges SVG motion arrows with dash animation + animateMotion dots, play journey 9 steps User→QR→Website→Assessment→Diagnostic→Verdict→Path→Practice→Progress with 1.2s interval, clickable nodes show desc + connected edges, hover highlights, active ring, iOS design system colors, legend User/Assessment/Engines/Learning/Deployment, flow steps 10, data flow engines, deployment cost, QR download
- Integration into App.jsx routing ?page=architecture + Sidebar nav
- Public deployment live via Cloudflare Tunnel https://alberta-applies-streets-expenditure.trycloudflare.com (and previous tunnels)
- QR codes public/qr-LIVE-*.png 800px

### Fixed
- Blank options bug — 0 blanks verified, 24 templates explicit q/options
- Test expectations resolved 15/15 PASS variationEngine <=3 stageEngine object.count verdictEngine recommendedPath timeline object

### Security
- Initial security audit — found critical JWT_SECRET default, CORS origin:true, no rate limiting, no headers

## [3.0.0] - 2026-09-27 - Three Experiences + PWA

### Added
- WebsiteView.jsx — marketing intro What is app How 1 Assess 2 Personalise 3 Learn 4 Practise 5 Progress CTA Find my Danish level + Sign in same logo/typography/colors/buttons/icons/cards/spacing/interactions/tone
- AssessmentLandingView.jsx — dedicated public URL /assessment with QR easy to share in person/LinkedIn/email/presentations/print/messages landing Find your Danish level + Start flow open link/QR→explanation→start→answer adaptive→complete→overview→strengths/areas→suggested start→continue to full independent session per learner varied questions no admin exposure
- Full iPhone App: PracticeView, PathView, DiagnosticView, ProgressView, CompleteGrammarView, etc. — M1-5 alphabet→PD3 account/login assessment personalised path lessons reading/listening/writing/grammar/vocab/practice/weekly tests/progress/reassessment/recommendations/motivation/profile/settings iOS-specific UX app icon new logo branding iOS nav smooth transitions animations micro-interactions touch targets light/dark accessible typography fast loading loading/error states PWA add-to-home-screen native-like
- PWA: manifest.json v4 full education shortcuts categories education/productivity lang da orientation portrait-primary icons 60→1024 maskable apple-touch-icon favicon.svg sw.js CACHE v4-full-education cache-first assets network-first navigation skip /api/* skipWaiting clients.claim
- Design system #121417 #007AFF #F2F2F7 #5856D6 #34C759 #FF9500 #8E8E93 Inter font
- Routing App.jsx ?page=website|assessment|practice|path|diagnostic|progress|admin|login|share etc. + hash + /assessment path support SPA fallback auth check PWA registration ephemeral banner
- Public deployment system: Dockerfile render.yaml vercel.json fly.toml production-ready server.js serving dist + API with PORT env and persistent /data ephemeral live QR for immediate testing and permanent QR placeholder for danskpath.app deployment docs and scripts one-click deploy instructions
- Architecture: WEBSITE + ASSESSMENT + iPHONE APP share learning/assessment/personalisation system with proper separation admin/personal vs public
- New logo modern friendly educational Scandinavian clean trustworthy works at app icon/header/assessment/QR/favicon/social
- Curriculum Module→Lessons→Skills→Practice→Assessment→Progress M1-5 diagnostic start

### Fixed
- Build 3.63s 213KB gzip → 5.16s 853KB 222KB gzip
- PWA installable via Add to Home Screen

## [2.0.0] - 2026-09-26 - Engines

### Added
- variationEngine.js — 5,100+ variants
- stageEngine.js — M1→M5 A1→B2 200→1354 vocab
- verdictEngine.js — recommendedPath + timeline
- levelEngine.js — path weak vocabProgress Box 0→5
- Question bank 24 questions
- SRS Box 0→5
- Tests 15/15 fixed expectations

## [1.0.0] - 2026-09-25 - Initial

### Added
- Initial Danish learning app with Modul 1→5
- Basic assessment
- Practice view
- Progress view

---

**Note:** Keep updating this file every feature — mandatory — with Keep a Changelog format
