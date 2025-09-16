import { useState } from 'react';

interface TechBadgeProps {
  technology: string;
  onFilter?: (tech: string) => void;
}

const TechBadge: React.FC<TechBadgeProps> = ({ technology, onFilter }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  // Define proficiency levels based on technology
  const getProficiencyLevel = (tech: string): string => {
    const expertTechs = ['Python', 'FastAPI', 'Redis', 'React'];
    const proficientTechs = ['ARIMA', 'NumPy', 'Pandas', 'JWT', 'WebSocket'];

    if (expertTechs.includes(tech)) return 'Expert';
    if (proficientTechs.includes(tech)) return 'Proficient';
    return 'Experienced';
  };

  const proficiencyLevel = getProficiencyLevel(technology);

  const getProficiencyColor = (level: string): string => {
    switch(level) {
      case 'Expert': return 'border-green-500 text-green-600 dark:text-green-400';
      case 'Proficient': return 'border-blue-500 text-blue-600 dark:text-blue-400';
      default: return 'border-purple-500 text-purple-600 dark:text-purple-400';
    }
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => onFilter?.(technology)}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`
          px-3 py-1 text-xs font-medium rounded-full
          border bg-light-card dark:bg-dark-card
          ${getProficiencyColor(proficiencyLevel)}
          hover:scale-105 hover:shadow-md
          transition-all duration-300 cursor-pointer
        `}
      >
        {technology}
      </button>

      {showTooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-10">
          <div className="bg-gray-900 dark:bg-gray-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
            {proficiencyLevel}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1">
              <div className="border-4 border-transparent border-t-gray-900 dark:border-t-gray-800"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TechBadge;