# DanskPath — Public Deployment Guide
## Make QR Code Work Outside This Chat

Current sandbox URLs (ephemeral, die when chat closes):
- Frontend: `https://5173-ik1t6d5enxwfmhfkhf8wb.e2b.app`
- Backend: `https://3001-ik1t6d5enxwfmhfkhf8wb.e2b.app`

**These stop working when this session ends.** You need permanent hosting.

---

## Option 1: One-Click Deploy to Render (Recommended, Free, Persistent DB)

Render gives you free hosting with persistent disk for `danish-platform-db.json` and custom domain `danskpath.app`.

### Steps (5 minutes):

1. **Push to GitHub:**
   ```bash
   cd /home/user/danskpath
   git init
   git add .
   git commit -m "DanskPath M1→PD3 full education"
   git branch -M main
   # Create repo on github.com/new → danskpath
   git remote add origin https://github.com/YOUR_USERNAME/danskpath.git
   git push -u origin main
   ```

2. **Deploy to Render:**
   - Go to https://dashboard.render.com/blueprint/new
   - Connect GitHub repo `danskpath`
   - Render auto-detects `render.yaml`
   - Click **Apply**
   - Wait 3-5 min build

3. **Your public URLs (permanent):**
   - `https://danskpath.onrender.com` (or your custom name)
   - Assessment: `https://danskpath.onrender.com/?page=assessment`
   - Pretty: `https://danskpath.onrender.com/assessment`
   - QR code will point here

4. **Custom domain (optional):**
   - Render Dashboard → Settings → Custom Domains → Add `danskpath.app`
   - Update DNS: CNAME `danskpath.app` → `danskpath.onrender.com`
   - Or use Cloudflare

5. **Update QR codes:**
   ```bash
   node -e "const QR=require('qrcode'); QR.toFile('public/assessment-qr-public.png', 'https://danskpath.onrender.com/?page=assessment', {width:400, margin:2, color:{dark:'#121417', light:'#FFFFFF'}})"
   ```

**Cost:** Free tier 750h/month (enough for 1 service always on). Disk 1GB free.

---

## Option 2: Vercel (Frontend + Serverless Backend, Free, Fast)

Best for global CDN, but DB is ephemeral (use Vercel KV or Neon Postgres for persistence).

### Steps:

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   vercel login
   ```

2. **Deploy:**
   ```bash
   cd /home/user/danskpath
   vercel --prod
   # Follow prompts: project name danskpath, framework Vite
   ```

3. **Public URLs:**
   - `https://danskpath.vercel.app`
   - Assessment: `https://danskpath.vercel.app/?page=assessment`

4. **For persistent DB, add Vercel KV:**
   - Vercel Dashboard → Storage → Create KV → Connect to project
   - Update `server.js` to use `@vercel/kv` instead of file (we have file fallback)

5. **Custom domain:**
   - Vercel Dashboard → Settings → Domains → Add `danskpath.app`

**Cost:** Free 100GB bandwidth, serverless functions.

---

## Option 3: Fly.io (Closest to Copenhagen, Free Tier, Persistent Disk)

Fly region `arn` = Stockholm, 30ms from Copenhagen.

### Steps:

1. **Install flyctl:**
   ```bash
   curl -L https://fly.io/install.sh | sh
   fly auth login
   ```

2. **Deploy:**
   ```bash
   cd /home/user/danskpath
   fly launch --copy-config # uses fly.toml
   fly volumes create danskpath_data --region arn --size 1
   fly deploy
   ```

3. **Public URLs:**
   - `https://danskpath.fly.dev`
   - Assessment: `https://danskpath.fly.dev/?page=assessment`

**Cost:** Free allowance: 3 VMs, 3GB persistent.

---

## Option 4: Docker Anywhere (Your own VPS, Hetzner, DigitalOcean)

### Hetzner (Copenhagen region, €4/month):

```bash
# On your VPS
git clone https://github.com/YOUR_USERNAME/danskpath.git
cd danskpath
docker build -t danskpath .
docker run -d -p 80:3001 -p 443:3001 \
  -v /data/danskpath:/data \
  -e NODE_ENV=production \
  -e JWT_SECRET=your-secret-here \
  --restart unless-stopped \
  danskpath
```

