import { notFound } from "next/navigation";

import { getPage } from "@/lib/umbraco/api";
import { ComponentLoader } from "@/components/loader/ComponentLoader";

export default async function Page() {
	const page = await getPage("/johns-page", "");

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

	return (
		<div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
			<main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
				<h1>Content Fetcher</h1>
				<p>This is a hardcoded page designed to get an item from ContentAPI</p>

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

				<pre className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded w-full overflow-x-auto">
					{JSON.stringify(page, null, 2)}
				</pre>
			</main>
		</div>
	);
}
