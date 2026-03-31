import ProjectCard from '../ui/ProjectCard';
import { projects } from '../../data/projects';

export default function SelectedWork() {
  return (
    <section id="work" className="py-14">
      <h2 className="font-heading text-[26px] font-bold text-primary mb-8">
        Selected Work
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
