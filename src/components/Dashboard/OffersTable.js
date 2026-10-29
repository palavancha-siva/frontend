import React from 'react';
import { formatINR } from '../../utils';
import Btn from '../Common/Btn';
import './OffersTable.css';

export const OffersTable = ({ offers = [], onSelectOffer }) => {
  if (!offers || offers.length === 0) {
    return (
      <div className="offers-empty-state">
        <p>No bank loan offers generated yet. Check your eligibility to get instant offers.</p>
      </div>
    );
  }

  return (
    <div className="offers-table-wrapper">
      <table className="offers-table">
        <thead>
          <tr>
            <th>Bank / Partner</th>
            <th>Max Loan Eligibility</th>
            <th>Interest Rate</th>
            <th>Approx. Monthly EMI</th>
            <th>Processing Fee</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {offers.map((offer, idx) => (
            <tr key={offer.bankId || idx}>
              <td>
                <div className="bank-cell">
                  <div className="bank-logo-bullet">{offer.bankId?.slice(0, 2) || 'BK'}</div>
                  <strong className="bank-name">{offer.bankName}</strong>
                </div>
              </td>
              <td>
                <span className="offer-amount">{formatINR(offer.maxEligibleLoan)}</span>
              </td>
              <td>
                <span className="rate-badge">{offer.interestRate}% p.a.</span>
              </td>
              <td>
                <span className="offer-emi">{formatINR(offer.emi)}/mo</span>
              </td>
              <td>{offer.processingFee || '0.5%'}</td>
              <td>
                <Btn
                  variant="primary"
                  size="sm"
                  onClick={() => onSelectOffer && onSelectOffer(offer)}
                >
                  Apply Now
                </Btn>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OffersTable;
