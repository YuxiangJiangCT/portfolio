import TechTag from '../ui/TechTag';
import { skillGroups } from '../../data/skills';

export default function Skills() {
  return (
    <section id="skills" className="py-14">
      <h2 className="text-[13px] font-semibold text-gray-400 uppercase tracking-widest mb-6">
        Skills
      </h2>
      <div className="space-y-4">
        {skillGroups.map((group) => (
          <div key={group.category} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4">
            <span className="text-[12px] font-medium text-gray-400 w-24 shrink-0 pt-0.5">
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
