/**
 * Featured projects. To add a project, append an object to `projects`.
 * The card, technical details and architecture walkthrough all render from this data,
 * so no UI code needs to change. Only add `repoUrl` / `demoUrl` when they are real
 * public links — the buttons are hidden when these are missing.
 */

export type DiagramNode = {
  id: string;
  label: string;
  sub: string;
  /** Position and size inside the diagram's SVG viewBox. */
  x: number;
  y: number;
  w: number;
  h: number;
  /** "planned" renders dashed and muted so it never reads as implemented. */
  kind?: "primary" | "external" | "planned";
};

export type DiagramEdge = {
  id: string;
  from: string;
  to: string;
  /** SVG points "x1,y1 x2,y2 ..." for the connector. */
  points: string;
  label?: string;
  labelX?: number;
  labelY?: number;
  bidirectional?: boolean;
  dashed?: boolean;
  planned?: boolean;
};

export type DiagramStep = {
  title: string;
  description: string;
  nodes: string[];
  edges: string[];
};

export type Diagram = {
  title: string;
  /** Short text alternative describing the whole diagram for screen readers. */
  summary: string;
  width: number;
  height: number;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  steps: DiagramStep[];
  /** Simplified ordered flow used on small screens, where the SVG would be too small to read. */
  mobileFlow: { node: string; connector?: string }[];
};

export type DetailSection = {
  heading: string;
  body?: string;
  items?: string[];
  /** Marks content that is on the roadmap, not implemented. */
  planned?: boolean;
};

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  status?: "In Progress" | "Completed";
  summary: string;
  stack: string[];
  plannedStack?: string[];
  highlights: string[];
  details: DetailSection[];
  diagram: Diagram;
  repoUrl?: string;
  demoUrl?: string;
};

