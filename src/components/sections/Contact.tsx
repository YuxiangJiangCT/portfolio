import { profile } from '../../data/profile';

export default function Contact() {
  return (
    <section id="contact" className="py-14">
      <h2 className="font-heading text-3xl font-bold text-primary mb-4">
        Contact
      </h2>
      <p className="text-base text-secondary mb-8 leading-relaxed">
        Available for software engineer roles starting May 2026.
        Feel free to reach out.
      </p>

      <div className="flex flex-wrap gap-x-8 gap-y-3 text-base">
        <a
          href={`mailto:${profile.links.email}`}
          className="text-muted hover:text-primary underline underline-offset-4 decoration-border hover:decoration-primary transition-colors cursor-pointer"
        >
          {profile.links.email}
        </a>
        <a
          href={profile.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted hover:text-primary underline underline-offset-4 decoration-border hover:decoration-primary transition-colors cursor-pointer"
        >
          LinkedIn
        </a>
        <a
          href={profile.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted hover:text-primary underline underline-offset-4 decoration-border hover:decoration-primary transition-colors cursor-pointer"
        >
          GitHub
        </a>
        <span className="text-muted">{profile.location}</span>
      </div>
    </section>
  );
}
