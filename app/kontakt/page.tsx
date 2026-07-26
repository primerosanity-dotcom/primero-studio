import type { Metadata } from "next";
import { Contact } from "@/components/sections/contact";
import { getContactConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Umów wizytę w Primero Studio w Warszawie — telefon, WhatsApp, adres, godziny otwarcia i formularz zgłoszeniowy.",
};

export default function KontaktPage() {
  return <Contact contact={getContactConfig()} />;
}
