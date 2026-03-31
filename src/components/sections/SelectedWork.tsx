import ProjectCard from '../ui/ProjectCard';
import { projects } from '../../data/projects';

export default function SelectedWork() {
  return (
    <section id="work" className="py-16 border-b border-border">
      <h2 className="text-2xl font-bold text-text-primary mb-8">Selected Work</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
