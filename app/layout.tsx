import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Kalam, Public_Sans, Young_Serif } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { UtilityBar } from "@/components/layout/UtilityBar";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { bands, categories, countItems } from "@/data/catalogue";
import type { NavCategory } from "@/lib/bands";
import { site } from "@/lib/site";
import "./globals.css";

const youngSerif = Young_Serif({
  variable: "--font-young-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

// Handwriting for the requirement list in the hero only
const kalam = Kalam({
  variable: "--font-kalam",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} - ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description:
    "Stationery, printing, labs, sports, furniture and more - supplied to schools in Hyderabad with GST invoices and scheduled delivery.",
};

// Only what the navigation needs, so item lists stay out of every page bundle
const navCategories: NavCategory[] = categories.map((c) => ({
  number: c.number,
  slug: c.slug,
  name: c.name,
  band: c.band,
  itemCount: countItems(c),
}));

export const viewport: Viewport = {
  themeColor: "#1F4FB5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-IN"
      className={`${youngSerif.variable} ${publicSans.variable} ${plexMono.variable} ${kalam.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Lets CSS hide animated elements before first paint; without JS everything shows */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-50 bg-ink px-4 py-3 text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <UtilityBar />
        <Header categories={navCategories} bands={bands} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppFloat />
        <ScrollReveal />
      </body>
    </html>
  );
}
