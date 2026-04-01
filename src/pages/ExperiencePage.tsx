import ExperienceBlock from '../components/ui/ExperienceBlock';
import { experiences } from '../data/experience';

export default function ExperiencePage() {
  return (
    <div>
      <h1 className="font-heading text-3xl font-bold text-primary mb-8">
        Experience
      </h1>
      <div className="space-y-10">
        {experiences.map((exp) => (
          <ExperienceBlock key={exp.id} experience={exp} />
        ))}
      </div>
    </div>
  );
}
