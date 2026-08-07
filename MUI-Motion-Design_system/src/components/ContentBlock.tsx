import { RichText } from "./RichText";

export function ContentBlock({ data }: { data: any }) {
	return (
		<div className="mb-4">
			<h3>
				<strong>Content Block</strong> - {data.id}
			</h3>
			<RichText body={data.properties.body} />
		</div>
	);
}
