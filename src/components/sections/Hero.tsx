import { ArrowDown } from 'lucide-react';
import { profile } from '../../data/profile';

const metricColors: Record<string, string> = {
  green: 'text-emerald-600',
  blue: 'text-accent',
  amber: 'text-amber-600',
  rose: 'text-rose-600',
};

export default function Hero() {
  return (
    <section className="pb-24">
      {/* Availability tag */}
      <div className="mb-10">
        <span className="inline-flex items-center gap-2 text-[12px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200/60 rounded-full px-3 py-1">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
          </span>
          Available for 2026 New Grad roles
        </span>
      </div>

      {/* Title — Archivo, bold, 36px */}
      <h1 className="font-heading text-[32px] sm:text-[36px] font-bold text-primary leading-[1.2] tracking-tight mb-5 max-w-[640px]">
        I build backend systems, APIs, and scalable infrastructure.
      </h1>

      {/* Bio — Space Grotesk */}
      <p className="text-[16px] text-muted leading-[1.7] mb-12 max-w-[520px]">
        {profile.bio}
      </p>

      {/* Metrics — block strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12 pb-12 border-b border-border">
        {profile.metrics.map((m) => (
          <div key={m.label}>
            <div className={`text-[28px] font-heading font-bold tracking-tight ${metricColors[m.color] ?? 'text-primary'}`}>
              {m.value}
            </div>
            <div className="text-[13px] text-muted mt-0.5">{m.label}</div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="flex items-center gap-5">
        <a
          href="#work"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-[14px] font-medium text-white bg-primary rounded-md hover:bg-secondary transition-colors cursor-pointer"
        >
          View Work
          <ArrowDown className="w-4 h-4" />
        </a>
        <a
          href="/Ryan_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[14px] font-medium text-muted hover:text-primary transition-colors underline underline-offset-4 decoration-border hover:decoration-primary cursor-pointer"
        >
          Resume
        </a>
      </div>
    </section>
  );
}
