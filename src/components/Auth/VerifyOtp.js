import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OtpInput from '../inputs/OtpInput';
import Btn from '../Common/Btn';
import { verifyOtp } from '../../actions/auth';
import './VerifyOtp.css';

export const VerifyOtp = ({ mobile, timer, onResend, onSuccess, onBack }) => {
  const [otp, setOtp] = useState('');
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.length >= 4) {
      dispatch(verifyOtp(mobile, otp));
      if (onSuccess) onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="verify-otp-container">
      <OtpInput value={otp} onChange={setOtp} error={error} length={4} />

      <Btn
        type="submit"
        variant="primary"
        size="lg"
        isLoading={loading}
        disabled={otp.length < 4}
        className="w-full mt-4"
        data-testid="verify-otp-btn"
      >
        Verify & Continue
      </Btn>

      <div className="otp-actions-row">
        <button
          type="button"
          onClick={onResend}
          disabled={timer > 0}
          className="resend-otp-btn"
        >
          {timer > 0 ? `Resend code in ${timer}s` : 'Resend Code'}
        </button>
        {onBack && (
          <button type="button" onClick={onBack} className="change-mobile-btn">
            Change Mobile
          </button>
        )}
      </div>
    </form>
  );
};

export default VerifyOtp;
