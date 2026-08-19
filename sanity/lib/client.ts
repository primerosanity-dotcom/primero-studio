import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, sanityConfigured } from "@/sanity/env";

export const client = sanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      // Next caches the responses; going straight to the API keeps published
      // edits from sitting behind the CDN after a webhook revalidation.
      useCdn: false,
      perspective: "published",
    })
  : null;

/**
 * Tagged fetch. The tag lets the Sanity webhook invalidate exactly the content
 * that changed; the time-based revalidate is a safety net if a webhook is lost.
 * Returns null on any failure so callers can fall back to bundled content.
 */
export async function sanityFetch<T>({
  query,
  params = {},
  tags,
}: {
  query: string;
  params?: Record<string, unknown>;
  tags: string[];
}): Promise<T | null> {
  if (!client) return null;

  try {
    return await client.fetch<T>(query, params, {
      next: { tags, revalidate: 3600 },
    });
  } catch (error) {
    console.error("[sanity] fetch failed, using bundled content", error);
    return null;
  }
}
