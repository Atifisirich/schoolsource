import { Container } from "./Container";
import { PageHeader } from "./PageHeader";
import { withPlaceholders } from "./Placeholder";

export type LegalSection = { title: string; body: string[] };

/** Short plain-language document: numbered sections, readable measure. */
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
        <p className="font-mono text-label uppercase text-ink-soft">Last updated: {withPlaceholders(updated)}</p>
      </PageHeader>
      <Container size="text" className="py-12 lg:py-16">
        <ol className="grid gap-10">
          {sections.map((s, i) => (
            <li key={s.title} className="grid gap-3 sm:grid-cols-[3rem_1fr]">
              <span className="font-mono text-sm font-semibold text-board">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h2 className="font-sans text-xl font-semibold">{s.title}</h2>
                {s.body.map((para) => (
                  <p key={para} className="mt-3 text-ink-soft">
                    {withPlaceholders(para)}
                  </p>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </>
  );
}
