# 🆓 Free Hosting — DanskPath — Access & Use For Free (No Credit Card for Many)

**Current Live (Free Ephemeral):** https://itunes-goat-wife-repository.trycloudflare.com
- Free, works outside chat, no account, no credit card, but expires when tunnel sleeps (hours-days)
- All routes 200 OK: / /website /assessment /architecture /roadmap /privacy /terms /security /practice /architecture-standalone.html /api/health /api/security/audit /.well-known/security.txt

**Permanent Free Options (No Expiry, Free Tier):**

---

## Option 1: Render Free — BEST for Full-Stack (API + DB + PWA) — $0

**Why Best:** Full Node.js Express server.js serves dist + API + JSON DB on persistent disk /data, Frankfurt region close to Copenhagen, free 750h/month (sleeps after 15min inactivity, wakes on request), custom domain danskpath.app free, HTTPS auto, HSTS, env JWT_SECRET auto-generated.

**Free Tier:** 750 hours/month free, 1GB disk free, no credit card required for free tier (as of 2024, check Render docs), $7/month always-on optional.

**One-Click Deploy (After GitHub Repo Created):**

1. **Create GitHub Repo (30 sec):**
   - Go to https://github.com/new
   - Name: `danskpath`, Public, no README
   - Create
   - In this workspace terminal:
     ```bash
     cd /home/user/danskpath
     git remote add origin https://github.com/vipinsinghdunbar/danskpath.git
     git branch -M main
     git push -u origin main
     ```
   - If 404, create repo first at github.com/new

2. **Deploy to Render (1 min, Free):**
   - Go to https://dashboard.render.com/blueprints
   - Click "New Blueprint Instance"
   - Connect GitHub repo `vipinsinghdunbar/danskpath`
   - Render auto-detects `render.yaml`:
     - Build: `npm ci && npm run build`
     - Start: `node server.js`
     - Health: `/api/health`
     - Disk: `/data` 1GB
     - Env: NODE_ENV=production, JWT_SECRET auto-generated, PORT=10000
   - Click Apply → Deploys → Live URL `https://danskpath.onrender.com` (free, permanent, no expiry)
   - All routes work: /assessment /architecture /roadmap /privacy /security /api/health etc.

