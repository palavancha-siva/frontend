import React from 'react';
import { Link } from 'react-router-dom';
import AppLayout from '../Layout/AppLayout';
import Btn from '../Common/Btn';
import './ComingSoon.css';

export const ComingSoon = ({ featureName = 'Feature' }) => {
  return (
    <AppLayout>
      <div className="coming-soon-wrapper container">
        <div className="coming-soon-card card">
          <div className="coming-soon-icon">🚀</div>
          <h2>{featureName} Coming Soon</h2>
          <p>
            We are actively fine-tuning this institutional credit capability. Stay tuned for updates!
          </p>
          <Link to="/">
            <Btn variant="primary">Back to Home</Btn>
          </Link>
        </div>
      </div>
    </AppLayout>
  );
};

export default ComingSoon;
