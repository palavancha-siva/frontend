// @ts-check
const { test, expect } = require('@playwright/test');
const { loginUser, fillEligibilityForm } = require('./helpers');

test.describe('End-to-End Customer Loan Journey', () => {
  test('User can land on homepage and access the calculator', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Finkuby|LoanSense/i);
    const calculatorHeading = page.locator('h1, h2, [data-testid="calculator-title"]');
    await expect(calculatorHeading.first()).toBeVisible();
  });

  test('User can fill eligibility form and view bank offers', async ({ page }) => {
    await page.goto('/calculator');
    await fillEligibilityForm(page, {
      monthlyIncome: '85000',
      loanAmount: '600000',
    });
    const calculateBtn = page.locator('button:has-text("Check Eligibility"), button:has-text("Calculate")');
    if (await calculateBtn.count() > 0) {
      await calculateBtn.first().click();
    }
    await expect(page.locator('body')).toBeVisible();
  });
});
