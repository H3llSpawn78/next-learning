import { componentMap, type ComponentLoaderData } from "./componentMap";

type ComponentType = keyof typeof componentMap;

function isKnownComponentType(name: string): name is ComponentType {
	return name in componentMap;
}

export function ComponentLoader({
	componentType,
	data,
}: {
	componentType: string;
	data: ComponentLoaderData;
}) {
	const normalizedComponentType = componentType.trim().toLowerCase();

	if (!isKnownComponentType(normalizedComponentType)) {
		return (
			<div className="text-red-500">Component "{componentType}" not found.</div>
		);
	}

	const ResolvedComponent = componentMap[normalizedComponentType];

	return <ResolvedComponent data={data} />;
}
