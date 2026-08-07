"use client";
import { useEffect } from "react";
export default function ClientSideVisitorIdStorer({
	newVisitorId,
}: {
	newVisitorId: string;
}) {
	useEffect(() => {
		fetch("/api/visitor-id", {
			method: "POST",
			cache: "no-store",
			body: JSON.stringify({ visitorId: newVisitorId }),
		}).catch((error) => {
			console.error("Failed to update visitor ID:", error);
		});
	}, [newVisitorId]);

	return null;
}
