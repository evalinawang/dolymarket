'use client';

import React, { ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: Error, retry: () => void) => ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  retry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback?.(this.state.error!, this.retry) || (
          <div className="flex flex-col items-center justify-center py-12 px-4 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-900 m-4">
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 rounded-full">
              <AlertTriangle size={32} className="text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-2">
              Oops! Something went wrong
            </h3>
            <p className="text-sm text-red-700 dark:text-red-300 text-center max-w-sm mb-4">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <button
              onClick={this.retry}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
            >
              Try Again
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
