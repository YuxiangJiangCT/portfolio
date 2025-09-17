import { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp, Briefcase, MapPin, Calendar, BarChart3 } from 'lucide-react';
import { Experience, Achievement } from '../../data/experience';
import MetricCard from './MetricCard';
import TechBadge from './TechBadge';
import PerformanceMetricsModal from './PerformanceMetricsModal';

interface TimelineProps {
  experiences: Experience[];
  onTechFilter?: (tech: string) => void;
}

const Timeline: React.FC<TimelineProps> = ({ experiences, onTechFilter }) => {
  const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({});
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [showPerformanceModal, setShowPerformanceModal] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    const sections = timelineRef.current?.querySelectorAll('.timeline-section');
    sections?.forEach(section => observer.observe(section));

    return () => {
      sections?.forEach(section => observer.unobserve(section));
    };
  }, []);

  const toggleExpand = (expId: string, achievementId: string) => {
    const key = `${expId}-${achievementId}`;
    setExpandedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div ref={timelineRef} className="relative max-w-6xl mx-auto">
      {/* Vertical line for desktop */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-light-primary dark:from-dark-primary to-transparent" />

      {experiences.map((exp, expIndex) => (
        <div
          key={`${exp.company}-${expIndex}`}
          id={`exp-${expIndex}`}
          className={`
            timeline-section relative mb-16
            ${visibleSections.has(`exp-${expIndex}`) ? 'animate-fadeIn' : 'opacity-0'}
          `}
        >
          {/* Timeline dot */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-light-primary dark:bg-dark-primary rounded-full items-center justify-center">
            <div className="w-8 h-8 bg-light-primary/20 dark:bg-dark-primary/20 rounded-full animate-ping" />
          </div>

          {/* Content container - alternating layout */}
          <div className={`
            md:w-1/2
            ${expIndex % 2 === 0 ? 'md:pr-8 md:text-right md:ml-0' : 'md:pl-8 md:text-left md:ml-auto'}
          `}>
            {/* Company header */}
            <div className={`
              bg-light-card dark:bg-dark-card rounded-lg p-6 mb-4
              border border-light-border dark:border-dark-border
              hover:shadow-lg transition-shadow duration-300
            `}>
              <div className={`flex items-start gap-4 ${expIndex % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-light-primary to-light-primary-hover dark:from-dark-primary dark:to-dark-primary-hover rounded-lg flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className={`flex-1 ${expIndex % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <h3 className="text-xl font-bold text-light-text dark:text-dark-text">
                    {exp.company}
                  </h3>
                  <p className="text-lg text-light-primary dark:text-dark-primary font-medium mt-1">
                    {exp.position}
                  </p>
                  <div className={`
                    flex flex-wrap gap-3 mt-3 text-sm text-light-text-secondary dark:text-dark-text-secondary
                    ${expIndex % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}
                  `}>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {exp.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {exp.period}
                    </span>
                  </div>
                  {/* Add Performance Metrics button for Dataman Analytics */}
                  {exp.company === 'Dataman Analytics' && (
                    <button
                      onClick={() => setShowPerformanceModal(true)}
                      className={`
                        mt-4 inline-flex items-center gap-2 px-4 py-2
                        bg-gradient-to-r from-light-primary to-light-accent dark:from-dark-primary dark:to-dark-accent
                        text-white text-sm font-medium rounded-lg
                        hover:shadow-lg transform hover:scale-105 transition-all duration-300
                        ${expIndex % 2 === 0 ? 'md:ml-auto' : ''}
                      `}
                    >
                      <BarChart3 className="w-4 h-4" />
                      View Performance Metrics
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="space-y-4">
              {exp.achievements.map((achievement, achIndex) => {
                const key = `${expIndex}-${achIndex}`;
                const isExpanded = expandedItems[key] || false;

                return (
                  <div
                    key={achIndex}
                    className={`
                      bg-light-bg dark:bg-dark-bg rounded-lg border border-light-border dark:border-dark-border
                      overflow-hidden transition-all duration-300
                      ${isExpanded ? 'shadow-md' : ''}
                    `}
                  >
                    <button
                      onClick={() => toggleExpand(expIndex.toString(), achIndex.toString())}
                      className="w-full p-4 text-left hover:bg-light-card dark:hover:bg-dark-card transition-colors duration-200"
                    >
                      <div className={`flex items-start gap-3 ${expIndex % 2 === 0 ? 'md:flex-row-reverse md:text-right' : ''}`}>
                        <div className="flex-1">
                          <h4 className="font-semibold text-light-text dark:text-dark-text">
                            {achievement.title}
                          </h4>
                          <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mt-1">
                            {achievement.description}
                          </p>
                        </div>
                        <div className={`text-light-text-secondary dark:text-dark-text-secondary ${expIndex % 2 === 0 ? 'md:order-first' : ''}`}>
                          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </div>
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="px-4 pb-4 animate-fadeIn">
                        {/* Metrics */}
                        <div className="mb-4">
                          <h5 className={`text-sm font-semibold text-light-text dark:text-dark-text mb-2 ${expIndex % 2 === 0 ? 'md:text-right' : ''}`}>
                            Key Metrics
                          </h5>
                          <div className={`flex flex-wrap gap-2 ${expIndex % 2 === 0 ? 'md:justify-end' : ''}`}>
                            {achievement.metrics.map((metric, idx) => (
                              <MetricCard
                                key={idx}
                                metric={metric}
                                isVisible={visibleSections.has(`exp-${expIndex}`)}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Technologies */}
                        <div>
                          <h5 className={`text-sm font-semibold text-light-text dark:text-dark-text mb-2 ${expIndex % 2 === 0 ? 'md:text-right' : ''}`}>
                            Technologies Used
                          </h5>
                          <div className={`flex flex-wrap gap-2 ${expIndex % 2 === 0 ? 'md:justify-end' : ''}`}>
                            {achievement.technologies.map((tech, idx) => (
                              <TechBadge
                                key={idx}
                                technology={tech}
                                onFilter={onTechFilter}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ))}

      {/* Performance Metrics Modal */}
      <PerformanceMetricsModal
        isOpen={showPerformanceModal}
        onClose={() => setShowPerformanceModal(false)}
      />
    </div>
  );
};

export default Timeline;