# DansPath MVP — Deployment Guide

**Status:** Production-Ready  
**Version:** 1.0.0  
**Date:** October 14, 2026

---

## Quick Deployment (5 minutes)

Choose your platform and follow the steps below. All options are free to start.

### Option 1: Render.com (Recommended ✅)

**Why:** Free tier, auto-deploys from GitHub, simple setup

**Steps:**

1. **Push to GitHub** (if not already done):
```bash
git push origin main
```

2. **Connect Render to GitHub:**
   - Go to [render.com/dashboard](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect GitHub, select `danskpath` repo
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Environment: Set `NODE_ENV=production`
   - Click Deploy

3. **Your app is live:**
   ```
   https://danskpath.onrender.com
   ```

**Free Tier:** 750 hours/month (enough for 1 service always-on, sleeps after 15 min inactivity)

**Upgrade when needed:** $7/month → always-on, no sleep, custom domain

---

### Option 2: Vercel (Fast CDN)

**Why:** Fast edge deployment, great for frontend

**Steps:**

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

**Your app is live:**
```
https://danskpath.vercel.app
```

**Free Tier:** 5 projects, 100 deployments/day

---

### Option 3: Fly.io (Copenhagen Region)

**Why:** Closest to Denmark, good for European users

**Steps:**

```bash
fly launch --copy-config
fly volumes create danskpath_data --region arn --size 1
fly deploy
```

**Your app is live:**
```
https://danskpath.fly.dev
```

---

## Build Metrics

```
Bundle Size:    242 KB (LessonView chunk)
Gzip Size:      54 KB
Build Time:     3.85 seconds
Modules:        51 total
```

---

## Test After Deployment

1. Visit your app URL
2. Select Lesson 1 — should be unlocked
3. Complete a few exercises
4. Verify score calculation
5. Lesson 2 should show as locked until you score 70%+ on Lesson 1

---

## Cost Estimate

| Option | Free | Paid | Recommended |
|--------|------|------|-------------|
| Render | $0 (sleeps) | $7/mo | ✅ Yes |
| Vercel | $0 | $20+/mo | Fast CDN |
| Fly.io | $0 | $5+/mo | EU region |
| Domain | — | $12/yr | Optional |

**Minimum:** $0/month (testing)  
**Production:** $7/month + $12/year = $96/year

---

**Your MVP is deployment-ready. Choose a platform above and go live.** 🚀
