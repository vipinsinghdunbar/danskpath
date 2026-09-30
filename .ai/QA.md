# QA

## Checks the factory runs on every change
1. Lint.
2. Typecheck.
3. Unit tests.
4. Build.
5. Mobile end-to-end tests in Playwright.

If a check does not exist in this repo yet, it is listed under Known gaps in `ARCHITECTURE.md` and is not silently skipped.

Current status of each check in this repository:
1. Lint — `npm run lint` (oxlint) exists; passes with 0 errors, 65 warnings.
2. Typecheck — MISSING (CI reports a warning: check skipped).
3. Unit tests — MISSING (CI reports a warning: check skipped).
4. Build — `npm run build` (exists, passes).
5. Playwright mobile e2e — `npm run test:e2e` (added in the factory-setup PR; iPhone SE / iPhone 13 / iPhone 14 Pro Max, WebKit).

## Mobile viewports
1. iPhone SE, small screen.
2. iPhone 13, standard screen.
3. A large iPhone viewport (iPhone 14 Pro Max).

Playwright's WebKit approximates Safari but does not replace a real device. The Product Owner tests keyboard behaviour, safe areas and scrolling on a real iPhone before merge.

## Critical journeys
Taken from `PRODUCT.md`. Acceptance criteria are written as observable behaviours.

1. **Landing** — Opening `/` shows the simple landing screen with the "Take the Test" CTA; no uncaught page errors; no horizontal scrolling at any of the three viewports. — COVERED BY TEST (Playwright smoke test, all three projects).
2. **Assessment → results** — From landing, the test runs one question at a time with a progress bar; completing it shows level + section scores with strengths listed separately from focus areas. — NOT YET COVERED by automation (HTML test reports exist from manual runs).
3. **Path → continue/complete** — "Fortsæt her" opens the current step; "Markér færdig ✓" marks it done and advances to the next step; state survives reload. — NOT YET COVERED by automation.
4. **Account creation with guest transfer** — Registering after the assessment keeps the saved journey (level, scores, path) and lands on the dashboard. — NOT YET COVERED by automation.
5. **Returning login** — Login restores the current journey and opens the next exercise without repeating completed work. — NOT YET COVERED by automation.
6. **Cross-device progress sync** — Progress saved while logged in is present on another device/browser after login. — NOT YET COVERED by automation (previously verified manually — see README/commit history).
7. **Progress/reset affordances** — Progress view shows stats; the documented reset clears localStorage keys and returns to `/?page=simple-landing`. — NOT YET COVERED by automation.

## Regression rule
Every bug fix adds a test that fails without the fix, where feasible.

## Not verified rule
Every PR lists what was verified and what was not. Anything unverified is a risk the Product Owner must see.
