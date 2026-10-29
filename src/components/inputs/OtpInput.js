import React, { useRef } from 'react';
import './OtpInput.css';

export const OtpInput = ({ length = 4, value = '', onChange, error }) => {
  const inputsRef = useRef([]);

  const handleChange = (e, index) => {
    const val = e.target.value.replace(/\D/g, '');
    const current = value.split('');
    current[index] = val.slice(-1);
    const updated = current.join('');
    onChange && onChange(updated);

    if (val && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className="otp-container">
      <div className="otp-boxes-row">
        {Array.from({ length }).map((_, i) => (
          <input
            key={i}
            ref={(el) => (inputsRef.current[i] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={value[i] || ''}
            onChange={(e) => handleChange(e, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            className={`otp-digit-box ${error ? 'otp-error' : ''}`}
            data-testid="otp-input"
          />
        ))}
      </div>
      {error && <span className="field-error-text text-center">{error}</span>}
    </div>
  );
};

export default OtpInput;
