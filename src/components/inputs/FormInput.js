import React from 'react';
import './FormInput.css';

export const FormInput = ({ label, error, helperText, id, required, ...props }) => {
  return (
    <div className={`form-field-group ${error ? 'has-error' : ''}`}>
      {label && (
        <label htmlFor={id} className="form-label">
          {label} {required && <span className="req-star">*</span>}
        </label>
      )}
      <input id={id} className="form-input" {...props} />
      {error ? (
        <span className="field-error-text">{error}</span>
      ) : (
        helperText && <span className="field-helper-text">{helperText}</span>
      )}
    </div>
  );
};

export default FormInput;
