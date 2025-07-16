import React from "react";

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<React.PropsWithChildren<{}>, ErrorBoundaryState> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // You can log error info here
    // console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-center p-8">
          <h1 className="text-4xl font-bold text-red-600 mb-4">Something went wrong</h1>
          <p className="mb-4 text-gray-700">{this.state.error?.message || "An unexpected error occurred."}</p>
          <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition" onClick={() => window.location.reload()}>Reload</button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary; 