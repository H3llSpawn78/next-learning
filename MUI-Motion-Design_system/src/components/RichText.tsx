import { Fragment } from "react";

/* 
TODO: Review this entire approach, umbraco linked pages don't work with this approach
there may be a nice plugin for this that works with how umbraco returns data */
const renderNode = (node: any, index?: number): React.ReactNode => {
	if (node.tag === "#text") return node.text;

	const children = node.elements?.map((el: any, i: number) =>
		renderNode(el, i)
	);

	switch (node.tag) {
		case "p":
			return <p key={index}>{children}</p>;

		case "strong":
			return <strong key={index}>{children}</strong>;

		case "a":
			return (
				<a key={index} href={node.attributes?.href}>
					{children}
				</a>
			);

		case "#root":
			return <Fragment key={index}>{children}</Fragment>;

		default:
			return <Fragment key={index}>{children}</Fragment>;
	}
};

export function RichText({ body }: { body: any }) {
	return <>{renderNode(body)}</>;
}
