# Scott Anderson's blog

Personal blog with an 1980s computer-magazine look. Static site built with **Eleventy 3** (Nunjucks templates + Markdown), **eleventy-img** for responsive images, and **Pagefind** for client-side search. Deploys to Netlify (or any static host) with `npm run build` → `_site/`.

## Commands

- `npm run dev`: dev server at http://localhost:8080 (drafts visible, search index rebuilt on each change)
- `npm run build`: production build into `_site/` (drafts excluded; Pagefind index written to `_site/pagefind/`)
- `npm run new "Title"`: scaffold a new draft post
- `/new-post` Claude Code skill: write a full post from notes (see `.claude/skills/new-post/SKILL.md`)

## Writing posts

Each post is a folder: `src/posts/YYYY-MM-DD-slug/index.md`, with its images beside it. URL is `/posts/<slug>/` (the date prefix is dropped). Defaults come from `src/posts/posts.11tydata.js`.

Front matter:

```yaml
title: "..."                 # required
description: "..."           # required: meta description, cards, llms.txt
date: 2026-10-05             # required: drives ordering, archive, feed
updated: 2026-10-20          # optional: dateModified in structured data
tags: [ai, careers]          # lowercase; reuse existing tags
image: ./cover.png           # optional cover; also becomes the og:image (1200px JPEG)
imageAlt: "..."              # required if image is set
imageCaption: "..."          # optional
summary: ["...", "..."]      # optional "Key points" boxout (AEO)
faq: [{ q: "...", a: "..." }] # optional visible Q&A + FAQPage JSON-LD
draft: true                  # optional: hidden from production builds
```

Rules enforced by the build: every Markdown image needs alt text; `image` needs `imageAlt`.

Style: Australian English, first person, direct answer in the opening paragraph, `##` question-style headings, never `#` in the body.

## Where things live

- `eleventy.config.js`: plugins, collections (`posts`, `tagList`, `archive`), filters, Pagefind hook
- `lib/schema.js`: Schema.org JSON-LD (`schemaForPage` builds the @graph per page via `schemaKind`)
- `src/_data/site.js`: site title, **URL**, author bio, social links, nav
- `src/_includes/layouts/`: `base.njk` (shell), `post.njk`, `page.njk`
- `src/_includes/partials/`: `head.njk` (all SEO meta + JSON-LD), header, footer, entry (listing row), tags, author box
- `src/assets/css/main.css`: the whole theme (OKLCH tokens at the top)
- Pages: `index.njk` (cover story + paginated contents), `archive.njk`, `tags/`, `search.njk`, `about.njk`, `404.njk`
- Machine-readable: `sitemap.njk`, `robots.11ty.js`, `llms.11ty.js`, `llms-full.11ty.js`; the Atom feed (`/feed.xml`) comes from the RSS plugin config

## Design system (keep consistent)

- Colours (OKLCH tokens in `main.css`): ink, white, red (headlines/kickers), teal (links), yellow (boxouts/buttons), plus orange and blue in the rainbow stripe.
- Type: Archivo (expanded, 800–900) for display/UI, Source Serif 4 for body, Silkscreen (pixel) for small labels, JetBrains Mono for code.
- Motifs: heavy ink rules, hard offset shadows (no blur), rainbow stripes, tag "stickers", red kicker label, green-bar printout code blocks.
- No rounded corners, gradients-on-text, or side-stripe borders.

## SEO / AEO checklist (already wired up)

Canonical, Open Graph and Twitter cards, `article:*` meta, JSON-LD (WebSite + SearchAction, Person, BlogPosting, BreadcrumbList, FAQPage, ProfilePage, CollectionPage), sitemap.xml, robots.txt (allows AI crawlers), Atom feed, llms.txt and llms-full.txt, responsive images with dimensions, single h1 per page.

The site URL is `https://scottanderson.com.au`, set in `src/_data/site.js` (`url`).
