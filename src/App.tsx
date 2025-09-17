import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header/Header';
import HeroSection from './components/Hero/HeroSection';
import ExperienceSection from './components/Experience/ExperienceSection';
import PerformanceDashboard from './components/Dashboard/PerformanceDashboard';
import SkillsSection from './components/Skills/SkillsSection';
import ProjectsSection from './components/Projects/ProjectsSection';
import CompetitionsSection from './components/Competitions/CompetitionsSection';
import AboutSection from './components/About/AboutSection';
import ScrollToTop from './components/common/ScrollToTop';
import ThemeToggle from './components/common/ThemeToggle';
import ParticleToggle from './components/common/ParticleToggle';
import LoadingScreen from './components/common/LoadingScreen';
import { useInitialLoad } from './hooks/useInitialLoad';

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
        <Header />
        <ThemeToggle />
        <ParticleToggle />
        <HeroSection />
        <ExperienceSection />
        <PerformanceDashboard />
        <SkillsSection />
        <ProjectsSection />
        <CompetitionsSection />
        <AboutSection />
        <ScrollToTop />
      </div>
    </ThemeProvider>
  );
}

export default App;