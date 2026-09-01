import type { Metadata } from "next";
import { Reviews } from "@/components/sections/reviews";
import { LeadSection } from "@/components/sections/lead-section";
import { OG_SHARED } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/opinie" },
  openGraph: { ...OG_SHARED, url: "/opinie", type: "website" },
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
