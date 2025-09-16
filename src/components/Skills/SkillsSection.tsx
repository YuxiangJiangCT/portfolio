import { useState } from 'react';
import { BarChart3, Grid3x3, Brain } from 'lucide-react';
import SkillsMatrix from './SkillsMatrix';
import SkillRadarChart from './SkillRadarChart';
import { getTopSkills } from '../../data/skills';

function SkillsSection() {
  const [activeView, setActiveView] = useState<'matrix' | 'radar'>('matrix');
  const topSkills = getTopSkills(3);

  const handleProjectClick = (project: string) => {
    // Scroll to projects section and filter by project
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="skills" className="py-32 px-6 bg-light-bg dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="w-8 h-8 text-light-primary dark:text-dark-primary" />
            <h2 className="text-4xl font-mono text-light-text dark:text-dark-text">
              Technical Skills
            </h2>
          </div>
          <p className="text-light-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto">
            Comprehensive overview of my technical expertise across system design, performance optimization, and full-stack development
          </p>
        </div>

        {/* Top Skills Highlight */}
        <div className="mb-8 p-6 bg-gradient-to-r from-light-primary/10 to-light-primary/5 dark:from-dark-primary/10 dark:to-dark-primary/5 rounded-xl border border-light-primary/20 dark:border-dark-primary/20">
          <h3 className="text-sm font-semibold text-light-text dark:text-dark-text mb-3">
            Top Expertise Areas
          </h3>
          <div className="flex flex-wrap gap-3">
            {topSkills.map((skill, idx) => (
              <div
                key={skill.name}
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-light-primary to-light-primary-hover dark:from-dark-primary dark:to-dark-primary-hover text-white font-bold text-sm">
                  #{idx + 1}
                </div>
                <div>
                  <div className="font-medium text-light-text dark:text-dark-text">
                    {skill.name}
                  </div>
                  <div className="text-xs text-light-primary dark:text-dark-primary">
                    {skill.level}% Proficiency
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View Switcher */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg border border-light-border dark:border-dark-border overflow-hidden">
            <button
              onClick={() => setActiveView('matrix')}
              className={`px-6 py-3 flex items-center gap-2 transition-colors
                ${activeView === 'matrix'
                  ? 'bg-light-primary dark:bg-dark-primary text-white'
                  : 'bg-light-card dark:bg-dark-card text-light-text dark:text-dark-text hover:bg-light-bg dark:hover:bg-dark-bg'
                }`}
            >
              <Grid3x3 className="w-4 h-4" />
              <span className="font-medium">Skills Matrix</span>
            </button>
            <button
              onClick={() => setActiveView('radar')}
              className={`px-6 py-3 flex items-center gap-2 transition-colors
                ${activeView === 'radar'
                  ? 'bg-light-primary dark:bg-dark-primary text-white'
                  : 'bg-light-card dark:bg-dark-card text-light-text dark:text-dark-text hover:bg-light-bg dark:hover:bg-dark-bg'
                }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span className="font-medium">Radar View</span>
            </button>
          </div>
        </div>

        {/* Active View */}
        <div className="min-h-[600px]">
          {activeView === 'matrix' ? (
            <SkillsMatrix onProjectClick={handleProjectClick} />
          ) : (
            <SkillRadarChart />
          )}
        </div>

        {/* Additional Info */}
        <div className="mt-12 p-6 bg-light-card dark:bg-dark-card rounded-lg border border-light-border dark:border-dark-border">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-light-text dark:text-dark-text">
              Continuous Learning
            </span>
          </div>
          <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
            Currently expanding expertise in distributed systems, machine learning infrastructure, and cloud-native technologies.
            All skill levels are based on practical project experience and continuous professional development.
          </p>
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;