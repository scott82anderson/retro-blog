// Site-wide settings. `url` is used for canonical links, Open Graph, the sitemap,
// feed and structured data.
export default {
	url: "https://scottanderson.com.au",
	title: "Scott Anderson",
	tagline: "100% human written dispatches on software, startups & the AI era",
	description:
		"Scott Anderson writes about building software, running startups and staying useful at work in the age of AI. Product engineer and co-founder based in Melbourne, Australia.",
	language: "en-AU",
	locale: "en_AU",
	defaultImage: "/assets/img/og-default.png",
	author: {
		name: "Scott Anderson",
		jobTitle: "Product engineer & co-founder",
		location: "Melbourne, Australia",
		image: "/assets/img/scott-portrait.jpg",
		shortBio:
			"Scott is a product engineer and co-founder in Melbourne who has been building web software since 2002. He co-founded Floats.ai and Sirius.dev, and wrote Future Proof: The White-Collar Worker's Guide to the AI Era.",
		sameAs: [
			"https://www.linkedin.com/in/scott82anderson/",
			"https://www.thefutureproofbook.com/",
		],
		worksFor: [
			{ name: "Floats.ai", url: "https://floats.ai/" },
			{ name: "Sirius.dev", url: "https://sirius.dev/" },
		],
	},
	links: {
		linkedin: "https://www.linkedin.com/in/scott82anderson/",
		book: "https://www.thefutureproofbook.com/",
	},
	nav: [
		{ label: "Latest", url: "/" },
		{ label: "Archive", url: "/archive/" },
		{ label: "Tags", url: "/tags/" },
		{ label: "About", url: "/about/" },
	],
	postsPerPage: 10,
};
