import React from 'react';
import ProgressTimeline from './ProgressTimeline';
import DocumentCard from './DocumentCard';
import './ApplicationProgress.css';

export const ApplicationProgress = ({ application }) => {
  const { id = 'APP-10291', bankName = 'HDFC Bank', amount = 500000, progressStep = 2 } =
    application || {};

  return (
    <div className="application-progress-container card">
      <div className="progress-header">
        <div>
          <span className="app-ref">Application ID: {id}</span>
          <h3>{bankName} Personal Loan Tracker</h3>
        </div>
        <div className="app-loan-badge">₹{amount.toLocaleString('en-IN')}</div>
      </div>

      <div className="progress-content-split">
        <div className="progress-left">
          <h4>Underwriting Timeline</h4>
          <ProgressTimeline currentStep={progressStep} />
        </div>

        <div className="progress-right">
          <h4>Required Documents</h4>
          <DocumentCard
            title="Aadhaar Card (Front & Back)"
            description="Address and identity proof"
            status="VERIFIED"
          />
          <DocumentCard
            title="PAN Card"
            description="Permanent Account Number proof"
            status="VERIFIED"
          />
          <DocumentCard
            title="Latest 3 Months Salary Slips"
            description="Income verification for salaried profile"
            status="UNDER_REVIEW"
          />
          <DocumentCard
            title="6 Months Bank Statement"
            description="Salary account statement in PDF format"
            status="PENDING"
          />
        </div>
      </div>
    </div>
  );
};

export default ApplicationProgress;
