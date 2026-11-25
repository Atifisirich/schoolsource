import type { Metadata } from "next";
import Link from "next/link";
import { BuyingCalendar, type CalendarMonthView } from "@/components/kits/BuyingCalendar";
import { WhatsAppIcon } from "@/components/layout/WhatsAppFloat";
import { AddToQuoteButton } from "@/components/quote/AddToQuoteButton";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { Photo } from "@/components/ui/Photo";
import { Section } from "@/components/ui/Section";
import { calendar } from "@/data/calendar";
import { getCategory, getKit, kits } from "@/data/catalogue";
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
  { title: "Send the class lists", text: "Number of students in each class and section, with uniform and shoe sizes." },
  { title: "Agree each class's set", text: "Books, notebooks, stationery and uniform for every class, quoted line by line." },
  { title: "One bag per student", text: "Each student's set is packed in one bag and labelled." },
  { title: "Delivered sorted by class", text: "The bags arrive sorted by class, ready to hand out." },
];

const bagContents = [
  { slug: "textbooks", label: "Textbooks and workbooks" },
  { slug: "stationery", label: "Notebooks and stationery" },
  { slug: "uniforms-bags", label: "Uniform, shoes and school bag" },
  { slug: "printing-id-cards", label: "ID card and school diary" },
];

function joinNames(names: string[]) {
  if (names.length < 2) return names;
  return names.flatMap((n, i) => (i === 0 ? [n] : [i === names.length - 1 ? " and " : ", ", n]));
}

