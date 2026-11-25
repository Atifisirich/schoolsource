import Link from "next/link";
import { Container } from "./Container";
import { PageHeader } from "./PageHeader";
import { withPlaceholders } from "./Placeholder";

export type LegalSection = { title: string; body: string[] };

function anchor(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Short plain-language document. Contents list on wide screens, body text at
 * a reading measure. "[PAYMENT TERMS]"-style markers render as <Pending>.
 */
export function LegalPage({
  title,
  intro,
  updated,
  sections,
}: {
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHeader crumbs={[{ href: "/", label: "Home" }, { label: title }]} title={title} intro={<p>{intro}</p>}>
        <p className="text-sm text-ink-soft">Last updated: {withPlaceholders(updated)}</p>
      </PageHeader>

      <Container className="grid gap-10 py-12 lg:grid-cols-12 lg:gap-16 lg:py-16">
        <nav aria-labelledby="contents-title" className="hidden lg:col-span-3 lg:block">
          <div className="sticky top-28">
            <h2 id="contents-title" className="font-sans text-sm font-semibold text-ink-soft">
              On this page
            </h2>
            <ul className="mt-3 grid gap-0.5 border-l border-rule">
              {sections.map((s) => (
                <li key={s.title}>
                  <Link
                    href={`#${anchor(s.title)}`}
                    className="-ml-px block border-l border-transparent py-1.5 pl-4 text-[0.9375rem] text-ink-soft transition-colors duration-150 hover:border-ink hover:text-ink"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="max-w-[68ch] lg:col-span-8 lg:col-start-5">
          {sections.map((s, i) => (
            <section
              key={s.title}
              id={anchor(s.title)}
              aria-labelledby={`${anchor(s.title)}-title`}
              className={i === 0 ? "scroll-mt-28" : "mt-10 scroll-mt-28 border-t border-rule pt-10"}
            >
              <h2 id={`${anchor(s.title)}-title`} className="text-h3">
                {s.title}
              </h2>
              {s.body.map((para) => (
                <p key={para} className="mt-3 text-[1.0625rem] leading-[1.7] text-ink/85">
                  {withPlaceholders(para)}
                </p>
              ))}
            </section>
          ))}
        </div>
      </Container>
    </>
  );
}
