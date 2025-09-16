import { User, Heart, ThumbsUp, Code, Database, Cloud, Brain } from 'lucide-react';
import { AboutContent } from '../types';

export const aboutData: AboutContent[] = [
  {
    id: 'who-i-am',
    title: 'Who I am',
    icon: <User className="w-5 h-5" />,
    content: (
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="space-y-6 max-w-5xl w-full">
          <p className="text-light-text dark:text-dark-text text-xl leading-relaxed">
            👋 Hi there! I'm Ryan, a graduate student at Cornell University.
          </p>
          <p className="text-light-text dark:text-dark-text text-xl leading-relaxed">
            🎓 Currently pursuing my Master's in Computer and Information Science (Class of 2026).
          </p>
          <p className="text-light-text dark:text-dark-text text-xl leading-relaxed">
            💻 Passionate about software development, especially backend engineering, full-stack systems, and AI-driven applications.
          </p>
          <p className="text-light-text dark:text-dark-text text-xl leading-relaxed">
            🚀 Always exploring new technologies and love building things that make an impact.
          </p>
        </div>
      </div>
    )
  },
  {
    id: 'things-i-like',
    title: 'Things I Like',
    icon: <Heart className="w-5 h-5" />,
    content: (
      <div className="space-y-8 max-w-5xl w-full">
        <p className="text-light-text dark:text-dark-text text-xl leading-relaxed font-medium">
          💭 When I'm not coding…
        </p>

        <div className="flex items-start gap-5">
          <span className="text-3xl">🎮</span>
          <p className="text-light-text dark:text-dark-text text-xl">
            You'll probably find me deep into strategic games or leading an FPS squad with friends.
          </p>
        </div>

        <div className="flex items-start gap-5">
          <span className="text-3xl">📚</span>
          <p className="text-light-text dark:text-dark-text text-xl">
            I'm also a huge fan of sci-fi novels and tech blogs — anything that sparks imagination and curiosity.
          </p>
        </div>

        <div className="flex items-start gap-5">
          <span className="text-3xl">🏀</span>
          <p className="text-light-text dark:text-dark-text text-xl">
            Love staying active with basketball and swimming — helps me recharge and keep a sharp mind.
          </p>
        </div>

        <div className="flex items-start gap-5">
          <span className="text-3xl">🍜</span>
          <p className="text-light-text dark:text-dark-text text-xl">
            Occasionally geeking out over new gadgets, cool dev tools, or a good bowl of ramen.
          </p>
        </div>
      </div>
    )
  },
  {
    id: 'im-good-at',
    title: "I'm Good at",
    icon: <ThumbsUp className="w-5 h-5" />,
    content: (
      <div className="space-y-8 max-w-5xl w-full">
        <div className="flex items-start gap-5">
          <span className="text-3xl"><Code className="w-9 h-9 text-light-primary dark:text-dark-primary" /></span>
          <p className="text-light-text dark:text-dark-text text-xl">
            Skilled in Python, Java, JavaScript, and modern frameworks like Spring Boot, React, and Django.
          </p>
        </div>
        <div className="flex items-start gap-5">
          <span className="text-3xl"><Database className="w-9 h-9 text-green-500 dark:text-green-400" /></span>
          <p className="text-light-text dark:text-dark-text text-xl">
            Experienced in backend development, RESTful APIs, database design, and full-stack systems.
          </p>
        </div>
        <div className="flex items-start gap-5">
          <span className="text-3xl"><Cloud className="w-9 h-9 text-purple-500 dark:text-purple-400" /></span>
          <p className="text-light-text dark:text-dark-text text-xl">
            Familiar with AWS, Docker, Redis, MySQL, and deploying scalable cloud-native applications.
          </p>
        </div>
        <div className="flex items-start gap-5">
          <span className="text-3xl"><Brain className="w-9 h-9 text-yellow-500 dark:text-yellow-400" /></span>
          <p className="text-light-text dark:text-dark-text text-xl">
            Adaptable and a fast learner — I enjoy solving complex problems and collaborating in diverse teams.
          </p>
        </div>
      </div>
    )
  }
];