"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { SectionLabel } from "@/components/ui/section-label";
import { Heading } from "@/components/ui/heading";
import { MediaSlot } from "@/components/ui/media-slot";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/cn";
import { BookingModal, type BookingSummary } from "@/components/booking-modal";
import { SERVICES, type Service } from "@/lib/services";
import type { ContactConfig } from "@/lib/site-config";

const EASE = [0.16, 1, 0.3, 1] as const;

function toSummary(s: Service): BookingSummary {
  return {
    name: s.name,
    tagline: s.tagline,
    price: s.price,
    cycle: s.cycle,
    duration: s.duration,
    includes: s.includes,
    prefill: s.prefill,
  };
}

function Arrow({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="11"
      viewBox="0 0 26 12"
      fill="none"
      aria-hidden
      className={className}
    >
      <path
        d="M0 6h24M19 1l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PackageCard({
  service,
  onBook,
}: {
  service: Service;
  onBook: (s: Service) => void;
}) {
  const featured = service.popular;
  return (
    <div
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border transition-colors duration-500 ease-lux",
        featured
          ? "border-gold/50 bg-gold/[0.05]"
          : "border-cream/12 bg-wine/40 hover:border-champagne/40",
      )}
    >
      {/* Photo header */}
      <div className="relative">
        <MediaSlot
          src={service.image}
          alt={`${service.name} — ${service.tagline}`}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="aspect-[16/9] w-full"
        />
        {featured && (
          <span className="absolute left-4 top-4 z-10 rounded-full bg-gold px-3 py-1 font-sans text-[9px] font-semibold uppercase tracking-[0.24em] text-wine-deep">
            Najczęściej wybierany
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-7 sm:p-8">
        <div className="flex items-center justify-between">
          <span className="font-sans text-[11px] tracking-[0.3em] text-champagne">
            {service.n}
          </span>
          <span className="font-sans text-[10px] uppercase tracking-[0.18em] text-cream/40">
            {service.cycle}
          </span>
        </div>

      <h3
        className={cn(
          "mt-5 font-display text-2xl font-semibold uppercase tracking-[0.12em]",
          featured ? "text-gold" : "text-cream",
        )}
      >
        {service.name}
      </h3>
      <p className="mt-2 font-sans text-sm leading-relaxed text-cream/55">
        {service.tagline}
      </p>

      <div className="mt-6 flex items-baseline gap-2">
        <span className="font-display text-3xl font-bold text-cream">
          {service.price}
        </span>
      </div>
      <span className="mt-1 font-sans text-[11px] uppercase tracking-[0.18em] text-cream/40">
        Czas: {service.duration}
      </span>

      <ul className="mt-6 flex-1 space-y-2.5 border-t border-cream/10 pt-6">
        {service.includes.map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <svg
              viewBox="0 0 16 16"
              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M3 8.5 6.5 12 13 4.5" />
            </svg>
            <span className="font-sans text-[13px] leading-snug text-cream/80">
              {item}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-7 flex items-center gap-3">
        <button
          type="button"
          onClick={() => onBook(service)}
          className={cn(
            "group/btn inline-flex flex-1 items-center justify-between gap-6 px-6 py-4 font-sans text-[0.66rem] font-semibold uppercase tracking-[0.24em] transition-all duration-500 ease-lux hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99]",
            "bg-gold text-wine-deep shadow-[0_12px_32px_-12px_rgba(217,184,114,0.5)] hover:bg-cream-soft",
          )}
        >
          <span>Umów</span>
          <Arrow className="transition-transform duration-500 ease-lux group-hover/btn:translate-x-1" />
        </button>
        <Link
          href={`/pakiety/${service.slug}`}
          className="shrink-0 font-sans text-[0.66rem] font-medium uppercase tracking-[0.2em] text-cream/45 transition-colors duration-300 hover:text-champagne"
        >
          Szczegóły
        </Link>
        </div>
      </div>
    </div>
  );
}

export function Pricing({ contact }: { contact: ContactConfig }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [active, setActive] = useState<Service>(
    () => SERVICES.find((s) => s.popular) ?? SERVICES[0],
  );

  const book = (s: Service) => {
    setActive(s);
    setModalOpen(true);
  };

  return (
    <section
      id="pakiety"
      data-section-theme="dark"
      className="relative overflow-hidden bg-wine-deep text-cream"
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 70% at 12% 8%, rgba(124,32,48,0.3), transparent 55%), radial-gradient(80% 55% at 90% 80%, rgba(76,22,34,0.32), transparent 60%), #150406",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1500px] px-6 pb-16 pt-28 lg:px-12 lg:pb-24 lg:pt-40">
        <div className="max-w-3xl">
          <Reveal>
            <SectionLabel index="04">Pakiety</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <Heading
              variant="elegant"
              className="mt-8 text-[clamp(2rem,4.5vw,3.6rem)] text-gold"
            >
              Pakiety detailingu.
            </Heading>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl font-sans text-base leading-relaxed text-cream/60">
              Pięć kompleksowych pakietów — od regularnej pielęgnacji po pełną
              renowację i ochronę. Ceny orientacyjne, ostateczną wycenę
              potwierdzamy po ocenie stanu auta.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.slug} delay={0.05 + i * 0.05}>
              <PackageCard service={s} onBook={book} />
            </Reveal>
          ))}

          {/* Consultation card fills the 6th cell */}
          <Reveal delay={0.05 + SERVICES.length * 0.05}>
            <div className="flex h-full flex-col justify-between rounded-2xl border border-dashed border-cream/20 bg-transparent p-7 sm:p-8">
              <div>
                <span className="font-sans text-[11px] tracking-[0.3em] text-champagne">
                  06
                </span>
                <h3 className="mt-5 font-display text-2xl font-semibold uppercase tracking-[0.12em] text-cream">
                  Nie wiesz,
                  <br />
                  który wybrać?
                </h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-cream/55">
                  Napisz lub zadzwoń — obejrzymy auto, dobierzemy zakres prac i
                  przygotujemy indywidualną wycenę.
                </p>
              </div>
              <div className="mt-8 flex flex-col gap-3">
                <Link
                  href="#kontakt-form"
                  className="group inline-flex items-center justify-between gap-6 border border-cream/25 px-6 py-4 font-sans text-[0.66rem] font-medium uppercase tracking-[0.24em] text-cream transition-colors duration-500 ease-lux hover:border-gold hover:text-gold"
                >
                  <span>Umów konsultację</span>
                  <Arrow className="transition-transform duration-500 ease-lux group-hover:translate-x-1" />
                </Link>
                {contact.phoneHref && contact.phoneDisplay && (
                  <a
                    href={contact.phoneHref}
                    className="text-center font-sans text-[0.66rem] font-medium uppercase tracking-[0.2em] text-cream/50 transition-colors duration-300 hover:text-champagne"
                  >
                    {contact.phoneDisplay}
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mt-10 font-sans text-[11px] leading-relaxed text-cream/35"
        >
          Ceny orientacyjne brutto. Zależą od rozmiaru i stanu auta — ostateczną
          wycenę potwierdzamy w studio.
        </motion.p>
      </div>

      <BookingModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        deliveryEnabled={contact.leadDeliveryEnabled}
        fallbackUrl={contact.whatsappUrl ?? contact.instagramUrl}
        summary={toSummary(active)}
      />
    </section>
  );
}
