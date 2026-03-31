import { ArrowDown, FileText } from 'lucide-react';
import MetricCard from '../ui/MetricCard';
import { profile } from '../../data/profile';

export default function Hero() {
  return (
    <section className="pb-20">
      {/* Title */}
      <h2 className="text-[28px] sm:text-[36px] font-bold text-gray-900 leading-[1.2] tracking-tight mb-5">
        Software Engineer focused on
        <span className="text-blue-600"> backend systems</span>,
        <span className="text-blue-600"> APIs</span>, and
        <span className="text-blue-600"> scalable infrastructure</span>.
      </h2>

      {/* Bio */}
      <p className="text-[15px] text-gray-500 leading-relaxed mb-10 max-w-2xl">
        {profile.bio}
      </p>

      {/* Metric cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
        {profile.metrics.map((m) => (
          <MetricCard key={m.label} label={m.label} value={m.value} color={m.color} />
        ))}
      </div>

      {/* CTA buttons */}
      <div className="flex flex-wrap gap-3">
        <a
          href="#work"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-[13px] font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors shadow-sm"
        >
          View Work
          <ArrowDown className="w-3.5 h-3.5" />
        </a>
        <a
          href="/Ryan_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-[13px] font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors shadow-sm"
        >
          <FileText className="w-3.5 h-3.5" />
          Resume
        </a>
      </div>
    </section>
  );
}
