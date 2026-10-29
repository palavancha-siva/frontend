import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AppLayout from '../Layout/AppLayout';
import FormInput from '../inputs/FormInput';
import FormSelect from '../inputs/FormSelect';
import FormCheckbox from '../inputs/FormCheckbox';
import Btn from '../Common/Btn';
import ApplicationProgress from './ApplicationProgress';
import './LoanApplication.css';

export const LoanApplication = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const offer = location.state?.selectedOffer;

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    mobile: '9876543210',
    pan: 'ABCDE1234F',
    city: 'Bangalore',
    pincode: '560001',
    employmentType: 'SALARIED',
    terms: true,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <AppLayout>
      <div className="loan-application-page container">
        {submitted ? (
          <div>
            <div className="submission-banner">
              <h2>🎉 Application Submitted Successfully!</h2>
              <p>
                Your application has been routed directly to the bank's underwriting portal for automated sanction check.
              </p>
            </div>
            <ApplicationProgress
              application={{
                id: 'APP-' + Math.floor(10000 + Math.random() * 90000),
                bankName: offer?.bankName || 'HDFC Bank',
                amount: offer?.maxEligibleLoan || 500000,
                progressStep: 2,
              }}
            />
          </div>
        ) : (
          <div className="application-form-card card">
            <div className="form-card-header">
              <h2>Complete Your Loan Application</h2>
              <p>
                Selected Partner: <strong>{offer?.bankName || 'HDFC Bank'}</strong> • Interest Rate:{' '}
                <strong>{offer?.interestRate || 10.5}% p.a.</strong>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="app-main-form">
              <div className="form-two-col">
                <FormInput
                  label="Applicant Full Name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                />
                <FormInput
                  label="Registered Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-two-col">
                <FormInput
                  label="Mobile Number"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  required
                />
                <FormInput
                  label="PAN Card Number"
                  value={formData.pan}
                  onChange={(e) => setFormData({ ...formData, pan: e.target.value.toUpperCase() })}
                  required
                />
              </div>

              <div className="form-two-col">
                <FormInput
                  label="City"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  required
                />
                <FormInput
                  label="Serviceable Pincode"
                  value={formData.pincode}
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  required
                />
              </div>

              <FormSelect
                label="Employment Type"
                value={formData.employmentType}
                onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
                options={[
                  { value: 'SALARIED', label: 'Salaried Professional' },
                  { value: 'SELF_EMPLOYED', label: 'Self-Employed / Business Owner' },
                  { value: 'PROFESSIONAL', label: 'Doctor / CA / Architect' },
                ]}
              />

              <FormCheckbox
                checked={formData.terms}
                onChange={(checked) => setFormData({ ...formData, terms: checked })}
              >
                I confirm that all financial declarations are true and grant bank consent to initiate credit verification.
              </FormCheckbox>

              <div className="form-action-row">
                <Btn type="button" variant="outline" onClick={() => navigate(-1)}>
                  Back
                </Btn>
                <Btn type="submit" variant="primary" size="lg" disabled={!formData.terms}>
                  Submit Application
                </Btn>
              </div>
            </form>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default LoanApplication;
