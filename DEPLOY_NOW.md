# Deploy to Render — Live in 10 Minutes

**Current Status**: ✅ Code pushed, build tested, ready to deploy  
**Latest Commit**: 29de925 (web design system integrated + dashboard)  
**Build Size**: 75.43 kB gzip (performant)  
**Deployment**: Free tier compatible

---

## One-Click Deployment (Fastest)

### Step 1: Go to Render
Visit: https://render.com

### Step 2: Connect GitHub
- Click "New" → "Web Service"
- Click "Connect Account" → GitHub
- Authorize if prompted
- Select repository: `danskpath`

### Step 3: Auto-Configure
- **Name**: `danskpath` (auto-filled)
- **Branch**: `main` (auto-filled)
- **Build Command**: Auto-filled from `render.yaml`
- **Start Command**: `node server.js` (auto-filled)
- **Region**: Frankfurt (selected in config — GDPR compliant)
- **Plan**: Free tier (auto-filled)

### Step 4: Deploy
Click "Create Web Service" → **Render builds and deploys**

### Step 5: Wait & Test
- Build takes: **5-10 minutes**
- Once deployed, you get a live URL: `https://danskpath.onrender.com`
- First request wakes the free dyno (3-5 sec initial delay)

---

## What's Deployed

**Frontend**:
- ✅ Web design system (sidebar navigation, dashboard, responsive layout)
- ✅ All 9 lessons (grammar, listening, reading, speaking, vocabulary)
- ✅ Assessment flow (placement test, learning path)
- ✅ Progress tracking (localStorage, offline-capable)

**Backend**:
- ✅ Node.js + Express server
- ✅ JSON file database (no setup needed)
- ✅ Authentication (register, login, JWT)
- ✅ Admin dashboard endpoints
- ✅ Assessment scoring

---

## Testing Checklist (After Deploy)

### Smoke Test (5 min)
```
1. Load https://danskpath.onrender.com
   → Should see assessment page
2. Complete mini assessment (5 questions)
   → Should show result + recommendations
3. Click "Start learning" 
   → Should show dashboard with 9 lessons
4. Click first lesson
   → Should load lesson content
5. Check console (F12)
   → No red errors
```

### Desktop Test (10 min)
```
1. Load on desktop (1024px+)
   → Sidebar visible on left
   → Navigation menu works
   → Hamburger hidden (not mobile)
2. Resize to tablet (640px)
   → Sidebar hides
   → Hamburger menu appears
   → Content reflows nicely
3. Click hamburger
   → Sidebar slides in from left
   → Overlay blocks content
   → Click content → menu closes
```

### Offline Test (5 min)
```
1. Load app normally
2. Open DevTools (F12) → Network tab
3. Set to "Offline"
4. Reload page
   → Cached assets load
   → Lesson content visible
   → Exercises work
5. Go online → Set to "Online"
6. Reload → Everything syncs
```

---

## Live URL Format

Once deployed, your app will be at:

**Main**: `https://danskpath.onrender.com`  
**Assessment**: `https://danskpath.onrender.com/?page=assessment`  
**Dashboard**: `https://danskpath.onrender.com/?page=dashboard` (after assessment)  
**Lessons**: `https://danskpath.onrender.com/?page=lessons`

---

## Troubleshooting

### App won't load / blank page
**Check**: DevTools Console (F12) for errors
- If you see 404 for CSS/JS → wait 2-3 min, hard refresh (Ctrl+Shift+R)
- If you see CORS error → normal on first request, try again

### Takes 10+ seconds to load
**Normal**: Free tier on Render spins up after inactivity (~3-5 sec first request)
- First request: 3-5 sec (dyno wake)
- Subsequent: <1 sec (warm)

### Sidebar doesn't appear on desktop
**Check**: 
- Browser width > 1024px? Sidebar only shows 1024px+
- F12 responsive mode — toggle device mode off
- Hard refresh (Ctrl+Shift+R)

### Hamburger menu doesn't appear on mobile
**Check**:
- Browser width < 1024px? Hamburger only shows <1024px
- Try resizing window or use actual mobile device

### Database not persisting
**Expected behavior**: On free tier, restarts clear in-memory rate limiter but JSON file persists in `/data` folder
- First load: auto-creates empty DB
- Each trial/registration writes to disk
- Check Render dashboard → Logs for any "writeDB" errors

---

## After Deployment

### Share with Beta Testers
1. Copy URL: `https://danskpath.onrender.com`
2. Send to 5-10 testers via email/Slack
3. Ask them to test on:
   - Desktop (1024px+ browser)
   - Mobile (phone browser)
   - Both online and offline
4. Collect feedback on:
   - UI/design (is it clean/professional?)
   - Lesson difficulty (too easy/hard?)
   - Content clarity (explanations understandable?)
   - Bugs (any crashes or broken flows?)

### Quick Admin Check
1. Go to `https://danskpath.onrender.com/?page=admin`
2. Admin login (if needed — check console for temporary creds during dev)
3. View trials and feedback as they come in

---

## Costs

- **Free Tier**: $0/month (up to 750 hours/month, ~31 days continuous)
- **Auto-sleep**: After 15 min inactivity → 3-5 sec wake time
- **Upgrade**: $7/month if you want always-on

---

## Next Steps (Phase 2)

### Week 1: Deploy + Testing
- Deploy to Render (now)
- Share with 5-10 beta testers
- Gather feedback on curriculum & UI

### Week 2–3: Iterate
- Fix any bugs
- Adjust difficulty if needed
- Polish UI based on feedback

### Week 4+: Enhance
- Add optional features (audio, animations, accounts)
- Plan Phase 3 (more lessons, community features)
- Scale to more users

---

**Ready? Go to render.com and deploy!** 🚀

Questions? Check:
- DEPLOYMENT_READY.md (detailed options)
- WEB_DESIGN_SYSTEM.md (design spec)
- README-MVP.md (feature overview)
