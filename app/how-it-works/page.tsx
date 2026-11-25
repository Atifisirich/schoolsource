import type { Metadata } from "next";
import { OrderJourney } from "@/components/how/OrderJourney";
import { WhatsAppIcon } from "@/components/layout/WhatsAppFloat";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { PencilUnderline } from "@/components/ui/PencilUnderline";
import { withPlaceholders } from "@/components/ui/Placeholder";
import { RouteSteps } from "@/components/ui/RouteSteps";
import { Eyebrow, Section } from "@/components/ui/Section";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "From your list to your school: itemised quotation, stock from our warehouse, checks before dispatch, delivery across Hyderabad and other states, WhatsApp updates and GST invoices.",
};

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const facts = [
  {
    value: "Within a week",
    label: "for items in stock, from order confirmation",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <rect x="3.5" y="5" width="17" height="15" rx="2" />
        <path d="M3.5 10 H20.5 M8 3 V7 M16 3 V7 M8 14 H11" />
      </svg>
    ),
  },
  {
    value: "Hyderabad and other states",
    label: "schools supplied across the city and beyond",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M12 21 C12 21 5 14.5 5 9.5 A7 7 0 0 1 19 9.5 C19 14.5 12 21 12 21 Z" />
        <circle cx="12" cy="9.5" r="2.5" />
      </svg>
    ),
  },
  {
    value: "Every order checked",
    label: "counted against your order before dispatch",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M9 4 H15 V6.5 H9 Z" />
        <path d="M9 5 H6 V21 H18 V5 H15" />
        <path d="M9 13.5 L11 15.5 L15 11" />
      </svg>
    ),
  },
  {
    value: "WhatsApp updates",
    label: "when your order is confirmed, dispatched and delivered",
    icon: <WhatsAppIcon />,
  },
];

const logistics = [
  {
    title: "Stock in our warehouse",
    text: "Commonly ordered school items are held in our warehouse, so in-stock orders can go out within a week.",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M3 9 L12 4 L21 9 V20 H3 Z" />
        <path d="M7 20 V13 H17 V20 M7 16.5 H17" />
      </svg>
    ),
  },
  {
    title: "Sourced for your order",
    text: "Items we do not stock, and items made to your specification, are sourced for your order and quoted with a timeline.",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <circle cx="11" cy="11" r="6.5" />
        <path d="M16 16 L20.5 20.5" />
      </svg>
    ),
  },
  {
    title: "Checked before dispatch",
    text: "Every order is counted and checked against what you approved, so what leaves us is what you ordered.",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M9 4 H15 V6.5 H9 Z" />
        <path d="M9 5 H6 V21 H18 V5 H15" />
        <path d="M9 13.5 L11 15.5 L15 11" />
      </svg>
    ),
  },
  {
    title: "Packed for your school",
    text: "Kits packed per classroom or per student and labelled by class, ready to hand out when they arrive.",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M3 7.5 L12 3 L21 7.5 V16.5 L12 21 L3 16.5 Z" />
        <path d="M3 7.5 L12 12 L21 7.5 M12 12 V21" />
      </svg>
    ),
  },
  {
    title: "Two ways to deliver",
    text: "Our in-house delivery team, or a trusted transport partner, chosen for the size of the order and where your school is.",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M2 6 H14 V16 H2 Z" />
        <path d="M14 9 H18.5 L22 12.5 V16 H14" />
        <circle cx="6" cy="17.5" r="1.8" />
        <circle cx="17.5" cy="17.5" r="1.8" />
      </svg>
    ),
  },
  {
    title: "Replaced if anything is wrong",
    text: "Items that arrive damaged, short or wrong are replaced. Tell us on WhatsApp with a photo and we arrange it.",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M20 12 A8 8 0 1 1 17.7 6.3" />
        <path d="M20 4 V8 H16" />
      </svg>
    ),
  },
];

const printing = [
  { title: "Send the details", text: "Names, classes, logo and wording for ID cards, diaries, certificates or banners." },
  { title: "Proof on WhatsApp", text: "We design it and send you a proof to check before anything is printed." },
  { title: "You approve", text: "Ask for changes as often as you need. Printing starts only after your approval." },
  { title: "Printed and delivered", text: "Printed, checked against the approved proof and delivered with the rest of your order." },
];

