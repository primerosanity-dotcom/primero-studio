import { SectionLabel } from "@/components/ui/section-label";
import { Heading } from "@/components/ui/heading";
import { Reveal } from "@/components/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { faqSchema } from "@/lib/seo";
import type { FaqItem } from "@/lib/faq";
import { cn } from "@/lib/cn";

/**
 * Questions people type into Google, answered in plain text. Native
 * <details> keeps every answer in the HTML (crawlable, no JS needed) while
 * the page stays compact.
 */
export function Faq({
  items,
  index,
  title = "Najczęstsze pytania.",
  tone = "light",
  withSchema = true,
}: {
  items: FaqItem[];
  index?: string;
  title?: string;
  tone?: "light" | "dark";
  withSchema?: boolean;
}) {
  if (items.length === 0) return null;
  const dark = tone === "dark";

  return (
    <section
      id="faq"
      data-section-theme={tone}
      className={cn(
        "relative overflow-hidden",
        dark ? "bg-wine-deep text-cream" : "bg-cream text-ink",
      )}
    >
      {withSchema && <JsonLd schema={faqSchema(items)} />}
      <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-10 px-6 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-12 lg:py-28">
        <div>
          <Reveal>
            <SectionLabel index={index ?? "—"} tone={dark ? "cream" : "ink"}>
              FAQ
            </SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <Heading
              variant={dark ? "elegant" : "strong"}
              className={cn(
                "mt-8 text-[clamp(2rem,4.2vw,3.4rem)]",
                dark ? "gold-metallic" : "text-ink",
              )}
            >
              {title}
            </Heading>
          </Reveal>
        </div>

        <div className={cn("border-t", dark ? "border-cream/12" : "border-ink/12")}>
          {items.map((item) => (
            <details
              key={item.q}
              className={cn(
                "group border-b",
                dark ? "border-cream/12" : "border-ink/12",
              )}
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
                <h3
                  className={cn(
                    "font-sans text-base font-medium leading-snug sm:text-lg",
                    dark ? "text-cream" : "text-ink",
                  )}
                >
                  {item.q}
                </h3>
                <span
                  aria-hidden
                  className="mt-1 shrink-0 text-gold transition-transform duration-500 ease-lux group-open:rotate-45"
                >
                  <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                    <path d="M8 2v12M2 8h12" />
                  </svg>
                </span>
              </summary>
              <p
                className={cn(
                  "max-w-2xl pb-7 pr-10 font-sans text-[15px] leading-relaxed",
                  dark ? "text-cream/70" : "text-ink/65",
                )}
              >
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
