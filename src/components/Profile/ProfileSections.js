import React, { useState } from 'react';
import ProfileForm from './profileForm';
import MyDocuments from './MyDocuments';
import './ProfileSections.css';

export const ProfileSections = () => {
  const [activeTab, setActiveTab] = useState('DETAILS'); // 'DETAILS' or 'DOCUMENTS'

  return (
    <div className="profile-sections-wrapper card">
      <div className="profile-tabs-header">
        <button
          onClick={() => setActiveTab('DETAILS')}
          className={`tab-btn ${activeTab === 'DETAILS' ? 'active' : ''}`}
        >
          Personal & Employment Details
        </button>
        <button
          onClick={() => setActiveTab('DOCUMENTS')}
          className={`tab-btn ${activeTab === 'DOCUMENTS' ? 'active' : ''}`}
        >
          My Documents (KYC & Income)
        </button>
      </div>

      <div className="tab-pane-content">
        {activeTab === 'DETAILS' ? <ProfileForm /> : <MyDocuments />}
      </div>
    </div>
  );
};

export default ProfileSections;
