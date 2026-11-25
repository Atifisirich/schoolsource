import type { Metadata, Viewport } from "next";
import { Kalam, Public_Sans, Source_Serif_4 } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { Analytics } from "@/components/seo/Analytics";
import { JsonLd } from "@/components/seo/JsonLd";
import { bands, categories, countItems } from "@/data/catalogue";
import type { NavCategory } from "@/lib/bands";
import { site } from "@/lib/site";
import "./globals.css";

// Headings: variable weight with optical sizing
const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
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
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-IN"
      className={`${sourceSerif.variable} ${publicSans.variable} ${kalam.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Lets CSS hide animated elements before first paint; without JS everything shows */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="pb-action-bar flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-50 rounded-sm bg-ink px-4 py-3 text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Header categories={navCategories} bands={bands} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppFloat />
        <MobileActionBar />
        <JsonLd />
        <Analytics />
      </body>
    </html>
  );
}
