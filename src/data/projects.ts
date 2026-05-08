export interface Project {
  id: string;
  title: string;
  status: string[];
  image?: string;
  category?: "main" | "hackathon";
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
    id: "bounty-hunters",
    title: "bounties.fun — Social-Fi on World Chain",
    status: ["ETHGlobal Buenos Aires 2025", "🏆 World Pool Prize Winner"],
    image: "/images/bounties-fun-app.png",
    oneLiner:
      "Hackathon-winning social-fi MiniApp where verified humans (via World ID) earn WLD/USDC for amplifying brand campaigns on social media — gasless on-chain payouts via Permit2.",
    highlights: [
      "Won the World Pool Prize at ETHGlobal Buenos Aires (sponsor: World, formerly Worldcoin)",
      "Implemented Permit2 SignatureTransfer to enable gasless, approval-free token transfers — works around World App's blocked approve() calls",
      "Native World App MiniApp UX via @worldcoin/minikit-js (wallet auth, World ID verification, in-app transaction signing — zero external popups)",
      "Custom blockchain event listener with viem for source-of-truth earnings dashboard pulling BountyPayout events directly from World Chain",
    ],
    techStack: [
      "Solidity",
      "Hardhat",
      "Permit2",
      "World Chain",
      "World ID",
      "MiniKit",
      "React",
      "TypeScript",
      "Vite",
      "FastAPI",
      "Supabase",
      "viem",
    ],
    overview:
      "A full-stack social-fi MiniApp on World Chain that pays verified humans (via World ID) to amplify brand campaigns on social media. Brands fund bounties on-chain in WLD or USDC; participants complete tasks (e.g., posting on X with required hashtags), submit proof, and receive instant crypto payouts.",
    context:
      "Built and submitted at ETHGlobal Buenos Aires, where it won the World Pool Prize from sponsor World (the team behind World ID, formerly Worldcoin). The core challenge: build a Web3 UX that feels native inside the World App, where standard ERC20 approve() calls are blocked for security reasons. Required rethinking the entire token-transfer flow.",
    whatIBuilt: [
      "Solidity bounty contract on World Chain using Permit2 SignatureTransfer for gasless, approval-free token transfers",
      "Deep integration with @worldcoin/minikit-js: wallet auth, World ID verification, in-app transaction signing",
      "FastAPI backend that scrapes and validates submission tweets against bounty requirements (hashtags, mentions, follower-based reward multipliers)",
      "Supabase real-time database with RLS policies, accessed directly from MiniApp without unnecessary API middleware",
      "Custom blockchain event listener using viem to query BountyPayout events from World Chain, powering a source-of-truth earnings dashboard",
      "Comprehensive Hardhat test suite (BountyModulePermit2.t.sol) covering Permit2 signature validation, multi-token support, fee calculations, reentrancy protection",
    ],
    keyDecisions: [
      "Permit2 SignatureTransfer over standard approve+transferFrom — World App blocks approve() calls; Permit2 enables one-click flows without prior approvals",
      "Dual-deadline split (Permit2 sig: 1h max per World App limits; bounty deadline: up to 7 days) — preserves UX for long campaigns while respecting platform constraints",
      "UUID ↔ bytes32 encoding bridge — Supabase uses UUIDs, on-chain uses bytes32; custom encoders bridge the systems without losing identity",
      "Direct Supabase access from MiniApp via RLS — eliminates API middleware layer, reduces latency and infra surface",
    ],
    challenges: [
      "Working around World App's blocked approve() calls without breaking standard ERC20 token flows — solved with Permit2 SignatureTransfer and World App's auto-injected signature pattern",
      "Bridging off-chain Twitter validation with on-chain payout settlement, including reward multipliers based on follower counts (1x to 3x)",
      "Synchronizing a 1-hour Permit2 signature window with multi-day bounty durations without compromising security",
    ],
    results: [
      "🏆 World Pool Prize at ETHGlobal Buenos Aires 2025 (sponsor: World, formerly Worldcoin)",
      "Total build: 3000+ lines TypeScript, 500+ lines Solidity, 400+ lines Python",
      "End-to-end gasless token flow — zero approve() calls, single-transaction bounty creation",
      "Native World App MiniApp UX with no external wallet popups",
    ],
    links: {
      showcase: "https://ethglobal.com/showcase/bounty-hunters-276vw",
    },
  },
  {
    id: "dataman",
    title: "Dataman Analytics — QDF Platform Optimization",
    status: ["Internship · Jun–Aug 2025", "Production"],
    image: "/images/dataman-app.png",
    oneLiner:
      "Re-architected and optimized QDF (The Quant's DeFi, quantdefi.ai) — Dataman Analytics' production backend — using FastAPI, Redis, and PostgreSQL, improving latency, throughput, and reliability.",
    highlights: [
      "Reduced p99 latency from 800ms to 240ms (-70%)",
      "Increased peak throughput from 250 to 500+ RPS",
      "Built ARIMA-based APY forecasting pipeline over 19,000+ pools",
      "End-to-end observability with SLO-based alerts",
    ],
    techStack: ["Python", "FastAPI", "Redis", "PostgreSQL", "Docker", "ARIMA", "Streamlit"],
    overview:
      "Re-architected and optimized QDF (The Quant's DeFi, quantdefi.ai) — the production backend of Dataman Analytics — improving latency, throughput, and reliability across 26 API endpoints serving 19,000+ DeFi pools.",
    context:
      "Dataman Analytics runs QDF (The Quant's DeFi) at quantdefi.ai — a real-time DeFi analytics platform monitoring 19,000+ liquidity pools. The existing backend had performance bottlenecks — high latency, limited throughput, and no structured observability. I was brought on to re-architect the core platform during a summer internship (Jun–Aug 2025).",
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
    links: {
      demo: "https://www.quantdefi.ai/",
    },
  },
  {
    id: "polypoll",
    title: "PolyPoll — AI-Integrated Backend Platform",
    status: ["Production", "Founding Engineer"],
    image: "/images/polypoll-app.png",
    oneLiner:
      "Backend and AI orchestration layer for an AI-integrated prediction market platform — FastAPI services, multi-provider LLM routing, and a 10-stage market generation pipeline. Two SDKs published to PyPI.",
    highlights: [
      "Cut LLM inference costs ~50% via multi-provider routing across 6 model endpoints (Groq / OpenRouter) with automatic failover and rate-limit handling",
      "10-stage market generation pipeline with dual-layer semantic de-duplication (0.75 threshold + 48h window) — filters ~35% near-duplicate content over 1,700+ public figures",
      "Founding engineer responsible for backend and AI orchestration layer (Chrome extension and on-chain settlement contracts owned by other team members)",
      "Two open-source Python SDKs published to PyPI (polypoll-sdk, qdf-sdk); load-tested with k6 (~500 VUs, 28K+ requests, <0.5% error rate)",
    ],
    techStack: ["Python", "FastAPI", "Redis", "PostgreSQL", "Groq", "OpenRouter", "k6", "PyPI"],
    overview:
      "Founding engineer responsible for the backend and AI layer of an AI-integrated prediction market platform. The Chrome extension and on-chain settlement contracts are owned by other team members; my scope is the API surface, LLM orchestration, and the data/inference pipeline that powers them.",
    context:
      "Founding engineer on the backend and AI layer. Scope: FastAPI services, multi-provider LLM routing, market generation, and the SDKs that wrap the inference pipeline. Frontend (Chrome extension) and on-chain settlement (Base L2 + USDC contracts) are owned by other team members.",
    whatIBuilt: [
      "FastAPI backend with 30+ endpoints, Redis cache-aside, async connection pooling, and structured error handling",
      "Multi-provider LLM inference routing across 6 model endpoints (Groq / OpenRouter) with automatic failover and rate-limit handling — cut inference costs ~50%",
      "10-stage market generation pipeline with dual-layer semantic de-duplication (0.75 similarity threshold, 48h window) filtering ~35% near-duplicate content",
      "PostgreSQL schema with auto-categorization triggers, RLS policies, and JSONB embeddings for efficient market discovery and similarity matching",
      "Integrated 5+ external APIs (Exa, Perplexity, Replicate, Cloudinary, Slack) with entity resolution across 1,700+ public figures and unified cost monitoring",
      "Designed and exposed APIs consumed by the team-built Chrome extension across 120+ websites",
      "Backend integration with on-chain settlement layer (Base L2 / USDC contracts owned by team)",
      "Published two open-source Python SDKs to PyPI (polypoll-sdk, qdf-sdk)",
    ],
    keyDecisions: [
      "Multi-provider LLM routing over single provider — rate limits from any single provider would break the pipeline at scale",
      "Semantic de-duplication over exact matching — near-duplicate content was the actual quality issue, not exact duplicates",
      "Async connection pooling + cache-aside Redis — reads dominate, async-native FastAPI made blocking calls the main bottleneck",
      "Publishing as PyPI SDKs over private packages — enabled clean integration boundaries with the extension and external partners",
    ],
    challenges: [
      "Handling rate limits across 6 LLM providers with different quota structures and error formats",
    ],
    results: [
      "~50% reduction in LLM inference costs via multi-provider routing",
      "~35% near-duplicate content filtered by dual-layer semantic de-duplication",
      "Sub-200ms end-to-end latency on core API paths",
      "~500 virtual users sustained in k6 soak tests; 28K+ requests with <0.5% error rate",
      "1,700+ public figures in entity database",
      "Two SDKs (polypoll-sdk, qdf-sdk) shipped to PyPI",
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
  {
    id: "postgraduate-system",
    title: "Postgraduate Recommendation & Evaluation System",
    status: ["Production", "Jinan University"],
    oneLiner:
      "End-to-end web platform that automated the postgraduate recommendation workflow for 500+ faculty and students at Jinan University, eliminating ~90% of paper and email steps.",
    highlights: [
      "Cut average page load from ~400ms to ~120ms (-70%) via Redis cache-aside layer and MyBatis query optimization",
      "Automated workflow for 500+ faculty and students, eliminating ~90% of paper and email steps",
      "Achieved 99% form-submission success with zero-downtime CI/CD on AWS EC2 + AWS CodePipeline",
    ],
    techStack: ["Spring Boot", "React", "MyBatis", "MySQL", "Redis", "AWS EC2", "CodePipeline"],
    overview:
      "Designed and built a production web platform to digitize the postgraduate recommendation workflow at Jinan University, replacing paper forms and email chains with a single auditable system used by 500+ faculty and students.",
    context:
      "Jinan University's existing postgraduate recommendation process relied on paper forms, emails, and manual coordination across faculty and students. The workflow was slow, error-prone, and difficult to audit. I built a production system to digitize the entire process end-to-end.",
    whatIBuilt: [
      "Spring Boot + MyBatis backend with role-based access control for faculty, students, and admins",
      "React frontend covering the full recommendation workflow: applications, evaluations, approvals, and audit trails",
      "Redis cache-aside layer for hot read paths (faculty dashboards, evaluation lookups)",
      "MyBatis query optimization to eliminate N+1 patterns in evaluation aggregation",
      "Containerized deployment on AWS EC2 with AWS CodePipeline for zero-downtime releases",
    ],
    keyDecisions: [
      "Cache-aside over write-through Redis — read-heavy workload (faculty browsing applications) tolerates slightly stale data",
      "MyBatis over JPA — finer SQL control was needed to optimize the evaluation aggregation queries",
      "AWS CodePipeline over manual deploys — small ops team needed automated zero-downtime releases",
    ],
    challenges: [
      "Optimizing N+1 query patterns in the evaluation aggregation logic without rewriting the whole data model",
      "Designing role-based access for a multi-stakeholder workflow (students, faculty, admins) while keeping the audit trail simple",
    ],
    results: [
      "Average page load: ~400ms → ~120ms (-70%)",
      "500+ faculty and students onboarded onto a single system",
      "~90% reduction in paper and email steps",
      "99% form-submission success rate",
      "Zero-downtime deploys via AWS CodePipeline",
    ],
    links: {},
  },
  {
    id: "oracle-settler",
    title: "oracle-settler — Dual-Source Oracle Settlement",
    status: ["Hackathon", "Live Demo"],
    image: "/images/oracle-settler-app.png",
    category: "hackathon",
    oneLiner:
      "Decentralized prediction market with dual-source oracle verification and AI-driven arbitration; 84 test cases.",
    highlights: [
      "Dual-source oracle verification with AI arbitration for ambiguous outcomes",
      "84 Hardhat test cases covering settlement edge cases",
      "Live demo deployed on Vercel",
    ],
    techStack: ["Solidity", "Chainlink", "React", "TypeScript", "Hardhat"],
    overview:
      "Hackathon project — a decentralized prediction market that settles outcomes using dual-source oracle verification, falling back to AI-driven arbitration for ambiguous resolution cases.",
    context:
      "Built as a hackathon submission to explore robust settlement mechanisms for prediction markets — combining Chainlink oracle data with AI arbitration to handle edge cases that traditional binary oracles cannot resolve cleanly.",
    whatIBuilt: [
      "Solidity contracts implementing dual-source oracle verification logic",
      "AI arbitration fallback for outcomes with conflicting or unclear oracle data",
      "Comprehensive Hardhat test suite (84 test cases) covering settlement edge cases",
      "React frontend deployed on Vercel for live demo",
    ],
    keyDecisions: [
      "Dual-source oracle over single oracle — single-point-of-failure was the main risk for prediction market settlement",
      "AI arbitration as fallback rather than primary — keeps deterministic settlement when oracles agree",
    ],
    challenges: [
      "Designing a settlement flow that gracefully degrades when oracle sources disagree",
    ],
    results: [
      "84 test cases passing",
      "Live demo deployed on Vercel",
    ],
    links: {
      github: "https://github.com/YuxiangJiangCT/oracle-settler",
      demo: "https://oracle-settler.vercel.app/",
    },
  },
  {
    id: "shadow-bet",
    title: "shadow-bet — Private Prediction Markets with ZK",
    status: ["Hackathon", "Live Demo"],
    image: "/images/shadow-bet-app.png",
    category: "hackathon",
    oneLiner:
      "Private prediction markets where participant identities are concealed via zero-knowledge proofs.",
    highlights: [
      "ZK-proof identity concealment lets participants place bets without revealing their identity on-chain",
      "Live demo deployed on Vercel",
    ],
    techStack: ["Solidity", "ZK-Proofs", "React", "TypeScript"],
    overview:
      "Hackathon project — private prediction markets where participants place bets without revealing their identity, using zero-knowledge proofs to verify eligibility while keeping identities concealed on-chain.",
    context:
      "Built as a hackathon submission to explore privacy-preserving prediction markets. Most on-chain markets leak participant addresses, which exposes betting strategy over time. ZK-proof identity concealment enables private participation while maintaining verifiability.",
    whatIBuilt: [
      "Solidity contracts with ZK-proof verification for participant eligibility",
      "Frontend integration generating proofs without revealing identity",
      "Live demo deployed on Vercel",
    ],
    keyDecisions: [
      "ZK-proof identity over pseudonymous addresses — pseudonymous addresses still leak betting patterns over time",
    ],
    challenges: [
      "Balancing on-chain verifiability with off-chain proof generation costs",
    ],
    results: [
      "Functional ZK-proof verification flow",
      "Live demo deployed on Vercel",
    ],
    links: {
      github: "https://github.com/YuxiangJiangCT/shadow-bet",
      demo: "https://shadow-bet.vercel.app/",
    },
  },
  {
    id: "darkrfq",
    title: "DarkRFQ — Encrypted On-Chain RFQ Execution",
    status: ["Hackathon"],
    category: "hackathon",
    image: "/images/darkrfq-app.png",
    oneLiner:
      "RFQ execution with Fully Homomorphic Encryption — bids stay encrypted on-chain throughout the matching process.",
    highlights: [
      "FHE-based bid encryption: bids remain encrypted on-chain throughout matching",
      "Solidity contracts integrating FHE primitives for trustless execution",
    ],
    techStack: ["Solidity", "FHE", "React", "TypeScript"],
    overview:
      "Hackathon project — Request-for-Quote (RFQ) execution where bids stay encrypted on-chain throughout matching, using Fully Homomorphic Encryption to prevent front-running and bid leakage.",
    context:
      "Built as a hackathon submission to explore FHE in DeFi. Traditional RFQ markets leak bid information, exposing participants to front-running. FHE allows matching without ever decrypting bids on-chain.",
    whatIBuilt: [
      "Solidity contracts using FHE primitives for encrypted bid handling",
      "Frontend for submitting encrypted RFQ bids",
    ],
    keyDecisions: [
      "FHE over commit-reveal schemes — eliminates the reveal phase where front-running typically occurs",
    ],
    challenges: [
      "FHE on-chain has a limited operation set; designing matching logic within those constraints",
    ],
    results: [
      "Working FHE-based RFQ flow on testnet",
    ],
    links: {
      github: "https://github.com/YuxiangJiangCT/DarkRFQ",
    },
  },
];

export const getProjectById = (id: string) => projects.find((p) => p.id === id);
