# 🚀 DanskPath — LIVE Public Links (Right Now) + Permanent Deployment

## ⚠️ Why links didn't work before
- Previous links were `localhost:5173` and `localhost:3001` — only work inside this chat sandbox
- They die when chat closes
- You need **public internet hosting** outside this chat

## ✅ LIVE Links That Work RIGHT NOW (Ephemeral — while this chat is open)

**Sandbox ID:** `ik1t6d5enxwfmhfkhf8wb`
**Expires:** When this chat session ends

### Three Experiences:

1. **🌐 Public Website:**
   ```
   https://5173-ik1t6d5enxwfmhfkhf8wb.e2b.app/?page=website
   ```
   - Marketing intro, what is app, how it works, CTA

2. **🔗 Shareable Assessment + QR (Share This):**
   ```
   https://5173-ik1t6d5enxwfmhfkhf8wb.e2b.app/?page=assessment
   ```
   - QR code file: `/public/assessment-qr-ephemeral.png`
   - Scan with iPhone camera → opens assessment landing
   - Works for LinkedIn, email, presentations, print RIGHT NOW

3. **📱 Full iPhone App:**
   ```
   https://5173-ik1t6d5enxwfmhfkhf8wb.e2b.app/?page=practice
   ```
   - After assessment, or direct
   - Add to Home Screen → appears like real app

4. **📋 Testing Guide:**
   ```
   https://5173-ik1t6d5enxwfmhfkhf8wb.e2b.app/TESTING_GUIDE.html
   ```

### QR Code for NOW (Ephemeral):
![QR Ephemeral](./public/assessment-qr-ephemeral.png)
- File: `public/assessment-qr-ephemeral.png` (4.3KB, 600x600)
- Points to: `https://5173-ik1t6d5enxwfmhfkhf8wb.e2b.app/?page=assessment`
- **Test it:** Open camera, scan, it opens assessment

**⚠️ This QR dies when chat closes. For permanent QR, deploy below.**

---

## 🔒 Permanent Deployment (Works Outside Chat Forever)

You need to host on Render, Vercel, or Fly.io — **free, 5-10 minutes**.

### Quickest: Render (Recommended)

**Why Render:**
- Free tier 750h/month (always on)
- Persistent disk for DB (trials saved)
- Custom domain `danskpath.app` support
- Auto-deploy from GitHub
- Frankfurt region (close to Copenhagen)

**Steps:**

1. **Create GitHub repo:**
   ```bash
   cd /home/user/danskpath
   git init
   git add .
   git commit -m "DanskPath M1→PD3 full education + 3 experiences + deployment"
   git branch -M main
   # Go to https://github.com/new → create danskpath repo
   git remote add origin https://github.com/YOUR_USERNAME/danskpath.git
   git push -u origin main
   ```

2. **Deploy to Render:**
   - Go to https://dashboard.render.com/blueprint/new
   - Connect GitHub → select `danskpath` repo
   - Render reads `render.yaml` automatically
   - Click **Apply**
   - Wait 3-5 min

3. **Your permanent URLs:**
   ```
   https://danskpath.onrender.com
   https://danskpath.onrender.com/?page=website
   https://danskpath.onrender.com/?page=assessment  ← QR points here
   https://danskpath.onrender.com/?page=practice
   ```

4. **Custom domain danskpath.app (optional):**
   - Render Dashboard → Your service → Settings → Custom Domains → Add `danskpath.app`
   - DNS: Add CNAME `danskpath.app` → `danskpath.onrender.com`
   - Or if using Cloudflare: CNAME + proxy
   - Wait 5 min for SSL

5. **Generate permanent QR:**
   ```bash
   npm install qrcode
   node -e "require('qrcode').toFile('public/assessment-qr-permanent.png', 'https://danskpath.app/?page=assessment', {width:600, margin:2, color:{dark:'#121417', light:'#FFFFFF'}})"
   # Or for Render URL:
   node -e "require('qrcode').toFile('public/qr-render.png', 'https://danskpath.onrender.com/?page=assessment', {width:600})"
   ```

### Alternative: Vercel (Fastest CDN)

```bash
npm i -g vercel
vercel login
vercel --prod
# Public URL: https://danskpath.vercel.app
```

### Alternative: Fly.io (Closest to Copenhagen)

```bash
curl -L https://fly.io/install.sh | sh
fly auth login
fly launch --copy-config
fly volumes create danskpath_data --region arn --size 1
fly deploy
# Public URL: https://danskpath.fly.dev
```

---

