import { useState, useEffect, lazy, Suspense } from 'react';
import Sidebar from './components/Sidebar';
import BottomNav, { MoreSheet } from './components/BottomNav';
import LandingPage from './components/LandingPage';
import SimpleLandingView from './components/SimpleLandingView';
import WebsiteView from './components/WebsiteView';
import WelcomeView from './components/WelcomeView';
import AssessmentLandingView from './components/AssessmentLandingView';
import ArchitectureMapView from './components/ArchitectureMapView';
import PracticeView from './components/PracticeView';
import PrivacyView from './components/PrivacyView';
import TermsView from './components/TermsView';
import SecurityView from './components/SecurityView';
import RoadmapView from './components/RoadmapView';
import ErrorBoundary from './components/ErrorBoundary';
import PathView from './components/PathView';
import RegisterView from './components/RegisterView';
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
import { loadServerToLocal, syncLocalToServer } from './lib/progressSync';

export default function App() {
  const [active, setActive] = useState(()=>{
    const params = new URLSearchParams(window.location.search);
    const pageParam = params.get('page');
    const hash = window.location.hash.replace('#','');
    const pathname = window.location.pathname;
    
    // Handle pretty URLs — Per spec: Open → Understand → Assessment → Results → Path → Create Account → Transfer → Dashboard
    if (pageParam) return pageParam;
    if (hash) return hash;
    if (pathname.includes('/assessment')) return 'assessment';
    if (pathname.includes('/welcome')) return 'welcome';
    if (pathname.includes('/diagnostic')) return 'diagnostic';
    if (pathname.includes('/register')) return 'register';
    if (pathname.includes('/simple-landing')) return 'simple-landing';
    if (pathname.includes('/architecture') || pathname.includes('/arch') || pathname.includes('/map') || pathname.includes('/flowchart')) return 'architecture';
    if (pathname.includes('/roadmap') || pathname.includes('/road')) return 'roadmap';
    if (pathname.includes('/privacy') || pathname.includes('/privatliv')) return 'privacy';
    if (pathname.includes('/terms') || pathname.includes('/vilkar')) return 'terms';
    if (pathname.includes('/security') || pathname.includes('/audit') || pathname.includes('/launch')) return 'security';
    if (pathname.includes('/website')) return 'website';
    if (pathname.includes('/practice')) return 'practice';
    if (pathname.includes('/path')) return 'path';
    if (pathname.includes('/progress')) return 'progress';
    if (pathname.includes('/login')) return 'login';
    if (pathname.includes('/admin')) return 'admin';
    if (pathname.includes('/share')) return 'share';
    if (isTrialLink()) return 'trial';
    if (isLoggedIn() && isAdmin()) return 'admin';
    
    // Per spec: Do NOT force account before value
    // Guest can: view landing, start assessment, complete, see level, strengths/weaknesses, path preview, decide account
    // Returning learner: login → current journey → current exercise (no repeat assessment)
    const diag = localStorage.getItem('dansk_diagnostic');
    const isLoggedInUser = isLoggedIn();
    
    // If user has completed diagnostic AND is logged in, go to practice (continue journey)
    if (diag && isLoggedInUser) return 'practice';
    
    // If user has completed diagnostic but not logged in, show path preview (decide to start learning)
    if (diag && !isLoggedInUser) return 'path';
    
    // If logged in but no diagnostic, go to assessment (find level)
    if (isLoggedInUser && !diag) return 'assessment';
    
    // Default for new users — simple landing per spec: logo, headline, one-sentence, CTA Take the Test, secondary login, discreet admin
    // This allows guest to understand value before account creation
    if (pathname === '/') return 'simple-landing';
    
    return 'simple-landing';
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

    // Check auth + sync progress for cross-device persistence (Fortsæt her)
    if(isLoggedIn()) {
      fetchMe().then(async u=>{
        if(u) {
          setUser(u);
          // Load server progress → local (for cross-device persistence)
          try {
            await loadServerToLocal();
            console.log('✅ Progress loaded from server → local (cross-device)');
            // Then sync local → server (merge)
            await syncLocalToServer();
            console.log('✅ Progress synced local → server');
          } catch {}
        }
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

  const handleLoggedIn = async (u) => {
    setUser(u);
    // Sync progress on login for cross-device persistence
    try {
      await loadServerToLocal();
      await syncLocalToServer();
      console.log('✅ Progress synced on login — Fortsæt her persists across devices');
    } catch {}
    // If admin, go to admin, else practice
    if(u && u.role==='admin') setActive('admin');
    else setActive('practice');
  };

  // Trial link — completely separate experience, no nav (legacy ?friend=true)
  if(isTrialLink() || active==='trial') {
    return <TrialFlowView setActive={handleSetActive} />;
  }

  const render = () => {
    switch(active) {
      // === iPhone-first Onboarding Flow: Welcome → Login → Assessment → Diagnostic → Path → Practice ===
      case 'welcome':
        return <WelcomeView setActive={(id)=>{
          if(id==='login') localStorage.setItem('dansk_welcomed', 'true');
          handleSetActive(id);
        }} />;
      // === THREE MAIN EXPERIENCES ===
      // For basic person, website/marketing is NOT homepage — redirect to simple-landing (homepage is SimpleLandingView at /)
      // Only admin can see Website, Architecture, Roadmap, Share QR, etc — learner should stay on app
      case 'website':
      case 'home':
      case 'landing':
        // If admin, show WebsiteView, else redirect to simple-landing (ONE homepage only)
        if (isAdmin()) return <WebsiteView setActive={handleSetActive} />;
        return <SimpleLandingView setActive={handleSetActive} />;
      case 'assessment':
      case 'assessment-landing':
        return <AssessmentLandingView setActive={handleSetActive} />;
      case 'architecture':
      case 'arch':
      case 'map':
      case 'flowchart':
      case 'flow':
      case 'levels':
      case 'motivation':
      case 'screenshots':
      case 'audit':
        // Dev/internal pages — only admin, learner stays on app
        if (isAdmin()) {
          if (['architecture','arch','map','flowchart','flow'].includes(active)) return <ArchitectureMapView setActive={handleSetActive} />;
          if (['levels'].includes(active)) return <LevelExplainerView setActive={handleSetActive} />;
          if (['motivation'].includes(active)) return <MotivationView setActive={handleSetActive} />;
          if (['screenshots'].includes(active)) return <ScreenshotsView setActive={handleSetActive} />;
          if (['audit'].includes(active)) return <AuditView setActive={handleSetActive} />;
        }
        return <SimpleLandingView setActive={handleSetActive} />;
      case 'privacy':
      case 'privatliv':
        return <PrivacyView setActive={handleSetActive} />;
      case 'terms':
      case 'vilkar':
        return <TermsView setActive={handleSetActive} />;
      case 'security':
      case 'launch':
        return <SecurityView setActive={handleSetActive} />;
      case 'roadmap':
      case 'road':
      case 'plan':
        if (isAdmin()) return <RoadmapView setActive={handleSetActive} />;
        return <SimpleLandingView setActive={handleSetActive} />;
      
      // Auth & Admin - per spec: simple register with guest transfer
      case 'register': return <RegisterView setActive={handleSetActive} />;
      case 'login': return <LoginView onLoggedIn={handleLoggedIn} setActive={handleSetActive} />;
      case 'simple-landing': return <SimpleLandingView setActive={handleSetActive} />;
      case 'admin': return isLoggedIn() && isAdmin() ? <AdminDashboardView setActive={handleSetActive} /> : <LoginView onLoggedIn={handleLoggedIn} setActive={handleSetActive} />;
      
      // Share / QR — only admin, learner stays on app
      case 'share':
        if (isAdmin()) return <ShareTrialView setActive={handleSetActive} />;
        return <SimpleLandingView setActive={handleSetActive} />;
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
      
      // Internal / Docs — only admin for learner, else redirect to simple-landing (ONE homepage only)
      case 'connect': 
        if (isAdmin()) return <ConnectView />;
        return <SimpleLandingView setActive={handleSetActive} />;
      case 'repetition': 
        if (isAdmin()) return <RepetitionExplainer />;
        return <SimpleLandingView setActive={handleSetActive} />;
      case 'original': return (
        <div className="h-screen">
          <div className="p-2 bg-black text-white text-[12px] flex justify-between"><span>Original standalone — 761 items, no repeat 14 days</span><button onClick={()=>handleSetActive('website')} className="px-3 py-1 rounded-full bg-white text-black">← Back</button></div>
          <iframe src="/danskpath-standalone.html" className="w-full h-[calc(100vh-40px)] border-0" title="Original" />
        </div>
      );
      default: return <SimpleLandingView setActive={handleSetActive} />;
    }
  };

  // Navigation visibility logic per spec: Guest = Home only, Learner = Home My Path Progress Profile, Admin separate
  const isWebsite = active === 'website' || active === 'home' || active === 'landing';
  const isSimpleLanding = active === 'simple-landing';
  const isAssessmentLanding = active === 'assessment' || active === 'assessment-landing' || active === 'share' || active === 'share-qr';
  const isPublicLegal = active === 'privacy' || active === 'terms' || active === 'security' || active === 'architecture' || active === 'roadmap';
  const isTrial = active === 'trial';
  const isLogin = active === 'login';
  const isRegister = active === 'register';
  const isWelcome = active === 'welcome';
  const isDiagnostic = active === 'diagnostic';
  const isAdminView = active === 'admin';
  
  // Show nav only for full iPhone app (learning experience) — NOT during onboarding, assessment, or auth per spec
  // Guest: Home only, Learner: Home My Path Progress Profile, Admin separate
  const showNav = !isWebsite && !isSimpleLanding && !isAssessmentLanding && !isPublicLegal && !isTrial && !isLogin && !isRegister && !isWelcome && !isDiagnostic && !isAdminView;

  if(!authChecked) {
    return <div className="min-h-screen bg-[#F2F2F7] grid place-items-center"><div className="w-10 h-10 rounded-full border-2 border-black/10 border-t-black animate-spin" /></div>;
  }

  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  );
}
