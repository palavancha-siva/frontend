import React from 'react';
import './ErrorBoundary.css';
import Btn from './Btn';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-wrapper">
          <div className="error-card">
            <h2>Something went wrong</h2>
            <p>An unexpected error occurred while processing your request.</p>
            <Btn variant="primary" onClick={this.handleReload}>
              Reload Application
            </Btn>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
