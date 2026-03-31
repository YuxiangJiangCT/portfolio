import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { getProjectById } from '../data/projects';
import StatusBadge from '../components/ui/StatusBadge';
import TechTag from '../components/ui/TechTag';
import ArchitectureDiagram from '../components/ui/ArchitectureDiagram';

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const project = getProjectById(id ?? '');

  if (!project) {
    return (
      <div className="py-20 text-center">
        <p className="text-gray-500 mb-4">Project not found.</p>
        <Link to="/" className="text-blue-600 hover:underline text-sm">
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      {/* Back link */}
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-[13px] text-gray-400 hover:text-gray-700 transition-colors mb-10"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to all projects
      </Link>

      {/* Header */}
      <div className="mb-12">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.status.map((s) => (
            <StatusBadge key={s} label={s} />
          ))}
        </div>
        <h1 className="text-2xl sm:text-[28px] font-bold text-gray-900 tracking-tight mb-4">
          {project.title}
        </h1>
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map((t) => (
            <TechTag key={t} name={t} />
          ))}
        </div>
      </div>

      {/* Overview */}
      <DetailSection title="Overview">
        <p>{project.overview}</p>
      </DetailSection>

      {/* Context */}
      <DetailSection title="Context">
        <p>{project.context}</p>
      </DetailSection>

      {/* What I Built */}
      <DetailSection title="What I Built">
        <ul className="space-y-2.5">
          {project.whatIBuilt.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="text-blue-500 mt-0.5 shrink-0 text-[10px]">▸</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </DetailSection>

      {/* Architecture */}
      <DetailSection title="Architecture">
        <ArchitectureDiagram projectId={project.id} />
      </DetailSection>

      {/* Key Decisions */}
      <DetailSection title="Key Decisions">
        <ul className="space-y-3">
          {project.keyDecisions.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="text-amber-500 mt-px shrink-0 font-mono text-xs font-bold">→</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </DetailSection>

      {/* Challenges */}
      <DetailSection title="Challenges">
        <ul className="space-y-3">
          {project.challenges.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="text-rose-400 mt-px shrink-0 font-mono text-xs font-bold">!</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </DetailSection>

      {/* Results */}
      <DetailSection title="Results">
        <div className="bg-emerald-50 border border-emerald-200/60 rounded-xl p-5">
          <ul className="space-y-2">
            {project.results.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-emerald-800">
                <span className="text-emerald-500 mt-px shrink-0 text-xs">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </DetailSection>

      {/* Links */}
      {(project.links.github || project.links.demo || project.links.showcase) && (
        <DetailSection title="Links">
          <div className="flex flex-wrap gap-3">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-[13px] font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors shadow-sm"
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
                className="inline-flex items-center gap-2 px-4 py-2.5 text-[13px] font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors shadow-sm"
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
                className="inline-flex items-center gap-2 px-4 py-2.5 text-[13px] font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors shadow-sm"
              >
                <ExternalLink className="w-4 h-4" />
                Showcase
              </a>
            )}
          </div>
        </DetailSection>
      )}
    </div>
  );
}

function DetailSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-12">
      <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">{title}</h2>
      <div className="text-[14px] text-gray-600 leading-[1.7]">{children}</div>
    </div>
  );
}
