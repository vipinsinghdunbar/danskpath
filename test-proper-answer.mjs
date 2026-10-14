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
    const text = await page.locator('body').innerText();
    const match = text.match(/QUESTION (\d+) OF (\d+)/);
    const current = match ? parseInt(match[1]) : '?';
    
    console.log(`Q${current}: Selecting first answer option...`);
    
    // Find buttons with actual answer text (contains "According to", "Following", etc. - not interactive words)
    // Get all buttons and filter to those with answer content
    const allBtns = await page.locator('button').all();
    let found = false;
    
    for (const btn of allBtns) {
      const txt = await btn.innerText();
      // Skip buttons with Back, ✕, Why, Save, checkbox aria indicators
      if (txt.includes('←') || txt.includes('✕') || txt.includes('Why') || txt.includes('Save') || txt === '' || txt === '✓') {
        continue;
      }
      // This should be an answer option
      if (txt.length > 2) {
        await btn.click({ timeout: 1000 }).catch(() => {});
        console.log(`  ✓ Clicked answer option: ${txt.substring(0, 30)}`);
        found = true;
        break;
      }
    }
    
    if (!found) {
      console.log('  ✗ Could not find answer option to click');
    }
    
    await page.waitForTimeout(300);
  }

  await page.waitForTimeout(2000);
  
  const finalText = await page.locator('body').innerText();
  console.log('\n=== FINAL STATUS ===');
  if (finalText.includes('See My Learning Path')) {
    console.log('✓ FOUND RESULT SCREEN WITH "See My Learning Path"');
  } else if (finalText.includes('Your starting point')) {
    console.log('✓ FOUND ROADMAP/RESULT SCREEN');
  } else {
    console.log('✗ Still on assessment - Final text:');
    console.log(finalText.substring(0, 500));
  }

  await browser.close();
}

test().catch(e => {
  console.error('Test error:', e);
  process.exit(1);
});
