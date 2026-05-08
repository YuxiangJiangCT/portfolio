export interface SkillGroup {
  category: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    items: ["Python", "Java", "TypeScript", "JavaScript", "Go", "C++", "SQL", "HTML/CSS", "Solidity (reading)"],
  },
  {
    category: "Backend",
    items: ["FastAPI", "Spring Boot", "Node.js", "Express", "REST", "gRPC", "Microservices", "Django"],
  },
  {
    category: "Frontend",
    items: ["React", "TypeScript", "Tailwind CSS", "Chrome Extension API"],
  },
  {
    category: "Systems",
    items: ["Distributed Systems", "Concurrency", "Data Structures", "Linux/Unix", "TCP/IP", "HTTP"],
  },
  {
    category: "Data & Storage",
    items: ["PostgreSQL", "Redis", "MySQL", "MongoDB", "Supabase", "Schema Design", "Indexing & Query Optimization"],
  },
  {
    category: "AI / LLM Infrastructure",
    items: ["Groq", "OpenRouter", "Multi-provider routing", "Prompt engineering", "Exa", "Perplexity"],
  },
  {
    category: "Infrastructure & DevOps",
    items: ["Docker", "AWS (EC2, RDS, S3, CodePipeline)", "Nginx", "GitHub Actions", "CI/CD"],
  },
  {
    category: "Testing & Observability",
    items: ["JUnit", "PyTest", "k6 load testing", "Structured logging", "p95/p99 dashboards", "SLO-based alerting"],
  },
  {
    category: "Web3",
    items: ["viem", "Hardhat", "Base L2", "World Chain", "Permit2"],
  },
  {
    category: "Tools",
    items: ["Git", "Postman", "Streamlit"],
  },
];
