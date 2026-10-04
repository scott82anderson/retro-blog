---
name: new-post
description: Write and publish a new blog article on this site from notes, a draft, a topic, or images. Use when the user wants to add, draft, write or publish a blog post or article.
---

# Write a new blog post

Turn whatever the user provides (rough notes, a full draft, a topic, links, image files) into a finished post that follows this site's conventions. Read `CLAUDE.md` first if you haven't this session.

## 1. Gather

- Ask only for what you can't work out: the topic or source material, and whether it should go live now or stay a draft. Default to `draft: true` unless the user says publish.
- **If the user supplies the finished article text** (pasted, or a path to a .md/.txt/.docx file), keep their wording exactly. Only convert it to Markdown (headings, lists, links, code blocks), place images, and write the front matter. Don't rewrite, trim or "improve" sentences; suggest edits separately if you have any.
- When writing from notes, write in Scott's voice: first person, plain Australian English spelling (optimise, organisation, colour), practical, no hype. Don't invent personal anecdotes, numbers, clients or opinions Scott hasn't given you; ask, or leave a clear `TODO:` for him.

## 2. Scaffold

Run `npm run new "<Title>"`. It creates `src/posts/YYYY-MM-DD-<slug>/index.md` with front matter. Copy any images the user supplied into that same folder (rename to short kebab-case names).

## 3. Fill in the front matter

- `title`: specific, under ~65 characters where possible. A question works well for explainers.
- `description`: 1–2 sentences, 120–160 characters, says what the reader gets. Used for meta description, social cards, listings and llms.txt.
- `tags`: 2–4 lowercase tags. **Reuse existing tags**: list them with `grep -rh "^tags:" src/posts`. Only add a new tag when nothing fits.
- `image` / `imageAlt`: optional cover (≥1600px wide ideally). `imageAlt` is required when `image` is set.
- `summary`: 2–4 "key points", each a complete, quotable sentence that stands on its own.
- `faq`: optional, 2–4 real questions a reader would ask, each answered directly in 1–3 sentences. Only include if they add something beyond the body.
- `updated`: add (YYYY-MM-DD) when materially editing an older post.

## 4. Write the body (Markdown)

- First paragraph answers the title's question directly in 1–2 sentences (good for readers, search snippets and AI answer engines). Bold the one-sentence definition if the post defines something.
- Use `##` headings phrased the way readers ask (e.g. "How does X work?"). Use `###` for sub-points. Never use `#` (the title is the page's only h1).
- Short paragraphs. Lists for steps or options. Fenced code blocks with a language (` ```js `).
- Images: `![Alt text describing what the image shows](./file.png)`. Every image needs alt text or the build fails.
- Link to related posts on this site with root-relative URLs (`/posts/<slug>/`).

## 5. Check

1. `npm run build`: must finish without errors (it fails on missing alt text).
2. Confirm the post appears: `ls _site/posts/<slug>/`. If it's a draft it won't be in the production build; that's expected. Use `npm run dev` to preview drafts at http://localhost:8080.
3. Tell the user the file path, the URL it will have, the tags you chose, and anything marked `TODO:`.

To publish a draft: remove `draft: true`, build, then commit and push (only commit/push if the user asks).
