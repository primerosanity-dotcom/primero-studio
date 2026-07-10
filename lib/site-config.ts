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

function optional(value: string | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

function phoneHref(phone: string | null): string | null {
  if (!phone) return null;
  const normalized = phone.replace(/[^\d+]/g, "");
  return normalized ? `tel:${normalized}` : null;
}

function whatsappUrl(phone: string | null): string | null {
  if (!phone) return null;
  const normalized = phone.replace(/\D/g, "");
  return normalized ? `https://wa.me/${normalized}` : null;
}

export function getContactConfig(): ContactConfig {
  const phone = optional(process.env.CONTACT_PHONE);
  const whatsapp = optional(process.env.CONTACT_WHATSAPP) ?? phone;
  const address = [
    optional(process.env.CONTACT_ADDRESS_LINE_1),
    optional(process.env.CONTACT_ADDRESS_LINE_2),
  ].filter((line): line is string => Boolean(line));

  return {
    phoneDisplay: phone,
    phoneHref: phoneHref(phone),
    whatsappUrl: whatsappUrl(whatsapp),
    instagramHandle:
      optional(process.env.CONTACT_INSTAGRAM_HANDLE) ?? "@primero.studio",
    instagramUrl:
      optional(process.env.CONTACT_INSTAGRAM_URL) ??
      "https://www.instagram.com/primero.studio/",
    email: optional(process.env.CONTACT_EMAIL),
    addressLines: address,
    mapsUrl: optional(process.env.CONTACT_MAPS_URL),
    leadDeliveryEnabled: Boolean(optional(process.env.LEAD_WEBHOOK_URL)),
  };
}
