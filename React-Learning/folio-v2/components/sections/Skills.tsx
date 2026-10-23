/**
 * components/sections/Skills.tsx
 * ---------------------------------------------------------------------------
 * Skills shown as "ship systems" - each group is a glass card with a glowing
 * power meter (width set via the --level CSS custom property).
 */
import type { CSSProperties } from "react";
import type { SkillGroup } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Skills({ skills }: { skills: SkillGroup[] }) {
  return (
    <section className="section" id="skills">
      <SectionHeading index="02" label="ONBOARD SYSTEMS" title="Skills" />
      <div className="skills">
        {skills.map((group) => (
          <article key={group.title} className="panel skill">
            <div className="skill__head">
              <h3 className="skill__title">{group.title}</h3>
              <span className="skill__level">{group.level}%</span>
            </div>

            {/* Power meter: CSS reads --level to size the gradient fill. */}
            <div
              className="meter"
              style={{ "--level": `${group.level}%` } as CSSProperties}
              role="meter"
              aria-label={`${group.title} proficiency`}
              aria-valuenow={group.level}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <span className="meter__fill" />
            </div>

            <ul className="tag-list">
              {group.items.map((item) => (
                <li key={item} className="tag">
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
