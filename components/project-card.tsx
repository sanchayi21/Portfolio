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
      className="overflow-hidden rounded-3xl border border-line bg-card shadow-card transition-[box-shadow,translate,border-color] duration-300 hover:-translate-y-1 hover:border-[#c9d4f7] hover:shadow-[0_1px_2px_rgb(20_38_61/0.04),0_20px_40px_-16px_rgb(53_99_233/0.25)] motion-reduce:hover:translate-y-0"
    >
      <div className="grid lg:grid-cols-[1fr_1.4fr]">
        {/* Overview */}
        <div className="flex flex-col p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-medium text-muted">
            <span className="font-display font-bold tabular-nums text-accent">{String(index + 1).padStart(2, "0")}</span>
            <span aria-hidden="true" className="h-3 w-px bg-line-strong" />
            <span>{project.category}</span>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
            <h3 id={titleId} className="text-2xl font-bold text-ink sm:text-[1.75rem]">
              {project.title}
            </h3>
            <StatusPill project={project} />
          </div>
          <p className="mt-1 font-display text-base font-semibold text-muted">{project.subtitle}</p>

          <p className="mt-4 text-[0.95rem] leading-relaxed text-muted">{project.summary}</p>

          <ul className="mt-4 space-y-1.5">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-2.5 text-sm leading-relaxed text-ink/85">
                <span aria-hidden="true" className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[linear-gradient(135deg,#3563e9,#6d4ae8)]" />
                {h}
              </li>
            ))}
          </ul>

          <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technology stack">
            {project.stack.map((t) => (
              <li key={t}>
                <Badge>{t}</Badge>
              </li>
            ))}
          </ul>
          {project.plannedStack?.length ? (
            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-medium text-muted">Planned:</span>
              <ul className="flex flex-wrap gap-1.5" aria-label="Planned technologies">
                {project.plannedStack.map((t) => (
                  <li key={t}>
                    <Badge tone="planned">{t}</Badge>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

        </div>

        {/* Architecture visual: an illustration of the design, not a screenshot. */}
        <div
          className={`flex flex-col justify-center border-line bg-tint bg-[radial-gradient(#dde3ee_1px,transparent_1px)] bg-[size:18px_18px] px-4 sm:px-8 lg:border-l lg:px-5 lg:py-8 ${
            archOpen ? "border-t py-6" : "py-0 md:border-t md:py-6 lg:border-t-0"
          }`}
        >
          <p
            className={`mb-4 items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted md:flex ${
              archOpen ? "flex" : "hidden"
            }`}
          >
            <Network className="h-3.5 w-3.5" aria-hidden="true" />
            {diagram.label ?? (project.status === "In Progress" ? "Current architecture" : "System architecture")} · diagram
          </p>
          <ArchitectureDiagram diagram={diagram} activeStep={archOpen ? step : null} idPrefix={uid} showMobile={archOpen} />

          <div id={archPanelId} hidden={!archOpen} className="mt-6">
            <p className="mb-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-subtle" id={`${uid}-steps-label`}>
              Walk through the flow
            </p>
            <div role="group" aria-labelledby={`${uid}-steps-label`} className="flex flex-wrap gap-1.5">
              {diagram.steps.map((s, i) => (
                <button
                  key={s.title}
                  type="button"
                  aria-pressed={step === i}
                  onClick={() => setStep(i)}
                  className={`inline-flex min-h-9 items-center gap-1.5 rounded-full border px-3 text-[0.8rem] font-medium transition-colors ${
                    step === i
                      ? "border-transparent bg-[linear-gradient(135deg,#3563e9,#5b4be0)] text-white"
                      : "border-line-strong bg-card text-ink hover:border-accent/50"
                  }`}
                >
                  <span className="tabular-nums opacity-70">{i + 1}</span>
                  {s.title}
                </button>
              ))}
            </div>
            <p aria-live="polite" className="mt-3 rounded-xl border border-line bg-card p-3.5 text-sm leading-relaxed text-ink/85">
              <span className="font-semibold text-ink">{diagram.steps[step]?.title}. </span>
              {diagram.steps[step]?.description}
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-2 border-t border-line px-6 py-4 sm:px-8">
        {project.demoUrl ? (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${buttonStyles.primary} min-h-10`}
            aria-label={`${project.title} live demo (opens in a new tab)`}
          >
            Live Demo
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        ) : null}
        {project.repoUrl ? (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${buttonStyles.secondary} min-h-10`}
            aria-label={`${project.title} source code on GitHub (opens in a new tab)`}
          >
            <GitHubIcon />
            Code
          </a>
        ) : null}
        <DisclosureButton open={archOpen} controls={archPanelId} onToggle={() => setArchOpen((v) => !v)}>
          <Network className="h-4 w-4" aria-hidden="true" />
          View Architecture
        </DisclosureButton>
        <DisclosureButton open={detailsOpen} controls={detailsPanelId} onToggle={() => setDetailsOpen((v) => !v)}>
          <ScrollText className="h-4 w-4" aria-hidden="true" />
          Technical Details
        </DisclosureButton>
      </div>

      {/* Technical details */}
      <div
        id={detailsPanelId}
        inert={!detailsOpen}
        className={`grid transition-[grid-template-rows] duration-500 ease-out ${detailsOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <div className="grid gap-x-12 gap-y-7 border-t border-line px-6 py-8 sm:px-8 md:grid-cols-2">
            {project.details.map((d) => (
              <section
                key={d.heading}
                className={d.planned ? "rounded-2xl border border-dashed border-[#E3CB9B] bg-amber-soft/50 p-5 md:col-span-2" : ""}
              >
                <h4 className="text-base font-bold text-ink">{d.heading}</h4>
                {d.body ? <p className="mt-2 text-sm leading-relaxed text-muted">{d.body}</p> : null}
                {d.items ? (
                  <ul className={`mt-3 ${d.planned ? "grid gap-x-8 gap-y-2 sm:grid-cols-2" : "space-y-2"}`}>
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

function StatusPill({ project }: { project: Project }) {
  if (project.status === "In Progress") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-[#EBD3A6] bg-amber-soft px-2.5 py-0.5 text-xs font-semibold text-amber">
        <span aria-hidden="true" className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-[#D08A1E]" />
        In Progress
      </span>
    );
  }
  const label = project.demoUrl ? "Live" : project.status === "Completed" ? "Completed" : null;
  if (!label) return null;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#B7E4C7] bg-[#EEFAF2] px-2.5 py-0.5 text-xs font-semibold text-[#1F7A45]">
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#2FA864]" />
      {label}
    </span>
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
      className={`${buttonStyles.ghost} min-h-10 gap-1.5 border border-transparent ${open ? "border-accent/30 bg-accent-soft text-accent-strong" : ""}`}
    >
      {children}
      <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`} aria-hidden="true" />
    </button>
  );
}
