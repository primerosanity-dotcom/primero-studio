import type { Metadata } from "next";
import { Pricing } from "@/components/sections/pricing";
import { LeadSection } from "@/components/sections/lead-section";
import { getPackages, getSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Pakiety",
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
      <Pricing contact={contact} services={services} />
      <LeadSection />
    </>
  );
}
