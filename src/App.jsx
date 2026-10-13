import { useState, useEffect, lazy, Suspense } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import EphemeralBanner from './components/EphemeralBanner';
const DiagnosticView = lazy(()=>import('./components/DiagnosticView'));
const LearningRoadmapView = lazy(()=>import('./components/LearningRoadmapView'));

export default function App() {
  // MVP Simple: Check if user has completed assessment
  const [page, setPage] = useState(()=>{
    const diagnostic = localStorage.getItem('dansk_diagnostic');
    return diagnostic ? 'roadmap' : 'assessment';
  });

  const [authChecked, setAuthChecked] = useState(true);

  // PWA registration
  useEffect(()=>{
    if('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(()=>{});
    }
  },[]);

  const handleAssessmentComplete = () => {
    // After assessment completes and results are shown, user can proceed to roadmap
    setPage('roadmap');
  };

  const handleRetakeAssessment = () => {
    localStorage.removeItem('dansk_diagnostic');
    localStorage.removeItem('dansk_verdict');
    localStorage.removeItem('dansk_level');
    setPage('assessment');
  };

  if(!authChecked) {
    return <div className="min-h-screen bg-[#F2F2F7] grid place-items-center"><div className="w-10 h-10 rounded-full border-2 border-black/10 border-t-black animate-spin" /></div>;
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col bg-white text-gray-900">
        <EphemeralBanner />
        <div className="flex-1 overflow-auto">
          {page === 'assessment' && (
            <Suspense fallback={<div className="min-h-screen bg-[#F2F2F7] grid place-items-center"><div className="w-10 h-10 rounded-full border-2 border-black/10 border-t-black animate-spin" /></div>}>
              <DiagnosticView onComplete={handleAssessmentComplete} />
            </Suspense>
          )}
          {page === 'roadmap' && (
            <Suspense fallback={<div className="min-h-screen bg-[#F2F2F7] grid place-items-center"><div className="w-10 h-10 rounded-full border-2 border-black/10 border-t-black animate-spin" /></div>}>
              <LearningRoadmapView onRetake={handleRetakeAssessment} />
            </Suspense>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}
