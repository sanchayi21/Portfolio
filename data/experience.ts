export type Experience = {
  role: string;
  organization: string;
  location?: string;
  start: string;
  end: string;
  /** Optional headline result shown as a highlighted chip. */
  highlight?: string;
  achievements: string[];
  tech: string[];
};

export const experience: Experience[] = [
  {
    role: "Graduate Research Assistant",
    organization: "University of Texas at Arlington",
    start: "Aug 2025",
    end: "May 2026",
    highlight: "60% less manual data preparation",
    achievements: [
      "Built a React and FastAPI research platform that brings together research pipeline monitoring, dataset processing and model predictions.",
      "Developed Python/PostgreSQL ingestion and validation pipelines across 5+ data sources, reducing manual data preparation by 60%.",
      "Integrated a Hugging Face classification model into asynchronous FastAPI inference endpoints with Pydantic validation, reaching 88% held-out accuracy.",
    ],
    tech: ["React", "FastAPI", "Python", "PostgreSQL", "Hugging Face", "Pydantic"],
  },
  {
    role: "Full-Stack Software Engineer",
    organization: "Nexamuse",
    start: "Aug 2023",
    end: "Jul 2024",
    highlight: "40% faster average API response",
    achievements: [
      "Built onboarding, content delivery and progress-tracking features for 5,000+ active users across web and mobile.",
      "Reduced average API response time by 40% through SQL JOIN optimization and Redis caching.",
      "Built reusable React/TypeScript components and managed centralized state with Redux.",
      "Implemented JWT access/refresh-token authentication.",
      "Raised Jest unit and integration test coverage from 40% to 65%.",
    ],
    tech: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "Redis", "Redux", "JWT", "Jest"],
  },
  {
    role: "Software Engineering Intern",
    organization: "ACV Incorporation",
    start: "Jan 2023",
    end: "Jul 2023",
    highlight: "70%+ test coverage on payment flows",
    achievements: [
      "Built Node.js and MySQL APIs for billing and transaction workflows.",
      "Implemented request validation and idempotency safeguards.",
      "Increased test coverage for payment and refund workflows to 70%+.",
      "Resolved stale order-status issues caused by cache invalidation.",
      "Standardized development and staging environments with Docker Compose.",
    ],
    tech: ["Node.js", "MySQL", "Docker Compose"],
  },
];
