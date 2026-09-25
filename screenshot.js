import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const BASE = 'http://localhost:5173';
const PAGES = [
  'landing',
  'share',
  'diagnostic',
  'practice',
  'path',
  'grammar',
  'vocab',
  'listening',
  'speaking',
  'reading',
  'writing',
  'pronunciation',
  'culture',
  'exam',
  'progress',
  'connect',
  'repetition',
  'screenshots',
  'audit',
  'original'
];

const outDir = path.join(process.cwd(), 'public', 'screenshots');
if(!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

(async()=>{
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();

  for(const p of PAGES) {
    const url = `${BASE}/?page=${p}`;
    console.log(`→ ${p} ${url}`);
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);
    const file = path.join(outDir, `${p}.png`);
    await page.screenshot({ path: file, fullPage: true });
    console.log(`  saved ${file}`);
  }

  // Mobile screenshots for key flows
  const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true });
  const mobilePage = await mobileContext.newPage();
  for(const p of ['landing','share','diagnostic','practice','path']) {
    const url = `${BASE}/?page=${p}`;
    await mobilePage.goto(url, { waitUntil: 'networkidle' });
    await mobilePage.waitForTimeout(1500);
    const file = path.join(outDir, `${p}-mobile.png`);
    await mobilePage.screenshot({ path: file, fullPage: true });
    console.log(`  saved mobile ${file}`);
  }

  await browser.close();
  console.log('Done screenshots');
})();
