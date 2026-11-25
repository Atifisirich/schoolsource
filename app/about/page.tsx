import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { PencilUnderline } from "@/components/ui/PencilUnderline";
import { Photo } from "@/components/ui/Photo";
import { Placeholder } from "@/components/ui/Placeholder";
import { Eyebrow, Section } from "@/components/ui/Section";
import { Stamp } from "@/components/ui/Stamp";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "SchoolSource is the school supplies division of Arkhan Group Pvt. Ltd., Hyderabad: one organised supplier, honest pricing, on-time delivery and proper paperwork.",
};

const pillars = [
  {
    title: "One organised supplier",
    text: "Stationery, printing, labs, sports, furniture and more from one place, with one point of contact.",
  },
  {
    title: "Honest pricing",
    text: "Itemised quotations prepared for school volumes, so you can see and approve every line.",
  },
  {
    title: "On-time delivery",
    text: "Delivery dates agreed in advance and planned around term, exams and events.",
  },
  {
    title: "Proper paperwork",
    text: "A GST invoice and delivery challan with every delivery, ready for your accounts.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ href: "/", label: "Home" }, { label: "About" }]}
        title={
          <>
            A school supplier built on <PencilUnderline delay={300}>four pillars</PencilUnderline>
          </>
        }
        intro={
          <p>
            SchoolSource is the school supplies division of {site.parent}, Hyderabad. We bring the many things a
            school buys through the year to one organised supplier.
          </p>
        }
        aside={<Stamp className="hidden w-40 lg:block" rotate={-8} />}
      />

      {/* The name */}
      <Section aria-labelledby="name-title">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5" data-reveal>
            <p className="font-display text-[clamp(4rem,3rem+6vw,8rem)] leading-none text-board">arkan</p>
            <p className="mt-3 font-mono text-label uppercase text-ink-soft">
              Arabic &middot; pillars <Placeholder>[CONFIRM wording]</Placeholder>
            </p>
          </div>
          <div className="lg:col-span-7" data-reveal>
            <Eyebrow>The name</Eyebrow>
            <h2 id="name-title" className="mt-3 text-h2">Where Arkhan comes from</h2>
            <p className="mt-4 max-w-xl text-lead text-ink-soft">
              The group&apos;s name comes from &ldquo;arkan&rdquo;, the Arabic word for pillars. It describes how we
              want to work with schools: on a few dependable foundations that do not change from one order to the
              next.
            </p>
          </div>
        </div>
      </Section>

      {/* Four pillars */}
      <Section tone="white" aria-labelledby="pillars-title" className="border-y border-ink/10">
        <div data-reveal>
          <Eyebrow>Our promise to schools</Eyebrow>
          <h2 id="pillars-title" className="mt-3 text-h2">What you can rely on</h2>
        </div>
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <li key={p.title} data-reveal className="flex flex-col">
              {/* Capital */}
              <span aria-hidden="true" className="block h-2 rounded-t-sm bg-board" />
              <span aria-hidden="true" className="mx-2 block h-1.5 bg-board/70" />
              <div className="flex flex-1 flex-col border-x border-ink/15 bg-paper px-5 pb-6 pt-6">
                <span className="font-mono text-sm font-semibold text-board">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-6 text-h3 lg:min-h-[2.5em]">{p.title}</h3>
                <p className="mt-3 text-ink-soft">{p.text}</p>
              </div>
              {/* Base */}
              <span aria-hidden="true" className="mx-2 block h-1.5 bg-board/70" />
              <span aria-hidden="true" className="block h-2 rounded-b-sm bg-board" />
            </li>
          ))}
        </ol>
      </Section>

      {/* Group */}
      <Section aria-labelledby="group-title">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <Photo src="/images/photos/page-about.jpg" alt="Cartons of supplies on warehouse racks, ready for dispatch" className="aspect-[3/2] shadow-lift lg:col-span-6" data-reveal />
          <div className="lg:col-span-5 lg:col-start-8" data-reveal>
            <Eyebrow>Backed by Arkhan Group</Eyebrow>
            <h2 id="group-title" className="mt-3 text-h2">Part of {site.parent}</h2>
            <p className="mt-4 text-ink-soft">
              SchoolSource is a division of {site.parent}, based in {site.city}. Schools deal with a registered
              private limited company and receive a GST invoice for every purchase.
            </p>
            <dl className="mt-6 grid gap-3 text-[0.9375rem]">
              <div className="flex flex-wrap gap-x-3">
                <dt className="font-mono text-label uppercase text-ink-soft">Address</dt>
                <dd><Placeholder>{site.address}</Placeholder></dd>
              </div>
              <div className="flex flex-wrap gap-x-3">
                <dt className="font-mono text-label uppercase text-ink-soft">GSTIN</dt>
                <dd><Placeholder>{site.gstin}</Placeholder></dd>
              </div>
            </dl>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/quote">Request a Quote</Button>
              <Button href="/contact" variant="secondary">Contact us</Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
