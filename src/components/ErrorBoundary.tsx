'use client'

import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Only log non-fetch, non-FullStory, and non-clipboard errors in development
    if (
      !error.message.includes('Failed to fetch') &&
      !error.stack?.includes('fullstory') &&
      !error.stack?.includes('FullStory') &&
      !error.message.includes('Clipboard API') &&
      !error.message.includes('writeText') &&
      !error.message.includes('NotAllowedError')
    ) {
      console.error('Error caught by boundary:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      // Don't show error UI for fetch/FullStory/clipboard related errors
      if (
        this.state.error?.message.includes('Failed to fetch') ||
        this.state.error?.stack?.includes('fullstory') ||
        this.state.error?.stack?.includes('FullStory') ||
        this.state.error?.message.includes('Clipboard API') ||
        this.state.error?.message.includes('writeText') ||
        this.state.error?.message.includes('NotAllowedError')
      ) {
        return this.props.children;
      }

      return this.props.fallback || (
        <div className="flex items-center justify-center min-h-[200px] p-4">
          <div className="text-center">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Bir şeyler ters gitti
            </h2>
            <p className="text-gray-600 mb-4">
              Sayfa yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Sayfayı Yenile
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
