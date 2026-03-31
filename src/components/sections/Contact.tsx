import { profile } from '../../data/profile';

export default function Contact() {
  return (
    <section id="contact" className="py-14">
      <h2 className="text-[13px] font-semibold text-gray-400 uppercase tracking-widest mb-6">
        Contact
      </h2>
      <p className="text-[14px] text-gray-600 mb-6 max-w-[480px] leading-[1.7]">
        Available for software engineer roles starting May 2026.
        Feel free to reach out for opportunities or collaboration.
      </p>

      <div className="flex flex-wrap gap-x-6 gap-y-2 text-[13px]">
        <a
          href={`mailto:${profile.links.email}`}
          className="text-gray-500 hover:text-gray-900 underline underline-offset-4 decoration-gray-300 hover:decoration-gray-500 transition-colors"
        >
          {profile.links.email}
        </a>
        <a
          href={profile.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-gray-900 underline underline-offset-4 decoration-gray-300 hover:decoration-gray-500 transition-colors"
        >
          LinkedIn
        </a>
        <a
          href={profile.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-gray-900 underline underline-offset-4 decoration-gray-300 hover:decoration-gray-500 transition-colors"
        >
          GitHub
        </a>
        <span className="text-gray-400">{profile.location}</span>
      </div>
    </section>
  );
}
