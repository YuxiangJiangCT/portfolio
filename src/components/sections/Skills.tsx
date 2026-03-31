import TechTag from '../ui/TechTag';
import { skillGroups } from '../../data/skills';

export default function Skills() {
  return (
    <section id="skills" className="py-14">
      <h2 className="font-heading text-[22px] font-bold text-primary mb-8">
        Skills
      </h2>
      <div className="space-y-5">
        {skillGroups.map((group) => (
          <div key={group.category} className="flex flex-col sm:flex-row sm:items-start gap-1.5 sm:gap-4">
            <span className="text-[12px] font-medium text-muted w-28 shrink-0 pt-1 uppercase tracking-wider">
              {group.category}
            </span>
            <div className="flex flex-wrap gap-1.5">
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
