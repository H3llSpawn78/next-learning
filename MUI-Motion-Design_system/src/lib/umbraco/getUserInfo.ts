interface UserInfo {
	sub: string;
	name: string;
	email: string;
	role: string[];
}

export async function getUserInfo(accessToken: string): Promise<UserInfo> {
	if (!accessToken) {
		throw new Error("User is not authenticated");
	}

	// TODO: Read this url directly from well-known endpoint
	const response = await fetch(
		`${process.env.UMBRACO_BASE_URL}/umbraco/delivery/api/v1/security/member/userinfo`,
		{
			method: "GET",
			headers: {
				"Cache-Control": "no-cache",
				"Content-Type": "application/json",
				"Api-Key": process.env.UMBRACO_CONTENT_API_KEY || "",
				"Authorization": `Bearer ${accessToken}`,
			},
		}
	);

	if (!response.ok) {
		throw new Error(
			`Failed to get user info from Umbraco: ${response.statusText}`
		);
	}

	return (await response.json()) as UserInfo;
}
