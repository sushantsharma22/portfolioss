'use client';

import { Component, ReactNode } from 'react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(): State {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    render(): ReactNode {
        if (this.state.hasError) {
            return this.props.fallback ?? (
                <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50 p-8">
                    <div className="text-center max-w-md">
                        <div className="text-6xl mb-4">⚠️</div>
                        <h2 className="text-2xl font-bold text-stone-800 mb-2">
                            Something went wrong
                        </h2>
                        <p className="text-stone-500 mb-6">
                            This section failed to load. Please try again.
                        </p>
                        <button
                            onClick={() => this.setState({ hasError: false })}
                            className="px-6 py-3 bg-stone-800 text-white font-semibold rounded-full hover:bg-stone-700 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
