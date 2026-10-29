import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ErrorBoundary from './components/Common/ErrorBoundary';
import IdleLogout from './components/Common/IdleLogout';

// Pages & Components
import EligibilityCalculator from './components/Calculator/EligibilityCalculator';
import CheckEligibility from './components/Eligibility/CheckEligibility';
import CompleteDetails from './components/Offers/CompleteDetails';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Dashboard from './components/Dashboard/Dashboard';
import MyApplications from './components/Applications/MyApplications';
import LoanApplication from './components/Application/LoanApplication';
import CheckCibil from './components/Cibil/CheckCibil';
import Profile from './components/Profile/Profile';
import ComingSoon from './components/ComingSoon/ComingSoon';
import NotFound from './components/Common/NotFound';

import './assets/css/common.css';

export const App = () => {
  return (
    <ErrorBoundary>
      <IdleLogout />
      <Router>
        <Routes>
          <Route path="/" element={<EligibilityCalculator />} />
          <Route path="/calculator" element={<EligibilityCalculator />} />
          <Route path="/eligibility" element={<CheckEligibility />} />
          <Route path="/offers" element={<CompleteDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/applications" element={<MyApplications />} />
          <Route path="/application" element={<LoanApplication />} />
          <Route path="/application/:id" element={<LoanApplication />} />
          <Route path="/cibil" element={<CheckCibil />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/coming-soon" element={<ComingSoon />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
