import { ChevronDown } from "lucide-react";
import { experience } from "@/data/experience";
import { Badge, Section, SectionHeading } from "./ui";

/** Bullets shown before the "more" toggle, so the timeline stays scannable. */
const VISIBLE = 3;

export function Experience() {
  return (
    <Section id="experience" aria-labelledby="experience-title" className="border-t border-line">
      <SectionHeading id="experience-title" eyebrow="Experience" title="Where I've built and shipped." />

      <ol>
        {experience.map((job) => {
          const dates = (
            <>
              <time>{job.start}</time> – <time>{job.end}</time>
            </>
          );
          const shown = job.achievements.slice(0, VISIBLE);
          const extra = job.achievements.slice(VISIBLE);
          return (
            <li key={`${job.organization}-${job.start}`} data-reveal className="group md:grid md:grid-cols-[150px_1fr] md:gap-8">
              <p className="hidden pt-1 text-right text-sm font-medium tabular-nums text-muted md:block">{dates}</p>

              {/* Timeline rail + content */}
              <div className="relative border-l border-line-strong pb-10 pl-7 group-last:border-transparent group-last:pb-0 md:pl-9">
                <span
                  aria-hidden="true"
                  className="absolute -left-[7px] top-[6px] h-[13px] w-[13px] rounded-full bg-[linear-gradient(135deg,#3563e9,#6d4ae8)] ring-4 ring-canvas"
                />
                <p className="mb-1.5 text-sm font-medium tabular-nums text-muted md:hidden">{dates}</p>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="text-xl font-bold text-ink">{job.role}</h3>
                  <p className="font-display text-base font-semibold text-accent-strong">{job.organization}</p>
                </div>
                {job.highlight ? (
                  <p className="mt-3 inline-flex rounded-lg bg-[linear-gradient(90deg,#eef2fd,#f1edfd)] px-3 py-1 text-sm font-semibold text-accent-strong">
                    {job.highlight}
                  </p>
                ) : null}
                <ul className="mt-3 max-w-3xl space-y-1.5">
                  {shown.map((a) => (
                    <Bullet key={a}>{a}</Bullet>
                  ))}
                </ul>
                {extra.length ? (
                  <details className="group/more mt-1.5 max-w-3xl">
                    <summary className="inline-flex min-h-9 cursor-pointer list-none items-center gap-1 rounded-md text-sm font-medium text-accent hover:text-accent-strong [&::-webkit-details-marker]:hidden">
                      <span className="group-open/more:hidden">Show {extra.length} more</span>
                      <span className="hidden group-open/more:inline">Show less</span>
                      <ChevronDown className="h-4 w-4 transition-transform group-open/more:rotate-180" aria-hidden="true" />
                    </summary>
                    <ul className="mt-1 space-y-1.5">
                      {extra.map((a) => (
                        <Bullet key={a}>{a}</Bullet>
                      ))}
                    </ul>
                  </details>
                ) : null}
                <ul className="mt-3 flex flex-wrap gap-1.5" aria-label={`Technologies used at ${job.organization}`}>
                  {job.tech.map((t) => (
                    <li key={t}>
                      <Badge>{t}</Badge>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}

function Bullet({ children }: { children: string }) {
  return (
    <li className="flex gap-3 text-[0.95rem] leading-relaxed text-muted">
      <span aria-hidden="true" className="mt-[0.65rem] h-1 w-1 shrink-0 rounded-full bg-ink/40" />
      {children}
    </li>
  );
}
