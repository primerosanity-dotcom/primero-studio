import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug, getProjects } from "@/lib/content";
import { ProjectDetail } from "@/components/sections/project-detail";
import { LeadSection } from "@/components/sections/lead-section";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, OG_SHARED } from "@/lib/seo";

export async function generateStaticParams() {
  return (await getProjects()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  const short = project.short.trim().replace(/[.!]?$/, ".");
  const description = `${project.car} — ${short} Realizacja studia detailingu Primero Studio w Łodzi.`;
  return {
    // Brand suffix only while it fits — Google cuts titles near 60 chars.
    title: (() => {
      const base = `${project.car} — ${project.service.toLowerCase()} w Łodzi`;
      return base.length + " — Primero Studio".length <= 60
        ? base
        : { absolute: base };
    })(),
    description,
    alternates: { canonical: `/realizacje/${slug}` },
    openGraph: {
      ...OG_SHARED,
      title: `${project.car} — ${project.service} | Primero Studio Łódź`,
      description,
      url: `/realizacje/${slug}`,
      type: "article",
      ...(project.image ? { images: [project.image] } : {}),
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Strona główna", path: "/" },
          { name: "Realizacje", path: "/realizacje" },
          { name: project.car, path: `/realizacje/${slug}` },
        ])}
      />
      <ProjectDetail project={project} />
      <LeadSection />
    </>
  );
}
