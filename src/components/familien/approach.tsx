import { Search, TrendingUp, Sparkles } from "lucide-react";
import { Reveal } from "@/components/familien/reveal";

const steps = [
  {
    icon: Search,
    title: "Stärken entdecken",
    text: "Wir finden heraus, worin Ihr Kind schon gut ist und was es begeistert.",
  },
  {
    icon: TrendingUp,
    title: "Erfolge sichtbar machen",
    text: "Klare Etappen und ein Ziel mit Ende. Ihr Kind sieht Woche für Woche, dass es vorwärtsgeht.",
  },
  {
    icon: Sparkles,
    title: "Selbstvertrauen wächst",
    text: "Mit diesem Selbstvertrauen traut sich Ihr Kind auch an das, was schwerfällt.",
  },
];

export function FamilienApproach() {
  return (
    <section id="ansatz" className="py-20 md:py-24 bg-[#F3E8D7]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-12">
          <span className="inline-block text-[#2F3E4E] font-semibold text-sm mb-3">
            Unser Ansatz
          </span>
          <h2 className="font-headline text-3xl md:text-4xl text-[#0B0B0B]">
            Stärke zuerst.
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 0.1}>
              <div className="h-full rounded-2xl bg-white p-7 shadow-sm border border-[#E8DCC8]">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-10 h-10 rounded-full bg-[#2F3E4E] text-white flex items-center justify-center">
                    <Icon size={18} />
                  </span>
                  <span className="text-sm font-semibold text-[#5A5A5A]">
                    Schritt {i + 1}
                  </span>
                </div>
                <h3 className="font-headline text-xl text-[#0B0B0B] mb-2">{title}</h3>
                <p className="text-[#5A5A5A] leading-relaxed">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="text-center text-[#5A5A5A] mt-10 max-w-2xl mx-auto">
            Wir üben keine Schwächen und versprechen keine Mathenote. Wir
            arbeiten für ein Kind, das an sich glaubt.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
