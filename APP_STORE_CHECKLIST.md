# App Store & Play Store Launch Checklist — DanskPath

## PWA (Ready Now) ✅

- [x] manifest.json v4 with icons 60→1024 maskable
- [x] sw.js cache + network fallback
- [x] HTTPS via Cloudflare Tunnel + Render
- [x] Apple touch icon, theme color #121417
- [x] Installable via Add to Home Screen
- [x] Live URL: https://barbie-proteins-wallpaper-jacket.trycloudflare.com

**You can share this now — works outside chat.**

---

## Permanent Domain (Next)

- [ ] Buy danskpath.app (or danskpath.dk) — Namecheap / Cloudflare Registrar ~$15/yr
- [ ] Render → Custom Domain → add danskpath.app + www.danskpath.app
- [ ] Set DNS CNAME to Render
- [ ] Enable auto HTTPS (Render provides)
- [ ] Set env ALLOWED_ORIGINS=https://danskpath.app,https://www.danskpath.app
- [ ] Set env JWT_SECRET=openssl rand -base64 32
- [ ] Update QR codes to permanent URL

---

## Apple App Store (iOS) — Steps

### 1. Accounts & Identifiers
- [ ] Enroll Apple Developer Program $99/yr — developer.apple.com
- [ ] Create App ID: dk.danskpath.app
- [ ] Create App in App Store Connect: DanskPath, Danish education, 4+, no IAP yet

### 2. Capacitor Setup (Do This Now)
```bash
npm i @capacitor/core @capacitor/cli @capacitor/ios @capacitor/android
npx cap init DanskPath dk.danskpath.app --web-dir=dist
npx cap add ios
npx cap add android
npm run build
npx cap sync
npx cap open ios  # opens Xcode
```

### 3. Xcode Configuration
- [ ] Team signing — select your Apple Developer team
- [ ] Bundle ID dk.danskpath.app
- [ ] Version 1.0.0, Build 1
- [ ] Display Name DanskPath
- [ ] Icons: Use icon-1024.png no alpha (remove transparency in Preview)
- [ ] Launch Screen: Use SplashScreen plugin, background #121417
- [ ] PrivacyInfo.xcprivacy — create file:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict>
  <key>NSPrivacyTracking</key><false/>
  <key>NSPrivacyCollectedDataTypes</key><array>
    <dict><key>NSPrivacyCollectedDataType</key><string>NSPrivacyCollectedDataTypeName</string>
    <key>NSPrivacyCollectedDataTypeLinked</key><true/>
    <key>NSPrivacyCollectedDataTypeTracking</key><false/>
    <key>NSPrivacyCollectedDataTypePurposes</key><array><string>NSPrivacyCollectedDataTypePurposeAppFunctionality</string></array></dict>
  </array>
</dict></plist>
```

### 4. App Store Assets
- [ ] Screenshots: iPhone 6.7" (1290x2796), 6.5" (1284x2778), 5.5" (1242x2208), iPad 12.9" (2048x2732) — use screenshots/ + simulator
- [ ] App Icon 1024x1024 no alpha
- [ ] Description: "Moderne dansk læring M1→PD3, 7-min test, personal sti, 15min/day, ingen streaks"
- [ ] Keywords: dansk, danish, PD3, Danskuddannelse, Modul
- [ ] Privacy Policy URL: https://danskpath.app/privacy
- [ ] Support URL: https://danskpath.app/support
- [ ] Age Rating: 4+

### 5. TestFlight
- [ ] Archive in Xcode → Distribute → TestFlight
- [ ] Add internal testers (your email)
- [ ] Test on real iPhone via TestFlight app
- [ ] External testing if needed

### 6. Submission
- [ ] Fill Privacy Nutrition Label (App Privacy)
- [ ] No encryption export: No
- [ ] Submit for Review

**Estimated Time:** 1-2 days after Capacitor setup

---

## Google Play Store (Android) — Steps

### 1. Account
- [ ] Google Play Console $25 one-time — play.google.com/console
- [ ] Create App: DanskPath, dk.danskpath.app, Education

### 2. Capacitor Android
```bash
npx cap add android
npx cap sync
npx cap open android  # opens Android Studio
```

### 3. Android Studio
- [ ] Sync Gradle
- [ ] Set signing key: Build → Generate Signed Bundle/APK → Create keystore
- [ ] Enable Play App Signing (recommended)
- [ ] Target API 34+ (Capacitor default)
- [ ] App icon 512x512, feature graphic 1024x500 (create in Figma)

### 4. Alternative: TWA (Faster, PWA to Play Store)
```bash
npm i -g @bubblewrap/cli
bubblewrap init --manifest https://danskpath.app/manifest.json
bubblewrap build
# Generates signed AAB
```
TWA is Google-approved way to publish PWA to Play Store — no native code needed.

### 5. Play Assets
- [ ] Screenshots: Phone 16:9, Tablet 16:9
- [ ] Feature Graphic 1024x500
- [ ] Description short (80 chars) + full (4000 chars)
- [ ] Privacy Policy URL
- [ ] Data Safety form (see DATA_SAFETY.md)
- [ ] Content Rating IARC questionnaire
- [ ] Target audience 18+

### 6. Tracks
- [ ] Internal Testing → upload AAB
- [ ] Test on device
- [ ] Production → rollout

**Estimated Time:** 1 day via TWA, 2 days via Capacitor

---

## Security Before Submission

- [x] Security headers added
- [x] Rate limiting added
- [x] CORS restricted
- [x] Input sanitization
- [x] GDPR export/delete endpoints
- [ ] Set JWT_SECRET env (CRITICAL)
- [ ] Change admin password
- [ ] npm audit fix
- [ ] Add /privacy and /terms routes in App.jsx
- [ ] Migrate DB to Postgres for scale (optional for v1, required for >1000 users)

---

## Domain & Hosting Permanent

**Render (Recommended):**
- Free tier Frankfurt $0, $7 always-on
- render.yaml already exists
- Steps: GitHub repo vipinsinghdunbar/danskpath → Render New Web Service → Build npm ci && npm run build → Start node server.js → env PORT=10000, JWT_SECRET=xxx, NODE_ENV=production, ALLOWED_ORIGINS=https://danskpath.app

**Vercel Alternative:**
- vercel.json exists, serverless, but needs DB migration to Vercel Postgres

**Fly.io Alternative:**
- fly.toml exists, fly deploy, volume for /data

---

## Downloadable Packages

See DOWNLOADABLE_PACKAGES.md
