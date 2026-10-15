import { useState, useEffect, lazy, Suspense } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import EphemeralBanner from './components/EphemeralBanner';
import WebAppShell from './components/WebAppShell';
import WebDashboard from './components/WebDashboard';
import HomePage from './components/HomePage';
import './styles/web-design-system.css';

const DiagnosticView = lazy(()=>import('./components/DiagnosticView'));
const PostAssessmentDashboard = lazy(()=>import('./components/PostAssessmentDashboard'));
const LearningRoadmapView = lazy(()=>import('./components/LearningRoadmapView'));
const ProgressDashboard = lazy(()=>import('./components/ProgressDashboard'));
const LessonView = lazy(()=>import('./components/LessonView'));

export default function App() {
  // Check if user has completed assessment: home -> assessment -> dashboard
  const [page, setPage] = useState(()=>{
    const diagnostic = localStorage.getItem('dansk_diagnostic');
    const hasVisitedBefore = localStorage.getItem('dansk_visited');
    if (!hasVisitedBefore) return 'home';
    return diagnostic ? 'dashboard' : 'assessment';
  });

  const [authChecked, setAuthChecked] = useState(true);

  // PWA registration
  useEffect(()=>{
    if('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(()=>{});
    }
  },[]);

  const handleAssessmentComplete = () => {
    // After assessment completes, save to history and go to dashboard
    const diagnostic = localStorage.getItem('dansk_diagnostic');
    const verdict = localStorage.getItem('dansk_verdict');

    if (diagnostic && verdict) {
      // Add to history
      const history = JSON.parse(localStorage.getItem('dansk_assessment_history') || '[]');
      const entry = {
        timestamp: new Date().toISOString(),
        diagnostic: JSON.parse(diagnostic),
        verdict: JSON.parse(verdict),
        id: Date.now()
      };
      history.push(entry);
      localStorage.setItem('dansk_assessment_history', JSON.stringify(history));
    }

    setPage('dashboard');
  };

  const handleRetakeAssessment = () => {
    // Clear current assessment but keep history
    localStorage.removeItem('dansk_diagnostic');
    localStorage.removeItem('dansk_verdict');
    localStorage.removeItem('dansk_level');
    localStorage.removeItem('dansk_assessment_idx');
    localStorage.removeItem('dansk_assessment_answers');
    setPage('assessment');
  };

  const handleViewRoadmap = () => {
    setPage('roadmap');
  };

  const handleStartLessons = (lessonId) => {
    setPage('lessons');
  };

  const handleBackToDashboard = () => {
    setPage('dashboard');
  };

  const handleStartAssessment = () => {
    localStorage.setItem('dansk_visited', 'true');
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
          {page === 'home' && (
            <HomePage onStartAssessment={handleStartAssessment} />
          )}
          {page === 'assessment' && (
            <Suspense fallback={<div className="min-h-screen bg-[#F2F2F7] grid place-items-center"><div className="w-10 h-10 rounded-full border-2 border-black/10 border-t-black animate-spin" /></div>}>
              <DiagnosticView onComplete={handleAssessmentComplete} />
            </Suspense>
          )}
          {page === 'dashboard' && (
            <Suspense fallback={<div className="min-h-screen bg-slate-50 grid place-items-center"><div className="w-10 h-10 rounded-full border-2 border-slate-300 border-t-amber-600 animate-spin" /></div>}>
              <WebAppShell variant="dashboard" showSidebar={false}>
                <PostAssessmentDashboard onStartLesson={handleStartLessons} />
              </WebAppShell>
            </Suspense>
          )}
          {page === 'roadmap' && (
            <Suspense fallback={<div className="min-h-screen bg-[#F2F2F7] grid place-items-center"><div className="w-10 h-10 rounded-full border-2 border-black/10 border-t-black animate-spin" /></div>}>
              <LearningRoadmapView onRetake={handleRetakeAssessment} onStartLessons={handleStartLessons} />
            </Suspense>
          )}
          {page === 'lessons' && (
            <Suspense fallback={<div className="min-h-screen bg-slate-50 grid place-items-center"><div className="w-10 h-10 rounded-full border-2 border-slate-300 border-t-amber-600 animate-spin" /></div>}>
              <WebAppShell variant="lesson" showSidebar={true}>
                <LessonView onBackToDashboard={handleBackToDashboard} />
              </WebAppShell>
            </Suspense>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}
