import { chromium } from 'playwright';

const BASE_URL = 'http://localhost:5173';

async function check() {
  const browser = await chromium.launch({
    executablePath: '/opt/pw-browsers/chromium'
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(BASE_URL);
  await page.waitForLoadState('networkidle', { timeout: 5000 }).catch(() => {});

  // Complete assessment
  for (let q = 1; q <= 15; q++) {
    const buttons = await page.locator('button').filter({ hasText: /\w{2,}/ }).all();
    if (buttons.length > 1) {
      const optionBtn = buttons[Math.min(1, buttons.length - 1)];
      await optionBtn.click({ timeout: 2000 }).catch(() => {});
    }
    await page.waitForTimeout(100);
  }

  await page.waitForTimeout(3000);

  // Check what's on page
  const content = await page.content();
  
  // Extract visible text
  const bodyText = await page.evaluate(() => document.body.innerText);
  
  console.log('Page title:', await page.title());
  console.log('\n=== VISIBLE TEXT ===\n');
  console.log(bodyText.substring(0, 800));
  
  console.log('\n=== CHECKING FOR ELEMENTS ===\n');
  console.log('Progress Dashboard header:', await page.locator('text=/Your Progress|Assessment/').isVisible().catch(() => false));
  console.log('View Learning Roadmap button:', await page.locator('button:has-text("View Learning Roadmap")').isVisible().catch(() => false));
  console.log('Retake Assessment button:', await page.locator('button:has-text("Retake Assessment")').isVisible().catch(() => false));

  await browser.close();
}

check();
