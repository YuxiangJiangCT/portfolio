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
    description: "Built a production-ready URL shortener handling 500+ RPS with sub-50ms latency",
    longDescription: "Designed and implemented a scalable URL shortening service with real-time analytics. The system leverages Redis for caching and queue management, achieving 90% reduction in database I/O through intelligent batching and caching strategies.",
    highlights: [
      "Handles 500+ requests per second",
      "P95 latency under 50ms",
      "90% PostgreSQL write I/O reduction",
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
    githubUrl: "https://github.com/yourusername/url-shortener",
    images: ["/images/url-shortener-arch.png", "/images/url-shortener-dashboard.png"],
    startDate: "2024-09",
    endDate: "2024-11"
  },
  {
    id: 2,
    title: "PolyPoll",
    subtitle: "Real-time Browser Extension - ETHGlobal NYC 2025",
    description: "Chrome extension enabling instant polls on any webpage with real-time results",
    longDescription: "Developed for ETHGlobal NYC 2025, PolyPoll transforms any webpage into an interactive polling platform. Achieved sub-200ms latency through optimistic UI updates and efficient caching.",
    highlights: [
      "< 200ms end-to-end latency",
      "One-click poll creation",
      "28,000+ requests in load test",
      "< 0.5% error rate",
      "ECDSA signature verification"
    ],
    metrics: {
      "Latency": "< 200ms",
      "Reliability": "99.5%",
      "Load Test": "28k requests",
      "Error Rate": "< 0.5%",
      "Active Users": "500+"
    },
    techStack: ["Chrome Extension API", "TypeScript", "FastAPI", "PostgreSQL", "Supabase", "Redis", "JWT", "WebSocket"],
    architecture: {
      pattern: "Event-driven with Real-time Updates",
      components: ["Browser Extension", "REST API", "WebSocket Server", "Cache Layer"],
      keyFeatures: ["Optimistic UI", "Real-time Sync", "CORS Handling", "Idempotency"]
    },
    category: "fullstack",
    featured: true,
    githubUrl: "https://github.com/yourusername/polypoll",
    demoUrl: "https://chrome.google.com/webstore/polypoll",
    images: ["/images/polypoll-demo.gif", "/images/polypoll-architecture.png"],
    startDate: "2025-01",
    endDate: "2025-01"
  },
  {
    id: 3,
    title: "Postgraduate Recommendation System",
    subtitle: "Automated Academic Workflow Platform",
    description: "Streamlined recommendation process for 500+ faculty and students",
    longDescription: "Built an end-to-end system automating the postgraduate recommendation workflow, eliminating 90% of manual processes and achieving significant performance improvements.",
    highlights: [
      "70% page load time reduction",
      "99% form submission success rate",
      "Zero-downtime deployments",
      "500+ active users",
      "Automated email notifications"
    ],
    metrics: {
      "Load Time": "120ms",
      "Success Rate": "99%",
      "Users Served": "500+",
      "Uptime": "99.95%",
      "Time Saved": "90%"
    },
    techStack: ["Spring Boot", "React", "MyBatis", "MySQL", "Redis", "AWS EC2", "Docker", "Jenkins"],
    architecture: {
      pattern: "Layered Architecture with Caching",
      components: ["Web Layer", "Service Layer", "DAO Layer", "Cache Layer"],
      keyFeatures: ["Session Management", "Query Optimization", "CI/CD Pipeline", "Auto-scaling"]
    },
    category: "fullstack",
    featured: false,
    githubUrl: "https://github.com/yourusername/recommendation-system",
    images: ["/images/recommendation-workflow.png", "/images/recommendation-dashboard.png"],
    startDate: "2024-03",
    endDate: "2024-06"
  }
];

// Helper functions
export const getFeaturedProjects = () => projects.filter(p => p.featured);
export const getProjectsByCategory = (category: string) => projects.filter(p => p.category === category);
export const getProjectsByTech = (tech: string) => projects.filter(p => p.techStack.includes(tech));