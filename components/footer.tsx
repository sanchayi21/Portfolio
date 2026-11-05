import { ArrowUp } from "lucide-react";
import { site } from "@/data/site";
import { Container } from "./ui";

export function Footer() {
  return (
    <footer className="border-t border-line py-8">
      <Container className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-sm text-muted">
          {site.name} · Built with React, Next.js &amp; TypeScript
        </p>
        <a
          href="#top"
          className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-medium text-muted transition-colors hover:bg-ink/[0.04] hover:text-ink sm:-mr-3"
        >
          Back to top
          <ArrowUp className="h-4 w-4" aria-hidden="true" />
        </a>
      </Container>
    </footer>
  );
}
