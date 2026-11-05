import { projects } from "@/data/projects";
import { ProjectCard } from "./project-card";
import { Section, SectionHeading } from "./ui";

export function Projects() {
  return (
    <Section id="projects" aria-labelledby="projects-title" className="border-t border-line">
      <SectionHeading
        id="projects-title"
        eyebrow="Featured Projects"
        title="Systems I've designed and built."
        intro="Each project includes an architecture walkthrough and the engineering decisions behind it. Diagrams are illustrations of the design, not screenshots."
      />
      <ul className="space-y-8 sm:space-y-10">
        {projects.map((project, i) => (
          <li key={project.slug} data-reveal>
            <ProjectCard project={project} index={i} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
