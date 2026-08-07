import Link from "next/link";

export function CTA({ data }: { data: any }) {
	const links = data?.properties?.link;

	return (
		<div className="p-4 mb-4 border rounded bg-gray-100">
			<h2>{data?.properties?.heading}</h2>
			{links.map((link: any, index: number) => (
				<Link
					key={`${link.url}-${index}`}
					target={link.target}
					href={link.url}
					className="text-blue-500 underline hover:font-bold"
				>
					{link.title || "Learn more"}
				</Link>
			))}
		</div>
	);
}
