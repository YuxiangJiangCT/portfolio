import { useState } from 'react';
import ExpandableSection from '../common/ExpandableSection';
import { aboutData } from '../../data/about.tsx';

function AboutSection() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-mono text-center mb-16">More About Me</h2>

        <div className="space-y-3 max-w-full mx-auto">
          {aboutData.map((section) => (
            <ExpandableSection
              key={section.id}
              id={section.id}
              icon={section.icon}
              title={section.title}
              content={section.content}
              isExpanded={expandedSection === section.id}
              onToggle={(id) => setExpandedSection(expandedSection === id ? null : id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutSection;