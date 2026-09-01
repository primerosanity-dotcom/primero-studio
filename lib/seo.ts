import { COMPANY, getContactConfig } from "@/lib/site-config";

/** Canonical origin. Everything Google sees is anchored to this. */
export const SITE_URL = "https://primero-studio.com";
export const SITE_NAME = "PRIMERO.STUDIO";

export function absoluteUrl(path = "/"): string {
  return new URL(path, SITE_URL).toString();
}

/**
 * Open Graph fields shared by every page. A page-level `openGraph` REPLACES
 * the layout's wholesale, so each page must spread this in or it silently
 * loses the share image, site name and locale.
 */
export const OG_SHARED = {
  siteName: SITE_NAME,
  locale: "pl_PL",
  images: ["/opengraph-image.png"],
};

const DAY_ORDER = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

const DAY_ALIASES: Record<string, (typeof DAY_ORDER)[number]> = {
  pon: "Monday",
  poniedzialek: "Monday",
  wt: "Tuesday",
  wtorek: "Tuesday",
  sr: "Wednesday",
  sroda: "Wednesday",
  czw: "Thursday",
  czwartek: "Thursday",
  pt: "Friday",
  piatek: "Friday",
  sob: "Saturday",
  sobota: "Saturday",
  nd: "Sunday",
  ndz: "Sunday",
  niedziela: "Sunday",
};

function normalise(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ł/g, "l")
    .replace(/[^a-z]/g, "");
}

function toDays(label: string): (typeof DAY_ORDER)[number][] {
  const parts = label.split(/[–—-]/).map((p) => DAY_ALIASES[normalise(p)]);

  if (parts.length === 2 && parts[0] && parts[1]) {
    const from = DAY_ORDER.indexOf(parts[0]);
    const to = DAY_ORDER.indexOf(parts[1]);
    if (from !== -1 && to !== -1 && from <= to) {
      return DAY_ORDER.slice(from, to + 1) as (typeof DAY_ORDER)[number][];
    }
  }

  return parts.filter(Boolean) as (typeof DAY_ORDER)[number][];
}

export type OpeningHours = {
  "@type": "OpeningHoursSpecification";
  dayOfWeek: string[];
  opens: string;
  closes: string;
};

/**
 * Turns the human-written hours from Sanity ("Pon – Pt" / "09:00 – 19:00")
 * into schema.org specs. Rows it cannot parse — a closed day, free-form
 * text — are dropped rather than guessed at.
 */
export function toOpeningHours(
  rows: { days: string; hours: string }[],
): OpeningHours[] {
  const specs: OpeningHours[] = [];

  for (const row of rows) {
    const time = row.hours.match(/(\d{1,2}[:.]\d{2})\s*[–—-]\s*(\d{1,2}[:.]\d{2})/);
    if (!time) continue;

    const days = toDays(row.days);
    if (days.length === 0) continue;

    specs.push({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: days,
      opens: time[1].replace(".", ":"),
      closes: time[2].replace(".", ":"),
    });
  }

  return specs;
}

/** schema.org node describing the studio itself — the local-search payload. */
export function localBusinessSchema(settings: {
  hours: { days: string; hours: string }[];
  aboutText: string;
}) {
  const contact = getContactConfig();
  const [street, city] = contact.addressLines;

  return {
    "@context": "https://schema.org",
    // schema.org has no "AutoDetailing" type — AutoWash is the closest valid
    // one, narrowed by additionalType so Google reads the actual trade.
    "@type": "AutoWash",
    additionalType: "https://en.wikipedia.org/wiki/Auto_detailing",
    "@id": `${SITE_URL}/#studio`,
    name: SITE_NAME,
    legalName: COMPANY.legalName,
    description: settings.aboutText,
    url: SITE_URL,
    image: absoluteUrl("/opengraph-image.png"),
    logo: absoluteUrl("/images/logo.png"),
    ...(contact.phoneDisplay ? { telephone: contact.phoneDisplay } : {}),
    ...(COMPANY.privacyEmail ? { email: COMPANY.privacyEmail } : {}),
    address: {
      "@type": "PostalAddress",
      ...(street ? { streetAddress: street } : {}),
      addressLocality: city ?? "Łódź",
      addressRegion: "łódzkie",
      addressCountry: "PL",
      ...(COMPANY.postalCode ? { postalCode: COMPANY.postalCode } : {}),
    },
    ...(contact.mapsUrl ? { hasMap: contact.mapsUrl } : {}),
    areaServed: [
      { "@type": "City", name: "Łódź" },
      { "@type": "AdministrativeArea", name: "województwo łódzkie" },
    ],
    priceRange: "$$",
    currenciesAccepted: "PLN",
    openingHoursSpecification: toOpeningHours(settings.hours),
    sameAs: [contact.instagramUrl].filter(Boolean),
  };
}

export function breadcrumbSchema(
  trail: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
