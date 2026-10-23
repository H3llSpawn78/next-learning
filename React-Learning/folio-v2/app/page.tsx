/**
 * app/page.tsx
 * ---------------------------------------------------------------------------
 * Home page. A Server Component that fetches all content in parallel from
 * the provider-agnostic content layer, then renders each section.
 *
 * The page is tall on purpose: total scroll distance drives the ship's
 * explosion (top = intact, bottom = fully exploded).
 */
import { getExperience, getProjects, getSite, getSkills } from "@/lib/content";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";

export default async function HomePage() {
  // Fire all requests at once rather than waterfalling them.
  const [site, projects, skills, experience] = await Promise.all([
    getSite(),
    getProjects(),
    getSkills(),
    getExperience(),
  ]);

  return (
    <>
      <Hero site={site} />
      <About site={site} />
      <Skills skills={skills} />
      <Projects projects={projects} />
      <Experience entries={experience} />
      <Contact site={site} />
    </>
  );
}
