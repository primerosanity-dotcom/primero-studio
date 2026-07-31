import type { Metadata } from "next";
import { Effect } from "@/components/sections/effect";
import { Gallery } from "@/components/sections/gallery";
import { LeadSection } from "@/components/sections/lead-section";

export const metadata: Metadata = {
  title: "Realizacje",
  description:
    "Efekty naszej pracy — interaktywne porównania przed/po oraz galeria naszych realizacji.",
};

export default function RealizacjePage() {
  return (
    <>
      <Effect />
      <Gallery />
      <LeadSection />
    </>
  );
}
