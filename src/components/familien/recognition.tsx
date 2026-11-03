import { Reveal } from "@/components/familien/reveal";

const signs = [
  "Nachhilfe, Lehrerwechsel, Verzicht: Sie haben schon alles versucht, und das Zeugnis wird trotzdem nicht besser.",
  "Jeden Abend Polizist spielen, statt einfach Mama oder Papa zu sein.",
  "Sie sehen, wie der Funke in Ihrem Kind kleiner wird.",
];

export function FamilienRecognition() {
  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl text-[#0B0B0B]">
            Kommt Ihnen das bekannt vor?
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-4 mb-14">
          {signs.map((sign, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <p className="h-full rounded-2xl bg-[#F3E8D7]/60 border border-[#E8DCC8] p-6 text-[#2D2D2D] leading-relaxed">
                {sign}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="text-center font-headline text-2xl md:text-3xl text-[#2F3E4E] leading-snug max-w-2xl mx-auto">
            Mehr Nachhilfe ist nicht die Antwort.
            <br />
            Mehr Selbstvertrauen schon.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
