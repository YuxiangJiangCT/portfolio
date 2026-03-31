import TechTag from './TechTag';
import type { Experience } from '../../data/experience';

interface ExperienceBlockProps {
  experience: Experience;
}

export default function ExperienceBlock({ experience }: ExperienceBlockProps) {
  return (
    <div className="border-l-2 border-border pl-6 py-1">
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
        <h3 className="text-lg font-semibold text-text-primary">{experience.company}</h3>
        <span className="text-sm text-text-secondary whitespace-nowrap">{experience.period}</span>
      </div>

      <p className="text-sm text-text-secondary mb-3">
        {experience.role} · {experience.location}
      </p>

      <ul className="space-y-2 mb-4">
        {experience.bullets.map((bullet, i) => (
          <li key={i} className="text-sm text-text-secondary flex items-start gap-2">
            <span className="text-accent mt-1 shrink-0">•</span>
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
