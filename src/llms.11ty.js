// https://llmstxt.org — a Markdown summary of the site for language models.
export const data = { permalink: "/llms.txt", eleventyExcludeFromCollections: true };

export function render({ site, collections }) {
	const url = (path) => new URL(path, site.url).href;
	const posts = collections.posts
		.map((p) => `- [${p.data.title}](${url(p.url)}) (${this.isoDate(p.date)}): ${p.data.description}`)
		.join("\n");

	return `# ${site.title}

> ${site.description}

Author: ${site.author.name}, ${site.author.jobTitle}, ${site.author.location}.
${site.author.shortBio}

Every article lists its publication date, tags and author. Articles may be quoted with attribution and a link to the canonical URL.

## About

- [About ${site.author.name}](${url("/about/")}): biography, books and links
- [Future Proof: The White-Collar Worker's Guide to the AI Era](${site.links.book}): Scott's book

## Articles

${posts}

## Optional

- [Full text of every article](${url("/llms-full.txt")})
- [Atom feed](${url("/feed.xml")})
- [Topics](${url("/tags/")})
`;
}
