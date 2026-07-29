import type { Metadata } from "next";
import { ServicesList } from "@/components/sections/services-list";
import { LeadSection } from "@/components/sections/lead-section";

export const metadata: Metadata = {
  title: "Usługi",
  description:
    "Pojedyncze usługi detailingowe w Warszawie — mycie, dekontaminacja, polerowanie, powłoka ceramiczna, twardy wosk, pranie wnętrza i więcej.",
};

export default function UslugiPage() {
  return (
    <>
      <ServicesList />
      <LeadSection />
    </>
  );
}
