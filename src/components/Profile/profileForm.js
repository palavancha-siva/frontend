import React, { useState } from 'react';
import FormInput from '../inputs/FormInput';
import FormDatePicker from '../inputs/FormDatePicker';
import PanInput from '../inputs/PanInput';
import Btn from '../Common/Btn';
import './profileForm.css';

export const validateProfileForm = (values = {}) => {
  const errors = {};
  if (!values.fullName || !values.fullName.trim()) {
    errors.fullName = 'Full name is required';
  }
  if (!values.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Valid email is required';
  }
  if (!values.pan || values.pan.length !== 10) {
    errors.pan = '10-character PAN number is required';
  }
  if (!values.dob) {
    errors.dob = 'Date of birth is required';
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const ProfileForm = ({ profile = {}, onSave }) => {
  const [values, setValues] = useState({
    fullName: profile.fullName || 'Rahul Sharma',
    email: profile.email || 'rahul.sharma@example.com',
    mobile: profile.mobile || '9876543210',
    pan: profile.pan || 'ABCDE1234F',
    dob: profile.dob || '1990-05-15',
    companyName: profile.companyName || 'Tata Consultancy Services',
    monthlyIncome: profile.monthlyIncome || 85000,
    city: profile.city || 'Bangalore',
    state: profile.state || 'Karnataka',
  });

  const [errors, setErrors] = useState({});
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleChange = (field, val) => {
    setValues((prev) => ({ ...prev, [field]: val }));
    setErrors((prev) => ({ ...prev, [field]: null }));
    setSavedSuccess(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validateProfileForm(values);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    if (onSave) onSave(values);
    setSavedSuccess(true);
  };

  return (
    <form onSubmit={handleSubmit} className="profile-edit-form">
      {savedSuccess && (
        <div className="profile-alert-success">✓ Profile updated successfully!</div>
      )}

      <div className="form-two-col">
        <FormInput
          label="Full Legal Name"
          value={values.fullName}
          onChange={(e) => handleChange('fullName', e.target.value)}
          error={errors.fullName}
          required
        />
        <FormInput
          label="Email Address"
          type="email"
          value={values.email}
          onChange={(e) => handleChange('email', e.target.value)}
          error={errors.email}
          required
        />
      </div>

      <div className="form-two-col">
        <PanInput
          value={values.pan}
          onChange={(val) => handleChange('pan', val)}
          error={errors.pan}
          required
        />
        <FormDatePicker
          label="Date of Birth"
          value={values.dob}
          onChange={(val) => handleChange('dob', val)}
          error={errors.dob}
          required
        />
      </div>

      <div className="form-two-col">
        <FormInput
          label="Employer / Company Name"
          value={values.companyName}
          onChange={(e) => handleChange('companyName', e.target.value)}
        />
        <FormInput
          label="Net Monthly In-Hand Salary (₹)"
          type="number"
          value={values.monthlyIncome}
          onChange={(e) => handleChange('monthlyIncome', Number(e.target.value))}
        />
      </div>

      <div className="form-two-col">
        <FormInput
          label="City"
          value={values.city}
          onChange={(e) => handleChange('city', e.target.value)}
        />
        <FormInput
          label="State"
          value={values.state}
          onChange={(e) => handleChange('state', e.target.value)}
        />
      </div>

      <div className="form-actions-bar">
        <Btn type="submit" variant="primary" size="md">
          Save Changes
        </Btn>
      </div>
    </form>
  );
};

export default ProfileForm;
