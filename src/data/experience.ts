export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
  techStack: string[];
}

export const experiences: Experience[] = [
  {
    id: "dataman",
    company: "Dataman Analytics (quantdefi.ai)",
    role: "Software Engineering Intern",
    period: "Jun 2025 – Present",
    location: "New York, NY",
    bullets: [
      "Re-architected FastAPI microservices platform, cutting p99 latency by ~70% and doubling peak RPS",
      "Standardized DeFiLlama pool scanner and shipped as FastAPI service with Streamlit dashboard and Slack alerts",
      "Built ARIMA-based APY forecasting pipeline over 19,000+ pools with automated distribution to social channels",
      "Built end-to-end observability with p95/p99 dashboards and SLO-based Slack alerts",
    ],
    techStack: ["Python", "FastAPI", "Redis", "PostgreSQL", "ARIMA", "Docker"],
  },
  {
    id: "polypoll",
    company: "PolyPoll (Quantify Venture)",
    role: "Co-founder & CTO",
    period: "Aug 2024 – Present",
    location: "New York, NY",
    bullets: [
      "Built entire technical stack from scratch: backend (FastAPI), frontend (React/TS Chrome Extension), smart contracts (Solidity on Base)",
      "Designed AI pipeline for automated content analysis and market generation using Groq LLM",
      "Implemented ECDSA + JWT authentication, rate limiting, and idempotency patterns",
      "Load-tested system with k6 (~500 virtual users, 28K+ requests, <0.5% error rate)",
    ],
    techStack: ["React", "TypeScript", "Solidity", "FastAPI", "Chrome Extension API"],
  },
  {
    id: "cornell-grader",
    company: "Cornell Tech",
    role: "Course Staff (Grader) — Applied Machine Learning",
    period: "Sep 2025 – Present",
    location: "New York, NY",
    bullets: [
      "Grade assignments and projects for ~150 students using calibrated rubrics with 48-hour typical turnaround",
      "Provide clear, actionable feedback while maintaining consistency across submissions and documenting edge cases",
      "Coordinate with course staff on rubric clarifications and regrade handling, maintaining <5% regrade rate",
    ],
    techStack: ["Python", "PyTorch", "scikit-learn"],
  },
];
