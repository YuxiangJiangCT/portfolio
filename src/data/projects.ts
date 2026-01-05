export interface ProjectMetrics {
  [key: string]: string | number;
}

export interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  highlights: string[];
  metrics: ProjectMetrics;
  techStack: string[];
  architecture?: {
    pattern: string;
    components: string[];
    keyFeatures: string[];
  };
  category: 'backend' | 'fullstack' | 'system-design' | 'data';
  featured: boolean;
  githubUrl?: string;
  liveUrl?: string;
  demoUrl?: string;
  images: string[];
  startDate: string;
  endDate: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Scalable URL Shortener",
    subtitle: "High-Performance Link Management System",
    description: "Built a production-ready URL shortener handling 500+ RPS (wrk tested) with sub-50ms p95 latency on AWS EC2 t3.medium",
    longDescription: "Designed and implemented a scalable URL shortening service with real-time analytics. The system leverages Redis for caching and queue management with nanoid identifiers, achieving 90% reduction in PostgreSQL write I/O (from 5000/s to 500/s) through intelligent batching and caching strategies.",
    highlights: [
      "Handles 500+ RPS (10-min wrk soak test)",
      "P95 latency under 50ms on AWS EC2 t3.medium",
      "PostgreSQL write I/O: 5000/s → 500/s (90% reduction)",
      "Real-time analytics dashboard",
      "Containerized with Docker Compose"
    ],
    metrics: {
      "Throughput": "500+ RPS",
      "P95 Latency": "< 50ms",
      "I/O Reduction": "90%",
      "Uptime": "99.9%",
      "Cache Hit Rate": "85%"
    },
    techStack: ["Node.js", "Express", "React", "TypeScript", "Redis", "PostgreSQL", "Docker", "Nginx"],
    architecture: {
      pattern: "Microservices with Cache-aside",
      components: ["API Gateway", "Cache Layer", "Queue System", "Analytics Engine"],
      keyFeatures: ["Horizontal Scaling", "Rate Limiting", "Batch Processing", "Real-time Updates"]
    },
    category: "system-design",
    featured: true,
    githubUrl: "https://github.com/YuxiangJiangCT/url-shortener",
    images: ["/images/url-shortener-arch.png", "/images/url-shortener-dashboard.png"],
    startDate: "2024-09",
    endDate: "2024-11"
  },
  {
    id: 2,
    title: "bounties.fun",
    subtitle: "ETHGlobal – Worldcoin Prize Winner",
    description: "Full-stack bounty platform with World ID zero-knowledge proof verification for Sybil-resistant bounty claims",
    longDescription: "Built a full-stack bounty platform that leverages World ID's zero-knowledge proof verification to prevent Sybil attacks. Implemented hybrid verification combining World ID and Twitter authentication with optimistic locking for concurrent claim handling.",
    highlights: [
      "World ID zero-knowledge proof verification",
      "Hybrid Twitter verification system",
      "99.9% submission success rate",
      "Optimistic locking for concurrent claims",
      "ECDSA wallet authentication",
      "Telegram bot integration"
    ],
    metrics: {
      "Success Rate": "99.9%",
      "Verification": "World ID + Twitter",
      "Security": "ZK Proof",
      "Authentication": "ECDSA",
      "Integration": "Telegram Bot"
    },
    techStack: ["FastAPI", "PostgreSQL", "Supabase", "Web3.py", "World ID MiniKit", "ECDSA", "Telegram API"],
    architecture: {
      pattern: "Hybrid Verification with Optimistic Locking",
      components: ["FastAPI Backend", "World ID Verifier", "Twitter OAuth", "Wallet Auth", "Telegram Bot"],
      keyFeatures: ["Zero-Knowledge Proofs", "Sybil Resistance", "Concurrent Claims", "Multi-factor Verification"]
    },
    category: "fullstack",
    featured: true,
    githubUrl: "https://github.com/YuxiangJiangCT/bounties.fun",
    images: ["/images/bounties-fun-demo.png", "/images/bounties-fun-architecture.png"],
    startDate: "2024-12",
    endDate: "2025-01"
  },
  {
    id: 3,
    title: "Postgraduate Recommendation System",
    subtitle: "Automated Academic Workflow Platform",
    description: "Streamlined recommendation process for 500+ faculty and students",
    longDescription: "Built an end-to-end system automating the postgraduate recommendation workflow, eliminating 90% of manual processes and achieving significant performance improvements.",
    highlights: [
      "Page load time: 400ms → 120ms (70% reduction)",
      "99% form submission success rate",
      "Zero-downtime deployments",
      "500+ active users",
      "Automated email notifications"
    ],
    metrics: {
      "Load Time": "400ms → 120ms",
      "Success Rate": "99%",
      "Users Served": "500+",
      "Uptime": "99.95%",
      "Time Saved": "90%"
    },
    techStack: ["Spring Boot", "React", "MyBatis", "MySQL", "Redis", "AWS EC2", "Docker", "AWS CodePipeline"],
    architecture: {
      pattern: "Layered Architecture with Caching",
      components: ["Web Layer", "Service Layer", "DAO Layer", "Cache Layer"],
      keyFeatures: ["Session Management", "Query Optimization", "CI/CD Pipeline", "Auto-scaling"]
    },
    category: "fullstack",
    featured: false,
    githubUrl: "https://github.com/YuxiangJiangCT/recommendation-system",
    images: ["/images/recommendation-workflow.png", "/images/recommendation-dashboard.png"],
    startDate: "2024-03",
    endDate: "2024-06"
  }
];

// Helper functions
export const getFeaturedProjects = () => projects.filter(p => p.featured);
export const getProjectsByCategory = (category: string) => projects.filter(p => p.category === category);
export const getProjectsByTech = (tech: string) => projects.filter(p => p.techStack.includes(tech));