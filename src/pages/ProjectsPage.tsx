import ProjectCard from '../components/ui/ProjectCard';
import { projects } from '../data/projects';

export default function ProjectsPage() {
  const mainProjects = projects.filter((p) => p.category !== 'hackathon');
  const hackathonProjects = projects.filter((p) => p.category === 'hackathon');

  return (
    <div>
      <h1 className="font-heading text-3xl font-bold text-primary mb-8">
        Projects
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
        {mainProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {hackathonProjects.length > 0 && (
        <>
          <h2 className="font-heading text-2xl font-bold text-primary mt-12 mb-2">
            Hackathon Projects
          </h2>
          <p className="text-base text-muted mb-6">
            Short-form weekend builds — ideas explored end-to-end.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
            {hackathonProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
