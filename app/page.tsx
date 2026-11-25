import Image from "next/image";
import Link from "next/link";
import { ListToQuotation } from "@/components/home/ListToQuotation";
import { OneSourceCompare } from "@/components/home/OneSourceCompare";
import { WhatsAppIcon } from "@/components/layout/WhatsAppFloat";
import { Button } from "@/components/ui/Button";
import { CategoryTile } from "@/components/ui/CategoryTile";
import { PencilUnderline } from "@/components/ui/PencilUnderline";
import { Pending, showPending } from "@/components/ui/Pending";
import { Section } from "@/components/ui/Section";
import { bands, categoriesInBand, clientSchools, getKit, kits, type BandId, type Kit } from "@/data/catalogue";
import { cn } from "@/lib/cn";
import { site, whatsappLink } from "@/lib/site";

const listMessage = "Hello SchoolSource, here is our school’s requirement list for a quotation:";

// ---------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------

const facts = [
  { icon: "invoice", text: "GST invoice and delivery challan with every order" },
  { icon: "week", text: "In-stock items delivered within a week" },
  { icon: "map", text: "Delivery in Hyderabad and other states" },
] as const;

// Category grids per band: everyday in threes, occasions in fours, and the
// larger setup purchases with two wide photos leading.
const bandGrid: Record<BandId, { grid: string; item?: (i: number) => string; sizes: string }> = {
  everyday: { grid: "sm:grid-cols-2 lg:grid-cols-3", sizes: "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" },
  activities: { grid: "sm:grid-cols-2 lg:grid-cols-4", sizes: "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" },
  setup: {
    grid: "sm:grid-cols-2 lg:grid-cols-6",
    // The two wide tiles take a letterbox crop so the row stays in proportion
    // The last of five spans the row below lg, so no cell is left empty.
    item: (i) =>
      i < 2
        ? "lg:col-span-3 lg:[&_.card-media]:aspect-[2/1]"
        : i === 4
          ? "col-span-2 max-lg:[&_.card-media]:aspect-[2/1]"
          : "lg:col-span-2",
    sizes: "(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw",
  },
};

const steps = [
  {
    title: "Share your list",
    text: "On WhatsApp, by email or through the quote form. A photo of a handwritten list is fine.",
  },
  {
    title: "Receive an itemised quotation",
    text: "Every item on your list, line by line, for you to check and approve.",
  },
  {
    title: "Checked and delivered",
    text: "Every order is checked before dispatch. In-stock items arrive within a week of confirmation.",
  },
];

const homeKits = ["term-start-classroom", "exam-season", "new-admission-student"]
  .map((slug) => getKit(slug))
  .filter((k): k is Kit => Boolean(k));

const labs = [
  "Science labs: physics, chemistry and biology",
  "Maths labs",
  "STEM and robotics labs",
  "Tinkering labs",
];

const reasons = [
  {
    title: "One order book",
    text: "Stationery to smart classrooms on one quotation, with one contact for every follow-up.",
  },
  {
    title: "Proper GST paperwork",
    text: "A GST invoice and delivery challan with every order, ready for your accounts and audit.",
  },
  {
    title: "Delivery planned around your term",
    text: "Delivery dates are agreed with you before term starts, before exams and before school events.",
  },
  {
    title: "Samples at your school",
    text: "On request, we visit with samples so you can see and handle products before you order.",
  },
  {
    title: "Checked before dispatch",
    text: "Every order is checked before it leaves the warehouse. Damaged, short or wrong items are replaced.",
  },
  {
    title: "Part of Arkhan Group",
    text: `SchoolSource is the school supplies division of ${site.parent}, Hyderabad, founded by ${site.founder}.`,
  },
];

// ---------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------

