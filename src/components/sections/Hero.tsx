import MetricCard from '../ui/MetricCard';
import { profile } from '../../data/profile';

export default function Hero() {
  return (
    <section className="pb-16 border-b border-border">
      {/* Title */}
      <h2 className="text-3xl sm:text-4xl font-bold text-text-primary leading-tight mb-4">
        Software Engineer focused on backend systems, APIs, and scalable infrastructure.
      </h2>

      {/* Bio */}
      <p className="text-base text-text-secondary leading-relaxed mb-8 max-w-2xl">
        {profile.bio}
      </p>

      {/* Metric cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {profile.metrics.map((m) => (
          <MetricCard key={m.label} label={m.label} value={m.value} color={m.color} />
        ))}
      </div>

      {/* CTA buttons */}
      <div className="flex flex-wrap gap-3">
        <a
          href="#work"
          className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-white bg-accent rounded-lg hover:bg-blue-700 transition-colors"
        >
          View Work
        </a>
        <a
          href="/Ryan_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-accent border border-accent rounded-lg hover:bg-blue-50 transition-colors"
        >
          Resume
        </a>
      </div>
    </section>
  );
}
