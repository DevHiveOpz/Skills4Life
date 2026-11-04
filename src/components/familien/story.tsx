import { Award } from "lucide-react";
import { Reveal } from "@/components/familien/reveal";

export function FamilienStory() {
  return (
    <section id="geschichte" className="py-20 md:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-12">
          <span className="inline-block text-[#2F3E4E] font-semibold text-sm mb-3">
            Die Geschichte von Emanuele
          </span>
          <h2 className="font-headline text-3xl md:text-4xl text-[#0B0B0B]">
            Es ging nie um Mathe.
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6">
          <Reveal>
            <div className="h-full rounded-2xl border border-[#E8DCC8] bg-[#FAF6EF] p-7">
              <p className="text-sm font-semibold text-[#5A5A5A] mb-2">
                Vorher
              </p>
              <h3 className="font-headline text-xl text-[#0B0B0B] mb-3">
                Ein Jahr Mathe-Nachhilfe
              </h3>
              <p className="text-[#5A5A5A] leading-relaxed">
                Mathe war seine «Schwäche». Die Noten blieben knapp genügend,
                für das Zeugnis und die Bewerbungen hat es nicht gereicht.
                Zuhause gab es zwar weniger Diskussionen, aber das Ziel wurde
                nicht erreicht.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="h-full rounded-2xl bg-[#2F3E4E] text-white p-7">
              <p className="text-sm font-semibold text-white/70 mb-2">Dann</p>
              <h3 className="font-headline text-xl mb-3">
                Die Frage: Worin ist er stark?
              </h3>
              <p className="text-white/85 leading-relaxed">
                Die Antwort war Englisch. In drei Monaten haben wir ihn auf die
                B2-Prüfung vorbereitet. Er wurde von Woche zu Woche besser, sah
                seinen Fortschritt und feierte kleine Erfolge.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="mt-6 rounded-2xl border-2 border-[#2F3E4E] p-7 flex flex-col md:flex-row items-center gap-5 text-center md:text-left">
            <span className="w-14 h-14 shrink-0 rounded-full bg-[#F3E8D7] text-[#2F3E4E] flex items-center justify-center">
              <Award size={26} />
            </span>
            <div>
              <p className="font-headline text-2xl text-[#0B0B0B]">
                B2 First bestanden. Mit 13 Jahren.
              </p>
              <p className="text-[#5A5A5A] mt-1">
                Nicht, weil wir seine Schwäche repariert haben, sondern weil wir
                seine Stärke entdeckt und gefördert haben. Das Selbstvertrauen
                kam mit dem Erfolg.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
