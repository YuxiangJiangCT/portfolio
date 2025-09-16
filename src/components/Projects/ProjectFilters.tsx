import { useState } from 'react';
import { Search, Filter, X, Layers, Code2, Database, Globe } from 'lucide-react';

interface ProjectFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  selectedTech: string | null;
  onTechChange: (tech: string | null) => void;
  sortBy: 'date' | 'featured';
  onSortChange: (sort: 'date' | 'featured') => void;
  availableTechs: string[];
}

const ProjectFilters: React.FC<ProjectFiltersProps> = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedTech,
  onTechChange,
  sortBy,
  onSortChange,
  availableTechs
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: 'backend', label: 'Backend', icon: <Code2 className="w-4 h-4" /> },
    { id: 'fullstack', label: 'Full Stack', icon: <Globe className="w-4 h-4" /> },
    { id: 'system-design', label: 'System Design', icon: <Layers className="w-4 h-4" /> },
    { id: 'data', label: 'Data', icon: <Database className="w-4 h-4" /> }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'backend': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 border-purple-300 dark:border-purple-700';
      case 'fullstack': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border-blue-300 dark:border-blue-700';
      case 'system-design': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-300 dark:border-green-700';
      case 'data': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 border-orange-300 dark:border-orange-700';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200 border-gray-300 dark:border-gray-700';
    }
  };

  const clearAllFilters = () => {
    onSearchChange('');
    onCategoryChange(null);
    onTechChange(null);
    onSortChange('featured');
  };

  const hasActiveFilters = searchTerm || selectedCategory || selectedTech || sortBy !== 'featured';

  return (
    <div className="mb-8">
      {/* Search Bar */}
      <div className="flex gap-4 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search projects by title, description, or technology..."
            className="w-full pl-10 pr-4 py-3 rounded-lg
              bg-light-card dark:bg-dark-card
              border border-light-border dark:border-dark-border
              text-light-text dark:text-dark-text
              placeholder:text-light-text-secondary dark:placeholder:text-dark-text-secondary
              focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary"
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full
                hover:bg-light-bg dark:hover:bg-dark-bg transition-colors"
            >
              <X className="w-4 h-4 text-light-text-secondary dark:text-dark-text-secondary" />
            </button>
          )}
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`px-4 py-3 rounded-lg flex items-center gap-2
            ${showFilters ? 'bg-light-primary dark:bg-dark-primary text-white' :
              'bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border text-light-text dark:text-dark-text'}
            hover:opacity-90 transition-all`}
        >
          <Filter className="w-5 h-5" />
          <span className="hidden md:inline">Filters</span>
          {hasActiveFilters && (
            <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-white/20">
              {[searchTerm, selectedCategory, selectedTech, sortBy !== 'featured'].filter(Boolean).length}
            </span>
          )}
        </button>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="p-4 rounded-lg bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border animate-fadeIn">
          {/* Categories */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-light-text dark:text-dark-text mb-2">
              Category
            </h3>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => onCategoryChange(selectedCategory === category.id ? null : category.id)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5
                    border transition-all
                    ${selectedCategory === category.id
                      ? getCategoryColor(category.id)
                      : 'bg-light-bg dark:bg-dark-bg border-light-border dark:border-dark-border text-light-text-secondary dark:text-dark-text-secondary hover:border-light-primary dark:hover:border-dark-primary'
                    }`}
                >
                  {category.icon}
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Technologies */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-light-text dark:text-dark-text mb-2">
              Technology
            </h3>
            <div className="flex flex-wrap gap-2">
              {availableTechs.slice(0, 12).map(tech => (
                <button
                  key={tech}
                  onClick={() => onTechChange(selectedTech === tech ? null : tech)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium
                    border transition-all
                    ${selectedTech === tech
                      ? 'bg-light-primary dark:bg-dark-primary text-white border-light-primary dark:border-dark-primary'
                      : 'bg-light-bg dark:bg-dark-bg border-light-border dark:border-dark-border text-light-text-secondary dark:text-dark-text-secondary hover:border-light-primary dark:hover:border-dark-primary'
                    }`}
                >
                  {tech}
                </button>
              ))}
              {availableTechs.length > 12 && (
                <span className="px-3 py-1.5 text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  +{availableTechs.length - 12} more
                </span>
              )}
            </div>
          </div>

          {/* Sort Options */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-light-text dark:text-dark-text mb-2">
              Sort By
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() => onSortChange('featured')}
                className={`px-3 py-1.5 rounded-full text-sm font-medium
                  border transition-all
                  ${sortBy === 'featured'
                    ? 'bg-light-primary dark:bg-dark-primary text-white border-light-primary dark:border-dark-primary'
                    : 'bg-light-bg dark:bg-dark-bg border-light-border dark:border-dark-border text-light-text-secondary dark:text-dark-text-secondary hover:border-light-primary dark:hover:border-dark-primary'
                  }`}
              >
                Featured First
              </button>
              <button
                onClick={() => onSortChange('date')}
                className={`px-3 py-1.5 rounded-full text-sm font-medium
                  border transition-all
                  ${sortBy === 'date'
                    ? 'bg-light-primary dark:bg-dark-primary text-white border-light-primary dark:border-dark-primary'
                    : 'bg-light-bg dark:bg-dark-bg border-light-border dark:border-dark-border text-light-text-secondary dark:text-dark-text-secondary hover:border-light-primary dark:hover:border-dark-primary'
                  }`}
              >
                Most Recent
              </button>
            </div>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="px-4 py-2 rounded-lg text-sm font-medium
                bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200
                hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
            >
              Clear All Filters
            </button>
          )}
        </div>
      )}

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 mt-4">
          <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
            Active filters:
          </span>
          {searchTerm && (
            <span className="px-3 py-1 rounded-full text-xs font-medium
              bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border
              text-light-text dark:text-dark-text flex items-center gap-1">
              Search: "{searchTerm}"
              <button onClick={() => onSearchChange('')}>
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {selectedCategory && (
            <span className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${getCategoryColor(selectedCategory)}`}>
              {categories.find(c => c.id === selectedCategory)?.label}
              <button onClick={() => onCategoryChange(null)}>
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {selectedTech && (
            <span className="px-3 py-1 rounded-full text-xs font-medium
              bg-light-primary dark:bg-dark-primary text-white flex items-center gap-1">
              {selectedTech}
              <button onClick={() => onTechChange(null)}>
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {sortBy !== 'featured' && (
            <span className="px-3 py-1 rounded-full text-xs font-medium
              bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border
              text-light-text dark:text-dark-text flex items-center gap-1">
              Sort: Most Recent
              <button onClick={() => onSortChange('featured')}>
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectFilters;