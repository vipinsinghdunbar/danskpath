import { useState, useEffect, lazy, Suspense } from 'react';
import Sidebar from './components/Sidebar';
import BottomNav, { MoreSheet } from './components/BottomNav';
import LandingPage from './components/LandingPage';
import WebsiteView from './components/WebsiteView';
import AssessmentLandingView from './components/AssessmentLandingView';
import ArchitectureMapView from './components/ArchitectureMapView';
import PracticeView from './components/PracticeView';
import PathView from './components/PathView';
const DiagnosticView = lazy(()=>import('./components/DiagnosticView'));
import ProgressView from './components/ProgressView';
import Dashboard from './components/Dashboard';
import AuditView from './components/AuditView';
import CompleteGrammarView from './components/CompleteGrammarView';
import GrammarView from './components/GrammarView';
import VocabView from './components/VocabView';
import ListeningView from './components/ListeningView';
import ConversationView from './components/ConversationView';
import ReadingView from './components/ReadingView';
import WritingView from './components/WritingView';
import PronunciationView from './components/PronunciationView';
import CultureView from './components/CultureView';
import ExamView from './components/ExamView';
import ConnectView from './components/ConnectView';
import ShareTrialView from './components/ShareTrialView';
import ScreenshotsView from './components/ScreenshotsView';
import RepetitionExplainer from './components/RepetitionExplainer';
import FlowView from './components/FlowView';
import LevelExplainerView from './components/LevelExplainerView';
import MotivationView from './components/MotivationView';
import SettingsModal from './components/SettingsModal';
import LoginView from './components/LoginView';
import AdminDashboardView from './components/AdminDashboardView';
import TrialFlowView from './components/TrialFlowView';
import PWAInstallBanner from './components/PWAInstallBanner';
import EphemeralBanner from './components/EphemeralBanner';
import BrandLogo from './components/BrandLogo';
import { isLoggedIn, isAdmin, getUser, fetchMe } from './lib/auth';
import { isTrialLink } from './lib/api';

export default function App() {
  const [active, setActive] = useState(()=>{
    const params = new URLSearchParams(window.location.search);
    const pageParam = params.get('page');
    const hash = window.location.hash.replace('#','');
    
    // Handle /assessment path or ?page=assessment
    if (pageParam) return pageParam;
    if (hash === 'assessment' || window.location.pathname.includes('/assessment')) return 'assessment';
    if (isTrialLink()) return 'trial';
    if (isLoggedIn() && isAdmin()) return 'admin';
    
    // If user has completed diagnostic, go to practice (iPhone app)
    const diag = localStorage.getItem('dansk_diagnostic');
    const trialResult = localStorage.getItem('dansk_trial_result');
    if (diag || trialResult) return 'practice';
    
    // Default to website (public marketing)
    return 'website';
  });

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [user, setUser] = useState(()=>getUser());

  useEffect(()=>{
    // PWA registration
    if('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').then(reg=>{
        console.log('SW registered', reg.scope);
      }).catch(()=>{});
    }

    // Check auth
    if(isLoggedIn()) {
      fetchMe().then(u=>{
        if(u) setUser(u);
        setAuthChecked(true);
      }).catch(()=>setAuthChecked(true));
    } else {
      setAuthChecked(true);
    }

    // Setup admin default account
    fetch('/api/auth/setup', { method: 'POST' }).catch(()=>{});

    // Handle back button for SPA
    const onPopState = () => {
      const params = new URLSearchParams(window.location.search);
      const page = params.get('page');
      if (page) setActive(page);
    };
    window.addEventListener('popstate', onPopState);
    return ()=> window.removeEventListener('popstate', onPopState);
  },[]);

  const handleSetActive = (id) => {
    if(id==='more') {
      setMoreOpen(true);
      return;
    }
    
    // Map old landing to website
    if (id === 'landing') id = 'website';
    
    setActive(id);
    setMoreOpen(false);
    window.scrollTo(0,0);
    
    // Update URL without reload
    const url = new URL(window.location.href);
    if (id === 'website') {
      url.searchParams.delete('page');
      url.pathname = '/';
    } else if (id === 'assessment') {
      url.searchParams.set('page', 'assessment');
      // Also support /assessment path via history
      if (window.location.pathname !== '/assessment') {
        // Keep as query param for simplicity, but also push /assessment for shareable URL
        // We'll keep query param approach for now to avoid server routing issues
      }
    } else {
      url.searchParams.set('page', id);
    }
    window.history.pushState({}, '', url.toString());
  };

  const handleLoggedIn = (u) => {
    setUser(u);
    setActive('admin');
  };

  // Trial link — completely separate experience, no nav (legacy ?friend=true)
  if(isTrialLink() || active==='trial') {
    return <TrialFlowView setActive={handleSetActive} />;
  }

  const render = () => {
    switch(active) {
      // === THREE MAIN EXPERIENCES ===
      case 'website':
      case 'home':
        return <WebsiteView setActive={handleSetActive} />;
      case 'assessment':
      case 'assessment-landing':
        return <AssessmentLandingView setActive={handleSetActive} />;
      case 'architecture':
      case 'arch':
      case 'map':
      case 'flowchart':
        return <ArchitectureMapView setActive={handleSetActive} />;
      
      // Legacy landing (keep for internal)
      case 'landing':
        return <LandingPage setActive={handleSetActive} />;
      
      // Auth & Admin
      case 'login': return <LoginView onLoggedIn={handleLoggedIn} setActive={handleSetActive} />;
      case 'admin': return isLoggedIn() && isAdmin() ? <AdminDashboardView setActive={handleSetActive} /> : <LoginView onLoggedIn={handleLoggedIn} setActive={handleSetActive} />;
      
      // Share / QR
      case 'share': return <ShareTrialView setActive={handleSetActive} />;
      case 'share-qr': return <AssessmentLandingView setActive={handleSetActive} />;
      
      // Full iPhone App — Learning Experience
      case 'practice': return <PracticeView setActive={handleSetActive} />;
      case 'path': return <PathView setActive={handleSetActive} />;
      case 'diagnostic': return <Suspense fallback={<div className="min-h-screen bg-[#F2F2F7] grid place-items-center"><div className="w-10 h-10 rounded-full border-2 border-black/10 border-t-black animate-spin" /></div>}><DiagnosticView setActive={handleSetActive} /></Suspense>;
      case 'progress': return <ProgressView setActive={handleSetActive} />;
      case 'dashboard': return <Dashboard setActive={handleSetActive} />;
      case 'grammar': return <CompleteGrammarView />;
      case 'grammar-old': return <GrammarView />;
      case 'vocab': return <VocabView />;
      case 'listening': return <ListeningView />;
      case 'speaking': return <ConversationView />;
      case 'reading': return <ReadingView />;
      case 'writing': return <WritingView />;
      case 'pronunciation': return <PronunciationView />;
      case 'culture': return <CultureView />;
      case 'exam': return <ExamView />;
      
      // Internal / Docs
      case 'connect': return <ConnectView />;
      case 'screenshots': return <ScreenshotsView setActive={handleSetActive} />;
      case 'repetition': return <RepetitionExplainer />;
      case 'flow': return <FlowView setActive={handleSetActive} />;
      case 'levels': return <LevelExplainerView setActive={handleSetActive} />;
      case 'motivation': return <MotivationView setActive={handleSetActive} />;
      case 'audit': return <AuditView />;
      case 'original': return (
        <div className="h-screen">
          <div className="p-2 bg-black text-white text-[12px] flex justify-between"><span>Original standalone — 761 items, no repeat 14 days</span><button onClick={()=>handleSetActive('website')} className="px-3 py-1 rounded-full bg-white text-black">← Back</button></div>
          <iframe src="/danskpath-standalone.html" className="w-full h-[calc(100vh-40px)] border-0" title="Original" />
        </div>
      );
      default: return <WebsiteView setActive={handleSetActive} />;
    }
  };

  // Navigation visibility logic for three experiences
  const isWebsite = active === 'website' || active === 'home' || active === 'landing';
  const isAssessmentLanding = active === 'assessment' || active === 'assessment-landing' || active === 'share' || active === 'share-qr';
  const isTrial = active === 'trial';
  const isLogin = active === 'login';
  const isAdminView = active === 'admin';
  
  // Show nav only for full iPhone app (learning experience)
  const showNav = !isWebsite && !isAssessmentLanding && !isTrial && !isLogin && !isAdminView;

  if(!authChecked) {
    return <div className="min-h-screen bg-[#F2F2F7] grid place-items-center"><div className="w-10 h-10 rounded-full border-2 border-black/10 border-t-black animate-spin" /></div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F2F2F7] text-black">
      <EphemeralBanner />
      <div className="flex-1 flex min-h-0">
      {showNav && !isAdminView && <Sidebar active={active} setActive={handleSetActive} onSettings={()=>setSettingsOpen(true)} />}
      <div className="flex-1 min-w-0 overflow-hidden">
        {/* Top bar for app (iPhone) — only show in learning experience */}
        {showNav && (
          <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-2xl border-b border-black/5 lg:hidden">
            <div className="h-[56px] px-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-black text-white grid place-items-center text-[11px] font-bold">D</div>
                <span className="text-[14px] font-[700] tracking-tight">DanskPath</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#F2F2F7] border border-black/5">M1→PD3</span>
                {user && <span className="text-[10px] px-2 py-1 rounded-full bg-black text-white">{user.name}</span>}
              </div>
              <div className="flex gap-2">
                {isLoggedIn() && isAdmin() && <button onClick={()=>handleSetActive('admin')} className="text-[11px] font-[600] bg-black text-white px-3 py-1.5 rounded-full">Admin</button>}
                <button onClick={()=>handleSetActive('website')} className="text-[11px] font-[600] bg-[#F2F2F7] px-3 py-1.5 rounded-full">Home</button>
              </div>
            </div>
          </div>
        )}
        {render()}
      </div>
      {showNav && !isAdminView && <BottomNav active={active} setActive={handleSetActive} onSettings={()=>setSettingsOpen(true)} />}
      <MoreSheet active={moreOpen ? 'more' : ''} setActive={handleSetActive} onClose={()=>setMoreOpen(false)} />
      {moreOpen && <div className="lg:hidden fixed inset-0 z-30" onClick={()=>setMoreOpen(false)} />}
      <SettingsModal open={settingsOpen} onClose={()=>setSettingsOpen(false)} />
      
      {/* PWA Install Banner — shows on all experiences if not installed */}
      <PWAInstallBanner />
      </div>
    </div>
  );
}
