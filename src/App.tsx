import { lazy, Suspense } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header/Header';
import HeroSection from './components/Hero/HeroSection';
import ScrollToTop from './components/common/ScrollToTop';
import ThemeToggle from './components/common/ThemeToggle';
import ParticleToggle from './components/common/ParticleToggle';
import LoadingScreen from './components/common/LoadingScreen';
import { useInitialLoad } from './hooks/useInitialLoad';

// Lazy load heavy components
const ExperienceSection = lazy(() => import('./components/Experience/ExperienceSection'));
const PerformanceDashboard = lazy(() => import('./components/Dashboard/PerformanceDashboard'));
const SkillsSection = lazy(() => import('./components/Skills/SkillsSection'));
const ProjectsSection = lazy(() => import('./components/Projects/ProjectsSection'));
const CompetitionsSection = lazy(() => import('./components/Competitions/CompetitionsSection'));
const AboutSection = lazy(() => import('./components/About/AboutSection'));

// Loading component for lazy sections
import SectionLoader from './components/common/SectionLoader';

// Easter eggs
import KonamiCode from './components/easter-eggs/KonamiCode';
import MatrixRain from './components/easter-eggs/MatrixRain';
import BossKey from './components/easter-eggs/BossKey';

// PWA
import PWAInstallPrompt from './components/common/PWAInstallPrompt';

function App() {
  const isInitialLoading = useInitialLoad();

  if (isInitialLoading) {
    return (
      <ThemeProvider>
        <LoadingScreen />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text transition-colors duration-300">
        {/* Easter eggs */}
        <KonamiCode />
        <MatrixRain />
        <BossKey />

        {/* PWA Install Prompt */}
        <PWAInstallPrompt />

        <Header />
        <ThemeToggle />
        <ParticleToggle />
        <HeroSection />
        <Suspense fallback={<SectionLoader />}>
          <ExperienceSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <PerformanceDashboard />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <SkillsSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <ProjectsSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <CompetitionsSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <AboutSection />
        </Suspense>
        <ScrollToTop />
      </div>
    </ThemeProvider>
  );
}

export default App;