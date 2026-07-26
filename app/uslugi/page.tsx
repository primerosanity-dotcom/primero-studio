import type { Metadata } from "next";
import { ServicesShowcase } from "@/components/sections/services-showcase";
import { LeadSection } from "@/components/sections/lead-section";

export const metadata: Metadata = {
  title: "Usługi",
  description:
    "Mycie detailingowe, korekta lakieru, powłoki ceramiczne, ochrona PPF i detailing wnętrza w Warszawie. Wybierz usługę i poznaj szczegóły.",
};

export default function UslugiPage() {
  return (
    <>
      <ServicesShowcase />
      <LeadSection />
    </>
  );
}
