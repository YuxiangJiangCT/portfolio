export interface Achievement {
  title: string;
  description: string;
  metrics: string[];
  technologies: string[];
}

export interface Experience {
  company: string;
  position: string;
  location: string;
  period: string;
  logo?: string;
  achievements: Achievement[];
}

export const experiences: Experience[] = [
  {
    company: "Dataman Analytics (quantdefi.ai)",
    position: "Software Engineering Intern",
    location: "New York, NY",
    period: "Jun 2025 – Present",
    achievements: [
      {
        title: "Microservices Architecture Optimization",
        description: "Re-architected FastAPI microservices platform for improved performance",
        metrics: [
          "p99 latency: 420ms → 125ms (70% reduction)",
          "Peak RPS: 1.2k → 2.5k (2x improvement)",
          "Sub-50ms response time achieved"
        ],
        technologies: ["FastAPI", "Redis", "Async I/O", "Connection Pooling"]
      },
      {
        title: "DefiLlama Pool Scanner Standardization",
        description: "Led standardization and deployment of pool scanner as a service",
        metrics: [
          "19,000+ pools monitored",
          "Real-time alerts",
          "Non-technical accessibility"
        ],
        technologies: ["FastAPI", "Streamlit", "WebSocket", "Redis"]
      },
      {
        title: "APY Forecasting Pipeline",
        description: "Designed and implemented ARIMA-based APY forecasting system",
        metrics: [
          "19,000+ pools coverage",
          "Market-regime adaptive",
          "Daily predictions"
        ],
        technologies: ["Python", "ARIMA", "Time Series", "NumPy", "Pandas"]
      },
      {
        title: "End-to-End Observability",
        description: "Established comprehensive monitoring and alerting system",
        metrics: [
          "p95/p99 tracking",
          "SLO-based alerts",
          "5-minute incident response"
        ],
        technologies: ["Structured Logging", "Grafana", "Prometheus", "Slack API"]
      },
      {
        title: "Security & Reliability Hardening",
        description: "Implemented authentication and reliability features",
        metrics: [
          "Zero security incidents",
          "99.9% uptime",
          "Idempotent operations"
        ],
        technologies: ["JWT", "ECDSA", "Rate Limiting", "Idempotency Keys"]
      }
    ]
  },
  {
    company: "Cornell Tech",
    position: "Course Staff (Grader) - Applied Machine Learning",
    location: "New York, NY",
    period: "Sep 2025 – Present",
    achievements: [
      {
        title: "Assignment & Project Evaluation",
        description: "Grade assignments and projects for ~150 students using calibrated rubrics",
        metrics: [
          "~150 students served",
          "48-hour typical turnaround",
          "<5% regrade rate",
          "100% rubric compliance"
        ],
        technologies: ["Gradescope", "Python", "Jupyter", "Git", "Code Review"]
      },
      {
        title: "Feedback & Standards",
        description: "Provide actionable feedback while ensuring grading consistency",
        metrics: [
          "Detailed feedback on each submission",
          "Edge case documentation",
          "Weekly calibration meetings",
          "Consistent evaluation standards"
        ],
        technologies: ["Technical Writing", "Rubric Design", "Collaboration"]
      }
    ]
  }
];