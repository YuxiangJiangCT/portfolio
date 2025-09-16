import { useState, useMemo } from 'react';
import { Folder } from 'lucide-react';
import { projects } from '../../data/projects';
import EnhancedProjectCard from './EnhancedProjectCard';
import ProjectFilters from './ProjectFilters';

function ProjectsSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'date' | 'featured'>('featured');

  // Get all unique technologies from projects
  const availableTechs = useMemo(() => {
    const techSet = new Set<string>();
    projects.forEach(project => {
      project.techStack.forEach(tech => techSet.add(tech));
    });
    return Array.from(techSet).sort();
  }, []);

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    let filtered = [...projects];

    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchLower) ||
        project.subtitle.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower) ||
        project.longDescription.toLowerCase().includes(searchLower) ||
        project.techStack.some(tech => tech.toLowerCase().includes(searchLower))
      );
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(project => project.category === selectedCategory);
    }

    // Technology filter
    if (selectedTech) {
      filtered = filtered.filter(project => project.techStack.includes(selectedTech));
    }

    // Sort
    if (sortBy === 'featured') {
      filtered.sort((a, b) => {
        if (a.featured === b.featured) {
          return new Date(b.endDate).getTime() - new Date(a.endDate).getTime();
        }
        return a.featured ? -1 : 1;
      });
    } else {
      filtered.sort((a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime());
    }

    return filtered;
  }, [searchTerm, selectedCategory, selectedTech, sortBy]);

  const handleTechFilter = (tech: string) => {
    setSelectedTech(selectedTech === tech ? null : tech);
  };

  return (
    <section id="projects" className="py-32 px-6 bg-light-bg dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Folder className="w-8 h-8 text-light-primary dark:text-dark-primary" />
            <h2 className="text-4xl font-mono text-light-text dark:text-dark-text">
              Projects & Work
            </h2>
          </div>
          <p className="text-light-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto">
            A collection of my technical projects showcasing system design, performance optimization, and full-stack development
          </p>
        </div>

        {/* Filters */}
        <ProjectFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedTech={selectedTech}
          onTechChange={setSelectedTech}
          sortBy={sortBy}
          onSortChange={setSortBy}
          availableTechs={availableTechs}
        />

        {/* Results Count */}
        {(searchTerm || selectedCategory || selectedTech) && (
          <div className="mb-4 text-sm text-light-text-secondary dark:text-dark-text-secondary">
            Found {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
            {filteredProjects.length === 0 && ' matching your filters'}
          </div>
        )}

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredProjects.map(project => (
              <EnhancedProjectCard
                key={project.id}
                project={project}
                onTechFilter={handleTechFilter}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-light-text-secondary dark:text-dark-text-secondary">
              <Folder className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg mb-2">No projects found</p>
              <p className="text-sm">Try adjusting your filters or search terms</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProjectsSection;