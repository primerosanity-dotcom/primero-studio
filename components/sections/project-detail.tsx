import Link from "next/link";
import { SectionLabel } from "@/components/ui/section-label";
import { MediaSlot } from "@/components/ui/media-slot";
import { Monogram } from "@/components/ui/monogram";
import { Gallery } from "@/components/ui/gallery";
import { ArrowButton } from "@/components/ui/arrow-button";
import { Reveal } from "@/components/reveal";
import { getProjects } from "@/lib/content";
import type { Project } from "@/lib/projects";

function CarIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M2 14v-4l4-1 3-5h14l3 5 4 1v4" />
      <path d="M2 14h4M26 14h4" />
      <circle cx="9" cy="15" r="3" />
      <circle cx="23" cy="15" r="3" />
    </svg>
  );
}

function Check() {
  return (
    <span
      aria-hidden
      className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-gold/50 text-gold"
    >
      <svg
        viewBox="0 0 16 16"
        className="h-3 w-3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 8.5 6.5 12 13 4.5" />
      </svg>
    </span>
  );
}

export async function ProjectDetail({ project }: { project: Project }) {
  const others = (await getProjects())
    .filter((p) => p.slug !== project.slug)
    .slice(0, 3);
  const gallery = project.gallery ?? [];

  return (
    <section
      id="realizacja"
      data-section-theme="dark"
      className="relative overflow-hidden bg-wine-deep text-cream"
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 70% at 85% 8%, rgba(124,32,48,0.3), transparent 55%), #150406",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1500px] px-6 pb-16 pt-28 lg:px-12 lg:pb-24 lg:pt-40">
        {/* Breadcrumb */}
        <Reveal>
          <div className="flex items-center gap-3 font-sans text-[11px] uppercase tracking-[0.28em] text-cream/45">
            <Link
              href="/realizacje"
              className="transition-colors hover:text-gold"
            >
              Realizacje
            </Link>
            <span className="text-cream/25">/</span>
            <span className="text-cream/70">{project.car}</span>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-8">
            <SectionLabel index="—">{project.service}</SectionLabel>
          </div>
        </Reveal>

        {/* Scope card + hero photo */}
        <div className="mt-8 grid grid-cols-1 items-stretch gap-5 lg:mt-10 lg:grid-cols-2">
          <Reveal>
            <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-cream/12 bg-wine/30 p-7 sm:p-9">
              <Monogram className="pointer-events-none absolute -bottom-6 -right-4 h-48 w-48 text-cream/[0.03]" />

              <div className="relative flex items-center gap-4">
                <CarIcon className="h-8 w-12 text-gold" />
                <h1 className="font-display text-3xl font-semibold uppercase tracking-[0.06em] text-cream sm:text-4xl">
                  {project.car}
                </h1>
              </div>

              <div className="relative mt-7 h-px w-full bg-cream/12" />

              <h2 className="relative mt-7 font-sans text-base font-semibold text-cream">
                Wykonane prace:
              </h2>
              <ul className="relative mt-5 space-y-3.5">
                {project.steps.map((step) => (
                  <li key={step} className="flex items-start gap-3">
                    <Check />
                    <span className="font-sans text-sm leading-relaxed text-cream/85 sm:text-base">
                      {step}
                    </span>
                  </li>
                ))}
              </ul>

              {project.duration && (
                <span className="relative mt-auto pt-8 font-sans text-[11px] uppercase tracking-[0.22em] text-cream/40">
                  Czas realizacji: {project.duration}
                </span>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <MediaSlot
              src={project.image}
              alt={`${project.car} — ${project.service}`}
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="h-full min-h-[280px] w-full rounded-2xl"
            />
          </Reveal>
        </div>

        {/* Gallery — click to enlarge */}
        {gallery.length > 0 && (
          <Reveal>
            <div className="mt-5">
              <Gallery images={gallery} alt={project.car} />
            </div>
          </Reveal>
        )}

        {/* Description + CTA */}
        {project.description && (
          <Reveal>
            <div className="mt-14 max-w-3xl border-t border-cream/10 pt-12">
              <h2 className="font-sans text-[11px] uppercase tracking-[0.3em] text-cream/45">
                O realizacji
              </h2>
              <p className="mt-5 font-sans text-base leading-relaxed text-cream/75">
                {project.description}
              </p>
              <ArrowButton href="#kontakt-form" tone="dark" className="mt-8">
                Umów podobną realizację
              </ArrowButton>
            </div>
          </Reveal>
        )}

        {/* Other projects */}
        {others.length > 0 && (
          <div className="mt-16 border-t border-cream/10 pt-12">
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-cream/45">
              Inne realizacje
            </span>
            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-4">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/realizacje/${o.slug}`}
                  className="group inline-flex items-center gap-3 font-display text-lg font-medium uppercase tracking-[0.02em] text-cream/70 transition-colors duration-300 hover:text-gold sm:text-xl"
                >
                  {o.car}
                  <span className="text-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
