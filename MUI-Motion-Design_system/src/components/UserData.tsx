import { auth } from "@/utils/auth";

export default async function UserData() {
	const session = await auth();

	if (!session?.user) {
		return null;
	}

	return <div>You are logged in as {session.user.name}</div>;
}
