import React, { useState } from 'react';
import PanInput from '../inputs/PanInput';
import FormDatePicker from '../inputs/FormDatePicker';
import FormCheckbox from '../inputs/FormCheckbox';
import Btn from '../Common/Btn';
import './CheckCreditScore.css';

export const CheckCreditScore = ({ onComplete }) => {
  const [pan, setPan] = useState('');
  const [dob, setDob] = useState('');
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pan.length === 10 && dob && consent) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        if (onComplete) onComplete({ pan, dob, score: 768 });
      }, 800);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="credit-score-fetch-form">
      <h3>Instant Bureau Credit Assessment</h3>
      <p className="credit-score-desc">
        Soft pull inquiry has zero impact on your credit score.
      </p>

      <PanInput value={pan} onChange={setPan} required />
      <FormDatePicker
        label="Date of Birth (as per PAN)"
        value={dob}
        onChange={setDob}
        required
      />
      <FormCheckbox checked={consent} onChange={setConsent}>
        I agree to pull my credit information report from bureaus.
      </FormCheckbox>

      <Btn
        type="submit"
        variant="primary"
        isLoading={loading}
        disabled={pan.length !== 10 || !dob || !consent}
        className="w-full mt-4"
      >
        Fetch Credit Score
      </Btn>
    </form>
  );
};

export default CheckCreditScore;