export const projects: Project[] = [
  {
    slug: "pr-risk-assistant",
    title: "AI-Powered PR Risk Assistant",
    subtitle: "Webhook-driven AI code review",
    category: "AI · Backend · Developer Tools",
    status: "Completed",
    summary:
      "A code-review platform that listens to GitHub pull-request events, retrieves the changed code and generates structured findings that flag potential bugs, security risks and missing tests.",
    stack: ["FastAPI", "React", "TypeScript", "PostgreSQL", "Groq LLM", "GitHub REST API", "Docker"],
    highlights: [
      "GitHub webhook ingestion with duplicate-event detection",
      "Changed code retrieved through the GitHub REST API",
      "LLM analysis returned as structured, reviewable findings",
      "React/TypeScript dashboard for reviewing results",
    ],
    repoUrl: "https://github.com/sanchayi21/pr-risk-assistant",
    demoUrl: "https://pr-risk-assistant.vercel.app",
    details: [
      {
        heading: "The problem",
        body: "Reviewers have limited time, and risky changes — subtle bugs, security issues, untested code paths — can slip through busy pull-request queues. The assistant gives every pull request an automated first pass so reviewers know where to look.",
      },
      {
        heading: "How it's designed",
        items: [
          "GitHub sends pull-request events to a FastAPI webhook endpoint; requests are validated before any work starts.",
          "The backend retrieves the pull request's changed code through the GitHub REST API.",
          "The diff is analysed with a Groq-hosted LLM that returns structured findings rather than free-form text.",
          "Events and findings are persisted in PostgreSQL and served to a React/TypeScript dashboard.",
          "Services are containerized with Docker.",
        ],
      },
      {
        heading: "Engineering challenges",
        items: [
          "Duplicate deliveries — webhook events are checked against stored events so the same pull request isn't analysed twice.",
          "Slow external calls — GitHub and LLM requests run through asynchronous handlers so the API stays responsive.",
          "Unreliable model output — analysis is requested in a structured format so findings can be stored and displayed consistently.",
          "Debuggability — request validation and structured logging make each webhook's path through the system traceable.",
        ],
      },
      {
        heading: "What it delivers",
        body: "An end-to-end pipeline from pull-request event to categorized findings — potential bugs, security risks and missing tests — that reviewers can browse in a dashboard.",
      },
    ],
    diagram: {
      title: "PR Risk Assistant architecture",
      summary:
        "A GitHub pull request triggers a webhook to the FastAPI backend. The backend checks PostgreSQL for duplicate events, fetches the code diff from the GitHub REST API, sends it to the Groq LLM for analysis, and stores the findings in PostgreSQL. The React dashboard reads findings through the backend API.",
      width: 760,
      height: 340,
      nodes: [
        { id: "pr", label: "GitHub Pull Request", sub: "PR event", x: 0, y: 142, w: 184, h: 56, kind: "external" },
        { id: "api", label: "FastAPI Backend", sub: "async API · dedupe", x: 296, y: 130, w: 184, h: 80, kind: "primary" },
        { id: "gh", label: "GitHub REST API", sub: "changed files & diff", x: 296, y: 16, w: 184, h: 56, kind: "external" },
        { id: "llm", label: "Groq LLM", sub: "structured analysis", x: 584, y: 56, w: 160, h: 56, kind: "external" },
        { id: "db", label: "PostgreSQL", sub: "events · findings", x: 584, y: 228, w: 160, h: 56 },
        { id: "ui", label: "React Dashboard", sub: "TypeScript review UI", x: 296, y: 268, w: 184, h: 56 },
      ],
      edges: [
        { id: "e-webhook", from: "pr", to: "api", points: "184,170 296,170", label: "webhook", labelX: 240, labelY: 160 },
        { id: "e-diff", from: "api", to: "gh", points: "388,130 388,72", label: "fetch diff", labelX: 430, labelY: 105, bidirectional: true },
        { id: "e-llm", from: "api", to: "llm", points: "480,150 584,90", label: "analyze", labelX: 512, labelY: 110, bidirectional: true },
        { id: "e-db", from: "api", to: "db", points: "480,190 584,250", label: "persist", labelX: 512, labelY: 236, bidirectional: true },
        { id: "e-ui", from: "ui", to: "api", points: "388,268 388,210", label: "REST", labelX: 414, labelY: 243, bidirectional: true },
      ],
      steps: [
        {
          title: "Ingest",
          description:
            "GitHub delivers a pull-request event to the FastAPI webhook. The request is validated and checked against stored events in PostgreSQL so duplicate deliveries are skipped.",
          nodes: ["pr", "api", "db"],
          edges: ["e-webhook", "e-db"],
        },
        {
          title: "Retrieve",
          description: "The backend calls the GitHub REST API asynchronously to fetch the pull request's changed code.",
          nodes: ["api", "gh"],
          edges: ["e-diff"],
        },
        {
          title: "Analyze",
          description:
            "The diff is sent to a Groq-hosted LLM, which returns structured findings: potential bugs, security risks and missing tests.",
          nodes: ["api", "llm"],
          edges: ["e-llm"],
        },
        {
          title: "Persist",
          description: "Findings are written to PostgreSQL alongside the originating event.",
          nodes: ["api", "db"],
          edges: ["e-db"],
        },
        {
          title: "Review",
          description: "The React/TypeScript dashboard loads findings through the backend's REST API for reviewers.",
          nodes: ["ui", "api"],
          edges: ["e-ui"],
        },
      ],
      mobileFlow: [
        { node: "pr", connector: "webhook" },
        { node: "api", connector: "fetch changed code" },
        { node: "gh", connector: "diff sent for analysis" },
        { node: "llm", connector: "findings persisted" },
        { node: "db", connector: "served via backend REST API" },
        { node: "ui" },
      ],
    },
  },
  {
    slug: "traceops",
    title: "TraceOps",
    subtitle: "Distributed Incident Investigation Platform",
    category: "Backend Engineering · Distributed Systems · Observability",
    status: "In Progress",
    summary:
      "Building a microservices-based platform for investigating API failures, service outages and performance issues, with planned distributed tracing and observability capabilities.",
    stack: ["Python", "FastAPI", "PostgreSQL", "Docker", "REST APIs", "Microservices"],
    plannedStack: ["OpenTelemetry", "Prometheus", "React"],
    highlights: [
      "Multi-service FastAPI architecture with independent services",
      "Service-to-service HTTP calls with downstream failure handling",
      "PostgreSQL via Docker Compose with persistent storage",
      "Designed for upcoming tracing and incident investigation",
    ],
    details: [
      {
        heading: "The problem",
        body: "When a request fails in a distributed system, the cause is often several services away from the symptom. TraceOps aims to bring operational evidence from interconnected services together so developers can see where a failure started and how it propagated.",
      },
      {
        heading: "Implemented architecture",
        items: [
          "API Gateway — the central entry point that routes requests to downstream services.",
          "Orders Service — handles order requests and calls the Inventory service.",
          "Inventory Service — reads product information from PostgreSQL.",
          "PostgreSQL — persistent product and inventory data, run with Docker Compose and a persistent volume.",
        ],
      },
      {
        heading: "How a request flows",
        body: "A client calls the API Gateway, which routes the request to the Orders service. Orders makes an HTTP call to Inventory, which queries PostgreSQL and returns a database-backed response that travels back up the chain.",
      },
      {
        heading: "Persistence",
        body: "The Inventory service uses parameterized SQL queries and environment-based database configuration; credentials are supplied through the environment rather than hard-coded.",
      },
      {
        heading: "Downstream failure handling",
        body: "Each calling service handles errors from the service below it and propagates an appropriate HTTP status code, so a failure deep in the chain surfaces to the client with a meaningful status instead of a generic error.",
      },
      {
        heading: "Roadmap — not yet implemented",
        planned: true,
        items: [
          "OpenTelemetry-based distributed tracing",
          "Prometheus metrics collection",
          "Request latency and failure monitoring",
          "Cross-service investigation using logs, metrics and traces",
          "A React dashboard for investigating incidents",
          "Evidence-based root-cause summaries",
          "Potential AI-assisted incident explanations",
        ],
      },
    ],
    diagram: {
      title: "TraceOps current architecture",
      summary:
        "Implemented: a browser or client calls the FastAPI API Gateway, which routes to the Orders service, which calls the Inventory service, which queries PostgreSQL. Errors propagate back up the chain as HTTP status codes. Planned, not implemented: an observability layer with OpenTelemetry tracing, Prometheus metrics and a React investigation dashboard.",
      width: 760,
      height: 300,
      nodes: [
        { id: "client", label: "Client", sub: "browser / HTTP", x: 0, y: 40, w: 128, h: 72, kind: "external" },
        { id: "gateway", label: "API Gateway", sub: "FastAPI · routing", x: 158, y: 40, w: 128, h: 72, kind: "primary" },
        { id: "orders", label: "Orders", sub: "FastAPI service", x: 316, y: 40, w: 128, h: 72, kind: "primary" },
        { id: "inventory", label: "Inventory", sub: "FastAPI service", x: 474, y: 40, w: 128, h: 72, kind: "primary" },
        { id: "pg", label: "PostgreSQL", sub: "Docker Compose", x: 632, y: 40, w: 128, h: 72 },
        { id: "obs", label: "Observability layer", sub: "OpenTelemetry tracing · Prometheus metrics · React UI", x: 158, y: 200, w: 444, h: 72, kind: "planned" },
      ],
      edges: [
        { id: "r1", from: "client", to: "gateway", points: "128,66 158,66" },
        { id: "r2", from: "gateway", to: "orders", points: "286,66 316,66" },
        { id: "r3", from: "orders", to: "inventory", points: "444,66 474,66" },
        { id: "r4", from: "inventory", to: "pg", points: "602,66 632,66" },
        { id: "b4", from: "pg", to: "inventory", points: "632,90 602,90", dashed: true },
        { id: "b3", from: "inventory", to: "orders", points: "474,90 444,90", dashed: true },
        { id: "b2", from: "orders", to: "gateway", points: "316,90 286,90", dashed: true },
        { id: "b1", from: "gateway", to: "client", points: "158,90 128,90", dashed: true },
        { id: "o1", from: "gateway", to: "obs", points: "222,112 222,200", planned: true },
        { id: "o2", from: "orders", to: "obs", points: "380,112 380,200", planned: true },
        { id: "o3", from: "inventory", to: "obs", points: "538,112 538,200", planned: true },
      ],
      steps: [
        {
          title: "Entry",
          description: "A client request reaches the API Gateway, the single entry point that routes to downstream services.",
          nodes: ["client", "gateway"],
          edges: ["r1"],
        },
        {
          title: "Service call",
          description: "The gateway routes to the Orders service, which calls the Inventory service over HTTP.",
          nodes: ["gateway", "orders", "inventory"],
          edges: ["r2", "r3"],
        },
        {
          title: "Data access",
          description:
            "Inventory queries PostgreSQL with parameterized SQL using environment-based configuration, then returns a database-backed response.",
          nodes: ["inventory", "pg"],
          edges: ["r4", "b4"],
        },
        {
          title: "Failure path",
          description:
            "If a downstream service fails, the caller handles the error and propagates an appropriate HTTP status code back up the chain to the client.",
          nodes: ["inventory", "orders", "gateway", "client"],
          edges: ["b3", "b2", "b1"],
        },
        {
          title: "Planned",
          description:
            "Roadmap, not implemented: instrument each service with OpenTelemetry traces and Prometheus metrics, feeding a React dashboard for incident investigation.",
          nodes: ["obs"],
          edges: ["o1", "o2", "o3"],
        },
      ],
      mobileFlow: [
        { node: "client", connector: "HTTP request" },
        { node: "gateway", connector: "routes to" },
        { node: "orders", connector: "HTTP call" },
        { node: "inventory", connector: "parameterized SQL" },
        { node: "pg" },
      ],
    },
  },
];
