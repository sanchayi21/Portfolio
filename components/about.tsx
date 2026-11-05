import type { CSSProperties } from "react";
import { impactMetrics } from "@/data/site";
import { Section, SectionHeading } from "./ui";

export function About() {
  return (
    <Section id="about" aria-labelledby="about-title" className="border-t border-line">
      <div className="grid gap-4 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <SectionHeading id="about-title" eyebrow="About" title="Engineering that holds up in production." />
        <div className="space-y-5 text-base leading-relaxed text-muted sm:text-lg lg:pt-9" data-reveal>
          <p>
            I&apos;m a software engineer who works across the stack — React and TypeScript interfaces, Node.js and FastAPI
            services, and the PostgreSQL and Redis layers underneath them. At Nexamuse I shipped product features for
            thousands of active users; as a graduate researcher at UT Arlington I built the data pipelines and inference
            endpoints a research platform runs on.
          </p>
          <p>
            I care about the parts users never see but always feel: query performance, caching, idempotent APIs, and tests
            that catch regressions before release. That extends to AI-enabled systems — integrating LLMs and Hugging Face
            models into backends with the same validation and reliability standards as any other service.
          </p>
          <p>I completed my M.S. in Computer Science at the University of Texas at Arlington in May 2026.</p>
        </div>
      </div>

      <ul className="mt-14 grid gap-4 sm:grid-cols-3 sm:gap-5" aria-label="Engineering impact">
        {impactMetrics.map((m, i) => (
          <li
            key={m.value}
            data-reveal
            style={{ "--reveal-delay": i } as CSSProperties}
            className="rounded-2xl border border-line bg-card p-7 shadow-card"
          >
            <p className="font-display text-5xl font-extrabold tracking-[-0.04em] text-ink">{m.value}</p>
            <p className="mt-4 text-sm font-semibold text-ink">{m.label}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{m.context}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
