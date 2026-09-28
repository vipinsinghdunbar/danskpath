# GitHub Setup for vipinsinghdunbar/danskpath

## Repo Status: Ready to Push (Local Git Committed)

Local repo: /home/user/danskpath
- 2 commits, main branch
- Remote: https://github.com/vipinsinghdunbar/danskpath.git
- Bundle: /tmp/danskpath.bundle (13MB)
- Zip: /tmp/danskpath-github.zip (13MB)

GitHub repo does NOT exist yet (API returns 404). You need to create it.

## Option 1: Create via GitHub Web (2 min, Easiest)

1. Go to https://github.com/new
2. Owner: vipinsinghdunbar
3. Repository name: `danskpath`
4. Description: `DanskPath — Modul 1→PD3 full Danish education, 3 experiences: website, assessment QR, iPhone PWA`
5. Visibility: Public
6. **DO NOT** initialize with README, .gitignore, license (we already have)
7. Click **Create repository**

8. Then push from this workspace (or your local machine):

```bash
cd /home/user/danskpath
# If you downloaded zip, extract and cd into it

# Push (will ask for username + PAT)
git push -u origin main
```

**GitHub will ask for:**
- Username: vipinsinghdunbar
- Password: **Use Personal Access Token (PAT), not your GitHub password**

Create PAT:
- Go to https://github.com/settings/tokens/new
- Note: danskpath-deploy
- Expiration: 90 days
- Scopes: repo (full control)
- Generate token → Copy token (starts with ghp_)
- Use that as password when pushing

After push, your repo will be at:
https://github.com/vipinsinghdunbar/danskpath

## Option 2: GitHub CLI (If you have gh installed)

```bash
# Install gh: https://cli.github.com/
gh auth login
# Choose GitHub.com, HTTPS, Yes, Paste token

# Create repo and push in one command:
cd /home/user/danskpath
gh repo create vipinsinghdunbar/danskpath --public --source=. --remote=origin --push --description "DanskPath — Modul 1→PD3 full Danish education, 3 experiences"
```

## Option 3: Upload Zip via Web (No Git Needed)

1. Download file: /tmp/danskpath-github.zip (from this workspace)
2. Go to https://github.com/vipinsinghdunbar/danskpath (after creating empty repo)
3. Click "uploading an existing file" or drag zip contents
4. Commit

## After Pushing — Enable Deployments

### GitHub Pages (Free, Frontend Only, Offline Mode)
- Repo → Settings → Pages
- Source: GitHub Actions (we have .github/workflows/deploy.yml)
- Custom domain (optional): danskpath.app
- Your URL: https://vipinsinghdunbar.github.io/danskpath/?page=assessment
- Cost: $0

### Render (Free, Full-Stack with Backend + DB, Recommended)
- Go to https://dashboard.render.com/blueprint/new
- Connect GitHub → Select vipinsinghdunbar/danskpath
- Render auto-reads render.yaml
- Click Apply
- Wait 3-5 min
- Your URL: https://danskpath.onrender.com
- Assessment: https://danskpath.onrender.com/?page=assessment
- QR: Generate via `node -e "require('qrcode').toFile('qr.png', 'https://danskpath.onrender.com/?page=assessment', {width:600})"`
- Cost: $0/month free (sleeps), $7/month always-on

### Vercel (Fast CDN)
- Go to https://vercel.com/new
- Import GitHub repo vipinsinghdunbar/danskpath
- Framework: Vite
- Deploy
- URL: https://danskpath.vercel.app

## Current Live Public (While This Chat Open)

- Cloudflare Tunnel: https://manchester-brighton-winning-edward.trycloudflare.com
- Assessment: https://manchester-brighton-winning-edward.trycloudflare.com/?page=assessment
- QR: public/qr-LIVE-ASSESSMENT.png (600x600)

This tunnel dies when chat closes. Permanent needs GitHub + Render/Vercel.

## Files Included

- src/components/WebsiteView.jsx — Public website
- src/components/AssessmentLandingView.jsx — Shareable assessment + QR
- src/components/BrandLogo.jsx — New logo D+speech+blue arrow
- src/App.jsx — Three experiences routing
- server.js — Production-ready (PORT env, /data disk)
- Dockerfile, render.yaml, vercel.json, fly.toml
- public/manifest.json, sw.js, icons, QR codes
- README.md, DEPLOYMENT.md, THREE_EXPERIENCES.md

## Need Help?

If push fails with authentication, create PAT at https://github.com/settings/tokens/new

Or download zip /tmp/danskpath-github.zip and upload via web.

After pushing, share your GitHub repo URL and I'll verify deployment.
