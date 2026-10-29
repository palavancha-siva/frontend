import React, { useState } from 'react';
import AppLayout from '../Layout/AppLayout';
import CheckEligibility from '../Eligibility/CheckEligibility';
import { calculateEMI, formatINR } from '../../utils';
import './EligibilityCalculator.css';

export const EligibilityCalculator = () => {
  const [amount, setAmount] = useState(500000);
  const [tenure, setTenure] = useState(5);
  const [rate, setRate] = useState(10.5);

  const emi = calculateEMI(amount, rate, tenure);
  const totalPayable = emi * tenure * 12;
  const totalInterest = totalPayable - amount;

  return (
    <AppLayout>
      <div className="calculator-page-container container">
        <div className="calculator-hero-header">
          <h1 data-testid="calculator-title">Multi-Bank Loan & FOIR Eligibility Calculator</h1>
          <p>
            Simulate institutional loan capacity, monthly EMIs, and policy underwriting across top private and PSU banks.
          </p>
        </div>

        <div className="calculator-layout-split">
          <div className="calculator-interactive-card card">
            <h3>Quick EMI & Tenor Simulator</h3>

            <div className="calc-slider-block">
              <div className="slider-label-row">
                <span>Loan Principal Amount</span>
                <strong>{formatINR(amount)}</strong>
              </div>
              <input
                type="range"
                min={50000}
                max={5000000}
                step={25000}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="calc-range-slider"
              />
              <div className="slider-limits">
                <span>₹50K</span>
                <span>₹50L</span>
              </div>
            </div>

            <div className="calc-slider-block">
              <div className="slider-label-row">
                <span>Tenure Duration</span>
                <strong>{tenure} Years ({tenure * 12} Months)</strong>
              </div>
              <input
                type="range"
                min={1}
                max={7}
                step={1}
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="calc-range-slider"
              />
              <div className="slider-limits">
                <span>1 Yr</span>
                <span>7 Yrs</span>
              </div>
            </div>

            <div className="calc-slider-block">
              <div className="slider-label-row">
                <span>Interest Rate (p.a.)</span>
                <strong>{rate}%</strong>
              </div>
              <input
                type="range"
                min={8.5}
                max={18.0}
                step={0.25}
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="calc-range-slider"
              />
              <div className="slider-limits">
                <span>8.5%</span>
                <span>18%</span>
              </div>
            </div>

            <div className="emi-result-display">
              <span className="emi-headline">Estimated Monthly EMI</span>
              <strong className="emi-headline-amount">{formatINR(emi)}</strong>
              <div className="emi-breakdown-row">
                <div>
                  <small>Principal</small>
                  <span>{formatINR(amount)}</span>
                </div>
                <div>
                  <small>Total Interest</small>
                  <span>{formatINR(totalInterest)}</span>
                </div>
                <div>
                  <small>Total Amount</small>
                  <span>{formatINR(totalPayable)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="calculator-eligibility-wrapper">
            <CheckEligibility />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default EligibilityCalculator;
