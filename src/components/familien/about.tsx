import Image from "next/image";
import { Reveal } from "@/components/familien/reveal";

export function FamilienAbout() {
  return (
    <section id="about" className="py-20 md:py-24 bg-[#F3E8D7]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <Image
            src="/images/Diego_Muniz_Baez_Profil.png"
            alt="Diego, Gründer von Skills4Life"
            width={200}
            height={200}
            className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover border-4 border-white shadow-lg shrink-0"
          />
          <div className="text-center md:text-left">
            <span className="inline-block text-[#2F3E4E] font-semibold text-sm mb-3">
              Wer wir sind
            </span>
            <h2 className="font-headline text-3xl text-[#0B0B0B] mb-4">
              Wir kennen das Gefühl von innen.
            </h2>
            <p className="text-[#5A5A5A] leading-relaxed">
              Ich war selbst der Schüler, der immer hörte: Du bist faul. Bis ich
              verstand: Es lag nicht an mir. Mir fehlte jemand, der meine
              Stärken sieht. Darum gibt es Skills4Life.
            </p>
            <p className="text-[#2D2D2D] font-semibold mt-4">Diego, Gründer</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
