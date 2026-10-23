/**
 * lib/content/providers/rest.ts
 * ---------------------------------------------------------------------------
 * Generic headless-CMS provider that fetches JSON over HTTP.
 *
 * Works with any CMS that can expose (or be proxied to expose) these routes:
 *   GET {CMS_API_URL}/site
 *   GET {CMS_API_URL}/projects
 *   GET {CMS_API_URL}/projects/{slug}
 *   GET {CMS_API_URL}/skills
 *   GET {CMS_API_URL}/experience
 *
 * Responses are passed through small "normalise" functions so common CMS
 * envelope formats (Strapi's `data` / `attributes`, plain arrays, etc.) are
 * mapped into our own types. Adapt the normalisers for your CMS of choice.
 *
 * Caching: every request is tagged with CONTENT_TAG so the
 * /api/revalidate webhook can purge all CMS content in one call.
 */
import type {
  ContentProvider,
  Experience,
  Project,
  SiteSettings,
  SkillGroup,
} from "../types";
import { site as fallbackSite } from "../local-data";

/** Cache tag shared by every CMS fetch - used for on-demand revalidation. */
export const CONTENT_TAG = "cms-content";

/** Loose record type for untyped CMS payloads. */
type Raw = Record<string, unknown>;

/** Read config lazily so env changes in dev are picked up. */
function config() {
  const baseUrl = process.env.CMS_API_URL;
  if (!baseUrl) {
    throw new Error('CMS_PROVIDER is "rest" but CMS_API_URL is not set.');
  }
  return {
    baseUrl: baseUrl.replace(/\/$/, ""), // strip trailing slash
    token: process.env.CMS_API_TOKEN,
    revalidate: Number(process.env.CMS_REVALIDATE_SECONDS ?? 3600),
  };
}

/**
 * Fetch JSON from the CMS with auth + Next.js data-cache options.
 * Returns null on 404 so "not found" can be handled by the caller.
 */
async function cmsFetch(path: string): Promise<unknown | null> {
  const { baseUrl, token, revalidate } = config();
  const res = await fetch(`${baseUrl}${path}`, {
    headers: {
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    // Next.js extension: cache the response, refresh it periodically, and
    // allow it to be purged instantly via revalidateTag(CONTENT_TAG).
    next: { revalidate, tags: [CONTENT_TAG] },
  });

  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(
      `CMS request failed: ${res.status} ${res.statusText} (${path})`,
    );
  }
  return res.json();
}

/**
 * Unwrap common CMS envelopes:
 *  - { data: ... }                  (Strapi, many REST APIs)
 *  - { attributes: {...} }          (Strapi v4 entries)
 *  - { items: [...] }               (Contentful-style collections)
 */
function unwrap(value: unknown): unknown {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    const obj = value as Raw;
    if ("data" in obj) return unwrap(obj.data);
    if ("items" in obj) return unwrap(obj.items);
    if ("attributes" in obj && typeof obj.attributes === "object") {
      return { ...(obj.attributes as Raw), id: obj.id };
    }
  }
  return value;
}

/** Ensure we always work with an array of unwrapped records. */
function asList(value: unknown): Raw[] {
  const unwrapped = unwrap(value);
  return Array.isArray(unwrapped) ? unwrapped.map((v) => unwrap(v) as Raw) : [];
}

/** Coerce a value to string, falling back to a default. */
const str = (v: unknown, fallback = ""): string =>
  typeof v === "string" ? v : fallback;

/** Accept either an array of strings or a single newline-separated string. */
const strList = (v: unknown): string[] =>
  Array.isArray(v)
    ? v.map((x) =>
        typeof x === "string" ? x : str((x as Raw)?.name ?? (x as Raw)?.title),
      )
    : typeof v === "string"
      ? v.split(/\n+/).filter(Boolean)
      : [];

/* ---------------------------- Normalisers ---------------------------- */

function normaliseSite(raw: Raw): SiteSettings {
  const seo = (raw.seo ?? {}) as Raw;
  return {
    name: str(raw.name, fallbackSite.name),
    role: str(raw.role, fallbackSite.role),
    tagline: str(raw.tagline, fallbackSite.tagline),
    about: strList(raw.about),
    email: str(raw.email, fallbackSite.email),
    location: str(raw.location) || undefined,
    socials: asList(raw.socials).map((s) => ({
      label: str(s.label),
      url: str(s.url),
    })),
    seo: {
      title: str(seo.title, fallbackSite.seo.title),
      description: str(seo.description, fallbackSite.seo.description),
    },
  };
}

function normaliseProject(raw: Raw): Project {
  // Images may arrive as a URL string or an object { url, alt, width, height }.
  const img = unwrap(raw.image) as Raw | string | undefined;
  const image =
    typeof img === "string"
      ? { url: img, alt: str(raw.title) }
      : img && typeof img === "object" && "url" in img
        ? {
            url: str(img.url),
            alt: str(img.alt, str(raw.title)),
            width: typeof img.width === "number" ? img.width : undefined,
            height: typeof img.height === "number" ? img.height : undefined,
          }
        : undefined;

  return {
    slug: str(raw.slug),
    title: str(raw.title),
    summary: str(raw.summary),
    description: strList(raw.description),
    tags: strList(raw.tags),
    year: String(raw.year ?? ""),
    role: str(raw.role) || undefined,
    image,
    liveUrl: str(raw.liveUrl) || undefined,
    repoUrl: str(raw.repoUrl) || undefined,
    featured: Boolean(raw.featured),
  };
}

function normaliseSkill(raw: Raw): SkillGroup {
  return {
    title: str(raw.title),
    level: Math.max(0, Math.min(100, Number(raw.level ?? 0))),
    items: strList(raw.items),
  };
}

function normaliseExperience(raw: Raw): Experience {
  return {
    company: str(raw.company),
    position: str(raw.position),
    period: str(raw.period),
    summary: str(raw.summary),
  };
}

/* ----------------------------- Provider ------------------------------ */

export const restProvider: ContentProvider = {
  async getSite() {
    const data = await cmsFetch("/site");
    // Fall back to seed settings if the CMS has no site document yet.
    return data ? normaliseSite(unwrap(data) as Raw) : fallbackSite;
  },

  async getProjects() {
    return asList(await cmsFetch("/projects")).map(normaliseProject);
  },

  async getProject(slug) {
    const data = await cmsFetch(`/projects/${encodeURIComponent(slug)}`);
    if (!data) return null;
    // Some CMSs return a list filtered by slug rather than a single entry.
    const entry = unwrap(data);
    const raw = Array.isArray(entry)
      ? (unwrap(entry[0]) as Raw | undefined)
      : (entry as Raw);
    return raw ? normaliseProject(raw) : null;
  },

  async getSkills() {
    return asList(await cmsFetch("/skills")).map(normaliseSkill);
  },

  async getExperience() {
    return asList(await cmsFetch("/experience")).map(normaliseExperience);
  },
};
