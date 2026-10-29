import React from 'react';
import { Link } from 'react-router-dom';
import Btn from '../Common/Btn';
import './AlreadyRegistered.css';

export const AlreadyRegistered = ({ mobile }) => {
  return (
    <div className="already-reg-box">
      <div className="already-reg-icon">ℹ️</div>
      <h3>Account Already Exists</h3>
      <p>
        An account with mobile number <strong>+91 {mobile}</strong> is already registered with us.
      </p>
      <Link to="/login">
        <Btn variant="primary" className="mt-4 w-full">
          Sign In with OTP
        </Btn>
      </Link>
    </div>
  );
};

export default AlreadyRegistered;
