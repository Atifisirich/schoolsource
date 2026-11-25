import type { Metadata } from "next";
import Link from "next/link";
import { BigSteps } from "@/components/how/BigSteps";
import { ArrowIcon, Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { Pending, showPending } from "@/components/ui/Pending";
import { Section, SectionHead } from "@/components/ui/Section";
import { whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Labs & STEM Setups",
  description:
    "Equipment for science, maths, STEM and tinkering labs, with lab furniture and safety gear on the same itemised quotation.",
};

const quoteHref = "/quote?topic=lab";
const waHref = whatsappLink("Hello SchoolSource, we would like a quote for setting up a lab.");

type LabType = { name: string; text: string; link: string; pending?: boolean };

// Drawn from the Labs, Furniture and Electricals categories in data/catalogue.ts
const labTypes: LabType[] = [
  {
    name: "Science lab",
    text: "Physics, chemistry and biology: apparatus, glassware, microscopes and models.",
    link: "/products/labs#physics-lab",
  },
  { name: "Maths lab", text: "Equipment and teaching models for hands-on maths.", link: "/products/labs#maths-lab" },
  {
    name: "STEM and robotics lab",
    text: "Robotics kits, electronics, sensors and microcontroller boards.",
    link: "/products/labs#stem-and-robotics",
  },
  {
    name: "Tinkering lab",
    text: "3D printers, laser engravers and hand tools, with work tables and storage.",
    link: "/products/labs#tinkering-and-maker",
  },
  {
    name: "CBSE Composite Skill Lab",
    text: "Set up to the CBSE guidelines for composite skill labs.",
    link: "/products/labs#complete-lab-setups",
    pending: true,
  },
];

const steps = [
  { title: "Tell us the lab", text: "The kind of lab, your room, class size and when you need it ready." },
  { title: "We list the equipment", text: "A full list of what the room needs, with benches, storage and safety gear." },
  { title: "You approve one quote", text: "Every item priced line by line. Change anything before you approve." },
  {
    title: "Checked and delivered",
    text: (
      <>
        Checked before dispatch and delivered with a GST invoice.
        {showPending ? (
          <>
            {" "}
            Installation at school: <Pending label="CONFIRM" />
          </>
        ) : null}
      </>
    ),
  },
];

function Actions({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Button href={quoteHref} size="lg">
        Request a quote
      </Button>
      <Button href={waHref} variant="whatsapp" size="lg">
        WhatsApp us
      </Button>
    </div>
  );
}

export default function LabsPage() {
  const shownLabs = labTypes.filter((l) => !l.pending || showPending);

  return (
    <>
      <PageHeader
        crumbs={[{ href: "/", label: "Home" }, { label: "Labs" }]}
        tone="sky"
        title="Labs for science, maths and STEM"
        intro={<p>Equipment for a new lab or an upgrade, on one quote with the furniture and safety gear.</p>}
        image={{ src: "/images/cutouts/robot.webp", width: 1100, height: 803, alt: "A small school robot" }}
        actions={<Actions className="flex flex-wrap gap-3" />}
      />

      <Section aria-labelledby="types-title">
        <SectionHead
          id="types-title"
          title="The labs we equip."
          intro="Start a new lab from an empty room, or upgrade an existing one."
        />
        <ul className="border-t-2 border-ink">
          {shownLabs.map((lab) => (
            <li key={lab.name} className="border-b border-ink/15">
              <Link
                href={lab.link}
                className="group grid gap-x-8 gap-y-2 py-7 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center md:py-9"
              >
                <span className="grid gap-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-baseline lg:gap-12">
                  <span className="font-display text-h3 transition-colors duration-150 group-hover:text-blue">
                    {lab.name}
                    {lab.pending && showPending ? (
                      <>
                        {" "}
                        <Pending label="CONFIRM" />
                      </>
                    ) : null}
                  </span>
                  <span className="max-w-xl text-lead text-ink-soft">{lab.text}</span>
                </span>
                <span className="flex items-center gap-2 text-[1.0625rem] font-semibold text-blue">
                  See equipment
                  <ArrowIcon className="size-5 transition-transform duration-200 ease-out group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section aria-labelledby="process-title" className="pt-0">
        <SectionHead id="process-title" title="How a lab project runs." intro="Four steps, from the first message to the delivery." />
        <BigSteps steps={steps} />
      </Section>

      <Section tone="cream" spacing="tight" aria-labelledby="labs-cta">
        <h2 id="labs-cta" className="max-w-[14em] text-h2">
          Planning a new lab?
        </h2>
        <p className="mt-4 max-w-xl text-lead text-ink-soft">
          Tell us the lab, the room and when you need it ready. We reply with a quote.
        </p>
        <Actions className="mt-8 flex flex-wrap gap-3" />
      </Section>
    </>
  );
}
