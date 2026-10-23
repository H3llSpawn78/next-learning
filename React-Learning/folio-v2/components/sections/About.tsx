/**
 * components/sections/About.tsx
 * ---------------------------------------------------------------------------
 * Bio section. Paragraphs come from SiteSettings.about so they're editable
 * in the CMS. Presented inside a glass "panel" with corner brackets.
 */
import type { SiteSettings } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";

export default function About({ site }: { site: SiteSettings }) {
  return (
    <section className="section" id="about">
      <SectionHeading index="01" label="PILOT PROFILE" title="About" />
      <div className="panel panel--brackets about">
        {site.about.map((paragraph, i) => (
          <p key={i} className="about__text">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
