import { useState, useEffect, lazy, Suspense } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import ErrorBoundary from './components/ErrorBoundary';
import EphemeralBanner from './components/EphemeralBanner';
import WebAppShell from './components/WebAppShell';
import WebDashboard from './components/WebDashboard';
import HomePage from './components/HomePage';
import LoginView from './components/LoginView';
import { auth, db } from './firebase';
import './styles/web-design-system.css';

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

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in
        setUser(firebaseUser);

        // Fetch user profile from Firestore
        try {
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const profile = userDocSnap.data();
            setUserProfile(profile);

            // Determine where to route based on profile
            if (profile.diagnosticTest) {
              // User has completed diagnostic
              // Check if they have in-progress lesson
              const lessonProgress = profile.lessonProgress;
              for (const [lessonId, progress] of Object.entries(lessonProgress)) {
                if (progress.status === 'in-progress') {
                  // Resume lesson from last section
                  setResumeSection(progress.currentSection);
                  setPage('lessons');
                  break;
                }
              }
              // No in-progress lesson, show dashboard
              if (page !== 'lessons') {
                setPage('dashboard');
              }
            } else {
              // User hasn't done diagnostic yet
              setPage('assessment');
            }
          }
        } catch (err) {
          console.error('Error fetching user profile:', err);
        }
      } else {
        // User is signed out
        setUser(null);
        setUserProfile(null);
        setPage('login');
      }
      setAuthChecked(true);
    });

    return () => unsubscribe();
  }, []);

  // PWA registration
  useEffect(()=>{
    if('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(()=>{});
    }
  },[]);

  const handleAuthSuccess = () => {
    // Auth succeeded, will be picked up by useEffect auth listener
    setAuthChecked(true);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('dansk_user_id');
      localStorage.removeItem('dansk_user_email');
      setUser(null);
      setUserProfile(null);
      setPage('login');
    } catch (err) {
      console.error('Logout error:', err);
    }
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
        </div>
      </div>
    </ErrorBoundary>
  );
}
