import { Hero } from "@/components/sections/hero";
import { HomeIntro } from "@/components/sections/home-intro";
import { HomeServices } from "@/components/sections/home-services";
import { ServicesShowcase } from "@/components/sections/services-showcase";
import { Reviews } from "@/components/sections/reviews";
import { LeadSection } from "@/components/sections/lead-section";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeIntro />
      <HomeServices />
      <ServicesShowcase index="04" />
      <Reviews index="05" />
      <LeadSection withLocation />
    </>
  );
}
