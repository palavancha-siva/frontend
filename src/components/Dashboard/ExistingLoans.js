import React from 'react';
import { formatINR } from '../../utils';
import './ExistingLoans.css';

export const ExistingLoans = ({ loans = [] }) => {
  const defaultLoans = loans.length > 0 ? loans : [
    { lender: 'HDFC Bank', type: 'Credit Card Outstanding', emi: 4500, outstanding: 45000 },
    { lender: 'Bajaj Finance', type: 'Consumer Durable Loan', emi: 3200, outstanding: 28000 },
  ];

  const totalEmi = defaultLoans.reduce((acc, curr) => acc + (curr.emi || 0), 0);

  return (
    <div className="existing-loans-card">
      <div className="existing-loans-header">
        <h4>Existing Active Obligations</h4>
        <span className="total-emi-badge">Total EMI: {formatINR(totalEmi)}/mo</span>
      </div>

      <div className="loans-list">
        {defaultLoans.map((loan, idx) => (
          <div key={idx} className="loan-item-row">
            <div className="loan-item-left">
              <strong>{loan.lender}</strong>
              <span>{loan.type}</span>
            </div>
            <div className="loan-item-right">
              <span className="item-emi">EMI: {formatINR(loan.emi)}</span>
              <span className="item-out">Bal: {formatINR(loan.outstanding)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExistingLoans;
