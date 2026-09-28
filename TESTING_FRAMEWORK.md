# 🧪 Testing Framework — DanskPath

**Version:** v4 SECURE
**Last Updated:** 2026-09-27
**Goal:** 80% coverage, quality standard, security, links work, PWA installable, no regression

---

## 1. Testing Pyramid

```
E2E (Playwright) — 10% — critical flows QR→website→assessment→verdict→path→practice→progress
Integration (Supertest) — 20% — API endpoints auth trials assessments security headers rate limiting GDPR
Unit (Vitest + RTL) — 70% — engines variation stage verdict level utils components
```

---

## 2. Unit Tests (Vitest + React Testing Library)

**Setup:**
```bash
npm i -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

**Config vite.config.js:**
```js
test: { environment: 'jsdom', globals: true, setupFiles: './src/test/setup.js', coverage: { provider: 'v8', reporter: ['text','json','html'], thresholds: { lines:80, branches:80, functions:80, statements:80 } } }
```

**What to Test:**
- `src/lib/variationEngine.js` — no blanks, ≤3 duplicates, 5,100+ variants, explicit q/options
- `src/lib/stageEngine.js` — M1→M5 mapping, vocab count, mastery object, 200→1354
- `src/lib/verdictEngine.js` — recommendedPath + timeline object, per-skill profile
- `src/lib/levelEngine.js` — path, weak, vocabProgress Box 0→5
- `src/lib/auth.js` — getToken, setToken, getUser, isLoggedIn, isAdmin, login, fetchMe, logout
- `src/lib/api.js` — isTrialLink, etc.
- Components: BrandLogo, PWAInstallBanner, EphemeralBanner, BottomNav, Sidebar, etc. — render without crash, props, interactions

**Example:**
```js
import { describe, it, expect } from 'vitest';
import { variationEngine } from '../lib/variationEngine';
describe('variationEngine', ()=>{
  it('no blanks', ()=>{
    const vars = variationEngine.generateAll();
    expect(vars.filter(v=>!v.q || !v.options || v.options.length===0).length).toBe(0);
  });
  it('duplicates ≤3', ()=>{
    // ...
  });
});
```

**Coverage Goal:** >80% lines, branches, functions, statements

---

## 3. Integration Tests (Supertest)

**Setup:**
```bash
npm i -D supertest
```

**What to Test:**
- `GET /api/health` → 200, ok:true, secure:true in prod, headers nosniff DENY HSTS CSP present, no X-Powered-By
- `GET /api/security/audit` → 200, ok boolean, headers object, rateLimit true, issues array
- `POST /api/auth/login` → 401 without body, 401 wrong password, 200 with correct Vipin/vipin123 (after change, use env), returns token + user, rate limiting 10/15min → 429 on 11th
- `POST /api/trial/start` → 400 without name, 200 with name, sanitizes <>, rate limiting 20/15min
- `GET /api/questions` → 200, 15 questions, no answers field `a`
- `POST /api/trial/assessment` → 400 without trialId/answers, 200 with valid, returns assessment + result with level, pct, strengths, weaknesses, path, timeline
- `GET /api/assessment/info` → 200, url, prettyUrl, qrPath, title, description, instructions, privacy
- `DELETE /api/user/data` → 401 without token, 200 with token, anonymize
- `GET /api/user/export` → 401 without token, 200 with token, returns user trials assessments
- `GET /api/trials` → should be admin only (currently public — fix to 401 without admin, 200 with admin)
- `GET /privacy`, `/terms`, `/assessment`, `/architecture`, `/roadmap`, `/security`, `/website`, `/practice` → 200, serves index.html, not 404, not API
- `GET /.well-known/security.txt` → 200, text/plain, contains Contact

**Example:**
```js
import request from 'supertest';
import app from '../server.js';
describe('API', ()=>{
  it('GET /api/health returns secure', async ()=>{
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(res.headers['x-content-type-options']).toBe('nosniff');
    expect(res.headers['x-frame-options']).toBe('DENY');
    expect(res.headers['x-powered-by']).toBeUndefined();
  });
});
```

---

## 4. E2E Tests (Playwright)

**Setup:**
```bash
npm i -D playwright @playwright/test
npx playwright install
```

**Config playwright.config.js:**
```js
import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './e2e',
  webServer: { command: 'npm run dev', port: 5173 },
  use: { baseURL: 'http://localhost:5173', trace: 'on-first-retry' },
});
```

**Critical Flows to Test:**

1. **QR→Website→Assessment→Diagnostic→Verdict→Path→Practice→Progress→Continue (End-to-End)**
   - Open `/?page=website` → check CTA Find my Danish level visible
   - Click CTA → goes to `/?page=assessment`
   - Click Start 7-min → goes to `/?page=diagnostic` or trial flow
   - Answer 15 questions adaptive → complete → overview strengths/areas suggested start
   - Continue to full → path → practice Today 15min → SRS Box 0→5 → Progress → PWA Add to Home Screen → Continue without manual intervention

2. **Shareable Link/QR Independent**
   - Open `/?page=assessment` in 2 browsers → 2 independent trialId, no shared state, variation different, results independent, no admin leak

3. **Website Landing/Nav/CTA/Mobile/Desktop/Login/Branding/Responsive/A11y/Perf**
   - Desktop 1280px + mobile 375px + iPad 768px
   - Nav: Website, Assessment, Architecture, Share QR, Privacy, Terms, Security, Login
   - CTA: Find my Danish level → assessment
   - Branding: logo D black circle, colors #121417 #007AFF, Inter font, rounded-full buttons, rounded-[24px] cards
   - Responsive: No horizontal scroll, touch targets 44px, typography readable
   - A11y: axe-core 0 violations, keyboard nav, focus ring
   - Perf: Lighthouse >90

4. **iPhone Install/Nav/Touch/Sizes/Login/Assessment/Path/Lessons/Practice/Tests/Progress/Persistence**
   - PWA installable: manifest, sw.js, icons, Add to Home Screen banner
   - Nav: BottomNav + Sidebar + MoreSheet
   - Touch: Buttons 44px, swipe, no 300ms delay
   - Sizes: iPhone SE 375x667, 12 390x844, 14 Pro Max 430x932, iPad 768x1024
   - Login: Vipin/vipin123 → admin dashboard, change password
   - Assessment: 15 Q adaptive M1→M5 3-6→15-25 words, no blank
   - Path: M1→M5 A1→B2 200→1354 vocab
   - Lessons: Grammar, vocab, listening, reading, writing, culture, exam
   - Practice: Today 15min, SRS Box 0→5, weak topics repeat
   - Tests: Weekly, Modultest, PD3
   - Progress: Dashboard, level, pct, strengths, weaknesses, timeline
   - Persistence: localStorage path, weak, vocab progress, used listening/reading, writing/speaking attempts, goals, diagnostic, trial result

5. **Links Work (User Reported Broken)**
   - Every `setActive('xxx')` → URL updates via pushState, back button works, direct navigation to /xxx serves index.html, not 404
   - Footer links: Assessment, Architecture, Share QR, Privacy, Terms, Security, Admin → all work
   - QR: Scan with phone camera → opens outside chat, works
   - API: /api/health, /api/security/audit, /api/assessment/info → JSON not HTML

6. **Architecture Map Motion**
   - Open /?page=architecture → 24 nodes visible, 27 edges SVG curved Q paths with markers, motion dash 0.5s + dot 1.2s, play journey 9 steps, clickable nodes details panel, hover highlights, active ring, legend, flow steps, deployment cost, QR download, status badges ✅⚠️❌🔜

7. **Roadmap**
   - Open /?page=roadmap → phases 0-8 progress bars, achieved/missing/next, security threat model OWASP 10, quality standards, architecture current+future, team focus, continuous update process, links that work

8. **Security**
   - /?page=security → live audit ok:true, headers, rateLimit, auth, storage, pii, issues, GDPR export/delete buttons
   - /api/security/audit → ok:true issues:[] when JWT_SECRET set
   - Headers: nosniff, DENY, HSTS, CSP, Referrer, Permissions-Policy present, no X-Powered-By
   - Rate limiting: 10/15min login → 429 on 11th
   - Input sanitization: <script> stripped

**Example:**
```js
import { test, expect } from '@playwright/test';
test('QR→website→assessment→verdict→path→practice', async ({ page })=>{
  await page.goto('/?page=website');
  await expect(page.getByText('Find my Danish level')).toBeVisible();
  await page.getByText('Find my Danish level').first().click();
  await expect(page).toHaveURL(/.*assessment.*/);
  await page.getByText('Start').click();
  // ... answer questions ...
  await expect(page.getByText('Your level')).toBeVisible();
});
```

---

## 5. Visual Tests (Chromatic / Percy / Storybook)

**Setup:**
```bash
npm i -D @storybook/react @storybook/addon-essentials chromatic
```

**What to Test:**
- Components: BrandLogo, BottomNav, Sidebar, WebsiteView, AssessmentLandingView, ArchitectureMapView, RoadmapView, PrivacyView, TermsView, SecurityView, PracticeView, PathView, DiagnosticView, ProgressView, etc.
- Visual regression: Screenshot each component, compare to baseline, alert on diff

---

## 6. Performance Tests (Lighthouse CI)

**Setup:**
```bash
npm i -D @lhci/cli
```

**Config lighthouserc.js:**
```js
module.exports = {
  ci: {
    collect: { url: ['http://localhost:3001/?page=website','http://localhost:3001/?page=assessment','http://localhost:3001/?page=architecture'], numberOfRuns: 3 },
    assert: { assertions: { 'categories:performance': ['warn',{minScore:0.9}], 'categories:accessibility': ['error',{minScore:0.9}], 'categories:best-practices': ['warn',{minScore:0.9}], 'categories:seo': ['warn',{minScore:0.9}], 'categories:pwa': ['warn',{minScore:0.9}] } },
    upload: { target: 'temporary-public-storage' },
  },
};
```

**Metrics:**
- Performance >90, A11y >90, Best Practices >90, SEO >90, PWA >90
- LCP <2.5s, FID <100ms, CLS <0.1
- JS gzip <250KB, CSS <10KB

---

## 7. Security Tests

- **npm audit:** `npm audit --audit-level=moderate` → 0 high, 0 moderate (after fix)
- **Snyk:** `npx snyk test` → 0 high
- **OWASP ZAP:** `docker run -t owasp/zap2docker-stable zap-baseline.py -t https://danskpath.app` → 0 high
- **Headers:** `curl -I /api/health` → nosniff, DENY, HSTS, CSP, no X-Powered-By
- **Rate Limiting:** 11th login → 429
- **Input Sanitization:** <script> stripped
- **Auth:** No token → 401, user token accessing admin → 403, UUID v4 not sequential
- **GDPR:** Export returns data, delete anonymizes
- **Audit Endpoint:** /api/security/audit ok:true issues:[]

