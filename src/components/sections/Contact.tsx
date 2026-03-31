import { Mail, Linkedin, Github, MapPin, FileText } from 'lucide-react';
import { profile } from '../../data/profile';

export default function Contact() {
  return (
    <section id="contact" className="py-16">
      <h2 className="text-2xl font-bold text-text-primary mb-4">Contact</h2>
      <p className="text-sm text-text-secondary mb-6">
        Available for software engineer roles starting May 2026.
      </p>

      <div className="space-y-3 mb-8">
        <a
          href={`mailto:${profile.links.email}`}
          className="flex items-center gap-2.5 text-sm text-text-secondary hover:text-accent transition-colors"
        >
          <Mail className="w-4 h-4" />
          {profile.links.email}
        </a>
        <a
          href={profile.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 text-sm text-text-secondary hover:text-accent transition-colors"
        >
          <Linkedin className="w-4 h-4" />
          LinkedIn
        </a>
        <a
          href={profile.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 text-sm text-text-secondary hover:text-accent transition-colors"
        >
          <Github className="w-4 h-4" />
          GitHub
        </a>
        <div className="flex items-center gap-2.5 text-sm text-text-secondary">
          <MapPin className="w-4 h-4" />
          {profile.location}
        </div>
      </div>

      <a
        href="/Ryan_Resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-accent border border-accent rounded-lg hover:bg-blue-50 transition-colors"
      >
        <FileText className="w-4 h-4" />
        Download Resume
      </a>
    </section>
  );
}
