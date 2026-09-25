# DanskPath — Modul 1 → PD3 / A1 to B2 — Full Danish Education

Modern Danish learning platform for adults on Danskuddannelse 1-3. From alphabet æøå to PD3 debate with jo/da/vel. Workbook, not a game. No streaks.

## 🌟 Three Experiences, One Product

```
                    DANISH LEARNING PRODUCT
                             │
            ┌────────────────┼────────────────┐
            │                │                │
         WEBSITE          ASSESSMENT       iPHONE APP
            │                │                │
       Learn about it     Test Danish       Full learning
            │                │                │
            └───────────────┼────────────────┘
                            │
                    SHARED ACCOUNT /
                    LEARNER SYSTEM
```

### 1. 🌐 Public Website
- **Entry:** `/?page=website` or `/`
- Marketing intro, what is app, how it works M1→PD3, CTA

### 2. 🔗 Shareable Assessment + QR
- **Entry:** `/?page=assessment` or `/assessment`
- **Shareable URL:** `https://danskpath.app/?page=assessment`
- **QR Code:** Scan to test Danish level, independent session per learner
- 7-min adaptive test, 20 Q, M1→M5, 5,100+ variants, no admin exposed

### 3. 📱 Full iPhone App (PWA)
- **Entry:** `/?page=practice` or Add to Home Screen
- Complete M1→PD3: alphabet SVO 30-50 → V2 60-80 → subordinate 80-120 → sin/hans 120-150 → PD3 debate 150-200
- Grammar infinite engine, Vocab SRS Box 0→5, Listening, Reading, Writing, Speaking, Progress
- PWA: app icon, manifest, sw.js, iOS install banner, offline

## 🚀 Quick Start

```bash
npm ci
npm run build
npm start
# Frontend: http://localhost:5173
# Backend: http://localhost:3001
# Health: http://localhost:3001/api/health
```

Admin: Vipin / vipin123 (change after first login)

## 📦 Deployment

### Render (Recommended, Free, Persistent DB, Frankfurt)
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://dashboard.render.com/blueprint/new)

- `render.yaml` included — one-click blueprint
- Free: 750h/month, 1GB disk, sleeps after 15 min
- Starter $7/month: always-on, no sleep, custom domain danskpath.app
- Cost: $0/month + $12/year domain, or $7/month + $12/year for always-on

```bash
git push origin main # Render auto-deploys
```

### Vercel (Fast CDN)
```bash
npm i -g vercel
vercel --prod
# Public URL: https://danskpath.vercel.app
```

### Fly.io (Closest to Copenhagen — Stockholm region)
```bash
fly launch --copy-config
fly volumes create danskpath_data --region arn --size 1
fly deploy
# Public URL: https://danskpath.fly.dev
```

### Docker
```bash
docker build -t danskpath .
docker run -d -p 3001:3001 -v /data:/data -e NODE_ENV=production danskpath
```

## 🔗 QR Codes

After deployment, generate QR for assessment:

```bash
node -e "require('qrcode').toFile('public/qr-assessment.png', 'https://danskpath.app/?page=assessment', {width:600})"
```

Share: LinkedIn, email, presentations, print, WhatsApp, in-person.

## 🎨 Brand Identity

- Logo: D + speech bubble + blue arrow forward, black #121417 + blue #007AFF, works at 24px
- Typography: Inter + SF Pro, iOS HIG
- Colors: bg #F2F2F7, card white, ink black, accent #007AFF, success #34C759
- Design System: `src/lib/designSystem.js`

## 📱 iPhone PWA

- Manifest: `public/manifest.json`
- Service Worker: `public/sw.js` v4
- Icons: 60,120,180,192,512,1024 + apple-touch-icon
- Install: Safari → Share ⎙ → Add to Home Screen

## 🧪 Testing

- Website: `/?page=website`
- Assessment: `/?page=assessment`
- Full App: `/?page=practice`
- Testing Guide: `/TESTING_GUIDE.html`
- Live Deployment: `/LIVE_NOW.html` + `/DEPLOYMENT_LIVE.html`

## 📂 Structure

- `src/components/WebsiteView.jsx` — Public website
- `src/components/AssessmentLandingView.jsx` — Shareable assessment + QR
- `src/components/BrandLogo.jsx` — New logo
- `src/App.jsx` — Three experiences routing
- `src/lib/stageEngine.js` — M1→M5 full education
- `server.js` — Express API + DB + serves dist
- `danish-platform-db.json` — Portable DB (users, trials, assessments)

## 💰 Cost

- Free: $0/month + $12/year domain (Render free sleeps)
- Production: $7/month + $12/year = $96/year (always-on, recommended for QR)
- Proper: $15-20/month + $12/year (100+ users, real Postgres)

See `DEPLOYMENT.md` for details.

## 👤 Author

Vipin Singh Dunbar — vipinsinghdunbar

Full Danish education Modul 1→PD3, A1→B2, built for adults with job and family.
