/**
 * Central personal details. Everything in the UI that identifies you reads from here.
 */
export const site = {
  name: "Sanchayi Sharma",
  firstName: "Sanchayi",
  title: "Software Engineer | Full-Stack & AI",
  eyebrow: "Software Engineer · Full-Stack & AI",
  location: "Dallas, TX",
  email: "sanchayi.usa21@gmail.com",
  github: "https://github.com/sanchayi21",
  githubHandle: "sanchayi21",
  /** Lives in /public. Replace the PDF there to update the download. */
  resumePath: "/Sanchayi_Sharma_Resume.pdf",
  resumeFileName: "Sanchayi_Sharma_Resume.pdf",
  /**
   * Your public URL once deployed, e.g. "https://your-project.vercel.app".
   * Leave empty until the domain is known. When set, it is used for the canonical
   * URL, sitemap and social previews. On Vercel, the production domain is detected
   * automatically if this is empty.
   */
  url: "https://sanchayisharma.vercel.app" as string,
  description:
    "Sanchayi Sharma is a software engineer in Dallas, TX building full-stack products, backend services and AI-powered applications. M.S. in Computer Science, UT Arlington.",
} as const;

export const navItems = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
] as const;

export const impactMetrics = [
  {
    value: "5,000+",
    label: "Active users",
    context: "supported by onboarding, content and progress-tracking features I built at Nexamuse.",
  },
  {
    value: "40%",
    label: "Faster API responses",
    context: "average response-time reduction at Nexamuse after SQL JOIN optimization and Redis caching.",
  },
  {
    value: "60%",
    label: "Less manual data prep",
    context: "through automated research data pipelines as a Graduate Research Assistant at UT Arlington.",
  },
] as const;
