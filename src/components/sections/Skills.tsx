import TechTag from '../ui/TechTag';
import { skillGroups } from '../../data/skills';

export default function Skills() {
  return (
    <section id="skills" className="py-16 border-b border-border">
      <h2 className="text-2xl font-bold text-text-primary mb-8">Skills</h2>
      <div className="space-y-5">
        {skillGroups.map((group) => (
          <div key={group.category}>
            <h3 className="text-sm font-medium text-text-secondary mb-2">{group.category}</h3>
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
