import ExperienceBlock from '../ui/ExperienceBlock';
import { experiences } from '../../data/experience';

export default function Experience() {
  return (
    <section id="experience" className="py-14">
      <h2 className="font-heading text-[22px] font-bold text-primary mb-8">
        Experience
      </h2>
      <div className="space-y-10">
        {experiences.map((exp) => (
          <ExperienceBlock key={exp.id} experience={exp} />
        ))}
      </div>
    </section>
  );
}
