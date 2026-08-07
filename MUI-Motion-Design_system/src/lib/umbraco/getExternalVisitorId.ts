export async function getExternalVisitorId({
	currentPath,
	ipAddress,
	userAgent,
	referrer,
}: {
	currentPath: string;
	ipAddress?: string;
	userAgent?: string;
	referrer?: string;
}): Promise<string> {
	console.log(`[Engage] Requesting external visitor ID`);
	const response = await fetch(
		`${process.env.UMBRACO_BASE_URL}/umbraco/engage/api/v1/analytics/pageview/trackpageview/server`,
		{
			method: "POST",
			headers: {
				"Cache-Control": "no-cache",
				"Content-Type": "application/json",
				"Api-Key": process.env.UMBRACO_CONTENT_API_KEY || "",
			},
			body: JSON.stringify({
				url: `${process.env.BASE_URL}/${currentPath}`,
				remoteClientAddress: ipAddress,
				browserUserAgent: userAgent,
				referrerUrl: referrer,
				headers: "Accept-Language=en&Cache-Control=no-cache",
			}),
		}
	);

	if (!response.ok) {
		throw new Error(
			`[Engage] Failed to get external visitor ID: ${response.statusText}`
		);
	}

	const data = await response.json();
	if (!data || !data.externalVisitorId) {
		throw new Error("[Engage] Invalid response from external visitor ID API");
	}

	return data.externalVisitorId;
}
