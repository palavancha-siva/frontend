import React from 'react';
import { Link } from 'react-router-dom';
import './AuthSplitLayout.css';

export const AuthSplitLayout = ({ children, title, subtitle }) => {
  return (
    <div className="auth-split-wrapper">
      <div className="auth-banner-side">
        <div className="auth-banner-content">
          <Link to="/" className="auth-banner-logo">
            <span className="auth-logo-dot" /> Finkuby Lending
          </Link>
          <h1 className="auth-banner-title">
            Institutional-Grade Multi-Bank FOIR & Eligibility Underwriting
          </h1>
          <p className="auth-banner-text">
            Check real-time multi-lender credit offers, verify documents securely, and get instant sanction approvals across leading Indian banks.
          </p>
          <div className="auth-banner-stats">
            <div className="banner-stat-box">
              <strong>₹500Cr+</strong>
              <span>Disbursed</span>
            </div>
            <div className="banner-stat-box">
              <strong>15+</strong>
              <span>Partner Banks</span>
            </div>
            <div className="banner-stat-box">
              <strong>100%</strong>
              <span>Digital KYC</span>
            </div>
          </div>
        </div>
      </div>

      <div className="auth-form-side">
        <div className="auth-form-card">
          {title && <h2 className="auth-card-title">{title}</h2>}
          {subtitle && <p className="auth-card-subtitle">{subtitle}</p>}
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthSplitLayout;
