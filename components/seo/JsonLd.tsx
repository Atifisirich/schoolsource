import { site } from "@/lib/site";

/**
 * Organization + LocalBusiness structured data for the whole site.
 * Facts come from lib/site.ts; the address is split into PostalAddress parts.
 */
const data = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  "@id": `${site.url}/#organization`,
  name: site.name,
  description: `School supplies division of ${site.parent}, Hyderabad. ${site.tagline}`,
  url: site.url,
  email: site.email,
  telephone: site.phoneHref.replace("tel:", ""),
  image: `${site.url}/opengraph-image`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Plot No. 802 & 803, 5th Floor, Nexus Business Centre, Ayyappa Society",
    addressLocality: "Madhapur, Hyderabad",
    addressRegion: "Telangana",
    postalCode: "500081",
    addressCountry: "IN",
  },
  parentOrganization: { "@type": "Organization", name: site.parent },
  founder: { "@type": "Person", name: site.founder },
  taxID: site.gstin,
  areaServed: { "@type": "City", name: "Hyderabad" },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    telephone: site.phoneHref.replace("tel:", ""),
    email: site.email,
    areaServed: "IN",
  },
};

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      // Static, trusted data; "<" escaped so the JSON can never close the script tag
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
