import React from 'react';
import './ScoreGauge.css';

export const ScoreGauge = ({ score = 750, min = 300, max = 900 }) => {
  const percentage = Math.min(Math.max(((score - min) / (max - min)) * 100, 0), 100);

  const getColor = (s) => {
    if (s >= 750) return '#10b981';
    if (s >= 700) return '#3b82f6';
    if (s >= 650) return '#f59e0b';
    return '#ef4444';
  };

  const getLabel = (s) => {
    if (s >= 750) return 'Excellent';
    if (s >= 700) return 'Good';
    if (s >= 650) return 'Fair';
    return 'Needs Attention';
  };

  const color = getColor(score);

  return (
    <div className="score-gauge-container">
      <div className="gauge-circle-outer" style={{ borderColor: color }}>
        <div className="gauge-score-value">{score}</div>
        <div className="gauge-status-label" style={{ color }}>
          {getLabel(score)}
        </div>
      </div>
      <div className="gauge-bar-track">
        <div
          className="gauge-bar-fill"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
      </div>
      <div className="gauge-range-labels">
        <span>{min} Poor</span>
        <span>{max} Excellent</span>
      </div>
    </div>
  );
};

export default ScoreGauge;
