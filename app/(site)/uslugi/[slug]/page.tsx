import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPackages, getPointService, getPointServices } from "@/lib/content";
import { SERVICE_PAGES } from "@/lib/service-pages";
import { serviceName, servicePageFaq } from "@/lib/faq";
import { PointServiceDetail } from "@/components/sections/point-service-detail";
import { Faq } from "@/components/sections/faq";
import { LeadSection } from "@/components/sections/lead-section";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, OG_SHARED, serviceSchema } from "@/lib/seo";

export async function generateStaticParams() {
  return (await getPointServices()).map((s) => ({ slug: s.id }));
}

function describe(base: string, price: string) {
  return price ? `${base} Cena ${price}.` : base;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getPointService(slug);
  if (!service) return {};

  const page = SERVICE_PAGES[slug];
  const title = page?.metaTitle ?? `${service.title} Łódź`;
  const description = describe(page?.metaDescription ?? service.desc, service.price);

  return {
    title: { absolute: `${title} | Primero Studio` },
    description,
    alternates: { canonical: `/uslugi/${slug}` },
    openGraph: {
      ...OG_SHARED,
      title: `${title} | Primero Studio`,
      description,
      url: `/uslugi/${slug}`,
      type: "website",
      ...(service.image ? { images: [service.image] } : {}),
    },
  };
}

export default async function UslugaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [service, all, packages] = await Promise.all([
    getPointService(slug),
    getPointServices(),
    getPackages(),
  ]);
  if (!service) notFound();

  const page = SERVICE_PAGES[slug];
  const inPackages = (page?.packages ?? [])
    .map((s) => packages.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const related = (page?.related ?? [])
    .map((id) => all.find((s) => s.id === id))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const faq = servicePageFaq(service, packages);

  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Strona główna", path: "/" },
          { name: "Usługi", path: "/uslugi" },
          { name: service.title, path: `/uslugi/${slug}` },
        ])}
      />
      <JsonLd
        schema={serviceSchema({
          name: page?.h1 ?? `${service.title} w Łodzi`,
          serviceType: service.title,
          description: page?.intro.join(" ") ?? service.desc,
          path: `/uslugi/${slug}`,
          price: service.price,
          image: service.image,
        })}
      />
      <PointServiceDetail
        service={service}
        page={page}
        packages={inPackages}
        related={related}
      />
      <Faq
        items={faq}
        title={`${serviceName(service)} — pytania i odpowiedzi.`}
      />
      <LeadSection />
    </>
  );
}
