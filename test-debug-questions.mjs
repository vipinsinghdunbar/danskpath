import { chromium } from 'playwright';

const BASE_URL = 'http://localhost:5173';

async function test() {
  const browser = await chromium.launch({
    executablePath: '/opt/pw-browsers/chromium'
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  page.on('console', msg => {
    if (msg.type() !== 'log') {
      console.log(`[${msg.type().toUpperCase()}]`, msg.text());
    }
  });

  await page.goto(BASE_URL);
  await page.waitForLoadState('networkidle', { timeout: 5000 }).catch(() => {});

  // Check React devtools or inspect
  const devicesJSON = await page.evaluate(() => {
    // Try to access localStorage to see seed
    return {
      seed: localStorage.getItem('dansk_user_seed'),
      questions: JSON.parse(localStorage.getItem('dansk_assessment_questions') || 'null'),
      answers: JSON.parse(localStorage.getItem('dansk_assessment_answers') || '{}'),
    };
  });
  
  console.log('LocalStorage state:', devicesJSON);

  // Get button count after a small wait
  await page.waitForTimeout(500);
  const buttons = await page.locator('button').count();
  console.log('Button count:', buttons);

  const bodyHas = await page.locator('body').innerText();
  if (bodyHas.includes('1 OF')) {
    console.log('✓ Found "1 OF" - assessment is loaded');
    console.log('First 500 chars:', bodyHas.substring(0, 500));
  } else {
    console.log('✗ No "1 OF" found');
    console.log('Body text:', bodyHas.substring(0, 300));
  }

  await browser.close();
}

test().catch(e => {
  console.error('Test error:', e);
  process.exit(1);
});
