import ExperienceBlock from '../ui/ExperienceBlock';
import { experiences } from '../../data/experience';

export default function Experience() {
  return (
    <section id="experience" className="py-16">
      <div className="flex items-center gap-3 mb-8">
        <h2 className="text-xl font-bold text-gray-900">Experience</h2>
        <div className="flex-1 h-px bg-gray-200" />
      </div>
      <div className="space-y-8">
        {experiences.map((exp) => (
          <ExperienceBlock key={exp.id} experience={exp} />
        ))}
      </div>
    </section>
  );
}
