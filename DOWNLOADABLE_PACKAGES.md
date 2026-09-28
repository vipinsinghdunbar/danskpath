# 📦 Downloadable Packages — DanskPath

## 1. PWA Zip (Ready to Download Now)

**What:** Full app + API + DB, runs anywhere Node.js runs

**Build:**
```bash
npm ci
npm run build
# dist/ contains PWA + assets + QR codes
# server.js serves dist + API on PORT env
```

**Run:**
```bash
JWT_SECRET=$(openssl rand -base64 32) NODE_ENV=production PORT=3001 node server.js
# Open http://localhost:3001
# PWA installable via browser → Add to Home Screen
```

**Zip Contents:**
- dist/ — built PWA (index.html, assets, manifest, icons, sw.js, QR)
- public/ — icons, manifest, QR
- server.js — Express API + DB (secure version with headers, rate limit)
- package.json, package-lock.json
- Dockerfile, render.yaml, vercel.json, fly.toml
- danish-platform-db.json (example empty DB)

**Download:** Created as `danskpath-pwa-v4.zip` (see below)

---

## 2. Docker Image (Ready)

**Dockerfile:**
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
ENV NODE_ENV=production
ENV PORT=3001
EXPOSE 3001
CMD ["node", "server.js"]
```

**Build & Run:**
```bash
docker build -t danskpath .
docker run -p 3001:3001 -e JWT_SECRET=$(openssl rand -base64 32) -e NODE_ENV=production -v $(pwd)/data:/data danskpath
```

**Push to Docker Hub:**
```bash
docker tag danskpath vipinsinghdunbar/danskpath:latest
docker push vipinsinghdunbar/danskpath:latest
```

---

## 3. Android TWA (Trusted Web Activity) — Fastest to Play Store

**Why TWA:** Google allows PWA to be published to Play Store as TWA — no native code, uses Chrome, feels native, 5min setup.

**Steps:**
```bash
npm i -g @bubblewrap/cli
# Ensure manifest.json is public at https://danskpath.app/manifest.json
bubblewrap init --manifest https://danskpath.app/manifest.json
# Follow prompts: package dk.danskpath.app, name DanskPath, etc.
bubblewrap build
# Generates app/build/outputs/bundle/release/app-release-bundle.aab
# Upload AAB to Play Console → Internal Testing
```

**Requirements:**
- Permanent domain with HTTPS (not ephemeral trycloudflare.com)
- Asset Links: https://danskpath.app/.well-known/assetlinks.json (Bubblewrap generates, host it)

---

## 4. Capacitor Native (Full Native, iOS + Android)

**Setup:**
```bash
npm i @capacitor/core @capacitor/cli @capacitor/ios @capacitor/android @capacitor/splash-screen @capacitor/status-bar
npx cap init DanskPath dk.danskpath.app --web-dir=dist
npx cap add ios
npx cap add android
npm run build
npx cap sync
```

**iOS:**
```bash
npx cap open ios
# Xcode opens → select Team → set signing → Product → Archive → Distribute → TestFlight
```

**Android:**
```bash
npx cap open android
# Android Studio → Build → Generate Signed Bundle/APK → create keystore → build AAB → upload to Play Console
```

**Config:** See `capacitor.config.json` — already created with appId dk.danskpath.app, splash #121417, etc.

---

## 5. Static Hosting Only (No API)

If you only need Website + Assessment without backend (uses localStorage only):

```bash
npm run build
# Upload dist/ to Netlify, Vercel, Cloudflare Pages, GitHub Pages
# No server needed, but no admin, no trials DB
# For full functionality, need server.js
```

---

## 6. Download Links (Local)

After `npm run build`, you have:

- **dist/** — PWA ready, 5.1M, includes:
  - index.html, manifest.json, sw.js
  - icon-60..1024.png, apple-touch-icon.png
  - assets/*.js/css
  - qr-*.png, assessment-qr-*.png
  - LIVE_NOW.html, DEPLOYMENT_LIVE.html

- **public/** — source assets, QR codes

**To create zip:**
```bash
zip -r danskpath-pwa-v4.zip dist public server.js package.json package-lock.json Dockerfile render.yaml vercel.json fly.toml capacitor.config.json PRIVACY_POLICY.md TERMS.md DATA_SAFETY.md SECURITY_AUDIT_LAUNCH_READINESS.md -x "node_modules/*" ".git/*"
ls -lh danskpath-pwa-v4.zip
```

---

## 7. What Works Outside Chat

**Current Ephemeral (works now, expires when tunnel dies):**
https://barbie-proteins-wallpaper-jacket.trycloudflare.com
- Website: /?page=website
- Assessment: /?page=assessment
- Architecture: /?page=architecture
- App: /?page=practice

QR codes in `public/qr-LIVE-ASSESSMENT.png` and `public/qr-ARCHITECTURE.png` point to ephemeral URL — works on any phone now.

**Permanent (after you deploy to Render):**
https://danskpath.app (once you buy domain + deploy)
- Same routes, permanent QR, no expiry

---

## 8. For Your Request: "Give me just a download"

**Option A — PWA Zip:** I will create `danskpath-pwa-v4.zip` now — you can download from workspace files, unzip, run `node server.js`, or upload dist to any static host.

**Option B — APK/AAB:** Cannot generate signed APK without Android keystore + Android Studio, but TWA guide above gives you AAB in 10min once you have permanent domain.

**Option C — IPA:** Cannot generate without Mac + Xcode + Apple Developer account, but Capacitor guide above does it.

**Best Immediate Download:** PWA Zip + Docker — works everywhere, installable as app via Add to Home Screen, which is how iPhone PWAs work (Apple allows PWA install without App Store).

---

## 9. Security for Downloads

- Zip contains no secrets — JWT_SECRET must be set via env
- Default admin Vipin/vipin123 must be changed after first run
- DB file is JSON, permission 600 recommended
- For production, set NODE_ENV=production for HSTS + secure headers

See SECURITY_AUDIT_LAUNCH_READINESS.md for full audit.
