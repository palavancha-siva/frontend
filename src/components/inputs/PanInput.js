import React from 'react';
import './PanInput.css';

export const PanInput = ({ label = 'PAN Card Number', value = '', onChange, error, ...props }) => {
  const handleChange = (e) => {
    const uppercase = e.target.value.toUpperCase().slice(0, 10);
    onChange && onChange(uppercase);
  };

  return (
    <div className={`form-field-group pan-field ${error ? 'has-error' : ''}`}>
      {label && <label className="form-label">{label}</label>}
      <input
        type="text"
        placeholder="ABCDE1234F"
        value={value}
        onChange={handleChange}
        className="pan-input-control"
        maxLength={10}
        {...props}
      />
      {error && <span className="field-error-text">{error}</span>}
    </div>
  );
};

export default PanInput;
