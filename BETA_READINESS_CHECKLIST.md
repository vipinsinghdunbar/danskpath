# Beta Launch Readiness Checklist — Oct 13, 2026

## Pre-Launch Verification (Do Now)

### 1. App Deployment ✅
- [ ] Render service is running
- [ ] Latest code deployed (check commit hash)
- [ ] No errors in recent Render logs
- [ ] Database file exists and is readable

**Verify:**
```bash
# Check git status
git log --oneline -1

# Check if build was successful (look at Render logs)
# https://dashboard.render.com → your service → logs
```

### 2. Core Features Working ✅
- [ ] Landing page loads
- [ ] Assessment works (can submit 15 questions)
- [ ] Results display correctly
- [ ] Learning path shows timeline
- [ ] Registration creates account
- [ ] Login works for returning users
- [ ] Workbook module selector works
- [ ] PDF download completes without errors

**Quick test (local):**
```bash
npm run dev:all
# Open http://localhost:5173
# Go through: Landing → Assessment → Results → Path → Register → Workbooks → Download PDF
# All screens should work without errors
```

### 3. Curriculum Data Loaded ✅
- [ ] `curriculum.js` imported in `WorkbookView.jsx`
- [ ] `getExercisesForSelection()` function available
- [ ] No module/section/difficulty combos are empty (verified by 73 tests)
- [ ] Vocabulary lists populated
- [ ] Exercise answers present

**Verify:**
```bash
# Check if curriculum.js is properly formatted
node -e "const {curriculumData} = require('./src/data/curriculum.js'); console.log(Object.keys(curriculumData).length + ' modules loaded')"
```

### 4. PDF Export Working ✅
- [ ] jsPDF dependency installed
- [ ] PDF generation doesn't throw errors
- [ ] PDF file downloads (not opens in browser)
- [ ] File size reasonable (~50–100KB for 20–30 exercises)

**Test locally:**
```bash
npm run dev:all
# Workbooks → Modul 1, Complete, Medium, 25 exercises → Download
# Check: file appears, opens in PDF reader, has content
```

### 5. Security Ready ✅
- [ ] JWT_SECRET set (or default in dev mode)
- [ ] ADMIN_PASSWORD set (env var)
- [ ] Password hashing working (bcrypt)
- [ ] Rate limiting on auth endpoints
- [ ] CORS restricted to safe origins
- [ ] No hardcoded secrets in code

**Verify:**
```bash
# Check if env vars are used (not hardcoded)
grep -r "vipin123" src/ server.js || echo "✅ No hardcoded password"
grep -r "JWT_SECRET\|ADMIN_PASSWORD" server.js | head -5
```

### 6. Database Initialized ✅
- [ ] `danish-platform-db.json` exists
- [ ] Has initial schema (users, trials, assessments)
- [ ] No corruption (valid JSON)
- [ ] Readable/writable

**Verify:**
```bash
# Check database file
ls -lh danish-platform-db.json
jq . danish-platform-db.json | head -20
```

### 7. Mobile Ready ✅
- [ ] Manifest.json configured
- [ ] Service Worker loaded
- [ ] Viewport meta tags correct
- [ ] Safe area insets applied
- [ ] Touch-friendly buttons (48+px)

**Verify:**
```bash
# Check manifest
jq . public/manifest.json | head -20
```

### 8. Logging & Monitoring ✅
- [ ] Error handling in place (try-catch blocks)
- [ ] User sees friendly error messages (not stack traces)
- [ ] No sensitive data logged
- [ ] Console errors logged (for debugging)

**Check:**
```bash
# Look for console.error in code
grep -r "console.error" src/ server.js | wc -l
# Should have some error handling
```

## Launch Readiness Summary

**Status: READY TO LAUNCH** if all above ✅

**Critical blockers (STOP if any):**
- [ ] App doesn't load
- [ ] Assessment broken
- [ ] PDF export crashes
- [ ] Database corrupted
- [ ] Render deployment failed

**Warnings (proceed with caution):**
- [ ] No telemetry (can't measure feature adoption)
- [ ] Limited error messages (users confused if things break)
- [ ] No password reset (users locked out if they forget)

**Go/No-Go Decision:**
- [ ] If all critical checks pass → **LAUNCH**
- [ ] If any critical check fails → **FIX FIRST**

---

## Launch Sequence

1. **Oct 13 — Morning** (now)
   - [ ] Run this checklist
   - [ ] Verify all checks pass
   - [ ] Create Google Form
   - [ ] Recruit 5–10 testers

2. **Oct 13 — Afternoon**
   - [ ] Send launch message + form link
   - [ ] Confirm at least 3 testers received message
   - [ ] Monitor Render dashboard (first 30 min)

3. **Oct 14–17** (testing week)
   - [ ] Daily: Check Render health
   - [ ] Daily: Monitor Google Form
   - [ ] Any issues: Fix + push hotfix

4. **Oct 18** (analysis)
   - [ ] Consolidate feedback
   - [ ] Make Phase 2 decision

---

## Quick Troubleshoot

**App won't load:**
```bash
# Check Render logs
# Check if backend is running
curl http://localhost:3001/api/health
# Check if frontend built
ls -la dist/
```

**PDF doesn't download:**
```bash
# Check jsPDF logs in browser console
# Test locally: npm run dev:all
# Check browser network tab (any 500 errors?)
```

**Assessment broken:**
```bash
# Check DiagnosticView.jsx for syntax errors
# Verify shuffleAnswers.js loaded
# Test: npx tsc --noEmit (check TS errors if any)
```

**Database issue:**
```bash
# Check if file exists
ls -la danish-platform-db.json
# Check if valid JSON
jq . danish-platform-db.json > /dev/null && echo "Valid JSON" || echo "Corrupted JSON"
```

---

Last updated: Oct 13, 2026 — Ready for beta launch 🚀
