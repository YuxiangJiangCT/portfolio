import { ExternalLink } from 'lucide-react';
import { asset } from '../lib/asset';

const awards = [
  {
    event: 'ETHGlobal Buenos Aires',
    date: 'Nov 2025',
    location: 'Buenos Aires, Argentina',
    prize: 'World Pool Prize Winner',
    project: 'Bounty Hunters',
    logo: '/images/ethglobal-logo.png',
    bullets: [
      'Built a Social-Fi MiniApp on World Chain where verified humans earn WLD/USDC for amplifying brand campaigns',
      'Implemented Permit2 SignatureTransfer for gasless, approval-free token transfers (working around World App platform constraints)',
      'Won the World Pool Prize from sponsor World (formerly Worldcoin)',
    ],
    link: 'https://ethglobal.com/showcase/bounty-hunters-276vw',
  },
  {
    event: 'ETHGlobal NYC 2025',
    date: 'Aug 2025',
    location: 'New York, NY',
    prize: 'Worldcoin Prize Winner',
    project: 'PolyPoll',
    logo: '/images/ethglobal-logo.png',
    bullets: [
      'Built a full-stack prediction market platform with AI-integrated backend',
      'Multi-provider AI routing, Chrome extension, and smart contract integration',
      'Competed against 1,000+ participants',
    ],
    link: 'https://ethglobal.com/showcase/polypoll-cewmr',
  },
  {
    event: 'Huawei Ascend AI National Finals',
    date: '2022 & 2023',
    location: 'China',
    prize: '2x Gold Award',
    project: 'AI Model Optimization',
    bullets: [
      'Top 30 out of 1,500+ competing teams across two consecutive years',
      'Developed and optimized AI models on Huawei Ascend hardware platform',
      'Focus on model performance tuning and edge deployment',
    ],
  },
];

export default function AwardsPage() {
  return (
    <div>
      <h1 className="font-heading text-3xl font-bold text-primary mb-8">
        Awards
      </h1>
      <div className="space-y-6">
        {awards.map((award) => (
          <div key={award.event} className="bg-white rounded-lg border border-border shadow-sm p-6">
            <div className="flex items-start gap-4 mb-4">
              {award.logo && (
                <img src={asset(award.logo)} alt={award.event} className="w-14 h-14 object-contain shrink-0 rounded-lg" />
              )}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
                  <h3 className="font-heading text-xl font-bold text-primary">{award.event}</h3>
                  <span className="text-sm text-muted tabular-nums">{award.date} · {award.location}</span>
                </div>
                <p className="text-lg font-semibold text-accent">{award.prize}</p>
                <p className="text-base text-muted">{award.project}</p>
              </div>
            </div>

            <ul className="space-y-1.5 mb-4">
              {award.bullets.map((b, i) => (
                <li key={i} className="text-base text-secondary flex items-start gap-2 leading-relaxed">
                  <span className="text-border mt-px shrink-0">–</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            {award.link && (
              <a
                href={award.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
              >
                View Showcase
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
