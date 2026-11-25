import type { Metadata } from "next";
import { CategoryIcon } from "@/components/icons/CategoryIcon";
import { WhatsAppIcon } from "@/components/layout/WhatsAppFloat";
import { Button } from "@/components/ui/Button";
import { CategoryTile } from "@/components/ui/CategoryTile";
import { IndexTab } from "@/components/ui/IndexTab";
import { PencilUnderline } from "@/components/ui/PencilUnderline";
import { PhotoPlaceholder, Placeholder } from "@/components/ui/Placeholder";
import { RuledPaper } from "@/components/ui/RuledPaper";
import { Eyebrow, Section, type SectionTone } from "@/components/ui/Section";
import { Stamp } from "@/components/ui/Stamp";
import { bands, categories, categoriesInBand } from "@/data/catalogue";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false, follow: false },
};

const colours = [
  { name: "Paper", token: "paper", hex: "#F5F8FD", role: "Page background", swatch: "bg-paper", note: "Ink 15.4:1" },
  { name: "Navy (ink)", token: "ink", hex: "#0E1F3D", role: "Text, dark sections", swatch: "bg-ink", note: "On paper 15.4:1" },
  { name: "Blue (board)", token: "board", hex: "#1F4FB5", role: "Primary: buttons, bands", swatch: "bg-board", note: "White 7.4:1" },
  { name: "Orange (pencil)", token: "pencil", hex: "#F5872A", role: "Accent", swatch: "bg-pencil", note: "Navy text 6.5:1 - never white text" },
  { name: "Dark orange (red)", token: "red", hex: "#C2410C", role: "Stamps, ticks, small text", swatch: "bg-red", note: "On white 5.2:1" },
  { name: "Light blue (rule)", token: "rule", hex: "#BFD0EC", role: "Lines, borders, tints", swatch: "bg-rule", note: "Decorative only (1.6:1)" },
  { name: "White", token: "white", hex: "#FFFFFF", role: "Cards on paper", swatch: "bg-white", note: "Ink 16:1" },
  { name: "Ink soft", token: "ink-soft", hex: "#4B5873", role: "Secondary text", swatch: "bg-ink-soft", note: "On paper 6.7:1" },
  { name: "Paper deep", token: "paper-deep", hex: "#E6EDF8", role: "Hover fills, wells", swatch: "bg-paper-deep", note: "Ink-soft 6.1:1" },
  { name: "Light orange (pencil-soft)", token: "pencil-soft", hex: "#FFE3C7", role: "Placeholders, labels on dark", swatch: "bg-pencil-soft", note: "On blue 6.0:1" },
];

const typeScale = [
  { token: "text-display", sample: "Everything your school needs", className: "font-display text-display" },
  { token: "text-h1", sample: "Request a quotation", className: "font-display text-h1" },
  { token: "text-h2", sample: "How it works", className: "font-display text-h2" },
  { token: "text-h3", sample: "Exam Season Kit", className: "font-display text-h3" },
  { token: "text-lead", sample: "Share your requirement list on WhatsApp or by email. We return an itemised quotation.", className: "text-lead" },
  { token: "text-base", sample: "Delivery is scheduled before term starts, with a GST invoice and delivery challan for every order.", className: "text-base" },
  { token: "text-sm", sample: "Made to your school's specification. Usually ordered through the school for parents.", className: "text-sm text-ink-soft" },
  { token: "text-label (mono)", sample: "01 / Stationery / Item SS-0142", className: "font-mono text-label uppercase" },
];

const spacing = [
  { name: "1 (4px)", w: "w-1" },
  { name: "2 (8px)", w: "w-2" },
  { name: "4 (16px)", w: "w-4" },
  { name: "6 (24px)", w: "w-6" },
  { name: "8 (32px) - one rule", w: "w-8" },
  { name: "12 (48px)", w: "w-12" },
  { name: "16 (64px)", w: "w-16" },
  { name: "gutter (16-40px fluid)", w: "w-gutter" },
  { name: "section (64-128px fluid)", w: "w-section" },
];

const sectionTones: SectionTone[] = ["paper", "ruled", "white", "board", "ink"];

function Block({
  id,
  number,
  title,
  children,
  tone = "paper",
}: {
  id: string;
  number: string;
  title: string;
  children: React.ReactNode;
  tone?: SectionTone;
}) {
  return (
    <Section id={id} tone={tone} spacing="tight" aria-labelledby={`${id}-title`} className="border-t border-ink/10">
      <div className="grid gap-8 lg:grid-cols-12">
        <header className="lg:col-span-3">
          <Eyebrow>{number}</Eyebrow>
          <h2 id={`${id}-title`} className="mt-2 text-h3">{title}</h2>
        </header>
        <div className="lg:col-span-9">{children}</div>
      </div>
    </Section>
  );
}

