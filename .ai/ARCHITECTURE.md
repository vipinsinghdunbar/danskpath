# ARCHITECTURE AND ENGINEERING RULES

## Stack
All items confirmed from the repository unless marked otherwise.

- **Front end**: React 19 + Vite 5 single-page app (`src/`), Tailwind CSS 3 with PostCSS/autoprefixer, plain JSX (no TypeScript). Mobile-first, PWA install banner; Capacitor config exists for a native wrapper (`capacitor.config.json`).
- **Back end**: Express 5 (`server.js`) with `bcryptjs` (passwords), `jsonwebtoken` (JWT sessions), `cors`, `qrcode`, JSON file storage (`danish-platform-db.json`, git-ignored; example committed).
- **Lint/format**: `oxlint` (active — `npm run lint`), plus `.eslintrc.json` and `.prettierrc` configs present (tooling wiring not fully verified — UNCONFIRMED how they are used).
- **AI feature (optional)**: user-supplied API key stored in localStorage (`dansk_llm`), BYOK — no secrets in code (verified in `src/lib/llm.js`).
- **State/persistence**: localStorage (journey, scores, SRS, token, user) + server sync via `/api` for logged-in users.
- **Packaging**: Dockerfile, `fly.toml`, Capacitor; multiple committed release archives (`danskpath-*.zip/.tar.gz`).
- **Hosting**: Render (live per README), Netlify/Vercel/Fly scripts present; CI deploy via `.github/workflows/deploy.yml`.
- **Package manager**: npm (`package-lock.json`).

## Structure
```
src/
  App.jsx             Route switch (~35 named views/pages) + app state
  components/         All view components (landing, assessment, path, exercises, admin, …)
  hooks/, lib/, data/ Hooks; api/auth/llm helpers; curriculum data
  index.css, App.css  Tailwind + custom styles
server.js             Express API (auth, health, trials, user data export/delete, sync)
public/               Static pages incl. many HTML reports/QR/samples (see Known gaps)
.github/workflows/    deploy.yml (existing deploy) + ci.yml (added by this PR)
docs at repo root     ~30 markdown docs (README, ROADMAP, TESTING_FRAMEWORK, SECURITY, …)
samples/, screenshots/ Sample content and screenshots
danish-platform-db.example.json  Example DB file (real DB git-ignored)
```

## Data and integrations
- **Storage**: JSON file DB (`danish-platform-db.json`) via `server.js`; browser localStorage for guest/offline state. (Postgres mentioned in roadmap docs as planned — UNCONFIRMED, not present in code.)
- **Auth**: username/password → bcrypt hash → JWT (`Authorization: Bearer …`).
- **API surface**: `/api/health`, `/api/auth/*` (setup/register/login/me), `/api/user/*` (export/delete), `/api/trials/*`, `/api/security/audit` (confirmed from `grep`; full list in `server.js`).
- **Optional external AI**: OpenAI chat completions with user-provided key (`src/lib/llm.js`).
- **Environment variables** (names only): `PORT`, `NODE_ENV`, `JWT_SECRET`, `ALLOWED_ORIGINS`, `VERCEL_URL`. No `.env.example` exists — see Known gaps.

## Commands
Exactly as found in `package.json` (added by this PR where marked).

| Purpose | Command | Status |
|---|---|---|
| Install | `npm ci` | exists |
| Dev server (front end) | `npm run dev` (Vite, 0.0.0.0:5173) | exists |
| Dev server (back end) | `npm run dev:backend` (`node server.js`) / `npm run dev:all` (both) | exists |
| Lint | `npm run lint` (`oxlint`) | exists |
| Typecheck | — | MISSING (plain JSX, no TS) |
| Unit tests | — | MISSING (no test script/files) |
| End-to-end | `npm run test:e2e` (`playwright test`) | added by this PR (MISSING prior) |
| Build | `npm run build` (vite build) | exists |
| Preview | `npm run preview` | exists |
| Start (prod) | `npm start` / `npm run start:prod` | exists (needs `JWT_SECRET` env) |

## Conventions
Observed in the existing code — follow them:

- Plain JSX in `src/components/` (PascalCase file names, one view per component); no TypeScript.
- Routing is a central `switch` on a page string in `src/App.jsx` (query/path based), not a router library.
- Tailwind utility classes inline; small custom CSS in `App.css`/`index.css`.
- Guest-first data in localStorage with explicit keys; keep those keys stable (the README documents them for reset).
- API calls centralised in `src/lib/api.js`/`auth.js`; `.catch(()=>{})`-style graceful degradation when offline.
- README must stay current (its core-flow section is treated as the product spec).

## Engineering rules
1. Inspect before changing. Reuse existing patterns and components.
2. Feature branches named `factory/<short-slug>`. Never commit to `main`.
3. No new dependency without stated reason and Product Owner approval.
4. Keep changes small and reversible.
5. Update `.ai/` documents in the same PR when behaviour, structure or decisions change.
6. Secrets only through environment variables. Keep `.env.example` current (none exists yet — see Known gaps).

## Known gaps
1. **No typecheck** — plain JSX without TypeScript; CI reports it as a skipped check (warning), not a pass.
2. **No unit or integration tests** — `TESTING_FRAMEWORK.md` and HTML test reports exist, but there is no automated test runner. CI's `npm test --if-present` reports MISSING until a runner is added (Product Owner decision — new dependency gate).
3. **Lint warnings**: 65 oxlint warnings remain (0 errors after this PR fixes one parse error). Not failing CI, but worth a cleanup task.
4. **Existing CI runs no tests** — `.github/workflows/deploy.yml` builds and deploys on push to `main` without lint/test gates. This PR adds `ci.yml` alongside it (deploy untouched); merging still triggers deploy — see PR risks.
5. **No `.env.example`** — env var names are listed in this file only.
6. **Committed release archives** — `danskpath-*.zip/.tar.gz` (~multi-MB) and many HTML report pages live in git; bloats the repo (candidate for cleanup — Product Owner decision).
7. **LLM feature** stores a user API key in localStorage — acceptable BYOK, but flagged for security review if the feature ships broadly.
8. **No secrets scanning / dependency scanning** in CI.
