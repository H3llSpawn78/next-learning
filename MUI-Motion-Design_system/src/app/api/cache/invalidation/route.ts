import type { NextRequest } from "next/server";
import { invalidateTag } from "@/lib/redis/api";

export async function POST(request: NextRequest) {
	if (request.headers.get("api-key") !== process.env.WEBHOOK_API_KEY) {
		return Response.json({ message: "Unauthorized" }, { status: 401 });
	}

	//var contentEvent = request.headers.get("umb-webhook-event");
	var body = await request.json();

	console.log([
		"[REDIS] Webhook received. Invalidating cache for tag:",
		body.id,
	]);

	invalidateTag(body.id);

	return Response.json({ message: "Webhook received successfully" });
}

/*{
	contentType: 'contentPage',
	name: 'API Component',
	createDate: '2026-06-12T16:00:19.18Z',
	updateDate: '2026-06-25T13:30:10.52Z',
	route: {
		path: '/api-component',
		queryString: null,
		startItem: {
			id: '56319726-d2f9-49f4-98cf-f4fa887db66a',
			path: 'default-site-home'
		}
	},
	id: '2ad48764-3d38-474b-825f-f6ef3629f98a',
	properties: {
		metaTitle: null,
		metaDescription: null,
		structuredData: null,
		displayName: null,
		excludeFromSearch: false,
		excludeFromSitemap: false,
		noIndex: false,
		noFollow: false,
		umbracoUrlName: null,
		umbracoUrlAliases: null,
		body: { gridColumns: 12, items: [Array] },
		isGatedPage: false
	}
}*/
