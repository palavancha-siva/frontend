import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthSplitLayout from '../Layout/AuthSplitLayout';
import FormInput from '../inputs/FormInput';
import MobileInput from '../inputs/MobileInput';
import PanInput from '../inputs/PanInput';
import FormCheckbox from '../inputs/FormCheckbox';
import Btn from '../Common/Btn';
import './Signup.css';

export const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    pan: '',
    email: '',
    consent: false,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (field, val) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
    setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (formData.mobile.length !== 10) newErrors.mobile = 'Enter a valid 10-digit mobile';
    if (formData.pan.length !== 10) newErrors.pan = 'Enter a valid 10-character PAN';
    if (!formData.consent) newErrors.consent = 'You must agree to credit report fetch consent';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    navigate('/login');
  };

  return (
    <AuthSplitLayout
      title="Create Finkuby Account"
      subtitle="Unlock personalised loan options from top banks instantly"
    >
      <form onSubmit={handleSubmit} className="signup-form">
        <FormInput
          label="Full Legal Name (as per PAN)"
          placeholder="e.g. Rahul Sharma"
          value={formData.fullName}
          onChange={(e) => handleChange('fullName', e.target.value)}
          error={errors.fullName}
          required
        />

        <MobileInput
          value={formData.mobile}
          onChange={(val) => handleChange('mobile', val)}
          error={errors.mobile}
          required
        />

        <FormInput
          label="Email Address"
          type="email"
          placeholder="name@example.com"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          error={errors.email}
          required
        />

        <PanInput
          value={formData.pan}
          onChange={(val) => handleChange('pan', val)}
          error={errors.pan}
          required
        />

        <FormCheckbox
          checked={formData.consent}
          onChange={(val) => handleChange('consent', val)}
          error={errors.consent}
        >
          I authorize Finkuby to pull my credit information from credit bureaus (CIBIL/Experian) to determine pre-approved eligibility.
        </FormCheckbox>

        <Btn type="submit" variant="primary" size="lg" className="w-full mt-4">
          Register & Continue
        </Btn>

        <div className="signup-subtext">
          Already registered?{' '}
          <Link to="/login" className="login-link">
            Sign In here
          </Link>
        </div>
      </form>
    </AuthSplitLayout>
  );
};

export default Signup;
