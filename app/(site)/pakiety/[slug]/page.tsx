import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPackage, getPackages } from "@/lib/content";
import { ServiceDetail } from "@/components/sections/service-detail";
import { LeadSection } from "@/components/sections/lead-section";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, OG_SHARED } from "@/lib/seo";

export async function generateStaticParams() {
  return (await getPackages()).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getPackage(slug);
  if (!service) return {};
  const description = `${service.name} w Łodzi — ${service.short} ${service.price}.`;
  return {
    title: service.name,
    description,
    alternates: { canonical: `/pakiety/${slug}` },
    openGraph: {
      ...OG_SHARED,
      title: `${service.name} — PRIMERO.STUDIO`,
      description,
      url: `/pakiety/${slug}`,
      type: "article",
      ...(service.image ? { images: [service.image] } : {}),
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getPackage(slug);
  if (!service) notFound();

  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Strona główna", path: "/" },
          { name: "Pakiety", path: "/pakiety" },
          { name: service.name, path: `/pakiety/${slug}` },
        ])}
      />
      <ServiceDetail service={service} />
      <LeadSection />
    </>
  );
}
