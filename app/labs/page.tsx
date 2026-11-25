import type { Metadata } from "next";
import Link from "next/link";
import { WhatsAppIcon } from "@/components/layout/WhatsAppFloat";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { Pending, showPending } from "@/components/ui/Pending";
import { Photo } from "@/components/ui/Photo";
import { RouteSteps } from "@/components/ui/RouteSteps";
import { Section } from "@/components/ui/Section";
import { whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Labs & STEM Setups",
  description:
    "Equipment for science, maths, STEM and tinkering labs, with lab furniture and safety gear on the same itemised quotation. Complete lab setups planned, supplied and installed.",
};

const consultHref = "/quote?topic=lab";

type LabType = { name: string; text: React.ReactNode; link: string; pending?: boolean };

// Contents are drawn from the Labs, Furniture and Electricals categories in data/catalogue.ts
const labTypes: LabType[] = [
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
    name: "Tinkering lab",
    text: "3D printers, laser engravers and hand tools, with work tables and storage.",
    link: "/products/labs#tinkering-and-maker",
  },
  {
    name: "CBSE Composite Skill Lab",
    text: (
      <>
        Set up to the CBSE guidelines for composite skill labs <Pending label="CONFIRM" />
      </>
    ),
    link: "/products/labs#complete-lab-setups",
    pending: true,
  },
];

const oneQuotation = [
  { label: "Apparatus, glassware and models", href: "/products/labs" },
  { label: "Lab tables and stools", href: "/products/furniture#lab-furniture" },
  { label: "Safety goggles, aprons and gloves", href: "/products/labs#lab-safety" },
  { label: "Switches, wiring and extension boards", href: "/products/electricals#electrical-fittings" },
];

const steps = [
  { title: "Consultation", text: "We discuss the lab you need, your room, class size and timeline." },
  { title: "Layout and list", text: "We plan the layout and prepare a full equipment list." },
  { title: "Itemised quotation", text: "Every item quoted line by line, for you to review and approve." },
  { title: "Supply and installation", text: "Checked before dispatch, delivered and installed, with a GST invoice." },
];

function Arrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 8 H13 M9 4 L13 8 L9 12" />
    </svg>
  );
}

export default function LabsPage() {
  const shownLabs = labTypes.filter((l) => !l.pending || showPending);

  return (
    <>
      <PageHeader
        crumbs={[{ href: "/", label: "Home" }, { label: "Labs" }]}
        title="Labs for science, maths and STEM"
        intro={
          <p>
            Equipment for a new lab or an upgrade, with benches, storage and safety gear on the same quotation.
            Complete lab setups are planned, supplied and installed as one project.
          </p>
        }
        aside={
          <Photo
            src="/images/photos/page-labs.jpg"
            alt="Electronics components, sensors, tools and a project book laid out on a table"
            className="aspect-[3/2] w-full rounded-lg lg:w-[22rem] xl:w-[30rem]"
            sizes="(min-width: 1280px) 480px, (min-width: 1024px) 352px, 100vw"
            priority
          />
        }
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
          <Button href={consultHref} size="lg" className="w-full sm:w-auto">
            Request a lab consultation
          </Button>
          <Button href="/products/labs" variant="text" className="self-start sm:self-auto">
            Browse lab equipment
          </Button>
        </div>
      </PageHeader>

      {/* Lab types */}
      <Section aria-labelledby="types-title">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <h2 id="types-title" className="text-h2">
                The labs we equip
              </h2>
              <p className="mt-4 max-w-md text-ink-soft">
                Start a new lab from an empty room, or upgrade the equipment in an existing one.
              </p>
              <Photo
                src="/images/photos/cat-labs.jpg"
                alt="Glassware and apparatus on the shelves of a school science lab"
                className="mt-8 aspect-[3/2] rounded-lg"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            </div>
          </div>
          <ul className="border-t border-rule lg:col-span-7">
            {shownLabs.map((lab) => (
              <li key={lab.name} className="border-b border-rule">
                <Link
                  href={lab.link}
                  className="group grid gap-2 py-6 transition-colors duration-150 focus-visible:outline-offset-0 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-8"
                >
                  <span>
                    <span className="block font-display text-h3 font-semibold transition-colors duration-150 group-hover:text-board">
                      {lab.name}
                    </span>
                    <span className="mt-1.5 block max-w-xl text-ink-soft">{lab.text}</span>
                  </span>
                  <span className="flex items-center gap-2 text-sm font-semibold text-board">
                    See equipment
                    <Arrow className="size-3.5 transition-transform duration-200 ease-out group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* One quotation */}
      <Section tone="ink" aria-labelledby="quote-title">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
          <Photo
            src="/images/photos/page-home-labs.jpg"
            alt="A small robot built from a microcontroller board, sensors and wheels"
            className="aspect-[3/2] rounded-lg lg:col-span-6"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
          <div className="lg:col-span-6">
            <h2 id="quote-title" className="text-h2 text-white">
              Equipment, furniture and safety gear on one quotation
            </h2>
            <p className="mt-4 max-w-xl text-paper/80">
              A lab needs more than apparatus. We list everything the room needs, from our lab, furniture and
              electricals ranges, so you approve one quotation instead of several.
            </p>
            <ul className="mt-8 border-t border-paper/15">
              {oneQuotation.map((q) => (
                <li key={q.label} className="border-b border-paper/15">
                  <Link
                    href={q.href}
                    className="group flex items-center justify-between gap-4 py-3.5 text-paper transition-colors duration-150 hover:text-white focus-visible:outline-offset-0"
                  >
                    {q.label}
                    <Arrow className="size-3.5 shrink-0 text-pencil transition-transform duration-200 ease-out group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Process */}
      <Section aria-labelledby="process-title">
        <div className="grid gap-4 lg:grid-cols-12 lg:items-end lg:gap-12">
          <h2 id="process-title" className="text-h2 lg:col-span-7">
            How a lab project runs
          </h2>
          <p className="max-w-xl text-ink-soft lg:col-span-5">
            From the first conversation to the first class in the room.
          </p>
        </div>
        <RouteSteps steps={steps} className="mt-12" />
        {showPending ? (
          <p className="mt-12 max-w-2xl text-[0.9375rem] text-ink-soft">
            Lab specifications and board requirements are confirmed with your school during the consultation{" "}
            <Pending label="CONFIRM" />.
          </p>
        ) : null}
      </Section>

      {/* Closing */}
      <Section tone="muted" spacing="tight" aria-labelledby="labs-cta">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="lg:col-span-7">
            <h2 id="labs-cta" className="text-h2">
              Planning a new lab?
            </h2>
            <p className="mt-3 max-w-xl text-ink-soft">
              Tell us the lab, the room and when you need it ready. We will arrange a consultation.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
            <Button href={consultHref} size="lg">
              Request a lab consultation
            </Button>
            <Button
              href={whatsappLink("Hello SchoolSource, we would like a consultation for setting up a lab.")}
              variant="secondary"
              size="lg"
              icon={<WhatsAppIcon />}
            >
              WhatsApp us
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
