import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { getPackage, getPackages } from "@/lib/content";
import { OLD_PACKAGES } from "@/lib/services";
import { ServiceDetail } from "@/components/sections/service-detail";
import { LeadSection } from "@/components/sections/lead-section";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, OG_SHARED, serviceSchema } from "@/lib/seo";
import { packageFaq } from "@/lib/faq";
import { Faq } from "@/components/sections/faq";
import { clampDescription, PACKAGE_SEO } from "@/lib/package-seo";

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
  const seo = PACKAGE_SEO[slug];
  // Price and time first: Google cuts descriptions around 155 characters.
  const description = clampDescription(
    seo
      ? seo.description.replace("{price}", service.price)
      : `Pakiet ${service.name} w Łodzi — ${service.tagline.toLowerCase()}. Cena ${service.price}, czas: ${service.duration.replace(/^~/, "ok. ")}. ${service.short}`,
  );
  const title = seo
    ? `${seo.title} | Primero Studio`
    : `${service.name} — ${service.tagline.toLowerCase()}, Łódź | Primero Studio`;
  return {
    title: {
      absolute:
        title.length <= 65
          ? title
          : `${service.name} — pakiet detailingu w Łodzi | Primero Studio`,
    },
    description,
    alternates: { canonical: `/pakiety/${slug}` },
    openGraph: {
      ...OG_SHARED,
      title: `Pakiet ${service.name} — ${service.tagline} | Primero Studio`,
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
  if (!service) {
    // Packages from the old price list (ESSENTIAL, PROTECT…) → their successor.
    const successor = OLD_PACKAGES[slug];
    if (successor) permanentRedirect(`/pakiety/${successor.slug}`);
    notFound();
  }

  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Strona główna", path: "/" },
          { name: "Pakiety", path: "/pakiety" },
          { name: service.name, path: `/pakiety/${slug}` },
        ])}
      />
      <JsonLd
        schema={serviceSchema({
          name: `Pakiet ${service.name} — ${service.tagline}`,
          serviceType: service.tagline,
          description: `${service.short} ${service.problem}`,
          path: `/pakiety/${slug}`,
          price: service.price,
          image: service.image,
        })}
      />
      <ServiceDetail service={service} seo={PACKAGE_SEO[slug]} />
      <Faq items={packageFaq(service)} title={`Pakiet ${service.name} — pytania.`} />
      <LeadSection />
    </>
  );
}
