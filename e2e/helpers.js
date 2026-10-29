// @ts-check
const { expect } = require('@playwright/test');

/**
 * Common test helper functions for Playwright E2E tests
 */

async function loginUser(page, mobile = '9876543210', otp = '1234') {
  await page.goto('/login');
  await page.fill('input[type="tel"]', mobile);
  await page.click('button[type="submit"]');
  await page.waitForSelector('input[data-testid="otp-input"]');
  await page.fill('input[data-testid="otp-input"]', otp);
  await page.click('button[data-testid="verify-otp-btn"]');
  await expect(page).toHaveURL(/.*dashboard/);
}

async function fillEligibilityForm(page, details = {}) {
  const {
    monthlyIncome = '75000',
    loanAmount = '500000',
    tenureYears = '5',
    employmentType = 'SALARIED',
  } = details;

  await page.fill('[data-testid="income-input"]', monthlyIncome);
  await page.fill('[data-testid="loan-amount-input"]', loanAmount);
  await page.selectOption('[data-testid="tenure-select"]', tenureYears);
  await page.selectOption('[data-testid="employment-select"]', employmentType);
}

module.exports = {
  loginUser,
  fillEligibilityForm,
};
