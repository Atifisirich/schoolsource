import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { Photo } from "@/components/ui/Photo";
import { Section } from "@/components/ui/Section";
import { bands, categories } from "@/data/catalogue";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `${site.name} is the school supplies division of ${site.parent}, Hyderabad, founded and led by ${site.founder}. One supplier for stationery, textbooks, uniforms, labs, furniture and more.`,
  alternates: { canonical: "/about" },
};

// Services beyond the catalogue categories, all confirmed by the owner (HANDOFF 2.5)
const services = [
  {
    title: "Kits packed per student",
    text: "One labelled bag per student, sorted by class, ready to hand out on the first day.",
    href: "/kits",
    image: "/images/photos/kit-new-admission-student.jpg",
    alt: "A school backpack with books",
  },
  {
    title: "School visits with samples",
    text: "We bring samples to your school so you can check products before you order.",
    href: "/contact#visit-title",
    image: "/images/photos/cat-teaching-aids.jpg",
    alt: "A classroom whiteboard with posters",
  },
];

// Confirmed promises only (HANDOFF 2.5). Nothing here may be added without the owner.
const promises = [
  {
    title: "Stock held in our warehouse",
    text: "In-stock items are delivered within a week of your confirmation.",
  },
  {
    title: "Delivered to your school",
    text: "By our own team or a third-party transporter, in Hyderabad and to other states.",
  },
  {
    title: "Checked before dispatch",
    text: "Every order is checked before it is dispatched.",
  },
  {
    title: "Problems put right",
    text: "Anything that arrives damaged, short or wrong is replaced.",
  },
  {
    title: "Proof before printing",
    text: "ID cards, diaries and other printed items go to print only after you approve a proof.",
  },
  {
    title: "Updates on WhatsApp",
    text: "You hear from us on WhatsApp as your order moves, and we can re-quote last year's order.",
  },
];

