import type { Metadata } from "next";
import { ServicesList } from "@/components/sections/services-list";
import { getPointServices } from "@/lib/content";
import { LeadSection } from "@/components/sections/lead-section";
import { OG_SHARED } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/uslugi" },
  openGraph: { ...OG_SHARED, url: "/uslugi", type: "website" },
  title: "Usługi",
  description:
    "Pojedyncze usługi detailingowe w Łodzi — mycie, dekontaminacja, polerowanie, powłoka ceramiczna, twardy wosk, pranie wnętrza i więcej.",
};

export default async function UslugiPage() {
  const services = await getPointServices();

  return (
    <>
      <ServicesList services={services} />
      <LeadSection />
    </>
  );
}
