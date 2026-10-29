import React from 'react';
import AppLayout from '../Layout/AppLayout';
import ProfileSections from './ProfileSections';
import './Profile.css';

export const Profile = () => {
  return (
    <AppLayout>
      <div className="profile-page-container container">
        <div className="profile-hero-header">
          <h2>Customer Account & Documents</h2>
          <p>Manage your verified KYC identity, income documentation, and profile settings</p>
        </div>
        <ProfileSections />
      </div>
    </AppLayout>
  );
};

export default Profile;
