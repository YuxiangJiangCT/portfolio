import TechTag from './TechTag';
import type { Experience } from '../../data/experience';

interface ExperienceBlockProps {
  experience: Experience;
}

export default function ExperienceBlock({ experience }: ExperienceBlockProps) {
  return (
    <div className="group">
      <div className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-3 mb-1">
        <h3 className="text-[14px] font-semibold text-gray-900">{experience.company}</h3>
        <span className="text-[12px] text-gray-400 tabular-nums">{experience.period}</span>
      </div>

      <p className="text-[13px] text-gray-500 mb-3">
        {experience.role} · {experience.location}
      </p>

      <ul className="space-y-1.5 mb-3">
        {experience.bullets.map((bullet, i) => (
          <li key={i} className="text-[13px] text-gray-500 flex items-start gap-2 leading-relaxed">
            <span className="text-gray-300 mt-px shrink-0">–</span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-1">
        {experience.techStack.map((t) => (
          <TechTag key={t} name={t} />
        ))}
      </div>
    </div>
  );
}
