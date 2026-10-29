import React from 'react';
import './ChooseOption.css';

export const ChooseOption = ({ options = [], selected, onSelect }) => {
  return (
    <div className="choose-option-grid">
      {options.map((opt) => {
        const isSelected = selected === opt.id;
        return (
          <div
            key={opt.id}
            onClick={() => onSelect && onSelect(opt)}
            className={`choose-option-card ${isSelected ? 'selected' : ''}`}
          >
            <div className="option-icon">{opt.icon || '🏦'}</div>
            <h4 className="option-title">{opt.title}</h4>
            <p className="option-desc">{opt.description}</p>
            {opt.badge && <span className="option-badge">{opt.badge}</span>}
          </div>
        );
      })}
    </div>
  );
};

export default ChooseOption;
