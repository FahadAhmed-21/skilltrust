// src/components/ErrorBoundary.js
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details for debugging
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = '/dashboard';
  };

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '40px',
          background: 'var(--bg-primary, #0a0e27)',
          color: 'var(--text-primary, #ffffff)'
        }}>
          <div style={{
            maxWidth: '600px',
            textAlign: 'center',
            background: 'var(--bg-secondary, #1a2332)',
            padding: '40px',
            borderRadius: '16px',
            border: '1px solid var(--border, #2a3a4a)'
          }}>
            <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>⚠️</h1>
            <h2 style={{ fontSize: '24px', marginBottom: '16px', color: 'var(--accent, #7c3aed)' }}>
              Oops! Something went wrong
            </h2>
            <p style={{ fontSize: '16px', marginBottom: '24px', color: 'var(--text-secondary, #9ca3af)' }}>
              We encountered an unexpected error. Don't worry, your data is safe.
            </p>
            
            {this.state.error && (
              <details style={{
                marginBottom: '24px',
                textAlign: 'left',
                background: 'var(--bg-tertiary, #0f1729)',
                padding: '16px',
                borderRadius: '8px',
                fontSize: '14px',
                color: 'var(--text-secondary, #9ca3af)'
              }}>
                <summary style={{ cursor: 'pointer', marginBottom: '8px', fontWeight: '600' }}>
                  Error Details
                </summary>
                <pre style={{ whiteSpace: 'pre-wrap', overflow: 'auto' }}>
                  {this.state.error.toString()}
                  {this.state.errorInfo && this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
            
            <button
              onClick={this.handleReset}
              style={{
                padding: '12px 24px',
                fontSize: '16px',
                fontWeight: '600',
                background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'transform 0.2s'
              }}
              onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
