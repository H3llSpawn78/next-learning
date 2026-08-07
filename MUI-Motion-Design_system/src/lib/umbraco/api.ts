import { Page, UmbracoNode, UmbracoPagedResult } from "./types";
import { UMBRACO_CONTENT_API_ENDPOINT } from "./constants";
import { auth } from "@/utils/auth";
import { getCache, setCache } from "../redis/api";

export async function umbracoContentFetch<T>(opts: {
	method: string;
	path: string;
	query?: Record<string, string | string[]>;
	headers?: HeadersInit;
	cache?: RequestCache;
	tags?: string[];
	payload?: any | undefined;
}): Promise<{ status: number; body: T } | never> {
	const session = await auth();
	const jwt = session as any;
	const accessToken = jwt?.accessToken;

	if (accessToken) {
		console.log(
			"Adding access/bearer token to request headers for Umbraco Content API"
		);
		opts.headers = {
			...opts.headers,
			Authorization: `Bearer ${accessToken}`,
		};
	} else {
		console.log(
			"No access token found in session. Proceeding without Authorization header for Umbraco Content API."
		);
	}

	opts.headers = {
		"Content-Type": "application/json",
		"Api-Key": process.env.UMBRACO_CONTENT_API_KEY!,
		"Cache-Control": "no-cache", // TODO: Set no cache for now, needs reviewing
		"Preview": process.env.UMBRACO_PREVIEW_CONTENT ?? "true", // For some reason this is needed to see personalised content
		...opts.headers,
	};

	opts.path = `${process.env.UMBRACO_BASE_URL}${UMBRACO_CONTENT_API_ENDPOINT}${opts.path}`;

	try {
		const options: RequestInit = {
			method: opts.method,
			headers: opts.headers,
			cache: opts.cache,
			...(opts.tags && { next: { tags: opts.tags } }),
		};

		if (opts.payload) {
			options.body = JSON.stringify(opts.payload);
		}

		let url = opts.path;

		if (opts.query) {
			const searchParams = new URLSearchParams();

			Object.entries(opts.query).forEach(([key, values]) => {
				if (Array.isArray(values)) {
					values.forEach((value) => {
						searchParams.append(key, value);
					});
				} else {
					searchParams.append(key, values);
				}
			});

			url += url.indexOf("?") >= 0 ? "&" : "?";
			url += searchParams.toString();
		}

		const decodedUrl = decodeURIComponent(url); // We decode to avoid double encoding issues, as the URLSearchParams will encode values
		const result = await fetch(decodedUrl, options);

		let body;
		try {
			body = await result.json();
		} catch (parseError) {
			throw {
				error: parseError,
				message: "Failed to parse response as JSON",
			};
		}

		return {
			status: result.status,
			body,
		};
	} catch (e: any) {
		// if (isUmbracoError(e)) {
		//   throw {
		//     status: e.status || 500,
		//     message: e.message
		//   };
		// }

		// throw {
		// 	error: e,
		// };

		return {
			status: 500,
			body: e.message || "An unknown error occurred",
		};
	}
}

const reshapePage = (node: UmbracoNode): Page => {
	const nodeAlias = node.route.path
		.replace(/^\/+|\/+$/g, "")
		.split("/")
		.pop();
	const nodeHandle = nodeAlias || node.id;

	const metaTitle = node.properties["metaTitle"]?.toString() || node.name;
	const metaDescription = node.properties["metaDescription"]?.toString();

	return {
		id: node.id,
		handle: nodeHandle,
		title: node.name,
		body: node.properties["body"],
		properties: node.properties,
		seo: {
			title: metaTitle,
			description: metaDescription,
		},
		contentType: node.contentType,
		createdAt: node.createDate,
		updatedAt: node.updateDate,
		excludeFromSearch: node.properties["excludeFromSearch"] === true,
		excludeFromSitemap: node.properties["excludeFromSitemap"] === true,
	};
};

const reshapePages = (nodes: UmbracoNode[]): Page[] => {
	return <Page[]>(nodes || []).map((n) => reshapePage(n)).filter((n) => !!n);
};

export type FetchError = {
	status: number;
	message: string;
};

export async function getPage(
	handle: string,
	externalVisitorId: string
): Promise<Page | FetchError> {
	console.log(
		"Sending request to Umbraco Content API for page with handle:",
		handle
	);

	/// Check if redis has the page cached
	const cached = await getCache<Page>(`page:${handle}`);
	if (cached) {
		console.log("[REDIS] Retrieved cached page for handle:", handle);
		return cached;
	}

	// Continue to get request from Umbraco API
	const res = await umbracoContentFetch<UmbracoNode>({
		method: "GET",
		path: `/content/item/${handle}`,
		query: {
			fields: "properties[$all]",
			value: "",
		},
		headers: {
			"External-Visitor-Id": externalVisitorId,
		},
	});

	if (res.status !== 200 || !res.body) {
		return {
			status: res.status || 404,
			message: "Error fetching page data from Umbraco Content API",
			// message: res.body?.message || `Page with handle '${handle}' not found`,
		};
	}

	const shapedPage = reshapePage(res.body);

	// Cache the page in Redis for future requests
	console.log("[REDIS] Storing page in cache for handle:", handle);
	await setCache<Page>(`page:${handle}`, shapedPage, {
		tags: [shapedPage.id],
	});

	return shapedPage;
}

export async function getPages(): Promise<Page[]> {
	const res = await umbracoContentFetch<UmbracoPagedResult<UmbracoNode>>({
		method: "GET",
		path: `/content`,
		query: {
			fetch: `children:pages`,
			fields: "properties[$all]",
		},
	});

	return reshapePages(
		res.body?.items.filter(
			(node) =>
				!node.properties["umbracoNaviHide"] ||
				node.properties["umbracoNaviHide"] === false
		)
	);
}
