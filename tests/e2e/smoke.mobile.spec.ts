import { test, expect } from '@playwright/test';

// ADAPT: this SPA's default route '/' renders the simple landing screen
// (confirmed in src/App.jsx: pathname === '/' → 'simple-landing').
test('landing page loads without errors or horizontal overflow', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));

  await page.goto('/');
  await expect(page.locator('body')).toBeVisible();
  // ADAPT: assert this app's real entry content, not a generic placeholder.
  await expect(page.getByText('Take the Test').first()).toBeVisible();

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth
  );
  expect(overflow, 'page scrolls horizontally on this viewport').toBe(false);
  expect(errors, 'uncaught page errors').toEqual([]);
});
