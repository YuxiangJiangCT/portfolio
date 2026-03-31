import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import StatusBadge from './StatusBadge';
import TechTag from './TechTag';
import type { Project } from '../../data/projects';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group rounded-xl border border-border bg-white p-6 transition-shadow hover:shadow-md">
      {/* Status badges */}
      <div className="flex flex-wrap gap-2 mb-3">
        {project.status.map((s) => (
          <StatusBadge key={s} label={s} />
        ))}
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-text-primary mb-2">{project.title}</h3>

      {/* One-liner */}
      <p className="text-sm text-text-secondary mb-4 leading-relaxed">{project.oneLiner}</p>

      {/* Highlights */}
      <ul className="space-y-1.5 mb-5">
        {project.highlights.map((h, i) => (
          <li key={i} className="text-sm text-text-secondary flex items-start gap-2">
            <span className="text-accent mt-1 shrink-0">•</span>
            <span>{h}</span>
          </li>
        ))}
      </ul>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.techStack.map((t) => (
          <TechTag key={t} name={t} />
        ))}
      </div>

      {/* View details link */}
      <Link
        to={`/project/${project.id}`}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
      >
        View Details
        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}
