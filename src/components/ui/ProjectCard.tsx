import { useState } from 'react';
import { ChevronDown, ExternalLink, Github } from 'lucide-react';
import StatusBadge from './StatusBadge';
import TechTag from './TechTag';
import ArchitectureDiagram from './ArchitectureDiagram';
import type { Project } from '../../data/projects';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`rounded-lg border border-border bg-white shadow-sm transition-all duration-300 ease-in-out ${
        isExpanded
          ? 'col-span-full w-[90%] mx-auto shadow-lg relative z-10'
          : 'hover:shadow-lg'
      }`}
      style={{ order: isExpanded ? -1 : 0 }}
    >
      {/* Preview image */}
      {project.image && (
        <div
          className={`overflow-hidden rounded-t-lg bg-gray-50 flex items-center justify-center transition-all duration-300 ${
            isExpanded ? 'h-64' : 'h-40'
          }`}
        >
          <img
            src={project.image}
            alt={project.title}
            className="max-h-full max-w-full object-contain p-4"
          />
        </div>
      )}

      <div className="p-6">
        {/* Status */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.status.map((s) => (
            <StatusBadge key={s} label={s} />
          ))}
        </div>

        {/* Title */}
        <h3 className="font-heading text-xl font-bold text-primary mb-2 leading-snug">
          {project.title}
        </h3>

        {/* Description — switches between one-liner and full overview */}
        <div
          className={`transition-all duration-300 ${
            isExpanded ? 'max-h-[2000px]' : 'max-h-[100px] overflow-hidden'
          }`}
        >
          <p className="text-base text-muted mb-4 leading-relaxed">
            {isExpanded ? project.overview : project.oneLiner}
          </p>

          {/* Collapsed: highlights */}
          {!isExpanded && (
            <ul className="space-y-1 mb-4">
              {project.highlights.slice(0, 3).map((h, i) => (
                <li
                  key={i}
                  className="text-sm text-secondary flex items-start gap-1.5 leading-relaxed"
                >
                  <span className="text-accent/60 mt-px shrink-0">·</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Expanded: full detail sections */}
          {isExpanded && (
            <>
              {/* What I Built */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
                  What I Built
                </h4>
                <ul className="space-y-2">
                  {project.whatIBuilt.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600 leading-relaxed">
                      <span className="text-blue-500 mt-0.5 shrink-0 text-xs">▸</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Architecture */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
                  Architecture
                </h4>
                <ArchitectureDiagram projectId={project.id} />
              </div>

              {/* Key Decisions */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
                  Key Decisions
                </h4>
                <ul className="space-y-2">
                  {project.keyDecisions.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600 leading-relaxed">
                      <span className="text-amber-500 mt-px shrink-0 font-mono text-xs font-bold">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Results */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
                  Results
                </h4>
                <div className="bg-emerald-50 border border-emerald-200/60 rounded-lg p-4">
                  <ul className="space-y-1.5">
                    {project.results.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-emerald-800 text-sm leading-relaxed">
                        <span className="text-emerald-500 mt-px shrink-0 text-xs">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Links */}
              {(project.links.github || project.links.demo || project.links.showcase) && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
                    Links
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors shadow-sm"
                      >
                        <Github className="w-4 h-4" />
                        Source Code
                      </a>
                    )}
                    {project.links.demo && (
                      <a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors shadow-sm"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </a>
                    )}
                    {project.links.showcase && (
                      <a
                        href={project.links.showcase}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors shadow-sm"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Showcase
                      </a>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {(isExpanded ? project.techStack : project.techStack.slice(0, 5)).map((t) => (
            <TechTag key={t} name={t} />
          ))}
          {!isExpanded && project.techStack.length > 5 && (
            <span className="text-xs text-muted self-center ml-0.5">
              +{project.techStack.length - 5}
            </span>
          )}
        </div>

        {/* Toggle button */}
        <div className="flex justify-center mt-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 px-4 py-2 border-2 border-accent text-accent rounded-full hover:bg-accent hover:text-white transition-all duration-200 cursor-pointer"
          >
            <span className="font-medium text-sm">
              {isExpanded ? 'Show Less' : 'Show More'}
            </span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                isExpanded ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
