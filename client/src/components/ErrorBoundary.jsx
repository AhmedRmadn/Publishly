import React from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Link } from "react-router-dom";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });

    // Log error to console in development
    if (process.env.NODE_ENV === "development") {
      console.error("Error caught by boundary:", error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-white p-4">
          <div className="max-w-md w-full bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-lg">
            <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-10 h-10 text-red-600" />
            </div>

            <h1 className="text-2xl font-bold text-black mb-4">
              Oops! Something went wrong
            </h1>

            <p className="text-gray-600 mb-6">
              We encountered an unexpected error. Please try refreshing the page
              or return to the home page.
            </p>

            <div className="space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <RefreshCw className="w-5 h-5" />
                Refresh Page
              </button>

              <Link
                to="/home"
                className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-black font-semibold py-3 px-6 rounded-lg border border-gray-200 transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <Home className="w-5 h-5" />
                Go Home
              </Link>
            </div>

            {process.env.NODE_ENV === "development" && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="text-red-600 cursor-pointer hover:text-red-700">
                  Error Details (Development)
                </summary>
                <pre className="mt-2 text-xs text-red-700 bg-red-50 p-3 rounded overflow-auto border border-red-200">
                  {this.state.error && this.state.error.toString()}
                  {this.state.errorInfo && this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
