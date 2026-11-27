import type { Metadata } from "next";
import { Contact } from "@/components/sections/contact";
import { VisitInfo } from "@/components/sections/visit-info";
import { getSettings } from "@/lib/content";
import { OG_SHARED } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/kontakt" },
  openGraph: { ...OG_SHARED, url: "/kontakt", type: "website" },
  title: { absolute: "Kontakt — studio detailingowe Łódź | Primero Studio" },
  description:
    "Primero Studio, ul. Papiernicza 7R, 92-312 Łódź — telefon, WhatsApp, godziny otwarcia i formularz. Bezpłatne oględziny i wycena na miejscu.",
};

export default async function KontaktPage() {
  const { contact, hours } = await getSettings();

  return (
    <>
      <Contact contact={contact} hours={hours} />
      <VisitInfo contact={contact} hours={hours} />
    </>
  );
}
