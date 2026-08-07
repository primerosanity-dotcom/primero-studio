import type { Metadata } from "next";
import { ProjectsGrid } from "@/components/sections/projects-grid";
import { LeadSection } from "@/components/sections/lead-section";

export const metadata: Metadata = {
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
