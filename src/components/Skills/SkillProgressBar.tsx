import { useState } from 'react';
import { Calendar, Code, TrendingUp, Award, ChevronRight } from 'lucide-react';
import { Skill } from '../../data/skills';
import { useSkillAnimation } from '../../hooks/useSkillAnimation';

interface SkillProgressBarProps {
  skill: Skill;
  color?: string;
  showDetails?: boolean;
  onProjectClick?: (project: string) => void;
}

const SkillProgressBar: React.FC<SkillProgressBarProps> = ({
  skill,
  color = '#4F46E5',
  showDetails = false,
  onProjectClick
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { ref, progress, displayValue, isVisible } = useSkillAnimation(skill.level);

  const getProficiencyLabel = (level: number) => {
    if (level >= 90) return 'Expert';
    if (level >= 75) return 'Proficient';
    if (level >= 60) return 'Intermediate';
    return 'Learning';
  };

  const getProficiencyColor = (level: number) => {
    if (level >= 90) return 'text-green-600 dark:text-green-400';
    if (level >= 75) return 'text-blue-600 dark:text-blue-400';
    if (level >= 60) return 'text-orange-600 dark:text-orange-400';
    return 'text-gray-600 dark:text-gray-400';
  };

  const proficiencyLabel = getProficiencyLabel(skill.level);
  const proficiencyColor = getProficiencyColor(skill.level);

  return (
    <div
      ref={ref}
      className={`
        bg-light-card dark:bg-dark-card rounded-lg p-4
        border border-light-border dark:border-dark-border
        transition-all duration-300
        ${isHovered ? 'shadow-lg scale-[1.02]' : ''}
        ${isVisible ? 'opacity-100' : 'opacity-0'}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-light-text dark:text-dark-text flex items-center gap-2">
            {skill.icon && <span className="text-lg">{skill.icon}</span>}
            {skill.name}
          </h3>
          <div className="flex items-center gap-3 mt-1 text-sm text-light-text-secondary dark:text-dark-text-secondary">
            {skill.yearsOfExperience && (
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {skill.yearsOfExperience} year{skill.yearsOfExperience > 1 ? 's' : ''}
              </span>
            )}
            <span className={`flex items-center gap-1 font-medium ${proficiencyColor}`}>
              <Award className="w-3 h-3" />
              {proficiencyLabel}
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold" style={{ color }}>
            {displayValue}%
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative">
        <div className="h-3 bg-light-bg dark:bg-dark-bg rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-1500 ease-out relative overflow-hidden"
            style={{
              width: `${progress}%`,
              backgroundColor: color
            }}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
          </div>
        </div>

        {/* Milestone markers */}
        {[25, 50, 75].map(milestone => (
          <div
            key={milestone}
            className="absolute top-0 h-3 w-px bg-light-border dark:bg-dark-border"
            style={{ left: `${milestone}%` }}
          />
        ))}
      </div>

      {/* Related Projects */}
      {showDetails && skill.relatedProjects && skill.relatedProjects.length > 0 && (
        <div className="mt-3 pt-3 border-t border-light-border dark:border-dark-border">
          <div className="flex items-center gap-1 text-xs text-light-text-secondary dark:text-dark-text-secondary mb-2">
            <Code className="w-3 h-3" />
            <span>Applied in:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {skill.relatedProjects.map((project, idx) => (
              <button
                key={idx}
                onClick={() => onProjectClick?.(project)}
                className="px-2 py-1 text-xs rounded-full
                  bg-light-bg dark:bg-dark-bg
                  text-light-text-secondary dark:text-dark-text-secondary
                  hover:text-light-primary dark:hover:text-dark-primary
                  hover:border-light-primary dark:hover:border-dark-primary
                  border border-light-border dark:border-dark-border
                  transition-colors flex items-center gap-1 group"
              >
                {project}
                <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Hover indicator */}
      {isHovered && skill.category && (
        <div className="mt-3 flex items-center gap-2 text-xs text-light-text-secondary dark:text-dark-text-secondary">
          <TrendingUp className="w-3 h-3" style={{ color }} />
          <span>Category: {skill.category}</span>
        </div>
      )}
    </div>
  );
};

export default SkillProgressBar;