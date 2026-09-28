import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught', error, info);
    // Sentry would capture here if added: Sentry.captureException(error)
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F2F2F7] grid place-items-center p-6">
          <div className="bg-white rounded-[24px] p-8 max-w-[480px] w-full border border-black/5 shadow-sm text-center">
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 grid place-items-center mx-auto text-[20px]">!</div>
            <h2 className="mt-4 text-[18px] font-[700]">Something went wrong</h2>
            <p className="mt-2 text-[13px] text-black/50 leading-[1.5]">We logged the error. Try reloading. If it persists, contact support@danskpath.dk</p>
            <pre className="mt-4 p-3 rounded-xl bg-[#F2F2F7] text-[11px] text-left overflow-auto max-h-[120px]">{this.state.error?.message || 'Unknown error'}</pre>
            <div className="mt-6 flex gap-2 justify-center">
              <button onClick={()=>window.location.reload()} className="px-5 py-2.5 rounded-full bg-black text-white text-[13px] font-[600]">Reload</button>
              <button onClick={()=>{ this.setState({ hasError:false, error:null }); window.location.href='/?page=website'; }} className="px-5 py-2.5 rounded-full bg-[#F2F2F7] text-[13px] font-[600]">Go Home</button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
