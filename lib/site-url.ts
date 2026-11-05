import { site } from "@/data/site";

/**
 * Resolves the public base URL without requiring any environment variables:
 * 1. `site.url` from data/site.ts when you set it,
 * 2. the production domain Vercel exposes automatically at build time,
 * 3. localhost for local development.
 */
export function getSiteUrl(): string {
  if (site.url) return site.url.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

/** True only when the public domain is actually known. */
export const hasKnownSiteUrl = (): boolean =>
  Boolean(site.url || process.env.VERCEL_PROJECT_PRODUCTION_URL);
