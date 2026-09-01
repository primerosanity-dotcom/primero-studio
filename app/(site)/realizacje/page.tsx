import type { Metadata } from "next";
import { ProjectsGrid } from "@/components/sections/projects-grid";
import { LeadSection } from "@/components/sections/lead-section";
import { OG_SHARED } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/realizacje" },
  openGraph: { ...OG_SHARED, url: "/realizacje", type: "website" },
  title: "Realizacje",
  description:
    "Nasze realizacje — auta po detailingu, korekcie lakieru, powłoce ceramicznej i pielęgnacji wnętrza. Zobacz szczegóły każdego projektu.",
};

export default function RealizacjePage() {
  return (
    <>
      <ProjectsGrid />
      <LeadSection />
    </>
  );
}
