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
    period: "Jun 2025 – Aug 2025",
    location: "New York, NY",
    bullets: [
      "Re-architected FastAPI microservices platform with Redis cache-aside and async connection pooling, cutting p99 latency by ~70% (800ms → 240ms) and doubling peak RPS (250 → 500+)",
      "Standardized DeFiLlama pool scanner into a production FastAPI service with Streamlit dashboard and Slack alerts",
      "Built ARIMA-based APY forecasting pipeline covering 19,000+ DeFi pools with market-regime adaptation, distributed via social-channel bots",
      "Implemented end-to-end observability: structured logging, p95/p99 dashboards, SLO-based Slack alerts",
      "Hardened APIs with JWT + ECDSA authentication, rate limiting, and idempotency keys",
    ],
    techStack: ["Python", "FastAPI", "Redis", "PostgreSQL", "ARIMA", "Docker"],
  },
  {
    id: "polypoll",
    company: "PolyPoll (Quantify Venture)",
    role: "Founding Engineer (Backend)",
    period: "Aug 2025 – Present",
    location: "New York, NY",
    bullets: [
      "Cut LLM inference costs ~50% by architecting a multi-provider routing layer (FastAPI) with automatic failover across 6 model endpoints (Groq / OpenRouter)",
      "Built 10-stage market generation pipeline with dual-layer semantic de-duplication (0.75 similarity threshold + 48h window), filtering ~35% near-duplicate content to improve output quality",
      "Integrated 5+ external APIs (Perplexity, Slack, Exa, Replicate, Cloudinary) with entity resolution against 1,700+ public figures, enabling graceful degradation, retry logic, and unified cost monitoring",
      "Designed PostgreSQL schema with auto-categorization triggers, RLS policies, and JSONB embeddings for efficient market discovery and similarity matching",
      "Validated reliability via k6 soak tests (~500 VUs, 28K+ requests, <0.5% errors); published two open-source Python SDKs to PyPI (polypoll-sdk, qdf-sdk)",
    ],
    techStack: ["Python", "FastAPI", "Redis", "PostgreSQL", "Groq", "OpenRouter", "k6"],
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
