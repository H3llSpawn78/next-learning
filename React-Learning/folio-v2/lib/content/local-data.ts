/**
 * lib/content/local-data.ts
 * ---------------------------------------------------------------------------
 * Seed content used by the "local" provider. This lets the site run with zero
 * configuration, and doubles as a reference for what your CMS should return.
 *
 * Replace the placeholder text below with your own details, or switch
 * CMS_PROVIDER to "rest" and serve the same shape from a headless CMS.
 */
import type { Experience, Project, SiteSettings, SkillGroup } from "./types";

/** Global settings - name, tagline, socials and SEO defaults. */
export const site: SiteSettings = {
  name: "Your Name",
  role: "Creative Developer",
  tagline: "Engineering immersive interfaces at the edge of the web.",
  about: [
    "I design and build fast, expressive digital experiences - from component systems and headless commerce to real-time WebGL worlds.",
    "My work sits where engineering rigour meets visual craft: typed, tested front-ends with motion, shaders and a lot of attention to detail.",
  ],
  email: "hello@example.com",
  location: "Earth // Orbit 3",
  socials: [
    { label: "GitHub", url: "https://github.com/" },
    { label: "LinkedIn", url: "https://www.linkedin.com/" },
    { label: "X / Twitter", url: "https://x.com/" },
  ],
  seo: {
    title: "Your Name - Creative Developer",
    description:
      "Portfolio of Your Name: creative developer building immersive, high-performance web experiences with React, Next.js and WebGL.",
  },
};

/** Portfolio projects. `featured: true` renders a wide card on the home page. */
export const projects: Project[] = [
  {
    slug: "nebula-commerce",
    title: "Nebula Commerce",
    summary:
      "Headless storefront with sub-second page loads and a WebGL product configurator.",
    description: [
      "A composable commerce build pairing Next.js with a headless CMS and commerce API.",
      "Product pages are statically generated and revalidated on publish via webhooks, while a three.js configurator lets customers explore products in real time.",
    ],
    tags: ["Next.js", "Headless CMS", "three.js", "Edge"],
    year: "2025",
    role: "Lead Front-end Engineer",
    liveUrl: "https://example.com",
    featured: true,
  },
  {
    slug: "orbital-dashboard",
    title: "Orbital Dashboard",
    summary:
      "Real-time telemetry dashboard visualising thousands of data streams.",
    description: [
      "A data-dense operations dashboard rendering live metrics with canvas and WebGL for smooth 60fps updates.",
      "Built a typed design system so new panels could be composed in minutes.",
    ],
    tags: ["React", "WebSockets", "D3", "Design System"],
    year: "2024",
    role: "Front-end Engineer",
    repoUrl: "https://github.com/",
  },
  {
    slug: "signal-brand-site",
    title: "Signal Brand Site",
    summary:
      "Award-style marketing site with scroll-driven shader transitions.",
    description: [
      "Marketing site where every section transition is a custom GLSL shader driven by scroll position.",
      "Content editors manage every page through a headless CMS with live preview.",
    ],
    tags: ["GLSL", "Next.js", "Motion", "CMS"],
    year: "2024",
    role: "Creative Developer",
    liveUrl: "https://example.com",
  },
  {
    slug: "void-audio",
    title: "Void Audio",
    summary: "Browser-based audio visualiser reacting to microphone input.",
    description: [
      "Uses the Web Audio API to analyse frequency data and drive a particle field in real time.",
    ],
    tags: ["Web Audio", "three.js", "TypeScript"],
    year: "2023",
    repoUrl: "https://github.com/",
  },
];

/** Skill groups rendered as glowing "system modules". */
export const skills: SkillGroup[] = [
  {
    title: "Front-end Core",
    level: 95,
    items: ["React", "Next.js", "TypeScript", "CSS / Motion"],
  },
  {
    title: "Creative Tech",
    level: 85,
    items: ["three.js", "GLSL", "WebGL", "Canvas"],
  },
  {
    title: "Headless & Data",
    level: 80,
    items: ["Headless CMS", "GraphQL", "REST", "Edge caching"],
  },
  {
    title: "Delivery",
    level: 88,
    items: ["Performance", "Accessibility", "Testing", "CI/CD"],
  },
];

/** Work history for the timeline section (most recent first). */
export const experience: Experience[] = [
  {
    company: "Starfield Studio",
    position: "Senior Creative Developer",
    period: "2023 - Present",
    summary:
      "Leading front-end architecture for immersive brand and commerce experiences.",
  },
  {
    company: "Quantum Labs",
    position: "Front-end Engineer",
    period: "2020 - 2023",
    summary:
      "Built design systems and data-visualisation tooling for enterprise clients.",
  },
  {
    company: "Pixel Forge",
    position: "Web Developer",
    period: "2018 - 2020",
    summary:
      "Shipped marketing sites and interactive campaigns for global brands.",
  },
];
