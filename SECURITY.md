# Security Policy — DanskPath

**Version:** v4 SECURE
**Last Updated:** 2026-09-27
**Contact:** security@danskpath.dk, privacy@danskpath.dk
**Security.txt:** https://danskpath.app/.well-known/security.txt (and current ephemeral URL)

---

## Supported Versions

| Version | Supported |
|---------|-----------|
| 4.x SECURE (current) | ✅ |
| 3.x | ⚠️ Upgrade to 4.x |
| <3.0 | ❌ Not supported |

---

## Reporting a Vulnerability

**Please do NOT open a public GitHub issue for security vulnerabilities.**

Instead:

1. Email **security@danskpath.dk** with subject `[SECURITY] Brief description`
2. Include:
   - Description of vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix if any
   - Your contact info

**We will:**
- Acknowledge within 24h
- Provide initial assessment within 72h
- Keep you updated on fix progress
- Credit you in SECURITY.md and CHANGELOG.md if you want (or anonymous)
- Fix critical within 7 days, high within 30 days

**Safe Harbor:** We will not take legal action against you if you follow responsible disclosure, no data exfiltration beyond proof, no DoS, no social engineering.

---

## Security Measures

### Current (v4 SECURE) — Implemented 2026-09-27

- **Headers:** X-Content-Type-Options nosniff, X-Frame-Options DENY, Referrer-Policy strict-origin-when-cross-origin, Permissions-Policy camera=() microphone=(self) geolocation=(), HSTS max-age 31536000 includeSubDomains preload in prod, CSP default-src 'self' script-src 'self' 'unsafe-inline' 'unsafe-eval' style-src 'self' 'unsafe-inline' https://fonts.googleapis.com font-src 'self' https://fonts.gstatic.com data: img-src 'self' data: blob: https: connect-src 'self' https: worker-src 'self' manifest-src 'self', remove X-Powered-By
- **CORS:** Restricted in prod to pattern trycloudflare/danskpath/render/vercel/localhost + ALLOWED_ORIGINS env, origin null allowed for mobile/curl, credentials true
- **Rate Limiting:** In-memory Map, login 10/15min, setup 5/min, trial 20/15min, cleanup 10min, 429 with retryAfter
- **Input Validation:** sanitizeString strips <> maxLen, password 3-128, name min 2 max 100, email max 200
- **Auth:** bcrypt 10 rounds, JWT 30d, JWT_SECRET env random 32+ chars, warning if default in prod, authMiddleware, adminMiddleware
- **GDPR:** DELETE /api/user/data?anonymize=true, GET /api/user/export
- **Audit:** GET /api/security/audit returns ok headers rateLimit inputValidation auth storage pii issues
- **DB:** JSON file danish-platform-db.json on /data persistent disk, permission 600 recommendation
- **PWA:** SW skips /api/*, cache-first assets, network-first navigation

### Planned / Missing (See ROADMAP.md Phase 4)

- [ ] Set JWT_SECRET env on Render (CRITICAL)
- [ ] Change admin password vipin123 (CRITICAL)
- [ ] Fix /api/trials public→admin only (HIGH)
- [ ] Password complexity min 8 upper number + reset email + 2FA TOTP for admin (HIGH)
- [ ] Migrate DB to Postgres encrypted at rest (HIGH)
- [ ] Move token from localStorage to httpOnly cookie or Capacitor Secure Storage (MEDIUM)
- [ ] Server-side LLM proxy /api/llm with env key, not client localStorage (MEDIUM)
- [ ] Audit logging Winston + Sentry error monitoring (MEDIUM)
- [ ] Helmet + hide stack traces (MEDIUM)
- [ ] npm audit fix esbuild vuln (MEDIUM)
- [ ] security.txt + CSP report-uri (LOW)
- [ ] Daily backup S3 + test restore (MEDIUM)
- [ ] CAPTCHA after 5 fails (LOW)
- [ ] DOMPurify for innerHTML (LOW)
- [ ] SRI for CDN fonts (LOW)
- [ ] Breach notification procedure 72h (MEDIUM)
- [ ] DPA template (MEDIUM)

---

## Threat Model — OWASP Top 10

See ROADMAP.md Phase 4 Security Hardening & Data Protection for full threat model with prevention and status.

Summary:
- A01 Broken Access Control: ✅ authMiddleware adminMiddleware UUID v4 — fix /api/trials public
- A02 Cryptographic Failures: ⚠️ JWT_SECRET default risk, DB plaintext, localStorage token — need env + Postgres + Secure Storage
- A03 Injection: ✅ sanitizeString, CSP — need DOMPurify
- A04 Insecure Design: ✅ Rate limiting, headers, GDPR, audit endpoint
- A05 Security Misconfiguration: ⚠️ X-Powered-By removed, CORS restricted — need helmet + hide stack
- A06 Vulnerable Components: ⚠️ esbuild moderate — need npm audit fix
- A07 Auth Failures: ⚠️ bcrypt + rate limit done — need complexity + 2FA + reset + force change default
- A08 Data Integrity: ⚠️ SW versioning — need SRI
- A09 Logging Failures: ❌ No audit logging — need Winston + Sentry
- A10 SSRF: ✅ No user-controlled fetch

---

## Data Protection

- **Collected:** name, email optional, danishStartDate, goal, assessment answers 15-20Q, feedback wouldUse/helpful/wouldPay/NPS, usage lessons/SRS/time
- **NOT Collected:** location, camera/mic (Permissions-Policy denies except explicit pronunciation), contacts, tracking across apps, ads
- **Sharing:** No third parties except hosting Render/Vercel/Fly EU Frankfurt, and OpenAI/Anthropic ONLY if user provides own API key
- **Retention:** Indefinite JSON currently — should auto-delete 2y + GDPR rights export/delete implemented
- **Legal Basis:** Consent, Legitimate interest, Contract
- **Rights:** Access via GET /api/user/export, Deletion via DELETE /api/user/data?anonymize=true or privacy@danskpath.dk, Correction in Settings, Objection via deletion, Portability via export JSON
- **Breach Notification:** Within 72h per GDPR, notify users + Datatilsynet DK if high risk

---

## Security Headers Check

```bash
curl -I https://danskpath.app/api/health
# Should return:
# X-Content-Type-Options: nosniff
# X-Frame-Options: DENY
# Referrer-Policy: strict-origin-when-cross-origin
# Permissions-Policy: camera=(), microphone=(self), geolocation=()
# Strict-Transport-Security: max-age=31536000; includeSubDomains; preload (in prod)
# Content-Security-Policy: default-src 'self'; ...
# No X-Powered-By
```

---

## Rate Limiting Check

```bash
for i in {1..11}; do curl -s -o /dev/null -w "%{http_code} " -X POST -H "Content-Type: application/json" -d '{"name":"test","password":"test"}' https://danskpath.app/api/auth/login; done
# Should return: 401 401 401 401 401 401 401 401 401 401 429
```

---

## Security Audit Endpoint

```bash
curl https://danskpath.app/api/security/audit
# Should return ok:true issues:[] when JWT_SECRET set
# {
#   "ok": true,
#   "headers": {"X-Content-Type-Options":"nosniff","X-Frame-Options":"DENY","HSTS":true,"CSP":true,"CORS-restricted":true},
#   "rateLimit": true,
#   "inputValidation": true,
#   "auth": {"jwt":true,"bcrypt":true,"expiry":"30d"},
#   "storage": {"type":"json-file","encrypted":false,"recommendation":"Use Postgres for production at scale"},
#   "pii": {"collected":["name","email","danishStartDate","goal","assessment answers"],"stored":"local JSON + localStorage","gdprReady":false},
#   "issues": []
# }
```

---

## Best Practices for Deployment

1. **Set JWT_SECRET env:** `openssl rand -base64 32` — 32+ chars random, never default
2. **Change admin password:** Vipin/vipin123 → strong password after first login, force-change UI
3. **Set ALLOWED_ORIGINS env:** `https://danskpath.app,https://www.danskpath.app`
4. **Set NODE_ENV=production:** Enables HSTS + secure headers
5. **Use /data persistent disk:** On Render, mount /data, permission 600, daily backup to S3
6. **Enable HTTPS:** Render auto HTTPS, HSTS header already added
7. **Run npm audit fix:** Fix esbuild vuln
8. **Set up UptimeRobot:** Monitor /api/health every 5min
9. **Set up Sentry:** Error monitoring
10. **Set up Plausible:** Privacy-friendly analytics, no cookies

---

## Security.txt

Located at `/.well-known/security.txt`:

```
Contact: mailto:security@danskpath.dk
Expires: 2027-09-27T00:00:00.000Z
Acknowledgments: https://danskpath.app/security
Preferred-Languages: en, da
Canonical: https://danskpath.app/.well-known/security.txt
Policy: https://danskpath.app/security
```

---

## Acknowledgments

Thanks to security researchers who report vulnerabilities responsibly.

- (Your name here if you report)

---

**End of Security Policy — Keep Updated**