## 📦 What's Ready for Deployment

All files already created:

- ✅ `Dockerfile` — production container (Node 20 Alpine, serves dist + API)
- ✅ `render.yaml` — one-click Render blueprint
- ✅ `vercel.json` — Vercel static + serverless routes
- ✅ `fly.toml` — Fly.io Stockholm region
- ✅ `server.js` — production-ready (PORT env, /data persistent disk, serves dist)
- ✅ `dist/` — built frontend (3.3KB index + 213KB gzip JS)
- ✅ `package.json` scripts: `build`, `start`, `deploy:render`, `deploy:vercel`, `deploy:fly`
- ✅ `deploy.sh` — helper script
- ✅ `DEPLOYMENT.md` — detailed guide

---

## 🎯 After Permanent Deployment — Update QR

Once you have `https://danskpath.onrender.com` or `https://danskpath.app`:

1. **Generate new QR codes:**
   ```bash
   node - << 'JS'
   const QR=require('qrcode');
   const urls = {
     'public/qr-website.png': 'https://danskpath.app/?page=website',
     'public/qr-assessment.png': 'https://danskpath.app/?page=assessment',
     'public/qr-app.png': 'https://danskpath.app/?page=practice',
   };
   for (const [file, url] of Object.entries(urls)) {
     QR.toFile(file, url, {width:600, margin:2, color:{dark:'#121417', light:'#FFFFFF'}})
       .then(()=>console.log(file, url));
   }
   JS
   ```

2. **Share QR:**
   - **In person:** Show phone with QR, they scan camera
   - **LinkedIn:** Post image `qr-assessment.png` + link `https://danskpath.app/?page=assessment` + text "Find your Danish level — 7-min test M1→PD3"
   - **Email:** Attach QR + link
   - **Presentation:** Full-screen slide with QR
   - **Print:** A4 handout, poster, flyer with QR
   - **Messages:** Send link on WhatsApp/SMS

3. **Test end-to-end:**
   - Scan QR → website → assessment → trialId created → 20 Q adaptive → skill profile → path M1→5 → practice → progress

---

## 🔐 Privacy & Separation

- **Public website:** no auth, marketing only
- **Assessment:** no auth, independent trialId per learner, no admin exposed, questions public no answers
- **Full app:** localStorage diagnostic, no admin required, or login Vipin/vipin123 for admin
- **Admin:** /?page=admin requires JWT role admin, sees anonymized trials only
- **DB:** `danish-platform-db.json` portable, or /data persistent disk on Render/Fly

---

## 📱 iPhone App — Add to Home Screen

After permanent deployment:

1. Open `https://danskpath.app/?page=practice` on iPhone Safari
2. Tap Share button ⎙ (bottom)
3. Tap **Add to Home Screen**
4. Tap Add
5. Icon appears on home screen, opens fullscreen like real app, works offline

PWA features: manifest.json, sw.js v4 cache, apple-touch-icon, standalone display, install banner.

---

## ✅ Immediate Action for You

**Right now, test ephemeral (works for next few hours):**

1. Open: https://5173-ik1t6d5enxwfmhfkhf8wb.e2b.app/?page=assessment
2. Scan QR: `public/assessment-qr-ephemeral.png` (in this workspace)
3. Complete assessment, see path

**For permanent (works forever outside chat):**

1. Push to GitHub: `git init && git add . && git commit -m "deploy" && git push`
2. Deploy to Render: https://dashboard.render.com/blueprint/new → connect repo → Apply
3. Get permanent URL: `https://danskpath.onrender.com`
4. Generate permanent QR: `node -e "require('qrcode').toFile('public/qr-permanent.png', 'https://danskpath.onrender.com/?page=assessment', {width:600})"`
5. Share permanent QR anywhere

**Total time:** 10 minutes, free, permanent.

---

## 📂 Files to Download

From this workspace `/home/user/danskpath/`:

- `dist/` — production build
- `public/assessment-qr-ephemeral.png` — QR that works NOW
- `public/assessment-qr-production-final.png` — QR placeholder for danskpath.app
- `Dockerfile`, `render.yaml`, `vercel.json`, `fly.toml`
- `DEPLOYMENT.md`, `THREE_EXPERIENCES.md`, `PUBLIC_DEPLOYMENT_LIVE.md`
- `server.js`, `package.json`

Download entire folder or push to GitHub.

---

## Need Help Deploying?

All configs ready. Just need GitHub repo + Render account (free).

If you want me to prepare GitHub repo now, say "prepare github repo" and I'll init git and create bundle.
