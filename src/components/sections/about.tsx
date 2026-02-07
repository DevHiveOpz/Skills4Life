"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Quote, Heart, GraduationCap, Lightbulb } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Empathie",
    description:
      "Wir verstehen, dass jedes Kind einzigartig ist und individuelle Unterstützung verdient.",
  },
  {
    icon: GraduationCap,
    title: "Kompetenz",
    description:
      "Pädagogisch fundierte Methoden kombiniert mit moderner Lernpsychologie.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "Kreative Lernansätze, die Schüler begeistern und motivieren.",
  },
];

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="about" className="py-24 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-[#E07B39] font-semibold text-sm mb-4">
            Über uns
          </span>
          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl text-[#2D2D2D] mb-6">
            Vom Zweifel zum Fünfer
          </h2>
          <p className="text-lg text-[#5A5A5A] max-w-2xl mx-auto">
            Die Geschichte hinter Skills4Life – und warum wir wissen, wie sich
            Lernschwierigkeiten anfühlen.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Image/Story Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="overflow-hidden border border-[#E8DCC8] shadow-xl rounded-2xl bg-[#FFF8F0]">
              <div className="relative h-[400px] bg-[#FFF8F0] flex items-center justify-center">
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute top-10 right-10 w-40 h-40 bg-[#E07B39]/30 rounded-full blur-2xl" />
                  <div className="absolute bottom-10 left-10 w-60 h-60 bg-[#E07B39]/20 rounded-full blur-3xl" />
                </div>

                <div className="relative text-center p-8">
                  <div className="w-[270px] h-[270px] mx-auto rounded-2xl overflow-hidden mb-8 shadow-lg">
                    <Image
                      src="/images/Diego_Muniz_Baez_Profil.png"
                      alt="Diego - Gründer & Lernbegleiter"
                      width={270}
                      height={270}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-headline text-2xl text-[#2D2D2D] mb-2">
                    Diego
                  </h3>
                  <p className="text-[#5A5A5A]">
                    Gründer & Lernbegleiter
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Story Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <Card className="border-l-4 border-[#E07B39] bg-[#FFF8F0] rounded-2xl">
              <CardContent className="p-6">
                <Quote className="text-[#E07B39] mb-4" size={32} />
                <p className="text-[#2D2D2D] text-lg italic leading-relaxed">
                  Ich weiss genau, wie es sich anfühlt, in der Schule zu
                  kämpfen. Ich war selbst der Schüler, der immer hörte: Du bist
                  faul. Du strengst dich nicht genug an. Bis ich verstand: Es
                  lag nicht an mir – mir fehlte nur die richtige Unterstützung.
                </p>
              </CardContent>
            </Card>

            <p className="text-[#5A5A5A] leading-relaxed">
              Nach meiner eigenen Schulzeit, in der ich vom frustrierten Schüler
              zum erfolgreichen Absolventen wurde, habe ich Skills4Life
              gegründet. Meine Mission: Kein Kind soll sich so fühlen, wie ich
              mich damals gefühlt habe.
            </p>

            <p className="text-[#5A5A5A] leading-relaxed">
              Heute begleite ich Schüler und Familien durch schwierige Phasen –
              mit Geduld, Verständnis und bewährten Methoden. Denn ich weiss:
              Jedes Kind kann erfolgreich sein, wenn es die richtige Begleitung
              bekommt.
            </p>

            <div className="flex items-center space-x-4 pt-4">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 bg-[#FFF0E5] border-2 border-white rounded-full flex items-center justify-center text-sm"
                  >
                    {["😊", "📚", "⭐", "🎯"][i]}
                  </div>
                ))}
              </div>
              <p className="text-[#2D2D2D] font-medium">
                Über 100 Schüler erfolgreich begleitet
              </p>
            </div>
          </motion.div>
        </div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="font-headline text-2xl text-[#2D2D2D] text-center mb-10">
            Unsere Werte
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              >
                <Card className="h-full border border-[#E8DCC8] shadow-lg hover:shadow-xl transition-shadow group bg-white rounded-2xl">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 mx-auto bg-[#FFF0E5] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#E07B39] transition-colors">
                      <value.icon
                        size={28}
                        className="text-[#E07B39] group-hover:text-white transition-colors"
                      />
                    </div>
                    <h4 className="text-xl font-bold text-[#2D2D2D] mb-3">
                      {value.title}
                    </h4>
                    <p className="text-[#5A5A5A]">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
