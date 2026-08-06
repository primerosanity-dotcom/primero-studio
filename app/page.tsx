import { Hero } from "@/components/sections/hero";
import { HomeIntro } from "@/components/sections/home-intro";
import { Process } from "@/components/sections/process";
import { HomeServices } from "@/components/sections/home-services";
import { ServicesShowcase } from "@/components/sections/services-showcase";
import { Reviews } from "@/components/sections/reviews";
import { LeadSection } from "@/components/sections/lead-section";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeIntro />
      <Process index="03" />
      <HomeServices index="04" />
      <ServicesShowcase index="05" />
      <Reviews index="06" />
      <LeadSection withLocation />
    </>
  );
}
