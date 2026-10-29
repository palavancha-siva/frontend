import React from 'react';
import './FormRadio.css';

export const FormRadio = ({ label, name, options = [], value, onChange, error }) => {
  return (
    <div className="form-radio-group">
      {label && <span className="radio-group-label">{label}</span>}
      <div className="radio-options-row">
        {options.map((opt) => {
          const val = opt.value ?? opt;
          const text = opt.label ?? opt;
          return (
            <label key={val} className="radio-option-item">
              <input
                type="radio"
                name={name}
                value={val}
                checked={value === val}
                onChange={() => onChange && onChange(val)}
              />
              <span>{text}</span>
            </label>
          );
        })}
      </div>
      {error && <span className="field-error-text">{error}</span>}
    </div>
  );
};

export default FormRadio;
