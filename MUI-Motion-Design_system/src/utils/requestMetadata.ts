import { headers } from "next/headers";

export async function getRequestMetadata() {
	const requestHeaders = await headers();
	const userAgent = requestHeaders.get("user-agent") || undefined;
	const forwardedFor = requestHeaders.get("x-forwarded-for") ?? "127.0.0.1";
	const ipAddress =
		forwardedFor.split(",")[0]?.trim() ||
		requestHeaders.get("x-real-ip") ||
		requestHeaders.get("cf-connecting-ip") ||
		"127.0.0.1";

	const referrer = requestHeaders.get("referer") || undefined;
	return {
		ipAddress,
		userAgent,
		referrer,
	};
}
