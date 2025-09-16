import { Trophy } from 'lucide-react';
import { competitionsData } from '../../data/competitions';

function CompetitionsSection() {
  const competition = competitionsData[0]; // Get first competition

  return (
    <section className="py-32 px-6 bg-light-card dark:bg-dark-card transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center gap-4 mb-20">
          <Trophy className="w-10 h-10 text-yellow-500 dark:text-yellow-400" />
          <h2 className="text-4xl font-mono">Competitions</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-20 items-start">
          <div className="flex justify-center md:pl-5 md:ml-5">
            <img
              src={competition.image}
              alt="Competition"
              className="rounded-xl shadow-lg max-w-full h-auto"
              style={{ maxHeight: '400px' }}
            />
          </div>
          <div className="max-w-xl">
            <h3 className="text-3xl font-semibold mb-6 leading-tight">{competition.title}</h3>
            <div className="inline-block bg-yellow-500/20 dark:bg-yellow-400/20 text-yellow-700 dark:text-yellow-300 px-4 py-2 rounded-full text-base mb-8 transition-colors duration-300">
              {competition.award}
            </div>
            <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6 text-lg">{competition.date}</p>
            <p className="text-light-text dark:text-dark-text mb-10 text-xl leading-relaxed">
              {competition.description.split('TransX Knowledge Graph Network')[0]}
              <a
                href={competition.projects[0].link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-light-primary dark:text-dark-primary hover:underline font-medium transition-colors duration-300"
              >
                "TransX Knowledge Graph Network"
              </a>
              {' and '}
              <a
                href={competition.projects[1].link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-light-primary dark:text-dark-primary hover:underline font-medium transition-colors duration-300"
              >
                "CTSDG Image Restoration Network"
              </a>
              {competition.description.split('CTSDG Image Restoration Network')[1]}
            </p>

            <div className="space-y-8">
              {competition.projects.map((project) => (
                <div key={project.id} className="card flex items-start gap-6 p-8">
                  <Trophy className="w-10 h-10 text-yellow-500 dark:text-yellow-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-xl mb-3">{project.name}</h4>
                    <p className="text-light-text dark:text-dark-text text-lg">
                      {project.description}
                    </p>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-4 text-light-primary dark:text-dark-primary hover:underline text-lg transition-colors duration-300"
                    >
                      View Project
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M7 7h10v10" />
                        <path d="M7 17 17 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CompetitionsSection;