import type { Metadata } from "next";
import { About } from "@/components/sections/about";
import { Process } from "@/components/sections/process";
import { LeadSection } from "@/components/sections/lead-section";

export const metadata: Metadata = {
  title: "O nas",
  description:
    "Primero Studio — precyzyjna pielęgnacja aut klasy premium w Warszawie. Poznaj nasze podejście i proces pracy krok po kroku.",
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
