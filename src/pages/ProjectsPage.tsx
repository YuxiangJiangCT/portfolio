import ProjectCard from '../components/ui/ProjectCard';
import { projects } from '../data/projects';

export default function ProjectsPage() {
  return (
    <div>
      <h1 className="font-heading text-3xl font-bold text-primary mb-8">
        Projects
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
