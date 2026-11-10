import type { MetadataRoute } from "next";
import { getPackages, getPointServices, getProjects } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

type Freq = MetadataRoute.Sitemap[number]["changeFrequency"];

/** Static routes, ordered by how much we want Google to weigh them. */
const STATIC: { path: string; priority: number; freq: Freq }[] = [
  { path: "/", priority: 1, freq: "weekly" },
  { path: "/uslugi", priority: 0.9, freq: "monthly" },
  { path: "/pakiety", priority: 0.9, freq: "monthly" },
  { path: "/realizacje", priority: 0.8, freq: "weekly" },
  { path: "/kontakt", priority: 0.8, freq: "yearly" },
  { path: "/o-nas", priority: 0.6, freq: "yearly" },
  { path: "/opinie", priority: 0.6, freq: "monthly" },
  { path: "/polityka-prywatnosci", priority: 0.2, freq: "yearly" },
];

/**
 * Sitemap image entries must be absolute and XML-safe. Next writes them out
 * verbatim, and a bare "&" in a Sanity URL (?w=1600&q=80) breaks the whole
 * file for Google, so it is escaped here.
 */
const xmlUrl = (src: string) => absoluteUrl(src).replace(/&/g, "&amp;");
const img = (src?: string) => (src ? [xmlUrl(src)] : []);

/**
 * Newest of a set of Sanity edit dates. Google only trusts <lastmod> when it
 * tracks real edits — stamping every URL with the build time teaches it to
 * ignore the field — so a URL with no known date simply omits it.
 */
function latest(dates: (string | undefined)[]): Date | undefined {
  const times = dates.filter(Boolean).map((d) => new Date(d!).getTime());
  return times.length ? new Date(Math.max(...times)) : undefined;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [packages, services, projects] = await Promise.all([
    getPackages(),
    getPointServices(),
    getProjects(),
  ]);

  const listingDates: Record<string, Date | undefined> = {
    "/": latest([...packages, ...services, ...projects].map((x) => x.updatedAt)),
    "/uslugi": latest(services.map((s) => s.updatedAt)),
    "/pakiety": latest(packages.map((p) => p.updatedAt)),
    "/realizacje": latest(projects.map((p) => p.updatedAt)),
  };

  const at = (date?: string | Date) =>
    date ? { lastModified: new Date(date) } : {};

  return [
    ...STATIC.map(({ path, priority, freq }) => ({
      url: absoluteUrl(path),
      ...at(listingDates[path]),
      changeFrequency: freq,
      priority,
      ...(path === "/" ? { images: [absoluteUrl("/opengraph-image.png")] } : {}),
    })),
    ...services.map((s) => ({
      url: absoluteUrl(`/uslugi/${s.id}`),
      ...at(s.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.8,
      images: img(s.image),
    })),
    ...packages.map((p) => ({
      url: absoluteUrl(`/pakiety/${p.slug}`),
      ...at(p.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      images: img(p.image),
    })),
    ...projects.map((p) => ({
      url: absoluteUrl(`/realizacje/${p.slug}`),
      ...at(p.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
      images: [...img(p.image), ...(p.gallery ?? []).map(xmlUrl)],
    })),
  ];
}
