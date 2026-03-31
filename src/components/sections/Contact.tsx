import { Mail, Linkedin, Github, MapPin, Download } from 'lucide-react';
import { profile } from '../../data/profile';

export default function Contact() {
  return (
    <section id="contact" className="py-16">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-xl font-bold text-gray-900">Contact</h2>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      <div className="bg-white border border-gray-200/80 rounded-xl p-6 shadow-sm">
        <p className="text-[14px] text-gray-600 mb-6">
          Available for software engineer roles starting May 2026.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <a
            href={`mailto:${profile.links.email}`}
            className="flex items-center gap-3 p-3 rounded-lg text-[13px] text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors"
          >
            <Mail className="w-4 h-4 text-gray-400" />
            {profile.links.email}
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-lg text-[13px] text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors"
          >
            <Linkedin className="w-4 h-4 text-gray-400" />
            LinkedIn
          </a>
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-lg text-[13px] text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors"
          >
            <Github className="w-4 h-4 text-gray-400" />
            GitHub
          </a>
          <div className="flex items-center gap-3 p-3 text-[13px] text-gray-600">
            <MapPin className="w-4 h-4 text-gray-400" />
            {profile.location}
          </div>
        </div>

        <a
          href="/Ryan_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-[13px] font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors shadow-sm"
        >
          <Download className="w-3.5 h-3.5" />
          Download Resume
        </a>
      </div>
    </section>
  );
}
