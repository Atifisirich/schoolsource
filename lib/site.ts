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

  // Not yet confirmed - shown as visible placeholders
  address: "[ADDRESS]",
  gstin: "[GSTIN]",
  hours: "[HOURS]",
} as const;

/** WhatsApp link with a prefilled message. */
export function whatsappLink(text?: string) {
  return text
    ? `${site.whatsappHref}?text=${encodeURIComponent(text)}`
    : site.whatsappHref;
}

export const mainNav = [
  { href: "/products", label: "Products" },
  { href: "/kits", label: "School Kits" },
  { href: "/labs", label: "Labs & STEM" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const footerPages = [
  ...mainNav,
  { href: "/quote", label: "Request a Quote" },
  { href: "/catalogue", label: "Printable catalogue" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
] as const;
