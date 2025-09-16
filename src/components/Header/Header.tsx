import { Link } from 'react-router-dom';
import { profileData } from '../../data/profile';

function Header() {
  return (
    <header className="fixed top-0 w-full bg-light-bg/80 dark:bg-dark-bg/80 backdrop-blur-sm z-50 transition-colors duration-300">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center gap-3">
          <img
            src={profileData.avatar}
            alt="Profile"
            className="w-9 h-9 rounded-full border-2 border-light-border dark:border-dark-border"
          />
          <span className="font-mono text-lg tracking-wide text-light-text dark:text-dark-text">Ryan</span>
        </div>
        <Link
          to="/projects"
          className="px-5 py-2 rounded-full font-mono text-sm
                     bg-light-card dark:bg-dark-card
                     text-light-text dark:text-dark-text
                     hover:bg-light-primary hover:text-white dark:hover:bg-dark-primary
                     transition-all duration-300
                     border border-light-border dark:border-dark-border"
        >
          My Projects
        </Link>
      </div>
    </header>
  );
}

export default Header;