/**
 * app/not-found.tsx
 * ---------------------------------------------------------------------------
 * Themed 404 page - shown for unknown routes and when a project slug
 * doesn't exist in the CMS (via notFound()).
 */
import GlowButton from "@/components/ui/GlowButton";

export default function NotFound() {
  return (
    <section className="section not-found">
      <p className="section-heading__label">
        <span className="section-heading__index">404</span> {"//"} SIGNAL LOST
      </p>
      <h1 className="project-detail__title gradient-text">
        Lost in deep space
      </h1>
      <p className="hero__tagline">
        The coordinates you requested don&apos;t exist in this sector.
      </p>
      <div className="hero__actions">
        <GlowButton href="/">Return to Base</GlowButton>
      </div>
    </section>
  );
}
