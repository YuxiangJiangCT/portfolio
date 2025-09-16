import { School, Star, Calendar } from 'lucide-react';
import { educationData } from '../../data/education';

interface EducationSectionProps {
  embedded?: boolean; // Used when embedded in HeroSection
}

function EducationSection({ embedded = false }: EducationSectionProps) {
  const education = educationData[0]; // Get first education entry

  const content = (
    <>
      <h3 className="text-2xl font-mono mb-6">Education</h3>

      <div className="space-y-8">
        <div className="flex items-center gap-6">
          <School className="w-8 h-8 text-light-text-secondary dark:text-dark-text-secondary" />
          <div>
            <h3 className="font-semibold text-lg">{education.institution}</h3>
            <p className="text-light-text-secondary dark:text-dark-text-secondary">{education.major}, {education.degree}</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <Star className="w-8 h-8 text-light-text-secondary dark:text-dark-text-secondary" />
          <div>
            <h3 className="font-semibold text-lg">GPA</h3>
            <p className="text-light-text-secondary dark:text-dark-text-secondary">{education.gpa}</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <Calendar className="w-8 h-8 text-light-text-secondary dark:text-dark-text-secondary" />
          <div>
            <h3 className="font-semibold text-lg">Date</h3>
            <p className="text-light-text-secondary dark:text-dark-text-secondary">{education.startDate} - {education.endDate}</p>
          </div>
        </div>
      </div>
    </>
  );

  if (embedded) {
    return <div className="max-w-xl mt-10">{content}</div>;
  }

  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {content}
      </div>
    </section>
  );
}

export default EducationSection;