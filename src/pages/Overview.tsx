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
    <div className="bg-white rounded-lg shadow-sm p-6">
      {/* Availability tag */}
      <div className="mb-6">
        <span className="inline-flex items-center gap-2 text-sm font-medium text-emerald-700 bg-emerald-50 border border-emerald-200/60 rounded-full px-3 py-1.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
          </span>
          Available for 2026 New Grad roles · Open to relocation
        </span>
      </div>

      {/* Title */}
      <h1 className="font-heading text-4xl sm:text-5xl font-bold text-primary leading-tight tracking-tight mb-5">
        I build backend systems that hold up under load.
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
          I'm a backend engineer and Cornell Tech CS graduate (May 2026) who cares about building
          systems that are fast, reliable, and ready for production. Most of my work has been in
          backend architecture, API performance, and integrating AI services into real products that
          ship — not demos.
        </p>
        <p>
          Before Cornell, I studied Internet of Things Engineering at Jinan University in China,
          where I built a foundation in embedded systems, sensor networks, and low-level
          optimization. Two consecutive Gold Awards at the Huawei Ascend AI National Finals (top 30
          of 1,500+ teams) taught me how to deliver under pressure and squeeze performance out of
          constrained hardware.
        </p>
        <p>
          At Cornell Tech, I serve as Director of Research for the Blockchain Club, leading technical
          research and mentoring members on smart contract development. At ETHGlobal Buenos Aires
          2025, I won the World Pool Prize from World (formerly Worldcoin) for Bounty Hunters — a
          Social-Fi MiniApp on World Chain shipped end-to-end in under 36 hours, with a Solidity
          contract using Permit2 SignatureTransfer for gasless token flows.
        </p>
        <p>
          I gravitate toward problems where system design choices directly shape user experience:
          cutting p99 latency, scaling throughput, designing APIs that don't surprise the people who
          consume them. I'm looking for backend or infrastructure roles where the work compounds —
          where what I build today actually runs in production tomorrow.
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

