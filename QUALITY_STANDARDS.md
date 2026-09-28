# 📏 Quality Standards — DanskPath (Mandatory)

**Version:** v4 SECURE
**Last Updated:** 2026-09-27
**Enforcement:** CI must PASS, PR requires 1 review, branch protection main

---

## 1. Linting & Formatting

- **ESLint:** `oxlint` + `eslint` with `eslint-config-react-app` + `eslint-plugin-security`
  - Config: `.eslintrc.json` — extends react-app, security, import
  - Rules: no-console in prod (warn), no-unused-vars error, no-var error, prefer-const, no-eval error, no-implied-eval error, no-new-func error
- **Prettier:** `.prettierrc` — semi false, singleQuote true, tabWidth 2, printWidth 100, trailingComma es5
- **Pre-commit:** husky + lint-staged — `npx mrm@2 lint-staged` — runs eslint --fix + prettier --write on staged files
- **EditorConfig:** `.editorconfig` — charset utf-8, indent_style space, indent_size 2, end_of_line lf, insert_final_newline true, trim_trailing_whitespace true

**Check:**
```bash
npm run lint
npx prettier --check "src/**/*.{js,jsx,json,md}"
```

---

## 2. Code Style

- **JS:** 2 spaces, single quotes, no semicolons (or with — pick one, currently with), 100 char line, no console.log in prod (use logger), no unused vars, no any in TS, no var only const/let, no == only ===, no implicit any
- **React:** Functional components only, hooks (useState, useEffect, useMemo, useCallback), no class components, PropTypes or TypeScript for props, ErrorBoundary for every route, lazy loading for heavy components (DiagnosticView lazy), memo for heavy, useMemo/useCallback for expensive, no inline functions in render for heavy (useCallback), no inline objects for heavy (useMemo)
- **Security:** No hardcoded secrets (use env), sanitize input via sanitizeString, no innerHTML without DOMPurify, no eval, no dangerouslySetInnerHTML without sanitization, no user-controlled fetch without validation
- **Performance:** Code splitting manualChunks (vendor, react, etc.), lazy, image optimization (webp, size), font-display swap, bundle JS gzip <250KB, CSS <10KB, LCP <2.5s, FID <100ms, CLS <0.1, no large dependencies, tree-shaking
- **Accessibility:** aria-label for icons, keyboard nav tabIndex, focus ring visible, color contrast 4.5:1, semantic HTML (header, nav, main, footer, button not div), alt for images, axe-core audit >90, test with keyboard only, screen reader
- **Git:** Conventional commits `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`, `perf:`, `security:`, PR template `.github/pull_request_template.md`, CODEOWNERS `.github/CODEOWNERS`, branch protection main requires 1 review + CI PASS + no direct push, semantic versioning, CHANGELOG.md Keep a Changelog
- **Documentation:** JSDoc for every exported function, README for each lib, ADR in `/docs/adr/`, CHANGELOG.md, ROADMAP.md updated every feature

---

## 3. React Specific

- **Components:** 1 component per file, PascalCase, hooks at top, no nested components, props destructured, default props via default params, no prop drilling >2 levels (use context or Zustand)
- **State:** useState for local, useContext or Zustand for global, localStorage for persistence with try/catch, no Redux unless needed
- **Effects:** useEffect with deps array, cleanup, no infinite loops, no missing deps (eslint exhaustive-deps)
- **Styling:** Tailwind utility, no CSS files unless needed, iOS design system colors #121417 #007AFF #F2F2F7 #5856D6 #34C759 #FF9500, rounded-full buttons, rounded-[24px] cards, shadow, backdrop-blur, Inter font, no inline styles unless dynamic
- **Error Handling:** ErrorBoundary for every route, try/catch for async, loading states, error states, fallback UI, Sentry for prod errors
- **Performance:** memo for heavy components, useMemo for expensive calc, useCallback for callbacks passed to memo, lazy + Suspense for heavy routes, no anonymous functions in render for heavy

---

## 4. Security Standards

- **Secrets:** No hardcoded JWT_SECRET, API keys, passwords — use env, .env.example with placeholder, .env in .gitignore, check via `grep -r "sk-" src/` in CI
- **Input:** sanitizeString for all user input, maxLen checks, no <>, no eval, no innerHTML without DOMPurify
- **Auth:** bcrypt 10 rounds, JWT 30d, httpOnly cookie or Secure Storage for native, not localStorage for prod native, rate limiting, 2FA for admin, password complexity min 8 upper number, reset email
- **Headers:** helmet or manual headers nosniff DENY HSTS CSP Referrer Permissions-Policy, remove X-Powered-By, CORS restricted
- **Dependencies:** npm audit 0 high, Snyk, Dependabot weekly, no unused deps, no large deps
- **Logging:** No sensitive data in logs (password, token, PII), audit.log for admin actions, Sentry for errors, no console.log in prod

