import type { CSSProperties } from "react";
import { Brain, Cloud, CodeXml, Database, FlaskConical, PanelsTopLeft, Server, type LucideIcon } from "lucide-react";
import { skillGroups, type SkillIcon } from "@/data/skills";
import { Section, SectionHeading } from "./ui";

const icons: Record<SkillIcon, { Icon: LucideIcon; tint: string }> = {
  code: { Icon: CodeXml, tint: "bg-[#eef2fd] text-[#3563e9]" },
  layout: { Icon: PanelsTopLeft, tint: "bg-[#f1edfd] text-[#6d4ae8]" },
  server: { Icon: Server, tint: "bg-[#e9f6f4] text-[#0f7a6c]" },
  database: { Icon: Database, tint: "bg-[#eaf4fd] text-[#1d6fb8]" },
  cloud: { Icon: Cloud, tint: "bg-[#fdf4e3] text-[#9a5b00]" },
  brain: { Icon: Brain, tint: "bg-[#fbeef5] text-[#b03a77]" },
  test: { Icon: FlaskConical, tint: "bg-[#eef7ec] text-[#3b7d2a]" },
};

export function Skills() {
  return (
    <Section id="skills" aria-labelledby="skills-title" className="border-t border-line">
      <SectionHeading id="skills-title" eyebrow="Technical Expertise" title="The tools I reach for." />
      <ul className="grid gap-x-10 rounded-2xl border border-line bg-card px-5 shadow-card sm:px-7 lg:grid-cols-2">
        {skillGroups.map((group, i) => {
          const { Icon, tint } = icons[group.icon];
          return (
            <li
              key={group.category}
              data-reveal
              style={{ "--reveal-delay": i % 2 } as CSSProperties}
              className="flex flex-col gap-3 border-b border-line py-5 last:border-b-0 sm:flex-row sm:items-start sm:gap-5"
            >
              <div className="flex shrink-0 items-center gap-3 sm:w-44">
                <span className={`inline-flex h-8 w-8 items-center justify-center rounded-lg ${tint}`}>
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <h3 className="text-sm font-bold text-ink">{group.category}</h3>
              </div>
              <ul className="flex flex-wrap gap-1.5" aria-label={group.category}>
                {group.skills.map((s) => (
                  <li
                    key={s}
                    className="rounded-md border border-line bg-canvas px-2.5 py-1 text-sm text-ink/85 transition-colors duration-200 hover:border-accent/40 hover:bg-accent-soft hover:text-accent-strong"
                  >
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
