export type ContactConfig = {
  phoneDisplay: string | null;
  phoneHref: string | null;
  whatsappUrl: string | null;
  instagramHandle: string;
  instagramUrl: string;
  email: string | null;
  addressLines: string[];
  mapsUrl: string | null;
  leadDeliveryEnabled: boolean;
};

// Hardcoded business contact data — edit here when anything changes.
const CONTACT = {
  phone: "+48 731 601 733",
  whatsapp: "+48 731 601 733",
  email: "kontakt@primero.studio",
  instagramHandle: "@primero_studio",
  instagramUrl: "https://www.instagram.com/primero_studio/",
  addressLines: ["ul. Papiernicza 7R", "Łódź"],
  mapsUrl: "https://maps.google.com/?q=Papiernicza+7R+Łódź",
};

// Legal identity of the data controller, used by the privacy policy.
// TODO(client): uzupełnić pełną nazwę firmy i NIP z CEIDG.
export const COMPANY = {
  legalName: "PRIMERO.STUDIO",
  nip: null as string | null,
  regon: null as string | null,
  // Address for data-protection requests — deliberately separate from the
  // general contact address shown in the footer.
  privacyEmail: "info@primero-studio.com",
};

function phoneHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

function whatsappUrl(phone: string): string {
  return `https://wa.me/${phone.replace(/\D/g, "")}`;
}

export function getContactConfig(): ContactConfig {
  return {
    phoneDisplay: CONTACT.phone,
    phoneHref: phoneHref(CONTACT.phone),
    whatsappUrl: whatsappUrl(CONTACT.whatsapp),
    instagramHandle: CONTACT.instagramHandle,
    instagramUrl: CONTACT.instagramUrl,
    email: CONTACT.email,
    addressLines: CONTACT.addressLines,
    mapsUrl: CONTACT.mapsUrl,
    // Lead delivery stays env-driven — secrets live in Vercel.
    leadDeliveryEnabled: Boolean(
      process.env.LEAD_WEBHOOK_URL?.trim() ||
        (process.env.TELEGRAM_BOT_TOKEN?.trim() &&
          process.env.TELEGRAM_CHAT_ID?.trim()) ||
        (process.env.KOMMO_SUBDOMAIN?.trim() &&
          process.env.KOMMO_ACCESS_TOKEN?.trim()),
    ),
  };
}
