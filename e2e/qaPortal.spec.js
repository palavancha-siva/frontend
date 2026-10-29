// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('QA Portal & Diagnostics', () => {
  test('Portal loads login layout correctly', async ({ page }) => {
    await page.goto('/login');
    const mobileInput = page.locator('input[type="tel"], [data-testid="mobile-input"]');
    await expect(mobileInput.first()).toBeVisible();
  });

  test('Check navigation between routes', async ({ page }) => {
    await page.goto('/coming-soon');
    await expect(page.locator('body')).toContainText(/Coming Soon/i);
  });
});