---

## 5. Performance Budget

- **JS:** gzip <250KB (currently 222KB PASS), main chunk <500KB (currently 853KB raw but 222KB gzip — need manualChunks to split)
- **CSS:** gzip <10KB (currently 9.18KB PASS)
- **Images:** webp, <100KB each, lazy loading, width/height, alt
- **Fonts:** Inter via Google Fonts with display=swap, preconnect, no custom fonts unless needed
- **Build Time:** <10s (currently 5.16s PASS)
- **LCP:** <2.5s, FID <100ms, CLS <0.1 — measured via Lighthouse CI
- **Bundle Analysis:** `npx vite-bundle-visualizer` or `rollup-plugin-visualizer`

**Enforcement:** CI fails if JS gzip >250KB or CSS >10KB or Lighthouse <90

---

## 6. Accessibility

- **Axe-core:** 0 violations, run via Playwright + axe
- **Keyboard:** All interactive elements keyboard accessible, tab order logical, focus ring visible, no keyboard trap
- **Screen Reader:** aria-label for icons, alt for images, semantic HTML, headings h1→h2→h3, no div as button
- **Contrast:** 4.5:1 for text, 3:1 for large text, check via axe or Figma
- **Touch:** 44px min touch target, tested on iPhone
- **Lighthouse A11y:** >90

---

## 7. Git & Project Management

- **Commits:** Conventional commits, e.g., `feat: add roadmap view`, `fix: broken links in server.js`, `security: add rate limiting`, `docs: update roadmap`
- **PR Template:** `.github/pull_request_template.md` — What, Why, How, Testing, Security, Quality, Links
- **CODEOWNERS:** `.github/CODEOWNERS` — `* @vipinsinghdunbar`
- **Branch Protection:** main requires 1 review + CI PASS + no direct push, require linear history, require conventional commits
- **Versioning:** Semantic versioning 0.0.0 → 1.0.0 Web Launch → 2.0.0 Native → 3.0.0 Growth, CHANGELOG.md
- **Roadmap:** ROADMAP.md updated every feature — mandatory, with achieved/missing/next, progress %, links
- **Projects:** GitHub Projects board To Do, In Progress, Review, Done, sprints 2 weeks, milestones
- **Changelog:** CHANGELOG.md Keep a Changelog format

---

## 8. Documentation

- **JSDoc:** For every exported function, e.g., `/** Calculate result from answers @param {Object} answers @returns {Object} */`
- **README:** For each lib in src/lib/README.md
- **ADR:** Architecture Decision Records in /docs/adr/ — e.g., 001-use-json-file-db.md, 002-use-jwt-not-session.md
- **CHANGELOG:** Keep a Changelog, version, date, Added/Changed/Fixed/Security
- **ROADMAP:** This file + ROADMAP.md updated every feature

---

## 9. Quality Metrics & Measurement

- **Build:** Time <10s, size JS gzip <250KB, CSS <10KB — measured via `npm run build` output
- **Test Coverage:** >80% — measured via Vitest coverage
- **Lighthouse:** Performance >90, A11y >90, Best Practices >90, SEO >90, PWA >90 — measured via Lighthouse CI
- **Security:** npm audit 0 high, /api/security/audit ok:true, headers present, rate limiting works — measured via curl + audit endpoint
- **Accessibility:** axe-core 0 violations — measured via Playwright + axe
- **Code Review:** 1 reviewer mandatory, no direct push to main — measured via GitHub branch protection
- **Documentation:** JSDoc for all exported functions, README for each lib — measured via lint
- **Performance Budget:** Enforced via CI, fail if JS >250KB gzip

**Current Quality (v4 SECURE):**
- Build 5.16s PASS, JS 222KB gzip PASS, CSS 9.18KB PASS
- Test coverage 92% (68/74) but no Vitest framework — need to add
- Lighthouse not run — need CI
- Security audit ok:true PASS, headers PASS, rate limit PASS, no X-Powered-By PASS, GDPR export/delete PASS
- No CI pipeline — need to add
- No lint config — need .eslintrc

---

## 10. Enforcement

- **Pre-commit:** husky + lint-staged runs eslint --fix + prettier --write
- **CI:** .github/workflows/ci.yml runs lint, audit, build, test, Playwright, Lighthouse — must PASS
- **PR:** Requires 1 review, CI PASS, no direct push to main
- **Main:** Protected, requires linear history, conventional commits
- **Quality Gate:** If any metric fails, PR blocked

**Next Steps:**
- Create .eslintrc.json, .prettierrc, .editorconfig, husky, lint-staged
- Add Vitest + RTL + Supertest + Playwright tests
- Add .github/workflows/ci.yml
- Add ErrorBoundary + Sentry
- Define performance budget in package.json
- Add GitHub Projects, CHANGELOG, CODEOWNERS, PR template

---

**End of Quality Standards — Mandatory for all code**
