/**
 * lib/content/types.ts
 * ---------------------------------------------------------------------------
 * The single source of truth for the *shape* of portfolio content.
 *
 * Every UI component consumes these types - never raw CMS responses. That is
 * what makes the site "headless ready": swapping CMS vendors only means
 * writing a new provider that maps its payload into these interfaces.
 */

/** A social / contact link shown in the footer and contact section. */
export interface SocialLink {
  /** Human readable label, e.g. "GitHub". */
  label: string;
  /** Absolute URL (https://, mailto:, etc.). */
  url: string;
}

/** Global site settings - usually a "singleton" document in a CMS. */
export interface SiteSettings {
  /** Your name, rendered as the hero headline. */
  name: string;
  /** Short role/title, e.g. "Creative Developer". */
  role: string;
  /** One-line hook shown under the headline. */
  tagline: string;
  /** Longer intro paragraph(s) for the About section. */
  about: string[];
  /** Contact email used by the "Open Channel" call-to-action. */
  email: string;
  /** Optional location string for the HUD-style meta line. */
  location?: string;
  /** Social/profile links. */
  socials: SocialLink[];
  /** <title> and meta description used for SEO. */
  seo: {
    title: string;
    description: string;
  };
}

/** A single portfolio project / case study. */
export interface Project {
  /** URL-safe identifier used for /projects/[slug]. */
  slug: string;
  title: string;
  /** Short card blurb (1-2 sentences). */
  summary: string;
  /** Long-form description paragraphs for the detail page. */
  description: string[];
  /** Tech / discipline tags. */
  tags: string[];
  /** Year (or range) the project shipped. */
  year: string;
  /** Your role on the project. */
  role?: string;
  /** Optional cover image (absolute URL - CMS asset URL works). */
  image?: { url: string; alt: string; width?: number; height?: number };
  /** Live site URL. */
  liveUrl?: string;
  /** Source code URL. */
  repoUrl?: string;
  /** Featured projects get a larger card on the home page. */
  featured?: boolean;
}

/** A group of related skills, rendered as one "system module" card. */
export interface SkillGroup {
  title: string;
  /** 0-100 "power level" displayed as a glowing meter. */
  level: number;
  items: string[];
}

/** A work-history entry for the timeline. */
export interface Experience {
  company: string;
  position: string;
  /** Free-form date range, e.g. "2022 - Present". */
  period: string;
  summary: string;
}

/**
 * Contract every content provider (local file, REST CMS, GraphQL CMS, ...)
 * must fulfil. All methods are async so remote providers fit naturally.
 */
export interface ContentProvider {
  getSite(): Promise<SiteSettings>;
  getProjects(): Promise<Project[]>;
  /** Returns null when the slug does not exist (drives the 404 page). */
  getProject(slug: string): Promise<Project | null>;
  getSkills(): Promise<SkillGroup[]>;
  getExperience(): Promise<Experience[]>;
}
