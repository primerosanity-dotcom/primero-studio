import Link from "next/link";
import { Monogram } from "@/components/ui/monogram";
import { Wordmark } from "@/components/ui/wordmark";
import { getContactConfig } from "@/lib/site-config";

const NAV = [
  { label: "Studio", href: "/" },
  { label: "O nas", href: "/o-nas" },
  { label: "Usługi", href: "/uslugi" },
  { label: "Pakiety", href: "/pakiety" },
  { label: "Realizacje", href: "/realizacje" },
  { label: "Opinie", href: "/opinie" },
  { label: "Kontakt", href: "/kontakt" },
];

export function Footer() {
  const contact = getContactConfig();

  return (
    <footer className="relative border-t border-cream/[0.07] bg-[#150406] text-cream">
      <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-12 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10 lg:px-12 lg:py-20">
        {/* Brand */}
        <div className="sm:col-span-2 lg:col-span-1">
          <Link
            href="/"
            aria-label="PRIMERO.STUDIO — strona główna"
            className="flex items-center gap-3 text-cream"
          >
            <Monogram gradient className="h-9 w-9" />
            <Wordmark />
          </Link>
          <p className="mt-6 max-w-xs font-sans text-sm leading-relaxed text-cream/55">
            Studio detailingu w Łodzi. Zadbamy o każdy detal
            Twojego auta.
          </p>
        </div>

        {/* Nav */}
        <nav>
          <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-cream/40">
            Nawigacja
          </span>
          <ul className="mt-5 space-y-3">
            {NAV.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="font-sans text-sm text-cream/70 transition-colors duration-300 hover:text-gold"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-cream/40">
            Kontakt
          </span>
          <ul className="mt-5 space-y-3 font-sans text-sm text-cream/70">
            {contact.phoneHref && contact.phoneDisplay && (
              <li>
                <a href={contact.phoneHref} className="hover:text-gold">
                  {contact.phoneDisplay}
                </a>
              </li>
            )}
            {contact.whatsappUrl && (
              <li>
                <a
                  href={contact.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-gold"
                >
                  WhatsApp
                </a>
              </li>
            )}
            <li>
              <a
                href={contact.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-gold"
              >
                {contact.instagramHandle}
              </a>
            </li>
            {contact.email && (
              <li>
                <a href={`mailto:${contact.email}`} className="hover:text-gold">
                  {contact.email}
                </a>
              </li>
            )}
          </ul>
        </div>

        {/* Address + hours */}
        <div>
          <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-cream/40">
            Studio
          </span>
          <div className="mt-5 space-y-4 font-sans text-sm text-cream/70">
            {contact.addressLines.length > 0 && (
              <address className="not-italic leading-relaxed">
                {contact.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            )}
            <div className="leading-relaxed text-cream/60">
              <span className="block">Pon – Pt: 9:00 – 19:00</span>
              <span className="block">Sob: 10:00 – 15:00</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-[1500px] flex-col items-center gap-3 px-6 py-6 text-center sm:flex-row sm:justify-between sm:text-left lg:px-12">
          <span className="font-sans text-[11px] tracking-[0.2em] text-cream/40">
            © {2026} PRIMERO.STUDIO
          </span>
          <span className="font-sans text-[10px] uppercase tracking-[0.32em] text-cream/35">
            Auto Detailing · Łódź
          </span>
        </div>
      </div>
    </footer>
  );
}
