import { SmoothScroll } from "@/components/smooth-scroll";
import { FilmGrain } from "@/components/film-grain";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Tracking } from "@/components/tracking";
import { JsonLd } from "@/components/seo/json-ld";
import { getPackages, getPointServices, getSettings } from "@/lib/content";
import { localBusinessSchema } from "@/lib/seo";

export default async function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [settings, packages, services] = await Promise.all([
    getSettings(),
    getPackages(),
    getPointServices(),
  ]);
  const { contact, analytics } = settings;

  return (
    <SmoothScroll>
      <JsonLd schema={localBusinessSchema(settings, { packages, services })} />
      <FilmGrain />
      <Nav contact={contact} />
      <main>{children}</main>
      <Footer />
      <Tracking {...analytics} />
    </SmoothScroll>
  );
}
