import type { MetadataRoute } from "next";
import { getPackages, getProjects } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

/** Static routes, ordered by how much we want Google to weigh them. */
const STATIC: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1, freq: "weekly" },
  { path: "/uslugi", priority: 0.9, freq: "monthly" },
  { path: "/pakiety", priority: 0.9, freq: "monthly" },
  { path: "/realizacje", priority: 0.8, freq: "weekly" },
  { path: "/kontakt", priority: 0.8, freq: "yearly" },
  { path: "/o-nas", priority: 0.6, freq: "yearly" },
  { path: "/opinie", priority: 0.6, freq: "monthly" },
  { path: "/polityka-prywatnosci", priority: 0.2, freq: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [packages, projects] = await Promise.all([getPackages(), getProjects()]);
  const lastModified = new Date();

  return [
    ...STATIC.map(({ path, priority, freq }) => ({
      url: absoluteUrl(path),
      lastModified,
      changeFrequency: freq,
      priority,
    })),
    ...packages.map((pkg) => ({
      url: absoluteUrl(`/pakiety/${pkg.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...projects.map((project) => ({
      url: absoluteUrl(`/realizacje/${project.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