Add Caddy/Nginx for HTTPS + domain `danskpath.app`.

---

## Option 5: GitHub Pages (Frontend Only, No Backend, Offline Mode)

If you want **zero backend** — assessment works offline with localStorage only (fallback in DiagnosticView).

```bash
cd /home/user/danskpath
npm run build
# Deploy dist to gh-pages branch
npx gh-pages -d dist
```

Public URL: `https://YOUR_USERNAME.github.io/danskpath/?page=assessment`

**Limitation:** No cloud saving of trials, but assessment still works (local fallback in TrialFlowView). Good for demo QR.

---

## Update Frontend for Production URL

Create `.env.production`:

```
VITE_PUBLIC_URL=https://danskpath.onrender.com
VITE_ASSESSMENT_URL=https://danskpath.onrender.com/?page=assessment
VITE_API_URL=https://danskpath.onrender.com/api
```

Update `src/components/AssessmentLandingView.jsx`:

```js
const assessmentUrl = import.meta.env.VITE_ASSESSMENT_URL || `${window.location.origin}/?page=assessment`;
```

Then rebuild: `npm run build`.

---

## Generate Production QR Codes

After you have permanent domain (e.g., `https://danskpath.app`):

```bash
cd /home/user/danskpath
node - << 'JS'
const QRCode = require('qrcode');
const domains = [
  'https://danskpath.app/?page=assessment',
  'https://danskpath.app/assessment',
  'https://danskpath.onrender.com/?page=assessment',
  'https://danskpath.vercel.app/?page=assessment'
];
domains.forEach(async (url, i) => {
  const file = `public/qr-${i}.png`;
  await QRCode.toFile(file, url, { width: 600, margin: 2, color: { dark: '#121417', light: '#FFFFFF' } });
  console.log(file, url);
});
JS
```

Print-ready QR: 600x600, use for LinkedIn, posters, handouts.

---

## Immediate Testing (While This Chat Lives)

**Current ephemeral public URLs (work now, die later):**

- Website: https://5173-ik1t6d5enxwfmhfkhf8wb.e2b.app/?page=website
- Assessment + QR: https://5173-ik1t6d5enxwfmhfkhf8wb.e2b.app/?page=assessment
- Full App: https://5173-ik1t6d5enxwfmhfkhf8wb.e2b.app/?page=practice
- Testing Guide: https://5173-ik1t6d5enxwfmhfkhf8wb.e2b.app/TESTING_GUIDE.html

QR for **current session** (scan now):
- File: `public/assessment-qr-ephemeral.png` — points to `https://5173-ik1t6d5enxwfmhfkhf8wb.e2b.app/?page=assessment`

Generate it:
```bash
node -e "require('qrcode').toFile('public/assessment-qr-ephemeral.png', 'https://5173-ik1t6d5enxwfmhfkhf8wb.e2b.app/?page=assessment', {width:400})"
```

---

## Checklist After Deployment

- [ ] Public URL loads (website)
- [ ] /?page=assessment loads (assessment landing)
- [ ] QR code scans to assessment landing
- [ ] New user can start assessment independently (trialId created)
- [ ] Questions varied (not same for different users)
- [ ] Results saved (check /api/admin/trials as admin Vipin/vipin123)
- [ ] No admin data exposed in assessment
- [ ] Full app works after assessment (practice, path)
- [ ] PWA install banner shows on iPhone
- [ ] Add to Home Screen works (icon appears)
- [ ] Offline works (sw.js caches)
- [ ] Custom domain danskpath.app points to deployment
- [ ] QR codes updated to production domain
- [ ] Share on LinkedIn/email/print works

---

## Recommended: Render + Custom Domain danskpath.app

1. GitHub repo
2. Render blueprint deploy (render.yaml)
3. Custom domain danskpath.app (Render → Settings → Domains)
4. Update QR codes to https://danskpath.app/?page=assessment
5. Print QR for in-person, LinkedIn, presentations

**Total time:** 10 minutes, free, permanent, works outside chat.

---

## Need Help?

All files ready:
- Dockerfile
- render.yaml
- vercel.json
- fly.toml
- server.js production-ready
- dist build (npm run build)

Just push to GitHub and connect to Render/Vercel.
