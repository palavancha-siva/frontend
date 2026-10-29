import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../actions/auth';
import './AppLayout.css';

export const AppLayout = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="header-container">
          <Link to="/" className="brand-logo-link">
            <div className="brand-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="brand-name">Finkuby</span>
          </Link>

          <nav className="header-nav">
            <NavLink to="/calculator" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
              Calculator
            </NavLink>
            <NavLink to="/cibil" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
              Credit Health
            </NavLink>
            <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
              Dashboard
            </NavLink>
            <NavLink to="/profile" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
              Profile
            </NavLink>
            <a href="/admin.html" className="nav-item admin-link" target="_blank" rel="noreferrer">
              Admin Portal ↗
            </a>
          </nav>

          <div className="header-actions">
            {isAuthenticated ? (
              <div className="user-profile-badge">
                <span className="user-name">{user?.name || user?.mobile || 'Customer'}</span>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="login-link-btn">
                Customer Sign In
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="app-main-content">{children}</main>

      <footer className="app-footer">
        <div className="footer-content">
          <p>© 2026 Finkuby Institutional Lending Technologies. Powered by LoanSense Underwriting Engine.</p>
          <div className="footer-links">
            <a href="/admin.html">Bank Rule Engine</a>
            <Link to="/coming-soon">Privacy Policy</Link>
            <Link to="/coming-soon">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
