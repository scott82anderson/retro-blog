import path from "node:path";
import { DateTime } from "luxon";
import markdownItAnchor from "markdown-it-anchor";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import * as pagefind from "pagefind";

import site from "./src/_data/site.js";
import { schemaForPage } from "./lib/schema.js";

// Tags used for internal collections, never shown to readers.
const HIDDEN_TAGS = new Set(["all", "posts"]);

export default function (eleventyConfig) {
	eleventyConfig.setInputDirectory("src");
	eleventyConfig.setIncludesDirectory("_includes");
	eleventyConfig.setDataDirectory("_data");
	eleventyConfig.setOutputDirectory("_site");

	eleventyConfig.addPassthroughCopy({ "src/assets/css": "assets/css" });
	eleventyConfig.addPassthroughCopy({ "src/assets/img/static": "assets/img" });
	eleventyConfig.addPassthroughCopy({ "src/assets/favicon.svg": "favicon.svg" });
	eleventyConfig.addWatchTarget("src/assets/css/");

	// Drafts render during `npm run dev` but are left out of production builds.
	eleventyConfig.addPreprocessor("drafts", "*", (data) => {
		if (data.draft && process.env.ELEVENTY_RUN_MODE === "build") {
			return false;
		}
	});

	// Every image in a post needs alt text (accessibility, SEO and answer engines all rely on it).
	eleventyConfig.addPreprocessor("alt-text", "md", (data, content) => {
		if (!data.page.inputPath.includes("/posts/")) return;
		const missing = content.match(/!\[\s*\]\([^)]*\)/g);
		if (missing) {
			throw new Error(`${data.page.inputPath}: image(s) without alt text: ${missing.join(", ")}`);
		}
		if (data.image && !data.imageAlt) {
			throw new Error(`${data.page.inputPath}: \`image\` is set but \`imageAlt\` is missing`);
		}
	});

	// ---------- Images ----------
	// Every <img> in the built HTML is converted to responsive AVIF/WebP/original with
	// width/height set. Missing alt text fails the build.
	eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
		formats: ["avif", "webp", "auto"],
		widths: [480, 800, 1200, 1600],
		failOnError: true,
		htmlOptions: {
			imgAttributes: {
				loading: "lazy",
				decoding: "async",
				sizes: "(min-width: 60rem) 52rem, 100vw",
			},
			pictureAttributes: {},
		},
	});

	// ---------- Markdown ----------
	eleventyConfig.amendLibrary("md", (md) => {
		md.use(markdownItAnchor, {
			level: [2, 3],
			slugify: eleventyConfig.getFilter("slugify"),
			permalink: markdownItAnchor.permalink.headerLink({ safariReaderFix: true }),
		});
	});
	eleventyConfig.addPlugin(syntaxHighlight, { preAttributes: { tabindex: 0 } });

	// ---------- Feed ----------
	eleventyConfig.addPlugin(feedPlugin, {
		type: "atom",
		outputPath: "/feed.xml",
		collection: { name: "posts", limit: 20 },
		metadata: {
			language: site.language,
			title: site.title,
			subtitle: site.description,
			base: site.url,
			author: { name: site.author.name },
		},
	});

	// ---------- Collections ----------
	const byDateDesc = (a, b) => b.date - a.date;

	eleventyConfig.addCollection("posts", (api) =>
		api.getFilteredByGlob("src/posts/**/*.md").sort(byDateDesc)
	);

	// [{ tag, slug, count }] sorted by count then name.
	eleventyConfig.addCollection("tagList", (api) => {
		const counts = new Map();
		for (const item of api.getFilteredByGlob("src/posts/**/*.md")) {
			for (const tag of item.data.tags || []) {
				if (HIDDEN_TAGS.has(tag)) continue;
				counts.set(tag, (counts.get(tag) || 0) + 1);
			}
		}
		const slugify = eleventyConfig.getFilter("slugify");
		return [...counts]
			.map(([tag, count]) => ({ tag, slug: slugify(tag), count }))
			.sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
	});

	// [{ year, months: [{ month, label, posts }] }] newest first.
	eleventyConfig.addCollection("archive", (api) => {
		const years = new Map();
		const posts = api.getFilteredByGlob("src/posts/**/*.md").sort(byDateDesc);
		for (const post of posts) {
			const dt = DateTime.fromJSDate(post.date, { zone: "utc" });
			if (!years.has(dt.year)) years.set(dt.year, new Map());
			const months = years.get(dt.year);
			if (!months.has(dt.month)) months.set(dt.month, { month: dt.month, label: dt.toFormat("LLLL"), posts: [] });
			months.get(dt.month).posts.push(post);
		}
		return [...years].map(([year, months]) => ({ year, count: [...months.values()].reduce((n, m) => n + m.posts.length, 0), months: [...months.values()] }));
	});

	// ---------- Filters ----------
	eleventyConfig.addFilter("readableDate", (date, format = "d LLLL yyyy") =>
		DateTime.fromJSDate(date, { zone: "utc" }).toFormat(format)
	);
	eleventyConfig.addFilter("isoDate", (date) =>
		DateTime.fromJSDate(date, { zone: "utc" }).toISODate()
	);
	eleventyConfig.addFilter("visibleTags", (tags = []) => tags.filter((t) => !HIDDEN_TAGS.has(t)));
	eleventyConfig.addFilter("fullUrl", (url) => new URL(url, site.url).href);
	eleventyConfig.addFilter("head", (arr, n) => (n < 0 ? arr.slice(n) : arr.slice(0, n)));
	eleventyConfig.addFilter("pad", (n, width = 2) => String(n).padStart(width, "0"));
	eleventyConfig.addFilter("wordCount", (html = "") => stripHtml(html).split(/\s+/).filter(Boolean).length);
	eleventyConfig.addFilter("readingTime", (html = "") =>
		Math.max(1, Math.ceil(stripHtml(html).split(/\s+/).filter(Boolean).length / 230))
	);
	eleventyConfig.addFilter("plainText", (html = "") => stripHtml(html));
	eleventyConfig.addFilter("jsonLd", (data) =>
		JSON.stringify(data, null, 2).replace(/</g, "\\u003c")
	);
	eleventyConfig.addFilter("postsWithTag", (posts, tag) =>
		posts.filter((p) => (p.data.tags || []).includes(tag))
	);
	eleventyConfig.addFilter("previousPost", (posts, url) => {
		const i = posts.findIndex((p) => p.url === url);
		return i >= 0 ? posts[i + 1] : undefined;
	});
	eleventyConfig.addFilter("nextPost", (posts, url) => {
		const i = posts.findIndex((p) => p.url === url);
		return i > 0 ? posts[i - 1] : undefined;
	});

	// Structured data (see lib/schema.js)
	eleventyConfig.addFilter("schemaForPage", schemaForPage);

	// ---------- Search index ----------
	eleventyConfig.on("eleventy.after", async ({ directories }) => {
		const { index } = await pagefind.createIndex();
		await index.addDirectory({ path: directories.output });
		await index.writeFiles({ outputPath: path.join(directories.output, "pagefind") });
		await pagefind.close();
	});
}

function stripHtml(html) {
	return String(html)
		.replace(/<(script|style)[\s\S]*?<\/\1>/gi, " ")
		.replace(/<[^>]+>/g, " ")
		.replace(/&nbsp;/g, " ")
		.replace(/&amp;/g, "&")
		.replace(/&lt;/g, "<")
		.replace(/&gt;/g, ">")
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'")
		.replace(/\s+/g, " ")
		.trim();
}
