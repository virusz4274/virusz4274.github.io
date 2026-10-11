# Harisankar’s blog

An AstroPaper site based on [AstroPaper 6.1.0](https://github.com/satnaing/astro-paper), using Astro, TypeScript, Tailwind, and Shiki. The original theme’s MIT license is retained in LICENSE.

## Develop

Use Node.js 24 (see `.node-version`). Work in the existing checkout; no additional worktree is needed.

```sh
npm ci
npm run dev
```

```sh
npm run lint
npm run build
npm run test:build
npm test # exercises temporary content fixtures and restores the production build
npm run preview
```

The build checks content and TypeScript, generates static pages, and indexes posts and projects with Pagefind. Generated `dist`, `.astro`, and `public/pagefind` directories are ignored. The site uses system monospace fonts and a static social image, so builds do not need a Google Fonts connection.

## Blog content

Write Markdown or MDX under `src/content/blog`. The recursive loader supports month folders and deeper nesting:

```text
src/content/blog/2026/10/my-post.md
src/content/blog/2026/11/another-post.mdx
```

The first file publishes at `/posts/2026/10/my-post/`. Month folders organize files; `pubDatetime` controls archive grouping and ordering. Keep published paths stable; moving a file changes its URL. Underscore-prefixed Markdown filenames are ignored.

```yaml
---
title: My post
pubDatetime: 2026-10-11T12:00:00+05:30
description: A short summary for listings and search engines.
tags: [tech, cameras]
draft: false
---
```

Tags are optional, unrestricted strings, not an enum. Initial suggestions are `tech`, `cameras`, `vehicles`, and `business`; use any others as your interests evolve. `/tags/` and `/tags/<tag>/` are generated from published posts. Unused topics are not displayed. Use consistent labels; URL slugs normalize spaces and case. Drafts and future posts are excluded from production listings, RSS, search, and tag pages.

Use `##`, `###`, and `####` headings to populate the table of contents. It sticks beside the article on wide screens and becomes a sticky, collapsible panel on smaller screens. It also works without JavaScript. Fenced code blocks use Shiki’s light and dark themes:

````md
```typescript
const topic = "whatever comes next";
```
````

## Project showcase

Add Markdown or MDX under `src/content/projects`, including nested folders if needed. Each published entry gets a showcase card at `/projects/` and its own detail page.

```yaml
---
title: Project name
description: What this project does.
tags: [tech, business]
order: 1
draft: false
url: https://example.com
repository: https://github.com/owner/project
---
```

`url` and `repository` are optional. Set `featured: true` and a numeric `order` to include a project on the homepage. Project tags are displayed on showcase pages; the blog tag directory categorizes posts. Project detail pages share the responsive table of contents and Shiki rendering. About content lives in `src/content/pages/about.md`.

## Migration

- The original `index.md` content is retained on `/links/`, linked from About.
- The original Coarde link remains as a showcase entry.
- `paypal.html` and `akefredirect.html` retain their original URLs and bytes under `public/`.
- The custom domain remains `virusz4274.tech` via `public/CNAME` and `astro-paper.config.ts`.

The legacy payment page is preserved; payment transactions and third-party scripts are not part of the build checks.

## GitHub Pages

`.github/workflows/deploy.yml` builds pull requests and deploys pushes to `main`. In the repository’s **Settings → Pages**, select **GitHub Actions** as the build source. Keep the existing custom domain and DNS configuration. This user-site/custom-domain deployment uses `/` as its base path.

Personalize the site title, description, social links, and domain in `astro-paper.config.ts`. To change domains, update that file and `public/CNAME` together. Commits and deployment have not been performed by the scaffold operation.

## Personal site content

The homepage leads with TipKaro, Callery, and Hermes Phone, followed by writing. Navigation is Projects, About, and Writing; there is no CV or career timeline. Existing project entries and the legacy homepage links remain available.

The three featured products currently use **example URLs** (`https://example.com/tipkaro`, `/callery`, and `/hermes-phone`). Replace their `url` front matter with your actual product links before publishing. Launch statuses, screenshots, demos, and source links have been omitted until you provide them. Product overview copy is based only on the descriptions supplied for this site.
