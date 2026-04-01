import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import PageContainer from './components/layout/PageContainer';
import ScrollToTop from './components/ScrollToTop';
import Overview from './pages/Overview';
import ProjectsPage from './pages/ProjectsPage';
import ExperiencePage from './pages/ExperiencePage';
import EducationPage from './pages/EducationPage';
import AwardsPage from './pages/AwardsPage';
import SkillsPage from './pages/SkillsPage';
import ResumePage from './pages/ResumePage';
import ProjectDetail from './pages/ProjectDetail';

export default function App() {
  return (
    <div className="flex">
      <Sidebar />
      <PageContainer>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/education" element={<EducationPage />} />
          <Route path="/awards" element={<AwardsPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
        </Routes>
      </PageContainer>
    </div>
  );
}
