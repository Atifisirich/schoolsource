import type { Metadata, Viewport } from "next";
import { Dela_Gothic_One, Schibsted_Grotesk } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { Analytics } from "@/components/seo/Analytics";
import { JsonLd } from "@/components/seo/JsonLd";
import { bands, categories, countItems } from "@/data/catalogue";
import type { NavCategory } from "@/lib/bands";
import { site } from "@/lib/site";
import "./globals.css";

// Display: h1, h2 and big statements. One weight only.
const dela = Dela_Gothic_One({
  variable: "--font-dela",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

// Text: everything else, 400-700
const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
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
  themeColor: "#fbf7f0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-IN"
      className={`${dela.variable} ${schibsted.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Lets CSS hide animated elements before first paint; without JS everything shows */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="pb-action-bar flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-[70] rounded-full bg-ink px-5 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Header categories={navCategories} bands={bands} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <MobileActionBar />
        <JsonLd />
        <Analytics />
      </body>
    </html>
  );
}
