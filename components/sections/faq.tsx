import { SectionLabel } from "@/components/ui/section-label";
import { Heading } from "@/components/ui/heading";
import { Reveal } from "@/components/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { faqSchema } from "@/lib/seo";
import { getSettings } from "@/lib/content";
import type { FaqItem } from "@/lib/faq";
import { cn } from "@/lib/cn";

function Arrow() {
  return (
    <svg
      width="26"
      height="12"
      viewBox="0 0 26 12"
      fill="none"
      className="transition-transform duration-500 ease-lux group-hover:translate-x-1"
      aria-hidden
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

/** Items split into their groups, keeping the original order and numbering. */
function groupItems(items: FaqItem[]) {
  const groups: { name?: string; items: (FaqItem & { n: string })[] }[] = [];
  items.forEach((item, i) => {
    const numbered = { ...item, n: String(i + 1).padStart(2, "0") };
    const last = groups[groups.length - 1];
    if (last && last.name === item.group) last.items.push(numbered);
    else groups.push({ name: item.group, items: [numbered] });
  });
  return groups;
}

/**
 * Questions people type into Google, answered in plain text. Native
 * <details> keeps every answer in the HTML (crawlable, no JS needed) while
 * the page stays compact. The left column stays in view on desktop and ends
 * with a contact card for questions the list does not answer.
 */
export async function Faq({
  items,
  index,
  title = "Najczęstsze pytania.",
  intro = "Odpowiadamy na to, o co klienci pytają nas najczęściej, zanim zostawią u nas auto — uczciwie, także o tym, czego zrobić się nie da.",
  tone = "light",
  withSchema = true,
}: {
  items: FaqItem[];
  index?: string;
  title?: string;
  intro?: string;
  tone?: "light" | "dark";
  withSchema?: boolean;
}) {
  if (items.length === 0) return null;
  const dark = tone === "dark";
  const { contact } = await getSettings();
  const groups = groupItems(items);

  return (
    <section
      id="faq"
      data-section-theme={tone}
      className={cn(
        "relative overflow-clip",
        dark ? "bg-wine-deep text-cream" : "bg-cream text-ink",
      )}
    >
      {withSchema && <JsonLd schema={faqSchema(items)} />}
      <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-12 px-6 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-12 lg:py-28">
        <div className="lg:sticky lg:top-32 lg:self-start">
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
          <Reveal delay={0.1}>
            <p
              className={cn(
                "mt-6 max-w-md font-sans text-[15px] leading-relaxed",
                dark ? "text-cream/65" : "text-ink/60",
              )}
            >
              {intro}
            </p>
          </Reveal>

          {(contact.whatsappUrl || contact.phoneHref) && (
            <Reveal delay={0.15}>
              <div
                className={cn(
                  "mt-10 max-w-md rounded-2xl border p-7",
                  dark
                    ? "border-cream/12 bg-cream/[0.03]"
                    : "border-ink/12 bg-cream-soft/60",
                )}
              >
                <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-champagne">
                  Nie ma tu Twojego pytania?
                </p>
                <p
                  className={cn(
                    "mt-3 font-sans text-[15px] leading-relaxed",
                    dark ? "text-cream/70" : "text-ink/65",
                  )}
                >
                  Napisz albo zadzwoń — doradzimy i umówimy bezpłatne oględziny
                  auta.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
                  {contact.whatsappUrl && (
                    <a
                      href={contact.whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center justify-between gap-8 bg-gold px-6 py-4 font-sans text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-wine-deep shadow-[0_12px_32px_-12px_rgba(217,184,114,0.5)] transition-all duration-500 ease-lux hover:-translate-y-0.5 hover:bg-cream-soft active:translate-y-0 active:scale-[0.99]"
                    >
                      <span>Napisz na WhatsApp</span>
                      <Arrow />
                    </a>
                  )}
                  {contact.phoneHref && contact.phoneDisplay && (
                    <a
                      href={contact.phoneHref}
                      className={cn(
                        "font-sans text-[0.66rem] font-medium uppercase tracking-[0.2em] transition-colors duration-300 hover:text-champagne",
                        dark ? "text-cream/60" : "text-ink/55",
                      )}
                    >
                      {contact.phoneDisplay}
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          )}
        </div>

        <div className="flex flex-col gap-12">
          {groups.map((group) => (
            <div key={group.name ?? "all"}>
              {group.name && (
                <p className="mb-2 font-sans text-[11px] uppercase tracking-[0.3em] text-champagne">
                  {group.name}
                </p>
              )}
              <div className={cn("border-t", dark ? "border-cream/12" : "border-ink/12")}>
                {group.items.map((item) => {
                  return (
                    <details
                      key={item.q}
                      className={cn(
                        "group border-b",
                        dark ? "border-cream/12" : "border-ink/12",
                      )}
                    >
                      <summary className="flex cursor-pointer list-none items-start gap-5 py-6 sm:gap-8 [&::-webkit-details-marker]:hidden">
                        <span className="mt-[0.35rem] w-6 shrink-0 font-sans text-[11px] tracking-[0.3em] text-champagne">
                          {item.n}
                        </span>
                        <h3
                          className={cn(
                            "flex-1 font-sans text-base font-medium leading-snug transition-colors duration-300 group-hover:text-champagne group-open:text-champagne sm:text-lg",
                            dark ? "text-cream" : "text-ink",
                          )}
                        >
                          {item.q}
                        </h3>
                        <span
                          aria-hidden
                          className={cn(
                            "grid h-8 w-8 shrink-0 place-items-center rounded-full border text-gold transition-all duration-500 ease-lux group-open:rotate-45 group-open:border-gold",
                            dark ? "border-cream/15" : "border-ink/15",
                          )}
                        >
                          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                            <path d="M8 2v12M2 8h12" />
                          </svg>
                        </span>
                      </summary>
                      <p
                        className={cn(
                          "max-w-2xl pb-7 pl-11 pr-12 font-sans text-[15px] leading-relaxed sm:pl-14",
                          dark ? "text-cream/70" : "text-ink/65",
                        )}
                      >
                        {item.a}
                      </p>
                    </details>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
