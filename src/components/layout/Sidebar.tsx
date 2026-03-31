import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Github, Linkedin, Mail, Menu, X, Download } from 'lucide-react';
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

  useEffect(() => {
    if (!isHome) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
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
    if (!isHome) window.location.href = '/' + href;
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Identity */}
      <div className="mb-10">
        <h1 className="text-[15px] font-semibold text-gray-900 tracking-tight">{profile.name.split('(')[0].trim()}</h1>
        <p className="text-[13px] text-gray-400 mt-0.5">{profile.title}</p>
      </div>

      {/* Education — compact */}
      <div className="mb-8 text-[12px] text-gray-400 leading-[1.6]">
        <p className="text-gray-600 font-medium">Cornell Tech</p>
        <p>M.S. Computer Science</p>
        <p>Expected May 2026</p>
      </div>

      {/* Social icons */}
      <div className="flex items-center gap-0.5 mb-10">
        {[
          { href: profile.links.github, icon: Github, label: 'GitHub' },
          { href: profile.links.linkedin, icon: Linkedin, label: 'LinkedIn' },
          { href: `mailto:${profile.links.email}`, icon: Mail, label: 'Email' },
        ].map(({ href, icon: Icon, label }) => (
          <a
            key={label}
            href={href}
            target={label !== 'Email' ? '_blank' : undefined}
            rel={label !== 'Email' ? 'noopener noreferrer' : undefined}
            className="p-2 rounded-md text-gray-400 hover:text-gray-800 hover:bg-gray-100 transition-all"
            aria-label={label}
          >
            <Icon className="w-4 h-4" strokeWidth={1.5} />
          </a>
        ))}
      </div>

      {/* Navigation */}
      <nav className="mb-auto">
        <ul className="space-y-0.5">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.slice(1);
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={`block py-1.5 text-[13px] transition-colors border-l-2 pl-3 ${
                    isActive
                      ? 'border-indigo-500 text-gray-900 font-medium'
                      : 'border-transparent text-gray-400 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Resume */}
      <a
        href="/Ryan_Resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-[12px] font-medium text-gray-500 hover:text-gray-900 transition-colors mt-8"
      >
        <Download className="w-3.5 h-3.5" />
        Download Resume
      </a>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col fixed top-0 left-0 w-[200px] h-screen border-r border-gray-100 bg-white px-6 py-10 overflow-y-auto">
        {sidebarContent}
      </aside>

      {/* Mobile header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 px-5 py-3 flex items-center justify-between">
        <span className="text-[13px] font-semibold text-gray-900">Yuxiang Jiang</span>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-1.5 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-white pt-16 px-6 py-8 overflow-y-auto">
          {sidebarContent}
        </div>
      )}
    </>
  );
}
