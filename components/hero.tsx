import type { CSSProperties } from "react";
import { ArrowDown, Download, Mail, MapPin } from "lucide-react";
import { site } from "@/data/site";
import { Container, GitHubIcon, buttonStyles } from "./ui";

const delay = (n: number) => ({ "--reveal-delay": n }) as CSSProperties;

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate overflow-hidden pb-14 pt-28 sm:pb-20 sm:pt-36">
      {/* Soft drifting color glows behind a faint grid. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-32 -top-24 h-[420px] w-[420px] rounded-full bg-[#3563e9]/15 blur-[90px] animate-drift" />
        <div className="absolute right-[-120px] top-24 h-[380px] w-[380px] rounded-full bg-[#6d4ae8]/12 blur-[90px] animate-drift [animation-delay:-9s]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e6eaf0_1px,transparent_1px),linear-gradient(to_bottom,#e6eaf0_1px,transparent_1px)] bg-[size:56px_56px] opacity-60 [mask-image:radial-gradient(ellipse_70%_65%_at_25%_35%,black,transparent_75%)]" />
      </div>
      <Container>
        <div className="max-w-4xl">
          <p data-reveal className="font-display text-3xl font-extrabold tracking-[-0.03em] text-ink sm:text-[2.6rem]">
            {site.name}
            <span className="text-accent">.</span>
          </p>
          <p
            data-reveal
            style={delay(1)}
            className="mb-6 mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted sm:text-[0.8rem]"
          >
            {site.eyebrow}
          </p>
          <h1
            id="hero-title"
            data-reveal
            style={delay(2)}
            className="text-[2.4rem] font-extrabold leading-[1.05] tracking-[-0.035em] text-ink sm:text-[3.4rem] lg:text-[4.1rem]"
          >
            Building reliable software and <span className="text-gradient">intelligent applications.</span>
          </h1>
          <p data-reveal style={delay(3)} className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            Software engineer building full-stack products, scalable backend services and AI-powered systems. M.S. in
            Computer Science from the University of Texas at Arlington.
          </p>

          <div data-reveal style={delay(4)} className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#projects" className={buttonStyles.primary}>
              Explore My Work
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href={site.resumePath} download={site.resumeFileName} className={buttonStyles.secondary}>
              <Download className="h-4 w-4" aria-hidden="true" />
              Download Resume
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonStyles.ghost}
              aria-label="GitHub profile (opens in a new tab)"
            >
              <GitHubIcon />
              GitHub
            </a>
            <a href={`mailto:${site.email}`} className={buttonStyles.ghost} aria-label={`Email ${site.email}`}>
              <Mail className="h-4 w-4" aria-hidden="true" />
              Email
            </a>
          </div>

          <p data-reveal style={delay(5)} className="mt-8 inline-flex items-center gap-2 text-sm text-muted">
            <MapPin className="h-4 w-4 text-subtle" aria-hidden="true" />
            Based in {site.location}
          </p>
        </div>
      </Container>
    </section>
  );
}
