import type { NextRequest } from "next/server";
import { revalidateTag } from "next/cache";
import { parseBody } from "next-sanity/webhook";

/**
 * Sanity webhook → cache invalidation. Sanity signs every delivery; parseBody
 * verifies that signature, so an unsigned or forged POST is rejected.
 *
 * Configure in Sanity: API → Webhooks → URL https://<domena>/api/revalidate,
 * dataset production, trigger on create/update/delete, secret = SANITY_REVALIDATE_SECRET.
 */
type WebhookPayload = { _type?: string; slug?: { current?: string } };

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return Response.json(
      { error: "SANITY_REVALIDATE_SECRET is not configured" },
      { status: 500 },
    );
  }

  let body: WebhookPayload | null;
  let isValidSignature: boolean | null;

  try {
    ({ body, isValidSignature } = await parseBody<WebhookPayload>(
      request,
      secret,
    ));
  } catch (error) {
    console.error("[revalidate] could not read webhook body", error);
    return Response.json({ error: "Malformed payload" }, { status: 400 });
  }

  if (!isValidSignature) {
    return Response.json({ error: "Invalid signature" }, { status: 401 });
  }

  const type = body?._type;
  if (!type) {
    return Response.json({ error: "Missing _type" }, { status: 400 });
  }

  // "max" keeps stale-while-revalidate semantics; the bare one-argument form
  // is deprecated in Next 16.
  revalidateTag(type, "max");
  revalidateTag("sanity", "max");

  return Response.json({ revalidated: true, type });
}
