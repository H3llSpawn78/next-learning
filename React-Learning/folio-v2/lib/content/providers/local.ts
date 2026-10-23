/**
 * lib/content/providers/local.ts
 * ---------------------------------------------------------------------------
 * Content provider that serves the in-repo seed data from local-data.ts.
 *
 * It implements the same async ContentProvider contract as the remote
 * providers, so components never know (or care) where content comes from.
 */
import type { ContentProvider } from "../types";
import { experience, projects, site, skills } from "../local-data";

export const localProvider: ContentProvider = {
  // Each method simply resolves the static data - async keeps the API uniform.
  async getSite() {
    return site;
  },

  async getProjects() {
    return projects;
  },

  async getProject(slug) {
    // Return null (not undefined) so callers can reliably trigger notFound().
    return projects.find((p) => p.slug === slug) ?? null;
  },

  async getSkills() {
    return skills;
  },

  async getExperience() {
    return experience;
  },
};
