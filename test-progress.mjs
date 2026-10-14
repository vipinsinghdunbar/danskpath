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

  for (let q = 1; q <= 15; q++) {
    // Get current question number
    const text = await page.locator('body').innerText();
    const match = text.match(/QUESTION (\d+) OF (\d+)/);
    const current = match ? parseInt(match[1]) : '?';
    
    console.log(`Q${current}: Clicking option...`);
    
    // Click first non-"Ved ikke" button
    const buttons = await page.locator('button').filter({ hasText: /^[^←✓]/ }).all();
    let clicked = false;
    for (const btn of buttons) {
      const txt = await btn.innerText();
      if (!txt.includes('Back') && !txt.includes('Why') && !txt.includes('Save') && !txt.toLowerCase().includes('ved ikke') && txt.trim().length > 0) {
        await btn.click({ timeout: 2000 }).catch(() => {});
        clicked = true;
        console.log(`  ✓ Clicked: ${txt.substring(0, 30)}`);
        break;
      }
    }
    
    if (!clicked) {
      console.log(`  ✗ No button found to click`);
    }
    
    await page.waitForTimeout(400);
  }

  await page.waitForTimeout(2000);
  
  const finalText = await page.locator('body').innerText();
  console.log('\n=== FINAL PAGE ===');
  console.log(finalText.substring(0, 800));
  
  if (finalText.includes('See My Learning Path')) {
    console.log('\n✓ FOUND "See My Learning Path" button!');
  } else {
    console.log('\n✗ Did not find "See My Learning Path"');
  }

  await browser.close();
}

test().catch(e => {
  console.error('Test error:', e);
  process.exit(1);
});
