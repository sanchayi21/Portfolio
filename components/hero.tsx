import type { CSSProperties } from "react";
import { ArrowDown, Download, Mail, MapPin } from "lucide-react";
import { site } from "@/data/site";
import { Container, GitHubIcon, buttonStyles } from "./ui";

const delay = (n: number) => ({ "--reveal-delay": n }) as CSSProperties;

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate pb-20 pt-32 sm:pb-28 sm:pt-44">
      {/* Faint grid that fades out — the only decoration on the page. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,#e6eaf0_1px,transparent_1px),linear-gradient(to_bottom,#e6eaf0_1px,transparent_1px)] bg-[size:56px_56px] opacity-70 [mask-image:radial-gradient(ellipse_70%_65%_at_25%_35%,black,transparent_75%)]"
      />
      <Container>
        <div className="max-w-4xl">
          <p data-reveal className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-muted sm:text-[0.8rem]">
            {site.eyebrow}
          </p>
          <h1
            id="hero-title"
            data-reveal
            style={delay(1)}
            className="text-[2.6rem] font-extrabold leading-[1.04] tracking-[-0.035em] text-ink sm:text-6xl lg:text-[4.75rem]"
          >
            Building reliable software and <span className="text-accent">intelligent applications.</span>
          </h1>
          <p data-reveal style={delay(2)} className="mt-7 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
            I&apos;m {site.firstName}, a software engineer who builds full-stack products, scalable backend services and
            AI-powered systems. I hold an M.S. in Computer Science from the University of Texas at Arlington.
          </p>

          <div data-reveal style={delay(3)} className="mt-10 flex flex-wrap items-center gap-3">
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

          <p data-reveal style={delay(4)} className="mt-10 inline-flex items-center gap-2 text-sm text-muted">
            <MapPin className="h-4 w-4 text-subtle" aria-hidden="true" />
            Based in {site.location}
          </p>
        </div>
      </Container>
    </section>
  );
}
