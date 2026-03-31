import ProjectCard from '../ui/ProjectCard';
import { projects } from '../../data/projects';

export default function SelectedWork() {
  return (
    <section id="work" className="py-16">
      <div className="flex items-center gap-3 mb-8">
        <h2 className="text-xl font-bold text-gray-900">Selected Work</h2>
        <div className="flex-1 h-px bg-gray-200" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
