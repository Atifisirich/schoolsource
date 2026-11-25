import type { Metadata } from "next";
import Link from "next/link";
import { WhatsAppIcon } from "@/components/layout/WhatsAppFloat";
import { Button } from "@/components/ui/Button";
import { CategoryTile } from "@/components/ui/CategoryTile";
import { Field, Input, Select, Textarea } from "@/components/ui/Field";
import { PageHeader } from "@/components/ui/PageHeader";
import { Pending, showPending } from "@/components/ui/Pending";
import { Photo } from "@/components/ui/Photo";
import { RouteSteps } from "@/components/ui/RouteSteps";
import { Eyebrow, Section } from "@/components/ui/Section";
import { categories } from "@/data/catalogue";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false, follow: false },
};

const colours = [
  { token: "paper", hex: "#FFFFFF", role: "Page background", swatch: "bg-paper", note: "Ink 17.3:1" },
  { token: "paper-deep", hex: "#F4F5F7", role: "Alternate band, image wells", swatch: "bg-paper-deep", note: "Ink-soft 6.4:1" },
  { token: "ink", hex: "#0F1B2D", role: "Text, the dark band, footer", swatch: "bg-ink", note: "On paper 17.3:1" },
  { token: "ink-soft", hex: "#4D5A6C", role: "Secondary text", swatch: "bg-ink-soft", note: "On paper 7.0:1" },
  { token: "board", hex: "#1F4FB5", role: "Primary: buttons, links", swatch: "bg-board", note: "White text 7.4:1" },
  { token: "board-deep", hex: "#173F93", role: "Hover", swatch: "bg-board-deep", note: "White text 9.4:1" },
  { token: "pencil", hex: "#F5872A", role: "Accent in small doses", swatch: "bg-pencil", note: "Navy text 6.9:1. Never white text" },
  { token: "pencil-soft", hex: "#FFF1E3", role: "Pending placeholders", swatch: "bg-pencil-soft", note: "Ink 15.6:1" },
  { token: "red", hex: "#C2410C", role: "Small details (ticks)", swatch: "bg-red", note: "On white 5.2:1" },
  { token: "rule", hex: "#E3E7EE", role: "Hairlines and borders", swatch: "bg-rule", note: "Decorative only" },
];

const typeScale = [
  { token: "text-display", sample: "Everything your school needs", className: "font-display text-display" },
  { token: "text-h1", sample: "Request a quotation", className: "font-display text-h1" },
  { token: "text-h2", sample: "Fifteen categories, one order book", className: "font-display text-h2" },
  { token: "text-h3", sample: "Exam season kit", className: "font-display text-h3" },
  { token: "text-lead", sample: "Share your requirement list on WhatsApp or by email. We return an itemised quotation.", className: "text-lead" },
  { token: "text-base", sample: "In-stock items are delivered within a week of confirmation, with a GST invoice and delivery challan.", className: "text-base" },
  { token: "text-sm", sample: "Made to your school's specification.", className: "text-sm text-ink-soft" },
  { token: "tabular-nums", sample: "Qty 40 · 500 · 1,250", className: "tabular-nums" },
];

const steps = [
  { title: "Share your list", text: "Send it on WhatsApp or by email, in any format." },
  { title: "Receive an itemised quotation", text: "Every line priced for your quantities." },
  { title: "Checked and delivered", text: "Every order is checked before dispatch." },
  { title: "Pay on agreed terms", text: "[PAYMENT TERMS]" },
];

function Block({ id, title, children, note }: { id: string; title: string; note?: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-rule py-12 md:py-16">
      <div className="mx-auto grid w-full max-w-[80rem] gap-8 px-gutter lg:grid-cols-12">
        <header className="lg:col-span-3">
          <h2 id={`${id}-title`} className="text-h3">
            {title}
          </h2>
          {note ? <p className="mt-2 text-sm text-ink-soft">{note}</p> : null}
        </header>
        <div className="min-w-0 lg:col-span-9">{children}</div>
      </div>
    </section>
  );
}

