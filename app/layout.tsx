import type { Metadata } from "next";
import { clash, satoshi } from "./fonts";
import { cn } from "@/lib/cn";
import "./globals.css";

export const metadata: Metadata = {
  title: "PRIMERO.STUDIO — Premium Auto Detailing Warszawa",
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
  return (
    <html
      lang="pl"
      className={cn(clash.variable, satoshi.variable, "antialiased")}
    >
      <body>{children}</body>
    </html>
  );
}
