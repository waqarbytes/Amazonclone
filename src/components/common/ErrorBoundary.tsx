import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from './Button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught application error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-amazon-bg flex items-center justify-center p-6 text-center">
          <div className="bg-white border border-gray-200 rounded-lg p-8 max-w-md w-full shadow-md space-y-4">
            <div className="w-12 h-12 bg-amber-50 text-amazon-amber rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold text-amazon-text">
              Something went wrong
            </h1>
            <p className="text-xs text-amazon-muted leading-relaxed">
              An unexpected error occurred while loading this view. You can return to the storefront or refresh the page.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <Button variant="primary" size="md" onClick={this.handleReset}>
                <RefreshCw className="w-4 h-4 mr-1.5" /> Return to Storefront
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
