/**
 * components/layout/Footer.tsx
 * ---------------------------------------------------------------------------
 * Site footer with social links (from the CMS / content layer) and a
 * monospace "transmission" sign-off.
 */
import type { SiteSettings } from "@/lib/content";

export default function Footer({ site }: { site: SiteSettings }) {
  return (
    <footer className="footer">
      <p className="footer__meta">
        &copy; {new Date().getFullYear()} {site.name} {"//"} END OF TRANSMISSION
      </p>
      <ul className="footer__socials">
        {site.socials.map((s) => (
          <li key={s.url}>
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__link"
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
}
