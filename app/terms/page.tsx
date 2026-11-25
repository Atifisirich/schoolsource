import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms",
  description: "Basic terms for SchoolSource quotations, orders, delivery and payment.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms"
      intro={`Basic terms for quotations, orders, delivery and payment with ${site.name}, a division of ${site.parent}.`}
      updated="[CONFIRM]"
      sections={[
        {
          title: "Quotations",
          body: [
            "Prices are given only in a written quotation. Nothing on this website is an offer at a fixed price.",
            "A quotation is valid for [CONFIRM] days from its date. Whether prices include GST, delivery and installation is stated on each quotation [CONFIRM].",
          ],
        },
        {
          title: "Orders",
          body: [
            "An order is confirmed when you approve the quotation in writing, by email or WhatsApp. The minimum order is [MIN ORDER].",
            "Printed and custom items, such as ID cards, diaries, uniforms and branded merchandise, are produced after you approve a proof or sample [CONFIRM].",
          ],
        },
        {
          title: "Delivery",
          body: [
            "We supply schools across Hyderabad and in other states, on a date agreed with you. Each delivery comes with a GST invoice and delivery challan.",
            "Please check goods on delivery and tell us about any shortage or damage as soon as possible [CONFIRM].",
          ],
        },
        {
          title: "Payment",
          body: ["Payment is due on [PAYMENT TERMS]. Accepted payment modes: [CONFIRM]."],
        },
        {
          title: "Returns and replacements",
          body: ["Returns and replacements follow our [RETURN POLICY]. Custom and printed items may not be returnable [CONFIRM]."],
        },
        {
          title: "Contact",
          body: [`For questions about these terms, email ${site.email} or call ${site.phoneDisplay}. Address: ${site.address}.`],
        },
      ]}
    />
  );
}
