import type { Metadata } from "next";
import { OrderJourney } from "@/components/how/OrderJourney";
import { WhatsAppIcon } from "@/components/layout/WhatsAppFloat";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { Pending, showPending } from "@/components/ui/Pending";
import { Photo } from "@/components/ui/Photo";
import { RouteSteps } from "@/components/ui/RouteSteps";
import { Section } from "@/components/ui/Section";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "From your list to your school: itemised quotation, stock from our warehouse, checks before dispatch, delivery across Hyderabad and other states, WhatsApp updates and GST invoices.",
};

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const logistics = [
  {
    title: "Stock in our warehouse",
    text: "Commonly ordered school items are held in our warehouse, so in-stock items are delivered within a week of confirmation.",
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
    text: "Every order is checked against what you approved, so what leaves us is what you ordered.",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M9 4 H15 V6.5 H9 Z" />
        <path d="M9 5 H6 V21 H18 V5 H15" />
        <path d="M9 13.5 L11 15.5 L15 11" />
      </svg>
    ),
  },
  {
    title: "Packed per student if you need it",
    text: "Student kits can be packed in one labelled bag per student, sorted by class, ready to hand out.",
    icon: (
      <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M3 7.5 L12 3 L21 7.5 V16.5 L12 21 L3 16.5 Z" />
        <path d="M3 7.5 L12 12 L21 7.5 M12 12 V21" />
      </svg>
    ),
  },
  {
    title: "Two ways to deliver",
    text: "Our in-house delivery team or a third-party transporter, to schools in Hyderabad and in other states.",
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
    text: "Items that arrive damaged, short or wrong are replaced. Send us a photo on WhatsApp and we arrange it.",
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
  { title: "We send a proof", text: "We set it out and send you a proof on WhatsApp to check." },
  { title: "You approve it", text: "Ask for changes and we send a revised proof. Printing starts only after you approve." },
  { title: "Printed and delivered", text: "Printed, checked against the approved proof and delivered with the rest of your order." },
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

function Tick() {
  return (
    <svg viewBox="0 0 16 16" className="mt-[0.3125rem] size-4 shrink-0 text-pencil" aria-hidden="true" {...stroke} strokeWidth={2}>
      <path d="M3 8.5 L6.5 12 L13 4.5" />
    </svg>
  );
}

export default function HowItWorksPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ href: "/", label: "Home" }, { label: "How it works" }]}
        title="From your list to your school, step by step"
        intro={
          <p>
            How a quotation becomes a delivery: what happens in our warehouse, how your order reaches you, and the
            updates and paperwork you get along the way.
          </p>
        }
        aside={
          <Photo
            src="/images/photos/page-about.jpg"
            alt="Aisle of a warehouse with cartons stacked on tall racks"
            className="aspect-[3/2] w-full rounded-lg lg:w-[22rem] xl:w-[30rem]"
            sizes="(min-width: 1280px) 480px, (min-width: 1024px) 352px, 100vw"
            priority
          />
        }
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
          <Button href="/quote" size="lg" className="w-full sm:w-auto">
            Request a quote
          </Button>
          <Button
            href={whatsappLink("Hello SchoolSource, we have a question about ordering and delivery.")}
            variant="text"
            icon={<WhatsAppIcon />}
            className="self-start sm:self-auto"
          >
            Ask on WhatsApp
          </Button>
        </div>
      </PageHeader>

      {/* Order journey */}
      <Section aria-labelledby="journey-title">
        <div className="grid gap-4 lg:grid-cols-12 lg:items-end lg:gap-12">
          <h2 id="journey-title" className="text-h2 lg:col-span-7">
            Follow an order from list to delivery
          </h2>
          <p className="max-w-xl text-ink-soft lg:col-span-5">
            Eight stages, two of them yours. Pick any stage to see what happens and the update you receive on
            WhatsApp.
          </p>
        </div>
        <div className="mt-12">
          <OrderJourney />
        </div>
      </Section>

      {/* Logistics */}
      <Section tone="muted" aria-labelledby="logistics-title">
        <div className="grid gap-4 lg:grid-cols-12 lg:items-end lg:gap-12">
          <h2 id="logistics-title" className="text-h2 lg:col-span-7">
            From our warehouse to your school
          </h2>
          <p className="max-w-xl text-ink-soft lg:col-span-5">
            What happens between your confirmation and the delivery at your school.
          </p>
        </div>
        <ul className="mt-12 grid gap-x-12 md:grid-cols-2">
          {logistics.map((l) => (
            <li key={l.title} className="flex gap-4 border-t border-ink/10 py-6">
              <span className="mt-0.5 shrink-0 text-board [&_svg]:size-6">{l.icon}</span>
              <div>
                <h3 className="font-sans text-[1.0625rem] font-semibold tracking-normal">{l.title}</h3>
                <p className="mt-1.5 max-w-lg text-ink-soft">{l.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* Printing proofs */}
      <Section aria-labelledby="printing-title">
        <div className="grid gap-4 lg:grid-cols-12 lg:items-end lg:gap-12">
          <h2 id="printing-title" className="text-h2 lg:col-span-7">
            Nothing is printed until you approve it
          </h2>
          <p className="max-w-xl text-ink-soft lg:col-span-5">
            ID cards, diaries, certificates, report cards and banners carry your school&apos;s name, so you see a
            proof first.
          </p>
        </div>
        <RouteSteps steps={printing} className="mt-12" />
      </Section>

      {/* School groups and repeat orders */}
      <Section tone="ink" aria-labelledby="groups-title">
        <h2 id="groups-title" className="max-w-2xl text-h2 text-white">
          Several branches, and the same order every year
        </h2>
        <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-0">
          <div className="md:pr-12">
            <h3 className="text-h3 text-white">School groups</h3>
            <p className="mt-3 max-w-md text-paper/80">
              We supply groups with several branches. Send each branch&apos;s list, or one list for the group, and
              deal with one contact at SchoolSource for all of them.
            </p>
            <ul className="mt-6 grid gap-2.5 text-paper/90">
              <li className="flex gap-3">
                <Tick />
                One contact for every branch
              </li>
              <li className="flex gap-3">
                <Tick />
                Each list quoted line by line
              </li>
              {showPending ? (
                <li className="flex gap-3">
                  <Tick />
                  <span>
                    Invoices and deliveries per branch <Pending label="CONFIRM" />
                  </span>
                </li>
              ) : null}
            </ul>
          </div>
          <div className="border-t border-paper/15 pt-10 md:border-l md:border-t-0 md:pl-12 md:pt-0">
            <h3 className="text-h3 text-white">Repeat last year&apos;s order</h3>
            <p className="mt-3 max-w-md text-paper/80">
              We keep your past orders. Ask us to re-quote last year&apos;s list, change what you need and confirm.
            </p>
            <ul className="mt-6 grid gap-2.5 text-paper/90">
              <li className="flex gap-3">
                <Tick />
                Past orders kept on file
              </li>
              <li className="flex gap-3">
                <Tick />
                Re-quoted when you ask
              </li>
              <li className="flex gap-3">
                <Tick />
                Change items or quantities before you confirm
              </li>
            </ul>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section aria-labelledby="faq-title">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <h2 id="faq-title" className="text-h2">
              Questions schools ask
            </h2>
            <p className="mt-4 max-w-sm text-ink-soft">
              Something else? Call{" "}
              <a href={site.phoneHref} className="link tabular font-semibold text-ink">
                {site.phoneDisplay}
              </a>{" "}
              or message us on WhatsApp.
            </p>
          </div>
          <div className="border-t border-rule lg:col-span-8">
            {faqs.map((f) => (
              <details key={f.q} className="group border-b border-rule">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[1.0625rem] font-semibold transition-colors duration-150 hover:text-board focus-visible:outline-offset-0 [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <svg
                    viewBox="0 0 16 16"
                    className="size-4 shrink-0 text-ink-soft transition-transform duration-200 ease-out group-open:rotate-45 group-hover:text-board"
                    aria-hidden="true"
                    {...stroke}
                    strokeWidth={1.75}
                  >
                    <path d="M8 2.5 V13.5 M2.5 8 H13.5" />
                  </svg>
                </summary>
                <p className="animate-fade-in max-w-2xl pb-6 pr-10 text-ink-soft">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </Section>

      {/* Closing */}
      <Section tone="muted" spacing="tight" aria-labelledby="hiw-cta">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="lg:col-span-7">
            <h2 id="hiw-cta" className="text-h2">
              Ready with your list?
            </h2>
            <p className="mt-3 max-w-xl text-ink-soft">
              Send it in any format, even a photo of a handwritten list. We reply with an itemised quotation.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
            <Button href="/quote" size="lg">
              Request a quote
            </Button>
            <Button
              href={whatsappLink("Hello SchoolSource, here is our school's requirement list:")}
              variant="secondary"
              size="lg"
              icon={<WhatsAppIcon />}
            >
              Send on WhatsApp
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
