const { getScoreCategory, calculateDebtToIncomeRatio } = require('../src/helpers/creditReport');

describe('Credit Report Helper Tests', () => {
  it('should categorize credit scores correctly', () => {
    expect(getScoreCategory(800)).toBe('EXCELLENT');
    expect(getScoreCategory(750)).toBe('GOOD');
    expect(getScoreCategory(680)).toBe('FAIR');
    expect(getScoreCategory(550)).toBe('POOR');
  });

  it('should calculate DTI ratio accurately', () => {
    const totalMonthlyDebt = 20000;
    const grossMonthlyIncome = 80000;
    const dti = calculateDebtToIncomeRatio(totalMonthlyDebt, grossMonthlyIncome);
    expect(dti).toBe(25);
  });

  it('should return 0 DTI if gross monthly income is 0 or negative', () => {
    expect(calculateDebtToIncomeRatio(20000, 0)).toBe(0);
  });
});
