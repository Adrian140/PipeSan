import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Add error boundary for debugging
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('React Error Boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
          <h1>Something went wrong</h1>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

// Test if React is working
console.log('React version:', React.version);

// Check environment configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('Environment check:', {
  SUPABASE_URL: supabaseUrl ? (supabaseUrl.startsWith('https://') ? 'VALID' : 'INVALID FORMAT') : 'NOT SET',
  SUPABASE_KEY: supabaseKey ? (supabaseKey.length > 50 ? 'VALID' : 'INVALID LENGTH') : 'NOT SET',
  MODE: (!supabaseUrl || !supabaseKey) ? 'DEMO MODE' : 'PRODUCTION MODE'
});
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
    <App />
    </ErrorBoundary>
  </React.StrictMode>
);
