import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormInput from '../inputs/FormInput';
import FormSelect from '../inputs/FormSelect';
import Btn from '../Common/Btn';
import { calculateOffers } from '../../actions/eligibility';
import './CheckEligibility.css';

export const CheckEligibility = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.eligibility);

  const [form, setForm] = useState({
    monthlyIncome: 75000,
    requestedLoanAmount: 500000,
    tenureYears: 5,
    existingEmi: 5000,
    employmentType: 'SALARIED',
    cibilScore: 750,
  });

  const handleChange = (field, val) => {
    setForm((prev) => ({ ...prev, [field]: val }));
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    dispatch(calculateOffers(form));
    navigate('/offers');
  };

  return (
    <div className="check-eligibility-card card">
      <div className="check-eligibility-header">
        <h3>Multi-Bank FOIR Eligibility Engine</h3>
        <p>Instant evaluation across ICICI, HDFC, Axis, Kotak, and SBI underwriting criteria</p>
      </div>

      <form onSubmit={handleCalculate} className="check-eligibility-form">
        <div className="form-row-grid">
          <FormInput
            label="Net Monthly In-Hand Salary (₹)"
            type="number"
            value={form.monthlyIncome}
            onChange={(e) => handleChange('monthlyIncome', Number(e.target.value))}
            data-testid="income-input"
            required
          />

          <FormInput
            label="Desired Loan Amount (₹)"
            type="number"
            value={form.requestedLoanAmount}
            onChange={(e) => handleChange('requestedLoanAmount', Number(e.target.value))}
            data-testid="loan-amount-input"
            required
          />
        </div>

        <div className="form-row-grid">
          <FormSelect
            label="Preferred Tenure"
            value={form.tenureYears}
            onChange={(e) => handleChange('tenureYears', Number(e.target.value))}
            options={[
              { value: 1, label: '1 Year (12 Months)' },
              { value: 2, label: '2 Years (24 Months)' },
              { value: 3, label: '3 Years (36 Months)' },
              { value: 4, label: '4 Years (48 Months)' },
              { value: 5, label: '5 Years (60 Months)' },
              { value: 7, label: '7 Years (84 Months)' },
            ]}
            data-testid="tenure-select"
          />

          <FormInput
            label="Current Monthly EMIs / Debt (₹)"
            type="number"
            value={form.existingEmi}
            onChange={(e) => handleChange('existingEmi', Number(e.target.value))}
          />
        </div>

        <div className="form-row-grid">
          <FormSelect
            label="Employment Category"
            value={form.employmentType}
            onChange={(e) => handleChange('employmentType', e.target.value)}
            options={[
              { value: 'SALARIED', label: 'Salaried Professional' },
              { value: 'SELF_EMPLOYED', label: 'Self-Employed Professional' },
              { value: 'BUSINESS', label: 'Business Owner / SME' },
            ]}
            data-testid="employment-select"
          />

          <FormSelect
            label="Estimated Bureau CIBIL Score"
            value={form.cibilScore}
            onChange={(e) => handleChange('cibilScore', Number(e.target.value))}
            options={[
              { value: 800, label: '800+ (Tier 1 Super Prime)' },
              { value: 750, label: '750 - 799 (Prime Customer)' },
              { value: 700, label: '700 - 749 (Standard Prime)' },
              { value: 650, label: '650 - 699 (Sub-Prime / Fair)' },
              { value: 600, label: '< 650 (Special Underwriting)' },
            ]}
          />
        </div>

        <Btn
          type="submit"
          variant="primary"
          size="lg"
          isLoading={loading}
          className="w-full mt-4"
        >
          Check Eligibility & Bank Offers
        </Btn>
      </form>
    </div>
  );
};

export default CheckEligibility;
