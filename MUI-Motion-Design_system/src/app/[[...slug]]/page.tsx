import { notFound } from "next/navigation";
import { auth } from "@/utils/auth";

import { getPage } from "@/lib/umbraco/api";
import { ComponentLoader } from "@/components/loader/ComponentLoader";
import Link from "next/link";

import { cookies } from "next/headers";
import { getExternalVisitorId } from "@/lib/umbraco/getExternalVisitorId";
import ClientSideVisitorIdStorer from "@/lib/umbraco/ClientSideVisitorIdStorer";
import { sendVisitorIdPageTrack } from "@/lib/umbraco/sendVisitorIdPageTrack";
import { getRequestMetadata } from "@/utils/requestMetadata";
import { getUserById } from "@/lib/orchestration/api";

type PageProps = {
	params: Promise<{
		slug?: string[];
	}>;
};

export default async function Page({ params }: PageProps) {
	const session = await auth();
	const { slug } = await params;
	const currentPath = slug?.join("/") || "/";
	const { ipAddress, userAgent, referrer } = await getRequestMetadata();

	const cookieStore = await cookies();
	let needToUpdateVisitorId = false;
	let externalVisitorId = cookieStore.get("externalVisitorId")?.value;
	let shouldSendPageViewTrack = true;

	if (!externalVisitorId) {
		try {
			const newVisitorId = await getExternalVisitorId({
				currentPath,
				ipAddress,
				userAgent,
				referrer,
			});

			if (!newVisitorId) {
				throw new Error(
					"[Engage] Failed to retrieve external visitor ID from API."
				);
			}

			shouldSendPageViewTrack = false;
			externalVisitorId = newVisitorId;
			needToUpdateVisitorId = true;
		} catch (error) {
			console.error("[Engage] Error fetching external visitor ID:", error);
			return (
				<h1>Issue retrieving external visitor ID</h1> // TODO: Replace with a proper error page or component
			);
		}
	}

	console.log(
		"[Engage] Getting page with External Visitor ID:",
		externalVisitorId
	);
	const page = await getPage(currentPath, externalVisitorId);

	if (shouldSendPageViewTrack) {
		await sendVisitorIdPageTrack({
			currentPath,
			visitorId: externalVisitorId,
			ipAddress,
			userAgent,
			referrer,
			userId: session?.user?.id,
		});
	}

	if ("status" in page && "message" in page) {
		return (
			<div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
				<p>{page.message}</p>
			</div>
		);
	}

	if (!page) {
		return notFound();
	}

	// Check if page is gated
	if (page && page.properties.isGatedPage === true) {
		if (session?.user?.email === undefined) {
			console.log("Page is gated and user is not signed in");
			return (
				<div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 text-red-500 font-sans dark:bg-black">
					<p>
						This page is gated. Please <Link href="/login">sign in</Link> to
						view the content.
					</p>
				</div>
			);
		}
	}

	const user = await getUserById(session?.user?.id || "");

	return (
		<>
			{needToUpdateVisitorId && (
				<ClientSideVisitorIdStorer newVisitorId={externalVisitorId} />
			)}

			{slug?.join("/")}

			<h2>Session</h2>
			<pre>{JSON.stringify(session, null, 2)}</pre>

			<h2>External Visitor ID</h2>
			{externalVisitorId ? (
				<p>{externalVisitorId}</p>
			) : (
				<p>No external visitor ID found.</p>
			)}

			<h2>Orchestration User</h2>
			{user ? (
				<pre>{JSON.stringify(user)}</pre>
			) : (
				<p>No user found for the current session.</p>
			)}

			{page.body?.items?.map((item: any) => {
				const componentBlueprint = item.content;
				if (!componentBlueprint) {
					return null;
				}
				return (
					<ComponentLoader
						key={componentBlueprint.id}
						componentType={componentBlueprint.contentType}
						data={componentBlueprint}
					/>
				);
			})}
		</>
	);
}
