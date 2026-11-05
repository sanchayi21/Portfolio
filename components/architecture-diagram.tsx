import { ArrowDown } from "lucide-react";
import type { Diagram, DiagramEdge, DiagramNode } from "@/data/projects";

type Props = {
  diagram: Diagram;
  /** Index into diagram.steps; null shows the whole system without emphasis. */
  activeStep: number | null;
  idPrefix: string;
};

/**
 * Renders a project's architecture from data: a scalable SVG on tablet/desktop and an
 * ordered, readable flow on phones, where an SVG would shrink below legible text size.
 */
export function ArchitectureDiagram({ diagram, activeStep, idPrefix }: Props) {
  const step = activeStep === null ? null : diagram.steps[activeStep];
  const nodeOn = (id: string) => !step || step.nodes.includes(id);
  const edgeOn = (id: string) => !step || step.edges.includes(id);
  const nodeById = new Map(diagram.nodes.map((n) => [n.id, n]));
  const markerId = `${idPrefix}-arrow`;
  const markerActiveId = `${idPrefix}-arrow-active`;

  return (
    <figure className="m-0">
      <svg
        viewBox={`0 0 ${diagram.width} ${diagram.height}`}
        role="img"
        aria-labelledby={`${idPrefix}-title ${idPrefix}-desc`}
        className="mx-auto hidden h-auto w-full max-w-[880px] md:block"
      >
        <title id={`${idPrefix}-title`}>{diagram.title}</title>
        <desc id={`${idPrefix}-desc`}>{diagram.summary}</desc>
        <defs>
          <marker id={markerId} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 1 L9 5 L0 9 z" fill="#9AA6B6" />
          </marker>
          <marker id={markerActiveId} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 1 L9 5 L0 9 z" fill="#3563E9" />
          </marker>
        </defs>

        {diagram.edges.map((edge) => (
          <Edge
            key={edge.id}
            edge={edge}
            on={edgeOn(edge.id)}
            emphasized={step !== null && edgeOn(edge.id)}
            marker={step !== null && edgeOn(edge.id) ? markerActiveId : markerId}
          />
        ))}

        {diagram.nodes.map((node) => (
          <Node key={node.id} node={node} on={nodeOn(node.id)} emphasized={step !== null && nodeOn(node.id)} />
        ))}
      </svg>

      {/* Phone layout: the same system as an ordered flow. */}
      <ol className="space-y-0 md:hidden" aria-label={diagram.title}>
        {diagram.mobileFlow.map((item) => {
          const node = nodeById.get(item.node);
          if (!node) return null;
          return (
            <li key={item.node}>
              <MobileNode node={node} on={nodeOn(node.id)} emphasized={step !== null && nodeOn(node.id)} />
              {item.connector ? (
                <div className="flex items-center gap-2 py-1.5 pl-5 text-xs text-muted">
                  <ArrowDown className="h-3.5 w-3.5 text-subtle" aria-hidden="true" />
                  <span>{item.connector}</span>
                </div>
              ) : null}
            </li>
          );
        })}
      </ol>
      {diagram.nodes
        .filter((n) => n.kind === "planned" && !diagram.mobileFlow.some((f) => f.node === n.id))
        .map((n) => (
          <div key={n.id} className="mt-4 md:hidden">
            <MobileNode node={n} on={nodeOn(n.id)} emphasized={step !== null && nodeOn(n.id)} />
          </div>
        ))}
    </figure>
  );
}

