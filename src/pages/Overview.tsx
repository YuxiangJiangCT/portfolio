import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { profile } from '../data/profile';
import { skillGroups } from '../data/skills';
import TechTag from '../components/ui/TechTag';

const metricColors: Record<string, string> = {
  green: 'text-emerald-600',
  blue: 'text-accent',
  amber: 'text-amber-600',
  rose: 'text-rose-600',
};

export default function Overview() {
  return (
    <div>
      {/* Availability tag */}
      <div className="mb-6">
        <span className="inline-flex items-center gap-2 text-sm font-medium text-emerald-700 bg-emerald-50 border border-emerald-200/60 rounded-full px-3 py-1.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
          </span>
          Available for 2026 New Grad roles
        </span>
      </div>

      {/* Title */}
      <h1 className="font-heading text-4xl sm:text-5xl font-bold text-primary leading-tight tracking-tight mb-5">
        I build backend systems, APIs, and scalable infrastructure.
      </h1>

      {/* Bio */}
      <p className="text-lg text-muted leading-relaxed mb-8">
        {profile.bio}
      </p>

      {/* Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8 pb-8 border-b border-border">
        {profile.metrics.map((m) => (
          <div key={m.label}>
            <div className={`text-3xl font-heading font-bold tracking-tight ${metricColors[m.color] ?? 'text-primary'}`}>
              {m.value}
            </div>
            <div className="text-sm text-muted mt-0.5">{m.label}</div>
          </div>
        ))}
      </div>

      {/* About */}
      <div className="space-y-4 text-base text-secondary leading-relaxed mb-10">
        <p>
          I'm a Software Engineer and Cornell Tech CS graduate (May 2026) who cares about building
          systems that are reliable, fast, and production-ready. Most of my work has been in backend
          architecture, API design, performance optimization, and integrating AI services into real
          products.
        </p>
        <p>
          Before Cornell, I studied Internet of Things Engineering at Jinan University in China,
          where I developed a strong foundation in embedded systems, sensor networks, and low-level
          optimization. Winning two Gold Awards at the Huawei Ascend AI National Finals taught me how
          to deliver under pressure and optimize for real hardware constraints.
        </p>
        <p>
          At Cornell Tech, I serve as Director of Research for the Blockchain Club, where I lead
          technical research initiatives and mentor members on smart contract development. I won the
          Worldcoin Prize at ETHGlobal NYC 2025, building a full-stack prediction market with AI
          routing and on-chain settlement in under 36 hours.
        </p>
        <p>
          I gravitate toward problems where system design choices directly impact user experience —
          reducing latency, scaling throughput, designing clean APIs. I'm looking for backend or
          full-stack roles where I can build infrastructure that real users depend on.
        </p>
      </div>

      {/* Key skills */}
      <div className="mb-10">
        <h2 className="font-heading text-xl font-bold text-primary mb-4">Key Skills</h2>
        <div className="flex flex-wrap gap-2">
          {skillGroups.flatMap((g) => g.items).map((skill) => (
            <TechTag key={skill} name={skill} />
          ))}
        </div>
      </div>

      {/* CTAs */}
      <div className="flex items-center gap-5">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-base font-medium text-white bg-primary rounded-md hover:bg-secondary transition-colors"
        >
          View Projects
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          to="/resume"
          className="text-base font-medium text-muted hover:text-primary transition-colors underline underline-offset-4 decoration-border hover:decoration-primary"
        >
          Resume
        </Link>
      </div>
    </div>
  );
}
