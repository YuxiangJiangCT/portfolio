export default function About() {
  return (
    <section id="about" className="py-16">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-xl font-bold text-gray-900">About</h2>
        <div className="flex-1 h-px bg-gray-200" />
      </div>
      <div className="space-y-4 text-[14px] text-gray-600 leading-[1.7] max-w-2xl">
        <p>
          I'm a Software Engineer and Cornell Tech CS graduate (May 2026) who cares about building
          systems that are reliable, fast, and production-ready. Most of my work has been in backend
          architecture, API design, performance optimization, and integrating AI services into real
          products.
        </p>
        <p>
          Before Cornell, I studied Internet of Things Engineering at Jinan University in China,
          where I won two Gold Awards at the Huawei Ascend AI National Finals (Top 30, 1,500+
          teams). At Cornell Tech, I serve as Director of Research for the Blockchain Club and won
          the Worldcoin Prize at ETHGlobal NYC 2025.
        </p>
      </div>
    </section>
  );
}
