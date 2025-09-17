# YUXIANG JIANG

New York, NY | 646-306-6292 | yj548@cornell.edu | https://yuxiangjiangct.github.io/portfolio
GitHub: github.com/YuxiangJiangCT | LinkedIn: linkedin.com/in/yuxiang03

## EDUCATION

**Cornell Tech**, M.S. Computer & Information Sciences | New York, NY | Aug 2024 – May 2026
**Jinan University**, B.E. Internet of Things Engineering | Guangzhou, China | Sep 2020 – Jul 2024

## TECHNICAL SKILLS

**Languages:** Java, Python, C++, TypeScript/JavaScript, HTML/CSS, SQL, Go
**Backend:** Spring Boot, FastAPI, Node.js/Express
**Frontend:** React (TypeScript)
**Infra:** Docker, AWS, Nginx, CI/CD
**Data/Storage:** PostgreSQL, Redis, MySQL, MongoDB, Supabase

## EXPERIENCE

### Dataman Analytics (quantdefi.ai), Software Engineering Intern
**New York, NY | Jun 2025 – Present**

• Own and re-architect a FastAPI microservices platform, cutting p99 latency from 420ms to 125ms (70% reduction) and doubling peak RPS from 1.2k to 2.5k with cache-aside Redis, connection pooling, and async I/O.

• Lead standardization of the pool scanner on DefiLlama and ship it as a FastAPI service with a Streamlit dashboard and opportunity alerts so non-engineers can pull insights without dev help.

• Design and ship an ARIMA-based APY forecasting pipeline for 19,000+ pools and a market-regime-adaptive ranking powering bots and a newsletter.

• Establish end-to-end observability (structured logs, request IDs, p95/p99, error rates, dashboards, SLO-based Slack alerts) enabling rapid rollback and on-call readiness.

• Harden auth and reliability with JWT, ECDSA signatures, rate limiting, and idempotency keys.

### Cornell Tech, Course Staff (Grader) - Applied Machine Learning
**New York, NY | Sep 2025 – Present**

• Grade assignments and projects for ~150 students using calibrated rubrics with 48-hour typical turnaround.

• Provide clear, actionable feedback while maintaining consistency across submissions and documenting edge cases.

• Coordinate with course staff on rubric clarifications and regrade handling, maintaining <5% regrade rate.

## PROJECTS

### Scalable URL Shortener & Real-time Analytics | Node.js, React, Redis, Docker

• Designed a high-throughput URL shortener handling 500+ RPS (tested with wrk, 10-min soak) with p95 latency < 50ms on AWS EC2 t3.medium, leveraging cache-aside Redis and nanoid identifiers.

• Implemented non-blocking Redis queues with batch aggregation, reducing PostgreSQL write I/O from 5000/s to 500/s (90% reduction).

• Containerized the full application stack with Docker Compose and hardened security through rate limiting and input sanitization.

### PolyPoll — Browser Extension + Real-time Backend (ETHGlobal NYC 2025 Submission)
**Chrome Extension, FastAPI, PostgreSQL/Supabase Realtime, Redis, TypeScript, Pydantic, JWT, ECDSA**

• Improved activation reliability across major news publishers by adding per-route CORS and site fingerprinting, validated with browser integration tests.

• Streamlined poll creation from five steps to one click by moving defaults to the backend and adding an optimistic UI, achieving < 200ms end-to-end latency with Redis cache-aside and connection pooling.

• Proved scale in a 10-minute k6 soak (~500 virtual clients, 28,000+ requests, < 0.5% errors) and maintained integrity and security with idempotency keys, a dead-letter queue, ECDSA signatures, short-lived JWTs, and rate limiting.

### Postgraduate Recommendation & Evaluation System | Spring Boot, React, MyBatis, MySQL, Redis, AWS

• Automated the postgraduate recommendation workflow for 500+ faculty and students, eliminating 90% of paper and email steps.

• Optimized MyBatis queries and introduced Redis caching, slashing average page load from 400ms to 120ms (70% reduction) and boosting form-submission success to 99%.

• Orchestrated zero-downtime releases for the containerized services on AWS EC2 using AWS CodePipeline CI/CD.