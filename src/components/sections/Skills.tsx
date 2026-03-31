import TechTag from '../ui/TechTag';
import { skillGroups } from '../../data/skills';

export default function Skills() {
  return (
    <section id="skills" className="py-16">
      <div className="flex items-center gap-3 mb-8">
        <h2 className="text-xl font-bold text-gray-900">Skills</h2>
        <div className="flex-1 h-px bg-gray-200" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {skillGroups.map((group) => (
          <div key={group.category}>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2.5">
              {group.category}
            </h3>
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
