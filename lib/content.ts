import { sanityFetch } from "@/sanity/lib/client";
import { imageUrl } from "@/sanity/lib/image";
import { SERVICES, type Service } from "./services";
import { POINT_SERVICES, type PointService } from "./individual-services";
import { PROJECTS, type Project } from "./projects";
import {
  GOOGLE_URL,
  RATING,
  REVIEW_COUNT,
  REVIEWS,
  type Review,
} from "./reviews";
import { getContactConfig, type ContactConfig } from "./site-config";

/**
 * Content comes from Sanity and is shaped into the same types the components
 * already use, so a CMS outage (or an empty dataset) simply falls back to the
 * copy bundled in this folder instead of breaking a page.
 */

type SanityImage = { asset?: { _ref?: string } } | null;
const num = (order?: number) => String(order ?? 0).padStart(2, "0");

/* ── Pakiety ─────────────────────────────────────────────── */

type PakietRow = {
  name: string; slug: string; order: number; tagline?: string; short?: string;
  price?: string; priceValue?: number; duration?: string; cycle?: string;
  problem?: string; effect?: string[]; includes?: string[]; popular?: boolean;
  image?: SanityImage;
};

export async function getPackages(): Promise<Service[]> {
  const rows = await sanityFetch<PakietRow[]>({
    tags: ["pakiet"],
    query: `*[_type == "pakiet"] | order(order asc){
      name, "slug": slug.current, order, tagline, short, price, priceValue,
      duration, cycle, problem, effect, includes, popular, image
    }`,
  });
  if (!rows?.length) return SERVICES;

  return rows.map((r) => ({
    slug: r.slug,
    n: num(r.order),
    name: r.name,
    tagline: r.tagline ?? "",
    short: r.short ?? "",
    price: r.price ?? "",
    priceValue: r.priceValue ?? 0,
    duration: r.duration ?? "",
    cycle: r.cycle ?? "",
    prefill: r.slug,
    image: imageUrl(r.image as never) ?? "",
    problem: r.problem ?? "",
    effect: r.effect ?? [],
    includes: r.includes ?? [],
    popular: r.popular,
  }));
}

export async function getPackage(slug: string): Promise<Service | undefined> {
  return (await getPackages()).find((s) => s.slug === slug);
}

/* ── Usługi ──────────────────────────────────────────────── */

type UslugaRow = {
  title: string; slug: string; order: number;
  desc?: string; price?: string; duration?: string; image?: SanityImage;
};

export async function getPointServices(): Promise<PointService[]> {
  const rows = await sanityFetch<UslugaRow[]>({
    tags: ["usluga"],
    query: `*[_type == "usluga"] | order(order asc){
      title, "slug": slug.current, order, desc, price, duration, image
    }`,
  });
  if (!rows?.length) return POINT_SERVICES;

  return rows.map((r) => ({
    id: r.slug,
    n: num(r.order),
    title: r.title,
    desc: r.desc ?? "",
    price: r.price ?? "",
    duration: r.duration ?? "",
    image: imageUrl(r.image as never) ?? undefined,
  }));
}

/* ── Realizacje ──────────────────────────────────────────── */

type RealizacjaRow = {
  car: string; slug: string; order: number; service?: string; short?: string;
  description?: string; steps?: string[]; duration?: string;
  image?: SanityImage; beforeImage?: SanityImage;
};

export async function getProjects(): Promise<Project[]> {
  const rows = await sanityFetch<RealizacjaRow[]>({
    tags: ["realizacja"],
    query: `*[_type == "realizacja"] | order(order asc){
      car, "slug": slug.current, order, service, short, description, steps,
      duration, image, beforeImage
    }`,
  });
  if (!rows?.length) return PROJECTS;

  return rows.map((r) => ({
    slug: r.slug,
    car: r.car,
    service: r.service ?? "",
    short: r.short ?? "",
    description: r.description ?? "",
    steps: r.steps ?? [],
    duration: r.duration ?? "",
    image: imageUrl(r.image as never) ?? undefined,
    beforeImage: imageUrl(r.beforeImage as never) ?? undefined,
  }));
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  return (await getProjects()).find((p) => p.slug === slug);
}

/* ── Opinie ──────────────────────────────────────────────── */

const TONES = [
  "bg-wine text-cream",
  "bg-champagne text-wine-deep",
  "bg-ink text-cream",
  "bg-gold text-wine-deep",
];

export type ReviewsContent = {
  reviews: Review[];
  rating: string;
  count: number;
  googleUrl: string;
};

