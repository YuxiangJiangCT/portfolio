export interface SkillGroup {
  category: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    items: ["Python", "Java", "TypeScript", "JavaScript", "C++", "SQL", "Solidity (reading)"],
  },
  {
    category: "Backend",
    items: ["FastAPI", "Spring Boot", "Node.js", "Express", "Django"],
  },
  {
    category: "Frontend",
    items: ["React", "TypeScript", "Tailwind CSS", "Chrome Extension API"],
  },
  {
    category: "Data & Storage",
    items: ["PostgreSQL", "Redis", "MySQL", "MongoDB", "Supabase"],
  },
  {
    category: "AI / LLM Infrastructure",
    items: ["Groq", "OpenRouter", "Multi-provider routing", "Prompt engineering", "Exa", "Perplexity"],
  },
  {
    category: "Infrastructure & DevOps",
    items: ["Docker", "AWS (EC2, CodePipeline)", "Nginx", "GitHub Actions", "CI/CD"],
  },
  {
    category: "Observability & Testing",
    items: ["Structured logging", "p95/p99 dashboards", "SLO-based alerting", "k6 load testing"],
  },
  {
    category: "Web3",
    items: ["viem", "Hardhat", "Base L2", "World Chain", "Permit2"],
  },
  {
    category: "Tools",
    items: ["Git", "Linux", "Postman", "Streamlit"],
  },
];
