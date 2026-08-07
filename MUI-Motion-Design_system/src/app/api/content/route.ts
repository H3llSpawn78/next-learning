import { auth } from "@/utils/auth";

export async function GET() {
	const session = await auth();
	const jwt = session as any;

	const accessToken = jwt?.access_token;
	if (!accessToken) {
		return Response.json({ error: "Unauthorised" }, { status: 401 });
	}

	const response = await fetch(
		`${process.env.UMBRACO_API_URL}/umbraco/delivery/api/v2/content`,
		{
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
			cache: "no-store",
		}
	);

	if (!response.ok) {
		return Response.json(
			{ error: "Failed to fetch content" },
			{ status: response.status }
		);
	}

	return new Response(response.body, {
		status: response.status,
		headers: {
			"Content-Type":
				response.headers.get("Content-Type") || "application/json",
		},
	});
}
