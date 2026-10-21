import { useState, useEffect, lazy, Suspense } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import EphemeralBanner from './components/EphemeralBanner';
import PWAInstallBanner from './components/PWAInstallBanner';
import WebAppShell from './components/WebAppShell';
import WebDashboard from './components/WebDashboard';
import HomePage from './components/HomePage';
import LoginView from './components/LoginView';
import AdminPanel from './components/AdminPanel';
import UserLessonDashboard from './components/UserLessonDashboard';
import LessonTaker from './components/LessonTaker';
import ProgressAnalytics from './components/ProgressAnalytics';
import ProficiencyTest from './components/ProficiencyTest';
import RecommendedLessons from './components/RecommendedLessons';
import DailyPractice from './components/DailyPractice';
import PracticeSession from './components/PracticeSession';
import SurpriseTest from './components/SurpriseTest';
import './styles/web-design-system.css';

const DailySession = lazy(()=>import('./components/DailySession'));
const DiagnosticView = lazy(()=>import('./components/DiagnosticView'));
const PostAssessmentDashboard = lazy(()=>import('./components/PostAssessmentDashboard'));
const LearningRoadmapView = lazy(()=>import('./components/LearningRoadmapView'));
const ProgressDashboard = lazy(()=>import('./components/ProgressDashboard'));
const LessonView = lazy(()=>import('./components/LessonView'));

