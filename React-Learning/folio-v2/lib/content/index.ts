/**
 * lib/content/index.ts
 * ---------------------------------------------------------------------------
 * Public entry point for all content. Pages/components import from here:
 *
 *   import { getSite, getProjects } from '@/lib/content';
 *
 * The active provider is chosen by the CMS_PROVIDER env variable, so moving
 * from local seed data to a headless CMS is a config change, not a refactor.
 * To add another CMS (e.g. a GraphQL one), implement ContentProvider in
 * ./providers and register it in the `providers` map below.
 */
import type { ContentProvider } from "./types";
import { localProvider } from "./providers/local";
import { restProvider } from "./providers/rest";

export type * from "./types";
export { CONTENT_TAG } from "./providers/rest";

/** Registry of available providers keyed by CMS_PROVIDER value. */
const providers: Record<string, ContentProvider> = {
  local: localProvider,
  rest: restProvider,
};

/** Resolve the provider for this request/build, defaulting to local data. */
function provider(): ContentProvider {
  const key = process.env.CMS_PROVIDER ?? "local";
  const selected = providers[key];
  if (!selected) {
    throw new Error(
      `Unknown CMS_PROVIDER "${key}". Expected one of: ${Object.keys(providers).join(", ")}`,
    );
  }
  return selected;
}

/* Thin wrappers keep call sites short and provider-agnostic. */
export const getSite = () => provider().getSite();
export const getProjects = () => provider().getProjects();
export const getProject = (slug: string) => provider().getProject(slug);
export const getSkills = () => provider().getSkills();
export const getExperience = () => provider().getExperience();
