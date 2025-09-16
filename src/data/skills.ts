export interface Skill {
  name: string;
  level: number; // 0-100
  yearsOfExperience?: number;
  category: string;
  relatedProjects?: string[];
  icon?: string;
}

export interface SkillCategory {
  name: string;
  description: string;
  skills: Skill[];
  color: string; // for visualization
}

export const skillCategories: SkillCategory[] = [
  {
    name: "System Design & Architecture",
    description: "Building scalable and maintainable systems",
    color: "#4F46E5",
    skills: [
      {
        name: "Microservices",
        level: 90,
        yearsOfExperience: 2,
        relatedProjects: ["URL Shortener", "DeFi Scanner"],
        category: "architecture"
      },
      {
        name: "Caching Strategies",
        level: 95,
        yearsOfExperience: 2,
        relatedProjects: ["URL Shortener", "Recommendation System"],
        category: "architecture"
      },
      {
        name: "API Design",
        level: 90,
        yearsOfExperience: 3,
        relatedProjects: ["PolyPoll", "DeFi Scanner"],
        category: "architecture"
      },
      {
        name: "Load Balancing",
        level: 80,
        yearsOfExperience: 1,
        relatedProjects: ["URL Shortener"],
        category: "architecture"
      },
      {
        name: "Message Queues",
        level: 85,
        yearsOfExperience: 2,
        relatedProjects: ["URL Shortener", "Data Pipeline"],
        category: "architecture"
      },
      {
        name: "Event-Driven Design",
        level: 85,
        yearsOfExperience: 2,
        relatedProjects: ["PolyPoll", "Data Pipeline"],
        category: "architecture"
      }
    ]
  },
  {
    name: "Performance Optimization",
    description: "Maximizing system efficiency and speed",
    color: "#10B981",
    skills: [
      {
        name: "Latency Reduction",
        level: 95,
        relatedProjects: ["70% reduction at Dataman"],
        category: "performance"
      },
      {
        name: "Throughput Optimization",
        level: 90,
        relatedProjects: ["500+ RPS URL Shortener"],
        category: "performance"
      },
      {
        name: "Database Optimization",
        level: 85,
        relatedProjects: ["90% I/O reduction"],
        category: "performance"
      },
      {
        name: "Profiling & Monitoring",
        level: 90,
        relatedProjects: ["Observability Platform"],
        category: "performance"
      },
      {
        name: "Load Testing",
        level: 85,
        relatedProjects: ["k6 testing for PolyPoll"],
        category: "performance"
      },
      {
        name: "Memory Management",
        level: 80,
        relatedProjects: ["Task Scheduler optimization"],
        category: "performance"
      }
    ]
  },
  {
    name: "Languages & Frameworks",
    description: "Core programming languages and frameworks",
    color: "#F59E0B",
    skills: [
      {
        name: "Python",
        level: 95,
        yearsOfExperience: 4,
        category: "language"
      },
      {
        name: "TypeScript",
        level: 90,
        yearsOfExperience: 3,
        category: "language"
      },
      {
        name: "Java",
        level: 85,
        yearsOfExperience: 3,
        category: "language"
      },
      {
        name: "Go",
        level: 75,
        yearsOfExperience: 1,
        category: "language"
      },
      {
        name: "FastAPI",
        level: 95,
        yearsOfExperience: 2,
        category: "framework"
      },
      {
        name: "React",
        level: 90,
        yearsOfExperience: 3,
        category: "framework"
      },
      {
        name: "Node.js",
        level: 90,
        yearsOfExperience: 3,
        category: "framework"
      },
      {
        name: "Spring Boot",
        level: 85,
        yearsOfExperience: 2,
        category: "framework"
      },
      {
        name: "Express.js",
        level: 85,
        yearsOfExperience: 2,
        category: "framework"
      }
    ]
  },
  {
    name: "Data & Infrastructure",
    description: "Databases, caching, and cloud technologies",
    color: "#8B5CF6",
    skills: [
      {
        name: "Redis",
        level: 95,
        yearsOfExperience: 2,
        category: "database"
      },
      {
        name: "PostgreSQL",
        level: 85,
        yearsOfExperience: 3,
        category: "database"
      },
      {
        name: "MySQL",
        level: 85,
        yearsOfExperience: 3,
        category: "database"
      },
      {
        name: "MongoDB",
        level: 75,
        yearsOfExperience: 1,
        category: "database"
      },
      {
        name: "Elasticsearch",
        level: 70,
        yearsOfExperience: 1,
        category: "database"
      },
      {
        name: "Docker",
        level: 85,
        yearsOfExperience: 2,
        category: "infrastructure"
      },
      {
        name: "Kubernetes",
        level: 70,
        yearsOfExperience: 1,
        category: "infrastructure"
      },
      {
        name: "AWS",
        level: 75,
        yearsOfExperience: 1,
        category: "infrastructure"
      },
      {
        name: "CI/CD",
        level: 80,
        yearsOfExperience: 2,
        category: "infrastructure"
      }
    ]
  },
  {
    name: "Machine Learning & Data",
    description: "AI/ML and data processing technologies",
    color: "#EC4899",
    skills: [
      {
        name: "Time Series Analysis",
        level: 85,
        yearsOfExperience: 2,
        relatedProjects: ["ARIMA APY Forecasting"],
        category: "ml"
      },
      {
        name: "NumPy/Pandas",
        level: 90,
        yearsOfExperience: 3,
        category: "ml"
      },
      {
        name: "TensorFlow",
        level: 70,
        yearsOfExperience: 1,
        category: "ml"
      },
      {
        name: "PyTorch",
        level: 65,
        yearsOfExperience: 1,
        category: "ml"
      },
      {
        name: "Apache Spark",
        level: 70,
        yearsOfExperience: 1,
        relatedProjects: ["Data Pipeline"],
        category: "data"
      },
      {
        name: "Apache Kafka",
        level: 75,
        yearsOfExperience: 1,
        relatedProjects: ["Real-time Pipeline"],
        category: "data"
      }
    ]
  }
];

// Utility functions
export const getTopSkills = (limit: number = 5) => {
  const allSkills = skillCategories.flatMap(cat => cat.skills);
  return allSkills.sort((a, b) => b.level - a.level).slice(0, limit);
};

export const getSkillsByCategory = (category: string) => {
  return skillCategories.find(cat => cat.name === category)?.skills || [];
};

export const getAverageSkillLevel = (category?: string) => {
  const skills = category
    ? getSkillsByCategory(category)
    : skillCategories.flatMap(cat => cat.skills);

  if (skills.length === 0) return 0;
  return Math.round(skills.reduce((sum, skill) => sum + skill.level, 0) / skills.length);
};

// For backward compatibility with existing HeroSection
export const skillsData = getTopSkills(5).map((skill, index) => ({
  id: skill.name.toLowerCase().replace(/\s+/g, '-'),
  name: skill.name,
  category: skill.category as any,
  color: index === 0 ? 'bg-purple-500' :
         index === 1 ? 'bg-blue-500' :
         index === 2 ? 'bg-green-500' :
         index === 3 ? 'bg-orange-500' : 'bg-pink-500',
  animationDelay: `${index * 0.6}s`
}));