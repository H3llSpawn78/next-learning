/**
 * components/sections/Experience.tsx
 * ---------------------------------------------------------------------------
 * Work history as a vertical "flight log" timeline: a glowing gradient line
 * with a pulsing node per entry.
 */
import type { Experience as ExperienceEntry } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Experience({
  entries,
}: {
  entries: ExperienceEntry[];
}) {
  return (
    <section className="section" id="experience">
      <SectionHeading index="04" label="FLIGHT LOG" title="Experience" />
      <ol className="timeline">
        {entries.map((entry) => (
          <li
            key={`${entry.company}-${entry.period}`}
            className="timeline__item"
          >
            {/* Glowing node on the timeline rail. */}
            <span className="timeline__node" aria-hidden="true" />
            <div className="panel timeline__card">
              <p className="timeline__period">{entry.period}</p>
              <h3 className="timeline__role">
                {entry.position}{" "}
                <span className="timeline__company">@ {entry.company}</span>
              </h3>
              <p className="timeline__summary">{entry.summary}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
