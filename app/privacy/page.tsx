import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: "What the SchoolSource quote form collects, why, and how we use it.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy"
      intro="A short, plain explanation of the information we collect on this website and how we use it."
      updated="[CONFIRM]"
      sections={[
        {
          title: "What we collect",
          body: [
            "When you send a quote request or message, we receive the details you enter: your name, school, role, phone number, email address, city or area, the categories and items you need, your message, any file you attach and your preferred delivery date.",
            "Your quote list is stored only in your own browser until you send it. We do not see it before then.",
          ],
        },
        {
          title: "Why we collect it",
          body: [
            "We use these details only to prepare your quotation, contact you about your request, and arrange delivery and invoicing if you place an order.",
          ],
        },
        {
          title: "Who else handles it",
          body: [
            "Form submissions are delivered to our email by Web3Forms, a form service. If you choose to contact us on WhatsApp, your message is handled by WhatsApp under its own terms.",
            "We do not sell, rent or share your details with anyone for marketing.",
          ],
        },
        {
          title: "Analytics",
          body: [
            "This website does not use analytics by default. If we turn on Google Analytics, it will collect anonymous usage information such as pages visited, and this page will be updated [CONFIRM].",
          ],
        },
        {
          title: "How long we keep it",
          body: ["We keep quote requests and order records for as long as needed for our business and tax records [CONFIRM]."],
        },
        {
          title: "Questions or corrections",
          body: [
            `To ask what we hold about you, or to have it corrected or deleted, email ${site.email} or call ${site.phoneDisplay}.`,
          ],
        },
      ]}
    />
  );
}
