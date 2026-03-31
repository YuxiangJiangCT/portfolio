import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import StatusBadge from './StatusBadge';
import TechTag from './TechTag';
import type { Project } from '../../data/projects';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      to={`/project/${project.id}`}
      className="group block card-hover rounded-xl border border-gray-200/80 bg-white p-6 shadow-sm"
    >
      {/* Status badges */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.status.map((s) => (
          <StatusBadge key={s} label={s} />
        ))}
      </div>

      {/* Title */}
      <h3 className="text-[15px] font-semibold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
        {project.title}
      </h3>

      {/* One-liner */}
      <p className="text-[13px] text-gray-500 mb-4 leading-relaxed line-clamp-2">{project.oneLiner}</p>

      {/* Highlights */}
      <ul className="space-y-1.5 mb-5">
        {project.highlights.slice(0, 3).map((h, i) => (
          <li key={i} className="text-[13px] text-gray-600 flex items-start gap-2">
            <span className="text-blue-500 mt-0.5 shrink-0 text-[10px]">▸</span>
            <span>{h}</span>
          </li>
        ))}
      </ul>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.techStack.slice(0, 6).map((t) => (
          <TechTag key={t} name={t} />
        ))}
        {project.techStack.length > 6 && (
          <span className="inline-block px-2 py-1 text-[11px] text-gray-400">
            +{project.techStack.length - 6}
          </span>
        )}
      </div>

      {/* View details */}
      <span className="inline-flex items-center gap-1 text-[13px] font-medium text-blue-600 group-hover:gap-1.5 transition-all">
        View Details
        <ArrowUpRight className="w-3.5 h-3.5" />
      </span>
    </Link>
  );
}