export default function StyleguidePage() {
  return (
    <>
      <Section spacing="tight" className="overflow-hidden">
        <div className="grid items-end gap-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <Eyebrow>Internal reference / not indexed</Eyebrow>
            <h1 className="mt-4 text-display">
              The supply room <PencilUnderline variant={2}>styleguide</PencilUnderline>
            </h1>
            <p className="mt-6 max-w-2xl text-lead text-ink-soft">
              Tokens and base components for {site.name}. Ruled register paper, ledger columns, rubber
              stamps and index tabs, used with restraint inside a clean grid.
            </p>
          </div>
          <div className="md:col-span-4 md:justify-self-end">
            <Stamp className="w-40 md:w-48" rotate={-9} label="SchoolSource Hyderabad stamp" />
          </div>
        </div>
      </Section>

      <Block id="colour" number="01" title="Colour">
        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-ink/15 bg-ink/15 sm:grid-cols-3 lg:grid-cols-5">
          {colours.map((c) => (
            <li key={c.token} className="bg-white">
              <div className={`h-20 ${c.swatch} border-b border-ink/10`} />
              <div className="p-3">
                <p className="text-sm font-semibold">{c.name}</p>
                <p className="font-mono text-[0.75rem] text-ink-soft">{c.hex} / {c.token}</p>
                <p className="mt-1.5 text-[0.8125rem] leading-snug">{c.role}</p>
                <p className="mt-1 text-[0.75rem] leading-snug text-ink-soft">{c.note}</p>
              </div>
            </li>
          ))}
        </ul>
      </Block>

      <Block id="type" number="02" title="Type">
        <p className="mb-6 text-sm text-ink-soft">
          Young Serif for headlines only. Public Sans for body and UI. IBM Plex Mono for numbers, codes and stamp
          labels. Sizes are fluid from 360px to 1280px.
        </p>
        <dl className="divide-y divide-ink/10 border-y border-ink/10">
          {typeScale.map((t) => (
            <div key={t.token} className="grid gap-2 py-5 md:grid-cols-[11rem_1fr] md:gap-6">
              <dt className="font-mono text-[0.75rem] text-ink-soft md:pt-2">{t.token}</dt>
              <dd className={t.className}>{t.sample}</dd>
            </div>
          ))}
        </dl>
      </Block>

      <Block id="spacing" number="03" title="Spacing">
        <p className="mb-6 text-sm text-ink-soft">
          Tailwind&apos;s 4px scale, plus a 2rem rule height so text on ruled paper sits on the lines.
        </p>
        <ul className="grid gap-3">
          {spacing.map((s) => (
            <li key={s.name} className="flex items-center gap-4">
              <span className={`block h-4 ${s.w} bg-board`} />
              <span className="font-mono text-[0.75rem] text-ink-soft">{s.name}</span>
            </li>
          ))}
        </ul>
      </Block>

      <Block id="buttons" number="04" title="Buttons">
        <div className="flex flex-wrap items-center gap-3">
          <Button href="/quote">Request a Quote</Button>
          <Button href="/products" variant="secondary">Browse Categories</Button>
          <Button href={site.whatsappHref} variant="secondary" icon={<WhatsAppIcon />}>WhatsApp</Button>
          <Button variant="text">Text action</Button>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Button size="lg">Large</Button>
          <Button>Medium</Button>
          <Button size="sm">Small</Button>
          <Button disabled>Disabled</Button>
        </div>
        <div className="on-dark mt-6 flex flex-wrap items-center gap-3 rounded-sm bg-board p-6">
          <Button variant="accent">Request a Quote</Button>
          <Button variant="inverse">Send on WhatsApp</Button>
          <Button variant="text">Text on dark</Button>
        </div>
        <p className="mt-4 text-sm text-ink-soft">
          Primary and outline buttons fill with ink from the left on hover (200ms, transform only). Tab through to
          check focus rings: ink on paper, pencil yellow on dark bands.
        </p>
      </Block>

      <Block id="tabs" number="05" title="Index tabs">
        <div className="flex flex-wrap items-end gap-3">
          <IndexTab>01</IndexTab>
          <IndexTab tone="board">02</IndexTab>
          <IndexTab tone="paper">03</IndexTab>
          <IndexTab tone="white" className="border-x border-t border-ink/15">04</IndexTab>
          <IndexTab tone="ink">05</IndexTab>
          <IndexTab tone="pencil" className="px-5">Band 1</IndexTab>
        </div>
        <div className="mt-8 max-w-md">
          <div className="flex gap-1">
            <IndexTab tone="pencil">A-F</IndexTab>
            <IndexTab tone="paper">G-L</IndexTab>
            <IndexTab tone="paper">M-R</IndexTab>
          </div>
          <div className="rounded-sm rounded-tl-none border border-ink/10 bg-white shadow-card p-5 text-sm text-ink-soft">
            Tabs sit on the top edge of a card, like the index of a register.
          </div>
        </div>
      </Block>

      <Block id="stamp" number="06" title="Rubber stamp">
        <div className="flex flex-wrap items-center gap-10">
          <Stamp className="w-36" />
          <Stamp className="w-28" rotate={6} centre="QUOTED" />
          <Stamp className="w-28" rotate={-3} tone="ink" centre="GST" text={"GST INVOICE · DELIVERY CHALLAN · SCHOOLSOURCE ·"} />
          <div className="on-dark rounded-sm bg-board p-6 [--stamp-band:var(--color-board)]">
            <Stamp className="w-28" tone="paper" rotate={-10} />
          </div>
        </div>
        <p className="mt-6 text-sm text-ink-soft">
          Use two or three times across the whole site. Always slightly rotated. Red on paper, paper on dark bands.
        </p>
      </Block>

      <Block id="paper" number="07" title="Ruled paper">
        <div className="grid gap-6 md:grid-cols-2">
          <RuledPaper holes className="pb-8 pr-6 pt-8">
            <p className="font-mono text-label uppercase leading-8 text-ink-soft">Requirement list</p>
            <ul className="text-lg leading-8">
              <li>40 registers</li>
              <li>2 boxes chalk</li>
              <li>10 dusters</li>
              <li>Trophies for sports day</li>
            </ul>
          </RuledPaper>
          <RuledPaper margin={false} className="ledger p-6">
            <p className="text-sm leading-8 text-ink-soft">
              Plain ruled sheet with ledger columns. Line height is 2rem, so text set at leading-8 sits on the rules.
            </p>
          </RuledPaper>
        </div>
      </Block>

      <Block id="underline" number="08" title="Pencil underline">
        <p className="text-h2">
          <PencilUnderline>One supplier</PencilUnderline> for every{" "}
          <PencilUnderline variant={1} tone="board" delay={150}>purchase</PencilUnderline>.
        </p>
        <p className="mt-6 text-h2">
          Delivered <PencilUnderline variant={2} tone="red" delay={300}>before term</PencilUnderline> starts.
        </p>
        <p className="mt-6 text-sm text-ink-soft">
          Draws in once when scrolled into view. With reduced motion it appears complete.
        </p>
      </Block>

      <Block id="icons" number="09" title="Category icons">
        <ul className="grid grid-cols-3 gap-px overflow-hidden rounded-sm border border-ink/15 bg-ink/15 sm:grid-cols-5 lg:grid-cols-7">
          {categories.map((c) => (
            <li key={c.slug} className="group flex flex-col items-center gap-3 bg-white p-4 text-center">
              <CategoryIcon slug={c.slug} drawOnHover className="size-12" />
              <span className="font-mono text-[0.6875rem] leading-tight text-ink-soft">
                {c.number} {c.name}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-ink-soft">48-unit grid, 1.75px stroke, round caps. Hover to see the draw-over.</p>
      </Block>

      <Block id="tiles" number="10" title="Category tiles">
        <div className="grid gap-12">
          {bands.map((band) => (
            <div key={band.id}>
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-ink/20 pb-3">
                <h3 className="text-h3">{band.name}</h3>
                <p className="font-mono text-label uppercase text-ink-soft">{band.note}</p>
              </div>
              <div className="mt-4 grid gap-x-5 gap-y-3 sm:grid-cols-2 xl:grid-cols-3">
                {categoriesInBand(band.id).map((c) => (
                  <CategoryTile key={c.slug} category={c} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Block>

      <Block id="placeholders" number="11" title="Placeholders">
        <p className="leading-loose">
          Missing information stays visible: <Placeholder>[ADDRESS]</Placeholder> <Placeholder>[GSTIN]</Placeholder>{" "}
          <Placeholder>[DELIVERY AREA]</Placeholder> <Placeholder>[PAYMENT TERMS]</Placeholder>{" "}
          <Placeholder>[MIN ORDER]</Placeholder> <Placeholder>[RETURN POLICY]</Placeholder>{" "}
          <Placeholder>[HOURS]</Placeholder> <Placeholder>[CLIENT SCHOOLS]</Placeholder>{" "}
          <Placeholder>[CONFIRM]</Placeholder>
        </p>
        <PhotoPlaceholder description="Delivery van unloading cartons at a school gate" className="mt-6 aspect-[16/7]" />
      </Block>

      <Block id="sections" number="12" title="Section tones">
        <div className="grid gap-3 sm:grid-cols-5">
          {sectionTones.map((tone) => (
            <div
              key={tone}
              className={
                {
                  paper: "bg-paper text-ink border border-ink/15",
                  ruled: "ruled text-ink border border-ink/15",
                  white: "bg-white text-ink border border-ink/15",
                  board: "on-dark bg-board",
                  ink: "on-dark bg-ink",
                }[tone] + " flex h-28 items-end rounded-sm p-3"
              }
            >
              <span className="font-mono text-label uppercase">{tone}</span>
            </div>
          ))}
        </div>
      </Block>
    </>
  );
}
