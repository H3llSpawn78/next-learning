/**
 * components/sections/Projects.tsx
 * ---------------------------------------------------------------------------
 * Project grid ("missions"). Each card has an animated conic-gradient border
 * that rotates on hover, plus a generated gradient "thumbnail" when the CMS
 * provides no image. Featured projects span two columns.
 */
import Link from "next/link";
import type { CSSProperties } from "react";
import type { Project } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Projects({ projects }: { projects: Project[] }) {
  return (
    <section className="section" id="projects">
      <SectionHeading index="03" label="MISSION ARCHIVE" title="Projects" />
      <div className="projects">
        {projects.map((project, i) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className={`project-card${project.featured ? " project-card--featured" : ""}`}
            // --hue shifts each card's thumbnail gradient for variety.
            style={{ "--hue": `${(i * 37) % 360}deg` } as CSSProperties}
          >
            <div className="project-card__inner">
              {/* Decorative gradient "visual" - replaced by your image if provided. */}
              <div className="project-card__visual" aria-hidden="true">
                {project.image ? (
                  // Plain <img> keeps this card agnostic to CMS image hosts.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={project.image.url} alt="" loading="lazy" />
                ) : (
                  <span className="project-card__code">
                    M-{String(i + 1).padStart(3, "0")}
                  </span>
                )}
              </div>

              <div className="project-card__body">
                <p className="project-card__meta">
                  {project.year}
                  {project.role ? ` // ${project.role}` : ""}
                </p>
                <h3 className="project-card__title">{project.title}</h3>
                <p className="project-card__summary">{project.summary}</p>
                <ul className="tag-list">
                  {project.tags.map((tag) => (
                    <li key={tag} className="tag">
                      {tag}
                    </li>
                  ))}
                </ul>
                <span className="project-card__cta">Mission brief &rarr;</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
