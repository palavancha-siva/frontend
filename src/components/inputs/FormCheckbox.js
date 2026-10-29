import React from 'react';
import './FormCheckbox.css';

export const FormCheckbox = ({ label, checked, onChange, id, error, children }) => {
  return (
    <div className="form-checkbox-wrapper">
      <label htmlFor={id} className="checkbox-label-row">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange && onChange(e.target.checked)}
          className="form-checkbox-input"
        />
        <span className="checkbox-text">{label || children}</span>
      </label>
      {error && <span className="field-error-text">{error}</span>}
    </div>
  );
};

export default FormCheckbox;
