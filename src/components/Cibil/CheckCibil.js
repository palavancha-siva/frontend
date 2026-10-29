import React, { useState } from 'react';
import AppLayout from '../Layout/AppLayout';
import PanInput from '../inputs/PanInput';
import FormDatePicker from '../inputs/FormDatePicker';
import FormCheckbox from '../inputs/FormCheckbox';
import Btn from '../Common/Btn';
import CreditReport from './CreditReport';
import './CheckCibil.css';

export const CheckCibil = () => {
  const [pan, setPan] = useState('');
  const [dob, setDob] = useState('');
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pan.length === 10 && dob && consent) {
      setLoading(true);
      setTimeout(() => {
        setReport({
          score: 782,
          pan,
          activeAccounts: 3,
          closedAccounts: 4,
          onTimePaymentRatio: '99%',
          creditCardUtilization: '15%',
        });
        setLoading(false);
      }, 700);
    }
  };

  return (
    <AppLayout>
      <div className="check-cibil-page container">
        {report ? (
          <div>
            <CreditReport report={report} />
            <div className="report-action-center">
              <Btn variant="outline" onClick={() => setReport(null)}>
                ← Check Another PAN
              </Btn>
            </div>
          </div>
        ) : (
          <div className="check-cibil-card card">
            <div className="cibil-card-heading">
              <h2>Free Instant CIBIL & Credit Bureau Check</h2>
              <p>
                Get your official credit score, debt-to-income summary, and bank eligibility tier without impacting your score.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="cibil-inquiry-form">
              <PanInput value={pan} onChange={setPan} required />
              <FormDatePicker
                label="Date of Birth (as per Income Tax Records)"
                value={dob}
                onChange={setDob}
                required
              />
              <FormCheckbox checked={consent} onChange={setConsent}>
                I authorize Finkuby as my authorized representative to fetch and display my credit information from credit bureaus.
              </FormCheckbox>

              <Btn
                type="submit"
                variant="primary"
                size="lg"
                isLoading={loading}
                disabled={pan.length !== 10 || !dob || !consent}
                className="w-full mt-4"
              >
                Fetch Bureau Report Free
              </Btn>
            </form>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default CheckCibil;
