// Schema.org JSON-LD builders, registered as Eleventy filters.
// Templates call e.g. `{{ site | schemaPerson | jsonLd | safe }}`.

const abs = (site, url) => (url ? new URL(url, site.url).href : undefined);

export function schemaPerson(site) {
	const a = site.author;
	return {
		"@type": "Person",
		"@id": `${site.url}/about/#person`,
		name: a.name,
		url: abs(site, "/about/"),
		image: abs(site, a.image),
		jobTitle: a.jobTitle,
		description: a.shortBio,
		homeLocation: { "@type": "Place", name: a.location },
		worksFor: a.worksFor.map((o) => ({ "@type": "Organization", name: o.name, url: o.url })),
		sameAs: a.sameAs,
	};
}

export function schemaWebSite(site) {
	return {
		"@type": "WebSite",
		"@id": `${site.url}/#website`,
		url: abs(site, "/"),
		name: site.title,
		description: site.description,
		inLanguage: site.language,
		publisher: { "@id": `${site.url}/about/#person` },
		potentialAction: {
			"@type": "SearchAction",
			target: { "@type": "EntryPoint", urlTemplate: `${site.url}/search/?q={search_term_string}` },
			"query-input": "required name=search_term_string",
		},
	};
}

// crumbs: [{ name, url }]
export function schemaBreadcrumbs(crumbs, site) {
	return {
		"@type": "BreadcrumbList",
		itemListElement: crumbs.map((c, i) => ({
			"@type": "ListItem",
			position: i + 1,
			name: c.name,
			item: abs(site, c.url),
		})),
	};
}

// ctx: { site, page, title, description, ogImage, tags, updated, wordCount }
export function schemaBlogPosting(ctx) {
	const { site, page } = ctx;
	return {
		"@type": "BlogPosting",
		"@id": `${abs(site, page.url)}#article`,
		mainEntityOfPage: abs(site, page.url),
		url: abs(site, page.url),
		headline: ctx.title,
		description: ctx.description,
		image: abs(site, ctx.ogImage || site.defaultImage),
		datePublished: page.date.toISOString(),
		dateModified: (ctx.updated || page.date).toISOString(),
		inLanguage: site.language,
		keywords: ctx.tags,
		wordCount: ctx.wordCount,
		author: { "@id": `${site.url}/about/#person` },
		publisher: { "@id": `${site.url}/about/#person` },
		isPartOf: { "@id": `${site.url}/#website` },
	};
}

// faq: [{ q, a }]
export function schemaFaq(faq) {
	return {
		"@type": "FAQPage",
		mainEntity: faq.map(({ q, a }) => ({
			"@type": "Question",
			name: q,
			acceptedAnswer: { "@type": "Answer", text: a },
		})),
	};
}

export function schemaCollection(ctx) {
	const { site, page } = ctx;
	return {
		"@type": "CollectionPage",
		url: abs(site, page.url),
		name: ctx.title,
		description: ctx.description,
		isPartOf: { "@id": `${site.url}/#website` },
		hasPart: (ctx.posts || []).map((p) => ({
			"@type": "BlogPosting",
			headline: p.data.title,
			url: abs(site, p.url),
			datePublished: p.date.toISOString(),
		})),
	};
}

export function schemaProfilePage(ctx) {
	const { site, page } = ctx;
	return {
		"@type": "ProfilePage",
		url: abs(site, page.url),
		name: ctx.title,
		mainEntity: { "@id": `${site.url}/about/#person` },
		isPartOf: { "@id": `${site.url}/#website` },
	};
}

export function schemaGraph(nodes) {
	return { "@context": "https://schema.org", "@graph": nodes.filter(Boolean) };
}

// One entry point for templates: builds the full @graph for the current page.
// ctx: { site, page, kind, title, description, ogImage, tags, updated, faq, posts, wordCount }
export function schemaForPage(ctx) {
	const { site, page, kind } = ctx;
	const nodes = [schemaWebSite(site), schemaPerson(site)];
	const home = { name: "Home", url: "/" };

	if (kind === "post") {
		nodes.push(schemaBlogPosting(ctx));
		nodes.push(schemaBreadcrumbs([home, { name: "Archive", url: "/archive/" }, { name: ctx.title, url: page.url }], site));
		if (ctx.faq?.length) nodes.push(schemaFaq(ctx.faq));
	} else if (kind === "about") {
		nodes.push(schemaProfilePage(ctx));
		nodes.push(schemaBreadcrumbs([home, { name: ctx.title, url: page.url }], site));
	} else if (kind === "tag") {
		nodes.push(schemaCollection(ctx));
		nodes.push(schemaBreadcrumbs([home, { name: "Tags", url: "/tags/" }, { name: ctx.title, url: page.url }], site));
	} else if (kind === "collection") {
		nodes.push(schemaCollection(ctx));
		if (page.url !== "/") nodes.push(schemaBreadcrumbs([home, { name: ctx.title, url: page.url }], site));
	}
	return schemaGraph(nodes);
}
