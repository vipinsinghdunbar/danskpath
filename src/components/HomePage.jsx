import React from 'react';

export default function HomePage({ onStartAssessment }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-orange-600 rounded-lg flex items-center justify-center text-white text-xl font-bold">
              Ø
            </div>
            <span className="text-xl font-bold text-slate-900">DanskPath</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-slate-600 hover:text-amber-600 font-medium transition">About</a>
            <a href="#features" className="text-slate-600 hover:text-amber-600 font-medium transition">Features</a>
            <a href="#how" className="text-slate-600 hover:text-amber-600 font-medium transition">How it Works</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight mb-6">
              Master Danish in Your Own Time
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              DanskPath is your personal guide to Danish proficiency. Take a quick diagnostic test, get your personalized learning path, and start mastering Danish grammar, listening, reading, and speaking skills.
            </p>
            <button
              onClick={onStartAssessment}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg hover:from-amber-700 hover:to-orange-700 transition-all duration-200 transform hover:scale-105"
            >
              <span>Start Your Assessment</span>
              <span>→</span>
            </button>
            <p className="text-sm text-slate-500 mt-4">
              Takes about 12-15 minutes • No sign-up required
            </p>
          </div>

          {/* Visual */}
          <div className="hidden md:block">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-200 to-orange-200 rounded-3xl blur-2xl opacity-30 animate-pulse"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-slate-100">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-lg">
                    <span className="text-2xl">📚</span>
                    <div>
                      <div className="font-semibold text-slate-900">9 Comprehensive Lessons</div>
                      <div className="text-sm text-slate-600">Grammar • Listening • Reading • Speaking</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                    <span className="text-2xl">🎯</span>
                    <div>
                      <div className="font-semibold text-slate-900">Personalized Path</div>
                      <div className="text-sm text-slate-600">A1 to B2 • Based on your level</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-lg">
                    <span className="text-2xl">📱</span>
                    <div>
                      <div className="font-semibold text-slate-900">Learn Offline</div>
                      <div className="text-sm text-slate-600">Works without internet after first visit</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-slate-900 mb-8 text-center">What is DanskPath?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold text-amber-600 mb-4">Your Danish Learning Companion</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                DanskPath is a modern, interactive platform designed to help non-native speakers master Danish from beginner (A1) to upper-intermediate (B2) level. Whether you're new to Danish or looking to refine your skills, DanskPath guides you through a structured, engaging curriculum.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Our approach combines diagnostic assessment, personalized learning paths, and comprehensive content covering grammar, listening comprehension, reading, and speaking practice.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-amber-600 mb-4">Built for Adults, By Language Learners</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                DanskPath understands that adult learners have busy lives. Each lesson is concise, focused, and actionable. Progress is saved automatically, and you can learn at your own pace—no subscriptions, no pressure, just learning that works for you.
              </p>
              <p className="text-slate-600 leading-relaxed">
                All lessons work offline after the first visit, so you can study on the train, during lunch, or anywhere without an internet connection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">Why DanskPath?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl border border-slate-200 hover:shadow-lg transition">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Smart Assessment</h3>
              <p className="text-slate-600">
                Our diagnostic test pinpoints your exact Danish level in just 12-15 minutes. No guessing, no wasted time on material you already know.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl border border-slate-200 hover:shadow-lg transition">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Personalized Learning</h3>
              <p className="text-slate-600">
                Every lesson is tailored to your level and needs. Follow a clear progression from basics to advanced topics with real-world examples.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl border border-slate-200 hover:shadow-lg transition">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Fast & Focused</h3>
              <p className="text-slate-600">
                Lessons are structured for maximum learning in minimal time. 35-45 minutes per lesson, with clear takeaways and actionable exercises.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl border border-slate-200 hover:shadow-lg transition">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Truly Offline</h3>
              <p className="text-slate-600">
                Download once, learn anywhere. All content is cached locally. No internet needed after your first visit.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl border border-slate-200 hover:shadow-lg transition">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">No Pressure</h3>
              <p className="text-slate-600">
                Learn at your own pace. No subscriptions, no expiring lessons, no algorithms pushing you. Just pure learning.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl border border-slate-200 hover:shadow-lg transition">
              <div className="text-4xl mb-4">✓</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Progress Tracking</h3>
              <p className="text-slate-600">
                Watch your progress unfold. See which lessons you've mastered, your average score, and exactly what's next.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">How DanskPath Works</h2>
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-600 text-white font-bold text-lg">
                  1
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Take the Diagnostic Assessment</h3>
                <p className="text-slate-600">
                  Answer 12-15 questions about Danish grammar, listening, and reading. The test adapts to your level, getting harder or easier based on your answers.
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-600 text-white font-bold text-lg">
                  2
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Get Your Personalized Path</h3>
                <p className="text-slate-600">
                  Based on your assessment, you'll receive a customized learning path. Start with lessons at your level and progress at your own pace.
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-600 text-white font-bold text-lg">
                  3
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Learn & Practice</h3>
                <p className="text-slate-600">
                  Work through engaging lessons covering grammar, listening, reading, and speaking. Each lesson includes clear explanations, real-world examples, and interactive exercises.
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-600 text-white font-bold text-lg">
                  4
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Track Your Progress</h3>
                <p className="text-slate-600">
                  Watch your skills improve. See your completion rate, average score, and unlock new lessons as you reach 70% mastery on each one.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-amber-600 to-orange-600 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Master Danish?</h2>
          <p className="text-xl text-amber-50 mb-8">
            Take the diagnostic assessment now. It's free, takes 12-15 minutes, and shows your exact Danish level.
          </p>
          <button
            onClick={onStartAssessment}
            className="inline-flex items-center gap-3 bg-white text-amber-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-amber-50 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <span>Start Assessment Now</span>
            <span>→</span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="mb-4">© 2026 DanskPath. All rights reserved.</p>
          <p className="text-sm">
            <span>Built with care for Danish language learners</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
