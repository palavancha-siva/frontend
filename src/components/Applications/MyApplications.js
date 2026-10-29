import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import AppLayout from '../Layout/AppLayout';
import ApplicationCard from '../Dashboard/ApplicationCard';
import Btn from '../Common/Btn';
import { fetchApplications } from '../../actions/portal';
import './MyApplications.css';

export const MyApplications = () => {
  const dispatch = useDispatch();
  const { applications, loading } = useSelector((state) => state.portal);

  useEffect(() => {
    dispatch(fetchApplications());
  }, [dispatch]);

  return (
    <AppLayout>
      <div className="my-applications-page container">
        <div className="page-header-row">
          <div>
            <h2>My Loan Applications</h2>
            <p>Review real-time status and disbursement stages across all partner banks</p>
          </div>
          <Link to="/calculator">
            <Btn variant="primary">+ New Application</Btn>
          </Link>
        </div>

        {applications && applications.length > 0 ? (
          <div className="applications-grid">
            {applications.map((app) => (
              <ApplicationCard key={app.id} application={app} />
            ))}
          </div>
        ) : (
          <div className="no-applications card">
            <h3>No Active Applications</h3>
            <p>You haven't submitted any loan applications yet.</p>
            <Link to="/calculator">
              <Btn variant="primary" className="mt-4">
                Check Eligibility & Apply
              </Btn>
            </Link>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default MyApplications;
