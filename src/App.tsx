
import React, { Suspense, lazy } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Loading from './components/Loading';

// Lazy load components that are below the fold
const DictionaryPreview = lazy(() => import('./components/DictionaryPreview'));
const CalendarPreview = lazy(() => import('./components/CalendarPreview'));
const GamesPreview = lazy(() => import('./components/GamesPreview'));
const Courses = lazy(() => import('./components/Courses'));
const CtaBand = lazy(() => import('./components/CtaBand'));
const Footer = lazy(() => import('./components/Footer'));
const CookieNotice = lazy(() => import('./components/CookieNotice'));

function App() {
  // Detect mobile for performance optimizations
  const isMobile = window.innerWidth < 768 || /Android.*Mobile|iPhone|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        {isMobile ? (
          // Mobile: Load everything immediately but without heavy animations
          <>
            <Features />
            <DictionaryPreview />
            <CalendarPreview />
            <GamesPreview />
            <Courses />
            <CtaBand />
          </>
        ) : (
          // Desktop/Tablet: Use lazy loading with animations
          <>
            <Features />
            <Suspense fallback={<Loading />}>
              <DictionaryPreview />
              <CalendarPreview />
              <GamesPreview />
              <Courses />
              <CtaBand />
            </Suspense>
          </>
        )}
      </main>
      <Suspense fallback={<Loading />}>
        <Footer />
        <CookieNotice />
      </Suspense>
    </div>
  );
}

export default App;