import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Section, SectionHead } from "@/components/ui/Section";
import { cutouts } from "@/lib/category-art";

// Confirmed by the owner (HANDOFF.md §2.5). Do not add claims here without asking.
const reasons = [
  {
    title: "Checked before dispatch",
    text: "Every order, every time.",
    icon: <path d="M4 12.5l5 5L20 6.5" />,
  },
  {
    title: "Damaged, short or wrong? Replaced.",
    text: "Tell us what arrived and we put it right.",
    icon: <path d="M4 8h13l-3-3M20 16H7l3 3" />,
  },
  {
    title: "Order updates on WhatsApp",
    text: "Where your order is, in the chat you already use.",
    icon: <path d="M20 12a8 8 0 0 1-11.6 7.1L4 20l1-4.2A8 8 0 1 1 20 12z" />,
  },
  {
    title: "Delivered in Hyderabad and to other states",
    text: "By our own team or a transporter.",
    icon: (
      <>
        <path d="M2 6h11v10H2zM13 10h4l4 4v2h-8" />
        <circle cx="6" cy="18" r="2" />
        <circle cx="17" cy="18" r="2" />
      </>
    ),
  },
  {
    title: "School visits with samples",
    text: "See and handle products before you order.",
    icon: (
      <>
        <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" />
        <circle cx="12" cy="9.5" r="2.5" />
      </>
    ),
  },
  {
    title: "One supplier for school groups",
    text: "Every branch of a school group can order through us.",
    icon: (
      <>
        <circle cx="6" cy="5" r="2.5" />
        <circle cx="6" cy="19" r="2.5" />
        <circle cx="18" cy="12" r="2.5" />
        <path d="M6 7.5v9M6 12h9.5" />
      </>
    ),
  },
];

/** Why schools choose us: confirmed promises only, on paper cards over cream. */
export function WhySection() {
  return (
    <Section tone="cream" id="why" aria-labelledby="why-title">
      <SectionHead
        id="why-title"
        title="Why schools choose us."
        intro="These come with every order, large or small. We keep stock in a warehouse."
        action={
          <Button href="/about" variant="text">
            About SchoolSource
          </Button>
        }
      />
      <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="relative min-h-52 overflow-hidden rounded-lg sm:min-h-64 sm:col-span-2 lg:col-span-1 lg:row-span-2">
          <Image
            src={cutouts.warehouse.src}
            alt={cutouts.warehouse.alt}
            fill
            sizes="(min-width: 1024px) 25vw, 100vw"
            className="object-cover"
          />
        </div>
        {reasons.map((r) => (
          <div key={r.title} className="flex gap-5 rounded-lg bg-paper p-5 sm:min-h-52 sm:flex-col sm:justify-between sm:gap-6 sm:p-6">
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-ink text-white">
              <svg
                viewBox="0 0 24 24"
                className="size-[22px]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {r.icon}
              </svg>
            </span>
            <div>
              <h3 className="text-[clamp(1.3125rem,1.15rem+0.5vw,1.625rem)] leading-[1.1]">{r.title}</h3>
              <p className="mt-2.5 text-[1.0625rem] text-ink-soft">{r.text}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
