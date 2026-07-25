import { SmoothScroll } from "@/components/smooth-scroll";
import { FilmGrain } from "@/components/film-grain";
import { Nav } from "@/components/nav";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Process } from "@/components/sections/process";
import { Effect } from "@/components/sections/effect";
import { Services } from "@/components/sections/services";
import { Pricing } from "@/components/sections/pricing";
import { Reviews } from "@/components/sections/reviews";
import { Contact } from "@/components/sections/contact";
import { getContactConfig } from "@/lib/site-config";

export default function Home() {
  const contact = getContactConfig();

  return (
    <SmoothScroll>
      <FilmGrain />
      <Nav contact={contact} />
      <main>
        <Hero />
        <About />
        <Process />
        <Effect />
        <Services />
        <Pricing contact={contact} />
        <Reviews />
        <Contact contact={contact} />
      </main>
    </SmoothScroll>
  );
}
