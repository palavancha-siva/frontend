import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import AppLayout from '../Layout/AppLayout';
import CardCarousel from './CardCarousel';
import ApplicationCard from './ApplicationCard';
import CibilCard from './CibilCard';
import ExistingLoans from './ExistingLoans';
import OffersTable from './OffersTable';
import Btn from '../Common/Btn';
import { fetchApplications } from '../../actions/portal';
import './Dashboard.css';

export const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { applications, cibil } = useSelector((state) => state.portal);
  const { offers } = useSelector((state) => state.eligibility);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchApplications());
  }, [dispatch]);

  const handleApplyOffer = (offer) => {
    navigate('/application', { state: { selectedOffer: offer } });
  };

  return (
    <AppLayout>
      <div className="dashboard-page container">
        <div className="dashboard-welcome-banner">
          <div>
            <h2>Hello, {user?.name || 'Customer'} 👋</h2>
            <p>Track your ongoing applications, pre-approved loan offers, and credit standing.</p>
          </div>
          <Link to="/calculator">
            <Btn variant="primary" size="md">
              + New Eligibility Check
            </Btn>
          </Link>
        </div>

        {applications && applications.length > 0 && (
          <CardCarousel title="Your Active Loan Applications">
            {applications.map((app) => (
              <div key={app.id} className="carousel-card-item">
                <ApplicationCard application={app} />
              </div>
            ))}
          </CardCarousel>
        )}

        <div className="dashboard-grid-two">
          <CibilCard cibil={cibil} />
          <ExistingLoans />
        </div>

        <div className="dashboard-offers-section">
          <div className="section-title-row">
            <h3>Pre-Approved & Bank Eligibility Offers</h3>
            <Link to="/calculator" className="recalculate-link">
              Recalculate FOIR & EMI
            </Link>
          </div>
          <OffersTable
            offers={
              offers && offers.length > 0
                ? offers
                : [
                    {
                      bankId: 'HDFC',
                      bankName: 'HDFC Bank',
                      interestRate: 10.5,
                      maxEligibleLoan: 1250000,
                      emi: 26800,
                      processingFee: '0.5%',
                    },
                    {
                      bankId: 'ICICI',
                      bankName: 'ICICI Bank',
                      interestRate: 10.75,
                      maxEligibleLoan: 1100000,
                      emi: 23750,
                      processingFee: '0.75%',
                    },
                  ]
            }
            onSelectOffer={handleApplyOffer}
          />
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
