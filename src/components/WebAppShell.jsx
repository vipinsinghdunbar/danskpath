import React, { useState, useEffect } from 'react';

/**
 * WebAppShell — Web-first layout for Lad os Snakker Dansk
 * Optimized for desktop/tablet, responsive to mobile
 *
 * Layout structure:
 * - Header: Navigation + branding
 * - Sidebar (desktop): Navigation + progress
 * - Main content area: Flexible for lesson or dashboard
 * - Footer: Minimal (desktop), integrated (mobile)
 */

export default function WebAppShell({
  children,
  title = "Lad os Snakker Dansk",
  showSidebar = true,
  variant = 'lesson' // 'lesson', 'dashboard', 'settings'
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="web-app-shell min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo + Title */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
                aria-label="Toggle sidebar"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-amber-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  Ø
                </div>
                <h1 className="hidden sm:block text-lg font-bold text-slate-900">Lad os Snakker Dansk</h1>
              </div>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors" aria-label="Settings">
                <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
              <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors" aria-label="Profile">
                <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex">
        {/* Sidebar (hidden on mobile unless open) */}
        {showSidebar && (
          <>
            {/* Desktop sidebar */}
            <aside className="hidden lg:block w-64 bg-white border-r border-slate-200 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto">
              <nav className="p-6 space-y-2">
                <NavSection title="Learning">
                  <NavItem href="#" label="Dashboard" icon="home" active />
                  <NavItem href="#" label="Continue Lesson" icon="play" />
                  <NavItem href="#" label="All Lessons" icon="book" />
                </NavSection>

                <NavSection title="Progress">
                  <ProgressWidget />
                </NavSection>

                <NavSection title="Tools">
                  <NavItem href="#" label="Vocabulary List" icon="list" />
                  <NavItem href="#" label="Practice Tests" icon="check" />
                  <NavItem href="#" label="Settings" icon="gear" />
                </NavSection>
              </nav>
            </aside>

            {/* Mobile sidebar overlay */}
            {isMobile && sidebarOpen && (
              <div
                className="fixed inset-0 z-30 bg-black/50 lg:hidden"
                onClick={() => setSidebarOpen(false)}
              />
            )}

            {/* Mobile sidebar */}
            <aside className={`fixed left-0 top-16 h-[calc(100vh-64px)] w-64 bg-white border-r border-slate-200 transform transition-transform z-40 lg:hidden ${
              sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}>
              <nav className="p-6 space-y-2">
                <NavSection title="Learning">
                  <NavItem href="#" label="Dashboard" icon="home" active />
                  <NavItem href="#" label="Continue Lesson" icon="play" />
                  <NavItem href="#" label="All Lessons" icon="book" />
                </NavSection>

                <NavSection title="Progress">
                  <ProgressWidget />
                </NavSection>

                <NavSection title="Tools">
                  <NavItem href="#" label="Vocabulary List" icon="list" />
                  <NavItem href="#" label="Practice Tests" icon="check" />
                  <NavItem href="#" label="Settings" icon="gear" />
                </NavSection>
              </nav>
            </aside>
          </>
        )}

        {/* Main Content */}
        <main className={`flex-1 ${showSidebar ? 'lg:ml-0' : ''}`}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

function NavSection({ title, children }) {
  return (
    <div>
      <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide px-3 mb-2">
        {title}
      </h3>
      <div className="space-y-1">
        {children}
      </div>
    </div>
  );
}

function NavItem({ href, label, icon = 'circle', active = false }) {
  const getIcon = () => {
    const iconMap = {
      home: '🏠',
      play: '▶️',
      book: '📖',
      list: '📝',
      check: '✓',
      gear: '⚙️',
      circle: '●',
    };
    return iconMap[icon] || '●';
  };

  return (
    <a
      href={href}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-sm transition-colors ${
        active
          ? 'bg-amber-50 text-amber-700'
          : 'text-slate-600 hover:bg-slate-100'
      }`}
    >
      <span className="text-lg">{getIcon()}</span>
      <span>{label}</span>
    </a>
  );
}

function ProgressWidget() {
  const progressData = {
    completed: 3,
    total: 9,
    average: 82,
  };

  const percentage = (progressData.completed / progressData.total) * 100;

  return (
    <div className="px-3 py-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg border border-amber-200">
      <div className="flex justify-between items-start mb-3">
        <div>
          <p className="text-xs text-amber-700 font-medium">Progress</p>
          <p className="text-2xl font-bold text-amber-900">{progressData.completed}/{progressData.total}</p>
        </div>
        <p className="text-xs text-amber-600 font-medium">{Math.round(percentage)}%</p>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-amber-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-amber-600 to-orange-500 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Stats */}
      <div className="mt-3 pt-3 border-t border-amber-200 text-xs text-amber-700 space-y-1">
        <p>Avg. Score: <span className="font-bold">{progressData.average}%</span></p>
        <p className="text-amber-600">{9 - progressData.completed} lessons remaining</p>
      </div>
    </div>
  );
}
