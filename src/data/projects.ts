export interface Project {
  id: string;
  title: string;
  status: string[];
  oneLiner: string;
  highlights: string[];
  techStack: string[];
  // Detail page content
  overview: string;
  context: string;
  whatIBuilt: string[];
  keyDecisions: string[];
  challenges: string[];
  results: string[];
  links: {
    github?: string;
    demo?: string;
    showcase?: string;
  };
}

export const projects: Project[] = [
  {
    id: "dataman",
    title: "Dataman Analytics — Platform Optimization",
    status: ["Internship", "Production"],
    oneLiner:
      "Re-architected and optimized a production backend platform using FastAPI, Redis, and PostgreSQL, improving latency, throughput, and reliability.",
    highlights: [
      "Reduced p99 latency from 800ms to 240ms (-70%)",
      "Increased peak throughput from 250 to 500+ RPS",
      "Built ARIMA-based APY forecasting pipeline over 19,000+ pools",
      "End-to-end observability with SLO-based alerts",
    ],
    techStack: ["Python", "FastAPI", "Redis", "PostgreSQL", "Docker", "ARIMA", "Streamlit"],
    overview:
      "Re-architected and optimized a production backend platform for a DeFi analytics company, improving latency, throughput, and reliability across 26 API endpoints.",
    context:
      "Dataman Analytics runs a real-time DeFi analytics platform that monitors 19,000+ liquidity pools. The existing backend had performance bottlenecks — high latency, limited throughput, and no structured observability. I was brought on to re-architect the core platform.",
    whatIBuilt: [
      "Re-architected the FastAPI microservices platform with Redis cache-aside pattern and async connection pooling, cutting p99 latency by ~70%",
      "Standardized the DeFiLlama pool scanner into a production FastAPI service with Streamlit dashboard and Slack alert integration",
      "Designed and implemented an ARIMA-based APY forecasting pipeline covering 19,000+ pools with market-regime adaptation",
      "Built end-to-end observability with structured logging, p95/p99 dashboards, and SLO-based Slack alerts",
      "Implemented JWT + ECDSA authentication, rate limiting, and idempotency keys for reliability",
    ],
    keyDecisions: [
      "Chose cache-aside over write-through for Redis — read-heavy workload with tolerance for slightly stale data",
      "Used async connection pooling instead of sync — FastAPI is async-native, blocking calls were the main bottleneck",
      "ARIMA over LSTM for forecasting — simpler, faster, and sufficient accuracy for APY prediction with limited training data",
      "SLO-based alerts over threshold alerts — fewer false positives, more actionable for the small team",
    ],
    challenges: [
      "Debugging latency spikes caused by synchronous database calls hidden inside async endpoint handlers",
      "Handling rate limits from DeFiLlama API while maintaining real-time coverage of 19,000+ pools",
      "Designing the forecasting pipeline to gracefully degrade when pool data was sparse or noisy",
    ],
    results: [
      "p99 latency: 800ms → 240ms (-70%)",
      "Peak RPS: 250 → 500+ (2x improvement)",
      "19,000+ pools monitored with real-time alerts",
      "Zero security incidents during internship tenure",
      "99.9% uptime maintained",
    ],
    links: {},
  },
  {
    id: "polypoll",
    title: "PolyPoll — AI-Integrated Backend Platform",
    status: ["Production", "Co-founder CTO"],
    oneLiner:
      "Built the backend and AI routing layer for a full-stack platform from scratch — API orchestration, multi-provider inference, Chrome extension, and smart contract integration.",
    highlights: [
      "Sole engineer: backend (FastAPI), frontend (React/TS Chrome Extension), smart contracts (Solidity)",
      "Sub-200ms end-to-end latency with Redis cache-aside and connection pooling",
      "Load-tested with k6: ~500 virtual users, 28K+ requests, <0.5% error rate",
      "ECDSA + JWT auth, rate limiting, Pydantic validation",
    ],
    techStack: [
      "Python",
      "FastAPI",
      "React",
      "TypeScript",
      "Solidity",
      "Redis",
      "PostgreSQL",
      "Chrome Extension API",
    ],
    overview:
      "Built the entire technical stack for an AI-integrated platform from scratch — backend API, Chrome extension frontend, smart contract layer, and multi-provider LLM inference routing.",
    context:
      "PolyPoll needed a full-stack platform that could ingest content from 120+ websites via a Chrome extension, generate structured outputs using LLM inference, and settle results on-chain. As the sole technical founder, I designed and built every layer.",
    whatIBuilt: [
      "FastAPI backend with 30+ endpoints, Redis cache-aside, async connection pooling, and structured error handling",
      "Multi-provider LLM inference routing across 6 model endpoints (Groq/OpenRouter) with automatic failover",
      "React/TypeScript Chrome extension that injects UI into 120+ websites for content capture",
      "Solidity smart contracts on Base L2 for on-chain settlement with USDC",
      "10-stage market generation pipeline with dual-layer semantic de-duplication (0.75 similarity threshold, 48h window)",
      "Integrated 5+ external APIs (Exa, Perplexity, Replicate, Cloudinary, Slack) with entity resolution across 1,700+ public figures",
    ],
    keyDecisions: [
      "Chose Chrome Extension over standalone web app — content injection into existing sites was the core UX requirement",
      "Multi-provider LLM routing over single provider — rate limits from any single provider would break the pipeline at scale",
      "Base L2 over Ethereum mainnet — lower gas costs, sufficient security for the settlement amounts involved",
      "Semantic de-duplication over exact matching — near-duplicate content was the main quality issue, not exact duplicates",
    ],
    challenges: [
      "Handling rate limits across 6 LLM providers with different quota structures and error formats",
      "Ensuring Chrome extension compatibility across 120+ websites with varying DOM structures",
      "Designing the smart contract to handle edge cases in settlement (disputed outcomes, timeout scenarios)",
    ],
    results: [
      "Sub-200ms end-to-end latency for core API paths",
      "~500 virtual users sustained in k6 soak tests",
      "28K+ requests handled with <0.5% error rate",
      "1,700+ public figures in entity database",
      "120+ websites supported by Chrome extension",
    ],
    links: {},
  },
  {
    id: "url-shortener",
    title: "Scalable URL Shortener & Analytics",
    status: ["System Design"],
    oneLiner:
      "High-throughput URL shortening service with real-time analytics, designed for 500+ RPS with sub-50ms latency.",
    highlights: [
      "500+ RPS with p95 latency < 50ms",
      "Non-blocking Redis queues with batch aggregation, reducing PostgreSQL write I/O by 90%",
      "Containerized with Docker Compose, hardened with rate limiting and input sanitization",
    ],
    techStack: ["Node.js", "React", "Redis", "PostgreSQL", "Docker", "k6"],
    overview:
      "A high-throughput URL shortening service with real-time click analytics, designed and load-tested for production-level performance.",
    context:
      "Built as a system design exercise to demonstrate end-to-end ownership of a production-grade distributed system — from API design to caching strategy to containerized deployment.",
    whatIBuilt: [
      "Node.js/Express API with nanoid-based short URL generation and Redis cache-aside for sub-50ms reads",
      "Non-blocking Redis queue with batch aggregation worker — reduces PostgreSQL write I/O from 5000/s to 500/s (90% reduction)",
      "Real-time analytics dashboard (React) showing click counts, referrer data, and geographic distribution",
      "Rate limiting, input sanitization, and URL validation to prevent abuse",
      "Docker Compose setup with Nginx reverse proxy for local and production deployment",
    ],
    keyDecisions: [
      "Nanoid over auto-increment IDs — no sequential guessing, better distribution across cache shards",
      "Redis queue with batch writes over direct PostgreSQL inserts — write I/O was the bottleneck under load",
      "Cache-aside over write-through — reads dominate (100:1 read/write ratio for popular URLs)",
      "Docker Compose over Kubernetes — appropriate complexity for the scale, faster iteration",
    ],
    challenges: [
      "Tuning batch size and flush interval to balance write latency vs throughput under sustained load",
      "Preventing cache stampede on popular URLs when cache entries expire simultaneously",
      "Designing the analytics pipeline to handle bursty traffic without backpressure on the main API",
    ],
    results: [
      "500+ RPS sustained (10-min wrk soak test)",
      "p95 latency < 50ms on AWS EC2 t3.medium",
      "PostgreSQL write I/O: 5000/s → 500/s (90% reduction)",
      "Cache hit rate: 85%+",
      "99.9% uptime in testing",
    ],
    links: {
      github: "https://github.com/YuxiangJiangCT/url-shortener",
    },
  },
];

export const getProjectById = (id: string) => projects.find((p) => p.id === id);
