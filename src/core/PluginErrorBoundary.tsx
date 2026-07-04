import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  pluginName: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class PluginErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`PluginErrorBoundary caught an error from "${this.props.pluginName}":`, error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-800 my-2 text-sm">
          <div className="font-semibold flex items-center gap-2">
            <svg className="w-5.h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Plugin Failed: {this.props.pluginName}
          </div>
          <p className="mt-1 text-xs text-red-600 font-mono overflow-auto max-h-24">
            {this.state.error?.message || 'Unknown render error'}
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
