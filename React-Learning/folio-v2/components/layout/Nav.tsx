/**
 * components/layout/Nav.tsx
 * ---------------------------------------------------------------------------
 * Fixed, glassmorphism top navigation.
 *
 * Links are hash anchors prefixed with "/" so they work both on the home page
 * (smooth-scroll to section) and from project detail pages (navigate home,
 * then jump to the section).
 */
import Link from "next/link";

/** Navigation items - section ids must match the ids used in app/page.tsx. */
const LINKS = [
  { href: "/#about", label: "About" },
  { href: "/#skills", label: "Systems" },
  { href: "/#projects", label: "Missions" },
  { href: "/#experience", label: "Log" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav({ name }: { name: string }) {
  return (
    <nav className="nav" aria-label="Primary">
      {/* Logo / home link - initials inside a glowing hexagon-ish badge. */}
      <Link href="/" className="nav__brand" aria-label={`${name} - home`}>
        <span className="nav__logo">
          {name
            .split(" ")
            .map((part) => part[0])
            .join("")
            .slice(0, 2)}
        </span>
        <span className="nav__name">{name}</span>
      </Link>

      <ul className="nav__links">
        {LINKS.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="nav__link">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
