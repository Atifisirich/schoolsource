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
 * Short plain-language document: a cream header, then large readable text at
 * a comfortable line length. A contents list sits beside it on wide screens.
 * "[PAYMENT TERMS]"-style markers render as <Pending>.
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
      <PageHeader
        crumbs={[{ href: "/", label: "Home" }, { label: title }]}
        title={title}
        intro={
          <>
            <p>{intro}</p>
            <p className="!mt-5 text-[1.0625rem] opacity-80">Last updated: {withPlaceholders(updated)}</p>
          </>
        }
      />

      <Container className="grid gap-10 pb-24 pt-4 lg:grid-cols-12 lg:gap-16 lg:pb-32">
        <nav aria-labelledby="contents-title" className="hidden lg:col-span-3 lg:block">
          <div className="sticky top-28">
            <h2 id="contents-title" className="font-sans text-[1.0625rem] font-bold text-ink">
              On this page
            </h2>
            <ul className="mt-3 grid gap-0.5 border-l-2 border-ink/10">
              {sections.map((s) => (
                <li key={s.title}>
                  <Link
                    href={`#${anchor(s.title)}`}
                    className="-ml-0.5 block min-h-11 border-l-2 border-transparent py-2.5 pl-4 text-[1.0625rem] text-ink-soft transition-colors duration-150 hover:border-ink hover:text-ink"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="max-w-[40rem] lg:col-span-8 lg:col-start-5">
          {sections.map((s, i) => (
            <section
              key={s.title}
              id={anchor(s.title)}
              aria-labelledby={`${anchor(s.title)}-title`}
              className={i === 0 ? "scroll-mt-28" : "mt-12 scroll-mt-28 border-t-2 border-ink/10 pt-12"}
            >
              <h2 id={`${anchor(s.title)}-title`} className="text-h3">
                {s.title}
              </h2>
              {s.body.map((para) => (
                <p key={para} className="mt-4 text-[1.125rem] leading-[1.75] text-ink-soft">
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
