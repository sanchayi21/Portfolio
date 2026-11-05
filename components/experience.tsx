import { experience } from "@/data/experience";
import { Badge, Section, SectionHeading } from "./ui";

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
          return (
            <li key={`${job.organization}-${job.start}`} data-reveal className="group md:grid md:grid-cols-[170px_1fr] md:gap-10">
              <p className="hidden pt-0.5 text-right text-sm font-medium tabular-nums text-muted md:block">{dates}</p>

              {/* Timeline rail + content */}
              <div className="relative border-l border-line-strong pb-14 pl-7 group-last:border-transparent group-last:pb-0 md:pl-10">
                <span
                  aria-hidden="true"
                  className="absolute -left-[6px] top-[7px] h-[11px] w-[11px] rounded-full border-2 border-accent bg-canvas"
                />
                <p className="mb-2 text-sm font-medium tabular-nums text-muted md:hidden">{dates}</p>
                <h3 className="text-xl font-bold text-ink">{job.role}</h3>
                <p className="mt-0.5 font-display text-base font-semibold text-accent-strong">{job.organization}</p>
                {job.highlight ? (
                  <p className="mt-4 inline-flex rounded-lg bg-accent-soft px-3 py-1.5 text-sm font-semibold text-accent-strong">
                    {job.highlight}
                  </p>
                ) : null}
                <ul className="mt-4 max-w-3xl space-y-2.5">
                  {job.achievements.map((a) => (
                    <li key={a} className="flex gap-3 text-[0.95rem] leading-relaxed text-muted">
                      <span aria-hidden="true" className="mt-[0.65rem] h-1 w-1 shrink-0 rounded-full bg-ink/40" />
                      {a}
                    </li>
                  ))}
                </ul>
                <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={`Technologies used at ${job.organization}`}>
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