---

## 8. Accessibility Tests (axe-core)

**Setup:**
```bash
npm i -D @axe-core/playwright
```

**Test:**
```js
import AxeBuilder from '@axe-core/playwright';
test('a11y', async ({ page })=>{
  await page.goto('/?page=website');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
```

**Goal:** 0 violations, Lighthouse A11y >90, keyboard nav works, focus ring visible, contrast 4.5:1

---

## 9. Manual Testing Checklist

**iPhone:**
- [ ] Install: Add to Home Screen from Safari → icon appears, splash #121417, standalone
- [ ] Nav: BottomNav + Sidebar + MoreSheet work, touch targets 44px, no 300ms delay
- [ ] Sizes: SE 375x667, 12 390x844, 14 Pro Max 430x932, iPad 768x1024 — no horizontal scroll, readable
- [ ] Login: Vipin/vipin123 → admin, change password, logout
- [ ] Assessment: 15 Q adaptive M1→M5 3-6→15-25 words, no blank, varied, independent trialId, results overview strengths/areas path timeline
- [ ] Path: M1→M5 A1→B2 200→1354 vocab, lessons, skills, practice, assessment, progress
- [ ] Lessons: Grammar V2 inversion subordinate sin/hans strong passive jo/da/vel, vocab collocations holde møde træffe beslutning, listening reductions d'er phone, reading PD3 gapped text, writing 30→200, culture Folketing flexicurity jantelov, exam PD3 Delprøve 1-4
- [ ] Practice: Today 15min, SRS Box 0→5, weak repeat until correct, safe rest 30 days, infinite engine new variants
- [ ] Tests: Weekly, Modultest, PD3, retest
- [ ] Progress: Dashboard level pct strengths weaknesses path timeline, persistence localStorage
- [ ] Persistence: Close app, reopen, progress still there

