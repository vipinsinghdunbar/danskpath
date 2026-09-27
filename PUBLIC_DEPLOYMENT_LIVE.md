# DanskPath — Live Public Deployment

## 🌐 Live URLs (outside chat, work on any phone)
**Base URL (Cloudflare Tunnel):**
https://barbie-proteins-wallpaper-jacket.trycloudflare.com

### Three Experiences + Architecture Map
- **Website (Marketing):** https://barbie-proteins-wallpaper-jacket.trycloudflare.com/?page=website
- **Assessment (Shareable):** https://barbie-proteins-wallpaper-jacket.trycloudflare.com/?page=assessment
- **iPhone App (PWA):** https://barbie-proteins-wallpaper-jacket.trycloudflare.com/ → Add to Home Screen
- **🗺️ Architecture Map (Interactive Motion):** https://barbie-proteins-wallpaper-jacket.trycloudflare.com/?page=architecture

### QR Codes
- Assessment QR: public/qr-LIVE-ASSESSMENT.png → /?page=assessment
- Architecture QR: public/qr-ARCHITECTURE.png → /?page=architecture
- Previous QR: public/qr-LIVE-NEW.png (still works, different tunnel)

## 🗺️ Interactive Architecture Map Features
**File:** src/components/ArchitectureMapView.jsx

24 nodes, 27 edges:
- User 📱, QR ◧, Website ◐, Assessment Landing ◑, Diagnostic ✦ 20Q M1→M5, Verdict ◎, Variation ✧ 5,100+ variants, Stage ◍ A1→B2, SRS ↻ Box 0→5, Path 🗺️, Practice ✦ Today, Progress 📊, API ⚡, Auth 🔐, Question Bank ❓ 24→15, Trials 🧪, Assessment Info 📋, DB 💾, Tunnel 🌐, Render 🚀, GitHub 🐙, PWA 📱

Edges with SVG motion:
- Curved Q paths with markerEnd arrow-black/blue/green/orange/gray
- Active playing: strokeDasharray 8 6 animation 0.5s linear infinite
- Motion dots: circle r4 with animateMotion dur 1.2s repeat indefinite
- Play journey: 9 steps User→QR→Website→Assessment→Diagnostic→Verdict→Path→Practice→Progress with interval 1200ms, currentPlayNode/nextPlayNode highlighted, progress bar
- Clickable nodes: show desc + connected edges in details panel
- Hover highlights, active ring #007AFF, legend User/Assessment/Engines/Learning/Deployment
- Flow steps grid 10 steps QR→website→assessment→variation→verdict→path→practice→progress→PWA→continue
- Deployment cost, data flow engines

## 🚀 Permanent Deployment (Render)
To get permanent QR danskpath.app:
1. Create repo at github.com/new → vipinsinghdunbar/danskpath
2. git push origin main
3. Render.com → New Web Service → connect repo → Build: npm ci && npm run build → Start: node server.js → env PORT=10000
4. Free Frankfurt /bin/bash,  always-on
5. Files: Dockerfile, render.yaml, vercel.json, fly.toml ready

## 📱 Testing End-to-End
QR → Website → CTA Find my Danish level → Assessment Landing → Start 7-min → Diagnostic 20Q adaptive M1→M5 → Verdict → Path → Practice Today 15min → SRS Box 0→5 → Progress → PWA Add to Home Screen → Continue without manual intervention

All working outside chat via Cloudflare Tunnel.

## Build Info
- Build: 840KB index gzip 218KB, 4.71s
- Backend API+DB v2 pid 1517 port 3001 dist exists true
- Frontend Vite pid 1689 port 5173
- Tunnel pid 1598 URL https://barbie-proteins-wallpaper-jacket.trycloudflare.com
- QR 6.2K 6.3K 800px #121417

