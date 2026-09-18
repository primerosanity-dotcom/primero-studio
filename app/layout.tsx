import type { Metadata } from "next";
import { clash, satoshi } from "./fonts";
import { cn } from "@/lib/cn";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import "./globals.css";

// Kept under 60 characters — Google rewrites long titles wholesale.
const TITLE = "Detailing Łódź — powłoki ceramiczne i PPF | Primero Studio";
const DESCRIPTION =
  "Studio detailingu w Łodzi. Powłoki ceramiczne, korekta lakieru, folia ochronna PPF i detailing wnętrza. Bezpłatna wycena — ul. Papiernicza 7R.";

export const metadata: Metadata = {
  // Anchors every relative URL Next generates: canonicals, OG tags, sitemap.
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s — Primero Studio",
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "detailing Łódź",
    "powłoki ceramiczne Łódź",
    "korekta lakieru Łódź",
    "PPF Łódź",
    "folia ochronna na auto Łódź",
    "pranie tapicerki Łódź",
    "auto detailing Łódź",
    "polerowanie lakieru Łódź",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pl"
      className={cn(clash.variable, satoshi.variable, "antialiased")}
    >
      <body>{children}</body>
    </html>
  );
}
