import React from 'react';
import './FormSelect.css';

export const FormSelect = ({ label, options = [], error, id, required, ...props }) => {
  return (
    <div className={`form-field-group ${error ? 'has-error' : ''}`}>
      {label && (
        <label htmlFor={id} className="form-label">
          {label} {required && <span className="req-star">*</span>}
        </label>
      )}
      <select id={id} className="form-select" {...props}>
        {options.map((opt) => (
          <option key={opt.value ?? opt} value={opt.value ?? opt}>
            {opt.label ?? opt}
          </option>
        ))}
      </select>
      {error && <span className="field-error-text">{error}</span>}
    </div>
  );
};

export default FormSelect;