export default function App() {
  // Auth state
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  // Determine initial page based on auth and local state
  const [page, setPage] = useState(()=>{
    const diagnostic = localStorage.getItem('dansk_diagnostic');
    const hasVisitedBefore = localStorage.getItem('dansk_visited');
    if (!hasVisitedBefore) return 'home';
    return diagnostic ? 'dashboard' : 'assessment';
  });

  const [resumeSection, setResumeSection] = useState(null);
  const [currentLessonId, setCurrentLessonId] = useState(null);
  const [showAdmin, setShowAdmin] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);

  // Auth state listener - localStorage only
  useEffect(() => {
    const checkAuth = () => {
      try {
        const userId = localStorage.getItem('dansk_user_id');
        const userEmail = localStorage.getItem('dansk_user_email');

        if (userId && userEmail) {
          setUser({ id: userId, email: userEmail });
          setUserProfile({ id: userId, email: userEmail });
          // A returning learner who has been placed lands straight on today's
          // session: this is a daily-practice tool, so the default screen is
          // the practice itself rather than a dashboard about it. Anyone not
          // yet placed goes to the diagnostic first so the session engine has
          // a level to build from.
          setPage(localStorage.getItem('dansk_diagnostic') ? 'session' : 'assessment');
        } else {
          setUser(null);
          setUserProfile(null);
          setPage('login');
        }
      } catch (err) {
        console.error('Auth check error:', err);
        setPage('login');
      }
      setAuthChecked(true);
    };

    checkAuth();
  }, []);

  // PWA registration
  useEffect(()=>{
    if('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(()=>{});
    }
  },[]);

  const handleAuthSuccess = () => {
    // This used to only set authChecked and rely on "the useEffect auth
    // listener" to pick the new user up — but that effect has an empty
    // dependency array and runs once on mount, so there is no listener. The
    // account was created in localStorage and the screen stayed on the signup
    // form: a new user had to guess that reloading would let them in. So read
    // the session straight back here.
    const userId = localStorage.getItem('dansk_user_id');
    const userEmail = localStorage.getItem('dansk_user_email');

    if (userId && userEmail) {
      setUser({ id: userId, email: userEmail });
      setUserProfile({ id: userId, email: userEmail });
      setPage(localStorage.getItem('dansk_diagnostic') ? 'session' : 'assessment');
    }
    setAuthChecked(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('dansk_user_id');
    localStorage.removeItem('dansk_user_email');
    setUser(null);
    setUserProfile(null);
    setPage('login');
  };

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

    // Update Firestore with diagnostic results if user is authenticated
    if (user && userProfile) {
      // TODO: Save diagnostic to Firestore users/{userId}.diagnosticTest
    }

    setPage('session');
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

  const handleStartLesson = (lessonId) => {
    setCurrentLessonId(lessonId);
    setPage('lesson-taker');
  };

  const handleBackFromLesson = () => {
    setCurrentLessonId(null);
    setPage('user-dashboard');
  };

  const handleOpenAdmin = () => {
    setShowAdmin(true);
    setPage('admin');
  };

  const handleCloseAdmin = () => {
    setShowAdmin(false);
    setPage('user-dashboard');
  };

  const handleViewAnalytics = () => {
    setPage('analytics');
  };

  const handleBackFromAnalytics = () => {
    setPage('user-dashboard');
  };

  const handleTakeProficiencyTest = () => {
    setPage('proficiency-test');
  };

  const handleTestComplete = (results) => {
    setTestCompleted(true);
    setPage('user-dashboard');
  };

  const handleViewRecommendations = () => {
    setPage('recommendations');
  };

  const handleViewDailyPractice = () => {
    setPage('daily-practice');
  };

  const handleStartPracticeSession = (type) => {
    setPage('practice-session');
  };

  const handleTakeSurpriseTest = () => {
    setPage('surprise-test');
  };

  if(!authChecked) {
    return <div className="min-h-screen bg-[#F2F2F7] grid place-items-center"><div className="w-10 h-10 rounded-full border-2 border-black/10 border-t-black animate-spin" /></div>;
  }

  // Not authenticated, show login
  if (!user) {
    return (
      <ErrorBoundary>
        <LoginView onAuthSuccess={handleAuthSuccess} />
      </ErrorBoundary>
    );
  }

  // Authenticated, show main app
  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col bg-white text-gray-900">
        <EphemeralBanner />
        {/* Was built but never rendered, so the install prompt never appeared —
            the app shipped a service worker and manifest with no way in. */}
        <PWAInstallBanner />
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
                <PostAssessmentDashboard onStartLesson={handleStartLessons} onLogout={handleLogout} />
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
                <LessonView onBackToDashboard={handleBackToDashboard} resumeFromSection={resumeSection} userId={user?.uid} />
              </WebAppShell>
            </Suspense>
          )}
          {page === 'admin' && (
            <AdminPanel onClose={handleCloseAdmin} />
          )}
          {page === 'user-dashboard' && (
            <UserLessonDashboard
              onStartLesson={handleStartLesson}
              onOpenAdmin={handleOpenAdmin}
              onViewAnalytics={handleViewAnalytics}
              onTakeProficiencyTest={handleTakeProficiencyTest}
              onViewRecommendations={handleViewRecommendations}
              onViewDailyPractice={handleViewDailyPractice}
              onTakeSurpriseTest={handleTakeSurpriseTest}
            />
          )}
          {page === 'lesson-taker' && currentLessonId && (
            <LessonTaker
              lessonId={currentLessonId}
              onBack={handleBackFromLesson}
            />
          )}
          {page === 'analytics' && (
            <ProgressAnalytics />
          )}
          {page === 'proficiency-test' && (
            <ProficiencyTest
              onTestComplete={handleTestComplete}
              onBack={() => setPage('user-dashboard')}
            />
          )}
          {page === 'recommendations' && (
            <RecommendedLessons
              onStartLesson={handleStartLesson}
            />
          )}
          {page === 'daily-practice' && (
            <DailyPractice
              onStartPractice={handleStartPracticeSession}
              onBack={() => setPage('user-dashboard')}
            />
          )}
          {page === 'practice-session' && (
            <PracticeSession
              onBack={() => setPage('user-dashboard')}
            />
          )}
          {page === 'surprise-test' && (
            <SurpriseTest
              onBack={() => setPage('user-dashboard')}
            />
          )}
          {page === 'session' && (
            <Suspense fallback={<div className="min-h-screen bg-[#FCFBF7] grid place-items-center"><div className="w-10 h-10 rounded-full border-2 border-black/10 border-t-black animate-spin" /></div>}>
              <DailySession onBack={() => setPage('dashboard')} />
            </Suspense>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}
