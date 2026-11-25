import type { Metadata } from "next";
import { BigSteps } from "@/components/how/BigSteps";
import { Faq } from "@/components/how/Faq";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { Pending, showPending } from "@/components/ui/Pending";
import { Section, SectionHead } from "@/components/ui/Section";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Send your list, get one itemised quotation, approve it, and receive checked items with a GST invoice. Delivery across Hyderabad and other states.",
};

const waHref = whatsappLink("Hello SchoolSource, here is our school's requirement list:");

const orderSteps = [
  { title: "Send your list", text: "WhatsApp a photo, email a spreadsheet or fill in the quote form. Any format works." },
  { title: "Get your quotation", text: "Every item quoted line by line on one quote. Change anything you like." },
  { title: "Approve it", text: "Say yes on WhatsApp or by email. We agree the delivery date with you." },
  {
    title: "Checked and delivered",
    text: "Every order is checked against what you approved, then delivered with a GST invoice.",
  },
];

const facts = [
  { title: "In stock: within a week", text: "Commonly ordered items are in our warehouse. They arrive within a week of confirmation." },
  { title: "Other items: timeline in the quote", text: "Items we do not stock, or make to your specification, are sourced for your order." },
  { title: "Two ways to deliver", text: "Our own delivery team or a transporter, to schools in Hyderabad and other states." },
  { title: "Updates on WhatsApp", text: "When your order is confirmed, dispatched and delivered." },
  { title: "Replaced if wrong", text: "Damaged, short or wrong items are replaced. Send a photo on WhatsApp." },
];

const printing = [
  { title: "Send the details", text: "Names, classes, logo and wording for ID cards, diaries, certificates or banners." },
  { title: "Check the proof", text: "We set it out and send you a proof on WhatsApp. Ask for changes as often as you need." },
  { title: "Approve it", text: "Printing starts only after you approve the proof." },
];

const faqs: { q: string; a: React.ReactNode }[] = [
  {
    q: "Which areas do you deliver to?",
    a: "We supply schools across Hyderabad and in other states. Tell us where your school is and we will confirm delivery when we quote.",
  },
  {
    q: "How long does delivery take?",
    a: "Items in stock are delivered within a week of order confirmation. Items sourced or made to order, such as uniforms, printing and furniture, have their timeline stated in the quotation.",
  },
  {
    q: "How do we know where our order is?",
    a: "We send updates on WhatsApp when your order is confirmed, when it is dispatched and when it is delivered. You can message the same number at any time.",
  },
  {
    q: "Is there a minimum order?",
    a: (
      <>
        The minimum order is <Pending label="MIN ORDER" />.
      </>
    ),
  },
  {
    q: "How can we pay?",
    a: (
      <>
        Payment is on <Pending label="PAYMENT TERMS" />. Accepted payment modes: <Pending label="CONFIRM" />.
      </>
    ),
  },
  {
    q: "What if an item arrives damaged or wrong?",
    a: (
      <>
        Send us a photo on WhatsApp. Damaged, short or wrong items are replaced. Full details are in our{" "}
        <Pending label="RETURN POLICY" />.
      </>
    ),
  },
  {
    q: "How long does custom printing take?",
    a: (
      <>
        Printing starts once you approve the proof. Typical timelines: <Pending label="CONFIRM" />. Order early before
        the start of term.
      </>
    ),
  },
  { q: "Do you provide GST invoices?", a: "Yes. Every delivery comes with a GST invoice and a delivery challan." },
  {
    q: "We have several branches. Can you supply all of them?",
    a: "Yes. We supply school groups with several branches, and the group deals with one contact at SchoolSource.",
  },
  {
    q: "Can we reorder what we bought last year?",
    a: "Yes. We keep your past orders. Ask us to re-quote last year's list, change what you need and confirm.",
  },
  { q: "Can we send a handwritten list?", a: "Yes. Send a photo of it on WhatsApp and we will turn it into an itemised quotation." },
];


export default function HowItWorksPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ href: "/", label: "Home" }, { label: "How it works" }]}
        tone="orange"
        title="How ordering works"
        intro={<p>Send your list. We send one quote. You approve, and we deliver.</p>}
        image={{ src: "/images/cutouts/f-warehouse.webp", width: 900, height: 599, alt: "Cartons ready to ship" }}
        actions={
          <>
            <Button href="/quote" size="lg">
              Request a quote
            </Button>
            <Button href={waHref} variant="whatsapp" size="lg">
              WhatsApp us
            </Button>
          </>
        }
      />

      <Section aria-labelledby="steps-title">
        <SectionHead
          id="steps-title"
          title="Four steps."
          intro="A photo of a handwritten list is enough to start."
        />
        <BigSteps steps={orderSteps} />
      </Section>

      <Section tone="cream" aria-labelledby="delivery-title">
        <SectionHead id="delivery-title" title="Delivery, in short." intro="What happens after you approve the quote." />
        <ul className="grid gap-x-16 md:grid-cols-2">
          {facts.map((f) => (
            <li key={f.title} className="border-t-2 border-ink py-6 md:py-7">
              <h3 className="text-h3">{f.title}</h3>
              <p className="mt-2 max-w-md text-[1.0625rem] text-ink-soft sm:text-lg">{f.text}</p>
            </li>
          ))}
          {showPending ? (
            <li className="border-t-2 border-ink py-6 md:py-7">
              <h3 className="text-h3">Branches</h3>
              <p className="mt-2 max-w-md text-[1.0625rem] text-ink-soft sm:text-lg">
                Invoices and deliveries per branch: <Pending label="CONFIRM" />
              </p>
            </li>
          ) : null}
        </ul>
      </Section>

      <Section aria-labelledby="printing-title">
        <SectionHead
          id="printing-title"
          title="Nothing is printed until you approve it."
          intro="ID cards, diaries, certificates and banners carry your school's name, so you see a proof first."
        />
        <BigSteps steps={printing} />
      </Section>

      <Section tone="paper" className="pt-0" aria-labelledby="faq-title">
        <SectionHead
          id="faq-title"
          title="Questions schools ask."
          intro={
            <>
              Something else? Call{" "}
              <a href={site.phoneHref} className="link tabular font-semibold text-ink">
                {site.phoneDisplay}
              </a>{" "}
              or message us on WhatsApp.
            </>
          }
        />
        <Faq items={faqs} />
        <div className="mt-12 flex flex-wrap gap-3">
          <Button href="/quote" size="lg">
            Request a quote
          </Button>
          <Button href={waHref} variant="whatsapp" size="lg">
            WhatsApp us
          </Button>
        </div>
      </Section>
    </>
  );
}
