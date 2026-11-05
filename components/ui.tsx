import type { ComponentPropsWithoutRef, ReactNode } from "react";

export function Container({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`mx-auto w-full max-w-[1180px] px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Section({
  id,
  className = "",
  children,
  ...rest
}: { id: string; className?: string; children: ReactNode } & ComponentPropsWithoutRef<"section">) {
  return (
    <section id={id} className={`py-14 sm:py-20 ${className}`} {...rest}>
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
}: {
  id: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
}) {
  return (
    <header className="mb-8 max-w-2xl sm:mb-10" data-reveal>
      <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
        <span aria-hidden="true" className="h-px w-6 bg-[linear-gradient(90deg,#3563e9,#6d4ae8)]" />
        {eyebrow}
      </p>
      <h2 id={id} className="text-3xl font-bold leading-tight text-ink sm:text-[2.4rem]">
        {title}
      </h2>
      {intro ? <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{intro}</p> : null}
    </header>
  );
}

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition-all duration-200 focus-visible:outline-offset-4";

export const buttonStyles = {
  primary: `${base} bg-[linear-gradient(135deg,#3563e9,#5b4be0)] text-white shadow-[0_1px_2px_rgb(53_99_233/0.3),0_8px_20px_-8px_rgb(91_75_224/0.6)] hover:-translate-y-px hover:shadow-[0_1px_2px_rgb(53_99_233/0.3),0_12px_24px_-8px_rgb(91_75_224/0.7)] hover:brightness-110`,
  secondary: `${base} border border-line-strong bg-card text-ink shadow-card hover:-translate-y-px hover:border-ink/25 hover:shadow-lift`,
  ghost: `${base} px-3 text-muted hover:bg-ink/[0.04] hover:text-ink`,
  /** Variants for use on the dark contact panel. */
  inversePrimary: `${base} bg-white text-ink hover:-translate-y-px hover:bg-white/90 focus-visible:outline-white`,
  inverseSecondary: `${base} border border-white/20 bg-white/5 text-white hover:-translate-y-px hover:border-white/40 hover:bg-white/10 focus-visible:outline-white`,
};

export function Badge({ children, tone = "default" }: { children: ReactNode; tone?: "default" | "planned" }) {
  const styles =
    tone === "planned"
      ? "border-dashed border-line-strong bg-transparent text-muted"
      : "border-line bg-canvas text-ink/80";
  return (
    <span className={`inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-medium ${styles}`}>
      {children}
    </span>
  );
}

export function GitHubIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2.02c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.7 5.38-5.27 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}
