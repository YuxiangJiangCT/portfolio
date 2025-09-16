import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import App from './App.tsx'
import LoadingScreen from './components/common/LoadingScreen.tsx'
import './index.css'

// Lazy load the Projects page for code splitting
const Projects = lazy(() => {
  // Simulate minimum loading time for better UX
  return Promise.all([
    import('./pages/Projects.tsx'),
    new Promise(resolve => setTimeout(resolve, 800))
  ]).then(([module]) => module);
});

// Route transition component
const AnimatedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  return (
    <div
      key={location.pathname}
      className="animate-fadeIn"
    >
      {children}
    </div>
  );
};

// Wrapper component to use hooks
const AppWrapper = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route path="/" element={
          <AnimatedRoute>
            <App />
          </AnimatedRoute>
        } />
        <Route path="/projects" element={
          <AnimatedRoute>
            <Projects />
          </AnimatedRoute>
        } />
      </Routes>
    </Suspense>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <AppWrapper />
    </HashRouter>
  </React.StrictMode>,
)