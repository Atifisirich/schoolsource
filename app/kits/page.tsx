import type { Metadata } from "next";
import Link from "next/link";
import { CategoryIcon } from "@/components/icons/CategoryIcon";
import { BuyingCalendar, type CalendarMonthView } from "@/components/kits/BuyingCalendar";
import { WhatsAppIcon } from "@/components/layout/WhatsAppFloat";
import { AddToQuoteButton } from "@/components/quote/AddToQuoteButton";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { IndexTab } from "@/components/ui/IndexTab";
import { PageHeader } from "@/components/ui/PageHeader";
import { RouteSteps } from "@/components/ui/RouteSteps";
import { Eyebrow, Section } from "@/components/ui/Section";
import { Photo } from "@/components/ui/Photo";
import { Stamp } from "@/components/ui/Stamp";
import { calendar } from "@/data/calendar";
import { getCategory, getKit, kits } from "@/data/catalogue";
import { whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "School Kits",
  description:
    "Ready-made supply lists for term start, exams, admissions, annual day, housekeeping and Teachers' Day. Add a kit to your quote list and adjust quantities.",
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
  { title: "Send the class lists", text: "Number of students in each class and section, with uniform and shoe sizes." },
  { title: "Agree each class's set", text: "Book list, notebooks, stationery and uniform for every class, quoted line by line." },
  { title: "One bag per student", text: "Each set packed and labelled with the student's name, class and section." },
  { title: "Delivered sorted by class", text: "Bags arrive section by section, with a packing list for each class teacher." },
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
        crumbs={[{ href: "/", label: "Home" }, { label: "School Kits" }]}
        title="School kits for the busy weeks"
        intro={
          <p>
            Common orders, already listed. Add a kit to your quote list, then adjust quantities and items for your
            school before you send it.
          </p>
        }
        aside={<Stamp className="hidden w-36 lg:block" rotate={-9} centre="KITS" />}
      />

      <Container className="py-12 lg:py-16">
        <ol className="grid gap-10">
          {kits.map((kit, i) => (
            <li key={kit.id} id={kit.slug} data-reveal className="relative scroll-mt-28 pt-7">
              <IndexTab tone={i % 2 ? "paper" : "pencil"} className="absolute left-5 top-0.5">
                Kit {String(i + 1).padStart(2, "0")}
              </IndexTab>
              <article
                aria-labelledby={`${kit.slug}-title`}
                className="grid gap-6 rounded-sm border border-ink/10 bg-white shadow-card p-6 sm:p-8 lg:grid-cols-12 lg:gap-10"
              >
                <div className="lg:col-span-4">
                  {kit.image ? (
                    <Photo src={kit.image} alt="" className="mb-5 aspect-[3/2] shadow-card" sizes="(min-width: 1024px) 30vw, 100vw" />
                  ) : null}
                  <h2 id={`${kit.slug}-title`} className="text-h3">{kit.name}</h2>
                  <p className="mt-1 font-mono text-label uppercase text-ink-soft">{kit.basis}</p>
                  <p className="mt-4 text-ink-soft">
                    <span className="font-semibold text-ink">For: </span>
                    {kit.audience}.
                  </p>
                </div>

                <div className="lg:col-span-5">
                  <h3 className="font-mono text-label uppercase text-ink-soft">Contents</h3>
                  <ul className="mt-3 grid gap-x-6 sm:grid-cols-2">
                    {kit.contents.map((line) => (
                      <li key={line} className="flex gap-2.5 border-b border-rule py-2">
                        <span aria-hidden="true" className="font-semibold text-red">&#10003;</span>
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col gap-5 lg:col-span-3">
                  <div>
                    <h3 className="font-mono text-label uppercase text-ink-soft">From</h3>
                    <ul className="mt-3 grid gap-2">
                      {kit.categories.map((slug) => {
                        const c = getCategory(slug);
                        return c ? (
                          <li key={slug}>
                            <Link
                              href={`/products/${slug}`}
                              className="flex items-center gap-2.5 text-[0.9375rem] underline decoration-rule underline-offset-4 hover:text-board hover:decoration-board"
                            >
                              <CategoryIcon slug={slug} className="size-6 text-board" />
                              {c.name}
                            </Link>
                          </li>
                        ) : null;
                      })}
                    </ul>
                  </div>
                  <div className="lg:mt-auto">
                    <AddToQuoteButton
                      variant="solid"
                      item={{ id: kit.id, name: kit.name, category: "School kits" }}
                      label="Get this kit quoted"
                    />
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </Container>

      {/* Per-student kits */}
      <Section id="per-student" tone="white" aria-labelledby="per-student-title" className="scroll-mt-24 border-y border-ink/10">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7" data-reveal>
            <Eyebrow>Per-student kits</Eyebrow>
            <h2 id="per-student-title" className="mt-3 text-h2">Packed per student, sorted by class</h2>
            <p className="mt-4 max-w-xl text-ink-soft">
              Instead of handing out books, notebooks and uniforms from separate piles, give every student one labelled
              bag. You tell us what each class needs. We pack it, label it and deliver it ready to hand out.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end" data-reveal>
            <Button href="/quote?topic=student-kits">Plan per-student kits</Button>
            <Button
              href={whatsappLink("Hello SchoolSource, we would like kits packed per student. Classes and number of students:")}
              variant="secondary"
              icon={<WhatsAppIcon />}
            >
              WhatsApp us
            </Button>
          </div>
        </div>

        <RouteSteps steps={packingSteps} className="mt-14" />

        <div className="mt-14 rounded-md border border-ink/12 bg-paper p-6 sm:p-8" data-reveal>
          <h3 className="font-mono text-label uppercase text-ink-soft">What can go in each bag</h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {bagContents.map((b) => (
              <li key={b.slug}>
                <Link
                  href={`/products/${b.slug}`}
                  className="group flex h-full items-center gap-3 rounded-sm border border-ink/12 bg-white p-3 transition-colors hover:border-board"
                >
                  <CategoryIcon slug={b.slug} className="size-9 text-board" drawOnHover />
                  <span className="font-semibold leading-snug">{b.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Buying calendar */}
      <Section id="calendar" aria-labelledby="calendar-title" className="scroll-mt-24">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end" data-reveal>
          <div className="lg:col-span-7">
            <Eyebrow>Buying calendar</Eyebrow>
            <h2 id="calendar-title" className="mt-3 text-h2">What schools order, month by month</h2>
          </div>
          <p className="text-ink-soft lg:col-span-5">
            Pick a month to see what is usually needed and the kits that cover it. Dates vary by board and school;
            tell us yours and we will plan deliveries around them.
          </p>
        </div>
        <div className="mt-10" data-reveal>
          <BuyingCalendar months={months} />
        </div>
      </Section>

      <section aria-labelledby="custom-kit" className="border-t border-ink/10 bg-white py-14 lg:py-16">
        <Container className="grid gap-6 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7" data-reveal>
            <h2 id="custom-kit" className="text-h2">Need a different mix?</h2>
            <p className="mt-3 max-w-xl text-ink-soft">
              Send us your own list for a classroom, an event or a new wing. We will put it together as a kit and
              quote it line by line.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end" data-reveal>
            <Button href="/quote">Request a Quote</Button>
            <Button
              href={whatsappLink("Hello SchoolSource, we would like a custom kit quoted. Our list:")}
              variant="secondary"
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
