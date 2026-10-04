export const data = { permalink: "/robots.txt", eleventyExcludeFromCollections: true };

// Search engines and AI answer engines are explicitly welcome to read and cite the site.
const AI_CRAWLERS = [
	"GPTBot", "OAI-SearchBot", "ChatGPT-User",
	"ClaudeBot", "Claude-SearchBot", "Claude-User",
	"PerplexityBot", "Perplexity-User",
	"Google-Extended", "Applebot-Extended", "CCBot",
];

export function render({ site }) {
	return `# Search engines and AI answer engines are welcome to read and cite this site.
User-agent: *
Allow: /
Disallow: /search/

${AI_CRAWLERS.map((ua) => `User-agent: ${ua}`).join("\n")}
Allow: /
Disallow: /search/

Sitemap: ${new URL("/sitemap.xml", site.url).href}
`;
}
