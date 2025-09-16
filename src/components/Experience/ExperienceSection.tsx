import { useState } from 'react';
import { Briefcase } from 'lucide-react';
import Timeline from './Timeline';
import { experiences } from '../../data/experience';

function ExperienceSection() {
  const [filteredTech, setFilteredTech] = useState<string | null>(null);

  const handleTechFilter = (tech: string) => {
    setFilteredTech(filteredTech === tech ? null : tech);
  };

  const filteredExperiences = filteredTech
    ? experiences.map(exp => ({
        ...exp,
        achievements: exp.achievements.filter(ach =>
          ach.technologies.includes(filteredTech)
        )
      })).filter(exp => exp.achievements.length > 0)
    : experiences;

  return (
    <section id="experience" className="py-32 px-6 bg-light-bg dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Briefcase className="w-8 h-8 text-light-primary dark:text-dark-primary" />
            <h2 className="text-4xl font-mono text-light-text dark:text-dark-text">
              Professional Experience
            </h2>
          </div>
          <p className="text-light-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto">
            Building scalable systems and solving complex technical challenges
          </p>

          {filteredTech && (
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-light-card dark:bg-dark-card rounded-full border border-light-border dark:border-dark-border">
              <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                Filtering by:
              </span>
              <span className="text-sm font-medium text-light-primary dark:text-dark-primary">
                {filteredTech}
              </span>
              <button
                onClick={() => setFilteredTech(null)}
                className="ml-2 text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text dark:hover:text-dark-text"
              >
                ×
              </button>
            </div>
          )}
        </div>

        <Timeline
          experiences={filteredExperiences}
          onTechFilter={handleTechFilter}
        />
      </div>
    </section>
  );
}

export default ExperienceSection;