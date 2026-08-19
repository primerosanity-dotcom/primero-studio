import type { Metadata } from "next";
import { clash, satoshi } from "./fonts";
import { cn } from "@/lib/cn";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "PRIMERO.STUDIO — Auto Detailing Łódź",
    template: "%s — PRIMERO.STUDIO",
  },
  description:
    "Studio detailingu w Łodzi. Powłoki ceramiczne, korekta lakieru, ochrona PPF i detailing wnętrza. Zadbamy o każdy detal.",
  openGraph: {
    title: "PRIMERO.STUDIO — Auto Detailing Łódź",
    description:
      "Powłoki ceramiczne, korekta lakieru, ochrona PPF i kompleksowy detailing w sercu Łodzi.",
    locale: "pl_PL",
    type: "website",
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
