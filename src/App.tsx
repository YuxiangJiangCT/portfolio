import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import PageContainer from './components/layout/PageContainer';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';

export default function App() {
  return (
    <div className="flex">
      <Sidebar />
      <PageContainer>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
        </Routes>
      </PageContainer>
    </div>
  );
}
