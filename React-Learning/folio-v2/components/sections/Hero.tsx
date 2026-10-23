/**
 * components/sections/Hero.tsx
 * ---------------------------------------------------------------------------
 * First screen: name, role, tagline and glowing CTAs. Text sits on the left
 * while the particle ship floats on the right (positioned in ParticleShip).
 */
import type { SiteSettings } from "@/lib/content";
import GlowButton from "@/components/ui/GlowButton";

export default function Hero({ site }: { site: SiteSettings }) {
  return (
    <section className="hero" id="top">
      {/* Terminal-style status line with a blinking "online" indicator. */}
      <p className="hero__status">
        <span className="pulse-dot" /> SYSTEM ONLINE{" "}
        {site.location ? `// ${site.location}` : ""}
      </p>

      <h1 className="hero__title">
        <span className="hero__name gradient-text">{site.name}</span>
        <span className="hero__role">{site.role}</span>
      </h1>

      <p className="hero__tagline">{site.tagline}</p>

      <div className="hero__actions">
        <GlowButton href="#projects">View Missions</GlowButton>
        <GlowButton href="#contact" variant="ghost">
          Open Channel
        </GlowButton>
      </div>

      {/* Scroll cue - hints that scrolling drives the ship animation. */}
      <a
        href="#about"
        className="hero__scroll"
        aria-label="Scroll to about section"
      >
        <span>SCROLL TO ENGAGE</span>
        <span className="hero__scroll-line" />
      </a>
    </section>
  );
}
