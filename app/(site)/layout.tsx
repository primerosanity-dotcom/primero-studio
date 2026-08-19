import { SmoothScroll } from "@/components/smooth-scroll";
import { FilmGrain } from "@/components/film-grain";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { getContactConfig } from "@/lib/site-config";

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const contact = getContactConfig();

  return (
    <SmoothScroll>
      <FilmGrain />
      <Nav contact={contact} />
      <main>{children}</main>
      <Footer />
    </SmoothScroll>
  );
}
