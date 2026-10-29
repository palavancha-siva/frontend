import React from 'react';
import ScoreGauge from '../Common/ScoreGauge';
import { getScoreCategory } from '../../helpers/creditReport';
import './CreditReport.css';

export const CreditReport = ({ report }) => {
  const {
    score = 782,
    name = 'Rahul Sharma',
    pan = 'ABCDE1234F',
    activeAccounts = 3,
    closedAccounts = 5,
    onTimePaymentRatio = '99%',
    creditCardUtilization = '18%',
  } = report || {};

  const category = getScoreCategory(score);

  return (
    <div className="credit-report-sheet card">
      <div className="report-header-banner">
        <div>
          <h3>Comprehensive Credit Bureau Profile</h3>
          <p>Equifax / CIBIL Score Analysis & Credit Factor Breakdown</p>
        </div>
        <div className="report-pan-badge">PAN: {pan}</div>
      </div>

      <div className="report-main-grid">
        <div className="report-gauge-side">
          <ScoreGauge score={score} />
          <span className="bureau-grade-tag">Bureau Rating: {category}</span>
        </div>

        <div className="report-factors-side">
          <div className="factor-metric-card">
            <span className="factor-name">On-Time Payment Track Record</span>
            <strong className="factor-score text-success">{onTimePaymentRatio}</strong>
            <small>High Impact Factor (No Delinquencies)</small>
          </div>

          <div className="factor-metric-card">
            <span className="factor-name">Credit Card Limit Utilization</span>
            <strong className="factor-score text-success">{creditCardUtilization}</strong>
            <small>High Impact Factor (Ideal is under 30%)</small>
          </div>

          <div className="factor-metric-card">
            <span className="factor-name">Active Credit Accounts</span>
            <strong className="factor-score">{activeAccounts} Active ({closedAccounts} Closed)</strong>
            <small>Medium Impact (Healthy credit mix)</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditReport;
