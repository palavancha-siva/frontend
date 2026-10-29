import React from 'react';
import './ProgressTimeline.css';

export const ProgressTimeline = ({ currentStep = 2, steps = [] }) => {
  const defaultSteps = steps.length > 0 ? steps : [
    { title: 'Application Submitted', subtitle: 'Personal & loan details captured' },
    { title: 'FOIR & Credit Check', subtitle: 'Automated policy rule validation' },
    { title: 'Document Verification', subtitle: 'PAN, Aadhaar & Salary Slips' },
    { title: 'Sanction & Disbursal', subtitle: 'Bank sanction letter issuance' },
  ];

  return (
    <div className="progress-timeline-wrapper">
      {defaultSteps.map((s, idx) => {
        const stepNum = idx + 1;
        const isDone = stepNum < currentStep;
        const isCurrent = stepNum === currentStep;
        return (
          <div
            key={idx}
            className={`timeline-node ${isDone ? 'done' : ''} ${isCurrent ? 'current' : ''}`}
          >
            <div className="node-indicator">
              {isDone ? '✓' : stepNum}
            </div>
            <div className="node-info">
              <h5 className="node-title">{s.title}</h5>
              <span className="node-sub">{s.subtitle}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProgressTimeline;
