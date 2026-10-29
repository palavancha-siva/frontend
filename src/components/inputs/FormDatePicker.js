import React from 'react';
import './FormDatePicker.css';

export const FormDatePicker = ({ label, value, onChange, error, id, required, ...props }) => {
  return (
    <div className={`form-field-group ${error ? 'has-error' : ''}`}>
      {label && (
        <label htmlFor={id} className="form-label">
          {label} {required && <span className="req-star">*</span>}
        </label>
      )}
      <input
        type="date"
        id={id}
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        className="form-datepicker-input"
        {...props}
      />
      {error && <span className="field-error-text">{error}</span>}
    </div>
  );
};

export default FormDatePicker;
