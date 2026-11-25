import type { Metadata } from "next";
import Link from "next/link";
import { CategoryIcon } from "@/components/icons/CategoryIcon";
import { WhatsAppIcon } from "@/components/layout/WhatsAppFloat";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { IndexTab } from "@/components/ui/IndexTab";
import { PageHeader } from "@/components/ui/PageHeader";
import { PencilUnderline } from "@/components/ui/PencilUnderline";
import { Photo } from "@/components/ui/Photo";
import { withPlaceholders } from "@/components/ui/Placeholder";
import { RouteSteps } from "@/components/ui/RouteSteps";
import { Eyebrow, Section } from "@/components/ui/Section";
import { whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Labs & STEM Setups",
  description:
    "Science, maths and STEM labs, CBSE Composite Skill Labs and tinkering labs for schools: equipment sourcing, layout planning and installation.",
};

const consultHref = "/quote?topic=lab";

// Contents are drawn from the Labs, Furniture and Electricals categories in data/catalogue.ts
const labTypes = [
  {
    name: "Science labs",
    text: "Physics, chemistry and biology: apparatus, glassware, microscopes, specimens and models. Chemicals on request, where permitted.",
    link: "/products/labs#physics-lab",
  },
  {
    name: "Maths lab",
    text: "Maths lab equipment and teaching models for hands-on learning.",
    link: "/products/labs#maths-lab",
  },
  {
    name: "STEM and robotics lab",
    text: "Robotics kits, electronics components, sensors and microcontroller boards.",
    link: "/products/labs#stem-and-robotics",
  },
  {
    name: "CBSE Composite Skill Lab",
    text: "Planned to the CBSE guidelines for composite skill labs [CONFIRM].",
    link: "/products/labs#complete-lab-setups",
  },
  {
    name: "Tinkering lab",
    text: "3D printers, laser engravers and hand tools, with work tables and storage.",
    link: "/products/labs#tinkering-and-maker",
  },
];

const schoolGets = [
  {
    title: "Equipment sourcing",
    text: "Every item on one itemised quotation, from apparatus to safety goggles.",
    slug: "labs",
  },
  {
    title: "Layout planning",
    text: "Bench, storage and power positions planned for your room and class size.",
    slug: "furniture",
  },
  {
    title: "Installation",
    text: "Furniture, fittings and equipment installed and set out, ready for the first class.",
    slug: "electricals",
  },
];

const process = [
  { title: "Consultation", text: "We discuss the lab you need, your room, class size and timeline." },
  { title: "Layout and list", text: "We plan the layout and prepare a full equipment list." },
  { title: "Itemised quotation", text: "Every item quoted line by line, for you to review and approve." },
  { title: "Supply and installation", text: "Delivered and installed on the agreed date, with GST invoices." },
];

