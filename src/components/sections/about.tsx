"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Quote, Heart, GraduationCap, Lightbulb, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
  const isInView = useInView(ref, { once: true, amount: 0.1 });

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
          <span className="inline-block text-[#2F3E4E] font-semibold text-sm mb-4">
            Über uns
          </span>
          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl text-[#2D2D2D] mb-6">
            Wir kennen das Gefühl von innen
          </h2>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Image/Story Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="overflow-hidden border border-[#E8DCC8] shadow-xl rounded-2xl bg-[#F3E8D7]">
              <div className="relative h-[400px] bg-[#F3E8D7] flex items-center justify-center">
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute top-10 right-10 w-40 h-40 bg-[#2F3E4E]/30 rounded-full blur-2xl" />
                  <div className="absolute bottom-10 left-10 w-60 h-60 bg-[#2F3E4E]/20 rounded-full blur-3xl" />
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
            <Card className="border-l-4 border-[#2F3E4E] bg-[#F3E8D7] rounded-2xl">
              <CardContent className="p-6">
                <Quote className="text-[#2F3E4E] mb-4" size={32} />
                <p className="text-[#2D2D2D] text-lg italic leading-relaxed">
                  Ich weiss genau, wie es sich anfühlt, in der Schule zu
                  kämpfen. Ich war selbst der Schüler, der immer hörte: Du bist
                  faul. Du strengst dich nicht genug an. Bis ich verstand: Es
                  lag nicht an mir. Mir fehlte nur die richtige Unterstützung.
                </p>
              </CardContent>
            </Card>

            <p className="text-[#5A5A5A] leading-relaxed">
              Nach dieser Erfahrung haben wir Skills4Life gegründet. Unsere Mission: Kein Kind soll sich so fühlen, wie wir uns damals gefühlt haben.
            </p>

            <p className="text-[#5A5A5A] leading-relaxed">
              Heute begleiten wir Schüler und Familien durch schwierige Phasen, mit Geduld, Verständnis und bewährten Methoden. Denn wir wissen: Jedes Kind kann erfolgreich sein, wenn es die richtige Begleitung bekommt.
            </p>

            <div className="flex items-center space-x-4 pt-4">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 bg-[#EBE0D0] border-2 border-white rounded-full flex items-center justify-center text-sm"
                  >
                    {["😊", "📚", "⭐", "🎯"][i]}
                  </div>
                ))}
              </div>
              <p className="text-[#2D2D2D] font-medium">
                53 Familien erfolgreich begleitet
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
                    <div className="w-16 h-16 mx-auto bg-[#EBE0D0] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#2F3E4E] transition-colors">
                      <value.icon
                        size={28}
                        className="text-[#2F3E4E] group-hover:text-white transition-colors"
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

          {/* CTA */}
          <div className="text-center mt-12">
            <p className="text-[#5A5A5A] mb-6">
              Lern uns kennen und erfahre, wie wir deiner Familie helfen können.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-[#2F3E4E] hover:bg-[#1A2530] text-white rounded-full px-8 py-6 text-lg font-semibold shadow-lg"
            >
              <Link href="#standortbestimmung" className="flex items-center space-x-2">
                <span>Situation Ihres Kindes einschätzen</span>
                <ArrowRight size={20} />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
