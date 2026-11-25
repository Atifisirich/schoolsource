// Business details used across the site. Edit here, not in components.

export const site = {
  name: "SchoolSource",
  domain: "schoolsource.in",
  url: "https://schoolsource.in",
  tagline: "Everything your school needs, from one source.",
  parent: "Arkhan Group Pvt. Ltd.",
  divisionLine: "A division of Arkhan Group Pvt. Ltd.",
  city: "Hyderabad",

  phoneDisplay: "+91 96760 38523",
  phoneHref: "tel:+919676038523",
  whatsappNumber: "919676038523",
  whatsappHref: "https://wa.me/919676038523",
  email: "info@schoolsource.in",
  emailHref: "mailto:info@schoolsource.in",

  // Confirmed by the owner, November 2026
  address:
    "Plot No. 802 & 803, 5th Floor, Nexus Business Centre, Ayyappa Society, Madhapur, Hyderabad 500081",
  addressShort: "Madhapur, Hyderabad",
  gstin: "36ABFCA8886K1ZX",
  founder: "Aijaz Khan",

  // Not yet confirmed - shown as a visible placeholder (see components/ui/Pending.tsx)
  hours: "[HOURS]",
} as const;

/**
 * Whether unconfirmed facts ([ADDRESS], [GSTIN] ...) are shown as visible
 * placeholders. Visible by default, as the owner's rules require; set
 * NEXT_PUBLIC_SHOW_PENDING=false at launch to hide them. Read at build time.
 */
export const placeholderVisible = process.env.NEXT_PUBLIC_SHOW_PENDING !== "false";

/** WhatsApp link with a prefilled message. */
export function whatsappLink(text?: string) {
  return text
    ? `${site.whatsappHref}?text=${encodeURIComponent(text)}`
    : site.whatsappHref;
}

export const mainNav = [
  { href: "/products", label: "Products" },
  { href: "/kits", label: "Kits" },
  { href: "/labs", label: "Labs" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const footerPages = [
  ...mainNav,
  { href: "/quote", label: "Request a quote" },
  { href: "/catalogue", label: "Printable catalogue" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
] as const;