const faqs = [
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
  { q: "Is there a minimum order?", a: "The minimum order is [MIN ORDER]." },
  { q: "How can we pay?", a: "Payment is on [PAYMENT TERMS]. Accepted payment modes: [CONFIRM]." },
  {
    q: "What if an item arrives damaged or wrong?",
    a: "Send us a photo on WhatsApp. Damaged, short or wrong items are replaced. Full details are in our [RETURN POLICY].",
  },
  {
    q: "How long does custom printing take?",
    a: "Printing starts once you approve the proof. Typical timelines: [CONFIRM]. Order early before the start of term.",
  },
  { q: "Do you provide GST invoices?", a: "Yes. Every delivery comes with a GST invoice and a delivery challan." },
  {
    q: "We have several branches. Can you supply all of them?",
    a: "Yes. Each branch can have its own delivery and its own invoice, while the group deals with one contact at SchoolSource.",
  },
  {
    q: "Can we reorder what we bought last year?",
    a: "Yes. We keep your past orders. Ask us to re-quote last year's list, change what you need and confirm.",
  },
  { q: "Can we send a handwritten list?", a: "Yes. Send a photo of it on WhatsApp. We will turn it into an itemised quotation." },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ href: "/", label: "Home" }, { label: "How It Works" }]}
        title={
          <>
            From your list to your school, <PencilUnderline delay={300}>step by step</PencilUnderline>
          </>
        }
        intro={
          <p>
            How a quotation becomes a delivery: what happens in our warehouse, how your order reaches you, and the
            updates and paperwork you get along the way.
          </p>
        }
        aside={
          <div className="flex flex-col items-start gap-3 lg:items-end">
            <Button href="/quote" size="lg">Request a Quote</Button>
            <Button href={whatsappLink("Hello SchoolSource, we have a question about ordering and delivery.")} variant="secondary" icon={<WhatsAppIcon />}>
              Ask on WhatsApp
            </Button>
          </div>
        }
      />

      {/* Key facts */}
      <Container className="relative z-10 -mt-8">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((f) => (
            <li key={f.value} data-reveal className="flex items-start gap-4 rounded-md border border-ink/10 bg-white p-5 shadow-card">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-sm bg-board text-white shadow-button [&_svg]:size-6">
                {f.icon}
              </span>
              <span>
                <span className="block font-display text-xl leading-tight text-ink">{f.value}</span>
                <span className="mt-1 block text-sm text-ink-soft">{f.label}</span>
              </span>
            </li>
          ))}
        </ul>
      </Container>

      {/* Order journey */}
      <Section aria-labelledby="journey-title">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end" data-reveal>
          <div className="lg:col-span-7">
            <Eyebrow>The order journey</Eyebrow>
            <h2 id="journey-title" className="mt-3 text-h2">Follow an order from list to delivery</h2>
          </div>
          <p className="text-ink-soft lg:col-span-5">
            Eight stages, two of them yours. Pick any stage to see what happens and the update you receive.
          </p>
        </div>
        <div className="mt-12" data-reveal>
          <OrderJourney />
        </div>
      </Section>

      {/* Logistics */}
      <Section tone="white" aria-labelledby="logistics-title" className="border-y border-ink/10">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end" data-reveal>
          <div className="lg:col-span-7">
            <Eyebrow>Logistics</Eyebrow>
            <h2 id="logistics-title" className="mt-3 text-h2">From our warehouse to your school</h2>
          </div>
          <p className="text-ink-soft lg:col-span-5">
            What happens between your confirmation and the delivery at your gate.
          </p>
        </div>
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {logistics.map((l, i) => (
            <li
              key={l.title}
              data-reveal
              className="group relative overflow-hidden rounded-md border border-ink/10 bg-paper p-6 shadow-card transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-board/40 hover:shadow-lift"
            >
              <span aria-hidden="true" className="absolute right-4 top-3 font-display text-[3.5rem] leading-none text-board/10">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex size-12 items-center justify-center rounded-md bg-white text-board shadow-card transition-transform duration-300 group-hover:-rotate-6 [&_svg]:size-7">
                {l.icon}
              </span>
              <h3 className="mt-5 font-sans text-lg font-semibold">{l.title}</h3>
              <p className="mt-2 text-ink-soft">{l.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Printing proofs */}
      <Section aria-labelledby="printing-title">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end" data-reveal>
          <div className="lg:col-span-7">
            <Eyebrow>Printed items</Eyebrow>
            <h2 id="printing-title" className="mt-3 text-h2">Nothing is printed until you approve it</h2>
          </div>
          <p className="text-ink-soft lg:col-span-5">
            ID cards, diaries, certificates, report cards and banners carry your school&apos;s name, so you see a
            proof first.
          </p>
        </div>
        <RouteSteps steps={printing} className="mt-12" />
      </Section>

      {/* School groups and repeat orders */}
      <Section tone="ink" aria-labelledby="groups-title">
        <div data-reveal>
          <Eyebrow>For school groups</Eyebrow>
          <h2 id="groups-title" className="mt-3 max-w-2xl text-h2 text-white">Several branches, and the same order every year</h2>
        </div>
        <ul className="mt-12 grid gap-4 md:grid-cols-2">
          {[
            {
              title: "Multi-branch schools",
              text: "Each branch gets its own delivery and its own GST invoice, while the group deals with one contact at SchoolSource.",
              points: ["Delivery to each branch", "Separate invoices per branch", "One contact for the group"],
            },
            {
              title: "Repeat last year's order",
              text: "We keep your past orders. Ask us to re-quote last year's list, change what you need and confirm.",
              points: ["Past orders kept on file", "Re-quoted at current rates", "Change items or quantities first"],
            },
          ].map((c) => (
            <li key={c.title} data-reveal className="rounded-md border border-paper/15 bg-white/[0.04] p-6 sm:p-8">
              <h3 className="font-display text-h3 text-white">{c.title}</h3>
              <p className="mt-3 text-paper/80">{c.text}</p>
              <ul className="mt-5 grid gap-2">
                {c.points.map((p) => (
                  <li key={p} className="flex gap-3 text-paper/90">
                    <span aria-hidden="true" className="font-semibold text-pencil">&#10003;</span>
                    {p}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Section>

      {/* FAQ */}
      <Section tone="white" aria-labelledby="faq-title" className="border-b border-ink/10">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4" data-reveal>
            <Eyebrow>Questions</Eyebrow>
            <h2 id="faq-title" className="mt-3 text-h2">Frequently asked</h2>
            <p className="mt-4 text-ink-soft">
              Something else?{" "}
              <a href={site.phoneHref} className="font-semibold text-ink underline decoration-rule underline-offset-4 hover:decoration-board">
                Call {site.phoneDisplay}
              </a>{" "}
              or message us on WhatsApp.
            </p>
          </div>
          <div className="grid gap-3 lg:col-span-8">
            {faqs.map((f) => (
              <details
                key={f.q}
                data-reveal
                className="group rounded-md border border-ink/10 bg-white px-5 shadow-card transition-colors open:border-board/40"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4 text-[1.0625rem] font-semibold [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span
                    aria-hidden="true"
                    className="relative flex size-8 shrink-0 items-center justify-center rounded-full bg-board/10 before:absolute before:h-0.5 before:w-3.5 before:bg-board after:absolute after:h-3.5 after:w-0.5 after:bg-board after:transition-transform after:duration-200 group-open:after:scale-y-0"
                  />
                </summary>
                <p className="max-w-2xl pb-5 text-ink-soft">{withPlaceholders(f.a)}</p>
              </details>
            ))}
          </div>
        </div>
      </Section>

      <section aria-labelledby="hiw-cta" className="on-dark bg-board py-14 lg:py-16">
        <Container className="grid gap-6 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7" data-reveal>
            <h2 id="hiw-cta" className="text-h2 text-white">Ready with your list?</h2>
            <p className="mt-3 max-w-xl text-paper/90">Send it now. Step one takes a minute.</p>
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end" data-reveal>
            <Button href="/quote" variant="accent">Request a Quote</Button>
            <Button
              href={whatsappLink("Hello SchoolSource, here is our school's requirement list:")}
              variant="inverse"
              icon={<WhatsAppIcon />}
            >
              Send on WhatsApp
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
