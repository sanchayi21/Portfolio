import { projects } from "@/data/projects";
import { ProjectCard } from "./project-card";
import { Section, SectionHeading } from "./ui";

export function Projects() {
  return (
    <Section id="projects" aria-labelledby="projects-title" className="border-t border-line bg-tint/60">
      <SectionHeading
        id="projects-title"
        eyebrow="Featured Projects"
        title="Systems I've designed and built."
        intro="Open the architecture walkthrough or technical details on any project. Diagrams illustrate the design; they are not screenshots."
      />
      <ul className="space-y-6">
        {projects.map((project, i) => (
          <li key={project.slug} data-reveal>
            <ProjectCard project={project} index={i} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
