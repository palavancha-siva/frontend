import React from 'react';
import './Loader.css';

export const Loader = ({ message = 'Loading loan details...' }) => {
  return (
    <div className="loader-container">
      <div className="loader-ring" />
      {message && <p className="loader-message">{message}</p>}
    </div>
  );
};

export default Loader;
