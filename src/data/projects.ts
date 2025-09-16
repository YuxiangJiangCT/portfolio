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
  },
  {
    id: 4,
    title: "Real-time Data Pipeline",
    subtitle: "Stream Processing Architecture",
    description: "Event-driven data pipeline processing 100K+ events per minute",
    longDescription: "Designed a robust data ingestion and processing pipeline using Apache Kafka and Spark. Implemented exactly-once semantics and achieved sub-second processing latency for complex aggregations.",
    highlights: [
      "100K+ events per minute",
      "Sub-second processing latency",
      "Exactly-once delivery guarantee",
      "Auto-scaling based on lag",
      "Schema evolution support"
    ],
    metrics: {
      "Throughput": "100K EPM",
      "Latency": "< 1s",
      "Data Loss": "0%",
      "Availability": "99.99%",
      "Cost Reduction": "40%"
    },
    techStack: ["Apache Kafka", "Apache Spark", "Python", "Airflow", "Elasticsearch", "Grafana", "Kubernetes", "AWS"],
    architecture: {
      pattern: "Lambda Architecture",
      components: ["Stream Layer", "Batch Layer", "Serving Layer", "Speed Layer"],
      keyFeatures: ["Event Sourcing", "CQRS", "Backpressure Handling", "Dead Letter Queue"]
    },
    category: "data",
    featured: true,
    githubUrl: "https://github.com/yourusername/data-pipeline",
    images: ["/images/pipeline-architecture.png", "/images/pipeline-metrics.png"],
    startDate: "2024-07",
    endDate: "2024-09"
  },
  {
    id: 5,
    title: "Distributed Task Scheduler",
    subtitle: "High-Availability Job Orchestration System",
    description: "Built a fault-tolerant distributed task scheduler handling 10K+ concurrent jobs",
    longDescription: "Implemented a distributed task scheduling system with leader election, job prioritization, and automatic retry mechanisms. Achieved high availability through consensus algorithms and redundancy.",
    highlights: [
      "10K+ concurrent jobs",
      "Automatic failover in < 5s",
      "Priority queue implementation",
      "Cron and interval scheduling",
      "RESTful management API"
    ],
    metrics: {
      "Concurrent Jobs": "10K+",
      "Failover Time": "< 5s",
      "Job Success Rate": "99.8%",
      "API Response Time": "< 100ms",
      "Memory Usage": "< 500MB"
    },
    techStack: ["Go", "etcd", "gRPC", "Protocol Buffers", "PostgreSQL", "Redis", "Docker", "Prometheus"],
    architecture: {
      pattern: "Leader-Follower with Consensus",
      components: ["Scheduler Nodes", "Worker Pool", "State Store", "API Gateway"],
      keyFeatures: ["Leader Election", "Health Checks", "Circuit Breaker", "Graceful Shutdown"]
    },
    category: "backend",
    featured: false,
    githubUrl: "https://github.com/yourusername/task-scheduler",
    images: ["/images/scheduler-design.png", "/images/scheduler-dashboard.png"],
    startDate: "2024-04",
    endDate: "2024-05"
  },
  {
    id: 6,
    title: "ML Model Serving Platform",
    subtitle: "Scalable Machine Learning Infrastructure",
    description: "Platform for deploying and serving ML models with A/B testing capabilities",
    longDescription: "Created a comprehensive ML model serving platform supporting multiple frameworks, automatic scaling, and real-time monitoring. Includes feature store integration and model versioning.",
    highlights: [
      "< 20ms inference latency",
      "Multi-framework support",
      "A/B testing framework",
      "Auto-scaling based on QPS",
      "Model versioning and rollback"
    ],
    metrics: {
      "Inference Latency": "< 20ms",
      "Models Deployed": "50+",
      "Daily Predictions": "10M+",
      "Availability": "99.95%",
      "Cost per Prediction": "$0.0001"
    },
    techStack: ["Python", "TensorFlow", "PyTorch", "FastAPI", "Kubernetes", "Ray Serve", "MLflow", "Prometheus"],
    architecture: {
      pattern: "Microservices with Service Mesh",
      components: ["Model Registry", "Serving Layer", "Feature Store", "Monitoring Stack"],
      keyFeatures: ["Blue-Green Deployment", "Canary Release", "Feature Pipeline", "Model Monitoring"]
    },
    category: "data",
    featured: false,
    githubUrl: "https://github.com/yourusername/ml-platform",
    images: ["/images/ml-platform-arch.png", "/images/ml-platform-monitoring.png"],
    startDate: "2024-01",
    endDate: "2024-03"
  }
];

// Helper functions
export const getFeaturedProjects = () => projects.filter(p => p.featured);
export const getProjectsByCategory = (category: string) => projects.filter(p => p.category === category);
export const getProjectsByTech = (tech: string) => projects.filter(p => p.techStack.includes(tech));