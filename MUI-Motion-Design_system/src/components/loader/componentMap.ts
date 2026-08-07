import dynamic from "next/dynamic";
import type { ComponentType } from "react";

export type ComponentLoaderData = unknown;
export type ComponentLoaderProps = {
	data: ComponentLoaderData;
};

type ComponentRegistry = Record<string, ComponentType<ComponentLoaderProps>>;

export const componentMap = {
	cta: dynamic<ComponentLoaderProps>(() =>
		import("../CTA").then((mod) => mod.CTA)
	),
	contentblock: dynamic<ComponentLoaderProps>(() =>
		import("../ContentBlock").then((mod) => mod.ContentBlock)
	),
	apitest: dynamic<ComponentLoaderProps>(() =>
		import("../APITest").then((mod) => mod.APITest)
	),
} satisfies ComponentRegistry;
