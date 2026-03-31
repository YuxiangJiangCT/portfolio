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
      className="group block card-lift rounded-lg border border-border bg-white p-6 shadow-sm hover:shadow-lg cursor-pointer"
    >
      {/* Status */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {project.status.map((s) => (
          <StatusBadge key={s} label={s} />
        ))}
      </div>

      {/* Title */}
      <h3 className="font-heading text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors leading-snug">
        {project.title}
      </h3>

      {/* One-liner */}
      <p className="text-base text-muted mb-4 leading-relaxed line-clamp-2">
        {project.oneLiner}
      </p>

      {/* Highlights */}
      <ul className="space-y-1 mb-4">
        {project.highlights.slice(0, 3).map((h, i) => (
          <li key={i} className="text-sm text-secondary flex items-start gap-1.5 leading-relaxed">
            <span className="text-accent/60 mt-px shrink-0">·</span>
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
          <span className="text-xs text-muted self-center ml-0.5">+{project.techStack.length - 5}</span>
        )}
      </div>

      {/* Link */}
      <span className="inline-flex items-center gap-1 text-sm font-semibold text-accent group-hover:gap-1.5 transition-all">
        Details
        <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </Link>
  );
}
