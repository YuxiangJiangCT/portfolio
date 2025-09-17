import { profileData } from '../../data/profile';

function Header() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="fixed top-0 w-full bg-light-bg/90 dark:bg-dark-bg/90 backdrop-blur-md z-50 transition-all duration-300 border-b border-light-border/20 dark:border-dark-border/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-4 logo-trigger cursor-pointer">
            <img
              src={profileData.avatar}
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-light-primary dark:border-dark-primary transition-all duration-300 hover:scale-110"
            />
            <div>
              <span className="font-bold text-lg text-light-text dark:text-dark-text">Ryan Jiang</span>
              <p className="text-xs text-light-text/60 dark:text-dark-text/60">Software Engineer</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scrollToSection('experience')}
              className="px-4 py-2 text-sm font-medium text-light-text/80 dark:text-dark-text/80 hover:text-light-primary dark:hover:text-dark-primary transition-colors"
            >
              Experience
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="px-4 py-2 text-sm font-medium text-light-text/80 dark:text-dark-text/80 hover:text-light-primary dark:hover:text-dark-primary transition-colors"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection('skills')}
              className="px-4 py-2 text-sm font-medium text-light-text/80 dark:text-dark-text/80 hover:text-light-primary dark:hover:text-dark-primary transition-colors"
            >
              Skills
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="px-5 py-2 rounded-full text-sm font-medium
                       bg-gradient-to-r from-light-primary to-light-accent dark:from-dark-primary dark:to-dark-accent
                       text-white shadow-lg hover:shadow-xl transform hover:scale-105
                       transition-all duration-300"
            >
              About Me
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;