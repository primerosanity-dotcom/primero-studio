/**
 * One-off migration: pushes the content that currently lives in /lib (and the
 * photos in /public/images) into Sanity, so the client can edit it in Studio.
 *
 * Safe to re-run: every document uses a deterministic _id and createOrReplace,
 * and each image is uploaded once per source file (cached by filename).
 *
 *   npx tsx --env-file=.env.local scripts/migrate-to-sanity.ts
 */
import { readFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@sanity/client";
import { SERVICES } from "../lib/services";
import { POINT_SERVICES } from "../lib/individual-services";
import { PROJECTS } from "../lib/projects";
import { REVIEWS, RATING, REVIEW_COUNT, GOOGLE_URL } from "../lib/reviews";
import { getContactConfig } from "../lib/site-config";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_WRITE_TOKEN — run with --env-file=.env.local",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2026-02-01",
  useCdn: false,
});

/** Upload a file from /public once and reuse the asset on re-runs. */
const uploaded = new Map<string, string>();
async function uploadImage(publicPath?: string) {
  if (!publicPath) return undefined;
  const cached = uploaded.get(publicPath);
  if (cached) return { _type: "image", asset: { _type: "reference", _ref: cached } };

  const abs = path.join(process.cwd(), "public", publicPath.replace(/^\//, ""));
  // Subfolders repeat filenames (uslugi/1.png vs realizacje/1.png), so the
  // asset name carries the folder — otherwise the reuse lookup below would
  // hand a project the photo of a service.
  const relative = publicPath.replace(/^\/images\//, "").replace(/^\//, "");
  const filename = relative.replace(/\//g, "-");

  // Reuse an identical asset if this file was already pushed in an earlier run.
  const existing = await client.fetch<{ _id: string } | null>(
    `*[_type == "sanity.imageAsset" && originalFilename == $filename][0]{_id}`,
    { filename },
  );
  if (existing?._id) {
    uploaded.set(publicPath, existing._id);
    return { _type: "image", asset: { _type: "reference", _ref: existing._id } };
  }

  const buffer = await readFile(abs);
  const asset = await client.assets.upload("image", buffer, { filename });
  uploaded.set(publicPath, asset._id);
  console.log(`  ↑ ${filename}`);
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/ł/g, "l")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

async function run() {
  const docs: Record<string, unknown>[] = [];

  console.log("Pakiety…");
  for (const [i, s] of SERVICES.entries()) {
    docs.push({
      _id: `pakiet-${s.slug}`,
      _type: "pakiet",
      name: s.name,
      slug: { _type: "slug", current: s.slug },
      order: i + 1,
      tagline: s.tagline,
      short: s.short,
      price: s.price,
      priceValue: s.priceValue,
      duration: s.duration,
      cycle: s.cycle,
      problem: s.problem,
      effect: s.effect,
      includes: s.includes,
      popular: Boolean(s.popular),
      image: await uploadImage(s.image),
    });
  }

  console.log("Usługi…");
  for (const [i, s] of POINT_SERVICES.entries()) {
    docs.push({
      _id: `usluga-${s.id}`,
      _type: "usluga",
      title: s.title,
      slug: { _type: "slug", current: s.id },
      order: i + 1,
      desc: s.desc,
      price: s.price,
      duration: s.duration,
      image: await uploadImage(s.image),
    });
  }

  console.log("Realizacje…");
  for (const [i, p] of PROJECTS.entries()) {
    docs.push({
      _id: `realizacja-${p.slug}`,
      _type: "realizacja",
      car: p.car,
      slug: { _type: "slug", current: p.slug },
      order: i + 1,
      service: p.service,
      short: p.short,
      description: p.description,
      steps: p.steps,
      duration: p.duration,
      image: await uploadImage(p.image),
      beforeImage: await uploadImage(p.beforeImage),
    });
  }

  console.log("Opinie…");
  for (const [i, r] of REVIEWS.entries()) {
    docs.push({
      _id: `opinia-${slugify(r.name)}-${i + 1}`,
      _type: "opinia",
      name: r.name,
      order: i + 1,
      date: r.date,
      text: r.text,
    });
  }

  console.log("Ustawienia…");
  const contact = getContactConfig();
  docs.push({
    _id: "ustawienia",
    _type: "ustawienia",
    phone: contact.phoneDisplay,
    whatsapp: contact.phoneDisplay,
    email: contact.email,
    instagramHandle: contact.instagramHandle,
    instagramUrl: contact.instagramUrl,
    addressLines: contact.addressLines,
    mapsUrl: contact.mapsUrl,
    hours: [
      { _key: "pn-pt", days: "Pon – Pt", hours: "09:00 – 19:00" },
      { _key: "sob", days: "Sobota", hours: "10:00 – 15:00" },
      { _key: "nd", days: "Niedziela", hours: "Zamknięte" },
    ],
    stats: [
      { _key: "aut", value: "300+", label: "Zrealizowanych aut" },
      { _key: "ocena", value: "5,0★", label: "Ocena Google" },
      { _key: "lata", value: "7 lat", label: "Doświadczenia" },
      { _key: "gwarancja", value: "100%", label: "Gwarancja jakości" },
    ],
    aboutText:
      "Primero Studio — studio detailingu w Łodzi. Pracujemy na najlepszych materiałach i zapewniamy precyzyjną pielęgnację auta — od korekty lakieru i ochrony karoserii po nienaganne wnętrze, z dbałością o każdy detal.",
    googleRating: RATING,
    googleReviewCount: REVIEW_COUNT,
    googleUrl: GOOGLE_URL,
    heroDesktop: await uploadImage("/images/hero-desktop-v2.png"),
    heroMobile: await uploadImage("/images/hero-mobile-v2.png"),
    aboutImage: await uploadImage("/images/about.png"),
  });

  const tx = docs.reduce(
    (t, doc) => t.createOrReplace(doc as never),
    client.transaction(),
  );
  await tx.commit();

  console.log(`\n✓ ${docs.length} dokumentów w Sanity (${uploaded.size} zdjęć)`);
}

run().catch((error) => {
  console.error("Migration failed:", error);
  process.exit(1);
});
