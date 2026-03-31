import ExperienceBlock from '../ui/ExperienceBlock';
import { experiences } from '../../data/experience';

export default function Experience() {
  return (
    <section id="experience" className="py-16 border-b border-border">
      <h2 className="text-2xl font-bold text-text-primary mb-8">Experience</h2>
      <div className="space-y-10">
        {experiences.map((exp) => (
          <ExperienceBlock key={exp.id} experience={exp} />
        ))}
      </div>
    </section>
  );
}
