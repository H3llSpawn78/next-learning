/**
 * app/projects/[slug]/page.tsx
 * ---------------------------------------------------------------------------
 * Project detail ("mission brief") page.
 *
 * Headless-ready behaviour:
 *   - generateStaticParams pre-renders every project returned by the CMS.
 *   - dynamicParams (default true) lets projects published *after* the build
 *     render on first request, then get cached.
 *   - generateMetadata gives each project its own SEO title/description.
 */
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProject, getProjects } from "@/lib/content";
import GlowButton from "@/components/ui/GlowButton";

/** In Next.js 15+, route params arrive as a Promise. */
type Params = { params: Promise<{ slug: string }> };

/** Pre-render a page for every known project at build time. */
export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

/** Per-project <title> and description. */
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  return { title: project.title, description: project.summary };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = await getProject(slug);
  // Unknown slug -> render app/not-found.tsx with a 404 status.
  if (!project) notFound();

  return (
    <article className="section project-detail">
      <p className="section-heading__label">
        <span className="section-heading__index">{project.year}</span> {"//"}{" "}
        MISSION BRIEF
      </p>
      <h1 className="project-detail__title gradient-text">{project.title}</h1>
      {project.role && <p className="project-detail__role">{project.role}</p>}

      {/* Optional CMS image - host must be whitelisted via CMS_IMAGE_HOSTNAME. */}
      {project.image && (
        <div className="project-detail__image">
          <Image
            src={project.image.url}
            alt={project.image.alt}
            width={project.image.width ?? 1600}
            height={project.image.height ?? 900}
            priority
          />
        </div>
      )}

      <div className="panel panel--brackets project-detail__body">
        {project.description.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
        <ul className="tag-list">
          {project.tags.map((tag) => (
            <li key={tag} className="tag">
              {tag}
            </li>
          ))}
        </ul>
      </div>

      <div className="hero__actions">
        {project.liveUrl && (
          <GlowButton href={project.liveUrl}>Launch Live Site</GlowButton>
        )}
        {project.repoUrl && (
          <GlowButton href={project.repoUrl} variant="ghost">
            View Source
          </GlowButton>
        )}
        <GlowButton href="/#projects" variant="ghost">
          &larr; All Missions
        </GlowButton>
      </div>
    </article>
  );
}
