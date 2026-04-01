import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Github, Linkedin, Mail, Menu, X, Download, MapPin } from 'lucide-react';
import { profile } from '../../data/profile';

const navItems = [
  { label: 'Overview', path: '/' },
  { label: 'Projects', path: '/projects' },
  { label: 'Experience', path: '/experience' },
  { label: 'Education', path: '/education' },
  { label: 'Awards', path: '/awards' },
  { label: 'Skills', path: '/skills' },
  { label: 'Resume', path: '/resume' },
];

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Avatar + Identity */}
      <div className="text-center mb-8">
        <img
          src="/images/avatar.jpg"
          alt={profile.name}
          className="w-28 h-28 rounded-full mx-auto mb-4 border-2 border-gray-200 shadow-lg object-cover"
        />
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

      {/* Social icons */}
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
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.path === '/'}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-accent text-white shadow-sm'
                      : 'text-muted hover:bg-gray-50 hover:text-primary'
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Resume download */}
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
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col fixed top-0 left-0 w-64 h-screen bg-white shadow-lg px-6 py-10 overflow-y-auto">
        {sidebarContent}
      </aside>

      {/* Mobile header */}
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

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-white pt-16 px-6 py-8 overflow-y-auto">
          {sidebarContent}
        </div>
      )}
    </>
  );
}
