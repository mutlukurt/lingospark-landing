
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
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Features />
        <Suspense fallback={<Loading />}>
          <DictionaryPreview />
          <CalendarPreview />
          <GamesPreview />
          <Courses />
          <CtaBand />
        </Suspense>
      </main>
      <Suspense fallback={<Loading />}>
        <Footer />
        <CookieNotice />
      </Suspense>
    </div>
  );
}

export default App;