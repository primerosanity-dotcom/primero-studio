import { Hero } from "@/components/sections/hero";
import { HomeIntro } from "@/components/sections/home-intro";
import { Process } from "@/components/sections/process";
import { HomeServices } from "@/components/sections/home-services";
import { ServicesShowcase } from "@/components/sections/services-showcase";
import { ProjectsGrid } from "@/components/sections/projects-grid";
import { Reviews } from "@/components/sections/reviews";
import { LeadSection } from "@/components/sections/lead-section";
import { getSettings } from "@/lib/content";

export default async function Home() {
  const { heroDesktop, heroMobile } = await getSettings();

  return (
    <>
      <Hero desktopSrc={heroDesktop} mobileSrc={heroMobile} />
      <HomeIntro />
      <Process index="03" />
      <HomeServices index="04" />
      <ServicesShowcase index="05" />
      <ProjectsGrid index="06" limit={3} cta />
      <Reviews index="07" />
      <LeadSection withLocation />
    </>
  );
}
