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

  console.log('\n1️⃣ ANSWER ALL 15 QUESTIONS');
  for (let q = 1; q <= 15; q++) {
    const buttons = await page.locator('button').filter({ hasText: /\w{2,}/ }).all();
    if (buttons.length > 1) {
      await buttons[Math.min(1, buttons.length - 1)].click({ timeout: 2000 }).catch(() => {});
    }
    await page.waitForTimeout(100);
  }

  await page.waitForTimeout(2000);
  
  let buttonTexts = await page.locator('button').allTextContents();
  console.log('Buttons after answering:');
  buttonTexts.forEach(b => console.log('  -', b.substring(0, 60)));
  
  // Look for "See My Learning Path" button
  console.log('\n2️⃣ CLICK "See My Learning Path"');
  const seePathBtn = page.locator('button:has-text("See My Learning Path")');
  console.log('Button visible?', await seePathBtn.isVisible().catch(() => false));
  
  if (await seePathBtn.isVisible().catch(() => false)) {
    await seePathBtn.click({ timeout: 2000 });
    await page.waitForTimeout(2000);
    
    buttonTexts = await page.locator('button').allTextContents();
    console.log('\nButtons after clicking "See My Learning Path":');
    buttonTexts.forEach(b => console.log('  -', b.substring(0, 60)));
  }

  const bodyText = await page.locator('body').innerText();
  console.log('\nPage content:');
  console.log(bodyText.substring(0, 800));

  await browser.close();
}

test().catch(e => {
  console.error('Test failed:', e);
  process.exit(1);
});
