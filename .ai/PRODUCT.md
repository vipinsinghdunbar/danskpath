# PRODUCT

Product: DanskPath (repo `danskpath`).

Tagline from README: "Modul 1 → PD3 / A1 to B2 — Full Danish Education… Workbook, not a game. No streaks."

## Vision
UNCONFIRMED — Product Owner to confirm. (README states positioning — a full Danish education workbook for adults — but not a formal vision statement.)

## Target users
- Adults in Danish education (Danskuddannelse 1–3), from alphabet æøå to PD3 debate — CONFIRMED FROM CODE (README, curriculum docs).
- Guest-first visitors on an iPhone who want to test their level before creating an account — CONFIRMED FROM CODE (`SimpleLandingView`, PWA install banner, README core flow).
- An admin/owner account (discreet admin QR links, admin dashboard) — CONFIRMED FROM CODE (`AdminDashboardView`, `admin` route).

## Core user journeys
Journeys that exist in the code today (routes in `src/App.jsx`). Marked CONFIRMED FROM CODE or UNCONFIRMED.

1. Landing (`/` → `simple-landing`) with "Take the Test" CTA — CONFIRMED FROM CODE.
2. Level assessment: intro → one-question-at-a-time test (randomised answers) → results with section scores, strengths and focus areas — CONFIRMED FROM CODE (`AssessmentLandingView`, `InstructionsView`, `DiagnosticView`, README flow).
3. Personalised learning path (Din læringsvej, M1→PD3 timeline): "Fortsæt her" continue + "Markér færdig ✓" complete-and-advance — CONFIRMED FROM CODE (`PathView`, `RoadmapView`).
4. Create account (username/password) with atomic transfer of guest journey data — CONFIRMED FROM CODE (`RegisterView`, `auth.js`, README).
5. Login for returning learners → current journey → exercise → progress without repeating — CONFIRMED FROM CODE (`LoginView`, `auth.js`).
6. Exercises and skill areas: grammar, vocabulary, listening, speaking, reading, writing, pronunciation, culture, exam, practice — CONFIRMED FROM CODE (route switch in `App.jsx`).
7. Progress tracking: dashboard, progress view, repetition/retention, server sync across devices ("Fortsæt her" persists) — CONFIRMED FROM CODE (`Dashboard`, `ProgressView`, localStorage keys + `/api` sync; cross-device persistence documented in commit history).
8. Admin dashboard + share/QR flows — CONFIRMED FROM CODE (`admin`, `share`, `share-qr`, `AdminDashboardView`).
9. Privacy/security self-service: policy pages, data export, delete/anonymise trials — CONFIRMED FROM CODE (`PrivacyView`, `SecurityView`, `src/lib/api.js` endpoints).
10. PWA install on iPhone ("Add to Home Screen") — CONFIRMED FROM CODE (`PWAInstallBanner`; real-device behaviour not verified by automation).

Onboarding = journeys 1→4 (guest-first: value before account). Current in-app state is tracked in localStorage (`dansk_progress`, `path`, `scores`, `srs`, `seen`, `level`, `diagnostic`, `verdict`, `user_seed`, `welcomed`, `token`, `user` — from README reset instructions).

## Product principles
1. Product before code: understand the problem before changing the implementation.
2. Mobile-first: iPhone behaviour is a first-class requirement.
3. Preserve existing functionality unless the request says otherwise.
4. Small, testable, reversible changes.

Additional product rules stated in the README (CONFIRMED): guest-first (no account before value), no dead ends / clear next action every screen, workbook not game, no streaks, avoid negative language about weak areas.

## Current priorities
UNCONFIRMED — Product Owner to confirm. (Root-level docs reference an App Store checklist, public deployment and security audits; which of these are current priorities is not confirmed.)
