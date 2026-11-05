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
 * Tagged fetch. The tag lets a Sanity webhook invalidate exactly the content
 * that changed; the 60 s time-based revalidate keeps admin edits flowing
 * even without the webhook.
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
      // No Sanity webhook is set up, so the time-based refresh is what makes
      // admin edits show up: at most ~1 minute behind.
      next: { tags, revalidate: 60 },
    });
  } catch (error) {
    console.error("[sanity] fetch failed, using bundled content", error);
    return null;
  }
}