export default function LabsPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ href: "/", label: "Home" }, { label: "Labs & STEM" }]}
        title={
          <>
            Labs &amp; STEM setups, <PencilUnderline delay={300}>planned and installed</PencilUnderline>
          </>
        }
        intro={
          <p>
            Science, maths and STEM labs, CBSE Composite Skill Labs and tinkering labs. We source the equipment, plan
            the layout and handle installation, so a new lab arrives as one project.
          </p>
        }
        aside={
          <div className="flex flex-col items-start gap-3 lg:items-end">
            <Button href={consultHref} size="lg">Request a lab consultation</Button>
            <Link href="/products/labs" className="text-sm font-semibold underline decoration-rule underline-offset-4 hover:decoration-board">
              Browse lab equipment
            </Link>
          </div>
        }
      />

      {/* What we set up */}
      <Section aria-labelledby="types-title">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4" data-reveal>
            <Eyebrow>What we set up</Eyebrow>
            <h2 id="types-title" className="mt-3 text-h2">Five kinds of lab, one supplier</h2>
            <p className="mt-4 text-ink-soft">
              Start a new lab from an empty room, or upgrade the equipment in an existing one.
            </p>
            <Photo
              src="/images/photos/page-labs.jpg"
              alt="Electronics components, sensors and a project book laid out on a table"
              className="mt-8 hidden aspect-[3/2] shadow-lift lg:block"
              sizes="30vw"
            />
          </div>
          <ol className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
            {labTypes.map((lab, i) => (
              <li key={lab.name} data-reveal className={i === 0 ? "sm:col-span-2" : undefined}>
                <Link
                  href={lab.link}
                  className="group relative flex h-full flex-col rounded-sm border border-ink/10 bg-white shadow-card p-6 pt-8 transition-colors duration-150 hover:border-ink/45"
                >
                  <IndexTab tone={i === 0 ? "board" : "paper"} className="absolute -top-px left-5 h-6 min-w-12 text-[0.75rem]">
                    {String(i + 1).padStart(2, "0")}
                  </IndexTab>
                  <h3 className="text-h3">{lab.name}</h3>
                  <p className="mt-2 text-ink-soft">{withPlaceholders(lab.text)}</p>
                  <span className="mt-auto flex items-center gap-2 pt-5 font-mono text-label uppercase text-board">
                    See equipment
                    <svg viewBox="0 0 16 16" className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M2 8 H13 M9 4 L13 8 L9 12" />
                    </svg>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* What the school gets */}
      <Section tone="ink" aria-labelledby="gets-title">
        <div data-reveal>
          <Eyebrow>What your school gets</Eyebrow>
          <h2 id="gets-title" className="mt-3 max-w-2xl text-h2 text-white">
            Equipment, furniture and power, planned together
          </h2>
        </div>
        <ul className="mt-12 grid gap-px overflow-hidden rounded-sm bg-paper/15 md:grid-cols-3">
          {schoolGets.map((g) => (
            <li key={g.title} data-reveal className="bg-ink p-6 md:p-8">
              <CategoryIcon slug={g.slug} className="size-10 text-pencil" />
              <h3 className="mt-5 font-sans text-lg font-semibold text-white">{g.title}</h3>
              <p className="mt-2 text-paper/80">{g.text}</p>
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-2xl text-paper/80" data-reveal>
          Lab tables and stools come from our{" "}
          <Link href="/products/furniture#lab-furniture" className="font-semibold text-white underline decoration-pencil underline-offset-4">
            furniture range
          </Link>
          , and goggles, aprons and gloves from{" "}
          <Link href="/products/labs#lab-safety" className="font-semibold text-white underline decoration-pencil underline-offset-4">
            lab safety
          </Link>
          , all on the same quotation.
        </p>
      </Section>

      {/* Process */}
      <Section aria-labelledby="process-title">
        <div className="flex flex-wrap items-end justify-between gap-4" data-reveal>
          <div>
            <Eyebrow>How a lab project runs</Eyebrow>
            <h2 id="process-title" className="mt-3 text-h2">From consultation to first class</h2>
          </div>
        </div>
        <RouteSteps steps={process} className="mt-12" />
        <p className="mt-12 max-w-2xl border-l-[3px] border-pencil bg-white px-4 py-3 text-[0.9375rem]" data-reveal>
          {withPlaceholders(
            "Lab specifications and board requirements are confirmed with your school during the consultation [CONFIRM].",
          )}
        </p>
      </Section>

      {/* CTA */}
      <section aria-labelledby="labs-cta" className="on-dark bg-board py-14 lg:py-16">
        <Container className="grid gap-6 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7" data-reveal>
            <h2 id="labs-cta" className="text-h2 text-white">Planning a new lab?</h2>
            <p className="mt-3 max-w-xl text-paper/90">
              Tell us the lab, the room and when you need it ready. We will arrange a consultation.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end" data-reveal>
            <Button href={consultHref} variant="accent">Request a lab consultation</Button>
            <Button
              href={whatsappLink("Hello SchoolSource, we would like a consultation for setting up a lab.")}
              variant="inverse"
              icon={<WhatsAppIcon />}
            >
              WhatsApp us
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
