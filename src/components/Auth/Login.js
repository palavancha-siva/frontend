import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthSplitLayout from '../Layout/AuthSplitLayout';
import MobileInput from '../inputs/MobileInput';
import Btn from '../Common/Btn';
import useSendOtp from './useSendOtp';
import VerifyOtp from './VerifyOtp';
import './Login.css';

export const Login = () => {
  const [step, setStep] = useState('MOBILE'); // 'MOBILE' or 'OTP'
  const { mobile, setMobile, timer, isSending, error, handleSend } = useSendOtp();
  const navigate = useNavigate();

  const handleSubmitMobile = async (e) => {
    e.preventDefault();
    const sent = await handleSend(mobile);
    if (sent) {
      setStep('OTP');
    }
  };

  const handleVerified = () => {
    navigate('/dashboard');
  };

  return (
    <AuthSplitLayout
      title={step === 'MOBILE' ? 'Welcome to Finkuby' : 'Verify Mobile OTP'}
      subtitle={
        step === 'MOBILE'
          ? 'Enter your registered mobile number to check loan status and offers'
          : `We sent a 4-digit verification code to +91 ${mobile}`
      }
    >
      {step === 'MOBILE' ? (
        <form onSubmit={handleSubmitMobile} className="login-form">
          <MobileInput
            value={mobile}
            onChange={setMobile}
            error={error}
            required
            autoFocus
          />
          <Btn
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isSending}
            disabled={mobile.length !== 10}
            className="w-full mt-4"
          >
            Request OTP
          </Btn>
          <div className="login-subtext">
            <span>New customer? </span>
            <Link to="/signup" className="signup-link">
              Create an account
            </Link>
          </div>
        </form>
      ) : (
        <VerifyOtp
          mobile={mobile}
          timer={timer}
          onResend={() => handleSend(mobile)}
          onSuccess={handleVerified}
          onBack={() => setStep('MOBILE')}
        />
      )}
    </AuthSplitLayout>
  );
};

export default Login;
