import type { Metadata } from "next";
import { Pricing } from "@/components/sections/pricing";
import { LeadSection } from "@/components/sections/lead-section";
import { getPackages, getSettings } from "@/lib/content";
import { itemListSchema, OG_SHARED } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  alternates: { canonical: "/pakiety" },
  openGraph: { ...OG_SHARED, url: "/pakiety", type: "website" },
  title: { absolute: "Pakiety detailingu Łódź — cennik i zakres | Primero Studio" },
  description:
    "Pakiety detailingu w Łodzi — ESSENTIAL, PROTECT, RESTORE, CERAMIC i SIGNATURE. Zobacz zakres i orientacyjne ceny, umów wizytę online.",
};

export default async function PakietyPage() {
  const [services, { contact }] = await Promise.all([
    getPackages(),
    getSettings(),
  ]);

  return (
    <>
      <JsonLd
        schema={itemListSchema(
          "Pakiety detailingu — Primero Studio Łódź",
          services.map((s) => ({ name: `Pakiet ${s.name}`, path: `/pakiety/${s.slug}` })),
        )}
      />
      <Pricing contact={contact} services={services} />
      <LeadSection />
    </>
  );
}
