import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BuyingCalendar, type CalendarMonthView } from "@/components/kits/BuyingCalendar";
import { KitCard } from "@/components/kits/KitCard";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, SectionHead } from "@/components/ui/Section";
import { calendar } from "@/data/calendar";
import { getCategory, getKit, kits } from "@/data/catalogue";
import { cutouts } from "@/lib/category-art";
import { whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "School Kits",
  description:
    "Ready-made supply lists for term start, exams, admissions, annual day, housekeeping and Teachers' Day, kits packed per student, and a month-by-month buying calendar.",
};

const months: CalendarMonthView[] = calendar.map((m) => ({
  ...m,
  categories: m.categories.flatMap((slug) => {
    const c = getCategory(slug);
    return c ? [{ slug, name: c.name }] : [];
  }),
  kits: m.kits.flatMap((slug) => {
    const k = getKit(slug);
    return k ? [{ id: k.id, slug, name: k.name, basis: k.basis }] : [];
  }),
}));

const packingSteps = [
  { title: "Send the class lists", text: "Students in each class and section, with uniform and shoe sizes." },
  { title: "Agree each class's set", text: "Books, notebooks, stationery and uniform, quoted line by line." },
  { title: "We pack one bag per student", text: "Each student's set goes in one bag, with their name on it." },
  { title: "Delivered sorted by class", text: "The bags arrive grouped by class, ready to hand out." },
];

const bagContents = [
  { slug: "textbooks", label: "Textbooks and workbooks" },
  { slug: "stationery", label: "Notebooks and stationery" },
  { slug: "uniforms-bags", label: "Uniform, shoes and school bag" },
  { slug: "printing-id-cards", label: "ID card and school diary" },
];

export default function KitsPage() {
  return (
    <>
      <PageHeader
        tone="sky"
        crumbs={[{ href: "/", label: "Home" }, { label: "Kits" }]}
        title="Ready-made school kits."
        intro={
          <p>
            Common orders, already listed. Add a kit to your quote, then change the items and quantities for your
            school before you send it.
          </p>
        }
        image={cutouts.lunchbox}
        actions={
          <>
            <Button href="/quote" size="lg">
              Request a quote
            </Button>
            <Button href={whatsappLink("Hello SchoolSource, we would like a kit quoted:")} variant="whatsapp" size="lg">
              WhatsApp us
            </Button>
          </>
        }
      />

      {/* The seven kits */}
      <Section spacing="none" aria-labelledby="kits-title" className="pb-section">
        <SectionHead
          id="kits-title"
          title="Seven kits for the busy weeks."
          intro="Pick the kit that matches the job. Each one is a starting list, not a fixed box."
        />
        <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {kits.map((kit) => (
            <li key={kit.id} id={kit.slug} className="scroll-mt-28">
              <KitCard kit={kit} />
            </li>
          ))}
          <li>
            <article
              aria-labelledby="custom-kit"
              className="flex h-full flex-col rounded-xl border-2 border-dashed border-ink/30 p-6 sm:p-7"
            >
              <h3 id="custom-kit" className="text-h3">
                Need a different mix?
              </h3>
              <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-soft">
                Send us your own list for a classroom, an event or a new wing. We put it together as a kit and quote
                it line by line.
              </p>
              <div className="mt-auto flex flex-col gap-3 pt-7">
                <Button href="/quote" className="w-full">
                  Request a quote
                </Button>
                <Button
                  href={whatsappLink("Hello SchoolSource, we would like a custom kit quoted. Our list:")}
                  variant="whatsapp"
                  className="w-full"
                >
                  WhatsApp us
                </Button>
              </div>
            </article>
          </li>
        </ul>
      </Section>

      {/* Per-student packing */}
      <Section id="per-student" tone="cream" aria-labelledby="per-student-title" className="scroll-mt-20">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-sky lg:sticky lg:top-28">
            <Image
              src="/images/photos/cat-uniforms-bags.jpg"
              alt="Students in school uniform walking with their school bags"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <h2 id="per-student-title" className="text-h2">
              One bag per student.
            </h2>
            <p className="mt-5 max-w-[34rem] text-lead text-ink-soft">
              You tell us what each class needs. We pack every student&apos;s set in one labelled bag and deliver
              the bags sorted by class.
            </p>

            <ol className="mt-8 grid gap-5">
              {packingSteps.map((s, i) => (
                <li key={s.title} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="grid size-11 shrink-0 place-items-center rounded-full bg-ink font-display text-[1.125rem] text-white"
                  >
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-[1.1875rem] font-bold leading-snug">{s.title}</h3>
                    <p className="mt-0.5 text-[1.0625rem] leading-relaxed text-ink-soft">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>

            <p className="mt-8 text-[1.0625rem] font-bold">What can go in each bag</p>
            <ul className="mt-2 grid gap-x-6 gap-y-1 text-[1.0625rem] sm:grid-cols-2">
              {bagContents.map((b) => (
                <li key={b.slug}>
                  <Link href={`/products/${b.slug}`} className="link inline-flex min-h-11 items-center text-ink hover:text-blue">
                    {b.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/quote?topic=student-kits" size="lg">
                Request a quote
              </Button>
              <Button
                href={whatsappLink(
                  "Hello SchoolSource, we would like kits packed per student. Classes and number of students:",
                )}
                variant="whatsapp"
                size="lg"
              >
                WhatsApp us
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Buying calendar */}
      <Section id="calendar" aria-labelledby="calendar-title" className="scroll-mt-20">
        <SectionHead
          id="calendar-title"
          title="What schools order each month."
          intro="The school year, April to March. Dates vary by board and school. Tell us yours and we plan deliveries around them."
        />
        <BuyingCalendar months={months} />
      </Section>

      {/* Closing */}
      <Section tone="orange" spacing="tight" aria-labelledby="kits-cta">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
          <div>
            <h2 id="kits-cta" className="text-h2">
              Plan this term with us.
            </h2>
            <p className="mt-3 max-w-[32rem] text-lead">
              Send your list and your dates. We quote it line by line and agree a delivery date with you.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="/quote" size="lg">
              Request a quote
            </Button>
            <Button href={whatsappLink("Hello SchoolSource, here is our list for this term:")} variant="whatsapp" size="lg">
              WhatsApp us
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
