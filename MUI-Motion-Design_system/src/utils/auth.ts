import { getUserInfo } from "@/lib/umbraco/getUserInfo";
import NextAuth from "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
	interface Session {
		idToken?: string;
		accessToken?: string;
		error?: string;
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		id_token?: string;
		access_token: string;
		expires_at: number;
		refresh_token?: string;
		error?: string;
	}
}

async function discoverIssuer() {
	const response = await fetch(
		`${process.env.UMBRACO_ISSUER}/.well-known/openid-configuration`,
		{
			cache: "no-store",
		}
	);

	if (!response.ok) {
		throw new Error(
			"Failed to discover issuer for openID: " +
				response.statusText +
				" " +
				process.env.UMBRACO_ISSUER
		);
	}

	return response.json() as Promise<{
		token_endpoint: string;
		revocation_endpoint: string;
		end_session_endpoint: string;
	}>;
}

export async function terminateSession(idToken?: string) {
	const { end_session_endpoint } = await discoverIssuer();

	const logoutUrl = new URL(end_session_endpoint);
	if (idToken) {
		logoutUrl.searchParams.set("id_token_hint", idToken);
	}
	logoutUrl.searchParams.set(
		"post_logout_redirect_uri",
		`${process.env.BASE_URL}/`
	);

	return logoutUrl.toString();
}

async function refreshAccessToken(token: any) {
	const { token_endpoint } = await discoverIssuer();

	console.log(`Refreshing token on ${token_endpoint}`);

	const response = await fetch(token_endpoint, {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: new URLSearchParams({
			grant_type: "refresh_token",
			refresh_token: token.refresh_token!,
			client_id: "umbraco-member",
		}),
	});

	if (!response.ok) {
		throw new Error("Failed to refresh access token");
	}

	const refreshedTokens = await response.json();

	return {
		...token,
		access_token: refreshedTokens.access_token,
		refresh_token: refreshedTokens.refresh_token ?? token.refresh_token, // Fall back to old refresh token
		expires_at: Date.now() + refreshedTokens.expires_in * 1000,
	};
}

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		{
			id: "umbraco",
			name: "Umbraco Members",
			type: "oidc",
			issuer: process.env.UMBRACO_ISSUER,
			clientId: "umbraco-member",
			clientSecret: process.env.UMBRACO_AUTH_CLIENT_SECRET,
			client: { token_endpoint_auth_method: "none" },
			checks: ["pkce", "state"],
			authorization: {
				params: {
					scope: "openid offline_access",
				},
			},
			wellKnown: `${process.env.UMBRACO_ISSUER}/.well-known/openid-configuration`,
			profile(profile) {
				return {
					id: profile.sub,
					name: profile.name,
					email: profile.email,
				};
			},
		},
	],
	session: {
		strategy: "jwt",
		maxAge: parseInt(process.env.ROLLING_SESSION_SECONDS || "1200", 10), // 20 minutes fallback
	},
	pages: {
		signIn: "/login",
	},
	callbacks: {
		async jwt({ token, account }) {
			if (account) {
				// User has just logged in
				if (!account.access_token || !account.refresh_token) {
					throw new Error("Missing access or refresh token");
				}
				return {
					...token,
					access_token: account.access_token,
					refresh_token: account.refresh_token,
					id_token: account.id_token,
					expires_at: account.expires_at,
				};
			}

			if (
				token.expires_at &&
				Date.now() < (token.expires_at as number) * 1000
			) {
				// Subsequent logins, but the `access_token` is still valid
				return token;
			}
			// Subsequent logins, but the `access_token` has expired, try to refresh it
			if (!token.refresh_token) {
				return { ...token, error: "No refresh token" };
			}

			try {
				return await refreshAccessToken(token);
			} catch (error) {
				return { ...token, error: "Failed to refresh access token" };
			}
		},
		async session({ session, token }) {
			const userInfo = await getUserInfo(token.access_token);

			session.error = token.error;
			session.idToken = token.id_token;
			session.accessToken = token.access_token;
			if (userInfo) {
				session.user.name = userInfo.name;
				session.user.email = userInfo.email;
				session.user.id = userInfo.sub;
			}
			return session;
		},
	},
});
