import React from 'react';
import { Link } from 'react-router-dom';
import { formatINR, formatDate } from '../../utils';
import './ApplicationCard.css';

export const ApplicationCard = ({ application }) => {
  const { id, bankName, loanType, amount, status, appliedOn, progressStep } = application;

  const getStatusBadge = (st) => {
    switch (st) {
      case 'APPROVED':
        return <span className="badge badge-success">Approved</span>;
      case 'UNDERWRITING':
        return <span className="badge badge-warning">Underwriting</span>;
      case 'REJECTED':
        return <span className="badge badge-danger">Rejected</span>;
      default:
        return <span className="badge badge-primary">{st}</span>;
    }
  };

  return (
    <div className="application-card">
      <div className="card-top-row">
        <div>
          <span className="app-id">{id}</span>
          <h4 className="app-bank-title">{bankName}</h4>
          <span className="app-type">{loanType}</span>
        </div>
        <div>{getStatusBadge(status)}</div>
      </div>

      <div className="card-amount-row">
        <span className="amount-label">Requested Loan</span>
        <span className="amount-value">{formatINR(amount)}</span>
      </div>

      <div className="progress-bar-track">
        <div
          className="progress-bar-fill"
          style={{ width: `${(progressStep / 4) * 100}%` }}
        />
      </div>

      <div className="card-footer-row">
        <span className="applied-date">Applied: {formatDate(appliedOn)}</span>
        <Link to={`/application/${id}`} className="view-details-link">
          Track Status →
        </Link>
      </div>
    </div>
  );
};

export default ApplicationCard;
