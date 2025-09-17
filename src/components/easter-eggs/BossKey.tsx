import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, X } from 'lucide-react';

function BossKey() {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+B or Cmd+B to toggle
      if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        setIsActive(prev => !prev);
      }

      // ESC to close
      if (e.key === 'Escape' && isActive) {
        setIsActive(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isActive]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed inset-0 z-[10000] bg-white overflow-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="max-w-4xl mx-auto p-8 font-serif text-black">
            {/* Close button */}
            <button
              onClick={() => setIsActive(false)}
              className="fixed top-4 right-4 p-2 bg-gray-200 hover:bg-gray-300 rounded-full transition-colors"
              aria-label="Close resume view"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Resume Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Ryan Jiang</h1>
              <p className="text-gray-600">Software Engineer</p>
              <p className="text-sm text-gray-500 mt-1">
                New York, NY | ryan.jiang@example.com | (555) 123-4567
              </p>
            </div>

            {/* Professional Summary */}
            <section className="mb-6">
              <h2 className="text-xl font-bold mb-2 border-b border-gray-300 pb-1">
                Professional Summary
              </h2>
              <p className="text-sm leading-relaxed">
                Results-driven Full Stack Software Engineer with expertise in modern web technologies.
                Proven track record of delivering scalable applications and improving system performance.
                Strong problem-solving skills with experience in agile development methodologies.
              </p>
            </section>

            {/* Experience */}
            <section className="mb-6">
              <h2 className="text-xl font-bold mb-2 border-b border-gray-300 pb-1">
                Professional Experience
              </h2>

              <div className="mb-4">
                <div className="flex justify-between">
                  <h3 className="font-semibold">Software Engineer - Tech Company</h3>
                  <span className="text-sm text-gray-600">2022 - Present</span>
                </div>
                <ul className="list-disc list-inside text-sm mt-1 ml-4">
                  <li>Developed and maintained full-stack applications using React and Node.js</li>
                  <li>Implemented RESTful APIs serving 10,000+ daily active users</li>
                  <li>Collaborated with cross-functional teams to deliver features on schedule</li>
                  <li>Optimized application performance resulting in 40% faster load times</li>
                </ul>
              </div>

              <div className="mb-4">
                <div className="flex justify-between">
                  <h3 className="font-semibold">Junior Developer - Startup Inc.</h3>
                  <span className="text-sm text-gray-600">2021 - 2022</span>
                </div>
                <ul className="list-disc list-inside text-sm mt-1 ml-4">
                  <li>Built responsive web applications using modern JavaScript frameworks</li>
                  <li>Participated in code reviews and maintained code quality standards</li>
                  <li>Assisted in database design and optimization</li>
                  <li>Contributed to open-source projects and internal tools</li>
                </ul>
              </div>
            </section>

            {/* Education */}
            <section className="mb-6">
              <h2 className="text-xl font-bold mb-2 border-b border-gray-300 pb-1">
                Education
              </h2>
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold">Bachelor of Science in Computer Science</h3>
                  <p className="text-sm text-gray-600">University of Technology</p>
                </div>
                <span className="text-sm text-gray-600">2017 - 2021</span>
              </div>
            </section>

            {/* Skills */}
            <section className="mb-6">
              <h2 className="text-xl font-bold mb-2 border-b border-gray-300 pb-1">
                Technical Skills
              </h2>
              <div className="text-sm">
                <p><strong>Languages:</strong> JavaScript, TypeScript, Python, Java, SQL</p>
                <p><strong>Frameworks:</strong> React, Node.js, Express, Django, Spring Boot</p>
                <p><strong>Tools:</strong> Git, Docker, Kubernetes, AWS, Jenkins, MongoDB</p>
                <p><strong>Methodologies:</strong> Agile, Scrum, Test-Driven Development, CI/CD</p>
              </div>
            </section>

            {/* Certifications */}
            <section className="mb-6">
              <h2 className="text-xl font-bold mb-2 border-b border-gray-300 pb-1">
                Certifications
              </h2>
              <ul className="list-disc list-inside text-sm">
                <li>AWS Certified Developer - Associate (2023)</li>
                <li>Google Cloud Professional Developer (2022)</li>
                <li>Certified Scrum Master (2021)</li>
              </ul>
            </section>

            {/* References */}
            <section className="mb-6">
              <h2 className="text-xl font-bold mb-2 border-b border-gray-300 pb-1">
                References
              </h2>
              <p className="text-sm text-gray-600">Available upon request</p>
            </section>

            {/* Print hint */}
            <div className="text-center mt-8 text-xs text-gray-400 print:hidden">
              Press Ctrl+B again to return to portfolio | Press Ctrl+P to print
            </div>
          </div>

          {/* Print styles */}
          <style jsx>{`
            @media print {
              button {
                display: none !important;
              }
              .print\\:hidden {
                display: none !important;
              }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default BossKey;