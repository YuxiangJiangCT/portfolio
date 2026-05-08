import { asset } from '../lib/asset';

export default function EducationPage() {
  return (
    <div>
      <h1 className="font-heading text-3xl font-bold text-primary mb-8">
        Education
      </h1>
      <div className="space-y-6">
        {/* Cornell Tech */}
        <div className="bg-white rounded-lg border border-border shadow-sm p-6">
          <div className="flex items-start gap-4 mb-4">
            <img src={asset('/images/cornell-logo.png')} alt="Cornell University" className="w-14 h-14 object-contain shrink-0 rounded-lg" />
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
                <h3 className="font-heading text-xl font-bold text-primary">Cornell Tech, Cornell University</h3>
                <span className="text-sm text-muted tabular-nums">Aug 2024 – May 2026</span>
              </div>
              <p className="text-base text-muted">M.S. Computer & Information Sciences · New York, NY</p>
            </div>
          </div>
          <ul className="space-y-1.5">
            <li className="text-base text-secondary flex items-start gap-2 leading-relaxed">
              <span className="text-border mt-px shrink-0">–</span>
              <span>Director of Research, Cornell Blockchain Club</span>
            </li>
            <li className="text-base text-secondary flex items-start gap-2 leading-relaxed">
              <span className="text-border mt-px shrink-0">–</span>
              <span>Coursework: Distributed Systems · Machine Learning · Applied Database Systems · Cybersecurity (taught by Ari Juels, Chainlink Chief Scientist) · ML Applications in Business</span>
            </li>
          </ul>
        </div>

        {/* Jinan University */}
        <div className="bg-white rounded-lg border border-border shadow-sm p-6">
          <div className="flex items-start gap-4 mb-4">
            <img src={asset('/images/Jinan_University_Emblem.svg.png')} alt="Jinan University" className="w-14 h-14 object-contain shrink-0 rounded-lg" />
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
                <h3 className="font-heading text-xl font-bold text-primary">Jinan University</h3>
                <span className="text-sm text-muted tabular-nums">Sep 2020 – Jun 2024</span>
              </div>
              <p className="text-base text-muted">B.Eng. Internet of Things Engineering · Guangzhou, China</p>
            </div>
          </div>
          <ul className="space-y-1.5">
            <li className="text-base text-secondary flex items-start gap-2 leading-relaxed">
              <span className="text-border mt-px shrink-0">–</span>
              <span>2x Gold Award, Huawei Ascend AI National Finals (Top 30 out of 1,500+ teams)</span>
            </li>
            <li className="text-base text-secondary flex items-start gap-2 leading-relaxed">
              <span className="text-border mt-px shrink-0">–</span>
              <span>Focus areas: Embedded systems, sensor networks, AI at the edge</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
