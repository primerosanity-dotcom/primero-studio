import type { Metadata } from "next";
import { Pricing } from "@/components/sections/pricing";
import { LeadSection } from "@/components/sections/lead-section";
import { getContactConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Cennik",
  description:
    "Skomponuj wycenę detailingu — wybierz typ auta i usługi, a my policzymy orientacyjny koszt. Umów wizytę online.",
};

export default function CennikPage() {
  return (
    <>
      <Pricing contact={getContactConfig()} />
      <LeadSection />
    </>
  );
}
