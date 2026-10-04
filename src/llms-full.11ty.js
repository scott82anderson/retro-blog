// The full text of every article as Markdown, for language models.
export const data = { permalink: "/llms-full.txt", eleventyExcludeFromCollections: true };

export function render({ site, collections }) {
	const url = (path) => new URL(path, site.url).href;

	const articles = collections.posts.map((p) => {
		const d = p.data;
		const lines = [
			`# ${d.title}`,
			"",
			`URL: ${url(p.url)}`,
			`Published: ${this.isoDate(p.date)}`,
			d.updated ? `Updated: ${this.isoDate(d.updated)}` : null,
			`Author: ${site.author.name}`,
			`Tags: ${this.visibleTags(d.tags).join(", ")}`,
			"",
			d.description,
		].filter((l) => l !== null);

		if (d.summary?.length) {
			lines.push("", "Key points:", ...d.summary.map((s) => `- ${s}`));
		}
		lines.push("", p.rawInput.trim());
		if (d.faq?.length) {
			lines.push("", "## Questions and answers", "", ...d.faq.flatMap((f) => [`### ${f.q}`, "", f.a, ""]));
		}
		return lines.join("\n").trim();
	});

	return `# ${site.title}: full text of all articles

> ${site.description}

---

${articles.join("\n\n---\n\n")}
`;
}
