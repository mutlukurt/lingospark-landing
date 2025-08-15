import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-background-start to-background-end flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center">
            <div className="bg-white/60 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-lg">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
              
              <h1 className="text-xl font-heading font-bold text-text-primary mb-2">
                Oops! Something went wrong
              </h1>
              
              <p className="text-text-secondary mb-6">
                We're sorry, but something unexpected happened. Please try refreshing the page.
              </p>
              
              <button
                onClick={this.handleReload}
                className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 rounded-xl transition-all duration-300 flex items-center gap-2 mx-auto"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh Page
              </button>
              
              {import.meta.env.DEV && this.state.error && (
                <details className="mt-6 text-left">
                  <summary className="text-sm text-text-secondary cursor-pointer">
                    Error Details (Development)
                  </summary>
                  <pre className="mt-2 p-3 bg-red-50 rounded-lg text-xs text-red-700 overflow-auto">
                    {this.state.error.toString()}
                  </pre>
                </details>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
