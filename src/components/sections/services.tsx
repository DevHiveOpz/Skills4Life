"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Target, Users, Clock, CheckCircle } from "lucide-react";

const benefits = [
  {
    icon: Target,
    title: "Verantwortung abgeben",
    description:
      "Wir übernehmen die Struktur. Du kannst loslassen – und wieder Elternteil sein statt Kontrolleur.",
  },
  {
    icon: Brain,
    title: "Lerntechniken, die bleiben",
    description:
      "Dein Kind lernt nicht nur Stoff – es lernt, wie Lernen funktioniert. Das bleibt für immer.",
  },
  {
    icon: Users,
    title: "Ruhige Abende",
    description:
      "Kein Streit mehr ums Lernen. Die Abende gehören wieder der Familie, nicht dem Schulstress.",
  },
  {
    icon: Clock,
    title: "Hobbys bleiben fix",
    description:
      "Fussball, Tanzen, Freunde – alles bleibt. Wir planen so, dass das Leben nicht zu kurz kommt.",
  },
];

const outcomes = [
  "Strukturiertes Lernen an mindestens 4 von 5 Tagen",
  "Selbständiges Starten ohne Diskussion",
  "Eltern raus aus der Lehrerrolle",
  "Hobby-Zeit bleibt fix",
];

export function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="services" className="py-24 bg-[#F3E8D7]" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-[#2F3E4E] font-semibold text-sm mb-4">
            Begleitung statt Nachhilfe
          </span>
          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl text-[#2D2D2D] mb-6">
            Das bekommt deine Familie von uns
          </h2>
          <p className="text-lg text-[#5A5A5A] max-w-2xl mx-auto">
            Keine Einzelstunden. Kein Stoff-Pauken. Sondern verlässliche Begleitung durch eine schwierige Schulphase – mit System, Struktur und spürbarer Entlastung.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="h-full"
            >
              <Card className="h-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 bg-white rounded-2xl border-[#E8DCC8]">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="w-14 h-14 flex items-center justify-center mb-4 bg-[#EBE0D0] rounded-xl">
                    <benefit.icon size={28} className="text-[#2F3E4E]" />
                  </div>

                  <h3 className="text-xl font-bold text-[#2D2D2D] mb-3">
                    {benefit.title}
                  </h3>

                  <p className="text-[#5A5A5A] text-sm flex-grow">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Outcome Promise */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-white p-8 md:p-10 rounded-2xl border border-[#E8DCC8] shadow-lg mb-12"
        >
          <div className="text-center mb-8">
            <h3 className="font-headline text-2xl text-[#2D2D2D] mb-2">
              Unser Versprechen: Innerhalb von 3 Monaten
            </h3>
            <p className="text-[#5A5A5A]">
              Wir versprechen keine Noten. Wir versprechen Verhalten, Struktur und Entlastung.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {outcomes.map((outcome, index) => (
              <div key={index} className="flex items-center space-x-3 bg-[#F3E8D7] p-4 rounded-xl">
                <CheckCircle size={20} className="text-[#2F3E4E] flex-shrink-0" />
                <span className="text-[#2D2D2D] text-sm font-medium">{outcome}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-[#2F3E4E] p-8 md:p-12 rounded-2xl"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-headline text-2xl md:text-3xl text-white mb-4">
                Bereit, Verantwortung abzugeben?
              </h3>
              <p className="text-white/90 mb-6">
                In 30 Minuten klären wir, ob wir zusammenpassen. Kostenlos, ohne Verkaufsdruck.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-white hover:bg-gray-100 text-[#2F3E4E] rounded-full"
              >
                <Link
                  href="#standortbestimmung"
                  className="flex items-center space-x-2"
                >
                  <span>Situation Ihres Kindes einschätzen</span>
                  <ArrowRight size={18} />
                </Link>
              </Button>
            </div>

            <div className="hidden md:flex justify-end">
              <div className="relative">
                <div className="flex items-center space-x-4 bg-white/20 backdrop-blur-sm p-6 rounded-xl">
                  <Clock size={48} className="text-white" />
                  <div>
                    <p className="text-white font-semibold">Schnelle Antwort</p>
                    <p className="text-white/80 text-sm">
                      Innerhalb von 24 Stunden
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
