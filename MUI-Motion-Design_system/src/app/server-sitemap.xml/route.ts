import { getServerSideSitemapIndex } from "next-sitemap";

export async function GET(request: Request) {
	// TODO: Grab urls from data source
	const urls = ["test-page", "test-page-2"];

	const deniedPaths = ["admin", "login"];

	urls.filter((url) => {
		return !deniedPaths.some((deniedPath) =>
			url.toLowerCase().startsWith(deniedPath)
		);
	});

	console.log("Sitemap generated successfully!", urls);

	return getServerSideSitemapIndex(urls);
}
