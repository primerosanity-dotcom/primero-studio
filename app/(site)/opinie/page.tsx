import type { Metadata } from "next";
import { Reviews } from "@/components/sections/reviews";
import { LeadSection } from "@/components/sections/lead-section";

export const metadata: Metadata = {
  title: "Opinie",
  description:
    "Opinie klientów Primero Studio w Google — ocena 5,0. Przeczytaj, dlaczego kierowcy wracają do nas ponownie.",
};

export default function OpiniePage() {
  return (
    <>
      <Reviews />
      <LeadSection />
    </>
  );
}
