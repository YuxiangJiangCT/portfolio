import { lazy, Suspense, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header/Header';
import HeroSection from './components/Hero/HeroSection';
import ScrollToTop from './components/common/ScrollToTop';
import ThemeToggle from './components/common/ThemeToggle';
import ParticleToggle from './components/common/ParticleToggle';
import LoadingScreen from './components/common/LoadingScreen';
import ErrorBoundary from './components/production/ErrorBoundary';
import { useInitialLoad } from './hooks/useInitialLoad';
import { initGA, logPageView } from './utils/analytics';

// Lazy load heavy components
const ExperienceSection = lazy(() => import('./components/Experience/ExperienceSection'));
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
import MouseTrailEffect from './components/Effects/MouseTrailEffect';

// PWA
import PWAInstallPrompt from './components/common/PWAInstallPrompt';

function App() {
  const isInitialLoading = useInitialLoad();

  // ASCII Art Console Output
  useEffect(() => {
    const asciiArt = `
╔═╗┬ ┬═╗ ╦╦╔═╗╔╗╔╔═╗
╚╦╝│ │╔╩╦╝║╠═╣║║║║ ╦
 ╩ └─┘╩ ╚═╩╩ ╩╝╚╝╚═╝
    `;

    // Clear console first for better visibility
    console.clear();

    // ASCII Logo
    console.log('%c' + asciiArt, 'color: #6366F1; font-family: monospace; font-size: 14px;');

    // Welcome message
    console.log('%c🚀 Welcome to Yuxiang\'s Portfolio!', 'font-size: 18px; font-weight: bold; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;');

    // Contact info
    console.log('%c📧 Contact: xyxiang@smu.edu', 'color: #10B981; font-size: 14px;');
    console.log('%c🔗 GitHub: github.com/yuxiang03', 'color: #8B5CF6; font-size: 14px;');
    console.log('%c💼 LinkedIn: linkedin.com/in/yuxiang03', 'color: #0EA5E9; font-size: 14px;');

    // Separator
    console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #4B5563;');

    // Hidden features
    console.log('%c🎮 Hidden Features:', 'font-weight: bold; color: #F59E0B; font-size: 14px;');
    console.log('%c  • Konami Code: ↑↑↓↓←→←→BA', 'color: #94A3B8;');
    console.log('%c  • Matrix Rain: Click avatar 5 times', 'color: #94A3B8;');
    console.log('%c  • Boss Mode: Press "B" key', 'color: #94A3B8;');
    console.log('%c  • Mouse Trail: Move your cursor around', 'color: #94A3B8;');

    // Tech stack
    console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #4B5563;');
    console.log('%c⚡ Built with:', 'font-weight: bold; color: #EC4899; font-size: 14px;');
    console.log('%c  React + TypeScript + Tailwind CSS + Framer Motion', 'color: #94A3B8;');

    // Recruitment message
    console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #4B5563;');
    console.log('%c🚨 Looking for SDE opportunities!', 'font-size: 16px; font-weight: bold; color: #EF4444; animation: blink 1s infinite;');
    console.log('%c   Open to Full-time, Internship, and Co-op positions', 'color: #94A3B8;');

    // Fun message
    console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #4B5563;');
    console.log('%c✨ Happy exploring! May the code be with you 🖖', 'color: #A78BFA; font-style: italic;');
  }, []);

  // Initialize Google Analytics
  useEffect(() => {
    initGA();
    logPageView();
  }, []);

  if (isInitialLoading) {
    return (
      <ThemeProvider>
        <LoadingScreen />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <ErrorBoundary>
        <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text transition-colors duration-300">
          {/* Easter eggs */}
          <KonamiCode />
          <MatrixRain />
          <BossKey />
          <MouseTrailEffect />

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
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;