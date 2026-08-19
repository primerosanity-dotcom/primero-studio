import { createImageUrlBuilder } from "@sanity/image-url";
import type { Image } from "sanity";
import { dataset, projectId, sanityConfigured } from "@/sanity/env";

const builder = sanityConfigured
  ? createImageUrlBuilder({ projectId, dataset })
  : null;

/** Resolve a Sanity image ref to a CDN URL, or null when unset. */
export function imageUrl(source?: Image | null, width = 1600): string | null {
  if (!builder || !source?.asset) return null;
  return builder.image(source).width(width).auto("format").quality(80).url();
}
