import { Hero } from "@/components/sections/hero";
import { ServicesShowcase } from "@/components/sections/services-showcase";
import { Reviews } from "@/components/sections/reviews";
import { LeadSection } from "@/components/sections/lead-section";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesShowcase index="02" />
      <Reviews index="03" />
      <LeadSection withLocation />
    </>
  );
}
