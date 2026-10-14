import { chromium } from 'playwright';

const BASE_URL = 'http://localhost:5173';

async function test() {
  const browser = await chromium.launch({
    executablePath: '/opt/pw-browsers/chromium'
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  // Log all console messages
  page.on('console', msg => {
    console.log('[CONSOLE]', msg.type(), msg.text());
  });

  await page.goto(BASE_URL, { waitUntil: 'networkidle' }).catch(e => {
    console.log('Navigation error:', e.message);
  });

  await page.waitForTimeout(2000);

  // Check full HTML
  const fullHTML = await page.content();
  
  // Look for key elements
  console.log('Contains ProgressDashboard?', fullHTML.includes('ProgressDashboard'));
  console.log('Contains LessonView?', fullHTML.includes('LessonView'));
  console.log('Contains DiagnosticView?', fullHTML.includes('DiagnosticView'));
  console.log('Contains "Your Progress"?', fullHTML.includes('Your Progress'));
  console.log('Contains "View Learning Roadmap"?', fullHTML.includes('View Learning Roadmap'));

  // Get body content
  const bodyText = await page.evaluate(() => document.body.innerText);
  console.log('\nFirst 1000 chars of body:');
  console.log(bodyText.substring(0, 1000));

  // Get all button texts
  const buttons = await page.locator('button').allTextContents();
  console.log('\nAll button texts found:');
  buttons.forEach(b => console.log(' -', b));

  await browser.close();
}

test().catch(e => {
  console.error('Test failed:', e);
  process.exit(1);
});
