import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPromoPackage, PROMO_PACKAGE_SLUG, PROMO_SLUG } from "@/lib/promo";
import { ServiceDetail } from "@/components/sections/service-detail";
import { LeadSection } from "@/components/sections/lead-section";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, OG_SHARED } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const pkg = await getPromoPackage();
  if (!pkg) return {};
  const description = `${pkg.name} w Łodzi — ${pkg.short} Cena ${pkg.price}.`;
  return {
    title: { absolute: `${pkg.name} w Łodzi | Primero Studio` },
    description,
    // Same content as the package page — let Google index that one.
    alternates: { canonical: `/pakiety/${PROMO_PACKAGE_SLUG}` },
    openGraph: {
      ...OG_SHARED,
      title: `${pkg.name} — PRIMERO.STUDIO`,
      description,
      url: `/pakiety/${PROMO_SLUG}`,
      type: "article",
    },
  };
}

export default async function PromoPage() {
  const service = await getPromoPackage();
  if (!service) notFound();

  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Strona główna", path: "/" },
          { name: "Pakiety", path: "/pakiety" },
          { name: service.name, path: `/pakiety/${PROMO_PACKAGE_SLUG}` },
        ])}
      />
      <ServiceDetail service={service} />
      <LeadSection />
    </>
  );
}