const buyers = ["Principals", "Trustees", "Administrators", "Purchase and accounts staff"];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ href: "/", label: "Home" }, { label: "About" }]}
        title="A school supplier you can hand your list to"
        intro={
          <p>
            {site.name} is the school supplies division of {site.parent}, Hyderabad. It was founded and is led by{" "}
            {site.founder}.
          </p>
        }
        aside={
          <Photo
            src="/images/photos/page-about.jpg"
            alt="Cartons of supplies on warehouse racks"
            className="aspect-[3/2] w-full rounded-lg lg:w-[30rem]"
            sizes="(min-width: 1024px) 480px, 100vw"
            priority
          />
        }
      />

      {/* Who we are */}
      <Section aria-labelledby="who-title">
        <div className="grid gap-x-16 gap-y-6 lg:grid-cols-12">
          <h2 id="who-title" className="text-h2 lg:col-span-5">
            One organised supplier for everything a school buys
          </h2>
          <div className="grid max-w-[62ch] gap-4 text-lead text-ink-soft lg:col-span-7">
            <p>
              A school buys from many places through the year: stationery and textbooks before term, printing for
              admissions, trophies for annual day, furniture and lab equipment when it grows. We bring all of it to
              one supplier, one point of contact and one set of paperwork.
            </p>
            <p>
              You send your list in whatever form it is in. We return an itemised quotation, and once you approve it,
              we deliver with a GST invoice.
            </p>
          </div>
        </div>
      </Section>

      {/* What we supply */}
      <Section tone="muted" aria-labelledby="supply-title">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <h2 id="supply-title" className="text-h2">
            What we supply
          </h2>
          <Button href="/products" variant="text">
            Browse all {categories.length} categories
          </Button>
        </div>

        <div className="mt-10 grid gap-x-10 gap-y-10 border-t border-ink/15 pt-8 md:grid-cols-3">
          {bands.map((band) => (
            <div key={band.id}>
              <h3 className="font-sans text-base font-semibold">{band.name}</h3>
              <p className="text-sm text-ink-soft">{band.note}</p>
              <ul className="mt-4 border-t border-rule">
                {categories
                  .filter((c) => c.band === band.id)
                  .map((c) => (
                    <li key={c.slug} className="border-b border-rule">
                      <Link
                        href={`/products/${c.slug}`}
                        className="group -mx-2 block min-h-11 rounded-sm px-2 py-2.5 transition-colors duration-150 hover:bg-white active:bg-rule"
                      >
                        <span className="block font-semibold transition-colors duration-150 group-hover:text-board">{c.name}</span>
                        <span className="block text-sm text-ink-soft">{c.description}</span>
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>

        <h3 className="mt-16 font-sans text-base font-semibold">Beyond the catalogue</h3>
        <ul className="mt-4 grid gap-6 md:grid-cols-2">
          {services.map((s) => (
            <li key={s.title}>
              <Link href={s.href} className="card-link grid h-full overflow-hidden sm:grid-cols-[13rem_1fr]">
                <span className="card-media aspect-[3/2] sm:aspect-auto sm:h-full">
                  <Image src={s.image} alt={s.alt} fill sizes="(min-width: 640px) 208px, 100vw" className="object-cover" />
                </span>
                <span className="block p-5 sm:p-6">
                  <span className="block text-h3 font-display font-semibold">{s.title}</span>
                  <span className="mt-2 block text-[0.9375rem] text-ink-soft">{s.text}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* How we work */}
      <Section aria-labelledby="work-title">
        <div className="grid gap-x-16 gap-y-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="work-title" className="text-h2">
              How we work
            </h2>
            <p className="mt-4 max-w-md text-ink-soft">
              The same few things hold for every order, small or large. <Link href="/how-it-works" className="link font-semibold text-ink">See how an order runs</Link>.
            </p>
          </div>
          <dl className="grid gap-x-10 sm:grid-cols-2 lg:col-span-8">
            {promises.map((p) => (
              <div key={p.title} className="border-t border-ink/15 py-5">
                <dt className="font-semibold">{p.title}</dt>
                <dd className="mt-1 text-ink-soft">{p.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {/* Who we serve: the page's one dark band */}
      <Section tone="ink" aria-labelledby="serve-title">
        <div className="grid gap-x-16 gap-y-8 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <h2 id="serve-title" className="text-h2">
              Who we serve
            </h2>
            <p className="mt-4 max-w-md text-paper/80">
              Single schools, and school groups with several branches that want one supplier across all of them.
            </p>
          </div>
          <div className="lg:col-span-7">
            <p className="text-paper/80">We work with the people who plan and approve a school&apos;s purchases:</p>
            <ul className="mt-4 grid gap-x-10 sm:grid-cols-2">
              {buyers.map((b) => (
                <li key={b} className="border-t border-paper/20 py-3.5 font-display text-h3">
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Company details */}
      <Section aria-labelledby="details-title">
        <div className="grid gap-x-16 gap-y-10 lg:grid-cols-12">
          <div className="contents lg:block lg:col-span-5">
            <h2 id="details-title" className="text-h2">
              Company details
            </h2>
            <p className="-mt-6 max-w-md text-ink-soft lg:mt-4">
              You deal with a registered private limited company. Every order is billed with a GST invoice.
            </p>
            <div className="order-last flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:mt-8">
              <Button href="/quote" size="lg">
                Request a quote
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                Contact us
              </Button>
            </div>
          </div>
          <dl className="card divide-y divide-rule self-start lg:col-span-7">
            {[
              { term: "Company", value: site.parent },
              { term: "Division", value: site.name },
              { term: "Founder", value: site.founder },
              { term: "GSTIN", value: <span className="tabular tracking-wide">{site.gstin}</span> },
              { term: "Address", value: site.address },
            ].map((row) => (
              <div key={row.term} className="grid gap-1 px-5 py-4 sm:grid-cols-[9rem_1fr] sm:gap-6 sm:px-6">
                <dt className="text-sm text-ink-soft">{row.term}</dt>
                <dd className="font-semibold">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>
    </>
  );
}
