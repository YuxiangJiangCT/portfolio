import { useState } from 'react';
import { Code2, Cpu, Database, Brain, Layers, Zap } from 'lucide-react';
import { skillCategories, SkillCategory } from '../../data/skills';
import SkillProgressBar from './SkillProgressBar';
import { useStaggerAnimation } from '../../hooks/useSkillAnimation';

interface SkillsMatrixProps {
  onProjectClick?: (project: string) => void;
}

const SkillsMatrix: React.FC<SkillsMatrixProps> = ({ onProjectClick }) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [selectedSkillLevel, setSelectedSkillLevel] = useState<number | null>(null);

  const getCategoryIcon = (categoryName: string) => {
    switch (categoryName) {
      case 'System Design & Architecture':
        return <Layers className="w-5 h-5" />;
      case 'Performance Optimization':
        return <Zap className="w-5 h-5" />;
      case 'Languages & Frameworks':
        return <Code2 className="w-5 h-5" />;
      case 'Data & Infrastructure':
        return <Database className="w-5 h-5" />;
      case 'Machine Learning & Data':
        return <Brain className="w-5 h-5" />;
      default:
        return <Cpu className="w-5 h-5" />;
    }
  };

  const getCategoryStats = (category: SkillCategory) => {
    const skills = category.skills;
    const avgLevel = Math.round(skills.reduce((sum, s) => sum + s.level, 0) / skills.length);
    const expertCount = skills.filter(s => s.level >= 90).length;
    const totalYears = skills.reduce((sum, s) => sum + (s.yearsOfExperience || 0), 0);

    return { avgLevel, expertCount, totalYears };
  };

  const allSkillsCount = skillCategories.reduce((sum, cat) => sum + cat.skills.length, 0);
  const { containerRef, getItemStyle } = useStaggerAnimation(allSkillsCount, 50);

  let skillIndex = 0;

  return (
    <div ref={containerRef} className="space-y-6">
      {/* Filter Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
            Filter by proficiency:
          </span>
          <div className="flex gap-2">
            {[
              { label: 'All', value: null },
              { label: 'Expert (90+)', value: 90 },
              { label: 'Proficient (75+)', value: 75 },
              { label: 'Intermediate (60+)', value: 60 }
            ].map(filter => (
              <button
                key={filter.label}
                onClick={() => setSelectedSkillLevel(filter.value)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
                  ${selectedSkillLevel === filter.value
                    ? 'bg-light-primary dark:bg-dark-primary text-white'
                    : 'bg-light-bg dark:bg-dark-bg text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-card dark:hover:bg-dark-card'
                  }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
        <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
          Total: {allSkillsCount} skills across {skillCategories.length} categories
        </div>
      </div>

      {/* Categories Grid */}
      {skillCategories.map((category, catIndex) => {
        const stats = getCategoryStats(category);
        const filteredSkills = selectedSkillLevel
          ? category.skills.filter(s => s.level >= selectedSkillLevel)
          : category.skills;

        if (filteredSkills.length === 0 && selectedSkillLevel) return null;

        const categoryExpanded = expandedCategory === category.name;

        return (
          <div
            key={category.name}
            className="bg-light-card dark:bg-dark-card rounded-xl border border-light-border dark:border-dark-border overflow-hidden"
          >
            {/* Category Header */}
            <button
              onClick={() => setExpandedCategory(categoryExpanded ? null : category.name)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-light-bg dark:hover:bg-dark-bg transition-colors"
            >
              <div className="flex items-center gap-4">
                <div
                  className="p-2 rounded-lg bg-white dark:bg-gray-800"
                  style={{ color: category.color }}
                >
                  {getCategoryIcon(category.name)}
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-light-text dark:text-dark-text">
                    {category.name}
                  </h3>
                  <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                    {category.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                    Average
                  </div>
                  <div className="text-lg font-bold" style={{ color: category.color }}>
                    {stats.avgLevel}%
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                    Expert Skills
                  </div>
                  <div className="text-lg font-bold text-light-text dark:text-dark-text">
                    {stats.expertCount}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                    Total Skills
                  </div>
                  <div className="text-lg font-bold text-light-text dark:text-dark-text">
                    {filteredSkills.length}
                  </div>
                </div>
                <div className={`transform transition-transform ${categoryExpanded ? 'rotate-180' : ''}`}>
                  <svg className="w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </button>

            {/* Skills Grid */}
            {categoryExpanded && (
              <div className="px-6 pb-6 border-t border-light-border dark:border-dark-border animate-fadeIn">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                  {filteredSkills.map((skill, idx) => {
                    const currentSkillIndex = skillIndex++;
                    return (
                      <div
                        key={skill.name}
                        style={getItemStyle(currentSkillIndex)}
                      >
                        <SkillProgressBar
                          skill={skill}
                          color={category.color}
                          showDetails={true}
                          onProjectClick={onProjectClick}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Summary Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        {[
          { label: 'Total Skills', value: allSkillsCount, color: '#4F46E5' },
          { label: 'Expert Level', value: skillCategories.flatMap(c => c.skills).filter(s => s.level >= 90).length, color: '#10B981' },
          { label: 'Years Combined', value: skillCategories.flatMap(c => c.skills).reduce((sum, s) => sum + (s.yearsOfExperience || 0), 0), color: '#F59E0B' },
          { label: 'Avg Proficiency', value: `${Math.round(skillCategories.flatMap(c => c.skills).reduce((sum, s) => sum + s.level, 0) / allSkillsCount)}%`, color: '#8B5CF6' }
        ].map((stat, idx) => (
          <div
            key={stat.label}
            className="bg-light-card dark:bg-dark-card rounded-lg p-4 border border-light-border dark:border-dark-border text-center"
          >
            <div className="text-2xl font-bold" style={{ color: stat.color }}>
              {stat.value}
            </div>
            <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary mt-1">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsMatrix;