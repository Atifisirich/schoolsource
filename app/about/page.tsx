import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { Photo } from "@/components/ui/Photo";
import { Section } from "@/components/ui/Section";
import { categories } from "@/data/catalogue";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `${site.name} is the school supplies division of ${site.parent}, Hyderabad, founded and led by ${site.founder}. One supplier for stationery, textbooks, uniforms, labs, furniture and more.`,
  alternates: { canonical: "/about" },
};

// Confirmed promises only (HANDOFF 2.5). Nothing here may be added without the owner.
const promises = [
  { title: "Stock held in our warehouse", text: "In-stock items are delivered within a week of your confirmation." },
  { title: "Delivered to your school", text: "By our own team or a third-party transporter, in Hyderabad and to other states." },
  { title: "Checked before dispatch", text: "Every order is checked before it is dispatched." },
  { title: "Problems put right", text: "Anything that arrives damaged, short or wrong is replaced." },
  { title: "Proof before printing", text: "ID cards, diaries and other printed items go to print only after you approve a proof." },
  { title: "Updates on WhatsApp", text: "You hear from us on WhatsApp as your order moves, and we can re-quote last year's order." },
];

const details = [
  { label: "Company", value: site.parent },
  { label: "Founder", value: site.founder },
  { label: "GSTIN", value: site.gstin },
  { label: "Address", value: site.address },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ href: "/", label: "Home" }, { label: "About" }]}
        title="A school supplier you can hand your list to"
        intro={
          <p>
            {site.name} is the school supplies division of {site.parent}, in {site.city}. It was founded and is led by{" "}
            {site.founder}.
          </p>
        }
        actions={
          <>
            <Button href="/quote">Request a quote</Button>
            <Button href={whatsappLink("Hello SchoolSource, ")} variant="whatsapp">
              WhatsApp us
            </Button>
          </>
        }
      />

      {/* Who we are, with one photo */}
      <Section aria-labelledby="who-title">
        <div className="grid items-center gap-x-16 gap-y-10 lg:grid-cols-2">
          <div>
            <h2 id="who-title" className="text-h2">
              One supplier for everything a school buys
            </h2>
            <div className="mt-6 grid max-w-[34rem] gap-4 text-lead text-ink-soft">
              <p>
                A school buys from many places through the year: stationery and textbooks before term, printing for
                admissions, trophies for annual day, furniture and lab equipment as it grows.
              </p>
              <p>
                We bring it all to one supplier, one point of contact and one set of paperwork. You send your list.
                We send back an itemised quotation. Once you approve it, we deliver with a GST invoice.
              </p>
            </div>
          </div>
          <Photo
            src="/images/photos/page-about.jpg"
            alt="Cartons of supplies on warehouse racks"
            className="aspect-[4/3] w-full rounded-xl"
            sizes="(min-width: 1024px) 560px, 100vw"
          />
        </div>
      </Section>

      {/* What we supply */}
      <Section aria-labelledby="supply-title" className="!pt-0">
        <h2 id="supply-title" className="text-h2">
          What we supply
        </h2>
        <p className="mt-4 max-w-[36rem] text-lead text-ink-soft">
          {categories.length} categories, plus textbooks, canteen and kitchen setup, and kits packed per student.
        </p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/products/${c.slug}`}
                className="flex min-h-14 items-center rounded-md border-2 border-ink/15 bg-white px-5 text-[1.0625rem] font-semibold transition-[border-color,transform] duration-150 hover:border-ink active:scale-[0.98]"
              >
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Button href="/products" variant="text">
            Browse all products
          </Button>
        </div>
      </Section>

      {/* How we work */}
      <Section tone="sky" aria-labelledby="work-title">
        <h2 id="work-title" className="text-h2">
          How we work
        </h2>
        <ul className="mt-10 grid gap-x-12 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
          {promises.map((p) => (
            <li key={p.title}>
              <h3 className="text-xl font-bold">{p.title}</h3>
              <p className="mt-2 text-[1.0625rem] text-ink-soft">{p.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Company details */}
      <Section aria-labelledby="details-title">
        <h2 id="details-title" className="text-h2">
          Company details
        </h2>
        <dl className="mt-8 max-w-[44rem] border-t-2 border-ink/15">
          {details.map((d) => (
            <div key={d.label} className="grid gap-1 border-b-2 border-ink/15 py-5 sm:grid-cols-[9rem_1fr] sm:gap-6">
              <dt className="text-[1.0625rem] text-ink-soft">{d.label}</dt>
              <dd className="break-words text-[1.1875rem] font-semibold">{d.value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href="/quote">Request a quote</Button>
          <Button href="/contact" variant="ghost">
            Contact us
          </Button>
        </div>
      </Section>
    </>
  );
}