export default function StyleguidePage() {
  const sample = categories.slice(0, 3);

  return (
    <>
      <PageHeader
        crumbs={[{ href: "/", label: "Home" }, { label: "Styleguide" }]}
        title="Styleguide"
        intro={
          <p>
            Tokens and base components for {site.name}. Internal and not indexed. Calm, catalogue-like, borders over
            shadows, one blue and a little orange.
          </p>
        }
        aside={
          <div className="flex flex-wrap gap-3">
            <Button href="/quote">Request a quote</Button>
            <Button href={site.whatsappHref} variant="secondary" icon={<WhatsAppIcon />}>
              WhatsApp us
            </Button>
          </div>
        }
      />

      <Block id="colour" title="Colour" note="No gradients, glows or tinted backgrounds. One ink band per page at most, plus the footer.">
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {colours.map((c) => (
            <li key={c.token} className="card overflow-hidden">
              <div className={`h-16 border-b border-rule ${c.swatch}`} />
              <div className="p-3">
                <p className="text-sm font-semibold">{c.token}</p>
                <p className="text-xs text-ink-soft tabular-nums">{c.hex}</p>
                <p className="mt-1.5 text-[0.8125rem] leading-snug">{c.role}</p>
                <p className="mt-1 text-xs leading-snug text-ink-soft">{c.note}</p>
              </div>
            </li>
          ))}
        </ul>
      </Block>

      <Block id="type" title="Type" note="Source Serif 4 (600) for headings. Public Sans for everything else. Kalam only in the hero's handwritten list.">
        <dl className="divide-y divide-rule border-y border-rule">
          {typeScale.map((t) => (
            <div key={t.token} className="grid gap-2 py-5 md:grid-cols-[10rem_1fr] md:gap-6">
              <dt className="text-sm text-ink-soft md:pt-2">{t.token}</dt>
              <dd className={t.className}>{t.sample}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-8">
          <Eyebrow>Eyebrow: sentence case, at most one per page</Eyebrow>
          <p className="mt-2 font-display text-h2">A heading that needs context</p>
        </div>
      </Block>

      <Block id="shape" title="Shape and depth" note="Radius sm 6px (buttons, inputs), md 10px (cards), lg 14px (large images). Cards have a hairline border and no shadow at rest.">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="flex h-24 items-end rounded-sm border border-rule p-3 text-sm">rounded-sm</div>
          <div className="flex h-24 items-end rounded-md border border-rule p-3 text-sm">rounded-md</div>
          <div className="flex h-24 items-end rounded-lg border border-rule p-3 text-sm">rounded-lg</div>
          <div className="flex h-24 items-end rounded-md bg-white p-3 text-sm shadow-card">shadow-card</div>
          <div className="flex h-24 items-end rounded-md bg-white p-3 text-sm shadow-lift">shadow-lift (hover only)</div>
          <div className="card flex h-24 items-end p-3 text-sm">.card</div>
        </div>
      </Block>

      <Block id="buttons" title="Buttons" note="Flat. Steps up 1px on hover, presses down on click. sm 40px, md 44px, lg 52px.">
        <div className="flex flex-wrap items-center gap-3">
          <Button href="/quote">Primary</Button>
          <Button href="/products" variant="secondary">
            Secondary
          </Button>
          <Button href={site.whatsappHref} variant="secondary" icon={<WhatsAppIcon />}>
            With icon
          </Button>
          <Button variant="text">Text action</Button>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Button size="lg">Large 52</Button>
          <Button>Medium 44</Button>
          <Button size="sm">Small 40</Button>
          <Button disabled>Disabled</Button>
        </div>
        <div className="on-dark mt-6 flex flex-wrap items-center gap-3 rounded-md bg-ink p-6">
          <Button variant="accent">Accent (ink band only)</Button>
          <Button variant="inverse">Inverse</Button>
          <Button variant="text">Text on dark</Button>
        </div>
      </Block>

      <Block id="links" title="Links">
        <p className="max-w-xl">
          In running text use <Link href="/how-it-works" className="link">.link</Link>: the underline thickens and turns
          blue on hover. For nav-style links use{" "}
          <Link href="/products" className="link-draw font-semibold text-board">
            .link-draw
          </Link>
          , where the underline draws in from the left.
        </p>
      </Block>

      <Block id="cards" title="Cards" note="CategoryTile is the shared category card. Any linked card uses .card-link: it lifts 2px and its photo zooms to 1.03 inside the frame.">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sample.map((c) => (
            <CategoryTile key={c.slug} category={c} sizes="(min-width: 1024px) 25vw, 50vw" />
          ))}
        </div>
        <Link href="/kits" className="card-link mt-5 grid overflow-hidden sm:grid-cols-2">
          <Photo src="/images/photos/kit-exam-season.jpg" alt="" className="aspect-[3/2] rounded-none" sizes="(min-width: 640px) 40vw, 100vw" />
          <div className="p-6">
            <h3 className="text-h3">A linked card with a Photo</h3>
            <p className="mt-2 text-ink-soft">Photo frames inside .card-link zoom on hover.</p>
          </div>
        </Link>
      </Block>

      <Block
        id="pending"
        title="Pending facts"
        note="Every missing fact goes through <Pending>. NEXT_PUBLIC_SHOW_PENDING=false hides them all at launch."
      >
        <p className="leading-loose">
          Payment terms: <Pending label="PAYMENT TERMS" />. Address: <Pending label="ADDRESS" />. Minimum order:{" "}
          <Pending label="MIN ORDER" />.
        </p>
        <p className="mt-3 text-sm text-ink-soft">
          Currently {showPending ? "visible" : "hidden"}. Use <code className="text-ink">showPending</code> to hide a
          whole sentence that depends on a fact.
        </p>
      </Block>

      <Block id="steps" title="Steps">
        <RouteSteps steps={steps} />
      </Block>

      <Block id="fields" title="Form fields" note="44px controls. Border meets 3:1 non-text contrast.">
        <div className="grid max-w-xl gap-5">
          <Field label="School name" required>
            {(p) => <Input {...p} placeholder="e.g. your school's full name" />}
          </Field>
          <Field label="Category" hint="Pick the closest one.">
            {(p) => (
              <Select {...p} defaultValue="">
                <option value="">Choose a category</option>
                {sample.map((c) => (
                  <option key={c.slug}>{c.name}</option>
                ))}
              </Select>
            )}
          </Field>
          <Field label="Your list">{(p) => <Textarea {...p} />}</Field>
        </div>
      </Block>

      <Block id="tones" title="Section tones" note="paper, muted, ink. white, ruled and board are deprecated aliases.">
        <div className="overflow-hidden rounded-md border border-rule">
          <Section tone="paper" spacing="none" className="p-6">
            <p className="font-semibold">tone=&quot;paper&quot;</p>
          </Section>
          <Section tone="muted" spacing="none" className="p-6">
            <p className="font-semibold">tone=&quot;muted&quot;</p>
          </Section>
          <Section tone="ink" spacing="none" className="p-6">
            <p className="font-semibold">tone=&quot;ink&quot;</p>
          </Section>
        </div>
      </Block>
    </>
  );
}
