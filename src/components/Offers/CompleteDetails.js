import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../Layout/AppLayout';
import OffersTable from '../Dashboard/OffersTable';
import Btn from '../Common/Btn';
import './CompleteDetails.css';

export const CompleteDetails = () => {
  const navigate = useNavigate();
  const { offers, criteria } = useSelector((state) => state.eligibility);

  const handleSelectOffer = (offer) => {
    navigate('/application', { state: { selectedOffer: offer } });
  };

  return (
    <AppLayout>
      <div className="complete-details-page container">
        <div className="offers-header-banner">
          <div>
            <h2>Matched Bank Loan Offers</h2>
            <p>
              Based on your monthly declared income of ₹{Number(criteria.monthlyIncome || 75000).toLocaleString('en-IN')}, here are pre-vetted retail bank programs.
            </p>
          </div>
          <Btn variant="outline" onClick={() => navigate('/calculator')}>
            Modify Parameters
          </Btn>
        </div>

        <OffersTable offers={offers} onSelectOffer={handleSelectOffer} />
      </div>
    </AppLayout>
  );
};

export default CompleteDetails;
