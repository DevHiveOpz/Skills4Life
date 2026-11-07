import Image from "next/image";
import { Section } from "@/components/layout/section";
import { ScrollRow } from "@/components/ui/scroll-row";
import { about, type Person } from "@/content/familien";
import { cn } from "@/lib/utils";

function PersonCard({ person }: { person: Person }) {
  return (
    <li className="flex shrink-0 basis-[75%] snap-start flex-col gap-space-3 sm:basis-[40%] lg:basis-[calc((100%-3*var(--space-4))/4)]">
      <Image
        src={person.image}
        alt={`Porträt von ${person.name}`}
        width={600}
        height={750}
        sizes="(min-width: 1024px) 280px, (min-width: 640px) 40vw, 75vw"
        className={cn(
          "aspect-4/5 w-full rounded-lg bg-surface-muted object-cover",
          person.focus,
        )}
      />
      <div className="text-center">
        <p className="text-body font-bold text-text">{person.name}</p>
        <p className="text-small text-muted">{person.role}</p>
      </div>
    </li>
  );
}

export function FamilienAbout() {
  return (
    <Section id="about" tone="surface">
      <div className="mx-auto mb-space-6 max-w-[65ch] text-center">
        <p className="mb-space-3 text-overline uppercase text-muted">
          {about.overline}
        </p>
        <h2 className="mb-space-4 text-h2 text-text">{about.headline}</h2>
        <p className="mb-space-2 text-body-lg text-muted">
          {about.founderStory}
        </p>
        <p className="mb-space-4 text-body font-semibold text-text">
          {about.founderSignature}
        </p>
        <p className="text-body-lg text-muted">{about.teamStory}</p>
      </div>

      <h3 className="mb-space-4 text-center text-h3 text-text">
        {about.teamLabel}
      </h3>
      <ScrollRow
        label={about.sliderLabel}
        previousLabel={about.previous}
        nextLabel={about.next}
      >
        {about.team.map((person) => (
          <PersonCard key={person.name} person={person} />
        ))}
      </ScrollRow>

      <h3 className="mb-space-4 mt-space-6 text-center text-h3 text-text">
        {about.supportLabel}
      </h3>
      <ul className="grid gap-space-4 sm:grid-cols-2">
        <li className="flex flex-col items-center gap-space-3 rounded-lg bg-bg p-space-4 text-center">
          <Image
            src={about.coach.image}
            alt={`Porträt von ${about.coach.name}`}
            width={400}
            height={400}
            className="size-24 shrink-0 rounded-pill object-cover"
          />
          <div>
            <p className="text-body font-bold text-text">{about.coach.name}</p>
            <p className="text-small text-muted">{about.coach.role}</p>
          </div>
        </li>
        <li className="flex flex-col items-center gap-space-3 rounded-lg bg-bg p-space-4 text-center">
          <Image
            src={about.program.image}
            alt={about.program.alt}
            width={470}
            height={200}
            className="h-auto w-32 shrink-0 rounded-sm mix-blend-multiply sm:w-40"
          />
          <div>
            <p className="text-body font-bold text-text">
              {about.program.name}
            </p>
            <p className="text-small text-muted">{about.program.role}</p>
          </div>
        </li>
      </ul>
    </Section>
  );
}
