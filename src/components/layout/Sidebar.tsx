import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Github, Linkedin, Mail, Menu, X, Download, MapPin } from 'lucide-react';
import { profile } from '../../data/profile';

const navItems = [
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Awards', href: '#awards' },
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
      {/* Identity — centered like a business card */}
      <div className="text-center mb-8">
        <h1 className="font-heading text-xl font-bold text-primary tracking-tight">
          {profile.name.split('(')[0].trim()}
        </h1>
        <p className="text-base text-muted mt-1">{profile.title}</p>
      </div>

      {/* Education */}
      <div className="text-center mb-6 text-sm text-muted leading-relaxed">
        <p className="text-primary font-medium">Cornell Tech</p>
        <p>M.S. Computer Science</p>
        <p>Expected May 2026</p>
      </div>

      {/* Social icons — clean, centered */}
      <div className="flex justify-center gap-3 mb-6">
        {[
          { href: profile.links.github, icon: Github, label: 'GitHub' },
          { href: profile.links.linkedin, icon: Linkedin, label: 'LinkedIn' },
        ].map(({ href, icon: Icon, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-primary hover:scale-110 transition-all cursor-pointer"
            aria-label={label}
          >
            <Icon className="w-6 h-6" strokeWidth={1.5} />
          </a>
        ))}
      </div>

      {/* Contact info */}
      <div className="text-center text-sm text-muted space-y-1.5 mb-10">
        <p className="flex items-center justify-center gap-2">
          <MapPin className="w-4 h-4 shrink-0" />
          {profile.location}
        </p>
        <p className="flex items-center justify-center gap-2">
          <Mail className="w-4 h-4 shrink-0" />
          {profile.links.email}
        </p>
      </div>

      {/* Navigation */}
      <nav className="mb-auto">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.slice(1);
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={`block px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-accent text-white shadow-sm'
                      : 'text-muted hover:bg-gray-50 hover:text-primary'
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
        className="flex items-center justify-center gap-2 text-sm font-medium text-muted hover:text-primary transition-colors mt-8 cursor-pointer"
      >
        <Download className="w-3.5 h-3.5" />
        Download Resume
      </a>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:flex flex-col fixed top-0 left-0 w-64 h-screen bg-white shadow-lg px-6 py-10 overflow-y-auto">
        {sidebarContent}
      </aside>

      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border px-5 py-3 flex items-center justify-between">
        <span className="font-heading text-base font-bold text-primary">Yuxiang Jiang</span>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-1.5 rounded-md text-muted hover:text-primary hover:bg-tag-bg cursor-pointer"
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
