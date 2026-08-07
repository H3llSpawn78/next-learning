import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const { visitorId } = await request.json();

	if (!visitorId) {
		return NextResponse.json(
			{ error: "Missing data in request" },
			{ status: 400 }
		);
	}

	const response = NextResponse.json({ status: 200 });
	response.cookies.set("externalVisitorId", visitorId, {
		httpOnly: true,
		sameSite: "lax",
		path: "/",
		maxAge: 2592000, // 30 days in seconds
	});
	return response;
}
