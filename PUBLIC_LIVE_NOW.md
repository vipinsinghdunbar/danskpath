# 🚀 DanskPath — LIVE PUBLIC DEPLOYMENT (Outside Chat)

## ✅ PUBLIC URL THAT WORKS OUTSIDE THIS CHAT — RIGHT NOW

**Tunnel:** localhost.run (free, public internet)
**Public URL:** `https://947fd072271093.lhr.life`
**Status:** LIVE, serving frontend + backend API
**Backend Health:** https://947fd072271093.lhr.life/api/health → {"ok":true}

### Three Experiences — Public Links:

1. **🌐 Public Website (Marketing):**
   ```
   https://947fd072271093.lhr.life/?page=website
   ```
   - What is app, how it works M1→PD3, CTA

2. **🔗 Shareable Assessment + QR (Share This Anywhere):**
   ```
   https://947fd072271093.lhr.life/?page=assessment
   ```
   - 7-min adaptive test, independent session, no admin exposed
   - **QR Code:** `public/qr-PUBLIC-ASSESSMENT.png` (600x600)
   - Scan with iPhone camera → opens assessment landing
   - Works for LinkedIn, email, presentations, print, WhatsApp

3. **📱 Full iPhone App:**
   ```
   https://947fd072271093.lhr.life/?page=practice
   ```
   - Complete M1→PD3 learning, PWA install, Add to Home Screen
   - After assessment → personal path

4. **📋 Deployment Live Page:**
   ```
   https://947fd072271093.lhr.life/DEPLOYMENT_LIVE.html
   ```
   - Shows both ephemeral and production QRs

### QR Codes — Public (Outside Chat):

- **Assessment (Share):** `public/qr-PUBLIC-ASSESSMENT.png` → https://947fd072271093.lhr.life/?page=assessment
- **Website:** `public/qr-PUBLIC-WEBSITE.png` → https://947fd072271093.lhr.life/?page=website
- **Full App:** `public/qr-PUBLIC-APP.png` → https://947fd072271093.lhr.life/?page=practice

**All QRs are 600x600, black #121417 on white, margin 2, M error correction**

### How to Share Right Now:

- **In person:** Show QR on phone, they scan camera → assessment
- **LinkedIn:** Download `qr-PUBLIC-ASSESSMENT.png` + post: "Find your Danish level — 7-min test M1→PD3 https://947fd072271093.lhr.life/?page=assessment"
- **Email:** Paste link + attach QR image
- **Presentation:** Full-screen slide with QR
- **Print:** A4 handout, poster, flyer with QR
- **Messages:** Send link on WhatsApp/SMS

### Test End-to-End Right Now (Outside Chat):

1. On your iPhone, open camera, scan QR `qr-PUBLIC-ASSESSMENT.png`
2. Opens https://947fd072271093.lhr.life/?page=assessment
3. See "Find your Danish level" landing
4. Tap "Start assessment → 7 min"
5. Enter name, when started, goal → Start
6. Answer 20 Q adaptive M1→M5 (dots Q7 of 20, feedback why)
7. Receive skill profile (strengths ≥75%, weaknesses <60%)
8. See path M1→5 (V2, collocations, listening, writing)
9. Tap "Enter personalised learning path" → practice M1→M5
10. Works without manual intervention, data saved to DB

### Why This Works Outside Chat:

- Tunnel `947fd072271093.lhr.life` → localhost:3001 (our backend)
- Backend serves both frontend `dist/` and API `/api/*`
- Public internet can access via https://947fd072271093.lhr.life
- No localhost, no 5173, no sandbox ID needed for end user
- Works on any phone, laptop, anywhere

### ⚠️ Ephemeral vs Permanent:

**Current public URL (947fd072271093.lhr.life):**
- Works outside chat RIGHT NOW
- Lasts as long as tunnel process is running (hours to days)
- Free, no account needed
- If tunnel dies, restart: `ssh -R 80:localhost:3001 nokey@localhost.run`
- For permanent (forever), deploy to Render/Vercel/Fly (see DEPLOYMENT.md)

**For Permanent (Forever, Custom Domain danskpath.app):**

1. Push to GitHub:
```bash
git init && git add . && git commit -m "DanskPath M1→PD3" && git branch -M main
# Create repo github.com/new → danskpath
git remote add origin https://github.com/YOU/danskpath.git
git push -u origin main
```

2. Deploy to Render (recommended, free, persistent DB):
- https://dashboard.render.com/blueprint/new → Connect repo → Apply (uses render.yaml)
- Public URL: https://danskpath.onrender.com
- Custom domain: Settings → Custom Domains → Add danskpath.app → CNAME to onrender.com

3. Generate permanent QR:
```bash
node -e "require('qrcode').toFile('public/qr-permanent.png', 'https://danskpath.app/?page=assessment', {width:600})"
```

### Files Ready:

- `dist/` — production build
- `public/qr-PUBLIC-*.png` — public QRs (work now)
- `public/assessment-qr-ephemeral.png` — E2B sandbox QR (works while chat open)
- `public/assessment-qr-production-final.png` — placeholder for danskpath.app
- `Dockerfile`, `render.yaml`, `vercel.json`, `fly.toml` — deployment configs
- `server.js` — production-ready (PORT env, /data disk, serves dist)
- `DEPLOYMENT.md`, `PUBLIC_DEPLOYMENT_LIVE.md`, `THREE_EXPERIENCES.md`

### Current Live Servers:

- Backend API+DB: 0.0.0.0:3001 → https://947fd072271093.lhr.life (public) + https://3001-ik1t6d5enxwfmhfkhf8wb.e2b.app (E2B preview)
- Frontend Vite: 0.0.0.0:5173 → https://5173-ik1t6d5enxwfmhfkhf8wb.e2b.app (E2B preview, dev)
- Public Tunnel: 947fd072271093.lhr.life → localhost:3001 (full-stack, public internet)

All three experiences same brand: logo D+speech+blue arrow, Inter, #121417+#007AFF, black pill buttons, 24-32px cards, iOS HIG.

### Share Now:

**Link to share:** https://947fd072271093.lhr.life/?page=assessment
**QR to share:** public/qr-PUBLIC-ASSESSMENT.png

Anyone with link or QR can test Danish level outside this chat, no account needed, independent session, no admin exposed.
