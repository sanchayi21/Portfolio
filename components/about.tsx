import type { CSSProperties } from "react";
import { impactMetrics } from "@/data/site";
import { CountUp } from "./count-up";
import { Section, SectionHeading } from "./ui";

export function About() {
  return (
    <Section id="about" aria-labelledby="about-title" className="border-t border-line">
      <div className="grid gap-2 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <SectionHeading id="about-title" eyebrow="About" title="I build software that performs in production." />
        <div className="space-y-4 text-base leading-relaxed text-muted sm:text-[1.05rem] lg:pt-8" data-reveal>
          <p>
            I&apos;m a full stack engineer who owns features end to end: React and TypeScript interfaces, Node.js and
            FastAPI services, and the PostgreSQL and Redis layers that keep them fast. At Nexamuse, I shipped product
            features for <strong className="font-semibold text-ink">5,000+ active users</strong> and cut average API
            response time by <strong className="font-semibold text-ink">40%</strong>.
          </p>
          <p>
            At UT Arlington, I built the data pipelines and asynchronous inference endpoints behind a research platform,
            eliminating <strong className="font-semibold text-ink">60%</strong> of manual data preparation. I hold AI
            systems to the same standard as any backend: strict validation, reliable APIs and tests that catch
            regressions before users do.
          </p>
          <p>I earned my M.S. in Computer Science from the University of Texas at Arlington in May 2026.</p>
        </div>
      </div>

      <ul className="mt-10 grid gap-4 sm:grid-cols-3 sm:gap-5" aria-label="Engineering impact">
        {impactMetrics.map((m, i) => (
          <li
            key={m.value}
            data-reveal
            style={{ "--reveal-delay": i } as CSSProperties}
            className="relative overflow-hidden rounded-2xl border border-line bg-card p-6 shadow-card"
          >
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#3563e9,#6d4ae8)]" />
            <p className="font-display text-5xl font-extrabold tracking-[-0.04em] text-ink">
              <CountUp value={m.value} />
            </p>
            <p className="mt-3 text-sm font-semibold text-ink">{m.label}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">{m.context}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
