import { useState, useRef, useEffect } from 'react';
import {
  Github,
  ExternalLink,
  Calendar,
  ChevronDown,
  ChevronUp,
  Star,
  Code,
  Layers,
  Play,
  ArrowRight,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Project } from '../../data/projects';
import ProjectMetrics from './ProjectMetrics';
import { logEvent, logProjectClick, logExternalLink } from '../../utils/analytics';

interface EnhancedProjectCardProps {
  project: Project;
  onTechFilter?: (tech: string) => void;
}

const EnhancedProjectCard: React.FC<EnhancedProjectCardProps> = ({ project, onTechFilter }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'backend': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'fullstack': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'system-design': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'data': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  return (
    <>
      <div
        ref={cardRef}
        className={`
          bg-light-card dark:bg-dark-card rounded-xl
          border border-light-border dark:border-dark-border
          overflow-hidden transition-all duration-500
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          ${project.featured ? 'ring-2 ring-light-primary dark:ring-dark-primary ring-opacity-50' : ''}
          hover:shadow-xl
        `}
      >
        {/* Card Header */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-bold text-light-text dark:text-dark-text">
                  {project.title}
                </h3>
                {project.featured && (
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                )}
              </div>
              <p className="text-sm text-light-primary dark:text-dark-primary font-medium">
                {project.subtitle}
              </p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(project.category)}`}>
              {project.category.replace('-', ' ').toUpperCase()}
            </span>
          </div>

          <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
            {project.description}
          </p>

          {/* Quick Links */}
          <div className="flex gap-3 mb-4">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => logExternalLink('GitHub', project.githubUrl)}
                className="flex items-center gap-1 text-sm text-light-text-secondary dark:text-dark-text-secondary hover:text-light-primary dark:hover:text-dark-primary transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>Code</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => logExternalLink('Live Demo', project.liveUrl)}
                className="flex items-center gap-1 text-sm text-light-text-secondary dark:text-dark-text-secondary hover:text-light-primary dark:hover:text-dark-primary transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live</span>
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => logExternalLink('Demo Video', project.demoUrl)}
                className="flex items-center gap-1 text-sm text-light-text-secondary dark:text-dark-text-secondary hover:text-light-primary dark:hover:text-dark-primary transition-colors"
              >
                <Play className="w-4 h-4" />
                <span>Demo</span>
              </a>
            )}
            <div className="flex items-center gap-1 text-sm text-light-text-secondary dark:text-dark-text-secondary ml-auto">
              <Calendar className="w-4 h-4" />
              <span>{project.startDate} - {project.endDate}</span>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack.slice(0, 5).map((tech, idx) => (
              <button
                key={idx}
                onClick={() => {
                  onTechFilter?.(tech);
                  logEvent('Technology', 'Filter', tech);
                }}
                className="px-2 py-1 text-xs font-medium rounded-full
                  bg-light-bg dark:bg-dark-bg
                  border border-light-border dark:border-dark-border
                  text-light-text-secondary dark:text-dark-text-secondary
                  hover:border-light-primary dark:hover:border-dark-primary
                  hover:text-light-primary dark:hover:text-dark-primary
                  transition-colors cursor-pointer"
              >
                {tech}
              </button>
            ))}
            {project.techStack.length > 5 && (
              <span className="px-2 py-1 text-xs text-light-text-secondary dark:text-dark-text-secondary">
                +{project.techStack.length - 5} more
              </span>
            )}
          </div>

          {/* Metrics Preview */}
          <div className="mb-4">
            <ProjectMetrics metrics={project.metrics} isVisible={isVisible} />
          </div>

          {/* Expand/Collapse Button */}
          <button
            onClick={() => {
              setIsExpanded(!isExpanded);
              logProjectClick(project.title);
              logEvent('Project', isExpanded ? 'Collapse' : 'Expand', project.title);
            }}
            className="w-full flex items-center justify-center gap-2 py-2
              text-light-primary dark:text-dark-primary
              hover:bg-light-bg dark:hover:bg-dark-bg
              rounded-lg transition-colors"
          >
            <span className="font-medium">View Details</span>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="border-t border-light-border dark:border-dark-border p-6 animate-fadeIn">
            {/* Long Description */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-light-text dark:text-dark-text mb-2">
                Overview
              </h4>
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
                {project.longDescription}
              </p>
            </div>

            {/* Highlights */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-light-text dark:text-dark-text mb-2">
                Key Achievements
              </h4>
              <ul className="space-y-2">
                {project.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-light-primary dark:text-dark-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                      {highlight}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Architecture */}
            {project.architecture && (
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-light-text dark:text-dark-text mb-2">
                  Architecture
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-light-primary dark:text-dark-primary" />
                    <span className="text-sm font-medium text-light-text dark:text-dark-text">
                      {project.architecture.pattern}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary mb-2">
                      Components:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.architecture.components.map((comp, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 text-xs bg-light-bg dark:bg-dark-bg rounded
                            text-light-text-secondary dark:text-dark-text-secondary"
                        >
                          {comp}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary mb-2">
                      Key Features:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.architecture.keyFeatures.map((feature, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 text-xs bg-light-bg dark:bg-dark-bg rounded
                            text-light-text-secondary dark:text-dark-text-secondary"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Full Tech Stack */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-light-text dark:text-dark-text mb-2">
                <Code className="inline w-4 h-4 mr-1" />
                Full Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, idx) => (
                  <button
                    key={idx}
                    onClick={() => onTechFilter?.(tech)}
                    className="px-2 py-1 text-xs font-medium rounded-full
                      bg-light-bg dark:bg-dark-bg
                      border border-light-border dark:border-dark-border
                      text-light-text-secondary dark:text-dark-text-secondary
                      hover:border-light-primary dark:hover:border-dark-primary
                      hover:text-light-primary dark:hover:text-dark-primary
                      transition-colors cursor-pointer"
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </div>

            {/* Image Carousel */}
            {project.images.length > 0 && (
              <div className="relative">
                <h4 className="text-sm font-semibold text-light-text dark:text-dark-text mb-2">
                  Screenshots & Diagrams
                </h4>
                <div className="relative bg-light-bg dark:bg-dark-bg rounded-lg overflow-hidden">
                  <img
                    src={project.images[currentImageIndex]}
                    alt={`${project.title} - Image ${currentImageIndex + 1}`}
                    className="w-full h-48 object-cover cursor-pointer"
                    onClick={() => {
                      setShowLightbox(true);
                      logEvent('Project', 'View Image', `${project.title} - Image ${currentImageIndex + 1}`);
                    }}
                  />
                  {project.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 p-1 rounded-full
                          bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm
                          hover:bg-white dark:hover:bg-gray-900 transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full
                          bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm
                          hover:bg-white dark:hover:bg-gray-900 transition-colors"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                        {project.images.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`w-2 h-2 rounded-full transition-colors ${
                              idx === currentImageIndex
                                ? 'bg-white'
                                : 'bg-white/50'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {showLightbox && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setShowLightbox(false)}
        >
          <button
            onClick={() => setShowLightbox(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <img
            src={project.images[currentImageIndex]}
            alt={`${project.title} - Image ${currentImageIndex + 1}`}
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          {project.images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full
                  bg-white/10 hover:bg-white/20 transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full
                  bg-white/10 hover:bg-white/20 transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default EnhancedProjectCard;