/**
 * app/layout.tsx
 * ---------------------------------------------------------------------------
 * Root layout shared by every route. Responsibilities:
 *   - load the three typefaces (display / body / mono) via next/font
 *   - build SEO metadata from CMS-driven SiteSettings
 *   - mount persistent chrome: the three.js ship canvas, HUD, nav & footer
 *
 * The ship lives here (not in page.tsx) so it persists across client-side
 * navigation between the home page and project pages without re-initialising.
 */
import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Orbitron } from "next/font/google";
import { getSite } from "@/lib/content";
import ParticleShip from "@/components/three/ParticleShip";
import ScrollHud from "@/components/hud/ScrollHud";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import "./globals.css";

/* Fonts are self-hosted at build time and exposed as CSS variables
 * consumed in globals.css (--font-display, --font-body, --font-mono). */
const display = Orbitron({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "700", "900"],
});
const body = Inter({ subsets: ["latin"], variable: "--font-body" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

/** SEO metadata generated from the content layer (editable in the CMS). */
export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return {
    title: { default: site.seo.title, template: `%s | ${site.name}` },
    description: site.seo.description,
    openGraph: {
      title: site.seo.title,
      description: site.seo.description,
      type: "website",
    },
  };
}

/** Browser UI colour (mobile address bar) matches the near-black theme. */
export const viewport: Viewport = {
  themeColor: "#030503",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const site = await getSite();

  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body>
        {/* Fixed WebGL background - rendered behind all content. */}
        <ParticleShip />
        {/* Decorative overlays: gradient vignette + CRT scanlines. */}
        <div className="backdrop" aria-hidden="true" />
        <div className="scanlines" aria-hidden="true" />

        <Nav name={site.name} />
        <main className="main">{children}</main>
        <Footer site={site} />

        <ScrollHud />
      </body>
    </html>
  );
}
