export async function sendVisitorIdPageTrack({
	currentPath,
	ipAddress,
	userAgent,
	referrer,
	visitorId,
	userId,
}: {
	currentPath: string;
	ipAddress?: string;
	userAgent?: string;
	referrer?: string;
	visitorId: string;
	userId?: string;
}): Promise<boolean> {
	if (!visitorId || !currentPath) {
		throw new Error(
			"[Engage] Visitor ID and current path are required to send page track."
		);
	}

	console.log(`[Engage] Sending page track for URL: ${currentPath}`);

	const response = await fetch(
		`${process.env.UMBRACO_BASE_URL}/umbraco/engage/api/v1/analytics/pageview/trackpageview/server`,
		{
			method: "POST",
			headers: {
				"Cache-Control": "no-cache",
				"Content-Type": "application/json",
				"Api-Key": process.env.UMBRACO_CONTENT_API_KEY || "",
				"External-Visitor-Id": visitorId,
			},
			body: JSON.stringify({
				url: `${process.env.BASE_URL}/${currentPath}`,
				remoteClientAddress: ipAddress,
				browserUserAgent: userAgent,
				referrerUrl: referrer,
				headers: "Accept-Language=en&Cache-Control=no-cache",
				userId: userId ?? "",
			}),
		}
	);

	if (!response.ok) {
		throw new Error(
			`[Engage] Failed to send page track: ${response.statusText}`
		);
	}

	return true;
}
