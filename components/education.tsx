import { ArrowUpRight, BadgeCheck, GraduationCap } from "lucide-react";
import { certifications, education } from "@/data/education";
import { Section, SectionHeading } from "./ui";

export function Education() {
  return (
    <Section id="education" aria-labelledby="education-title" className="border-t border-line">
      <SectionHeading id="education-title" eyebrow="Education & Certifications" title="Foundations." />
      <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <ul className="grid gap-5 sm:grid-cols-2">
          {education.map((e) => (
            <li key={e.school} data-reveal className="rounded-2xl border border-line bg-card p-6 shadow-card">
              <GraduationCap className="h-5 w-5 text-accent" aria-hidden="true" />
              <h3 className="mt-4 text-lg font-bold leading-snug text-ink">{e.school}</h3>
              <p className="mt-1 text-sm font-medium text-ink/85">{e.degree}</p>
              <p className="mt-4 text-sm tabular-nums text-muted">
                {e.start} – {e.end}
              </p>
              {e.detail ? <p className="mt-1 text-sm font-semibold text-ink">{e.detail}</p> : null}
            </li>
          ))}
        </ul>

        <div data-reveal className="rounded-2xl border border-line bg-card p-6 shadow-card">
          <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-subtle">Certifications</h3>
          <ul className="mt-4 divide-y divide-line">
            {certifications.map((c) => (
              <li key={c.name} className="flex gap-3 py-4 first:pt-1 last:pb-0">
                <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold leading-snug text-ink">{c.name}</p>
                  <p className="mt-0.5 text-sm text-muted">{c.issuer}</p>
                  {c.verifyUrl ? (
                    <a
                      href={c.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1.5 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
                    >
                      Verify credential
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
