import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Github, Linkedin, Mail, FileText, Menu, X } from 'lucide-react';
import { profile } from '../../data/profile';

const navItems = [
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Sidebar() {
  const [activeSection, setActiveSection] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  // Track active section via IntersectionObserver
  useEffect(() => {
    if (!isHome) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: '-20% 0px -60% 0px' }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((s) => observer.observe(s));

    return () => observer.disconnect();
  }, [isHome]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (!isHome) {
      window.location.href = '/' + href;
    }
  };

  const sidebarContent = (
    <>
      {/* Identity */}
      <div className="mb-8">
        <h1 className="text-lg font-bold text-text-primary">Yuxiang Jiang</h1>
        <p className="text-sm text-text-secondary mt-0.5">{profile.title}</p>
        <div className="mt-3 text-xs text-text-secondary leading-relaxed">
          <p>{profile.education.school}</p>
          <p>{profile.education.degree}</p>
          <p>{profile.education.year}</p>
        </div>
      </div>

      {/* Social links */}
      <div className="flex items-center gap-3 mb-8">
        <a
          href={profile.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-secondary hover:text-text-primary transition-colors"
          aria-label="GitHub"
        >
          <Github className="w-4 h-4" />
        </a>
        <a
          href={profile.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-secondary hover:text-text-primary transition-colors"
          aria-label="LinkedIn"
        >
          <Linkedin className="w-4 h-4" />
        </a>
        <a
          href={`mailto:${profile.links.email}`}
          className="text-text-secondary hover:text-text-primary transition-colors"
          aria-label="Email"
        >
          <Mail className="w-4 h-4" />
        </a>
      </div>

      {/* Navigation */}
      <nav className="mb-8">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.slice(1);
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={`block px-3 py-1.5 text-sm rounded-md transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-accent font-medium border-l-2 border-accent'
                      : 'text-text-secondary hover:text-text-primary hover:bg-secondary'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Resume button */}
      <a
        href="/Ryan_Resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full px-4 py-2 text-sm font-medium text-accent border border-accent rounded-lg hover:bg-blue-50 transition-colors"
      >
        <FileText className="w-4 h-4" />
        Download Resume
      </a>
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col fixed top-0 left-0 w-60 h-screen border-r border-border bg-white px-6 py-8 overflow-y-auto">
        {sidebarContent}
      </aside>

      {/* Mobile header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-border px-4 py-3 flex items-center justify-between">
        <span className="text-sm font-semibold text-text-primary">Yuxiang Jiang</span>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-1 text-text-secondary hover:text-text-primary"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-white pt-14 px-6 py-8 overflow-y-auto">
          {sidebarContent}
        </div>
      )}
    </>
  );
}