export async function getReviews(): Promise<ReviewsContent> {
  const [rows, settings] = await Promise.all([
    sanityFetch<{ name: string; date?: string; text: string; order: number }[]>({
      tags: ["opinia"],
      query: `*[_type == "opinia"] | order(order asc){ name, date, text, order }`,
    }),
    getSettingsRaw(),
  ]);

  return {
    reviews: rows?.length
      ? rows.map((r, i) => ({
          name: r.name,
          date: r.date ?? "",
          text: r.text,
          tone: TONES[i % TONES.length],
        }))
      : REVIEWS,
    rating: settings?.googleRating ?? RATING,
    count: settings?.googleReviewCount ?? REVIEW_COUNT,
    googleUrl: settings?.googleUrl ?? GOOGLE_URL,
  };
}

/* ── Ustawienia ──────────────────────────────────────────── */

type SettingsRow = {
  phone?: string; whatsapp?: string; email?: string;
  instagramHandle?: string; instagramUrl?: string;
  addressLines?: string[]; mapsUrl?: string;
  hours?: { days: string; hours: string }[];
  stats?: { value: string; label: string }[];
  aboutText?: string;
  googleRating?: string; googleReviewCount?: number; googleUrl?: string;
  gtmId?: string; gaId?: string; metaPixelId?: string;
  heroDesktop?: SanityImage; heroMobile?: SanityImage; aboutImage?: SanityImage;
};

function getSettingsRaw() {
  return sanityFetch<SettingsRow>({
    tags: ["ustawienia"],
    query: `*[_type == "ustawienia"][0]`,
  });
}

export type SiteSettings = {
  contact: ContactConfig;
  hours: { days: string; hours: string }[];
  stats: { value: string; label: string }[];
  aboutText: string;
  heroDesktop: string;
  heroMobile: string;
  aboutImage: string;
  /** Analytics ids set by the client in Studio; empty = script not loaded. */
  analytics: { gtmId: string; gaId: string; metaPixelId: string };
};

const FALLBACK_HOURS = [
  { days: "Pon – Pt", hours: "09:00 – 19:00" },
  { days: "Sobota", hours: "10:00 – 15:00" },
  { days: "Niedziela", hours: "Zamknięte" },
];

const FALLBACK_STATS = [
  { value: "300+", label: "Zrealizowanych aut" },
  { value: "5,0★", label: "Ocena Google" },
  { value: "7 lat", label: "Doświadczenia" },
  { value: "100%", label: "Gwarancja jakości" },
];

const FALLBACK_ABOUT =
  "Primero Studio — studio detailingu w Łodzi. Pracujemy na najlepszych materiałach i zapewniamy precyzyjną pielęgnację auta — od korekty lakieru i ochrony karoserii po nienaganne wnętrze, z dbałością o każdy detal.";

export async function getSettings(): Promise<SiteSettings> {
  const bundled = getContactConfig();
  const s = await getSettingsRaw();

  const phone = s?.phone?.trim() || bundled.phoneDisplay;
  const whatsapp = s?.whatsapp?.trim() || phone;
  const digits = (v: string | null) => v?.replace(/\D/g, "") ?? "";

  return {
    contact: {
      phoneDisplay: phone,
      phoneHref: phone ? `tel:${phone.replace(/[^\d+]/g, "")}` : null,
      whatsappUrl: whatsapp ? `https://wa.me/${digits(whatsapp)}` : null,
      instagramHandle: s?.instagramHandle?.trim() || bundled.instagramHandle,
      instagramUrl: s?.instagramUrl?.trim() || bundled.instagramUrl,
      email: s?.email?.trim() || bundled.email,
      addressLines: s?.addressLines?.length
        ? s.addressLines
        : bundled.addressLines,
      mapsUrl: s?.mapsUrl?.trim() || bundled.mapsUrl,
      leadDeliveryEnabled: bundled.leadDeliveryEnabled,
    },
    hours: s?.hours?.length ? s.hours : FALLBACK_HOURS,
    stats: s?.stats?.length ? s.stats : FALLBACK_STATS,
    aboutText: s?.aboutText?.trim() || FALLBACK_ABOUT,
    heroDesktop:
      imageUrl(s?.heroDesktop as never, 2400) ?? "/images/hero-desktop-v2.png",
    heroMobile:
      imageUrl(s?.heroMobile as never, 1400) ?? "/images/hero-mobile-v2.png",
    aboutImage: imageUrl(s?.aboutImage as never, 1600) ?? "/images/about.png",
    analytics: {
      gtmId: s?.gtmId?.trim() ?? "",
      gaId: s?.gaId?.trim() ?? "",
      metaPixelId: s?.metaPixelId?.trim() ?? "",
    },
  };
}
