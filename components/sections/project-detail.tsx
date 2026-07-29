import Link from "next/link";
import { SectionLabel } from "@/components/ui/section-label";
import { Heading } from "@/components/ui/heading";
import { BeforeAfter } from "@/components/ui/before-after";
import { ArrowButton } from "@/components/ui/arrow-button";
import { Reveal } from "@/components/reveal";
import { PROJECTS, type Project } from "@/lib/projects";

export function ProjectDetail({ project }: { project: Project }) {
  const others = PROJECTS.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <section
      id="realizacja"
      data-section-theme="dark"
      className="relative overflow-hidden bg-[#150406] text-cream"
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

        {/* Header */}
        <div className="mt-10 max-w-3xl">
          <Reveal>
            <SectionLabel index="—">Realizacja</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <Heading
              as="h1"
              variant="elegant"
              className="mt-8 text-[clamp(2.2rem,5vw,4.2rem)] text-gold"
            >
              {project.car}
            </Heading>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-gold/40 px-4 py-1.5 font-sans text-[11px] uppercase tracking-[0.2em] text-gold">
                {project.service}
              </span>
              <span className="rounded-full border border-cream/20 px-4 py-1.5 font-sans text-[11px] uppercase tracking-[0.2em] text-cream/60">
                {project.duration}
              </span>
            </div>
          </Reveal>
        </div>

        {/* Before / after */}
        <Reveal delay={0.1}>
          <figure className="mt-12 lg:mt-16">
            <BeforeAfter
              beforeSrc={project.beforeSrc}
              afterSrc={project.afterSrc}
              beforeAlt={`${project.car} — przed`}
              afterAlt={`${project.car} — po`}
              sizes="(max-width: 1024px) 100vw, 1400px"
              className="aspect-[16/10] w-full rounded-2xl sm:aspect-[16/9]"
            />
          </figure>
        </Reveal>

        {/* Description + scope */}
        <div className="mt-14 grid grid-cols-1 gap-10 border-t border-cream/10 pt-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16 lg:pt-16">
          <Reveal>
            <h2 className="font-sans text-[11px] uppercase tracking-[0.3em] text-cream/45">
              Co zrobiliśmy
            </h2>
            <p className="mt-5 max-w-xl font-sans text-base leading-relaxed text-cream/75">
              {project.description}
            </p>
            <ArrowButton href="#kontakt-form" tone="dark" className="mt-8">
              Umów podobną realizację
            </ArrowButton>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="font-sans text-[11px] uppercase tracking-[0.3em] text-cream/45">
              Zakres prac
            </h2>
            <ul className="mt-5 space-y-3.5">
              {project.steps.map((step) => (
                <li key={step} className="flex items-start gap-3">
                  <svg
                    viewBox="0 0 16 16"
                    className="mt-0.5 h-4 w-4 shrink-0 text-gold"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M3 8.5 6.5 12 13 4.5" />
                  </svg>
                  <span className="font-sans text-sm leading-snug text-cream/85">
                    {step}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

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
