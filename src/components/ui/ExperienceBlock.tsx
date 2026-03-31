import TechTag from './TechTag';
import type { Experience } from '../../data/experience';

interface ExperienceBlockProps {
  experience: Experience;
}

export default function ExperienceBlock({ experience }: ExperienceBlockProps) {
  return (
    <div className="relative pl-6 pb-2">
      {/* Timeline line */}
      <div className="absolute left-0 top-2 bottom-0 w-px bg-gray-200" />

      {/* Timeline dot */}
      <div className="absolute left-[-3px] top-2 w-[7px] h-[7px] rounded-full bg-blue-500 ring-2 ring-white" />

      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 mb-1">
        <h3 className="text-[15px] font-semibold text-gray-900">{experience.company}</h3>
        <span className="text-xs text-gray-400 font-medium whitespace-nowrap">{experience.period}</span>
      </div>

      <p className="text-[13px] text-gray-500 mb-3 font-medium">
        {experience.role} · {experience.location}
      </p>

      <ul className="space-y-2 mb-4">
        {experience.bullets.map((bullet, i) => (
          <li key={i} className="text-[13px] text-gray-600 flex items-start gap-2 leading-relaxed">
            <span className="text-blue-400 mt-0.5 shrink-0 text-[10px]">▸</span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-1.5">
        {experience.techStack.map((t) => (
          <TechTag key={t} name={t} />
        ))}
      </div>
    </div>
  );
}
