import { SmoothScroll } from "@/components/smooth-scroll";
import { FilmGrain } from "@/components/film-grain";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Analytics } from "@/components/analytics";
import { getSettings } from "@/lib/content";

export default async function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { contact, analytics } = await getSettings();

  return (
    <SmoothScroll>
      <FilmGrain />
      <Nav contact={contact} />
      <main>{children}</main>
      <Footer />
      <Analytics {...analytics} />
    </SmoothScroll>
  );
}
