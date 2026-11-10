import { Hero } from "@/components/sections/hero";
import { HomeIntro } from "@/components/sections/home-intro";
import { Process } from "@/components/sections/process";
import { HomeServices } from "@/components/sections/home-services";
import { ServicesShowcase } from "@/components/sections/services-showcase";
import { ProjectsGrid } from "@/components/sections/projects-grid";
import { Reviews } from "@/components/sections/reviews";
import { LeadSection } from "@/components/sections/lead-section";
import { getPackages, getPointServices, getSettings } from "@/lib/content";
import { Faq } from "@/components/sections/faq";
import { homeFaq } from "@/lib/faq";
import { JsonLd } from "@/components/seo/json-ld";
import { websiteSchema } from "@/lib/seo";

export default async function Home() {
  const [{ heroDesktop, heroMobile, contact, hours }, packages, services] =
    await Promise.all([getSettings(), getPackages(), getPointServices()]);
  const faq = homeFaq({
    packages,
    services,
    address: contact.addressLines.join(", "),
    hours,
  });

  return (
    <>
      <JsonLd schema={websiteSchema()} />
      <Hero
        desktopSrc={heroDesktop}
        mobileSrc={heroMobile}
        deliveryEnabled={contact.leadDeliveryEnabled}
        fallbackUrl={contact.whatsappUrl ?? contact.instagramUrl}
      />
      <HomeIntro />
      <Process index="03" />
      <ServicesShowcase index="04" />
      <HomeServices index="05" />
      <ProjectsGrid index="06" limit={3} cta />
      <Reviews index="07" />
      <Faq items={faq} index="08" />
      <LeadSection withLocation />
    </>
  );
}
