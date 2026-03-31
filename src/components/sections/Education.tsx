export default function Education() {
  return (
    <section id="education" className="py-14">
      <h2 className="font-heading text-3xl font-bold text-primary mb-8">
        Education
      </h2>
      <div className="space-y-6">
        {/* Cornell Tech */}
        <div className="bg-white rounded-lg border border-border shadow-sm p-6">
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
            <h3 className="font-heading text-xl font-bold text-primary">Cornell Tech, Cornell University</h3>
            <span className="text-sm text-muted tabular-nums">Aug 2025 – May 2026</span>
          </div>
          <p className="text-base text-muted mb-3">M.S. Computer & Information Sciences · New York, NY</p>
          <ul className="space-y-1.5">
            <li className="text-base text-secondary flex items-start gap-2 leading-relaxed">
              <span className="text-border mt-px shrink-0">–</span>
              <span>Director of Research, Cornell Blockchain Club</span>
            </li>
            <li className="text-base text-secondary flex items-start gap-2 leading-relaxed">
              <span className="text-border mt-px shrink-0">–</span>
              <span>Coursework: Distributed Systems, Machine Learning, Applied Database Systems</span>
            </li>
          </ul>
        </div>

        {/* Jinan University */}
        <div className="bg-white rounded-lg border border-border shadow-sm p-6">
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
            <h3 className="font-heading text-xl font-bold text-primary">Jinan University</h3>
            <span className="text-sm text-muted tabular-nums">Sep 2020 – Jun 2024</span>
          </div>
          <p className="text-base text-muted mb-3">B.Eng. Internet of Things Engineering · Guangzhou, China</p>
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
    </section>
  );
}
