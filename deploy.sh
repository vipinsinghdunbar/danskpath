#!/bin/bash
# DanskPath — Deploy to public internet
# Makes QR code work outside chat

set -e

echo "🚀 DanskPath — Public Deployment"
echo "================================="

# Check if git repo exists
if [ ! -d .git ]; then
  echo "📦 Initializing git repo..."
  git init
  git branch -M main
fi

# Build
echo "🔨 Building production..."
npm run build

# Check for GitHub remote
if ! git remote | grep -q origin; then
  echo ""
  echo "⚠️  No GitHub remote found."
  echo "Create repo at https://github.com/new → danskpath (public)"
  echo "Then run:"
  echo "  git remote add origin https://github.com/YOUR_USERNAME/danskpath.git"
  echo "  git add ."
  echo "  git commit -m 'DanskPath M1→PD3 full education + 3 experiences'"
  echo "  git push -u origin main"
  echo ""
  echo "After pushing, deploy to one of:"
  echo ""
  echo "1️⃣  Render (Recommended, free, persistent DB):"
  echo "   https://dashboard.render.com/blueprint/new"
  echo "   Connect repo → Apply (uses render.yaml)"
  echo "   Public URL: https://danskpath.onrender.com"
  echo ""
  echo "2️⃣  Vercel (Fast CDN, free):"
  echo "   npm i -g vercel && vercel --prod"
  echo "   Public URL: https://danskpath.vercel.app"
  echo ""
  echo "3️⃣  Fly.io (Closest to Copenhagen):"
  echo "   fly launch && fly deploy"
  echo "   Public URL: https://danskpath.fly.dev"
  echo ""
  exit 0
fi

echo "📤 Pushing to GitHub..."
git add .
git commit -m "Deploy DanskPath M1→PD3 - $(date -u +%Y-%m-%dT%H:%M:%SZ)" || true
git push origin main

echo ""
echo "✅ Pushed to GitHub"
echo ""
echo "Next: Deploy to Render/Vercel/Fly.io"
echo "See DEPLOYMENT.md for details"
echo ""
echo "After deployment, update QR codes:"
echo "  VITE_PUBLIC_URL=https://your-domain.com npm run build"
echo "  node -e \"require('qrcode').toFile('public/assessment-qr-public.png', 'https://your-domain.com/?page=assessment', {width:600})\""
