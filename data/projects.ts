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
  /** Caption above the diagram; defaults to "System architecture". */
  label?: string;
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
    subtitle: "Root-cause analysis for microservice failures",
    category: "Backend Engineering · Distributed Systems · Observability",
    status: "Completed",
    summary:
      "An incident investigation platform that finds where a failure actually started in a chain of services. When one service breaks, every service that depends on it starts failing too. TraceOps follows failed requests through the system using traces, logs and metrics, and points to the one that really broke, with the evidence.",
    stack: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "OpenTelemetry",
      "Prometheus",
      "Grafana Loki",
      "Grafana Tempo",
      "React",
      "TypeScript",
      "Docker",
    ],
    highlights: [
      "Distributed tracing across 3 FastAPI services and PostgreSQL with OpenTelemetry",
      "Prometheus alerts automatically open correlated incidents",
      "Root cause found by tracing each failed request to its first failing step",
      "React/TypeScript dashboard with a guided fault-injection demo",
    ],
    repoUrl: "https://github.com/sanchayi21/TraceOps",
    details: [
      {
        heading: "The problem",
        body: "In a microservice system, one failure shows up everywhere. If the database goes down, Inventory fails, then Orders, then the Gateway. Engineers get several alerts at once and must work out which service is the cause and which are only affected. TraceOps does that automatically.",
      },
      {
        heading: "How it's designed",
        items: [
          "Demo app: Gateway → Orders → Inventory → PostgreSQL, all FastAPI, run with Docker Compose.",
          "Each service is instrumented with OpenTelemetry: one trace ID per request across all services, JSON logs tagged with that trace ID, and Prometheus request/latency metrics.",
          "Prometheus alert rules (high error rate, high latency, service down) go through Alertmanager to a TraceOps webhook.",
          "The investigator queries Prometheus, Tempo and Loki for the incident window and stores a structured report in its own PostgreSQL database.",
          "A React/TypeScript dashboard shows what users experienced, where the failure started, how it spread, and the evidence.",
        ],
      },
      {
        heading: "How a failure is investigated",
        items: [
          "Failed requests: the deepest failing step in each trace is where the problem started.",
          "Slow requests: the step that spent the most time itself (not waiting on others) is the bottleneck.",
          "Cross-check: error logs and metrics from that service must agree.",
          "Confidence: a simple, explainable score, mostly based on how many failed requests point to the same place. The report also lists what it isn't sure about.",
        ],
      },
      {
        heading: "Engineering challenges",
        items: [
          "Wrong service blamed: Orders and Inventory both had 3s timeouts, so during a DB outage Orders gave up first and blamed Inventory. Fixed by nesting timeouts so the service closest to the problem reports first.",
          "Logs not matching traces: Tempo drops leading zeros from some trace IDs, silently breaking log matching for about 1 in 16 requests. Fixed by normalising IDs.",
          "\"Down\" reported as \"slow\": in httpx a connection timeout is a subclass of timeout, so stopped services looked slow. Connection errors are now handled first.",
          "Alert storms: alerts arriving during an open incident are merged into it, so one outage = one incident.",
        ],
      },
      {
        heading: "What it delivers",
        body: "A reproducible demo: start traffic, break something (database offline, slow queries, timeouts, or a stopped service), and within about a minute TraceOps opens an incident naming the root cause. It identified the correct failing component in all 4 scenarios, backed by 38 automated tests.",
      },
    ],
    diagram: {
      title: "TraceOps architecture",
      label: "Architecture",
      summary:
        "A client calls the FastAPI API Gateway, which calls Orders, which calls Inventory, which reads PostgreSQL. Each service sends telemetry through OpenTelemetry: traces to Tempo, logs to Loki and metrics to Prometheus. Prometheus alerts go through Alertmanager to the TraceOps Investigator by webhook. The Investigator queries the evidence, persists an incident report in PostgreSQL, and the React dashboard reads it over REST.",
      width: 760,
      height: 416,
      nodes: [
        { id: "client", label: "Client", sub: "browser / HTTP", x: 0, y: 24, w: 128, h: 68, kind: "external" },
        { id: "gateway", label: "API Gateway", sub: "FastAPI", x: 158, y: 24, w: 128, h: 68, kind: "primary" },
        { id: "orders", label: "Orders", sub: "FastAPI", x: 316, y: 24, w: 128, h: 68, kind: "primary" },
        { id: "inventory", label: "Inventory", sub: "FastAPI", x: 474, y: 24, w: 128, h: 68, kind: "primary" },
        { id: "pg", label: "PostgreSQL", sub: "product stock", x: 632, y: 24, w: 128, h: 68 },
        { id: "otel", label: "OpenTelemetry", sub: "traces · logs · metrics", x: 158, y: 130, w: 444, h: 52, kind: "external" },
        { id: "prom", label: "Prometheus", sub: "metrics · alerts", x: 158, y: 222, w: 128, h: 60 },
        { id: "tempo", label: "Tempo", sub: "traces", x: 316, y: 222, w: 128, h: 60 },
        { id: "loki", label: "Loki", sub: "logs", x: 474, y: 222, w: 128, h: 60 },
        { id: "alertmgr", label: "Alertmanager", sub: "routes alerts", x: 158, y: 340, w: 128, h: 68, kind: "external" },
        { id: "investigator", label: "Investigator", sub: "TraceOps · FastAPI", x: 316, y: 340, w: 128, h: 68, kind: "primary" },
        { id: "incidentdb", label: "Incident DB", sub: "PostgreSQL", x: 474, y: 340, w: 128, h: 68 },
        { id: "dashboard", label: "Dashboard", sub: "React · TypeScript", x: 632, y: 340, w: 128, h: 68 },
      ],
      edges: [
        { id: "r1", from: "client", to: "gateway", points: "128,58 158,58", label: "request", labelX: 143, labelY: 16 },
        { id: "r2", from: "gateway", to: "orders", points: "286,58 316,58" },
        { id: "r3", from: "orders", to: "inventory", points: "444,58 474,58" },
        { id: "r4", from: "inventory", to: "pg", points: "602,58 632,58" },
        { id: "t1", from: "gateway", to: "otel", points: "222,92 222,130", dashed: true, label: "telemetry", labelX: 254, labelY: 116 },
        { id: "t2", from: "orders", to: "otel", points: "380,92 380,130", dashed: true },
        { id: "t3", from: "inventory", to: "otel", points: "538,92 538,130", dashed: true },
        { id: "s1", from: "otel", to: "prom", points: "222,182 222,222" },
        { id: "s2", from: "otel", to: "tempo", points: "380,182 380,222" },
        { id: "s3", from: "otel", to: "loki", points: "538,182 538,222" },
        { id: "a1", from: "prom", to: "alertmgr", points: "222,282 222,340", label: "alert", labelX: 242, labelY: 315 },
        { id: "w1", from: "alertmgr", to: "investigator", points: "286,374 316,374", label: "webhook", labelX: 301, labelY: 333 },
        { id: "q1", from: "investigator", to: "tempo", points: "380,340 380,282", label: "query evidence", labelX: 432, labelY: 315, bidirectional: true },
        { id: "p1", from: "investigator", to: "incidentdb", points: "444,374 474,374", label: "persist", labelX: 459, labelY: 333 },
        { id: "d1", from: "incidentdb", to: "dashboard", points: "602,374 632,374", label: "REST", labelX: 617, labelY: 333, bidirectional: true },
      ],
      steps: [
        {
          title: "Entry",
          description: "A customer request reaches the API Gateway, the single entry point.",
          nodes: ["client", "gateway"],
          edges: ["r1"],
        },
        {
          title: "Service calls",
          description:
            "The Gateway calls Orders, and Orders calls Inventory. One trace ID follows the request through every service.",
          nodes: ["gateway", "orders", "inventory"],
          edges: ["r2", "r3"],
        },
        {
          title: "Data access",
          description:
            "Inventory reads product stock from PostgreSQL. The database call is recorded as its own step in the trace.",
          nodes: ["inventory", "pg"],
          edges: ["r4"],
        },
        {
          title: "Telemetry",
          description:
            "Every service sends traces to Tempo and logs to Loki, and exposes metrics that Prometheus collects.",
          nodes: ["gateway", "orders", "inventory", "otel", "prom", "tempo", "loki"],
          edges: ["t1", "t2", "t3", "s1", "s2", "s3"],
        },
        {
          title: "Alert",
          description:
            "When errors or slow requests cross a limit, Prometheus fires an alert and Alertmanager sends it to TraceOps.",
          nodes: ["prom", "alertmgr", "investigator"],
          edges: ["a1", "w1"],
        },
        {
          title: "Investigation",
          description:
            "TraceOps follows failed requests to the deepest failing step, checks that logs and metrics agree, and saves an incident report shown in the dashboard.",
          nodes: ["investigator", "prom", "tempo", "loki", "incidentdb", "dashboard"],
          edges: ["q1", "p1", "d1"],
        },
      ],
      mobileFlow: [
        { node: "client", connector: "request" },
        { node: "gateway", connector: "calls" },
        { node: "orders", connector: "calls" },
        { node: "inventory", connector: "reads" },
        { node: "pg", connector: "every service sends telemetry" },
        { node: "otel", connector: "traces, logs and metrics" },
        { node: "tempo" },
        { node: "loki" },
        { node: "prom", connector: "alert" },
        { node: "alertmgr", connector: "webhook" },
        { node: "investigator", connector: "persist" },
        { node: "incidentdb", connector: "REST" },
        { node: "dashboard" },
      ],
    },
  },
];
