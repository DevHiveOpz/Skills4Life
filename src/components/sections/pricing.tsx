"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const packages = [
  {
    name: "1× pro Woche",
    sessions: "4 Lektionen pro Monat",
    duration: "je 45 Minuten",
    price: "260",
    includes: [
      "Persönliche Lernbegleitung",
      "Struktur & Lernplan",
      "Eltern-Update nach jeder Lektion",
    ],
    forWhom: "Dein Kind bekommt jede Woche eine gezielte Lektion.",
  },
  {
    name: "2× pro Woche",
    sessions: "8 Lektionen pro Monat",
    duration: "je 45 Minuten",
    price: "440",
    includes: [
      "Alles aus 1× pro Woche",
      "Mehr Zeit für Übung & Vertiefung",
      "Schnellere Fortschritte",
    ],
    forWhom: "Doppelt so viel Zeit. Doppelt so schnell Fortschritte.",
  },
  {
    name: "4× pro Woche",
    sessions: "16 Lektionen pro Monat",
    duration: "je 45 Minuten",
    price: "720",
    includes: [
      "Alles aus 2× pro Woche",
      "Enge Begleitung bei grossen Lücken",
      "Schnelle Stabilisierung",
    ],
    forWhom: "Für Situationen, in denen es jetzt schnell besser werden muss.",
  },
];

export function PricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="pricing" className="py-24 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-[#2F3E4E] font-semibold text-sm mb-4">
            Preise & Pakete
          </span>
          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl text-[#2D2D2D] mb-6">
            Was kostet die Begleitung?
          </h2>
          <p className="text-lg text-[#5A5A5A] max-w-2xl mx-auto">
            Jede Lektion dauert 45 Minuten. Du w&auml;hlst nur, wie oft pro Woche.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="h-full"
            >
              <Card
                className="h-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 relative overflow-hidden rounded-2xl border-[#E8DCC8] bg-white"
              >
                <CardContent className="p-8 flex flex-col h-full">
                  <h3 className="text-2xl font-bold text-[#2D2D2D] mb-1">
                    {pkg.name}
                  </h3>
                  <p className="text-[#5A5A5A] text-sm mb-6">
                    {pkg.sessions} &middot; {pkg.duration}
                  </p>

                  <div className="mb-6">
                    <span className="text-4xl font-bold text-[#2D2D2D]">
                      CHF {pkg.price}
                    </span>
                    <span className="text-[#5A5A5A] ml-2">/ Monat</span>
                  </div>

                  <ul className="space-y-3 mb-6 flex-grow">
                    {pkg.includes.map((item) => (
                      <li
                        key={item}
                        className="flex items-start space-x-3 text-[#2D2D2D]"
                      >
                        <CheckCircle
                          size={20}
                          className="text-[#2F3E4E] flex-shrink-0 mt-0.5"
                        />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="text-[#5A5A5A] text-sm mb-6 border-t border-[#E8DCC8] pt-4">
                    {pkg.forWhom}
                  </p>

                  <Button
                    asChild
                    className="w-full rounded-full bg-transparent border-2 border-[#2F3E4E] text-[#2F3E4E] hover:bg-[#2F3E4E] hover:text-white"
                  >
                    <Link href="#standortbestimmung">Situation Ihres Kindes einsch&auml;tzen</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Info Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <p className="text-[#5A5A5A] text-sm">
            Welches Paket das richtige ist, finden wir gemeinsam heraus &ndash; nach der Standortbestimmung.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
