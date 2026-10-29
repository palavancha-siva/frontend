import React from 'react';
import ApplicationProgress from '../Application/ApplicationProgress';
import './applicationsView.css';

export const ApplicationsView = ({ application }) => {
  return (
    <div className="applications-view-wrapper">
      <ApplicationProgress application={application} />
    </div>
  );
};

export default ApplicationsView;
