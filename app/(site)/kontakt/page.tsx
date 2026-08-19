import type { Metadata } from "next";
import { Contact } from "@/components/sections/contact";
import { getSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Umów wizytę w Primero Studio w Łodzi — telefon, WhatsApp, adres, godziny otwarcia i formularz zgłoszeniowy.",
};

export default async function KontaktPage() {
  const { contact } = await getSettings();

  return <Contact contact={contact} />;
}
