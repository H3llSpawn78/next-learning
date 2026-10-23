/**
 * components/sections/Contact.tsx
 * ---------------------------------------------------------------------------
 * Closing call-to-action. By the time users reach this section the ship has
 * fully exploded into a debris nebula behind it.
 */
import type { SiteSettings } from "@/lib/content";
import GlowButton from "@/components/ui/GlowButton";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Contact({ site }: { site: SiteSettings }) {
  return (
    <section className="section contact" id="contact">
      <SectionHeading
        index="05"
        label="OPEN CHANNEL"
        title="Let's build something"
      />
      <div className="panel panel--brackets contact__panel">
        <p className="contact__text">
          Have a mission in mind? Transmit a message and I&apos;ll respond
          within one orbital cycle.
        </p>
        <GlowButton href={`mailto:${site.email}`}>
          Transmit &rarr; {site.email}
        </GlowButton>
        <p className="contact__hint">Scroll back up to re-assemble the ship.</p>
      </div>
    </section>
  );
}
