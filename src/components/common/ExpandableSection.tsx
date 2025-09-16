import { useState, useEffect } from 'react';
import { ExpandableSectionProps } from '../../types';

function ExpandableSection({
  id,
  icon,
  title,
  content,
  isExpanded,
  onToggle
}: ExpandableSectionProps) {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isExpanded && e.key === 'Escape') {
        onToggle(id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isExpanded, onToggle, id]);

  return (
    <div className="overflow-hidden mb-3 relative">
      <button
        onClick={() => onToggle(id)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        className={`w-full px-8 py-4 flex items-center gap-4 transition-all duration-300 text-left rounded-lg
                   ${isHovered ? 'bg-light-card dark:bg-dark-card' : 'bg-transparent'}
                   ${isExpanded ? 'bg-light-card dark:bg-dark-card shadow-md' : ''}`}
        aria-expanded={isExpanded}
      >
        <div className={`text-light-text-secondary dark:text-dark-text-secondary transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}>
          <div className="w-7 h-7">
            {icon}
          </div>
        </div>
        <span className={`text-lg font-mono transition-all duration-300 ${isHovered ? 'tracking-wider' : ''}`}>
          {title}
        </span>

        <span className={`ml-auto text-sm opacity-70 transition-all duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
          {isExpanded ? '▲' : '▼'}
        </span>
      </button>

      <div
        className="transition-all duration-500 overflow-hidden bg-light-card dark:bg-dark-card rounded-lg mt-1"
        style={{
          maxHeight: isExpanded ? '2000px' : '0',
          opacity: isExpanded ? 1 : 0,
          transform: isExpanded ? 'translateY(0)' : 'translateY(-10px)'
        }}
      >
        <div className="p-10 animate-fadeIn">
          {content}
        </div>
      </div>

      {isExpanded && (
        <div className="absolute left-8 top-12 w-0.5 h-8 bg-gradient-to-b from-gray-500 to-transparent opacity-20"></div>
      )}
    </div>
  );
}

export default ExpandableSection;