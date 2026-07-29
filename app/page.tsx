import { Hero } from "@/components/sections/hero";
import { ServicesShowcase } from "@/components/sections/services-showcase";
import { HomeExplore } from "@/components/sections/home-explore";
import { Reviews } from "@/components/sections/reviews";
import { LeadSection } from "@/components/sections/lead-section";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesShowcase index="02" />
      <HomeExplore />
      <Reviews index="04" />
      <LeadSection withLocation />
    </>
  );
}
