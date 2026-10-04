# my-blog

Scott Anderson's personal blog: Eleventy + Markdown, retro computer-magazine theme, Pagefind search.

```sh
npm install
npm run dev                 # http://localhost:8080
npm run new "Post title"    # scaffold a draft in src/posts/
npm run build               # production build → _site/
```

See `CLAUDE.md` for post format, conventions and where things live. In Claude Code, `/new-post` writes a full article from your notes.

Deploy: connect the repo to Netlify (config in `netlify.toml`), Cloudflare Pages or Vercel with build command `npm run build` and output `_site`. Set your domain in `src/_data/site.js`.
