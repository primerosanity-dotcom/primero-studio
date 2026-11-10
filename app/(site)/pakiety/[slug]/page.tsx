import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPackage, getPackages } from "@/lib/content";
import { ServiceDetail } from "@/components/sections/service-detail";
import { LeadSection } from "@/components/sections/lead-section";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, OG_SHARED, serviceSchema } from "@/lib/seo";
import { packageFaq } from "@/lib/faq";
import { Faq } from "@/components/sections/faq";

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
  // Price and time first: Google cuts descriptions around 155 characters.
  const description = `Pakiet ${service.name} w Łodzi — ${service.tagline.toLowerCase()}. Cena ${service.price}, czas: ${service.duration.replace(/^~/, "ok. ")}. ${service.short}`;
  const title = `${service.name} — ${service.tagline.toLowerCase()}, Łódź | Primero Studio`;
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
      <ServiceDetail service={service} />
      <Faq items={packageFaq(service)} title={`Pakiet ${service.name} — pytania.`} />
      <LeadSection />
    </>
  );
}