function Edge({ edge, on, emphasized, marker }: { edge: DiagramEdge; on: boolean; emphasized: boolean; marker: string }) {
  const stroke = emphasized ? "#3563E9" : edge.planned ? "#B9C2CF" : "#9AA6B6";
  const dash = edge.planned ? "2 5" : edge.dashed || emphasized ? "4 4" : undefined;
  return (
    <g style={{ opacity: on ? 1 : 0.25, transition: "opacity 300ms" }}>
      <polyline
        points={edge.points}
        fill="none"
        stroke={stroke}
        strokeWidth={emphasized ? 2 : 1.5}
        strokeDasharray={dash}
        strokeLinecap="round"
        markerEnd={edge.planned ? undefined : `url(#${marker})`}
        markerStart={edge.bidirectional ? `url(#${marker})` : undefined}
        className={emphasized ? "animate-flow motion-reduce:animate-none" : undefined}
      />
      {edge.label && edge.labelX !== undefined && edge.labelY !== undefined ? (
        <text
          x={edge.labelX}
          y={edge.labelY}
          textAnchor="middle"
          fontSize="11"
          fontFamily="var(--font-inter), sans-serif"
          fill={emphasized ? "#2A50C4" : "#56657A"}
          fontWeight={emphasized ? 600 : 500}
        >
          {edge.label}
        </text>
      ) : null}
    </g>
  );
}

function Node({ node, on, emphasized }: { node: DiagramNode; on: boolean; emphasized: boolean }) {
  const planned = node.kind === "planned";
  const primary = node.kind === "primary";
  const fill = planned ? "#FAFAF8" : "#FFFFFF";
  const stroke = emphasized ? "#3563E9" : planned ? "#B9C2CF" : primary ? "#C7D3F5" : "#D5DBE4";
  const cx = node.x + node.w / 2;
  return (
    <g style={{ opacity: on ? 1 : 0.3, transition: "opacity 300ms" }}>
      <rect
        x={node.x + 0.75}
        y={node.y + 0.75}
        width={node.w - 1.5}
        height={node.h - 1.5}
        rx="12"
        fill={emphasized ? "#F5F8FF" : fill}
        stroke={stroke}
        strokeWidth={emphasized ? 2 : 1.5}
        strokeDasharray={planned ? "5 4" : undefined}
      />
      {primary ? <rect x={node.x + 14} y={node.y + 12} width="16" height="3" rx="1.5" fill="#3563E9" /> : null}
      {planned ? (
        <g>
          <rect x={node.x + 12} y={node.y - 11} width="62" height="20" rx="10" fill="#FDF4E3" stroke="#E9C98C" />
          <text x={node.x + 43} y={node.y + 3} textAnchor="middle" fontSize="10" fontWeight="700" fill="#8A5200" letterSpacing="0.08em">
            PLANNED
          </text>
        </g>
      ) : null}
      <text
        x={cx}
        y={node.y + node.h / 2 - 2}
        textAnchor="middle"
        fontSize="13.5"
        fontWeight="700"
        fontFamily="var(--font-manrope), sans-serif"
        fill={planned ? "#56657A" : "#14263D"}
      >
        {node.label}
      </text>
      <text
        x={cx}
        y={node.y + node.h / 2 + 15}
        textAnchor="middle"
        fontSize="11"
        fontFamily="var(--font-inter), sans-serif"
        fill="#56657A"
      >
        {node.sub}
      </text>
    </g>
  );
}

function MobileNode({ node, on, emphasized }: { node: DiagramNode; on: boolean; emphasized: boolean }) {
  const planned = node.kind === "planned";
  return (
    <div
      className={`rounded-xl border px-4 py-3 transition-all duration-300 ${
        planned ? "border-dashed border-line-strong bg-canvas" : "bg-card"
      } ${emphasized ? "border-accent bg-accent-soft/60" : planned ? "" : "border-line-strong"} ${on ? "" : "opacity-40"}`}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="font-display text-sm font-bold text-ink">{node.label}</p>
        {planned ? (
          <span className="rounded-full border border-[#E9C98C] bg-amber-soft px-2 py-0.5 text-[0.65rem] font-bold tracking-wider text-amber">
            PLANNED
          </span>
        ) : null}
      </div>
      <p className="mt-0.5 text-xs text-muted">{node.sub}</p>
    </div>
  );
}
