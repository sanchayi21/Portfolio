import { Download, Mail } from "lucide-react";
import { site } from "@/data/site";
import { CopyEmailButton } from "./copy-email-button";
import { Container, GitHubIcon, buttonStyles } from "./ui";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="border-t border-line py-14 sm:py-20">
      <Container>
        <div
          data-reveal
          className="relative isolate overflow-hidden rounded-3xl bg-ink px-6 py-12 text-white sm:px-14 sm:py-14"
        >
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-[#6d4ae8]/35 blur-[90px] animate-drift" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 left-1/3 -z-10 h-72 w-72 rounded-full bg-[#3563e9]/30 blur-[90px] animate-drift [animation-delay:-9s]" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.05)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_60%_80%_at_85%_20%,black,transparent_70%)]"
          />
          <div className="relative max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9DB5F7]">Contact</p>
            <h2 id="contact-title" className="mt-4 text-3xl font-extrabold leading-tight sm:text-5xl">
              Have an opportunity in mind? <span className="text-[#9DB5F7]">Let&apos;s connect.</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/75 sm:text-lg">
              I&apos;m interested in opportunities where I can contribute to meaningful software products, solve challenging
              engineering problems, and continue growing as a software engineer.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a href={`mailto:${site.email}`} className={buttonStyles.inversePrimary}>
                <Mail className="h-4 w-4" aria-hidden="true" />
                Email Me
              </a>
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile (opens in a new tab)"
                className={buttonStyles.inverseSecondary}
              >
                <GitHubIcon />
                GitHub
              </a>
              <a
                href={site.resumePath}
                download={site.resumeFileName}
                className={buttonStyles.inverseSecondary}
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Download Resume
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-white/10 pt-6">
              <span className="text-sm text-white/70">{site.email}</span>
              <CopyEmailButton email={site.email} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
