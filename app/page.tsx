import Link from "next/link";
import { CategoryExplorer, type ExplorerCategory } from "@/components/home/CategoryExplorer";
import { ListToQuotation } from "@/components/home/ListToQuotation";
import { OneSourceCompare } from "@/components/home/OneSourceCompare";
import { WhatsAppIcon } from "@/components/layout/WhatsAppFloat";
import { AddToQuoteButton } from "@/components/quote/AddToQuoteButton";
import { QuickQuoteForm } from "@/components/quote/QuickQuoteForm";
import { Button } from "@/components/ui/Button";
import { IndexTab } from "@/components/ui/IndexTab";
import { PencilUnderline } from "@/components/ui/PencilUnderline";
import { Photo } from "@/components/ui/Photo";
import { Placeholder } from "@/components/ui/Placeholder";
import { RouteSteps } from "@/components/ui/RouteSteps";
import { Eyebrow, Section } from "@/components/ui/Section";
import { Stamp } from "@/components/ui/Stamp";
import { bands, categories, clientSchools, countItems, featuredKits, kits } from "@/data/catalogue";
import { site, whatsappLink } from "@/lib/site";

const listMessage = "Hello SchoolSource, here is our school's requirement list for a quotation:";
const listEmail = `${site.emailHref}?subject=${encodeURIComponent("Requirement list for quotation")}`;

// Only what the category index needs, so the full catalogue isn't sent to the browser
const explorerCategories: ExplorerCategory[] = categories.map((c) => ({
  number: c.number,
  slug: c.slug,
  name: c.name,
  description: c.description,
  band: c.band,
  itemCount: countItems(c),
  image: c.image,
  subcategories: c.subcategories.map((s) => ({ slug: s.slug, name: s.name, count: s.items.length })),
}));

const reasons = [
  {
    title: "One supplier for every purchase",
    text: "Stationery to smart classrooms on one order book, with one point of contact and one set of paperwork.",
  },
  {
    title: "Bulk pricing for schools",
    text: "Quotations are prepared for school volumes, line by line, so you can compare and approve each item.",
  },
  {
    title: "GST invoices and clear billing",
    text: "Every delivery comes with a GST invoice and delivery challan, ready for your accounts and audit.",
  },
  {
    title: "Scheduled delivery before term",
    text: "We agree delivery dates with you and plan around the start of term, exams and school events.",
  },
  {
    title: "Samples at your school",
    text: "On request, we visit with samples of the products you are considering, so you can check them before you order.",
  },
  {
    title: "Backed by Arkhan Group",
    text: "SchoolSource is the school supplies division of Arkhan Group Pvt. Ltd., Hyderabad.",
  },
];

const steps = [
  {
    title: "Share your list",
    text: "On WhatsApp, by email or through the quote form. Any format, even a photo of a handwritten list.",
  },
  { title: "Receive a quotation", text: "An itemised quotation, line by line, for you to review and approve." },
  {
    title: "Checked and delivered",
    text: "Checked before dispatch and delivered with a GST invoice. In-stock items arrive within a week.",
  },
  { title: "Pay on agreed terms", text: "Payment on [PAYMENT TERMS]." },
];

