import type { CSSProperties } from "react";
import { Brain, Cloud, CodeXml, Database, FlaskConical, PanelsTopLeft, Server, type LucideIcon } from "lucide-react";
import { skillGroups, type SkillIcon } from "@/data/skills";
import { Section, SectionHeading } from "./ui";

const icons: Record<SkillIcon, LucideIcon> = {
  code: CodeXml,
  layout: PanelsTopLeft,
  server: Server,
  database: Database,
  cloud: Cloud,
  brain: Brain,
  test: FlaskConical,
};

export function Skills() {
  return (
    <Section id="skills" aria-labelledby="skills-title" className="border-t border-line">
      <SectionHeading id="skills-title" eyebrow="Technical Expertise" title="The tools I reach for." />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => {
          const Icon = icons[group.icon];
          return (
            <li
              key={group.category}
              data-reveal
              style={{ "--reveal-delay": i % 3 } as CSSProperties}
              className={`rounded-2xl border border-line bg-card p-6 shadow-card ${
                i === skillGroups.length - 1 && skillGroups.length % 3 === 1 ? "lg:col-span-3" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-accent">
                  <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                </span>
                <h3 className="text-base font-bold text-ink">{group.category}</h3>
              </div>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label={group.category}>
                {group.skills.map((s) => (
                  <li key={s} className="rounded-md border border-line bg-canvas px-2.5 py-1 text-sm text-ink/85">
                    {s}
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
