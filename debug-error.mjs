import { chromium } from 'playwright';

const BASE_URL = 'http://localhost:5173';

async function check() {
  const browser = await chromium.launch({
    executablePath: '/opt/pw-browsers/chromium'
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  // Capture console messages
  page.on('console', msg => {
    if (msg.type() === 'error' || msg.type() === 'warning') {
      console.log(`[${msg.type().toUpperCase()}]`, msg.text());
    }
  });

  page.on('pageerror', error => {
    console.log('Page error:', error.message);
    console.log(error.stack);
  });

  await page.goto(BASE_URL);
  await page.waitForLoadState('networkidle', { timeout: 5000 }).catch(() => {});

  console.log('Assessment starting...');
  for (let q = 1; q <= 15; q++) {
    const buttons = await page.locator('button').filter({ hasText: /\w{2,}/ }).all();
    if (buttons.length > 1) {
      const optionBtn = buttons[Math.min(1, buttons.length - 1)];
      await optionBtn.click({ timeout: 2000 }).catch(() => {});
    }
    await page.waitForTimeout(100);
  }

  console.log('Assessment complete, waiting...');
  await page.waitForTimeout(3000);

  const bodyText = await page.evaluate(() => document.body.innerText);
  console.log('\n=== PAGE CONTENT ===\n');
  console.log(bodyText);

  await browser.close();
}

check().catch(e => {
  console.error('Test error:', e);
  process.exit(1);
});