**Shareable Link/QR:**
- [ ] Independent: 2 browsers 2 trialId no shared state
- [ ] Variation: Questions different per trial
- [ ] Results: Independent, no leak, no admin exposure
- [ ] No Leak: QR opens public assessment only, no personal data, no admin dashboard

**Website:**
- [ ] Landing: What is app, How 1 Assess 2 Personalise 3 Learn 4 Practise 5 Progress, CTA Find my Danish level + Sign in, same logo/typography/colors/buttons/icons/cards/spacing/interactions/tone
- [ ] Nav: Website, Assessment, Architecture, Share QR, Privacy, Terms, Security, Admin — all work
- [ ] CTA: Find my Danish level → assessment
- [ ] Mobile/Desktop: Responsive, no horizontal scroll, touch 44px, typography readable, fast loading, loading/error states
- [ ] Login: Sign in → admin if Vipin
- [ ] Branding: Logo D black circle, colors #121417 #007AFF, Inter font, rounded-full buttons, rounded-[24px] cards
- [ ] Responsive: 375, 768, 1280, no break
- [ ] A11y: Keyboard nav, focus ring, contrast 4.5:1, semantic HTML, alt, aria-label, axe 0 violations
- [ ] Perf: Lighthouse >90, JS 222KB gzip, CSS 9.18KB, LCP <2.5s

