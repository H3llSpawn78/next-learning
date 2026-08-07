import { auth, signOut, signIn, terminateSession } from "@/utils/auth";
import { redirect } from "next/navigation";
export default async function LoginButton() {
	const session = await auth();

	if (session) {
		return (
			<form
				action={async () => {
					"use server";
					const logoutUrl = await terminateSession(
						(session as { idToken?: string }).idToken
					);
					await signOut({ redirect: false });
					redirect(logoutUrl);
				}}
			>
				<button type="submit">Sign out</button>
			</form>
		);
	}
	return (
		<button
			onClick={async () => {
				"use server";
				await signIn("umbraco", { redirectTo: "/" });
			}}
		>
			Sign in
		</button>
	);
}
