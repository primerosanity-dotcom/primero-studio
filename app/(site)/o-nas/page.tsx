import type { Metadata } from "next";
import { About } from "@/components/sections/about";
import { Process } from "@/components/sections/process";
import { LeadSection } from "@/components/sections/lead-section";
import { OG_SHARED } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/o-nas" },
  openGraph: { ...OG_SHARED, url: "/o-nas", type: "website" },
  title: { absolute: "Studio detailingowe w Łodzi | Primero Studio" },
  description:
    "Primero Studio — precyzyjna pielęgnacja aut w Łodzi. Poznaj nasze podejście i proces pracy krok po kroku.",
};

export default function ONasPage() {
  return (
    <>
      <About />
      <Process />
      <LeadSection />
    </>
  );
}
