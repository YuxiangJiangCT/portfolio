import ExperienceBlock from '../ui/ExperienceBlock';
import { experiences } from '../../data/experience';

export default function Experience() {
  return (
    <section id="experience" className="py-14">
      <h2 className="text-[13px] font-semibold text-gray-400 uppercase tracking-widest mb-6">
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
