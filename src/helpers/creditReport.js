/**
 * Categorize credit score
 */
const getScoreCategory = (score) => {
  const numericScore = Number(score) || 0;
  if (numericScore >= 750) return 'EXCELLENT';
  if (numericScore >= 700) return 'GOOD';
  if (numericScore >= 600) return 'FAIR';
  return 'POOR';
};

/**
 * Calculate debt to income ratio as percentage
 */
const calculateDebtToIncomeRatio = (totalMonthlyDebt, grossMonthlyIncome) => {
  const debt = Number(totalMonthlyDebt) || 0;
  const income = Number(grossMonthlyIncome) || 0;
  if (income <= 0) return 0;
  return Math.round((debt / income) * 100);
};

module.exports = {
  getScoreCategory,
  calculateDebtToIncomeRatio,
};
