import { ArrowDown } from 'lucide-react';
import { profile } from '../../data/profile';

export default function Hero() {
  return (
    <section className="pb-20">
      {/* Availability tag */}
      <div className="mb-8">
        <span className="inline-flex items-center gap-2 text-[12px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200/60 rounded-full px-3 py-1">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
          </span>
          Available for 2026 New Grad roles
        </span>
      </div>

      {/* Title — restrained, not screaming */}
      <h1 className="text-[24px] sm:text-[28px] font-semibold text-gray-900 leading-[1.35] tracking-tight mb-4">
        I build backend systems, APIs, and scalable infrastructure.
      </h1>

      {/* Bio */}
      <p className="text-[15px] text-gray-500 leading-[1.7] mb-10 max-w-[540px]">
        {profile.bio}
      </p>

      {/* Metrics — compact inline strip */}
      <div className="flex flex-wrap gap-x-8 gap-y-3 mb-10 text-[13px]">
        {profile.metrics.map((m) => (
          <div key={m.label} className="flex items-baseline gap-1.5">
            <span className={`text-[18px] font-bold tabular-nums ${metricColor(m.color)}`}>
              {m.value}
            </span>
            <span className="text-gray-400">{m.label}</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="flex items-center gap-4">
        <a
          href="#work"
          className="inline-flex items-center gap-2 px-4 py-2 text-[13px] font-medium text-white bg-gray-900 rounded-md hover:bg-gray-800 transition-colors"
        >
          View Work
          <ArrowDown className="w-3.5 h-3.5" />
        </a>
        <a
          href="/Ryan_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[13px] font-medium text-gray-500 hover:text-gray-900 transition-colors underline underline-offset-4 decoration-gray-300 hover:decoration-gray-500"
        >
          Resume
        </a>
      </div>
    </section>
  );
}

function metricColor(color: string) {
  switch (color) {
    case 'green': return 'text-emerald-600';
    case 'blue': return 'text-blue-600';
    case 'amber': return 'text-amber-600';
    case 'rose': return 'text-rose-600';
    default: return 'text-gray-900';
  }
}
