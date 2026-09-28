# Data Safety — DanskPath (for Google Play)

**App:** DanskPath — Modul 1 til PD3
**Package:** dk.danskpath.app (proposed)
**Last Updated:** 2026-09-27

## Data Collection Declaration

### Does app collect or share data? YES — minimal for education.

### Data Types Collected

#### Personal Info
- **Name** — optional, user provided — for personalization — collected, not shared, encrypted in transit (HTTPS), deletable
- **Email** — optional — for account — collected, not shared, encrypted, deletable

#### App Activity
- **App interactions** — lessons completed, assessment answers, time spent — for progress & curriculum improvement — collected, not shared, deletable

#### App Info and Performance
- **Crash logs** — if Sentry added in future — for stability — currently NOT collected (no SDK)
- **Diagnostics** — IP for rate limiting, not stored — NOT collected long-term

### Data Shared with Third Parties
- **NO** — No data shared with third parties, except hosting provider (Render) storing DB, and OpenAI/Anthropic ONLY if user provides own API key and enables AI feedback.

### Security Practices
- Data encrypted in transit: YES (HTTPS + HSTS)
- Data encrypted at rest: Partial (JSON file not encrypted, but disk encrypted by host; plan Postgres with encryption)
- User can request deletion: YES — DELETE /api/user/data
- User can request data export: YES — GET /api/user/export
- Follows Play Families Policy: No, not child-directed, 13+

### Tracking
- No tracking across apps or websites
- No ads SDK
- No analytics SDK currently (future: Plausible privacy-friendly)

### For Apple Privacy Label

- **Contact Info:** Name, Email — linked to user, not used for tracking
- **User Content:** Assessment answers — linked, not tracking
- **Usage Data:** Product interaction — linked, not tracking
- **Diagnostics:** Crash — not linked, not tracking (if added)

---

## Permissions Requested

- **Internet** — for API calls
- **No location, camera, mic** — except optional mic for pronunciation (on-device, not uploaded unless AI enabled)

---

## Compliance

- GDPR: Yes, with rights to access, deletion, export
- COPPA: Not child-directed
- No financial data, no health data

---

## How to Fill Play Console Data Safety Form

1. Does app collect/share data? **Yes**
2. Is all data encrypted in transit? **Yes**
3. Can users request deletion? **Yes**
4. Select types: Name, Email, App activity → App interactions, In-app search history (assessment)
5. Purposes: App functionality, Analytics (aggregated), Personalization
6. Is data shared? **No** (except hosting)
7. Tracking? **No**
