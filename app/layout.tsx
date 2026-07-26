import type { Metadata } from "next";
import { clash, satoshi } from "./fonts";
import { cn } from "@/lib/cn";
import { SmoothScroll } from "@/components/smooth-scroll";
import { FilmGrain } from "@/components/film-grain";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { getContactConfig } from "@/lib/site-config";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "PRIMERO.STUDIO — Premium Auto Detailing Warszawa",
    template: "%s — PRIMERO.STUDIO",
  },
  description:
    "Studio detailingu premium w Warszawie. Powłoki ceramiczne, korekta lakieru, ochrona PPF i detailing wnętrza. Zadbamy o każdy detal.",
  openGraph: {
    title: "PRIMERO.STUDIO — Premium Auto Detailing Warszawa",
    description:
      "Powłoki ceramiczne, korekta lakieru, ochrona PPF i kompleksowy detailing w sercu Warszawy.",
    locale: "pl_PL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const contact = getContactConfig();

  return (
    <html
      lang="pl"
      className={cn(clash.variable, satoshi.variable, "antialiased")}
    >
      <body>
        <SmoothScroll>
          <FilmGrain />
          <Nav contact={contact} />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