export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <Section spacing="none" className="hero-glow overflow-hidden pb-24 pt-10 sm:pt-14 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="lg:col-span-5">
            <Eyebrow className="animate-rise-in">School supplies &middot; Hyderabad</Eyebrow>
            <h1 className="animate-rise-in mt-5 font-display text-[clamp(2.5rem,1.7rem+3.4vw,4.25rem)] leading-[1.04] tracking-[-0.015em]" style={{ animationDelay: "60ms" }}>
              Everything your school needs, from <PencilUnderline delay={200}>one source</PencilUnderline>.
            </h1>
            <p className="animate-rise-in mt-6 max-w-[34rem] text-lead text-ink-soft" style={{ animationDelay: "140ms" }}>
              Stationery, printing, labs, sports, furniture and more&nbsp;&ndash; supplied to schools with GST invoices
              and scheduled delivery.
            </p>
            <div className="animate-rise-in mt-8 flex flex-wrap gap-3" style={{ animationDelay: "220ms" }}>
              <Button href="/quote" size="lg">Request a Quote</Button>
              <Button href="#categories" variant="secondary" size="lg">Browse Categories</Button>
            </div>
          </div>
          <div className="animate-rise-in lg:col-span-7" style={{ animationDelay: "280ms" }}>
            <ListToQuotation className="mx-auto max-w-[40rem] lg:ml-auto lg:mr-0" />
          </div>
        </div>
      </Section>

      {/* 2. Send us your list */}
      <Section tone="board" spacing="none" aria-labelledby="send-list-title" className="py-10 md:py-12">
        <div className="grid gap-6 md:grid-cols-12 md:items-center" data-reveal>
          <div className="md:col-span-7">
            <h2 id="send-list-title" className="text-h3 text-white">Send us your list</h2>
            <p className="mt-2 max-w-xl text-paper/90">
              Share your requirement list on WhatsApp or by email. We return an itemised quotation.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:col-span-5 md:justify-end">
            <Button href={whatsappLink(listMessage)} variant="accent" icon={<WhatsAppIcon />}>
              Send on WhatsApp
            </Button>
            <Button href={listEmail} variant="inverse">
              Email {site.email}
            </Button>
          </div>
        </div>
      </Section>

      {/* 3. Categories */}
      <Section id="categories" aria-labelledby="categories-title">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end" data-reveal>
          <div className="lg:col-span-8">
            <Eyebrow>Categories</Eyebrow>
            <h2 id="categories-title" className="mt-3 text-h2">
              Everything a school buys, in <PencilUnderline variant={1}>fifteen categories</PencilUnderline>
            </h2>
          </div>
          <p className="text-ink-soft lg:col-span-4">
            Grouped by how often schools buy them. Choose a category to see what is inside.
          </p>
        </div>

        <div className="mt-12">
          <CategoryExplorer bands={bands} categories={explorerCategories} />
        </div>

        <div className="mt-12">
          <Button href="/products" variant="text">See every product, by category</Button>
        </div>
      </Section>

      {/* 4. One source instead of many */}
      <Section tone="white" aria-labelledby="compare-title" className="border-y border-ink/10">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end" data-reveal>
          <div className="lg:col-span-7">
            <Eyebrow>One source</Eyebrow>
            <h2 id="compare-title" className="mt-3 text-h2">
              Six suppliers, or <PencilUnderline variant={1}>one</PencilUnderline>
            </h2>
          </div>
          <p className="text-ink-soft lg:col-span-5">
            Many schools buy from a different shop for every kind of purchase. Bring it to one supplier and the
            follow-up shrinks with it.
          </p>
        </div>
        <div className="mt-12" data-reveal>
          <OneSourceCompare />
        </div>
      </Section>

      {/* 5. Why SchoolSource */}
      <Section aria-labelledby="why-title">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="relative lg:col-span-5" data-reveal>
            <Eyebrow>Why SchoolSource</Eyebrow>
            <h2 id="why-title" className="mt-3 max-w-md text-h2">
              One organised supplier, <PencilUnderline variant={2}>honest paperwork</PencilUnderline>
            </h2>
            <p className="mt-5 max-w-md text-ink-soft">
              Bring your school&apos;s purchases to one supplier, with a clear quotation and proper billing for every
              order.
            </p>
            <Stamp
              className="mt-10 hidden w-36 lg:block"
              rotate={-7}
              centre="GST"
              text={"GST INVOICE · DELIVERY CHALLAN · SCHOOLSOURCE ·"}
              tone="ink"
            />
          </div>
          <ol className="lg:col-span-7">
            {reasons.map((r, i) => (
              <li key={r.title} data-reveal className="grid grid-cols-[3rem_1fr] gap-x-4 border-b border-rule py-6 first:pt-0 sm:grid-cols-[4rem_1fr]">
                <span className="pt-1 font-mono text-[0.8125rem] font-semibold text-board">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-sans text-lg font-semibold">{r.title}</h3>
                  <p className="mt-1.5 text-ink-soft">{r.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* 6. How it works */}
      <Section tone="white" aria-labelledby="how-title" className="border-y border-ink/10">
        <div>
          <div className="flex flex-wrap items-end justify-between gap-4" data-reveal>
            <div>
              <Eyebrow>How it works</Eyebrow>
              <h2 id="how-title" className="mt-3 text-h2">From your list to your school, in four steps</h2>
            </div>
            <Button href="/how-it-works" variant="text">Read the details and FAQ</Button>
          </div>

          <RouteSteps steps={steps} className="mt-12" />
        </div>
      </Section>

      {/* 7. Featured school kits */}
      <Section aria-labelledby="kits-title">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4" data-reveal>
            <Eyebrow>School kits</Eyebrow>
            <h2 id="kits-title" className="mt-3 text-h2">Ready-made lists for the busy weeks</h2>
            <p className="mt-5 text-ink-soft">
              Common orders, already listed. Add a kit to your quote list and adjust quantities for your school.
            </p>
            <div className="mt-6">
              <Button href="/kits" variant="secondary">See all {kits.length} kits</Button>
            </div>
            <ul className="mt-8 grid gap-4 border-t border-rule pt-6">
              {[
                { href: "/kits#per-student", title: "Per-student kits", text: "Books, stationery and uniform in one labelled bag per student.", dot: "bg-pencil" },
                { href: "/kits#calendar", title: "Buying calendar", text: "What schools usually order in each month of the year.", dot: "bg-board" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="group flex items-start gap-3">
                    <span aria-hidden="true" className={`mt-2 size-2 shrink-0 rounded-full ${l.dot}`} />
                    <span>
                      <span className="font-semibold underline decoration-rule underline-offset-4 group-hover:decoration-board">
                        {l.title}
                      </span>
                      <span className="mt-0.5 block text-sm text-ink-soft">{l.text}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <ul className="grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:col-span-8">
            {featuredKits.map((kit) => {
              const number = kits.indexOf(kit) + 1;
              return (
                <li key={kit.id} data-reveal className="relative flex flex-col pt-7">
                  <IndexTab tone="white" className="absolute left-5 top-0.5 border-x border-t border-ink/15">
                    Kit {String(number).padStart(2, "0")}
                  </IndexTab>
                  <div className="flex flex-1 flex-col rounded-sm border border-ink/10 bg-white shadow-card p-5 pt-6">
                    {kit.image ? (
                      <Photo src={kit.image} alt="" className="-mx-5 -mt-6 mb-5 aspect-[3/2] rounded-none rounded-t-md" sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" />
                    ) : null}
                    <h3 className="text-h3">{kit.name}</h3>
                    <p className="mt-1 font-mono text-label uppercase text-ink-soft">{kit.basis}</p>
                    <p className="mt-3 text-[0.9375rem] text-ink-soft">For {kit.audience.charAt(0).toLowerCase() + kit.audience.slice(1)}.</p>
                    <ul className="mt-4 grid gap-1.5 border-t border-rule pt-4 text-[0.9375rem]">
                      {kit.contents.map((line) => (
                        <li key={line} className="flex gap-2.5">
                          <span aria-hidden="true" className="font-semibold text-red">&#10003;</span>
                          {line}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto pt-6">
                      <AddToQuoteButton
                        item={{ id: kit.id, name: kit.name, category: "School kits" }}
                        label="Get this kit quoted"
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </Section>

      {/* 7. Labs & STEM setups */}
      <Section tone="ink" aria-labelledby="labs-title">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <Photo
            src="/images/photos/page-home-labs.jpg"
            alt="A small robot kit with wheels, sensors and a microcontroller board"
            className="aspect-[3/2] lg:col-span-6"
            data-reveal
          />
          <div className="lg:col-span-5 lg:col-start-8" data-reveal>
            <Eyebrow>Labs &amp; STEM setups</Eyebrow>
            <h2 id="labs-title" className="mt-3 text-h2 text-white">Complete labs, planned and set up for your school</h2>
            <p className="mt-5 text-paper/85">
              We source the equipment, plan the layout and handle installation, so a new lab is ready as one project.
            </p>
            <ul className="mt-6 grid gap-2 text-paper">
              {[
                "Science labs: physics, chemistry and biology",
                "Maths labs",
                "STEM and robotics labs",
                "CBSE Composite Skill Lab",
                "Tinkering labs",
              ].map((line) => (
                <li key={line} className="flex gap-3 border-b border-paper/12 pb-2">
                  <span aria-hidden="true" className="text-pencil">&#10003;</span>
                  <span>
                    {line}
                    {line.startsWith("CBSE") ? <> <Placeholder>[CONFIRM]</Placeholder></> : null}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/labs" variant="accent">See lab setups</Button>
              <Button href="/quote?topic=lab" variant="inverse">Request a lab consultation</Button>
            </div>
          </div>
        </div>
      </Section>

      {/* 8. Schools we supply - hidden until real schools are listed in data/catalogue.ts */}
      {clientSchools.length > 0 ? (
        <Section aria-labelledby="schools-title" spacing="tight">
          <Eyebrow>Schools we supply</Eyebrow>
          <h2 id="schools-title" className="mt-3 text-h2">Schools we supply</h2>
          <ul className="mt-8 grid gap-px overflow-hidden rounded-sm border border-ink/15 bg-ink/15 sm:grid-cols-2 lg:grid-cols-4">
            {clientSchools.map((school) => (
              <li key={school.name} className="bg-white p-5">
                <p className="font-semibold">{school.name}</p>
                {school.area ? <p className="text-sm text-ink-soft">{school.area}</p> : null}
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {/* 9. Final call to action */}
      <Section aria-labelledby="cta-title" id="send-list">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5" data-reveal>
            <Eyebrow>Request a quotation</Eyebrow>
            <h2 id="cta-title" className="mt-3 text-h2">
              Send us your list. We&apos;ll send back a <PencilUnderline variant={2}>quotation</PencilUnderline>.
            </h2>
            <dl className="mt-8 grid gap-4">
              <div>
                <dt className="font-mono text-label uppercase text-ink-soft">WhatsApp</dt>
                <dd className="mt-1">
                  <a href={whatsappLink(listMessage)} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold underline decoration-rule decoration-2 underline-offset-4 hover:decoration-board">
                    {site.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-mono text-label uppercase text-ink-soft">Call</dt>
                <dd className="mt-1">
                  <a href={site.phoneHref} className="text-lg font-semibold underline decoration-rule decoration-2 underline-offset-4 hover:decoration-board">
                    {site.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-mono text-label uppercase text-ink-soft">Email</dt>
                <dd className="mt-1">
                  <a href={listEmail} className="text-lg font-semibold underline decoration-rule decoration-2 underline-offset-4 hover:decoration-board">
                    {site.email}
                  </a>
                </dd>
              </div>
            </dl>
            <p className="mt-8 text-sm text-ink-soft">
              Need more detail, a file upload or your quote list?{" "}
              <Link href="/quote" className="font-semibold text-ink underline decoration-rule underline-offset-4 hover:decoration-board">
                Use the full quote form
              </Link>
              .
            </p>
          </div>
          <div className="lg:col-span-7" data-reveal>
            <QuickQuoteForm />
          </div>
        </div>
      </Section>
    </>
  );
}