export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <Section spacing="none" aria-labelledby="hero-title" className="border-b border-rule">
        <div className="grid gap-12 pb-12 pt-10 sm:pt-14 lg:grid-cols-12 lg:items-center lg:gap-10 lg:pb-14 lg:pt-16">
          <div className="lg:col-span-5">
            <h1
              id="hero-title"
              className="animate-rise-in font-display text-display font-semibold"
            >
              Everything your school needs, from{" "}
              <PencilUnderline delay={520} animate className="motion-reduce:[&_*]:!transition-none">
                one source
              </PencilUnderline>
              .
            </h1>
            <p
              className="animate-rise-in mt-6 max-w-[32rem] text-lead text-ink-soft"
              style={{ animationDelay: "80ms" }}
            >
              Stationery, textbooks, uniforms, lab equipment, furniture and more for schools, quoted line by line
              from your list and delivered with a GST invoice.
            </p>
            <div
              className="animate-rise-in mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
              style={{ animationDelay: "140ms" }}
            >
              <Button href="/quote" size="lg" className="w-full sm:w-auto">
                Request a quote
              </Button>
              <Button
                href={whatsappLink(listMessage)}
                variant="secondary"
                size="lg"
                icon={<WhatsAppIcon />}
                className="w-full sm:w-auto"
              >
                Send your list on WhatsApp
              </Button>
            </div>
          </div>

          <div className="lg:col-span-7 lg:pl-6">
            <ListToQuotation className="max-w-[40rem] lg:ml-auto" />
          </div>
        </div>

        <ul
          className="animate-fade-in grid gap-4 border-t border-rule py-6 sm:grid-cols-3 sm:gap-8 [animation-duration:600ms]"
          style={{ animationDelay: "220ms" }}
        >
          {facts.map((f) => (
            <li key={f.icon} className="flex items-start gap-3 text-[0.9375rem] leading-snug text-ink">
              <FactIcon name={f.icon} />
              <span>{f.text}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* 2. Categories */}
      <Section tone="muted" id="categories" aria-labelledby="categories-title">
        <div className="grid gap-4 lg:grid-cols-12 lg:items-end">
          <h2 id="categories-title" className="text-h2 lg:col-span-7">
            Fifteen categories, one order book
          </h2>
          <p className="max-w-[34rem] text-ink-soft lg:col-span-5 lg:justify-self-end">
            From the chalk and registers you buy every term to a new lab or canteen, all on one quotation.
          </p>
        </div>

        <div className="mt-12 grid gap-14 md:mt-14 md:gap-16">
          {bands.map((band) => {
            const layout = bandGrid[band.id];
            return (
              <section key={band.id} aria-labelledby={`band-${band.id}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-ink/15 pb-3">
                  <h3 id={`band-${band.id}`} className="text-h3">
                    {band.name.replace("&", "and")}
                  </h3>
                  <p className="text-sm text-ink-soft">{band.note}</p>
                </div>
                <ul
                  className={cn(
                    // Phones: a two-up contact sheet of photo and name; the line of detail returns from sm
                    "mt-6 grid grid-cols-2 gap-3 sm:gap-5 max-sm:[&_.p-5]:px-3 max-sm:[&_.p-5]:py-3 max-sm:[&_h3]:text-base max-sm:[&_p]:hidden",
                    layout.grid,
                  )}
                >
                  {categoriesInBand(band.id).map((c, i) => (
                    <li key={c.slug} className={layout.item?.(i)}>
                      <CategoryTile category={c} sizes={layout.sizes} />
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>

        <div className="mt-12">
          <Button href="/products" variant="text">
            See every product, by category
          </Button>
        </div>
      </Section>

      {/* 3. One supplier instead of many */}
      <Section aria-labelledby="compare-title">
        <div className="grid gap-4 lg:grid-cols-12 lg:items-end">
          <h2 id="compare-title" className="text-h2 lg:col-span-7">
            Six suppliers, or one
          </h2>
          <p className="max-w-[34rem] text-ink-soft lg:col-span-5 lg:justify-self-end">
            Many schools buy from a different shop for every kind of purchase. With one supplier, the quotations,
            bills and follow-up calls shrink with it.
          </p>
        </div>
        <div className="mt-10 md:mt-12">
          <OneSourceCompare />
        </div>
      </Section>

      {/* 4. How an order works */}
      <Section tone="muted" aria-labelledby="how-title">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <h2 id="how-title" className="text-h2">
            How an order works
          </h2>
          <Button href="/how-it-works" variant="text">
            Delivery, printing proofs and questions
          </Button>
        </div>

        <ol className="mt-10 grid gap-8 sm:grid-cols-2 md:mt-12 lg:grid-cols-4 lg:gap-0">
          {[
            ...steps,
            {
              title: "Pay on agreed terms",
              text: null,
            },
          ].map((step, i) => (
            <li key={step.title} className="relative border-t border-ink/20 pt-6 lg:pr-8">
              <span aria-hidden="true" className="absolute -top-[4.5px] left-0 size-2 rounded-full bg-board" />
              <p className="text-sm font-semibold text-board">Step {i + 1}</p>
              <h3 className="mt-2 font-display text-xl leading-snug">{step.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">
                {step.text ??
                  (showPending ? (
                    <>
                      Payment on <Pending label="PAYMENT TERMS" />, as set out in your quotation.
                    </>
                  ) : (
                    "Payment on the terms set out in your quotation."
                  ))}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* 5. Kits */}
      <Section aria-labelledby="kits-title">
        <div className="grid gap-4 lg:grid-cols-12 lg:items-end">
          <h2 id="kits-title" className="text-h2 lg:col-span-7">
            Ready-made lists for the busy weeks
          </h2>
          <p className="max-w-[34rem] text-ink-soft lg:col-span-5 lg:justify-self-end">
            Common orders, already listed. Start from a kit and change the quantities to suit your school.
          </p>
        </div>

        <ul className="mt-10 grid gap-5 md:mt-12 md:grid-cols-3">
          {homeKits.map((kit) => (
            <li key={kit.id}>
              <Link href="/kits" className="card-link group flex h-full flex-col overflow-hidden">
                <div className="card-media aspect-[3/2]">
                  {kit.image ? (
                    <Image
                      src={kit.image}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover"
                    />
                  ) : null}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-sm text-ink-soft">{kit.basis}</p>
                  <h3 className="mt-1 font-display text-xl leading-snug transition-colors duration-150 group-hover:text-board">
                    {kit.name}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">{kit.contents.map((c, i) => (i === 0 ? c : c.charAt(0).toLowerCase() + c.slice(1))).join(", ")}.</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <Button href="/kits" variant="text">
            See all {kits.length === 7 ? "seven" : kits.length} kits, and per-student packing
          </Button>
        </div>
      </Section>

      {/* 6. Labs: the one dark band */}
      <Section tone="ink" aria-labelledby="labs-title">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
          <figure className="relative aspect-[3/2] overflow-hidden rounded-lg bg-paper/5 lg:col-span-6">
            <Image
              src="/images/photos/page-home-labs.jpg"
              alt="A small robot kit with wheels, sensors and a microcontroller board"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </figure>
          <div className="lg:col-span-6">
            <h2 id="labs-title" className="text-h2 text-white">
              Complete labs, planned and set up for your school
            </h2>
            <p className="mt-5 max-w-[34rem] text-paper/80">
              For a new lab we plan the layout with you, then supply and install the equipment as one project.
            </p>
            <ul className="mt-6 border-t border-paper/15">
              {labs.map((line) => (
                <li key={line} className="border-b border-paper/15 py-2.5 text-paper">
                  {line}
                </li>
              ))}
              <li className="border-b border-paper/15 py-2.5 text-paper">
                CBSE Composite Skill Lab {showPending ? <Pending label="CONFIRM" /> : null}
              </li>
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/labs" variant="accent" size="lg" className="w-full sm:w-auto">
                See lab setups
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* 7. Why schools use us */}
      <Section aria-labelledby="why-title">
        <h2 id="why-title" className="max-w-[40rem] text-h2">
          Why schools buy from us
        </h2>
        <ul className="mt-10 grid gap-x-12 md:mt-12 md:grid-cols-2">
          {reasons.map((r) => (
            <li key={r.title} className="border-t border-rule py-6">
              <h3 className="font-sans text-lg font-semibold leading-snug">{r.title}</h3>
              <p className="mt-1.5 max-w-[34rem] text-ink-soft">{r.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Schools we supply: hidden until real schools are listed in data/catalogue.ts */}
      {clientSchools.length > 0 ? (
        <Section tone="paper" spacing="tight" aria-labelledby="schools-title" className="border-t border-rule">
          <h2 id="schools-title" className="text-h2">
            Schools we supply
          </h2>
          <ul className="mt-8 grid gap-px overflow-hidden rounded-md border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
            {clientSchools.map((school) => (
              <li key={school.name} className="bg-white p-5">
                <p className="font-semibold">{school.name}</p>
                {school.area ? <p className="text-sm text-ink-soft">{school.area}</p> : null}
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {/* 8. Closing */}
      <Section tone="muted" aria-labelledby="cta-title">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <h2 id="cta-title" className="text-h2">
              Send us this term&rsquo;s list
            </h2>
            <p className="mt-4 max-w-[34rem] text-lead text-ink-soft">
              Typed, photographed or handwritten. We reply with an itemised quotation.
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Button href={whatsappLink(listMessage)} size="lg" icon={<WhatsAppIcon />} className="w-full sm:w-auto">
                Send your list on WhatsApp
              </Button>
              <Button href="/quote" variant="secondary" size="lg" className="w-full sm:w-auto">
                Request a quote
              </Button>
            </div>
            <p className="mt-4 text-sm text-ink-soft lg:text-right">
              Or call{" "}
              <a href={site.phoneHref} className="link tabular whitespace-nowrap text-ink">
                {site.phoneDisplay}
              </a>{" "}
              or email{" "}
              <a href={site.emailHref} className="link text-ink">
                {site.email}
              </a>
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}

// Small line icons for the hero's fact row, drawn on the category icon grid
function FactIcon({ name }: { name: (typeof facts)[number]["icon"] }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="mt-px size-5 shrink-0 text-board"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {name === "invoice" ? (
        <>
          <path d="M6 3 H15 L19 7 V21 H6 Z" />
          <path d="M15 3 V7 H19" />
          <path d="M9 11 H16 M9 14.5 H16 M9 18 H13" />
        </>
      ) : name === "week" ? (
        <>
          <rect x="3.5" y="5" width="17" height="15.5" rx="1.5" />
          <path d="M3.5 9.5 H20.5 M8 3 V6.5 M16 3 V6.5" />
          <path d="M8.5 15 L11 17.2 L15.5 12.5" />
        </>
      ) : (
        <>
          <path d="M12 21 C12 21 5.5 14.6 5.5 9.8 A6.5 6.5 0 0 1 18.5 9.8 C18.5 14.6 12 21 12 21 Z" />
          <circle cx="12" cy="9.8" r="2.3" />
        </>
      )}
    </svg>
  );
}
