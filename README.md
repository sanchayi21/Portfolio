# Sanchayi Sharma — Portfolio

A one-page portfolio built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS 4** and **Lucide** icons.
Every page is prerendered as static HTML. It needs no database, API keys, environment variables or paid services.

## Run locally

Requires **Node.js 20.9 or newer** (tested with Node 22).

```bash
npm install
npm run dev        # http://localhost:3000
```

Production build:

```bash
npm run build
npm run start      # serves the production build on http://localhost:3000
```

## Project structure

```
app/
  layout.tsx            fonts, SEO / Open Graph metadata
  page.tsx              section order
  globals.css           design tokens (colors, fonts, shadows) + reveal animation
  opengraph-image.tsx   social-share image, generated at build time
  icon.svg              favicon
  robots.ts, sitemap.ts
components/             one file per section + shared UI (ui.tsx)
  architecture-diagram.tsx   renders any project's diagram from data
  project-card.tsx           project card, walkthrough and expandable details
data/                   ALL personal content lives here
  site.ts               name, email, GitHub, resume path, public URL, impact metrics
  projects.ts           projects, technical details and diagrams
  experience.ts         timeline entries
  skills.ts             skill groups
  education.ts          degrees and certifications
lib/site-url.ts         resolves the public URL for metadata
public/
  Sanchayi_Sharma_Resume.pdf
```

## Updating content

| To change…            | Edit                                                             |
| --------------------- | ---------------------------------------------------------------- |
| Resume                | Replace `public/Sanchayi_Sharma_Resume.pdf` (keep the file name, or update `resumePath` in `data/site.ts`) |
| Email / GitHub        | `data/site.ts`                                                   |
| Impact numbers        | `impactMetrics` in `data/site.ts`                                |
| Experience            | `data/experience.ts`                                             |
| Skills                | `data/skills.ts`                                                 |
| Certifications        | `data/education.ts` — add `verifyUrl` to show a "Verify credential" link |
| Colors / fonts        | `@theme` block in `app/globals.css`                              |

### Projects

Projects live in `data/projects.ts`. To add one, append an object to the `projects` array — the UI picks it up automatically.

- `repoUrl` / `demoUrl` — optional. The **Code** and **Live demo** buttons only appear when these are set, so add them only for real public links (e.g. once the TraceOps repository is public).
- `status: "In Progress"` shows the amber in-progress pill.
- `plannedStack` and detail sections with `planned: true` are styled as roadmap items, so they are never mistaken for finished features.
- `diagram` — nodes are boxes positioned inside an SVG `viewBox` (`x`, `y`, `w`, `h`), edges are lines between `points`. `kind: "planned"` draws a dashed box with a PLANNED tag. `steps` drive the "View Architecture" walkthrough, and `mobileFlow` is the simplified top-to-bottom version shown on phones.
- When TraceOps' observability work ships, move items out of the "Roadmap" section, change the `obs` node's `kind`, and drop `planned: true` from its edges.

Screenshots: if you add real screenshots later, put them in `public/projects/` and render them with `next/image` in `project-card.tsx` above or in place of the diagram.

## Deploy for free (GitHub + Vercel Hobby)

Vercel's Hobby plan is free for personal, non-commercial projects, and Next.js is detected automatically.

### 1. Put the code on GitHub

This folder currently sits inside a larger Git repository (your home directory), so give it its own repository first:

```bash
cd "C:\Users\Sanchayi Sharma\OneDrive\Desktop\portfolio"
git init -b main
git add .
git commit -m "Initial portfolio"
```

Create an empty repository at <https://github.com/new> (e.g. `portfolio`, public or private, **without** a README), then:

```bash
git remote add origin https://github.com/sanchayi21/portfolio.git
git push -u origin main
```

### 2. Import into Vercel

1. Sign in at <https://vercel.com/signup> with **Continue with GitHub** and pick the **Hobby** plan.
2. **Add New → Project**, and import the `portfolio` repository (grant Vercel access to it if asked).
3. Leave the detected settings as they are:
   - Framework preset: **Next.js**
   - Build command: `next build` · Output: default · Install: `npm install`
   - Root directory: `./`
   - No environment variables needed.
4. Click **Deploy**. After about a minute you get a URL like `https://portfolio-xxxx.vercel.app`.

### 3. Choose your `.vercel.app` name

In the project, open **Settings → Domains**, add e.g. `sanchayi-sharma.vercel.app`, and Vercel tells you right away whether it is free to use. Make it the primary domain.

Then set `url` in `data/site.ts` to that address (e.g. `"https://sanchayi-sharma.vercel.app"`) and push. This sets the canonical URL, sitemap and social-preview links. (If you leave it empty, the build uses Vercel's production domain automatically.)

### 4. Make sure it's public

Production deployments on Hobby are public by default. If visitors see a Vercel login screen, go to **Settings → Deployment Protection** and turn **Vercel Authentication** off for production.

### 5. Updating the site

Every `git push` to `main` triggers a new production deployment automatically:

```bash
git add .
git commit -m "Update projects"
git push
```

Pushes to other branches get their own preview URLs.

### Custom domain (optional, later)

Buy a domain from any registrar, then add it in **Settings → Domains**. Vercel shows the DNS records to create (an `A` record for the root domain and/or a `CNAME` for `www`). HTTPS is issued automatically. Update `url` in `data/site.ts` afterwards.

## Accessibility & performance notes

- Semantic landmarks, skip link, one `h1`, ordered heading levels, visible focus rings.
- Disclosure buttons use `aria-expanded` / `aria-controls`; walkthrough steps use `aria-pressed` with a live region; the copy-email button announces success to screen readers.
- Architecture diagrams have SVG `<title>`/`<desc>` text alternatives and switch to a readable list on phones.
- Scroll reveals, flow animation and smooth scrolling are disabled under `prefers-reduced-motion`, and content stays visible without JavaScript.
- Fonts are self-hosted through `next/font`; no runtime third-party requests.
