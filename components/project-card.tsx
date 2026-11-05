"use client";

import { ArrowUpRight, ChevronDown, Network, ScrollText } from "lucide-react";
import { useId, useState, type ReactNode } from "react";
import type { Project } from "@/data/projects";
import { ArchitectureDiagram } from "./architecture-diagram";
import { Badge, GitHubIcon, buttonStyles } from "./ui";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [archOpen, setArchOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const uid = useId().replace(/:/g, "");
  const archPanelId = `${uid}-arch`;
  const detailsPanelId = `${uid}-details`;
  const titleId = `${uid}-title`;
  const { diagram } = project;

  return (
    <article
      aria-labelledby={titleId}
      className="group overflow-hidden rounded-3xl border border-line bg-card shadow-card transition-[box-shadow,transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-lift motion-reduce:hover:translate-y-0"
    >
      {/* Overview */}
      <div className="p-6 sm:p-10">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-medium text-muted">
          <span className="font-display font-bold text-subtle tabular-nums">{String(index + 1).padStart(2, "0")}</span>
          <span aria-hidden="true" className="h-3 w-px bg-line-strong" />
          <span>{project.category}</span>
          {project.status === "In Progress" ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#EBD3A6] bg-amber-soft px-2.5 py-0.5 font-semibold text-amber">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#D08A1E]" />
              In Progress
            </span>
          ) : null}
        </div>

        <h3 id={titleId} className="mt-4 text-2xl font-bold text-ink sm:text-[2rem]">
          {project.title}
        </h3>
        <p className="mt-1 font-display text-base font-semibold text-muted sm:text-lg">{project.subtitle}</p>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
          <div>
            <p className="text-base leading-relaxed text-muted">{project.summary}</p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technology stack">
              {project.stack.map((t) => (
                <li key={t}>
                  <Badge>{t}</Badge>
                </li>
              ))}
            </ul>
            {project.plannedStack?.length ? (
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="text-xs font-medium text-muted">Planned:</span>
                <ul className="flex flex-wrap gap-2" aria-label="Planned technologies">
                  {project.plannedStack.map((t) => (
                    <li key={t}>
                      <Badge tone="planned">{t}</Badge>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-subtle">Key features</p>
            <ul className="mt-3 space-y-2.5">
              {project.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-sm leading-relaxed text-ink/85">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Architecture visual — an illustration drawn from the design, not a screenshot. */}
      <div className="relative border-y border-line bg-canvas bg-[radial-gradient(#dfe4ec_1px,transparent_1px)] bg-[size:18px_18px] px-4 py-8 sm:px-10 sm:py-10">
        <p className="mb-6 flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted">
          <Network className="h-3.5 w-3.5" aria-hidden="true" />
          {project.status === "In Progress" ? "Current architecture" : "System architecture"} · diagram
        </p>
        <ArchitectureDiagram diagram={diagram} activeStep={archOpen ? step : null} idPrefix={uid} />

        <div id={archPanelId} hidden={!archOpen} className="mt-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-subtle" id={`${uid}-steps-label`}>
            Walk through the flow
          </p>
          <div role="group" aria-labelledby={`${uid}-steps-label`} className="flex flex-wrap gap-2">
            {diagram.steps.map((s, i) => (
              <button
                key={s.title}
                type="button"
                aria-pressed={step === i}
                onClick={() => setStep(i)}
                className={`inline-flex min-h-10 items-center gap-2 rounded-full border px-3.5 text-sm font-medium transition-colors ${
                  step === i
                    ? "border-accent bg-accent text-white"
                    : "border-line-strong bg-card text-ink hover:border-ink/30"
                }`}
              >
                <span className="tabular-nums opacity-70">{i + 1}</span>
                {s.title}
              </button>
            ))}
          </div>
          <p aria-live="polite" className="mt-4 max-w-3xl rounded-xl border border-line bg-card p-4 text-sm leading-relaxed text-ink/85">
            <span className="font-semibold text-ink">{diagram.steps[step]?.title}. </span>
            {diagram.steps[step]?.description}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-2 px-6 py-5 sm:px-10">
        <DisclosureButton open={archOpen} controls={archPanelId} onToggle={() => setArchOpen((v) => !v)}>
          <Network className="h-4 w-4" aria-hidden="true" />
          View Architecture
        </DisclosureButton>
        <DisclosureButton open={detailsOpen} controls={detailsPanelId} onToggle={() => setDetailsOpen((v) => !v)}>
          <ScrollText className="h-4 w-4" aria-hidden="true" />
          Technical Details
        </DisclosureButton>
        {project.repoUrl ? (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonStyles.ghost}
            aria-label={`${project.title} source code on GitHub (opens in a new tab)`}
          >
            <GitHubIcon />
            Code
          </a>
        ) : null}
        {project.demoUrl ? (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonStyles.ghost}
            aria-label={`${project.title} live demo (opens in a new tab)`}
          >
            Live demo
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        ) : null}
      </div>

      {/* Technical details */}
      <div
        id={detailsPanelId}
        inert={!detailsOpen}
        className={`grid transition-[grid-template-rows] duration-500 ease-out ${detailsOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <div className="grid gap-x-12 gap-y-8 border-t border-line px-6 py-8 sm:px-10 sm:py-10 md:grid-cols-2">
            {project.details.map((d) => (
              <section
                key={d.heading}
                className={d.planned ? "rounded-2xl border border-dashed border-[#E3CB9B] bg-amber-soft/50 p-5 md:col-span-2" : ""}
              >
                <h4 className="flex items-center gap-2 text-base font-bold text-ink">
                  {d.heading}
                </h4>
                {d.body ? <p className="mt-2 text-sm leading-relaxed text-muted">{d.body}</p> : null}
                {d.items ? (
                  <ul className={`mt-3 space-y-2 ${d.planned ? "grid gap-x-8 space-y-0 gap-y-2 sm:grid-cols-2" : ""}`}>
                    {d.items.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted">
                        <span
                          aria-hidden="true"
                          className={`mt-[0.55rem] h-1 w-1 shrink-0 rounded-full ${d.planned ? "bg-[#C9922F]" : "bg-ink/40"}`}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

function DisclosureButton({
  open,
  controls,
  onToggle,
  children,
}: {
  open: boolean;
  controls: string;
  onToggle: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-expanded={open}
      aria-controls={controls}
      onClick={onToggle}
      className={`${buttonStyles.secondary} min-h-10 ${open ? "border-accent/40 text-accent-strong" : ""}`}
    >
      {children}
      <ChevronDown
        className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        aria-hidden="true"
      />
    </button>
  );
}
