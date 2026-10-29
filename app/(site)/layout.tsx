import { SmoothScroll } from "@/components/smooth-scroll";
import { FilmGrain } from "@/components/film-grain";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Tracking } from "@/components/tracking";
import { JsonLd } from "@/components/seo/json-ld";
import { getSettings } from "@/lib/content";
import { localBusinessSchema } from "@/lib/seo";

export default async function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSettings();
  const { contact, analytics } = settings;

  return (
    <SmoothScroll>
      <JsonLd schema={localBusinessSchema(settings)} />
      <FilmGrain />
      <Nav contact={contact} />
      <main>{children}</main>
      <Footer />
      <Tracking {...analytics} />
    </SmoothScroll>
  );
}
