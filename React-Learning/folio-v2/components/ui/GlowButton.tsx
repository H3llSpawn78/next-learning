/**
 * components/ui/GlowButton.tsx
 * ---------------------------------------------------------------------------
 * Neon call-to-action button used throughout the site.
 *
 * Visuals (see .glow-btn in app/globals.css):
 *   - layered lime box-shadows for the outer glow
 *   - an animated light "sheen" sweeping across on hover
 *   - "primary" = filled lime gradient, "ghost" = outlined with gradient border
 *
 * Renders a Next.js <Link> for internal routes/anchors and a plain <a> for
 * external URLs (mailto:, https://), so it can be used anywhere.
 */
import Link from "next/link";
import type { ReactNode } from "react";

interface GlowButtonProps {
  /** Destination - "/path", "#anchor", "https://..." or "mailto:...". */
  href: string;
  children: ReactNode;
  /** Visual style. Defaults to "primary". */
  variant?: "primary" | "ghost";
  /** Optional extra class names. */
  className?: string;
}

export default function GlowButton({
  href,
  children,
  variant = "primary",
  className = "",
}: GlowButtonProps) {
  const classes = `glow-btn glow-btn--${variant} ${className}`.trim();
  // Anything with a protocol is treated as external.
  const isExternal = /^(https?:|mailto:|tel:)/.test(href);

  if (isExternal) {
    return (
      <a
        href={href}
        className={classes}
        // Open web links in a new tab; mailto/tel should use the same tab.
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        <span className="glow-btn__label">{children}</span>
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      <span className="glow-btn__label">{children}</span>
    </Link>
  );
}
