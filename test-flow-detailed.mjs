import { chromium } from 'playwright';

const BASE_URL = 'http://localhost:5173';

async function test() {
  const browser = await chromium.launch({
    executablePath: '/opt/pw-browsers/chromium'
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(BASE_URL);
  await page.waitForLoadState('networkidle', { timeout: 5000 }).catch(() => {});

  console.log('\n1️⃣ ASSESSMENT COMPLETE');
  for (let q = 1; q <= 15; q++) {
    const buttons = await page.locator('button').filter({ hasText: /\w{2,}/ }).all();
    if (buttons.length > 1) {
      await buttons[Math.min(1, buttons.length - 1)].click({ timeout: 2000 }).catch(() => {});
    }
    await page.waitForTimeout(100);
  }

  await page.waitForTimeout(3000);
  let text = await page.locator('body').innerText();
  console.log('Page text:', text.substring(0, 500));
  console.log('\nButtons on page:');
  const allButtons = await page.locator('button').allTextContents();
  allButtons.forEach(b => console.log('  -', b.trim()));

  console.log('\n2️⃣ CLICK VIEW ROADMAP');
  const roadmapBtn = page.locator('button:has-text("View Learning Roadmap")');
  console.log('Roadmap button visible?', await roadmapBtn.isVisible().catch(() => false));
  if (await roadmapBtn.isVisible().catch(() => false)) {
    await roadmapBtn.click();
    await page.waitForTimeout(2000);
  }

  text = await page.locator('body').innerText();
  console.log('\nRoadmap page text:', text.substring(0, 500));
  console.log('\nButtons on Roadmap:');
  const roadmapButtons = await page.locator('button').allTextContents();
  roadmapButtons.forEach(b => console.log('  -', b.trim()));

  console.log('\n3️⃣ CLICK START LEARNING');
  const startBtn = page.locator('button:has-text("Start Learning")');
  console.log('Start Learning button visible?', await startBtn.isVisible().catch(() => false));
  if (await startBtn.isVisible().catch(() => false)) {
    await startBtn.click();
    await page.waitForTimeout(2000);
  }

  text = await page.locator('body').innerText();
  console.log('\nLessons page text:', text.substring(0, 500));

  await browser.close();
}

test().catch(e => {
  console.error(e);
  process.exit(1);
});
