import { ArrowUpRight, BadgeCheck, GraduationCap } from "lucide-react";
import { certifications, education } from "@/data/education";
import { Section, SectionHeading } from "./ui";

export function Education() {
  return (
    <Section id="education" aria-labelledby="education-title" className="border-t border-line">
      <SectionHeading id="education-title" eyebrow="Education & Certifications" title="Foundations." />
      <div className="grid gap-4 md:grid-cols-3">
        {education.map((e) => (
          <div key={e.school} data-reveal className="rounded-2xl border border-line bg-card p-5 shadow-card">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <GraduationCap className="h-4 w-4" aria-hidden="true" />
              </span>
              <p className="text-sm tabular-nums text-muted">
                {e.start} – {e.end}
              </p>
            </div>
            <h3 className="mt-3 text-base font-bold leading-snug text-ink">{e.school}</h3>
            <p className="mt-0.5 text-sm text-ink/85">
              {e.degree}
              {e.detail ? <span className="font-semibold text-ink"> · {e.detail}</span> : null}
            </p>
          </div>
        ))}

        <div data-reveal className="rounded-2xl border border-line bg-card p-5 shadow-card">
          <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-subtle">Certifications</h3>
          <ul className="mt-3 space-y-3">
            {certifications.map((c) => (
              <li key={c.name} className="flex gap-2.5">
                <BadgeCheck className="mt-0.5 h-[18px] w-[18px] shrink-0 text-violet" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold leading-snug text-ink">{c.name}</p>
                  <p className="text-xs text-muted">{c.issuer}</p>
                  {c.verifyUrl ? (
                    <a
                      href={c.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
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
