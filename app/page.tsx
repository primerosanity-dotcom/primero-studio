import { SmoothScroll } from "@/components/smooth-scroll";
import { FilmGrain } from "@/components/film-grain";
import { Nav } from "@/components/nav";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Process } from "@/components/sections/process";
import { Effect } from "@/components/sections/effect";
import { Services } from "@/components/sections/services";
import { Reviews } from "@/components/sections/reviews";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <SmoothScroll>
      <FilmGrain />
      <Nav />
      <main>
        <Hero />
        <About />
        <Process />
        <Effect />
        <Services />
        <Reviews />
        <Contact />
      </main>
    </SmoothScroll>
  );
}
