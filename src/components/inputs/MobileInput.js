import React from 'react';
import './MobileInput.css';

export const MobileInput = ({ label = 'Mobile Number', value, onChange, error, ...props }) => {
  const handleChange = (e) => {
    const numeric = e.target.value.replace(/\D/g, '').slice(0, 10);
    onChange && onChange(numeric);
  };

  return (
    <div className={`form-field-group mobile-field ${error ? 'has-error' : ''}`}>
      {label && <label className="form-label">{label}</label>}
      <div className="mobile-input-wrapper">
        <span className="mobile-prefix">+91</span>
        <input
          type="tel"
          placeholder="10-digit mobile number"
          value={value}
          onChange={handleChange}
          className="mobile-input-control"
          maxLength={10}
          {...props}
        />
      </div>
      {error && <span className="field-error-text">{error}</span>}
    </div>
  );
};

export default MobileInput;
