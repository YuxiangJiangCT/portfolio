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
    <div className="flex flex-col h-full">
      {/* Identity */}
      <div className="mb-8">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm mb-4 shadow-sm">
          YJ
        </div>
        <h1 className="text-base font-semibold text-gray-900 tracking-tight">Yuxiang Jiang</h1>
        <p className="text-[13px] text-gray-500 mt-0.5">{profile.title}</p>

        <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
          <p className="text-xs font-medium text-gray-700">{profile.education.school}</p>
          <p className="text-xs text-gray-500 mt-0.5">{profile.education.degree}</p>
          <p className="text-xs text-gray-500">{profile.education.year}</p>
        </div>

        {/* Status */}
        <div className="mt-3 flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-[11px] text-gray-500">Open to opportunities</span>
        </div>
      </div>

      {/* Social links */}
      <div className="flex items-center gap-1 mb-8">
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
            className="p-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all"
            aria-label={label}
          >
            <Icon className="w-[18px] h-[18px]" />
          </a>
        ))}
      </div>

      {/* Navigation */}
      <nav className="mb-auto">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-3 px-3">
          Navigation
        </p>
        <ul className="space-y-0.5">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.slice(1);
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={`group flex items-center gap-3 px-3 py-2 text-[13px] rounded-lg transition-all ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <span
                    className={`w-1 h-4 rounded-full transition-all ${
                      isActive ? 'bg-blue-600' : 'bg-transparent group-hover:bg-gray-300'
                    }`}
                  />
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
        className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-[13px] font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors shadow-sm"
      >
        <Download className="w-3.5 h-3.5" />
        Resume
      </a>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col fixed top-0 left-0 w-[240px] h-screen bg-white border-r border-gray-200/80 px-5 py-6 overflow-y-auto">
        {sidebarContent}
      </aside>

      {/* Mobile header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200/80 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-[10px]">
            YJ
          </div>
          <span className="text-sm font-semibold text-gray-900">Yuxiang Jiang</span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-white pt-16 px-5 py-6 overflow-y-auto">
          {sidebarContent}
        </div>
      )}
    </>
  );
}
