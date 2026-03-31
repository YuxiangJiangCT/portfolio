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
      className="group block card-lift rounded-lg border border-gray-200 bg-white p-5"
    >
      {/* Status */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {project.status.map((s) => (
          <StatusBadge key={s} label={s} />
        ))}
      </div>

      {/* Title */}
      <h3 className="text-[14px] font-semibold text-gray-900 mb-1.5 group-hover:text-indigo-600 transition-colors leading-snug">
        {project.title}
      </h3>

      {/* One-liner */}
      <p className="text-[13px] text-gray-500 mb-4 leading-relaxed line-clamp-2">
        {project.oneLiner}
      </p>

      {/* Highlights */}
      <ul className="space-y-1 mb-4">
        {project.highlights.slice(0, 3).map((h, i) => (
          <li key={i} className="text-[12px] text-gray-500 flex items-start gap-1.5 leading-relaxed">
            <span className="text-indigo-400 mt-px shrink-0">·</span>
            <span>{h}</span>
          </li>
        ))}
      </ul>

      {/* Tech */}
      <div className="flex flex-wrap gap-1 mb-4">
        {project.techStack.slice(0, 5).map((t) => (
          <TechTag key={t} name={t} />
        ))}
        {project.techStack.length > 5 && (
          <span className="text-[10px] text-gray-400 self-center ml-0.5">+{project.techStack.length - 5}</span>
        )}
      </div>

      {/* Link */}
      <span className="inline-flex items-center gap-1 text-[12px] font-medium text-indigo-500 group-hover:text-indigo-700 transition-colors">
        Details
        <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </Link>
  );
}
