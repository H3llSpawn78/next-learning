import type { NextRequest } from "next/server";
import { getCache, getTTL } from "@/lib/redis/api";
import { Page } from "@/lib/umbraco/types";

export async function GET(request: NextRequest) {
	if (request.headers.get("api-key") !== process.env.UMBRACO_CONTENT_API_KEY) {
		return Response.json({ message: "Unauthorized" }, { status: 401 });
	}

	const searchParams = request.nextUrl.searchParams;
	const path = searchParams.get("path");

	if (!path) {
		return Response.json({ message: "Missing parameters" }, { status: 400 });
	}

	const cached = await getCache<Page>(`page:${path}`);
	if (cached) {
		const ttl = await getTTL(`page:${path}`);
		return Response.json({ status: "ok", body: cached, ttl }, { status: 200 });
	}

	return Response.json(
		{ status: "fail", message: "Page not found in cache" },
		{ status: 404 }
	);
}
