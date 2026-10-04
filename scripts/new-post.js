#!/usr/bin/env node
// Scaffold a new post: npm run new "My post title"
import fs from "node:fs";
import path from "node:path";

const title = process.argv.slice(2).join(" ").trim();
if (!title) {
	console.error('Usage: npm run new "My post title"');
	process.exit(1);
}

const slug = title
	.toLowerCase()
	.normalize("NFKD")
	.replace(/[̀-ͯ]/g, "")
	.replace(/[^a-z0-9]+/g, "-")
	.replace(/^-+|-+$/g, "")
	.slice(0, 60)
	.replace(/-+$/, "");

const now = new Date();
const date = [now.getFullYear(), now.getMonth() + 1, now.getDate()].map((n) => String(n).padStart(2, "0")).join("-");
const dir = path.join("src", "posts", `${date}-${slug}`);

if (fs.existsSync(dir)) {
	console.error(`Already exists: ${dir}`);
	process.exit(1);
}

const yamlString = (s) => JSON.stringify(s);

fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(
	path.join(dir, "index.md"),
	`---
title: ${yamlString(title)}
description: "One or two sentences that sum up the article. Used for search results, social cards and listings."
date: ${date}
tags: []
# image: ./cover.jpg
# imageAlt: "Describe the cover image"
summary:
  - "Key point one"
  - "Key point two"
# faq:
#   - q: "A question a reader might ask?"
#     a: "A direct, self-contained answer."
draft: true
---

Open with a sentence or two that directly answers the question in the title.

## A heading phrased as a question?

Write here. Put images in this folder and reference them like this (alt text is required):

<!-- ![Describe what the image shows](./photo.jpg) -->
`
);

console.log(`Created ${path.join(dir, "index.md")}`);
console.log("It's a draft: visible with `npm run dev`, hidden from production until you remove `draft: true`.");