export default function KitsPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ href: "/", label: "Home" }, { label: "Kits" }]}
        title="School kits for the busy weeks"
        intro={
          <p>
            Common orders, already listed. Add a kit to your quote list, then change the items and quantities for
            your school before you send it.
          </p>
        }
      >
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[0.9375rem]">
          <li>
            <a href="#per-student" className="link font-semibold text-board">
              Kits packed per student
            </a>
          </li>
          <li>
            <a href="#calendar" className="link font-semibold text-board">
              What schools order each month
            </a>
          </li>
        </ul>
      </PageHeader>

      {/* The seven kits */}
      <Section aria-labelledby="kits-title">
        <h2 id="kits-title" className="sr-only">
          Seven school kits
        </h2>
        <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {kits.map((kit) => {
            const from = kit.categories.flatMap((slug) => {
              const c = getCategory(slug);
              return c ? [c] : [];
            });
            return (
              <li key={kit.id} id={kit.slug} className="scroll-mt-28">
                <article aria-labelledby={`${kit.slug}-title`} className="card flex h-full flex-col overflow-hidden">
                  <Photo
                    src={kit.image ?? `/images/photos/kit-${kit.slug}.jpg`}
                    alt=""
                    className="aspect-[3/2] rounded-none"
                    sizes="(min-width: 1280px) 300px, (min-width: 640px) 50vw, 100vw"
                  />
                  <div className="flex flex-1 flex-col p-5">
                    <h3 id={`${kit.slug}-title`} className="text-[1.3125rem] leading-tight">
                      {kit.name}
                    </h3>
                    <p className="mt-2 text-sm text-ink-soft">
                      <span className="font-semibold text-ink">{kit.basis}.</span> For {kit.audience.charAt(0).toLowerCase()}
                      {kit.audience.slice(1)}.
                    </p>
                    <ul className="mt-4 border-t border-rule text-[0.9375rem]">
                      {kit.contents.map((line) => (
                        <li key={line} className="border-b border-rule py-1.5">
                          {line}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-3 text-sm text-ink-soft">
                      From{" "}
                      {joinNames(from.map((c) => c.slug)).map((part) => {
                        const c = from.find((x) => x.slug === part);
                        return c ? (
                          <Link key={c.slug} href={`/products/${c.slug}`} className="link text-ink">
                            {c.name}
                          </Link>
                        ) : (
                          part
                        );
                      })}
                    </p>
                    <div className="mt-auto pt-5">
                      <AddToQuoteButton
                        variant="solid"
                        className="w-full"
                        item={{ id: kit.id, name: kit.name, category: "School kits" }}
                        label="Get this kit quoted"
                      />
                    </div>
                  </div>
                </article>
              </li>
            );
          })}

          {/* Eighth cell: their own mix */}
          <li>
            <article aria-labelledby="custom-kit" className="flex h-full flex-col rounded-md bg-paper-deep p-6">
              <h3 id="custom-kit" className="text-[1.3125rem] leading-tight">
                Need a different mix?
              </h3>
              <p className="mt-3 text-ink-soft">
                Send us your own list for a classroom, an event or a new wing. We put it together as a kit and quote
                it line by line.
              </p>
              <div className="mt-auto flex flex-col gap-3 pt-6">
                <Button href="/quote" className="w-full">
                  Request a quote
                </Button>
                <Button
                  href={whatsappLink("Hello SchoolSource, we would like a custom kit quoted. Our list:")}
                  variant="secondary"
                  icon={<WhatsAppIcon />}
                  className="w-full"
                >
                  Send on WhatsApp
                </Button>
              </div>
            </article>
          </li>
        </ul>
      </Section>

      {/* Per-student kits */}
      <Section id="per-student" tone="muted" aria-labelledby="per-student-title" className="scroll-mt-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <Photo
              src="/images/photos/cat-uniforms-bags.jpg"
              alt="Students in school uniform walking with their school bags"
              className="aspect-[4/3] rounded-lg lg:sticky lg:top-28"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
          <div className="lg:col-span-6">
            <h2 id="per-student-title" className="text-h2">
              Packed per student, sorted by class
            </h2>
            <p className="mt-4 max-w-xl text-ink-soft">
              Instead of handing out books, notebooks and uniforms from separate piles, give every student one
              labelled bag. You tell us what each class needs. We pack it, label it and deliver it ready to hand out.
            </p>

            <ol className="mt-8 border-t border-ink/10">
              {packingSteps.map((s, i) => (
                <li key={s.title} className="grid gap-1 border-b border-ink/10 py-4 sm:grid-cols-[5rem_1fr] sm:gap-4">
                  <p className="text-sm font-semibold text-board sm:pt-0.5">Step {i + 1}</p>
                  <div>
                    <h3 className="font-sans text-[1.0625rem] font-semibold tracking-normal">{s.title}</h3>
                    <p className="mt-1 text-ink-soft">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>

            <h3 className="mt-8 font-sans text-[1.0625rem] font-semibold tracking-normal">What can go in each bag</h3>
            <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1.5">
              {bagContents.map((b) => (
                <li key={b.slug}>
                  <Link href={`/products/${b.slug}`} className="link text-ink">
                    {b.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
              <Button href="/quote?topic=student-kits">Plan per-student kits</Button>
              <Button
                href={whatsappLink(
                  "Hello SchoolSource, we would like kits packed per student. Classes and number of students:",
                )}
                variant="text"
                icon={<WhatsAppIcon />}
                className="self-start sm:self-auto"
              >
                Ask on WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Buying calendar */}
      <Section id="calendar" aria-labelledby="calendar-title" className="scroll-mt-20">
        <div className="grid gap-4 lg:grid-cols-12 lg:items-end lg:gap-12">
          <h2 id="calendar-title" className="text-h2 lg:col-span-7">
            What schools order, month by month
          </h2>
          <p className="max-w-xl text-ink-soft lg:col-span-5">
            The school year from April to March. Dates vary by board and school; tell us yours and we will plan
            deliveries around them.
          </p>
        </div>
        <div className="mt-12">
          <BuyingCalendar months={months} />
        </div>
      </Section>

      {/* Closing */}
      <Section tone="muted" spacing="tight" aria-labelledby="kits-cta">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="lg:col-span-7">
            <h2 id="kits-cta" className="text-h2">
              Plan this term&apos;s orders with us
            </h2>
            <p className="mt-3 max-w-xl text-ink-soft">
              Send your list and your dates. We quote it line by line and agree a delivery date with you.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
            <Button href="/quote" size="lg">
              Request a quote
            </Button>
            <Button
              href={whatsappLink("Hello SchoolSource, here is our list for this term:")}
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
