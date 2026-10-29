import React from 'react';
import { Link } from 'react-router-dom';
import ScoreGauge from '../Common/ScoreGauge';
import { formatDate } from '../../utils';
import './CibilCard.css';

export const CibilCard = ({ cibil }) => {
  const { score, category, lastChecked, activeAccounts, totalOutstanding } = cibil || {};

  return (
    <div className="cibil-card">
      <div className="cibil-card-header">
        <h3 className="cibil-title">Bureau Credit Health</h3>
        <span className="cibil-badge">{category || 'Good'}</span>
      </div>

      <ScoreGauge score={score || 750} />

      <div className="cibil-stats-grid">
        <div className="cibil-stat-col">
          <span className="stat-label">Active Loans</span>
          <strong className="stat-val">{activeAccounts || 0}</strong>
        </div>
        <div className="cibil-stat-col">
          <span className="stat-label">Last Checked</span>
          <strong className="stat-val">{formatDate(lastChecked)}</strong>
        </div>
      </div>

      <div className="cibil-card-footer">
        <Link to="/cibil" className="cibil-action-link">
          View Complete Credit Report →
        </Link>
      </div>
    </div>
  );
};

export default CibilCard;
