import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

export const NotFound = () => {
  return (
    <div className="not-found-wrapper">
      <div className="not-found-card">
        <h1 className="not-found-code">404</h1>
        <h2>Page Not Found</h2>
        <p>The page or financial resource you are looking for does not exist.</p>
        <Link to="/" className="not-found-link">
          Back to Home / Calculator
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
