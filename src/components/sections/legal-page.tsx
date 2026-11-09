import { Section } from "@/components/layout/section";
import { Card } from "@/components/ui/card";
import type { LegalDetail, LegalSection } from "@/content/legal";

type LegalPageProps = {
  overline: string;
  title: string;
  lead: string;
  details?: LegalDetail[];
  sections: LegalSection[];
};

// Shared layout of the Impressum and the Datenschutzerklärung
export function LegalPage({
  overline,
  title,
  lead,
  details,
  sections,
}: LegalPageProps) {
  return (
    <Section className="mt-header">
      <div className="mx-auto max-w-[65ch]">
        <p className="mb-space-3 text-overline uppercase text-muted">
          {overline}
        </p>
        <h1 className="mb-space-4 wrap-break-word hyphens-auto text-h1 text-text">
          {title}
        </h1>
        <p className="mb-space-6 text-body-lg text-muted">{lead}</p>

        {details && (
          <Card variant="brand" className="mb-space-6">
            <dl className="grid gap-space-3 sm:grid-cols-[auto_1fr] sm:gap-x-space-5">
              {details.map(({ label, value, href }) => (
                <div key={label} className="contents">
                  <dt className="text-body font-bold text-text">{label}</dt>
                  <dd className="-mt-space-2 whitespace-pre-line wrap-anywhere text-body text-muted sm:mt-0">
                    {href ? (
                      <a
                        href={href}
                        className="text-primary underline underline-offset-4"
                      >
                        {value}
                      </a>
                    ) : (
                      value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </Card>
        )}

        <div className="flex flex-col gap-space-5">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="mb-space-2 text-h3 text-text">
                {section.heading}
              </h2>
              <div className="flex flex-col gap-space-2">
                {section.blocks.map((block, index) =>
                  typeof block === "string" ? (
                    <p key={index} className="text-body text-muted">
                      {block}
                    </p>
                  ) : (
                    <ul
                      key={index}
                      className="flex list-disc flex-col gap-space-1 pl-space-4 text-body text-muted"
                    >
                      {block.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ),
                )}
              </div>
            </section>
          ))}
        </div>
      </div>
    </Section>
  );
}
