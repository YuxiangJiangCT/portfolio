import TechTag from '../ui/TechTag';
import { skillGroups } from '../../data/skills';

export default function Skills() {
  return (
    <section id="skills" className="py-14">
      <h2 className="font-heading text-3xl font-bold text-primary mb-8">
        Skills
      </h2>
      <div className="space-y-8">
        {skillGroups.map((group) => (
          <div key={group.category}>
            <h3 className="text-xl font-medium text-gray-800 mb-3">
              {group.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <TechTag key={item} name={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
