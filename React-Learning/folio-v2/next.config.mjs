/**
 * next.config.mjs
 * ---------------------------------------------------------------------------
 * Next.js runtime/build configuration.
 *
 * Headless note: when project images come from a CMS (Sanity, Contentful,
 * Strapi, Storyblok, WordPress, etc.) Next's <Image> component must be told
 * which remote hosts are allowed. Set CMS_IMAGE_HOSTNAME in your .env file
 * (e.g. "cdn.sanity.io" or "images.ctfassets.net") and it is whitelisted here.
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Strict mode double-invokes effects in development, which helps surface
  // missing cleanup in the three.js scene (we dispose everything on unmount).
  reactStrictMode: true,

  images: {
    // Only add a remote pattern if a CMS image host has been configured,
    // so the default (local-content) build stays locked down.
    remotePatterns: process.env.CMS_IMAGE_HOSTNAME
      ? [{ protocol: "https", hostname: process.env.CMS_IMAGE_HOSTNAME }]
      : [],
  },
};

export default nextConfig;
