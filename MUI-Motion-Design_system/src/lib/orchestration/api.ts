import type { User, OrchestrationResponse } from "./types";
import { auth } from "@/utils/auth";

export async function getUserById(userId: string): Promise<User | null> {
	const session = await auth();
	const token = session?.idToken;

	if (!token) {
		console.error("No access token found in session.");
		return null;
	}

	const apiPath = `${process.env.ORCHESTRATION_BASE_URL}/api/v1/users/${userId}`;

	console.log("Fetching user from API:", apiPath);

	const response = await fetch(apiPath, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (!response.ok) {
		console.error("Failed to fetch user:", response.statusText);
		return null;
	}

	const userResponse: OrchestrationResponse<User> = await response.json();
	return userResponse.result;
}
