import type { Metadata } from "next";
import { Pricing } from "@/components/sections/pricing";
import { LeadSection } from "@/components/sections/lead-section";
import { getContactConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Pakiety",
  description:
    "Pakiety detailingu w Łodzi — ESSENTIAL, PROTECT, RESTORE, CERAMIC i SIGNATURE. Zobacz zakres i orientacyjne ceny, umów wizytę online.",
};

export default function PakietyPage() {
  return (
    <>
      <Pricing contact={getContactConfig()} />
      <LeadSection />
    </>
  );
}
