import type { Metadata } from "next";
import { ServicesList } from "@/components/sections/services-list";
import { getPointServices } from "@/lib/content";
import { LeadSection } from "@/components/sections/lead-section";
import { itemListSchema, OG_SHARED } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  alternates: { canonical: "/uslugi" },
  openGraph: { ...OG_SHARED, url: "/uslugi", type: "website" },
  title: { absolute: "Usługi detailingowe Łódź — cennik | Primero Studio" },
  description:
    "Pojedyncze usługi detailingowe w Łodzi — mycie, dekontaminacja, polerowanie, powłoka ceramiczna, twardy wosk, pranie wnętrza i więcej.",
};

export default async function UslugiPage() {
  const services = await getPointServices();

  return (
    <>
      <JsonLd
        schema={itemListSchema(
          "Usługi detailingowe — Primero Studio Łódź",
          services.map((s) => ({ name: s.title, path: `/uslugi/${s.id}` })),
        )}
      />
      <ServicesList services={services} />
      <LeadSection />
    </>
  );
}
