
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import DictionaryPreview from './components/DictionaryPreview';
import CalendarPreview from './components/CalendarPreview';
import GamesPreview from './components/GamesPreview';
import Courses from './components/Courses';
import CtaBand from './components/CtaBand';
import Footer from './components/Footer';
import CookieNotice from './components/CookieNotice';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Features />
        <DictionaryPreview />
        <CalendarPreview />
        <GamesPreview />
        <Courses />
        <CtaBand />
      </main>
      <Footer />
      <CookieNotice />
    </div>
  );
}

export default App;