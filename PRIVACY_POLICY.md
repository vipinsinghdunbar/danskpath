# Privacy Policy — DanskPath

**Effective Date:** September 27, 2026
**App Name:** DanskPath — Modul 1 til PD3
**Company / Contact:** Vipin Singh Dunbar, Copenhagen, DK — privacy@danskpath.dk
**Website:** https://danskpath.app (or current public URL)

---

## 1. Overview

DanskPath is an educational app helping adults learn Danish from Modul 1 (A1) to PD3 (B2). We respect your privacy and collect minimal data necessary for learning.

**No ads. No tracking across apps. No sale of data.**

---

## 2. Data We Collect

### a) You Provide
- **Name** — to personalize learning path
- **Email** (optional) — for account recovery, progress sync
- **Danish start date** — to tailor timeline
- **Learning goal** (e.g., child_school, job_interview, pd3)
- **Assessment answers** — 15-20 questions to determine level
- **Feedback** — wouldUse, helpful, wouldPay, NPS (optional)

### b) Automatically
- **App usage** — lessons completed, SRS box level, time spent (stored locally + server)
- **Technical** — IP address for rate limiting (not stored long-term), device type for PWA compatibility

### c) We Do NOT Collect
- Location (no GPS)
- Camera / Microphone (Permissions-Policy denies, except when you explicitly use pronunciation practice — audio stays on device unless you enable AI feedback)
- Contacts, photos, files
- Precise health, financial data
- Data from other apps

---

## 3. How We Use Data

- Determine your Danish level (Modul 1-5)
- Generate personal learning path (grammar, vocab, listening, etc.)
- Track progress (SRS boxes, streak-free)
- Improve curriculum (aggregated, anonymized)
- Provide support if you contact us

**Legal Basis (GDPR):**
- Consent — when you start assessment
- Legitimate interest — personalization
- Contract — if you create account

---

## 4. Sharing

We do **NOT** share your personal data with third parties, except:

- **Hosting:** Render.com / Vercel / Fly.io — stores JSON DB on persistent disk `/data`, EU region Frankfurt (if configured)
- **If you enable AI feedback:** Your writing/speaking may be sent to OpenAI or Anthropic **only if you provide your own API key** in Settings. In that case, data goes to OpenAI/Anthropic under their privacy policy. We recommend using server-side proxy in future to avoid client-side key exposure.

No analytics SDK, no ads SDK, no Facebook SDK.

---

## 5. Storage & Retention

- **Current:** JSON file `danish-platform-db.json` on server disk. No encryption at rest yet — planned for Postgres migration.
- **Local:** Progress also stored in browser localStorage (`dansk_path`, `dansk_vocab_progress`, etc.) — stays on your device.
- **Retention:** Trials and assessments kept until you request deletion, or auto-deleted after 2 years (planned). You can delete anytime via Settings or `DELETE /api/user/data`.

---

## 6. Your Rights (GDPR)

You have the right to:
- **Access** — `GET /api/user/export` — download your data JSON
- **Deletion** — `DELETE /api/user/data?anonymize=true` or email privacy@danskpath.dk
- **Correction** — update name/email in Settings
- **Objection** — stop processing by deleting account
- **Portability** — export JSON

Contact: **privacy@danskpath.dk** — response within 30 days.

For EU complaints: Datatilsynet (Denmark) https://www.datatilsynet.dk

---

## 7. Children

Not directed to children under 13. Danish education is for adults (Danskuddannelse). If you are under 13, do not use.

---

## 8. Security

- Passwords hashed with bcrypt
- JWT tokens 30-day expiry, stored in localStorage (PWA) — ensure device is secure
- HTTPS enforced in production (HSTS)
- Rate limiting on login
- Security headers: CSP, X-Frame-Options DENY, etc.

No system is 100% secure. If breach occurs, we will notify within 72h per GDPR.

---

## 9. International Transfers

Data stored in EU (Render Frankfurt) if configured. If using US hosting, data may be transferred to US under Standard Contractual Clauses.

---

## 10. Changes

We will notify via app banner or email if privacy policy changes materially.

---

## 11. Contact

**Privacy:** privacy@danskpath.dk
**Support:** support@danskpath.dk
**Address:** Copenhagen, Denmark

---

## App Store Privacy Nutrition Label (for Apple / Google)

- **Contact Info:** Name, Email — optional, for account
- **User Content:** Assessment answers, writing attempts — for education
- **Usage Data:** Product interaction (lessons completed) — for progress
- **Diagnostics:** Crash logs (if Sentry added) — for stability
- **No Tracking**

Data linked to user: Yes (if account). Data not linked: If anonymous assessment (trial without email).
Data used for tracking: No.