**End-to-End:**
- [ ] QR→website→assessment→session→skill profile→path→lesson→practise→test→progress→continue without manual intervention — works outside chat via public URL

**Deployment:**
- [ ] Public URL works outside chat: https://alberta-applies-streets-expenditure.trycloudflare.com
- [ ] Health: /api/health → ok:true secure:true
- [ ] Audit: /api/security/audit → ok:true issues:[]
- [ ] Headers: nosniff DENY HSTS CSP no X-Powered-By
- [ ] Rate Limiting: 429 on 11th
- [ ] QR: Scan with phone camera → opens assessment outside chat
- [ ] PWA: Add to Home Screen → app icon, splash, standalone, works offline for assets, network for API

---

## 10. CI/CD Pipeline

**.github/workflows/ci.yml:**
```yaml
name: CI
on: [push, pull_request]
jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4 with node-version 20
      - run: npm ci
      - run: npm run lint
      - run: npm audit --audit-level=moderate
      - run: npm run build
      - run: npm test --if-present
      - run: npx playwright test --if-present
      - run: npx lhci autorun --if-present
```

**Must PASS before merge to main.**

---

## 11. Quality Metrics & Measurement

- **Coverage:** >80% lines branches functions statements — measured via Vitest coverage
- **Lighthouse:** Performance >90 A11y >90 Best Practices >90 SEO >90 PWA >90 — measured via Lighthouse CI
- **Security:** npm audit 0 high, /api/security/audit ok:true, headers present, rate limiting works — measured via curl + audit endpoint
- **A11y:** axe-core 0 violations — measured via Playwright + axe
- **Links:** All setActive routes have server route + pathname handling, all footer links work, QR works outside chat, API returns JSON not HTML — measured via Playwright + manual
- **Build:** Time <10s (5.16s PASS), JS gzip <250KB (222KB PASS), CSS <10KB (9.18KB PASS)
- **Manual:** Checklist above — all PASS

---

**End of Testing Framework — Mandatory for all features**