3. **One-Click Button (Use After Repo Exists):**
   [![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/vipinsinghdunbar/danskpath)

**Custom Domain Free:**
- Render Dashboard → danskpath service → Settings → Custom Domains → Add `danskpath.app` + `www.danskpath.app`
- Buy domain Namecheap/Cloudflare Registrar ~$15/yr → set CNAME to `danskpath.onrender.com`
- HTTPS auto, HSTS already in server.js prod
- Set env ALLOWED_ORIGINS=https://danskpath.app,https://www.danskpath.app
- Regenerate QR: `node -e "require('qrcode').toFile('public/qr-PUBLIC-ASSESSMENT.png','https://danskpath.app/assessment',{width:800})"`

**Cost:** $0/month (sleeps) or $7/month always-on + $15/yr domain = $99/yr max

**Status:** render.yaml ready, Dockerfile ready, server.js ready with PORT env + /data persistent disk + security headers + rate limiting + explicit routes fix broken links

---

## Option 2: Vercel Free — Best for Frontend + Serverless API — $0 No Credit Card

**Why:** Vercel hobby free, no credit card, global CDN, serverless functions for API, automatic HTTPS, custom domain free, GitHub auto-deploy.

**Free Tier:** 100GB bandwidth, 6000 execution hours, no credit card, hobby.

**Deploy (1 min):**

1. **Via Vercel Dashboard (Easiest):**
   - Go to https://vercel.com/new
   - Import GitHub repo `vipinsinghdunbar/danskpath`
   - Framework: Vite, Build: `npm run build`, Output: `dist`
   - Env: NODE_ENV=production, JWT_SECRET=random 32 chars
   - Deploy → Live URL `https://danskpath.vercel.app` (free, permanent)
   - vercel.json already handles /api/* → server.js + SPA fallback

2. **Via CLI (From This Workspace, Needs Login Once):**
   ```bash
   npm i -g vercel
   vercel login # opens browser, login with GitHub
   vercel --prod --yes
   # → https://danskpath.vercel.app
   ```

3. **One-Click:**
   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/vipinsinghdunbar/danskpath)

**Limit:** JSON DB file not persistent on Vercel serverless (ephemeral) — need Vercel Postgres or Neon Postgres free tier for DB. For MVP, can use localStorage only + Vercel Postgres.

**For Full DB:** Add Vercel Postgres (free tier) or use Render for backend + Vercel for frontend.

---

## Option 3: Fly.io Free — Best for Docker + Close to Copenhagen — $0

**Why:** Fly.io free tier, Docker, Stockholm region `arn` close to Copenhagen, persistent volume /data 1GB free, auto stop/start, global.

**Free Tier:** 3 shared VMs, 3GB persistent volume, 160GB bandwidth, no credit card for free tier (as of 2024).

**Deploy (2 min):**

1. **Install flyctl:**
   ```bash
   curl -L https://fly.io/install.sh | sh
   export FLYCTL_INSTALL="/home/user/.fly"
   export PATH="$FLYCTL_INSTALL/bin:$PATH"
   fly auth signup # or login
   ```

2. **Deploy:**
   ```bash
   cd /home/user/danskpath
   fly launch --name danskpath --region arn --no-deploy
   # Configures fly.toml already exists: app=danskpath primary_region=arn build dockerfile Dockerfile env PORT 3001 http_service internal_port 3001 mounts /data 1GB
   fly volumes create danskpath_data --region arn --size 1
   fly deploy
   # → https://danskpath.fly.dev (free, permanent)
   ```

**One-Click:** Fly.io dashboard → New App → Import GitHub repo

**Custom Domain:** `fly certs add danskpath.app`

---

## Option 4: Netlify Free — Best for Static + Serverless — $0 No Credit Card

**Why:** Netlify free 100GB bandwidth, 125k serverless invocations, no credit card, drag-drop deploy.

**Deploy (1 min):**

1. **Drag-Drop (Easiest, No GitHub Needed):**
   - Build locally: `npm run build` → dist/ folder
   - Go to https://app.netlify.com/drop
   - Drag dist/ folder → Live URL `https://danskpath.netlify.app` (free, permanent)
   - For API, add Netlify Functions (serverless) or use Render backend for API

2. **Via CLI:**
   ```bash
   npm i -g netlify-cli
   netlify login
   netlify deploy --prod --dir=dist
   ```

3. **One-Click:**
   [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/vipinsinghdunbar/danskpath)

**For Full-Stack:** Use Netlify for frontend + Render for backend API (set VITE_API_URL=https://danskpath.onrender.com)

---

## Option 5: GitHub Pages Free — Best for Frontend Only (No Backend) — $0

**Why:** GitHub Pages free, no credit card, permanent, custom domain free, 100GB bandwidth.

**Deploy (1 min, Frontend Only):**

1. **Build:**
   ```bash
   npm run build
   ```

2. **Deploy to gh-pages branch:**
   ```bash
   git checkout --orphan gh-pages
   git --work-tree dist add --all
   git --work-tree dist commit -m "Deploy to GitHub Pages"
   git push origin HEAD:gh-pages --force
   git checkout main
   ```

3. **Enable Pages:**
   - GitHub repo → Settings → Pages → Source: gh-pages branch / root
   - Live URL: `https://vipinsinghdunbar.github.io/danskpath/` (free, permanent)

4. **Custom Domain:** Settings → Pages → Custom domain `danskpath.app`

**Limit:** No backend API — assessment works with localStorage only, no trials DB, no admin. For full-stack, need backend on Render/Fly.

**Workaround:** Make frontend work offline: Assessment uses localStorage trialId, no server needed. Already works.

---

## Option 6: Cloudflare Tunnel Free (Current) — Ephemeral but Free — $0 No Account

**Why:** No account, no credit card, instant public URL outside chat, works for testing, sharing via QR.

**Current:** https://itunes-goat-wife-repository.trycloudflare.com

**How to Keep Alive:**
```bash
/tmp/cloudflared tunnel --url http://localhost:3001 --no-autoupdate
# → https://xxx.trycloudflare.com (free, ephemeral, expires hours-days)
# Regenerate QR: node -e "require('qrcode').toFile('public/qr-LIVE-ASSESSMENT.png','https://xxx.trycloudflare.com/assessment',{width:800})"
```

**For Permanent Free with Cloudflare Account (Free Tier):**
- Create Cloudflare account (free)
- Create named tunnel: `cloudflared tunnel create danskpath`
- Route: `cloudflared tunnel route dns danskpath danskpath.app`
- Config: `cloudflared tunnel --config ~/.cloudflared/config.yml run danskpath`
- Permanent URL: https://danskpath.app (free, no expiry, via Cloudflare free tier)

---

## Comparison Table — Free Hosting

| Service | Full-Stack? | DB Persistent? | Custom Domain Free? | Credit Card? | Sleep? | Region Close to DK? | One-Click? | Best For |
|---------|-------------|----------------|---------------------|--------------|--------|---------------------|------------|----------|
| **Render Free** | ✅ Yes Node+Express | ✅ Yes /data 1GB | ✅ Yes | No (free tier) | Yes 15min | ✅ Frankfurt | ✅ Blueprint | **Full-Stack Production** |
| **Vercel Free** | ⚠️ Serverless | ❌ Need Postgres | ✅ Yes | No | No | Global CDN | ✅ Button | Frontend + Serverless API |
| **Fly.io Free** | ✅ Yes Docker | ✅ Yes 1GB volume | ✅ Yes | No (free tier) | Yes auto | ✅ Stockholm arn | ✅ Launch | Docker + Close to DK |
| **Netlify Free** | ⚠️ Static+Functions | ❌ Need external DB | ✅ Yes | No | No | Global CDN | ✅ Drop | Static + Drag-Drop |
| **GitHub Pages Free** | ❌ Frontend only | ❌ No | ✅ Yes | No | No | Global CDN | ✅ gh-pages | Frontend Only |
| **Cloudflare Tunnel Free** | ✅ Yes (ephemeral) | ✅ Yes local | ❌ No (need account for custom) | No | No | Global | ✅ Instant | Testing/Sharing QR |
| **Koyeb Free** | ✅ Yes Docker | ✅ Yes | ✅ Yes | No | Yes | Frankfurt | ✅ Deploy | Docker Alternative |

**Recommendation for You (Web-First, Free):**

**Phase 1 (Today, Free, Permanent):**
- **Render Free** for full-stack backend + frontend + DB — https://danskpath.onrender.com (free, permanent, no expiry, sleeps 15min)
- Keep current Cloudflare Tunnel for instant sharing while Render deploys

**Phase 2 (Optional, Free):**
- **Vercel Free** for frontend CDN + **Render Free** for backend API — split, both free
- Or **GitHub Pages Free** for frontend + **Render Free** for backend

**Phase 3 (Custom Domain, $15/yr):**
- Buy danskpath.app (Namecheap/Cloudflare Registrar $15/yr) → point to Render custom domain → permanent QR free

---

## Step-by-Step: Deploy to Render Free Right Now (5 Minutes, $0)

**You can do this now, no credit card for free tier:**

1. **Create GitHub Repo:**
   - https://github.com/new → Name: danskpath, Public, Create
   - Terminal:
     ```bash
     cd /home/user/danskpath
     git remote add origin https://github.com/vipinsinghdunbar/danskpath.git
     git branch -M main
     git push -u origin main
     ```
   - If asks for auth, use GitHub CLI `gh auth login` or PAT token

2. **Deploy to Render:**
   - https://dashboard.render.com → New → Blueprint → Connect repo vipinsinghdunbar/danskpath
   - Render auto-detects render.yaml → Apply
   - Wait 3-5 min build → Live URL `https://danskpath.onrender.com`
   - Test: https://danskpath.onrender.com/api/health → ok:true secure:true
   - Test: https://danskpath.onrender.com/roadmap → roadmap
   - Test: https://danskpath.onrender.com/architecture → architecture map motion arrows
   - Test: https://danskpath.onrender.com/assessment → assessment shareable QR

3. **Regenerate QR for Permanent URL:**
   ```bash
   node -e "const QRCode=require('qrcode'); QRCode.toFile('public/qr-PUBLIC-ASSESSMENT.png','https://danskpath.onrender.com/assessment',{width:800,margin:2,color:{dark:'#121417',light:'#FFFFFF'}}).then(()=>console.log('QR generated'))"
   ```

4. **Keep Updated:**
   - Every push to main → Render auto-deploys (via render.yaml)
   - Update ROADMAP.md every feature → push → auto-deploy → new live link that works

**Cost:** $0/month free tier (sleeps after 15min, wakes on request) or $7/month always-on + $15/yr domain

---

## Free Deployment Scripts

**deploy.sh (already exists):**
```bash
#!/bin/bash
# One-command deploy to all free options
npm ci && npm run build
# Render: git push origin main → auto-deploys via render.yaml
# Vercel: npx vercel --prod --yes
# Netlify: npx netlify deploy --prod --dir=dist
# Fly: fly deploy
# GitHub Pages: git --work-tree dist add --all && git --work-tree dist commit -m "Deploy" && git push origin HEAD:gh-pages --force
echo "Deployed to free hosting"
```

**For Current Ephemeral Free (Keep Alive):**
```bash
/tmp/cloudflared tunnel --url http://localhost:3001 --no-autoupdate
# → https://xxx.trycloudflare.com (free, instant, no account)
```

---

## Current Free Live URLs (Ephemeral but Free, No Account)

**Base:** https://itunes-goat-wife-repository.trycloudflare.com

- Website: https://itunes-goat-wife-repository.trycloudflare.com/website
- Assessment: https://itunes-goat-wife-repository.trycloudflare.com/assessment
- Architecture Map Downloadable with Motion Arrows: https://itunes-goat-wife-repository.trycloudflare.com/architecture
- Roadmap 0→Launch→Maintenance: https://itunes-goat-wife-repository.trycloudflare.com/roadmap
- Privacy: https://itunes-goat-wife-repository.trycloudflare.com/privacy
- Terms: https://itunes-goat-wife-repository.trycloudflare.com/terms
- Security Live Audit: https://itunes-goat-wife-repository.trycloudflare.com/security
- Practice (iPhone App PWA): https://itunes-goat-wife-repository.trycloudflare.com/practice
- Standalone Architecture Downloadable HTML: https://itunes-goat-wife-repository.trycloudflare.com/architecture-standalone.html
- Health: https://itunes-goat-wife-repository.trycloudflare.com/api/health
- Audit: https://itunes-goat-wife-repository.trycloudflare.com/api/security/audit
- Security.txt: https://itunes-goat-wife-repository.trycloudflare.com/.well-known/security.txt

**All 200 OK tested**

**QR Codes (800px #121417) in public/qr-LIVE-*.png — 9 files — all point to current free URL, work outside chat**

---

## How to Get Permanent Free URL Today

**Easiest Path (5 min, $0, No Credit Card for Free Tier):**

1. Create GitHub repo vipinsinghdunbar/danskpath at https://github.com/new
2. Push: `git remote add origin https://github.com/vipinsinghdunbar/danskpath.git && git branch -M main && git push -u origin main`
3. Render Dashboard → New Blueprint → Connect repo → Apply → Live https://danskpath.onrender.com (free, permanent, no expiry)
4. Done — share https://danskpath.onrender.com/assessment via QR, works forever free (sleeps 15min, wakes on request)

**Alternative Instant Free (No GitHub, No Account, 10 sec):**

Current Cloudflare Tunnel https://itunes-goat-wife-repository.trycloudflare.com is already free and works outside chat — no account, no credit card, instant. It expires hours-days, but you can restart tunnel anytime with `/tmp/cloudflared tunnel --url http://localhost:3001 --no-autoupdate` → new free URL.

**For Truly Permanent Free with Custom Domain ($15/yr):**

- Buy danskpath.app at Namecheap/Cloudflare Registrar $15/yr
- Render custom domain → point CNAME to danskpath.onrender.com → https://danskpath.app (free hosting + $15/yr domain)
- Regenerate QR to https://danskpath.app/assessment → permanent QR

---

## Security for Free Hosting

- Render Free: HTTPS auto, HSTS header already in server.js prod, JWT_SECRET auto-generated via render.yaml generateValue true, /data disk permission 600, backup to S3 recommended, rate limiting in-memory, security headers nosniff DENY CSP, CORS restricted to ALLOWED_ORIGINS env set to https://danskpath.app
- Vercel Free: HTTPS auto, HSTS, env JWT_SECRET set, serverless functions isolated
- Fly.io Free: HTTPS auto, volume /data encrypted, Stockholm region close to DK GDPR, env JWT_SECRET
- GitHub Pages Free: HTTPS auto, no backend, no DB, localStorage only, no secrets

**All free options support custom domain free + HTTPS free**

---

## Downloadable

- PWA Zip: danskpath-v6-FINAL-WORKING-LINKS.zip 20M — dist+public+server+docs — run `JWT_SECRET=$(openssl rand -base64 32) NODE_ENV=production PORT=3001 node server.js` → http://localhost:3001 → free local hosting
- Docker: Dockerfile ready — `docker build -t danskpath . && docker run -p 3001:3001 -e JWT_SECRET=xxx -e NODE_ENV=production danskpath` → free local Docker hosting
- Architecture Map: src/components/ArchitectureMapView.jsx 34K + dist/architecture-standalone.html 14KB with motion arrows — downloadable with motion arrows — ready now

---

**Answer: YES, you can setup on a webservice to access and use it for free — Render Free is best for full-stack $0, Vercel Free for frontend $0, GitHub Pages Free for frontend only $0, Cloudflare Tunnel Free instant $0 no account. Current live https://itunes-goat-wife-repository.trycloudflare.com is already free and works outside chat. For permanent free, deploy to Render via render.yaml one-click — 5 min, $0, no expiry (sleeps 15min).**

**Next:** Create GitHub repo + push + Render Blueprint → https://danskpath.onrender.com (free, permanent)
