import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import { site } from "@/data/site";
import { getSiteUrl, hasKnownSiteUrl } from "@/lib/site-url";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const pageTitle = "Sanchayi Sharma | Software Engineer | Full-Stack & AI";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: pageTitle,
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.github }],
  creator: site.name,
  keywords: [
    "Sanchayi Sharma",
    "Software Engineer",
    "Full-Stack Engineer",
    "Backend Engineer",
    "AI Engineer",
    "React",
    "FastAPI",
    "TypeScript",
    "Dallas",
  ],
  ...(hasKnownSiteUrl() ? { alternates: { canonical: "/" } } : {}),
  openGraph: {
    type: "website",
    title: pageTitle,
    description: site.description,
    siteName: site.name,
    locale: "en_US",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: site.description,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#FAFAF8",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`} suppressHydrationWarning>
      <head>
        {/* Enables scroll-reveal styles only when JS runs, so content is never hidden without it. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
