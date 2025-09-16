import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-20 z-50 p-3 rounded-full bg-gray-200 dark:bg-gray-800
                 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700
                 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 transition-transform duration-300" />
      ) : (
        <Moon className="w-5 h-5 transition-transform duration-300" />
      )}
    </button>
  );
}

export default ThemeToggle;