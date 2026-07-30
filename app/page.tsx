import { Hero } from "@/components/sections/hero";
import { HomeIntro } from "@/components/sections/home-intro";
import { ServicesShowcase } from "@/components/sections/services-showcase";
import { Reviews } from "@/components/sections/reviews";
import { LeadSection } from "@/components/sections/lead-section";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeIntro />
      <ServicesShowcase index="03" />
      <Reviews index="04" />
      <LeadSection withLocation />
    </>
  );
}
