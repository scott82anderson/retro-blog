import path from "node:path";
import Image from "@11ty/eleventy-img";

// Defaults for every post in src/posts/<YYYY-MM-DD-slug>/index.md
export default {
	layout: "layouts/post.njk",
	tags: ["posts"],
	ogType: "article",
	eleventyComputed: {
		// /posts/<slug>/ — the date prefix on the folder name is dropped by Eleventy's fileSlug.
		permalink: (data) => `/posts/${data.slug || data.page.fileSlug}/`,

		// Cover image path relative to src/, so it can be used from any page (home, tags…).
		coverSrc: (data) => {
			if (!data.image) return undefined;
			const full = path.join(path.dirname(data.page.inputPath), data.image);
			return "/" + path.relative("src", full).split(path.sep).join("/");
		},

		// A 1200px JPEG of the cover for Open Graph / social cards / structured data.
		ogImage: async (data) => {
			if (!data.image) return undefined;
			const full = path.join(path.dirname(data.page.inputPath), data.image);
			const stats = await Image(full, {
				widths: [1200],
				formats: ["jpeg"],
				outputDir: "_site/img/og/",
				urlPath: "/img/og/",
			});
			return stats.jpeg[0].url;
		},
	},
};
