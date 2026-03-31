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
        <p className="text-text-secondary mb-4">Project not found.</p>
        <Link to="/" className="text-accent hover:underline text-sm">
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
        className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-accent transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Link>

      {/* Header */}
      <div className="mb-10">
        <div className="flex flex-wrap gap-2 mb-3">
          {project.status.map((s) => (
            <StatusBadge key={s} label={s} />
          ))}
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-3">{project.title}</h1>
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
        <ul className="space-y-2">
          {project.whatIBuilt.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-accent mt-0.5 shrink-0">•</span>
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
        <ul className="space-y-2">
          {project.keyDecisions.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-accent-amber mt-0.5 shrink-0">→</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </DetailSection>

      {/* Challenges */}
      <DetailSection title="Challenges">
        <ul className="space-y-2">
          {project.challenges.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-accent-rose mt-0.5 shrink-0">!</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </DetailSection>

      {/* Results */}
      <DetailSection title="Results">
        <ul className="space-y-2">
          {project.results.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-accent-green mt-0.5 shrink-0">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
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
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-text-primary border border-border rounded-lg hover:border-accent hover:text-accent transition-colors"
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
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-accent rounded-lg hover:bg-blue-700 transition-colors"
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
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-text-primary border border-border rounded-lg hover:border-accent hover:text-accent transition-colors"
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
    <div className="mb-10">
      <h2 className="text-lg font-semibold text-text-primary mb-3">{title}</h2>
      <div className="text-sm text-text-secondary leading-relaxed">{children}</div>
    </div>
  );
}
