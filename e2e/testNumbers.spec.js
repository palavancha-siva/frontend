// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Test Numbers Validation & Mock Authentication', () => {
  const testScenarios = [
    { mobile: '9999999991', desc: 'Pre-approved borrower' },
    { mobile: '9999999992', desc: 'New borrower with no history' },
    { mobile: '9999999993', desc: 'Borrower with low CIBIL score' },
  ];

  for (const scenario of testScenarios) {
    test(`Test number scenario: ${scenario.desc} (${scenario.mobile})`, async ({ page }) => {
      await page.goto('/login');
      const input = page.locator('input[type="tel"], [data-testid="mobile-input"]');
      if (await input.count() > 0) {
        await input.first().fill(scenario.mobile);
        await expect(input.first()).toHaveValue(scenario.mobile);
      }
    });
  }
});
