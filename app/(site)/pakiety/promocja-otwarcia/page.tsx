import type { Metadata } from "next";
import { PROMO, PROMO_OLD_PRICE, PROMO_SLUG } from "@/lib/promo";
import { ServiceDetail } from "@/components/sections/service-detail";
import { LeadSection } from "@/components/sections/lead-section";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, OG_SHARED } from "@/lib/seo";

const description = `${PROMO.name} w Łodzi — ${PROMO.short} ${PROMO.price}.`;

export const metadata: Metadata = {
  title: {
    absolute: `${PROMO.name} — promocja otwarcia w Łodzi | Primero Studio`,
  },
  description,
  alternates: { canonical: `/pakiety/${PROMO_SLUG}` },
  openGraph: {
    ...OG_SHARED,
    title: `${PROMO.name} — PRIMERO.STUDIO`,
    description,
    url: `/pakiety/${PROMO_SLUG}`,
    type: "article",
  },
};

export default function PromoPage() {
  const service = PROMO;

  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Strona główna", path: "/" },
          { name: "Pakiety", path: "/pakiety" },
          { name: PROMO.name, path: `/pakiety/${PROMO_SLUG}` },
        ])}
      />
      <ServiceDetail service={service} oldPrice={PROMO_OLD_PRICE} />
      <LeadSection />
    </>
  );
}
